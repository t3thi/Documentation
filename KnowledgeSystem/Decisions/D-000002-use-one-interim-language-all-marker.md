---
id: D-000002
status: proposed
title: Use one interim marker for current Language-All contexts
date: 2026-09-25
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
relations:
  - type: refines
    target: K-000029
knowledge:
  - K-000029
external_artifacts:
  - id: gerrit:95619
    relation: implements
    state: open-wip
    verified_at: 2026-09-25
---

# Use one interim marker for current Language-All contexts

## Context

The literal `-1` currently represents several contracts: a language value
persisted on a record, a synthetic backend selection or display state, and in
some paths a fallback with another meaning. Gerrit 95619 introduces
`LanguageMarker::ALL_LANGUAGES` to make relevant occurrences discoverable and
self-describing, but its description primarily explains the persisted record
case.

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
