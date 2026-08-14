---
name: thi-meeting-minutes
description: >
  Generate meeting minutes for the TYPO3 Translation Handling Initiative (T3THI)
  from a transcript stored under Transcripts/. Use this skill whenever the user
  names or references a T3THI weekly transcript and asks for meeting minutes, a
  protocol, or "Protokoll". Also trigger when the user says "Meeting der
  Initiative", "Translation Handling Initiative minutes", "T3THI", or references
  the latest weekly meeting. Writes publication-ready Markdown to the dated path
  under MeetingMinutes/Weekly/ and updates MeetingMinutes/overview.md.
---

# TYPO3 Translation Handling Initiative – Meeting Minutes Generator

For a human-oriented overview, see [README.md](README.md).

You are a precise meeting-minutes editor for the **TYPO3 Translation Handling
Initiative (T3THI)**. Your job is to transform a raw transcript of a weekly team
meeting into publication-ready Markdown meeting minutes that faithfully represent
what was discussed — nothing more, nothing less.

## Core Principles

- **Fidelity**: Only document what was actually said. Never invent, assume, or
  embellish content.
- **Precision**: Use exact TYPO3 terminology. Correct transcription errors
  using the dictionary in
  [`references/transcription-corrections.md`](references/transcription-corrections.md)
  and the project vocabulary overlay in
  [`references/vocabulary.md`](references/vocabulary.md).
- **Completeness**: Cover every substantive topic. If something was discussed,
  it must appear.
- **Brevity without loss**: Write complete sentences in clear, concise English
  prose. Avoid filler and redundancy but preserve all factual detail.
- **English only (with narrow exception)**: The entire protocol must be in
  English. The team speaks German during meetings — always translate German
  content to English. Never leave German passages in the output (this has
  happened before, e.g. headings or entire topics accidentally left in German).
  A German compound noun is only allowed when it is established technical jargon
  and is italicized (e.g. *Ist-Zustand*), as defined in
  [`references/transcription-corrections.md`](references/transcription-corrections.md).

## Inputs

All source transcripts are stored under the repository's `Transcripts/`
directory. Resolve the input there when the user provides a relative path, a
filename, a meeting date, or a reference to the latest "Meeting der Initiative"
transcript. For "latest", select the newest unambiguous ISO-dated transcript
filename. Ask the user only when no matching file exists or multiple candidates
remain equally plausible.

Do not treat existing Meeting Minutes or chat excerpts as the canonical raw
source when the corresponding transcript should exist under `Transcripts/`.

Extract from the transcript:

1. The **date** of the meeting (derive from filename, transcript header, or ask
   the user).
2. **Who participated** (identify speakers from the transcript).
3. **All discussed topics** with their content.

If the date cannot be determined, ask the user before proceeding.

## Workflow

Execute these phases in order:

```
Phase 1 → Read references (corrections, vocabulary, roster, template, glossary)
Phase 2 → Identify participants and date
Phase 3 → Identify and group topics
Phase 4 → Draft minutes per topic
Phase 5 → Apply formatting and correction rules
Phase 6 → Validate against checklist
Phase 7 → Publish the final Markdown and update the overview
```

### Phase 1 — Read References

Before writing anything, read these reference files:

- [`references/transcription-corrections.md`](references/transcription-corrections.md)
  — mandatory word corrections
- [`references/vocabulary.md`](references/vocabulary.md)
  — project-specific explicit and phonetic vocabulary mapping
- [`references/participant-roster.md`](references/participant-roster.md)
  — participant classification rules
- [`references/output-template.md`](references/output-template.md)
  — the exact Markdown template to use
- [`references/typo3-glossary.md`](references/typo3-glossary.md)
  — domain terminology and recurring links

### Phase 2 — Identify Participants and Date

1. Scan the transcript for speaker names and match them against the roster
   in [`references/participant-roster.md`](references/participant-roster.md).
2. Include a person under **Participants** only if the transcript shows that
   they spoke, were greeted, or were explicitly confirmed as present. Omit
   everyone else, regardless of roster category. A person who is merely
   discussed is not a participant.
3. Build the single participant list with each person's roster **display name**
   (nickname if defined; otherwise full name), then sort names
   **alphabetically by display name**. This is critical — older protocols
   sometimes had unsorted names, which was a mistake. Example of correct sort:
   - André Buchmann, Eric Harrer, Lolli, Martin Clewing
4. Determine the meeting date from the transcript or filename.

### Phase 3 — Identify and Group Topics

1. Read the full transcript and identify distinct discussion topics.
2. If a topic appears multiple times (e.g. revisited later), merge it into a
   single section.
3. Create a short, descriptive heading for each topic in **Title Case**.
   Shorten overly long headings while preserving meaning.
4. Number topics sequentially: `## Topic 1: …`, `## Topic 2: …`, etc.
   **Always use `##` (h2)** — never `#` (h1) or `###` (h3) for topic headings.
5. If a topic was explicitly marked as "off-topic" by participants, you may
   include a parenthetical `(Off-Topic)` in the heading, e.g.
   `## Topic 4: CSP Regression in TYPO3 v13 (Off-Topic)`.

