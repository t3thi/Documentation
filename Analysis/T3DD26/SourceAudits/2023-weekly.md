# T3DD26 source dossier: `MeetingMinutes/Weekly/2023`

## Scope and audit method

- Audited subtree: `MeetingMinutes/Weekly/2023`
- Inclusion rule: every `*.md` file below the subtree, read from first through last logical line.
- Exclusion: `.DS_Store` (not Markdown and explicitly excluded by the task).
- Corpus: 9 Markdown files. The evidence below uses repository-relative paths and one-based line numbers from the files as audited.
- Status vocabulary is restricted to the ten requested labels: `Current Core Behavior`, `Problem`, `Idea`, `Discussed Direction`, `Preferred Direction`, `Open Question`, `Planned`, `In Progress`, `Implemented`, `Analytically Derived Recommendation`.
- This dossier distinguishes what the 2023 minutes actually say from later concepts named in the T3DD26 brief. In particular, absence statements below mean “not found in this fully reviewed 2023 weekly-minutes corpus,” not “never discussed anywhere in the initiative.”

## Complete reviewed-file manifest

| Reviewed file | Date in document | Logical line span | T3DD26 relevance assessment |
| --- | --- | ---: | --- |
| `MeetingMinutes/Weekly/2023/10/2023-10-27.md` | 2023-10-27 | 1–146 | High: current modes, `l18n_parent`/translation-parent relation, overlays, fallback-chain defect, `0`/`-1`, migration idea. |
| `MeetingMinutes/Weekly/2023/11/2023-11-03.md` | 2023-11-03 | 1–73 | High: strict/free behavior, divergent output paths, test matrix, language/country abstraction and fallback use cases. |
| `MeetingMinutes/Weekly/2023/11/2023-11-10.md` | 2023-11-10 | 1–53 | High: cross-site language identity, file metadata, BCP 47, dimensions alternative, structural/cache tables and database/code trade-off. |
| `MeetingMinutes/Weekly/2023/11/2023-11-17.md` | 2023-11-17 | 1–56 | High: Free/Connected switch, BCP 47 versus publishing channels, arbitrary variants, separate output/overlay tables, test extension. |
| `MeetingMinutes/Weekly/2023/11/2023-11-24.md` | 2023-11-24 | 1–44 | Medium/high: BCP-47 validation, Free/Connected implementation shape, survey decision points, reproducible test infrastructure. |
| `MeetingMinutes/Weekly/2023/12/2023-12-01.md` | 2023-12-01 | 1–50 | Low/indirect: no new technical model; documents the survey-based validation process and alternation between Core analysis and survey work. |
| `MeetingMinutes/Weekly/2023/12/2023-12-15.md` | 2023-12-15 | 1–395 | Very high: detailed Core-path analysis, `0`/`-1`, `l10n_parent`, four overlay types, Extbase/non-Extbase divergence, input/output mismatch, centralization proposal and investigation backlog. |
| `MeetingMinutes/Weekly/2023/12/2023-12-22.md` | 2023-12-22 | 1–152 | Very high: implemented testing extension, fallback matrices, numeric-ID test design, DataHandler `copyToLanguage`/`copy`, inline relations, content-mode combinations and TransFusion dependency. |
| `MeetingMinutes/Weekly/2023/12/2023-12-29.md` | 2023-12-29 | 1–70 | High: `PageRepository`, language ID versus content ID, ordering/workarounds, central fallback class and need for Core-developer validation. |

No Markdown file in the subtree was omitted. All nine files contain at least indirect initiative context; `2023-12-01.md` is the only one without direct technical behavior or architecture evidence.

## Exhaustive evidence ledger

### 2023-10-27

| ID | Status | Finding | Exact source |
| --- | --- | --- | --- |
| 2023-01 | Planned | The initiative expects that achieving its goals will eventually require Core breaking changes and treats continuous explanation/community acceptance as part of that work. This is intent, not a concrete migration plan. | `MeetingMinutes/Weekly/2023/10/2023-10-27.md:22-24` (2023-10-27) |
| 2023-02 | Current Core Behavior | Site-language `strict` applies only to the selected language: unavailable elements are not shown and no other-language/default/fallback-chain substitution occurs. The minute records that a project-specific override caused earlier disagreement. | `MeetingMinutes/Weekly/2023/10/2023-10-27.md:35-41` (2023-10-27) |
| 2023-03 | Problem | In the observed `fallback` behavior, content ultimately falls back to the default language regardless of which languages were intentionally selected in the chain. The concrete en-GB/de-DE/de-AT scenario shows why an unwanted English result should be stoppable. | `MeetingMinutes/Weekly/2023/10/2023-10-27.md:43-48` (2023-10-27) |
| 2023-04 | Idea | A proposed correction is to output only languages explicitly present in the fallback chain, with the default language optional. A hypothetical upgrade wizard would insert the default language where absent to preserve old behavior, after which users could remove it. The conditional wording does not establish implementation. | `MeetingMinutes/Weekly/2023/10/2023-10-27.md:49-51` (2023-10-27) |
| 2023-05 | Current Core Behavior | Backend creation modes are distinguished from frontend output modes. Backend `Free` means no content element is connected to a default-language element; `Connected` means every element is connected and sorted according to the default language; `Mixed` is any mixture. | `MeetingMinutes/Weekly/2023/10/2023-10-27.md:53-68` (2023-10-27) |
| 2023-06 | Current Core Behavior | The connection is represented through the TCA `transOrigPointerField`; the minute spells the `tt_content` field as `l18n_parent` and says the non-default record stores the UID of its default-language counterpart. That spelling must not be silently treated as proof of a differently named field; the later 2023 analysis explicitly uses `l10n_parent`. | `MeetingMinutes/Weekly/2023/10/2023-10-27.md:69-69` (2023-10-27) |
| 2023-07 | Current Core Behavior | Frontend `Fallback` overlays from the fallback chain and ultimately retains default-language content; `Strict` shows only selected-language overlays but also floating records with no default connection; frontend `Free` fetches records directly for the selected language without overlay relation checks. Backend and frontend both use the word “Free” for different concepts. | `MeetingMinutes/Weekly/2023/10/2023-10-27.md:71-77` (2023-10-27) |
| 2023-08 | Current Core Behavior | `LanguageAspectFactory::createFromSiteLanguage()` maps three configurable fallback types to underlying overlay behavior: `free` → `OVERLAYS_OFF`, `fallback` → `OVERLAYS_MIXED`, `strict` → `OVERLAYS_ON_WITH_FLOATING`; an additional default branch sets order `[0]` and overlays off. | `MeetingMinutes/Weekly/2023/10/2023-10-27.md:79-107` (2023-10-27) |
| 2023-09 | Current Core Behavior | The inspected `LanguageAspect` documentation describes the traditional overlay process as fetching language `0` and `-1`, then either hiding untranslated defaults, keeping them, disabling overlays, or including floating records. It enumerates four constants even though only three modes are exposed in site configuration. | `MeetingMinutes/Weekly/2023/10/2023-10-27.md:109-139` (2023-10-27) |
| 2023-10 | Open Question | The group is puzzled why three UI fallback types are transformed into four code-level behaviors and why all four cannot be selected directly. | `MeetingMinutes/Weekly/2023/10/2023-10-27.md:140-140` (2023-10-27) |
| 2023-11 | Planned | Jo and Astrid intend to inspect the relevant code in detail for the next meeting. | `MeetingMinutes/Weekly/2023/10/2023-10-27.md:142-142` (2023-10-27) |

