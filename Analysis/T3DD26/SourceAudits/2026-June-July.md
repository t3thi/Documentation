# T3DD26 source extraction: June and July 2026

## Scope and reading record

This extraction is limited to the five weekly minutes under `MeetingMinutes/Weekly/2026/06` and `MeetingMinutes/Weekly/2026/07` and the five requested transcripts. Every file listed below was read from beginning to end. The untracked `MeetingMinutes/Weekly/2026/07/31.md` was used strictly as a read-only source. No repository file was changed.

Status labels below use the requested controlled vocabulary exactly:

- Current Core Behavior
- Problem
- Idea
- Discussed Direction
- Preferred Direction
- Open Question
- Planned
- In Progress
- Implemented
- Analytically Derived Recommendation

Session priority uses `Essential`, `Useful`, `Optional`, or `Too Detailed`.

For compactness in the matrices, source phrases such as “transcript 2026-07-24 lines 445-470” are exact-path shorthands with the following one-to-one mapping:

- transcript 2026-06-11 = `Transcripts/2026-06-11 14-00-45 - Meeting der Initiative.txt`
- transcript 2026-06-26 = `Transcripts/2026-06-26 12-00-22 - Meeting der Initiative.txt`
- transcript 2026-07-10 = `Transcripts/2026-07-10 12-01-17 - Meeting der Initiative.txt`
- transcript 2026-07-24 = `Transcripts/2026-07-24 12-01-03 - Meeting der Initiative.txt`
- transcript 2026-07-31 = `Transcripts/2026-07-31 11-32-06 - Meeting der Initiative.txt`

When a sentence already names one dated meeting and then says only “transcript lines”, the same dated mapping applies.

Important source-boundary finding: neither Gerrit change `92267` nor that number occurs in any of these ten documents. This source block does provide the surrounding rationale and state of the `sys_language_uid = -1` test effort, but it does **not** support attribution of particular files, test classes, or detailed findings to change `92267`. Those details require the Gerrit change itself or another source block.

## Newest-state precedence: what this source block establishes

1. On 2026-06-11 the initiative articulated a possible sequence: replace `-1` with explicit synchronization, deal with the special role of `0`, move toward BCP 47, and then use or demonstrate a hidden structural layer. It was a discussed sequence, not a committed Core roadmap. (`MeetingMinutes/Weekly/2026/06/11.md:54-80`; `Transcripts/2026-06-11 14-00-45 - Meeting der Initiative.txt:408-460`)
2. On 2026-06-26 the product argument became more precise: TYPO3 handles shared-structure localization well, but the important gap is “mostly connected, selectively different” regional structure. The default language currently doubles as visible content and structural lead; a unified structural layer was proposed as a possible common model for pages, content, and other localizable records. (`MeetingMinutes/Weekly/2026/06/26.md:194-224`; transcript lines 337-404, 457-544, 661-698)
3. On 2026-07-10 the team expressly called the hidden structural layer a **hypothesis**, not a proposed finished solution. It also framed strategic recognition and a later discovery/prototyping phase as the immediate ask, rather than approval of a large implementation. (`MeetingMinutes/Weekly/2026/07/10.md:24-30,50-58`; transcript lines 76-96, 153-168, 181-204)
4. On 2026-07-24, after the Dialog Days, the earlier plan to finish `-1` coverage before v15 and then begin functional migration work was described in the past tense. Core-team reorganization left prioritization and ownership unclear. Continuing the tests remained useful preparation, while fixing small concrete bugs was proposed as an alternative parallel focus with visible value. (`MeetingMinutes/Weekly/2026/07/24.md:27-35`; transcript lines 103-158)
5. On 2026-07-31 the newest strategic language in this block remained a stable descriptive identity shared across sites. The meeting mostly pursued narrower Core findings and prototypes; it did not turn the June architecture sequence into a committed roadmap. (`MeetingMinutes/Weekly/2026/07/31.md:55-61`; transcript lines 281-297, 337-359)

Therefore the current state supported by this block is: a coherent direction exists, but the structural architecture and its migration order remain open; concrete work is chiefly characterization/testing and bounded Core fixes.

## Exhaustive evidence matrix

### Current model and pain points

