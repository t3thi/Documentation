"""Canonical forward-edge discovery and deterministic reverse inspection."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Iterable

from .repository import KnowledgeRepository


@dataclass(frozen=True, order=True)
class Backlink:
    """A reverse edge: ``source`` references ``target``."""

    target: str
    source: str
    edge_type: str
    relation: str
    source_path: str


def _string_values(value: Any) -> Iterable[str]:
    if isinstance(value, str):
        yield value
    elif isinstance(value, list):
        for item in value:
            if isinstance(item, str):
                yield item


def collect_backlinks(repository: KnowledgeRepository) -> list[Backlink]:
    """Discover the supported reverse edges without interpreting prose links."""

    links: set[Backlink] = set()

    for document in repository.knowledge:
        metadata = document.metadata
        source_id = str(metadata.get("id", document.path.stem))
        source_path = repository.relative(document.path)

        for relation in metadata.get("relations", []):
            if not isinstance(relation, dict):
                continue
            target = relation.get("target")
            relation_type = relation.get("type", "related_to")
            if isinstance(target, str):
                links.add(Backlink(target, source_id, "knowledge", str(relation_type), source_path))

        for evidence in metadata.get("evidence", []):
            if not isinstance(evidence, dict):
                continue
            evidence_source = evidence.get("source")
            if isinstance(evidence_source, str):
                links.add(
                    Backlink(
                        evidence_source.split("#", 1)[0],
                        source_id,
                        "evidence",
                        str(evidence.get("relation", "supports")),
                        source_path,
                    )
                )
            summarized_in = evidence.get("summarized_in")
            if isinstance(summarized_in, str):
                links.add(
                    Backlink(summarized_in.split("#", 1)[0], source_id, "minutes", "summarizes", source_path)
                )

        for artifact in metadata.get("external_artifacts", []):
            if not isinstance(artifact, dict):
                continue
            artifact_id = artifact.get("id")
            if isinstance(artifact_id, str):
                links.add(
                    Backlink(
                        artifact_id,
                        source_id,
                        "external-artifact",
                        str(artifact.get("relation", "related_to")),
                        source_path,
                    )
                )

    for document in repository.decisions:
        metadata = document.metadata
        source_id = str(metadata.get("id", document.path.stem))
        source_path = repository.relative(document.path)
        for target in _string_values(metadata.get("knowledge")):
            links.add(Backlink(target, source_id, "decision", "addresses", source_path))
        for relation in metadata.get("relations", []):
            if isinstance(relation, dict) and isinstance(relation.get("target"), str):
                links.add(
                    Backlink(
                        relation["target"],
                        source_id,
                        "decision",
                        str(relation.get("type", "related_to")),
                        source_path,
                    )
                )

    for document in repository.changes:
        entries = document.metadata.get("changes")
        if not isinstance(entries, list):
            continue
        source_path = repository.relative(document.path)
        for change in entries:
            if not isinstance(change, dict):
                continue
            source_id = change.get("id")
            target = change.get("target")
            operation = change.get("operation")
            if (
                not isinstance(source_id, str)
                or not isinstance(target, str)
                or not isinstance(operation, str)
            ):
                continue
            links.add(Backlink(target, source_id, "change", operation, source_path))

    for document in repository.topics:
        metadata = document.metadata
        topic_id = str(metadata.get("id", document.path.stem))
        language = str(metadata.get("language", "und"))
        source_id = f"{topic_id}[{language}]"
        source_path = repository.relative(document.path)
        for target in _string_values(metadata.get("knowledge")):
            links.add(Backlink(target, source_id, "topic", "includes", source_path))
        for target in _string_values(metadata.get("decisions")):
            links.add(Backlink(target, source_id, "topic", "includes", source_path))

    return sorted(links)


def backlinks_for(repository: KnowledgeRepository, target: str) -> list[Backlink]:
    return [link for link in collect_backlinks(repository) if link.target == target]
