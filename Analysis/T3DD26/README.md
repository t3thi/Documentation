# T3DD26 Translation Handling Analysis

**Purpose:** Durable navigation and reuse guide for the source analysis behind the T3DD26 session “Translation Handling in TYPO3: Where We Are and Where We Could Go”.<br>
**Corpus snapshot:** 2026-08-08, using the current working-tree versions of the source files.<br>
**Evidence rule:** This directory contains derived research artifacts. Claims must remain traceable to the original files under `MeetingMinutes/` or `Transcripts/`, or to an explicitly identified external technical source.

## Artifact map

### Analysis and coordination artifacts

| Artifact | State at this checkpoint | Purpose |
|---|---|---|
| [`README.md`](README.md) | Existing | Navigation, corpus coverage, method, status vocabulary, citation contract, and reuse rules. |
| [`Research-State.md`](Research-State.md) | Existing | Durable cross-period checkpoint recording the research state, important corrections, implementation caveats, decision gates, and the resulting output set. It is a synthesis aid, not a primary source. |
| [`Decision-and-Evidence-Register.md`](Decision-and-Evidence-Register.md) | Existing | Reusable decision/non-decision snapshot, contradiction register, and broad evidence matrix using the controlled status vocabulary. |
| [`Architecture-Options-and-Open-Questions.md`](Architecture-Options-and-Open-Questions.md) | Existing | Comparison of the current sparse model, complete per-language layers, a shared Structure/Identity Layer, and an explicitly analytical hybrid, with open decision gates. |
| [`Evolution-and-Migration-Path.md`](Evolution-and-Migration-Path.md) | Existing | Non-linear, gated evolution and migration path with separate path categories and evidence statuses. |
| [`T3DD26-Session-Analysis.md`](T3DD26-Session-Analysis.md) | Existing | Final evidence-backed synthesis with the requested chapters, session dramaturgy, slide proposal, use cases, open questions, migration/evolution path, prioritization, and source matrix. |
| [`T3DD26-Session-Deck-Blueprint.md`](T3DD26-Session-Deck-Blueprint.md) | Existing | Thirty-minute main-deck and backup-slide blueprint with source, status, priority, and visualization guidance. |
| [`External-Technical-Validation.md`](External-Technical-Validation.md) | Existing | Time-sensitive verification of the official session information, Gerrit state, and local thematic/technical cross-checks. Revalidate live facts when reused. |
| [`QA-Report.md`](QA-Report.md) | Existing | Final corpus, citation, link, Markdown, content-status, and repository-boundary validation checkpoint. |
| [`Distribution-Package.md`](Distribution-Package.md) | Existing | Manifest, checksums and deployment contract for the minimal static upload copy. |
| [`../../Presentation/T3DD26/README.md`](../../Presentation/T3DD26/README.md) | Existing | Production-ready offline Reveal.js deck, build/presenter instructions, accessibility contract, and presentation QA entry point. |

### Complete source-audit set

| Source audit | Covered source slice | Files read completely |
|---|---|---:|
| [`SourceAudits/2023-weekly.md`](SourceAudits/2023-weekly.md) | `MeetingMinutes/Weekly/2023` | 9 Markdown files |
| [`SourceAudits/2024-H1-weekly.md`](SourceAudits/2024-H1-weekly.md) | Weekly minutes, January–June 2024 | 23 Markdown files |
| [`SourceAudits/2024-H2-weekly.md`](SourceAudits/2024-H2-weekly.md) | Weekly minutes, July–December 2024; no August directory exists | 16 Markdown files |
| [`SourceAudits/2025-H1-weekly.md`](SourceAudits/2025-H1-weekly.md) | Weekly minutes, January–June 2025 | 18 Markdown files |
| [`SourceAudits/2025-H2-weekly.md`](SourceAudits/2025-H2-weekly.md) | Weekly minutes, July–November 2025 | 18 Markdown files |
| [`SourceAudits/2026-Q1.md`](SourceAudits/2026-Q1.md) | Weekly minutes, January–March 2026, plus the available February/March transcripts | 10 Markdown files + 5 text transcripts |
| [`SourceAudits/2026-April-May.md`](SourceAudits/2026-April-May.md) | Weekly minutes and transcripts for April–May 2026 | 3 Markdown files + 3 text transcripts |
| [`SourceAudits/2026-June-July.md`](SourceAudits/2026-June-July.md) | Weekly minutes and transcripts for June–July 2026, including the read-only untracked 2026-07-31 minute | 5 Markdown files + 5 text transcripts |
| [`SourceAudits/Monthly-and-Meta.md`](SourceAudits/Monthly-and-Meta.md) | Every monthly report plus `current-state.md`, `todos.md`, and `overview.md` | 19 Markdown files |

The audit partitions account for all 121 Markdown source documents and all 13 text transcripts in the defined corpus. No source document is intentionally counted in two period-audit file totals.

## Corpus and scope

### Included

