# T3DD26 source dossier: weekly minutes, 2025 H1

## Scope and method

- Scope: every Markdown document under `MeetingMinutes/Weekly/2025/01` through `MeetingMinutes/Weekly/2025/06`, read completely (18 files, 1,117 lines).
- This dossier is evidence for the broader T3DD26 analysis, not a standalone claim about all initiative documentation. Negative findings mean “not evidenced in these 18 weekly minutes”; later/earlier minutes or transcripts may add or change the picture.
- Source references use repository-relative path plus exact 1-based line range. The meeting date is repeated in each evidence table.
- Status vocabulary is restricted to the requested labels: **Current Core Behavior**, **Problem**, **Idea**, **Discussed Direction**, **Preferred Direction**, **Open Question**, **Planned**, **In Progress**, **Implemented**, **Analytically Derived Recommendation**.
- Session priority vocabulary: **Essential**, **Useful**, **Optional**, **Too Detailed**.
- `MeetingMinutes/Weekly/2025/06/2025-06-13.md` explicitly says it is reconstructed from memory because no audio recording existed (lines 21-25). Its technical summary is therefore useful corroboration but lower-confidence evidence than ordinary minutes.

## Executive synthesis for the parent analysis

The strongest 2025-H1 thread is not a complete future translation architecture. It is a relatively concrete first subproblem: replacing the special `sys_language_uid = -1` “all languages” record with dedicated records in concrete languages and a record-level synchronization mechanism. The January discussion identifies a concrete failure mode (sorting for `-1` records is derived from the default language and can mismatch other language layers), proposes dedicated per-language records, locates affected Core surfaces, sketches DataHandler reuse, and works through migration conflicts. By 31 January the preferred sequence is explicit: first make record-level synchronization configurable, then add an enforced option. Evidence: `MeetingMinutes/Weekly/2025/01/2025-01-10.md:37-43`; `MeetingMinutes/Weekly/2025/01/2025-01-17.md:21-55`; `MeetingMinutes/Weekly/2025/01/2025-01-24.md:24-47`; `MeetingMinutes/Weekly/2025/01/2025-01-31.md:35-52`.

This direction is still concept/design work in H1. A WIP test patch for the impact of removing `-1` was agreed, general DataHandler optimizations were underway, and a separate failing test for a translation-copy regression existed. The minutes do **not** show that `-1` removal, the synchronization flag, or an `enforceLanguageSynchronization` API was implemented. The named Gerrit change `92267` does not occur in these files. Evidence: `MeetingMinutes/Weekly/2025/01/2025-01-10.md:41-43`; `MeetingMinutes/Weekly/2025/02/2025-02-14.md:34-38`; `MeetingMinutes/Weekly/2025/04/2025-04-04.md:68-72`.

BCP 47 is present, but its H1 evidence is narrower than the session hypothesis. It is proposed as a standardized identifier needed for translated files and cross-instance consistency; it is later mentioned alongside a transition to language-tag-based identification, and a reconstructed June summary mentions BCP47-compliant XLF identifiers and filenames. These sources do **not** yet specify BCP 47 as the authoritative identity of database records, explain how internal numeric IDs would remain, or document cross-site/global-storage-page behavior. Evidence: `MeetingMinutes/Weekly/2025/01/2025-01-24.md:55-60`; `MeetingMinutes/Weekly/2025/03/2025-03-28.md:34-36`; lower-confidence `MeetingMinutes/Weekly/2025/06/2025-06-13.md:21-25,27-38`.

The first direct H1 statement about both special values appears only as a high-level retrospective: `-1` means “All languages”, `0` means default language, and the initiative aims to replace special values with clearer explicit mechanisms based on structured metadata. This does not decide how `0` disappears, how multilingual record identity works, or whether a neutral layer is needed. Evidence: lower-confidence `MeetingMinutes/Weekly/2025/06/2025-06-13.md:21-31`; an earlier concept review merely records that the special meanings of `0` and `-1` were discussed (`MeetingMinutes/Weekly/2025/05/2025-05-02.md:31-39`).

No H1 weekly minute provides direct evidence for complete language layers, shadow/dummy/proxy records, a neutral structure/identity layer, `l10n_parent` redesign, Editing Language, Free Mode deprecation, an automatic “create content here and let TYPO3 infer the relationship” UX, or the explicit “database size versus code complexity” trade-off. Dedicated records for the `-1` replacement must not be inflated into evidence for universally complete language layers.

## Complete reviewed-file ledger

