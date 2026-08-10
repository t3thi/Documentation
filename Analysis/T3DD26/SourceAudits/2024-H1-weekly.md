# T3DD26 source dossier: Weekly minutes, January-June 2024

## Scope and method

- Reviewed every Markdown document under MeetingMinutes/Weekly/2024/01 through MeetingMinutes/Weekly/2024/06 in full.
- Scope contains 23 files and 1,947 physical lines according to wc; no Markdown file in the requested directories was skipped.
- Each evidence item has exactly one of the ten required status labels.
- Session priority uses the requested Essential / Useful / Optional / Too Detailed scale.
- Statements below report the historical state documented in H1 2024. Later sources must take precedence when the final analysis determines the current 2026 state.

## High-value synthesis for the parent analysis

1. The strongest H1 2024 architectural thread is not yet a settled target architecture. It begins with a January proposal to replace language −1 with a Boolean on a default-language record plus DataHandler-created language copies, develops into field-level enforceable synchronization, and by June is explicitly recognized as too simple unless existing independent translations, provenance, transitions, and per-target synchronization policy are handled.
2. BCP 47 is repeatedly treated as the stable semantic language identity needed for cross-site/global records, files, and exchange across instances. The sources often speak of replacing the integer field with a string, not merely adding a label beside an internal numeric ID; the more nuanced “BCP 47 semantic identity plus internal numeric reference” model is therefore an analytical synthesis, not directly established in this period.
3. The special role of language 0 is attacked through a configurable-default-language patch and proposed deprecation of literal numeric checks. That work is then explicitly put on hold in late June because Lolli and Benni regard removal of −1 as a prerequisite.
4. The data-model direction grows stronger over the half-year: database denormalization is accepted as a way to reduce complexity; records should exist in every language for consistent relations; and a June mission statement proposes self-contained language layers. However, automatic hidden default-language control records had been explicitly rejected in March because of structural and editorial confusion. These are related but not identical proposals and must not be collapsed into consensus for shadow records.
5. TransFusion is an important prototype and UX research vehicle for reconnecting Free/Connected content, but the initiative decided it should not simply be moved into Core. Core should evolve so that such a repair tool is no longer necessary.
6. The technical operating principle is already “understand/test first”: characterize current behavior, repair invalid functional-test fixtures, cover Workspaces, split large changes, introduce preparatory patches, and only then alter semantics.

## Chronological evidence matrix

### 2024-01-05

Source: MeetingMinutes/Weekly/2024/01/2024-01-05.md

- **Current Core Behavior** — PageRepository::getLanguageOverlay sorting was understood as a local construct needed by array_pop; the group still questioned creation of a new LanguageAspect there. This is evidence of opaque localized-record resolution rather than a broad architectural requirement. Session priority: Too Detailed. Source lines 20-24.
- **Problem** — getLanguageOverlay had become substantially larger after multi-level content fallback; direct calls to getPageOverlay/getPagesOverlay were questioned, and treating pages differently from other records causes trouble for sys_file_reference and inline tables. Session priority: Useful. Source lines 26-34.
- **Current Core Behavior** — TYPO3 requires a page for persisted records; translated records can only be stored when the page or storage page exists in the target language, and a storage page cannot exist only in the target language because a default-language page is required. Session priority: Essential. Source lines 36-40.
- **Open Question** — All approaches discussed up to then retained a default language; the group had not established whether a world without one was possible or desirable. Session priority: Essential. Source lines 42-46.
- **Idea** — A contentless structural layer for all records, including pages and content, could remove the code-level pages/content distinction. Session priority: Essential. Source lines 44-48.
- **Open Question** — The initiative wanted Core feedback on whether a feature switch toward a centralized class was the right route to make language processes uniform and comprehensible. Session priority: Too Detailed. Source lines 54-60.
- **Planned** — The group planned process documentation based on Xdebug/XHProf and Mermaid, starting from test-extension scenarios and covering content, pages, menus, sitemaps, links, and possibly slugs. This is early evidence for an Understand phase before change. Session priority: Useful. Source lines 62-87.
- **Problem** — getLanguageOverlay is used in frontend and backend contexts; the initiative planned to focus on frontend first but noted that future Core changes need a clear backend boundary. Session priority: Too Detailed. Source lines 89-91.

### 2024-01-12

Source: MeetingMinutes/Weekly/2024/01/2024-01-12.md

- **In Progress** — The test extension was being completed for combinations of Free/Connected/Mixed content modes, Free/Strict/Fallback frontend fallback types, and fallback chains; the TransFusion prototype was intended to test wizard behavior. Session priority: Useful. Source lines 20-26.
- **Discussed Direction** — Proven prototype components might eventually move into Core, and the extension should ideally become unnecessary through Core functionality. This was an aspiration, not a Core roadmap. Session priority: Useful. Source lines 28-30.
- **Implemented** — In the prototype, dynamic setup of Free/Connected/Mixed modes was finished for simple content. DataHandler performance limitations were observed, and complex content such as image relations remained future work. Session priority: Useful. Source lines 52-64.
- **Current Core Behavior** — getLanguageOverlay is called in frontend and backend; the backend use applies to pages with translated content. Session priority: Too Detailed. Source lines 66-72.
- **Problem** — The same language-fallback methods serving frontend and backend were considered questionable, reinforcing the need to disentangle contexts before architectural changes. Session priority: Too Detailed. Source lines 68-72.

### 2024-01-19

Source: MeetingMinutes/Weekly/2024/01/2024-01-19.md