| ID | Topic | Finding | Status | Priority | Sources and context |
| --- | --- | --- | --- | --- | --- |
| C1 | Default language as structural lead | The default language is both visible content and the structural control/lead. Connected records gain shared sorting, retranslation support, and `allowLanguageSynchronization`, but regional-only additions require artificial default records or loss of the connection. | Current Core Behavior | Essential | `MeetingMinutes/Weekly/2026/06/26.md:96-125,198-214`; `Transcripts/2026-06-26 12-00-22 - Meeting der Initiative.txt:470-483,519-544,682-698` |
| C2 | Localization versus regional structural adaptation | Identical structures with translated field values work well. Reduced structures are often manageable. Enriched structures are the central gap because one local addition creates Mixed Mode or loses connected support even though most content remains connected. Changed and independent structures form the other ends of the spectrum. | Problem | Essential | `MeetingMinutes/Weekly/2026/06/26.md:31-87,194-204`; `MeetingMinutes/Weekly/2026/07/10.md:34-48`; `Transcripts/2026-06-26 12-00-22 - Meeting der Initiative.txt:337-404`; `Transcripts/2026-07-10 12-01-17 - Meeting der Initiative.txt:175-190` |
| C3 | “Mostly connected, selectively different” | The dominant product story is not fully independent market sites but shared structure with a few explicit market-specific deviations. Those exceptions should not destroy the structural assistance for everything else. | Preferred Direction | Essential | `MeetingMinutes/Weekly/2026/06/26.md:56-62,87-96,202-214`; `MeetingMinutes/Weekly/2026/07/10.md:46-48`; transcript 2026-06-26 lines 367-404, 457-483; transcript 2026-07-10 lines 121-130 |
| C4 | Backend connection and frontend fallback are separate | The visible `l10n_parent` connection in the Page Module supports backend structural relationships; frontend output is separately governed by fallback configuration. A connection is not itself the frontend fallback rule. | Current Core Behavior | Useful | `MeetingMinutes/Weekly/2026/06/26.md:206-224,226-232`; `Transcripts/2026-06-26 12-00-22 - Meeting der Initiative.txt:686-701` |
| C5 | Core-wide reach | Translation relationships affect `DataHandler`, Workspaces, page/content editing, routing, queries, fallback behavior, permissions, and frontend rendering. Extbase and direct Core rendering may behave differently. | Problem | Essential | `MeetingMinutes/Weekly/2026/07/10.md:50-58`; `Transcripts/2026-07-10 12-01-17 - Meeting der Initiative.txt:195-204` |
| C6 | Free Mode / Mixed Mode Page Module layout | With v14 default-language binding, connected content aligns usefully by parent. Pure Free Mode can accumulate all elements in the visual area of the first default row. Once a column is Mixed Mode, the unpatched UI also loses visible parent alignment. | Problem | Useful | `MeetingMinutes/Weekly/2026/07/24.md:37-55`; `Transcripts/2026-07-24 12-01-03 - Meeting der Initiative.txt:165-178,197-214,257-304,345-424` |
| C7 | Translate/Copy choice from a Free Mode source | A non-default source language may provide `l10n_source`, while a connected default-language record remains `l10n_parent`. If the chosen source itself is Free Mode, TYPO3 cannot invent a parent; selecting Translate still produces records with empty `l10n_parent`, making the choice misleading. | Problem | Useful | `MeetingMinutes/Weekly/2026/07/24.md:65-75`; transcript 2026-07-24 lines 445-470, 550-592 |
| C8 | Duplicate translation parents | The regular editing workflow can assign the same default-language parent to two translations in one target language. Page Module and List Module can then show inconsistent translations. Deletion/restoration and Workspaces add further consistency complications. | Problem | Useful | `MeetingMinutes/Weekly/2026/07/24.md:57-63`; transcript 2026-07-24 lines 281-340; transcript 2026-07-31 lines 137-141 |
| C9 | `l10n_source` lookup bug | When a table defines a translation source field, lookup prefers `l10n_source`. A valid translation with correct `l10n_parent` but empty `l10n_source` is not found; `DataHandler::localize()` can consequently create another translation for the same parent/language. | Problem | Useful | `MeetingMinutes/Weekly/2026/07/31.md:21-27`; `Transcripts/2026-07-31 11-32-06 - Meeting der Initiative.txt:4-14` |
| C10 | Strict and fallback-chain semantics | The team’s semantic reading is that strict mode renders only the requested language; a configured chain must not introduce another language. The Core UI nevertheless exposes fallbacks for strict, and a fallback-related change allowed hidden strict-language content to fall back. | Problem | Useful | `MeetingMinutes/Weekly/2026/06/11.md:20-40`; transcript 2026-06-11 lines 16-68, 92-120, 171-220 |
| C11 | Regional fallback versus mandatory terminal default | The later UK → general English use case showed why users tried strict plus a chain: ordinary fallback would eventually inject German, the default. The regional chain is valid, but it should not redefine strict. | Problem | Essential | `MeetingMinutes/Weekly/2026/07/31.md:39-45`; transcript 2026-07-31 lines 159-191 |
| C12 | Disabled translation cannot block fallback | In fallback mode, an existing but disabled connected translation still causes the default record to appear. The team regarded the inability to say “intentionally absent here” as a real Core gap, although changing it may break existing output. | Problem | Useful | `MeetingMinutes/Weekly/2026/07/10.md:68-80`; transcript 2026-07-10 lines 271-346, 357-424, 450-498 |
| C13 | Numeric cross-site identity ambiguity | The same language preset can be created under different numeric IDs in separate sites; conversely the same numeric ID can carry different titles/language meanings. The first site’s label is currently treated as primary in aggregated UI labels, although no site is inherently primary. | Problem | Essential | `MeetingMinutes/Weekly/2026/07/31.md:55-61`; transcript 2026-07-31 lines 220-246, 281-297, 315-359 |
| C14 | Site-language fallback selector scope | The fallback selector iterates languages from all configured sites and can offer a language absent from the current site. The team reasoned this is normally ineffective for page/column-scoped content but explicitly required runtime verification before changing it. | Problem | Optional | `MeetingMinutes/Weekly/2026/07/31.md:47-53`; transcript 2026-07-31 lines 201-273, 361-370 |
| C15 | Semantic numeric special values | `sys_language_uid = -1` represents “all languages”; `0` represents the default language even though that default can denote different real languages in different roots. The sources treat both meanings as blockers to a clean semantic-language mapping. | Current Core Behavior | Essential | `MeetingMinutes/Weekly/2026/06/11.md:54-80`; transcript 2026-06-11 lines 408-458 |

