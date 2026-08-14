---
title: "Translation Handling Initiative - About"
---

# Translation Handling Initiative

## Initiative Summary

The TYPO3 Translation Handling Initiative works to make the handling of multilingual, editor-maintained content in TYPO3 simpler, more consistent and more reliable for editors, integrators, developers and other affected user groups.

Our work combines research into real-world use cases and current Core behavior, development of a coherent long-term vision, focused improvements to today's system and critical evaluation of proposed changes. The initiative can identify problems, derive requirements, investigate Core behavior, build prototypes, implement fixes and formulate recommendations. Broader product, architecture and migration decisions require alignment with the TYPO3 Core Team and other relevant stakeholders.

## Background

The initiative originated from the "Translation Handling rethought" session at TYPO3 Camp Mitteldeutschland 2022. This was followed by a workshop and presentation at TYPO3 Developer Days 2022, where community feedback on translation handling was collected, evaluated and weighted.

Further discussions and feedback gathering took place at TYPO3 Camps RheinRuhr, Mitteldeutschland, Berlin-Brandenburg, Hamburg and Munich, at subsequent Developer Days, in user groups and through direct exchange with TYPO3 users and developers. Since then, the initiative has continuously investigated concrete project and editorial use cases, characterized existing Core behavior and contributed focused tests and improvements.

## Goals

- Research real-world multilingual content-management requirements and existing TYPO3 Core behavior.
- Develop and maintain a coherent long-term vision based on established findings and derived requirements.
- Improve existing translation handling through focused, test-backed changes where they solve concrete problems and remain compatible with the wider direction.
- Evaluate initiative work and parallel Core proposals against the same requirements, trade-offs and compatibility constraints.
- Maintain continuous communication and cooperation with the TYPO3 community, Core Team and other relevant stakeholders.
- Preserve both the current state of knowledge and the reasoning that led to it.

## Conceptual Direction

The initiative currently separates translation handling into four responsibilities that should be reasoned about independently before implementation details are selected:

1. **Language Identity**: Which human language and variant does content represent?
2. **Synchronization Intent**: Which fields or records should stay aligned, and where may they differ?
3. **Structural Identity**: Which records represent the same logical content position across languages?
4. **Output Policy**: What should render when the requested language variant is unavailable?

The long-term objective is a translation model in which editorial intent is explicit and technical implementation details are kept out of normal editorial workflows wherever possible. Preferred directions documented by the initiative are inputs for evidence-based design, prototyping and decision support, not automatically adopted TYPO3 Core decisions.

## Scope

The initiative focuses on multilingual handling of editor-maintained TYPO3 database records, including pages, content elements, file metadata and extension records. This includes semantic language identity, synchronization, structural relationships between language variants, multilingual editorial workflows, frontend selection and fallback behavior, and related data integrity, migration and compatibility concerns.

The translation of static TYPO3 backend and frontend labels stored in XLIFF files, Crowdin projects and TYPO3 Language Pack infrastructure is maintained by the TYPO3 Localization Team and is outside the initiative's primary responsibility.

## Timing

The initiative is an ongoing workstream rather than a version-bound project with a fixed end date. Work is intentionally incremental and larger changes depend on technical validation, migration and compatibility analysis, and alignment with the TYPO3 Core Team and other affected stakeholders.

## Milestones

Progress is measured through concrete research findings, characterized Core behavior, merged tests and fixes, validated prototypes, documented recommendations and decisions reached with the relevant TYPO3 stakeholders.

## Current Status

The authoritative and continuously maintained description of established findings, current directions, implemented Core work, open questions and decision boundaries is the [Translation Handling Initiative: Current State](https://notes.typo3.org/s/RhkYPguwb).

The chronological development of discussions, findings and decisions is documented in the [weekly team meeting minutes](https://notes.typo3.org/s/f3ae8fZSD).

## Team & Lead

- Eric Harrer (Team Lead, Communication)
- Andre Buchmann (Conception, Developer)
- Martin Clewing (Integrator, Multilingual Project Experience)

## Get involved

Directly contact Eric Harrer

- Tel.: +49 9174 9776702
- Mobile: +49 173 9046448
- Mail: info@eric-harrer.de
- Slack: https://typo3.slack.com/team/U019CPYC0AX

Team Slack channel:
https://typo3.slack.com/archives/C05D7UF1L8M

## References / Further Reading

- [German presentation, TYPO3camp Munich](https://notes.typo3.org/Hdfo68uMTu-YiL8iSwSsLA)
- [Translation Handling Kick-Off](https://coders.care/blog/article/translation-handling-kick-off)
