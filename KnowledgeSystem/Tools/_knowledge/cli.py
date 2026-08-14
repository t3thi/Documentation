"""Command-line interfaces for the extensionless Tools entry points."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Sequence

from .errors import FrontmatterError, KnowledgeError, MissingDependencyError
from .external import adapter_for, load_fixture
from .generate import (
    GeneratedFile,
    apply_generated_files,
    generate_backlinks,
    generate_indexes,
    generate_views,
    generated_is_current,
)
from .graph import backlinks_for
from .lint import lint_repository
from .repository import KnowledgeRepository
from .validate import validate_references, validate_repository
from .workflow import ingest_handoff, prepare_minutes_handoff


EXIT_SUCCESS = 0
EXIT_FAILURE = 1
EXIT_SETUP_OR_USAGE = 2


def _root_argument(parser: argparse.ArgumentParser) -> None:
    parser.add_argument("--root", type=Path, help="repository root (defaults to auto-discovery)")


def _repository(root: Path | None) -> KnowledgeRepository:
    return KnowledgeRepository.load(root)


def _build_parser(command: str) -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog=f"KnowledgeSystem/Tools/{command}")
    if command in {"build-index", "build-views"}:
        parser.add_argument("--check", action="store_true", help="fail on stale output without writing")
        _root_argument(parser)
    elif command == "validate":
        parser.add_argument(
            "--skip-generated",
            action="store_true",
            help="skip committed generated-output comparison (useful for isolated fixtures)",
        )
        _root_argument(parser)
    elif command == "lint-knowledge":
        parser.add_argument("--strict", action="store_true", help="make advisory warnings fail")
        _root_argument(parser)
    elif command == "check-backlinks":
        parser.add_argument("--target", help="show backlinks for one canonical/source ID")
        parser.add_argument("--check", action="store_true", help="also check the generated backlink view")
        _root_argument(parser)
    elif command == "check-external-status":
        parser.add_argument("source", nargs="*", help="registered gerrit:* or forge:* source IDs")
        parser.add_argument("--fixture", type=Path, help="read deterministic observations instead of the network")
        parser.add_argument("--timeout", type=float, default=15.0, help="per-request timeout in seconds")
        _root_argument(parser)
    elif command == "prepare-meeting-minutes":
        parser.add_argument("transcript", type=Path)
        _root_argument(parser)
    elif command == "ingest-reviewed-meeting":
        parser.add_argument("minutes", type=Path)
        parser.add_argument(
            "--reviewed",
            action="store_true",
            help="acknowledge that a human reviewed and accepted these Meeting Minutes",
        )
        _root_argument(parser)
    else:
        raise ValueError(f"unknown command: {command}")
    return parser


def _changed(files: list[GeneratedFile]) -> list[GeneratedFile]:
    return [item for item in files if not generated_is_current(item)]


def _validate_for_processing(repository: KnowledgeRepository) -> bool:
    """Print canonical-data errors before commands assume schema-valid shapes."""

    issues = validate_repository(repository, check_generated=False)
    for issue in issues:
        print(issue.format(), file=sys.stderr)
    if issues:
        print(f"Validation failed with {len(issues)} error(s).", file=sys.stderr)
        return False
    return True


def _run_build(command: str, arguments: argparse.Namespace) -> int:
    repository = _repository(arguments.root)
    if not _validate_for_processing(repository):
        return EXIT_FAILURE
    files = generate_indexes(repository) if command == "build-index" else generate_views(repository)
    changed = _changed(files)
    mismatches = apply_generated_files(files, check=arguments.check)
    if arguments.check and mismatches:
        for path in mismatches:
            print(f"STALE {repository.relative(Path(path))}", file=sys.stderr)
        return EXIT_FAILURE
    if arguments.check:
        print(f"Verified {len(files)} generated file(s).")
    else:
        print(f"Updated {len(changed)} generated file(s); {len(files) - len(changed)} unchanged.")
    return EXIT_SUCCESS


def _run_validate(arguments: argparse.Namespace) -> int:
    repository = _repository(arguments.root)
    issues = validate_repository(repository, check_generated=not arguments.skip_generated)
    for issue in issues:
        print(issue.format(), file=sys.stderr)
    if issues:
        print(f"Validation failed with {len(issues)} error(s).", file=sys.stderr)
        return EXIT_FAILURE
    print(
        f"Validated {len(repository.knowledge)} Knowledge Object(s), "
        f"{len(repository.decisions)} Decision Record(s), "
        f"{len(repository.changes)} Change set(s), and {len(repository.topics)} Topic file(s)."
    )
    return EXIT_SUCCESS


def _run_lint(arguments: argparse.Namespace) -> int:
    repository = _repository(arguments.root)
    if not _validate_for_processing(repository):
        return EXIT_FAILURE
    warnings = lint_repository(repository)
    for warning in warnings:
        print(warning.format())
    print(f"Semantic lint produced {len(warnings)} advisory warning(s).")
    return EXIT_FAILURE if arguments.strict and warnings else EXIT_SUCCESS


def _run_backlinks(arguments: argparse.Namespace) -> int:
    repository = _repository(arguments.root)
    issues = validate_references(repository)
    for issue in issues:
        print(issue.format(), file=sys.stderr)
    if issues:
        return EXIT_FAILURE
    if arguments.target:
        links = backlinks_for(repository, arguments.target)
        for link in links:
            print(f"{link.target} <- {link.source} [{link.relation}; {link.edge_type}; {link.source_path}]")
        if not links:
            print(f"No backlinks for {arguments.target}.")
    if arguments.check:
        target = repository.system_root / "Views" / "backlinks.md"
        expected = generate_backlinks(repository)
        if not generated_is_current(GeneratedFile(target, expected, repository.root)):
            print("STALE KnowledgeSystem/Views/backlinks.md", file=sys.stderr)
            return EXIT_FAILURE
    if not arguments.target:
        print("Backlink graph references resolve.")
    return EXIT_SUCCESS


def _run_external(arguments: argparse.Namespace) -> int:
    repository = _repository(arguments.root)
    source_ids = arguments.source or [
        source_id
        for source_id, source in repository.sources.items()
        if isinstance(source, dict) and source.get("type") in {"gerrit", "forge"}
    ]
    source_ids = sorted(set(source_ids))
    unknown = [source_id for source_id in source_ids if source_id not in repository.sources]
    if unknown:
        raise KnowledgeError("External sources are not registered: " + ", ".join(unknown))
    fixture = load_fixture(arguments.fixture) if arguments.fixture else None
    observations = []
    failures = []
    for source_id in source_ids:
        try:
            observation = fixture[source_id] if fixture is not None else adapter_for(source_id).fetch(
                source_id, timeout=arguments.timeout
            )
        except (KeyError, KnowledgeError) as error:
            failures.append((source_id, str(error)))
            continue
        observations.append(observation.as_dict())
    print(json.dumps({"observations": observations}, indent=2, sort_keys=True, ensure_ascii=False))
    for source_id, message in failures:
        print(f"UNAVAILABLE {source_id}: {message}", file=sys.stderr)
    return EXIT_FAILURE if failures else EXIT_SUCCESS


def _run_prepare(arguments: argparse.Namespace) -> int:
    repository = _repository(arguments.root)
    handoff = prepare_minutes_handoff(repository, arguments.transcript)
    print("Transcript -> Meeting Minutes handoff prepared.")
    print(f"Transcript: {repository.relative(handoff.transcript)}")
    print("Canonical skill: .agents/skills/t3thi-meeting-minutes/SKILL.md")
    print(f"Expected reviewed Minutes: {repository.relative(handoff.minutes)}")
    print("This command does not execute an LLM or generate Minutes.")
    print("Use the canonical skill in an agent session, then review and correct the resulting Minutes.")
    print("HUMAN REVIEW REQUIRED before KnowledgeSystem/Tools/ingest-reviewed-meeting is eligible.")
    return EXIT_SUCCESS


def _run_ingest(arguments: argparse.Namespace) -> int:
    repository = _repository(arguments.root)
    handoff = ingest_handoff(repository, arguments.minutes, reviewed=arguments.reviewed)
    print("Reviewed Meeting -> Canonical Knowledge handoff prepared.")
    print(f"Reviewed Minutes: {repository.relative(handoff.minutes)} ({handoff.source_id})")
    print(f"Primary transcript: {repository.relative(handoff.transcript)}")
    print("Canonical instructions: KnowledgeSystem/Prompts/ingest-reviewed-meeting.md")
    print("Inputs: reviewed Minutes + primary transcript + KnowledgeSystem/Knowledge/items + KnowledgeSystem/Decisions + KnowledgeSystem/Knowledge/topics.")
    print("This command does not execute an LLM and does not mutate canonical knowledge.")
    print("Run the Stage 2 agent workflow, then review its semantic report and the complete Git diff.")
    print("HUMAN REVIEW REQUIRED for every proposed material semantic change.")
    return EXIT_SUCCESS


def run_cli(command: str, argv: Sequence[str] | None = None) -> int:
    parser = _build_parser(command)
    arguments = parser.parse_args(argv)
    try:
        if command in {"build-index", "build-views"}:
            return _run_build(command, arguments)
        if command == "validate":
            return _run_validate(arguments)
        if command == "lint-knowledge":
            return _run_lint(arguments)
        if command == "check-backlinks":
            return _run_backlinks(arguments)
        if command == "check-external-status":
            return _run_external(arguments)
        if command == "prepare-meeting-minutes":
            return _run_prepare(arguments)
        if command == "ingest-reviewed-meeting":
            return _run_ingest(arguments)
    except (MissingDependencyError, FrontmatterError, KnowledgeError, OSError, ValueError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return EXIT_SETUP_OR_USAGE
    raise AssertionError(f"unhandled command: {command}")