| Date | File and complete range reviewed | Direct relevance to requested architecture | Notes / no-evidence declaration |
|---|---|---|---|
| 2025-01-10 | `MeetingMinutes/Weekly/2025/01/2025-01-10.md:1-54` | High | IRRE localization failure; `-1` sorting problem; dedicated per-language records; WIP tests; `l10n_diffsource`; abandoned “Translate To” prefix. |
| 2025-01-17 | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:1-68` | High | Core impact surface; DataHandler; proposed `enforceLanguageSynchronization`; record-vs-field synchronization; Free/Connected sorting; synchronization state; `-1` as first step. |
| 2025-01-24 | `MeetingMinutes/Weekly/2025/01/2025-01-24.md:1-69` | High | Migration behavior; warnings/logging/rollback/wizard; record-level flag replacing `-1`; BCP 47 for file/cross-instance identity. |
| 2025-01-31 | `MeetingMinutes/Weekly/2025/01/2025-01-31.md:1-73` | High | Incremental concept; update/create migration; record-level allow/enforce; preserve field behavior; configurable before enforced; UI draft. |
| 2025-02-14 | `MeetingMinutes/Weekly/2025/02/2025-02-14.md:1-65` | Medium | DataHandler optimizations as foundation; short-term `-1` vs broad strategy unresolved; record-vs-field UI language. |
| 2025-02-21 | `MeetingMinutes/Weekly/2025/02/2025-02-21.md:1-57` | Low | Only an uncertain backend sorting report involving a missing language column and Connected Mode. No settled architectural evidence. |
| 2025-02-28 | `MeetingMinutes/Weekly/2025/02/2025-02-28.md:1-96` | Medium | High-level vision then sub-concepts; `-1` concept as immediate priority; system texts/external translation later. Most other content is funding/process. |
| 2025-03-07 | `MeetingMinutes/Weekly/2025/03/2025-03-07.md:1-65` | Low/medium | Concept-work plan and intention to extract older `-1` discussions; no new technical decision. |
| 2025-03-14 | `MeetingMinutes/Weekly/2025/03/2025-03-14.md:1-58` | Medium/high | v13 translated-record sorting regression; explicit ambition for fundamental architectural overhaul. No concrete future data model. |
| 2025-03-28 | `MeetingMinutes/Weekly/2025/03/2025-03-28.md:1-53` | Medium/high | `-1` removal and language-tag identification connected to roadmap; AI/external integration motivation; scope of current-state documentation. |
| 2025-04-04 | `MeetingMinutes/Weekly/2025/04/2025-04-04.md:1-80` | High | Content-vs-file-translation scope; `-1`, synchronization and IRRE Core coordination; translated-copy bug and failing test `88827`. |
| 2025-04-11 | `MeetingMinutes/Weekly/2025/04/2025-04-11.md:1-57` | High | Language versus workspace overlays, compound overlays; translated-copy bug; concept before coding; external workflows/XLIFF scope. |
| 2025-05-02 | `MeetingMinutes/Weekly/2025/05/2025-05-02.md:1-43` | Medium/high | Translation-mode terminology; special `0`/`-1`; backend/frontend distinction; one-dimensional language model and scale. |
| 2025-05-09 | `MeetingMinutes/Weekly/2025/05/2025-05-09.md:1-60` | Medium, adjacent | Multi-dimensional country/market need; NEOS alternative rejected as unrealistic for TYPO3; route/context-aspect steps preferred. No direct evidence for BCP 47, `-1`, record identity, or complete layers. |
| 2025-05-23 | `MeetingMinutes/Weekly/2025/05/2025-05-23.md:1-76` | Process only | No new translation architecture decision. Establishes that Current State was considered accurate, later recommendations/PoC skeletal, and the document was a living discussion framework. |
| 2025-05-30 | `MeetingMinutes/Weekly/2025/05/2025-05-30.md:1-47` | Process only | No new technical architecture evidence. Document is a decision foundation, not a final concept; improvement recommendations remained future work. |
| 2025-06-06 | `MeetingMinutes/Weekly/2025/06/2025-06-06.md:1-55` | High for current pain | Concrete Extbase missing-translation crash and manual overlay/query workarounds; no future data-model decision. |
| 2025-06-13 | `MeetingMinutes/Weekly/2025/06/2025-06-13.md:1-41` | Medium but lower confidence | Memory-reconstructed onboarding summary: `-1`/`0`, structured metadata, enforce synchronization, Page Module fallbacks, MM relations, BCP47/XLF. Not proof of implementation or detailed consensus. |

## 1. Current Core behavior and demonstrated pain

### 1.1 Special language values and sorting

| Finding | Status | Priority | Exact source |
|---|---|---|---|
| `-1` is treated as a special language identifier for cross/all-language content. Its content-element sorting is derived from default-language sorting and can therefore mismatch sorting in non-default languages. | Current Core Behavior / Problem | Essential | 2025-01-10, `MeetingMinutes/Weekly/2025/01/2025-01-10.md:37-39` |
| In Free Mode, existing `-1` behavior creates cross-language sorting inconsistencies; in Connected Mode, sorting values derived from the default language must be reflected across translations. | Current Core Behavior / Problem | Essential | 2025-01-17, `MeetingMinutes/Weekly/2025/01/2025-01-17.md:40-49` |
| A separate v13 observation found translated elements sometimes receiving wrong sorting values, possibly due to Page Module drag/drop changes or legacy values; version comparison and more validation were needed. Do not present this as a confirmed cause. | Problem / Open Question | Useful | 2025-03-14, `MeetingMinutes/Weekly/2025/03/2025-03-14.md:20-28` |
| The special meanings of `0` and `-1` in the TCA language field were reviewed, while backend translation behavior and frontend Site Configuration/overlay/fallback behavior were explicitly distinguished. | Current Core Behavior | Useful | 2025-05-02, `MeetingMinutes/Weekly/2025/05/2025-05-02.md:31-39` |
| A reconstructed summary describes `-1` as “All languages” and `0` as default language. | Current Core Behavior | Essential, corroboration only | 2025-06-13, `MeetingMinutes/Weekly/2025/06/2025-06-13.md:21-29` |

### 1.2 Query/overlay surfaces

| Finding | Status | Priority | Exact source |
|---|---|---|---|
| For the contemplated `-1` transition, the minutes say `pages` is not affected, while `tt_content` and other records using translation fields are. Affected Core surfaces named are Extbase repository fetching, `PageRepository`, `BackendUtility`, and TypoScript objects that issue translation-aware database queries. | Current Core Behavior / Planned analysis | Essential | 2025-01-17, `MeetingMinutes/Weekly/2025/01/2025-01-17.md:21-31` |
| Language overlays and workspace overlays use similar mechanics for different purposes, and translations inside workspaces can produce compound overlay scenarios. | Current Core Behavior / Problem | Useful | 2025-04-11, `MeetingMinutes/Weekly/2025/04/2025-04-11.md:19-23` |
| In a concrete Extbase case, a default-language record remained referenced after translation and a missing translation caused a frontend crash. Explored workarounds were UID plus manual language validation, `findOneBy` with QuerySettings caveats, manual `PageRepository::getLanguageOverlay`, or custom queries. | Problem | Useful | 2025-06-06, `MeetingMinutes/Weekly/2025/06/2025-06-06.md:41-51` |
| The group characterized Extbase query behavior as inconsistent in practical cases despite its intended abstraction; manual Core queries/overlays could be more predictable. | Problem / Discussed Direction | Useful | 2025-06-06, `MeetingMinutes/Weekly/2025/06/2025-06-06.md:51-55` |

### 1.3 Relations and synchronization gaps

| Finding | Status | Priority | Exact source |
|---|---|---|---|
| Localizing an inline parent creates new child records even with `allowLanguageSynchronization=false` or `l10n_mode=exclude`; setting synchronization true also creates children. The former TYPO3 v8 `localizeChildrenAtParentLocalization` control no longer existed in the tested newer version. | Current Core Behavior / Problem | Useful | 2025-01-10, `MeetingMinutes/Weekly/2025/01/2025-01-10.md:22-27` |
| Removing the child table's language-related TCA was suggested, but the reporter said parent localization then errors because TYPO3 expects fields; the real project moved from IRRE to n:1 relations and lost ORM conveniences. | Problem | Useful; excellent concrete case | 2025-01-10, `MeetingMinutes/Weekly/2025/01/2025-01-10.md:29-31` |
| Core coordination later grouped `sys_language_uid=-1`, `allowLanguageSynchronization` plus IRRE, and bidirectional IRRE handling as related initiative topics. | Discussed Direction | Useful | 2025-04-04, `MeetingMinutes/Weekly/2025/04/2025-04-04.md:59-66` |
| A reconstructed summary says MM relations lack a unified multilingual approach for synchronizing or differentiating relations. | Problem / Open Question | Useful, corroboration only | 2025-06-13, `MeetingMinutes/Weekly/2025/06/2025-06-13.md:21-25,35-35` |

### 1.4 Data integrity, copy, and “Translate To” examples

| Finding | Status | Priority | Exact source |
|---|---|---|---|
| A long-running DataHandler WIP around pages was discarded because no solution was found for “Translate To”; prefixing data was rejected because automatic content mutation harms data integrity and predictability. | Problem | Useful/backup | 2025-01-10, `MeetingMinutes/Weekly/2025/01/2025-01-10.md:52-54` |
| `l10n_diffsource` values were reported in random order; including `sys_language_uid` in the diff was questioned; per-field confirmation of diff reset was proposed. | Problem / Idea | Too Detailed | 2025-01-10, `MeetingMinutes/Weekly/2025/01/2025-01-10.md:45-50` |
| Copying content elements with translations could assign translations to the default language; a failing test was published as Gerrit `88827`, and a durable fix was expected to require deeper DataHandler changes. | Problem / In Progress | Useful/backup | 2025-04-04, `MeetingMinutes/Weekly/2025/04/2025-04-04.md:68-72` |
| Follow-up analysis proposed pre-processing validation and possible filtering/restructuring of copy instructions to prevent unintended language changes. | Discussed Direction / In Progress | Too Detailed | 2025-04-11, `MeetingMinutes/Weekly/2025/04/2025-04-11.md:31-35` |

### 1.5 UX and dimensional limits

| Finding | Status | Priority | Exact source |
|---|---|---|---|
| Reused terminology around Translation Modes, Free, and Connected was considered confusing; renaming was discussed. | Problem / Idea | Useful | 2025-05-02, `MeetingMinutes/Weekly/2025/05/2025-05-02.md:19-23` |
| Backend complexity rises significantly with many languages; TYPO3’s forced one-dimensional approach was identified as a possible scalability bottleneck for multilingual/multi-regional projects. | Problem | Optional | 2025-05-02, `MeetingMinutes/Weekly/2025/05/2025-05-02.md:41-43` |
| TYPO3 currently uses only the language dimension for output control. A NEOS-like node/event-sourced model was judged unrealistic and overly complex for TYPO3; smaller compatible route/context-aspect extensions were supported instead. | Current Core Behavior / Preferred Direction (only for the multidimensional subproblem) | Optional | 2025-05-09, `MeetingMinutes/Weekly/2025/05/2025-05-09.md:27-33` |
| A country variation had been implemented by duplicating languages via `EXT:z7_countries`; routing-based values were preferred over IP/user context to preserve caching. | Problem / Discussed Direction | Optional; concrete adjacent use case | 2025-05-09, `MeetingMinutes/Weekly/2025/05/2025-05-09.md:35-48` |

## 2. Evolution of the `sys_language_uid = -1` replacement

### 2.1 Evidence timeline

| Date | Evolution step | Status | Exact source |
|---|---|---|---|
| 2025-01-10 | A plan to remove `-1` is discussed. The envisaged replacement is cross-language synchronization with a dedicated record in each language, which also gives each language its own sorting value. | Discussed Direction | `MeetingMinutes/Weekly/2025/01/2025-01-10.md:37-39` |
| 2025-01-10 | The team agrees to start a WIP patch testing the impact of removing `-1`; test-template reuse and separation by frontend/backend behavior are discussed. | Planned | `MeetingMinutes/Weekly/2025/01/2025-01-10.md:41-43` |
| 2025-01-17 | Scope expands from the visible sorting symptom to all translation-field records and translation-aware query APIs. The team calls for comprehensive analysis of Core methods. | Planned | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:21-31` |
| 2025-01-17 | Record-level synchronization is positioned as the common remedy for Free/Connected sorting, with a clearly defined DataHandler process and an enforce option alongside allow. | Discussed Direction | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:33-49` |
| 2025-01-17 | Extra persistent/status information is considered to record whether synchronization happened and succeeded, possibly in a table or fields. | Idea / Open Question | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:51-55` |
| 2025-01-17 | Removing `-1` is called an important first step, but the strategy must be broader and remain adaptable as implementation reveals details. | Preferred Direction | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:61-65` |
| 2025-01-24 | A record-level synchronization flag is explored as the replacement: content stays synchronized in all languages and edits propagate to related translations. Selective exclusion is deferred. | Discussed Direction | `MeetingMinutes/Weekly/2025/01/2025-01-24.md:42-47` |
| 2025-01-24 | Migration policy becomes concrete: update existing translations rather than delete/recreate; warn before overwriting divergences; consider logs/rollback, bulk defaults, and an interactive wizard. | Preferred Direction plus Ideas/Open Questions | `MeetingMinutes/Weekly/2025/01/2025-01-24.md:28-40` |
| 2025-01-31 | The team favors a small, reviewable `-1` concept and incremental documentation while resources are limited. | Preferred Direction / Planned | `MeetingMinutes/Weekly/2025/01/2025-01-31.md:27-33` |
| 2025-01-31 | Migration refinement: update existing variants, create missing variants, notify when content changes, offer a preflight inconsistency check. | Preferred Direction / Idea | `MeetingMinutes/Weekly/2025/01/2025-01-31.md:35-42` |
| 2025-01-31 | Agreed phasing: make record-level synchronization configurable first, then add an enforced option; synchronize only relevant fields and do not override existing field-based settings. | Preferred Direction / Planned | `MeetingMinutes/Weekly/2025/01/2025-01-31.md:44-52` |
| 2025-02-14 | Ongoing DataHandler query/delete/move optimization is treated as a foundation that could ease later `-1` work. The choice between an immediate `-1` goal and comprehensive strategy awaits further discussion. | In Progress / Open Question | `MeetingMinutes/Weekly/2025/02/2025-02-14.md:34-46` |
| 2025-02-28 | The documentation strategy is high-level vision followed by detailed sub-concepts; defining removal of `-1` is the immediate priority. | Planned | `MeetingMinutes/Weekly/2025/02/2025-02-28.md:73-80` |
| 2025-03-07 | Older `-1` discussions are to be extracted into a structured concept and iteratively expanded. | Planned | `MeetingMinutes/Weekly/2025/03/2025-03-07.md:49-64` |
| 2025-03-28 | `-1` removal and a move to language-tag identification are described as internal plans that need a strategic roadmap and Core Team coordination. | Discussed Direction | `MeetingMinutes/Weekly/2025/03/2025-03-28.md:34-36` |
| 2025-06-13 | A lower-confidence retrospective summarizes the goal as replacing the special `-1` and `0` values with explicit structured metadata and making relationships predictable through enforce synchronization. | Discussed Direction, low-confidence corroboration | `MeetingMinutes/Weekly/2025/06/2025-06-13.md:21-31` |

### 2.2 Most defensible H1 status

- **Preferred Direction:** eliminate the special `-1` record representation in favor of concrete language records managed through record-level synchronization.
- **Planned/design-stage:** specify and first implement configurable record-level synchronization, then an enforce option; build tests/analysis; design migration safeguards.
- **Open:** exact schema/API, target-language enumeration, automatic-record marker, conflicts, activation/deactivation lifecycle, selective exclusions, and concrete code paths.
- **Not evidenced as implemented:** `-1` removal, record-level flag, enforced synchronization, migration wizard, or production migration.
- **Do not overstate:** “each language has a dedicated record” is explicitly tied to the `-1` replacement use case, not to a universal complete-language-layer architecture.

## 3. Synchronization model: what is actually supported

| Question | H1 finding | Status | Exact source |
|---|---|---|---|
| Why existing field controls are insufficient | In the IRRE case, child records are created even when `allowLanguageSynchronization=false` or `l10n_mode=exclude`; `true` also creates them. | Current Core Behavior / Problem | 2025-01-10, `MeetingMinutes/Weekly/2025/01/2025-01-10.md:22-27` |
| Core owner | The process needs to be clearly defined in DataHandler. | Preferred Direction | 2025-01-17, `MeetingMinutes/Weekly/2025/01/2025-01-17.md:33-35` |
| Allow vs enforce | An `enforceLanguageSynchronization` mechanism is described as necessary alongside `allowLanguageSynchronization`. | Discussed Direction | 2025-01-17, `MeetingMinutes/Weekly/2025/01/2025-01-17.md:35-36` |
| Record vs field | Existing synchronization is field-level and expected to be reusable; record relationships via `pid` can be reasoned about like a field relation, but exact pathways remain to be explored. | Discussed Direction / Open Question | 2025-01-17, `MeetingMinutes/Weekly/2025/01/2025-01-17.md:37-38` |
| Flag semantics | A record-level flag would keep content synchronized in all languages; edits propagate to related translations. | Idea / Discussed Direction | 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:42-46` |
| Exceptions | Selective exclusion was discussed but explicitly deferred. | Open Question | 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:47-47` |
| Field selection | Only relevant fields should synchronize, and the new record-level setting should not override existing field-level synchronization configuration. | Preferred Direction | 2025-01-31, `MeetingMinutes/Weekly/2025/01/2025-01-31.md:44-50` |
| Phasing | Configurable record-level synchronization should come before an enforced option. | Preferred Direction / Planned | 2025-01-31, `MeetingMinutes/Weekly/2025/01/2025-01-31.md:52-52` |
| User control | Per-record editor control was desired during the configurable phase. | Discussed Direction | 2025-01-31, `MeetingMinutes/Weekly/2025/01/2025-01-31.md:46-49` |
| State tracking | A table or fields might record whether a record was synchronized and whether it succeeded. | Idea / Open Question | 2025-01-17, `MeetingMinutes/Weekly/2025/01/2025-01-17.md:51-55` |
| UI | Differentiating record-level and field-level settings was considered potentially confusing; wording/UX input was needed. | Problem / Discussed Direction | 2025-02-14, `MeetingMinutes/Weekly/2025/02/2025-02-14.md:48-52` |
| Relation coverage | IRRE and bidirectional IRRE are explicitly adjacent Core concerns; MM synchronization has no unified model in the reconstructed June recap. | Problem / Open Question | 2025-04-04, `MeetingMinutes/Weekly/2025/04/2025-04-04.md:59-66`; 2025-06-13, `MeetingMinutes/Weekly/2025/06/2025-06-13.md:21-25,35-35` |

Terminology caveat: the minutes use the provisional strings `enforceLanguageSynchronization` (US spelling) and `EnforceLanguageSynchronization`; they do not define a finalized TCA property called `behaviour.enforceLanguageSynchronisation`, nor do they state the exact “editor can never opt out” contract. The only source-backed distinction is that an enforce option is additional to allow and comes after a configurable record-level mechanism.

### Activation/migration lifecycle

| Lifecycle question | Supported answer | Status | Exact source |
|---|---|---|---|
| Activate with existing translations | Existing translations should be updated, not deleted/recreated. Divergence should be detected and the editor warned before overwrite. | Preferred Direction | 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:28-33` |
| Activate with no translation | Missing variants should be created. This is stated in migration discussion, not specifically as an ongoing new-site-language listener. | Preferred Direction | 2025-01-31, `MeetingMinutes/Weekly/2025/01/2025-01-31.md:35-40` |
| Large installations | Default migration rules should be possible instead of per-record intervention. | Idea | 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:35-40` |
| Auditability/recovery | Logging for review and rollback was proposed; an interactive wizard was discussed. | Idea / Open Question | 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:35-40` |
| Preflight | A preliminary inconsistency check could let editors resolve problems before migration. | Idea | 2025-01-31, `MeetingMinutes/Weekly/2025/01/2025-01-31.md:35-42` |
| Disable flag | No evidence: deletion, detachment, conversion, or retention of generated variants is not discussed in H1. | Open Question | Negative finding across all 18 reviewed files |
| New language added later | No direct evidence. “All languages where it is set” and create-if-missing during migration do not define reaction to future Site Language changes. | Open Question | Negative finding; nearest context 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:42-47`, and 2025-01-31, `MeetingMinutes/Weekly/2025/01/2025-01-31.md:35-40` |
| Auto-managed versus independent record | Synchronization status storage is suggested, but no durable provenance/ownership model is decided. | Open Question | 2025-01-17, `MeetingMinutes/Weekly/2025/01/2025-01-17.md:51-55` |
| Conflict resolution | Warning/update direction is supported, but no field-by-field merge, exclude, take-over, or conversion algorithm is specified. | Open Question | 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:28-40` |

