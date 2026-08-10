# T3DD26 source dossier: monthly reports and meta documents

## Scope, source hierarchy, and cautions

- Fully reviewed all 16 Markdown files under `MeetingMinutes/Monthly/`, plus `MeetingMinutes/current-state.md`, `MeetingMinutes/todos.md`, and `MeetingMinutes/overview.md`: 19 files / 1,299 lines in total.
- No source document was edited. The only repository write was the separately requested persisted audit artifact. Pre-existing user changes (`MeetingMinutes/overview.md` modified and `MeetingMinutes/Weekly/2026/07/31.md` untracked) were treated as read-only.
- Monthly reports are edited, secondary syntheses. Each report names the weekly meetings it covers; the same meetings and themes are indexed in `overview.md`. A monthly report is therefore useful for initiative-level emphasis and status, but a weekly minute or transcript should be preferred for detailed technical semantics and speaker context.
- `overview.md` is an index whose one-line descriptions are useful locators and chronology evidence, not substitutes for the underlying minutes. Verbs such as “discussion,” “strategy,” or “planning” in those descriptions do not establish consensus by themselves.
- `current-state.md` has no internal date. Every line is from repository commit `c6a0168b` dated 2024-07-05. Its headings are authoritative only for that snapshot, not for August 2026.
- `todos.md` has no internal date. Its current lines were committed in repository commit `b7393f1d` dated 2024-12-13, but the content reads like an older planning list. Treat every unchecked item as a historical intention, not a current task.
- `overview.md` currently reaches 2026-07-31 (`MeetingMinutes/overview.md:360-367`). It is the freshest of this subset, but its latest summaries still require the linked weekly minutes/transcripts for precision.
- There is no August 2024 monthly Markdown file; `overview.md` explicitly records the summer break and says that report was pending (`MeetingMinutes/overview.md:126-133`).
- In compact tables below, `Monthly/...` means `MeetingMinutes/Monthly/...`, while `overview.md`, `current-state.md`, and `todos.md` mean the corresponding files directly under `MeetingMinutes/`. Every citation uses 1-based inclusive line ranges from the reviewed worktree snapshot.

### Status taxonomy used here

| Status | Application in this dossier |
|---|---|
| Current Core Behavior | A source describes how TYPO3 behaved at that source date. This does not independently verify current v14/v15 code. |
| Problem | A documented deficiency, inconsistency, ambiguity, or UX burden. |
| Idea | A possible solution or exploratory model without directional commitment. |
| Discussed Direction | Repeated or structured discussion, but no clear selection. |
| Preferred Direction | Explicitly called a primary goal, focus, decision, or long-term plan. It is still not a committed Core roadmap. |
| Open Question | Feasibility, migration, semantics, or architecture remained unresolved. |
| Planned | The initiative explicitly intended a concrete next activity. |
| In Progress | Work or a WIP patch/test/prototype was underway at that source date. |
| Implemented | The source identifies a completed/merged change and, where available, a commit. |
| Analytically Derived Recommendation | A step inferred in this dossier; never attributed to the initiative. |

## High-confidence conclusions from this source subset

1. The initiative’s architectural line began with language-independent structure and BCP 47 exploration, alongside investigation of Free/Connected Mode and fallback behavior (`MeetingMinutes/Monthly/2023-11-monthly.md:18-24`).
2. It identified dispersed fallback/overlay handling as a code-complexity problem: too many code locations react to fallback types and should be made easier to understand and streamlined (`MeetingMinutes/Monthly/2023-12-monthly.md:14-21`; `MeetingMinutes/overview.md:31-36`).
3. By January 2024, removal of `sys_language_uid = -1` was stated as a primary goal, with a boolean on a default-language record discussed as the replacement and BCP 47 strings framed as a language-identification goal (`MeetingMinutes/Monthly/2024-01-monthly.md:12-19`).
4. A July 2024 planning snapshot records three long-term directions together: replace `-1` with a boolean that triggers DataHandler cross-language synchronization, make default-language identification configurable, and replace integer language identification with BCP 47 strings (`MeetingMinutes/current-state.md:46-50`). This is historical strategy evidence, not proof that all three remain unchanged today.
5. The initiative explicitly paused the configurable-default-language patch in June 2024 to focus on removing `-1`, because the latter was seen as blocking other efforts (`MeetingMinutes/Monthly/2024-06-monthly.md:16-18,43-48`). This is the clearest early prioritization signal.
6. Synchronization thinking evolved from a possible replacement of `l10n_mode=exclude` by `enforceLanguageSynchronization` (`MeetingMinutes/Monthly/2024-04-monthly.md:20-23`) to a three-state TCA model—none, `allowLanguageSynchronization`, `enforceLanguageSynchronization`—in October 2024 (`MeetingMinutes/Monthly/2024-10-monthly.md:27-29`). That evolution argues against presenting wholesale replacement as decided.
7. The data-completeness idea appears by October/November 2024: generate hidden missing translations to keep MM relations language-consistent, and develop a strategy focused on “linguistic completeness” of the database (`MeetingMinutes/Monthly/2024-10-monthly.md:16-18`; `MeetingMinutes/Monthly/2024-11-monthly.md:20-25`). Later overview entries explicitly name language-layer unification, shadow records, and a hidden structural layer (`MeetingMinutes/overview.md:251-256,284-287,348-358`).
8. Editorial simplification is a genuine product thread. Early work explored switching between Free and Connected Mode; the July 2024 snapshot says such a switch should eventually become superfluous (`MeetingMinutes/Monthly/2023-11-monthly.md:18-20`; `MeetingMinutes/current-state.md:51-55`). This does **not** establish a formal “Free Mode deprecation.”
9. The testing path is well supported: functional tests were emphasized in January 2024, a `Language All` test inventory including workspaces was assembled in November 2024, and later summaries show AI-assisted inventory/manual validation of `-1` usages followed by tests/refactoring (`MeetingMinutes/Monthly/2024-01-monthly.md:16-17`; `MeetingMinutes/Monthly/2024-11-monthly.md:31-38`; `MeetingMinutes/overview.md:313-321`).
10. Migration was not treated as a trivial field rewrite. The sources mention an upgrade-wizard idea to transition `-1` records to language `0`, backward compatibility, production validation, migration error handling, and resource-constrained phasing (`MeetingMinutes/Monthly/2024-09-monthly.md:20-22`; `MeetingMinutes/Monthly/2025-01-monthly.md:14-29`). The language-`0` idea is best read as an interim migration option because later material explicitly discusses transition from `-1`/`0` to BCP 47 (`MeetingMinutes/overview.md:263-266`).
11. The freshest overview evidence shows a move from broad concept work to small Core preparation: `-1` analysis/tests, a v15 roadmap discussion, hidden-structure prototypes, explicit synchronization direction, and T3DD planning (`MeetingMinutes/overview.md:313-321,334-365`). It still does not demonstrate a settled final data model.
12. Several requested T3DD26 details are **not adequately evidenced in this subset**: exact activation/deactivation semantics for an All-Languages flag; an immutable meaning of `enforceLanguageSynchronization`; quantitative database growth; Reference Index/Workspace/versioning consequences of shadow records; whether numeric database IDs remain alongside BCP 47; or the exact implementation/status of Gerrit change `92267`. Those must come from weekly minutes/transcripts and technical validation.