- **Current Core Behavior** — Language −1 is a virtual language ID that makes a record identical and visible in all languages. Session priority: Essential. Source lines 25-27.
- **Problem** — The editor must be granted access to −1; switching an already translated element to −1 retains translations; −1 breaks derivation chains and permits transfer between languages. The minutes call it “Broken by Design.” Session priority: Essential. Source lines 29-38.
- **Preferred Direction** — The meeting states unequivocally that −1 must be removed or replaced. Session priority: Essential. Source lines 36-38.
- **Discussed Direction** — Lolli proposed a Boolean on the default-language record, only there, and DataHandler copies in each translated page so sorting remains correct. This is a proposed replacement, not an implemented plan. Session priority: Essential. Source lines 40-45.
- **Discussed Direction** — Editors without access to the default language would neither set the flag nor edit generated target-language placeholders, although those records would remain visible. Session priority: Useful. Source lines 46-46.
- **Discussed Direction** — Proposed lifecycle rules were: setting the flag copies into target languages; editing the source synchronizes copies; a new page translation is populated; deleting a page translation deletes its copy; clearing the flag deletes all target-language copies. Session priority: Essential. Source lines 48-55.
- **Idea** — Jo named the proposed behavior Enforce Language Synchronization, by analogy with Allow Language Synchronization. Session priority: Essential. Source lines 56-56.
- **Open Question** — Free-mode records need not have a discoverable default-language source. Lolli tentatively thought the All Languages function should therefore be unavailable in Free Mode. Session priority: Essential. Source lines 58-62.
- **Discussed Direction** — Removing −1 was expected to remove DataHandler special handling and sorting problems because each language would contain a correctly placed placeholder. Session priority: Essential. Source lines 64-67.
- **Problem** — Switching Free Mode back to Connected Mode must handle source-only and target-only records; l10n_source may point to the record copied from rather than the default-language record. Session priority: Essential. Source lines 69-76.
- **Problem** — Shared records across site trees currently require the same default language. Session priority: Essential. Source lines 78-80.
- **Preferred Direction** — The minutes say solving cross-site language identity requires changing language storage from integer to string, preferably a BCP 47 language tag. This would allow derivation chains independent of a privileged default language. Session priority: Essential. Source lines 80-84.
- **Idea** — A content-free, backend-invisible default-language structure layer was discussed, but the group was unsure whether it would create excessive complexity. Session priority: Essential. Source lines 84-86.
- **Current Core Behavior** — DataHandler uses a special code path for pages; related records such as pages.media FAL references are therefore not localized like relations of ordinary records. Session priority: Useful. Source lines 88-92.
- **In Progress** — A long-running patch intended to treat pages like other localizable records, including inline relations, was blocked by numerous functional tests. Session priority: Useful. Source lines 90-96.
- **Preferred Direction** — Meticulous functional tests are required for DataHandler changes; affected tests should be adapted before the patch can land. Session priority: Essential. Source lines 94-96.
- **Discussed Direction** — Lolli regarded removing −1 as a prerequisite for fundamental work on fallback types. Clear bugs could proceed, while conceptual changes should follow later. Session priority: Essential. Source lines 104-110.
- **Problem** — Mixing frontend fallback types with backend Free/Connected/Mixed modes was considered hard to understand. Session priority: Useful. Source lines 112-114.
- **Idea** — Lolli suggested editors should no longer be able to create Mixed Mode. This is one participant’s suggestion, not a recorded decision. Session priority: Useful. Source lines 114-116.
- **Preferred Direction** — Any translation-handling change must work in Workspaces to have a realistic chance of acceptance. Session priority: Essential. Source lines 118-120.
- **Planned** — The initiative’s development method was to derive small steps from a broad direction, coordinate fundamental patches with reviewers, use a large PoC if helpful, extract preparatory patches, and pursue strategy, prototypes, bug fixes, and pre-patches in parallel. Session priority: Essential. Source lines 122-135.
- **Current Core Behavior** — Default-language records must have 0 in l10n_parent and/or l10n_source; DB Doctor can expose violations. Session priority: Too Detailed. Source lines 143-145.
- **Preferred Direction** — Database redundancy was explicitly accepted as non-problematic. Session priority: Essential. Source lines 147-149.
- **Idea** — Lolli proposed removing t3_origuid to reduce complexity, while acknowledging its impact was not yet understood. This is later revised by prototype findings. Session priority: Useful. Source lines 151-161.
- **Discussed Direction** — Removal of −1 was considered too large for the first patch; smaller Core changes should be started directly, while major changes require prior reviewer consultation. Session priority: Useful. Source lines 163-170.
- **Discussed Direction** — The Core generally avoids feature toggles because they delay real usage, feedback, and bug discovery and force extensions to support two variants. Breaking changes plus rapid follow-up were presented as preferable in many cases. Session priority: Useful. Source lines 172-184.
- **Preferred Direction** — Core tests are a primary source for understanding supported behavior; missing coverage should be added, with FlexForm handling cited as weakly covered. Session priority: Essential. Source lines 186-194.
- **Problem** — The test extension still failed to represent content created only in a non-default language without a default-language counterpart. Session priority: Useful. Source lines 228-234.

### 2024-02-02

Source: MeetingMinutes/Weekly/2024/02/2024-02-02.md

- **Current Core Behavior** — Four distinct relation/identity fields were described: sys_language_uid identifies record language; t3_origuid identifies the original copy source; l10n_source identifies the content source, which may be non-default; and l10n_parent connects to the default-language record only in Connected Mode. Session priority: Essential. Source lines 26-38.
- **Current Core Behavior** — Localization is a two-step copy plus data insertion process; a Spanish record can be copied from English while receiving content from French, and l10n_parent differentiates Connected from Free Mode. Session priority: Essential. Source lines 36-50.
- **Problem** — A target-language-only element in Free Mode cannot be assigned automatically when switching to Connected Mode and requires a wizard; other cases were considered automatable. Session priority: Essential. Source lines 52-58.
- **Discussed Direction** — Discovering a default-language ancestor could recursively follow l10n_source, but the prototype only performed one extra check at this point. Session priority: Useful. Source lines 54-58.
- **Problem** — Deeper derivation chains weaken semantic confidence because editors may copy structure and then replace content entirely. Session priority: Essential. Source lines 60-60 and 74-79.
- **In Progress** — TransFusion was testing six combinations of source language and resulting mode; t3_origuid was considered necessary for confident distinction of non-default copy sources. Session priority: Useful. Source lines 62-72.
- **Open Question** — Arbitrarily nested Content Blocks create an additional identity/localization dimension; the v12 prototype deferred deeper nesting although v13 compatibility would require it. Session priority: Useful. Source lines 81-83.

### 2024-02-09

Source: MeetingMinutes/Weekly/2024/02/2024-02-09.md

- **Discussed Direction** — Despite the prior claim that t3_origuid was important, the group tentatively thought its information might be recursively reconstructed from l10n_source at a performance cost. Session priority: Useful. Source lines 28-31.
- **Preferred Direction** — WIP Core changes were to be developed through the official review system rather than a separate team repository. Session priority: Too Detailed. Source lines 20-26.

### 2024-02-16

Source: MeetingMinutes/Weekly/2024/02/2024-02-16.md

