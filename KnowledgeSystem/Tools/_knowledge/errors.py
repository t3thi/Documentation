"""Error types shared by the knowledge commands."""


class KnowledgeError(Exception):
    """A deterministic knowledge-tooling error suitable for CLI output."""


class MissingDependencyError(KnowledgeError):
    """A required, declared Python dependency is not installed."""


class FrontmatterError(KnowledgeError):
    """A Markdown document has missing or malformed YAML frontmatter."""


class BuildMismatchError(KnowledgeError):
    """A generated file differs from its deterministic expected content."""