## 4. BCP 47 and language identity

### Direct evidence

| Finding | Status | Priority | Exact source |
|---|---|---|---|
| Translated-file association is complex and deferred; a standardized language identification system is called a prerequisite, and IETF BCP 47 is proposed for cross-instance consistency. | Idea / Discussed Direction | Essential, but carefully scoped | 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:55-60` |
| Removing the `-1` “language fallback” and transitioning to language-tag-based identification are described together as internal plans; Core limitations make enhancements complex and roadmap/Core coordination is needed. | Discussed Direction | Essential | 2025-03-28, `MeetingMinutes/Weekly/2025/03/2025-03-28.md:34-36` |
| A memory-reconstructed summary says the initiative was working toward BCP47-compliant language identifiers and more consistent XLF naming, noting differing Core behavior. | Discussed Direction, lower confidence | Useful corroboration | 2025-06-13, `MeetingMinutes/Weekly/2025/06/2025-06-13.md:21-25,37-37` |
| File workflows (`XLIFF`, Crowdin) were considered outside the initiative’s central system/content-translation focus, though relevant to an integrated overview and Localization Team involvement. | Discussed Direction / scope boundary | Useful | 2025-04-04, `MeetingMinutes/Weekly/2025/04/2025-04-04.md:36-43`; 2025-04-11, `MeetingMinutes/Weekly/2025/04/2025-04-11.md:43-53` |

### Claims not supported by these H1 minutes

- No record schema maps a database record to a BCP 47 tag.
- No decision says BCP 47 is the authoritative **record-language identity** while a numeric UID remains only an internal foreign key.
- No distinction is designed between Record Language and Site Language.
- No example covers the same BCP 47 language mapped to different Site Language IDs in multiple sites.
- No global storage-page or globally reusable multilingual-record scenario appears.
- No treatment of region/script/private subtags appears.
- No import/export or external service contract uses BCP 47, although external workflows such as Trados are named as future scope (`MeetingMinutes/Weekly/2025/02/2025-02-28.md:73-80`).
- No BCP 47 data migration, compatibility layer, or API is specified.

Therefore the safest H1 status is **Discussed Direction** for standardized, tag-based/cross-instance language identity, with XLIFF/file handling as the only concrete use case. The stronger site-independent record identity and cross-site reuse story needs later sources or must be labeled **Analytically Derived Recommendation**.

## 5. `sys_language_uid = 0`, record identity, and structural models

### Direct H1 evidence

| Finding | Status | Priority | Exact source |
|---|---|---|---|
| The TCA language field’s special `0` and `-1` values were discussed as part of clarifying the current model. | Current Core Behavior | Useful | 2025-05-02, `MeetingMinutes/Weekly/2025/05/2025-05-02.md:31-39` |
| A reconstructed onboarding recap says `0` historically means default language and states a goal of replacing special values with clearer, explicit mechanisms based on structured metadata. | Discussed Direction, lower confidence | Essential if corroborated later | 2025-06-13, `MeetingMinutes/Weekly/2025/06/2025-06-13.md:21-29` |
| Default-language centrality is visible indirectly in `-1` sorting, Connected Mode sorting, translated-copy misassignment, and Extbase references. | Current Core Behavior / Problem | Essential | 2025-01-10, `MeetingMinutes/Weekly/2025/01/2025-01-10.md:37-39`; 2025-01-17, `MeetingMinutes/Weekly/2025/01/2025-01-17.md:40-49`; 2025-04-04, `MeetingMinutes/Weekly/2025/04/2025-04-04.md:68-72`; 2025-06-06, `MeetingMinutes/Weekly/2025/06/2025-06-06.md:41-55` |

### Explicit limits

- No H1 source explains how related language variants retain common identity without a default-language parent.
- `l10n_parent` is never mentioned in these 18 files.
- No source proposes a language-neutral identity/structure record, a relation object, or a new identity field.
- No source says whether `0` can literally disappear from storage or whether it is merely to lose semantic privilege.
- No source allows a non-default variant to become the source of another localization.
- Consequently, “abolish `0` through a neutral layer” is **not** an H1 initiative position.

## 6. Complete language layers, shadow records, and database-vs-code complexity

There is no direct H1 weekly-minute evidence for any of the following:

- universally complete language layers;
- shadow/dummy/proxy/placeholder/technical records to fill missing variants;
- a neutral structure or identity layer;
- database-record growth as the price of simpler Core logic;
- query/index/storage estimates for such models;
- lifecycle or editor visibility of technical records;
- effects of such records on Workspaces, versioning, Reference Index, or rendering.

The nearest evidence must be kept distinct:

1. The `-1` replacement would create dedicated concrete-language records (`MeetingMinutes/Weekly/2025/01/2025-01-10.md:37-39`). This is automatic materialization for one “all languages” behavior, not completion of every language layer.
2. Missing translations can trigger query/overlay complexity and even an Extbase frontend crash (`MeetingMinutes/Weekly/2025/06/2025-06-06.md:41-55`). This supports the **problem** side, but it does not show that complete layers were proposed as the solution.
3. Language/workspace compound overlays demonstrate layered runtime complexity (`MeetingMinutes/Weekly/2025/04/2025-04-11.md:19-23`), but again no storage-model trade-off was discussed.

Thus the headline question “Where should the complexity live: in the code or in the data model?” is not source-backed by 2025-H1 weekly minutes. It may be central in later documents, but within this scope it must be either sourced later or labeled **Analytically Derived Recommendation/Open Question**, never a H1 preference.

## 7. Editing Language; Translation vs Localization; Free Mode

### What is present

- Free and Connected modes are current terms tied to sorting behavior (`MeetingMinutes/Weekly/2025/01/2025-01-17.md:40-49`).
- Their terminology is confusing/reused and possible renaming was discussed (`MeetingMinutes/Weekly/2025/05/2025-05-02.md:19-23`).
- The Page Module needs more transparent fallback presentation and editor tooling in the lower-confidence June recap (`MeetingMinutes/Weekly/2025/06/2025-06-13.md:21-25,33-33`).
- Current-state documentation was explicitly to cover fallback types, Free/Connected Mode, Language All, and synchronization (`MeetingMinutes/Weekly/2025/03/2025-03-28.md:42-44`).

### What is absent

- No “Editing Language” concept or term.
- No separation of Editing Language from Content/Record Language.
- No `l10n_parent` redesign.
- No Localization Wizard discussion.
- No proposal or preference to deprecate Free Mode.
- No future UX in which an editor simply creates a record in the needed language and TYPO3 infers the relationship.
- No explicit conceptual distinction between translation and market/context localization, although country/market dimensions are adjacent discussion (`MeetingMinutes/Weekly/2025/05/2025-05-02.md:25-29`; `MeetingMinutes/Weekly/2025/05/2025-05-09.md:27-39`).

The H1 evidence supports “terminology and editor transparency need improvement,” not the stronger “technical translation modes should disappear” conclusion.

## 8. Cross-site/global records and external translation

| Topic | H1 evidence | Status | Exact source |
|---|---|---|---|
| Cross-instance language consistency | BCP 47 is proposed for standardized identification in translated-file handling. | Idea / Discussed Direction | 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:55-60` |
| External translation services | System text translation and workflows such as Trados are named as future work. | Planned at topic level | 2025-02-28, `MeetingMinutes/Weekly/2025/02/2025-02-28.md:73-80` |
| AI translation integrations | Enterprises using DeepL plus human review and existing TYPO3 AI integrations are mentioned; a stronger foundation is said to be needed. | Current ecosystem observation / Problem | 2025-03-28, `MeetingMinutes/Weekly/2025/03/2025-03-28.md:30-32` |
| XLIFF scope | File translation is adjacent/outside the initiative’s main content-record focus but should be acknowledged. | Discussed Direction | 2025-04-04, `MeetingMinutes/Weekly/2025/04/2025-04-04.md:36-43`; 2025-04-11, `MeetingMinutes/Weekly/2025/04/2025-04-11.md:43-53` |
| Multi-region output | Country/market values could be introduced pragmatically via routing and Context Aspects; a project had emulated country variants by duplicating languages. | Preferred Direction for adjacent multidimensional work | 2025-05-09, `MeetingMinutes/Weekly/2025/05/2025-05-09.md:27-48` |

