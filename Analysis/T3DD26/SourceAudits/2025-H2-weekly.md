# T3DD26 source dossier: Weekly minutes, July-November 2025

## Scope and evidence rules

- Reviewed every Markdown file under `MeetingMinutes/Weekly/2025/07` through `MeetingMinutes/Weekly/2025/11`: 18 files, 1,366 lines total.
- Evidence citations use exact repository-relative path and line range.
- Status vocabulary is restricted to the requested labels: **Current Core Behavior**, **Problem**, **Idea**, **Discussed Direction**, **Preferred Direction**, **Open Question**, **Planned**, **In Progress**, **Implemented**, **Analytically Derived Recommendation**.
- Session priority uses **Essential**, **Useful**, **Optional**, or **Too Detailed**.
- A statement in the minutes records what the initiative discussed or observed; it is not independent technical verification of TYPO3 Core.
- Date caveat: `MeetingMinutes/Weekly/2025/11/2025-11-14.md` declares `2025-11-21` in both title and date and describes an earlier 2025-11-14 meeting. `MeetingMinutes/Weekly/2025/11/2025-11-21.md` also declares 2025-11-21 and substantially repeats the same material. Treat the exact chronology of these two documents as ambiguous and cite their paths, not an inferred correction.

## Executive source synthesis

### Best-supported current narrative at the end of November 2025

1. **The problem space is not one isolated `-1` bug.** The minutes connect numeric IDs, the special meanings of `0` and `-1`, fallback/overlay logic, incomplete language layers, structural dependence on a default language, and editor-facing Connected/Free/Mixed modes. Evidence: `MeetingMinutes/Weekly/2025/07/2025-07-11.md:34-48`; `MeetingMinutes/Weekly/2025/07/2025-07-18.md:32-47`; `MeetingMinutes/Weekly/2025/09/2025-09-26.md:27-37`. **Status: Problem. Priority: Essential.**

2. **Stable language identity based on BCP 47 is a sustained long-term preference, not an implemented change.** July repeatedly establishes standardized, non-numeric identification and equal languages as goals. The most concrete July discussion says the same numeric ID can identify different languages in different site contexts, proposes deriving tags from Site Configuration locale values, and requires a migration path with manual resolution for ambiguity. September calls BCP 47 the long-term goal and links it to root-site reuse and language-specific file assets. Evidence: `MeetingMinutes/Weekly/2025/07/2025-07-04.md:39-46`; `MeetingMinutes/Weekly/2025/07/2025-07-25.md:22-34`; `MeetingMinutes/Weekly/2025/09/2025-09-26.md:27-31`. **Status: Preferred Direction. Priority: Essential.**

3. **The immediate technical focus is `-1`, characterized before replacement.** By late summer and autumn, the team chooses an iterative, dual-track strategy: keep concept work moving, but build deterministic scenarios in the initiative's test extension, translate them into Core tests, map impacted Core areas, and then pursue Core patches. Evidence: `MeetingMinutes/Weekly/2025/08/2025-08-15.md:21-29`; `MeetingMinutes/Weekly/2025/09/2025-09-05.md:36-40`; `MeetingMinutes/Weekly/2025/10/2025-10-17.md:24-34`; `MeetingMinutes/Weekly/2025/11/2025-11-28.md:26-36`. **Status: In Progress. Priority: Essential.**

4. **The leading `-1` replacement is explicit synchronization, initially expressed by a boolean on a default/source record.** The recurring model is: mark the record; DataHandler creates concrete per-language records; enforce selected content synchronization; later perhaps support synchronization groups. The newest detail in this period narrows the first version to default-language records and a tentative TCA control field `ctrl.languageSyncField`. Evidence: `MeetingMinutes/Weekly/2025/08/2025-08-15.md:31-45`; `MeetingMinutes/Weekly/2025/09/2025-09-26.md:33-38`; `MeetingMinutes/Weekly/2025/11/2025-11-14.md:100-106`; `MeetingMinutes/Weekly/2025/11/2025-11-28.md:47-57`. **Status: Planned / Discussed Direction. Priority: Essential.** No source in this period proves that the Core mechanism was implemented.

5. **Activation/deactivation and provenance remain open.** August moves from warning about irreversible effects to warning only when actual data loss is detected. November discusses soft-deleting orphaned records for controlled restoration and preventing repeated toggles from producing exponential duplicates. The minutes do not define a final provenance marker that distinguishes system-managed copies from independent editorial translations. Evidence: `MeetingMinutes/Weekly/2025/08/2025-08-15.md:41-45`; `MeetingMinutes/Weekly/2025/08/2025-08-22.md:36-41`; `MeetingMinutes/Weekly/2025/11/2025-11-28.md:53-57`. **Status: Open Question. Priority: Essential.**

6. **The `0`/record-identity discussion evolves materially.** July keeps two alternatives open: complete structures in each language with shadow records, or a shared/invisible structure layer. September briefly presents complete per-language structures and shadow records as the proposed unified future. On 2025-10-24, however, duplication, synchronization, and Workspace costs move the discussion toward a shared language-independent structural layer; Jo favors it and the minutes say it will likely form the future foundation. Evidence: `MeetingMinutes/Weekly/2025/07/2025-07-18.md:49-73`; `MeetingMinutes/Weekly/2025/09/2025-09-26.md:58-66`; `MeetingMinutes/Weekly/2025/10/2025-10-24.md:45-78`. **Status: Preferred Direction. Priority: Essential.** This is a preference, not a decision; the session must not present complete language layers or the neutral layer as settled architecture.

7. **The newer structure-layer proposal formalizes an existing implicit pattern.** It separates a contentless structural identity (`transOrigPointerField`) from the record supplying translated content (`translationSource`). It is framed as a generalization of the default language's existing control-layer role, with easier migration and fewer records than shadows. Evidence: `MeetingMinutes/Weekly/2025/10/2025-10-24.md:53-70`. **Status: Discussed Direction / Preferred Direction. Priority: Essential.**

8. **Editor-facing Free mode could survive as an experience while records remain technically connected.** The team repeatedly seeks to eliminate technical mode decisions and Mixed mode failure states. The clearest late formulation says editors might retain a “free” experience while the system preserves internal connections through shadow records or a structural layer. Evidence: `MeetingMinutes/Weekly/2025/07/2025-07-11.md:46-48`; `MeetingMinutes/Weekly/2025/09/2025-09-19.md:69-92`; `MeetingMinutes/Weekly/2025/10/2025-10-24.md:37-43`. **Status: Discussed Direction. Priority: Essential.** This is stronger evidence for simplifying modes than for a formally decided “Free Mode deprecation.”

9. **IRRE relations expose concrete data-integrity problems and supply the strongest demo material.** The extension observed children rendered irrespective of language; later meetings distinguish valid `-1` combinations from invalid mixed specific-language combinations and state that translate/copy maintain language consistency whereas move/edit can break it. Evidence: `MeetingMinutes/Weekly/2025/08/2025-08-29.md:35-63`; `MeetingMinutes/Weekly/2025/11/2025-11-14.md:21-63`; `MeetingMinutes/Weekly/2025/11/2025-11-21.md:21-51`. **Status: Current Core Behavior / Problem. Priority: Useful.** These are observations to reproduce in Core tests, not all yet independently confirmed Core contracts.

10. **The evolution path is deliberately incremental and partly parallel.** The July sequence “remove `-1` → decouple `0` → BCP 47” is later softened into a blurry overall vision where each small change reveals the next. Migration and deprecation are preferred over abrupt behavioral changes. Evidence: `MeetingMinutes/Weekly/2025/07/2025-07-11.md:50-61`; `MeetingMinutes/Weekly/2025/09/2025-09-26.md:21-25`; `MeetingMinutes/Weekly/2025/09/2025-09-26.md:39-50`. **Status: Preferred Direction. Priority: Essential.** Do not report the July order as a fixed roadmap.

## Evolution and changes in position

