# T3DD26 source dossier — Weekly minutes, 2024 H2

<!-- Built from a complete read of every Markdown file in MeetingMinutes/Weekly/2024/07 through /12. -->

## Scope and method

- Scope assigned: every Markdown document under `MeetingMinutes/Weekly/2024/07` through `MeetingMinutes/Weekly/2024/12`, read in full, not merely searched. There is no `MeetingMinutes/Weekly/2024/08` directory in this checkout.
- Corpus: 16 Markdown files, 730 physical lines in total. `.DS_Store` was excluded by selecting Markdown files only.
- The status labels used below are exactly the requested taxonomy: **Current Core Behavior**, **Problem**, **Idea**, **Discussed Direction**, **Preferred Direction**, **Open Question**, **Planned**, **In Progress**, **Implemented**, and **Analytically Derived Recommendation**.
- “Implemented” is used only where a minute explicitly establishes working/current behavior. A test or bugfix existing in a Gerrit patch but not evidenced as merged is **In Progress**, even if the team considered it ready to merge.
- Session priority uses **Essential**, **Useful**, **Optional**, and **Too Detailed**.
- All citations are repository-relative paths with exact line ranges. This dossier does not infer current-2026 status from a 2024 statement; it reports the 2024 evidence and its then-latest state.

## Executive assessment of 2024 H2 evidence

The second half of 2024 contains the first clearly traceable progression from a narrow wish to deprecate `sys_language_uid = -1` to a broader architectural direction: languages should become self-contained in the database, missing language variants may need to be materialized, and the Core should eventually avoid cross-language overlay lookups. The progression is real, but it is not a finished Core roadmap.

1. **Replacing `-1` is a strategic preference, not an implemented change.** In July the initiative considered a deprecation in v13 useful but explicitly required a replacement first; by September it discussed an opt-in upgrade wizard and a DataHandler-synchronization replacement; by December it was building a test inventory and considering a WIP cleanup patch. Sources: `MeetingMinutes/Weekly/2024/07/2024-07-05.md:20-24`, `MeetingMinutes/Weekly/2024/09/2024-09-06.md:59-67`, `MeetingMinutes/Weekly/2024/12/2024-12-20.md:45-63`. Status: **Preferred Direction** plus **In Progress**. Priority: **Essential**.
2. **“Linguistic completeness” became the strongest long-term model in this period.** The team moved from disagreement over automatically closing translation gaps to full-team approval, on 2024-10-18, of closing gaps at all levels; it also agreed on the basic goal of self-contained language data without cross-language lookups. In November completeness was named as the intended long-term anchor for the strategy paper. Sources: `MeetingMinutes/Weekly/2024/09/2024-09-20.md:52-60`, `MeetingMinutes/Weekly/2024/09/2024-09-27.md:44-68`, `MeetingMinutes/Weekly/2024/10/2024-10-04.md:26-34`, `MeetingMinutes/Weekly/2024/10/2024-10-18.md:21-37`, `MeetingMinutes/Weekly/2024/10/2024-10-18.md:60-66`, `MeetingMinutes/Weekly/2024/11/2024-11-15.md:32-50`. Status: **Preferred Direction**, with implementation and applicability still **Open Question**. Priority: **Essential**.
3. **The period exposes why the default language is structurally privileged, but does not explicitly decide to abolish language `0`.** Connected/Strict behavior can obtain sorting from the default language; Extbase expects overlays and a default-language record; MM relation proposals assume translation parents rooted in the default language; non-default records in Free mode can exist without a default-language parent. Sources: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:30-32`, `MeetingMinutes/Weekly/2024/09/2024-09-06.md:55-57`, `MeetingMinutes/Weekly/2024/09/2024-09-13.md:34-47`, `MeetingMinutes/Weekly/2024/09/2024-09-20.md:41-49`, `MeetingMinutes/Weekly/2024/10/2024-10-18.md:33-37`. Status: **Current Core Behavior** and **Problem**. Priority: **Essential**. Any claim that 2024 H2 had selected a replacement for language `0` would overstate these sources.
4. **BCP 47 appears as a direction, but only once and without a technical design.** A November camp report says replacing numeric language identifiers with BCP 47, deprecating `-1`, and self-contained DB language information met audience interest and approval. It does not establish the authoritative storage location, persistence model, role of internal numeric IDs, cross-site mapping, XLIFF behavior, or migration. Source: `MeetingMinutes/Weekly/2024/11/2024-11-15.md:20-24`. Status: **Discussed Direction**, not **Planned** or **Implemented**. Priority: **Essential** as a session concept, but the detailed design needs other sources.
5. **DataHandler synchronization is the proposed bridge from sparse special-value semantics to explicit language records.** The September `-1` migration sketch would materialize concrete translations and later provide cross-language usability through DataHandler synchronization. October introduces the distinction between editable and synchronized translations, current `allowLanguageSynchronization`, and a planned `enforceLanguageSynchronization` state. December supplies a concrete `l10n_state` initialization proposal for file fields. Sources: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:59-63`, `MeetingMinutes/Weekly/2024/10/2024-10-18.md:39-58`, `MeetingMinutes/Weekly/2024/12/2024-12-06.md:20-37`. Status: a mix of **Current Core Behavior**, **Preferred Direction**, and **Planned**. Priority: **Essential**.
6. **Free Mode is not deprecated in this corpus.** Instead, the team unanimously regarded cross-language copy/move—allowed in Free mode—as a legitimate use case whose bugs must be solved. The minutes also show Free mode records without `l10n_parent` and direct use without overlays. Sources: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:20-38`, `MeetingMinutes/Weekly/2024/09/2024-09-20.md:37-47`, `MeetingMinutes/Weekly/2024/09/2024-09-27.md:20-40`. Status: **Current Core Behavior**, **Problem**, and **Preferred Direction** (preserve the user need). Priority: **Useful**. “Free Mode deprecation” is not source-supported here.
7. **The current implementation activity is characterization and bugfix work, not the future model itself.** Patch 85912 characterizes moving `-1` content; the test matrix grows to copy/move/modify, fallback types, relations, categories, and workspaces. Patch 86773 addresses copied inline children, but its workaround is acknowledged to be at the wrong architectural layer. Sources: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:69-75`, `MeetingMinutes/Weekly/2024/10/2024-10-25.md:20-42`, `MeetingMinutes/Weekly/2024/11/2024-11-22.md:25-39`, `MeetingMinutes/Weekly/2024/12/2024-12-20.md:45-63`. Status: **In Progress**. Priority: **Essential** for “where we actually are”; implementation details are **Too Detailed** for main slides.

## Complete document-review inventory