## Complete reviewed-file register and relationship to weekly material

“Overlap” means thematic overlap established from the report’s listed weekly meetings and the matching per-week descriptions in `overview.md`; it does not claim verbatim identity. “Distinct context” means monthly-level synthesis, priority, status, or future framing. It may still originate in a weekly discussion.

| Reviewed file | Date | T3DD26 evidence | Weekly overlap | Distinct monthly/meta context worth retaining |
|---|---:|---|---|---|
| `MeetingMinutes/Monthly/2023-11-monthly.md` | 2023-11 | High: Free/Connected Mode, fallbacks, language-independent structure, translatable tree, BCP 47 (`:13-27`) | Strong overlap with four indexed weeks (`overview.md:16-24`; report meeting list `:53-58`) | First-report/founding framing and parallel test-extension/prototype work (`:10-28`); use mainly as synthesis. |
| `MeetingMinutes/Monthly/2023-12-monthly.md` | 2023-12 | High: fallback logic is dispersed; testing extension covers fallback combinations (`:14-29`) | Strong overlap with four indexed weeks (`overview.md:28-37`; report `:57-62`) | Explicit initiative-level realization that fallback handling is too scattered and should be streamlined (`:14-17`); need for Core-developer alignment (`:44-48`). |
| `MeetingMinutes/Monthly/2024-01-monthly.md` | 2024-01 | Essential: `-1`, boolean replacement, BCP 47, functional tests, default/structure alternatives (`:12-25`) | Same-month weekly index covers Core discussion/testing/default storage (`overview.md:43-50`; report `:56-60`) | The report states the strongest compact formulation: `-1` as “primary goal,” boolean alternative, BCP 47 goal, approximate roadmap (`:12-19`). Corroborate in weekly/transcript before treating wording as consensus. |
| `MeetingMinutes/Monthly/2024-02-monthly.md` | 2024-02 | Useful: Free/Connected transition, `t3_origuid`, inline relations, DataHandler pages-vs-records, `l10n_mode=exclude` (`:12-29`) | Very strong overlap (`overview.md:54-62`; report `:54-59`) | Mostly consolidation; future Q2/Q3/patch process framing (`:33-38`) adds program context, not architecture. |
| `MeetingMinutes/Monthly/2024-03-monthly.md` | 2024-03 | Useful: structural edits from non-default languages, page/content behavior, editor hurdles, missing target translations (`:12-26`) | Very strong overlap (`overview.md:66-75`; report `:51-56`) | Editor-perspective validation is highlighted at report level (`:21-23`); otherwise mostly recap. |
| `MeetingMinutes/Monthly/2024-04-monthly.md` | 2024-04 | Essential for synchronization evolution: `exclude` vs `enforceLanguageSynchronization`, MM relations, test patch (`:18-24`) | Very strong overlap (`overview.md:79-87`; report `:47-52`) | Monthly status identifies test patch `83632` as completed and shifts focus to `84237` (`:26-30,42-45`). |
| `MeetingMinutes/Monthly/2024-05-monthly.md` | 2024-05 | High: XLIFF, variable default-language ID/GUI, WIP patch `84338`, completed copy tests/bugfix (`:11-28`) | Very strong overlap (`overview.md:92-100`; report `:49-54`) | Explicit need for Core-team opinion and for a priority sequence in a Current State document (`:41-47`). |
| `MeetingMinutes/Monthly/2024-06-monthly.md` | 2024-06 | Essential: default-ID patch paused in favor of `-1`, mission-statement planning, locale limitations (`:11-31`) | Very strong overlap (`overview.md:104-112`; report `:50-55`) | Clearest initiative-level pivot and rationale: focus on `-1` because it obstructs other work (`:43-48`). |
| `MeetingMinutes/Monthly/2024-07-montly.md` | 2024-07 | High: `-1` deprecation feasibility, adequate replacement, deprecation draft (`:11-25`) | Strong overlap (`overview.md:116-124`; report `:43-47`); one weekly recording was broken (`overview.md:120-123`) | Monthly confirms draft existence and repeats strategic focus (`:23-25,35-41`). No August report followed. |
| `MeetingMinutes/Monthly/2024-09-monthly.md` | 2024-09 | High: IRRE/MM consistency, translation-parent idea, upgrade wizard to `0`, backward compatibility (`:12-22`) | Strong overlap (`overview.md:137-145`; report `:48-53`) | Compact migration framing and “main goal” language (`:20-22,43-46`). The `0` migration proposal needs later-context qualification. |
| `MeetingMinutes/Monthly/2024-10-monthly.md` | 2024-10 | Essential: hidden missing translations, `-1` sorting tests, exact synchronization states (`:12-29`) | Very strong overlap (`overview.md:149-156`; report `:52-56`) | Exact tri-state naming is more useful than the overview summary; it remains discussion, not implementation (`:27-29`). |
| `MeetingMinutes/Monthly/2024-11-monthly.md` | 2024-11 | Essential: BCP 47 public framing, database completeness, frontend record translatability, workspace test inventory (`:12-32`) | Strong overlap (`overview.md:162-168`; report `:54-58`) | Q1 2025 timetable and “linguistic completeness” framing for the funded strategy paper (`:20-22,34-38`). |
| `MeetingMinutes/Monthly/2024-12-monthly.md` | 2024-12 | High: default sync for `tt_content.assets`, DataHandler checks, `-1` coverage/validation (`:14-21`) | Very strong overlap (`overview.md:172-178`; report `:42-45`) | Funding request submitted and next-step bundle (`:14,23-28`); Core-merger risk criteria unresolved (`:34-36`). |
| `MeetingMinutes/Monthly/2025-01-monthly.md` | 2025-01 | Essential: `-1` edge/fallback cases, sync/relations, localization vs generic sync, UI, file translation, migration phasing (`:14-29`) | Very strong overlap (`overview.md:184-192`; report `:43-48`) | Best monthly synthesis of migration breadth and resource constraints; production validation/error handling are explicit planned work (`:21-29`). |
| `MeetingMinutes/Monthly/2025-02-monthly.md` | 2025-02 | Limited/useful: `-1`, UI, sorting, funding-dependent roadmap (`:14-25`) | Very strong overlap (`overview.md:196-202`; report `:40-44`) | Mostly organizational consolidation; no distinct architecture decision. |
| `MeetingMinutes/Monthly/2025-03-monthly.md` | 2025-03 | Limited/useful: concept milestones, vision/current-state documentation, sorting (`:9-21`) | Very strong overlap (`overview.md:206-213`; report `:35-39`) | Confirms concept maturation and cross-CMS research, but provides almost no technical semantics. |
| `MeetingMinutes/current-state.md` | Snapshot 2024-07-05 | Essential historical status map: work, long-term plan, statements, completed patches (`:9-70`) | Consolidates topics already present in late-2023/2024 weekly/monthly material | Distinct value is explicit status headings. Stale items and later reversals must be reconciled. |
| `MeetingMinutes/todos.md` | Undated content; committed 2024-12-13 | Useful historical backlog: page/record standardization, fallback distinction, mixed mode, `-1` boolean, BCP 47, tests (`:7-23`) | Repeats early initiative topics | No item is safe to call a current TODO. Its value is evidence that these questions were once explicit work items. |
| `MeetingMinutes/overview.md` | 2023-10-27 through 2026-07-31 | Essential chronology/locator for every weekly source, especially 2025-04 onward (`:7-367`) | By definition indexes weekly material; monthly-report links are included through 2025-03 | Adds no detailed primary evidence, but reveals evolution, missing/canceled meetings, and newest topic sequence. |