### Language identity, `-1`, `0`, synchronization, and structure

| ID | Topic | Finding | Status | Priority | Sources and context |
| --- | --- | --- | --- | --- | --- |
| A1 | Replace `sys_language_uid = -1` | The June direction was to remove the semantic special value and store “all languages” behavior explicitly rather than as a language identity. | Discussed Direction | Essential | `MeetingMinutes/Weekly/2026/06/11.md:52-74`; transcript 2026-06-11 lines 408-436 |
| A2 | Initial all-languages flag | The proposed first replacement was a boolean on the default-language/source record saying it should be synchronized into all languages. This was framed as reproducing existing behavior first, not as the final feature. | Idea | Essential | `MeetingMinutes/Weekly/2026/06/11.md:62-65,74-74`; transcript 2026-06-11 lines 423-440 |
| A3 | Enforced versus optional synchronization | The proposed record-wide mechanism was described as analogous to `allowLanguageSynchronization` but enforced: values would be written to all target languages rather than remaining an editor-reversible choice. No concrete TCA property or finalized API was specified in this source block. | Idea | Essential | `Transcripts/2026-06-11 14-00-45 - Meeting der Initiative.txt:431-440`; compare the current editorial-control distinction in `MeetingMinutes/Weekly/2026/07/31.md:35-35` and transcript 2026-07-31 lines 130-137 |
| A4 | Selectable synchronization targets | Once explicit synchronization exists, the boolean could evolve into a multi-select or synchronization target groups, e.g. sync general/UK/US English while leaving French and Spanish independent. | Discussed Direction | Useful | `MeetingMinutes/Weekly/2026/06/11.md:74-74`; transcript 2026-06-11 lines 423-440 |
| A5 | BCP 47 as semantic identity | BCP 47 was explicitly considered a suitable string identifier that expresses the character of a language. Removing special `-1` and `0` meanings was treated as a prerequisite for clean conversion from current numeric meanings. | Discussed Direction | Essential | `MeetingMinutes/Weekly/2026/06/11.md:74-80`; transcript 2026-06-11 lines 442-458 |
| A6 | Numeric IDs versus semantic identifiers | This block argues that freely chosen numeric IDs cannot reliably identify the same real language across sites/installations. It does **not** decide whether internal numeric database keys would disappear; the supported claim is that they should stop carrying the authoritative semantic meaning. | Discussed Direction | Essential | `MeetingMinutes/Weekly/2026/07/10.md:50-54`; transcript 2026-07-10 lines 181-196; `MeetingMinutes/Weekly/2026/07/31.md:57-61`; transcript 2026-07-31 lines 281-297 |
| A7 | Cross-site/file-metadata benefit | Stable language identity would make translated records, specifically translated file metadata, more exchangeable/reusable across sites and installations. | Discussed Direction | Essential | `MeetingMinutes/Weekly/2026/07/10.md:52-54`; transcript 2026-07-10 lines 181-196 |
| A8 | Conservative replacement for `0` | One possible path keeps a real default language but marks it explicitly on a BCP-47-identified language, allowing different site roots to have different defaults without the numeric `0` carrying that meaning. | Idea | Useful | `MeetingMinutes/Weekly/2026/06/11.md:66-80`; transcript 2026-06-11 lines 449-458 |
| A9 | Hidden neutral structural layer | The alternative makes `0` (or a replacement identity layer) non-output, purely structural. All editorial/output languages connect to it, so no real language is structurally privileged and an explicit default flag may become unnecessary. | Idea | Essential | `MeetingMinutes/Weekly/2026/06/11.md:66-80`; transcript 2026-06-11 lines 449-458; `MeetingMinutes/Weekly/2026/06/26.md:116-160,216-224` |
| A10 | Hidden layer is not settled | By 2026-07-10 the team explicitly called the hidden structural layer a hypothesis, not a finished proposed solution. The open problem is how to support cross-language structural deviation predictably. | Open Question | Essential | `MeetingMinutes/Weekly/2026/07/10.md:50-58`; transcript 2026-07-10 lines 201-204 |
| A11 | Automatic shadow records / extension prototype | A June idea was to test the editor experience with automatically generated shadow records and a hidden layer, potentially as an extension or click dummy. This is prototype thinking, not proof of a chosen complete-language-layer data model. | Planned | Useful | `MeetingMinutes/Weekly/2026/06/11.md:82-86`; transcript 2026-06-11 lines 408-418, 462-472 |
| A12 | Unified layer across record types | The structural model was proposed as a common foundation for `pages`, `tt_content`, and all other localizable records; structure/position would be separated from translatable field values. The sources also acknowledge that other records’ output depends on plugins, Extbase, DataProcessing, or custom code. | Idea | Useful | `MeetingMinutes/Weekly/2026/06/26.md:216-224`; transcript 2026-06-26 lines 519-620, 659-698 |
| A13 | Editor-first creation | A concrete UX thought experiment was: create an element directly in the target language while TYPO3 automatically creates the required hidden/default structural counterpart. This removes artificial double work but was posed as a possible solution, not a settled workflow. | Idea | Essential | `Transcripts/2026-06-26 12-00-22 - Meeting der Initiative.txt:514-544`; related workaround in `MeetingMinutes/Weekly/2026/06/26.md:202-212` |
| A14 | Fallback reduced by synchronization | Eric connected explicit language synchronization with a longer-term model in which some fallback behavior could be replaced/reduced by concrete target-language records, giving explicit control over shown/hidden/absent states. The transcript contains a request for agreement but no recorded substantive confirmation, so it must remain an idea rather than consensus. | Idea | Useful | `MeetingMinutes/Weekly/2026/07/10.md:78-80`; transcript 2026-07-10 lines 489-500 |
| A15 | Multi-dimensional content context | A generic dimensions model could separate language from country, brand, user role, behavior, or consent contexts. It would require a backend not centered solely on language. The team explicitly did not make this the immediate Dialog Days solution. | Idea | Optional | `MeetingMinutes/Weekly/2026/07/10.md:60-66`; transcript 2026-07-10 lines 206-256 |
| A16 | Code complexity versus data complexity | Lolli’s recurring argument was reported as: the larger problem is output-code complexity, not data complexity. Database complexity was acknowledged as a possible counterargument, but this block contains no quantitative record-growth analysis and no decision to prefer complete language layers. | Open Question | Essential | `MeetingMinutes/Weekly/2026/07/10.md:50-58`; transcript 2026-07-10 lines 121-168 |
| A17 | File/XLIFF translation implications | File translation was briefly named while motivating semantic language identity, and translated file metadata later became the concrete cross-site example. No XLIFF data model, file-language mapping, import/export flow, or external-service contract was worked out in this block. | Open Question | Optional | transcript 2026-06-11 lines 442-450; `MeetingMinutes/Weekly/2026/07/10.md:52-54`; transcript 2026-07-10 lines 181-196 |