| Period | Evidence-backed development | Status at that time | Latest interpretation within this source set |
| --- | --- | --- | --- |
| 2025-07-04 | Concept goals are standardized language-neutral architecture, BCP 47, removal of `-1` and `0`, and equal non-hierarchical languages (`MeetingMinutes/Weekly/2025/07/2025-07-04.md:39-46`). | Preferred Direction | Remains the strategic vision, but not a detailed architecture or roadmap. |
| 2025-07-11 | Proposed sequence: `-1`, then decouple `0`, then human-readable IDs; also abstract `isDefaultLanguage()` (`MeetingMinutes/Weekly/2025/07/2025-07-11.md:54-61`). | Discussed Direction / Planned | Superseded as a rigid sequence by the September iterative strategy. |
| 2025-07-18 to 2025-07-25 | Two structure models remain open: contentless default/central layer versus complete per-language structure with shadows; redundancy/performance is the central trade-off (`MeetingMinutes/Weekly/2025/07/2025-07-18.md:49-73`; `MeetingMinutes/Weekly/2025/07/2025-07-25.md:36-49`). | Open Question | October evidence favors the generalized neutral structural layer. |
| 2025-08-15 | Boolean all-language flag, enforced field synchronization, migration, and warnings are stated as a plan; development and concept proceed in parallel (`MeetingMinutes/Weekly/2025/08/2025-08-15.md:21-45`). | Planned | The core idea persists, but field scope, toggle semantics, and replacement of existing TCA mechanisms remain unsettled. |
| 2025-08-22 | Start at field-level synchronization, extend to record-level; evaluate rather than assume replacement of `l10n_mode=exclude`; formalize relation edge cases as tests (`MeetingMinutes/Weekly/2025/08/2025-08-22.md:30-60`). | Discussed Direction / Planned | This is a qualification of the more definitive 2025-08-15 wording. |
| 2025-08-29 to 2025-09-05 | GUI extension produces relation scenarios; unexpected all-child rendering appears; team chooses to reproduce current behavior before Core patches (`MeetingMinutes/Weekly/2025/08/2025-08-29.md:35-73`; `MeetingMinutes/Weekly/2025/09/2025-09-05.md:30-40`). | In Progress | Characterization-first approach remains the immediate foundation. |
| 2025-09-19 to 2025-09-26 | Core `-1` work is top priority. Strategy explicitly changes from complete upfront architecture to small steps under a blurry vision; migration and deprecation are preferred (`MeetingMinutes/Weekly/2025/09/2025-09-19.md:100-113`; `MeetingMinutes/Weekly/2025/09/2025-09-26.md:21-25`; `MeetingMinutes/Weekly/2025/09/2025-09-26.md:46-50`). | Preferred Direction / In Progress | Best description of the delivery method: iterative and dual-track. |
| 2025-09-26 | Full structure per language with shadows is presented as the future unified model (`MeetingMinutes/Weekly/2025/09/2025-09-26.md:58-66`). | Discussed Direction | The wording is strong, but later 2025-10-24 evidence shifts preference to the neutral structural layer; treat shadows as an alternative, not current consensus. |
| 2025-10-24 | Shared language-independent structure layer is favored because shadows duplicate data, complicate synchronization, and worsen Workspaces; the layer generalizes existing default-language structure (`MeetingMinutes/Weekly/2025/10/2025-10-24.md:45-78`). | Preferred Direction | Youngest architectural preference in this period, still worded “likely,” not decided. |
| 2025-11 | Relation rules are refined, the boolean can later become a sync group, the initial field is narrowed to default records, toggles require cleanup/provenance, and a Core-area mapping patch is planned (`MeetingMinutes/Weekly/2025/11/2025-11-14.md:34-63`; `MeetingMinutes/Weekly/2025/11/2025-11-14.md:100-106`; `MeetingMinutes/Weekly/2025/11/2025-11-28.md:32-57`). | Planned / In Progress / Open Question | Most concrete implementation framing at period end. |

## Contradictions, tensions, and qualifications that must survive synthesis

### Complete language layers versus neutral structure layer

- July explicitly says both distributed complete structure and a centralized structure layer need exploration; no commitment was reached. Evidence: `MeetingMinutes/Weekly/2025/07/2025-07-18.md:49-73`. **Status: Open Question.**
- September 26 describes full per-language structure plus shadow records as the proposed future model. Evidence: `MeetingMinutes/Weekly/2025/09/2025-09-26.md:58-66`. **Status: Discussed Direction.**
- October 24 gives the later contrary preference: shadows imply “massive” duplication, synchronization complexity, and Workspace overhead; a shared neutral structure layer appears more efficient, intuitive, migration-friendly, and likely foundational. Evidence: `MeetingMinutes/Weekly/2025/10/2025-10-24.md:45-78`. **Status: Preferred Direction.**
- **Current source-backed conclusion:** the models are alternatives with a later preference for the neutral layer. The broad hypothesis “more records for less Core code” is presentation-worthy as an architectural trade-off, but this subset does not support calling the more-records option preferred.

### Fixed sequential roadmap versus iterative discovery

- July 11 gives a clear order: remove `-1`, decouple `0`, then BCP 47. Evidence: `MeetingMinutes/Weekly/2025/07/2025-07-11.md:54-61`. **Status: Discussed Direction.**
- August establishes parallel implementation and concept work. Evidence: `MeetingMinutes/Weekly/2025/08/2025-08-15.md:21-29`; `MeetingMinutes/Weekly/2025/08/2025-08-15.md:55-66`; `MeetingMinutes/Weekly/2025/08/2025-08-22.md:20-28`. **Status: Preferred Direction.**
- September explicitly rejects waiting for a complete solution and adopts small steps guided by a blurry vision. Evidence: `MeetingMinutes/Weekly/2025/09/2025-09-26.md:21-25`. **Status: Preferred Direction.**
- **Current source-backed conclusion:** preserve the dependency intuition of the July sequence, but present the actual working model as iterative, partially parallel, and subject to discovery.

### Scope of enforced synchronization

- July ties enforced synchronization to structural fields such as `sorting` and `colPos`. Evidence: `MeetingMinutes/Weekly/2025/07/2025-07-11.md:42-48`; `MeetingMinutes/Weekly/2025/07/2025-07-18.md:43-47`. **Status: Idea.**
- August 15 says the all-language behavior applies only to translatable fields, excludes `sorting`/`colPos` generally, but includes positioning and structure in Connected mode; Free mode retains independent structure. It also says related/subordinate data can be forced identical. Evidence: `MeetingMinutes/Weekly/2025/08/2025-08-15.md:31-53`. **Status: Discussed Direction.**
- August 22 says system versus translation fields are context-dependent and must be analyzed. Evidence: `MeetingMinutes/Weekly/2025/08/2025-08-22.md:30-41`. **Status: Open Question.**
- **Current source-backed conclusion:** do not state one settled field list. The distinction between content synchronization and structural synchronization remains context-dependent.

### Replacement of existing TCA mechanisms

- August 15 says `Enforce Language Synchronization` “will replace” `l10n_mode=exclude` and `allowLanguageSynchronization`. Evidence: `MeetingMinutes/Weekly/2025/08/2025-08-15.md:41-45`. **Status: Planned.** This reflects that document's strong phrasing, which the later source qualifies.
- August 22 softens this to evaluating whether a new mechanism *could* replace `l10n_mode=exclude`, with all three modes to be analyzed. Evidence: `MeetingMinutes/Weekly/2025/08/2025-08-22.md:30-39`. **Status: Open Question / Discussed Direction.**
- **Current source-backed conclusion:** replacement is not settled in this period; present it as evaluation, not committed Core API.

### “Irreversible” toggle versus recoverable cleanup

- August 15 proposes warning editors because toggling has irreversible effects. Evidence: `MeetingMinutes/Weekly/2025/08/2025-08-15.md:41-45`. **Status: Planned.**
- August 22 says warnings should appear only when data loss would actually occur, implying state inspection before the change. Evidence: `MeetingMinutes/Weekly/2025/08/2025-08-22.md:36-41`. **Status: Discussed Direction.**
- November 28 prefers soft deletion and controlled restoration and explicitly guards against exponential record creation. Evidence: `MeetingMinutes/Weekly/2025/11/2025-11-28.md:53-57`. **Status: Preferred Direction / Open Question.**
- **Current source-backed conclusion:** safety moved toward recoverability, but activation/deactivation semantics remain unimplemented and unresolved.

### Parent/child `-1` rules