- **Implemented** — t3_origuid had largely been removed from Core for v13 by change 82888. Session priority: Useful. Source lines 20-24.
- **Problem** — l10n_source cannot prove structural origin because a record may have been copied from another target language merely as a template and then rewritten. Session priority: Essential. Source lines 24-28.
- **Problem** — t3_origuid was found unreliable in Workspaces because workspace copies can store IDs of records that do not exist live. Consequently TransFusion could not safely automate all assignments. Session priority: Essential. Source lines 28-30.
- **Preferred Direction** — Because neither surviving field gives certainty, the prototype must ask the editor for confirmation; Jo also wanted a reliable alternative identity mechanism. Session priority: Essential. Source lines 28-30 and 38-40.
- **Problem** — Bug 97763 leaves the Translate button available after localization from a non-default source; BackendUtility::getRecordLocalization checks l10n_source before l10n_parent, and Free Mode lacks a reliable existence test after t3_origuid removal. Session priority: Useful. Source lines 32-40.
- **Planned** — Jo intended to submit a patch for Bug 97763. Session priority: Too Detailed. Source lines 58-69.
- **Problem** — Core patches require functional tests that may be expensive, and existing tests can freeze behavior that is itself broken by design. Session priority: Essential. Source lines 42-48.

### 2024-02-23

Source: MeetingMinutes/Weekly/2024/02/2024-02-23.md

- **In Progress** — TransFusion was implementing a workflow for orphaned target-language elements: show them separately, delete them, or create a new parent; moving unassigned elements was planned for phase two. Session priority: Useful. Source lines 20-26.
- **Problem** — Recursive l10n_source resolution after t3_origuid removal can be expensive, especially across many languages and records; a 50-language/100-element page was given as a stress case. Session priority: Useful. Source lines 28-36.
- **Idea** — CTE queries were viewed as the remaining way to resolve derivation chains efficiently because Lolli opposed adding another field. Session priority: Too Detailed. Source lines 34-36.
- **Current Core Behavior** — DataHandler still distinguished pages from tt_content due to legacy pages_language_overlay code and localized pages via copy plus updates rather than the normal localize command. Session priority: Useful. Source lines 38-44.
- **Problem** — This special page path fails to create related records or places them under the wrong parent; fixing it first required straightening failing functional tests. Session priority: Useful. Source lines 40-48.
- **Preferred Direction** — The group said Free Mode for pages made no sense because page-tree structure requires pages to remain connected, implying connected inline children. Session priority: Useful. Source lines 50-54.
- **Problem** — Mandatory connected children conflict with existing language-specific relations, such as a different header image, and existing installations already contain such deviations. Session priority: Essential. Source lines 54-58.
- **Discussed Direction** — Translatable files, considered possible only after unambiguous string/BCP-47 language identity, could resolve the file-reference migration problem. Session priority: Essential. Source lines 58-60.
- **Idea** — Without translatable files, one migration option was hidden default-language references for target-language deviations. Session priority: Useful. Source lines 60-62.
- **Current Core Behavior** — l10n_mode=exclude hides localized fields and DataHandler copies source values into localized records and keeps them synchronized. Session priority: Essential. Source lines 66-74.

### 2024-03-01

Source: MeetingMinutes/Weekly/2024/03/2024-03-01.md

- **Current Core Behavior** — Copy/move transfers all translations even when the target page does not support them, creating overhanging translations. Supported languages depend on site configuration and actual page translations. Session priority: Useful. Source lines 21-33.
- **Open Question** — Proposed handling ranged from silently discarding unsupported translations, warning, or asking the editor which to keep; large language counts could make the modal confusing. Session priority: Useful. Source lines 35-42.
- **Problem** — Cross-root copy/move can interpret the same numeric language ID as different languages in source and target sites. Locale mapping was considered too error-prone; retaining the ID knowingly risks a language change. Session priority: Essential. Source lines 44-46.
- **Preferred Direction** — Lolli and André saw string-based language identity such as BCP 47 as the only real solution to cross-root mismatch. Warnings and documentation to keep IDs aligned were interim mitigations. Session priority: Essential. Source lines 44-48.
- **Preferred Direction** — For behavior changes, first create a test, observe current Core behavior, encode it in expected CSV, and only then define and introduce changed behavior step by step. Session priority: Essential. Source lines 48-52.
- **Problem** — A concrete Turkish-branch use case required editors without default-language access to create language-specific pages and structures; current practice forces restricted editing, default access, or a separate tree. Session priority: Essential. Source lines 54-64.
- **Idea** — A pure structural default layer could create a control record whenever target-language-only content is created, but was recognized as a massive breaking change. Session priority: Essential. Source lines 64-66.
- **Open Question** — Dynamically changing which language acts as default after string identity could make derivation histories and structures unmanageable; nested root sites were another workaround. Session priority: Useful. Source lines 68-70.
- **Preferred Direction** — The group explicitly rejected automatic background creation of default-language control records for target-language editors because sorting and cross-language structure could become opaque; structural changes should remain controlled by editors with default-language access. Session priority: Essential. Source lines 72-72.
- **Current Core Behavior** — Connected Mode preserves structure and sorting but requires default-language records; target-specific page relations can require hidden source records. Session priority: Essential. Source lines 74-84.
- **Open Question** — Whether pages themselves should offer a Free/Connected choice remained unresolved because language variants can be pure translations or structurally distinct localizations. Session priority: Essential. Source lines 82-88.
- **Discussed Direction** — A radical “everything connected” consequence was explored and rejected as incompatible with real installations; if Free Mode remains for content, other page-linked records must also allow freedom somewhere in the hierarchy. Session priority: Essential. Source lines 90-96.
- **Problem** — Relation hierarchy does not currently preserve modes consistently, although that inconsistency was regarded as a bug. Session priority: Useful. Source lines 98-100.
- **Discussed Direction** — Page/record localization could not yet be standardized because files were not translatable; translatable files would enable language-specific replacement and localization, including empty relations. Session priority: Essential. Source lines 102-108.
- **Open Question** — Mandatory page-level connection creates hidden source-record overhead for structural deviations, such as a third localized slider image. Moving all such relations to content was proposed but not accepted. Session priority: Essential. Source lines 110-112.
- **Idea** — Connected/Free semantics could be decomposed into field configuration: Enforce Language Synchronization for mandatory synchronized fields and Allow Language Synchronization for editor-selectable synchronization. Session priority: Essential. Source lines 114-123.
- **Preferred Direction** — The group considered both allow and enforce behaviors valid for different use cases. Session priority: Essential. Source lines 120-125.
- **Current Core Behavior** — l10n_mode=exclude already synchronizes field content, but relations point to the default-language related record rather than each language’s localized relation target. Session priority: Useful. Source lines 127-129.
- **Preferred Direction** — The initiative explicitly accepted database denormalization to reduce translation-handling complexity, saying database complexity rather than size was the real problem. Session priority: Essential. Source lines 131-135.

### 2024-03-08

Source: MeetingMinutes/Weekly/2024/03/2024-03-08.md

