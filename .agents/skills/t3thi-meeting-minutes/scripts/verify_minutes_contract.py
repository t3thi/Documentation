#!/usr/bin/env python3
"""Verify the stable T3THI minutes output contract against a local fixture."""

from __future__ import annotations

import re
import unicodedata
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parent
SKILL_ROOT = SCRIPT_DIR.parent
FIXTURE_PATH = SKILL_ROOT / "evals" / "files" / "valid-minutes.md"
BACK_LINK = "https://notes.typo3.org/s/f3ae8fZSD"
HUDDLE_URL = "https://app.slack.com/huddle/T024TUMLZ/C05D7UF1L8M"
FORBIDDEN_HEADINGS = [
    "## Action Points",
    "## Action Items",
    "## Next Steps",
    "## Summary",
    "## Conclusion",
]
FORBIDDEN_FRAGMENTS = [
    "End of meeting minutes",
    "(guest)",
    "Wir ",
    "wir ",
]


def assert_true(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def sort_key(value: str) -> str:
    return unicodedata.normalize("NFKD", value).casefold()


def extract_frontmatter(text: str) -> tuple[str, str]:
    match = re.match(r"^---\n(.*?)\n---\n\n", text, re.DOTALL)
    assert_true(match is not None, "Missing YAML frontmatter")
    return match.group(0), match.group(1)


def parse_list(block: str, label: str) -> list[str]:
    lines = [line for line in block.splitlines() if line.strip()]
    names = []
    for line in lines:
        assert_true(line.startswith("    - "), f"{label} list indentation drifted")
        names.append(line[6:])
    assert_true(names == sorted(names, key=sort_key), f"{label} list is not sorted")
    return names


def validate_text(text: str) -> None:
    _, frontmatter = extract_frontmatter(text)
    title_match = re.search(r'^title: "(\d{4}-\d{2}-\d{2}) - Translation Handling Initiative - Team Meeting Minutes"$', frontmatter, re.MULTILINE)
    tags_match = re.search(r'^tags: "Meeting"$', frontmatter, re.MULTILINE)
    assert_true(title_match is not None, "Frontmatter title drifted")
    assert_true(tags_match is not None, "Frontmatter tags drifted")
    date_value = title_match.group(1)

    assert_true(
        "# Translation Handling Initiative<br>Team Meeting Minutes" in text,
        "Main heading drifted",
    )
    assert_true(
        f"[<- Back to the overview]({BACK_LINK})" not in text,
        "Back link should keep the arrow glyph",
    )
    assert_true(
        f"[<- Back to the overview]({BACK_LINK})" not in text,
        "Back link arrow drifted",
    )
    assert_true(
        f"[← Back to the overview]({BACK_LINK})" in text,
        "Back link URL drifted",
    )
    assert_true(
        f"- **Date:** {date_value}<br>" in text,
        "Date line drifted from frontmatter title",
    )
    assert_true(
        f"- **Where:** [Slack Huddle]({HUDDLE_URL})" in text,
        "Slack Huddle link drifted",
    )

    participants_match = re.search(
        r"- \*\*Participants:\*\*\n((?:    - .+\n)+)- \*\*No participation:\*\*\n((?:    - .+\n)+)",
        text,
    )
    assert_true(participants_match is not None, "Participant blocks are malformed")
    participants = parse_list(participants_match.group(1), "Participants")
    no_participation = parse_list(participants_match.group(2), "No participation")
    overlap = set(participants) & set(no_participation)
    assert_true(not overlap, "Participants and No participation overlap")

    assert_true(not re.search(r"^# Topic ", text, re.MULTILINE), "Topic headings must not use h1")
    assert_true(not re.search(r"^### Topic ", text, re.MULTILINE), "Topic headings must not use h3")
    topic_matches = re.findall(r"^## Topic (\d+): (.+)$", text, re.MULTILINE)
    assert_true(topic_matches, "Missing topic headings")
    expected_numbers = [str(index) for index in range(1, len(topic_matches) + 1)]
    assert_true(
        [number for number, _title in topic_matches] == expected_numbers,
        "Topic numbering is not sequential",
    )
    for _number, title in topic_matches:
        assert_true(title[:1].isupper(), "Topic title should start with an uppercase letter")

    for heading in FORBIDDEN_HEADINGS:
        assert_true(heading not in text, f"Forbidden heading present: {heading}")
    for fragment in FORBIDDEN_FRAGMENTS:
        assert_true(fragment not in text, f"Forbidden fragment present: {fragment}")

    assert_true("`sys_language_uid`" in text, "Missing backticked technical identifier")
    assert_true("[#92580](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92580)" in text, "Missing inline Gerrit link")
    assert_true("[Forge ticket #108358](https://forge.typo3.org/issues/108358)" in text, "Missing inline Forge link")
    assert_true("We discussed" not in text, "First-person prose is not allowed")
    assert_true("## Topic 1:" in text, "Topic 1 heading missing")


def expect_failure(label: str, text: str, expected_message: str) -> None:
    try:
        validate_text(text)
    except AssertionError as exc:
        assert_true(expected_message in str(exc), f"{label} failed with unexpected message: {exc}")
        return
    raise AssertionError(f"{label} should fail validation")


def main() -> None:
    text = FIXTURE_PATH.read_text(encoding="utf-8")
    validate_text(text)

    expect_failure(
        "unsorted participants",
        text.replace("    - Andre Buchmann\n    - Astrid Haubold\n", "    - Astrid Haubold\n    - Andre Buchmann\n"),
        "Participants list is not sorted",
    )
    expect_failure(
        "forbidden summary heading",
        text.replace("## Topic 2: Translation Handling Follow-Up", "## Summary"),
        "Forbidden heading present: ## Summary",
    )
    expect_failure(
        "broken huddle link",
        text.replace(HUDDLE_URL, "https://example.invalid/huddle"),
        "Slack Huddle link drifted",
    )
    expect_failure(
        "first person prose",
        text.replace("Eric explained", "We discussed"),
        "First-person prose is not allowed",
    )

    print("Verified T3THI minutes contract.")


if __name__ == "__main__":
    main()