- August 22 proposes that a `-1` child synchronize only where its parent exists and that a `-1` parent synchronize children automatically across all languages. Evidence: `MeetingMinutes/Weekly/2025/08/2025-08-22.md:43-60`. **Status: Idea / Planned.** The planned artifact is a test rule.
- November treats `Parent -1 / Child specific` and `Parent specific / Child -1` as valid current configurations, but forbids two differing specific languages; changing a specific parent should propagate to specific children, while a `-1` child remains `-1`. Evidence: `MeetingMinutes/Weekly/2025/11/2025-11-14.md:21-63`; `MeetingMinutes/Weekly/2025/11/2025-11-21.md:21-51`. **Status: Discussed Direction / Planned.** The planned artifact is characterization coverage.
- **Current source-backed conclusion:** later rules refine the earlier generalization. They describe desired integrity around the existing `-1` model, not necessarily the final behavior of the replacement flag.

### File-level documentation contradiction

- `MeetingMinutes/Weekly/2025/11/2025-11-07.md:21-25` says v12 is no longer supported and the extension works in v13/v14-dev, then says dependency updates for v12 have already started. **Evidence quality: internally contradictory. Priority: Too Detailed.** Do not rely on this passage for a precise compatibility claim.

## Thematic evidence matrix

### Current Core behavior and concrete problems

| Status | Evidence | Source | Priority |
| --- | --- | --- | --- |
| Current Core Behavior | Fallback types `fallback`, `strict`, and `free` exist; fallback chains create gaps and require output logic. | `MeetingMinutes/Weekly/2025/07/2025-07-11.md:34-40` | Useful |
| Current Core Behavior | Default language has a structural role, especially for sorting and visibility. | `MeetingMinutes/Weekly/2025/07/2025-07-11.md:42-45` | Essential |
| Problem | Overlay, default-language behavior, and numerical IDs are named as already documented current problems. | `MeetingMinutes/Weekly/2025/07/2025-07-18.md:32-42` | Essential |
| Current Core Behavior | Same numeric `sys_language_uid` can denote different languages in different site contexts. | `MeetingMinutes/Weekly/2025/07/2025-07-25.md:22-32` | Essential |
| Problem | Changing default language or extracting a language to a new tree/instance requires hacks; cross-site sharing with different defaults needs mapping workarounds; multilingual global records require custom solutions. | `MeetingMinutes/Weekly/2025/07/2025-07-25.md:57-65` | Essential |
| Current Core Behavior | `-1` supplies strict identity/shared output across languages but conflicts with unique system-wide language identity. | `MeetingMinutes/Weekly/2025/08/2025-08-01.md:41-56` | Essential |
| Current Core Behavior / Problem | Tested IRRE children rendered in all page languages regardless of child language; intended-versus-bug status was initially unknown. | `MeetingMinutes/Weekly/2025/08/2025-08-29.md:35-63` | Useful |
| Open Question | Participants disagree whether mixed `-1` parent/child configurations are invalid and should be prevented or can be a legitimate editorial convenience. | `MeetingMinutes/Weekly/2025/09/2025-09-05.md:30-40` | Useful |
| Problem | Connected mode can be changed into Mixed mode unintentionally through drag-and-drop; child records do not inherit parent language changes. | `MeetingMinutes/Weekly/2025/09/2025-09-19.md:69-82` | Useful |
| Current Core Behavior | Core translation metadata includes `languageField`, `transOrigPointerField`, `translationSource`, and `transOrigDiffSourceField`; documentation/Core status of `origUid` appeared inconsistent. | `MeetingMinutes/Weekly/2025/10/2025-10-24.md:21-35` | Useful |
| Current Core Behavior | In Connected mode every record has a `transOrigPointerField`; in Free mode this relation may be absent. | `MeetingMinutes/Weekly/2025/10/2025-10-24.md:37-43` | Essential |
| Problem | Current system can retain translations whose `l10n_parent` points to a record changed to `-1`, leaving invalid/orphaned records and inconsistent Page/Layout language comparison. | `MeetingMinutes/Weekly/2025/11/2025-11-28.md:59-70` | Essential |

### BCP 47, stable language identity, and migration

| Status | Evidence | Source | Priority |
| --- | --- | --- | --- |
| Preferred Direction | Concept goals include standardized, language-neutral architecture, BCP 47, removal of `-1` and `0`, and equal independent languages. | `MeetingMinutes/Weekly/2025/07/2025-07-04.md:39-46` | Essential |
| Preferred Direction | Flat/equal language model is favored over a hierarchy/tree. | `MeetingMinutes/Weekly/2025/07/2025-07-04.md:56-62` | Useful |
| Discussed Direction | Human-readable identifiers such as BCP 47 were the third step in the early proposed sequence after `-1` and decoupling `0`. | `MeetingMinutes/Weekly/2025/07/2025-07-11.md:54-65` | Essential |
| Preferred Direction | Numeric identifiers should be replaced by standardized identifiers such as BCP 47. | `MeetingMinutes/Weekly/2025/07/2025-07-18.md:32-47` | Essential |
| Preferred Direction | Descriptive BCP 47 tags should give clearer system-wide identity; derive them from Site Configuration `locale`; support private-use tags for nonstandard cases. | `MeetingMinutes/Weekly/2025/07/2025-07-25.md:22-34` | Essential |
| Open Question | Ambiguous migration mappings may require integrator intervention; UUIDs were mentioned but BCP 47 was preferred for cross-CMS compatibility. | `MeetingMinutes/Weekly/2025/07/2025-07-25.md:30-34` | Useful |
| Planned / Open Question | Migration must work from editable configuration/YAML, allow manual assignment for special cases, and preserve import/export compatibility between TYPO3 instances. | `MeetingMinutes/Weekly/2025/07/2025-07-25.md:51-55` | Essential |
| Preferred Direction | Long-term removal of `-1` and `0` in favor of BCP 47 is reaffirmed; short-term work remains on `-1`. | `MeetingMinutes/Weekly/2025/08/2025-08-22.md:62-72` | Essential |
| Preferred Direction | BCP 47 could support consistent references across root sites and language-specific file assets. | `MeetingMinutes/Weekly/2025/09/2025-09-26.md:27-31` | Essential |
| Problem | A customer migration from language-specific trees to real translations exposed nested navigation/language-parameter issues and motivated identity by intrinsic language rather than database ID. | `MeetingMinutes/Weekly/2025/10/2025-10-31.md:35-42` | Useful |

**Evidence limit:** These files do not establish whether BCP 47 replaces every internal numeric foreign key, becomes a parallel authoritative identity, or is stored at record versus site-language level. July 25 actually grounds the proposed identifier in Site Configuration locale values. Any stronger separation of “record language identity” and “site language mapping” requires other sources or must be **Analytically Derived Recommendation**.

### Replacing `sys_language_uid = -1`

| Status | Evidence | Source | Priority |
| --- | --- | --- | --- |
| Discussed Direction | Close gaps by transforming `-1` records into synchronized language-specific records, potentially through background synchronization. | `MeetingMinutes/Weekly/2025/07/2025-07-11.md:34-40` | Essential |
| Preferred Direction | Removal of `-1` is the recommended first concrete scope before broader architecture. | `MeetingMinutes/Weekly/2025/07/2025-07-11.md:50-61` | Essential |
| Preferred Direction | Enforced record flag: boolean marks all-language behavior, synchronization is non-optional, DataHandler-era work can proceed in parallel with concept. | `MeetingMinutes/Weekly/2025/08/2025-08-15.md:21-45` | Essential |
| Discussed Direction | Start synchronization at field level and extend to record level; analyze replacement of existing `l10n_mode` variants; system/translation fields depend on context. | `MeetingMinutes/Weekly/2025/08/2025-08-22.md:30-41` | Essential |
| Open Question | Nested parent/child, inline, and M:N relationships across `-1`, `0`, and specific languages need explicit rules and tests. | `MeetingMinutes/Weekly/2025/08/2025-08-22.md:43-60` | Essential |
| In Progress | Initiative test extension covers parent/child combinations for `0`, `-1`, and `1` and frontend/backend observation. | `MeetingMinutes/Weekly/2025/08/2025-08-29.md:21-27`; `MeetingMinutes/Weekly/2025/08/2025-08-29.md:35-73` | Essential |
| Planned | Build internal extension characterization cases first, then convert them into Core tests and patches. | `MeetingMinutes/Weekly/2025/09/2025-09-05.md:36-40`; `MeetingMinutes/Weekly/2025/09/2025-09-05.md:70-82` | Essential |
| Preferred Direction | Boolean causes DataHandler duplication into every language layer; document phrases this strongly but no implementation is shown. | `MeetingMinutes/Weekly/2025/09/2025-09-26.md:33-43` | Essential |
| Preferred Direction | Prefer migration over piecemeal bug fixes; respect deprecation/release policy, with tentative v15/v16 timing. | `MeetingMinutes/Weekly/2025/09/2025-09-26.md:46-50` | Useful |
| Planned | Build simple `-1` content first, then child relations, then Core test cases; extension is a GUI base rather than duplicate Core suite. | `MeetingMinutes/Weekly/2025/10/2025-10-17.md:24-34`; `MeetingMinutes/Weekly/2025/10/2025-10-17.md:48-55` | Essential |
| Planned | Initial `isLanguageAllRecord` boolean can later evolve into selectable language synchronization groups. | `MeetingMinutes/Weekly/2025/11/2025-11-14.md:100-106`; `MeetingMinutes/Weekly/2025/11/2025-11-21.md:73-77` | Essential |
| Planned | Tentative new `language_sync` / TCA `ctrl.languageSyncField`; first version boolean on default-language records, later potentially multi-select targets. | `MeetingMinutes/Weekly/2025/11/2025-11-28.md:47-52` | Essential |
| Open Question | Toggle cleanup: decide lifecycle of orphaned/synchronized records; soft deletion and controlled restoration preferred; prevent duplicate explosion. | `MeetingMinutes/Weekly/2025/11/2025-11-28.md:53-57` | Essential |