- **Implemented** — The first TransFusion prototype met its announced technical scope; documentation and interface refinements remained. This is prototype status, not Core implementation. Session priority: Useful. Source lines 26-34.
- **Planned** — The proposed next prototype phase included TYPO3 v13 support after t3_origuid removal, arbitrary-depth inline relations, and manual assignment where no connection could be inferred. Session priority: Useful. Source lines 36-42.
- **In Progress** — Change 83310 began with tests to characterize copying localized records into targets lacking the languages; Copy and Move were deliberately split into separate patches. Session priority: Useful. Source lines 48-56.
- **In Progress** — Astrid planned functional tests to prove that faulty l10n_mode=exclude behavior predated Lolli’s page-localization patch and had merely become visible through new tests. Session priority: Useful. Source lines 58-64.

### 2024-03-22

Source: MeetingMinutes/Weekly/2024/03/2024-03-22.md

- **Problem** — An editor confirmed a valid hybrid use case: most elements remain connected but a few language-specific elements diverge. Current options are Mixed Mode with sorting defects or hidden default-language elements with extra editorial work; both were judged unsatisfactory. Session priority: Essential. Source lines 27-42.
- **Current Core Behavior** — Sorting supports only insertion at the beginning or after all existing elements, so relative positions can drift across languages. Session priority: Useful. Source lines 44-55.
- **Current Core Behavior** — Extensions such as l10nmgr/localizer already export/import translations via Excel/XML or translation-service APIs. Session priority: Optional. Source lines 57-59.
- **Planned** — For the prototype, returning temporarily to Connected Mode should trigger a sort reset based on the default language. Session priority: Optional. Source lines 61-65.
- **Problem** — Page-module multi-language editing loses context through scroll jumps, especially in installations with 30-plus languages. Session priority: Optional. Source lines 67-80.
- **Discussed Direction** — The first UI step should permit selecting several displayed languages; reusable language bundles such as en-GB and en-CA could build on it. Session priority: Optional. Source lines 82-88.
- **Open Question** — l10n_mode=exclude could not be fixed narrowly without reconsidering the concept, including whether DataHandler should manage it at all. Session priority: Useful. Source lines 100-106.

### 2024-03-29

Source: MeetingMinutes/Weekly/2024/03/2024-03-29.md

- **Implemented** — The TransFusion connector classified target records as orphaned, possible, obvious, or confirmed based on l10n_parent, l10n_source chains, and, in v12, t3_origuid. This is prototype behavior. Session priority: Useful. Source lines 42-53.
- **Problem** — With t3_origuid gone in v13, an “obvious” relation can no longer be proven; distance along l10n_source only supplies decreasing confidence. Session priority: Essential. Source lines 48-61.
- **Idea** — AI might later compare content semantically to propose or audit relationships, explicitly as educated guesses. Session priority: Optional. Source lines 65-67.
- **Open Question** — Disconnecting a confirmed relationship destroys information that might reconstruct it, but retaining that information could leave the repair tool in a worse ambiguous state. Session priority: Useful. Source lines 69-75.
- **In Progress** — Change 83310 revealed invalid shared DataHandler fixtures containing content languages without corresponding page translations, a state the backend normally cannot create. Session priority: Essential. Source lines 85-89.
- **In Progress** — Preparatory change 83555 created missing page translations, removed test workarounds, and moved toward scenario-specific CSV fixtures rather than a globally inconsistent dataset. Session priority: Essential. Source lines 91-107.

### 2024-04-05

Source: MeetingMinutes/Weekly/2024/04/2024-04-05.md

- **In Progress** — Preparatory change 83555 had updated all CSV fixtures and nearly all functional tests; Workspace Modify failures remained. The change affected test validity, not Core behavior. Session priority: Essential. Source lines 39-47.
- **Preferred Direction** — TransFusion should not simply become Core functionality; it repairs existing Core problems and serves as a prototype to clarify direction and feasibility, especially for nested inline relationships. Session priority: Essential. Source lines 51-57.
- **Current Core Behavior** — For inline relations marked l10n_mode=exclude, Core creates target-language children yet can append “Translate to XYZ”; copies can still be edited later even though values were expected to remain synchronized. Session priority: Useful. Source lines 59-80.
- **Open Question** — It was unresolved whether the “value” protected by l10n_mode=exclude is merely the relation UID or the complete related record and whether that record may be edited through another context. Session priority: Useful. Source lines 82-98.
- **Open Question** — The same related record can be referenced once with and once without l10n_mode=exclude; synchronizing from one context can overwrite legitimate editing from another. No conclusive resolution was found. Session priority: Useful. Source lines 100-104.
- **Discussed Direction** — A reviewed MM patch proposed storing only default-language UIDs and overlaying in Extbase, while the initiative’s longer-term desire was localized UIDs and eventually no overlays. The group flagged the patch negatively for further discussion. Session priority: Essential. Source lines 106-119.
- **Problem** — Extbase assumes default-language UIDs, making localized-UID storage a breaking and costly change; mandatory overlays were also associated with performance cost. Session priority: Useful. Source lines 113-117.

### 2024-04-12

Source: MeetingMinutes/Weekly/2024/04/2024-04-12.md

- **Preferred Direction** — When copying, translations unavailable in the target should not be copied. Moving is harder because discarding them risks data loss, while leaving them behind violates consistency. Session priority: Useful. Source lines 22-34.
- **Planned** — Implement the simpler, consistency-preserving Copy case first, then design Move with editor notification/cancellation; soft deletion was a possible recoverable strategy. Session priority: Useful. Source lines 34-38.
- **Problem** — l10n_mode=exclude across MM relations can require synchronization from both directions and traversal of foreign tables, making the operation expensive and semantically ambiguous. Session priority: Too Detailed. Source lines 40-56.
- **Current Core Behavior** — Inline relation storage based on default-language UIDs is deeply rooted; the Reference Index is the component that maps final localized relation IDs. Session priority: Useful. Source lines 56-62.
- **Preferred Direction** — Despite the April 5 desire for localized UIDs, the group agreed to retain default-language UID storage for the foreseeable future because changing it was too large. Session priority: Essential. Source lines 58-62.
- **Discussed Direction** — l10n_mode=exclude and l10n_state solve related synchronization problems; Lolli considered replacing exclude with an enforceable l10n_state. Session priority: Essential. Source lines 64-68.
- **Open Question** — The presumed equivalence between exclude and l10n_state without an editor selector still needed proof, and Workspace support for l10n_state was unfinished. Session priority: Essential. Source lines 66-70.
- **Preferred Direction** — The strategy judged more suitable was to retire l10n_mode=exclude and extend l10n_state, putting direct exclude patches on hold. Migration remains complex where both configurations coexist. Session priority: Essential. Source lines 70-74.

### 2024-04-19

Source: MeetingMinutes/Weekly/2024/04/2024-04-19.md

