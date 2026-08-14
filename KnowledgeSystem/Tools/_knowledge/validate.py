"""Hard structural and referential validation for canonical knowledge."""

from __future__ import annotations

import hashlib
import json
import urllib.parse
from collections import Counter
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable

from .dependencies import require_jsonschema
from .generate import generate_indexes, generate_views, generated_is_current
from .markdown import extract_bounded_section, extract_section_to_eof, heading_anchors, section_digest
from .repository import KnowledgeRepository


@dataclass(frozen=True, order=True)
class Issue:
    severity: str
    code: str
    path: str
    message: str

    def format(self) -> str:
        return f"{self.severity.upper()} [{self.code}] {self.path}: {self.message}"


SCHEMA_FILES = {
    "knowledge": "knowledge.schema.json",
    "decision": "decision.schema.json",
    "change": "change-set.schema.json",
    "topic": "topic.schema.json",
    "registry": "source-registry.schema.json",
}


def _relative(repository: KnowledgeRepository, path: Path) -> str:
    try:
        return repository.relative(path)
    except ValueError:
        return str(path)


def _json_path(parts: Iterable[Any]) -> str:
    result = "$"
    for part in parts:
        result += f"[{part}]" if isinstance(part, int) else f".{part}"
    return result


def _list(value: Any) -> list[Any]:
    """Return schema-shaped list data without trusting unvalidated YAML."""

    return value if isinstance(value, list) else []


def _load_schemas(repository: KnowledgeRepository) -> dict[str, dict[str, Any]]:
    schemas: dict[str, dict[str, Any]] = {}
    for name, filename in SCHEMA_FILES.items():
        path = repository.system_root / "Schemas" / filename
        with path.open(encoding="utf-8") as handle:
            schema = json.load(handle)
        if not isinstance(schema, dict):
            raise ValueError(f"{path}: schema root must be an object")
        schemas[name] = schema
    return schemas


def _schema_issues(repository: KnowledgeRepository) -> list[Issue]:
    jsonschema = require_jsonschema()
    issues: list[Issue] = []
    try:
        schemas = _load_schemas(repository)
    except (OSError, json.JSONDecodeError, ValueError) as error:
        return [Issue("error", "schema.load", "KnowledgeSystem/Schemas", str(error))]

    targets: list[tuple[str, str, dict[str, Any]]] = [
        ("registry", "KnowledgeSystem/Knowledge/sources.yaml", repository.registry),
    ]
    targets.extend(("knowledge", repository.relative(item.path), item.metadata) for item in repository.knowledge)
    targets.extend(("decision", repository.relative(item.path), item.metadata) for item in repository.decisions)
    targets.extend(("change", repository.relative(item.path), item.metadata) for item in repository.changes)
    targets.extend(("topic", repository.relative(item.path), item.metadata) for item in repository.topics)

    for schema_name, path, instance in targets:
        schema = schemas[schema_name]
        try:
            jsonschema.Draft202012Validator.check_schema(schema)
            validator = jsonschema.Draft202012Validator(
                schema,
                format_checker=jsonschema.FormatChecker(),
            )
        except jsonschema.exceptions.SchemaError as error:
            issues.append(Issue("error", "schema.invalid", f"KnowledgeSystem/Schemas/{SCHEMA_FILES[schema_name]}", error.message))
            continue
        for error in sorted(
            validator.iter_errors(instance),
            key=lambda item: tuple(str(part) for part in item.absolute_path),
        ):
            issues.append(
                Issue(
                    "error",
                    "schema.compliance",
                    path,
                    f"{_json_path(error.absolute_path)}: {error.message}",
                )
            )
    return issues


