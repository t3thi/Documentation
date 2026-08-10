---
title: "Translation Handling Initiative - Current State Maintenance"
canonical_document: "current-state.md"
translated_document: "current-state.de.md"
last_completed_update: "2026-08-10"
weekly_minutes_included_through: "2026-07-31"
transcripts_included_through: "2026-07-31"
external_status_checked_through: "2026-08-10"
---

# Maintain the Translation Handling Initiative Current State

Use this document as the complete working prompt for updating the [English Current State](https://github.com/t3thi/Documentation/blob/main/MeetingMinutes/current-state.md) and its German translation in `current-state.de.md`. Execute the process directly in the repository.

The objective is to keep one coherent account of what the initiative currently knows, wants, investigates, improves and still needs to decide. Do not turn the Current State into a meeting chronology, changelog, patch dump or standalone backlog.

The two governing rules are:

> **Separate the responsibilities first. Then reason about possible implementations.**

> **Update the current state, not the history.**

## 1. Establish the update boundary

1. Read this file, `current-state.md` and `current-state.de.md` completely.
2. Read the metadata fields at the top of both files.
3. Enumerate all weekly minutes and transcripts by filename, not filesystem modification time:

   ```bash
   find MeetingMinutes/Weekly -type f -name '*.md' -print | sort
   find Transcripts -type f -name '*.txt' -print | sort
   ```

4. Select every source dated after `weekly_minutes_included_through` or `transcripts_included_through`.
5. Also include an older source if it changed after the last update or if a new finding requires historical re-evaluation.
6. Do not advance a cutoff until every source through that date has been read completely and either integrated or explicitly judged not to change the Current State.
7. Treat supplied channel exports as supplemental snapshots. Record their scope and checksum in a durable audit, but do not advance the weekly-minute or transcript cutoffs because of them.

The cutoff dates are the only ongoing tracking metadata. Do not create a parallel per-meeting inclusion ledger.

## 2. Use the source hierarchy correctly

Use sources in this order:

1. Current TYPO3 Core code and official Gerrit/Forge state for claims about present implementation or patch status.
2. Weekly minutes for reviewed initiative findings, positions and work status.
3. Transcripts for nuance, tentative language, disagreement and statements omitted from the minutes.
4. Supplied initiative-channel exports for unminuted use cases and implementation references. Treat individual messages as leads until they are cross-checked against reviewed minutes, current Core code or official project state.
5. Monthly reports and `overview.md` as indexes and emphasis summaries.
6. Drafts and derived analyses as research aids, never as stronger evidence than the sources above.

When a current patch state matters, verify it live through the official TYPO3 source. A status recorded in a meeting remains historical evidence only.

Prefer the newest reliable statement about the same question. A later preference does not become a decision unless the source supports that status.

For publication links in the Current State:

1. Use absolute `https://notes.typo3.org/` links from `MeetingMinutes/overview.md` for weekly minutes.
2. Never publish a `TODO-*` placeholder or a repository-relative weekly-minutes link.
3. If `overview.md` has no functional Notes link for a required source, resolve and verify that Notes URL before adding the source link to the Current State.
4. Link this maintenance document through `https://github.com/t3thi/Documentation/blob/main/MeetingMinutes/current-state-maintenance.md`.
5. Link the English version at `https://notes.typo3.org/s/RhkYPguwb` to the German version at `https://notes.typo3.org/s/7bbwd73t2h` and vice versa.
6. Keep every Markdown link in both published language versions absolute so it works when rendered through Notes.

## 3. Extract only state-changing information

For each new source, identify only information that changes or materially clarifies the present account:

- a new or refined use case;
- reproduced current behavior;
- an established or disproved finding;
- a changed requirement;
- a change to the vision;
- a new, changed, preferred, rejected or superseded approach;
- a new patch or material change to scope, status or review findings;
- a merged, abandoned or replaced patch;
- a newly opened, answered or reframed question;
- a new decision dependency;
- a changed next step or priority.

Do not import greetings, scheduling, organizational details without lasting relevance, repeated explanations, speculative statements without consequence or intermediate debugging that does not change the current understanding.

## 4. Classify the evidence before editing

Assign each relevant statement one current status:

- Verified current behavior
- Established finding
- Derived requirement
- Vision
- Current direction
- Possible approach
- Current work
- Implemented
- Critical assessment
- Open question
- Decision required
- Rejected or superseded

Update status transitions in place. Typical transitions are:

- Possible approach → Current direction
- Under investigation → Established finding
- Open question → Finding or Decision required
- Patch in development → Patch in review
- Patch in review → Implemented
- Current direction → Rejected or superseded
- Hypothesis → Disproved

Do not preserve every prior status in the Current State. Keep history in the source minutes. Mention an earlier position only when it is necessary to explain the current conclusion.

## 5. Test every change against the Four Responsibilities

For every material finding, ask in this order:

1. **Language Identity:** Which human language or variant does the content represent?
2. **Synchronization Intent:** Which fields or records must stay aligned, and where may they differ?
3. **Structural Identity:** Which records represent the same logical content position across languages?
4. **Output Policy:** What should render when the requested variant is unavailable?

Then determine:

- Which responsibility changes?
- Does the finding create or change a requirement?
- Does it alter the vision, or only one possible implementation?
- Does it expose an interaction with another responsibility?
- Does the current wording assume semantics that a non-participant would not know?
- Does current field synchronization distinguish configuration-enforced `l10n_mode=exclude` from editor-selectable `allowLanguageSynchronization` stored in `l10n_state`?
- Is a possible `enforceLanguageSynchronization` kept separate from record-wide synchronization and clearly marked as not implemented or selected?
- Does the first `-1` replacement preserve the complete-record effect before any target-language or field-level granularity is introduced?
- If "every field" is used for record synchronization, are parity-relevant values distinguished from target identity and Core-managed lifecycle metadata?
- Is a target-language multi-select presented as a possible feature requiring a decision rather than as a fixed next step?
- Is the editor requirement stated as freedom from managing relation states, while independent structural outcomes remain supported?
- Is "technically connected" distinguished from identical content, visibility, structure and ordering?
- Are a language-layer shadow in a concrete language and a structural shadow in a shared hidden layer defined separately?
- Is the initiative's work on editor-maintained database records clearly separated from the Localization Team's infrastructure and services for static XLIFF-based Core and extension labels?
- Is the Localization Team described accurately as maintaining the translation infrastructure and services rather than as being responsible for every translation or wording decision?

Never promote a new table, field, flag, API, shadow-record model or prototype into the vision merely because it looks promising. The vision is defined by the responsibilities and derived product requirements.

## 6. Maintain the canonical narrative

Integrate changes at their semantic location. Preserve this argument:

1. Observed needs and use cases
2. Research findings and verified current behavior
3. Four Responsibilities
4. Derived requirements and vision
5. Open questions
6. Possible solution spaces
7. Achievements
8. Current work
9. Critical alignment
10. Open decisions and next meaningful steps

If new evidence contradicts an existing statement, replace or qualify that statement where it already lives. Do not append a dated correction at the end.

Keep one canonical explanation for each concept. Link to it from another section rather than duplicating it.

## 7. Maintain patch lifecycles

For every relevant patch or issue already named in the Current State and every new relevant patch:

1. Verify the current official state.
2. Check whether its subject, scope, branch or implementation changed.
3. Check the current patch set's Code-Review and Verified votes and count unresolved review comments.
4. Check whether another patch supersedes or overlaps it.
5. For every open Gerrit change, query the current revision's mergeability against its target branch. Record a merge conflict when Gerrit returns `mergeable: false`; record no conflict when it returns `mergeable: true`.
6. Move merged work from Current Work to Achievements.
7. Keep an abandoned patch under **Rejected or superseded** only when its replacement, rejection reason or learned constraint remains relevant, and state that reason briefly.
8. Keep the distinction between a patch's immediate value and its relationship to the vision.

Give every open Core patch exactly one primary listing using this precedence and classification:

1. **Work in progress (WIP):** Gerrit marks the change WIP or its current subject contains `[WIP]`. WIP takes precedence even when negative votes or unresolved comments also exist.
2. **Review action required:** the change is not WIP and its current patch set has at least one unresolved comment, a negative Code-Review vote or a negative Verified vote.
3. **Review-positive and mergeable:** this is the final patch category used by the Current State. The change is not WIP, has at least one current Code-Review `+1`, has no current negative vote, has no unresolved comment and Gerrit reports `mergeable: true`. This describes review state; it does not replace the submit permission or required maintainer approval.
4. **Awaiting review:** the change is not WIP, has no current review blocker and is open, but has no current positive Code-Review. Keep this category so such a patch is not misrepresented as final.
5. **Rejected or superseded:** the change is formally abandoned and its reason remains relevant to the current work.

Use separate columns for review state, merge conflict and semantic scope. For all open patches state **Yes** or **No** in the merge-conflict column and record the date on which mergeability was checked. Apply the same live mergeability check to relevant supporting pull requests outside Core and list them separately from the Gerrit categories. Use **Not applicable** for merged, abandoned or non-patch work. Treat mergeability as volatile external state and recheck it on every Current State update.

Never call a WIP inventory a test suite, a prototype an implementation, an open issue a patch or a merged incremental fix confirmation of the future architecture.

## 8. Treat vision changes as high-impact changes

Before changing the vision, establish all of the following:

1. The new evidence changes understanding of a need or responsibility, not only an implementation detail.
2. A prior assumption was disproved or materially refined.
3. The source supports an initiative-level position rather than one participant's idea.
4. Related requirements, solution spaces, open questions and assessments are updated consistently.
5. The language still respects the initiative's decision boundary.

Community feedback can establish a need or problem without selecting the initiative's solution. In particular, mode switching and Mixed Mode are documented problems, while Free Mode is also valued for independent content. Treat removal of the editor-visible mode distinction as the initiative's product recommendation derived from that evidence, not as a literal unanimous survey result or a deprecation of independent behavior.

The latest comparative preference favors a shared hidden, language-neutral structural layer over complete per-language shadows because of qualitative duplication, synchronization and Workspace concerns. Keep this as a current direction for investigation and simultaneously as an unselected hypothesis. Do not promote it to a Core decision or implemented architecture. Do not use a fixed record-multiplier example, including a claimed number of shadows produced by a reorder, unless the selected model and a reproducible count support it.

If those conditions are not met, update the relevant solution approach or open question instead of the vision.

## 9. Evaluate parallel solutions fairly

For relevant work not owned by the initiative, document:

1. the real problem it addresses;
2. whether it is useful within that scope;
3. the affected responsibility;
4. whether responsibilities remain sufficiently separate;
5. new special cases or coupling it introduces;
6. compatibility with the long-term requirements;
7. whether it preserves a later evolution path;
8. a better bounded alternative, only when evidence supports one.

Do not reject a useful incremental fix merely because it does not implement the entire vision.

## 10. Maintain both language versions

`current-state.md` remains the canonical working source. After its semantic update is complete, update `current-state.de.md` to the same state before finishing the task:

1. Preserve the complete structure, claim scope, evidence links, status distinctions and decision boundaries of the English source.
2. Translate explanatory prose precisely, but retain established TYPO3 Core names and technical identifiers such as `Site Language`, `Default Language`, Connected Mode, Free Mode, Mixed Mode, `Language All`, DataHandler, Workspaces, Extbase and TCA.
3. Verify user-facing module names against the current Core checkout. As of TYPO3 v14 the relevant labels are Layout, Records and Media; do not reintroduce the former Page, List or Filelist module names. In English prose use, for example, Layout module. In German prose retain the label, for example, Modul „Layout“. Keep Page Tree where the tree itself is meant.
4. Do not strengthen, weaken or resolve a claim through translation.
5. Keep the four responsibility names **Language Identity**, **Synchronization Intent**, **Structural Identity** and **Output Policy** visible in both versions.
6. Keep the metadata cutoff values identical in both documents.
7. Ensure that both published versions link to each other through their absolute Notes URLs.

## 11. Update metadata only after integration

After all content changes are complete:

1. Set `last_updated` in both Current State files to the update date.
2. Set both source cutoffs to the latest fully reviewed source dates.
3. Set `external_status_checked_through` only if current Core/Gerrit/Forge states were actually revalidated.
4. Copy the same four values into this maintenance document under `last_completed_update` and the three cutoff fields.
5. Ensure the metadata in all three files agrees exactly.

## 12. Required quality checks

Read both complete language versions from beginning to end and verify:

- a reader outside the initiative can understand every central term;
- the document begins with needs and findings, not a preferred implementation;
- Identity → Synchronization → Structure → Output remains the conceptual order;
- current behavior, findings, requirements, vision, approaches and decisions are distinguishable;
- BCP 47 is not presented as implemented record storage;
- `-1` replacement has a visible lifecycle and migration boundary;
- current Language-All behavior is described as one complete `-1` record being selected across languages and returned unchanged by overlay;
- first-stage `-1` replacement preserves all-target, full-record behavior before optional target-language or field-level granularity;
- first-stage record-level enforcement has explicit precedence over per-field `custom` choices and does not expose an ineffective editor opt-out;
- a technical reuse path through DataHandler target creation and enforced field propagation is not presented as current implementation or a drop-in TCA switch;
- the current DataMapProcessor limitation is visible: it skips `-1` records and synchronizes only existing connected targets;
- a target-language multi-select is classified as a possible feature with open identity and deselection lifecycle, not a committed first or next feature;
- current field synchronization distinguishes the configuration-enforced `l10n_mode=exclude` path from the editor-selectable `allowLanguageSynchronization` and `l10n_state` path;
- `enforceLanguageSynchronization` is not presented as implemented or selected without new evidence;
- field-level synchronization consolidation is not conflated with record-wide replacement of `-1`;
- removal of `l10n_mode=exclude` is not proposed without considering migration, `prefixLangTitle`, default behavior and extension compatibility;
- complete layers, shadows and a neutral structure are not presented as selected architecture without a new decision;
- the current preference for a shared hidden structure over universal per-language shadows is visible without being called selected or implemented;
- language-layer shadows and structural shadows are not conflated;
- hiding a structural layer from backend and frontend output is described as desired behavior, not current Core behavior;
- editor-visible mode removal is presented as a product recommendation with automatic creation, integrity, lifecycle and migration prerequisites;
- "always connected" or "technically connected" is not presented as identical per-language content, visibility, structure or ordering;
- the feedback matrix is not misrepresented as a unanimous request to remove Free Mode behavior;
- no unmeasured record or Shadow-Record multiplier is presented as fact;
- Free Mode is not called deprecated without evidence;
- Editing Language is not called implemented without evidence;
- frontend fallback is not equated with backend structural relation;
- merged patches and active patches are not mixed;
- every open patch appears exactly once under WIP, Review action required, Review-positive and mergeable, or Awaiting review;
- WIP classification takes precedence over review findings;
- every open patch has a live-checked **Yes** or **No** merge-conflict value;
- no patch is called review-positive and mergeable while it has an unresolved comment, a current negative vote, no Code-Review `+1` or `mergeable: false`;
- abandoned patches retained under Rejected or superseded have a concise, officially supported reason;
- no obsolete patch state remains;
- no information is duplicated as a standalone TODO list;
- the German document contains every claim from the English document with the same semantic and evidential status;
- established TYPO3 Core names and technical identifiers were not translated into misleading alternatives;
- current user-facing Core module names are used consistently, especially Layout, Records and Media instead of their former names;
- the boundary to the Localization Team is visible: static-label translation through XLIFF, Crowdin, Crowdin Bridge and Language Packs is not conflated with translation handling for editor-maintained database records;
- the Localization Team is not inaccurately described as performing every translation; its primary responsibility for infrastructure and services remains clear;
- both language versions link to each other through the correct absolute Notes URLs;
- every Markdown link in both published Current State documents is an absolute HTTPS URL;
- every linked weekly minute uses the corresponding Notes URL from `MeetingMinutes/overview.md`;
- no published link contains a `TODO-*` placeholder;
- external links are authoritative where possible;
- Markdown tables have consistent column counts;
- `git diff --check` passes;
- unrelated user changes remain untouched.

## 13. Execute the update

Perform the update directly in the repository:

1. Read the selected new sources completely.
2. Build a private change ledger with evidence, status and affected responsibility.
3. Revalidate time-sensitive external state.
4. Edit existing statements at their canonical locations in the English source.
5. Add only genuinely new concepts or work.
6. Remove or replace superseded claims.
7. Move patch entries when their lifecycle state changes.
8. Synchronize the German translation without changing claim meaning or terminology status.
9. Update all three metadata blocks.
10. Run the required checks.
11. Report which findings changed the Current State, which sources were reviewed and which decisions remain open.
