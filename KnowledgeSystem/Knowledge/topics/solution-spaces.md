---
id: topic:solution-spaces
title: "Possible Solution Spaces"
language: en
updated: "2026-08-11"
knowledge:
  - K-000003
  - K-000005
  - K-000007
  - K-000009
  - K-000011
  - K-000012
  - K-000014
  - K-000016
  - K-000018
history: []
decisions: []
---

# Possible Solution Spaces

## Current synthesis

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
