# T3DD26 External and Technical Validation Dossier

Validated on 2026-08-08 (Europe/Berlin).

## Scope and source hierarchy

This dossier independently validates the official T3DD26 session page and TYPO3 Gerrit change 92267, then cross-checks the relevant local meeting sources. It deliberately separates:

1. facts stated by official external sources;
2. facts and positions documented by the initiative's local minutes/transcripts;
3. analytical recommendations.

Official external sources:

- T3DD26 session page: <https://t3dd.typo3.com/schedule/sessions/translation-handling-in-typo3-where-we-are-and-where-we-could-go-1203>
- Gerrit change: <https://review.typo3.org/c/Packages/TYPO3.CMS/+/92267>
- Current Gerrit patch set validated: patch set 6, commit `719c5f26b9e92722e63d4b976fe9f16594b4d88d`
- Gerrit REST detail endpoint used: <https://review.typo3.org/changes/Packages%2FTYPO3.CMS~92267/detail?o=CURRENT_REVISION&o=CURRENT_FILES&o=ALL_REVISIONS&o=DETAILED_ACCOUNTS&o=MESSAGES>

Local source base:

`/Users/eric/docker/Translation-Handling-Initiative`

`MeetingMinutes` and `Transcripts` are primary local sources for initiative positions. `Analysis/LanguageAll-Findings.md` and files under `Drafts` are secondary working material and are not treated as proof of consensus or current Core state.

## Headline findings

- The official session page publicly commits the session framing to current complexity and uncovered needs, today's pain points, the initiative's envisioned direction, and concrete next-step topics: simplifying translation modes, BCP 47 language identification, and completing language layers. It does **not** publish a detailed architecture, a settled migration sequence, or a claim that shadow records/neutral layers are decided.
- Gerrit 92267 is currently `NEW`, `work_in_progress: true`, not submitted, and not merged. Patch set 6 was rebased by Benni Mack on 2026-08-07 and Core CI reported `Verified+1`, but the change remains not ready and lacks Code Review approval.
- Patch set 6 adds 59 `TODO` comment lines in 39 existing Core files and deletes nothing. It inventories code paths; it does **not** add characterization tests, change behavior, introduce a flag, introduce `enforceLanguageSynchronization`, or remove `-1`.
- Local `Analysis/LanguageAll-Findings.md` is stale relative to the current Gerrit patch: it identifies reference commit `2925d445...`, 48 files, and 82 entries, while current official patch set 6 has 39 files and 59 annotations. Its review/coverage/validity checkboxes remain blank. Use it as a candidate inventory only.
- The boolean replacement for `-1` is a repeatedly discussed direction, but its lifecycle is not settled. A January 2024 sketch says generated copies are deleted when the flag or page translation is removed; June 2024, August 2025, and November 2025 reopen overwrite, provenance, irreversible-toggle, orphan, soft-delete, and migration questions.
- BCP 47 is consistently a long-term direction for stable, cross-site language identity. The sources generally describe replacing numeric language storage with strings. They do **not** establish a decided dual model in which BCP 47 is merely semantic while the current numeric language IDs remain the authoritative database reference.
- Full per-language structures and a shared language-neutral structural layer are documented alternatives. An October 2025 discussion favored the shared structural layer, but May-July 2026 material still treats the structural layer as a hypothesis/prototype and presents more than one path. There is no final architecture decision.
- Free Mode deprecation/removal is not a defensible current claim. May 2026 explicitly retains Free Mode for fully independent structures, and July 2026 actively discusses Core fixes for Free/Mixed Mode. The supported public wording is “simplifying translation modes.”
- Editing Language is the preferred term and high-level editorial-context framing from May 2026; concrete selector/module behavior remains discussed, a visualization prototype was planned, and no implemented or officially committed Core feature is evidenced.

## 1. Official T3DD26 session page

### Exact facts supported

The official page's HTML session-detail block (fetched lines 558-610) supports:

| Fact | Exact official content |
|---|---|
| Speaker | Eric Harrer |
| Title | “Translation Handling in TYPO3: Where We Are and Where We Could Go” |
| Date | 08.08.2026 |
| Time | 14:00-14:30 |
| Room | Campfire Room |
| Current-state framing | Multilingual content handling is a TYPO3 strength, but the current concepts are complex and some translation needs remain uncovered. |
| Session scope | Today's pain points, the direction envisioned by the Translation Handling Initiative, and concrete next steps. |
| Named next-step topics | Simplifying translation modes, adopting BCP 47 for language identification, and completing language layers. |

### What the official page does not support

The page does not mention or establish:

