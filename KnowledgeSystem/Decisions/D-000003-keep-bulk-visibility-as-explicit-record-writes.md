---
id: D-000003
status: proposed
title: Keep prototype bulk visibility as explicit record writes
date: 2026-10-23
scope: structure-layer-prototype-visibility
authority: translation-handling-initiative
evidence:
  - source: transcript:2026-10-23
    location: "51:44-57:56, mixed states, rejection of another field and context-menu agreement"
    relation: establishes
    summarized_in: minutes:2026-10-23#topic-5-all-language-visibility-actions-without-an-additional-field
relations:
  - type: refines
    target: K-000033
knowledge:
  - K-000033
  - K-000034
---

# Keep prototype bulk visibility as explicit record writes

## Context

The demonstrated all-language visibility action overwrites individual `hidden`
values. Repeating it does not restore a previously mixed set of states. An
additional overriding field could preserve those states, but would introduce
another enable-field contract into Core and extension queries.

## Decision

For the prototype's convenience action, retain explicit writes to the existing
visibility fields. Do not add a stored all-language override field. Move the
bulk operation into the context menu, leaving the familiar per-language
visibility control prominent, and remove the redundant all-languages-hidden
label. The operation should be deliberate rather than an accidental second
toggle.

## Alternatives considered

- A new overriding hidden-all field: explicitly declined for this scope because
  its query and compatibility cost is disproportionate to the convenience.
- A prominent second toggle and redundant label: move/remove them to reduce
  accidental bulk writes and duplicate state presentation.

## Consequences

Mixed per-language choices can still be overwritten; no reversible bulk-state
overlay is promised. This records an explicit meeting agreement for the
prototype, not adoption of `K-000033`'s complete output model or a Core API.
The canonical Decision Record remains proposed until separate semantic review.
