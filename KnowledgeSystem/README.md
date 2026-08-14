# Translation Handling Initiative Documentation

This directory contains the Git-native, provenance-aware knowledge system of
the TYPO3 Translation Handling Initiative. Git contains the reviewed semantic
state, schemas protect its structure, humans authorize material changes and
deterministic tools build its publication views.

```text
local raw transcript
  -> t3thi meeting-minutes skill
  -> human-reviewed Meeting Minutes
  -> semantic ingestion
  -> Change Log + Knowledge Objects + Decision Records
  -> reviewed Topic Syntheses
  -> deterministic Current State and registers
```

The layers answer different questions. A transcript is the primary retained
meeting source, while its reviewed Minutes are a curated projection rather than
independent corroboration. Knowledge Objects hold canonical propositions and
their lifecycle history, Decision Records hold explicit decisions and Topics
provide the coherent editorial explanation. Current State is generated from
these canonical inputs and must not be edited directly.

Historical transcript payloads in local working copies remain ignored because
they have not all been cleared for publication. See
[`../Transcripts/README.md`](../Transcripts/README.md) before handling one.

## Read and contribute

- [Knowledge architecture and contributor guide](Knowledge/README.md)
- [Repository-wide agent policy](AGENTS.md)
- [Meeting minutes overview](../MeetingMinutes/overview.md)
- [Current State, English](../MeetingMinutes/current-state.md)
- [Current State, Deutsch](../MeetingMinutes/current-state.de.md)
- [Human Current State maintenance workflow](Documentation/current-state-maintenance.md)

## Process the next meeting

Place the raw transcript in `Transcripts/` for local processing, without
staging or publishing it unless a human has cleared it. Then use the two-phase
workflow. A clean checkout requires Python 3.12 and the pinned dependencies:

```bash
python3 -m pip install --disable-pip-version-check --requirement KnowledgeSystem/requirements.txt
```

Prepare Stage 1:

```bash
KnowledgeSystem/Tools/prepare-meeting-minutes "Transcripts/YYYY-MM-DD HH-MM-SS - Meeting der Initiative.txt"
```

Use the printed repository-local skill instructions with an LLM-capable agent,
save the resulting Minutes under `MeetingMinutes/Weekly/` and have a human
review and accept them. Register the local-restricted transcript and the
repository-available Minutes in `KnowledgeSystem/Knowledge/sources.yaml`, including the
transcript digest, `derived_from`, `generated_with` and
`review_status: reviewed` fields shown in the contributor guide. Only after
that gate, prepare Stage 2:

```bash
KnowledgeSystem/Tools/ingest-reviewed-meeting MeetingMinutes/Weekly/YYYY/MM/DD.md --reviewed
```

Use [`Prompts/ingest-reviewed-meeting.md`](Prompts/ingest-reviewed-meeting.md)
with an LLM-capable agent, review its semantic report and inspect the Git diff.
The helpers prepare deterministic context and instructions; they do not execute
an LLM. `--reviewed` explicitly attests that the mandatory human review has
occurred; without it the helper refuses to prepare ingestion. Finish by
rebuilding and checking the repository:

```bash
KnowledgeSystem/Tools/build-index
KnowledgeSystem/Tools/build-views
KnowledgeSystem/Tools/validate
KnowledgeSystem/Tools/check-backlinks
KnowledgeSystem/Tools/lint-knowledge
python3 -m unittest discover -s KnowledgeSystem/Tests/knowledge -p 'test_*.py'
python3 .agents/skills/t3thi-meeting-minutes/scripts/verify_minutes_contract.py
KnowledgeSystem/Tools/build-index --check
KnowledgeSystem/Tools/build-views --check
```

See [`Knowledge/README.md`](Knowledge/README.md) for the exact evidence,
classification, review and external-status rules.