- `sys_language_uid = -1` or a boolean replacement;
- `sys_language_uid = 0` removal;
- a particular DataHandler design;
- `enforceLanguageSynchronization`;
- shadow records versus a neutral structural/identity layer;
- Editing Language;
- Free Mode deprecation;
- a big-bang rewrite, release target, or migration sequence;
- an accepted database-growth/code-complexity trade-off.

Those details must be attributed to local initiative discussions or labeled as analysis, not to the public session abstract.

## 2. Official Gerrit change 92267

### Current metadata (patch set 6)

| Field | Current official value |
|---|---|
| Subject | `[WIP][TASK] Mark LanguageAll record handling` |
| Project/branch | `Packages/TYPO3.CMS`, `main` |
| Change-Id | `I5e9430a20d8b4c0284e92e56ed43df71787398c0` |
| Owner | Eric Harrer (`eric.bode`) |
| Created | 2026-01-09 11:30:48 UTC |
| Updated | 2026-08-07 15:22:31 UTC |
| Gerrit API state | `NEW` |
| WIP | `true` |
| Submitted/merged | No (`submitted: null`) |
| Current patch set | 6 |
| Current commit | `719c5f26b9e92722e63d4b976fe9f16594b4d88d` |
| Current diff size | 59 insertions, 0 deletions, 39 files |
| Latest upload | Patch set 5 uploaded by Benni Mack on 2026-08-07; patch set 6 is its rebase by Benni Mack the same day |
| CI | Gerrit message says patch set 6 received `Verified+1` from Core CI; the change nevertheless remains WIP/not ready and has no Code Review approval |
| Linked issue | None; commit footer is `Resolves: #` |

The commit message defines the scope precisely: add TODO markers to code paths that depend on persisted LanguageAll `-1`, limited to places that read, write, filter, or interpret record-language values, plus related assertions/fixtures documenting the same assumptions.

### What was actually changed

Every added code line in patch set 6 is a comment annotation. The patch does not modify executable behavior. Existing test and fixture files are touched only by added comments; no new test method, assertion, fixture row, API, migration, or TCA configuration is added.

System-extension file distribution:

| System extension | Files |
|---|---:|
| `backend` | 9 |
| `core` | 16 |
| `extbase` | 5 |
| `frontend` | 3 |
| `workspaces` | 2 |
| `filelist` | 1 |
| `impexp` | 1 |
| `rte_ckeditor` | 1 |
| `seo` | 1 |
| **Total** | **39** |

### Current-Core assumptions explicitly marked by the patch

The current patch is direct evidence that `-1` affects all of the following categories:

| Category | Exact marked behavior | Representative current patch files |
|---|---|---|
| Backend queries and display | Explicit/implicit inclusion of `-1` in Page/Layout, List, Link Browser and translation queries; view-mode-specific placement of language-all content | `backend/.../PageLayoutController.php`, `DatabaseRecordList.php`, `ContentFetcher.php`, `PageLinkHandler.php` |
| Localization source/target handling | `-1` is excluded from normal source/target collections, cannot be localized in ordinary flows, and suppresses localization UI/processing | `LocalizationController.php`, `LocalizationRepository.php`, `DownloadRecordList.php`, `core/.../DataMapProcessor.php` |
| Backend permissions | Language-all records bypass ordinary allowed-language restrictions | `core/.../BackendUserAuthentication.php` |
| Parent/relation selectors | `-1` participates in `l10n_parent`, category and test relation selectors; pages explicitly restrict the parent selector to `0` | `TcaEnrichment.php`, `TcaPreparation.php`, `core/Configuration/TCA/Overrides/pages.php` |
| DataHandler copy/paste | A source record's `-1` is preserved when pasted into a default-language context | `core/.../DataHandler.php` |
| Overlay/rendering | Language-all records bypass `PageRepository` overlaying and are included as a separate query case in frontend/Extbase rendering | `PageRepository.php`, `ContentObjectRenderer.php`, `Typo3DbQueryParser.php` |
| Slugs | A `-1` record is checked across all languages and `-1` records are included in uniqueness queries | `SlugHelper.php`, `SlugHelperUniqueWithLanguageTest.php` |
| Persistence/domain representation | Extbase and Record API objects expose/allow `-1`; a parent with `-1` changes language inheritance | `AbstractDomainObject.php`, `DataMapper.php`, `RecordFactory.php`, `AddTest.php` |
| Metadata and content consumers | Language-all participates in file metadata, category collections, sitemaps and RTE language normalization | `MetaDataRepository.php`, `CategoryCollection.php`, `RecordsXmlSitemapDataProvider.php`, `RichTextElement.php` |
| Workspaces | `-1` affects preview parameters and workspace query filtering | `PreviewUriBuilder.php`, `WorkspaceService.php` |
| Existing tests/fixtures | Current assertions and fixture configurations already encode `-1` assumptions | FlexForm/TCA tests, Extbase query tests, DataScenario actions, `test_mm` fixtures, localized rendering test |

