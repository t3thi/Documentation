---
id: topic:critical-alignment
title: "Critical Alignment and Open Decisions"
language: en
updated: "2026-08-21"
knowledge:
  - K-000001
  - K-000003
  - K-000007
  - K-000009
  - K-000010
  - K-000011
  - K-000012
  - K-000013
  - K-000014
  - K-000016
  - K-000017
  - K-000018
  - K-000019
  - K-000020
  - K-000021
  - K-000027
history: []
decisions: []
---

# Critical Alignment and Open Decisions

## Current synthesis

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
