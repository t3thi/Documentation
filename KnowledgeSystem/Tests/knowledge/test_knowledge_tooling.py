"""Executable contract tests for the Git-native Knowledge tooling.

The tests construct a complete, minimal repository in a temporary directory.
They exercise the real shared parsers and command entry points without reading
or mutating the initiative's canonical Knowledge state.
"""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
import tempfile
import textwrap
import unittest
from pathlib import Path


REPOSITORY_ROOT = Path(__file__).resolve().parents[3]
TOOLS_DIRECTORY = REPOSITORY_ROOT / "KnowledgeSystem" / "Tools"
FIXTURES_DIRECTORY = Path(__file__).resolve().parent / "fixtures"
sys.path.insert(0, str(TOOLS_DIRECTORY))

from _knowledge.errors import FrontmatterError  # noqa: E402
from _knowledge.generate import (  # noqa: E402
    apply_generated_files,
    generate_indexes,
    generate_views,
)
from _knowledge.graph import collect_backlinks  # noqa: E402
from _knowledge.lint import lint_repository  # noqa: E402
from _knowledge.markdown import (  # noqa: E402
    extract_section_to_eof,
    parse_markdown,
    section_digest,
)
from _knowledge.repository import KnowledgeRepository  # noqa: E402
from _knowledge.validate import validate_repository  # noqa: E402


def document(value: str) -> str:
    """Return a left-aligned UTF-8 fixture document with one final newline."""

    return textwrap.dedent(value).lstrip("\n").rstrip() + "\n"