- Every `*.md` document recursively below `MeetingMinutes/`.
- Every `*.txt` transcript recursively below `Transcripts/`.
- Current working-tree content, including source files with pre-existing user changes.
- Documents with no usable session evidence: they remain part of the corpus and are recorded as no-evidence or limited-evidence files in the relevant audit.

At the 2026-08-08 checkpoint, this is:

| Source area | Documents | Lines counted by `wc -l` |
|---|---:|---:|
| `MeetingMinutes/` Markdown | 121 | 8,874 |
| `Transcripts/` text | 13 | 8,722 |
| **Total** | **134** | **17,596** |

### Excluded

- `.DS_Store` files. They are filesystem metadata, not Markdown or transcript documents.
- Files outside `MeetingMinutes/` and `Transcripts/` as primary initiative evidence, unless the external technical-validation artifact identifies and scopes them explicitly.
- Derived files under `Analysis/T3DD26/` as primary evidence. They organize and interpret the corpus but do not replace it.

## Method

1. **Enumerate the corpus.** Discover every included Markdown and text file; compare the resulting manifest with the audit partitions.
2. **Read every document completely.** Keyword searches may support navigation and QA, but they do not replace first-to-last-line review.
3. **Record every file.** Each period audit contains a manifest or review ledger, including files that yielded no distinct T3DD26-relevant evidence.
4. **Extract atomic claims.** Separate current behavior, problems, ideas, directions, open questions, plans, work in progress, implementations, and analytical recommendations.
5. **Cite exact evidence.** Attach repository-relative paths, 1-based inclusive line ranges, and the source date to material claims.
6. **Respect source hierarchy.** Transcripts preserve conversational nuance but may contain transcription errors; weekly minutes are edited summaries; monthly reports are secondary syntheses; `overview.md` is an index/locator; `current-state.md` and `todos.md` are historical snapshots rather than automatically current status.
7. **Reconstruct evolution.** Preserve earlier position → later correction/refinement → youngest defensible status. Frequency of discussion or confident wording alone does not establish consensus.
8. **Apply newest-evidence precedence carefully.** Later evidence supersedes an older intermediate state only for the same question. It does not erase the reasoning path or silently resolve a different architectural question.
9. **Distinguish source-backed and derived work.** Any inferred dependency, sequencing step, or recommendation must use `Analytically Derived Recommendation` and cite the source facts from which it follows.
10. **Verify time-sensitive technical facts separately.** Current Gerrit state, official session metadata, patch contents, Core behavior, and merge status belong in `External-Technical-Validation.md` and must be refreshed when needed.
11. **Synthesize only after coverage QA.** The final analysis should draw from every audit, reconcile contradictions, retain explicit uncertainties, and link each important assertion back to original evidence.

## Controlled status vocabulary

Use exactly these ten values. A status is always scoped to the cited source date unless current external verification says otherwise.

| Status | Meaning |
|---|---|
| `Current Core Behavior` | Behavior described as current in the source. Historical minutes do not by themselves prove that it remains current in a later TYPO3 version. |
| `Problem` | A documented defect, inconsistency, limitation, ambiguity, risk, or editorial/technical burden. |
| `Idea` | An exploratory solution, hypothesis, or example without evidence of directional preference. |
| `Discussed Direction` | A recurring or structured direction that was discussed but not clearly selected. |
| `Preferred Direction` | A direction explicitly favored, prioritized, agreed as a goal, or repeatedly retained after alternatives were considered. This is not automatically an accepted Core roadmap. |
| `Open Question` | An unresolved semantic, architectural, migration, UX, governance, or implementation question. |
| `Planned` | A concrete next action or deliverable that the source explicitly says should happen. |
| `In Progress` | Work shown as underway at the source date, including WIP patches, active tests, prototypes, or investigations. |
| `Implemented` | Behavior or a change shown by the source or technical validation to be completed/merged/available. Do not use for a proposal merely described as complete in concept. |
| `Analytically Derived Recommendation` | A recommendation inferred from source-backed dependencies. It is the analyst’s conclusion, never an initiative decision or plan. |

If one sentence contains clauses with different maturity, split it into separate claims. Where an audit retains a compound status for compactness, the final synthesis should still make each clause’s maturity unambiguous.

## Citation contract

### Local source citations

Use repository-relative paths and 1-based inclusive line ranges in backticks:

```text
`MeetingMinutes/Weekly/2026/05/08.md:24-30` (2026-05-08)
`Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:47-76` (2026-05-08)
`MeetingMinutes/Monthly/2024-06-monthly.md:16-18,43-48` (2024-06 report)
```

- Cite the smallest range that preserves meaning and context.
- For non-contiguous evidence, list each range explicitly or use a comma-separated range list only when the path is identical.
- Put citations next to the supported claim or in the same source-matrix row.
- Include the meeting/report date even when it appears in the filename.
- If filename and internal date conflict, document both and explain which one controls chronology; do not silently normalize the source.
- A citation to a SourceAudit is acceptable for navigation, but final factual claims should cite the underlying `MeetingMinutes/` or `Transcripts/` file.

### External technical citations

