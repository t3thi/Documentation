"""Lazy imports with actionable setup guidance.

Keeping these imports lazy lets every command explain how to bootstrap the
tooling even when a fresh checkout has no Python packages installed yet.
"""

from __future__ import annotations

from types import ModuleType

from .errors import MissingDependencyError


SETUP_GUIDANCE = "Install tooling dependencies with: python3 -m pip install -r KnowledgeSystem/requirements.txt"


def _missing(package: str) -> MissingDependencyError:
    return MissingDependencyError(f"Missing Python dependency '{package}'. {SETUP_GUIDANCE}")


def require_yaml() -> ModuleType:
    try:
        import yaml
    except ModuleNotFoundError as error:
        raise _missing("PyYAML") from error
    return yaml


def require_jsonschema() -> ModuleType:
    try:
        import jsonschema
    except ModuleNotFoundError as error:
        raise _missing("jsonschema") from error
    return jsonschema