def _duplicate_issues(repository: KnowledgeRepository) -> list[Issue]:
    issues: list[Issue] = []
    for label, documents in (("knowledge", repository.knowledge), ("decision", repository.decisions)):
        values = [item.metadata.get("id") for item in documents if isinstance(item.metadata.get("id"), str)]
        for identifier, count in sorted(Counter(values).items()):
            if count > 1:
                issues.append(
                    Issue("error", f"{label}.duplicate-id", label.title(), f"ID {identifier} occurs {count} times")
                )

    topic_keys = [
        (item.metadata.get("id"), item.metadata.get("language"))
        for item in repository.topics
        if isinstance(item.metadata.get("id"), str) and isinstance(item.metadata.get("language"), str)
    ]
    for (identifier, language), count in sorted(Counter(topic_keys).items()):
        if count > 1:
            issues.append(
                Issue(
                    "error",
                    "topic.duplicate-id-language",
                    "KnowledgeSystem/Knowledge/topics",
                    f"Topic {identifier} ({language}) occurs {count} times",
                )
            )

    changes = [
        change.get("id")
        for document in repository.changes
        for change in _list(document.metadata.get("changes"))
        if isinstance(change, dict) and isinstance(change.get("id"), str)
    ]
    for identifier, count in sorted(Counter(changes).items()):
        if count > 1:
            issues.append(
                Issue("error", "change.duplicate-id", "KnowledgeSystem/Changes", f"Change ID {identifier} occurs {count} times")
            )
    return issues


def _safe_local_path(repository: KnowledgeRepository, source_id: str, value: str) -> tuple[Path | None, Issue | None]:
    candidate = Path(value)
    if candidate.is_absolute():
        return None, Issue(
            "error", "source.path.absolute", "KnowledgeSystem/Knowledge/sources.yaml", f"{source_id}: path must be repository-relative"
        )
    root = repository.root.resolve()
    resolved = (root / candidate).resolve()
    try:
        resolved.relative_to(root)
    except ValueError:
        return None, Issue(
            "error", "source.path.escape", "KnowledgeSystem/Knowledge/sources.yaml", f"{source_id}: path escapes the repository"
        )
    return resolved, None


def _source_issues(repository: KnowledgeRepository) -> list[Issue]:
    issues: list[Issue] = []
    sources = repository.sources
    for source_id, source in sorted(sources.items(), key=lambda item: str(item[0])):
        if not isinstance(source, dict):
            continue
        derived_from = _list(source.get("derived_from"))
        for parent in derived_from:
            if isinstance(parent, str) and parent.split("#", 1)[0] not in sources:
                issues.append(
                    Issue(
                        "error",
                        "source.derived-from-missing",
                        "KnowledgeSystem/Knowledge/sources.yaml",
                        f"{source_id}: derived source {parent!r} is not registered",
                    )
                )

        generated_with = source.get("generated_with")
        if isinstance(generated_with, dict):
            skill = generated_with.get("skill")
            if isinstance(skill, str) and skill not in sources:
                issues.append(
                    Issue(
                        "error",
                        "source.generated-skill-missing",
                        "KnowledgeSystem/Knowledge/sources.yaml",
                        f"{source_id}: generated_with skill {skill!r} is not registered",
                    )
                )
            elif isinstance(skill, str):
                skill_source = sources.get(skill)
                if not isinstance(skill_source, dict) or skill_source.get("type") != "skill":
                    issues.append(
                        Issue(
                            "error",
                            "source.generated-skill-type",
                            "KnowledgeSystem/Knowledge/sources.yaml",
                            f"{source_id}: generated_with skill {skill!r} must reference a type: skill source",
                        )
                    )

        if source.get("type") == "meeting-minutes":
            if len(derived_from) != 1:
                issues.append(
                    Issue(
                        "error",
                        "source.meeting-derived-count",
                        "KnowledgeSystem/Knowledge/sources.yaml",
                        f"{source_id}: meeting-minutes must derive from exactly one transcript",
                    )
                )
            elif isinstance(derived_from[0], str):
                transcript_id = derived_from[0].split("#", 1)[0]
                transcript_source = sources.get(transcript_id)
                if not isinstance(transcript_source, dict) or transcript_source.get("type") != "transcript":
                    issues.append(
                        Issue(
                            "error",
                            "source.meeting-derived-type",
                            "KnowledgeSystem/Knowledge/sources.yaml",
                            f"{source_id}: derived source {transcript_id!r} must have type: transcript",
                        )
                    )

        path_value = source.get("path")
        if not isinstance(path_value, str):
            continue
        resolved, path_issue = _safe_local_path(repository, source_id, path_value)
        if path_issue is not None:
            issues.append(path_issue)
            continue
        assert resolved is not None
        availability = source.get("availability", "repository")
        if not resolved.is_file():
            if availability == "repository":
                issues.append(
                    Issue(
                        "error",
                        "source.path-missing",
                        "KnowledgeSystem/Knowledge/sources.yaml",
                        f"{source_id}: required repository source does not exist at {path_value}",
                    )
                )
            continue

        expected_digest = source.get("sha256")
        if isinstance(expected_digest, str):
            actual_digest = "sha256:" + hashlib.sha256(resolved.read_bytes()).hexdigest()
            if expected_digest != actual_digest:
                issues.append(
                    Issue(
                        "error",
                        "source.digest-mismatch",
                        "KnowledgeSystem/Knowledge/sources.yaml",
                        f"{source_id}: expected {expected_digest}, got {actual_digest}",
                    )
                )

    # Detect derivation cycles without assigning semantic independence scores.
    visiting: set[str] = set()
    visited: set[str] = set()

    def visit(source_id: str, trail: tuple[str, ...]) -> None:
        if source_id in visiting:
            cycle = " -> ".join((*trail, source_id))
            issues.append(Issue("error", "source.derivation-cycle", "KnowledgeSystem/Knowledge/sources.yaml", cycle))
            return
        if source_id in visited:
            return
        visiting.add(source_id)
        source = sources.get(source_id, {})
        if isinstance(source, dict):
            for parent in _list(source.get("derived_from")):
                if isinstance(parent, str) and parent.split("#", 1)[0] in sources:
                    visit(parent.split("#", 1)[0], (*trail, source_id))
        visiting.remove(source_id)
        visited.add(source_id)

    for source_id in sorted(sources, key=str):
        visit(source_id, ())
    return issues