### No-evidence audit

- No reviewed file was completely devoid of T3DD26-relevant material.
- `2025-02-monthly.md` and `2025-03-monthly.md` are the weakest technically; use them only for roadmap/funding/concept maturation, not architecture semantics.
- Administrative, attendance, website, meeting-time, event, and generic funding passages in all reports have no direct architecture evidence unless specifically cited above.

## Chronological evidence matrix: 2023 to March 2025

| Date | Evidence | Status | Priority | Exact source |
|---|---|---|---|---|
| 2023-11 | Free/Connected Mode and switching were under investigation. | Current Core Behavior / Problem | Useful | `Monthly/2023-11-monthly.md:18-20` |
| 2023-11 | Default-language structure might be made language-independent; a translatable page tree prototype was underway. | Idea / In Progress | Essential | `Monthly/2023-11-monthly.md:21-24` |
| 2023-11 | Languages stored according to BCP 47 were being explored. | Idea | Essential | `Monthly/2023-11-monthly.md:21-24` |
| 2023-11-10 | Language tags, node-based storage, cloned language-output cache tables, and database-size implications were discussed. | Idea / Open Question | Useful | `overview.md:18-19` |
| 2023-11-17 | Publishing-channel vs language-tag concepts and separate language-information tables were debated. | Idea / Open Question | Optional | `overview.md:20-21` |
| 2023-12 | Fallback handling occurred in too many code locations, making behavior hard to understand and motivating streamlining. | Problem / Discussed Direction | Essential | `Monthly/2023-12-monthly.md:14-21` |
| 2023-12 | The test extension generated all fallback-type/chain combinations; color names avoided real-language assumptions. | In Progress | Useful | `Monthly/2023-12-monthly.md:22-29` |
| 2023-12-29 | Overlay code complexity and possible centralized fallback handling were examined. | Problem / Idea | Essential | `overview.md:33-36` |
| 2024-01 | Removal of `-1` was named a primary goal; a boolean at default-record level was discussed for All Languages. | Preferred Direction / Idea | Essential | `Monthly/2024-01-monthly.md:12-15` |
| 2024-01 | Converting integer language storage to BCP 47 strings was named a goal; functional tests were emphasized. | Preferred Direction / Planned | Essential | `Monthly/2024-01-monthly.md:15-19` |
| 2024-01 | A content-less structural layer and variable default-language status were compared. | Idea / Open Question | Essential | `Monthly/2024-01-monthly.md:24-25` |
| 2024-02 | Reconnecting Free-Mode content raised `t3_origuid`, new-record, inline-relation, and test-scenario questions. | Problem / Discussed Direction | Useful | `Monthly/2024-02-monthly.md:12-18` |
| 2024-02 | DataHandler’s page/record distinction and `l10n_mode=exclude` issues were explicitly examined. | Current Core Behavior / Problem | Essential | `Monthly/2024-02-monthly.md:25-28` |
| 2024-03 | Structural editing for editors limited to non-default languages, and page/content behavior standardization, were discussed. | Problem / Idea | Essential | `Monthly/2024-03-monthly.md:12-15` |
| 2024-03 | Direct editor interviews identified hurdles in the translation process. | Problem | Useful | `Monthly/2024-03-monthly.md:21-23` |
| 2024-03 | Copy/move of translated content to a target lacking the translation, and `exclude` behavior, were active patch topics. | Problem / In Progress | Useful | `Monthly/2024-03-monthly.md:24-26` |
| 2024-04 | `enforceLanguageSynchronization` in `l10n_state` was considered as a possible `l10n_mode=exclude` replacement; MM relations complicated it. | Idea / Open Question | Essential | `Monthly/2024-04-monthly.md:20-23` |
| 2024-04 | DataHandler test data patch `83632` was finalized; actual copy-process change `84237` became the next focus. | Implemented / In Progress | Useful | `Monthly/2024-04-monthly.md:18-19,26-30,42-45` |
| 2024-05 | XLIFF label-management improvements were discussed. | Idea | Optional | `Monthly/2024-05-monthly.md:10-12` |
| 2024-05 | Variable default-language identification and its Backend GUI effects were explored in WIP patch `84338`. | In Progress / Open Question | Essential | `Monthly/2024-05-monthly.md:18-24` |
| 2024-05 | Copy tests `83310` and orphan-copy fix `84237` were described as finalized; move handling remained planned. | Implemented / Planned | Useful | `Monthly/2024-05-monthly.md:25-32` |
| 2024-06 | After Core-team consultation, `84338` was put on hold in favor of removing `-1`. | Preferred Direction / Planned | Essential | `Monthly/2024-06-monthly.md:16-18` |
| 2024-06 | The initiative planned Core consultation and possibly a public mission statement for `-1` removal. | Planned / Open Question | Essential | `Monthly/2024-06-monthly.md:25-31` |
| 2024-06 | `-1` removal became the explicit focus because it was perceived to block other work. | Preferred Direction | Essential | `Monthly/2024-06-monthly.md:43-48` |
| 2024-07 | A deprecation statement/draft existed, but v13 feasibility and an adequate replacement were unresolved. | Planned / Open Question | Essential | `Monthly/2024-07-montly.md:11-25` |
| 2024-09 | IRRE child language on copy and cross-language MM relations were unresolved; a translation-parent field was considered. | Problem / Idea | Useful | `Monthly/2024-09-monthly.md:12-18` |
| 2024-09 | An upgrade wizard converting `-1` to `0` and backward compatibility were discussed. | Idea / Open Question | Essential | `Monthly/2024-09-monthly.md:20-22` |
| 2024-10 | Generating hidden missing translations was considered to maintain MM-relation language consistency. | Idea | Essential | `Monthly/2024-10-monthly.md:16-18` |
| 2024-10 | `-1` sorting tests exposed Free-Mode failures caused by identical sorting values. | Problem / In Progress | Useful | `Monthly/2024-10-monthly.md:20-22` |
| 2024-10 | TCA behavior states none / allow / enforce were proposed. | Discussed Direction | Essential | `Monthly/2024-10-monthly.md:27-29` |
| 2024-11 | A public talk grouped `-1` deprecation, BCP 47, and richer database language information; a talk is evidence of framing, not adoption. | Discussed Direction | Useful | `Monthly/2024-11-monthly.md:12-14` |
| 2024-11 | The planned strategy paper focused on linguistic completeness in the database. | Planned / Discussed Direction | Essential | `Monthly/2024-11-monthly.md:20-22` |
| 2024-11 | The group considered making every frontend-visible record translatable, with exceptions for system tables. | Idea / Open Question | Essential | `Monthly/2024-11-monthly.md:24-25` |
| 2024-11 | A collaborative `Language All` test list targeted comprehensive coverage including workspaces. | In Progress | Essential | `Monthly/2024-11-monthly.md:31-38` |
| 2024-12 | Default language synchronization for `tt_content.assets` in v14 reached agreement subject to change-risk criteria. | Preferred Direction / Planned | Useful | `Monthly/2024-12-monthly.md:14-16,34-36` |
| 2024-12 | DataHandler integrity checks and `-1` test coverage/validation were active. | In Progress / Planned | Essential | `Monthly/2024-12-monthly.md:16-28` |
| 2025-01 | `-1` edge cases, fallback logic, synchronization, relations, and undocumented behavior were inventoried. | Problem / In Progress | Essential | `Monthly/2025-01-monthly.md:14-22` |
| 2025-01 | Localization handling was distinguished from generic DataHandler synchronization. | Discussed Direction | Essential | `Monthly/2025-01-monthly.md:16-18` |
| 2025-01 | Language-tag identification was considered as a possible route to filelist/file translation. | Idea / Open Question | Useful | `Monthly/2025-01-monthly.md:19-20` |
| 2025-01 | Production validation, error handling, synchronization, and a structured implementation plan were next steps. | Planned | Essential | `Monthly/2025-01-monthly.md:24-29` |
| 2025-02 | `-1` implications, UI refinements, and translated-record sorting remained under analysis. | Discussed Direction / Problem | Useful | `Monthly/2025-02-monthly.md:14-18` |
| 2025-02 | Roadmap reassessment depended on priorities and funding. | Planned / Open Question | Optional | `Monthly/2025-02-monthly.md:21-25` |
| 2025-03 | Responsibilities, milestones, long-term goals, vision, and current-state documentation were consolidated. | In Progress | Useful | `Monthly/2025-03-monthly.md:9-16` |
| 2025-03 | A complete structured outline was the planned foundation for the next concept phase. | Planned | Useful | `Monthly/2025-03-monthly.md:18-21` |