- **Problem** — TCA eval=unique behaves language-aware for slug fields but not input fields. The inconsistency should be fixed but was explicitly low priority. Session priority: Too Detailed. Source lines 20-31.
- **In Progress** — Team members were collaborating on revision of the many CSV fixtures in Core change 83632. Session priority: Too Detailed. Source lines 33-35.

### 2024-04-26

Source: MeetingMinutes/Weekly/2024/04/2024-04-26.md

- **In Progress** — Tests for change 83632 were complete and awaiting review/commit-message refinement, with possible Reference Index hash regeneration. Session priority: Too Detailed. Source lines 20-28.
- **Preferred Direction** — The initiative stated that a record must exist in all languages to keep relation structure consistent; reliable synchronization from the default record avoids duplicate editorial maintenance. Session priority: Essential. Source lines 30-36.
- **Discussed Direction** — Retiring l10n_mode entirely, not just exclude, would also require a replacement for prefixLangTitle. Session priority: Useful. Source lines 38-46.
- **Problem** — Adding allowLanguageSynchronization after independent translations exist can overwrite them because an empty l10n_state defaults to the source value until JSON is written. Session priority: Essential. Source lines 48-52.
- **Discussed Direction** — A safe migration can prepopulate “custom value” per translated record and, when l10n_state is empty, detect divergent target values before save. Session priority: Essential. Source lines 52-56.
- **Discussed Direction** — Language-aware uniqueness should be explicit and uniform across field types via variants such as uniqueInLanguage and uniqueInSiteAndLanguage. Session priority: Too Detailed. Source lines 58-69.

### 2024-05-10

Source: MeetingMinutes/Weekly/2024/05/2024-05-10.md

- **In Progress** — The team believed change 83310 had met merge criteria and requested Core review. Session priority: Too Detailed. Source lines 20-24.
- **Preferred Direction** — Copy should discard translations only when the target page lacks that page translation; site configuration should not decide the copy operation. Session priority: Useful. Source lines 26-38.
- **Problem** — Removing a site language later can leave orphaned records; the initiative wanted Core, not a repair extension, to handle states created by ordinary current UI processes. Session priority: Useful. Source lines 40-44.
- **Idea** — XLIFF labels could be imported as initial suggestions into database records for backend editing, with an update-conflict workflow and possible Localization Team collaboration. The initiative had not committed to this topic. Session priority: Optional. Source lines 64-74.

### 2024-05-17

Source: MeetingMinutes/Weekly/2024/05/2024-05-17.md

- **Problem** — University of Copenhagen’s concrete multisite case needs Danish-default and English-only sites to share globally stored English records while keeping database language identity consistent; forcing each site’s default content under ID 0 breaks that consistency. Session priority: Essential. Source lines 21-31.
- **Preferred Direction** — The initiative identified a standardized string such as BCP 47 as the solution and sought implementation support from the use-case owner. Session priority: Essential. Source lines 29-33.
- **Discussed Direction** — Making the default-language numeric ID configurable was proposed as a smaller preparatory step before language tags; the first configured language could be the default regardless of ID, without yet changing structural roles. Session priority: Essential. Source lines 35-44.
- **Planned** — Changing an existing language ID was separated into a later migration concern and might require a command that validates and updates all dependent state because editing YAML triggers no data processes. Session priority: Useful. Source lines 44-50.
- **Current Core Behavior** — Within one installation, “Use language from existing site” and automatic unused-ID assignment already prevent casual site-to-site ID collisions. This refines, but does not eliminate, the default-ID/global-record problem. Session priority: Useful. Source lines 52-54.
- **Problem** — The backend allowed deletion of the default site language, after which newly created records could become invisible in the Page module. Session priority: Useful. Source lines 56-60.

### 2024-05-24

Source: MeetingMinutes/Weekly/2024/05/2024-05-24.md

- **Open Question** — Lolli appeared to misunderstand configurable default language and linked it to the larger −1 problem; the team would seek Core clarification and would proceed only with approval. Session priority: Useful. Source lines 20-24.
- **Discussed Direction** — Replacing numeric comparisons such as >= 0 with membership in configured site-language values was seen as a pre-patch toward language tags. Session priority: Essential. Source lines 22-26.
- **Problem** — Server locale, typo3Language, and hreflang represent different concerns; deprecating custom properties while relying on installed locales could lose support for combinations such as en-DE. Session priority: Useful. Source lines 28-40.

### 2024-05-31

Source: MeetingMinutes/Weekly/2024/05/2024-05-31.md

- **Implemented** — The Copy patch was completed as Core change 84237 / issue 103828 / commit d28f7b04. Session priority: Useful. Source lines 20-22.
- **Planned** — For Move, agreed behavior was recoverable soft deletion plus a warning; a sub-ticket and implementation remained to do. Session priority: Useful. Source lines 24-32.
- **Preferred Direction** — Future language identity should be BCP 47 string-based, independent of locale, enabling data sharing across instances; current integer IDs conflict across instances. Session priority: Essential. Source lines 43-49.
- **In Progress** — Configurable default language change 84338 was regarded as useful preparatory work that the team hoped to package for v13. Session priority: Useful. Source lines 51-53.

### 2024-06-07

Source: MeetingMinutes/Weekly/2024/06/2024-06-07.md

- **Discussed Direction** — Lolli favored the configurable-default-language goal after a misunderstanding was resolved, while Benni considered the idea favorable in principle but saw major implementation hurdles. Session priority: Essential. Source lines 26-32.
- **In Progress** — Because volunteer resources were insufficient, the initiative intended to seek development or funding help from Soren Malling, with André coordinating. Session priority: Useful. Source lines 30-32.
- **Discussed Direction** — Benni wanted to replace server-installed locales with PHP internationalization, which could support custom combinations such as en-DE. Session priority: Useful. Source lines 34-44.
- **Current Core Behavior** — Initiative scope focused on database/Core processes, while the Localization Team focused on XLIFF/Crowdin, with acknowledged overlap. Session priority: Optional. Source lines 50-56.
- **Preferred Direction** — Product strategy should start with user jobs and a shared big picture; the initiative would prioritize architectural coordination, seek partners/funding for large work, and still land manageable patches to remain grounded. Session priority: Useful. Source lines 50-76.
- **Discussed Direction** — Core decisions require consensus between technical constraints and user needs; source does not grant unilateral approval to the initiative. Session priority: Essential. Source lines 64-66.
- **Idea** — For Move, DataHandler could reject invalid targets and the backend could ask whether to cancel or discard unsupported translations. Session priority: Useful. Source lines 78-82.

### 2024-06-14

Source: MeetingMinutes/Weekly/2024/06/2024-06-14.md

