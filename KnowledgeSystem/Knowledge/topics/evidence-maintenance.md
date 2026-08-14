---
id: topic:evidence-maintenance
title: "Next Steps, Evidence and Maintenance"
language: en
updated: "2026-08-11"
knowledge:
  - K-000005
  - K-000006
  - K-000007
  - K-000008
  - K-000009
  - K-000011
  - K-000012
  - K-000013
  - K-000014
  - K-000016
  - K-000017
  - K-000018
  - K-000019
  - K-000021
  - K-000022
  - K-000027
history: []
decisions:
  - D-000001
---

# Next Steps, Evidence and Maintenance

## Current synthesis

## Next meaningful steps

These are the initiative's current best sequence of activities, not a committed TYPO3 release roadmap.

1. **Keep the evidence base current.** Add reproducible editor and project use cases, especially where language, country, structure and output intent differ.
2. **Complete focused characterization.** Review the `-1` inventory, map each valid behavior to a test and close known Workspace and DataHandler gaps.
3. **Finish bounded fixes.** Formally resolve the still-open overlapping Free/Mixed change 94917 now that its replacement is merged for TYPO3 v15 (`main`) and TYPO3 v14 LTS (`14.3`), progress copy/move integrity patches, validate the parent-selector and wizard drafts and resolve the failing strict-fallback regression patch.
4. **Prototype product behavior before storage.** Test Editing Language, a mode-free Layout workflow, direct target-language creation, local structural additions and explicit absence with realistic editor workflows.
5. **Validate the current structural preference against its countermodel.** Use the same acceptance cases for the shared hidden structure, complete per-language shadows, sparse records and any hybrid. Measure record growth, Layout density, Workspaces, references, migration and operational costs rather than assuming them.
6. **Define and characterize first-stage parity.** Specify the all-target record flag, target creation, the full enforced field set, source and target identity, conflicts and every transition. Prove that it reproduces current `-1` output, then evaluate the separately decidable multi-select and other granular extensions against the same process.
7. **Agree the semantic identity contract.** Decide what BCP 47 identifies, how Site Languages map to it and how legacy values migrate.
8. **Design compatibility before removal.** Introduce explicit alternatives first, provide migration and extension guidance, then consider deprecation of old semantics.
9. **Bring evidence to the required decision makers.** The initiative should make trade-offs and consequences concrete so Core, product and architecture decisions can be made on a shared factual basis.

## Evidence basis and maintenance

This reconstruction includes all repository meeting minutes through 2026-07-31 and all available transcripts through 2026-07-31. A supplied initiative-channel snapshot was reviewed as a supplemental source for durable use cases, implementation references and unminuted gaps; it does not advance the minute or transcript cutoffs. Current Gerrit, Forge and linked supporting-patch states in the achievement and work sections were checked on 2026-08-11. The [T3DD26 presentation](https://content.eric-harrer.de/t3dd26/) presents the conceptual model used in this reconstruction.

Key primary evidence anchors are:

| Topic | Meeting evidence |
|---|---|
| Community feedback and editor-facing mode simplification | [T3DD22 and subsequent feedback matrix](https://docs.google.com/spreadsheets/d/1Y8KnuYxMoXyVaZzVHENBp_1fg2M-JGxHog6K3T9qn_Q/edit?gid=0#gid=0), [2024-03-22](https://notes.typo3.org/s/kqdwFxW1m), [2025-07-11](https://notes.typo3.org/s/k11hyaA4N), [2025-10-24](https://notes.typo3.org/s/2Ysd3gDdn) |
| Language identity and BCP 47 | [2024-01-19](https://notes.typo3.org/s/sEONb4kd6), [2025-07-25](https://notes.typo3.org/s/dtw4v9T7S), [2026-07-31](https://notes.typo3.org/s/z5ICno5pK2) |
| `-1` replacement, full-record parity and synchronization lifecycle | [2024-06-28](https://notes.typo3.org/s/GQwWxdUKO), [2025-01-31](https://notes.typo3.org/s/kEaZn6jJF), [2025-09-26](https://notes.typo3.org/s/1RnTSuBsq), [2025-11-28](https://notes.typo3.org/s/Sxl-kkYjW), [2026-06-11](https://notes.typo3.org/s/1-J3KsT7VU) |
| Current field-synchronization modes and possible consolidation | [2024-04-12](https://notes.typo3.org/s/gjl-sog92), [2024-04-26](https://notes.typo3.org/s/D32XRXoCk), [2024-10-18](https://notes.typo3.org/s/8vI0MnUbs), [2025-08-22](https://notes.typo3.org/s/gL97CaQ5M), [2026-05-08](https://notes.typo3.org/s/-0p3kqzMll) |
| `l10n_state` consistency and historical copy damage | [2024-04-26](https://notes.typo3.org/s/D32XRXoCk), [2026-02-06](https://notes.typo3.org/s/D8oadqoN-7#) |
| Mostly connected structures and local exceptions | [2024-03-22](https://notes.typo3.org/s/kqdwFxW1m), [2026-05-08](https://notes.typo3.org/s/-0p3kqzMll), [2026-06-26](https://notes.typo3.org/s/-RP1PwIafA), [2026-07-10](https://notes.typo3.org/s/ccbVIOYfEy) |
| Complete layers, shadows and shared structure | [2025-07-18](https://notes.typo3.org/s/L0lQKrWaW), [2025-10-24](https://notes.typo3.org/s/2Ysd3gDdn), [2026-05-29](https://notes.typo3.org/s/0AJqa7JwuJ), [2026-07-10](https://notes.typo3.org/s/ccbVIOYfEy) |
| Editing Language | [2026-05-08](https://notes.typo3.org/s/-0p3kqzMll), [2026-05-29](https://notes.typo3.org/s/0AJqa7JwuJ) |
| Output policy, strict behavior and intentional absence | [2023-12-15](https://notes.typo3.org/s/ddSKDuz1Q), [2026-06-11](https://notes.typo3.org/s/1-J3KsT7VU), [2026-07-10](https://notes.typo3.org/s/ccbVIOYfEy), [2026-07-31](https://notes.typo3.org/s/z5ICno5pK2) |
| Latest work and governance boundary | [2026-07-24](https://notes.typo3.org/s/Sn7GKjSk_3), [2026-07-31](https://notes.typo3.org/s/z5ICno5pK2) |

Future updates must follow the [Current State maintenance instructions](https://github.com/t3thi/Documentation/blob/main/MeetingMinutes/current-state-maintenance.md). The key rule is:

> **Update the current state, not the history.**