def _source_reference(
    repository: KnowledgeRepository,
    path: str,
    value: Any,
    code: str,
    *,
    check_fragment: bool = False,
) -> Issue | None:
    if not isinstance(value, str):
        return None
    source_id = value.split("#", 1)[0]
    if source_id not in repository.sources:
        return Issue("error", code, path, f"source {value!r} is not registered")
    if check_fragment and "#" in value:
        fragment = urllib.parse.unquote(value.split("#", 1)[1])
        source = repository.sources[source_id]
        source_path = source.get("path") if isinstance(source, dict) else None
        if isinstance(source_path, str):
            resolved, path_issue = _safe_local_path(repository, source_id, source_path)
            if path_issue is not None:
                return path_issue
            if resolved is not None and resolved.is_file():
                try:
                    source_text = resolved.read_text(encoding="utf-8")
                except UnicodeDecodeError:
                    return Issue("error", code, path, f"source {source_id} is not valid UTF-8")
                anchors = heading_anchors(source_text)
                if fragment not in anchors:
                    return Issue(
                        "error",
                        "knowledge.summary-anchor-missing",
                        path,
                        f"fragment #{fragment} does not resolve in {source_path}",
                    )
    return None


def _source_ancestors(repository: KnowledgeRepository, source_id: str) -> set[str]:
    ancestors: set[str] = set()
    pending = [source_id]
    while pending:
        current = pending.pop()
        source = repository.sources.get(current)
        if not isinstance(source, dict):
            continue
        for parent in _list(source.get("derived_from")):
            if not isinstance(parent, str):
                continue
            parent_id = parent.split("#", 1)[0]
            if parent_id not in ancestors:
                ancestors.add(parent_id)
                pending.append(parent_id)
    return ancestors