This inventory supports the claim that replacing persisted `-1` is cross-cutting. It does not itself prove that each annotation is semantically correct, that coverage is complete, or which behavior should be preserved.

### Review history caveat

The only Gerrit comment retrieved is a resolved patch-set-level question from Benni Mack (2026-02-02): whether a class constant could be used for the `-1` occurrences. No such abstraction is introduced by patch set 6. Local minutes later distinguish literal constants from higher-level semantic helpers (`MeetingMinutes/Weekly/2026/03/13.md:41-51`).

## 3. Local-source chronology and status

### 3.1 `-1`, boolean replacement, synchronization and migration

| Date/source | Status | Supported fact |
|---|---|---|
| `MeetingMinutes/Weekly/2024/01/2024-01-19.md:32-61` | Discussed Direction | `-1` is called broken by design. A boolean on the default record plus DataHandler-created copies is proposed. Initial lifecycle sketch covers setting/editing the flag, adding/deleting page translations, and deleting generated copies when the flag is disabled. The proposed behavior is named Enforce Language Synchronization. |
| `MeetingMinutes/Weekly/2024/01/2024-01-19.md:62-67` | Open Question | Support for the proposed behavior in Free Mode is explicitly uncertain. |
| `MeetingMinutes/Weekly/2024/06/2024-06-28.md:38-73` | Open Question | The simple flag is called too short-sighted because existing translations, lead-language choice, overwrite permission, provenance and migration remain unresolved. |
| `MeetingMinutes/Weekly/2024/06/2024-06-28.md:67-82` | Idea | A content-state marker and deletion are suggested, not decided. |
| `MeetingMinutes/Weekly/2025/08/2025-08-15.md:31-53` | Discussed Direction | Record-level enforced synchronization is outlined; warnings are required for irreversible toggles; field/system-field scope differs by connected/free context. This is not implementation evidence. |
| `MeetingMinutes/Weekly/2025/08/2025-08-22.md:30-70` | Open Question | Toggle warnings should be conditional on actual data-loss risk; complex parent/child and relation cases need formal tests. |
| `MeetingMinutes/Weekly/2025/11/2025-11-28.md:47-58` | Discussed Direction | A tentative `language_sync`/`ctrl.languageSyncField` boolean is named; soft deletion and controlled restoration are suggested for synchronization-state changes. |
| `MeetingMinutes/Weekly/2025/11/2025-11-28.md:54-65` | Problem | Repeated toggling may create orphans/duplicates. Live testing confirms that switching a translated default record to `-1` leaves invalid translations. |
| `MeetingMinutes/Weekly/2026/01/09.md:61-68` | In Progress | Patch 92267 is proposed as a TODO-marker discussion base and the generated results are being prepared for review. |
| `MeetingMinutes/Weekly/2026/01/09.md:69-75` | Planned | The local sequence is markers, then dedicated tests, then helpers, then later breaking changes. |
| `MeetingMinutes/Weekly/2026/03/13.md:39-51` | Preferred Direction | Findings should identify missing tests; small use-case/extension patches are preferred over one large patch. Deliberate failures are proposed as a deterministic coverage probe. |
| `MeetingMinutes/Weekly/2026/04/24.md:29-37` | Preferred Direction | Full coverage and a real alternative should precede removal of persisted language all behavior. |
| `MeetingMinutes/Weekly/2026/04/24.md:66-75` | Open Question | The team is unsure whether complete removal is feasible and requires Core alignment on the test and migration plan. |
| `MeetingMinutes/Weekly/2026/04/24.md:49-57` | Planned | Site-configuration false positives should be removed from 92267, and related test patches should be reviewed together. |
| `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:61-76` | Discussed Direction | The alternative remains a default-record boolean. `-1` removal is described as foundational, not direct editor value. |
| `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:61-76` | Idea | A later selectable target-language list is described as a potential feature. |
| `Transcripts/2026-06-11 14-00-45 - Meeting der Initiative.txt:423-440` | Discussed Direction | Step one is the boolean replacement; the mechanism is compared with `allowLanguageSynchronization` but enforced. |
| `Transcripts/2026-06-11 14-00-45 - Meeting der Initiative.txt:423-440` | Idea | Selectable target groups are described as a later extension. |
| `MeetingMinutes/Weekly/2026/07/24.md:27-35` | Open Question | Test work is still preparation; Core responsibility/prioritization is unclear. Benni wants progress, but the initiative has no settled roadmap owner. |
| Gerrit 92267 patch set 6, 2026-08-07 | In Progress | The marker inventory was refreshed/rebased. It remains WIP and is still not a behavior or test implementation. |

