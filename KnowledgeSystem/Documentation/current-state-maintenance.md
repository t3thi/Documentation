---
title: "Translation Handling Initiative - Current State Maintenance"
---

# Maintain the Translation Handling Initiative Current State

Current State is a deterministic publication view. Do not edit
`MeetingMinutes/current-state.md` or `MeetingMinutes/current-state.de.md`
directly and do not use this page as an all-in-one agent prompt.

The canonical responsibilities are intentionally separated:

- [`../AGENTS.md`](../AGENTS.md) contains repository-wide invariants, source
  authority and human review gates.
- [`.agents/skills/t3thi-meeting-minutes/SKILL.md`](../../.agents/skills/t3thi-meeting-minutes/SKILL.md)
  owns Transcript to Meeting Minutes.
- [`../Prompts/ingest-reviewed-meeting.md`](../Prompts/ingest-reviewed-meeting.md)
  owns reviewed meeting to canonical Knowledge.
- [`../Prompts/consolidate-topic.md`](../Prompts/consolidate-topic.md) owns
  editorial Topic consolidation.
- [`../Prompts/review-knowledge.md`](../Prompts/review-knowledge.md) contains the
  semantic, authority, external-status, domain and translation review checks.
- [`../Knowledge/README.md`](../Knowledge/README.md) is the contributor and
  command reference.
- `../Schemas/` and the deterministic tools define the structural and
  publication contracts.

This separation preserves the prior maintenance safeguards without keeping a
second competing Current State specification.

## Normal weekly workflow

Use Python 3.12. In a clean checkout, install the pinned dependencies first:

```bash
python3 -m pip install --disable-pip-version-check --requirement KnowledgeSystem/requirements.txt
```

1. Add the raw transcript to `Transcripts/` for restricted local processing.
   Do not stage or publish it unless a human confidentiality review has cleared
   it.
2. Prepare Stage 1:

   ```bash
   KnowledgeSystem/Tools/prepare-meeting-minutes "Transcripts/YYYY-MM-DD HH-MM-SS - Meeting der Initiative.txt"
   ```

3. Use the repository-local meeting-minutes skill with an LLM-capable agent.
4. Save the Minutes at the established dated path under
   `MeetingMinutes/Weekly/`.
5. Have a human compare, correct and explicitly accept the Minutes.
6. Register the reviewed Minutes and their derivation from the transcript in
   `KnowledgeSystem/Knowledge/sources.yaml`.
7. Prepare Stage 2:

   ```bash
   KnowledgeSystem/Tools/ingest-reviewed-meeting MeetingMinutes/Weekly/YYYY/MM/DD.md --reviewed
   ```

8. The `--reviewed` flag explicitly attests that the mandatory human review
   occurred; without it the helper refuses ingestion. Use the printed Stage 2
   instructions with an LLM-capable agent. The
   ingestion reads the reviewed Minutes, relevant raw transcript evidence and
   existing canonical Knowledge and proposes only durable semantic deltas.
9. Review any Knowledge, Decision, Change and Topic edits. Revalidate current
   Core, Gerrit and Forge state where relevant.
10. Rebuild and check publication:

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

11. Review the semantic meeting report and complete Git diff. Resolve every
    contradiction, authority ambiguity, vision change, accepted Decision,
    destructive lifecycle change, material maturity increase and translation
    warning through explicit human review.
12. Commit and normal review may follow only after the semantic changes are
    accepted.

The preparation helpers do not execute an LLM and do not bypass the human gate
between the phases.

## Current State feedback outside meetings

A correction request, editorial observation or new idea is a candidate input,
not permission to edit the generated Current State directly. Process it in this
order:

1. Run `KnowledgeSystem/Tools/validate` and read the complete affected English
   and German Topics, their referenced Knowledge Objects and relevant Changes.
2. Classify the request as wording-only, a semantic refinement, new Knowledge,
   a contradiction, an external-status update or a proposed Decision.
3. Verify provenance and authority. A request can expose an implication of
   existing accepted evidence; otherwise register a durable source before
   promoting a material claim. A preference remains a preference, and an idea
   remains proposed until the required authority decides it.
4. For wording-only changes, edit the English Topic synthesis and then its
   German projection. Do not create a Semantic Change merely for prose style.
5. For semantic changes, update Sources, Knowledge and Decisions first. Record
   every material transition in `Changes/`, and mark unresolved human gates as
   `review-required` rather than presenting them as accepted.
6. Use `KnowledgeSystem/Prompts/consolidate-topic.md` to update coherent Topic
   prose, then update the German projection without changing scope, certainty
   or decision status. Do not advance its translation-review date before a
   human has checked semantic parity.
7. Run the builders and completion checks below. Use
   `KnowledgeSystem/Prompts/review-knowledge.md` as a findings-first review aid,
   inspect the complete Git diff and generated Current State, and correct every
   finding.
8. Only after explicit human acceptance, update applicable review metadata and
   the sole `publication` block in `Knowledge/sources.yaml`, rebuild and repeat
   the checks. A legitimate result can be `no-change`.

For a current Gerrit or Forge claim, run
`KnowledgeSystem/Tools/check-external-status SOURCE_ID...` first. Its output is
a read-only observation; a human must decide whether it warrants canonical and
publication changes.

## Publication cutoffs

The top-level `publication` block in `../Knowledge/sources.yaml` is the only
editable source for:

- the last semantic update;
- reviewed Minutes through a date;
- reviewed transcripts through a date;
- external state verified through a date.

Advance a cutoff only after the complete relevant source bundle has been read,
reviewed and incorporated. `KnowledgeSystem/Tools/build-views` materializes these values in the
English and German Current State frontmatter. Do not maintain cutoff values in
this file or edit the generated copies.

## Human acceptance check

Before accepting a rebuild, confirm that:

- Current State still begins with needs and findings before implementation
  choices and remains a coherent narrative rather than a registry dump;
- current behavior, findings, requirements, vision, directions, possible
  approaches, decisions and open questions remain distinguishable;
- English and German have the same claim scope, evidence status and decision
  boundaries;
- volatile external state was revalidated when presented as current;
- no confidential or off-record material, invented provenance or invented
  decision entered a canonical or generated file;
- no historical transcript or reviewed Minutes was rewritten;
- a second build does not alter the post-first-build working tree (compare
  generated-output checksums even when the semantic Git diff is intentionally
  non-empty), and all `--check` commands pass.

The governing editorial principle remains: separate Language Identity,
Synchronization Intent, Structural Identity and Output Policy before reasoning
about possible implementations. Update canonical Knowledge and Topics; let the
build publish the current state.