class RepositoryFixture:
    """Create and mutate one isolated, schema-valid Knowledge repository."""

    def __init__(self, root: Path) -> None:
        self.root = root
        self._create()

    def path(self, relative: str) -> Path:
        return self.root / relative

    def write(self, relative: str, content: str) -> Path:
        target = self.path(relative)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8", newline="\n")
        return target

    def read(self, relative: str) -> str:
        return self.path(relative).read_text(encoding="utf-8")

    def replace(self, relative: str, old: str, new: str) -> None:
        source = self.read(relative)
        if old not in source:
            raise AssertionError(f"Fixture fragment not found in {relative}: {old!r}")
        self.write(relative, source.replace(old, new, 1))

    def repository(self) -> KnowledgeRepository:
        return KnowledgeRepository.load(self.root)

    def build(self) -> None:
        repository = self.repository()
        apply_generated_files(generate_indexes(repository), check=False)
        apply_generated_files(generate_views(repository), check=False)

    def run_tool(self, tool: str, *arguments: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(TOOLS_DIRECTORY / tool), *arguments],
            cwd=self.root,
            check=False,
            text=True,
            capture_output=True,
        )

    def _create(self) -> None:
        self.path(".git").mkdir()
        for relative in (
            ".agents/skills/t3thi-meeting-minutes",
            "KnowledgeSystem/Changes/2026",
            "KnowledgeSystem/Decisions",
            "KnowledgeSystem/Knowledge/items",
            "KnowledgeSystem/Knowledge/topics",
            "MeetingMinutes",
            "Transcripts",
            "KnowledgeSystem/Views",
        ):
            self.path(relative).mkdir(parents=True, exist_ok=True)
        shutil.copytree(
            REPOSITORY_ROOT / "KnowledgeSystem" / "Schemas",
            self.path("KnowledgeSystem/Schemas"),
        )

        self.write("README.md", "# Fixture repository\n")
        self.write(
            ".agents/skills/t3thi-meeting-minutes/SKILL.md",
            "# Synthetic fixture skill path\n",
        )
        shutil.copyfile(
            FIXTURES_DIRECTORY / "off-record-transcript.txt",
            self.path("Transcripts/source.txt"),
        )
        self.write("Transcripts/second.txt", "Synthetic second transcript.\n")
        self.write(
            "MeetingMinutes/source.md",
            document(
                """
                # Reviewed fixture meeting

                ## Topic 1: Durable fixture result

                The fixture result was reviewed.
                """
            ),
        )
        self.write(
            "KnowledgeSystem/Knowledge/sources.yaml",
            document(
                """
                version: 1
                publication:
                  last_updated: 2026-08-11
                  reviewed_transcripts_through: 2026-08-11
                  reviewed_minutes_through: 2026-08-11
                  external_status_verified_through: 2026-08-11
                sources:
                  architecture:test:
                    type: architecture
                    path: README.md
                    authority: repository-decision
                    availability: repository
                  skill:test:
                    type: skill
                    path: .agents/skills/t3thi-meeting-minutes/SKILL.md
                    authority: canonical-workflow
                    availability: repository
                  transcript:test:
                    type: transcript
                    path: Transcripts/source.txt
                    authority: primary-retained-meeting-source
                    availability: repository
                  transcript:second:
                    type: transcript
                    path: Transcripts/second.txt
                    authority: primary-retained-meeting-source
                    availability: repository
                  minutes:test:
                    type: meeting-minutes
                    path: MeetingMinutes/source.md
                    authority: reviewed-meeting-projection
                    availability: repository
                    derived_from:
                      - transcript:test
                    generated_with:
                      skill: skill:test
                    review_status: reviewed
                  gerrit:123:
                    type: gerrit
                    url: https://review.typo3.org/c/Packages/TYPO3.CMS/+/123
                    authority: external-current
                    availability: repository
                    status: merged
                    observed_at: 2026-08-11
                  forge:456:
                    type: forge
                    url: https://forge.typo3.org/issues/456
                    authority: external-current
                    availability: repository
                    status: resolved
                    observed_at: 2026-08-11
                """
            ),
        )
        self.write(
            "KnowledgeSystem/Knowledge/items/K-000001.md",
            document(
                """
                ---
                id: K-000001
                kind: finding
                state: active
                maturity: established
                title: A durable fixture finding
                topic: example
                responsibilities:
                  - structural-identity
                summary: >-
                  A technical connection can be retained while concrete fixture
                  structures differ.
                created: 2026-08-11
                updated: 2026-08-11
                evidence:
                  - source: transcript:test
                    location: "Fixture topic 1"
                    relation: establishes
                    summarized_in: minutes:test#topic-1-durable-fixture-result
                relations:
                  - type: supports
                    target: K-000002
                external_artifacts:
                  - id: gerrit:123
                    relation: implements
                    state: merged
                    verified_at: 2026-08-11
                review:
                  status: accepted
                  reviewed_at: 2026-08-11
                ---

                # A durable fixture finding

                ## Statement

                The fixture contains one durable finding.

                ## Rationale

                It exercises canonical parsing and cross-file references.

                ## Consequences

                Validation must accept this object.
                """
            ),
        )
        self.write(
            "KnowledgeSystem/Knowledge/items/K-000002.md",
            document(
                """
                ---
                id: K-000002
                kind: question
                state: active
                maturity: supported
                title: A fixture decision remains open
                topic: example
                responsibilities:
                  - output-policy
                summary: >-
                  Which output policy should the fixture choose?

                  It must retain the established | structural finding.
                created: 2026-08-11
                updated: 2026-08-11
                evidence:
                  - source: architecture:test
                    location: "Fixture repository"
                    relation: supports
                decision_required: true
                review:
                  status: accepted
                  reviewed_at: 2026-08-11
                ---

                # A fixture decision remains open

                ## Statement

                The fixture deliberately retains one open question.

                ## Rationale

                Open-question and decision-required views need an input.

                ## Consequences

                The generated registers include this object.
                """
            ),
        )
        self.write(
            "KnowledgeSystem/Decisions/D-000001-fixture-architecture.md",
            document(
                """
                ---
                id: D-000001
                status: accepted
                title: Use the fixture Knowledge architecture
                date: 2026-08-11
                scope: initiative-documentation
                authority: translation-handling-initiative
                evidence:
                  - source: architecture:test
                    location: "Fixture repository"
                    relation: establishes
                knowledge:
                  - K-000001
                ---

                # Use the fixture Knowledge architecture

                ## Context

                The executable tests need a valid Decision Record.

                ## Decision

                The temporary repository uses the canonical fixture structure.

                ## Alternatives considered

                An incomplete fixture was rejected for the test harness.

                ## Consequences

                Decision parsing and backlinks can be checked deterministically.
                """
            ),
        )
        self.write(
            "KnowledgeSystem/Changes/2026/2026-08-11.md",
            document(
                """
                ---
                date: 2026-08-11
                sources:
                  transcript: transcript:test
                  minutes: minutes:test
                review_status: accepted
                changes:
                  - id: CHG-2026-08-11-01
                    target: K-000001
                    operation: refine
                    before: The fixture proposition had broad scope.
                    after: The fixture proposition has explicit test scope.
                    evidence:
                      - transcript:test
                      - minutes:test#topic-1-durable-fixture-result
                    reason: The reviewed fixture narrowed the proposition.
                ---

                # Semantic changes from 2026-08-11

                ## CHG-2026-08-11-01

                ### Before

                The fixture proposition had broad scope.

                ### After

                The fixture proposition has explicit test scope.

                ### Evidence

                - transcript:test
                - minutes:test#topic-1-durable-fixture-result

                ### Reason

                The reviewed fixture narrowed the proposition.
                """
            ),
        )
        english_body = document(
            """
            Canonical fixture synthesis.

            ### Embedded publication heading

            This embedded heading is part of the synthesis and must not truncate
            section extraction.
            """
        )
        digest = section_digest(english_body)
        self.write(
            "KnowledgeSystem/Knowledge/topics/example.md",
            document(
                """
                ---
                id: topic:example
                title: Example
                language: en
                updated: 2026-08-11
                knowledge:
                  - K-000001
                  - K-000002
                history: []
                decisions:
                  - D-000001
                ---

                # Example

                ## Current synthesis
                """
            )
            + "\n"
            + english_body,
        )
        self.write(
            "KnowledgeSystem/Knowledge/topics/example.de.md",
            document(
                f"""
                ---
                id: topic:example
                title: Beispiel
                language: de
                updated: 2026-08-11
                knowledge:
                  - K-000001
                  - K-000002
                history: []
                decisions:
                  - D-000001
                translation_of: topic:example
                source_updated: 2026-08-11
                translation_reviewed_at: 2026-08-11
                source_digest: "{digest}"
                ---

                # Beispiel

                ## Aktuelle Synthese

                Kanonische Synthese der Testdaten.

                ### Eingebettete Publikationsueberschrift

                Auch diese Ueberschrift gehoert zur Synthese.
                """
            ),
        )
        self.write(
            "KnowledgeSystem/Views/current-state.template.md",
            document(
                """
                ---
                title: "Fixture Current State"
                updated: "{{ publication \"last_updated\" }}"
                ---

                # Fixture Current State

                {{ include-topic "example" section="Current synthesis" }}
                """
            ),
        )
        self.write(
            "KnowledgeSystem/Views/current-state.de.template.md",
            document(
                """
                ---
                title: "Test-Aktueller-Stand"
                updated: "{{ publication \"last_updated\" }}"
                ---

                # Test-Aktueller-Stand

                {{ include-topic "example" section="Aktuelle Synthese" }}
                """
            ),
        )
        self.build()