Latest defensible formulation: removing persisted LanguageAll `-1` and replacing its user value with explicit synchronization is a strong discussed direction. The lifecycle, migration, provenance, overwrite rules, record-state marking, target-language creation timing and deactivation behavior remain architecture/design work.

### 3.2 `enforceLanguageSynchronization` versus existing mechanisms

Current local sources distinguish:

- `l10n_mode = exclude`: existing Core behavior that forces a field to inherit/synchronize and removes ordinary editorial editing for that field.
- `behaviour.allowLanguageSynchronization`: existing opt-in, field-level editorial choice stored through localization state.
- `enforceLanguageSynchronization`/`enforceLanguageSynchronisation`: a proposed stricter behavior in which editors cannot choose a custom target value. Early sources discuss it at field level (`MeetingMinutes/Weekly/2024/03/2024-03-01.md:118-129`); later discussions extend the idea toward record-level generation/synchronization (`MeetingMinutes/Weekly/2025/08/2025-08-15.md:31-53`; `Transcripts/2026-06-11 14-00-45 - Meeting der Initiative.txt:432-438`).

Exact latest transcript anchors:

- `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:189-202`
- `Transcripts/2026-06-11 14-00-45 - Meeting der Initiative.txt:426-440`

Caveat: the proposed name appears with both American `Synchronization` and British `Synchronisation` spellings. No official Core TCA property with that name is implemented by Gerrit 92267.

### 3.3 BCP 47 and language identity

Chronological evidence:

- `MeetingMinutes/Weekly/2023/11/2023-11-17.md:40-49`: focus narrows to language tags according to BCP 47; a separate arbitrary identifier is only a possible extension for cases BCP 47 cannot represent.
- `MeetingMinutes/Weekly/2024/01/2024-01-19.md:78-86`: shared records across sites currently require the same default language; the proposed solution changes language storage from integer to string/BCP 47 and decouples derivation chains from the default language.
- `MeetingMinutes/Weekly/2024/02/2024-02-23.md:54-62`: file translation is linked to unambiguous string-based language identity.
- `MeetingMinutes/Weekly/2025/07/2025-07-25.md:22-34`: BCP 47 is favored for system-wide identity, but locale-derived migration can be ambiguous, may need manual intervention, and UUIDs are mentioned as an alternative.
- `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:68-76`: `-1` and later `0` cleanup are described as prerequisites for BCP 47 and cross-root/file scenarios.
- `Transcripts/2026-06-11 14-00-45 - Meeting der Initiative.txt:442-458`: two paths for resolving `0` are kept visible; only after special values are resolved can integer values be converted cleanly to BCP 47 language text.
- `MeetingMinutes/Weekly/2026/07/31.md:55-61`: current tests expose both same-language/different-ID and same-ID/different-language problems; a stable descriptive identity is the strategic answer.

Unsupported leap: the local record says “replace integer storage/identifiers with strings,” not “retain current numeric language IDs as the authoritative internal mapping and add BCP 47 only as metadata.” A dual identifier model is possible analysis, but must be labeled as such unless another source establishes it.

Also keep XLIFF scope precise. `MeetingMinutes/Weekly/2024/06/2024-06-07.md:54-56` and `MeetingMinutes/Weekly/2025/04/2025-04-04.md:38` separate database-content translation handling from Localization Team/XLIFF work. BCP 47 may benefit XLIFF/file naming, but XLIFF migration is not a demonstrated consequence of Gerrit 92267.

### 3.4 `0`, structural identity, complete layers and shadow records

The sources contain two different architectural meanings that should not be collapsed:

1. **Distributed complete structures:** every language has structural representation; invisible/shadow records fill gaps.
2. **Shared neutral/hidden structure:** one language-independent or structure-only layer carries identity/order; editorial language records point to it.

Evidence and evolution:

- `MeetingMinutes/Weekly/2024/01/2024-01-19.md:78-86`: a content-free structural default layer is already considered, but complexity is uncertain.
- `MeetingMinutes/Weekly/2024/06/2024-06-28.md:110-130`: self-contained language output and even translations in every language are expressed as long-term ideas; site-configuration changes would require resynchronization. This is a mission-statement idea, not current behavior.
- `MeetingMinutes/Weekly/2025/07/2025-07-18.md:34-81`: complete per-language layers and a structure-only layer are explicitly compared; no decision is made and performance/duplication is a concern.
- `MeetingMinutes/Weekly/2025/07/2025-07-25.md:36-49`: both models remain alternatives, without a final decision.
- `MeetingMinutes/Weekly/2025/10/2025-10-24.md:43-70`: Jo favors a shared language-independent structural layer over massive per-language shadow duplication; `transOrigPointerField` would describe structure while `translationSource` describes content origin. This is a recorded preference, not implementation.
- `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:122-166`: the team reopens how much shadow duplication is acceptable and explores keeping `0` as an invisible structural layer.
- `MeetingMinutes/Weekly/2026/05/29.md:23-55`: automatically created shadow records in the hidden default layer are explored as a prototype; marking, content, sorting, UI and permissions remain open.
- `MeetingMinutes/Weekly/2026/06/11.md:52-80`: conservative default-flag and hidden-structure paths are both shown; prototype ordering may be parallel rather than strictly sequential.
- `Transcripts/2026-07-10 12-01-17 - Meeting der Initiative.txt:121-168,202-204`: the layer is explicitly called a hypothesis, while code-complexity reduction is the product/technical goal.

Terminology caveat: in May 2026 “shadow record” can mean an empty record inside the hidden `0` structural layer. In July 2025 it can mean a full distributed placeholder in every language. These are not automatically the same data model.

### 3.5 Database growth versus code complexity

The initiative's position has changed and remains open:

- `MeetingMinutes/Weekly/2024/01/2024-01-19.md:147-149` records Lolli saying database redundancy is not a modern problem.
- `MeetingMinutes/Weekly/2024/03/2024-03-01.md:131-135` calls denormalization acceptable/non-negotiable to reduce complexity.
- `MeetingMinutes/Weekly/2025/07/2025-07-18.md:56-81` reopens scale/performance concerns and compares distributed redundancy with a central structure layer.
- `Transcripts/2026-03-27 12-02-56 - Meeting der Initiative.txt:371-408,585-618` shows active disagreement and says a reliable decision on sync-created database copies is fundamental.
- `Transcripts/2026-07-10 12-01-17 - Meeting der Initiative.txt:121-168` frames the goal as reducing output/code complexity, while explicitly anticipating database-complexity objections.

Therefore “more records are an accepted price” is too strong as a current conclusion. It is a historically favored principle that later discussions reopened, especially when comparing full shadows with a neutral structure layer.

### 3.6 Editing Language

`MeetingMinutes/Weekly/2026/05/08.md:60-68` and `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:608-640` define Editing Language as:

- the language currently underlying the editing interface;
- independent from the backend UI/label language;
- a high-level, switchable context;
- potentially the primary Page Module column and Page Tree language;
- not the same as “source language,” because the latter implies copy/translation provenance.

`MeetingMinutes/Weekly/2026/05/29.md:23-55` and `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:228-298` explore using it to select which placeholders/shadows are shown. Sorting correctness may require visibility of more records than the selected Editing Language exposes.

- Status of the term and high-level editorial-context product story: **Preferred Direction**.
- Status of the described selector/module UX concept: **Discussed Direction**.
- Status of preparing sketches or a clickable prototype instead of a Core patch: **Planned**.
- Status of its exact behavior, scope and interaction model: **Open Question**.

The sources establish visualization/prototype preparation as a near-term plan, not the selector or broader concept as implemented Core work.

### 3.7 Free Mode and localization UX

The latest source-supported position is nuanced:

- May 2026 seeks a more flexible Connected Mode for the common case “mostly connected, selectively different.”
- `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:710-738` explicitly says Free Mode remains possible.
- `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:213-222` says replacing Free Mode for most partial deviations is attractive, but fully removing it is currently too bold because fully independent structures exist.
- `MeetingMinutes/Weekly/2026/07/24.md:37-75` documents active Free/Mixed Mode rendering and wizard fixes, confirming Free Mode remains current Core behavior that needs support.

Status of simplifying the Translate/Copy/Connected/Free experience while preserving relationships automatically where useful: **Discussed Direction**. The sources do not support “deprecate/remove Free Mode” as a current initiative direction.

### 3.8 Cross-site/global storage/file scenarios

Supported examples:

- Shared records across roots with different defaults are a documented problem (`MeetingMinutes/Weekly/2024/01/2024-01-19.md:78-86`).
- Current numeric IDs can mean different languages in different roots (`MeetingMinutes/Weekly/2024/03/2024-03-01.md:44-46`; `MeetingMinutes/Weekly/2026/07/31.md:55-61`).
- Global records in multilingual multisite setups require custom workarounds (`MeetingMinutes/Weekly/2025/07/2025-07-25.md:57-63`).
- A current real project uses three sites and a shared global storage area containing more translations than each individual site exposes (`MeetingMinutes/Weekly/2026/07/24.md:24-25`).
- File translation/metadata is a motivating identity use case (`MeetingMinutes/Weekly/2024/02/2024-02-23.md:54-62`; `MeetingMinutes/Weekly/2026/07/10.md:54`).