No H1 evidence addresses cross-site reuse, global storage pages, sites with different defaults, or mapping the same BCP 47 tag across differing Site Language numeric IDs. A two-site `de-DE` example would be pedagogically useful but is **Analytically Derived Recommendation** unless another source supplies it.

## 9. Technical dependencies reconstructed from H1

### 9.1 Source-backed dependency chain

1. **Remove the semantic `-1` record**
   → concrete records must exist in the applicable languages so each has its own sorting value.
   Source: 2025-01-10, `MeetingMinutes/Weekly/2025/01/2025-01-10.md:37-39`.

2. **Concrete records replacing one all-language record**
   → record-level synchronization is required to preserve the “same everywhere” use case.
   Sources: 2025-01-17, `MeetingMinutes/Weekly/2025/01/2025-01-17.md:33-49`; 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:42-47`.

3. **Record-level synchronization**
   → DataHandler needs a defined process and must compose with field-level synchronization, selecting only relevant fields without overriding existing field configuration.
   Sources: 2025-01-17, `MeetingMinutes/Weekly/2025/01/2025-01-17.md:33-38`; 2025-01-31, `MeetingMinutes/Weekly/2025/01/2025-01-31.md:44-52`.

4. **Record-level synchronization in real data**
   → synchronization provenance/status and relation handling become necessary concerns.
   Sources: status storage idea at 2025-01-17, `MeetingMinutes/Weekly/2025/01/2025-01-17.md:51-55`; IRRE at 2025-01-10, `MeetingMinutes/Weekly/2025/01/2025-01-10.md:22-31`; MM gap at lower-confidence 2025-06-13, `MeetingMinutes/Weekly/2025/06/2025-06-13.md:21-25,35-35`.

5. **Turning synchronization on for existing installations**
   → distinguish existing from missing variants, detect divergence, warn, update rather than recreate, and make bulk migration auditable/recoverable.
   Sources: 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:28-40`; 2025-01-31, `MeetingMinutes/Weekly/2025/01/2025-01-31.md:35-42`.