### Synchronization field semantics

| Status | Evidence | Source | Priority |
| --- | --- | --- | --- |
| Idea | New TCA behavior `enforceLanguageSynchronization` could enforce `sorting` and structure consistency. | `MeetingMinutes/Weekly/2025/07/2025-07-11.md:42-48` | Useful |
| Idea | Goal list explicitly names synchronizing `sorting`/`colPos` as an alternative to Connected mode, while Free mode can lack parent relations. | `MeetingMinutes/Weekly/2025/07/2025-07-18.md:36-47` | Essential |
| Discussed Direction | For the proposed all-language flag, translatable fields sync, system fields such as `sorting`/`colPos` do not by default; Connected mode adds structure, Free mode remains structurally independent. | `MeetingMinutes/Weekly/2025/08/2025-08-15.md:31-40` | Essential |
| Discussed Direction | In Free mode, editors may change structure, but forced synchronization still covers all content within a synchronized data set, including relational structure; a complete field inventory is needed. | `MeetingMinutes/Weekly/2025/08/2025-08-15.md:47-53` | Useful |
| Open Question | Whether `Enforced-Language-Synchronization` replaces `l10n_mode=exclude`, and how all three existing `l10n_mode` values map, requires analysis. | `MeetingMinutes/Weekly/2025/08/2025-08-22.md:30-39` | Essential |
| Current Core Behavior / Open Question | Combinatorics of `allowLanguageSynchronization`, `l10n_mode`, and related TCA settings are large; `allowLanguageSynchronization` on inline elements in Connected mode needs validation. | `MeetingMinutes/Weekly/2025/09/2025-09-05.md:60-68` | Useful |
| Discussed Direction | Under neutral structure model, `transOrigPointerField` denotes structure identity and `translationSource` denotes content origin. | `MeetingMinutes/Weekly/2025/10/2025-10-24.md:58-66` | Essential |
| Preferred Direction | Data-level correctness should precede UI refinement; child language selector may become disabled/hidden when relation determines it. | `MeetingMinutes/Weekly/2025/11/2025-11-28.md:38-45` | Useful |

### Removing the special structural role of `0`; record identity

| Status | Evidence | Source | Priority |
| --- | --- | --- | --- |
| Idea | Decouple default-language semantics from the numeric UID and introduce an `isDefaultLanguage()` abstraction. | `MeetingMinutes/Weekly/2025/07/2025-07-11.md:42-45`; `MeetingMinutes/Weekly/2025/07/2025-07-11.md:54-61` | Essential |
| Discussed Direction | Two models: retain default language only as invisible/contentless structure; or replicate structural information in all languages using shadows. | `MeetingMinutes/Weekly/2025/07/2025-07-18.md:49-59` | Essential |
| Idea | Eliminate the default language entirely; create invisible placeholders in other languages when content is created in any language. | `MeetingMinutes/Weekly/2025/07/2025-07-18.md:61-65` | Essential |
| Open Question | Redundant structures give complete layers but cost storage/performance; central structure reduces redundancy but requires mapping. | `MeetingMinutes/Weekly/2025/07/2025-07-18.md:67-73` | Essential |
| Discussed Direction | Every element needs a structural reference/placeholder even when not visible; both distributed and central models require complete structural information. | `MeetingMinutes/Weekly/2025/07/2025-07-18.md:75-83` | Essential |
| Open Question | July 25 again leaves default structure-only layer versus shadow duplication undecided. | `MeetingMinutes/Weekly/2025/07/2025-07-25.md:36-49` | Essential |
| Discussed Direction | September future model is full structure per language, automatic shadows, no default-language dependence. | `MeetingMinutes/Weekly/2025/09/2025-09-26.md:58-66` | Essential |
| Preferred Direction | October comparison favors a shared language-independent structure layer over shadows. | `MeetingMinutes/Weekly/2025/10/2025-10-24.md:45-78` | Essential |
| Discussed Direction | If internal links always exist via shadows or structure layer, `origUid` becomes unnecessary. | `MeetingMinutes/Weekly/2025/10/2025-10-24.md:27-43` | Useful |

### Database/model complexity versus runtime/Core complexity

| Status | Evidence | Source | Priority |
| --- | --- | --- | --- |
| Open Question | Full redundancy ensures complete structure but can be inefficient at scale; central structure reduces redundancy and needs careful mapping. | `MeetingMinutes/Weekly/2025/07/2025-07-18.md:61-73` | Essential |
| Problem | Shadow records imply massive data duplication and complex synchronization. | `MeetingMinutes/Weekly/2025/10/2025-10-24.md:45-56` | Essential |
| Preferred Direction | Neutral structure needs fewer records and enables easier conversion of parent links into structural references. | `MeetingMinutes/Weekly/2025/10/2025-10-24.md:68-72` | Essential |
| Problem | Shadow overhead compounds with Workspaces; structural layer aligns with existing Core behavior. | `MeetingMinutes/Weekly/2025/10/2025-10-24.md:74-78` | Essential |

**Important qualification for the T3DD26 thesis:** these minutes support asking “where should complexity live?” They do not demonstrate that complete layers actually remove more Core complexity, quantify record growth, or analyze query/index/reference/versioning costs beyond general duplication and a Workspace warning. The latest preference points to a neutral structural layer as a way to gain explicit identity without maximal record duplication.

### Free, Connected, Mixed; translation versus localization; editorial UX

| Status | Evidence | Source | Priority |
| --- | --- | --- | --- |
| Idea | All records always connected; remove Free/Connected distinction; participants agree in principle but retain need for language-specific structural flexibility. | `MeetingMinutes/Weekly/2025/07/2025-07-11.md:46-48` | Essential |
| Discussed Direction | Resolve modes by enforced structural synchronization or a structure layer/shadows; regional/legal visibility differences must remain possible. | `MeetingMinutes/Weekly/2025/07/2025-07-18.md:43-59` | Essential |
| Problem | Connected-mode drag/drop can produce Mixed mode unintentionally. | `MeetingMinutes/Weekly/2025/09/2025-09-19.md:69-82`; `MeetingMinutes/Weekly/2025/09/2025-09-26.md:52-56` | Useful |
| Planned | Disable cross-language drag/drop in Connected mode and file a Core issue; optional repair/switch UI only in Mixed mode. | `MeetingMinutes/Weekly/2025/09/2025-09-19.md:78-92` | Useful |
| Preferred Direction | Long term, eliminate need for Free/Connected/Mixed modes; deprioritize repair wizard versus `-1` Core patches. | `MeetingMinutes/Weekly/2025/09/2025-09-19.md:84-105`; `MeetingMinutes/Weekly/2025/09/2025-09-26.md:58-66` | Essential |
| Discussed Direction | Editors could retain a “free” experience while Core keeps technical relationships. | `MeetingMinutes/Weekly/2025/10/2025-10-24.md:37-43` | Essential |
| Problem | Server-side curated localization remains important for SEO, search indexing, ownership, and regional context despite browser/AI translation. | `MeetingMinutes/Weekly/2025/10/2025-10-31.md:54-60` | Useful |
| Idea | Future output might expand from language to broader dimensions such as country or sales region; editorial cognitive cost is acknowledged. | `MeetingMinutes/Weekly/2025/10/2025-10-31.md:54-60`; `MeetingMinutes/Weekly/2025/11/2025-11-14.md:77-83` | Optional |

