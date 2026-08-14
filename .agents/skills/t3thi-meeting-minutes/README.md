# T3THI Minutes

This skill turns TYPO3 Translation Handling Initiative transcripts into
publication-ready Markdown meeting minutes for HedgeDoc and GitHub.

Transcripts are resolved under `Transcripts/`. Finished protocols are written
to `MeetingMinutes/Weekly/YYYY/MM/DD.md` according to the meeting date.

Use it when the user provides a T3THI transcript and needs exact minutes with
English-only prose, a sorted participant list, topic sections, and no invented
wrap-up structures.

## Core contract

The skill should:

- read the output template, participant roster, correction rules, and glossary
  before drafting
- keep the final protocol fully in English and in third-person prose
- include only people with transcript evidence of participation and sort them
  deterministically by roster display name
- resolve the raw source from `Transcripts/` and place the finished protocol at
  the dated path under `MeetingMinutes/Weekly/`
- omit off-the-record material and generic action-item or summary sections
- keep the publication template and prohibited-section rules machine-checkable
  through a replayable output-contract verifier

## Key files

- [SKILL.md](SKILL.md)
  Authoritative machine-oriented instructions.
- [agents/openai.yaml](agents/openai.yaml)
  User-facing trigger metadata.
- [references/output-template.md](references/output-template.md)
  Canonical Markdown template and structural rules.
- [references/participant-roster.md](references/participant-roster.md)
  Deterministic participant categories and sorting rules.
- [references/transcription-corrections.md](references/transcription-corrections.md)
  Mandatory transcript cleanup rules.
- [references/vocabulary.md](references/vocabulary.md)
  Project-specific vocabulary mapping.
- [scripts/verify_minutes_contract.py](scripts/verify_minutes_contract.py)
  Replayable verifier for the publication-ready Markdown output contract.
- [evals/files/valid-minutes.md](evals/files/valid-minutes.md)
  Stable minutes fixture used by the verifier.
- [evals/evals.json](evals/evals.json)
  Maintenance scenarios for language, participants, and prohibited sections.
- [evals/README.md](evals/README.md)
  Short overview of the eval contract.
