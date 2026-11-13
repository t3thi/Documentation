# Reviewed meeting ingestion — 2026-11-13

The user authorized continuation after reviewing the Minutes and supplied the
[published note](https://notes.typo3.org/s/WWW9W-C8js). Its download matched
the local Minutes byte-for-byte (SHA-256
`c242b213e31d48067cd7405aae221e0347bf86710669cb07f8edcd94203c0c06`).
The overview now links the existing note. The registered transcript is
restricted local evidence; the Minutes are its reviewed projection, not a
second independent source. The preparation report was used as context, not
imported as a meeting outcome or copied into the repository.

## Semantic review

| Result | Knowledge | Review boundary |
|---|---|---|
| Refined | K-000013 | Keep single-language Strict as a requirement. Eric's willingness to retain existing missing-translation fallback in 14.3 is a compatibility position, not a backport decision. |
| Refined | K-000014 | Martin requested an Important changelog and suggested configured Workspaces as a workaround; no general workflow or visibility rule was chosen. |
| Refined | K-000028 | PS3 is an independently verified patch update, not a meeting conclusion. Cross-page refresh of all repeated occurrences remains unverified. |
| Created | K-000041 | The group preferred the unmerged `languageMode` proposal to the `connected` alternative. Confirm migration, floating records and whether language `0` is positional or terminal in the relevant paths. |
| Created | K-000042 | A lossless DataHandler guard across moves and direct edits is a recommendation. Diagnosis and repair of existing orphans remain separate. |
| Created | K-000043 | Effective target-language validation for storage folders and `pid=0` remains a question. No exemption or maintenance-release behavior is approved. |

See the [semantic changes](../../Changes/2026/2026-11-13.md). No
confirmation, contradiction, supersession, rejection, resolution,
implementation or new Decision Record was warranted. The Unit outreach
did not establish a roadmap commitment. The unreached agenda items add no
meeting conclusions. The existing prototype approach and its review state
remain unchanged.

## Focused external check

Official Gerrit status, patch sets, votes and mergeability were checked on
2026-11-13 for the ten agenda changes plus 93028. Important changes since
October: 94510 retains PS11 and remains action-required despite André's
positive review, because Martin's new thread is unresolved. 95475 advances
to mergeable PS3 but stays WIP. 93063 advances to mergeable PS9 with
Code-Review `-1`; 93752 advances to PS6 with Code-Review `-1` and a
merge conflict. 92777 and 93819 have negative reviews. 95042 and 95043
remain WIP with conflicts. 93028 was abandoned citing merged 87595.
97535 and 97455 are newly tracked open proposals. Forge 110008, 111386
and 108358 were Under Review.

Static inspection of 94510 PS11 and 97535 PS1 distinguishes the live
hidden-only candidate-query change in the former from the latter's
broader visibility check in the ordinary record-overlay path. This did
not run a new Core runtime test or resolve the ordering of `0` across
page selection, record overlays and Extbase. The external full-audit
cutoff remains 2026-10-30; reviewed meeting coverage advances to 2026-11-13.

## Views and checks

Updated English/German Output Policy, Current Core Work, Critical
Alignment and Evidence and Maintenance. The generated Current State
sizes are 87,387 English and 98,635 German characters, below the
100,000-character limit.

- Reviewed-meeting handoff, schema validation (43 objects, 3 decisions,
  15 change sets, 22 topics), backlinks and both deterministic build checks passed.
- 51 Knowledge tests, 16 publisher tests and the Minutes contract passed.
  The publisher suite reported Python 3.15 SQLite resource warnings, not test failures.
- Offline publication check returned the verified existing URL.
  `git diff --check` passed. No remote write, stage, commit or push.
- Lint reports eleven advisory German translation reviews; none was marked
  human-reviewed by this change.

Review this report and the complete Git diff before accepting the proposed
semantic changes and the updated German projections.