**Evidence limit:** no document in this subset explicitly uses or defines **Editing Language**. There is also no explicit settled deprecation plan for Free mode. The supported claim is that the technical distinction should disappear or be hidden while internal links persist and editorial flexibility remains.

### Cross-site, global records, files, XLIFF, external translation

| Status | Evidence | Source | Priority |
| --- | --- | --- | --- |
| Problem | Different default languages make cross-site record sharing require custom mappings; translated global-storage records are unreliable without custom work. | `MeetingMinutes/Weekly/2025/07/2025-07-25.md:57-65` | Essential |
| Preferred Direction | BCP 47 offers consistent language references across root sites. | `MeetingMinutes/Weekly/2025/09/2025-09-26.md:27-31` | Essential |
| Idea | BCP 47 could improve handling of language-specific file assets. | `MeetingMinutes/Weekly/2025/09/2025-09-26.md:27-31` | Useful |
| Planned / Open Question | Migration must preserve interoperability for import/export across TYPO3 instances. | `MeetingMinutes/Weekly/2025/07/2025-07-25.md:51-55` | Useful |

**No evidence found in this subset:** XLIFF, file-translation catalog identity, external translation-service mapping, a concrete two-site BCP-47 record resolution algorithm, or an authoritative distinction between Record Language and Site Language.

## Characterization, implementation, and migration status

### Implemented or visibly underway outside Core

- **Implemented:** The initiative test extension was made current-version oriented and gained v14-related work; a `12` branch was created while `main` was updated toward v14. Evidence: `MeetingMinutes/Weekly/2025/08/2025-08-29.md:21-33`. **Priority: Too Detailed.**
- **Implemented:** The extension has a minimal IRRE parent/child scenario that generated observable behavior across language combinations. Evidence: `MeetingMinutes/Weekly/2025/08/2025-08-29.md:35-63`. **Priority: Useful.**
- **Implemented:** CLI commands were split into `translation-handling:create` and `translation-handling:delete`, with DI/service refactoring. Evidence: `MeetingMinutes/Weekly/2025/09/2025-09-19.md:26-34`. **Priority: Too Detailed.**
- **In Progress:** Random generation was being replaced by fixed deterministic translation states and modular scenario code. Evidence: `MeetingMinutes/Weekly/2025/09/2025-09-19.md:47-67`. **Priority: Useful.**
- **Implemented / In Progress:** A new IRRE content element was created in PR #7 to isolate Core translation/data-relation scenarios without Content Blocks. Evidence: `MeetingMinutes/Weekly/2025/11/2025-11-07.md:41-45`. **Priority: Useful.**

### Planned Core-facing work

- **Planned:** Internal extension scenarios become reproducible Core tests, beginning with simple IRRE and expanding incrementally. Evidence: `MeetingMinutes/Weekly/2025/09/2025-09-05.md:36-40`; `MeetingMinutes/Weekly/2025/09/2025-09-05.md:66-82`. **Priority: Essential.**
- **Planned:** Build basic `-1` records, then child relations, then Core test cases; prioritize Core work over a broad extension refactor. Evidence: `MeetingMinutes/Weekly/2025/10/2025-10-17.md:24-34`; `MeetingMinutes/Weekly/2025/10/2025-10-17.md:48-57`. **Priority: Essential.**
- **Planned:** WIP Core patch maps all impacted locations with `TODO: Language All Clean-Up`, naming TCA, `PageRepository`, `LanguageAspect`, Extbase, and backend user rights. Evidence: `MeetingMinutes/Weekly/2025/11/2025-11-28.md:32-36`. **Priority: Essential.**
- **Planned / In Progress:** Forge Task #108358 was drafted and André offered implementation of warnings for translations orphaned when their parent becomes `-1`; affected UI includes Page module and record editing. Evidence: `MeetingMinutes/Weekly/2025/11/2025-11-28.md:59-76`. **Priority: Useful.** The minutes do not prove the Core fix merged.

### Plausible source-backed phase model

1. **Understand and enumerate current behavior — In Progress.** Map `-1`-sensitive Core areas and model relation/TCA combinations. Sources: `MeetingMinutes/Weekly/2025/09/2025-09-05.md:60-68`; `MeetingMinutes/Weekly/2025/11/2025-11-28.md:32-36`.
2. **Create deterministic GUI scenarios — Implemented / In Progress.** Use the initiative extension for visual inspection and reproducibility. Sources: `MeetingMinutes/Weekly/2025/08/2025-08-29.md:21-79`; `MeetingMinutes/Weekly/2025/09/2025-09-19.md:47-67`; `MeetingMinutes/Weekly/2025/11/2025-11-07.md:41-45`.
3. **Convert high-value scenarios into characterization/Core tests — Planned.** Start with basic records, then child relations, expand by evidence rather than exhaustive combinatorics. Sources: `MeetingMinutes/Weekly/2025/09/2025-09-05.md:36-40`; `MeetingMinutes/Weekly/2025/09/2025-09-05.md:60-82`; `MeetingMinutes/Weekly/2025/10/2025-10-17.md:28-34`.
4. **Fix integrity bugs that threaten migration visibility — Planned / In Progress.** Warn about invalid/orphaned relations rather than silently corrupt/delete; keep editor-visible recovery paths. Sources: `MeetingMinutes/Weekly/2025/11/2025-11-14.md:85-98`; `MeetingMinutes/Weekly/2025/11/2025-11-28.md:59-76`.
5. **Define replacement field and lifecycle — Planned / Open Question.** Boolean on default record, DataHandler propagation, provenance, activation/deactivation, soft deletion/restoration, duplicate prevention, later language groups. Sources: `MeetingMinutes/Weekly/2025/08/2025-08-15.md:31-53`; `MeetingMinutes/Weekly/2025/11/2025-11-28.md:47-57`.
6. **Migrate `-1` records with compatibility/deprecation — Preferred Direction.** Use migration rather than abrupt fixes, respect Core release policy, preserve behavior through tests. Sources: `MeetingMinutes/Weekly/2025/08/2025-08-15.md:41-45`; `MeetingMinutes/Weekly/2025/09/2025-09-26.md:46-50`.
7. **Resolve structural identity before removing special `0` semantics — Open Question.** Neutral structural layer is the newest preference; shadows remain an alternative. Sources: `MeetingMinutes/Weekly/2025/07/2025-07-18.md:49-83`; `MeetingMinutes/Weekly/2025/10/2025-10-24.md:45-78`.
8. **Introduce stable BCP-47 identity and mapping — Preferred Direction / Open Question.** Handle site configuration, ambiguous mappings, cross-site/global use, import/export. Sources: `MeetingMinutes/Weekly/2025/07/2025-07-25.md:22-55`; `MeetingMinutes/Weekly/2025/09/2025-09-26.md:27-31`.
9. **Simplify/hide editor modes after internal identity is reliable — Discussed Direction.** Preserve editorial freedom while Core manages technical connections. Sources: `MeetingMinutes/Weekly/2025/09/2025-09-19.md:69-92`; `MeetingMinutes/Weekly/2025/10/2025-10-24.md:37-43`.

### Analytically derived recommendations from dependencies