| File reviewed completely | Evidence outcome |
|---|---|
| `MeetingMinutes/Weekly/2024/07/2024-07-05.md` | Relevant: `-1` mission/deprecation gating; DataHandler/AI translation and FlexForm edge context at lines 20-36. |
| `MeetingMinutes/Weekly/2024/07/2024-07-12.md` | **No substantive T3DD26 architecture evidence.** It contains T3DD24 planning and off-topic discussion only (`:20-28`). |
| `MeetingMinutes/Weekly/2024/07/2024-07-19.md` | **No usable evidence.** Recording problems meant no minutes were taken (`:20-22`). |
| `MeetingMinutes/Weekly/2024/07/2024-07-26.md` | Relevant: working deprecation draft for special `-1` (`:20-24`). |
| `MeetingMinutes/Weekly/2024/09/2024-09-06.md` | Highly relevant: copy/move behavior, Free mode, `-1` relation depth, MM loss, overlays/default dependency, migration, strategy, first test patch (`:20-75`). |
| `MeetingMinutes/Weekly/2024/09/2024-09-13.md` | Highly relevant: IRRE copy characterization, possible `moveToLanguage`, and `-1` sorting/fallback test matrix (`:20-47`). |
| `MeetingMinutes/Weekly/2024/09/2024-09-20.md` | Highly relevant: language-inconsistent MM relations, overlays/Free mode, file-reference translations, missing-variant policy, structural-completeness dispute (`:25-60`). Camp recap at `:21-23` has no direct evidence. |
| `MeetingMinutes/Weekly/2024/09/2024-09-27.md` | Highly relevant: evolving copy diagnosis; Free-mode/`l10n_parent` constraint; same-language MM relations; explicit “gap vs automatic hidden translation” alternatives (`:20-68`). |
| `MeetingMinutes/Weekly/2024/10/2024-10-04.md` | Highly relevant: correction of copy diagnosis, code-path complexity, gap-closure disagreement, test packaging (`:20-44`). |
| `MeetingMinutes/Weekly/2024/10/2024-10-18.md` | Central evidence: team shift to complete language layers; sorting/default dependency; synchronization; `enforceLanguageSynchronization`; overlay abolition; controlled DataHandler challenge (`:21-66`). |
| `MeetingMinutes/Weekly/2024/10/2024-10-25.md` | Relevant: inline-copy patch approach and completed `-1` move tests exposing Free-mode sorting failure (`:20-42`). |
| `MeetingMinutes/Weekly/2024/11/2024-11-15.md` | Central evidence: BCP 47 reception, completeness as long-term strategy anchor, non-translatable-record caveat (`:20-54`). Team-formation discussion at `:26-30` is not architectural evidence. |
| `MeetingMinutes/Weekly/2024/11/2024-11-22.md` | Relevant: working inline-copy workaround, architectural caveat, `-1` test inventory (`:25-39`). |
| `MeetingMinutes/Weekly/2024/11/2024-11-29.md` | Relevant: workspace coverage and strategy-paper scheduling (`:20-30`). |
| `MeetingMinutes/Weekly/2024/12/2024-12-06.md` | Highly relevant: concrete `allowLanguageSynchronization`/`l10n_state` behavior and strategy timing (`:20-41`). |
| `MeetingMinutes/Weekly/2024/12/2024-12-20.md` | Highly relevant: strategy scope, integrated language-layer recommendation, `-1` test matrix/debt, cleanup WIP, ready-to-merge test patch (`:24-63`). Year review at `:20-22` has no direct evidence. |

`MeetingMinutes/Weekly/2024/08` does not exist, so there were no August Markdown documents to review. The July minutes had announced an August summer break (`MeetingMinutes/Weekly/2024/07/2024-07-05.md:38-42`), which is consistent with that absence but does not prove why the directory is absent.

## Theme dossier

### 1. Replacement of `sys_language_uid = -1`

#### Current behavior and concrete problems

- **Current Core Behavior — Essential:** `-1` may occur on an inline parent at arbitrary depth before the first child carrying a “real” language. A cross-language copy/move therefore cannot be treated as a shallow parent-only change. Source: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:34-38`.
- **Current Core Behavior / Problem — Essential:** overlay and fallback behavior performs lookups into other languages, including for “Language All”; this is the antithesis of a self-contained language layer. Source: `MeetingMinutes/Weekly/2024/10/2024-10-18.md:60-66`.
- **Current Core Behavior / Problem — Useful:** in the `Move Into` characterization test, sorting in all languages is adjusted so that `-1` content comes first. In Free mode, sorting a `-1` element behind another element in a translation fails because a single sorting value cannot serve the different translated layers. Source: `MeetingMinutes/Weekly/2024/10/2024-10-25.md:34-42`.
- **Current Core Behavior — Useful:** Strict-mode output can hide inconsistent non-default-language sorting because sorting values are taken from the default language. Source: `MeetingMinutes/Weekly/2024/09/2024-09-13.md:34-38`. This is an important demonstration that apparently correct output does not imply a coherent per-language database state.

#### Direction and maturity

- **Discussed Direction:** in early July Eric had asked for an official mission statement to abolish `-1` and said the initiative thought deprecation in v13 could be useful. Source: `MeetingMinutes/Weekly/2024/07/2024-07-05.md:20-22`.
- **Preferred Direction / dependency:** Jo immediately stated that a suitable replacement must exist before an actual deprecation. Source: `MeetingMinutes/Weekly/2024/07/2024-07-05.md:22-24`. The replacement-first gate is stronger evidence than the tentative v13 timing.
- **In Progress (document draft, not Core implementation):** before T3DD24 the initiative prepared a working changelog draft marking special value `-1` obsolete. Source: `MeetingMinutes/Weekly/2024/07/2024-07-26.md:20-24`.
- **Preferred Direction:** the initiative reported unanimous signals from Core-team members that `-1` should be removed/replaced, and intended to ask the Product Strategy Group whether the goal could become an official, funded TYPO3 strategy. This is evidence of strong preference and planned coordination, not proof of an adopted Core roadmap. Source: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:65-67`.
- **Discussed Direction:** a camp presentation combining `-1` deprecation, BCP 47, and self-contained DB language information met interest and approval. This is useful external validation, not a formal technical decision. Source: `MeetingMinutes/Weekly/2024/11/2024-11-15.md:20-24`.
- **Preferred Direction:** by November the rough strategy-paper roadmap made linguistic completeness the long-term goal and derived removal of `-1` and other measures from it. Source: `MeetingMinutes/Weekly/2024/11/2024-11-15.md:32-36`.

#### Discussed migration and replacement

- **Discussed Direction — Essential:** the September migration sketch rejects requiring users to change all `-1` occurrences manually. An Upgrade Wizard, with explicit consent, would first change `-1` records to language `0` and then translate them into all available languages. Its target is identical behavior without `-1`. Source: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:59-63`.
- **Discussed Direction — Essential:** only after that materialization would DataHandler synchronization provide an alternative for records usable across all languages. Source: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:61-63`.
- **Open Question:** these lines do not define an `availableInAllLanguages` boolean, its storage location, record provenance, activation/deactivation semantics, treatment of existing editorial translations, or creation when a new site language appears. Those aspects must not be attributed to the 2024 H2 minutes.
- **Important scope distinction:** the December decision that no Upgrade Wizard was needed concerns initializing `l10n_state` when `allowLanguageSynchronization` becomes default for file fields (`MeetingMinutes/Weekly/2024/12/2024-12-06.md:20-31`). It does **not** reverse the September `-1` migration-wizard sketch; they are different changes.

#### Characterization and cleanup work