## Later evolution visible only through `overview.md` in this subset

These rows are locators. The underlying weekly minutes/transcripts must supply final wording, confidence, and detailed status.

| Meeting date | Indexed evolution | Conservative status | Priority | Source |
|---|---|---|---|---|
| 2025-04-11 | Current-state structure distinguished overlay from fallback and aligned terminology; XLIFF system-text planning appeared. | Discussed Direction | Useful | `overview.md:219-220` |
| 2025-05-02 | Multidimensional translation handling and performance were considered. | Idea / Open Question | Useful | `overview.md:226-227` |
| 2025-05-09 | TYPO3 dimension-model limitations, routing alternatives, and extension use cases were compared. | Problem / Idea | Useful | `overview.md:228-229` |
| 2025-06-13 | Language architecture, synchronization, MM relation challenges, and BCP 47 were used for contributor onboarding. | Discussed Direction | Useful | `overview.md:240-241` |
| 2025-07-11 | Concept work connected language-layer unification, fallback analysis, default-language decoupling, and a BCP 47 roadmap. | Discussed Direction | Essential | `overview.md:251-252` |
| 2025-07-18 | The concept linked overlay/`-1` phase-out, structural models, Free/Connected Mode, and language-layer consistency. | Discussed Direction / Open Question | Essential | `overview.md:253-254` |
| 2025-07-25 | BCP 47 identification, structural decoupling of default language, migration, and modular planning were combined. | Discussed Direction | Essential | `overview.md:255-256` |
| 2025-08-01 | The group separated state/conflicts/goals/measures and wanted goals independent of implementation. | Preferred method / Planned | Essential for presentation discipline | `overview.md:260-261` |
| 2025-08-15 | A parallel strategy for concept and patch work joined `-1` removal, enforced synchronization, and Free Mode clarification. | Discussed Direction | Essential | `overview.md:263-264` |
| 2025-08-22 | A dual track covered field-level synchronization, `l10n_mode`, complex parent/child cases, and transition from `-1`/`0` to BCP 47. | Discussed Direction / Open Question | Essential | `overview.md:265-266` |
| 2025-08-29 | The test extension was revived for IRRE scenarios and reproducible Core analysis. | In Progress | Useful | `overview.md:267-268` |
| 2025-09-05 | Parent/child `-1` behavior, structured cases, TCA variants, and Core-test alignment were under active work. | In Progress | Essential | `overview.md:272-273` |
| 2025-09-19 | Deterministic content generation and mode inconsistencies were being addressed, with Core focus on `-1`. | In Progress | Useful | `overview.md:275-276` |
| 2025-09-26 | An iterative strategy tied `-1` removal, BCP 47, Core tests, migration, UI, and unified translation handling together. | Discussed Direction | Essential | `overview.md:277-278` |
| 2025-10-17 | Test-case modeling and Core-contribution preparation focused on `-1` removal and parent/child synchronization. | In Progress | Essential | `overview.md:284-285` |
| 2025-10-24 | Translation fields, `t3_origuid`, synchronization, and **shadow records vs structural layer** were compared. | Open Question / Competing alternatives | Essential | `overview.md:286-287` |
| 2025-11-14 | IRRE language consistency bugs and a Forge issue were being prepared. | Problem / In Progress | Useful | `overview.md:295-296` |
| 2025-11-21 | Refined IRRE sync/deletion/language rules included a planned `isLanguageAllRecord` replacement for `-1`. | Planned / Discussed Direction | Essential | `overview.md:297-298` |
| 2025-11-28 | A Core WIP patch, `-1` replacement, synchronization redefinition, and orphan handling were planned together. | Planned / In Progress | Essential | `overview.md:299-300` |
| 2026-01-09 | AI-assisted analysis located `-1` uses and proposed annotated TODOs, a WIP patch, review with Lolli, then tests/refactoring. | In Progress / Planned | Essential | `overview.md:313-315` |
| 2026-01-16 | Manual review filtered false positives/nonstandard `-1` uses and connected deprecation/migration to future string identifiers. | In Progress / Discussed Direction | Essential | `overview.md:316-317` |
| 2026-01-23 | Global/local content, fallback difficulties, a duplicate-reference bug, v14 tests, and orphan-page fixes were examined. | Problem / In Progress | Useful | `overview.md:318-319` |
| 2026-01-30 | Non-site contexts, Free Mode filtering, and test expansion accompanied copy-logic fixes. | In Progress | Useful | `overview.md:320-321` |
| 2026-02-06 | Copy patch and a Free Mode rendering fix were finalized; an orphan-translation dbdoctor check remained WIP. | Implemented / In Progress | Useful | `overview.md:325-326` |
| 2026-02-13 | Copy patches were merged; Free Mode test data and DataHandler filtering remained follow-up work. | Implemented / In Progress | Useful | `overview.md:327-328` |
| 2026-02-20 | MM relations and DataHandler refactoring remained concept/work topics. | Discussed Direction | Useful | `overview.md:329-330` |
| 2026-03-13 | Orphan warnings and `Language All` test coverage were active topics. | In Progress | Useful | `overview.md:334-335` |
| 2026-03-20 | DataHandler `Language All` guard research and workspace copy tests were active. | In Progress | Essential | `overview.md:336-337` |
| 2026-03-27 | Non-language-aware IRRE children, Core patches, form storage, and T3DD talk ideas were linked. | In Progress / Planned | Useful | `overview.md:338-339` |
| 2026-04-24 | The index names a v15 `Language All` removal roadmap, Free Mode copy/move patches, tests, and parent/child IRRE rules. | Discussed Direction / In Progress | Essential | `overview.md:343-344` |
| 2026-05-08 | A hidden structural layer, flexible translations, Page Tree UX, an Editing Language selector, and prototype planning emerged together. | Idea / Planned / Open Question | Essential | `overview.md:348-349` |
| 2026-05-29 | Hidden-default prototype work connected shadow records, placeholder visibility/sorting, and structural permissions. | In Progress / Open Question | Essential | `overview.md:350-351` |
| 2026-06-11 | Roadmap framing linked special-value removal, BCP 47, and hidden structural-layer strategy. | Discussed Direction | Essential | `overview.md:355-356` |
| 2026-06-26 | Localization/regionalization use cases, Mixed Mode limits, connected structure, hidden layer, fallbacks, and predictable output were discussed. | Discussed Direction / Open Question | Essential | `overview.md:357-358` |
| 2026-07-10 | Product framing added structure variants, multidimensional content contexts, fallback visibility, and an explicit synchronization direction. | Discussed Direction | Essential | `overview.md:362-363` |
| 2026-07-24 | `-1` tests, Free Mode column rendering, Mixed Mode layout, duplicate `l10n_parent`, wizard source-language behavior, and T3DD planning were active. | Problem / In Progress / Planned | Essential | `overview.md:364-365` |
| 2026-07-31 | Strict Mode fallback chains, site-scoped fallback options, and cross-site language identity were discussed. | Problem / Idea / Open Question | Essential | `overview.md:366-367` |