Analytical limit: BCP 47 plausibly removes semantic mapping ambiguity, but it does not by itself solve page scope, permissions, fallback, storage-page translation prerequisites, or rendering/query constraints.

## 4. Current implementation-state classification

| Claim | Status | Qualification |
|---|---|---|
| TYPO3 currently persists `-1` with special behavior across many Core areas | Current Core Behavior | Confirmed by the current Gerrit patch context. |
| TODO inventory of relevant `-1` code paths | In Progress | Gerrit 92267 is WIP at patch set 6. |
| Completeness of current characterization-test coverage | Open Question | Full protection is not established; test coverage is explicit local follow-up work. |
| Boolean replacement for language all | Discussed Direction | Gerrit 92267 does not implement it. |
| Selectable synchronization target languages | Idea | Described as a potential follow-up. |
| Record-level `enforceLanguageSynchronization` | Discussed Direction | Gerrit 92267 does not implement it. |
| BCP 47 language identity | Preferred Direction | It is a long-term direction and is not implemented by Gerrit 92267. |
| Resolution of the special semantics of `0` | Open Question | Removal and replacement architecture are not settled. |
| Hidden structural layer | Idea | It remains a hypothesis/prototype candidate. |
| Complete per-language layers | Discussed Direction | It is a publicly named session topic and a documented architectural alternative, not a decided model. |
| Editing Language term/product framing | Preferred Direction | The term and high-level editorial context were favored. |
| Editing Language selector/module behavior | Discussed Direction | Its concrete reach and interaction remain unresolved. |
| Editing Language sketch/clickable prototype | Planned | Visualization was preferred over a real Core patch at this stage. |
| Free Mode remains part of the supported model | Current Core Behavior | Current sources document ongoing Free/Mixed Mode fixes; they do not support removal as a current direction. |

## 5. Secondary local artifacts and caveats

### `Analysis/LanguageAll-Findings.md`

- Header: `Analysis/LanguageAll-Findings.md:1-10`
- Candidate findings: `Analysis/LanguageAll-Findings.md:12-93`
- Stated snapshot: commit `2925d445...`, 48 files, 82 entries.
- All review, test-coverage and validity columns are blank.
- It includes cases later classified as false positives or different semantics (for example pages/hreflang, Link Validator “no language,” and UI-only Workspaces handling; compare `MeetingMinutes/Weekly/2026/01/16.md:29-80`).
- Current official patch set 6 is narrower: 39 files/59 annotations.

Conclusion: use the table to generate questions/tests, not as a validated current Core inventory.

### `Drafts/test.md`

`Drafts/test.md:236-248` is a useful secondary summary of overlay complexity and the `-1`/`0`/BCP 47 sequence. It is a draft, cites older external material, and must not outrank later minutes or current Core/Gerrit evidence.

### `Drafts/dialogue-days.md`

This is the most relevant strategic draft:

- `Drafts/dialogue-days.md:436-446` explicitly calls the hidden structural layer a hypothesis to validate, not predetermined architecture.
- `Drafts/dialogue-days.md:637-656` places `-1`, `0`, DataHandler and BCP 47 in the technical-enabler layer.
- `Drafts/dialogue-days.md:780-790` explains why Free Mode alone does not cover partial regional deviation and again says the structural layer is only a hypothesis.

This draft is consistent with the cautious status classification above, but remains secondary.

## 6. Exact transcript hit index

The following index records all exact/variant hits from the 13 local 2026 transcript files for the requested concepts. It is an audit index, not a statement that every hit is substantively relevant. Base path: `/Users/eric/docker/Translation-Handling-Initiative/`.

### `-1` / Language All / All Languages