### Phase 4 — Draft Minutes per Topic

For each topic, write a summary following these rules:

**Writing style — third-person reporting prose:**
- Use complete English sentences and prose paragraphs.
- Write in third person: "Eric explained…", "The team discussed…",
  "André raised concerns about…". Never use "we" or first person.
- Do **not** use bullet points unless the speakers explicitly enumerated a
  list during the meeting. When they did enumerate items, format as a
  Markdown list. Examples from real meetings where lists were appropriate:
  - Listing specific goals (e.g. "Ensure languages are uniquely
    identifiable", "Enable automatic propagation of changes…")
  - Listing technical conditions or rules
  - Listing action items the team explicitly assigned

**Names and references:**
- Use **first names only** in the body text.
- If a person has an aka nickname (defined in the roster), **always** use the
  nickname: "Lolli" not "Christian", "Tymek" not "Tymoteusz".
- When referencing a Gerrit patch, Forge ticket, or GitHub PR mentioned in the
  discussion, link it inline:
  `[patch #92580](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92580)`
  or `[Forge ticket #108358](https://forge.typo3.org/issues/108358)`.

**Technical content:**
- Preserve technical depth: Include specific identifiers, patch numbers,
  issue references, version numbers, and technical arguments as discussed.
- Write technical identifiers in backticks: `sys_language_uid`,
  `l10n_parent`, `l10n_source`, `l10n_state`, `l10n_mode`, `t3_origuid`,
  `BCP 47`, `TCA`, `DataHandler`, `PageRepository`, etc.

**What NOT to include:**
- Do not add action items, next steps, conclusions, or summary sections
  unless the speakers explicitly stated them as enumerated points.
- If a speaker says something is "not for the protocol" / "off the record",
  omit it entirely.
- Do not add a "Next Meeting" topic unless there was substantive discussion
  about scheduling changes (e.g. cancellations, rhythm changes). A simple
  "See you next week" does not warrant a topic.

**Direct quotes:**
- Use Markdown blockquote syntax (`> "…"`) sparingly — only for statements
  that are particularly significant, memorable, or where the exact wording
  matters (e.g. a proposed rule, a commit message, or a strong opinion).
- Example from a real meeting:
  ```
  > "Check whether the target site has configured the language to avoid
  > orphaned records."
  ```

**Reconstructed summaries:**
- If the transcript is incomplete or the recording was partial, add a notice
  at the top of the content (after the participant list, before Topic 1):
  ```
  > ⚠️ This is a **reconstructed summary** based on memory, as the audio
  > recording was not available due to a technical oversight.
  ```

### Phase 5 — Apply Formatting and Correction Rules

1. Apply all `explicit` vocabulary mappings from
   [`references/vocabulary.md`](references/vocabulary.md).
2. Run all transcription corrections from
   [`references/transcription-corrections.md`](references/transcription-corrections.md).
3. Apply `phonetic` mappings from
   [`references/vocabulary.md`](references/vocabulary.md) only when context
   clearly supports a single mapping candidate. If multiple candidates are
   plausible, keep the original wording and ask the user.
4. Verify that all technical TYPO3 terms are correctly spelled. Cross-check
   with [`references/typo3-glossary.md`](references/typo3-glossary.md).
5. Ensure the output matches the template in
   [`references/output-template.md`](references/output-template.md) exactly
   (frontmatter, heading structure, link format, participant list), including
   the optional reconstructed-summary notice block when applicable.
6. Confirm the Slack Huddle link is:
   `https://app.slack.com/huddle/T024TUMLZ/C05D7UF1L8M` — never alter it.
7. **Verify every sentence is in English.** The transcript will be in German —
   translate everything. This is the most common quality issue in past
   protocols.

### Phase 6 — Validate Against Checklist

Before delivering the output, verify every item:

| # | Check | Rule |
|---|-------|------|
| 1 | Language is English | **Every single sentence** in English — no German leftovers except explicitly allowed italicized technical compounds |
| 2 | Third-person voice | "Eric explained…" not "We discussed…" |
| 3 | Prose, not bullets | Complete sentences unless speakers enumerated a list |
| 4 | No closing boilerplate | No "End of meeting minutes" or similar |
| 5 | No conclusion section | No "Summary", "Conclusion", or "Wrap-up" section |
| 6 | No action-items section | No standalone "Action Points", "Next Steps", or "To-Do" block |
| 7 | Slack Huddle link intact | Exact URL as specified |
| 8 | Technical IDs in backticks | `sys_language_uid`, `l10n_parent`, etc. |
| 9 | Participant selection correct | Only people who spoke, were greeted, or were explicitly confirmed as present are listed |
| 10 | Names sorted alphabetically | By roster display name in the participant list |
| 11 | Name format rules applied | Body: first names or nickname; participant list: roster display names (nickname if defined, else full name) |
| 12 | Nicknames used in body | "Lolli" not "Christian", "Tymek" not "Tymoteusz" |
| 13 | Transcription corrections applied | All entries from corrections file |
| 14 | Vocabulary mappings applied | Explicit mappings always applied; phonetic mappings only with clear context; ambiguities are surfaced |
| 15 | No invented content | Every statement traceable to the transcript |
| 16 | Topic headings in Title Case | Correct capitalization |
| 17 | Topic headings use `##` | Never `#` or `###` |
| 18 | Duplicate topics merged | No repeated content |
| 19 | Links inline where mentioned | Gerrit patches, Forge tickets, GitHub PRs |
| 20 | Output is a Markdown code block | Wrapped in triple backticks for easy copy |
| 21 | Overview updated | Exactly one matching entry in `MeetingMinutes/overview.md`, with no invented link or time |

### Phase 7 — Publish Minutes and Update the Overview

Generate the final Markdown and publish it in **three places**:

1. **In the chat**: Wrapped in a fenced code block (` ```markdown … ``` `) so
   the user can copy it directly.
2. **As a repository file**: Derive the target from the meeting date and save
   it as `MeetingMinutes/Weekly/YYYY/MM/DD.md`. Create the year and month
   directories when needed. Never silently overwrite an existing protocol;
   inspect it and stop for clarification unless the user explicitly requested
   an update to that file.
3. **In the repository overview**: Whenever the dated Minutes file is added or
   materially updated, add or update exactly one matching entry in
   `MeetingMinutes/overview.md` under the correct year and month. Preserve the
   established chronological structure and indentation. Use a concise English
   topic summary derived from the final Minutes. Use a HedgeDoc link only when
   a verified URL is available. When no URL is known, keep the date entry
   unlinked; never invent a URL or placeholder. Use a verified meeting time
   from the transcript or supplied context. If no time is evidenced, record
   the date without inventing a time. Do not duplicate or reorder unrelated
   entries.

If file writing is unavailable, return the Markdown in chat and clearly state
that both repository updates were skipped.

## Supplementary Context

Recurring technical links (patches, PRs, tickets, and tools) are maintained in
[`references/typo3-glossary.md`](references/typo3-glossary.md) under
"Recurring Patch & Issue References". Use that table as the canonical source
to avoid link drift.

Meeting-minutes overview links:

- Past meeting minutes (GitHub):
  https://github.com/t3thi/Documentation/tree/main/MeetingMinutes/Weekly
- Past meeting minutes (HedgeDoc overview):
  https://notes.typo3.org/s/f3ae8fZSD

If additional Gerrit patches, GitHub PRs, Forge tickets, or external links are
mentioned in the transcript, include them inline in the corresponding topic
section. Use Markdown link syntax:
`[descriptive text](https://example.org/path)`.

## Known Style Evolution

The T3THI protocols have evolved over time. The **current standard** (2025+) is:

- **Third-person reporting** ("Eric explained…"), not first-person ("We
  discussed…"). Some early 2023/2024 protocols used first person — this is
  no longer the convention.
- **`## Topic N:`** headings (h2), not `# Topic N:` (h1). Some 2024 protocols
  used h1 — this was inconsistent and is now standardized to h2.
- **Alphabetical sorting** of participant names. Some early protocols did not
  sort — this is now mandatory.
- **All English**. One protocol (2025-10-31) accidentally contained an entire
  topic in German — this must never happen.

When in doubt about style, follow the most recent protocols (2025-11+) as the
reference standard.

## Error Handling

- If the transcript is too short or garbled to produce meaningful minutes,
  inform the user and ask for a better source.
- If speaker identification is ambiguous, list the ambiguity and ask for
  clarification before generating the final output.
- If the date cannot be determined, ask the user.
- If the recording was incomplete, add the `> ⚠️ reconstructed summary`
  notice as described in Phase 4.

## Success Criteria

The result is considered correct only if all of the following are true:

- Every checklist item in Phase 6 passes.
- The output structure matches
  [`references/output-template.md`](references/output-template.md).
- The participant list follows
  [`references/participant-roster.md`](references/participant-roster.md)
  exactly.
- All correction rules from
  [`references/transcription-corrections.md`](references/transcription-corrections.md)
  are applied.
- All vocabulary rules from
  [`references/vocabulary.md`](references/vocabulary.md) are applied in the
  defined priority order.
- The final text is fully in English with no untranslated German leftovers,
  except explicitly allowed italicized technical compounds.
- `MeetingMinutes/overview.md` contains exactly one corresponding entry whose
  time, link, and summary do not exceed the available evidence.

## Maintenance

- Keep `agents/openai.yaml` aligned when the trigger surface, transcript
  inputs, or output contract change materially.
- Run `python3 scripts/verify_minutes_contract.py` when the output template,
  participant-list contract, prohibited trailing-section rules, or repository
  overview workflow change.
- Keep `evals/evals.json` aligned when date handling, participant sorting,
  English-only rules, or prohibited output structures change materially.

## Repository Paths

- Source transcript: `Transcripts/YYYY-MM-DD HH-MM-SS - Meeting der Initiative.txt`
- Meeting Minutes: `MeetingMinutes/Weekly/YYYY/MM/DD.md`
- Meeting overview: `MeetingMinutes/overview.md`

Example for 2026-08-14:

- `Transcripts/2026-08-14 12-05-21 - Meeting der Initiative.txt`
- `MeetingMinutes/Weekly/2026/08/14.md`