## Topic dossiers

### 1. BCP 47 and stable language identity

**Supported evolution**

1. Exploratory: BCP 47 storage was an idea in November 2023 (`Monthly/2023-11-monthly.md:21-24`).
2. Goal wording: January 2024 says convert integer storage to BCP 47 strings (`Monthly/2024-01-monthly.md:12-19`).
3. Historical long-term plan: July 2024 Current State repeats replacement of integer `sys_language_uid` with a BCP 47 string (`current-state.md:46-50`); the historical TODO list repeats it (`todos.md:15-18`).
4. Concept integration: July–September 2025 links BCP 47 to default-language decoupling, layer unification, migration, and unified translation handling (`overview.md:251-256,263-278`).
5. Current framing: June/July 2026 links the identifier path to special-value cleanup, hidden structure, multidimensional contexts, and cross-site identity (`overview.md:355-367`).

**Status:** `Preferred Direction` at initiative-concept level, not `Implemented`, and not proven to be an accepted Core roadmap.

**Do not overclaim:** This subset repeatedly says “replace integer with string.” It does **not** support the more nuanced claim that BCP 47 is only the domain identity while numeric IDs definitely remain as internal foreign keys. That hybrid is plausible but must be sourced elsewhere or marked `Analytically Derived Recommendation`.

**Cross-site/File support:** Filelist translation is only a question in January 2025 (`Monthly/2025-01-monthly.md:19-20`). Cross-site identity appears only in the 2026-07-31 overview label (`overview.md:366-367`). Global/local content appears in the 2026-01-23 label (`overview.md:318-319`). No reviewed source details global storage-page mechanics or provides a complete cross-site use case.

### 2. Replacing `sys_language_uid = -1`

**Supported evolution**

- January 2024: primary goal; boolean on default-language record as alternative (`Monthly/2024-01-monthly.md:12-15`).
- July 2024 historical state: long-term plan specifies a boolean on the default record that triggers cross-language DataHandler synchronization (`current-state.md:46-49`).
- June/July 2024: initiative pivots toward `-1`; mission statement/deprecation draft; feasibility and adequate alternative unresolved (`Monthly/2024-06-monthly.md:16-18,25-31,43-48`; `Monthly/2024-07-montly.md:11-25`).
- September 2024: upgrade-to-`0` wizard and backward compatibility considered (`Monthly/2024-09-monthly.md:20-22`).
- November 2024–January 2025: systematic test list (including workspaces), edge/fallback/sync/relation inventory, and phased migration planning (`Monthly/2024-11-monthly.md:31-38`; `Monthly/2025-01-monthly.md:14-29`).
- November 2025: overview names planned `isLanguageAllRecord` and synchronization redefinition (`overview.md:297-300`).
- January–April 2026: AI-assisted inventory, manual false-positive review, tests/refactor path, workspace guards, and a v15 roadmap are indexed (`overview.md:313-321,334-344`).

**Current conservative status from this subset:** `Preferred Direction` (remove special `-1`); `In Progress` (inventory/tests/preparatory fixes); replacement data-model details are `Discussed Direction` / `Open Question`; removal itself is not shown as implemented.

**Open semantics absent here:** activation with existing manual translations, overwrite protection, deactivation behavior, deletion/detachment/conversion of generated records, provenance flags for automatic copies, behavior when new languages are added, and migration rollback. Do not infer answers.

### 3. Removing or reducing the special role of language `0`

- Early problem/idea: language-independent structure and a translatable page tree (`Monthly/2023-11-monthly.md:21-24`).
- January 2024 alternatives: content-less structural layer vs variable default-language status (`Monthly/2024-01-monthly.md:24-25`).
- May 2024 implementation probe: WIP configurable-default-language patch `84338` (`Monthly/2024-05-monthly.md:18-24`).
- June 2024 sequencing correction: patch put on hold in favor of `-1` removal (`Monthly/2024-06-monthly.md:16-18`).
- September 2024’s upgrade-to-`0` idea is migration-oriented and conflicts with treating `0` as already rejected (`Monthly/2024-09-monthly.md:20-22`).
- July/August 2025: default-language decoupling and transition from `-1`/`0` to BCP 47 are indexed (`overview.md:251-266`).
- October 2025–June 2026: shadow records vs a structural layer, then a hidden-default/structural prototype, are indexed (`overview.md:286-287,348-358`).

**Status:** objective is `Discussed Direction`; exact record identity and structural mechanism are `Open Question`. Neither “language 0 is abolished” nor “a neutral layer is chosen” is implemented in these sources.

### 4. Complete language layers, shadow records, and a neutral identity/structure layer

Evidence progresses from implication to explicit alternatives:

- 2023: language-independent structure and early node/storage/database-size discussion (`Monthly/2023-11-monthly.md:21-24`; `overview.md:18-21`).
- October 2024: create hidden missing translations for MM-relation consistency (`Monthly/2024-10-monthly.md:16-18`).
- November 2024: strategy paper on linguistic database completeness; consider all frontend-visible records translatable (`Monthly/2024-11-monthly.md:20-25`).
- July 2025: language-layer unification/consistency and structural models (`overview.md:251-256`).
- October 2025: explicit “Shadow Records vs. Structural Layer” comparison (`overview.md:286-287`).
- May/June 2026: hidden structural layer, shadow/placeholder records, visibility/sorting/permissions, prototype planning, and connected-structure benefits (`overview.md:348-358`).

**Status:** `Open Question` with competing/possibly combinable alternatives. The overview indicates a recent hidden-layer preference in strategy/prototype work, but does not prove final selection.

**Evidence gap:** This subset has no detailed treatment of Reference Index, workspace/versioning behavior, record-count magnitude, index size, query cost, deletion lifecycle, or how editors are shielded from technical records. The exact “more records → simpler Core code” trade-off is only indirectly supported by early database-size and overlay-complexity labels (`overview.md:18-19,33-36`) plus later completeness/structure labels. Use weekly/transcript evidence for the central T3DD slide.

