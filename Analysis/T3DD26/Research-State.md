# T3DD26 Translation Handling Analysis – Research State

**Stand:** 2026-08-08<br>
**Purpose:** Durable checkpoint for the source analysis behind the T3DD26 session “Translation Handling in TYPO3: Where We Are and Where We Could Go”. This file records the central findings that must survive independently of the working conversation. The complete period dossiers live in `SourceAudits/`; the final synthesis lives next to this file.

## Corpus and method

- Fully reviewed corpus: 121 Markdown documents under `MeetingMinutes/` and 13 text transcripts under `Transcripts/`.
- Source volume counted by `wc -l`: 8,874 Meeting Minutes lines plus 8,722 transcript lines (17,596 total).
- `.DS_Store` files are metadata, not documents, and were excluded.
- Every source period is audited in a separate dossier with exact repository path and line references, including reviewed files that yielded no distinct session-relevant evidence.
- Later evidence takes precedence over older intermediate positions.
- The controlled status vocabulary for the final analysis is: `Current Core Behavior`, `Problem`, `Idea`, `Discussed Direction`, `Preferred Direction`, `Open Question`, `Planned`, `In Progress`, `Implemented`, and `Analytically Derived Recommendation`.

## Strongest source-supported conclusions

1. **The current model conflates three concerns.** Numeric record-language values (`0`, `-1`, positive IDs), structural relationships (`l10n_parent`, Default Language), and runtime availability (overlays and fallback chains) interact across DataHandler, backend modules, Extbase, frontend rendering, permissions, import/export, Workspaces, and other subsystems.
2. **Removing the semantic special value `-1` is the strongest long-running preferred direction.** The repeatedly discussed replacement is explicit synchronization into concrete target-language records, initially sketched as a Boolean on a source/default record and later as a selectable target-language set; that exact field/API design is not decided.
3. **The replacement lifecycle is not designed.** Activation over existing manual translations, deactivation, provenance of generated copies, conflict behavior, new-language handling, deletion/detachment, Workspace/versioning behavior, and migration safety remain open.
4. **BCP 47 is the preferred semantic language identity.** The sources motivate it through cross-site/cross-instance reuse, global storage, translated file metadata, language exchange, and the ambiguity of local numeric IDs. Whether numeric surrogate database IDs remain internally is not decided; that separation is an analytical architecture option.
5. **The special structural role of `0` is meant to be reconsidered, but the replacement is open.** Source-backed alternatives are (a) complete structural representation in every language with shadow/placeholder records and (b) a hidden language-neutral or structure-only layer. The sources do not define a final independent identity-table schema.
6. **Complete language layers are a discussed direction, not a decided architecture.** They could reduce overlays, missing-record branches, and query-time special cases and would add persisted rows plus synchronization work. Exact effects on write amplification, Workspace versions, Reference Index and backend filtering remain measurement questions.
7. **The data-versus-code trade-off is unresolved.** Earlier minutes accepted denormalization strongly; later discussions re-opened database economy, synchronization, and Core-maintainer acceptance as a foundational decision. No corpus-wide benchmark quantifies the trade-off.
8. **The UX goal is stronger than any particular data model.** Editors should create or adapt content where it is needed while TYPO3 manages relations. An “Editing Language” was discussed as the current editorial context, distinct from backend UI language, and as a basis for Page Tree/Page Module/List Module behavior.
9. **Free Mode is not formally deprecated.** The sources support reducing or removing technical mode choices from editorial UX and avoiding Mixed Mode inconsistencies. Newer sources still recognize independent structure as valid and continue fixing Free Mode behavior.
10. **The mature implementation principle is incremental.** Inventory semantics, characterize behavior with tests, merge bounded correctness fixes, decide architecture, introduce an explicit alternative, migrate safely, then deprecate/remove old semantics and prove preserved use cases.

## Important historical corrections