- **Discussed Direction** — The configurable-default-language use case was considered clear and Core-approved, but significant technical hurdles remained. Session priority: Essential. Source lines 20-24.
- **Problem** — The initiative lacked developer resources for the patch and concluded that funding and the right implementation partners were needed. Session priority: Useful. Source lines 26-34.
- **Planned** — Instead of rushing the full feature into v13, the group considered deprecating assumptions that default means numeric 0, replacing literal =0/>0 checks with semantic default-language checks. Session priority: Essential. Source lines 36-44.
- **Idea** — A helper such as isDefaultLanguage could initially still test 0, provide a migration API to extensions, and later support another configured identifier. Session priority: Essential. Source lines 42-48.
- **Open Question** — The group would consult the Core team before creating that preparation patch; it was not yet an approved implementation plan. Session priority: Essential. Source lines 44-50.
- **Preferred Direction** — The initiative defined its primary role as coordinating approved topics, assembling implementation teams, and reviewing alignment rather than doing all code itself. Session priority: Optional. Source lines 52-56.

### 2024-06-21

Source: MeetingMinutes/Weekly/2024/06/2024-06-21.md

- **Preferred Direction** — Benni, like Lolli, said configurable default-language identity should proceed only after −1 is removed. The initiative changed its own prior ordering and put −1 removal at the top of its priority list. Session priority: Essential. Source lines 29-33.
- **Planned** — A language-menu change needed both unit and functional tests; the team identified likely test bases and passed guidance to the author. Session priority: Too Detailed. Source lines 35-44.

### 2024-06-28

Source: MeetingMinutes/Weekly/2024/06/2024-06-28.md

- **Preferred Direction** — Configurable default-language work was put on hold despite the initiative’s view that it could be independent; removing −1 became the higher goal because Core support for the former was insufficient without the latter. Session priority: Essential. Source lines 24-28.
- **Open Question** — Before concrete −1 work, the initiative wanted to ensure no competing Core effort existed and to coordinate ownership and acceptance. Session priority: Useful. Source lines 30-34.
- **Discussed Direction** — The remembered baseline replacement remained an All Languages Boolean on the default-language record that triggers DataHandler synchronization. Session priority: Essential. Source lines 36-38.
- **Problem** — That Boolean alone was now judged too short-sighted: existing explicit translations can coexist with −1 fallback behavior, and changing a translated record from 0 to −1 must preserve or deliberately resolve those states. Session priority: Essential. Source lines 40-46.
- **Discussed Direction** — The refined model may need target-language differentiation combining Allow and Enforce Language Synchronization rather than unconditional record-level overwrite. Session priority: Essential. Source lines 44-46.
- **Open Question** — Which language leads, whether it may overwrite independent target content, and how generated records land at the correct sort position were all unresolved. Session priority: Essential. Source lines 48-50.
- **Open Question** — A migration must reproduce old behavior unless that behavior is explicitly classified as erroneous; candidate errors include translations of −1 records, retention across −1/0 transitions, and default-language records nested inside All-Languages containers. Session priority: Essential. Source lines 52-64.
- **Problem** — Simple DataHandler synchronization loses provenance: later code and translation tools cannot know whether target content was editorially authored or generated and therefore whether overwrite is safe. Session priority: Essential. Source lines 66-68.
- **Idea** — A content-state marker could distinguish editorial content from DataHandler-synchronized content. Session priority: Essential. Source lines 70-72.
- **Idea** — Clearing All Languages could delete translations to mirror current output behavior, but this was merely one proposed “neat” solution and carries obvious data-loss implications. Session priority: Essential. Source lines 74-78.
- **Problem** — Allow Language Synchronization already risks overwriting editorial content when users do not understand its consequences. Session priority: Essential. Source lines 80-82.
- **Planned** — Concrete abolition work was made contingent on a written, Core-approved and public mission statement so contributors could rely on strategic commitment. Session priority: Useful. Source lines 84-92.
- **Preferred Direction** — The mission should commit only to removing −1, not prescribe the replacement architecture; valid technical arguments still need consideration. Session priority: Essential. Source lines 88-98.
- **Open Question** — −1 should be deprecated/removed only after an adequate technically clean replacement exists, and the correct formal vehicle for the mission/deprecation was unsettled. Session priority: Essential. Source lines 100-108.
- **Preferred Direction** — The initiative’s longer-term mission was that each language contain all data required for its output; deliberate redundancy would trade storage for reduced Core complexity. Session priority: Essential. Source lines 110-120.
- **Current Core Behavior** — Fallback chains currently depend on the non-existence of target-language records. Session priority: Essential. Source lines 122-124.
- **Idea** — Future language layers might contain every record, while fallback affects field/content values instead of record existence. Session priority: Essential. Source lines 124-126.
- **Discussed Direction** — If layers become self-contained, site-configuration and fallback-chain changes would need to trigger resynchronization of affected database records. Session priority: Essential. Source lines 128-130.
- **Idea** — Large resynchronizations could run through an asynchronous worker. Session priority: Useful. Source lines 132-134.
- **Planned** — If mission/deprecation work were to enter v13.4, the historical merge deadline was 15 October 2024. This is period-specific and not a current plan. Session priority: Too Detailed. Source lines 136-138.

## Evolution, contradictions, and latest H1 2024 position

### Removal of language −1

1. **2024-01-19 — Preferred Direction:** −1 is “Broken by Design”; replace it. A simple Boolean plus generated/synchronized per-language records is proposed. Source 2024-01-19 lines 25-67.
2. **2024-01-19 — Discussed Direction:** Removal is a prerequisite for fallback work, yet too large for the initiative’s first Core patch. Source 2024-01-19 lines 104-110 and 163-170.
3. **2024-05-24 to 2024-06-14 — Open ordering:** The initiative initially tries to make default ID configurable independently and sees literal numeric checks as a pre-patch. Source 2024-05-24 lines 20-26; 2024-06-14 lines 36-50.
4. **2024-06-21 and 2024-06-28 — Preferred Direction, latest in period:** After both Lolli and Benni insist on −1 first, configurable-default work is put on hold and −1 becomes top priority. Source 2024-06-21 lines 29-33; 2024-06-28 lines 24-28.
5. **2024-06-28 — Open Question, latest model:** The simple Boolean is insufficient without transition rules, source/target authority, provenance, existing-translation handling, target-specific synchronization, sorting, and migration. Source 2024-06-28 lines 36-82.

### Enforce Language Synchronization