6. **Changing translation behavior without regressions**
   → inventory all localized query paths and test the effect of removal; translation copying, sorting, Free/Connected behavior, Extbase/Core query behavior, and relations are concrete test dimensions.
   Sources: impact surfaces at 2025-01-17, `MeetingMinutes/Weekly/2025/01/2025-01-17.md:21-31`; WIP test plan at 2025-01-10, `MeetingMinutes/Weekly/2025/01/2025-01-10.md:41-43`; defects at 2025-03-14, `MeetingMinutes/Weekly/2025/03/2025-03-14.md:20-28`, 2025-04-04, `MeetingMinutes/Weekly/2025/04/2025-04-04.md:68-72`, and 2025-06-06, `MeetingMinutes/Weekly/2025/06/2025-06-06.md:41-55`.

7. **Expose record-level and field-level behavior to editors**
   → UI terminology, warnings, and visualization must differentiate the two layers.
   Sources: UI drafts at 2025-01-31, `MeetingMinutes/Weekly/2025/01/2025-01-31.md:54-56,66-71`; label ambiguity at 2025-02-14, `MeetingMinutes/Weekly/2025/02/2025-02-14.md:48-52`.

### 9.2 Relationships that H1 does not establish

- H1 does not establish that BCP 47 must precede `-1` removal. They are mentioned together as roadmap items on 28 March, but January’s `-1` design uses “all languages” without a defined tag-based record identity (`MeetingMinutes/Weekly/2025/03/2025-03-28.md:34-36`).
- H1 does not connect abolishing `0` to shadow records, complete language layers, or a neutral identity layer.
- H1 does not show that complete layers are required for record-level synchronization; only all-language records are materialized.
- H1 does not compare data-model size with runtime/query-code complexity.
- H1 does not establish how target languages are discovered (and specifically does not discuss Site Configuration Languages as the test basis).

### 9.3 Analytically derived dependency recommendations

All items below are **Analytically Derived Recommendation**, not initiative plans in H1:

1. Define an explicit provenance/lifecycle state for auto-managed variants before migration. Without it, the proposed “already synchronized/successful” status (`MeetingMinutes/Weekly/2025/01/2025-01-17.md:51-55`) is insufficient to distinguish generated copies from independent editorial content when disabling or repairing synchronization.
2. Decide target-language discovery and behavior when a language is added or removed before implementing the all-languages flag. The sources promise synchronization “across all languages” but do not define the universe (`MeetingMinutes/Weekly/2025/01/2025-01-24.md:42-47`).
3. Characterize field and relation semantics together. IRRE already violates intuitive expectations around `allowLanguageSynchronization` and `l10n_mode=exclude`, and MM lacks a unified policy (`MeetingMinutes/Weekly/2025/01/2025-01-10.md:22-31`; lower-confidence `MeetingMinutes/Weekly/2025/06/2025-06-13.md:35-35`).
4. Separate a migration preflight/report from the mutation step, then make writes logged and restartable. This follows directly from divergence warnings, preliminary checks, logging/rollback, and large-instance bulk rules (`MeetingMinutes/Weekly/2025/01/2025-01-24.md:28-40`; `MeetingMinutes/Weekly/2025/01/2025-01-31.md:35-42`).
5. Build a matrix of backend and frontend behavior across Free/Connected mode, localized tables, query APIs, overlays, copy/move/delete, and relation types. The minutes identify each axis but do not combine them into a complete characterization suite.
6. Treat BCP 47 record identity as a separate proof of concept until its relationship to Site Languages, internal UIDs, database records, and XLF is defined. H1’s only concrete motivation is cross-instance file identity (`MeetingMinutes/Weekly/2025/01/2025-01-24.md:55-60`).
7. Do not prototype shadow/neutral-layer alternatives as if H1 selected them. First obtain source-backed requirements for record identity and complete layers from later discussions.

## 10. Testing, implementation status, and an H1-grounded migration path

### 10.1 Testing evidence

| Evidence | Status | Interpretation | Exact source |
|---|---|---|---|
| The team chose not to expose the particular `-1` sorting mismatch through an automated test because the proposed replacement was expected to remove it. | Discussed Direction | This is a decision about one symptom, not a rejection of characterization testing generally. | 2025-01-10, `MeetingMinutes/Weekly/2025/01/2025-01-10.md:37-39` |
| A WIP patch to test the impact of removing `-1` was agreed; generic templates and frontend/backend grouping were considered. | Planned | H1 does not give a change number, file list, or completed results. | 2025-01-10, `MeetingMinutes/Weekly/2025/01/2025-01-10.md:41-43` |
| Comprehensive analysis was to identify localized records and Core methods affected by removing `-1`. | Planned | Named surfaces: Extbase repositories, `PageRepository`, `BackendUtility`, TypoScript query objects. | 2025-01-17, `MeetingMinutes/Weekly/2025/01/2025-01-17.md:21-31` |
| A failing test for a distinct copy/translation bug existed in Gerrit `88827`. | In Progress | This is useful adjacent coverage, not evidence that the `-1` suite exists. | 2025-04-04, `MeetingMinutes/Weekly/2025/04/2025-04-04.md:68-72` |
| v13 sorting anomalies required comparison and validation. | Open Question | Another candidate for characterization, but no agreed patch is recorded. | 2025-03-14, `MeetingMinutes/Weekly/2025/03/2025-03-14.md:20-28` |

Specific requested checks absent from H1:

- Gerrit `92267` is not named.
- No findings from a systematic AI-assisted Core search are reported.
- No list of test classes, fixtures, or Core files is provided.
- No statement says Site Configuration Languages must not be used because `-1` cannot be configured there.
- No terms “characterization test”, “feature flag”, “compatibility layer”, “upgrade wizard”, or “deprecation phase” occur in this corpus (an “interactive migration wizard” is discussed, which is not the same as a TYPO3 Upgrade Wizard).

### 10.2 Status inventory at end of H1

#### Already started / In Progress

- General DataHandler optimization reducing redundant queries and streamlining delete/move operations; it may make `-1` changes easier, but is not itself the replacement. Source: 2025-02-14, `MeetingMinutes/Weekly/2025/02/2025-02-14.md:34-38`.
- A failing Core test/change for the translated-copy bug (`88827`). Source: 2025-04-04, `MeetingMinutes/Weekly/2025/04/2025-04-04.md:68-72`.
- Current-state/concept documentation. In late May the Current State was considered accurate/complete, while Gap Analysis, recommendations, and PoC were still skeletal. Source: 2025-05-23, `MeetingMinutes/Weekly/2025/05/2025-05-23.md:21-34`.

#### Explicitly planned

- WIP impact tests for removing `-1`: 2025-01-10, `MeetingMinutes/Weekly/2025/01/2025-01-10.md:41-43`.
- A small `-1` transition concept and feasibility work for record-level synchronization: 2025-01-31, `MeetingMinutes/Weekly/2025/01/2025-01-31.md:27-33,66-71`.
- Configurable record-level synchronization before an enforce option: 2025-01-31, `MeetingMinutes/Weekly/2025/01/2025-01-31.md:44-52`.
- High-level vision followed by detailed sub-concepts, with `-1` first: 2025-02-28, `MeetingMinutes/Weekly/2025/02/2025-02-28.md:73-80`.

#### Discussed but not shown as started