- **In Progress:** a first patch testing moves of `-1` content had been uploaded after T3DD24. Its initial result contradicted the expected frontend position, so the team still needed a test that demonstrated the underlying problem. Source: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:69-75`.
- **Planned / In Progress:** the team defined test cases for moving `-1` content “into” and “after” content under Strict, Free, and Fallback types; Eric was assigned to adapt the patch. Source: `MeetingMinutes/Weekly/2024/09/2024-09-13.md:34-47`.
- **Planned:** frontend and backend assertions were to stay combined initially for performance/common-practice reasons; inline relations should later be covered; small patches should be merged before one all-encompassing test patch. Source: `MeetingMinutes/Weekly/2024/10/2024-10-04.md:36-44`.
- **In Progress:** by 2024-10-25 the planned move tests were complete in Gerrit patch 85912 and revealed the Free-mode sorting defect. The patch’s WIP flag was under discussion, not evidenced as removed or merged. Source: `MeetingMinutes/Weekly/2024/10/2024-10-25.md:34-42`.
- **In Progress:** a jointly maintained test-list document was created to judge when “Language All” behavior had been captured sufficiently; it initially listed already implemented tests. Source: `MeetingMinutes/Weekly/2024/11/2024-11-22.md:37-39`.
- **Planned:** workspaces were added explicitly to the coverage requirements. Source: `MeetingMinutes/Weekly/2024/11/2024-11-29.md:24-26`.
- **Planned / Open Question:** by December the proposed dimensions were Move/Copy/Modify × Strict/Free/Fallback, multiplied by inline/MM relations, categories, and workspace Discard/Modify/Publish/PublishAll. The team was unsure which combinations were meaningful. Source: `MeetingMinutes/Weekly/2024/12/2024-12-20.md:45-51`.
- **Problem:** the combinatorial suite risks technical debt and high maintenance cost for later changes. A proposed first simplification was one ActionTest file per fallback type with identical cases. Source: `MeetingMinutes/Weekly/2024/12/2024-12-20.md:51-55`.
- **Discussed Direction / In Progress:** the team considered creating a WIP cleanup patch for `-1` and completing it incrementally while outstanding characterization tests sharpened the impact picture. Source: `MeetingMinutes/Weekly/2024/12/2024-12-20.md:57-59`.
- **In Progress:** on 2024-12-20 the team considered patch 85912 ready to merge and had left a comment. The minute does not establish an actual merge, so **Implemented** would be too strong. Source: `MeetingMinutes/Weekly/2024/12/2024-12-20.md:61-63`.

#### Most defensible 2024 H2 status

`-1` removal is a **Preferred Direction**. A replacement-first condition and an opt-in materialization-plus-synchronization migration were **Discussed Directions**. Behavior discovery, tests, and test inventory were **In Progress**. Neither the replacement nor removal is evidenced as **Implemented**. The fully specified boolean-record lifecycle in the T3DD26 brief is not present in this corpus and should be sourced from later documents.

### 2. Default-language dependence, language `0`, overlays, and complete language layers

#### Present structural dependence

- **Current Core Behavior / Problem — Essential:** a record created directly in a non-default language has no reference to a default-language element; copying/moving it to another non-default language or to the default language falls outside the usual `localise` process. Source: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:30-32`.
- **Current Core Behavior / Problem — Essential:** Extbase requires overlay behavior and the existence of a default-language record, whereas outside Extbase a direct link to a record without a default-language reference is conceivable. Source: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:55-57`.
- **Current Core Behavior / Problem — Essential:** in Strict mode the default language supplies sorting values; inconsistent sorting stored in a non-default language has no visible effect there. Source: `MeetingMinutes/Weekly/2024/09/2024-09-13.md:34-38`.
- **Current Core Behavior / Problem:** Connected mode permits translation gaps and requires translations to reference a default-language record, but not every default record needs a translation. Source: `MeetingMinutes/Weekly/2024/09/2024-09-20.md:52-60`.
- **Current Core Behavior / Problem:** Connected mode gives the default language the sorting lead, even while database sorting values within non-default languages may be inconsistent. The initiative said those inconsistencies must be cleaned up to become independent of the default language. Source: `MeetingMinutes/Weekly/2024/10/2024-10-18.md:33-35`.

#### Evolution of the “close all gaps” direction

- **Idea (2024-09-20):** automatically create missing record translations, seeded with default-language content, to keep MM relations language-consistent. Source: `MeetingMinutes/Weekly/2024/09/2024-09-20.md:52-56`.
- **Open Question / disagreement (2024-09-20):** Eric opposed background creation without editorial control; Jo’s strict structural-equality mode would act like Connected mode with no gaps. The team deferred the issue. Source: `MeetingMinutes/Weekly/2024/09/2024-09-20.md:56-60`.
- **Competing Directions (2024-09-27):** for a translated content element related to an untranslated category, option A creates no relation until a category translation exists; option B auto-creates the category translation to guarantee structural equality. Eric leaned toward A because Connected mode allows gaps. Astrid proposed creating B’s missing record as `hidden=1`, combining DB completeness with controlled display. Source: `MeetingMinutes/Weekly/2024/09/2024-09-27.md:44-68`.
- **Open Question / continued resistance (2024-10-04):** André and Eric still considered automatic relation-driven record creation problematic because it removes editorial control; hiding new records had not convinced them. Source: `MeetingMinutes/Weekly/2024/10/2024-10-04.md:26-34`.
- **Discussed Direction (2024-10-18):** the team first distinguished content-level gaps from inline-relation gaps and considered DB completeness necessary for inline relations, with missing opposite-side translations generated as hidden records. Sorting was another reason gaps cause trouble. Source: `MeetingMinutes/Weekly/2024/10/2024-10-18.md:21-35`.
- **Preferred Direction (latest explicit group position in this period):** after further discussion, the team concluded that translation gaps should be closed in principle even at content-element level, yielding consistent behavior at every level; the minute says this had full team approval at that time. Source: `MeetingMinutes/Weekly/2024/10/2024-10-18.md:35-37`.
- **Preferred Direction (strategy framing):** “linguistic completeness in the DB” was then recorded as the long-term goal from which `-1` removal and other topics should follow. Source: `MeetingMinutes/Weekly/2024/11/2024-11-15.md:32-36`.

#### Overlay abolition and self-contained layers

- **Preferred Direction — Essential:** the team agreed on the basic long-term goal that each language be self-contained in the database, reducing query logic so that no lookup into other languages is needed for overlay fallback or “Language All.” Source: `MeetingMinutes/Weekly/2024/10/2024-10-18.md:60-66`.
- **Problem / Open Question:** DataHandler synchronization could require highly complex DB operations; changing a site’s fallback sequence could cause “massive shifts” in the database. A controlled synchronization trigger is required, but the meaningful implementation was not known. Source: `MeetingMinutes/Weekly/2024/10/2024-10-18.md:62-66`.
- **Discussed Direction:** deprecating `-1`, using BCP 47, and making language information self-contained met interest at a camp presentation. Source: `MeetingMinutes/Weekly/2024/11/2024-11-15.md:20-24`.
- **Idea / edge constraint:** if the instance has at least one configured translation, the initiative thought every frontend-visible record should be potentially translatable. A new TCA property might make tables translatable by default with explicit opt-out for system tables such as `sys_template`. Source: `MeetingMinutes/Weekly/2024/11/2024-11-15.md:38-48`.
- **Counterargument / Open Question:** because Core really enforces only `uid` and `pid`, enforcing translation fields appeared too far-reaching; the team deferred the question. Source: `MeetingMinutes/Weekly/2024/11/2024-11-15.md:48-50`.
- **Methodological boundary:** unpredictable controller output rules should not determine the future architecture. Source: `MeetingMinutes/Weekly/2024/11/2024-11-15.md:52-54`. Status: **Discussed Direction**.
- **Idea, not consensus:** Eric recommended that the strategy concept consider a fully integrated “language layer” and spell out system-wide impact. Source: `MeetingMinutes/Weekly/2024/12/2024-12-20.md:37-39`. The wording is one participant’s recommendation, so it should not be upgraded to a team decision.

#### What these sources do and do not say about language `0`

- They establish that default-language records are structural anchors for overlays, sorting, Connected mode, and translation parents.
- They establish a **Preferred Direction** to become independent of that cross-language lookup.
- They do **not** explicitly say that numeric value `0` will disappear, define a neutral structure record, define a language-independent identity, or select shadow records as the mechanism.
- The September `-1` migration sketch temporarily converts records to language `0` before creating all translations (`MeetingMinutes/Weekly/2024/09/2024-09-06.md:59-63`), so it actually uses the present default-language anchor as an intermediate migration mechanism.
- Therefore, “abolition of the special role of `0`” is a reasonable higher-level implication to explore, but in this corpus it is at most an **Analytically Derived Recommendation/Open Question**, not a documented initiative decision.

### 3. BCP 47 and stable language identity

- **Discussed Direction — Essential:** the only direct BCP-47 evidence in 2024 H2 is the camp report that replacing the numeric language identifier with BCP 47, together with deprecating `-1` and self-contained DB language data, attracted interest and approval. Source: `MeetingMinutes/Weekly/2024/11/2024-11-15.md:20-24`.
- **Not established in this corpus:** whether BCP 47 is stored on each record or on a language entity; whether an internal numeric primary/foreign key remains; whether identity is installation-wide or site-independent; region/script/private-subtag normalization; mapping and uniqueness; migrations; Cross-Site/global-storage scenarios; XLIFF/file-language mapping; import/export; external translation services.
- **Current related constraint:** a non-default record can exist without a default-language reference (`MeetingMinutes/Weekly/2024/09/2024-09-06.md:30-32`), and outside Extbase direct linking without a default record is conceivable (`MeetingMinutes/Weekly/2024/09/2024-09-06.md:55-57`). These support the need to separate content-language existence from default-rooted overlay assumptions, but they do not themselves prove BCP 47 as the solution.
- **Session handling:** use BCP 47 as a clearly labeled **Discussed Direction** and source the detailed cross-site argument from later minutes/transcripts. Do not claim that H2 2024 selected BCP 47 as a database key.

### 4. Synchronization model: current allowance, proposed enforcement, and DataHandler

#### Existing mechanism

- **Current Core Behavior:** `allowLanguageSynchronization` can distinguish fields/translations that remain synchronized from those editors may edit independently. The 2024-10-18 minute names the mechanism but does not fully document its UI lifecycle. Source: `MeetingMinutes/Weekly/2024/10/2024-10-18.md:39-43`.
- **Current Core Behavior / edge history:** Jo recalled earlier failures to set `l10n_parent` correctly on synchronized relation records such as `sys_file_reference`. A live check in TYPO3 v13 found references set correctly for both `pages.media` and `tt_content.assets`. Source: `MeetingMinutes/Weekly/2024/12/2024-12-06.md:33-37`. This is the strongest **Implemented/currently working** synchronization evidence in the period.

#### Proposed stricter mechanism

- **Planned:** André wanted a TCA `behaviour` cleanup as a pre-patch for `enforceLanguageSynchronization`. The envisioned state space was no configuration, **allow** synchronization, and **enforce** synchronization; Anja proposed representing it as an enum. Source: `MeetingMinutes/Weekly/2024/10/2024-10-18.md:51-58`.
- **Open Question:** the minute does not explicitly define enforcement semantics, provenance, permitted editor actions, whole-record versus per-field scope, or exact spelling/API. The T3DD26 interpretation “an editor cannot opt out” is plausible but needs later direct evidence.

#### Concrete `allowLanguageSynchronization` proposal

- **Preferred Direction / Planned:** for patch 87292, the team supported enabling `allowLanguageSynchronization` by default for file-type fields and accepted that as a v14 breaking change. Source: `MeetingMinutes/Weekly/2024/12/2024-12-06.md:20-28`.
- **Discussed Direction:** no Upgrade Wizard would be used for that change; DataHandler would initialize missing state. If `allowLanguageSynchronization=true` and `l10n_state=NULL`, DataHandler should write the necessary JSON. Source: `MeetingMinutes/Weekly/2024/12/2024-12-06.md:26-30`.
- **Discussed Direction / Open Question:** if the translated value differs from its source, state becomes `custom`; otherwise `default`. Equality must include details such as the same image and metadata title. Source: `MeetingMinutes/Weekly/2024/12/2024-12-06.md:29-31`.

#### Connection to future “all languages” behavior

- **Discussed Direction:** the `-1` migration proposal makes concrete language records first, then introduces cross-language usability using DataHandler synchronization (`MeetingMinutes/Weekly/2024/09/2024-09-06.md:59-63`).
- **Open Question:** no 2024-H2 minute specifies whole-record enforcement, automatic creation on adding new target languages, conversion of pre-existing manual translations, deactivation cleanup, or how automatically synchronized variants are distinguished from editorial variants.
- **Architectural dependency:** controlled synchronization is explicitly unresolved when fallback configuration changes, because it may trigger massive DB reshaping (`MeetingMinutes/Weekly/2024/10/2024-10-18.md:60-66`).

### 5. Translation, localization, Free/Connected modes, and editorial control

- **Current Core Behavior — Useful:** cross-language `copy`/`move` is allowed in Free mode, but it is not the normal `localise` process; inline children consequently receive incorrect languages. Source: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:20-26`.
- **Preferred Direction:** the team unanimously judged the editorial use case—moving/copying content between languages—plausible and worthy of a proper fix. Source: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:24-26`.
- **Current Core Behavior:** new content created in a non-default language has no default-language reference. Source: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:30-32`.
- **Current Core Behavior:** Free-mode cross-language copying in the Page module depends on records having no `l10n_parent`; using localization semantics would set parents and therefore violate the mode. Source: `MeetingMinutes/Weekly/2024/09/2024-09-27.md:20-28`.
- **Current Core Behavior / Problem:** in a Free-mode relation, a non-default record UID can be stored directly, producing MM sides from different languages; in overlay modes, relations are resolved differently. Source: `MeetingMinutes/Weekly/2024/09/2024-09-20.md:29-47`.
- **Product/UX tension — Essential:** the gap-closing debate repeatedly balances structural consistency against editorial control. Eric initially argued that background-created translations remove control; Astrid’s hidden-record proposal and the later team preference seek to preserve visibility control while guaranteeing DB structure. Sources: `MeetingMinutes/Weekly/2024/09/2024-09-20.md:52-60`, `MeetingMinutes/Weekly/2024/09/2024-09-27.md:53-68`, `MeetingMinutes/Weekly/2024/10/2024-10-04.md:26-34`, `MeetingMinutes/Weekly/2024/10/2024-10-18.md:29-37`.
- **No evidence of Free Mode deprecation:** none of the reviewed H2 files proposes removing Free mode. The corpus instead treats its use cases as valid. It also does not discuss an “Editing Language” concept or explicitly frame “translation versus localization” as terminology. Those themes need later sources.