### Concrete directions, prototypes, tests, and Core work

| ID | Work item | Finding and precise maturity | Status | Priority | Sources and context |
| --- | --- | --- | --- | --- | --- |
| W1 | `-1` characterization/test coverage | The earlier plan was to complete Core test coverage around `sys_language_uid = -1` before v15, then begin functional changes and a migration path. In July, continuing these tests was still considered useful preparation; Benni wanted progress, but ownership/prioritization were unclear during Core-team reorganization. | In Progress | Essential | `MeetingMinutes/Weekly/2026/07/24.md:27-35`; transcript 2026-07-24 lines 103-146; supporting concern about unreviewed test patches in transcript 2026-07-10 lines 153-158 |
| W2 | Gerrit `92267` | No assigned June/July document names this change. This block can support only the general `-1` test rationale and maturity in W1, not `92267`’s exact areas, assertions, or findings. | In Progress | Essential | Negative full-text result across all ten reviewed files; use W1 sources only for surrounding initiative intent. |
| W3 | Why tests precede changes | The stated logic is to characterize the current special-value behavior before beginning functional removal and migration, so work can proceed from known cases rather than implicit assumptions. Tests are “background work” without immediate editor-visible value but prepare later changes. | Discussed Direction | Essential | `MeetingMinutes/Weekly/2026/07/24.md:29-35`; transcript 2026-07-24 lines 110-146 |
| W4 | Test areas/findings from this block | The documents identify broad affected domains—`DataHandler`, Workspaces, editing, routing, queries, fallback, permissions, rendering—and several observed special cases. They do **not** say which of these are covered by `92267`, nor do they state the requested rule that Site Configuration Languages must not underpin those tests. | Open Question | Essential | `MeetingMinutes/Weekly/2026/07/10.md:52-56`; transcript 2026-07-10 lines 190-200; negative full-text result for `92267` and for the site-configuration test constraint. |
| W5 | Mount Point fix `94831` | Merged. It resolves the default-language `uid` through `l10n_parent` before root-line comparison, preventing a translated self-rendering Mount Point from returning `404`. Most patch volume was test setup. | Implemented | Optional | `MeetingMinutes/Weekly/2026/07/24.md:17-25`; transcript 2026-07-24 lines 14-31, 63-101 |
| W6 | Free/Mixed Mode UI patch `94917` | Dennis’ patch improves the pure Free Mode column, but breaks useful connected alignment when combined with connected columns. It therefore needed a deeper HTML/table layout solution and was explicitly not merge-ready in the tested state. | In Progress | Useful | `MeetingMinutes/Weekly/2026/07/24.md:37-55`; transcript 2026-07-24 lines 165-214, 257-264, 345-424 |
| W7 | Translation-parent filtering (`#110328`) | The narrow requirement is to exclude parents already translated in the current target language while retaining the currently assigned parent. It should work generically through TCA `transOrigPointerField`. Eric prototyped a typed `itemsProcessors` approach; André intended a test-backed patch. | In Progress | Useful | `MeetingMinutes/Weekly/2026/07/31.md:29-37`; transcript 2026-07-31 lines 16-32, 68-149 |
| W8 | Parent type compatibility | Newest narrowing: only when a table has a TCA `type` field with `l10n_mode = exclude` should candidate parent type equality be required. Do not extend equality to every `exclude` field; `colPos` can intentionally differ. Leave `allowLanguageSynchronization` out initially because it is editor-controlled. | Preferred Direction | Too Detailed | `MeetingMinutes/Weekly/2026/07/31.md:33-37`; transcript 2026-07-31 lines 28-66, 124-141 |
| W9 | Free-source wizard (`#110330`) | If a non-default source is Free Mode, the wizard should skip the Translate/Copy choice and use Copy. If the source is connected, both choices remain meaningful. This rule emerged after Eric’s broader initial suggestion was corrected through a live test. | Planned | Useful | `MeetingMinutes/Weekly/2026/07/24.md:65-75`; transcript 2026-07-24 lines 445-470, 550-592; issue linkage in `MeetingMinutes/Weekly/2026/07/31.md:29-31` |
| W10 | Empty `l10n_source` fixes `94914`, `94916`, `94915` | Patches existed for main, 14.3, and 13.4. They retain `l10n_source` preference but fall back to `l10n_parent` when source is empty. The documents do not state that these changes were merged, so this block supports In Progress, not Implemented. | In Progress | Useful | `MeetingMinutes/Weekly/2026/07/31.md:21-27`; transcript 2026-07-31 lines 4-14 |
| W11 | Strict fallback regression patch | On 2026-06-11 the immediate fix was described as applying/merging the longer chain only for `fallbackType: fallback`, with a test for strict + configured chain + hidden target record. The UI could hide or explain the irrelevant field; destructive YAML cleanup was rejected. | Planned | Optional | `MeetingMinutes/Weekly/2026/06/11.md:32-42`; transcript 2026-06-11 lines 222-296 |
| W12 | Optional terminal default in fallback mode | After learning the real UK → English → (unwanted German) case, the team retained strict semantics and considered making the default language an optional final step of normal fallback. This is a possible Core direction, not a plan. | Idea | Useful | `MeetingMinutes/Weekly/2026/07/31.md:39-45`; transcript 2026-07-31 lines 159-191 |
| W13 | Disabled translation blocks fallback | The proposed semantics are: missing translation means fallback; an existing disabled translation means intentionally do not show and do not fall back. The team recognized this as potentially breaking and did not record a decided implementation. | Discussed Direction | Useful | `MeetingMinutes/Weekly/2026/07/10.md:70-80`; transcript 2026-07-10 lines 357-440, 450-498 |
| W14 | Site-scoped fallback selector | Limit offered fallback languages to the current site and remove cross-site title aggregation **only if** runtime evaluation confirms out-of-site choices are ineffective. A new issue was contemplated; no completed patch is evidenced. | Planned | Optional | `MeetingMinutes/Weekly/2026/07/31.md:47-53`; transcript 2026-07-31 lines 201-273, 361-370 |