- **2024-03:** automatic hidden default-language control records were rejected because sorting, permissions, and structural control could become confusing.
- **2025-07 onward:** the same family of ideas returned as two explicit alternatives—per-language shadow structures versus a central structure-only layer—and was explored further in 2026. The older rejection therefore became a design warning, not a final veto.
- **2024:** database denormalization was described as acceptable or even non-negotiable to reduce complexity.
- **2025/2026:** performance, duplication, synchronization, Workspaces, and Core-maintainer concerns reopened the question. The youngest defensible status is `Open Question`.
- **2025:** some meetings envisioned eliminating Free/Connected/Mixed modes altogether.
- **2026:** concrete Free Mode fixes and a valid independent-structure escape hatch remained important. The safe current claim is “remove unnecessary mode decisions from UX,” not “Free Mode will be deprecated.”
- **2026-06:** `-1` → `0` → BCP 47 → hidden structure was articulated as a communicable sequence.
- **2026-07:** the hidden layer was explicitly called a hypothesis, and governance/priority remained uncertain. The sequence is a reasoning path, not a committed roadmap.

## Current implementation state that must not be overstated

- Gerrit change `92267` is currently `[WIP][TASK] Mark LanguageAll record handling` on `main` (patch set 6, updated 2026-08-07). Its commit message says it adds TODO markers around persisted `LanguageAll` (`-1`) reads, writes, filters, interpretations, assertions, and fixtures. It touches 39 files. It does **not** implement the replacement model or a complete characterization-test suite.
- Separate work has targeted missing Workspace copy coverage for `Language All` and other narrow behaviors. These must not be conflated with `92267`.
- Several bounded bugfixes/refactors have been merged or were in review, including target-language copy filtering, non-language-aware IRRE localization behavior, Mount Point translation, Free Mode display/copy behavior, duplicate translation-parent prevention, and empty-`l10n_source` lookup. They harden today's system but do not implement the target architecture.
- Site Configuration Languages cannot represent record language `-1`; characterization tests for `Language All` must therefore use record fixtures and relevant runtime paths, not fabricate a `-1` site language.

## Architectural decision gates

1. What is the authoritative semantic language identity, and how is it mapped to Site Languages and optional internal numeric keys?
2. What groups language variants into one logical record identity when no concrete language is privileged?
3. Are missing per-language records materialized as shadows, represented through a central identity/structure layer, or handled through a hybrid?
4. Which data is duplicated: full content, structure only, or a proxy/reference?
5. How are generated records marked, versioned, restored, detached, deleted, indexed, and hidden from editors?
6. What exactly happens when explicit synchronization is activated or deactivated in the presence of editorial translations?
7. Which current fallbacks remain runtime behavior, and which are replaced by synchronized persistence?
8. Which editorial choices remain explicit after TYPO3 manages technical relations automatically?

## Safest session thesis

TYPO3’s complexity does not come from multilingual content alone; it comes from implicit states and several different concerns encoded through the same numeric values and default-language relation. The initiative prefers stable semantic language identities and an explicit replacement for `Language All`, while exploring ways to separate structural identity from concrete language content. Completing language layers and a hidden structure/identity layer are competing or combinable hypotheses. The immediate work is therefore characterization and bounded Core hardening, not a big-bang rewrite. The architectural trade-off—more explicit persisted data versus more conditional runtime logic—remains the central open discussion.

## Durable output set

- `T3DD26-Session-Analysis.md`: evidence-backed synthesis with all requested chapters.
- `Decision-and-Evidence-Register.md`: strict status, evolution, contradiction, priority, and source matrix.
- `Architecture-Options-and-Open-Questions.md`: current sparse model, full layers/shadows, neutral layer, and explicitly analytical hybrid.
- `Evolution-and-Migration-Path.md`: parallel tracks, decision gates, risks, compatibility, and migration steps.
- `T3DD26-Session-Deck-Blueprint.md`: timed main and backup slides with source/status/priority fields.
- `SourceAudits/*.md`: complete period and meta-document evidence dossiers.
- `External-Technical-Validation.md`: official session/Gerrit verification and local thematic cross-check.
- `QA-Report.md`: final coverage, citation, structure, content-status, and repository-boundary verification.
- `README.md`: navigation, corpus coverage, status model, and reuse guidance.
