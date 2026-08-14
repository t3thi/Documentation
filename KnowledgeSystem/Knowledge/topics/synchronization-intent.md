---
id: topic:synchronization-intent
title: "Synchronization Intent"
language: en
updated: "2026-08-14"
knowledge:
  - K-000003
  - K-000004
  - K-000006
  - K-000007
  - K-000008
  - K-000015
  - K-000018
  - K-000023
history: []
decisions: []
---

# Synchronization Intent

## Current synthesis

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
