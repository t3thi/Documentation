"""Deterministic handoffs around the two human-gated semantic stages."""

from __future__ import annotations

import hashlib
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from .errors import KnowledgeError
from .repository import KnowledgeRepository


DATE_PATTERN = re.compile(r"(?<!\d)(\d{4})-(\d{2})-(\d{2})(?!\d)")


@dataclass(frozen=True)
class MeetingHandoff:
    transcript: Path
    minutes: Path
    source_id: str | None = None


def _inside_root(repository: KnowledgeRepository, path: Path) -> Path:
    resolved = path.resolve()
    try:
        resolved.relative_to(repository.root.resolve())
    except ValueError as error:
        raise KnowledgeError(f"Path must remain inside the repository: {path}") from error
    return resolved


def _resolve_input(repository: KnowledgeRepository, value: Path) -> Path:
    candidate = value if value.is_absolute() else repository.root / value
    resolved = _inside_root(repository, candidate)
    if not resolved.is_file():
        raise KnowledgeError(f"Input file does not exist: {resolved}")
    return resolved


def expected_minutes_path(repository: KnowledgeRepository, transcript: Path) -> Path:
    match = DATE_PATTERN.search(transcript.name)
    if match is None:
        raise KnowledgeError("Transcript filename must contain an ISO meeting date (YYYY-MM-DD)")
    year, month, day = match.groups()
    month_directory = repository.root / "MeetingMinutes" / "Weekly" / year / month
    if month_directory.is_dir() and any(path.name == f"{day}.md" for path in month_directory.glob("*.md")):
        return month_directory / f"{day}.md"
    if year >= "2026":
        return month_directory / f"{day}.md"
    return month_directory / f"{year}-{month}-{day}.md"


def prepare_minutes_handoff(repository: KnowledgeRepository, transcript_value: Path) -> MeetingHandoff:
    transcript = _resolve_input(repository, transcript_value)
    if transcript.suffix.casefold() not in {".txt", ".md", ".srt", ".vtt"}:
        raise KnowledgeError("Transcript must be a text transcript (.txt, .md, .srt, or .vtt)")
    return MeetingHandoff(transcript=transcript, minutes=expected_minutes_path(repository, transcript))


def _source_for_path(repository: KnowledgeRepository, path: Path) -> tuple[str, dict[str, Any]]:
    relative = repository.relative(path)
    matches = [
        (source_id, source)
        for source_id, source in repository.sources.items()
        if isinstance(source, dict) and source.get("path") == relative
    ]
    if len(matches) != 1:
        raise KnowledgeError(
            f"Expected exactly one source-registry entry for {relative}, found {len(matches)}"
        )
    return matches[0]


def ingest_handoff(
    repository: KnowledgeRepository,
    minutes_value: Path,
    *,
    reviewed: bool,
) -> MeetingHandoff:
    if not reviewed:
        raise KnowledgeError(
            "Refusing semantic ingestion handoff without --reviewed. Human review of the Meeting Minutes is mandatory."
        )
    minutes = _resolve_input(repository, minutes_value)
    minutes_source_id, minutes_source = _source_for_path(repository, minutes)
    if minutes_source.get("type") != "meeting-minutes":
        raise KnowledgeError(f"{minutes_source_id} is not registered as meeting-minutes")
    if minutes_source.get("review_status") != "reviewed":
        raise KnowledgeError(
            f"{minutes_source_id} is not marked review_status: reviewed in KnowledgeSystem/Knowledge/sources.yaml"
        )

    derived_from = minutes_source.get("derived_from")
    if not isinstance(derived_from, list) or len(derived_from) != 1 or not isinstance(derived_from[0], str):
        raise KnowledgeError(
            f"{minutes_source_id} must derive from exactly one registered transcript"
        )
    transcript_id = derived_from[0].split("#", 1)[0]
    transcript_source = repository.sources.get(transcript_id)
    if not isinstance(transcript_source, dict) or transcript_source.get("type") != "transcript":
        raise KnowledgeError(
            f"{minutes_source_id} derived_from {transcript_id} must reference a registered type: transcript source"
        )

    generated_with = minutes_source.get("generated_with")
    skill_id = generated_with.get("skill") if isinstance(generated_with, dict) else None
    skill_source = repository.sources.get(skill_id) if isinstance(skill_id, str) else None
    if not isinstance(skill_id, str) or not isinstance(skill_source, dict) or skill_source.get("type") != "skill":
        raise KnowledgeError(
            f"{minutes_source_id} generated_with.skill {skill_id!r} must reference a registered type: skill source"
        )

    transcript_path = transcript_source.get("path")
    if not isinstance(transcript_path, str):
        raise KnowledgeError(f"{transcript_id} has no explicit local path")
    transcript = _inside_root(repository, repository.root / transcript_path)
    if not transcript.is_file():
        availability = transcript_source.get("availability", "repository")
        raise KnowledgeError(
            f"Transcript {transcript_id} is unavailable at {transcript_path} "
            f"(availability={availability}). Stage 2 requires the primary transcript locally."
        )
    expected_digest = transcript_source.get("sha256")
    if isinstance(expected_digest, str):
        actual_digest = "sha256:" + hashlib.sha256(transcript.read_bytes()).hexdigest()
        if actual_digest != expected_digest:
            raise KnowledgeError(
                f"Transcript digest mismatch for {transcript_id}: expected {expected_digest}, got {actual_digest}"
            )
    return MeetingHandoff(transcript=transcript, minutes=minutes, source_id=minutes_source_id)