class KnowledgeToolingTestCase(unittest.TestCase):
    """Base case with one fresh temporary repository per test."""

    def setUp(self) -> None:
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary_directory.cleanup)
        self.fixture = RepositoryFixture(Path(self.temporary_directory.name))

    def issues(self, *, check_generated: bool = False):
        return validate_repository(
            self.fixture.repository(),
            check_generated=check_generated,
        )

    def assert_issue(self, code: str, issues=None) -> None:
        actual = self.issues() if issues is None else issues
        codes = [issue.code for issue in actual]
        self.assertIn(code, codes, [issue.format() for issue in actual])


class ValidationTests(KnowledgeToolingTestCase):
    def test_valid_knowledge_object_and_repository(self) -> None:
        parsed = parse_markdown(self.fixture.path("KnowledgeSystem/Knowledge/items/K-000001.md"))

        self.assertEqual("K-000001", parsed.metadata["id"])
        self.assertEqual("finding", parsed.metadata["kind"])
        self.assertEqual([], self.issues(check_generated=True))

    def test_invalid_kind(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/items/K-000001.md",
            "kind: finding",
            "kind: invalid-kind",
        )

        self.assert_issue("schema.compliance")

    def test_invalid_state(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/items/K-000001.md",
            "state: active",
            "state: invalid-state",
        )

        self.assert_issue("schema.compliance")

    def test_invalid_maturity(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/items/K-000001.md",
            "maturity: established",
            "maturity: invalid-maturity",
        )

        self.assert_issue("schema.compliance")

    def test_duplicate_knowledge_id(self) -> None:
        shutil.copyfile(
            self.fixture.path("KnowledgeSystem/Knowledge/items/K-000001.md"),
            self.fixture.path("KnowledgeSystem/Knowledge/items/K-999999.md"),
        )

        self.assert_issue("knowledge.duplicate-id")

    def test_missing_relation_target(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/items/K-000001.md",
            "target: K-000002",
            "target: K-999999",
        )

        self.assert_issue("knowledge.target-missing")

    def test_missing_evidence_source(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/items/K-000001.md",
            "source: transcript:test",
            "source: transcript:missing",
        )

        self.assert_issue("knowledge.evidence-missing")

    def test_summarized_in_requires_meeting_minutes_source(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/sources.yaml",
            "minutes:test:\n    type: meeting-minutes",
            "minutes:test:\n    type: architecture",
        )

        self.assert_issue("knowledge.summary-source-type")

    def test_invalid_derived_from_reference(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/sources.yaml",
            "- transcript:test",
            "- transcript:missing",
        )

        self.assert_issue("source.derived-from-missing")

    def test_meeting_minutes_require_exactly_one_derivation(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/sources.yaml",
            "derived_from:\n      - transcript:test",
            "derived_from:\n"
            "      - transcript:test\n"
            "      - transcript:second",
        )

        self.assert_issue("source.meeting-derived-count")

    def test_meeting_minutes_must_derive_from_transcript(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/sources.yaml",
            "- transcript:test",
            "- architecture:test",
        )

        self.assert_issue("source.meeting-derived-type")

    def test_meeting_minutes_generator_must_be_skill_source(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/sources.yaml",
            "skill:test:\n    type: skill",
            "skill:test:\n    type: architecture",
        )

        self.assert_issue("source.generated-skill-type")

    def test_source_derivation_cycle(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/sources.yaml",
            "path: Transcripts/source.txt\n"
            "    authority: primary-retained-meeting-source\n"
            "    availability: repository\n"
            "  transcript:second:",
            "path: Transcripts/source.txt\n"
            "    authority: primary-retained-meeting-source\n"
            "    availability: repository\n"
            "    derived_from:\n"
            "      - minutes:test\n"
            "  transcript:second:",
        )

        self.assert_issue("source.derivation-cycle")

    def test_duplicate_yaml_key_is_rejected(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/items/K-000001.md",
            "kind: finding",
            "kind: finding\nkind: behavior",
        )

        with self.assertRaisesRegex(FrontmatterError, "duplicate key 'kind'"):
            self.fixture.repository()

    def test_duplicate_source_registry_key_is_rejected(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/sources.yaml",
            "version: 1",
            "version: 1\nversion: 2",
        )

        with self.assertRaisesRegex(FrontmatterError, "duplicate key 'version'"):
            self.fixture.repository()

    def test_source_registry_schema_validation(self) -> None:
        self.assertFalse(
            [issue for issue in self.issues() if issue.path == "KnowledgeSystem/Knowledge/sources.yaml"]
        )
        self.fixture.replace("KnowledgeSystem/Knowledge/sources.yaml", "version: 1", "version: 0")

        self.assert_issue("schema.compliance")

    def test_invalid_null_list_reports_cleanly_without_traceback(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/items/K-000001.md",
            "relations:\n  - type: supports\n    target: K-000002",
            "relations: null",
        )

        result = self.fixture.run_tool(
            "validate",
            "--skip-generated",
            "--root",
            str(self.fixture.root),
        )

        self.assertEqual(1, result.returncode, result.stderr)
        self.assertIn("schema.compliance", result.stderr)
        self.assertIn("Validation failed", result.stderr)
        self.assertNotIn("Traceback", result.stderr)

    def test_invalid_null_mapping_reports_cleanly_without_traceback(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/sources.yaml",
            "generated_with:\n      skill: skill:test",
            "generated_with: null",
        )

        result = self.fixture.run_tool(
            "validate",
            "--skip-generated",
            "--root",
            str(self.fixture.root),
        )

        self.assertEqual(1, result.returncode, result.stderr)
        self.assertIn("schema.compliance", result.stderr)
        self.assertIn("Validation failed", result.stderr)
        self.assertNotIn("Traceback", result.stderr)

    def test_absent_local_restricted_transcript_remains_valid(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/sources.yaml",
            "path: Transcripts/source.txt\n"
            "    authority: primary-retained-meeting-source\n"
            "    availability: repository",
            "path: Transcripts/restricted-source.txt\n"
            "    authority: primary-retained-meeting-source\n"
            "    availability: local-restricted\n"
            "    reason: Pending explicit human confidentiality review.\n"
            "    sha256: sha256:0000000000000000000000000000000000000000000000000000000000000000",
        )

        source_issues = [
            issue
            for issue in self.issues()
            if issue.path == "KnowledgeSystem/Knowledge/sources.yaml"
        ]
        self.assertEqual([], source_issues, [issue.format() for issue in source_issues])

    def test_generated_with_skill_must_resolve(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/sources.yaml",
            "generated_with:\n      skill: skill:test",
            "generated_with:\n      skill: skill:missing",
        )

        self.assert_issue("source.generated-skill-missing")

    def test_summarized_in_fragment_must_resolve(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/items/K-000001.md",
            "minutes:test#topic-1-durable-fixture-result",
            "minutes:test#missing-topic",
        )

        self.assert_issue("knowledge.summary-anchor-missing")

    def test_knowledge_topic_must_resolve_to_english_topic(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/items/K-000001.md",
            "topic: example",
            "topic: missing-topic",
        )

        self.assert_issue("knowledge.topic-missing")

    def test_knowledge_cannot_supersede_decision(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/items/K-000001.md",
            "type: supports\n    target: K-000002",
            "type: supersedes\n    target: D-000001",
        )

        issues = self.issues()

        self.assert_issue("schema.compliance", issues)
        self.assert_issue("knowledge.supersedes-kind", issues)

    def test_required_knowledge_body_section_must_exist(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/items/K-000001.md",
            "## Consequences",
            "## Missing consequences",
        )

        self.assert_issue("knowledge.body-section-missing")

    def test_transcript_and_derived_minutes_are_not_independent(self) -> None:
        warnings = lint_repository(self.fixture.repository())
        self.assertNotIn(
            "evidence.derived-not-independent",
            [warning.code for warning in warnings],
        )
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/items/K-000001.md",
            "    summarized_in: minutes:test#topic-1-durable-fixture-result\nrelations:",
            "    summarized_in: minutes:test#topic-1-durable-fixture-result\n"
            "  - source: minutes:test\n"
            "    location: \"Fixture topic 1\"\n"
            "    relation: confirms\n"
            "relations:",
        )

        warnings = lint_repository(self.fixture.repository())

        self.assertIn(
            "evidence.derived-not-independent",
            [warning.code for warning in warnings],
        )

    def test_knowledge_must_appear_in_exact_relevant_topic_field(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/items/K-000001.md",
            "state: active",
            "state: superseded",
        )

        warnings = lint_repository(self.fixture.repository())

        self.assertIn(
            "knowledge.absent-from-relevant-topic",
            [warning.code for warning in warnings],
        )

    def test_registry_external_observation_staleness_is_reported(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/sources.yaml",
            "observed_at: 2026-08-11",
            "observed_at: 2026-08-10",
        )

        warnings = lint_repository(self.fixture.repository())

        self.assertIn(
            "source.external-status-stale",
            [warning.code for warning in warnings],
        )

    def test_decision_external_observation_staleness_is_reported(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Decisions/D-000001-fixture-architecture.md",
            "knowledge:\n  - K-000001",
            "external_artifacts:\n"
            "  - id: gerrit:123\n"
            "    relation: implements\n"
            "    state: merged\n"
            "    verified_at: 2026-08-10\n"
            "knowledge:\n"
            "  - K-000001",
        )

        warnings = lint_repository(self.fixture.repository())

        self.assertIn(
            "decision.external-status-stale",
            [warning.code for warning in warnings],
        )

    def test_decision_evidence_requires_meaningful_location(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Decisions/D-000001-fixture-architecture.md",
            "evidence:\n"
            "  - source: architecture:test\n"
            "    location: \"Fixture repository\"\n"
            "    relation: establishes",
            "evidence:\n"
            "  - source: architecture:test",
        )

        warnings = lint_repository(self.fixture.repository())

        self.assertIn(
            "decision.provenance-weak",
            [warning.code for warning in warnings],
        )

    def test_valid_decision_record(self) -> None:
        parsed = parse_markdown(
            self.fixture.path("KnowledgeSystem/Decisions/D-000001-fixture-architecture.md")
        )

        self.assertEqual("D-000001", parsed.metadata["id"])
        self.assertEqual("accepted", parsed.metadata["status"])
        self.assertFalse(
            [issue for issue in self.issues() if issue.path.startswith("KnowledgeSystem/Decisions/")]
        )


