---
id: D-000001
status: accepted
title: Use a Git-native layered knowledge architecture
date: 2026-08-11
scope: initiative-documentation
authority: translation-handling-initiative
evidence:
  - source: policy:knowledge-system
    location: "Repository knowledge-system policy"
    relation: establishes
  - source: policy:knowledge-handbook
    location: "Canonical architecture and operating model"
    relation: implements
---

# Use a Git-native layered knowledge architecture

## Context

The initiative must preserve retained meeting evidence, reviewed meeting
results, current durable knowledge, explicit decisions, unresolved questions,
semantic evolution and coherent publication views without making an LLM or an
external service the canonical store. The previous Current State and meeting
minutes remain valuable prose and history, but they do not by themselves expose
stable semantic identity, typed relationships or explicit change operations.

The governing principle is:

> LLMs interpret and propose. Git stores and versions. Schemas validate
> structure. Humans authorize material semantic changes. Deterministic tooling
> builds publication views.

## Decision

The TYPO3 Translation Handling Initiative uses a Git-native architecture with
these separate layers:

1. raw transcript evidence as the primary retained meeting source;
2. reviewed Meeting Minutes produced with the repository-local
   `t3thi-meeting-minutes` skill as a derived meeting projection;
3. Semantic Change Logs for durable transitions;
4. canonical Knowledge Objects and separate Decision Records;
5. reviewed editorial Topic Syntheses; and
6. deterministic Current State and other publication views.

The Current State is a materialized publication view rather than the primary
semantic edit location. A transcript and its derived minutes form one evidence
chain, not two independent confirmations. Material semantic changes remain
human-reviewable through Git diffs.

## Alternatives considered

### Manual Current State and Meeting Minutes only

This preserves good narrative prose with little machinery, but durable
propositions, decision authority, provenance and superseded reasoning remain
implicit and difficult to validate.

### Fully LLM-generated wiki

This could synthesize prose quickly, but would make nondeterministic generation
and a model-dependent workflow responsible for canonical state. Reviewable
semantic identity and reproducibility would be weak.

### Structured-data-only architecture

Strictly atomic data would be easy to query and validate, but would discard the
coherent editorial reasoning needed by contributors. Topic Syntheses therefore
remain a reviewed prose layer.

### Database, graph or RAG system as canonical store

These systems could provide useful derived access later, but would add an
external canonical dependency and make the complete knowledge state harder to
reconstruct from Git alone.

## Consequences

- Historical transcripts and Meeting Minutes remain evidence and are not
  rewritten merely to simplify the new model.
- Meeting generation and reviewed-meeting knowledge ingestion remain distinct
  stages with a mandatory human review gate.
- Accepted decisions remain separate from findings, preferences, approaches and
  recommendations.
- Rejected and superseded knowledge stays addressable.
- Schemas and deterministic tools can validate and publish structure, while
  semantic interpretation and destructive changes still require human review.
- Current State and generated registers must be rebuilt from canonical sources
  and must not be edited directly.
- Search, embeddings, RAG, graph visualization or MCP access may be added only
  as derived layers; none becomes canonical.
