"""Advisory, deterministic semantic heuristics.

These warnings are review aids. They never rewrite or remove canonical data and
must not be confused with schema or referential validation.
"""

from __future__ import annotations

import re
from difflib import SequenceMatcher
from typing import Any

from .repository import KnowledgeRepository
from .validate import Issue


def _normalized_claim(value: Any) -> str:
    if not isinstance(value, str):
        return ""
    return " ".join(re.findall(r"[a-z0-9]+", value.casefold()))


def _derived_sources(repository: KnowledgeRepository, source_id: str) -> set[str]:
    result: set[str] = set()
    pending = [source_id]
    while pending:
        current = pending.pop()
        source = repository.sources.get(current)
        if not isinstance(source, dict):
            continue
        for parent in source.get("derived_from", []):
            if not isinstance(parent, str):
                continue
            parent_id = parent.split("#", 1)[0]
            if parent_id not in result:
                result.add(parent_id)
                pending.append(parent_id)
    return result


def lint_repository(repository: KnowledgeRepository) -> list[Issue]:
    warnings: list[Issue] = []
    knowledge = repository.knowledge_by_id()
    topics = repository.topics_by_id_and_language()
    topic_current: set[str] = set()
    topic_history: set[str] = set()
    cutoff = repository.publication.get("external_status_verified_through")

    for source_id, source in sorted(repository.sources.items()):
        if not isinstance(source, dict) or source.get("type") not in {"gerrit", "forge"}:
            continue
        observed = source.get("observed_at")
        if not isinstance(observed, str) or (isinstance(cutoff, str) and observed < cutoff):
            detail = "has no observed_at value" if not isinstance(observed, str) else f"was observed at {observed}"
            warnings.append(
                Issue(
                    "warning",
                    "source.external-status-stale",
                    "KnowledgeSystem/Knowledge/sources.yaml",
                    f"{source_id} {detail}; publication cutoff is {cutoff}",
                )
            )

    for topic in repository.topics:
        path = repository.relative(topic.path)
        current = {value for value in topic.metadata.get("knowledge", []) if isinstance(value, str)}
        history = {value for value in topic.metadata.get("history", []) if isinstance(value, str)}
        topic_current.update(current)
        topic_history.update(history)
        for identifier in sorted(current | history):
            if identifier not in knowledge:
                warnings.append(
                    Issue(
                        "warning",
                        "topic.reference-missing",
                        path,
                        f"Topic references missing Knowledge {identifier}",
                    )
                )
        for identifier in sorted(current):
            item = knowledge.get(identifier)
            if item is not None and item.metadata.get("state") in {"superseded", "rejected"}:
                warnings.append(
                    Issue(
                        "warning",
                        "topic.historical-as-current",
                        path,
                        f"{identifier} is {item.metadata.get('state')} but appears in current knowledge",
                    )
                )
        if topic.metadata.get("language") == "de":
            source_updated = topic.metadata.get("source_updated")
            reviewed_at = topic.metadata.get("translation_reviewed_at")
            if not isinstance(reviewed_at, str):
                detail = "translation_reviewed_at is missing"
            elif isinstance(source_updated, str) and reviewed_at < source_updated:
                detail = f"translation was reviewed at {reviewed_at} before source update {source_updated}"
            else:
                detail = None
            if detail is not None:
                warnings.append(
                    Issue(
                        "warning",
                        "topic.translation-human-review",
                        path,
                        f"{detail}; semantic translation equivalence requires human review",
                    )
                )

    relation_targets: set[str] = set()
    answered: set[str] = set()
    for document in repository.knowledge:
        path = repository.relative(document.path)
        metadata = document.metadata
        identifier = metadata.get("id")
        evidence = [entry for entry in metadata.get("evidence", []) if isinstance(entry, dict)]
        if not evidence or not any(entry.get("source") and entry.get("location") for entry in evidence):
            warnings.append(
                Issue(
                    "warning",
                    "knowledge.provenance-weak",
                    path,
                    "Knowledge Object has no evidence entry with both source and meaningful location",
                )
            )

        evidence_sources = {
            entry["source"].split("#", 1)[0]
            for entry in evidence
            if isinstance(entry.get("source"), str)
        }
        for source_id in sorted(evidence_sources):
            overlap = _derived_sources(repository, source_id) & evidence_sources
            if overlap:
                warnings.append(
                    Issue(
                        "warning",
                        "evidence.derived-not-independent",
                        path,
                        f"{source_id} and its derivation source(s) {', '.join(sorted(overlap))} are not independent evidence",
                    )
                )

        for relation in metadata.get("relations", []):
            if not isinstance(relation, dict) or not isinstance(relation.get("target"), str):
                continue
            target = relation["target"]
            relation_targets.add(target)
            if relation.get("type") == "answers":
                answered.add(target)
            if relation.get("type") == "contradicts":
                other = knowledge.get(target)
                if metadata.get("state") == "active" and other is not None and other.metadata.get("state") == "active":
                    warnings.append(
                        Issue(
                            "warning",
                            "knowledge.active-contradiction",
                            path,
                            f"active {identifier} contradicts active {target}",
                        )
                    )

        for artifact in metadata.get("external_artifacts", []):
            if not isinstance(artifact, dict):
                continue
            verified = artifact.get("verified_at")
            if isinstance(cutoff, str) and isinstance(verified, str) and verified < cutoff:
                warnings.append(
                    Issue(
                        "warning",
                        "external.status-stale",
                        path,
                        f"{artifact.get('id')} was verified at {verified}, before publication cutoff {cutoff}",
                    )
                )

    for identifier, document in sorted(knowledge.items()):
        metadata = document.metadata
        topic_slug = metadata.get("topic")
        relevant_topic = topics.get((f"topic:{topic_slug}", "en")) if isinstance(topic_slug, str) else None
        expected_field = "history" if metadata.get("state") in {"superseded", "rejected"} else "knowledge"
        if relevant_topic is not None and identifier not in relevant_topic.metadata.get(expected_field, []):
            warnings.append(
                Issue(
                    "warning",
                    "knowledge.absent-from-relevant-topic",
                    repository.relative(document.path),
                    f"{identifier} is absent from {relevant_topic.metadata.get('id')} {expected_field}",
                )
            )
        if metadata.get("state") == "active" and identifier not in topic_current:
            warnings.append(
                Issue(
                    "warning",
                    "knowledge.absent-from-topic",
                    repository.relative(document.path),
                    f"active {identifier} is absent from every Topic current-knowledge list",
                )
            )
        if identifier not in topic_current and identifier not in topic_history and identifier not in relation_targets:
            warnings.append(
                Issue(
                    "warning",
                    "knowledge.orphan",
                    repository.relative(document.path),
                    f"{identifier} has no Topic placement or inbound semantic relation",
                )
            )
        if metadata.get("kind") == "question" and metadata.get("state") == "active" and identifier in answered:
            warnings.append(
                Issue(
                    "warning",
                    "question.apparently-answered",
                    repository.relative(document.path),
                    f"active question {identifier} is targeted by an answers relation",
                )
            )

    documents = sorted(repository.knowledge, key=lambda item: str(item.metadata.get("id", "")))
    for index, left in enumerate(documents):
        left_claim = _normalized_claim(left.metadata.get("summary"))
        if len(left_claim) < 32:
            continue
        for right in documents[index + 1 :]:
            right_claim = _normalized_claim(right.metadata.get("summary"))
            if len(right_claim) < 32:
                continue
            ratio = SequenceMatcher(None, left_claim, right_claim, autojunk=False).ratio()
            if ratio >= 0.92:
                warnings.append(
                    Issue(
                        "warning",
                        "knowledge.possible-duplicate",
                        repository.relative(right.path),
                        f"summary is {ratio:.0%} similar to {left.metadata.get('id')}",
                    )
                )

    for document in repository.decisions:
        evidence = document.metadata.get("evidence", [])
        if not isinstance(evidence, list) or not any(
            isinstance(entry, dict) and entry.get("source") and entry.get("location") for entry in evidence
        ):
            warnings.append(
                Issue(
                    "warning",
                    "decision.provenance-weak",
                    repository.relative(document.path),
                    "Decision Record has no evidence entry with both source and meaningful location",
                )
            )
        for artifact in document.metadata.get("external_artifacts", []):
            if not isinstance(artifact, dict):
                continue
            verified = artifact.get("verified_at")
            if not isinstance(verified, str) or (isinstance(cutoff, str) and verified < cutoff):
                detail = "has no verified_at value" if not isinstance(verified, str) else f"was verified at {verified}"
                warnings.append(
                    Issue(
                        "warning",
                        "decision.external-status-stale",
                        repository.relative(document.path),
                        f"{artifact.get('id')} {detail}; publication cutoff is {cutoff}",
                    )
                )

    return sorted(set(warnings))