## Changes of mind, contradictions, and refinements

### 1. June sequence versus July architecture status

- Earlier statement: on 2026-06-11 Eric called `-1` → `0` → BCP 47 → hidden layer the most communicable/obvious sequence. (`MeetingMinutes/Weekly/2026/06/11.md:74-80`; transcript lines 449-460)
- Refinement: on 2026-06-26 both conservative default flag and structural-layer paths were still presented as possible paths with open questions. (`MeetingMinutes/Weekly/2026/06/26.md:150-160`; transcript lines 275-298)
- Newer statement: on 2026-07-10 the structural layer was explicitly a hypothesis, and the ask was strategic recognition plus discovery/prototyping, not adoption. (`MeetingMinutes/Weekly/2026/07/10.md:24-30,50-58`)
- Newest operational state: on 2026-07-24 ownership and priority were unresolved; tests and small fixes could continue. (`MeetingMinutes/Weekly/2026/07/24.md:27-35`)
- Current interpretation: use the sequence as a reasoning path or possible migration dependency graph, not a roadmap.

### 2. Strict fallback: “misconfiguration” versus valid product need

- 2026-06-11: both participants initially saw strict + fallback chain as contradictory; they proposed preventing chain evaluation in strict and questioned why it was configured. (`MeetingMinutes/Weekly/2026/06/11.md:20-42`)
- 2026-07-31: Johannes’ explanation established a valid regional use case—UK should reuse general English but never fall through to German. (`MeetingMinutes/Weekly/2026/07/31.md:41-45`)
- Current interpretation: strict remains strictly single-language; the use case belongs in a more expressive fallback mode, potentially with an optional terminal default. The need is valid; the attempted configuration is not the desired semantic model.

