---
id: topic:scope-governance
title: "Scope and Governance"
language: en
updated: "2026-08-14"
knowledge:
  - K-000001
  - K-000005
  - K-000007
  - K-000008
  - K-000009
  - K-000011
  - K-000012
  - K-000017
  - K-000019
  - K-000021
  - K-000027
history: []
decisions:
  - D-000001
---

# Scope and Governance

## Current synthesis

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