- **Analytically Derived Recommendation:** Separate characterization tests for *current valid behavior*, regression tests for *known inconsistent behavior*, and acceptance tests for *replacement behavior*. Otherwise tests that document bugs can accidentally freeze them. Basis: uncertainty in `MeetingMinutes/Weekly/2025/08/2025-08-29.md:46-63`, disagreement in `MeetingMinutes/Weekly/2025/09/2025-09-05.md:30-40`, and later bug/rule classification in `MeetingMinutes/Weekly/2025/11/2025-11-14.md:21-63`.
- **Analytically Derived Recommendation:** Define explicit provenance/state for generated language records before implementing the toggle. The source set asks how to clean up and restore records but provides no durable distinction between generated synchronized copies and independent editor content. Basis: `MeetingMinutes/Weekly/2025/08/2025-08-22.md:36-41`; `MeetingMinutes/Weekly/2025/11/2025-11-28.md:53-57`.
- **Analytically Derived Recommendation:** Prototype neutral structural identities and shadow-complete layers against the same workloads, including Workspaces, Reference Index, versioning, query count, and editor visibility. The minutes prefer the neutral layer but do not quantify either option. Basis: `MeetingMinutes/Weekly/2025/07/2025-07-18.md:61-73`; `MeetingMinutes/Weekly/2025/10/2025-10-24.md:45-78`.
- **Analytically Derived Recommendation:** Introduce a language-identity abstraction before changing storage keys, so Site Language mapping, record identity, BCP-47 canonicalization, and legacy numeric IDs can coexist during migration. Basis: the early `isDefaultLanguage()` abstraction (`MeetingMinutes/Weekly/2025/07/2025-07-11.md:54-61`), migration ambiguity (`MeetingMinutes/Weekly/2025/07/2025-07-25.md:30-55`), and iterative/deprecation strategy (`MeetingMinutes/Weekly/2025/09/2025-09-26.md:21-25`; `MeetingMinutes/Weekly/2025/09/2025-09-26.md:46-50`).
- **Analytically Derived Recommendation:** Treat the proposed default-record-only boolean as an initial compatibility adapter, not the final cross-site identity model. Basis: the narrow newest scope (`MeetingMinutes/Weekly/2025/11/2025-11-28.md:47-52`) versus the broader equal-language/BCP-47 goals (`MeetingMinutes/Weekly/2025/07/2025-07-04.md:39-46`).
- **Analytically Derived Recommendation:** Keep “Editing Language” out of the evidence-backed 2025 H2 state, or clearly label it as sourced elsewhere. No reviewed file in this period contains the term or an equivalent defined mechanism.

## Presentation-ready arguments and use cases

### Essential

1. **Two sites, same numeric ID, different actual languages.** July 25 directly states that numeric IDs are context-dependent and links this to cross-site/global-storage pain. Visual: two Site Configurations mapping IDs differently, then a shared BCP-47 label. Sources: `MeetingMinutes/Weekly/2025/07/2025-07-25.md:22-34`; `MeetingMinutes/Weekly/2025/07/2025-07-25.md:57-65`. Status: **Current Core Behavior / Problem / Preferred Direction**.
2. **All-language content from magic value to explicit behavior.** Contrast `sys_language_uid=-1` with a boolean plus DataHandler-created concrete language records; leave toggle/provenance questions visible. Sources: `MeetingMinutes/Weekly/2025/08/2025-08-15.md:31-53`; `MeetingMinutes/Weekly/2025/09/2025-09-26.md:33-43`; `MeetingMinutes/Weekly/2025/11/2025-11-28.md:47-57`. Status: **Current Core Behavior / Discussed Direction / Open Question**.
3. **One structure, many content variants.** Use Anja's formulation, “You have one structure and many times content,” then compare shadows with a neutral identity node. Source: `MeetingMinutes/Weekly/2025/07/2025-07-25.md:36-49`. Status: **Idea / Open Question**.
4. **Architecture turn: complete layers versus neutral structure.** Show July alternatives, September shadow enthusiasm, October neutral-layer preference. Sources: `MeetingMinutes/Weekly/2025/07/2025-07-18.md:49-73`; `MeetingMinutes/Weekly/2025/09/2025-09-26.md:58-66`; `MeetingMinutes/Weekly/2025/10/2025-10-24.md:45-78`. Status: **Discussed Direction / Preferred Direction / Open Question**.
5. **Where we actually are: test before change.** Show extension scenario → deterministic reproduction → Core test → migration/change → proof. Sources: `MeetingMinutes/Weekly/2025/09/2025-09-05.md:36-40`; `MeetingMinutes/Weekly/2025/09/2025-09-05.md:70-82`; `MeetingMinutes/Weekly/2025/10/2025-10-17.md:28-34`; `MeetingMinutes/Weekly/2025/11/2025-11-28.md:32-36`. Status: **In Progress / Planned**.

### Useful

6. **IRRE parent/child mismatch.** A compact matrix of valid and invalid language combinations plus the surprising “all children render” observation makes implicit states tangible. Sources: `MeetingMinutes/Weekly/2025/08/2025-08-29.md:35-63`; `MeetingMinutes/Weekly/2025/11/2025-11-14.md:21-63`. Status: **Current Core Behavior / Problem / Planned**.
7. **Technical freedom behind simple UX.** Editor sees a free workflow while TYPO3 keeps a structural identity. Sources: `MeetingMinutes/Weekly/2025/09/2025-09-19.md:69-92`; `MeetingMinutes/Weekly/2025/10/2025-10-24.md:37-43`. Status: **Discussed Direction**.
8. **Real migration story.** Customer moved from per-language trees to translations for DeepL and hit language-ID propagation in nested navigation; reinforces stable identity. Source: `MeetingMinutes/Weekly/2025/10/2025-10-31.md:35-42`. Status: **Problem**.

### Optional / backup

- `origUid` versus `transOrigPointerField` versus `translationSource` details: `MeetingMinutes/Weekly/2025/10/2025-10-24.md:21-43`; `MeetingMinutes/Weekly/2025/10/2025-10-24.md:58-66`.
- Parent/child deletion and Recycler all-or-nothing restore: `MeetingMinutes/Weekly/2025/11/2025-11-14.md:65-75`; `MeetingMinutes/Weekly/2025/11/2025-11-21.md:53-57`.
- Future generalization from language to multiple dimensions: `MeetingMinutes/Weekly/2025/10/2025-10-31.md:54-60`; `MeetingMinutes/Weekly/2025/11/2025-11-14.md:77-83`.
- Core areas named for `-1` inventory: TCA, `PageRepository`, `LanguageAspect`, Extbase, backend rights: `MeetingMinutes/Weekly/2025/11/2025-11-28.md:32-36`.

## Open questions explicitly supported or left unanswered

### All-language synchronization

- What exact fields synchronize in Free versus Connected contexts? `MeetingMinutes/Weekly/2025/08/2025-08-15.md:31-53`; `MeetingMinutes/Weekly/2025/08/2025-08-22.md:30-41`. **Open Question.**
- Does the new behavior replace `l10n_mode=exclude` and `allowLanguageSynchronization`, coexist during transition, or map them into a new API? `MeetingMinutes/Weekly/2025/08/2025-08-15.md:41-45`; `MeetingMinutes/Weekly/2025/08/2025-08-22.md:30-39`. **Open Question.**
- What happens to existing translations when synchronization turns on? Only loss warnings and current `0→-1` orphan behavior are documented; no final conversion rule. `MeetingMinutes/Weekly/2025/08/2025-08-22.md:36-41`; `MeetingMinutes/Weekly/2025/11/2025-11-28.md:59-70`. **Open Question.**
- What happens when synchronization turns off? Soft deletion/reactivation is preferred but lifecycle is not decided. `MeetingMinutes/Weekly/2025/11/2025-11-28.md:53-57`. **Open Question.**
- How are auto-generated records distinguished from independent translations? Not answered in this source set. **Open Question.**
- How are newly added Site Languages propagated later? The model says “all language layers,” but no event/timing/error behavior is specified. `MeetingMinutes/Weekly/2025/09/2025-09-26.md:33-38`. **Open Question.**

### Identity and structure

- Is the identity object a contentless record, relation, or abstraction? October describes a contentless structural layer but no final schema. `MeetingMinutes/Weekly/2025/10/2025-10-24.md:53-66`. **Open Question.**
- Can any localized record become a translation source while all variants share one structural identity? `translationSource` is separated from structure, but lifecycle/graph rules are not defined. `MeetingMinutes/Weekly/2025/10/2025-10-24.md:58-66`. **Open Question.**
- Are shadows and neutral identity combinable? The minutes compare them as alternatives and do not define a hybrid. **Open Question.**
- How do Workspace, versioning, Reference Index, overlays, and queries change? Only general Workspace overhead and migration claims are recorded. `MeetingMinutes/Weekly/2025/10/2025-10-24.md:68-78`. **Open Question.**

### BCP 47

