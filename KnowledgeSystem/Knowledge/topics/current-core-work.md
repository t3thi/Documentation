---
id: topic:current-core-work
title: "Current Core Work"
language: en
updated: "2026-08-21"
knowledge:
  - K-000013
  - K-000015
  - K-000016
  - K-000022
  - K-000023
  - K-000027
  - K-000028
history:
  - K-000026
decisions: []
---

# Current Core Work

## Current synthesis

## What has been achieved

The initiative and related Core work have already delivered bounded improvements. These results make today's system safer or easier to understand; they do not implement the complete vision.

`main` is a moving development branch, not a stable TYPO3 version label. This document therefore pairs it with the major development line it represented at the stated time. For merged changes, that is the line represented by `main` when the change was merged. For open changes, `main` represented the TYPO3 v15 development line when external status was checked on 2026-08-21. Fixed maintenance branches such as `14.3` and `13.4` are named directly.

| Result | Delivered release lines | Immediate improvement | Responsibility or learning |
|---|---|---|---|
| [Gerrit 83632](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83632), merged 2024-04-26 | TYPO3 v13 (`main` at merge time); no additional release line is named. | Created valid source data for DataHandler localization tests. | Reliable fixtures are a prerequisite for behavioral change. |
| [Gerrit 84237](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84237), merged 2024-05-25 | TYPO3 v13 (`main` at merge time); no additional release line is named. | Prevented orphaned translated records in a copy process. | Structural and language validity must be preserved during copy. |
| [Gerrit 83310](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83310), [86085](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86085) and [85912](https://review.typo3.org/c/Packages/TYPO3.CMS/+/85912), merged between 2024-05-13 and 2025-01-07 | 83310 and 86085: TYPO3 v13 (`main` at merge time). 85912: TYPO3 v14 (`main` at merge time), plus TYPO3 v13 LTS (`13.4`) as merged [Gerrit 87655](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87655). | Added focused tests for copying localized content to an untranslated page, copying inline children and moving `-1` content. | Characterization records current constraints before behavior is changed. |
| [Gerrit 86773](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86773) and [88827](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88827), merged 2025-01-10 and 2025-05-05 | TYPO3 v14 (`main` at merge time), plus TYPO3 v13 LTS (`13.4`) as merged [87689](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87689) and [89297](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89297). | Synchronized the language of inline children during copy and preserved the language of translations during copy. | Copy operations must retain language intent for children and translated records. |
| [Gerrit 89199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89199), merged 2025-04-30 | TYPO3 v14 (`main` at merge time), plus TYPO3 v13 LTS (`13.4`) as merged [Gerrit 89286](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89286). | Keeps the selected language while navigating within one site, shows Default-Language content when no translation exists and resets the selection when another site does not provide that language. | Prevents an invalid language selection from producing an empty Layout module while preserving the editor's useful context where possible. |
| [Gerrit 92580](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92580), merged 2026-02-09 | TYPO3 v14 (`main` at merge time), plus TYPO3 v13 LTS (`13.4`) as merged [Gerrit 92757](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92757). | Restricts copied record translations to languages available in the target site. | A bounded integrity fix for current site-local language handling. |
| [Gerrit 92881](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92881), merged 2026-02-20 | TYPO3 v14 (`main` at merge time); no additional release line is named. | Separates `localizeRecord()` from `copyRecord()` in DataHandler. | Clearer code paths support safer characterization and later change. |
| [Gerrit 88837](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88837), merged 2026-04-11 | TYPO3 v14 (`main` at merge time); no additional release line is named. | Avoids remapping non-language-aware IRRE children and uses separately assigned records for localized parents. | A concrete case where explicit synchronized data resolved ownership ambiguity. |
| [Gerrit 94831](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94831), merged 2026-07-21 | TYPO3 v15 (`main` at merge time), [TYPO3 v14 LTS (`14.3`) as Gerrit 94866](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94866) and [TYPO3 v13 LTS (`13.4`) as Gerrit 94867](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94867) merged. | Resolves translated Mount Point subpages through the default-language relation and prevents a `404`. | A real shared-storage project produced a small, test-backed fix. |
| [Gerrit 94914](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94914), merged 2026-08-01 | TYPO3 v15 (`main` at merge time), [TYPO3 v14 LTS (`14.3`) as Gerrit 94916](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94916) and [TYPO3 v13 LTS (`13.4`) as Gerrit 94915](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94915) merged. | Finds existing translations through `l10n_parent` when `l10n_source` is empty. | Preserves the distinction between structural parent and translation source while preventing duplicates. |
| [Gerrit 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170), merged 2026-08-10 | TYPO3 v15 (`main` at merge time) and [TYPO3 v14 LTS (`14.3`) as Gerrit 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199) merged. | Corrects comparison views that combine Connected- and Free-Mode languages: connected items form comparison rows while each Free-Mode language renders independently, including when the Default Language has no items. | A bounded interim correction for the current modes. It does not select the future editing or structural model. |
| [Gerrit 95178](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95178), merged 2026-08-10 | TYPO3 v15 (`main` at merge time) and [TYPO3 v14 LTS (`14.3`) as Gerrit 95202](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95202) merged. | Keeps the language title, flag and translation mode visible while scrolling a long comparison view in the Layout module. | Improves editor orientation in the current interface. The patch is explicitly interim and neither changes nor selects a future structural model. |

The [initiative test extension](https://github.com/t3thi/translation-handling) also provides reproducible translation, fallback and relation scenarios. It was revived and extended with focused IRRE cases in 2025. It is research infrastructure, not evidence of changed Core behavior.

The repeated pattern is useful: a real failure is reproduced, the responsible contract is identified, tests define the boundary and the fix remains narrow. This is the initiative's preferred form of incremental improvement.

## Current work as of 2026-08-21

Each open Core patch has one primary status entry according to its current official state. **WIP** takes precedence over review findings. **Review action required** means that the current patch set has at least one unresolved comment, a current negative review or verification, or a merge conflict. **Review-positive and mergeable** is the final patch category used here; it requires at least one current Code-Review `+1`, no current negative vote, no unresolved comment and a mergeable current revision. **Awaiting review** covers open patches without those blockers but without a current positive Code-Review. **Rejected or superseded** records changes that are formally abandoned when the reason remains relevant.

For open Gerrit changes, **Merge conflict: Yes** means that Gerrit reported the current revision as `mergeable: false` against its target branch on 2026-08-21. This can change when the target branch or patch set changes. **No** means `mergeable: true`; it does not replace review or submit approval. The release-line column lists actual Gerrit changes separately from additional branches named only in a commit's `Releases:` footer. A named branch without its own Gerrit change is not a pending or merged backport.

### Work in progress (WIP)

| Patch | Target release lines and backports | Current review state | Merge conflict | Scope and boundary |
|---|---|---|---|---|
| [Gerrit 84338](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84338) | TYPO3 v15 (current `main`); no additional release line is named. | Patch set 6; WIP; CI `+1`; 4 unresolved comments. | **Yes** | Proposes using the first Site Language ID as the Default Language instead of enforcing `0`. Broad Core-wide assumptions remain unresolved, and the initiative later moved its immediate priority away from this route. |
| [Gerrit 92267](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92267) | TYPO3 v15 (current `main`); no additional release line is named. | Patch set 6; WIP; CI `+1`; no unresolved comments. | No | Inventories persisted `Language All` assumptions. It changes no executable behavior and is not a characterization-test suite or replacement implementation. |
| [Gerrit 92859](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92859) | TYPO3 v15 (current `main`); no additional release line is named. | Patch set 6; WIP; CI `-1`; 6 unresolved comments. | **Yes** | Proposes language- and Workspace-aware MM tables. Its uniform relation model is relevant, but the use of live Default-Language UIDs is an incremental design, not a decision for future Structural Identity. |
| [Gerrit 93289](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93289) | TYPO3 v15 (current `main`); no additional release line is named. | Patch set 1; WIP; CI `+1`; no unresolved comments. | No | Adds Workspace coverage for Language-All paste behavior and fills a characterization gap before semantic changes. |
| [Gerrit 93819](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93819) | TYPO3 v15 (current `main`); TYPO3 v14 LTS (`14.3`) is named, but no backport change exists yet. | Patch set 2; `[WIP]`; CI `+1`; no unresolved comments. | **Yes** | Adds move guards for Free-Mode content while current Free Mode remains supported. |
| [Forge 110328](https://forge.typo3.org/issues/110328) and [Gerrit 95042](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95042) | TYPO3 v15 (current `main`); no additional release line is named. | Patch set 1; `[WIP]`; CI `+1`; no unresolved comments. | No | Restricts selectable translation parents to prevent duplicate or structurally invalid assignments. The patch is not an implemented fix. |
| [Forge 110330](https://forge.typo3.org/issues/110330) and [Gerrit 95043](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95043) | TYPO3 v15 (current `main`); no additional release line is named. | Patch set 1; `[WIP]`; CI `+1`; no unresolved comments. | No | Hides Connected Mode when the source cannot establish a Default-Language relation. A Free-Mode source cannot create the missing connection. |

### Review action required

| Patch | Target release lines and backports | Current review state | Merge conflict | Scope and boundary |
|---|---|---|---|---|
| [Gerrit 87595](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87595) | TYPO3 v15 (current `main`); TYPO3 v14 LTS (`14.3`) is named, but no backport change exists yet. | Patch set 11; CI `-1`; 3 unresolved comments. | **Yes** | Changes the language of existing inline child records with their parent. Reviews still require broader relation coverage, tests and migration consideration. |
| [Gerrit 92777](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92777) | TYPO3 v15 (current `main`); TYPO3 v14 LTS (`14.3`) is named, but no backport change exists yet. | Patch set 10; two Code-Review `+1`; CI `+1`; 1 unresolved comment. | No | Restricts copied Free-Mode records to languages available in the target context. This improves current-model integrity without selecting a future structure model. |
| [Gerrit 93063](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93063) | TYPO3 v15 (current `main`); TYPO3 v14 LTS (`14.3`) is named, but no backport change exists yet. | Patch set 7; Code-Review `+1`; CI `+1`; no unresolved comments. | **Yes** | Warns about invalid translation parents. The patch is review-positive but must be made mergeable against the current TYPO3 v15 `main`; it makes structural corruption visible but does not repair or redesign identity. |
| [Forge 110008](https://forge.typo3.org/issues/110008) and [Gerrit 94510](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94510) | TYPO3 v15 (current `main`); TYPO3 v14 LTS (`14.3`) and TYPO3 v13 LTS (`13.4`) are named, but no backport changes exist yet. | Patch set 8; CI `+1`; 1 unresolved comment. | No | Addresses a regression after merged [Gerrit 88828](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88828), in which `strict` output can fall back from a hidden requested-language record to another language. Current behavior is unchanged while the fix remains unmerged. |
| [Gerrit 94917](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94917) | TYPO3 v15 (current `main`); no backport branch is named and no backport change exists. | Patch set 4; no current Code-Review vote; 1 unresolved comment. | **Yes** | Improves Free/Mixed comparison rendering. Replacement by the merged [TYPO3 v15 change 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170) and [TYPO3 v14 LTS backport 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199) has been proposed in review, but 94917 is still officially open rather than abandoned. |
| [Gerrit 93752](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93752) | TYPO3 v15 (current `main`); TYPO3 v14 LTS (`14.3`) is named, but no backport change exists yet. | Patch set 3; CI `+1`; no current Code-Review vote or unresolved comment. | **Yes** | Adds copy guards for Free-Mode content. The current revision must first be made mergeable against the current TYPO3 v15 `main`. |

### Review-positive and mergeable

No current patch meets all criteria. Gerrit 92777 has positive reviews but an unresolved comment; Gerrit 93063 has a positive review and no unresolved comment but a merge conflict. Both therefore remain under **Review action required**.

### Awaiting review

| Patch | Target release lines and backports | Current review state | Merge conflict | Scope and boundary |
|---|---|---|---|---|
| [Gerrit 93028](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93028) | TYPO3 v15 (current `main`); TYPO3 v14 LTS (`14.3`) is named, but no backport change exists yet. | Patch set 6; CI `+1`; no current Code-Review vote or unresolved comment. | No | Applies the requested parent language to newly created relation children while leaving already localized children unchanged. |
| [Gerrit 95038](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95038) | TYPO3 v15 (current `main`); no additional release line is named. | Patch set 2; CI `+1`; no current Code-Review vote or unresolved comment. | No | Keeps `pages.doktype` aligned with the Default-Language page through `l10n_mode=exclude` and provides an Upgrade Wizard for existing divergent translations. This enforces a current-model invariant rather than selecting a future structural model. |

### Rejected or superseded

| Patch | Target release lines and backports | Official state | Merge conflict | Reason |
|---|---|---|---|---|
| [Gerrit 92585](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92585) | TYPO3 v15 (`main` at abandonment); TYPO3 v14 LTS (`14.3`) was named, but no backport change exists. | Abandoned on 2026-08-07. | Not applicable | Its narrow Free-Mode rendering fix was further developed in the merged [TYPO3 v15 change 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170) and [TYPO3 v14 LTS backport 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199). |

### Supporting patches and non-patch research

| Work | Current state | Merge conflict | Meaning |
|---|---|---|---|
| [dbdoctor PR 98](https://github.com/lolli42/dbdoctor/pull/98) | Open; GitHub reports the current head as not mergeable and `dirty`. | **Yes** | Repairs `l10n_state` when synchronized metadata disagrees with stored translated values. It is not merged Core behavior. |
| [dbdoctor PR 171](https://github.com/lolli42/dbdoctor/pull/171) | Open `[WIP]`; GitHub reports the current head as clean and mergeable. | No | Detects orphaned translations left by historical copy operations. It is diagnostic and repair tooling, not a merged Core fix or a new translation model. |
| Language-All visibility in every backend language | Proposed in the reviewed meeting on 2026-08-14; no Gerrit change is registered. | Not applicable | Would show each existing `sys_language_uid = -1` record in every language column at its effective sorting position. This is bounded preparatory usability work that retains current Language-All semantics and does not select a future structure model. |
| Structural-layer and Editing-Language exploration | Product framing exists; no completed prototype is evidenced. | Not applicable | A sketch, click dummy or extension experiment would test editor value and structural assumptions before an architecture decision. |