- Use a descriptive Markdown link to the authoritative source and record the verification date/state in `External-Technical-Validation.md`.
- Prefer official session pages, Gerrit, Forge, TYPO3 Core code, and official documentation.
- Never infer a Gerrit/Forge identifier or URL from an informal mention.
- Recheck live status before claiming that a patch is current, merged, abandoned, or at a particular patch set.

### Negative evidence

Write absence claims as corpus-scoped findings, for example: “Not found in the fully reviewed 2025 H1 weekly corpus.” Never turn absence in one period audit into “the initiative never discussed this.”

## Known source boundaries

- The repository contains transcripts only from 2026-02-13 through 2026-07-31. Earlier periods can be evaluated from minutes and reports, not from local verbatim transcripts.
- Automatic transcripts can contain speaker-label, terminology, punctuation, and recognition errors. Interpret a passage in surrounding context and avoid over-weighting an isolated phrase.
- Weekly minutes are reviewed summaries, not verbatim records. Monthly reports summarize weekly work again and are best used for initiative-level emphasis/status corroboration.
- `MeetingMinutes/overview.md` is an index and chronology aid. Its short descriptors are locators, not sufficient evidence for detailed technical semantics or consensus.
- `MeetingMinutes/current-state.md` has no internal date and reflects a historical repository snapshot; `MeetingMinutes/todos.md` also lacks an internal source date and must not be treated as a live backlog without newer confirmation.
- Some meetings were canceled, had no recording, or produced no usable protocol. Corpus completeness means every available included document was reviewed, not that every calendar meeting has a substantive source.
- `MeetingMinutes/Weekly/2025/06/2025-06-13.md` states that it was reconstructed from memory and therefore carries lower confidence for fine technical detail.
- `MeetingMinutes/Weekly/2025/11/2025-11-14.md` has a filename/internal-date discrepancy documented in the 2025 H2 audit. Preserve the discrepancy when reasoning chronologically.
- The absence of a term, issue number, or patch number from a meeting document does not disprove the underlying work. It limits attribution to that source slice.
- Historical status words such as “finished,” “planned,” or “current” are date-scoped. Current Core and Gerrit state require separate validation.
- Line references are snapshot-dependent and may move when a source file is edited.
- The current source snapshot is not reproducible from repository `HEAD` alone because it includes an untracked source document described below.

## Pre-existing user source changes

The analysis began with these source changes already present:

| Working-tree state | Source path | Handling in this analysis |
|---|---|---|
| Modified | `MeetingMinutes/overview.md` | Read in its current working-tree form; not overwritten, restored, normalized, staged, or otherwise changed by the analysis. |
| Untracked | `MeetingMinutes/Weekly/2026/07/31.md` | Read as a source and covered in the June–July audit; not edited, staged, moved, or deleted by the analysis. |

These files belong to the user. Do not revert, replace, stage, or commit them as part of analysis maintenance unless the user explicitly requests that action. Because citations use the working-tree versions, source changes require targeted citation and conclusion revalidation.

## Update rules

### When a new or changed source appears

1. Re-enumerate `MeetingMinutes/**/*.md` and `Transcripts/**/*.txt`; update document and line counts here.
2. Identify the owning period audit. Create a new audit only when the existing time partition would become misleading.
3. Read the new/changed source completely and update the audit manifest, evidence ledger, no-evidence accounting, evolution notes, and source matrix.
4. Recheck every citation whose file changed; line numbers are not stable identifiers.
5. Compare new evidence with earlier positions. Record corrections and the youngest defensible status without erasing prior reasoning.
6. Update `Research-State.md` only where the cross-period checkpoint materially changes.
7. Update `T3DD26-Session-Analysis.md` and `External-Technical-Validation.md` where affected.
8. Update this artifact map, coverage table, corpus totals, snapshot date, and known boundaries.
9. Run Markdown/link/path checks and `git diff --check` on the analysis artifacts.
10. Confirm with `git status --short` that no source file was accidentally modified.

### When only live external state changes

- Refresh `External-Technical-Validation.md` with the new verification date and authoritative links.
- Update the final synthesis only if its current-state claims are affected.
- Do not rewrite historical minutes or their date-scoped status.

## Reuse rules

- Start with this README, then read `Research-State.md`, the relevant SourceAudit(s), and finally the original cited sources.
- For a corpus-wide update, inspect all SourceAudits; do not rely on `Research-State.md` alone.
- Reuse source-backed conclusions only within their recorded scope/date. Revalidate anything described as current, implemented, merged, planned for a Core version, or tied to a live external page.
- Preserve the ten-value status vocabulary and the exact distinction between initiative evidence and analytical recommendation.
- Preserve source uncertainty, transcription caveats, contradictory positions, and newer-state precedence.
- Do not promote repetition, enthusiasm, a prototype, or a strategy-paper proposal into a Core decision.
- Do not cite this README as evidence for a technical claim; it documents process and navigation only.
- Keep source changes and analysis artifacts separate. Analysis maintenance does not authorize editing meeting minutes or transcripts.
- When deriving a different presentation or report from this work, cite the original source corpus and state the new artifact’s own scope, as-of date, and selection criteria.