- Record-level flag and edit propagation: 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:42-47`.
- Synchronization status table/fields: 2025-01-17, `MeetingMinutes/Weekly/2025/01/2025-01-17.md:51-55`.
- Migration warnings, log/rollback, defaults, interactive assistant: 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:28-40,62-66`.
- BCP 47 / language tags: 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:55-60`; 2025-03-28, `MeetingMinutes/Weekly/2025/03/2025-03-28.md:34-36`.

#### Not implemented in the H1 record

- No implementation of `-1` removal.
- No implementation of a record-level all-languages flag.
- No implementation of `enforceLanguageSynchronization`.
- No implemented migration path.
- No implemented BCP 47 record identity.
- No implemented replacement for `0`.
- No implemented shadow/identity layer or Editing Language.

### 10.3 Plausible H1-grounded evolution path

This is the narrowest path supported by H1, with analytical additions clearly separated:

1. **Understand — Planned:** inventory all localized record/query paths affected by `-1`, scoped to Core, excluding third-party behavior. Source: `MeetingMinutes/Weekly/2025/01/2025-01-17.md:21-31`.
2. **Test — Planned:** build maintainable frontend/backend impact tests. Source: `MeetingMinutes/Weekly/2025/01/2025-01-10.md:41-43`.
3. **Specify — Planned:** agree a small `-1` concept and record-level synchronization semantics. Sources: `MeetingMinutes/Weekly/2025/01/2025-01-31.md:27-33,66-71`; `MeetingMinutes/Weekly/2025/02/2025-02-28.md:73-80`.
4. **Prepare DataHandler — In Progress adjacent work:** reuse/extend field synchronization and benefit from general query/delete/move cleanup. Sources: `MeetingMinutes/Weekly/2025/01/2025-01-17.md:33-38`; `MeetingMinutes/Weekly/2025/02/2025-02-14.md:34-38`.
5. **Introduce configurable record synchronization — Planned/Preferred Direction:** preserve existing field rules and apply only to relevant fields. Source: `MeetingMinutes/Weekly/2025/01/2025-01-31.md:44-52`.
6. **Add enforced behavior — Planned/Preferred Direction:** only after the configurable mechanism. Source: same.
7. **Design and dry-run migration — Discussed plus analytical decomposition:** preflight divergence, choose update/create behavior, report changes, and support bulk defaults. Sources: `MeetingMinutes/Weekly/2025/01/2025-01-24.md:28-40`; `MeetingMinutes/Weekly/2025/01/2025-01-31.md:35-42`.
8. **Migrate and remove `-1` — Goal, not implemented:** use dedicated language records and prove sorting/query/relations behavior with tests. Source for goal: `MeetingMinutes/Weekly/2025/01/2025-01-10.md:37-43`.
9. **Analytically Derived Recommendation:** define off-switch/new-language/provenance semantics, extension compatibility, deprecation window, Upgrade Wizard/data migration, and rollback/restartability before production rollout. These are not stated as an H1 plan.
10. **Parallel research track — Discussed Direction:** clarify language-tag identity/BCP 47 independently; do not block the narrow `-1` proof of concept unless later architecture work proves a hard dependency. Sources: `MeetingMinutes/Weekly/2025/01/2025-01-24.md:55-60`; `MeetingMinutes/Weekly/2025/03/2025-03-28.md:34-36`.

## 11. Evolution, tensions, and apparent contradictions

| Topic | Earlier position | Later position | Reconciliation / current H1 reading | Sources |
|---|---|---|---|---|
| Testing the `-1` sorting symptom | Specific sorting mismatch did not need a test because replacement should resolve it. | A broader WIP patch testing removal impact was agreed in the same meeting. | Not a contradiction: skip preservation of an obsolete symptom, but test the wider transition. The session should avoid saying all current behavior was intended to be frozen. | 2025-01-10, `MeetingMinutes/Weekly/2025/01/2025-01-10.md:37-43` |
| Allow versus enforce | `enforceLanguageSynchronization` called necessary alongside allow. | Make record sync configurable first, then add enforced behavior; allow per-record editor control in the first phase. | A phased refinement, not a reversal. Exact non-overridable semantics remain undocumented. | 2025-01-17, `MeetingMinutes/Weekly/2025/01/2025-01-17.md:33-38`; 2025-01-31, `MeetingMinutes/Weekly/2025/01/2025-01-31.md:44-52` |
| “Synchronize all” versus exceptions | Record flag would propagate changes across all related translations. | Selective exclusion was discussed but deferred; only relevant fields should sync and existing field settings should survive. | “All languages” does not mean every field blindly. Record coverage and field coverage are separate dimensions, still incompletely specified. | 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:42-47`; 2025-01-31, `MeetingMinutes/Weekly/2025/01/2025-01-31.md:44-50` |
| Existing translations | Consensus: update, do not delete/recreate, and warn on differences. | A later summary repeats update existing/create missing and suggests preflight. | Stable preferred direction, but conflict resolution and disable lifecycle remain open. | 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:28-40`; 2025-01-31, `MeetingMinutes/Weekly/2025/01/2025-01-31.md:35-42` |
| Strategy breadth | February debate left immediate `-1` work versus a comprehensive strategy undecided. | Two weeks later the explicit structure was high-level vision then detailed sub-concepts, with `-1` immediate. | Resolution by layering: broad vision, incremental first concept. | 2025-02-14, `MeetingMinutes/Weekly/2025/02/2025-02-14.md:40-46`; 2025-02-28, `MeetingMinutes/Weekly/2025/02/2025-02-28.md:73-80` |
| BCP 47 scope | Proposed for file translation and cross-instance consistency. | Later paired generally with language-tag-based identification and, in a reconstructed recap, XLF naming. | Direction broadened rhetorically, but H1 still lacks a database-record identity design. | 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:55-60`; 2025-03-28, `MeetingMinutes/Weekly/2025/03/2025-03-28.md:34-36`; 2025-06-13, `MeetingMinutes/Weekly/2025/06/2025-06-13.md:21-25,37-37` |
| Fundamental overhaul versus pragmatism | March says the initiative aims for a fundamental architectural overhaul and should state an ambitious vision. | May rejects a full NEOS-style node/event-sourced multidimensional redesign as unrealistic, preferring small routing/context steps. | Scope-specific, not necessarily contradictory: fundamental translation reform does not imply wholesale adoption of a different content repository. | 2025-03-14, `MeetingMinutes/Weekly/2025/03/2025-03-14.md:30-34,50-54`; 2025-05-09, `MeetingMinutes/Weekly/2025/05/2025-05-09.md:27-33` |
| File translation scope | BCP 47/file association was a future planning topic. | April says XLIFF/Crowdin deviate from the initiative’s central content-translation-handling scope, while still requiring acknowledgement and Localization Team input. | A boundary refinement: integrated overview, separate ownership. | 2025-01-24, `MeetingMinutes/Weekly/2025/01/2025-01-24.md:55-60`; 2025-04-04, `MeetingMinutes/Weekly/2025/04/2025-04-04.md:36-43`; 2025-04-11, `MeetingMinutes/Weekly/2025/04/2025-04-11.md:43-53` |
| Status of concept document | On 23 May Astrid’s Current State chapter was described as factually accurate and complete; recommendations and PoC were skeletal. | On 6 June the broader AI-generated document could not be endorsed, while Astrid’s manual chapter remained a strong basis. | No contradiction: current-state chapter quality and whole-document endorsement are different. The vision/roadmap was not mature. | 2025-05-23, `MeetingMinutes/Weekly/2025/05/2025-05-23.md:21-38`; 2025-06-06, `MeetingMinutes/Weekly/2025/06/2025-06-06.md:23-39` |
| `pages` scope | January says `pages` is not affected by the contemplated `-1` transition. | Other minutes discuss page-specific DataHandler “Translate To”, Page Module sorting/fallbacks, and copy issues. | These are adjacent page translation problems, not proof that `pages` stores/uses `-1` in the same way. Preserve the narrow wording. | 2025-01-17, `MeetingMinutes/Weekly/2025/01/2025-01-17.md:21-31`; 2025-01-10, `MeetingMinutes/Weekly/2025/01/2025-01-10.md:52-54`; 2025-03-14, `MeetingMinutes/Weekly/2025/03/2025-03-14.md:20-28` |

Terminology warning: `MeetingMinutes/Weekly/2025/03/2025-03-28.md:34-36` calls `-1` a “language fallback”. Other sources define it as “All languages” (`MeetingMinutes/Weekly/2025/06/2025-06-13.md:27-31`). The session should use “special All Languages value/record” unless explaining fallback separately.

## 12. Presentation-worthy examples and visuals

| Example / proposed visual | Story and source-backed point | Status | Priority | Exact sources |
|---|---|---|---|---|
| **One `-1` element, three language-specific sort positions** | Before: one all-language element inherits default-layer sorting and is misplaced elsewhere. After (discussed): dedicated records in `de`, `fr`, `es`, synchronized but each with a proper sort value. | Current Core Behavior + Discussed Direction | Essential | `MeetingMinutes/Weekly/2025/01/2025-01-10.md:37-39`; `MeetingMinutes/Weekly/2025/01/2025-01-17.md:40-49` |
| **Activate synchronization with a divergent translation** | Show source `A`, existing edited `A-fr`, warning/preflight, update-vs-conflict decision, audit log. The minutes support warning/update/log concepts, not a final merge algorithm. | Preferred Direction + Open Question | Essential | `MeetingMinutes/Weekly/2025/01/2025-01-24.md:28-40`; `MeetingMinutes/Weekly/2025/01/2025-01-31.md:35-42` |
| **Record-level versus field-level synchronization controls** | Two-layer UI sketch: a record participates across languages; selected fields follow existing rules. Highlight why labels and precedence matter. | Discussed/Preferred Direction | Essential | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:33-38`; `MeetingMinutes/Weekly/2025/01/2025-01-31.md:44-52`; `MeetingMinutes/Weekly/2025/02/2025-02-14.md:48-52` |
| **Core ripple map** | Center `sys_language_uid=-1`; branches to localized tables, Extbase repositories, `PageRepository`, `BackendUtility`, TypoScript queries, DataHandler, Free/Connected sorting. | Planned analysis / Problem | Essential | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:21-49` |
| **IRRE surprise** | Localize a parent: child copies appear whether synchronization is false/excluded or true; the integrator abandons IRRE for n:1 and loses ORM convenience. | Current Core Behavior / Problem | Useful | `MeetingMinutes/Weekly/2025/01/2025-01-10.md:22-31` |
| **Missing Extbase translation** | Default record remains referenced, translation missing, frontend crashes; developer chooses among manual language validation, query settings, overlay, custom query. | Problem | Useful | `MeetingMinutes/Weekly/2025/06/2025-06-06.md:41-55` |
| **Language + workspace overlay stack** | Two overlay layers combine and become hard to explain. Use as a backup diagram of current runtime complexity. | Current Core Behavior / Problem | Useful/backup | `MeetingMinutes/Weekly/2025/04/2025-04-11.md:19-23` |
| **Translated copy becomes default-language content** | A compact before/after database row example backed by failing test `88827`; illustrates why tests and DataHandler invariants matter. | Problem / In Progress | Useful/backup | `MeetingMinutes/Weekly/2025/04/2025-04-04.md:68-72`; `MeetingMinutes/Weekly/2025/04/2025-04-11.md:31-35` |
| **XLF packages from two instances** | Same language should carry a standardized BCP 47 identifier rather than instance-specific identity. This is the directly supported BCP 47 story. | Idea / Discussed Direction | Useful | `MeetingMinutes/Weekly/2025/01/2025-01-24.md:55-60`; lower-confidence `MeetingMinutes/Weekly/2025/06/2025-06-13.md:37-37` |
| **Country modeled as fake language** | Existing workaround duplicates languages; proposed pragmatic route/context-aspect dimension preserves caching. | Problem + Preferred Direction for adjacent feature | Optional | `MeetingMinutes/Weekly/2025/05/2025-05-09.md:27-48` |
| **Two sites, same BCP 47 tag** | Strong session visual but not directly in H1. Mark as extrapolation unless later sources support it. | Analytically Derived Recommendation | Optional | Based only indirectly on cross-instance consistency at `MeetingMinutes/Weekly/2025/01/2025-01-24.md:55-60` |
| **Sparse vs complete language layers** | Not supported in H1. Do not cite dedicated `-1` replacement records as proof of this general model. | Open Question if later sourced | Essential only if later evidence exists | Negative finding across H1 |