def _reference_issues(repository: KnowledgeRepository) -> list[Issue]:
    issues: list[Issue] = []
    knowledge = repository.knowledge_by_id()
    decisions = repository.decisions_by_id()
    known_targets = {**knowledge, **decisions}

    for document in repository.knowledge:
        path = repository.relative(document.path)
        identifier = document.metadata.get("id")
        for evidence in _list(document.metadata.get("evidence")):
            if not isinstance(evidence, dict):
                continue
            issue = _source_reference(repository, path, evidence.get("source"), "knowledge.evidence-missing")
            if issue:
                issues.append(issue)
            issue = _source_reference(
                repository,
                path,
                evidence.get("summarized_in"),
                "knowledge.summary-source-missing",
                check_fragment=True,
            )
            if issue:
                issues.append(issue)
            evidence_source = evidence.get("source")
            summarized_in = evidence.get("summarized_in")
            if isinstance(evidence_source, str) and isinstance(summarized_in, str):
                evidence_id = evidence_source.split("#", 1)[0]
                summary_id = summarized_in.split("#", 1)[0]
                evidence_registry_source = repository.sources.get(evidence_id)
                summary_source = repository.sources.get(summary_id)
                if (
                    isinstance(evidence_registry_source, dict)
                    and evidence_registry_source.get("type") != "transcript"
                ):
                    issues.append(
                        Issue(
                            "error",
                            "knowledge.summary-evidence-type",
                            path,
                            f"summarized meeting evidence {evidence_id} must have type: transcript",
                        )
                    )
                if isinstance(summary_source, dict) and summary_source.get("type") != "meeting-minutes":
                    issues.append(
                        Issue(
                            "error",
                            "knowledge.summary-source-type",
                            path,
                            f"summarized_in source {summary_id} must have type: meeting-minutes",
                        )
                    )
                if (
                    isinstance(summary_source, dict)
                    and summary_source.get("type") == "meeting-minutes"
                    and evidence_id not in _source_ancestors(repository, summary_id)
                ):
                    issues.append(
                        Issue(
                            "error",
                            "knowledge.summary-derivation-mismatch",
                            path,
                            f"{summary_id} is not derived from evidence source {evidence_id}",
                        )
                    )
        for relation in _list(document.metadata.get("relations")):
            if not isinstance(relation, dict):
                continue
            target = relation.get("target")
            if target == identifier:
                issues.append(Issue("error", "knowledge.self-relation", path, f"{identifier} relates to itself"))
            elif isinstance(target, str) and target not in known_targets:
                issues.append(Issue("error", "knowledge.target-missing", path, f"target {target} does not exist"))
            if relation.get("type") == "supersedes" and isinstance(target, str):
                if target not in knowledge:
                    issues.append(
                        Issue(
                            "error",
                            "knowledge.supersedes-kind",
                            path,
                            f"Knowledge lifecycle relation may only supersede another Knowledge Object, got {target}",
                        )
                    )
                else:
                    target_state = knowledge[target].metadata.get("state")
                    if target_state != "superseded":
                        issues.append(
                            Issue(
                                "error",
                                "knowledge.supersedes-state",
                                path,
                                f"superseded target {target} has state {target_state!r}",
                            )
                        )
        for artifact in _list(document.metadata.get("external_artifacts")):
            if isinstance(artifact, dict):
                issue = _source_reference(
                    repository,
                    path,
                    artifact.get("id"),
                    "knowledge.external-source-missing",
                )
                if issue:
                    issues.append(issue)

        topic = document.metadata.get("topic")
        if isinstance(topic, str) and (f"topic:{topic}", "en") not in repository.topics_by_id_and_language():
            issues.append(
                Issue(
                    "error",
                    "knowledge.topic-missing",
                    path,
                    f"declared English Topic topic:{topic} does not exist",
                )
            )

    for document in repository.decisions:
        path = repository.relative(document.path)
        identifier = document.metadata.get("id")
        for evidence in _list(document.metadata.get("evidence")):
            if isinstance(evidence, dict):
                issue = _source_reference(repository, path, evidence.get("source"), "decision.evidence-missing")
                if issue:
                    issues.append(issue)
                issue = _source_reference(
                    repository,
                    path,
                    evidence.get("summarized_in"),
                    "decision.summary-source-missing",
                    check_fragment=True,
                )
                if issue:
                    issues.append(issue)
        for target in _list(document.metadata.get("knowledge")):
            if isinstance(target, str) and target not in knowledge:
                issues.append(Issue("error", "decision.knowledge-missing", path, f"Knowledge {target} does not exist"))
        for relation in _list(document.metadata.get("relations")):
            if not isinstance(relation, dict):
                continue
            target = relation.get("target")
            if target == identifier:
                issues.append(Issue("error", "decision.self-relation", path, f"{identifier} relates to itself"))
            elif isinstance(target, str) and target not in known_targets:
                issues.append(Issue("error", "decision.target-missing", path, f"target {target} does not exist"))
        for target in _list(document.metadata.get("supersedes")):
            if target == identifier:
                issues.append(Issue("error", "decision.self-supersedes", path, f"{identifier} supersedes itself"))
            elif isinstance(target, str) and target not in decisions:
                issues.append(Issue("error", "decision.supersedes-missing", path, f"Decision {target} does not exist"))
            elif isinstance(target, str) and decisions[target].metadata.get("status") != "superseded":
                issues.append(
                    Issue(
                        "error",
                        "decision.supersedes-status",
                        path,
                        f"superseded Decision {target} has status {decisions[target].metadata.get('status')!r}",
                    )
                )
        for artifact in _list(document.metadata.get("external_artifacts")):
            if isinstance(artifact, dict):
                issue = _source_reference(
                    repository,
                    path,
                    artifact.get("id"),
                    "decision.external-source-missing",
                )
                if issue:
                    issues.append(issue)

    for document in repository.changes:
        path = repository.relative(document.path)
        sources = document.metadata.get("sources", {})
        if isinstance(sources, dict):
            for value in sources.values():
                values = value if isinstance(value, list) else [value]
                for source in values:
                    issue = _source_reference(repository, path, source, "change.source-missing")
                    if issue:
                        issues.append(issue)
        for change in _list(document.metadata.get("changes")):
            if not isinstance(change, dict):
                continue
            target = change.get("target")
            if isinstance(target, str) and target not in known_targets:
                issues.append(Issue("error", "change.target-missing", path, f"target {target} does not exist"))
            for evidence in _list(change.get("evidence")):
                source_value = evidence.get("source") if isinstance(evidence, dict) else evidence
                issue = _source_reference(repository, path, source_value, "change.evidence-missing")
                if issue:
                    issues.append(issue)

    topic_pairs = repository.topics_by_id_and_language()
    for document in repository.topics:
        path = repository.relative(document.path)
        metadata = document.metadata
        identifier = metadata.get("id")
        language = metadata.get("language")
        for target in _list(metadata.get("knowledge")):
            if isinstance(target, str) and target not in knowledge:
                issues.append(Issue("error", "topic.knowledge-missing", path, f"Knowledge {target} does not exist"))
        for target in _list(metadata.get("decisions")):
            if isinstance(target, str) and target not in decisions:
                issues.append(Issue("error", "topic.decision-missing", path, f"Decision {target} does not exist"))
        for target in _list(metadata.get("history")):
            if not isinstance(target, str):
                continue
            if target not in knowledge:
                issues.append(Issue("error", "topic.history-missing", path, f"Knowledge {target} does not exist"))
            elif knowledge[target].metadata.get("state") not in {"superseded", "rejected"}:
                issues.append(
                    Issue(
                        "error",
                        "topic.history-current",
                        path,
                        f"historical Knowledge {target} must be superseded or rejected",
                    )
                )

        if not isinstance(identifier, str) or language not in {"en", "de"}:
            continue
        counterpart_language = "de" if language == "en" else "en"
        counterpart = topic_pairs.get((identifier, counterpart_language))
        if counterpart is None:
            issues.append(
                Issue(
                    "error",
                    "topic.counterpart-missing",
                    path,
                    f"missing {counterpart_language} counterpart for {identifier}",
                )
            )
            continue
        if language == "de":
            english = counterpart
            if metadata.get("translation_of") != identifier:
                issues.append(
                    Issue("error", "topic.translation-of", path, f"translation_of must be {identifier!r}")
                )
            for field in ("knowledge", "decisions", "history"):
                if metadata.get(field, []) != english.metadata.get(field, []):
                    issues.append(
                        Issue("error", "topic.reference-drift", path, f"{field} differs from the English Topic")
                    )
            if metadata.get("source_updated") != english.metadata.get("updated"):
                issues.append(
                    Issue("error", "topic.source-updated-stale", path, "source_updated differs from English updated")
                )
            try:
                english_synthesis = extract_section_to_eof(english.body, "Current synthesis")
                digest = section_digest(english_synthesis)
            except Exception as error:  # converted to a path-specific hard issue
                issues.append(Issue("error", "topic.synthesis", repository.relative(english.path), str(error)))
            else:
                if metadata.get("source_digest") != digest:
                    issues.append(
                        Issue(
                            "error",
                            "topic.source-digest-stale",
                            path,
                            f"source_digest must be {digest}",
                        )
                    )

    return issues