### 5. Synchronization model

- Existing pain: `l10n_mode=exclude` issues are documented in February/March 2024 (`Monthly/2024-02-monthly.md:25-28`; `Monthly/2024-03-monthly.md:24-26`).
- First replacement idea: `l10n_state` + `enforceLanguageSynchronization` (`Monthly/2024-04-monthly.md:20-23`; historical Current State TODO `current-state.md:18-26`).
- Refined model: none / `allowLanguageSynchronization` / `enforceLanguageSynchronization` (`Monthly/2024-10-monthly.md:27-29`).
- Concrete narrow application: default synchronization for `tt_content.assets` was agreed for v14 subject to acceptable-risk criteria (`Monthly/2024-12-monthly.md:14-16,34-36`).
- Architectural separation: localization vs generic DataHandler synchronization (`Monthly/2025-01-monthly.md:16-18`).
- Later work: field-level sync, complex parent/child cases, synchronization redefinition, and explicit synchronization direction (`overview.md:263-266,297-300,362-363`).

**Status:** `Discussed Direction`; the exact semantics and UI mutability of `enforceLanguageSynchronization` are not defined by this subset. Do not say it certainly prevents editors from opting out unless a weekly/transcript says so.

### 6. Editing Language and editorial UX

- Editors restricted to non-default languages needed structural changes (`Monthly/2024-03-monthly.md:12-15`).
- An editor interview identified translation workflow hurdles (`Monthly/2024-03-monthly.md:21-23`).
- The historical Current State says a Free/Connected switch should become superfluous (`current-state.md:51-55`).
- UI handling for new workflows was explicitly considered in January/February 2025 (`Monthly/2025-01-monthly.md:17-19`; `Monthly/2025-02-monthly.md:16-18`).
- An “Editing Language Selector” first appears in this subset only in the 2026-05-08 overview description, alongside Page Tree UX and hidden structure (`overview.md:348-349`).

**Status:** `Idea` / `Discussed Direction`. The desired product effect is supported, but this subset does not specify selector scope, persistence, permissions, List/Page Module behavior, or whether Editing Language differs from preview/site language.

### 7. Translation vs localization; Free/Connected/Mixed Mode

- Current-mode complexity was investigated from the first report (`Monthly/2023-11-monthly.md:18-20`).
- Reconnection raised identity (`t3_origuid`), new-record, nesting, and inline questions (`Monthly/2024-02-monthly.md:12-18`).
- Page-level behavior and possible record/page standardization were discussed (`Monthly/2024-02-monthly.md:25-28`; `Monthly/2024-03-monthly.md:12-15`).
- Historical TODO: prevent editorial production of Mixed Mode (`todos.md:13-18`).
- Historical statement: a Free/Connected switch should eventually be unnecessary (`current-state.md:51-55`).
- January 2025 separates localization from generic synchronization (`Monthly/2025-01-monthly.md:16-18`).
- Later overview entries repeatedly clarify/evaluate Free/Mixed Mode and show real Free Mode bugs/testing continuing into 2026 (`overview.md:253-266,320-330,343-365`).

**Status:** simplifying the UX is a `Discussed Direction`; formal Free Mode deprecation is **not evidenced**. Continued Free Mode test/bug work shows current compatibility obligations.

### 8. Tests, implementation, and migration

**Implemented in the historical snapshot**

- Valid DataHandler test source data: issue `103734`, patch `83632`, commit `eef9e63…` (`current-state.md:65-70`).
- Prevent orphaned records in copy: issue `103828`, patch `84237`, commit `d28f7b0…` (`current-state.md:65-70`).
- Later overview summaries record merged copy patches and a Free Mode rendering fix, but exact change IDs require the underlying sources (`overview.md:325-328`).

**In progress / planned**

- Functional-test emphasis and patch familiarization (`Monthly/2024-01-monthly.md:16-17,34-39`).
- Comprehensive `Language All` list including workspaces (`Monthly/2024-11-monthly.md:31-38`).
- DataHandler integrity and validation patches (`Monthly/2024-12-monthly.md:14-28`).
- Production validation, migration error handling, sync validation, structured plan (`Monthly/2025-01-monthly.md:24-29`).
- AI inventory → manual validation → tests/refactoring/WIP patch (`overview.md:313-321`).
- Workspace copy tests and DataHandler guards (`overview.md:334-337`).
- v15 roadmap discussion and continued `-1` test strategy (`overview.md:343-365`).

**Not found:** Gerrit `92267` is never named in the reviewed files. The requirement that Site Configuration Languages must not underpin `-1` tests is also absent. Those claims need weekly/transcript/technical sources.

## Historical evolution, reversals, and apparent contradictions

| Topic | Earlier position | Later evidence | Reconciliation / current safest reading |
|---|---|---|---|
| Record/page uniformity | Standardizing page/content translation behavior was explored (`2024-03-monthly.md:12-15`; `todos.md:7-10`). | July 2024 snapshot says DataHandler should retain different treatment because page tree rules remain always connected (`current-state.md:51-54`). Later concept work again seeks layer unification (`overview.md:251-256`). | The early implementation-level standardization idea was rejected/qualified; later unification is a higher-level structural goal, not proof that identical DataHandler behavior returned. |
| Configurable default-language ID | WIP patch `84338` explored it in May (`2024-05-monthly.md:18-24`). | Patch discussion put on hold in June to prioritize `-1` (`2024-06-monthly.md:16-18`); structural decoupling returns in 2025 (`overview.md:251-266`). | Objective persisted; this particular patch/sequence did not. Do not present `84338` as the current implementation path. |
| `-1` timing | July 2024 discussed feasibility in v13 (`2024-07-montly.md:11-13`). | April 2026 overview names a v15 roadmap (`overview.md:343-344`). | Schedule/target evolved. “v13 deprecation” is historical, not current. |
| Migration to language `0` | September 2024 considered an upgrade wizard from `-1` to `0` (`2024-09-monthly.md:20-22`). | August 2025 describes transition from both `-1` and `0` to BCP 47 (`overview.md:265-266`). | Treat `0` as an interim migration idea, not the long-term identity model. |
| `exclude` replacement | April 2024 considered replacing `l10n_mode=exclude` with `enforceLanguageSynchronization` (`2024-04-monthly.md:20-23`). | October proposes coexistence as none/allow/enforce (`2024-10-monthly.md:27-29`); August 2025 still evaluates `l10n_mode` (`overview.md:265-266`). | No settled wholesale replacement. The model evolved and remained open. |
| Free/Connected switch | Early prototype sought a switch (`2023-11-monthly.md:18-20`; `2024-02-monthly.md:12-18`). | July 2024 snapshot says the switch should become superfluous (`current-state.md:51-55`); Free Mode remains a test/bug concern through 2026 (`overview.md:320-330,343-365`). | Product vision removes the editorial technical choice; transition must preserve current behavior. Not a proven deprecation. |
| Testing extension | July 2024 snapshot says development was on hold (`current-state.md:33-36`). | August–October 2025 says it was revived/reactivated for deterministic IRRE/Core cases (`overview.md:267-285`). | `current-state.md` is demonstrably stale; later overview wins. |
| Sparse vs complete layers | 2023 explored structure/data alternatives and database-size implications (`overview.md:18-21`). | 2024 hidden missing translations/completeness (`2024-10-monthly.md:16-18`; `2024-11-monthly.md:20-25`); 2025 shadow vs structural layer (`overview.md:286-287`); 2026 hidden-layer prototype (`overview.md:348-358`). | Completeness is a recurring goal; exact materialization remains unresolved. Hidden neutral structure appears increasingly favored but is not a final Core decision. |
| “Current” status documents | `current-state.md` calls extensions on hold and lists July 2024 priorities (`current-state.md:13-61`); `todos.md` labels old work “Immediately” (`todos.md:7-23`). | Overview documents many later changes through July 2026 (`overview.md:247-367`). | Always date these meta docs. Do not let their headings override newer minutes. |