Useful short source-backed formulations for the presenter (paraphrases, not claims of final consensus):

- “The first step is small enough to test: understand what `-1` does, then replace the implicit language with explicit records and synchronization.” (`MeetingMinutes/Weekly/2025/01/2025-01-17.md:61-65`; `MeetingMinutes/Weekly/2025/01/2025-01-31.md:27-33`)
- “One record can be ‘everywhere’, but its sort position is not actually everywhere.” (`MeetingMinutes/Weekly/2025/01/2025-01-10.md:37-39`)
- “A migration cannot simply recreate translations; real editors have already changed them.” (`MeetingMinutes/Weekly/2025/01/2025-01-24.md:28-40`)
- “Extbase tries to abstract translation, yet complex cases still fall back to manual queries and overlays.” (`MeetingMinutes/Weekly/2025/06/2025-06-06.md:51-55`)

## 13. Suggested H1 contribution to the T3DD26 slide arc

| Proposed slide | Central statement | 3–5 points | Visual | Status | Sources |
|---|---|---|---|---|---|
| `-1`: one magic value, many side effects | “All Languages” is not just a label; it leaks into sorting and query behavior. | Special value; default-derived sorting; Free/Connected differences; wide query surface. | Three language columns with one misplaced `-1` card. | Current + Problem | `MeetingMinutes/Weekly/2025/01/2025-01-10.md:37-39`; `MeetingMinutes/Weekly/2025/01/2025-01-17.md:21-49` |
| Make the behavior explicit | Replace one magic-language record with concrete variants and record-level synchronization. | Dedicated records; DataHandler; reuse field sync; relevant fields only; allow then enforce. | Source record branching to concrete language rows. | Vision / Discussed + Preferred Direction | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:33-49`; `MeetingMinutes/Weekly/2025/01/2025-01-24.md:42-47`; `MeetingMinutes/Weekly/2025/01/2025-01-31.md:44-52` |
| Migration is product behavior | Existing translations make a binary flag unsafe without conflict handling. | Update, don’t recreate; create missing; preflight; warnings; log/rollback/bulk defaults. | Divergent source/translation merge decision. | Open + Preferred Direction | `MeetingMinutes/Weekly/2025/01/2025-01-24.md:28-40`; `MeetingMinutes/Weekly/2025/01/2025-01-31.md:35-42` |
| The Core surface is larger than DataHandler | Removing `-1` crosses read, write, render, sort, relation, and UI paths. | Extbase; PageRepository/BackendUtility; TypoScript; IRRE/MM; Page Module. | Dependency/ripple map. | Problem / Planned analysis | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:21-49`; `MeetingMinutes/Weekly/2025/04/2025-04-04.md:59-66`; lower-confidence `MeetingMinutes/Weekly/2025/06/2025-06-13.md:33-35` |
| BCP 47: promising, but scope matters | H1 supports standardized tag identity most concretely for files/cross-instance consistency, not yet a database record model. | BCP 47 proposal; file association; language tags on roadmap; XLF boundary; record/site mapping open. | Two XLF packages converging on `de-DE`. | Vision + Open | `MeetingMinutes/Weekly/2025/01/2025-01-24.md:55-60`; `MeetingMinutes/Weekly/2025/03/2025-03-28.md:34-36`; `MeetingMinutes/Weekly/2025/04/2025-04-04.md:36-43` |
| Where we actually were in H1 2025 | Concept and characterization came before implementation. | WIP test planned; DataHandler cleanup adjacent; copy regression test live; no `-1` implementation; broader roadmap immature. | Status ladder: discussed → planned → in progress → not implemented. | In Progress | `MeetingMinutes/Weekly/2025/01/2025-01-10.md:41-43`; `MeetingMinutes/Weekly/2025/02/2025-02-14.md:34-38`; `MeetingMinutes/Weekly/2025/04/2025-04-04.md:68-72`; `MeetingMinutes/Weekly/2025/05/2025-05-23.md:27-34` |

Backup-slide candidates: IRRE child-copy behavior; compound language/workspace overlays; translated-copy failing test; one-dimensional country/market workaround; `l10n_diffsource`/“Translate To” data-integrity details.

## 14. Prompt-theme coverage matrix for the full synthesis