### 3. Parent-selector synchronization checks were narrowed

- Early 2026-07-31 transcript reasoning considered requiring equality for every field synchronized through `l10n_mode = exclude`. (`Transcripts/2026-07-31 11-32-06 - Meeting der Initiative.txt:28-40`)
- The live discussion found intentional counterexamples such as `colPos` and broad synchronized fields on pages/file metadata. It narrowed the rule to a TCA type field that itself uses `l10n_mode = exclude`; `allowLanguageSynchronization` stayed out because it is editor-controlled. (`MeetingMinutes/Weekly/2026/07/31.md:35-37`; transcript lines 56-66, 130-141)
- Current interpretation: use the minutes’ narrow rule, not the transcript’s earlier broad thought.

### 4. Free-source wizard rule was corrected live

- Eric initially suggested the localization-mode dialog should disappear for any non-default source. (`Transcripts/2026-07-24 12-01-03 - Meeting der Initiative.txt:557-565`)
- André demonstrated that a connected non-default source can validly produce either connected Translate or Free Mode Copy. Only an already-free source has a single possible outcome. (same transcript lines 566-592)
- Current interpretation: automatic Copy only for a Free Mode source; keep both choices for a connected source.

### 5. Cross-site fallback selector remains conditional

- The team strongly suspected languages absent from the current site can never contribute due to page/PID/column constraints. (`MeetingMinutes/Weekly/2026/07/31.md:49-53`)
- Eric explicitly required verification against complete runtime fallback evaluation before changing the selector. (`MeetingMinutes/Weekly/2026/07/31.md:51-53`; transcript lines 273-275, 361-370)
- Current interpretation: new issue candidate/open verification, not an established Core defect with a decided fix.

## Open lifecycle and architecture questions: evidence and gaps

The user-requested lifecycle questions must remain open. This June/July block does not answer most of them.

| Question | What these sources establish | Status | Sources / gap |
| --- | --- | --- | --- |
| What happens when the future all-languages flag is activated while manual translations exist? | Nothing in these ten files specifies overwrite, adoption, exclusion, conversion, or conflict UI. | Open Question | No supporting discussion in this block. |
| What happens when the flag is deactivated? | No deletion, detachment, conversion, or persistence rule is stated. | Open Question | No supporting discussion in this block. |
| How are automatically synchronized copies distinguished from independently edited translations? | Enforced synchronization is proposed conceptually, but no provenance/marker/state model is defined. | Open Question | Transcript 2026-06-11 lines 431-440 provides only the concept. |
| How are new site languages handled? | The “sync to all” concept suggests creation/synchronization into target languages, but no trigger, timing, retry, or conflict behavior is described. | Open Question | `MeetingMinutes/Weekly/2026/06/11.md:74-74`; no lifecycle details. |
| Who owns structural identity without language `0`? | Two alternatives exist: an explicitly flagged real default language or a neutral hidden structural layer. No selection is made. | Open Question | `MeetingMinutes/Weekly/2026/06/11.md:66-80`; transcript lines 449-458. |
| Can any localized variant become a source/lead? | The wizard demonstrates separation of `l10n_source` and `l10n_parent`, but structural lead remains the default record in the tested model. A translation becoming structural lead was treated as something current TYPO3 should not invent. | Open Question | Transcript 2026-07-24 lines 425-470, 550-592. |
| Full language layers versus neutral layer | Automatic shadow records and a neutral layer are mentioned, but no complete-layer algorithm, record-count estimate, or comparison of hybrid designs is developed in this block. | Open Question | Transcript 2026-06-11 lines 408-418; `MeetingMinutes/Weekly/2026/07/10.md:58-58`. |
| Shadow-record lifecycle | No create/update/remove rules, editor visibility model, Workspace behavior, Reference Index behavior, or Versioning rules are specified. | Open Question | Prototype mention only: `MeetingMinutes/Weekly/2026/06/11.md:82-86`. |
| Restore/delete/workspace conflicts | These are explicitly recognized for duplicate-parent integrity, showing that any automatic-record lifecycle must account for them, but no solution is given. | Open Question | `MeetingMinutes/Weekly/2026/07/24.md:59-63`; transcript lines 317-335. |
| Database growth versus runtime/code simplicity | Code complexity is the stated pain; database complexity is acknowledged as a counterargument. There is no measurement or choice. | Open Question | Transcript 2026-07-10 lines 121-168. |
| Migration/deprecation/compatibility | A migration path away from `-1` was part of the earlier plan, but no phases, upgrade wizard, compatibility layer, feature flag, or deprecation contract are defined. | Open Question | `MeetingMinutes/Weekly/2026/07/24.md:29-35`; transcript lines 103-146. |
| BCP 47 details | BCP 47 is the preferred semantic identifier in June, but authoritative storage, scripts/regions/private subtags, legacy mapping, and internal numeric-key retention are not decided. | Open Question | `MeetingMinutes/Weekly/2026/06/11.md:74-80`; transcript lines 442-458. |
| Editing Language | There is no explicit “Editing Language” concept in these ten files. Editor-first creation and a generic dimension-aware backend are adjacent ideas, not evidence of an Editing Language design. | Open Question | Negative full-text finding; closest evidence: transcript 2026-06-26 lines 514-544 and transcript 2026-07-10 lines 232-256. |
| Free Mode deprecation | No source in this block proposes a formal deprecation of Free Mode. The documents criticize its UX and impossible/misleading choices, and seek to preserve valid independence where connection has no value. | Open Question | `MeetingMinutes/Weekly/2026/06/26.md:75-80`; `MeetingMinutes/Weekly/2026/07/24.md:65-75`. |