### 6. MM relations as a compact demonstration of the data-model problem

- **Problem:** saving a primary record in a bidirectionally editable MM relation may delete relation data belonging to translations of the foreign record. Source: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:51-53`.
- **Current Core Behavior / Problem:** depending on which side is saved, relation rows are generated for translations of that side while translations on the other side are ignored and their relation rows removed. The MM row can therefore connect records from different languages. Sources: `MeetingMinutes/Weekly/2024/09/2024-09-20.md:29-39`.
- **Current Core Behavior:** `l10n_mode=exclude` can yield one MM side pointing to a non-default record while the other points to a default-language record. Source: `MeetingMinutes/Weekly/2024/09/2024-09-20.md:33-35`.
- **Rejected shortcut:** storing relations only between default-language records is too narrow because it assumes overlays and ignores Free mode. Source: `MeetingMinutes/Weekly/2024/09/2024-09-20.md:41-45`.
- **Constraint:** relations themselves may need translation; file-reference alternative text/title is the concrete example. Source: `MeetingMinutes/Weekly/2024/09/2024-09-20.md:43-45`.
- **Preferred Direction:** both `uid_local` and `uid_foreign` should refer to records of the same language. For overlay cases the group considered a translation-parent field on relation records; in Free mode the language-consistent row could be used directly. Source: `MeetingMinutes/Weekly/2024/09/2024-09-20.md:41-49`; reaffirmed at `MeetingMinutes/Weekly/2024/09/2024-09-27.md:44-46` and `MeetingMinutes/Weekly/2024/10/2024-10-04.md:26-30`.
- **Open Question:** what relation should exist when the opposite record lacks a variant in the requested language? Source: `MeetingMinutes/Weekly/2024/09/2024-09-20.md:47-60`.
- **Refinement:** the question applies when both sides are actually language-aware. Source: `MeetingMinutes/Weekly/2024/10/2024-10-18.md:21-29`.
- **Architecture significance:** MM relations show that “same business entity” and “same language variant” cannot safely be inferred from one default-rooted UID pair. However, these minutes do not define a neutral identity layer; proposing one is **Analytically Derived**, not sourced policy.

### 7. Inline copy/move bug: evolution from symptom to acknowledged workaround

This issue is too detailed for the main session but is a strong backup-slide example of how translation semantics leak into generic DataHandler operations.

1. **Problem / In Progress (2024-09-13):** issue 89787 used normal `copy`, not `copyToLanguage`; patch 86085 checked current behavior and the team considered it mergeable. Astrid would test whether `copyToLanguage` solved the issue. Similar move problems suggested a possible `moveToLanguage` action. Source: `MeetingMinutes/Weekly/2024/09/2024-09-13.md:20-28`.
2. **Finding (2024-09-27):** passing a language invokes localization behavior for children, sets `l10n_parent`, and adjusts sorting—invalid for Free-mode copying. The team suspected `localize()` was misplaced in `copyRecord_processRelation()`. Source: `MeetingMinutes/Weekly/2024/09/2024-09-27.md:20-38`.
3. **Initial complication (2024-09-27):** replacing localization with `copyRecord()` had appeared to double relations and lose language at deeper inline levels; investigation continued around `$copyAfterFields`. Source: `MeetingMinutes/Weekly/2024/09/2024-09-27.md:40-42`.
4. **Correction (2024-10-04):** the doubling was caused by xDebug, not the approach. The deeper problem was that `copyRecord_processRelation()` does not know whether it came from `localize` or `copyRecord`; a different copy code path was needed. Because scope had grown, the team paused code research and asked Astrid to document findings in the ticket. Source: `MeetingMinutes/Weekly/2024/10/2024-10-04.md:20-24`.
5. **In Progress workaround (2024-10-25):** patch 86773 derived the target language from `$copyAfterFields` where possible. Passing the whole parent `$pasteUpdate` to children was unsafe, so the team chose an immediate, filtered-language workaround while leaving a generic DataMap solution for later. Source: `MeetingMinutes/Weekly/2024/10/2024-10-25.md:20-32`.
6. **Working but architecturally imperfect (2024-11-22):** extracting only language information from `$pasteUpdate` for translatable children solved issue 89787. The team explicitly said the location was wrong and upstream DataMap correctness would be cleaner; test adaptation was still needed before removing WIP. Source: `MeetingMinutes/Weekly/2024/11/2024-11-22.md:25-35`.
7. **Further prerequisite (2024-11-29):** workspace tests remained to be examined after review feedback. Source: `MeetingMinutes/Weekly/2024/11/2024-11-29.md:20-26`.

Status at period end: patch-level **In Progress** with a working workaround, not evidenced as merged **Implemented** behavior. The evolution also contains an explicit correction: the relation-doubling diagnosis of 2024-09-27 was retracted on 2024-10-04.

### 8. Strategy, validation, and governance

- **Planned:** October’s proposed strategy paper was intended to define mission objectives with full Core-team agreement and become a basis for future funding. Source: `MeetingMinutes/Weekly/2024/10/2024-10-18.md:45-49`.
- **Planned:** in November Jo had the information needed to request budget; the paper’s rough roadmap was completeness first, derived measures second. Source: `MeetingMinutes/Weekly/2024/11/2024-11-15.md:32-36`.
- **Schedule evolution:** on 2024-11-29 timing might slip into Q1 2025 (`MeetingMinutes/Weekly/2024/11/2024-11-29.md:28-30`); on 2024-12-06 it was scheduled for Q1 and budget would be requested for that period (`MeetingMinutes/Weekly/2024/12/2024-12-06.md:39-41`); by 2024-12-20 the budget request had been submitted and feedback was expected in January (`MeetingMinutes/Weekly/2024/12/2024-12-20.md:24-28`).
- **Planned validation:** data from camp/Developer Days surveys, stakeholder interviews, refined personas, and outside expert review were intended to validate measures and address objections early. Source: `MeetingMinutes/Weekly/2024/12/2024-12-20.md:26-37`.
- **Planned deliverable:** the paper should cover current state, preparatory work, and target state, and seek an officially approvable concept as the basis for later implementation. Source: `MeetingMinutes/Weekly/2024/12/2024-12-20.md:32-37`.
- **Caution for T3DD26:** audience approval at one camp and an intended future approval process are not evidence that every architecture item already had Core-team consensus.

### 9. Peripheral but potentially useful evidence

- **External translation integration — Optional:** `EXT:wv_deepltranslate` already used DataHandler hooks to insert AI results into content creation; FlexForm content was not yet translated, though a hook could manipulate it. Source: `MeetingMinutes/Weekly/2024/07/2024-07-05.md:30-36`. This illustrates DataHandler as an integration seam but does not establish a future Core architecture.
- **Other regression — Too Detailed:** duplicated IRRE records during simultaneous translations was kept on the radar, but another contributor was expected to provide a test, so the initiative saw no immediate action. Source: `MeetingMinutes/Weekly/2024/09/2024-09-20.md:25-27`.
- **New-feature compatibility — Optional:** Page-tree content moving and the Site Settings Editor were flagged as features whose translation-handling effects should be considered in future work. Source: `MeetingMinutes/Weekly/2024/09/2024-09-13.md:30-32`.

## Historical evolution and contradictions

| Theme | Evolution | Latest supportable H2-2024 reading |
|---|---|---|
| `-1` | Tentative v13 deprecation, gated by replacement (2024-07-05) → draft deprecation text (07-26) → opt-in materialization and sync migration plus strategy outreach (09-06) → characterization matrix (09–12) → incremental cleanup WIP contemplated (12-20). | Removal is **Preferred Direction**; tests are **In Progress**; migration and replacement remain **Discussed Direction**. No implemented removal. |
| Missing translations | Jo proposes auto-closing gaps while Eric resists (09-20) → A/no relation vs B/auto-hidden variant, Eric favors A (09-27) → André/Eric still resist (10-04) → full-team approval to close gaps at all levels (10-18) → completeness anchors strategy (11-15). | The 10-18/11-15 preference supersedes the earlier leaning, but translatability, lifecycle, scale, and controlled synchronization remain open. |
| Inline copy | Try `copyToLanguage` (09-13) → localization semantics conflict with Free mode; `copyRecord` seems to double relations (09-27) → doubling diagnosis retracted, but missing context requires a larger code-path split (10-04) → filtered `$pasteUpdate` workaround (10-25/11-22) → workspace tests remain (11-29). | Working patch approach **In Progress**, acknowledged as architecturally misplaced. |
| Default-language dependence | Strict/Connected behavior masks per-language sorting inconsistency (09-13/10-18); default-only MM storage rejected (09-20); self-contained layers/no overlays agreed as basic goal (10-18). | Independence from cross-language lookup is **Preferred Direction**; eliminating numeric `0` or choosing a neutral identity is still **Open Question/not directly discussed**. |
| Synchronization | DataHandler sync proposed as `-1` replacement (09-06) → allow vs enforce and enum pre-patch (10-18) → concrete `l10n_state` bootstrapping for file fields (12-06). | Field synchronization has concrete behavior; record-wide enforcement and generated-record lifecycle are not specified. |
| Test strategy | One surprising move test (09-06) → fallback matrix (09-13) → small-patch preference (10-04) → move tests complete and expose Free failure (10-25) → inventory/workspaces (11) → large multiplier matrix and maintenance-debt warning (12-20). | “Understand/Test before removal” is active, but suite design is itself unresolved. |
| Strategy paper | Budget intent (10-18) → rough goal (11-15) → schedule uncertainty (11-29) → Q1 schedule (12-06) → request submitted with validation plan (12-20). | Strategy development is **Planned**, not an approved architecture at period end. |

### Explicit contradictions or corrections to preserve

1. **Automatic gap closure changed materially.** The anti-automation position in September/early October must not be presented as the latest state; the 2024-10-18 minute records full-team approval for closing gaps. Conversely, that approval must not erase the documented editorial-control objection, which remains essential to lifecycle/UX design.
2. **The copy investigation corrected a false finding.** Apparent relation doubling from `copyRecord()` on 2024-09-27 was attributed to xDebug on 2024-10-04. Keep the deeper lost-context/code-path problem, discard doubling as Core behavior.
3. **“Ready to merge” is not “merged.”** Both the copy characterization and `-1` move test patches were described positively, but no reviewed file proves integration into Core.
4. **Two Upgrade-Wizard statements concern different changes.** An explicit-consent wizard was discussed for converting `-1` records; no wizard was preferred for populating `l10n_state` when changing file-field synchronization defaults. They are compatible, not contradictory.
5. **Fallback configuration versus `-1` language setup.** The 2024 tests explicitly vary Strict/Free/Fallback site behavior (`MeetingMinutes/Weekly/2024/09/2024-09-13.md:36-47`; `MeetingMinutes/Weekly/2024/12/2024-12-20.md:47-55`). This does not establish that a `-1` Site Language should be configured; the minutes discuss fallback types, not creating `-1` in site language configuration.

## Dependencies and a defensible migration/evolution graph

The statuses below distinguish sourced work from analysis.

1. **Inventory current `-1` behavior and characterize it** — **In Progress**. Move behavior, fallback modes, relations, categories, and workspaces are evidenced. Sources: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:69-75`, `MeetingMinutes/Weekly/2024/12/2024-12-20.md:45-63`.
2. **Keep tests maintainable and decide meaningful scenario coverage** — **Open Question/Planned**. The combinatorial matrix risks technical debt. Source: `MeetingMinutes/Weekly/2024/12/2024-12-20.md:49-55`.
3. **Define replacement before deprecation/removal** — **Preferred Direction/dependency**. Source: `MeetingMinutes/Weekly/2024/07/2024-07-05.md:20-24`.
4. **Define which records are language-aware** — **Open Question**. Completeness cannot be universal until frontend-visible, system, and non-translatable tables have an explicit contract. Source: `MeetingMinutes/Weekly/2024/11/2024-11-15.md:38-50`.
5. **Choose missing-variant policy and editorial lifecycle** — **Preferred Direction plus Open Question**. Closing gaps is preferred, hidden initial state proposed, but ownership and later transition are unspecified. Sources: `MeetingMinutes/Weekly/2024/10/2024-10-18.md:29-37`, `MeetingMinutes/Weekly/2024/10/2024-10-18.md:39-43`.
6. **Define controllable DataHandler synchronization** — **Planned/Open Question**. It must survive fallback-order changes without uncontrolled massive DB reshaping. Source: `MeetingMinutes/Weekly/2024/10/2024-10-18.md:60-66`.
7. **Introduce/clarify synchronization states** — **Planned**. No config / allow / enforce, potentially as enum; file-field `l10n_state` behavior provides a bounded precursor. Sources: `MeetingMinutes/Weekly/2024/10/2024-10-18.md:51-58`, `MeetingMinutes/Weekly/2024/12/2024-12-06.md:20-37`.
8. **Materialize existing `-1` records with explicit consent** — **Discussed Direction**. Convert to `0`, create all current variants, preserve behavior. Source: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:59-63`.
9. **Provide synchronized “all-language” usability on concrete variants** — **Discussed Direction**. Source: same lines.
10. **Progressively remove overlay/default lookup and special `-1` logic** — **Preferred Direction**, architecture-dependent. Sources: `MeetingMinutes/Weekly/2024/10/2024-10-18.md:60-66`, `MeetingMinutes/Weekly/2024/11/2024-11-15.md:32-36`.
11. **Prove legacy use cases, including Free mode, relations, sorting, and workspaces** — **In Progress/Planned**. Sources: `MeetingMinutes/Weekly/2024/09/2024-09-06.md:20-49`, `MeetingMinutes/Weekly/2024/12/2024-12-20.md:45-63`.

Parallel stream: BCP 47 is a **Discussed Direction** (`MeetingMinutes/Weekly/2024/11/2024-11-15.md:20-24`) but this corpus does not establish whether it must precede record materialization, can be introduced independently, or is the database identity itself.

### Analytically derived recommendations (not initiative positions)

- **Analytically Derived Recommendation:** add provenance/lifecycle state for automatically generated hidden variants before implementing automatic completeness. It is necessary to distinguish system-owned synchronized copies from editorially independent records and to make activation/deactivation safe. Basis: editorial-control objections (`MeetingMinutes/Weekly/2024/09/2024-09-20.md:52-60`) plus hidden auto-generation preference (`MeetingMinutes/Weekly/2024/10/2024-10-18.md:29-37`).
- **Analytically Derived Recommendation:** prototype completeness on one bounded relation-bearing table and measure record growth, index cost, workspace versions, reference-index changes, and fallback-reconfiguration writes before selecting a global architecture. Basis: “massive shifts” and unknown implementation (`MeetingMinutes/Weekly/2024/10/2024-10-18.md:62-66`) plus non-translatable-table uncertainty (`MeetingMinutes/Weekly/2024/11/2024-11-15.md:38-50`).
- **Analytically Derived Recommendation:** treat same-language relation consistency and common business identity as separate abstractions. A neutral identity/group key may be worth a PoC, but no 2024-H2 source chooses it. Basis: default-only relation storage is inadequate and a relation translation parent was proposed (`MeetingMinutes/Weekly/2024/09/2024-09-20.md:41-49`).
- **Analytically Derived Recommendation:** keep characterization tests behavior-oriented and table-driven, avoiding a full Cartesian product unless a branch is semantically distinct. Basis: the explicit test-debt warning and per-fallback-file simplification (`MeetingMinutes/Weekly/2024/12/2024-12-20.md:49-55`).
- **Analytically Derived Recommendation:** separate a reversible `-1` data migration from later overlay removal. The former has a concrete opt-in sketch; the latter depends on completeness, translatability, sorting, relation identity, and controlled synchronization.
- **Analytically Derived Recommendation:** preserve Free-mode/non-default-first creation as a required behavior while changing internals. Basis: unanimous recognition of the use case (`MeetingMinutes/Weekly/2024/09/2024-09-06.md:20-32`) and the incompatibility of blindly applying localization semantics (`MeetingMinutes/Weekly/2024/09/2024-09-27.md:20-28`).

## Open architecture questions evidenced or exposed by this period

### Directly evidenced

- Which missing translations should be auto-created, and can hidden-by-default records preserve editorial control? (`MeetingMinutes/Weekly/2024/09/2024-09-27.md:53-68`; `MeetingMinutes/Weekly/2024/10/2024-10-18.md:29-37`)
- How should a language-consistent MM relation behave if the other side has no variant? (`MeetingMinutes/Weekly/2024/09/2024-09-20.md:47-60`)
- Which tables/records must be translatable, and is Core enforcement of language fields acceptable? (`MeetingMinutes/Weekly/2024/11/2024-11-15.md:38-50`)
- How can DataHandler synchronization be controlled when a fallback chain changes and would otherwise reshape many records? (`MeetingMinutes/Weekly/2024/10/2024-10-18.md:60-66`)
- Which `-1` test combinations are meaningful, and how can technical debt be controlled? (`MeetingMinutes/Weekly/2024/12/2024-12-20.md:45-55`)
- Should relation translation use its own parent field under overlay-based modes? (`MeetingMinutes/Weekly/2024/09/2024-09-20.md:41-49`)

### Requested topics with no answer in these H2 sources

- Activation/deactivation semantics of an “all languages” boolean.
- Handling pre-existing manual translations when automatic all-language behavior is enabled.
- Provenance and deletion/detachment/conversion of automatically created variants.
- New-language rollout after automatic records already exist.
- Authoritative BCP-47 identity, internal numeric-ID role, variants/scripts/private subtags, and migration.
- Cross-site/global-storage mapping, XLIFF/file translation identity, imports/exports, or translation-service integration based on BCP 47.
- Editing Language.
- Free Mode deprecation.
- A neutral structure/identity layer, explicit shadow/proxy record types, or removal of numeric language `0`.
- Quantified database-size/query-performance trade-off, Reference Index impact, or visibility rules for technical records.

These omissions are important negative evidence: the final analysis must obtain those claims from other years/transcripts or keep them explicitly open.

## Session-ready use cases and visualizations

| Use case / visual | Source-backed message | Status | Priority |
|---|---|---|---|
| Content element translated, related category not translated | A: omit relation; B: auto-create hidden category variant. Shows editorial control versus complete data. `MeetingMinutes/Weekly/2024/09/2024-09-27.md:44-68` | **Open Question**, later **Preferred Direction** toward B | **Essential** |
| Sparse versus complete layers | Gaps break relation consistency/sorting; full layers can avoid cross-language lookups. `MeetingMinutes/Weekly/2024/10/2024-10-18.md:21-37`, `:60-66` | **Preferred Direction/Open Question** | **Essential** |
| `-1` move sorting | Strict mode masks inconsistent sorting; Free mode exposes failure; `Move Into` reorders all languages. `MeetingMinutes/Weekly/2024/09/2024-09-13.md:34-38`; `MeetingMinutes/Weekly/2024/10/2024-10-25.md:34-42` | **Current Core Behavior/Problem** | **Useful** |
| Replacement flow | `-1` → explicit-consent wizard → language `0` + all concrete translations → DataHandler sync. `MeetingMinutes/Weekly/2024/09/2024-09-06.md:59-63` | **Discussed Direction** | **Essential** |
| Same-language MM pair | Contrast mixed-language `uid_local`/`uid_foreign` with per-language relation rows; retain translatable relation metadata. `MeetingMinutes/Weekly/2024/09/2024-09-20.md:29-49` | **Problem/Preferred Direction** | **Useful** |
| Copy content with nested inline children | Generic copy accidentally invokes localization, setting parents and breaking Free-mode semantics. `MeetingMinutes/Weekly/2024/09/2024-09-27.md:20-40` | **Problem/In Progress** | **Optional/backup** |
| Synchronization state ladder | None → Allow → Enforce, with `default`/`custom` state initialization example. `MeetingMinutes/Weekly/2024/10/2024-10-18.md:51-58`; `MeetingMinutes/Weekly/2024/12/2024-12-06.md:20-31` | **Planned/Discussed Direction** | **Useful** |
| Understand → Test → Change → Prove | Test inventory grows before incremental `-1` cleanup; tests expose unexpected behavior and technical debt. `MeetingMinutes/Weekly/2024/09/2024-09-06.md:69-75`; `MeetingMinutes/Weekly/2024/12/2024-12-20.md:45-63` | **In Progress** | **Essential** |
| BCP 47 across two sites | Not supported beyond high-level interest in BCP 47. `MeetingMinutes/Weekly/2024/11/2024-11-15.md:20-24` | **Discussed Direction** | **Essential concept; source elsewhere for example** |

Suggested H2-backed narrative: (1) show `-1`, default anchors, and sparse layers; (2) demonstrate failure using the category relation or sorting case; (3) introduce self-contained/complete language layers as the then-preferred simplification; (4) expose the trade-off—controlled DataHandler reshaping and editorial ownership; (5) show BCP 47 as a parallel identity direction; (6) end with the honest implementation state: characterization tests, a test inventory, and small bugfixes rather than the new architecture.

## Source matrix

| Date | Topic / finding | Status | Exact source | Session priority |
|---|---|---|---|---|
| 2024-07-05 | Initiative seeks mission to abolish `-1`; v13 deprecation considered useful. | Discussed Direction | `MeetingMinutes/Weekly/2024/07/2024-07-05.md:20-22` | Essential |
| 2024-07-05 | A suitable replacement must precede actual deprecation. | Preferred Direction | `MeetingMinutes/Weekly/2024/07/2024-07-05.md:22-24` | Essential |
| 2024-07-05 | DataHandler hooks already integrate AI translation; FlexForms remain an edge. | Current Core Behavior / Problem | `MeetingMinutes/Weekly/2024/07/2024-07-05.md:30-36` | Optional |
| 2024-07-26 | Working deprecation/changelog draft for special `-1`. | In Progress | `MeetingMinutes/Weekly/2024/07/2024-07-26.md:20-24` | Useful |
| 2024-09-06 | Free-mode copy/move does not use regular localization; inline children are wrong. | Current Core Behavior / Problem | `MeetingMinutes/Weekly/2024/09/2024-09-06.md:20-26` | Useful |
| 2024-09-06 | Cross-language copy/move is a legitimate use case that should be fixed. | Preferred Direction | `MeetingMinutes/Weekly/2024/09/2024-09-06.md:24-26` | Useful |
| 2024-09-06 | Non-default-first records lack a default reference. | Current Core Behavior | `MeetingMinutes/Weekly/2024/09/2024-09-06.md:30-32` | Essential |
| 2024-09-06 | `-1` can occur at arbitrary inline depth. | Current Core Behavior / Problem | `MeetingMinutes/Weekly/2024/09/2024-09-06.md:34-38` | Useful |
| 2024-09-06 | Post-copy language-chain correction versus core copy/move correction; feature toggle considered. | Idea / Open Question | `MeetingMinutes/Weekly/2024/09/2024-09-06.md:40-49` | Too Detailed |
| 2024-09-06 | Bidirectionally editable MM relations can lose translated-side data. | Problem | `MeetingMinutes/Weekly/2024/09/2024-09-06.md:51-53` | Useful |
| 2024-09-06 | Extbase expects overlays/default record; direct non-default linking is conceivable elsewhere. | Current Core Behavior / Problem | `MeetingMinutes/Weekly/2024/09/2024-09-06.md:55-57` | Essential |
| 2024-09-06 | Explicit-consent wizard would materialize `-1` into `0` plus all variants; sync follows. | Discussed Direction | `MeetingMinutes/Weekly/2024/09/2024-09-06.md:59-63` | Essential |
| 2024-09-06 | Seek official/funded strategic goal for `-1` replacement. | Planned | `MeetingMinutes/Weekly/2024/09/2024-09-06.md:65-67` | Useful |
| 2024-09-06 | First move-`-1` test patch yields unexpected result. | In Progress | `MeetingMinutes/Weekly/2024/09/2024-09-06.md:69-75` | Essential |
| 2024-09-13 | Copy issue characterization patch; explore `copyToLanguage`/`moveToLanguage`. | In Progress / Idea | `MeetingMinutes/Weekly/2024/09/2024-09-13.md:20-28` | Optional |
| 2024-09-13 | Strict mode uses default-language sorting; fallback-mode test matrix planned. | Current Core Behavior / Planned | `MeetingMinutes/Weekly/2024/09/2024-09-13.md:34-47` | Useful |
| 2024-09-20 | MM rows can connect different languages and delete other-side translation relations. | Current Core Behavior / Problem | `MeetingMinutes/Weekly/2024/09/2024-09-20.md:29-39` | Useful |
| 2024-09-20 | Default-only relations rejected; same-language sides preferred; relation parent suggested. | Preferred Direction / Idea | `MeetingMinutes/Weekly/2024/09/2024-09-20.md:41-49` | Useful |
| 2024-09-20 | Auto-close relation gaps versus preserve editorial control; new no-gap mode discussed. | Idea / Open Question | `MeetingMinutes/Weekly/2024/09/2024-09-20.md:52-60` | Essential |
| 2024-09-27 | Copy/localize semantics set `l10n_parent`, incompatible with Free mode. | Current Core Behavior / Problem | `MeetingMinutes/Weekly/2024/09/2024-09-27.md:20-40` | Useful |
| 2024-09-27 | Category gap: no relation versus hidden auto-created translation. | Open Question / Idea | `MeetingMinutes/Weekly/2024/09/2024-09-27.md:44-68` | Essential |
| 2024-10-04 | Relation-doubling diagnosis retracted; context-specific DataHandler path needed. | Problem / In Progress | `MeetingMinutes/Weekly/2024/10/2024-10-04.md:20-24` | Too Detailed |
| 2024-10-04 | Editorial-control objections to auto-creation remain. | Open Question | `MeetingMinutes/Weekly/2024/10/2024-10-04.md:26-34` | Essential |
| 2024-10-04 | Combine FE/BE tests, later add inline; prefer small test patches. | Planned | `MeetingMinutes/Weekly/2024/10/2024-10-04.md:36-44` | Too Detailed |
| 2024-10-18 | Missing relation variants should be generated hidden; sorting needs completeness. | Discussed Direction | `MeetingMinutes/Weekly/2024/10/2024-10-18.md:21-35` | Essential |
| 2024-10-18 | Full team supports closing translation gaps at all levels. | Preferred Direction | `MeetingMinutes/Weekly/2024/10/2024-10-18.md:35-37` | Essential |
| 2024-10-18 | Editable versus synchronized translations; existing `allowLanguageSynchronization`. | Current Core Behavior | `MeetingMinutes/Weekly/2024/10/2024-10-18.md:39-43` | Essential |
| 2024-10-18 | Strategy paper should obtain Core agreement and underpin funding. | Planned | `MeetingMinutes/Weekly/2024/10/2024-10-18.md:45-49` | Useful |
| 2024-10-18 | TCA pre-patch for None/Allow/Enforce sync, enum suggested. | Planned | `MeetingMinutes/Weekly/2024/10/2024-10-18.md:51-58` | Essential |
| 2024-10-18 | Self-contained language layers/no cross-language lookups are basic goal; implementation unclear and DB reshaping large. | Preferred Direction / Open Question | `MeetingMinutes/Weekly/2024/10/2024-10-18.md:60-66` | Essential |
| 2024-10-25 | Immediate filtered-language workaround preferred over waiting for generic copy fix. | Discussed Direction / In Progress | `MeetingMinutes/Weekly/2024/10/2024-10-25.md:20-32` | Too Detailed |
| 2024-10-25 | Move tests complete in patch; Free sorting failure and `Move Into` behavior proven. | In Progress / Problem | `MeetingMinutes/Weekly/2024/10/2024-10-25.md:34-42` | Useful |
| 2024-11-15 | `-1`, BCP 47, and self-contained language data receive camp interest/approval. | Discussed Direction | `MeetingMinutes/Weekly/2024/11/2024-11-15.md:20-24` | Essential |
| 2024-11-15 | Linguistic completeness named as long-term strategy anchor. | Preferred Direction | `MeetingMinutes/Weekly/2024/11/2024-11-15.md:32-36` | Essential |
| 2024-11-15 | Frontend-visible records should potentially translate; default-on TCA idea with opt-out. | Idea | `MeetingMinutes/Weekly/2024/11/2024-11-15.md:38-48` | Useful |
| 2024-11-15 | Enforcing translation fields may be too far-reaching. | Open Question | `MeetingMinutes/Weekly/2024/11/2024-11-15.md:48-50` | Useful |
| 2024-11-22 | Filtered `$pasteUpdate` workaround works but is at wrong architectural layer. | In Progress | `MeetingMinutes/Weekly/2024/11/2024-11-22.md:25-35` | Too Detailed |
| 2024-11-22 | Shared `Language All` test inventory created. | In Progress | `MeetingMinutes/Weekly/2024/11/2024-11-22.md:37-39` | Essential |
| 2024-11-29 | Workspace scenarios must be covered. | Planned | `MeetingMinutes/Weekly/2024/11/2024-11-29.md:20-26` | Useful |
| 2024-12-06 | Enable `allowLanguageSynchronization` by default for file fields; v14 break accepted. | Preferred Direction / Planned | `MeetingMinutes/Weekly/2024/12/2024-12-06.md:20-28` | Useful |
| 2024-12-06 | DataHandler initializes `l10n_state`; `custom` versus `default`; equality details open. | Discussed Direction / Open Question | `MeetingMinutes/Weekly/2024/12/2024-12-06.md:28-31` | Useful |
| 2024-12-06 | v13 correctly sets synchronized references in tested `pages.media`/`tt_content.assets`. | Implemented | `MeetingMinutes/Weekly/2024/12/2024-12-06.md:33-37` | Optional |
| 2024-12-20 | Strategy budget submitted; surveys/stakeholders/personas/current/prep/target planned. | Planned | `MeetingMinutes/Weekly/2024/12/2024-12-20.md:24-37` | Useful |
| 2024-12-20 | Fully integrated language layer recommended by Eric, not recorded as team consensus. | Idea | `MeetingMinutes/Weekly/2024/12/2024-12-20.md:37-39` | Essential |
| 2024-12-20 | Large `-1` test matrix planned but meaningful scope and maintenance remain open. | Planned / Open Question / Problem | `MeetingMinutes/Weekly/2024/12/2024-12-20.md:45-55` | Essential |
| 2024-12-20 | Incremental cleanup WIP considered alongside tests. | Discussed Direction / In Progress | `MeetingMinutes/Weekly/2024/12/2024-12-20.md:57-59` | Essential |
| 2024-12-20 | Patch 85912 considered ready to merge, not evidenced merged. | In Progress | `MeetingMinutes/Weekly/2024/12/2024-12-20.md:61-63` | Essential |

## Handoff cautions for the parent synthesis

- Use later sources to update every 2024 preference; this dossier’s “latest” means latest within the assigned 2024-H2 slice only.
- Do not conflate audience approval, initiative preference, planned strategy validation, and adopted Core strategy.
- Preserve the October shift on automatic gap closure and the correction of the inline-copy diagnosis.
- Treat the BCP-47 details, boolean all-language flag, record provenance/lifecycle, Editing Language, shadow-versus-neutral identity models, cross-site examples, and database-growth estimates as unsupported by this slice unless corroborated elsewhere.
- The cleanest T3DD26 value from 2024 H2 is the reasoning path: special values and sparse layers create concrete sorting/relation/copy complexity; completeness and synchronization emerged as a preferred simplification; tests began before destructive change; the data-growth, lifecycle, and identity design remained open.