### 2023-11-03

| ID | Status | Finding | Exact source |
| --- | --- | --- | --- |
| 2023-12 | Current Core Behavior | The follow-up states that `strict` visibility is influenced by the default-language connection, yet selected-language records without a default-language parent are also displayed; `free` output is not influenced by the default language. | `MeetingMinutes/Weekly/2023/11/2023-11-03.md:29-35` (2023-11-03) |
| 2023-13 | Problem | Navigation, content, and Extbase may produce different output for the same language/fallback setup. This undermines a single predictable model. | `MeetingMinutes/Weekly/2023/11/2023-11-03.md:37-42` (2023-11-03) |
| 2023-14 | Planned | The group proposes systematic investigation through an automatically generated test setup with at least three languages, multiple root sites, chains/no chains, and roots for `strict`, `fallback`, and `free`. Language URL segments are chosen initially to avoid unrelated multi-domain login issues. | `MeetingMinutes/Weekly/2023/11/2023-11-03.md:43-50` (2023-11-03) |
| 2023-15 | Discussed Direction | An environment-independent `translation-handling` testing extension is raised as potentially more useful than only a DDEV auto-installation script; the exact route remains for the next meeting. | `MeetingMinutes/Weekly/2023/11/2023-11-03.md:45-51` (2023-11-03) |
| 2023-16 | Idea | Fictional languages are considered as an abstraction that avoids premature language/country arguments. The discussion separately recognizes country variants, target groups, plain-language variants, and languages not bounded to a country. | `MeetingMinutes/Weekly/2023/11/2023-11-03.md:53-59` (2023-11-03); `MeetingMinutes/Weekly/2023/11/2023-11-03.md:67-67` (2023-11-03) |
| 2023-17 | Idea | The practical fallback use case is reuse across related variants (for example de-AT falling back to de-DE) so common German content need not be maintained twice. The direction of inheritance must fit the project and fallback may be disproportionate if only a few elements differ. | `MeetingMinutes/Weekly/2023/11/2023-11-03.md:61-67` (2023-11-03) |
| 2023-18 | Idea | Shopware is considered as a comparison: it always uses connected mode and enables default inheritance to be disabled per field across output channels/language levels. This is evidence for a possible UX/model reference, not a TYPO3 decision. | `MeetingMinutes/Weekly/2023/11/2023-11-03.md:69-73` (2023-11-03) |

### 2023-11-10

| ID | Status | Finding | Exact source |
| --- | --- | --- | --- |
| 2023-19 | Discussed Direction | Language tags would eliminate language-ID mapping when transferring/reusing language-bound data across root sites or instances. They would also make translated global file metadata assignable unambiguously when the same language currently has different numeric identifiers. | `MeetingMinutes/Weekly/2023/11/2023-11-10.md:30-34` (2023-11-10) |
| 2023-20 | Preferred Direction | A node-based database is considered potentially better suited to structural dependencies but rejected as unrealistic because of massive TYPO3 changes. For the time being, the group explicitly agrees to use existing tables for structural information, despite many unused fields. | `MeetingMinutes/Weekly/2023/11/2023-11-10.md:35-37` (2023-11-10) |
| 2023-21 | Idea | Instead of extending source tables, automatically cloned “cache” tables could hold a transformed, output-optimized language representation. Generation might be asynchronous through Symfony Messenger and automatic per record table, avoiding extension-author work. The group wants feedback from more developers. | `MeetingMinutes/Weekly/2023/11/2023-11-10.md:39-41` (2023-11-10) |
| 2023-22 | Discussed Direction | Separating the structural layer—whether in cache tables or existing tables—could double or triple data volume. The minute records the current belief that this would not cause a significant measurable performance restriction and that simpler queries/caching could improve performance. Treat this as a 2023 discussion claim, not measured evidence. | `MeetingMinutes/Weekly/2023/11/2023-11-10.md:43-45` (2023-11-10) |
| 2023-23 | In Progress | A translatable page-tree prototype already manipulates page-tree JSON to provide selectable source- and target-language labels. SVG/JavaScript work is next; TypeScript expertise is missing and the initial logic is in vanilla JavaScript for later conversion. | `MeetingMinutes/Weekly/2023/11/2023-11-10.md:47-49` (2023-11-10) |
| 2023-24 | Preferred Direction | General freely selectable “dimensions” were considered, but implementation remained unclear. To constrain scope and rely on a standard string, the group decides to proceed for now with BCP-47 language tags; dimensions may be introduced later. | `MeetingMinutes/Weekly/2023/11/2023-11-10.md:51-53` (2023-11-10) |

