"""Repository discovery and canonical document loading."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Iterable

from .errors import KnowledgeError
from .markdown import MarkdownDocument, load_yaml_mapping, parse_markdown


SYSTEM_DIRECTORY = Path("KnowledgeSystem")


def find_repository_root(start: Path | None = None) -> Path:
    """Locate the Documentation repository without relying on process cwd."""

    current = (start or Path.cwd()).resolve()
    if current.is_file():
        current = current.parent
    if start is not None and (current / SYSTEM_DIRECTORY / "Knowledge" / "sources.yaml").is_file():
        return current
    for candidate in (current, *current.parents):
        if (candidate / ".git").exists() and (candidate / "MeetingMinutes").is_dir():
            return candidate
    module_root = Path(__file__).resolve().parents[3]
    if (module_root / "MeetingMinutes").is_dir():
        return module_root
    raise KnowledgeError("Could not locate the repository root")


def _documents(paths: Iterable[Path]) -> list[MarkdownDocument]:
    return [parse_markdown(path) for path in sorted(paths, key=lambda item: item.as_posix())]


@dataclass
class KnowledgeRepository:
    """Loaded canonical knowledge state for validation, lint and generation."""

    root: Path
    knowledge: list[MarkdownDocument] = field(default_factory=list)
    decisions: list[MarkdownDocument] = field(default_factory=list)
    changes: list[MarkdownDocument] = field(default_factory=list)
    topics: list[MarkdownDocument] = field(default_factory=list)
    registry: dict[str, Any] = field(default_factory=dict)

    @classmethod
    def load(cls, root: Path | None = None) -> "KnowledgeRepository":
        repository_root = find_repository_root(root)
        system_root = repository_root / SYSTEM_DIRECTORY
        registry_path = system_root / "Knowledge" / "sources.yaml"
        if not registry_path.is_file():
            raise KnowledgeError(f"Missing source registry: {registry_path.relative_to(repository_root)}")

        return cls(
            root=repository_root,
            knowledge=_documents((system_root / "Knowledge" / "items").glob("*.md")),
            decisions=_documents(
                path
                for path in (system_root / "Decisions").glob("*.md")
                if path.name != "index.md"
            ),
            changes=_documents(
                path
                for path in (system_root / "Changes").rglob("*.md")
                if path.name != "index.md"
            ),
            topics=_documents((system_root / "Knowledge" / "topics").glob("*.md")),
            registry=load_yaml_mapping(registry_path),
        )

    @property
    def sources(self) -> dict[str, Any]:
        sources = self.registry.get("sources", {})
        return sources if isinstance(sources, dict) else {}

    @property
    def system_root(self) -> Path:
        return self.root / SYSTEM_DIRECTORY

    @property
    def publication(self) -> dict[str, Any]:
        publication = self.registry.get("publication", {})
        return publication if isinstance(publication, dict) else {}

    def relative(self, path: Path) -> str:
        return path.resolve().relative_to(self.root.resolve()).as_posix()

    def knowledge_by_id(self) -> dict[str, MarkdownDocument]:
        return {
            value: document
            for document in self.knowledge
            if isinstance((value := document.metadata.get("id")), str)
        }

    def decisions_by_id(self) -> dict[str, MarkdownDocument]:
        return {
            value: document
            for document in self.decisions
            if isinstance((value := document.metadata.get("id")), str)
        }

    def topics_by_file_key(self) -> dict[str, MarkdownDocument]:
        return {document.path.stem: document for document in self.topics}

    def topics_by_id_and_language(self) -> dict[tuple[str, str], MarkdownDocument]:
        result: dict[tuple[str, str], MarkdownDocument] = {}
        for document in self.topics:
            identifier = document.metadata.get("id")
            language = document.metadata.get("language")
            if isinstance(identifier, str) and isinstance(language, str):
                result[(identifier, language)] = document
        return result