class ParsingTests(KnowledgeToolingTestCase):
    def test_topic_parsing(self) -> None:
        parsed = parse_markdown(self.fixture.path("KnowledgeSystem/Knowledge/topics/example.md"))

        self.assertEqual("topic:example", parsed.metadata["id"])
        self.assertEqual(["K-000001", "K-000002"], parsed.metadata["knowledge"])
        self.assertIn("## Current synthesis", parsed.body)

    def test_current_synthesis_extraction_keeps_embedded_headings(self) -> None:
        parsed = parse_markdown(self.fixture.path("KnowledgeSystem/Knowledge/topics/example.md"))

        synthesis = extract_section_to_eof(parsed.body, "Current synthesis")

        self.assertTrue(synthesis.startswith("Canonical fixture synthesis."))
        self.assertIn("### Embedded publication heading", synthesis)
        self.assertIn("must not truncate", synthesis)

    def test_semantic_change_parsing(self) -> None:
        parsed = parse_markdown(self.fixture.path("KnowledgeSystem/Changes/2026/2026-08-11.md"))
        change = parsed.metadata["changes"][0]

        self.assertEqual("CHG-2026-08-11-01", change["id"])
        self.assertEqual("K-000001", change["target"])
        self.assertEqual("refine", change["operation"])
        self.assertEqual("The fixture proposition had broad scope.", change["before"])
        self.assertIn("### After", parsed.body)
        self.assertFalse(
            [issue for issue in self.issues() if issue.path.startswith("KnowledgeSystem/Changes/")]
        )


