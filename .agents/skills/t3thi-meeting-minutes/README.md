# T3THI Minutes

This skill turns TYPO3 Translation Handling Initiative transcripts into
publication-ready Markdown meeting minutes for HedgeDoc and GitHub.

Transcripts are resolved under `Transcripts/`. Finished protocols are written
to `MeetingMinutes/Weekly/YYYY/MM/DD.md` according to the meeting date, and the
matching entry in `MeetingMinutes/overview.md` is added or updated.

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
- add or update exactly one chronological `MeetingMinutes/overview.md` entry;
  never invent a meeting time or HedgeDoc URL when either is unavailable
- omit off-the-record material and generic action-item or summary sections
- keep the publication template and prohibited-section rules machine-checkable
  through a replayable output-contract verifier
- publish reviewed Minutes through an authenticated create-and-verify workflow,
  then add the verified HedgeDoc URL to the overview

## HedgeDoc publication commands

HedgeDoc publication is deliberately separate from drafting and human review.
Run the commands from the repository root.

Check the latest local file, its date, and its unique overview entry without
using the network:

```bash
python3 .agents/skills/t3thi-meeting-minutes/scripts/publish_minutes.py check
```

For normal interactive publication, run the script without parameters:

```bash
python3 .agents/skills/t3thi-meeting-minutes/scripts/publish_minutes.py
```

The script selects the chronologically latest canonical file below
`MeetingMinutes/Weekly/YYYY/MM/DD.md`. It then proposes
`--reviewed --cookies-from-browser firefox`; pressing Enter confirms both.
Supply a Minutes path only to process an older or otherwise non-latest file.
Every omitted review or authentication option is prompted interactively.

```bash
python3 .agents/skills/t3thi-meeting-minutes/scripts/publish_minutes.py \
  MeetingMinutes/Weekly/2026/08/21.md
```

The command validates every matching Firefox session through HedgeDoc. If none
is authenticated, it opens `https://notes.typo3.org/auth/saml` in Firefox,
waits for Enter after sign-in, and reads the refreshed session. It queries only
the `connect.sid` cookie for the target host from a short-lived SQLite copy; it
never prints or stores the value and does not wait on Firefox's live database
lock. No dedicated Firefox profile is required.
Use `--firefox-profile NAME_OR_PATH` only when automatic profile selection is
ambiguous. For non-interactive environments, the
`HEDGEDOC_SESSION_COOKIE` environment variable remains available through the
explicit `--cookies-from-environment` option.

The tool authenticates through `/me`, creates one new note, resolves its public
URL, downloads it without credentials and compares the Markdown, and only then
links the corresponding `MeetingMinutes/overview.md` entry. A repeated command
is idempotent when the linked remote content still matches. Append `--json` for
machine-readable output.

HedgeDoc 1.x does not offer a supported update API or durable personal access
tokens. Existing differing notes require manual reconciliation. See
[references/hedgedoc-publication.md](references/hedgedoc-publication.md) for
credential handling and failure recovery.

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
- [scripts/publish_minutes.py](scripts/publish_minutes.py)
  Authenticated, idempotent create/read-back/link client for HedgeDoc 1.x.
- [scripts/test_publish_minutes.py](scripts/test_publish_minutes.py)
  Offline publication-client tests using a local fake HedgeDoc server.
- [references/hedgedoc-publication.md](references/hedgedoc-publication.md)
  Credential, command, limitation, and failure-recovery runbook.
- [evals/files/valid-minutes.md](evals/files/valid-minutes.md)
  Stable minutes fixture used by the verifier.
- [evals/evals.json](evals/evals.json)
  Maintenance scenarios for language, participants, and prohibited sections.
- [evals/README.md](evals/README.md)
  Short overview of the eval contract.
