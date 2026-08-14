---
id: topic:current-core-behavior
title: "Current Core Behavior"
language: en
updated: "2026-08-11"
knowledge:
  - K-000002
  - K-000003
  - K-000004
  - K-000006
  - K-000009
  - K-000010
  - K-000014
  - K-000015
  - K-000021
  - K-000027
history: []
decisions: []
---

# Current Core Behavior

## Current synthesis

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