### 2023-11-17

| ID | Status | Finding | Exact source |
| --- | --- | --- | --- |
| 2023-25 | Planned | A prototype provisionally called “TransFusion” is proposed to switch between Free and Connected mode in the backend. Required modernization constraints include Lit and replacing jQuery with JavaScript/TypeScript. Funding is being sought; this is not evidence of a Core implementation. | `MeetingMinutes/Weekly/2023/11/2023-11-17.md:20-31` (2023-11-17) |
| 2023-26 | Open Question | Whether the Free/Connected conversion prototype should transform child relations such as FAL relations remains under discussion. | `MeetingMinutes/Weekly/2023/11/2023-11-17.md:32-32` (2023-11-17) |
| 2023-27 | In Progress | A `t3thi` GitHub organization and an initial Translation Handling Extension based on the Style Guide Extension exist. Its intended role is to accumulate reproducible test cases and communicate ideas internally and externally. | `MeetingMinutes/Weekly/2023/11/2023-11-17.md:37-38` (2023-11-17) |
| 2023-28 | Preferred Direction | Publishing channels and language identity are judged to represent different dimensions: delivery channel versus content variation. Publishing channels are deferred, while work concentrates on BCP-47 language tags. | `MeetingMinutes/Weekly/2023/11/2023-11-17.md:40-45` (2023-11-17) |
| 2023-29 | Idea | An additional arbitrary identifier field could cover custom variants not expressible through BCP 47. It should only participate in SQL when needed to protect default query complexity. | `MeetingMinutes/Weekly/2023/11/2023-11-17.md:46-47` (2023-11-17) |
| 2023-30 | Planned | The survey is intended to establish whether enough users need non-BCP-47 variants; if needed, the capability might instead live in a non-Core extension. | `MeetingMinutes/Weekly/2023/11/2023-11-17.md:48-49` (2023-11-17) |
| 2023-31 | Open Question | Separate tables for frontend-output state and even separate language-overlay tables analogous to the former `pages_language_overlay` are still being explored; there is explicitly no final conclusion. | `MeetingMinutes/Weekly/2023/11/2023-11-17.md:51-56` (2023-11-17) |

### 2023-11-24

| ID | Status | Finding | Exact source |
| --- | --- | --- | --- |
| 2023-32 | Discussed Direction | The group discusses complete language/variant coverage and points to a BCP-47 validator and the IANA Language Subtag Registry as validation/current-information sources. This supports standards-based tags but is not a Core schema decision. | `MeetingMinutes/Weekly/2023/11/2023-11-24.md:20-23` (2023-11-24) |
| 2023-33 | Planned | Because of Page-module TypeScript constraints, the Free/Connected switch will probably be implemented in a separate module, independent of Page-module contexts. | `MeetingMinutes/Weekly/2023/11/2023-11-24.md:25-28` (2023-11-24) |
| 2023-34 | Planned | The survey may explicitly ask whether language information belongs in dedicated tables or the record tables; this shows the storage question is being sent for validation, not settled. | `MeetingMinutes/Weekly/2023/11/2023-11-24.md:30-36` (2023-11-24) |
| 2023-35 | Planned | The test extension is intended to make reproductions easy, potentially support automated tests, gradually include every discussed case, and reset altered data to a known state. The group also wants environment and extension repositories. | `MeetingMinutes/Weekly/2023/11/2023-11-24.md:38-44` (2023-11-24) |

### 2023-12-01

| ID | Status | Finding | Exact source |
| --- | --- | --- | --- |
| 2023-36 | In Progress | Existing community feedback, weighted by target group and sentiment, is being transformed into concise survey questions; the group intends team review after the question pool is complete. This is relevant as the validation mechanism for unresolved architecture/UX choices, not direct Core evidence. | `MeetingMinutes/Weekly/2023/12/2023-12-01.md:27-42` (2023-12-01) |
| 2023-37 | Discussed Direction | Core analysis and survey work are to alternate for the time being because each requires substantial discussion time. | `MeetingMinutes/Weekly/2023/12/2023-12-01.md:49-50` (2023-12-01) |

### 2023-12-15

