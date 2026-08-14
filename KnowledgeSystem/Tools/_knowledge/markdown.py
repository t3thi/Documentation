"""One frontmatter and Markdown-section parser for all knowledge tooling."""

from __future__ import annotations

import hashlib
import html
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from .dependencies import require_yaml
from .errors import FrontmatterError


FRONTMATTER_BOUNDARY = "---"
FENCE_PATTERN = re.compile(r"^[ \t]{0,3}(`{3,}|~{3,})")


@dataclass(frozen=True)
class MarkdownDocument:
    """A parsed Markdown document and its repository-relative identity."""

    path: Path
    metadata: dict[str, Any]
    body: str
    text: str


@dataclass(frozen=True)
class AtxHeading:
    line_index: int
    level: int
    title: str
    anchor: str


def normalize_newlines(value: str) -> str:
    """Normalize text to LF without otherwise changing its contents."""

    return value.replace("\r\n", "\n").replace("\r", "\n")


def _yaml_loader(yaml: Any) -> type:
    """Return a SafeLoader variant that preserves ISO dates as strings."""

    class StringDateSafeLoader(yaml.SafeLoader):
        pass

    StringDateSafeLoader.yaml_implicit_resolvers = {
        key: list(value) for key, value in yaml.SafeLoader.yaml_implicit_resolvers.items()
    }
    for first_character, resolvers in StringDateSafeLoader.yaml_implicit_resolvers.items():
        StringDateSafeLoader.yaml_implicit_resolvers[first_character] = [
            resolver
            for resolver in resolvers
            if resolver[0] != "tag:yaml.org,2002:timestamp"
        ]

    def construct_unique_mapping(loader: Any, node: Any, deep: bool = False) -> dict[Any, Any]:
        loader.flatten_mapping(node)
        mapping: dict[Any, Any] = {}
        for key_node, value_node in node.value:
            key = loader.construct_object(key_node, deep=deep)
            try:
                duplicate = key in mapping
            except TypeError as error:
                raise yaml.constructor.ConstructorError(
                    "while constructing a mapping",
                    node.start_mark,
                    "found an unhashable mapping key",
                    key_node.start_mark,
                ) from error
            if duplicate:
                raise yaml.constructor.ConstructorError(
                    "while constructing a mapping",
                    node.start_mark,
                    f"found duplicate key {key!r}",
                    key_node.start_mark,
                )
            mapping[key] = loader.construct_object(value_node, deep=deep)
        return mapping

    StringDateSafeLoader.add_constructor(
        yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG,
        construct_unique_mapping,
    )
    return StringDateSafeLoader


def split_frontmatter(text: str, *, source: str = "<memory>") -> tuple[str, str]:
    """Split a frontmatter document into raw YAML and Markdown body."""

    normalized = normalize_newlines(text)
    lines = normalized.splitlines(keepends=True)
    if not lines or lines[0].rstrip("\n") != FRONTMATTER_BOUNDARY:
        raise FrontmatterError(f"{source}: missing opening YAML frontmatter boundary")

    closing_index: int | None = None
    for index, line in enumerate(lines[1:], start=1):
        if line.rstrip("\n") == FRONTMATTER_BOUNDARY:
            closing_index = index
            break
    if closing_index is None:
        raise FrontmatterError(f"{source}: missing closing YAML frontmatter boundary")

    raw_yaml = "".join(lines[1:closing_index])
    body = "".join(lines[closing_index + 1 :])
    return raw_yaml, body


def parse_markdown(path: Path) -> MarkdownDocument:
    """Read and parse one UTF-8 Markdown file with YAML frontmatter."""

    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError as error:
        raise FrontmatterError(f"{path}: file is not valid UTF-8") from error

    raw_yaml, body = split_frontmatter(text, source=str(path))
    yaml = require_yaml()
    try:
        metadata = yaml.load(raw_yaml, Loader=_yaml_loader(yaml))
    except yaml.YAMLError as error:
        problem = getattr(error, "problem", str(error))
        raise FrontmatterError(f"{path}: invalid YAML frontmatter: {problem}") from error
    if not isinstance(metadata, dict):
        raise FrontmatterError(f"{path}: YAML frontmatter must be a mapping")

    return MarkdownDocument(
        path=path,
        metadata=metadata,
        body=normalize_newlines(body),
        text=normalize_newlines(text),
    )


def load_yaml_mapping(path: Path) -> dict[str, Any]:
    """Load a standalone UTF-8 YAML mapping using the shared loader."""

    yaml = require_yaml()
    try:
        raw = path.read_text(encoding="utf-8")
    except UnicodeDecodeError as error:
        raise FrontmatterError(f"{path}: file is not valid UTF-8") from error
    try:
        value = yaml.load(raw, Loader=_yaml_loader(yaml))
    except yaml.YAMLError as error:
        problem = getattr(error, "problem", str(error))
        raise FrontmatterError(f"{path}: invalid YAML: {problem}") from error
    if not isinstance(value, dict):
        raise FrontmatterError(f"{path}: YAML root must be a mapping")
    return value