1. **2024-01-19 — Idea:** The term initially names record-level generated copies for the proposed All-Languages replacement. Source lines 40-56.
2. **2024-03-01 — Idea:** It becomes a field-level primitive: enforce means the editor cannot detach; allow means the editor can select synchronization. This reframes Free/Connected mode as configuration of synchronized fields. Source lines 114-125.
3. **2024-04-12 — Preferred Direction:** Enforce behavior is considered as an l10n_state extension that could replace l10n_mode=exclude; equivalence and Workspace behavior remain unproven. Source lines 64-74.
4. **2024-06-28 — Discussed Direction, latest in period:** A future All-Languages implementation may need a per-target combination of allow and enforce because independent translations can coexist and overwrite policy is contextual. Source lines 40-50.

### Default language 0 and stable language identity

1. **2024-01-05 — Open Question:** No established design without a default language. Source lines 42-48.
2. **2024-01-19 onward — Preferred Direction:** BCP 47/string identity is repeatedly linked to shared records, derivation chains, file translation, cross-root operations, and cross-instance exchange. Sources: 2024-01-19 lines 78-86; 2024-03-01 lines 44-46; 2024-05-17 lines 21-33; 2024-05-31 lines 43-49.
3. **2024-05-17 to 2024-06-14 — Discussed Direction:** Configurable numeric default ID is explored as a preparatory bridge, with a validating migration command and an isDefaultLanguage abstraction. Sources: 2024-05-17 lines 35-50; 2024-06-14 lines 36-50.
4. **2024-06-21/28 — Preferred Direction, latest in period:** This bridge is put on hold until −1 is removed. Sources: 2024-06-21 lines 29-33; 2024-06-28 lines 24-28.
5. **Nuance, not contradiction:** 2024-03-01 warns same numeric IDs can mean different languages across roots during copy/move, while 2024-05-17 notes current site-language UI reuses existing definitions and selects unused IDs within an installation. The UI mitigation reduces accidental conflicts; it does not solve the semantic default=0/global-record problem or exchange across installations.

### Structural layer, full language layers, and shadow records

1. **2024-01-05/19 — Idea:** A contentless neutral/default structural layer is floated to remove page/content distinctions and default-language dependence, but complexity is uncertain. Sources: 2024-01-05 lines 42-48; 2024-01-19 lines 84-86.
2. **2024-03-01 — Preferred Direction:** Automatic background creation of default-language control records for target-language editors is explicitly rejected because structure and sorting become opaque. Source lines 54-72.
3. **2024-03-01/04-26 — Preferred Direction:** Separately, database denormalization is accepted, and records in every language are considered desirable for consistent relation structure and low editorial duplication through synchronization. Sources: 2024-03-01 lines 131-135; 2024-04-26 lines 30-36.
4. **2024-06-28 — Preferred Direction plus Idea, latest in period:** The initiative proposes self-contained language layers and suggests every element might have a representation in every language, shifting fallback from record existence to content values. Source lines 110-130.
5. **Interpretive caution:** H1 2024 does not establish a concrete “shadow record” schema or choose between visible per-language placeholders and a neutral identity layer. The March rejection concerns uncontrolled editorial structure creation in the privileged default layer; the June direction concerns system-maintained completeness. They are in tension but not a clean reversal of the same design.

### Translation relationship identity and t3_origuid

1. **2024-01-19 — Idea:** t3_origuid appears removable. Source lines 151-161.
2. **2024-02-02 — Current Core Behavior:** Prototype analysis says it is valuable for identifying original copy source and differentiating derivation cases. Source lines 26-38 and 62-72.
3. **2024-02-09 — Discussed Direction:** l10n_source recursion might replace it at a performance cost. Source lines 28-31.
4. **2024-02-16 — Problem, later evidence:** Workspace copies make t3_origuid itself unreliable; l10n_source is semantically ambiguous; assignments require user confirmation and a new reliable alternative. Source lines 20-40.
5. **2024-03-29 — Problem:** v13 loses the prototype’s “obvious connection” proof; derivation-chain distance becomes only probabilistic. Source lines 42-61.
6. **Latest H1 status:** No reliable language-neutral record identity is selected. l10n_parent proves connected relation to a default-language record, l10n_source describes content derivation, and neither solves general semantic identity for Free/localized records.

### Free/Connected/Mixed and localization

1. **2024-01/02 — Problem:** Mode switching exposes unpaired source-only and target-only records; target-only records need editor-guided association. Sources: 2024-01-19 lines 69-76; 2024-02-02 lines 52-79.
2. **2024-03-01 — Discussed Direction:** A radical all-connected model is rejected; real localized structures require freedom at some relationship boundary. Source lines 74-112.
3. **2024-03-22 — Problem:** Editors validate “mostly connected, partly different” as a real use case; Mixed Mode and hidden default records both fail editorially. Source lines 27-42.
4. **2024-03-01/04-12 — Discussed/Preferred Direction:** Field-level allow/enforce synchronization and a stronger l10n_state model may be more expressive than monolithic modes and l10n_mode=exclude. Sources: 2024-03-01 lines 114-125; 2024-04-12 lines 64-74.
5. **Latest H1 status:** No deprecation of Free Mode is decided. The evidence supports simplifying technical mode decisions and preserving localization freedom, but not removing Free Mode outright.

### Relation storage, overlays, and files

1. **2024-02-23/03-01 — Problem:** Page localization and file relations block uniform Connected behavior; translatable files are treated as a dependency for localized relations. Sources: 2024-02-23 lines 38-62; 2024-03-01 lines 74-112.
2. **2024-04-05 — Discussed Direction:** The initiative wants localized relation UIDs and fewer overlays in the long term. Source lines 106-119.
3. **2024-04-12 — Preferred Direction, later and more immediate:** Default-language UID storage is too deeply rooted to change soon and will be retained; the Reference Index maps localized targets. Source lines 56-62.
4. **Latest H1 status:** “No overlays” is a strategic desire, not an approved or near-term implementation direction.

### Copy/move and the test-first path

1. **2024-03-01 — Preferred Direction:** Characterize current behavior before changing it. Source lines 48-52.
2. **2024-03-08 through 04-26 — In Progress:** Copy and Move are split; invalid fixtures and Workspace expectations are repaired through preparatory patches. Sources: 2024-03-08 lines 48-64; 2024-03-29 lines 85-107; 2024-04-05 lines 39-47; 2024-04-26 lines 20-28.
3. **2024-05-31 — Implemented:** Copy behavior lands in Core. Source lines 20-22.
4. **2024-05-31/06-07 — Planned/Idea:** Move remains, with soft-delete/recycle-bin warning or a backend cancel/discard decision. Sources: 2024-05-31 lines 24-32; 2024-06-07 lines 78-82.
5. **Presentation value:** This is the clearest concrete example of Understand → repair tests → split scope → change → prove during H1 2024.