- Where is authoritative identity stored: Site Configuration, record, shared language registry, or mapping layer? Not decided; July proposes deriving from Site Configuration locale. `MeetingMinutes/Weekly/2025/07/2025-07-25.md:22-34`. **Open Question.**
- What role remains for numeric IDs as database references? Not answered. **Open Question.**
- How are canonicalization, equivalent tags, scripts, regions, and private-use mappings handled? Only private-use availability is mentioned. `MeetingMinutes/Weekly/2025/07/2025-07-25.md:32-34`. **Open Question.**
- How is migration made deterministic when Site Configurations are absent or ambiguous? Manual integrator assignment is suggested, not designed. `MeetingMinutes/Weekly/2025/07/2025-07-25.md:30-55`. **Open Question.**

### UX / localization

- Must editors continue seeing Translate versus Free, or can the system infer/maintain the relation? The latter is favored conceptually but no UX contract exists. `MeetingMinutes/Weekly/2025/07/2025-07-11.md:46-48`; `MeetingMinutes/Weekly/2025/10/2025-10-24.md:37-43`. **Open Question.**
- What is “Editing Language” and how does it differ from record/site language? No evidence in this subset. **Open Question.**

## Complete per-file review ledger

### `MeetingMinutes/Weekly/2025/07/2025-07-04.md` — declared 2025-07-04

- `:21-27` — Current concept draft may contain fact/structure problems; initiative-owned substance is required. **Problem**, Optional.
- `:35-46` — Agreed concept goals: standardized language-neutral architecture, BCP 47, remove special `-1`/`0`, equal independent languages. **Preferred Direction**, Essential.
- `:48-54` — Existing community feedback and potential broader survey to validate needs. **Idea**, Optional.
- `:56-62` — Flat language model preferred over hierarchy; recommendation language should be firm once supported. **Preferred Direction**, Useful.
- Relevant evidence found; no implementation evidence.

### `MeetingMinutes/Weekly/2025/07/2025-07-11.md` — declared 2025-07-11

- `:34-40` — Fallback and `-1` create gaps; synchronized concrete language layers/background process proposed. **Problem / Idea**, Essential.
- `:42-48` — Default `0` carries sorting/visibility structure; abstraction and enforced structure sync discussed; always-connected model gains in-principle support with flexibility caveat and shadows. **Current Core Behavior / Discussed Direction / Open Question**, Essential.
- `:50-61` — Narrow first scope is `-1`; early ordered roadmap `-1 → 0 → BCP 47`; `isDefaultLanguage()` abstraction proposed. **Preferred Direction / Discussed Direction**, Essential.
- `:63-65` — Documentation should rely on current functionality; future-proof BCP 47 identity reaffirmed. **Preferred Direction**, Useful.
- Relevant evidence found.

### `MeetingMinutes/Weekly/2025/07/2025-07-18.md` — declared 2025-07-18

- `:22-30` — Concept must include open questions and precede validation personas/survey. **Preferred Direction**, Optional.
- `:32-47` — Goals: minimize storage/render complexity; BCP 47; remove `-1`; eliminate overlays via complete database layers; resolve modes with synchronization and parentless Free behavior. **Preferred Direction**, Essential.
- `:49-59` — Competing models: contentless default structure versus full per-language structure with shadows; preserve regional/legal visibility. **Discussed Direction**, Essential.
- `:61-73` — Eliminate privileged default via automatic placeholders; counterargument is scale/performance; no selection made. **Idea / Open Question**, Essential.
- `:75-83` — Every element needs a structural reference; both models require complete structural information; mode interchange depends on it. **Discussed Direction**, Essential.
- Relevant evidence found.

### `MeetingMinutes/Weekly/2025/07/2025-07-25.md` — declared 2025-07-25

- `:22-34` — Numeric IDs differ by site; BCP 47 derived from locale preferred, with private-use and manual ambiguous migration mapping. **Current Core Behavior / Preferred Direction / Open Question**, Essential.
- `:36-49` — “One structure and many times content”; content/structure separation; neutral structure versus shadows undecided. **Problem / Discussed Direction / Open Question**, Essential.
- `:51-55` — Migration should use editable configuration/YAML, allow manual assignment, and retain cross-instance import/export. **Planned / Open Question**, Essential.
- `:57-65` — Default-language lock-in, multisite mapping, and global-storage translation pain. **Problem**, Essential.
- `:67-73` — Modular problem/solution/measure documentation; unified integrated language concept. **Preferred Direction**, Useful.
- Relevant evidence found.

### `MeetingMinutes/Weekly/2025/08/2025-08-01.md` — declared 2025-08-01

- `:22-39` — Strictly separate current state, conflict, goal, and measure; dependencies and order may evolve. **Preferred Direction**, Useful.
- `:41-56` — Unique identity, automatic propagation, and strict cross-language identity are goals; `-1` achieves one but conflicts with another; remove it as proposed measure. **Problem / Preferred Direction**, Essential.
- `:58-72` — Goals/measures have dependencies but document remains living; Epic/Story/Task framing. **Discussed Direction**, Optional.
- Relevant evidence found; primarily methodological, no implementation.

### `MeetingMinutes/Weekly/2025/08/2025-08-15.md` — declared 2025-08-15

- `:21-29` — DataHandler is central; code and concept should proceed in parallel; understood `-1` work can start. **Preferred Direction / Planned**, Essential.
- `:31-45` — Boolean all-language flag, enforced sync, field/structure distinctions, migration, replacement of existing mechanisms, editor warning. **Planned / Discussed Direction**, Essential.
- `:47-53` — Free-mode structural freedom versus forced data-set/relationship identity; system/translatable field inventory needed. **Discussed Direction / Planned**, Useful.
- `:55-66` — Work in smallest justified units without waiting for full concept. **Preferred Direction**, Useful.
- Relevant evidence found.

### `MeetingMinutes/Weekly/2025/08/2025-08-22.md` — declared 2025-08-22

- `:20-28` — Dual track of Core patches and concept work adopted. **Preferred Direction**, Useful.
- `:30-41` — `-1` replacement via synchronization; field then record scope; evaluate TCA replacement; data-loss-aware toggles. **Discussed Direction / Open Question**, Essential.
- `:43-60` — Parent/child, inline, M:N edge cases and proposed rules must become tests. **Idea / Planned**, Essential.
- `:62-72` — Long-term `-1`/`0` to BCP 47; immediate `-1`, nested behavior, safe UX, pre-patches, tests. **Preferred Direction / Planned**, Essential.
- Relevant evidence found.

### `MeetingMinutes/Weekly/2025/08/2025-08-29.md` — declared 2025-08-29

- `:21-33` — Test extension revival/current-version branching. **Implemented / In Progress**, Too Detailed.
- `:35-44` — Concrete IRRE matrix across `0`, `-1`, `1`, translated parents, frontend/backend. **Implemented / In Progress**, Useful.
- `:46-63` — All children rendered regardless of language; expected filtering absent; intended behavior unresolved. **Current Core Behavior / Problem / Open Question**, Essential.
- `:65-79` — Reproducible scenarios and generator extension planned, including deep nesting. **Planned**, Useful.
- Relevant evidence found.

### `MeetingMinutes/Weekly/2025/09/2025-09-05.md` — declared 2025-09-05

- `:24-28` — Testing extension targets trees/fallbacks/`-1` parent-child output and needs v14 adjustment. **In Progress**, Useful.
- `:30-40` — Mixed parent/child result disputed as bug versus valid convenience; reproduce current behavior before Core patch. **Open Question / Preferred Direction**, Essential.
- `:42-58` — Relation types, manageable scenario selection, configurable generator. **Planned**, Useful.
- `:60-68` — TCA permutations and inline `allowLanguageSynchronization` semantics require validation; document behavior before judging it. **Open Question / Planned**, Essential.
- `:70-82` — Extension-first, v14, simple IRRE, incremental expansion, named owners. **Planned / In Progress**, Essential.
- Relevant evidence found.

### `MeetingMinutes/Weekly/2025/09/2025-09-19.md` — declared 2025-09-19