## Plausible migration path supported by this block

This is a source-constrained reconstruction, not a fixed plan.

1. **Already Started / In Progress:** inventory and characterize `sys_language_uid = -1` behavior with tests. Exact `92267` content is outside this source block. (`MeetingMinutes/Weekly/2026/07/24.md:29-35`)
2. **In Progress in parallel:** merge small, observable fixes that clarify current invariants—Mount Points, duplicate-parent prevention, Free Mode wizard semantics, and empty-`l10n_source` lookup. (July 24/31 sources above)
3. **Discussed Direction:** define an explicit alternative for language-all, initially a boolean plus system-enforced synchronization. (`MeetingMinutes/Weekly/2026/06/11.md:62-74`)
4. **Depends on Architecture Decision:** choose how structural identity survives removal of special `0`: explicit default flag, neutral identity/structure layer, or a compatible combination. (`MeetingMinutes/Weekly/2026/06/11.md:66-80`; `MeetingMinutes/Weekly/2026/07/10.md:58-58`)
5. **Discussed Direction:** introduce stable semantic language identity, with BCP 47 the named candidate, enabling cross-site reuse. (June 11 and July 10 sources)
6. **Depends on Architecture Decision:** prototype editor behavior and data implications of shadow records/structural layer before committing to a complete-layer strategy. (`MeetingMinutes/Weekly/2026/06/11.md:82-86`)
7. **Analytically Derived Recommendation:** before any mutating rollout, specify provenance and reversible lifecycle transitions for auto-created records, then test Workspaces, restore/delete, references, and migration collisions. This follows necessarily from the explicit restore/Workspace consistency concerns and the absence of lifecycle rules; it is not a recorded initiative decision. (`MeetingMinutes/Weekly/2026/07/24.md:59-63`)
8. **Analytically Derived Recommendation:** treat the work as parallel tracks—characterization, bounded correctness fixes, architecture/PoC, and migration design—rather than repeating the June sequence as a single linear roadmap. This follows from the July governance uncertainty and simultaneous patch activity. (`MeetingMinutes/Weekly/2026/07/24.md:27-35`)

## Session-ready examples and narrative evidence

### Essential examples

1. **Mostly connected, selectively different:** a global/default structure contains shared content, while a US market adds one local event teaser. Today the extra element creates Mixed Mode or requires a hidden default counterpart; the exception weakens support for the shared majority. (`MeetingMinutes/Weekly/2026/06/26.md:56-62,194-212`; transcript lines 367-404, 470-483)
2. **All languages without a fake language:** contrast `sys_language_uid = -1` with a source record carrying explicit synchronization intent, initially all targets and later selected language groups. (`MeetingMinutes/Weekly/2026/06/11.md:62-74`)
3. **Two sites, one semantic language:** identical Esperanto presets become numeric IDs 9 and 10; alternatively the same ID can mean differently titled languages. This live finding cleanly motivates stable semantic identity. (`MeetingMinutes/Weekly/2026/07/31.md:55-61`; transcript lines 281-297, 315-359)
4. **Regional chain:** UK reuses 95% of general English but must never fall through to German. This separates valid product need from the wrong strict-mode workaround and introduces explicit fallback semantics. (`MeetingMinutes/Weekly/2026/07/31.md:41-45`)
5. **Real global storage:** three sites with different language configurations share a global storage area that may carry twenty translations even when an individual site exposes only two. Mount Points provide page-based editing; the use case grounds cross-site/global multilingual records in a real project. (`MeetingMinutes/Weekly/2026/07/24.md:19-25`; transcript lines 36-49)

### Useful examples

