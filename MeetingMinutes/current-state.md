---
title: "Translation Handling Initiative - Current State"
last_updated: "2026-08-10"
weekly_minutes_included_through: "2026-07-31"
transcripts_included_through: "2026-07-31"
external_status_checked_through: "2026-08-10"
---

# Translation Handling Initiative: Current State

[Deutsche Fassung](https://notes.typo3.org/s/7bbwd73t2h) · [Meeting minutes overview](https://notes.typo3.org/s/f3ae8fZSD) · [How to maintain this document](https://github.com/t3thi/Documentation/blob/main/MeetingMinutes/current-state-maintenance.md)

This is the canonical description of the Translation Handling Initiative's current understanding, vision and work. It explains why the initiative works on translation handling, what its research has established, which direction it currently sees, which approaches it is investigating and which decisions remain open.

It is not a meeting chronology, a patch list, a standalone backlog or an adopted TYPO3 Core roadmap. Historical discussion remains in the meeting minutes. This document is updated when the current state changes.

## Scope and reading guide

The primary scope is the handling of editor-maintained database records such as pages, content elements, file metadata and extension records. XLIFF files for system and interface labels are a related localization domain, but not the main subject of this document.

Statements use the following distinctions:

| Term | Meaning in this document |
|---|---|
| **Verified current behavior** | Reproduced behavior or behavior supported by current Core code. |
| **Established finding** | A conclusion supported by the initiative's research and use cases. |
| **Derived requirement** | A capability that follows from an established problem or finding. |
| **Vision** | A desired product or semantic property, independent of one implementation. |
| **Current direction** | An approach the initiative currently considers promising. It is not an adopted Core architecture. |
| **Possible approach** | A technical or product option that still requires validation or selection. |
| **Current work** | An active investigation, issue, patch, review or prototype. |
| **Implemented** | A concrete result that has been merged or otherwise completed. |
| **Open question** | More research, design or validation is required. |
| **Decision required** | The initiative can prepare evidence and recommendations, but a wider product, architecture or Core decision is needed. |

### Current snapshot

- TYPO3 already supports complex multilingual sites and works well for translations that retain the same structure.
- Important needs remain uncovered when structures are mostly shared but contain a few language-specific additions or omissions, when records are shared across sites, or when fallback must express more than "use the next available record".
- The initiative now describes the problem through four separate responsibilities: **Language Identity**, **Synchronization Intent**, **Structural Identity** and **Output Policy**.
- The vision is to make each responsibility explicit before deciding how it should be stored or implemented.
- BCP 47 is the current preference for semantic language identity. The database representation and migration path remain open.
- Replacing persisted `sys_language_uid = -1` with explicit synchronization is a strong direction. The synchronization lifecycle is not designed yet.
- A structure that supports "mostly connected, selectively different" content is a central product requirement. Complete language layers, shadow records and a shared structural layer remain possible approaches, not a selected architecture.
- Current delivery is incremental: characterize existing behavior, merge bounded correctness fixes, prototype uncertain concepts and use the resulting evidence to support broader decisions.

## How the initiative works

The initiative combines four forms of work:

| Activity | Purpose |
|---|---|
| **Research** | Collect real project and editor use cases, reproduce Core behavior, identify causes and distinguish facts from assumptions. |
| **Vision Development** | Turn findings into a coherent description of the responsibilities and capabilities TYPO3 should provide. |
| **Incremental Improvement** | Implement bounded improvements when they solve a real problem, fit the vision and do not create unnecessary future constraints. |
| **Critical Alignment** | Evaluate initiative work and parallel Core proposals against the same responsibilities, trade-offs and compatibility requirements. |

These activities are complementary. Research without delivery would leave known problems unresolved. Isolated fixes without a wider model could add more special cases. The vision therefore guides present work without requiring every useful patch to implement the complete long-term direction.

### Decision boundary

The initiative can identify problems, derive requirements, investigate Core behavior, build prototypes, implement fixes and formulate recommendations. It does not claim sole authority over TYPO3 product strategy, future Core architecture or migration policy.

Accordingly, a preferred initiative direction is not automatically a TYPO3 decision. Broader changes require alignment with the Core Team, relevant product and architecture decision makers, extension authors and affected users.

## Observed needs and use cases

The initiative's vision starts from concrete project and editorial needs. These use cases do not expose one identical gap. Each reveals a different responsibility that is currently implicit, too coarse or coupled to another concern.

| Use case | Current difficulty | Responsibility exposed |
|---|---|---|
| **Mostly connected, selectively different** | A target language shares most content with another language but needs one local addition. Today that addition can require an artificial hidden default-language record, create Mixed Mode or lose useful connected behavior. | Structural Identity and Synchronization Intent |
| **Shared global storage** | Several sites use a common record store but configure the same human languages with local numeric IDs. The number alone cannot reliably identify the language across sites. | Language Identity |
| **Regional fallback** | UK content should reuse general English, but not an unrelated terminal language. A site-wide chain cannot also express whether one missing position should fall back or remain intentionally absent. | Output Policy |
| **Content for all languages** | A record uses `sys_language_uid = -1` to mean "all languages", although this is behavior rather than a human language. The special value affects many unrelated Core paths. | Synchronization Intent and Language Identity |
| **Target-language-only content** | An editor cannot always create content directly where it is needed while retaining the useful structural relation for the rest of the page. | Structural Identity |
| **Editing from a comprehensible language** | A Chinese editor may need to create Chinese content from English while the site default is German. A permanently privileged default-language column makes the workflow harder to understand. | Structural Identity and editorial context |
| **File-metadata translation at scale** | The [Media module translation control](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/filelist/Classes/FileList.php#L1225-L1305) shows for each file whether metadata for a configured language can be created or edited. Creating or editing target-language alternative text remains a per-file workflow; no dedicated bulk creation or completeness workflow is evident in current Core. | Structural Identity and editorial workflow |
| **Intentional absence** | A missing translation and an intentionally disabled or omitted translation can both lead to fallback. The editor's intent is not represented explicitly enough. | Output Policy |

The "mostly connected, selectively different" case is the clearest description of the middle ground TYPO3 should support better. Identical translated structures and fully independent structures are both valid. A small local exception should not force editors to give up the benefits of the shared majority. See the [June 2026 use-case analysis](https://notes.typo3.org/s/-RP1PwIafA) and its [July refinement](https://notes.typo3.org/s/ccbVIOYfEy).

## Research findings: what exists today

Current TYPO3 behavior is not based on one translation model. It is the interaction of several data and configuration contracts.

| Current contract | What it expresses today | Important coupling |
|---|---|---|
| **Site Language configuration** | A site-local integer ID, locale, fallback type and configured fallback IDs. | A local numeric ID is also used as a record-language value. |
| **Record language value** | `sys_language_uid` stores a positive language ID, `0` for the default language, or `-1` for all languages where supported. | Identity, default role and cross-language behavior share one field. |
| **Translation relation** | `l10n_parent` or `l18n_parent` connects a translation to a default-language record. | The relation also drives Layout module presentation and parts of overlay behavior. |
| **Translation source** | `l10n_source` identifies the record from which content was taken. | Source provenance and structural parent are related but not identical. |
| **Field synchronization** | `l10n_mode=exclude` and `allowLanguageSynchronization` control selected fields; `l10n_state` records `parent`, `source` or `custom`. | Field-level intent is separate from record-wide language-all behavior. |
| **Backend translation mode** | Connected, Free or Mixed Mode is inferred from record relations. | The editor-facing mode exposes properties of the current data structure. |
| **Frontend output policy** | Site `fallbackType` and configured fallback IDs define selection and overlay behavior. | A runtime fallback is separate from the backend structural relationship. |

Page translations always retain a parent relation. Free and Mixed Mode primarily describe how other records, especially content elements, relate inside the Layout module.

The current contracts above are supported by the Core code snapshot validated for T3DD26: [TCA language relations](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Configuration/Tca/TcaEnrichment.php#L185-L247), [localization state](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/DataHandling/Localization/State.php#L29-L39), [Layout module mode detection](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/View/BackendLayout/ContentFetcher.php#L165-L203) and [fallback construction](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Context/LanguageAspectFactory.php#L27-L60).

The user-facing module names in this document follow the current v14 Core labels: [Layout](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/backend/Resources/Private/Language/Modules/layout.xlf#L9-L13), [Records](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/backend/Resources/Private/Language/Modules/list.xlf#L9-L13) and [Media](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/filelist/Resources/Private/Language/module.xlf#L9-L13).

### Established findings

1. **Different responsibilities are partially entangled.** Language identity, default-language status, all-language behavior, record relation and runtime output influence one another through the same values and relations.
2. **Special values have Core-wide impact.** `-1` is handled in backend queries, permissions, DataHandler, overlays, Extbase, slugs, file metadata, workspaces and tests. Removing it is not a local field migration.
3. **The default language has two roles.** It is visible content and the structural lead to which other records connect. Those roles coincide in simple translation workflows but conflict when only another language needs a structural item.
4. **Structural connection has real value.** It supports aligned ordering, change awareness, field synchronization and understandable comparison. The goal is not to remove relationships, but to avoid making a real output language carry every structural responsibility.
5. **A missing record is an implicit state.** It can mean not translated yet, intentionally absent, structurally unnecessary or available through fallback. The database and editor workflow do not always distinguish these meanings.
6. **Frontend fallback is not the structural relationship.** `l10n_parent` describes a record relation; site fallback settings decide which language may render. The two can influence the same result but answer different questions.
7. **Numeric language IDs are local configuration.** The same human language can have different IDs across sites, and one ID can be labelled differently in separate sites. Mapping by number or locale is not a reliable global identity contract.
8. **More explicit data can reduce runtime branches, but it has costs.** Record volume, synchronization, Workspaces, versioning, references, migration and performance must be measured. The initiative has not decided where the optimum lies.
9. **Free Mode remains a valid endpoint.** Fully independent structures exist. The current direction is to reduce unnecessary mode choices and support local exceptions better, not to claim that Free Mode has been deprecated.
10. **Small fixes and tests are part of the architecture work.** They expose actual invariants and prevent the future model from being based on incomplete assumptions.
11. **Synchronization metadata and stored values can disagree.** In existing data, an empty or missing `l10n_state` entry does not prove that a localized field equals its parent. Current [Core state enrichment](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/core/Classes/DataHandling/Localization/State.php#L223-L238) treats a missing field state as `parent` without comparing the stored values, so the backend can present the field as inherited while its stored value differs. The open [dbdoctor PR 98](https://github.com/lolli42/dbdoctor/pull/98) demonstrates a repair approach; it is not merged Core behavior.

## Vision: separate four responsibilities

The [T3DD26 Four Responsibilities model](https://content.eric-harrer.de/t3dd26/#/four-responsibilities) is the initiative's current conceptual reference point:

> **Separate the responsibilities first. Then reason about possible implementations.**

The responsibilities must be considered in this order when explaining the vision: **Identity → Synchronization → Structure → Output**. They are a problem and responsibility decomposition, not a selected schema, API or migration sequence.

### 1. Language Identity

**Question:** Which human language and variant does this content represent?

**Current coupling:** A record stores a site-local integer. `0` additionally means default language and `-1` means all languages. These extra meanings are not human-language identities.

**Derived requirements:**

- A language must have a stable semantic identity across sites and, where needed, across installations.
- Default status must be modelled separately from the identity of the language.
- "All languages" behavior must not masquerade as a language.
- Semantic identity must not depend on a locale being installed on the application server.
- Site configuration must map its available languages to the semantic identity explicitly.
- Shared storage, translated file metadata and import/export must not depend on coincidentally equal local numbers.

**Vision:** Content language should be identifiable by what the language is, not only by the site-local number assigned to it. BCP 47 is the initiative's current preference for that semantic identity.

**Open questions:**

- Is a BCP 47 tag the authoritative persisted value, an external identity mapped to an internal key, or part of a different identity model?
- Which script, region, variant and private-use subtags must be supported?
- How are ambiguous legacy IDs and locales migrated?
- Can two records with the same tag intentionally represent different editorial contexts?
- How are permissions, queries, relations and extension APIs adapted without an unsafe big-bang change?

BCP 47 addresses semantic identity. It does not by itself solve structural relations, synchronization, permissions, page scope or frontend fallback.

### 2. Synchronization Intent

**Question:** Which fields or records must stay aligned, and where may they differ?

**Current coupling:** `-1` makes one record apply across languages. Connected translations and `l10n_state` can synchronize selected fields. These mechanisms differ in scope, enforceability and lifecycle, while "language all" is still encoded as a language value.

**Derived requirements:**

- Record-wide and field-level synchronization must be explicit and distinguishable.
- The intended target languages must be known.
- Editors must understand which values are inherited, synchronized or independent.
- Automatically created variants need provenance and ownership.
- Activation, modification, detachment and deactivation must have defined, repeatable behavior.
- Workspaces, versions, relations, deletions, restoration and newly added site languages must be part of the lifecycle.
- Migration and repair must reconcile `l10n_state` with stored values and relations without overwriting intentional manual differences.

**Vision:** "Maintain once for several languages" should be represented as synchronization intent applied to concrete language variants, not as a fictitious language identity.

**Open questions:**

- Is the initial replacement a Boolean for all targets, a selected target set, synchronization groups or another policy?
- What happens when manual translations already exist?
- Which values may be overwritten, and who may authorize that transition?
- What happens to generated records when synchronization is disabled?
- How is generated content distinguished from independently maintained content?
- Does a later language join an existing synchronization group automatically?
- How are missing or inconsistent `l10n_state` entries classified when scalar values or relations differ?

The Boolean all-languages flag is a useful minimal model for discussion, but it is not a finished lifecycle or adopted TCA API.

### 3. Structural Identity

**Question:** Which records represent the same logical content position across languages?

A logical content position is the shared place or role of a page, content element or other localizable record. It is not necessarily the record whose text was used as the translation source.

**Current coupling:** In Connected Mode, the default-language record is both visible content and structural parent. Free Mode removes that relation. Mixed Mode combines both states on one page. A local addition therefore needs either a fabricated default record or an independent record that loses the shared relation.

**Derived requirements:**

- TYPO3 must be able to preserve the shared majority while allowing explicit language-specific additions, omissions, replacement or reordering.
- A structural relation must not require meaningless visible content in another language.
- Editors should be able to create content directly in the language where it is needed.
- The system should manage relation integrity and prevent duplicate or impossible parent assignments.
- Content source, structural parent and current editing context must remain distinct.
- The model must cover pages, content and other localizable records while retaining necessary record-type differences.
- Editors need a clear view of which language variants exist and efficient creation workflows for records beyond pages and content, including file metadata.

**Vision:** Structural relationships should be explicit enough to support "mostly connected, selectively different" content without artificial default-language partners or accidental loss of connected behavior.

**Editing Language:** The preferred product concept is a selectable content language from which the editor works, independent of the backend interface language. For example, a Chinese editor could create Chinese content from English while German remains the site default. The Layout module would place English where it currently always places the default language. This is a product direction, not an implemented feature.

**Open questions:**

- What owns structural identity if no real output language is privileged?
- Are missing language positions represented by records, a neutral structure entity, derived state or a hybrid?
- How are sorting, moves and local additions represented across several language layers?
- Which structural records are visible to editors, APIs, references and Workspaces?
- When can an independently created record later join an existing structure safely?
- Which current Free, Connected and Mixed behaviors remain explicit in the UX?

### 4. Output Policy

**Question:** What should render when the requested language variant is unavailable at one content position?

**Current coupling:** Site configuration defines `strict`, `fallback` and `free` behavior plus fallback IDs. A missing or disabled translated record can still result in content from another language. Structural relation and editorial intent are not enough to explain why one record rendered.

**Derived requirements:**

- Strict behavior must remain distinct from fallback behavior.
- A fallback chain must express its allowed sequence and whether a terminal default is intended.
- TYPO3 must distinguish "not translated yet" from "intentionally do not render here" where the product requires that distinction.
- Output rules must be understandable independently of how structural records are stored.
- Any change to absence semantics must include compatibility analysis because current projects may depend on existing fallback.

**Vision:** Output should follow explicit site and, where required, content-position intent. A structural connection must not silently determine the frontend fallback policy.

**Open questions:**

- Which state stops fallback for one position?
- Is a disabled translation an appropriate stop signal, or is a separate intent required?
- Should normal fallback offer an optional terminal default step while `strict` remains single-language?
- At which scope may output intent be configured: site language, page, structure position, record or field?
- How are page, content, Extbase and custom-query behaviors kept consistent?

## Possible solution spaces

The following approaches answer parts of the responsibilities. None is the complete vision by itself.

| Requirement or question | Possible approach | Expected benefit | Trade-offs and open points | Current assessment |
|---|---|---|---|---|
| Stable semantic language identity | Use BCP 47 tags and explicit Site Language mapping. | Cross-site meaning, clearer shared storage and exchange. | Legacy mapping, tag policy, database/API compatibility and possible internal keys. | **Current direction; storage decision open.** |
| Replace `-1` behavior | Add explicit record synchronization, initially possibly an all-target flag and later selected targets. | Removes behavior from the language field and materializes explicit variants. | Complete lifecycle, conflicts, provenance, Workspaces, deletion and migration. | **Strong direction; design incomplete.** |
| Preserve current sparse records | Keep current records and relations, but clarify APIs, tests and UX. | Lowest migration and data-volume cost. | Retains missing-record states, overlay branches and default-language coupling. | **Current baseline, not sufficient for every requirement.** |
| Complete per-language layers | Materialize a structural/content representation for each relevant language, using placeholders where content is absent. | More explicit layers and potentially simpler direct queries and output. | More records, synchronization, editor density, Workspace versions, references and migration. | **Discussed direction; not selected.** |
| Shared neutral structure layer | Store common structural identity separately from real output languages. | No real language must be the structural lead; less full-layer duplication. | Introduces a new abstraction that every editing, query, relation and permission path must understand. | **Possible approach; hypothesis.** |
| Bounded hybrid | Keep a shared structural identity and materialize language records only when content or explicit absence requires them. | Could combine explicit structure with bounded data growth. | More states and transition rules; analytical option not yet validated by the initiative. | **Analytical option; no preference established.** |
| Editing Language | Let editors select the content language from which they work and use it as the primary backend context. | Removes irrelevant default-language text from the workflow and supports non-default sources. | Page Tree, Layout module, Records module, permissions, ordering and source/provenance behavior. | **Preferred product framing; prototype still needed.** |
| Explicit absence intent | Represent whether fallback should continue or stop for one structural position. | Makes regional omission predictable. | Backward compatibility, UX and consistent frontend evaluation. | **Derived requirement; representation open.** |

A generic multi-dimensional model for language, country, market, brand or audience is an adjacent future perspective. It may eventually help separate language from other content contexts, but it is not the initiative's immediate answer to the four responsibilities.

## What has been achieved

The initiative and related Core work have already delivered bounded improvements. These results make today's system safer or easier to understand; they do not implement the complete vision.

| Result | Immediate improvement | Responsibility or learning |
|---|---|---|
| [Gerrit 83632](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83632), merged 2024-04-26 | Created valid source data for DataHandler localization tests. | Reliable fixtures are a prerequisite for behavioral change. |
| [Gerrit 84237](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84237), merged 2024-05-25 | Prevented orphaned translated records in a copy process. | Structural and language validity must be preserved during copy. |
| [Gerrit 83310](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83310), [86085](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86085) and [85912](https://review.typo3.org/c/Packages/TYPO3.CMS/+/85912), merged between 2024-05-13 and 2025-01-07 | Added focused tests for copying localized content to an untranslated page, copying inline children and moving `-1` content. | Characterization records current constraints before behavior is changed. |
| [Gerrit 86773](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86773) and [88827](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88827), merged 2025-01-10 and 2025-05-05 | Synchronized the language of inline children during copy and preserved the language of translations during copy. | Copy operations must retain language intent for children and translated records. |
| [Gerrit 89199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89199), merged 2025-04-30 | Keeps the selected language while navigating within one site, shows Default-Language content when no translation exists and resets the selection when another site does not provide that language. | Prevents an invalid language selection from producing an empty Layout module while preserving the editor's useful context where possible. |
| [Gerrit 92580](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92580), merged 2026-02-09 | Restricts copied record translations to languages available in the target site. | A bounded integrity fix for current site-local language handling. |
| [Gerrit 92881](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92881), merged 2026-02-20 | Separates `localizeRecord()` from `copyRecord()` in DataHandler. | Clearer code paths support safer characterization and later change. |
| [Gerrit 88837](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88837), merged 2026-04-11 | Avoids remapping non-language-aware IRRE children and uses separately assigned records for localized parents. | A concrete case where explicit synchronized data resolved ownership ambiguity. |
| [Gerrit 94831](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94831), merged 2026-07-21 | Resolves translated Mount Point subpages through the default-language relation and prevents a `404`. | A real shared-storage project produced a small, test-backed fix. |
| [Gerrit 94914](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94914), [94916](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94916) and [94915](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94915), merged 2026-08-01 | Finds existing translations through `l10n_parent` when `l10n_source` is empty. | Preserves the distinction between structural parent and translation source while preventing duplicates. |
| [Gerrit 95178](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95178), merged on `main` 2026-08-10 | Keeps the language title, flag and translation mode visible while scrolling a long comparison view in the Layout module. | Improves editor orientation in the current interface. The patch is explicitly interim and neither changes nor selects a future structural model. |

The [initiative test extension](https://github.com/t3thi/translation-handling) also provides reproducible translation, fallback and relation scenarios. It was revived and extended with focused IRRE cases in 2025. It is research infrastructure, not evidence of changed Core behavior.

The repeated pattern is useful: a real failure is reproduced, the responsible contract is identified, tests define the boundary and the fix remains narrow. This is the initiative's preferred form of incremental improvement.

## Current work as of 2026-08-10

Each open Core patch has one primary status entry according to its current official state. **WIP** takes precedence over review findings. **Review action required** means that the current patch set has at least one unresolved comment or a current negative review or verification. **Review-positive and mergeable** is the final patch category used here; it requires at least one current Code-Review `+1`, no current negative vote, no unresolved comment and a mergeable current revision. **Awaiting review** covers open patches without those blockers but without a current positive Code-Review. **Rejected or superseded** records changes that are formally abandoned when the reason remains relevant.

For open Gerrit changes, **Merge conflict: Yes** means that Gerrit reported the current revision as `mergeable: false` against its target branch on 2026-08-10. This can change when the target branch or patch set changes. **No** means `mergeable: true`; it does not replace review or submit approval.

### Work in progress (WIP)

| Patch | Current review state | Merge conflict | Scope and boundary |
|---|---|---|---|
| [Gerrit 84338](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84338) | Patch set 6; WIP; CI `+1`; 5 unresolved comments. | **Yes** | Proposes using the first Site Language ID as the Default Language instead of enforcing `0`. Broad Core-wide assumptions remain unresolved, and the initiative later moved its immediate priority away from this route. |
| [Gerrit 92267](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92267) | Patch set 6; WIP; CI `+1`; no unresolved comments. | No | Inventories persisted `Language All` assumptions. It changes no executable behavior and is not a characterization-test suite or replacement implementation. |
| [Gerrit 92859](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92859) | Patch set 6; WIP; CI `-1`; 9 unresolved comments. | **Yes** | Proposes language- and Workspace-aware MM tables. Its uniform relation model is relevant, but the use of live Default-Language UIDs is an incremental design, not a decision for future Structural Identity. |
| [Gerrit 93289](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93289) | Patch set 1; WIP; CI `+1`; no unresolved comments. | No | Adds Workspace coverage for Language-All paste behavior and fills a characterization gap before semantic changes. |
| [Gerrit 93819](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93819) | Patch set 2; `[WIP]`; CI `+1`; no unresolved comments. | **Yes** | Adds move guards for Free-Mode content while current Free Mode remains supported. |
| [Forge 110328](https://forge.typo3.org/issues/110328) and [Gerrit 95042](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95042) | Patch set 1; `[WIP]`; CI `+1`; no unresolved comments. | No | Restricts selectable translation parents to prevent duplicate or structurally invalid assignments. The patch is not an implemented fix. |
| [Forge 110330](https://forge.typo3.org/issues/110330) and [Gerrit 95043](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95043) | Patch set 1; `[WIP]`; CI `+1`; no unresolved comments. | No | Hides Connected Mode when the source cannot establish a Default-Language relation. A Free-Mode source cannot create the missing connection. |

### Review action required

| Patch | Current review state | Merge conflict | Scope and boundary |
|---|---|---|---|
| [Gerrit 87595](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87595) | Patch set 11; CI `-1`; 7 unresolved comments. | **Yes** | Changes the language of existing inline child records with their parent. Reviews still require broader relation coverage, tests and migration consideration. |
| [Gerrit 92777](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92777) | Patch set 10; two Code-Review `+1`; CI `+1`; 2 unresolved comments. | No | Restricts copied Free-Mode records to languages available in the target context. This improves current-model integrity without selecting a future structure model. |
| [Gerrit 93063](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93063) | Patch set 7; Code-Review `+1`; CI `+1`; 3 unresolved comments. | **Yes** | Warns about invalid translation parents. It makes structural corruption visible but does not repair or redesign identity. |
| [Forge 110008](https://forge.typo3.org/issues/110008) and [Gerrit 94510](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94510) | Patch set 7; CI `-1`; 1 unresolved comment. | No | Addresses a regression after merged [Gerrit 88828](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88828), in which `strict` output can fall back from a hidden requested-language record to another language. Current behavior is unchanged while the fix remains unmerged. |
| [Gerrit 94917](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94917) | Patch set 4; no current Code-Review vote; 3 unresolved comments. | No | Improves Free/Mixed comparison rendering. Replacement by 95170 has been proposed in review, but 94917 is still officially open rather than abandoned. |
| [Gerrit 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170) | Patch set 3; three Code-Review `+1`; CI `+1`; 4 unresolved comments. | No | Improves Free-Mode rendering in the Layout module. Remaining review threads cover exact comparison semantics and the 14.3 backport. |

### Review-positive and mergeable

No current patch meets all criteria. Positive Code-Review votes on 92777 and 95170 coexist with unresolved comments, so both remain under **Review action required**.

### Awaiting review

| Patch | Current review state | Merge conflict | Scope and boundary |
|---|---|---|---|
| [Gerrit 93028](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93028) | Patch set 6; CI `+1`; no current Code-Review vote or unresolved comment. | No | Applies the requested parent language to newly created relation children while leaving already localized children unchanged. |
| [Gerrit 93752](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93752) | Patch set 3; CI `+1`; no current Code-Review vote or unresolved comment. | **Yes** | Adds copy guards for Free-Mode content. The current revision must first be made mergeable against `main`. |
| [Gerrit 95038](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95038) | Patch set 2; CI `+1`; no current Code-Review vote or unresolved comment. | No | Keeps `pages.doktype` aligned with the Default-Language page through `l10n_mode=exclude` and provides an Upgrade Wizard for existing divergent translations. This enforces a current-model invariant rather than selecting a future structural model. |

### Rejected or superseded

| Patch | Official state | Merge conflict | Reason |
|---|---|---|---|
| [Gerrit 92585](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92585) | Abandoned on 2026-08-07. | Not applicable | Its narrow Free-Mode rendering fix was further developed in [Gerrit 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170). |

### Supporting patches and non-patch research

| Work | Current state | Merge conflict | Meaning |
|---|---|---|---|
| [dbdoctor PR 98](https://github.com/lolli42/dbdoctor/pull/98) | Open; GitHub reports the current head as not mergeable and `dirty`. | **Yes** | Repairs `l10n_state` when synchronized metadata disagrees with stored translated values. It is not merged Core behavior. |
| [dbdoctor PR 171](https://github.com/lolli42/dbdoctor/pull/171) | Open `[WIP]`; GitHub reports the current head as clean and mergeable. | No | Detects orphaned translations left by historical copy operations. It is diagnostic and repair tooling, not a merged Core fix or a new translation model. |
| Structural-layer and Editing-Language exploration | Product framing exists; no completed prototype is evidenced. | Not applicable | A sketch, click dummy or extension experiment would test editor value and structural assumptions before an architecture decision. |

## Critical alignment against the vision

The vision is a review framework, not a reason to reject every partial solution.

| Change or approach | Problem solved within its scope | Assessment against the four responsibilities |
|---|---|---|
| [Disable custom `colPos` and `CType` for connected translations](https://review.typo3.org/c/Packages/TYPO3.CMS/+/85978) | Protects structural consistency for connected content and containers. | Sound for connected structure. It also removed a workaround for expressing local absence, showing why Structural Identity and Output Policy need their own explicit mechanisms. |
| [Respect fallback chains during record overlay](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83169), its merged [13.4 follow-up](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88828) and the open [strict-regression fix](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94510) | Fixed real fallback behavior, but also exposed a regression when a requested-language record is hidden under `strict`. | Compatible with the vision when restricted to fallback mode. The active fix confirms that `strict` must not silently behave like fallback; its current patch set is not yet verified or merged. |
| Free/Mixed comparison fixes | Make independent and connected content visible and aligned in the current Layout module. | Valuable current UX work. They preserve valid independence while making structural relations clearer; they do not need to wait for a new data model. |
| MM context proposal | Reduces relation ambiguity across languages and Workspaces. | A reasonable preparatory model if migration and Extbase/DataHandler behavior remain consistent. It should not be mistaken for final semantic identity. |
| Explicit all-language synchronization | Removes behavior from the language identity field. | Strongly aligned in principle. It becomes unsafe if introduced before lifecycle, provenance, conflict and migration rules are defined. |
| Complete language layers or a hidden structure | Could make missing positions and structural relations more explicit. | Aligned with the structural requirement, but only after data volume, permissions, Workspaces, references, sorting, editor visibility and migration are tested. |

For any new proposal, the initiative asks:

1. What observed problem does it solve?
2. Which responsibility does it affect?
3. Does it keep that responsibility separate from the others?
4. Does it introduce a new special value, implicit state or irreversible transition?
5. Is the bounded improvement useful by itself?
6. Does it preserve a credible path toward clearer semantics?

## Open decisions

### Language Identity

- **Decision required:** authoritative semantic identity and its database/API representation.
- **Decision required:** mapping and migration rules for current Site Language IDs and locales.
- **Open question:** whether internal numeric keys remain and, if so, which layers may see them.

### Synchronization Intent

- **Decision required:** the record-wide synchronization contract and target selection model.
- **Open question:** activation, overwrite, provenance, detachment, deactivation, deletion, restoration and new-language behavior.
- **Open question:** interaction with field synchronization, relations, Workspaces and permissions.

### Structural Identity

- **Decision required:** where logical structure lives when no real language is privileged.
- **Open question:** complete layers, shared structure, hybrid or improved sparse representation.
- **Open question:** lifecycle and visibility of shadows, placeholders or structural-only records.
- **Open question:** a consistent model for pages, content and other records without ignoring their necessary differences.

### Output Policy

- **Decision required:** the product semantics of missing, disabled and intentionally absent variants.
- **Open question:** optional terminal default behavior in normal fallback while preserving strict semantics.
- **Open question:** consistent evaluation across Core rendering, Extbase and custom queries.

### Cross-cutting

- **Decision required:** acceptable balance between explicit persisted data and runtime/code complexity.
- **Open question:** measurable effects on query counts, write amplification, record volume, Reference Index, Workspaces and backend usability.
- **Decision required:** compatibility, migration, deprecation and extension API strategy.
- **Decision required:** ownership and prioritization together with the relevant TYPO3 Core and product structures.

## Next meaningful steps

These are the initiative's current best sequence of activities, not a committed TYPO3 release roadmap.

1. **Keep the evidence base current.** Add reproducible editor and project use cases, especially where language, country, structure and output intent differ.
2. **Complete focused characterization.** Review the `-1` inventory, map each valid behavior to a test and close known Workspace and DataHandler gaps.
3. **Finish bounded fixes.** Reconcile the overlapping Free/Mixed comparison work, progress copy/move integrity patches, validate the parent-selector and wizard drafts and resolve the failing strict-fallback regression patch.
4. **Prototype product behavior before storage.** Test Editing Language, direct target-language creation, local structural additions and explicit absence with realistic editor workflows.
5. **Compare structural options with evidence.** Use the same acceptance cases for sparse records, complete layers, shared structure and any hybrid. Measure data and operational costs rather than assuming them.
6. **Define synchronization as a state machine.** Specify every transition and conflict before implementing an all-language flag or target group.
7. **Agree the semantic identity contract.** Decide what BCP 47 identifies, how Site Languages map to it and how legacy values migrate.
8. **Design compatibility before removal.** Introduce explicit alternatives first, provide migration and extension guidance, then consider deprecation of old semantics.
9. **Bring evidence to the required decision makers.** The initiative should make trade-offs and consequences concrete so Core, product and architecture decisions can be made on a shared factual basis.

## Evidence basis and maintenance

This reconstruction includes all repository meeting minutes through 2026-07-31 and all available transcripts through 2026-07-31. A supplied initiative-channel snapshot was reviewed as a supplemental source for durable use cases, implementation references and unminuted gaps; it does not advance the minute or transcript cutoffs. Current Gerrit and Forge states in the achievement and work sections were checked on 2026-08-10. The [T3DD26 presentation](https://content.eric-harrer.de/t3dd26/) presents the conceptual model used in this reconstruction.

Key primary evidence anchors are:

| Topic | Meeting evidence |
|---|---|
| Language identity and BCP 47 | [2024-01-19](https://notes.typo3.org/s/sEONb4kd6), [2025-07-25](https://notes.typo3.org/s/dtw4v9T7S), [2026-07-31](https://notes.typo3.org/s/z5ICno5pK2) |
| `-1` replacement and synchronization lifecycle | [2024-01-19](https://notes.typo3.org/s/sEONb4kd6), [2024-06-28](https://notes.typo3.org/s/GQwWxdUKO), [2025-11-28](https://notes.typo3.org/s/Sxl-kkYjW), [2026-06-11](https://notes.typo3.org/s/1-J3KsT7VU) |
| Field-synchronization consistency and historical copy damage | [2024-04-26](https://notes.typo3.org/s/D32XRXoCk), [2026-02-06](https://notes.typo3.org/s/D8oadqoN-7) |
| Mostly connected structures and local exceptions | [2024-03-22](https://notes.typo3.org/s/kqdwFxW1m), [2026-05-08](https://notes.typo3.org/s/-0p3kqzMll), [2026-06-26](https://notes.typo3.org/s/-RP1PwIafA), [2026-07-10](https://notes.typo3.org/s/ccbVIOYfEy) |
| Complete layers, shadows and shared structure | [2025-07-18](https://notes.typo3.org/s/L0lQKrWaW), [2025-10-24](https://notes.typo3.org/s/2Ysd3gDdn), [2026-05-29](https://notes.typo3.org/s/0AJqa7JwuJ), [2026-07-10](https://notes.typo3.org/s/ccbVIOYfEy) |
| Editing Language | [2026-05-08](https://notes.typo3.org/s/-0p3kqzMll), [2026-05-29](https://notes.typo3.org/s/0AJqa7JwuJ) |
| Output policy, strict behavior and intentional absence | [2023-12-15](https://notes.typo3.org/s/ddSKDuz1Q), [2026-06-11](https://notes.typo3.org/s/1-J3KsT7VU), [2026-07-10](https://notes.typo3.org/s/ccbVIOYfEy), [2026-07-31](https://notes.typo3.org/s/z5ICno5pK2) |
| Latest work and governance boundary | [2026-07-24](https://notes.typo3.org/s/Sn7GKjSk_3), [2026-07-31](https://notes.typo3.org/s/z5ICno5pK2) |

Future updates must follow the [Current State maintenance instructions](https://github.com/t3thi/Documentation/blob/main/MeetingMinutes/current-state-maintenance.md). The key rule is:

> **Update the current state, not the history.**