def _fence_marker(line: str) -> tuple[str, int] | None:
    match = FENCE_PATTERN.match(line)
    if match is None:
        return None
    run = match.group(1)
    return run[0], len(run)


def _is_closing_fence(line: str, character: str, minimum_length: int) -> bool:
    return re.fullmatch(
        rf"[ \t]{{0,3}}{re.escape(character)}{{{minimum_length},}}[ \t]*",
        line,
    ) is not None


def _github_anchor(title: str) -> str:
    value = html.unescape(title).casefold()
    value = re.sub(r"!?\[([^]]*)\]\([^)]*\)", r"\1", value)
    value = re.sub(r"<[^>]+>", "", value)
    value = value.replace("`", "")
    value = "".join(character for character in value if character.isalnum() or character in "-_ " or character.isspace())
    return re.sub(r"\s+", "-", value.strip())


def iter_atx_headings(body: str) -> list[AtxHeading]:
    """Collect ATX headings and GitHub-style anchors outside code fences."""

    headings: list[AtxHeading] = []
    anchor_counts: dict[str, int] = {}
    fence_character: str | None = None
    fence_length = 0
    pattern = re.compile(r"^[ \t]{0,3}(#{1,6})[ \t]+(.+?)[ \t]*$")
    for index, line in enumerate(normalize_newlines(body).splitlines()):
        marker = _fence_marker(line)
        if fence_character is None and marker is not None:
            fence_character, fence_length = marker
            continue
        if fence_character is not None:
            if _is_closing_fence(line, fence_character, fence_length):
                fence_character = None
                fence_length = 0
            continue
        match = pattern.fullmatch(line)
        if match is None:
            continue
        raw_title = re.sub(r"[ \t]+#+[ \t]*$", "", match.group(2)).strip()
        base_anchor = _github_anchor(raw_title)
        duplicate_index = anchor_counts.get(base_anchor, 0)
        anchor_counts[base_anchor] = duplicate_index + 1
        anchor = base_anchor if duplicate_index == 0 else f"{base_anchor}-{duplicate_index}"
        headings.append(AtxHeading(index, len(match.group(1)), raw_title, anchor))
    return headings


def heading_anchors(body: str) -> set[str]:
    return {heading.anchor for heading in iter_atx_headings(body)}


def find_heading_line(body: str, heading: str, *, level: int = 2) -> int:
    """Find an exact ATX heading outside fenced code blocks.

    The returned value is the zero-based line index. Topic syntheses may embed
    arbitrary Current State headings after this marker, so callers deliberately
    extract through EOF instead of treating later headings as section bounds.
    """

    expected = f"{'#' * level} {heading}"
    for item in iter_atx_headings(body):
        if item.level == level and item.title == heading:
            return item.line_index
    raise FrontmatterError(f"missing exact Markdown section heading: {expected}")


def normalize_section(value: str) -> str:
    """Normalize a synthesis section for publication and digesting.

    Exactly one blank immediately after the marker is structural and removed;
    trailing whitespace-only lines are collapsed to exactly one final newline.
    Content indentation and embedded headings remain byte-stable otherwise.
    """

    normalized = normalize_newlines(value)
    normalized = re.sub(r"^[ \t]*\n", "", normalized, count=1)
    return normalized.rstrip("\n") + "\n"


def extract_section_to_eof(body: str, heading: str, *, level: int = 2) -> str:
    """Extract an exact named section marker through EOF, fence-aware."""

    lines = normalize_newlines(body).splitlines(keepends=True)
    marker_index = find_heading_line(body, heading, level=level)
    return normalize_section("".join(lines[marker_index + 1 :]))


def extract_bounded_section(body: str, heading: str, *, level: int = 2) -> str:
    """Extract a conventional section until the next same/higher heading."""

    lines = normalize_newlines(body).splitlines(keepends=True)
    headings = iter_atx_headings(body)
    matches = [item for item in headings if item.level == level and item.title == heading]
    if not matches:
        raise FrontmatterError(f"missing exact Markdown section heading: {'#' * level} {heading}")
    start = matches[0]
    end = len(lines)
    for item in headings:
        if item.line_index > start.line_index and item.level <= level:
            end = item.line_index
            break
    return normalize_section("".join(lines[start.line_index + 1 : end]))


def section_digest(section: str) -> str:
    """Return the canonical SHA-256 digest for normalized synthesis prose."""

    normalized = normalize_section(section)
    return "sha256:" + hashlib.sha256(normalized.encode("utf-8")).hexdigest()
