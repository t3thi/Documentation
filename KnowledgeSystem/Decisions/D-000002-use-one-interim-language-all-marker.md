---
id: D-000002
status: proposed
title: Use one interim marker for current Language-All contexts
date: 2026-09-25
updated: 2026-10-10
scope: core-patch-95619
authority: translation-handling-initiative
evidence:
  - source: transcript:2026-09-25
    location: "17:02-29:28, agreement on marker scope and documentation boundary"
    relation: establishes
    summarized_in: minutes:2026-09-25#topic-2-scope-and-semantics-of-the-language-all-marker
  - source: transcript:2026-09-25
    location: "58:32-58:48, agreed Gerrit update about the semantic distinction"
    relation: confirms
    summarized_in: minutes:2026-09-25#topic-3-patch-coverage-and-human-review-method
  - source: transcript:2026-10-02
    location: "16:51-23:47 and 38:31-42:14, include genuine TCA and SlugHelper occurrences"
    relation: refines
    summarized_in: minutes:2026-10-02#topic-3-tca-and-slughelper-coverage
  - source: transcript:2026-10-02
    location: "23:47-38:24, keep LinkValidator behavior and query representation"
    relation: refines
    summarized_in: minutes:2026-10-02#topic-4-linkvalidator-fallback-semantics
  - source: transcript:2026-10-02
    location: "42:14-56:39, documentation, PHP backport and TypeScript boundaries"
    relation: refines
    summarized_in: minutes:2026-10-02#topic-6-typescript-drag-and-drop-boundary
relations:
  - type: refines
    target: K-000029
knowledge:
  - K-000029
external_artifacts:
  - id: gerrit:95619
    relation: implements
    state: merged
    verified_at: 2026-10-10
---

# Use one interim marker for current Language-All contexts

## Context

The literal `-1` currently represents several contracts: a language value
persisted on a record, a synthetic backend selection or display state, and in
some paths a fallback with another meaning. Gerrit 95619 introduces
`LanguageMarker::ALL_LANGUAGES` to make relevant occurrences discoverable and
self-describing. When this decision was proposed, the patch description
primarily explained the persisted record case. The merged change now covers
stored and synthetic uses; its delivered scope is recorded in `K-000032`.

## Decision

For the bounded scope of Gerrit 95619, use the same named marker wherever the
reviewed occurrence uses `-1` to mean All Languages, whether the value is read
from a record or synthesized by current Core code. Do not introduce separate
constants for those contexts in this patch. Describe the marker broadly
enough that its documentation does not imply exclusive use in database
language fields.

This is an interim implementation decision for the marker patch. It does not
declare the underlying persisted, synthetic and fallback contracts
semantically equivalent and does not decide their eventual replacement.

The 2026-10-02 review includes genuine Language-All occurrences in
`TcaColumnsRemoveEmptyRelations`, `TcaEnrichment`, `TcaPreparation` and
`SlugHelper`. It retains the existing `LinkAnalyzer` fallback and
`EditableRestriction` query representation. The patch description must
therefore remove its blanket TCA exclusion as well as its record-field-only
framing.

For Layout drag-and-drop TypeScript, retain the literal and add a comment
linking it to the PHP marker. Cross-language value transport, a shared
JavaScript constant or an `isAllLanguage` property are follow-up options, not
part of this patch. Keep the typed PHP constant for TYPO3 v15; a TYPO3 14.3
backport must adapt to its PHP 8.2 baseline. Do not add a backport-only code
comment. No general rule for inverse or context-only annotations was decided.

## Alternatives considered

### Separate constants immediately

This would expose the semantic distinction in code now, but would expand the
patch before the complete inventory and replacement contracts are settled.

### Restrict the marker to persisted record language fields

This would align with the current patch description but leave synthetic
Language-All literals unnamed and harder to locate.

### Add a Default Language marker in the same patch

Naming `0` is useful in principle, but reviewing its wider set of meanings
would broaden the current Language-All patch substantially. It can be assessed
in a separate follow-up.

## Consequences

- Every included occurrence still requires human confirmation that `-1`
  actually means All Languages.
- The patch description and marker documentation must cover both persisted and
  synthetic current uses.
- A later change may split the marker or replace synthetic selections with
  explicit concrete language sets.
- The decision changes naming and discoverability only; it does not change
  TYPO3 behavior or adopt a final Language-All replacement contract.
- Accepting the LinkValidator occurrence for naming does not close the
  separate language-field coverage question recorded in `K-000029`.
