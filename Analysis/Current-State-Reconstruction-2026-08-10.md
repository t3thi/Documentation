# Current State reconstruction audit, 2026-08-10

## Purpose

This audit records how the historical `MeetingMinutes/current-state.md` and `MeetingMinutes/todos.md` were replaced by the new canonical Current State and maintenance process. It is an implementation record, not initiative evidence and not an additional source of current product decisions.

## Source boundary

- All 121 Markdown sources and 13 transcripts covered by the T3DD26 source audits were used as the complete historical evidence base.
- The latest repository sources are the weekly minute and transcript dated 2026-07-31.
- The earlier Current State was a 2024 snapshot and the TODO file was an undated historical backlog committed in 2024.
- The T3DD26 research, Decision and Evidence Register, Architecture Options, Evolution Path, Core validation and final presentation content were used as derived cross-checks.
- Current Gerrit and Forge states relevant to Achievements and Current Work were revalidated on 2026-08-10.
- The current Core behavior links remain pinned to the immutable TYPO3 Core commit already validated for T3DD26 on 2026-08-08.

## Historical TODO disposition

| Historical TODO | Current disposition | Canonical location |
|---|---|---|
| Finalize the old page/record translation-standardization patch and adapt functional tests. | No current traceable patch state exists under that description. The valid intent survives as test-first consistency across record types, while later evidence retains necessary page/record differences. | Current contracts, Structural Identity and Next meaningful steps |
| Expose the distinction between `OVERLAYS_ON` and `OVERLAYS_ON_WITH_FLOATING`. | Superseded by the broader and newer Output Policy analysis: preserve strict semantics, keep fallback explicit and represent intentional absence. | Output Policy, Critical Alignment and Open decisions |
| Empty checkbox placeholder. | Contained no information and required no migration. | None |
| Prevent editors from creating Mixed Mode. | Refined rather than completed. Mixed Mode remains possible and valid local exceptions remain required. Current work improves Free/Mixed rendering and prevents impossible or misleading relations. | Structural Identity and Current Work |
| Remove `sys_language_uid = -1` and add an all-languages Boolean. | Still relevant, but the Boolean is only a possible initial synchronization model. Lifecycle, provenance, targets and migration remain open. | Synchronization Intent, Possible solution spaces and Open decisions |
| Replace integer language IDs with BCP 47 strings. | Still a current semantic direction. Exact storage, mapping, internal keys and migration are undecided. | Language Identity and Open decisions |
| Further elaborate the community survey. | The standalone survey task is obsolete. Continuing evidence collection from real editor and project use cases remains part of Research. | How the initiative works and Next meaningful steps |
| Review and understand Core functional translation tests. | Actively absorbed into characterization work around `-1`, DataHandler, Workspaces and bounded fixes. | Current Work and Next meaningful steps |

No still-relevant content remains dependent on the deleted TODO file.

## Historical Current-State disposition

- The two previously listed merged Core patches remain in Achievements.
- The old locale, language-menu, TCA-eval and deprecated-site-property queue was not retained as current initiative work because later sources do not support that status in this problem scope.
- Copy, move, fallback, synchronization and Free/Mixed-Mode topics were replaced by their newer verified findings and live patch states.
- The testing extension was updated from the old "on hold" statement to its later role as revived research infrastructure.
- The historical Free/Connected switch idea was replaced by the current requirement to reduce technical mode choices while preserving valid independent structures.

## Live status corrections incorporated

- Gerrit 92267 remains WIP and contains only inventory comments, not behavior changes or a completed test suite.
- Gerrit 94914, 94915 and 94916 were merged on 2026-08-01 and moved to Achievements.
- Gerrit 92585 was abandoned on 2026-08-07 and points to Gerrit 95170 as its successor.
- Gerrit 94917 remains open and received review activity on 2026-08-09.
- Gerrit 95170 remains open and was updated on 2026-08-10; it overlaps the Free/Mixed comparison problem addressed by 94917.
- Forge 110281 is resolved. Forge 110328, 110330, 110275, 109963 and 108809 remain under review.
- Gerrit 92580, 83632, 84237, 92881, 88837 and 94831 remain confirmed merged.

## Resulting canonical files

- `MeetingMinutes/current-state.md`: present knowledge, vision, work, achievements and decisions.
- `MeetingMinutes/current-state-maintenance.md`: executable update process and minimal source-cutoff metadata.
- `MeetingMinutes/todos.md`: removed after every still-relevant item was integrated contextually.