def _body_contract_issues(repository: KnowledgeRepository) -> list[Issue]:
    issues: list[Issue] = []
    contracts = [
        (
            repository.knowledge,
            "knowledge",
            ("Statement", "Rationale", "Consequences"),
        ),
        (
            repository.decisions,
            "decision",
            ("Context", "Decision", "Alternatives considered", "Consequences"),
        ),
    ]
    for documents, kind, sections in contracts:
        for document in documents:
            path = repository.relative(document.path)
            for section in sections:
                try:
                    content = extract_bounded_section(document.body, section)
                except Exception as error:
                    issues.append(Issue("error", f"{kind}.body-section-missing", path, str(error)))
                    continue
                if not content.strip():
                    issues.append(
                        Issue(
                            "error",
                            f"{kind}.body-section-empty",
                            path,
                            f"section ## {section} must contain prose",
                        )
                    )
    return issues


def validate_references(repository: KnowledgeRepository) -> list[Issue]:
    """Validate canonical graph edges for the dedicated backlink command."""

    return sorted(set([*_schema_issues(repository), *_reference_issues(repository)]))


def _policy_issues(repository: KnowledgeRepository) -> list[Issue]:
    issues: list[Issue] = []
    for document in repository.knowledge:
        metadata = document.metadata
        if metadata.get("decision_required") is True and (
            metadata.get("kind") != "question" or metadata.get("state") != "active"
        ):
            issues.append(
                Issue(
                    "error",
                    "knowledge.decision-required-classification",
                    repository.relative(document.path),
                    "decision_required is only valid for an active question",
                )
            )
    return issues


def _template_issues(repository: KnowledgeRepository) -> list[Issue]:
    issues: list[Issue] = []
    try:
        generated = [*generate_indexes(repository), *generate_views(repository)]
    except Exception as error:
        return [Issue("error", "generation.failed", "Views", str(error))]
    for item in generated:
        try:
            current = generated_is_current(item)
        except Exception as error:
            issues.append(Issue("error", "generation.unsafe-target", _relative(repository, item.path), str(error)))
            continue
        if not current:
            issues.append(
                Issue(
                    "error",
                    "generation.stale",
                    _relative(repository, item.path),
                    "generated output differs; run the corresponding build tool",
                )
            )
    return issues


def validate_repository(
    repository: KnowledgeRepository,
    *,
    check_generated: bool = True,
) -> list[Issue]:
    """Return every deterministic hard validation issue in stable order."""

    schema_issues = _schema_issues(repository)
    issues = [
        *schema_issues,
        *_duplicate_issues(repository),
        *_source_issues(repository),
        *_reference_issues(repository),
        *_policy_issues(repository),
        *_body_contract_issues(repository),
    ]
    if check_generated and not schema_issues:
        issues.extend(_template_issues(repository))
    return sorted(set(issues))