- `Transcripts/2026-02-13 12-00-52 - Meeting der Initiative.txt`: 477, 511
- `Transcripts/2026-02-20 12-00-16 - Meeting der Initiative.txt`: 48, 122, 195, 252, 394
- `Transcripts/2026-03-13 12-00-26 - Meeting der Initiative.txt`: 138, 442, 450, 452, 455, 458, 471, 477, 480, 485, 502, 529, 538, 544, 547, 619, 640, 645, 668, 694, 720, 730
- `Transcripts/2026-03-20 12-11-52 - Meeting der Initiative.txt`: 14, 50, 68, 72, 74, 96, 104, 108, 148, 154, 170, 178, 180, 190, 202, 204, 206, 208, 220, 268
- `Transcripts/2026-03-27 12-02-56 - Meeting der Initiative.txt`: 448, 456, 458
- `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt`: 136, 138, 147, 150, 152, 154, 156, 176, 178, 232, 234, 236, 248, 252, 260, 294, 296, 298, 302, 308, 316, 318, 320, 322, 324, 326, 338, 344, 348, 350, 354, 356, 358, 360, 362, 370, 373, 376, 398, 420, 422, 424, 426, 437, 439, 462
- `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt`: 48, 50, 59, 64, 68, 70, 72, 127, 132, 143, 149, 169, 175, 178, 189, 194, 208, 215, 224, 517, 706, 708, 711, 714, 716, 718, 734, 736
- `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt`: 183, 248, 353, 377, 380, 386, 776
- `Transcripts/2026-06-11 14-00-45 - Meeting der Initiative.txt`: 412, 414, 416, 418, 424, 432, 434, 442, 450, 452, 458
- `Transcripts/2026-06-26 12-00-22 - Meeting der Initiative.txt`: 278, 280, 284, 286, 288, 290
- `Transcripts/2026-07-10 12-01-17 - Meeting der Initiative.txt`: 103, 106, 122, 156, 184, 392, 494, 498
- `Transcripts/2026-07-24 12-01-03 - Meeting der Initiative.txt`: 45, 110, 118, 136, 144, 146
- `Transcripts/2026-07-31 11-32-06 - Meeting der Initiative.txt`: 80, 124, 130, 218, 265, 269, 279

### BCP / BCP 47

- `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt`: 74, 143
- `Transcripts/2026-06-11 14-00-45 - Meeting der Initiative.txt`: 450, 452, 458
- `Transcripts/2026-06-26 12-00-22 - Meeting der Initiative.txt`: 294

### Language `0` / Default Language variants

- `Transcripts/2026-02-13 12-00-52 - Meeting der Initiative.txt`: 479, 533, 696, 699, 701, 728, 752
- `Transcripts/2026-02-20 12-00-16 - Meeting der Initiative.txt`: 169, 191, 193, 195, 238, 284, 324
- `Transcripts/2026-03-13 12-00-26 - Meeting der Initiative.txt`: 138, 647
- `Transcripts/2026-03-20 12-11-52 - Meeting der Initiative.txt`: 2, 68, 72, 88, 108, 148, 228, 230
- `Transcripts/2026-03-27 12-02-56 - Meeting der Initiative.txt`: 600, 602
- `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt`: 186, 324, 346, 348, 356, 370
- `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt`: 68, 145, 147, 197, 618
- `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt`: 55, 61, 80, 204, 264, 280, 305, 635
- `Transcripts/2026-06-11 14-00-45 - Meeting der Initiative.txt`: 32, 43, 108, 114, 144, 452, 458
- `Transcripts/2026-06-26 12-00-22 - Meeting der Initiative.txt`: 292, 294, 515, 517
- `Transcripts/2026-07-24 12-01-03 - Meeting der Initiative.txt`: 75, 77, 170, 172, 176, 186, 190, 246, 273, 356, 558, 590
- `Transcripts/2026-07-31 11-32-06 - Meeting der Initiative.txt`: 8, 133, 135, 168, 185, 191, 226, 277

### Editing Language

- `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt`: 615, 626, 631, 633, 638
- `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt`: 228, 230, 232, 234, 248, 256, 262, 264, 266, 278, 280, 298

### Free/Connected/Translate Mode variants

- `Transcripts/2026-02-13 12-00-52 - Meeting der Initiative.txt`: 11, 19, 27, 29, 33, 69, 73, 75, 77, 81, 121, 297, 299, 439, 441, 445, 781
- `Transcripts/2026-03-13 12-00-26 - Meeting der Initiative.txt`: 142, 210
- `Transcripts/2026-03-20 12-11-52 - Meeting der Initiative.txt`: 48
- `Transcripts/2026-03-27 12-02-56 - Meeting der Initiative.txt`: 432
- `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt`: 242, 324, 373
- `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt`: 89, 147, 721, 723, 738
- `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt`: 34, 213, 216, 218, 220, 664, 682, 714, 716
- `Transcripts/2026-06-11 14-00-45 - Meeting der Initiative.txt`: 106, 213
- `Transcripts/2026-06-26 12-00-22 - Meeting der Initiative.txt`: 339
- `Transcripts/2026-07-24 12-01-03 - Meeting der Initiative.txt`: 170, 176, 212, 262, 264, 296, 298, 352, 422, 424, 429, 455
- `Transcripts/2026-07-31 11-32-06 - Meeting der Initiative.txt`: 177

### Shadow / structural/language-layer variants