| ID | Status | Finding | Exact source |
| --- | --- | --- | --- |
| 2023-38 | Current Core Behavior | Site configuration exposes three fallback types. `LanguageAspectFactory` maps `free` to overlays off, `fallback` to mixed overlays, `strict` to overlays-on-with-floating, and its otherwise-unreachable GUI default branch to fallback order `[0]` with overlays off. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:20-55` (2023-12-15) |
| 2023-39 | Current Core Behavior | The factory’s `default` branch cannot be selected in the backend GUI; it has no fallback and otherwise behaves like `free`, returning current-language content or nothing. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:57-65` (2023-12-15) |
| 2023-40 | Current Core Behavior | In site `free`, a configured fallback can substitute another existing numeric content-language ID when the requested language does not exist. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:67-70` (2023-12-15) |
| 2023-41 | Open Question | Handling of “Language All” (`-1`) is not explained at the factory level; the group notes that `-1` is not the requested language. No abolition/replacement proposal is made here. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:69-71` (2023-12-15) |
| 2023-42 | Current Core Behavior | In `fallback`, default-language records are fetched first as the base for requested-language translations. If no requested translation exists, the default record remains, hence `OVERLAYS_MIXED`. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:73-80` (2023-12-15) |
| 2023-43 | Current Core Behavior | Current `strict` largely follows `fallback` but removes content absent in the requested language; because it maps to `OVERLAYS_ON_WITH_FLOATING`, it still includes selected-language records whose `tt_content.l10n_parent` does not point to a default-language record. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:81-85` (2023-12-15) |
| 2023-44 | Current Core Behavior | `LanguageAspect` defines four constants: off, mixed, on, and on-with-floating. `OVERLAYS_ON` and `OVERLAYS_ON_WITH_FLOATING` both derive from historical `hideNonTranslated`, but only the latter includes records without a default translation parent. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:86-100` (2023-12-15) |
| 2023-45 | Problem | The fourth behavior (`OVERLAYS_ON`) is not configurable in site configuration, while the mode labeled `strict` actually permits floating records and therefore does not match what the group expects from documentation/name. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:98-104` (2023-12-15) |
| 2023-46 | Preferred Direction | The group says current `strict` should be split into a real strict mode (`OVERLAYS_ON`) and strict-with-floating (`OVERLAYS_ON_WITH_FLOATING`), while exact names remain open. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:100-104` (2023-12-15) |
| 2023-47 | Problem | “Mixed” is overloaded: `OVERLAYS_MIXED` means mixed source-language output, while Page-module Mixed Mode means a mixture of records with and without default-language relations. The latter semantically resembles floating behavior. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:106-109` (2023-12-15) |
| 2023-48 | Current Core Behavior | Extbase `Typo3DbQueryParser::getLanguageStatement()` returns current-content-language plus `-1` when a table lacks a translation-parent field, when content ID is falsy, or when overlays are disabled. This is the concrete 2023 evidence that `-1` is hard-coded into query selection. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:111-154` (2023-12-15) |
| 2023-49 | Current Core Behavior | For `OVERLAYS_MIXED`, Extbase adds default-language (`0`) records that are not referenced as translation parents by a record in the current content language; thus fallback selection is expressed through a subquery over parent UIDs and `0`. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:155-181` (2023-12-15) |
| 2023-50 | Problem | The initiative considers `getLanguageStatement()` questionable and suspects it as the source of numerous Extbase-specific translation problems. This is a diagnosis/hypothesis, not a proven root cause. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:181-184` (2023-12-15) |
| 2023-51 | Current Core Behavior | Obsolete Extbase `Typo3QuerySettings::setLanguageOverlayMode()` can map `hideNonTranslated` to `OVERLAYS_ON`, although that behavior is unavailable in site configuration; its getter collapses both on and on-with-floating back to `hideNonTranslated`. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:185-229` (2023-12-15) |
| 2023-52 | Open Question | Because those query-setting APIs are scheduled for removal in TYPO3 13, the group needs to verify whether the inconsistencies are actually removed and inspect the v13 alternative. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:210-231` (2023-12-15) |
| 2023-53 | Current Core Behavior | Extbase’s persistence backend can re-fetch a default record after directly loading a localized record, then reapply an overlay. For non-pages it may fake a default record by replacing the UID with `transOrigPointerField` and language with `0`; otherwise it preserves the localized UID separately while exposing the parent UID. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:233-249` (2023-12-15); `MeetingMinutes/Weekly/2023/12/2023-12-15.md:274-297` (2023-12-15) |
| 2023-54 | Current Core Behavior | In the inspected flow, workspace overlay (`versionOL`) occurs before conditional language overlay. Pages and other tables then take distinct paths. This is the only explicit 2023 weekly-minutes evidence involving workspaces; it contains no proposed workspace migration design. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:257-286` (2023-12-15) |
| 2023-55 | Problem | The minute characterizes the localized-record round-trip and forced default-language representation as signs of an earlier break/hack, and suspects the pages/non-pages split may partly be residue from `pages_language_overlay` or the rule that pages require a default-language record. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:245-255` (2023-12-15); `MeetingMinutes/Weekly/2023/12/2023-12-15.md:278-285` (2023-12-15) |
| 2023-56 | Open Question | With `respectSysLanguage` disabled, Extbase can retrieve multiple languages in one query. The group questions whether that is desirable and why the setting is evaluated inside an overlay method. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:300-306` (2023-12-15) |
| 2023-57 | Current Core Behavior | Non-Extbase `ContentObjectRenderer::getLanguageRestriction()` begins overlay queries from language `0` and `-1`; on-with-floating can additionally select current-language records whose localization parent is `0`. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:308-342` (2023-12-15) |
| 2023-58 | Problem | “Free” in this code path means a translation without default parent, not the site `free` mode. Moreover, selected site `strict` returns such floating records, again contradicting the group’s/documentation’s expectation. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:344-347` (2023-12-15) |
| 2023-59 | Problem | Extbase and non-Extbase language processing differ significantly and should be functionally aligned, but changing long-used Extbase oddities directly would be breaking. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:349-355` (2023-12-15) |
| 2023-60 | Problem | Backend connection mode can vary by page/language, while frontend output behavior is fixed at site-root level. The group calls this input/output mismatch “Broken by Design.” | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:356-359` (2023-12-15) |
| 2023-61 | Preferred Direction | The initiative is striving to harmonize backend input and frontend output. A community decision is still needed on whether the control belongs at page/language level or centrally at site root. If a single source of truth is chosen, content creation should consistently follow the site setting. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:356-362` (2023-12-15) |
| 2023-62 | Idea | Site configuration could act as the default while TSconfig provides page/language-level exceptions, preserving flexibility without abandoning a central default. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:363-364` (2023-12-15) |
| 2023-63 | Planned | Two short-term site-configuration changes are named: correctly rename/describe the existing on-with-floating “strict” option and expose `OVERLAYS_ON` as a real strict mode. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:365-369` (2023-12-15) |
| 2023-64 | Discussed Direction | A feature switch and central class could make fallback behavior uniform across contexts; the old branch would later be deprecated rather than maintained twice. Encapsulation is expected to simplify later changes. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:370-378` (2023-12-15) |
| 2023-65 | Planned | Further investigation is explicitly assigned to Extbase persistence and `PageRepository`. Overlay consumers to audit include content, pages, menus, sitemap, links, and possibly slug generation, each with differing requirements. | `MeetingMinutes/Weekly/2023/12/2023-12-15.md:380-395` (2023-12-15) |

### 2023-12-22

| ID | Status | Finding | Exact source |
| --- | --- | --- | --- |
| 2023-66 | Implemented | The Translation Handling Testing Extension exists to test language fallback types systematically and was developed against TYPO3 main/13.0. | `MeetingMinutes/Weekly/2023/12/2023-12-22.md:20-24` (2023-12-22) |
| 2023-67 | Open Question | TYPO3 12 compatibility is intended but still untested. | `MeetingMinutes/Weekly/2023/12/2023-12-22.md:22-24` (2023-12-22) |
| 2023-68 | Implemented | Its console command can create/delete page trees for `fallback`, `strict`, `free`, or all three; deletion deliberately uses DataHandler/soft-delete rather than `TRUNCATE`, and repeated execution detects existing trees. | `MeetingMinutes/Weekly/2023/12/2023-12-22.md:30-56` (2023-12-22) |
| 2023-69 | Implemented | The test fixture currently hard-codes English as default, one language falling back to default, another falling back through a non-default language to default, German DE without a chain, and German AT falling back to German DE. | `MeetingMinutes/Weekly/2023/12/2023-12-22.md:58-69` (2023-12-22) |
| 2023-69a | Current Core Behavior | The group records that a fallback chain beginning with default language `0` has no real use because the default language always exists. | `MeetingMinutes/Weekly/2023/12/2023-12-22.md:72-73` (2023-12-22) |
| 2023-70 | Planned | To avoid assumptions, test languages will be renamed to colors. Numeric language IDs will vary in both ordering directions to expose accidental sorting, and a longer non-default fallback chain will be added. A Core re-sort would be treated as a bug. | `MeetingMinutes/Weekly/2023/12/2023-12-22.md:70-77` (2023-12-22) |
| 2023-71 | Planned | The frontend should visibly expose the active language/fallback configuration through names, an information bar, or content so test results are interpretable. | `MeetingMinutes/Weekly/2023/12/2023-12-22.md:79-81` (2023-12-22) |
| 2023-72 | Implemented | The extension dynamically creates/overwrites site configuration for generated roots and uses narrowly scoped TSconfig to keep copied pages/content visible and labels manageable during testing. | `MeetingMinutes/Weekly/2023/12/2023-12-22.md:83-112` (2023-12-22) |
| 2023-73 | Idea | Passing language configuration as JSON to the command is considered to make the test matrix flexible. | `MeetingMinutes/Weekly/2023/12/2023-12-22.md:114-116` (2023-12-22) |
| 2023-74 | Planned | At minimum, test content should cover menu content, shortcuts, and FlexForm-using content because each has special translation rules. Content Blocks are a possible standards-aligned implementation vehicle later. | `MeetingMinutes/Weekly/2023/12/2023-12-22.md:118-133` (2023-12-22) |
| 2023-75 | Problem | Third-party extensions may override, supplement, or correct Core translation behavior, so Core tests must use isolated record types that cannot contaminate the baseline. | `MeetingMinutes/Weekly/2023/12/2023-12-22.md:134-136` (2023-12-22) |
| 2023-76 | Planned | Public presentation of the test extension is deferred at least until its languages use neutral labels. | `MeetingMinutes/Weekly/2023/12/2023-12-22.md:138-140` (2023-12-22) |
| 2023-77 | Current Core Behavior | DataHandler uses `copyToLanguage` for translating content elements but `copy` for pages; with `copy`, translation-relevant database information is missing afterward. The minute labels that asymmetry “Broken by Design.” | `MeetingMinutes/Weekly/2023/12/2023-12-22.md:142-145` (2023-12-22) |
| 2023-78 | Planned | The extension should create connected/free translations via DataHandler and inspect inline page relations such as `media`. Every combination of content `free`/`connected`/`mixed` and site `strict`/`free`/`fallback` should be represented. | `MeetingMinutes/Weekly/2023/12/2023-12-22.md:142-148` (2023-12-22) |
| 2023-79 | Planned | The initiative is waiting on funding for TransFusion; if awarded, delivery is required by the end of March, and the test extension should exercise its wizard across the matrix. This remains conditional. | `MeetingMinutes/Weekly/2023/12/2023-12-22.md:150-152` (2023-12-22) |

### 2023-12-29

| ID | Status | Finding | Exact source |
| --- | --- | --- | --- |
| 2023-80 | Current Core Behavior | `PageRepository` is a major convergence point for records and configured fallbacks, but some processed data has an unexpected shape; normal pages may take another path, and menu content is an exception. `getLanguageOverlay()` changed substantially from v11 to v13. | `MeetingMinutes/Weekly/2023/12/2023-12-29.md:20-29` (2023-12-29) |
| 2023-81 | Open Question | For pages, `PageRepository::getLanguageOverlay()` uses language ID, while other records use the aspect’s content ID. Language ID is described as the value selected from the fallback chain; content ID is the language UID of content to fetch/overlay. The distinction remains unclear and is suspected to be legacy. | `MeetingMinutes/Weekly/2023/12/2023-12-29.md:30-41` (2023-12-29) |
| 2023-82 | Problem | `PageRepository` duplicates/splits page handling, re-sorts the fallback chain into an order the group considers wrong, and reconstructs `LanguageAspect`. These are viewed as readability and correctness risks/workarounds. | `MeetingMinutes/Weekly/2023/12/2023-12-29.md:43-50` (2023-12-29) |
| 2023-83 | Problem | Three overlay methods are public and callable at different entry points. Direct `getPagesOverlay()` calls can bypass ordering and fallback-type handling performed higher in the chain, creating context-dependent results. | `MeetingMinutes/Weekly/2023/12/2023-12-29.md:50-52` (2023-12-29) |
| 2023-84 | Idea | A progressively maintained flow diagram should document every Core path and make output deviations between cases visible. | `MeetingMinutes/Weekly/2023/12/2023-12-29.md:54-58` (2023-12-29) |
| 2023-85 | Discussed Direction | Because `getLanguageOverlay()` is pivotal, the proposed central fallback class should incorporate it, straighten all affected callers, remove duplication, then find and standardize overlay paths that bypass it. | `MeetingMinutes/Weekly/2023/12/2023-12-29.md:60-62` (2023-12-29) |
| 2023-86 | Open Question | Before implementation, the initiative wants Core developers involved to validate that it is taking the right architectural direction. | `MeetingMinutes/Weekly/2023/12/2023-12-29.md:64-66` (2023-12-29) |
| 2023-87 | In Progress | The translatable page-tree work continues, with current focus on TypeScript before further feature development. | `MeetingMinutes/Weekly/2023/12/2023-12-29.md:68-70` (2023-12-29) |

## Evolution, refinements, and apparent contradictions

### 1. `strict`: from behavioral observation to an explicit fourth mode

- On 2023-10-27 the group confirms “no fallback to another language,” while also documenting that selected-language records without a default relation are rendered (`2023-02`, `2023-07`).
- On 2023-11-03 that floating exception is reiterated (`2023-12`).
- By 2023-12-15 the code analysis resolves the apparent contradiction: site `strict` maps to `OVERLAYS_ON_WITH_FLOATING`, while a separate `OVERLAYS_ON` exists but is not exposed (`2023-43`–`2023-46`).
- Latest 2023 status: `Preferred Direction` to split/rename the modes, plus a short-term `Planned` configuration change; no 2023 implementation evidence (`MeetingMinutes/Weekly/2023/12/2023-12-15.md:98-104`, `365-369`).

### 2. Fallback chain versus compulsory default language

- 2023-10-27 identifies the unwanted terminal default fallback and proposes making the default an explicit optional chain member, protected by an upgrade wizard (`2023-03`, `2023-04`).
- 2023-12-15 confirms why the old behavior occurs: mixed overlays begin with default-language records and preserve them when no requested translation exists (`2023-42`, `2023-49`).
- 2023-12-22’s test setup still treats default `0` as always existing and builds chains around that current behavior (`2023-69`).
- Latest 2023 status: the correction remains an `Idea`; the current implementation and tests still encode default-language centrality. There is no evidence that the upgrade wizard or stoppable fallback was implemented.

### 3. Three UI modes versus four Core overlay behaviors

- The mismatch is first identified as an unanswered question on 2023-10-27 (`2023-08`–`2023-11`).
- Detailed analysis on 2023-12-15 confirms the hidden `OVERLAYS_ON`, the legacy getter/setter mismatch, and the naming collision (`2023-44`–`2023-52`).
- Latest 2023 status: real strict plus strict-with-floating is the `Preferred Direction`, but exact naming, TYPO3-13 replacement behavior, and implementation remain unresolved/planned.

### 4. BCP 47 becomes the preferred language-identity baseline

- 2023-11-03 explores abstraction from country-bound assumptions and recognizes variants such as plain language (`2023-16`).
- 2023-11-10 supplies the cross-site/instance and file-metadata rationale and explicitly prefers BCP 47 over a general dimensions system for now (`2023-19`, `2023-24`).
- 2023-11-17 separates publishing channels from language identity, continues with BCP 47, and leaves an optional arbitrary-variant field to survey/extension validation (`2023-28`–`2023-30`).
- 2023-11-24 adds validation/registry references (`2023-32`).
- Latest 2023 status: BCP 47 is a `Preferred Direction`, not an implemented Core identifier or a documented migration. General dimensions/publishing channels are deferred, while non-BCP variants remain an open survey question.

### 5. Structural data: existing tables, cloned cache tables, or overlay tables

- 2023-11-10 rejects a wholesale node-database conversion and prefers using existing TYPO3 tables for the time being (`2023-20`).
- The same meeting introduces auto-generated clone/cache tables and accepts a potentially much larger database in exchange for simpler output queries (`2023-21`, `2023-22`).
- 2023-11-17 keeps both separate output-state tables and overlay tables open, with explicitly no conclusion (`2023-31`).
- Latest 2023 status: only “do not replace TYPO3 storage wholesale” is preferred. The precise structural/identity layer is unresolved. These minutes do not yet describe the later T3DD26 brief’s neutral invisible identity layer or guaranteed complete language layers in concrete terms.

### 6. Test infrastructure matures from setup proposal to working extension

- 2023-11-03 debates a DDEV-generated installation versus an environment-independent extension (`2023-14`, `2023-15`).
- 2023-11-17 records the initial extension (`2023-27`); 2023-11-24 sets reproducibility, reset, and automation goals (`2023-35`).
- 2023-12-22 documents implemented tree-generation commands and an expanding matrix (`2023-66`–`2023-78`).
- Latest 2023 status: the extension/scaffolding is `Implemented`, while TYPO3-12 verification, full content matrices, ID-order cases, inline relations, and automation remain `Open Question`/`Planned`.

### 7. Free/Connected conversion stays conditional

- 2023-11-17 welcomes a proposed TransFusion prototype and identifies technical/FAL questions (`2023-25`, `2023-26`).
- 2023-11-24 expects a separate module (`2023-33`).
- 2023-12-22 is still waiting for funding and only conditionally associates the prototype with an end-of-March deadline (`2023-79`).
- Latest 2023 status: `Planned`, not `In Progress` or `Implemented`, within the evidence of these minutes.

### 8. Central fallback processing grows more concrete but awaits validation

- 2023-12-15 proposes a feature-switched central class after documenting Extbase/non-Extbase inconsistency (`2023-59`, `2023-64`, `2023-65`).
- 2023-12-29 identifies `PageRepository::getLanguageOverlay()` as the likely pivot, expands the caller/bypass audit, and explicitly asks for Core-developer guidance (`2023-80`–`2023-86`).
- Latest 2023 status: `Discussed Direction` plus open architectural validation, not implementation.

## Topic-oriented takeaways and evidence limits

### Current behavior and sources of complexity

- Two separate axes are conflated in vocabulary: backend record relationship (`free`/`connected`/`mixed`) and frontend fallback/overlay selection (`free`/`fallback`/`strict`) (`MeetingMinutes/Weekly/2023/10/2023-10-27.md:53-77`; 2023-10-27).
- Runtime behavior is distributed among `LanguageAspectFactory`, `LanguageAspect`, Extbase query/parser/backend paths, `ContentObjectRenderer`, and `PageRepository`, with different entry points and semantics (`MeetingMinutes/Weekly/2023/12/2023-12-15.md:20-395`; 2023-12-15; `MeetingMinutes/Weekly/2023/12/2023-12-29.md:20-62`; 2023-12-29).
- Default-language UIDs and translation-parent links are not incidental: queries explicitly use `0`, `-1`, and `transOrigPointerField`, and localized records can be projected back onto parent UIDs for overlay/data mapping (`MeetingMinutes/Weekly/2023/12/2023-12-15.md:111-181`, `233-297`, `308-342`; 2023-12-15).

### BCP 47, stable identity, and cross-site use

- The strongest covered use case is unambiguous reuse/transfer across root sites or instances and global translated file metadata (`MeetingMinutes/Weekly/2023/11/2023-11-10.md:30-34`; 2023-11-10).
- BCP 47 is selected as a standardized string and bounded first step, while generic dimensions, publishing channels, and arbitrary variants are kept separate/deferred (`MeetingMinutes/Weekly/2023/11/2023-11-10.md:51-53`; 2023-11-10; `MeetingMinutes/Weekly/2023/11/2023-11-17.md:40-49`; 2023-11-17).
- Evidence limit: the 2023 weekly minutes do not specify the database schema, whether numeric internal IDs remain as surrogate keys, how BCP-47 uniqueness/scoping works, or a migration algorithm for existing site-language IDs.

### `sys_language_uid = -1`

- `-1` is explicitly fetched alongside the current language in Extbase and alongside `0` in non-Extbase overlay queries (`MeetingMinutes/Weekly/2023/12/2023-12-15.md:111-154`, `308-342`; 2023-12-15).
- The initiative flags its meaning/handling as unexplained in the factory-level reasoning (`MeetingMinutes/Weekly/2023/12/2023-12-15.md:67-71`; 2023-12-15).
- Evidence limit: there is no explicit 2023 proposal to abolish `-1`, replace it with a boolean, auto-materialize per-language records, synchronize those records, or migrate existing all-language records. Such claims must be sourced from later minutes/transcripts, not inferred from 2023.

### `sys_language_uid = 0`

- `0` is the base of overlay/fallback queries and the translation-parent model (`MeetingMinutes/Weekly/2023/12/2023-12-15.md:73-85`, `155-181`, `274-285`, `308-342`; 2023-12-15).
- The test discussion states that default `0` always exists, making a chain that starts with it pointless under the current model (`MeetingMinutes/Weekly/2023/12/2023-12-22.md:62-73`; 2023-12-22).
- Evidence limit: these 2023 minutes expose dependence on `0` but do not propose abolishing it or describe a record-per-concrete-BCP-47 replacement.

### Translation parent, record identity, and layers

- Backend Connected Mode is concretely the relationship from a localized record to a default-language UID via `transOrigPointerField`; later code analysis uses `tt_content.l10n_parent` (`MeetingMinutes/Weekly/2023/10/2023-10-27.md:63-69`; 2023-10-27; `MeetingMinutes/Weekly/2023/12/2023-12-15.md:81-85`; 2023-12-15).
- Extbase may deliberately replace the localized UID/language with parent UID/`0`, then preserve `_LOCALIZED_UID`, exposing the ambiguity between database-record identity and overlaid/domain identity (`MeetingMinutes/Weekly/2023/12/2023-12-15.md:274-297`; 2023-12-15).
- Structural representation in existing tables, clone/cache tables, or dedicated overlay tables is discussed but not resolved (`MeetingMinutes/Weekly/2023/11/2023-11-10.md:35-45`; 2023-11-10; `MeetingMinutes/Weekly/2023/11/2023-11-17.md:51-56`; 2023-11-17).
- Evidence limit: no explicit UUID/group identity, neutral hidden structure record, completed language-layer invariant, shadow-record lifecycle, or deletion/versioning contract appears in this 2023 corpus.

### Synchronization and DataHandler

- The only directly relevant mechanics are a proposed async transformation into cache tables (`MeetingMinutes/Weekly/2023/11/2023-11-10.md:39-41`; 2023-11-10), Shopware’s field inheritance as an external comparison (`MeetingMinutes/Weekly/2023/11/2023-11-03.md:69-73`; 2023-11-03), and DataHandler’s `copyToLanguage` versus `copy` asymmetry (`MeetingMinutes/Weekly/2023/12/2023-12-22.md:142-148`; 2023-12-22).
- Evidence limit: the 2023 weekly minutes contain no defined synchronization source of truth, propagation policy, conflict rules, newly-added-language behavior, or “all languages” materialization process.

### Workspaces, versioning, references, and migration

- Workspace overlay is visible in the inspected Extbase sequence before language overlay, but no redesign impact is analyzed (`MeetingMinutes/Weekly/2023/12/2023-12-15.md:257-286`; 2023-12-15).
- FAL/inline child relations are recognized as necessary prototype/test cases (`MeetingMinutes/Weekly/2023/11/2023-11-17.md:28-32`; 2023-11-17; `MeetingMinutes/Weekly/2023/12/2023-12-22.md:142-148`; 2023-12-22).
- The only concrete compatibility mechanism proposed is an upgrade wizard that would insert the default into fallback chains when changing terminal-default behavior (`MeetingMinutes/Weekly/2023/10/2023-10-27.md:49-51`; 2023-10-27). The group separately warns that aligning Extbase behavior is breaking (`MeetingMinutes/Weekly/2023/12/2023-12-15.md:349-355`; 2023-12-15).
- Evidence limit: no broader data migration, Reference Index strategy, workspace/versioning design, rollback path, or deprecation schedule is documented in this corpus.

### Tests and implementation maturity at end of 2023

- A working v13-oriented testing extension can generate three fallback-type trees and reset through DataHandler (`MeetingMinutes/Weekly/2023/12/2023-12-22.md:20-56`; 2023-12-22).
- The required matrix is intentionally larger: varied numeric IDs and chain order, connected/free/mixed × strict/free/fallback, menus, shortcuts, FlexForms, inline media, and isolated record types (`MeetingMinutes/Weekly/2023/12/2023-12-22.md:58-77`, `118-148`; 2023-12-22).
- The translatable page tree is genuinely `In Progress`, but the BCP-47 Core identity model, new overlay mode, central fallback class, cache/overlay tables, and TransFusion are not evidenced as implemented in the 2023 corpus.

## Safe 2023-only session claims

1. **Current:** TYPO3’s language output is a distributed interaction of numeric language/content IDs, `0`/`-1`, translation-parent relations, overlay constants, fallback chains, and context-specific callers.
2. **Problem:** The same words (`free`, `mixed`, `strict`) describe different backend/output concepts, and site `strict` is actually strict-with-floating.
3. **Problem:** Extbase and non-Extbase paths are not behaviorally aligned; public `PageRepository` entry points can bypass assumptions.
4. **Preferred direction:** BCP 47 is the group’s 2023 choice for stable language semantics and cross-root/instance mapping, while general dimensions and publishing channels are separate or deferred.
5. **Open:** The structural storage model—existing tables, generated cache tables, or dedicated overlay tables—was not decided.
6. **Discussed direction:** Centralized fallback processing around `PageRepository` could reduce duplicate/inconsistent behavior, but Core-developer validation was still requested.
7. **Implemented foundation:** A test extension and early translatable-page-tree prototype existed; most architecture changes remained ideas, directions, or plans.
8. **Do not claim from 2023 alone:** abolition of `0` or `-1`; boolean all-language propagation; complete/shadow language layers; a neutral identity layer; finalized synchronization, migration, workspace/versioning, or Reference Index design.

## Analytically derived recommendations (explicitly not initiative positions)

| Status | Recommendation derived from 2023 dependencies | Basis |
| --- | --- | --- |
| Analytically Derived Recommendation | Present numeric special values as demonstrated sources of coupling, then explicitly label their abolition/replacement as later evidence unless a post-2023 source proves it. | Hard-coded selection and overlay behavior: `MeetingMinutes/Weekly/2023/12/2023-12-15.md:111-181`, `308-342` (2023-12-15); unresolved `-1`: same file `67-71`. |
| Analytically Derived Recommendation | Use the de-AT → de-DE without forced en-GB example as the clearest 2023 fallback story, followed by the four-overlay-mode reveal. | `MeetingMinutes/Weekly/2023/10/2023-10-27.md:43-51`, `71-77` (2023-10-27); `MeetingMinutes/Weekly/2023/12/2023-12-15.md:86-104` (2023-12-15). |
| Analytically Derived Recommendation | Separate “language identity,” “record relationship,” and “output fallback” visually; the 2023 corpus repeatedly conflates these axes and supplies concrete labels for each. | `MeetingMinutes/Weekly/2023/10/2023-10-27.md:53-77` (2023-10-27); `MeetingMinutes/Weekly/2023/12/2023-12-29.md:30-41` (2023-12-29). |
| Analytically Derived Recommendation | Treat the test matrix as a prerequisite for architecture migration claims and add explicit workspace, versioning, reference, and `-1` lifecycle cases before advocating complete language layers. | Existing matrix/gaps: `MeetingMinutes/Weekly/2023/12/2023-12-22.md:118-148` (2023-12-22); workspace ordering only: `MeetingMinutes/Weekly/2023/12/2023-12-15.md:257-286` (2023-12-15). |