class TranslationTests(KnowledgeToolingTestCase):
    def test_missing_german_counterpart(self) -> None:
        self.fixture.path("KnowledgeSystem/Knowledge/topics/example.de.md").unlink()

        self.assert_issue("topic.counterpart-missing")

    def test_german_included_knowledge_list_drift(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/topics/example.de.md",
            "knowledge:\n  - K-000001\n  - K-000002\nhistory:",
            "knowledge:\n  - K-000001\nhistory:",
        )

        self.assert_issue("topic.reference-drift")

    def test_german_source_digest_staleness(self) -> None:
        german = parse_markdown(self.fixture.path("KnowledgeSystem/Knowledge/topics/example.de.md"))
        old_digest = german.metadata["source_digest"]
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/topics/example.de.md",
            old_digest,
            "sha256:" + ("0" * 64),
        )

        self.assert_issue("topic.source-digest-stale")


class GenerationTests(KnowledgeToolingTestCase):
    def test_current_state_generation_is_deterministic(self) -> None:
        first = {
            generated.path.resolve().relative_to(self.fixture.root.resolve()): generated.content
            for generated in generate_views(self.fixture.repository())
        }
        second = {
            generated.path.resolve().relative_to(self.fixture.root.resolve()): generated.content
            for generated in generate_views(self.fixture.repository())
        }

        self.assertEqual(first, second)
        current_state = first[Path("MeetingMinutes/current-state.md")]
        self.assertIn("<!-- Generated by repository tooling. Do not edit directly. -->", current_state)
        self.assertIn("### Embedded publication heading", current_state)
        self.assertEqual([], apply_generated_files(generate_views(self.fixture.repository()), check=True))

    def test_generated_register_rows_are_single_line_valid_markdown(self) -> None:
        views = {
            generated.path.name: generated.content
            for generated in generate_views(self.fixture.repository())
        }

        for name in ("open-questions.md", "decisions-required.md"):
            with self.subTest(view=name):
                rows = [line for line in views[name].splitlines() if "K-000002" in line]
                self.assertEqual(1, len(rows), views[name])
                row = rows[0]
                self.assertIn(
                    "Which output policy should the fixture choose? It must retain",
                    row,
                )
                self.assertIn(r"\| structural finding", row)
                self.assertEqual(6, len(re.findall(r"(?<!\\)\|", row)), row)

    def test_backlink_generation_covers_supported_edge_types(self) -> None:
        links = {
            (link.target, link.source, link.edge_type, link.relation)
            for link in collect_backlinks(self.fixture.repository())
        }

        self.assertIn(("K-000002", "K-000001", "knowledge", "supports"), links)
        self.assertIn(("transcript:test", "K-000001", "evidence", "establishes"), links)
        self.assertIn(("minutes:test", "K-000001", "minutes", "summarizes"), links)
        self.assertIn(("gerrit:123", "K-000001", "external-artifact", "implements"), links)
        self.assertIn(("K-000001", "D-000001", "decision", "addresses"), links)
        self.assertIn(("K-000001", "topic:example[en]", "topic", "includes"), links)
        self.assertIn(("K-000001", "CHG-2026-08-11-01", "change", "refine"), links)

    def test_build_check_detects_drift_without_writing(self) -> None:
        cases = (
            ("build-index", "KnowledgeSystem/Knowledge/index.md"),
            ("build-views", "MeetingMinutes/current-state.md"),
        )
        for tool, generated_path in cases:
            with self.subTest(tool=tool):
                clean = self.fixture.run_tool(
                    tool,
                    "--check",
                    "--root",
                    str(self.fixture.root),
                )
                self.assertEqual(0, clean.returncode, clean.stderr)
                target = self.fixture.path(generated_path)
                target.write_text("stale fixture output\n", encoding="utf-8")
                before = target.read_bytes()

                stale = self.fixture.run_tool(
                    tool,
                    "--check",
                    "--root",
                    str(self.fixture.root),
                )

                self.assertEqual(1, stale.returncode, stale.stderr)
                self.assertIn("STALE", stale.stderr)
                self.assertEqual(before, target.read_bytes(), "--check mutated a generated file")
                rebuilt = self.fixture.run_tool(tool, "--root", str(self.fixture.root))
                self.assertEqual(0, rebuilt.returncode, rebuilt.stderr)

    def test_multiline_unresolved_template_directive_is_rejected(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Views/current-state.template.md",
            '{{ include-topic "example" section="Current synthesis" }}',
            "{{ unresolved\n  directive }}",
        )

        result = self.fixture.run_tool(
            "build-views",
            "--root",
            str(self.fixture.root),
        )

        self.assertEqual(2, result.returncode, result.stderr)
        self.assertIn("Unresolved or multiline template directive", result.stderr)
        self.assertNotIn("Traceback", result.stderr)

    def test_generated_symlink_target_cannot_escape_repository(self) -> None:
        with tempfile.TemporaryDirectory() as outside_directory:
            outside = Path(outside_directory) / "outside.md"
            outside.write_text("outside sentinel\n", encoding="utf-8")
            generated = self.fixture.path("KnowledgeSystem/Knowledge/index.md")
            generated.unlink()
            generated.symlink_to(outside)

            result = self.fixture.run_tool(
                "build-index",
                "--root",
                str(self.fixture.root),
            )

            self.assertEqual(2, result.returncode, result.stderr)
            self.assertIn("must not be a symlink", result.stderr)
            self.assertEqual("outside sentinel\n", outside.read_text(encoding="utf-8"))

    def test_off_record_fixture_is_never_copied_by_deterministic_helpers(self) -> None:
        marker = "SYNTHETIC-CONFIDENTIAL-MARKER-7F3C9A"
        self.assertIn(marker, self.fixture.read("Transcripts/source.txt"))
        generated = [
            *generate_indexes(self.fixture.repository()),
            *generate_views(self.fixture.repository()),
        ]

        for output in generated:
            with self.subTest(output=output.path.name):
                self.assertNotIn(marker, output.content)