## Dependencies supported by these sources

- **Analytically Derived Recommendation** — Treat stable language identity, record-group identity, synchronization policy, and content provenance as separate abstractions. Evidence: BCP 47 solves language identity (2024-01-19 lines 78-86); t3_origuid/l10n_source/l10n_parent fail to provide general semantic record identity (2024-02-02 lines 26-38; 2024-02-16 lines 24-40); June identifies provenance as necessary for overwrite safety (2024-06-28 lines 66-72). Session priority: Essential.
- **Analytically Derived Recommendation** — Before replacing −1, build characterization tests for at least: 0→−1 and −1→0 transitions; pre-existing independent translations; creation/deletion of site/page languages; sorting; nested/inline/MM relations; Workspaces; fallback; and editor permissions. Evidence: proposed lifecycle (2024-01-19 lines 42-55), test-first discipline (2024-03-01 lines 48-52), Workspace requirement (2024-01-19 lines 118-120), invalid fixtures (2024-03-29 lines 85-107), and June’s open transition cases (2024-06-28 lines 40-82). Session priority: Essential.
- **Analytically Derived Recommendation** — Migration should begin with a dry-run inventory and explicit conflict classification, not automatic deletion or overwrite. Evidence: enabling allowLanguageSynchronization can overwrite data (2024-04-26 lines 48-56); June leaves leading language, existing translations, and disabling behavior open and proposes content state (2024-06-28 lines 40-82). Session priority: Essential.
- **Analytically Derived Recommendation** — Present full language layers and a neutral identity layer as comparable, potentially combinable hypotheses, not as an initiative decision. Evidence: neutral structural layer is uncertain/rejected in specific UX form (2024-01-19 lines 84-86; 2024-03-01 lines 54-72), while complete synchronized language records gain support later (2024-04-26 lines 30-36; 2024-06-28 lines 110-130). Session priority: Essential.
- **Analytically Derived Recommendation** — Keep BCP 47 distinct from locale/runtime formatting in the session. Evidence: language identifier should be BCP 47 and independent of locale (2024-05-31 lines 43-49); locale, typo3Language, and hreflang have different server/application constraints (2024-05-24 lines 28-40; 2024-06-07 lines 34-44). Session priority: Essential.
- **Analytically Derived Recommendation** — Use the Copenhagen scenario for Cross-Site and add the nuance that within-installation UI already tries to maintain unique IDs. Evidence: 2024-05-17 lines 21-33 and 52-54. This avoids overstating present failure while showing why default=0 and cross-instance data exchange remain problematic. Session priority: Essential.

## Use cases and visuals grounded in H1 2024

- **All Languages lifecycle diagram — Essential:** Source record with Boolean; DataHandler creates, sorts, updates, and deletes per-language copies. Add red branches for “independent translation already exists,” “flag cleared,” and “who may overwrite?” Sources: 2024-01-19 lines 40-62; 2024-06-28 lines 40-82.
- **Copenhagen global-record diagram — Essential:** Danish-default site uses 0/English 1; English-only site wants English as its semantic default without treating language 0 as a different language. Sources: 2024-05-17 lines 21-33.
- **Turkish branch editor story — Essential:** Editor needs a target-language landing page without default-language access; current options are restriction, broader rights, separate tree, or hidden/control records. Sources: 2024-03-01 lines 54-72.
- **Mostly connected, one local exception — Essential:** Connected records preserve order, but a target-only localized item forces Mixed Mode or a hidden default record. Sources: 2024-03-22 lines 27-42.
- **Derivation versus identity diagram — Essential:** copy source, content source, and connected parent are different edges represented by t3_origuid, l10n_source, and l10n_parent. Sources: 2024-02-02 lines 26-50; reliability limits at 2024-02-16 lines 24-40.
- **Sparse versus complete language layers — Essential but clearly visionary:** Current fallback depends on a missing record; proposed complete layers retain records and fallback values. Sources: 2024-06-28 lines 110-130. Add the explicit warning that no shadow-record schema was selected in H1 2024.
- **Copy patch as migration-method case study — Useful:** invalid fixture → preparatory test cleanup → Workspaces → split Copy/Move → Copy merged → Move still open. Sources: 2024-03-08 lines 48-64 through 2024-05-31 lines 20-32.
- **Synchronization spectrum — Essential:** custom/independent → allow synchronization → enforce synchronization, with provenance and overwrite warnings. Sources: 2024-03-01 lines 114-125; 2024-04-26 lines 48-56; 2024-06-28 lines 40-82.

## Complete reviewed-file audit

Every Markdown file below was read in full. All 23 contained at least one item relevant to the broad T3DD26 brief; there were no no-evidence Markdown files in this period.

- MeetingMinutes/Weekly/2024/01/2024-01-05.md — evidence above
- MeetingMinutes/Weekly/2024/01/2024-01-12.md — evidence above
- MeetingMinutes/Weekly/2024/01/2024-01-19.md — evidence above
- MeetingMinutes/Weekly/2024/02/2024-02-02.md — evidence above
- MeetingMinutes/Weekly/2024/02/2024-02-09.md — evidence above
- MeetingMinutes/Weekly/2024/02/2024-02-16.md — evidence above
- MeetingMinutes/Weekly/2024/02/2024-02-23.md — evidence above
- MeetingMinutes/Weekly/2024/03/2024-03-01.md — evidence above
- MeetingMinutes/Weekly/2024/03/2024-03-08.md — evidence above
- MeetingMinutes/Weekly/2024/03/2024-03-22.md — evidence above
- MeetingMinutes/Weekly/2024/03/2024-03-29.md — evidence above
- MeetingMinutes/Weekly/2024/04/2024-04-05.md — evidence above
- MeetingMinutes/Weekly/2024/04/2024-04-12.md — evidence above
- MeetingMinutes/Weekly/2024/04/2024-04-19.md — evidence above
- MeetingMinutes/Weekly/2024/04/2024-04-26.md — evidence above
- MeetingMinutes/Weekly/2024/05/2024-05-10.md — evidence above
- MeetingMinutes/Weekly/2024/05/2024-05-17.md — evidence above
- MeetingMinutes/Weekly/2024/05/2024-05-24.md — evidence above
- MeetingMinutes/Weekly/2024/05/2024-05-31.md — evidence above
- MeetingMinutes/Weekly/2024/06/2024-06-07.md — evidence above
- MeetingMinutes/Weekly/2024/06/2024-06-14.md — evidence above
- MeetingMinutes/Weekly/2024/06/2024-06-21.md — evidence above
- MeetingMinutes/Weekly/2024/06/2024-06-28.md — evidence above