## Plausible evolution/migration path supported by this subset

This is deliberately non-linear. Items labelled analytical are not initiative commitments.

| Track / step | Classification | Why / dependency | Evidence |
|---|---|---|---|
| Inventory all special `-1` behavior, including false positives and nonstandard uses | Already Started | Establish actual semantic surface before changing representation | `overview.md:313-317` |
| Reproduce behavior with functional/characterization-style tests, including workspaces and DataHandler guards | Already Started | Provides a safety net and exposes hidden assumptions | `2024-11-monthly.md:31-38`; `overview.md:334-337` |
| Continue small correctness fixes around copy, Free Mode, orphaned records, IRRE, and relations | Already Started | Reduces unrelated defects and makes later architectural tests interpretable | `current-state.md:65-70`; `overview.md:318-330,343-344` |
| Define replacement semantics for `-1` and provenance/lifecycle of generated language records | Depends on Architecture Decision | Boolean/`isLanguageAllRecord` direction exists, but activation/deactivation/conflict rules are absent | `current-state.md:46-49`; `overview.md:297-300` |
| Resolve synchronization contract: field-level vs record-level; `exclude` vs allow vs enforce | Depends on Architecture Decision | All-Languages materialization depends on it | `2024-04-monthly.md:20-23`; `2024-10-monthly.md:27-29`; `overview.md:263-266` |
| Resolve structural identity: shadow/completed layers vs hidden neutral identity layer vs combination | Depends on Architecture Decision | Required before removing default-language structural privilege | `overview.md:251-256,286-287,348-358` |
| Define stable language identity and migration mapping (`0`/`-1`/site IDs → BCP 47) | Discussed / Depends on Architecture Decision | Cross-site behavior and record migration need authoritative mapping and collision rules | `2025-01-monthly.md:19-29`; `overview.md:255-266,366-367` |
| Build isolated proofs of concept for hidden structure/Editing Language and measure data/query/UX effects | Explicitly Planned in part; otherwise Analytical Recommendation | Prototype planning exists; measurement criteria are not documented in this subset | `overview.md:348-358` |
| Define reversible migration, conflict reporting, and production validation | Explicitly Planned / Analytical expansion | Error handling/validation are explicit; reversibility is user-required analysis but not found | `2025-01-monthly.md:24-29` |
| Run old/new behavior in a controlled transition with compatibility APIs/feature gating | Analytical Recommendation | Needed only if architecture cannot migrate atomically; no source here commits to feature flags or parallel operation | underlying dependency: `2024-09-monthly.md:20-22`; `2025-01-monthly.md:21-29` |
| Adapt Backend UX so editors choose content intent/language, not connection mechanics | Discussed Direction | Depends on identity, structural, and synchronization semantics | `current-state.md:51-55`; `overview.md:348-358` |
| Deprecate/remove old special handling incrementally, then prove preserved use cases via the test corpus | Analytical Recommendation consistent with started work | Only safe after replacement, migration, and compatibility decisions | `overview.md:313-317,334-344` |
| Document extension/API impact and provide upgrade tooling | Analytical Recommendation | Backward compatibility is explicit; extension inventory/tooling is not detailed here | `2024-09-monthly.md:20-22` |

## Session-priority guidance from this subset

| Theme | Priority | Why it belongs / caveat |
|---|---|---|
| `-1`: implicit special language → explicit behavior | Essential | Best-supported long-running goal and current technical work. Separate goal, replacement idea, and implementation state. |
| BCP 47 as stable identity | Essential | Persistent since 2023 and integrated with later strategy. Avoid asserting the exact database representation. |
| Default language as structural center | Essential | Explains `0`, page-tree structure, and why identity needs decoupling. Show patch `84338` only as an abandoned/paused experiment. |
| Complete layers / shadow vs hidden identity layer | Essential | Strong central trade-off, but detailed claims need weekly/transcript sources. Present as open alternatives. |
| Understand → test → change → prove | Essential | Strongly supported by the 2024–2026 test/inventory chronology. Add “decide semantics / prototype / migrate” between test and change. |
| Synchronization: `exclude` / allow / enforce | Essential | Demonstrates how an explicit All-Languages behavior could work. Do not invent enforce semantics. |
| Editorial UX / Editing Language | Essential but lightly sourced here | Strong narrative endpoint; only one overview label names Editing Language. Use primary 2026 sources. |
| Free/Connected/Mixed Mode | Useful | Good “where it hurts” example and bridge to localization. Avoid saying Free Mode is formally deprecated. |
| Cross-site/global records | Useful | Excellent use case, but this subset has only locator-level evidence. Needs 2026-07-31 primary source. |
| MM/IRRE/copy defects | Useful / Backup | Concrete proof of current complexity; keep main talk at use-case level. |
| XLIFF/file translation | Optional / Backup | Only sparse evidence here. |
| `t3_origuid`, sorting, exact TCA and patch internals | Too Detailed for main arc | Useful backup slides or technical Q&A. |
| Funding/team-process chronology | Optional | Explains pace, not architecture. |

## Presentation-ready reasoning path and visual candidates

1. **Start with editor intent, not records.** Use the repeated Free/Connected/Mixed Mode and structural-permission problems (`2023-11-monthly.md:18-20`; `2024-03-monthly.md:12-23`). Visual: today’s decision maze vs “create/localize here.”
2. **Reveal the hidden coupling.** Numeric special values, default-language structure, `l10n_parent`, missing records, and scattered fallback logic are intertwined (`2023-12-monthly.md:14-21`; `2024-01-monthly.md:12-25`). Visual: dependency knot centered on `0` and `-1`.
3. **Show the first stable direction.** Real language identity (BCP 47) and explicit All-Languages behavior replace semantic magic numbers (`current-state.md:46-50`). Mark it “direction,” not implementation.
4. **Ask where structural identity lives.** Contrast sparse current layers, completed/shadow layers, and hidden identity layer (`overview.md:251-256,286-287,348-358`). Visual: three side-by-side models. Keep the trade-off open.
5. **Explain synchronization as the bridge.** `exclude` → allow/enforce discussion → record-level questions (`2024-04-monthly.md:20-23`; `2024-10-monthly.md:27-29`). Visual: source record, policy, concrete language variants.
6. **Return to the editor.** Hidden structure and Editing Language can remove technical mode choices from UX (`current-state.md:51-55`; `overview.md:348-358`).
7. **Ground vision in actual work.** Inventory, manual review, tests, workspace coverage, copy/IRRE fixes (`overview.md:313-344`). Visual: `Understand → Characterize → Decide → Prototype → Migrate → Prove`.
8. **End with open choices.** Activation/deactivation conflicts, identity layer vs shadow records, BCP 47 storage/mapping, database vs code complexity, compatibility and migration. Do not manufacture answers.