- `:26-34` — Extension CLI/service refactor completed and reviewed. **Implemented**, Too Detailed.
- `:47-67` — Replace random test data with deterministic patterns; modularize scenario code. **Planned / In Progress**, Useful.
- `:69-82` — Mixed-mode drag/drop and child-language propagation problems; UI/core issue suggestions. **Problem / Planned**, Useful.
- `:84-92` — Transfusion repair ideas, but long-term eliminate mode need and deprioritize wizard versus `-1`. **Idea / Preferred Direction**, Essential.
- `:100-113` — `-1` Core work is top priority; expand extension cases, then Core tests/patches. **Planned / In Progress**, Essential.
- Relevant evidence found.

### `MeetingMinutes/Weekly/2025/09/2025-09-26.md` — declared 2025-09-26

- `:21-25` — Strategic shift from complete upfront design to small steps under a blurry vision. **Preferred Direction**, Essential.
- `:27-31` — BCP 47 long-term; root-site and file-asset use cases. **Preferred Direction / Idea**, Essential.
- `:33-43` — `-1` problem, boolean plus DataHandler duplication, characterization tests, deterministic extension. **Problem / Preferred Direction / In Progress**, Essential.
- `:46-50` — Migration over bug-by-bug removal; Core deprecation cadence, tentative v15/v16. **Preferred Direction / Planned**, Useful.
- `:52-66` — Mode UX bugs; future full structures/shadows presented as unified direction. **Problem / Discussed Direction**, Essential.
- Relevant evidence found.

### `MeetingMinutes/Weekly/2025/10/2025-10-17.md` — declared 2025-10-17

- `:24-34` — Defer large extension architecture refactor; prioritize simple `-1` scenarios then children then Core tests/patches; GUI base only. **Preferred Direction / Planned**, Essential.
- `:36-46` — Fallback/exclusion logic and future event-model details. **In Progress / Idea**, Too Detailed.
- `:48-57` — Feature branch, first content model, Core cases, event refinement, target v13+. **Planned / In Progress**, Useful.
- Relevant evidence found.

### `MeetingMinutes/Weekly/2025/10/2025-10-24.md` — declared 2025-10-24

- `:21-35` — Current metadata fields and disputed/history of `origUid`. **Current Core Behavior / Problem**, Useful.
- `:37-43` — Connected always has parent, Free may not; editor-free but technically connected future; internal identity obsoletes `origUid`. **Current Core Behavior / Discussed Direction**, Essential.
- `:45-56` — Shadows versus neutral structure; duplication/synchronization argument; Jo favors neutral structure. **Open Question / Preferred Direction**, Essential.
- `:58-66` — `transOrigPointerField` as structure identity, `translationSource` as content origin; useful for identical shared data. **Discussed Direction**, Essential.
- `:68-78` — Fewer records/easier migration with structure layer; integrator support; Workspace overhead of shadows; likely future foundation. **Preferred Direction**, Essential.
- Relevant evidence found.

### `MeetingMinutes/Weekly/2025/10/2025-10-31.md` — declared 2025-10-31

- `:21-25` — Programming prioritized over documentation due capacity. **In Progress context**, Optional.
- `:27-33` — CSP/deprecation discussion is off-topic. **No T3DD26 evidence**, n/a.
- `:35-42` — Customer tree-to-translation/DeepL migration and navigation parameter problem; stable intrinsic language identity. **Problem / Preferred Direction**, Useful.
- `:43-52` — DeepL extension/API details. **Optional supporting context**, not Core architecture evidence.
- `:54-60` — Curated localization remains important for SEO/indexing/ownership; language may generalize to dimensions. **Problem / Idea**, Useful.
- Relevant evidence found, but much of file is off-topic.

### `MeetingMinutes/Weekly/2025/11/2025-11-07.md` — declared 2025-11-07

- `:21-25` — Extension compatibility status is internally contradictory regarding v12. **No reliable architectural evidence**, Too Detailed.
- `:27-39` — Deployment/scheduling automation is off-topic. **No T3DD26 evidence**, n/a.
- `:41-45` — IRRE test element created in PR #7 without Content Blocks to isolate Core relations. **Implemented / In Progress**, Useful.
- Relevant evidence found only for test infrastructure.

### `MeetingMinutes/Weekly/2025/11/2025-11-14.md` — filename date 2025-11-14; document declares 2025-11-21

- `:21-32` — Recaps prior 11/14 findings: valid and invalid combinations; translate/copy preserve language, move/edit can break it; called Core bug. **Current Core Behavior / Problem**, Essential.
- `:34-63` — Refined parent/child propagation rules including valid `-1` exceptions. **Discussed Direction / Planned tests**, Essential.
- `:65-75` — Inline children are integral; delete/restore should be all-or-nothing. **Preferred Direction**, Optional.
- `:77-83` — Language as current output dimension; possible future dimensions; avoid cross-language inconsistency. **Current Core Behavior / Idea**, Optional.
- `:85-98` — Orphan-handling alternatives; preserve visible marked orphans for editor action, avoiding silent loss. **Open Question / Preferred Direction**, Useful.
- `:100-106` — Initial boolean `isLanguageAllRecord`, later sync groups, staged compatibility. **Planned**, Essential.
- `:108-111` — Rules intended as foundation for docs and automated tests. **Planned**, Useful.
- Relevant evidence found; date metadata ambiguity must accompany citation.

### `MeetingMinutes/Weekly/2025/11/2025-11-21.md` — declared 2025-11-21

- `:21-30` — Repeats valid/invalid relation cases and mismatch problem. **Current Core Behavior / Problem**, Essential.
- `:32-51` — Consolidated propagation and `-1` exception rules for future Core tests. **Discussed Direction / Planned**, Essential.
- `:53-57` — Inline delete/restore all-or-nothing. **Preferred Direction**, Optional.
- `:59-63` — Language as current output dimension; multiple dimensions remain long-term idea. **Current Core Behavior / Idea**, Optional.
- `:65-71` — Keep marked orphans, let editors delete/reassign/translate. **Preferred Direction**, Useful.
- `:73-77` — Boolean replacement, later sync groups, gradual compatibility. **Planned**, Essential.
- Relevant evidence found; substantial duplicate/condensation of the adjacent `2025-11-14.md` file.

### `MeetingMinutes/Weekly/2025/11/2025-11-28.md` — declared 2025-11-28

- `:20-30` — Monthly meetings, simple stable extension, Core `-1` localization patches prioritized. **Preferred Direction / In Progress**, Useful.
- `:32-36` — WIP Core inventory patch planned across TCA, `PageRepository`, `LanguageAspect`, Extbase, backend rights. **Planned**, Essential.
- `:38-45` — Parent-child language propagation and UI field constraints; data correctness before UI. **Preferred Direction / Planned**, Useful.
- `:47-52` — `language_sync` / `ctrl.languageSyncField`; first default-record boolean, later target multi-select. **Planned**, Essential.
- `:53-57` — Toggle cleanup, soft deletion/restoration, exponential duplicate risk. **Open Question / Preferred Direction**, Essential.
- `:59-76` — Existing-translation orphan bug, Forge #108358, warning design, ownership. **Problem / Planned / In Progress**, Essential.
- Relevant evidence found.

## Reviewed files with no evidence accounting

No file was wholly devoid of T3DD26-relevant evidence. The following sections were reviewed but excluded as off-topic or unreliable:

- `MeetingMinutes/Weekly/2025/10/2025-10-31.md:27-33` — CSP and third-party extension deprecations: off-topic.
- `MeetingMinutes/Weekly/2025/10/2025-10-31.md:43-52` — DeepL extension feature comparison: only background context, not evidence for Core architecture.
- `MeetingMinutes/Weekly/2025/11/2025-11-07.md:21-25` — internally contradictory v12 compatibility wording; unsafe for a precise status claim.
- `MeetingMinutes/Weekly/2025/11/2025-11-07.md:27-39` — deployment-review and recurring-job automation: off-topic.

## Negative findings for requested topics

Across all 18 reviewed files, no direct evidence was found for:

- a defined **Editing Language** model or UI;
- XLIFF/file-translation language identity (only generic language-specific file assets appear on 2025-09-26);
- an implemented Core replacement for `sys_language_uid=-1`;
- an implemented BCP-47 record-language schema;
- a final decision to remove numeric IDs as physical database references;
- a final decision between shadow-complete layers and neutral structure (only a later preference for neutral structure);
- a final activation/deactivation algorithm for the sync flag;
- a provenance marker for automatically generated records;
- a quantified database/performance/Reference Index/Workspace/versioning comparison;
- a formal deprecation of Free mode;
- a final, approved linear roadmap.