class ExternalStatusTests(KnowledgeToolingTestCase):
    def test_external_status_cli_uses_gerrit_and_forge_fixture_offline(self) -> None:
        result = self.fixture.run_tool(
            "check-external-status",
            "--fixture",
            str(FIXTURES_DIRECTORY / "external-status.json"),
            "--root",
            str(self.fixture.root),
        )

        self.assertEqual(0, result.returncode, result.stderr)
        self.assertEqual("", result.stderr)
        observations = {
            item["source"]: item
            for item in json.loads(result.stdout)["observations"]
        }
        self.assertEqual({"forge:456", "gerrit:123"}, set(observations))
        self.assertEqual("resolved", observations["forge:456"]["status"])
        self.assertEqual("merged", observations["gerrit:123"]["status"])
        self.assertEqual(
            "0123456789abcdef",
            observations["gerrit:123"]["revision"],
        )


class MeetingWorkflowTests(KnowledgeToolingTestCase):
    def test_ingest_rejects_non_skill_generator_source(self) -> None:
        self.fixture.replace(
            "KnowledgeSystem/Knowledge/sources.yaml",
            "skill:test:\n    type: skill",
            "skill:test:\n    type: architecture",
        )

        result = self.fixture.run_tool(
            "ingest-reviewed-meeting",
            "MeetingMinutes/source.md",
            "--reviewed",
            "--root",
            str(self.fixture.root),
        )

        self.assertEqual(2, result.returncode, result.stderr)
        self.assertIn(
            "minutes:test generated_with.skill 'skill:test' must reference a registered type: skill source",
            result.stderr,
        )
        self.assertNotIn("Traceback", result.stderr)


if __name__ == "__main__":
    unittest.main()