- `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt`: 92, 122, 132, 137, 281, 734
- `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt`: 30, 32, 34, 106, 108, 144, 220, 228, 234, 240, 375, 398, 402, 433, 446, 448
- `Transcripts/2026-06-11 14-00-45 - Meeting der Initiative.txt`: 408, 410, 414, 416, 418, 452, 458
- `Transcripts/2026-06-26 12-00-22 - Meeting der Initiative.txt`: 294, 296
- `Transcripts/2026-07-10 12-01-17 - Meeting der Initiative.txt`: 202, 204

### `enforceLanguageSynchronization` variants

- `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt`: 192
- `Transcripts/2026-06-11 14-00-45 - Meeting der Initiative.txt`: 434

### Database/code-complexity trade-off variants

- `Transcripts/2026-02-13 12-00-52 - Meeting der Initiative.txt`: 803, 834
- `Transcripts/2026-03-27 12-02-56 - Meeting der Initiative.txt`: 334, 380, 382, 398, 608
- `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt`: 370
- `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt`: 140, 232
- `Transcripts/2026-06-11 14-00-45 - Meeting der Initiative.txt`: 286
- `Transcripts/2026-06-26 12-00-22 - Meeting der Initiative.txt`: 534, 542, 550, 678, 725, 749
- `Transcripts/2026-07-10 12-01-17 - Meeting der Initiative.txt`: 122, 160
- `Transcripts/2026-07-24 12-01-03 - Meeting der Initiative.txt`: 324
- `Transcripts/2026-07-31 11-32-06 - Meeting der Initiative.txt`: 139

Some entries in the final subsection are ordinary database/debugging references rather than the architecture trade-off. The substantive trade-off anchors are `Transcripts/2026-03-27 12-02-56 - Meeting der Initiative.txt:380-408,585-618` and `Transcripts/2026-07-10 12-01-17 - Meeting der Initiative.txt:121-168`.

## 7. Analytical recommendations (not initiative decisions)

1. **Use the official abstract as the outer contract.** The session should visibly cover mode simplification, BCP 47 and complete language layers, but can present `-1`, `0`, shadow records and Editing Language as the technical reasoning beneath those headings.
2. **Describe Gerrit 92267 as “inventory/annotation work,” not “tests implemented.”** A truthful slide can say: 39 files across nine system extensions, 59 marked assumptions, current WIP patch set 6. Follow with “the next job is review and test coverage.”
3. **Separate semantic direction from storage design.** Say “stable descriptive language identity, with BCP 47 as the favored standard.” Do not assert that numeric IDs remain or disappear at every storage/API level until that architecture is decided.
4. **Keep three structure models distinct:** current sparse/overlay model, distributed complete layers with shadows, and shared neutral structural layer. Show that later discussions may combine a hidden structure layer with shadow-like placeholder nodes, but that this does not make the alternatives identical.
5. **Present the database/code question as an open engineering decision with history.** Earlier meetings accepted denormalization strongly; later meetings reopened scale and synchronization costs. A proof of concept should measure record growth, query count, write amplification, workspace/version/reference-index effects, and editor UI density.
6. **Treat synchronization toggling as a migration/state-machine problem.** Before implementation, define generated-record provenance, ownership, target-language membership, activation/deactivation transitions, idempotence, soft-delete/restoration, conflict handling, and warnings based on actual loss.
7. **Retain Free Mode as the explicit fully-independent endpoint.** The product goal is to reduce how often editors are forced into it for one local deviation, not to claim that independence has no legitimate use.
8. **Prototype Editing Language and structural placement together.** Placeholder filtering without a reliable ordering view can make move/create operations ambiguous. UX prototypes should include Page Tree, Layout/Page Module, List Module, permissions and multi-language sorting.
9. **Use a non-linear evolution graph:** inventory/review and characterization tests can proceed in parallel with UX/data-model prototypes. Functional replacement depends on architecture and migration decisions; BCP 47 migration depends on resolving special-value semantics and ambiguous site mappings.

## 8. Claims to avoid

- “Gerrit 92267 implements tests for removing `-1`.”
- “The `-1` replacement is already implemented.”
- “The Core has decided on complete shadow-record layers.”
- “The hidden/neutral structural layer is the decided architecture.”
- “Free Mode will be deprecated.”
- “BCP 47 is already the record-language storage format.”
- “Existing numeric language IDs will definitely remain as internal database references.”
- “Activating/deactivating the synchronization flag has a settled safe behavior.”
- “The database-growth trade-off has been finally accepted.”
- “Site Configuration languages should be used to test `-1`.” They cannot be `-1`; local sources explicitly removed that scope (`MeetingMinutes/Weekly/2026/04/24.md:49-53`).