| Requested theme | H1 evidence level | Correct H1 status / guardrail | Best exact sources |
|---|---|---|---|
| Problems caused by `sys_language_uid=-1` | Strong | Current Core Behavior / Problem | `MeetingMinutes/Weekly/2025/01/2025-01-10.md:37-39`; `MeetingMinutes/Weekly/2025/01/2025-01-17.md:40-49` |
| Remove `-1` | Strong | Preferred Direction; not implemented | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:61-65`; `MeetingMinutes/Weekly/2025/02/2025-02-28.md:73-80` |
| Boolean/record flag replacing `-1` | Strong idea | Discussed Direction; schema unnamed | `MeetingMinutes/Weekly/2025/01/2025-01-24.md:42-47` |
| Dedicated records per concrete language | Strong for all-language replacement | Discussed Direction; not universal complete layers | `MeetingMinutes/Weekly/2025/01/2025-01-10.md:37-39` |
| DataHandler auto creation/synchronization | Strong direction, incomplete mechanics | Discussed/Preferred Direction + Open Question | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:33-38`; `MeetingMinutes/Weekly/2025/01/2025-01-31.md:35-52` |
| `l10n_mode=exclude` and `allowLanguageSynchronization` | Strong problem evidence | Current Core Behavior / Problem, especially IRRE | `MeetingMinutes/Weekly/2025/01/2025-01-10.md:22-31` |
| `enforceLanguageSynchronization` | Moderate/strong conceptual evidence | Discussed Direction; exact property and opt-out semantics not defined | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:33-38`; `MeetingMinutes/Weekly/2025/01/2025-01-31.md:44-52` |
| Activate flag with manual translations | Strong partial answer | Update, warn; merge policy still Open Question | `MeetingMinutes/Weekly/2025/01/2025-01-24.md:28-40` |
| Disable flag | None | Open Question | Negative H1 finding |
| New target languages | None beyond create-missing migration statement | Open Question | Nearest `MeetingMinutes/Weekly/2025/01/2025-01-31.md:35-40` |
| Identify auto-managed vs independent copies | Weak idea | Open Question; status table/fields suggested | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:51-55` |
| Special role of `0` | Weak/late | Current Core Behavior + Discussed Direction in reconstructed recap | `MeetingMinutes/Weekly/2025/05/2025-05-02.md:31-39`; `MeetingMinutes/Weekly/2025/06/2025-06-13.md:21-29` |
| Record identity without default language | None | Open Question; do not infer | Negative H1 finding |
| `l10n_parent` | None | No evidence | Negative H1 finding |
| Complete language layers | None | No evidence; not a H1 direction | Negative H1 finding |
| Shadow/technical records | None | No evidence | Negative H1 finding |
| Neutral structure/identity layer | None | No evidence | Negative H1 finding |
| Database size vs Core-code complexity | None | No evidence; analytical/open only | Negative H1 finding |
| Workspaces/versioning/reference index under future model | Only compound overlays | Current complexity evidence; no future-model analysis | `MeetingMinutes/Weekly/2025/04/2025-04-11.md:19-23` |
| BCP 47 | Moderate | Discussed Direction, concretely file/cross-instance focused | `MeetingMinutes/Weekly/2025/01/2025-01-24.md:55-60`; `MeetingMinutes/Weekly/2025/03/2025-03-28.md:34-36` |
| BCP 47 as record identity; numeric IDs remain internal | None | Open/analytical, not H1 position | Negative H1 finding |
| Cross-site/global storage records | None | No evidence | Negative H1 finding |
| XLIFF/file translation | Moderate | Adjacent scope; BCP 47 use case | `MeetingMinutes/Weekly/2025/01/2025-01-24.md:55-60`; `MeetingMinutes/Weekly/2025/04/2025-04-04.md:36-43` |
| External services | Topic-level only | Planned/discussed future scope | `MeetingMinutes/Weekly/2025/02/2025-02-28.md:73-80`; `MeetingMinutes/Weekly/2025/03/2025-03-28.md:30-32` |
| Editing Language | None | No evidence | Negative H1 finding |
| Free/Connected mode | Strong current-problem/terminology evidence | Current Core Behavior / Problem; no deprecation | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:40-49`; `MeetingMinutes/Weekly/2025/05/2025-05-02.md:19-23` |
| Translation → Localization product shift | None direct | No evidence beyond adjacent country/market need | `MeetingMinutes/Weekly/2025/05/2025-05-02.md:25-29`; `MeetingMinutes/Weekly/2025/05/2025-05-09.md:27-39` |
| “Create element where needed; system manages parent” | None | No evidence | Negative H1 finding |
| Characterization/impact tests | Moderate | Planned, not shown completed | `MeetingMinutes/Weekly/2025/01/2025-01-10.md:41-43`; `MeetingMinutes/Weekly/2025/01/2025-01-17.md:21-31` |
| Gerrit `92267` | None | Not mentioned in H1 minutes | Negative H1 finding |
| Site Configuration Languages excluded from `-1` tests | None | Not mentioned; must come from later source/technical validation | Negative H1 finding |
| Migration/deprecation/compatibility | Migration ideas strong; deprecation/compatibility absent | Preferred Direction + Open Question; analytical steps must be labeled | `MeetingMinutes/Weekly/2025/01/2025-01-24.md:28-40`; `MeetingMinutes/Weekly/2025/01/2025-01-31.md:35-42` |
| Proof of concept | Document chapter skeletal only | Not a concrete technical PoC plan | `MeetingMinutes/Weekly/2025/05/2025-05-23.md:27-34` |
| Multi-dimensional country/market | Strong adjacent discussion | Preferred pragmatic direction; Optional for main session | `MeetingMinutes/Weekly/2025/05/2025-05-09.md:27-48` |

## 15. Consolidated source matrix

| Theme | Finding | Status | Priority | Source | Date |
|---|---|---|---|---|---|
| `-1` sorting | Default-derived sorting mismatches other language layers. | Current Core Behavior / Problem | Essential | `MeetingMinutes/Weekly/2025/01/2025-01-10.md:37-39` | 2025-01-10 |
| `-1` replacement | Dedicated concrete-language records plus synchronization. | Discussed Direction | Essential | `MeetingMinutes/Weekly/2025/01/2025-01-10.md:37-39` | 2025-01-10 |
| Tests | WIP impact-test patch agreed. | Planned | Essential | `MeetingMinutes/Weekly/2025/01/2025-01-10.md:41-43` | 2025-01-10 |
| Core surface | Localized tables, Extbase, `PageRepository`, `BackendUtility`, TypoScript. | Planned analysis | Essential | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:21-31` | 2025-01-17 |
| DataHandler | Clear synchronization process required. | Preferred Direction | Essential | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:33-38` | 2025-01-17 |
| Enforce option | Add enforce alongside allow. | Discussed Direction | Essential | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:35-38` | 2025-01-17 |
| Modes/sorting | Record sync presented as common remedy for Free/Connected sorting. | Discussed Direction | Essential | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:40-49` | 2025-01-17 |
| Provenance | Store synchronized/success status in fields/table. | Idea / Open Question | Useful | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:51-55` | 2025-01-17 |
| Strategy | `-1` is first step, broader strategy remains adaptive. | Preferred Direction | Essential | `MeetingMinutes/Weekly/2025/01/2025-01-17.md:61-65` | 2025-01-17 |
| Migration | Update existing, warn on divergence. | Preferred Direction | Essential | `MeetingMinutes/Weekly/2025/01/2025-01-24.md:28-33` | 2025-01-24 |
| Migration operations | Logging/rollback, bulk defaults, wizard considered. | Idea / Open Question | Useful | `MeetingMinutes/Weekly/2025/01/2025-01-24.md:35-40` | 2025-01-24 |
| Record flag | Keep all related translations synchronized; propagate edits. | Discussed Direction | Essential | `MeetingMinutes/Weekly/2025/01/2025-01-24.md:42-47` | 2025-01-24 |
| BCP 47 | Proposed for file association/cross-instance identity. | Idea / Discussed Direction | Essential | `MeetingMinutes/Weekly/2025/01/2025-01-24.md:55-60` | 2025-01-24 |
| Phasing | Configurable record sync before enforced option. | Preferred Direction / Planned | Essential | `MeetingMinutes/Weekly/2025/01/2025-01-31.md:44-52` | 2025-01-31 |
| Foundation | General DataHandler optimization may ease transition. | In Progress | Useful | `MeetingMinutes/Weekly/2025/02/2025-02-14.md:34-38` | 2025-02-14 |
| Concept plan | Vision then sub-concepts; `-1` immediate priority. | Planned | Essential | `MeetingMinutes/Weekly/2025/02/2025-02-28.md:73-80` | 2025-02-28 |
| Architectural ambition | Initiative wants fundamental overhaul, not minor UI polish. | Discussed Direction | Useful | `MeetingMinutes/Weekly/2025/03/2025-03-14.md:30-34,50-54` | 2025-03-14 |
| Language tags | `-1` removal and tag-based identification appear as roadmap topics. | Discussed Direction | Essential | `MeetingMinutes/Weekly/2025/03/2025-03-28.md:34-36` | 2025-03-28 |
| IRRE | `-1`, allow synchronization, IRRE/bidirectional relations grouped. | Discussed Direction | Useful | `MeetingMinutes/Weekly/2025/04/2025-04-04.md:59-66` | 2025-04-04 |
| Copy bug | Translation copy becomes default language; failing test `88827`. | Problem / In Progress | Useful | `MeetingMinutes/Weekly/2025/04/2025-04-04.md:68-72` | 2025-04-04 |
| Overlays | Language and workspace overlays can compound. | Current Core Behavior / Problem | Useful | `MeetingMinutes/Weekly/2025/04/2025-04-11.md:19-23` | 2025-04-11 |
| Special `0`/`-1` | Both special values discussed in TCA language field. | Current Core Behavior | Useful | `MeetingMinutes/Weekly/2025/05/2025-05-02.md:31-39` | 2025-05-02 |
| Dimensions | Language-only output model; route/context country aspect preferred over NEOS redesign. | Current Core Behavior / Preferred Direction | Optional | `MeetingMinutes/Weekly/2025/05/2025-05-09.md:27-48` | 2025-05-09 |
| Extbase | Missing translation can crash; manual overlay/query workarounds. | Problem | Useful | `MeetingMinutes/Weekly/2025/06/2025-06-06.md:41-55` | 2025-06-06 |
| `0`/`-1` goal | Replace special values with explicit structured metadata. | Discussed Direction, lower confidence | Essential if later corroborated | `MeetingMinutes/Weekly/2025/06/2025-06-13.md:21-31` | 2025-06-13 |
| MM relations | No unified multilingual synchronization/differentiation. | Problem / Open Question, lower confidence | Useful | `MeetingMinutes/Weekly/2025/06/2025-06-13.md:21-25,35-35` | 2025-06-13 |
| XLF naming | BCP47-compliant identifiers/consistent names mentioned. | Discussed Direction, lower confidence | Useful | `MeetingMinutes/Weekly/2025/06/2025-06-13.md:21-25,37-37` | 2025-06-13 |

## 16. Bottom-line handoff

For the full T3DD26 narrative, 2025 H1 can safely underpin three claims:

1. `-1` is a concrete special-case problem with observable sorting and broad Core-query consequences.
2. The initiative’s preferred early direction was explicit concrete-language records plus phased record-level synchronization, with migration safeguards and DataHandler/test work before removal.
3. BCP 47/language tags were a promising adjacent direction, concretely motivated by file/cross-instance consistency, but their database-record and cross-site semantics were not yet designed in these minutes.

It cannot safely underpin complete language layers, shadow records, a neutral identity layer, Editing Language, Free Mode deprecation, a `l10n_parent` replacement, or the code-versus-database-complexity trade-off. Those must come from other periods/transcripts or be labeled analytical hypotheses.