### Particularly useful visuals

- **`-1` before/after:** one magic-language record vs explicit policy producing concrete language variants. Source supports the boolean/DataHandler concept, not lifecycle details (`current-state.md:46-49`).
- **Evolution timeline:** 2023 BCP/structure exploration → Jan 2024 `-1` primary goal → Jun 2024 pivot → 2024/25 tests/completeness → 2025 shadow-vs-layer → 2026 inventory/prototype/T3DD (`Monthly/2023-11-monthly.md:18-24`; `Monthly/2024-06-monthly.md:43-48`; `overview.md:286-287,313-358`).
- **Three structural models:** sparse overlays, completed shadow layers, hidden identity layer. Only the existence of alternatives is supported here; detailed arrows/semantics need primary sources (`overview.md:286-287,348-358`).
- **Strategy vs reality split:** left column vision (BCP 47, no special values, hidden structure, simplified UX); right column current work (inventory/tests/copy/IRRE/workspaces). This prevents aspirational material being mistaken for roadmap.
- **Migration graph, not linear roadmap:** tests and correctness fixes can proceed in parallel; replacement, synchronization, identity, and BCP mapping converge before migration/removal.

## Claims requiring other sources before inclusion as fact

| Requested claim/detail | Finding in this subset | Required treatment |
|---|---|---|
| Gerrit `92267` and exact test implementation/status | Not named | Use weekly/transcript + Gerrit technical validation. |
| Site Configuration Languages must not be used for `-1` tests | Not stated | Do not attribute to initiative from these files. |
| BCP 47 is semantic identity while numeric IDs definitely remain internal | Not stated; older sources instead say replace integer with string | Source elsewhere or label analytical architecture option. |
| All-Languages flag activation with manual translations | Not stated | Open Question. |
| All-Languages flag deactivation/generated-record lifecycle | Not stated | Open Question. |
| Automatic vs editorial-copy provenance marker | Not stated | Open Question. |
| New-site-language backfill behavior | Only broad DataHandler synchronization concept | Open Question. |
| `enforceLanguageSynchronization` is non-detachable by editors | Not defined | Do not assert from its name. |
| Exact record-level vs field-level synchronization | Both are gestured at; no settled contract | Open Question. |
| Shadow records are selected over neutral layer | Explicitly compared; hidden-layer prototype later | Discussed Direction, not decision. |
| Database growth magnitude and performance/index effects | Only early database-size topic label | Needs primary/technical analysis; otherwise analytical. |
| Workspace/versioning/Reference Index behavior of new models | Workspaces occur only in test context | Open Question. |
| Cross-site/global-storage example mechanics | Cross-site identity only appears as overview label | Needs 2026-07-31 primary source. |
| Editing Language semantics in Page/List Modules | Only selector/topic label | Needs 2026-05-08 primary source. |
| Formal Free Mode deprecation | No source says this | Say UX/semantics questioned and switch envisioned as unnecessary. |
| Exact current Core behavior in TYPO3 v14/v15 | These are meeting documents, not code verification | Use technical validation and version-specific docs/tests. |

## Compact canonical source matrix for the parent synthesis

| Theme | Best evidence from this subset | Status | Date | Source |
|---|---|---|---:|---|
| Fallback/overlay complexity | Handling spread across too many code places; streamline | Problem | 2023-12 | `Monthly/2023-12-monthly.md:14-21` |
| Stable language identity | BCP 47 exploration → explicit long-term plan | Preferred Direction | 2023-11 to 2024-07 | `Monthly/2023-11-monthly.md:21-24`; `current-state.md:46-50` |
| Remove `-1` | Primary goal and later explicit initiative focus | Preferred Direction | 2024-01 / 2024-06 | `Monthly/2024-01-monthly.md:12-15`; `Monthly/2024-06-monthly.md:43-48` |
| Boolean replacement | Bool on default record triggers DataHandler synchronization | Idea / Planned historically | 2024-01 / snapshot 2024-07 | `Monthly/2024-01-monthly.md:12-15`; `current-state.md:46-49` |
| Default/structure decoupling | Content-less layer vs variable default; later hidden structure | Open Question / Discussed Direction | 2024-01 to 2026-06 | `Monthly/2024-01-monthly.md:24-25`; `overview.md:348-358` |
| `0` migration | Upgrade wizard to `0`, later transition from `-1`/`0` to BCP 47 | Idea / Open Question | 2024-09 / 2025-08 | `Monthly/2024-09-monthly.md:20-22`; `overview.md:265-266` |
| Complete layers | Hidden missing translations; database completeness | Idea / Discussed Direction | 2024-10/11 | `Monthly/2024-10-monthly.md:16-18`; `Monthly/2024-11-monthly.md:20-25` |
| Shadow vs neutral layer | Explicit comparison; hidden-layer prototype later | Open Question / In Progress | 2025-10 to 2026-06 | `overview.md:286-287,348-358` |
| Synchronization | `exclude` replacement idea → tri-state allow/enforce | Discussed Direction / Open Question | 2024-04/10 | `Monthly/2024-04-monthly.md:20-23`; `Monthly/2024-10-monthly.md:27-29` |
| Free/Connected UX | Switch should become superfluous | Discussed Direction | snapshot 2024-07 | `current-state.md:51-55` |
| Editing Language | Selector + Page Tree UX + hidden structure | Idea / Planned prototype | 2026-05 | `overview.md:348-351` |
| Localization vs sync | Separate localization handling from generic DataHandler sync | Discussed Direction | 2025-01 | `Monthly/2025-01-monthly.md:16-18` |
| Cross-site identity | Indexed discussion | Idea / Open Question | 2026-07-31 | `overview.md:366-367` |
| Test strategy | Language All list incl. workspaces; AI/manual inventory; guard tests | In Progress | 2024-11 to 2026-03 | `Monthly/2024-11-monthly.md:31-38`; `overview.md:313-317,334-337` |
| Migration discipline | Backward compatibility, validation, errors, phased plan | Planned / Open Question | 2024-09 to 2025-01 | `Monthly/2024-09-monthly.md:20-22`; `Monthly/2025-01-monthly.md:21-29` |
| Current implementation reality | Two historical completed Core patches; later copy fixes merged | Implemented | 2024 / 2026-02 | `current-state.md:65-70`; `overview.md:325-328` |

## Bottom line for the T3DD26 synthesis

The monthly/meta corpus supports a strong narrative of **problem recognition → architectural direction → priority correction → characterization/testing → competing structural models → small Core preparation**. Its clearest settled initiative-level directions are to remove the semantic special value `-1`, move toward stable BCP 47 language identity, and reduce editorial exposure to technical translation modes. Its clearest unsettled areas are the replacement lifecycle, synchronization contract, role of `0`, record identity, complete/shadow layers versus a hidden neutral layer, migration, and the database/code complexity trade-off. The 2026 overview shows meaningful preparation and prototyping, but not a finished target architecture or committed Core roadmap.