6. **Intentional absence:** missing translation triggers fallback, while an explicitly disabled translation currently still falls back. The possible future semantics make “not translated” and “do not show here” distinct. (`MeetingMinutes/Weekly/2026/07/10.md:70-80`)
7. **Free source cannot create a connection:** when French is Free Mode, choosing Translate still yields no `l10n_parent`; TYPO3 cannot invent a structural relation. (`MeetingMinutes/Weekly/2026/07/24.md:67-73`)
8. **One parent, two translations:** a selector that offers already-occupied parents allows an invalid-looking structure and inconsistent module output. This illustrates why relations should be system-managed. (`MeetingMinutes/Weekly/2026/07/24.md:57-63`; `MeetingMinutes/Weekly/2026/07/31.md:31-37`)

### Recommended visual comparisons

- Default language today: one box labeled “visible content + structural lead” splitting into the two responsibilities; then compare an explicit identity/structure node with language-specific records.
- Five-structure continuum: identical → reduced → enriched → changed → independent; highlight enriched/“mostly connected” as the central gap.
- Two-site identity mismatch: same BCP-47 language, different numeric IDs; inverse case: same numeric ID, different labels.
- Sparse versus explicit data model: show gaps/overlay/fallback conditions on one side and explicit/shadow records on the other, but label the latter **Open Question**, because this block does not establish a chosen complete-layer architecture.
- Evolution rather than roadmap: Characterize/Test and bounded fixes can run in parallel with Architecture/PoC and Migration/Lifecycle design.

## Every reviewed file

| File | Full extent read | T3DD26 evidence | Notes |
| --- | --- | --- | --- |
| `MeetingMinutes/Weekly/2026/06/11.md` | lines 1-94 | Yes | Strategic `-1`/`0`/BCP 47/hidden-layer sequence; explicit synchronization; automatic shadow-record prototype; strict fallback bug. |
| `MeetingMinutes/Weekly/2026/06/26.md` | lines 1-238 | Yes | Full product narrative; localization versus structural regionalization; unified structural layer; default-language workaround; fallback scope. |
| `MeetingMinutes/Weekly/2026/07/10.md` | lines 1-80 | Yes | Product-value framing; five use cases; cross-site identity; structural layer explicitly a hypothesis; dimensions; disabled-fallback case. |
| `MeetingMinutes/Weekly/2026/07/24.md` | lines 1-81 | Yes | Merged Mount Point patch; post-Dialog-Days uncertainty; `-1` test direction; Free/Mixed Mode; parent and wizard findings. |
| `MeetingMinutes/Weekly/2026/07/31.md` | lines 1-65 | Yes | Read-only untracked source. `l10n_source` patches; selector prototype; regional fallback refinement; site-scoped fallback and cross-site identity findings. |
| `Transcripts/2026-06-11 14-00-45 - Meeting der Initiative.txt` | lines 1-592 (591 newline-counted) | Yes | Full context behind strict semantics and the June architecture sequence, including enforced synchronization and two alternatives for `0`. |
| `Transcripts/2026-06-26 12-00-22 - Meeting der Initiative.txt` | lines 1-828 (827 newline-counted) | Yes | Long off-topic governance opening, then detailed use cases, structure/translation separation, pages/content/record comparison, and product benefits. |
| `Transcripts/2026-07-10 12-01-17 - Meeting der Initiative.txt` | lines 1-509 (508 newline-counted) | Yes | Strategic ask, code-versus-data framing, BCP/cross-site rationale, dimensions, live fallback reproduction. |
| `Transcripts/2026-07-24 12-01-03 - Meeting der Initiative.txt` | lines 1-640 (639 newline-counted) | Yes | Patch detail and real global-storage use case; `-1` test status; live Free/Mixed Mode and wizard investigation. |
| `Transcripts/2026-07-31 11-32-06 - Meeting der Initiative.txt` | lines 1-381 (380 newline-counted) | Yes | `l10n_source` context; parent-selector technical prototype; strict use-case refinement; site-language identity/fallback live findings. |

No reviewed file was entirely without relevant evidence. Off-topic passages (travel, scheduling, and the governance discussion before the 2026-06-26 technical section) were read but produced no T3DD26 translation-architecture evidence.

## Guardrails for the parent synthesis

- Do not call the hidden structural layer, full language layers, shadow records, or the June sequence decided architecture.
- Do not state that Free Mode deprecation was agreed; the newest evidence preserves valid independence and only removes impossible/misleading choices.
- Do not attribute exact test areas or findings to Gerrit `92267` from these sources.
- Do not claim the Site Configuration Languages constraint for `-1` tests is evidenced here; it is absent.
- Do not mark patches `94914`, `94916`, `94915`, or `94917` Implemented from this block without external status verification. Only `94831` is explicitly said to be merged.
- Preserve the July 31 narrowing of parent-selector rules and the correction of the Free-source wizard rule.
- Keep all all-languages/shadow-record activation, deactivation, provenance, deletion, detachment, and migration behaviors visibly open.
