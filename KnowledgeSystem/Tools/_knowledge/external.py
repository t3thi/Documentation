"""Explicit live/fixture adapters for volatile TYPO3 external status.

Ordinary validation and publication generation never import or invoke these
adapters. Live URLs are constructed from typed registry IDs, not from untrusted
source URLs, which keeps this opt-in command on known authoritative hosts.
"""

from __future__ import annotations

import json
import re
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Protocol

from .errors import KnowledgeError


@dataclass(frozen=True)
class ExternalObservation:
    source_id: str
    system: str
    status: str
    title: str
    revision: str | None = None
    updated_at: str | None = None

    def as_dict(self) -> dict[str, Any]:
        result: dict[str, Any] = {
            "source": self.source_id,
            "system": self.system,
            "status": self.status,
            "title": self.title,
        }
        if self.revision is not None:
            result["revision"] = self.revision
        if self.updated_at is not None:
            result["updated_at"] = self.updated_at
        return result


class StatusAdapter(Protocol):
    def fetch(self, source_id: str, *, timeout: float) -> ExternalObservation: ...


def _request_json(url: str, *, timeout: float, gerrit_xssi: bool = False) -> dict[str, Any]:
    request = urllib.request.Request(
        url,
        headers={
            "Accept": "application/json",
            "User-Agent": "t3thi-git-native-knowledge-status-checker/1",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            payload = response.read().decode("utf-8")
    except (urllib.error.URLError, TimeoutError, OSError) as error:
        raise KnowledgeError(f"external request failed for {url}: {error}") from error
    if gerrit_xssi and payload.startswith(")]}'"):
        payload = payload.split("\n", 1)[1] if "\n" in payload else ""
    try:
        value = json.loads(payload)
    except json.JSONDecodeError as error:
        raise KnowledgeError(f"external service returned invalid JSON for {url}") from error
    if not isinstance(value, dict):
        raise KnowledgeError(f"external service returned an unexpected JSON shape for {url}")
    return value


class GerritAdapter:
    pattern = re.compile(r"^gerrit:(\d+)$")

    def fetch(self, source_id: str, *, timeout: float) -> ExternalObservation:
        match = self.pattern.fullmatch(source_id)
        if match is None:
            raise KnowledgeError(f"invalid TYPO3 Gerrit source ID: {source_id}")
        change = match.group(1)
        encoded = urllib.parse.quote(change, safe="")
        payload = _request_json(
            f"https://review.typo3.org/changes/{encoded}?o=CURRENT_REVISION",
            timeout=timeout,
            gerrit_xssi=True,
        )
        return ExternalObservation(
            source_id=source_id,
            system="gerrit",
            status=str(payload.get("status", "unknown")).casefold(),
            title=str(payload.get("subject", "")),
            revision=payload.get("current_revision") if isinstance(payload.get("current_revision"), str) else None,
            updated_at=payload.get("updated") if isinstance(payload.get("updated"), str) else None,
        )


class ForgeAdapter:
    pattern = re.compile(r"^forge:(\d+)$")

    def fetch(self, source_id: str, *, timeout: float) -> ExternalObservation:
        match = self.pattern.fullmatch(source_id)
        if match is None:
            raise KnowledgeError(f"invalid TYPO3 Forge source ID: {source_id}")
        issue = match.group(1)
        payload = _request_json(
            f"https://forge.typo3.org/issues/{issue}.json",
            timeout=timeout,
        )
        issue_data = payload.get("issue")
        if not isinstance(issue_data, dict):
            raise KnowledgeError(f"TYPO3 Forge returned no issue object for {source_id}")
        status_data = issue_data.get("status")
        status = status_data.get("name") if isinstance(status_data, dict) else "unknown"
        return ExternalObservation(
            source_id=source_id,
            system="forge",
            status=str(status).casefold(),
            title=str(issue_data.get("subject", "")),
            updated_at=issue_data.get("updated_on") if isinstance(issue_data.get("updated_on"), str) else None,
        )


def adapter_for(source_id: str) -> StatusAdapter:
    if source_id.startswith("gerrit:"):
        return GerritAdapter()
    if source_id.startswith("forge:"):
        return ForgeAdapter()
    raise KnowledgeError(f"no external status adapter for {source_id}")


def load_fixture(path: Path) -> dict[str, ExternalObservation]:
    """Load deterministic observations keyed by canonical source ID."""

    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise KnowledgeError(f"could not read external-status fixture {path}: {error}") from error
    if not isinstance(payload, dict):
        raise KnowledgeError("external-status fixture must be an object keyed by source ID")
    observations: dict[str, ExternalObservation] = {}
    for source_id, value in payload.items():
        if not isinstance(source_id, str) or not isinstance(value, dict):
            raise KnowledgeError("external-status fixture entries must be objects keyed by source ID")
        system = source_id.split(":", 1)[0]
        observations[source_id] = ExternalObservation(
            source_id=source_id,
            system=str(value.get("system", system)),
            status=str(value.get("status", "unknown")),
            title=str(value.get("title", "")),
            revision=value.get("revision") if isinstance(value.get("revision"), str) else None,
            updated_at=value.get("updated_at") if isinstance(value.get("updated_at"), str) else None,
        )
    return observations
