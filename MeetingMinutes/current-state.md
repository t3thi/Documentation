---
title: "Translation Handling Initiative - Current State"
last_updated: "2026-08-21"
weekly_minutes_included_through: "2026-08-14"
transcripts_included_through: "2026-08-14"
external_status_checked_through: "2026-08-21"
---

<!--
This file is generated from reviewed Topic Syntheses and structured
Knowledge metadata. Do not edit it directly.
-->

<!-- Source Topic: KnowledgeSystem/Knowledge/topics/scope-governance.md -->
# Translation Handling Initiative: Current State

[Deutsche Fassung](https://notes.typo3.org/s/7bbwd73t2h) · [Meeting minutes overview](https://notes.typo3.org/s/f3ae8fZSD) · [How to maintain this document](https://github.com/t3thi/Documentation/blob/main/MeetingMinutes/current-state-maintenance.md)

This is the canonical description of the Translation Handling Initiative's current understanding, vision and work. It explains why the initiative works on translation handling, what its research has established, which direction it currently sees, which approaches it is investigating and which decisions remain open.

It is not a meeting chronology, a patch list, a standalone backlog or an adopted TYPO3 Core roadmap. Historical discussion remains in the meeting minutes. This document is updated when the current state changes.

## Scope and reading guide

The [TYPO3 Localization Team](https://typo3.community/contribute/teams-committees/localization) maintains the infrastructure and services for translating static TYPO3 backend and frontend labels. The source labels are normally stored as XLIFF files in the filesystem of Core or extensions; translations are maintained through [Crowdin](https://crowdin.com/), and the [Crowdin Bridge](https://github.com/TYPO3/crowdin-bridge) exports them to the translation server from which TYPO3 installations fetch Language Packs.

The Translation Handling Initiative instead works on editor-maintained database records such as pages, content elements, file metadata and extension records. Its scope is the language identity of this content, its synchronization and structural relations, the editing workflow and frontend output. Maintaining static-label translations, Crowdin projects or Language Pack infrastructure is not part of its primary responsibility.

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
- BCP 47 is the current preference for semantic language identity. Fully replacing today's `sys_language_uid` contract also depends on modelling its non-language `-1` synchronization behavior and the Default and structural-lead roles coupled to `0` separately; those replacement contracts remain open.
- Replacing persisted `sys_language_uid = -1` with explicit synchronization is a strong direction. The synchronization lifecycle is not designed yet.
- A structure that supports "mostly connected, selectively different" content is a central product requirement. Editors should be able to work in the required language without selecting or understanding Free, Connected or Mixed Mode as database-relation states.
- The current structural preference is a shared hidden, language-neutral structure layer rather than complete per-language layers with universal shadows. This is a preference for further investigation, not an adopted Core architecture; the hidden layer remains a hypothesis that needs a prototype and lifecycle design.
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

<!-- Source Topic: KnowledgeSystem/Knowledge/topics/editorial-needs.md -->
## Observed needs and use cases

The initiative's vision starts from concrete project and editorial needs. These use cases do not expose one identical gap. Each reveals a different responsibility that is currently implicit, too coarse or coupled to another concern.

| Use case | Current difficulty | Responsibility exposed |
|---|---|---|
| **Mostly connected, selectively different** | A target language shares most content with another language but needs one local addition. Today that addition can require an artificial hidden default-language record, create Mixed Mode or lose useful connected behavior. | Structural Identity and Synchronization Intent |
| **Shared global storage** | Several sites use a common record store but configure the same human languages with local numeric IDs. The number alone cannot reliably identify the language across sites. | Language Identity |
| **Regional fallback** | UK content should reuse general English, but not an unrelated terminal language. A site-wide chain cannot also express whether one missing position should fall back or remain intentionally absent. | Output Policy |
| **Content for all languages** | A record uses `sys_language_uid = -1` to mean "all languages", although this is behavior rather than a human language. The same complete record is used in every language, and the special value affects many unrelated Core paths. | Synchronization Intent and Language Identity |
| **Target-language-only content** | An editor cannot always create content directly where it is needed while retaining the useful structural relation for the rest of the page. | Structural Identity |
| **Editing from a comprehensible language** | A Chinese editor may need to create Chinese content from English while the site default is German. A permanently privileged default-language column makes the workflow harder to understand. | Structural Identity and editorial context |
| **File-metadata translation at scale** | The [Media module translation control](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/filelist/Classes/FileList.php#L1225-L1305) shows for each file whether metadata for a configured language can be created or edited. Creating or editing target-language alternative text remains a per-file workflow; no dedicated bulk creation or completeness workflow is evident in current Core. | Structural Identity and editorial workflow |
| **Intentional absence** | A missing translation and an intentionally disabled or omitted translation can both lead to fallback. The editor's intent is not represented explicitly enough. | Output Policy |

The "mostly connected, selectively different" case is the clearest description of the middle ground TYPO3 should support better. Identical translated structures and fully independent structures are both valid. A small local exception should not force editors to give up the benefits of the shared majority. See the [June 2026 use-case analysis](https://notes.typo3.org/s/-RP1PwIafA) and its [July refinement](https://notes.typo3.org/s/ccbVIOYfEy).

### What community feedback supports

The [community-feedback matrix from T3DD22 and subsequent events](https://docs.google.com/spreadsheets/d/1Y8KnuYxMoXyVaZzVHENBp_1fg2M-JGxHog6K3T9qn_Q/edit?gid=0#gid=0) does not contain one yes-or-no decision about removing translation modes. It records "Switching translation modes" as an editor problem and easier Mixed-Mode resolution as an editor requirement. Other responses value Free Mode because it permits content in only one language. The 2024 editor interview likewise confirms that "mostly connected, selectively different" is valid while both Mixed Mode and artificial hidden Default-Language records are unsatisfactory.

The established need is therefore not to remove independent editorial outcomes. It is to stop requiring editors to manage technical relation states when their intent is simply to create, omit, replace or reorder content in a particular language. The initiative recommends removing the Free, Connected and Mixed distinction from the normal editor interface once Core can create and maintain the necessary structural relations safely. This recommendation depends on prior work for automatic target creation, relation integrity, migration and lifecycle handling; it is not a deprecation of today's Free Mode behavior. See the [2024 editor interview](https://notes.typo3.org/s/kqdwFxW1m), the [always-connected discussion](https://notes.typo3.org/s/k11hyaA4N) and the [later technically-connected refinement](https://notes.typo3.org/s/2Ysd3gDdn).

<!-- Source Topic: KnowledgeSystem/Knowledge/topics/current-core-behavior.md -->
## Research findings: what exists today

Current TYPO3 behavior is not based on one translation model. It is the interaction of several data and configuration contracts.

| Current contract | What it expresses today | Important coupling |
|---|---|---|
| **Site Language configuration** | A site-local integer ID, locale, fallback type and configured fallback IDs. | A local numeric ID is also used as a record-language value. |
| **Record language value** | `sys_language_uid` stores a positive language ID, `0` for the default language, or `-1` for all languages where supported. | Identity, default role and cross-language behavior share one field. |
| **Translation relation** | `l10n_parent` or `l18n_parent` connects a translation to a default-language record. | The relation also drives Layout module presentation and parts of overlay behavior. |
| **Translation source** | `l10n_source` identifies the record from which content was taken. | Source provenance and structural parent are related but not identical. |
| **Configuration-enforced field synchronization** | `l10n_mode=exclude` statically marks a field in TCA. In connected translations, the field is excluded from independent translation editing and its Default-Language value is synchronized to existing dependent translations. | The rule is fixed for that TCA field. It is not selected per translation through `l10n_state`. |
| **Editor-selectable field synchronization** | `config.behaviour.allowLanguageSynchronization=true` makes a field eligible for a per-translation choice between `parent`, `source` where available, and `custom`; `l10n_state` stores that choice. | The editor controls the field state, but a missing or invalid state currently defaults to `parent`. |
| **Backend translation mode** | Connected, Free or Mixed Mode is inferred from record relations, shown in the Layout module and used to constrain actions such as direct content creation. | The editor-facing workflow exposes properties of the current data structure instead of only asking what the editor wants to create. |
| **Frontend output policy** | Site `fallbackType` and configured fallback IDs define selection and overlay behavior. | A runtime fallback is separate from the backend structural relationship. |

Page translations always retain a parent relation. Free and Mixed Mode primarily describe how other records, especially content elements, relate inside the Layout module.

The current contracts above are supported by the Core code snapshot validated for T3DD26: [TCA language relations](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Configuration/Tca/TcaEnrichment.php#L185-L247), [localization state](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/DataHandling/Localization/State.php#L29-L39), [Layout module mode detection](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/View/BackendLayout/ContentFetcher.php#L165-L203) and [fallback construction](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Context/LanguageAspectFactory.php#L27-L60). Current Core also [derives the mode labels and restricts new content in Connected Mode](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/backend/Classes/View/PageLayoutContext.php#L230-L291), while the [Layout template renders the mode as a visible badge](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/backend/Resources/Private/Partials/PageLayout/LanguageColumns.fluid.html#L27-L33).

Current Core processes both field-synchronization mechanisms in the same [DataMapProcessor pipeline](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/core/Classes/DataHandling/Localization/DataMapProcessor.php#L50-L57), but resolves their fields through separate scopes. `parent` and `source` come from `l10n_state`; the `exclude` scope is collected directly from [`l10n_mode=exclude` in TCA](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/core/Classes/DataHandling/Localization/DataMapProcessor.php#L1338-L1383). The [localization state selects only fields configured with `allowLanguageSynchronization`](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/core/Classes/DataHandling/Localization/State.php#L71-L97), and the [backend selector exposes `custom`, `parent` and, where a source exists, `source`](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/backend/Classes/Form/FieldWizard/LocalizationStateSelector.php#L48-L140). Both mechanisms operate on existing related language records. Neither creates missing language variants or expresses record-wide synchronization by itself.

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
9. **Independent structures remain valid, but editor-visible relation modes are not the desired product contract.** Current Free Mode behavior remains supported and is not deprecated. The recommended future editor workflow hides Free, Connected and Mixed relation states only after Core can preserve independent outcomes and maintain structural identity automatically.
10. **Technical connection does not require identical structures.** Two language variants can share one logical structural identity while one language adds, omits, replaces or reorders content. "Always connected" describes maintained identity, not mandatory structural or content equality.
11. **Small fixes and tests are part of the architecture work.** They expose actual invariants and prevent the future model from being based on incomplete assumptions.
12. **Synchronization metadata and stored values can disagree.** In existing data, an empty or missing `l10n_state` entry does not prove that a localized field equals its parent. Current [Core state enrichment](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/core/Classes/DataHandling/Localization/State.php#L223-L238) treats a missing field state as `parent` without comparing the stored values, so the backend can present the field as inherited while its stored value differs. The open [dbdoctor PR 98](https://github.com/lolli42/dbdoctor/pull/98) demonstrates a repair approach; it is not merged Core behavior.
13. **Field synchronization has two control models today.** `l10n_mode=exclude` enforces synchronization through TCA configuration. `allowLanguageSynchronization` exposes an editor choice stored in `l10n_state`. The execution pipeline is shared, but configuration, state discovery and scopes remain distinct.
14. **Language All applies the complete record.** Current [frontend selection includes `-1`](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/frontend/Classes/ContentObject/ContentObjectRenderer.php#L4780-L4846) for every requested language, and the [overlay logic returns such a record unchanged](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/core/Classes/Domain/Repository/PageRepository.php#L635-L660). A compatible first replacement must therefore preserve the effect of one complete shared row before introducing more granular synchronization.

<!-- Source Topic: KnowledgeSystem/Knowledge/topics/language-identity.md -->
## Vision: separate four responsibilities

The [T3DD26 Four Responsibilities model](https://content.eric-harrer.de/t3dd26/#/four-responsibilities) is the initiative's current conceptual reference point:

> **Separate the responsibilities first. Then reason about possible implementations.**

The responsibilities must be considered in this order when explaining the vision: **Identity → Synchronization → Structure → Output**. They are a problem and responsibility decomposition, not a selected schema, API or migration sequence.

### 1. Language Identity

**Question:** Which human language and variant does this content represent?

**Current coupling:** A record stores a site-local integer. `0` additionally means default language and `-1` means all languages. These extra meanings are not human-language identities.

**Derived requirements:**

- A language must have a stable semantic identity across sites and, where needed, across installations.
- A complete migration away from today's `sys_language_uid` contract requires
  explicit replacements for its non-language meanings: `-1` as record-wide
  Language-All synchronization intent, and `0` as both the Site-default role
  and today's structural lead. The future identity value may identify only a
  real human language or variant.
- Semantic identity must not depend on a locale being installed on the application server.
- Site configuration must map its available languages to the semantic identity explicitly.
- Shared storage, translated file metadata and import/export must not depend on coincidentally equal local numbers.

**Vision:** Content language should be identifiable by what the language is, not only by the site-local number assigned to it. BCP 47 is the initiative's current preference for that semantic identity.

**Open questions:**

- Is a BCP 47 tag the authoritative persisted value, an external identity mapped to an internal key, or part of a different identity model?
- How does each Site assign its Default-Language role to one real semantic
  language without making `0` a special language identity?
- Which script, region, variant and private-use subtags must be supported?
- How are ambiguous legacy IDs and locales migrated?
- Can two records with the same tag intentionally represent different editorial contexts?
- How are permissions, queries, relations and extension APIs adapted without an unsafe big-bang change?

BCP 47 addresses semantic identity only. It does not by itself replace the
current `-1` synchronization behavior or decide which Structural-Identity model
assumes the role currently coupled to `0`. Whether the tag is stored directly
or mapped to an internal identifier also remains open. The current field
contract can therefore be replaced completely only after those separate
responsibilities have explicit migration contracts; this dependency does not
select their implementation.

<!-- Source Topic: KnowledgeSystem/Knowledge/topics/synchronization-intent.md -->
### 2. Synchronization Intent

**Question:** Which fields or records must stay aligned, and where may they differ?

**Current coupling:** At field level, `l10n_mode=exclude` enforces synchronization through TCA, while `allowLanguageSynchronization` lets editors choose `parent`, `source` or `custom` through `l10n_state`. At record level, `-1` makes the same complete record apply across languages. These mechanisms differ in scope, control and lifecycle, while "language all" is still encoded as a language value.

**Derived requirements:**

- Record-wide and field-level synchronization must be explicit and distinguishable.
- Editor-selectable and configuration-enforced field synchronization must remain distinguishable even if they are represented through one TCA and state model.
- The first `-1` replacement must reproduce full-record Language-All behavior before later versions add target-language or field-level exceptions.
- While first-stage full-record synchronization is active, record-level enforcement must take precedence over per-field `custom` choices and the editor must not be offered an ineffective opt-out.
- The intended target languages must be known.
- Editors must understand which values are inherited, synchronized or independent.
- Automatically created variants need provenance and ownership.
- Activation, modification, detachment and deactivation must have defined, repeatable behavior.
- Workspaces, versions, relations, deletions, restoration and newly added site languages must be part of the lifecycle.
- Migration and repair must reconcile `l10n_state` with stored values and relations without overwriting intentional manual differences.
- Replacing `l10n_mode=exclude` must preserve its no-opt-out behavior for affected translations and provide explicit migration and compatibility rules.
- Materialized target records need their own identity and lifecycle metadata even when every behavior-relevant source value remains enforced.

**Vision:** "Maintain once for several languages" should be represented as synchronization intent applied to concrete language variants, not as a fictitious language identity.

**Open questions:**

- Which lead record and site or shared-storage scope determine the target languages for the first all-target Boolean?
- Which fields reproduce the complete Language-All effect, and which target identity or system-managed fields must remain distinct?
- When target records or manual translations already exist at activation, are
  they adopted into the synchronization group, reconciled, overwritten,
  replaced or retained independently, and who may authorize that transition?
- Are automatically created or adopted targets directly editable? If so,
  which local changes are permitted and how do they interact with enforced
  synchronization? If not, how does the editor recognize them as synchronized
  representations of the lead record?
- When record-wide synchronization is disabled, are materialized targets
  retained and detached, disabled, soft-deleted or removed, and how are their
  origin and previous synchronization state preserved if they become
  independent?
- Does a later language join an existing synchronization group automatically?
- How are missing or inconsistent `l10n_state` entries classified when scalar values or relations differ?
- Should a new `config.behaviour.enforceLanguageSynchronization` represent the enforced state through `l10n_state` and replace `l10n_mode=exclude`?
- If `l10n_mode` is removed, how are `prefixLangTitle`, the default behavior and extension compatibility handled?

The Boolean all-languages flag is the useful minimal compatibility model: in its first stage it should mean all configured targets and no field-level opt-out, matching the complete-record effect of `-1`. A natural feature option built on that state is to replace or extend the Boolean with a record-level multi-select of synchronization target languages. The same full-record process would then create and maintain targets only in the selected languages. A [tentative meeting proposal](https://notes.typo3.org/s/Sxl-kkYjW) called the record field `language_sync` and its TCA reference `ctrl.languageSyncField`; neither name nor API is selected. Whether and when to introduce the multi-select must be decided, and field-level exceptions are a separate possible extension. Neither the flag nor the multi-select is a finished lifecycle or adopted TCA API.

**Possible technical reuse path for first-stage `-1` parity:**

1. A record-wide synchronization intent on a lead record initially selects every target language in its defined site or storage scope.
2. The DataHandler ensures that one connected target record exists in each target language. Current [`localize()`](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/core/Classes/DataHandling/DataHandler.php#L4735-L4918) already validates the target Site Language, rejects duplicates and prepares language, parent and source values; [`localizeRecord()`](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/core/Classes/DataHandling/DataHandler.php#L4921-L5004) creates the target through a nested DataHandler operation.
3. Each target receives an enforced `l10n_state`, or an equivalent new state representation, for every field needed to reproduce the complete source record. The existing DataMapProcessor can then reuse its [parent-to-dependent propagation for scalar values and relations](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/core/Classes/DataHandling/Localization/DataMapProcessor.php#L381-L452).
4. Later updates continue through the same dependency pipeline. After functional parity is proven, the same contract can support a separately decided multi-select of target languages while retaining full-field enforcement within every selected target.

"Every field" means every value whose current `-1` record is intended to expose identically, including output and structural values. It does not mean that generated records share `uid`, `sys_language_uid`, `l10n_parent`, `l10n_source`, `l10n_state` or Workspace/version metadata; those fields establish the identity and lifecycle of each target record. The exact Core-managed exclusion set must be defined by schema and characterized in tests.

This is a possible reuse path, not a drop-in configuration change. The record-level intent would have to derive effective `enforceLanguageSynchronization` semantics for every parity-relevant field of its targets. Declaring `l10n_mode=exclude` statically on every TCA field would also affect unrelated records. Current DataMapProcessor [skips `-1` records and requires connected target records](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/core/Classes/DataHandling/Localization/DataMapProcessor.php#L203-L284). The new record-level path must therefore resolve targets, create or reconcile them, derive the full enforced field set and perform activation atomically and idempotently. A current `-1` source must first be mapped to a valid lead record or handled by a new creation path because existing `localize()` establishes a connected parent when the source is a Default-Language record.

For the multi-select, adding a language can reuse the same "ensure target, then enforce all fields" operation. Removing a language needs an explicit lifecycle decision: retain and detach the generated record, disable it, soft-delete it or remove it. The stored target identity must also remain meaningful across sites; current site-local numeric IDs are not sufficient for a shared-storage contract. These points make the multi-select a concrete feature option requiring a decision, not an implemented field definition or fixed next step.

A separate possible field-level consolidation is `enforceLanguageSynchronization` beside `allowLanguageSynchronization` at the same `config.behaviour` level. The enforced state could then be represented through `l10n_state`, allowing `l10n_mode=exclude` and its separate field-selection scope to be retired. This was proposed by the initiative but is neither implemented nor selected. Its exact state representation, migration and compatibility contract remain open. It must not be conflated with the separate record-wide replacement for `-1`.

<!-- Source Topic: KnowledgeSystem/Knowledge/topics/structural-identity.md -->
### 3. Structural Identity

**Question:** Which records represent the same logical content position across languages?

A logical content position is the shared place or role of a page, content element or other localizable record. It is not necessarily the record whose text was used as the translation source.

**Current coupling:** In Connected Mode, the record with
`sys_language_uid = 0` is both visible content in one real language and the
structural parent or lead for connected variants. Its language identity,
Site-default role and structural responsibility are therefore coupled. Free
Mode removes the parent relation. Mixed Mode combines both states on one page.
Core derives those labels from `l18n_parent`, displays them in the Layout module
and normally prevents direct content creation in a Connected-Mode target
column. A local addition therefore needs either a fabricated Default-Language
record or an independent record that loses the shared relation.

**Derived requirements:**

- TYPO3 must be able to preserve the shared majority while allowing explicit language-specific additions, omissions, replacement or reordering.
- A structural relation must not require meaningless visible content in another language.
- Editors should be able to create content directly in the language where it is needed without deciding whether that language or page is structurally Free, Connected or Mixed.
- Core should create and maintain the necessary structural identity automatically, including for content that exists in only one real language.
- A maintained structural connection must still allow language-specific additions, omissions, replacements and ordering.
- The system should manage relation integrity and prevent duplicate or impossible parent assignments.
- Content source, structural parent and current editing context must remain distinct.
- Structural reference and leadership must be modelled independently of which
  real language is configured as the Site's Default Language; no real output
  language should be structurally privileged for that reason alone.
- The model must cover pages, content and other localizable records while retaining necessary record-type differences.
- Editors need a clear view of which language variants exist and efficient creation workflows for records beyond pages and content, including file metadata.
- The mode distinction may disappear from normal editor UX only after creation, migration, permissions, deletion, restoration and Workspace behavior preserve today's valid outcomes.

**Vision:** The editor chooses the language and the intended content operation. Core maintains a technical connection to the same logical position while allowing each real language to have its own visible structure. Structural relationships should support "mostly connected, selectively different" content without artificial visible Default-Language partners or accidental loss of connection.

"Technically connected" does not mean that every language must render the same records in the same order. It means that Core retains an explicit cross-language identity even when a language omits, adds, replaces or reorders content. A genuinely independent editorial result therefore remains possible without using a missing parent relation as its storage contract.

**Editor-facing recommendation:** Remove the Free, Connected and Mixed mode distinction from the normal Layout workflow once Core can uphold that contract. This is a UI and product recommendation with architectural prerequisites. It is not a statement that existing Free-Mode data can already be converted safely or that independent structures should disappear.

**Editing Language:** The preferred product concept is a selectable content language from which the editor works, independent of the backend interface language. For example, a Chinese editor could create Chinese content from English while German remains the site default. The Layout module would place English where it currently always places the default language. This is a product direction, not an implemented feature.

#### Current structural preference and the two meanings of Shadow Record

The discussions have used "Shadow Record" for two materially different representations:

- A **language-layer shadow** is a placeholder inside a concrete language. It completes that language's structure even when the position has no visible content there.
- A **structural shadow** is one contentless record in a shared hidden structure layer. Real language records connect to it as their common structural identity; it is not duplicated into every language.

Conflating them would hide the main trade-off. The comparison also addresses a
migration dependency: if `0` no longer gives one real language implicit
structural leadership, an explicit Structural-Identity model must take over
that reference and responsibility. The initiative has discussed two possible
paths; neither is selected by the language-identity migration:

| Path | Representation | Benefit | Main risk or open work | Current assessment |
|---|---|---|---|---|
| **1. Complete structure in every language** | Every language contains every structural position and could in principle act as the structural lead. Core creates language-layer shadows wherever that language has no visible content. | Each language layer is structurally self-contained and can express local ordering. | Every local deviation must be projected into other language layers. Record volume, synchronization, Workspace versions, references and visible Layout density can grow with languages and structural differences. Even a small reorder can require several generated placeholders; the exact multiplier is model-dependent and has not been measured. | **Discussed, but currently disfavored in comparison with a shared layer. Not disproved or formally rejected.** |
| **2. Shared hidden structure plus real language layers** | Split the current Default Language's roles. A contentless, language-neutral structure layer stores each logical position; the current default output content moves to its own real language layer, like every other output language. Core creates a structural shadow when a language introduces a new position, and every real variant connects to that shared position. | One cross-language reference point without universal language-layer shadows; no real output language has to lead all structure. | The exact entity and identifier, migration of current Default-Language content, per-language ordering and absence, permissions, APIs, Workspaces, references and hiding the structural layer from backend and frontend output all require design and testing. | **Current preference for investigation. Still a hypothesis, not selected or implemented Core architecture.** |

The second path should remain invisible in normal editorial and frontend output. "Hidden" is part of the desired product behavior, not a claim about current Core. A shared identity alone also does not solve local ordering: the model still needs an explicit language-specific placement, ordering or delta contract.

**Open questions:**

- What exact record or entity owns structural reference and leadership if no
  real output language is privileged?
- Does a shared structure introduce a separate entity, use another
  representation or require a temporary compatibility mapping without keeping
  `0` as a semantic human-language identity?
- How are sorting, moves, local additions, omissions and replacements represented per language around one shared identity?
- Which structural records are visible to editors, APIs, references and Workspaces?
- When can an independently created record later join an existing structure safely?
- Which migration and lifecycle guarantees are prerequisites before the normal UI can stop showing Free, Connected and Mixed modes?
- How are existing Free- and Mixed-Mode records migrated without losing their independent outcome?

<!-- Source Topic: KnowledgeSystem/Knowledge/topics/output-policy.md -->
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

<!-- Source Topic: KnowledgeSystem/Knowledge/topics/solution-spaces.md -->
## Possible solution spaces

The following approaches answer parts of the responsibilities. None is the complete vision by itself.

| Requirement or question | Possible approach | Expected benefit | Trade-offs and open points | Current assessment |
|---|---|---|---|---|
| Stable semantic language identity | Use BCP 47 tags and explicit Site Language mapping. | Cross-site meaning, clearer shared storage and exchange. | Legacy mapping, tag policy, database/API compatibility and possible internal keys. | **Current direction; storage decision open.** |
| Replace `-1` behavior | Add an all-target record flag that creates missing connected target records and enforces every parity-relevant field through `l10n_state` or equivalent state. | Reproduces complete-record behavior first, removes behavior from the language field and reuses DataHandler target creation and synchronization. | Lead and target scope, exact enforced field set, existing targets, atomicity, provenance, Workspaces, relations and migration. | **Strong direction; reuse path plausible but unvalidated; design incomplete.** |
| Select synchronization targets | Evolve the all-target Boolean into a record-level multi-select of target languages while reusing the same target creation and full-record synchronization process. | Adds target-language granularity without requiring a separate synchronization engine. | Stable target identity, permissions, existing target conflicts and lifecycle when a language is selected or removed. | **Possible feature; decision and lifecycle open.** |
| Unify field-synchronization configuration | Add `config.behaviour.enforceLanguageSynchronization`, represent the enforced field state through `l10n_state` and evaluate replacing `l10n_mode=exclude`. | One TCA and state model for editor-selectable and configuration-enforced field synchronization; fewer overlapping selection branches in Core. | Exact state value, editor display, migration, `prefixLangTitle`, default behavior and extension compatibility. | **Possible approach; not implemented or selected.** |
| Preserve current sparse records | Keep current records and relations, but clarify APIs, tests and UX. | Lowest migration and data-volume cost. | Retains missing-record states, overlay branches and default-language coupling. | **Current baseline, not sufficient for every requirement.** |
| Remove editor-visible translation modes | Let editors create, omit, replace and reorder content in the selected language while Core maintains structural identity. | The workflow expresses editorial intent instead of requiring knowledge of `l18n_parent` and inferred page mode. | Depends on safe automatic structural creation, legacy migration, permissions, lifecycle, Workspaces and clear representation of independent outcomes. | **Product recommendation; prerequisites and UX contract open.** |
| Complete per-language layers | Materialize every structural position in every relevant language, using language-layer shadows where content is absent. | Every language is structurally self-contained and can carry local ordering. | Highest duplication risk; synchronization, Layout density, Workspace versions, references, migration and the actual record multiplier need measurement. | **Discussed direction; currently disfavored, not selected.** |
| Shared hidden neutral structure layer | Separate common structural identity from real output languages, migrate today's default output content into its own real language layer and create contentless structural shadows as shared anchors. | No real language must be the structural lead; less universal shadow duplication and one cross-language reference point. | Introduces an abstraction that every editing, query, relation, permission and Workspace path must understand; local ordering and explicit absence still need a contract. | **Current preference for investigation; still an unselected hypothesis.** |
| Bounded hybrid | Keep a shared structural identity and materialize language records only when content or explicit absence requires them. | Could combine explicit structure with bounded data growth. | More states and transition rules; analytical option not yet validated by the initiative. | **Analytical option; not a separate initiative preference.** |
| Editing Language | Let editors select the content language from which they work and use it as the primary backend context. | Removes irrelevant default-language text from the workflow and supports non-default sources. | Page Tree, Layout module, Records module, permissions, ordering and source/provenance behavior. | **Preferred product framing; prototype still needed.** |
| Explicit absence intent | Represent whether fallback should continue or stop for one structural position. | Makes regional omission predictable. | Backward compatibility, UX and consistent frontend evaluation. | **Derived requirement; representation open.** |

A generic multi-dimensional model for language, country, market, brand or audience is an adjacent future perspective. It may eventually help separate language from other content contexts, but it is not the initiative's immediate answer to the four responsibilities.

<!-- Source Topic: KnowledgeSystem/Knowledge/topics/current-core-work.md -->
## What has been achieved

The initiative and related Core work have already delivered bounded improvements. These results make today's system safer or easier to understand; they do not implement the complete vision.

`main` is a moving development branch, not a stable TYPO3 version label. This document therefore pairs it with the major development line it represented at the stated time. For merged changes, that is the line represented by `main` when the change was merged. For open changes, `main` represented the TYPO3 v15 development line when external status was checked on 2026-08-21. Fixed maintenance branches such as `14.3` and `13.4` are named directly.

| Result | Delivered release lines | Immediate improvement | Responsibility or learning |
|---|---|---|---|
| [Gerrit 83632](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83632), merged 2024-04-26 | TYPO3 v13 (`main` at merge time); no additional release line is named. | Created valid source data for DataHandler localization tests. | Reliable fixtures are a prerequisite for behavioral change. |
| [Gerrit 84237](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84237), merged 2024-05-25 | TYPO3 v13 (`main` at merge time); no additional release line is named. | Prevented orphaned translated records in a copy process. | Structural and language validity must be preserved during copy. |
| [Gerrit 83310](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83310), [86085](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86085) and [85912](https://review.typo3.org/c/Packages/TYPO3.CMS/+/85912), merged between 2024-05-13 and 2025-01-07 | 83310 and 86085: TYPO3 v13 (`main` at merge time). 85912: TYPO3 v14 (`main` at merge time), plus TYPO3 v13 LTS (`13.4`) as merged [Gerrit 87655](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87655). | Added focused tests for copying localized content to an untranslated page, copying inline children and moving `-1` content. | Characterization records current constraints before behavior is changed. |
| [Gerrit 86773](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86773) and [88827](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88827), merged 2025-01-10 and 2025-05-05 | TYPO3 v14 (`main` at merge time), plus TYPO3 v13 LTS (`13.4`) as merged [87689](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87689) and [89297](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89297). | Synchronized the language of inline children during copy and preserved the language of translations during copy. | Copy operations must retain language intent for children and translated records. |
| [Gerrit 89199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89199), merged 2025-04-30 | TYPO3 v14 (`main` at merge time), plus TYPO3 v13 LTS (`13.4`) as merged [Gerrit 89286](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89286). | Keeps the selected language while navigating within one site, shows Default-Language content when no translation exists and resets the selection when another site does not provide that language. | Prevents an invalid language selection from producing an empty Layout module while preserving the editor's useful context where possible. |
| [Gerrit 92580](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92580), merged 2026-02-09 | TYPO3 v14 (`main` at merge time), plus TYPO3 v13 LTS (`13.4`) as merged [Gerrit 92757](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92757). | Restricts copied record translations to languages available in the target site. | A bounded integrity fix for current site-local language handling. |
| [Gerrit 92881](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92881), merged 2026-02-20 | TYPO3 v14 (`main` at merge time); no additional release line is named. | Separates `localizeRecord()` from `copyRecord()` in DataHandler. | Clearer code paths support safer characterization and later change. |
| [Gerrit 88837](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88837), merged 2026-04-11 | TYPO3 v14 (`main` at merge time); no additional release line is named. | Avoids remapping non-language-aware IRRE children and uses separately assigned records for localized parents. | A concrete case where explicit synchronized data resolved ownership ambiguity. |
| [Gerrit 94831](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94831), merged 2026-07-21 | TYPO3 v15 (`main` at merge time), [TYPO3 v14 LTS (`14.3`) as Gerrit 94866](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94866) and [TYPO3 v13 LTS (`13.4`) as Gerrit 94867](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94867) merged. | Resolves translated Mount Point subpages through the default-language relation and prevents a `404`. | A real shared-storage project produced a small, test-backed fix. |
| [Gerrit 94914](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94914), merged 2026-08-01 | TYPO3 v15 (`main` at merge time), [TYPO3 v14 LTS (`14.3`) as Gerrit 94916](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94916) and [TYPO3 v13 LTS (`13.4`) as Gerrit 94915](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94915) merged. | Finds existing translations through `l10n_parent` when `l10n_source` is empty. | Preserves the distinction between structural parent and translation source while preventing duplicates. |
| [Gerrit 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170), merged 2026-08-10 | TYPO3 v15 (`main` at merge time) and [TYPO3 v14 LTS (`14.3`) as Gerrit 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199) merged. | Corrects comparison views that combine Connected- and Free-Mode languages: connected items form comparison rows while each Free-Mode language renders independently, including when the Default Language has no items. | A bounded interim correction for the current modes. It does not select the future editing or structural model. |
| [Gerrit 95178](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95178), merged 2026-08-10 | TYPO3 v15 (`main` at merge time) and [TYPO3 v14 LTS (`14.3`) as Gerrit 95202](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95202) merged. | Keeps the language title, flag and translation mode visible while scrolling a long comparison view in the Layout module. | Improves editor orientation in the current interface. The patch is explicitly interim and neither changes nor selects a future structural model. |

The [initiative test extension](https://github.com/t3thi/translation-handling) also provides reproducible translation, fallback and relation scenarios. It was revived and extended with focused IRRE cases in 2025. It is research infrastructure, not evidence of changed Core behavior.

The repeated pattern is useful: a real failure is reproduced, the responsible contract is identified, tests define the boundary and the fix remains narrow. This is the initiative's preferred form of incremental improvement.

## Current work as of 2026-08-21

Each open Core patch has one primary status entry according to its current official state. **WIP** takes precedence over review findings. **Review action required** means that the current patch set has at least one unresolved comment, a current negative review or verification, or a merge conflict. **Review-positive and mergeable** is the final patch category used here; it requires at least one current Code-Review `+1`, no current negative vote, no unresolved comment and a mergeable current revision. **Awaiting review** covers open patches without those blockers but without a current positive Code-Review. **Rejected or superseded** records changes that are formally abandoned when the reason remains relevant.

For open Gerrit changes, **Merge conflict: Yes** means that Gerrit reported the current revision as `mergeable: false` against its target branch on 2026-08-21. This can change when the target branch or patch set changes. **No** means `mergeable: true`; it does not replace review or submit approval. The release-line column lists actual Gerrit changes separately from additional branches named only in a commit's `Releases:` footer. A named branch without its own Gerrit change is not a pending or merged backport.

### Work in progress (WIP)

| Patch | Target release lines and backports | Current review state | Merge conflict | Scope and boundary |
|---|---|---|---|---|
| [Gerrit 84338](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84338) | TYPO3 v15 (current `main`); no additional release line is named. | Patch set 6; WIP; CI `+1`; 4 unresolved comments. | **Yes** | Proposes using the first Site Language ID as the Default Language instead of enforcing `0`. Broad Core-wide assumptions remain unresolved, and the initiative later moved its immediate priority away from this route. |
| [Gerrit 92267](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92267) | TYPO3 v15 (current `main`); no additional release line is named. | Patch set 6; WIP; CI `+1`; no unresolved comments. | No | Inventories persisted `Language All` assumptions. It changes no executable behavior and is not a characterization-test suite or replacement implementation. |
| [Gerrit 92859](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92859) | TYPO3 v15 (current `main`); no additional release line is named. | Patch set 6; WIP; CI `-1`; 6 unresolved comments. | **Yes** | Proposes language- and Workspace-aware MM tables. Its uniform relation model is relevant, but the use of live Default-Language UIDs is an incremental design, not a decision for future Structural Identity. |
| [Gerrit 93289](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93289) | TYPO3 v15 (current `main`); no additional release line is named. | Patch set 1; WIP; CI `+1`; no unresolved comments. | No | Adds Workspace coverage for Language-All paste behavior and fills a characterization gap before semantic changes. |
| [Gerrit 93819](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93819) | TYPO3 v15 (current `main`); TYPO3 v14 LTS (`14.3`) is named, but no backport change exists yet. | Patch set 2; `[WIP]`; CI `+1`; no unresolved comments. | **Yes** | Adds move guards for Free-Mode content while current Free Mode remains supported. |
| [Forge 110328](https://forge.typo3.org/issues/110328) and [Gerrit 95042](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95042) | TYPO3 v15 (current `main`); no additional release line is named. | Patch set 1; `[WIP]`; CI `+1`; no unresolved comments. | No | Restricts selectable translation parents to prevent duplicate or structurally invalid assignments. The patch is not an implemented fix. |
| [Forge 110330](https://forge.typo3.org/issues/110330) and [Gerrit 95043](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95043) | TYPO3 v15 (current `main`); no additional release line is named. | Patch set 1; `[WIP]`; CI `+1`; no unresolved comments. | No | Hides Connected Mode when the source cannot establish a Default-Language relation. A Free-Mode source cannot create the missing connection. |

### Review action required

| Patch | Target release lines and backports | Current review state | Merge conflict | Scope and boundary |
|---|---|---|---|---|
| [Gerrit 87595](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87595) | TYPO3 v15 (current `main`); TYPO3 v14 LTS (`14.3`) is named, but no backport change exists yet. | Patch set 11; CI `-1`; 3 unresolved comments. | **Yes** | Changes the language of existing inline child records with their parent. Reviews still require broader relation coverage, tests and migration consideration. |
| [Gerrit 92777](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92777) | TYPO3 v15 (current `main`); TYPO3 v14 LTS (`14.3`) is named, but no backport change exists yet. | Patch set 10; two Code-Review `+1`; CI `+1`; 1 unresolved comment. | No | Restricts copied Free-Mode records to languages available in the target context. This improves current-model integrity without selecting a future structure model. |
| [Gerrit 93063](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93063) | TYPO3 v15 (current `main`); TYPO3 v14 LTS (`14.3`) is named, but no backport change exists yet. | Patch set 7; Code-Review `+1`; CI `+1`; no unresolved comments. | **Yes** | Warns about invalid translation parents. The patch is review-positive but must be made mergeable against the current TYPO3 v15 `main`; it makes structural corruption visible but does not repair or redesign identity. |
| [Forge 110008](https://forge.typo3.org/issues/110008) and [Gerrit 94510](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94510) | TYPO3 v15 (current `main`); TYPO3 v14 LTS (`14.3`) and TYPO3 v13 LTS (`13.4`) are named, but no backport changes exist yet. | Patch set 8; CI `+1`; 1 unresolved comment. | No | Addresses a regression after merged [Gerrit 88828](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88828), in which `strict` output can fall back from a hidden requested-language record to another language. Current behavior is unchanged while the fix remains unmerged. |
| [Gerrit 94917](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94917) | TYPO3 v15 (current `main`); no backport branch is named and no backport change exists. | Patch set 4; no current Code-Review vote; 1 unresolved comment. | **Yes** | Improves Free/Mixed comparison rendering. Replacement by the merged [TYPO3 v15 change 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170) and [TYPO3 v14 LTS backport 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199) has been proposed in review, but 94917 is still officially open rather than abandoned. |
| [Gerrit 93752](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93752) | TYPO3 v15 (current `main`); TYPO3 v14 LTS (`14.3`) is named, but no backport change exists yet. | Patch set 3; CI `+1`; no current Code-Review vote or unresolved comment. | **Yes** | Adds copy guards for Free-Mode content. The current revision must first be made mergeable against the current TYPO3 v15 `main`. |

### Review-positive and mergeable

No current patch meets all criteria. Gerrit 92777 has positive reviews but an unresolved comment; Gerrit 93063 has a positive review and no unresolved comment but a merge conflict. Both therefore remain under **Review action required**.

### Awaiting review

| Patch | Target release lines and backports | Current review state | Merge conflict | Scope and boundary |
|---|---|---|---|---|
| [Gerrit 93028](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93028) | TYPO3 v15 (current `main`); TYPO3 v14 LTS (`14.3`) is named, but no backport change exists yet. | Patch set 6; CI `+1`; no current Code-Review vote or unresolved comment. | No | Applies the requested parent language to newly created relation children while leaving already localized children unchanged. |
| [Gerrit 95038](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95038) | TYPO3 v15 (current `main`); no additional release line is named. | Patch set 2; CI `+1`; no current Code-Review vote or unresolved comment. | No | Keeps `pages.doktype` aligned with the Default-Language page through `l10n_mode=exclude` and provides an Upgrade Wizard for existing divergent translations. This enforces a current-model invariant rather than selecting a future structural model. |

### Rejected or superseded

| Patch | Target release lines and backports | Official state | Merge conflict | Reason |
|---|---|---|---|---|
| [Gerrit 92585](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92585) | TYPO3 v15 (`main` at abandonment); TYPO3 v14 LTS (`14.3`) was named, but no backport change exists. | Abandoned on 2026-08-07. | Not applicable | Its narrow Free-Mode rendering fix was further developed in the merged [TYPO3 v15 change 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170) and [TYPO3 v14 LTS backport 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199). |

### Supporting patches and non-patch research

| Work | Current state | Merge conflict | Meaning |
|---|---|---|---|
| [dbdoctor PR 98](https://github.com/lolli42/dbdoctor/pull/98) | Open; GitHub reports the current head as not mergeable and `dirty`. | **Yes** | Repairs `l10n_state` when synchronized metadata disagrees with stored translated values. It is not merged Core behavior. |
| [dbdoctor PR 171](https://github.com/lolli42/dbdoctor/pull/171) | Open `[WIP]`; GitHub reports the current head as clean and mergeable. | No | Detects orphaned translations left by historical copy operations. It is diagnostic and repair tooling, not a merged Core fix or a new translation model. |
| Language-All visibility in every backend language | Proposed in the reviewed meeting on 2026-08-14; no Gerrit change is registered. | Not applicable | Would show each existing `sys_language_uid = -1` record in every language column at its effective sorting position. This is bounded preparatory usability work that retains current Language-All semantics and does not select a future structure model. |
| Structural-layer and Editing-Language exploration | Product framing exists; no completed prototype is evidenced. | Not applicable | A sketch, click dummy or extension experiment would test editor value and structural assumptions before an architecture decision. |

<!-- Source Topic: KnowledgeSystem/Knowledge/topics/critical-alignment.md -->
## Critical alignment against the vision

The vision is a review framework, not a reason to reject every partial solution.

| Change or approach | Problem solved within its scope | Assessment against the four responsibilities |
|---|---|---|
| [Disable custom `colPos` and `CType` for connected translations](https://review.typo3.org/c/Packages/TYPO3.CMS/+/85978), merged for TYPO3 v13 (`main` at merge time); no additional release line is named | Protects structural consistency for connected content and containers. | Sound for connected structure. It also removed a workaround for expressing local absence, showing why Structural Identity and Output Policy need their own explicit mechanisms. |
| [Respect fallback chains during record overlay](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83169), merged for TYPO3 v14 (`main` at merge time), and its merged [TYPO3 v13 LTS (`13.4`) backport](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88828); the [strict-regression fix](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94510) is open for TYPO3 v15 (current `main`), while its named TYPO3 v14 LTS (`14.3`) and TYPO3 v13 LTS (`13.4`) backport changes do not yet exist | Fixed real fallback behavior, but also exposed a regression when a requested-language record is hidden under `strict`. | Compatible with the vision when restricted to fallback mode. The active fix confirms that `strict` must not silently behave like fallback; its current patch set has CI `+1`, one unresolved comment and is not merged. |
| Free/Mixed comparison fixes | Make independent and connected content visible and aligned in the current Layout module. | Valuable current UX work. They preserve valid independence while making structural relations clearer; they do not need to wait for a new data model. |
| MM context proposal | Reduces relation ambiguity across languages and Workspaces. | A reasonable preparatory model if migration and Extbase/DataHandler behavior remain consistent. It should not be mistaken for final semantic identity. |
| Explicit all-language synchronization | Replaces one shared `-1` row with concrete target-language records whose parity-relevant fields remain fully enforced. | Strongly aligned in principle. The first stage should preserve complete-record behavior without editor opt-out; granularity comes later. It becomes unsafe if target creation, lifecycle, provenance, conflict and migration rules are undefined. |
| Target-language multi-select | Limits the same full-record synchronization process to selected target languages. | A natural extension after parity, but not a committed next feature. It remains aligned if target identity and deselection semantics are explicit. |
| Field-level `enforceLanguageSynchronization` | Could replace `l10n_mode=exclude` while retaining configuration-enforced synchronization. | Aligned with explicit Synchronization Intent if enforced and editor-selectable states remain distinguishable. Current Core already shares the execution pipeline, so the gain is consolidation of configuration, state discovery and scopes. Migration and compatibility are undecided. |
| Mode-free editor workflow | Removes the need to choose Free, Connected or Mixed Mode when the actual intent is to work in one language. | Strongly aligned as a product requirement once Core maintains identity and preserves local structural freedom. It is not safe to remove today's controls before migration and lifecycle prerequisites exist. |
| Complete language layers with universal shadows | Makes every language structurally complete. | Covers local structure but is currently disfavored because it can amplify records, synchronization, Workspace versions and Layout density. The costs are not yet quantified, so this is not a rejection based on measured performance. |
| Shared hidden structure layer | Gives every real language the same language-neutral structural reference point. | The current structural preference because it avoids universal shadows and separates visible content from structural lead. It remains an unselected hypothesis until local ordering, permissions, Workspaces, references, migration and editor invisibility are validated. |

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
- **Decision required:** the exact first-stage parity contract: all target languages, every behavior-relevant field enforced and only target identity or Core-managed lifecycle fields excluded.
- **Open question:** how target scope is resolved for shared storage, how existing target records are reconciled and how multi-target creation is made atomic and idempotent.
- **Possible approach:** after Boolean parity, reuse the same process for a record-level multi-select of synchronization target languages while keeping all parity-relevant fields enforced inside each selected target.
- **Decision required:** whether and when to introduce the multi-select and at which site, storage or semantic-language scope it operates.
- **Open question:** the stable identity stored by the multi-select and the detach, disable, delete or restore behavior when a target language is removed.
- **Open question:** whether `enforceLanguageSynchronization` should become the configuration-enforced counterpart to `allowLanguageSynchronization` and replace `l10n_mode=exclude` through `l10n_state`.
- **Open question:** the exact enforced state, editor presentation and migration of `exclude`, `prefixLangTitle`, default behavior and extension TCA.
- **Open question:** activation, overwrite, provenance, detachment, deactivation, deletion, restoration and new-language behavior.
- **Open question:** interaction with field synchronization, relations, Workspaces and permissions.

### Structural Identity

- **Current direction:** investigate a shared hidden, language-neutral structure layer before complete per-language shadows; this preference is not an adopted Core architecture.
- **Decision required:** the exact representation and ownership of logical structure when no real output language is privileged.
- **Open question:** whether the preferred shared structure, complete layers, a bounded hybrid or an improved sparse representation best satisfies the acceptance cases after prototyping and measurement.
- **Open question:** lifecycle and visibility of language-layer shadows, structural shadows, placeholders or structural-only records.
- **Decision required:** prerequisites and migration rules for removing Free, Connected and Mixed Mode from the normal editor interface while preserving existing independent outcomes.
- **Open question:** the per-language placement, sorting and absence contract around a shared structural identity.
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

<!-- Source Topic: KnowledgeSystem/Knowledge/topics/evidence-maintenance.md -->
## Next meaningful steps

These are the initiative's current best sequence of activities, not a committed TYPO3 release roadmap.

1. **Keep the evidence base current.** Add reproducible editor and project use cases, especially where language, country, structure and output intent differ.
2. **Complete focused characterization.** Review the `-1` inventory, map each valid behavior to a test and close known Workspace and DataHandler gaps.
3. **Finish bounded fixes.** Formally resolve the still-open overlapping Free/Mixed change 94917 now that its replacement is merged for TYPO3 v15 (`main`) and TYPO3 v14 LTS (`14.3`), progress copy/move integrity patches, validate the parent-selector and wizard drafts and resolve the failing strict-fallback regression patch.
4. **Prototype product behavior before storage.** Test Editing Language, a mode-free Layout workflow, direct target-language creation, local structural additions and explicit absence with realistic editor workflows.
5. **Validate the current structural preference against its countermodel.** Use the same acceptance cases for the shared hidden structure, complete per-language shadows, sparse records and any hybrid. Measure record growth, Layout density, Workspaces, references, migration and operational costs rather than assuming them.
6. **Define and characterize first-stage parity.** Specify the all-target record flag, target creation, the full enforced field set, source and target identity, conflicts and every transition. Prove that it reproduces current `-1` output, then evaluate the separately decidable multi-select and other granular extensions against the same process.
7. **Agree the semantic identity contract.** Decide what BCP 47 identifies, how Site Languages map to it and how legacy values migrate.
8. **Design compatibility before removal.** Introduce explicit alternatives first, provide migration and extension guidance, then consider deprecation of old semantics.
9. **Bring evidence to the required decision makers.** The initiative should make trade-offs and consequences concrete so Core, product and architecture decisions can be made on a shared factual basis.

## Evidence basis and maintenance

This reconstruction includes all repository meeting minutes through 2026-07-31 and all available transcripts through 2026-07-31. A supplied initiative-channel snapshot was reviewed as a supplemental source for durable use cases, implementation references and unminuted gaps; it does not advance the minute or transcript cutoffs. Current Gerrit, Forge and linked supporting-patch states in the achievement and work sections were checked on 2026-08-11. The [T3DD26 presentation](https://content.eric-harrer.de/t3dd26/) presents the conceptual model used in this reconstruction.

Key primary evidence anchors are:

| Topic | Meeting evidence |
|---|---|
| Community feedback and editor-facing mode simplification | [T3DD22 and subsequent feedback matrix](https://docs.google.com/spreadsheets/d/1Y8KnuYxMoXyVaZzVHENBp_1fg2M-JGxHog6K3T9qn_Q/edit?gid=0#gid=0), [2024-03-22](https://notes.typo3.org/s/kqdwFxW1m), [2025-07-11](https://notes.typo3.org/s/k11hyaA4N), [2025-10-24](https://notes.typo3.org/s/2Ysd3gDdn) |
| Language identity and BCP 47 | [2024-01-19](https://notes.typo3.org/s/sEONb4kd6), [2025-07-25](https://notes.typo3.org/s/dtw4v9T7S), [2026-07-31](https://notes.typo3.org/s/z5ICno5pK2) |
| `-1` replacement, full-record parity and synchronization lifecycle | [2024-06-28](https://notes.typo3.org/s/GQwWxdUKO), [2025-01-31](https://notes.typo3.org/s/kEaZn6jJF), [2025-09-26](https://notes.typo3.org/s/1RnTSuBsq), [2025-11-28](https://notes.typo3.org/s/Sxl-kkYjW), [2026-06-11](https://notes.typo3.org/s/1-J3KsT7VU) |
| Current field-synchronization modes and possible consolidation | [2024-04-12](https://notes.typo3.org/s/gjl-sog92), [2024-04-26](https://notes.typo3.org/s/D32XRXoCk), [2024-10-18](https://notes.typo3.org/s/8vI0MnUbs), [2025-08-22](https://notes.typo3.org/s/gL97CaQ5M), [2026-05-08](https://notes.typo3.org/s/-0p3kqzMll) |
| `l10n_state` consistency and historical copy damage | [2024-04-26](https://notes.typo3.org/s/D32XRXoCk), [2026-02-06](https://notes.typo3.org/s/D8oadqoN-7#) |
| Mostly connected structures and local exceptions | [2024-03-22](https://notes.typo3.org/s/kqdwFxW1m), [2026-05-08](https://notes.typo3.org/s/-0p3kqzMll), [2026-06-26](https://notes.typo3.org/s/-RP1PwIafA), [2026-07-10](https://notes.typo3.org/s/ccbVIOYfEy) |
| Complete layers, shadows and shared structure | [2025-07-18](https://notes.typo3.org/s/L0lQKrWaW), [2025-10-24](https://notes.typo3.org/s/2Ysd3gDdn), [2026-05-29](https://notes.typo3.org/s/0AJqa7JwuJ), [2026-07-10](https://notes.typo3.org/s/ccbVIOYfEy) |
| Editing Language | [2026-05-08](https://notes.typo3.org/s/-0p3kqzMll), [2026-05-29](https://notes.typo3.org/s/0AJqa7JwuJ) |
| Output policy, strict behavior and intentional absence | [2023-12-15](https://notes.typo3.org/s/ddSKDuz1Q), [2026-06-11](https://notes.typo3.org/s/1-J3KsT7VU), [2026-07-10](https://notes.typo3.org/s/ccbVIOYfEy), [2026-07-31](https://notes.typo3.org/s/z5ICno5pK2) |
| Latest work and governance boundary | [2026-07-24](https://notes.typo3.org/s/Sn7GKjSk_3), [2026-07-31](https://notes.typo3.org/s/z5ICno5pK2) |

Future updates must follow the [Current State maintenance instructions](https://github.com/t3thi/Documentation/blob/main/MeetingMinutes/current-state-maintenance.md). The key rule is:

> **Update the current state, not the history.**
