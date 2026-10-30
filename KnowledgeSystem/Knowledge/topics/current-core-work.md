---
id: topic:current-core-work
title: "Current Core Work"
language: en
updated: "2026-10-30"
knowledge:
  - K-000013
  - K-000015
  - K-000016
  - K-000022
  - K-000023
  - K-000027
  - K-000028
  - K-000029
  - K-000031
  - K-000032
  - K-000034
  - K-000035
  - K-000037
  - K-000038
  - K-000039
history:
  - K-000030
  - K-000026
decisions:
  - D-000002
---

# Current Core Work

## Current synthesis

## What has been achieved

The initiative and related Core work have already delivered bounded improvements. These results make today's system safer or easier to understand; they do not implement the complete vision.

| Result | Delivered release lines | Immediate improvement | Responsibility or learning |
|---|---|---|---|
| [Gerrit 83632](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83632), merged 2024-04-26 | 13. | Created valid source data for DataHandler localization tests. | Reliable fixtures are a prerequisite for behavioral change. |
| [Gerrit 84237](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84237), merged 2024-05-25 | 13. | Prevented orphaned translated records in a copy process. | Structural and language validity must be preserved during copy. |
| [Gerrit 83310](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83310), [86085](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86085) and [85912](https://review.typo3.org/c/Packages/TYPO3.CMS/+/85912), merged between 2024-05-13 and 2025-01-07 | 83310 and 86085: 13. 85912: 14, plus 13.4 as merged [Gerrit 87655](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87655). | Added focused tests for copying localized content to an untranslated page, copying inline children and moving `-1` content. | Characterization records current constraints before behavior is changed. |
| [Gerrit 86773](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86773) and [88827](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88827), merged 2025-01-10 and 2025-05-05 | 14, plus 13.4 as merged [87689](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87689) and [89297](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89297). | Synchronized the language of inline children during copy and preserved the language of translations during copy. | Copy operations must retain language intent for children and translated records. |
| [Gerrit 89199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89199), merged 2025-04-30 | 14, plus 13.4 as merged [Gerrit 89286](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89286). | Keeps the selected language while navigating within one site, shows Default-Language content when no translation exists and resets the selection when another site does not provide that language. | Prevents an invalid language selection from producing an empty Layout module while preserving the editor's useful context where possible. |
| [Gerrit 92580](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92580), merged 2026-02-09 | 14, plus 13.4 as merged [Gerrit 92757](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92757). | Restricts copied record translations to languages available in the target site. | A bounded integrity fix for current site-local language handling. |
| [Gerrit 92881](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92881), merged 2026-02-20 | 14. | Separates `localizeRecord()` from `copyRecord()` in DataHandler. | Clearer code paths support safer characterization and later change. |
| [Gerrit 88837](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88837), merged 2026-04-11 | 14. | Avoids remapping non-language-aware IRRE children and uses separately assigned records for localized parents. | A concrete case where explicit synchronized data resolved ownership ambiguity. |
| [Gerrit 94831](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94831), merged 2026-07-21 | 15, [14.3 as Gerrit 94866](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94866) and [13.4 as Gerrit 94867](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94867) merged. | Resolves translated Mount Point subpages through the default-language relation and prevents a `404`. | A real shared-storage project produced a small, test-backed fix. |
| [Gerrit 94914](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94914), merged 2026-08-01 | 15, [14.3 as Gerrit 94916](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94916) and [13.4 as Gerrit 94915](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94915) merged. | Finds existing translations through `l10n_parent` when `l10n_source` is empty. | Preserves the distinction between structural parent and translation source while preventing duplicates. |
| [Gerrit 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170), merged 2026-08-10 | 15 and [14.3 as Gerrit 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199) merged. | Corrects comparison views that combine Connected- and Free-Mode languages: connected items form comparison rows while each Free-Mode language renders independently, including when the Default Language has no items. | A bounded interim correction for the current modes. It does not select the future editing or structural model. |
| [Gerrit 95178](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95178), merged 2026-08-10 | 15 and [14.3 as Gerrit 95202](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95202) merged. | Keeps the language title, flag and translation mode visible while scrolling a long comparison view in the Layout module. | Improves editor orientation in the current interface. The patch is explicitly interim and neither changes nor selects a future structural model. |
| [Gerrit 95619](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95619), merged 2026-10-06 | 15 and [14.3 as Gerrit 96412](https://review.typo3.org/c/Packages/TYPO3.CMS/+/96412) merged. | Names current stored and synthetic All-Languages values through `LanguageMarker::ALL_LANGUAGES`. | Internal naming preparation only: `-1` semantics remain; no replacement API or architecture is adopted. |
| [Gerrit 87595](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87595), merged 2026-10-17 | 15; [Gerrit 96783](https://review.typo3.org/c/Packages/TYPO3.CMS/+/96783) merged for 14.3 on 2026-10-18. | Aligns owned inline/file children to the stored parent language after relation resolution. | Broader than superseded 95476; includes existing siblings on relevant parent operations, not a global repair. |
| [Gerrit 94673](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94673), merged 2026-10-20 | 15; [Gerrit 96935](https://review.typo3.org/c/Packages/TYPO3.CMS/+/96935) merged for 14.3. | Restores the page-icon context menu in Language Comparison. | Opt-in renderer behavior, not prototype bulk visibility or a new permission model. |
| [Gerrit 97053](https://review.typo3.org/c/Packages/TYPO3.CMS/+/97053), merged 2026-10-30 | 15; [Gerrit 97225](https://review.typo3.org/c/Packages/TYPO3.CMS/+/97225) merged for 14.3. | Prefers language `0` regardless of configuration order. | Missing `0` still falls back to the first language; no hidden-layer architecture is adopted. |

The [initiative test extension](https://github.com/t3thi/translation-handling) also provides reproducible translation, fallback and relation scenarios. It was revived and extended with focused IRRE cases in 2025. It is research infrastructure, not evidence of changed Core behavior.

The repeated pattern is useful: a real failure is reproduced, the responsible contract is identified, tests define the boundary and the fix remains narrow. This is the initiative's preferred form of incremental improvement.

## Language-All marker: scope and review boundary

[Gerrit 95619](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95619) and its
14.3 backport merged on 2026-10-06, rechecked on 2026-10-30.
`LanguageMarker::ALL_LANGUAGES` is an internal integer marker, including the
reviewed TCA helpers and `SlugHelper`, not a behavior change or stable extension
API. Stored intent, synthetic selection and fallback remain distinct contracts
in Layout, routing, Workspaces, Recycler, sitemap and LinkValidator. Concrete
selection and a synchronization replacement remain the longer-term direction,
subject to characterization; naming neither implements it nor prevents a
later split. The initiative Decision Record remains proposed. The lookups in
`ContentObjectRenderer`, frontend `CategoryCollection` and Extbase
`Typo3DbQueryParser` select stored records, not synthetic languages.

`LinkAnalyzer`'s missing-language fallback and `EditableRestriction` retain
their behavior and query representation. The 2026-10-30 static recheck confirms that
the bulk query selects the language field explicitly but `recheckLinks()` does
not. Without incidental selected fields or event enrichment, `checkLinks()`
falls back to `-1` even for a language-aware record. This remains a coverage
question, not a reproduced regression or a resolved fallback contract.

Layout TypeScript retains its literal with a PHP-marker synchronization comment;
a shared JavaScript constant or `isAllLanguage` property is follow-up. TYPO3 v15
has the typed constant; 14.3 uses an untyped one for PHP 8.2. Default Language
markers, record/query abstractions and general inverse/context annotation rules
remain open; integer language-field dependencies are not removed.

The [Human Review Explorer](https://content.eric-harrer.de/t3thi/reviews/95619/)
compares 80 direct/inverse candidates, Astra/Opus assessments, human decisions
and Core evidence. Both models misclassified a stored-record
`ContentObjectRenderer` query. Agreement is triage, not proof. The 2026-09-25
pass found no false positive in patch set 2; further candidates need human review.
[Gerrit 92267](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92267) was abandoned on 2026-10-07 after the marker work. It remains historical inventory evidence, not an open patch or a replacement implementation.

## Structure-layer demonstrator and language-zero validation

André demonstrated the [structure-layer prototype](https://github.com/t3thi/structure-layer)
on 2026-10-23. It retains hidden structural `0` records and moves real content
into language variants, with per-site Editing Language, Page Tree labels and
creation controls. Comparison persistence and source/deletion behavior still need validation. The development-only structure view
is for inspection, not a production editing contract. Direct structural
blueprints and separate structural permissions remain later ideas.

This is research progress, not Core adoption or a v15/v16 promise. Demo setup
resets its database; the presenter had not tested migration. Production
migration, reversal, permissions, lifecycle and full behavior parity remain
unvalidated. The shared-structure hypothesis is not resolved by the demo.

The prototype snapshot checked on 2026-10-30 now contains the top-bar-only
Editing Language switch, an always-present comparison reference with a
missing-page action, per-record Translate buttons and available-language lists
in gaps. Bulk visibility is in the context menu without the redundant label.
These are static code findings, not newly reproduced UX results. Its optional
source-language enforcement comes from bundled Core patches, not upstream Core.

Gerrit 97053 and 14.3 backport Gerrit 97225 merged on 2026-10-30.
Default lookup now prefers `0` regardless of order, affecting default links and
site-root redirection for reordered sites. Missing `0` still uses the first
language, deliberately preserving those sites. The requested error is not implemented.

## Inline-child language alignment

Gerrit 95476 was abandoned on 2026-10-23 in favor of merged
Gerrit 87595 (TYPO3 v15) and Gerrit 96783 (14.3). The successor
aligns parent-owned inline and file children after relation resolution when a
parent is created, its language changes, or new children are submitted. Existing
siblings and nested children are included; explicit child-language input does
not retain the earlier proposal's exemption. Alignment to `0` or Language All
clears translation pointers. Workspace writes target workspace versions.

MM relations, direct child-language editing and blanket repair of inconsistent
old data are outside this fix. Alignment does not separately check child-table,
page or language-field access. This current contract is broader than the earlier
missing-default proposal, not a universal ban on mixed-language relations.

## Recycler selector consistency

[Gerrit 96916](https://review.typo3.org/c/Packages/TYPO3.CMS/+/96916) merged for
TYPO3 v15 on 2026-10-22; [Forge 111176](https://forge.typo3.org/issues/111176)
is Resolved. Recycler and record history use the shared single-select. A concrete
Recycler language includes stored All records and non-language-aware tables;
unrestricted selection uses `null`. Arbitrary language multi-selection and
synthetic-value removal elsewhere remain open, not completed by this fix.

## Current work as of 2026-10-30

All listed Gerrit changes, their Change-ID backports, Forge issues and the
linked dbdoctor PRs were rechecked on 2026-10-30. WIP takes precedence; otherwise
negative votes, unresolved comments or merge conflicts require review action.
Review-positive requires a current positive Code-Review, no such blocker and
mergeability. Other open changes await review. Merge conflict reports Gerrit
mergeability against the target branch on that date, not submit approval.

### Work in progress (WIP)

| Patch | Target release lines and backports | Current review state | Merge conflict | Scope and boundary |
|---|---|---|---|---|
| [Forge 110510](https://forge.typo3.org/issues/110510) and [Gerrit 95475](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95475) | TYPO3 v15. | Patch set 2; WIP; CI `+1`; no unresolved comments. | **Yes** | Repeats one stored Language-All record across columns. Column context protects neighboring paste/move language; the shared record retains All on paste. One sorting value still cannot give independent Free-Mode positions. Review must address the August move-guard requirement. |
| [Gerrit 92859](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92859) | TYPO3 v15. | Patch set 6; WIP; CI `-1`; 6 unresolved comments. | **Yes** | Proposes language- and Workspace-aware MM tables. Its uniform relation model is relevant, but the use of live Default-Language UIDs is an incremental design, not a decision for future Structural Identity. |
| [Gerrit 93289](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93289) | TYPO3 v15. | Patch set 1; WIP; CI `+1`; no unresolved comments. | No | Adds Workspace coverage for Language-All paste behavior and fills a characterization gap before semantic changes. |
| [Gerrit 93819](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93819) | TYPO3 v15; 14.3 intended; no backport found. | Patch set 2; `[WIP]`; CI `+1`; no unresolved comments. | **Yes** | Adds move guards for Free-Mode content while current Free Mode remains supported. |
| [Forge 110328](https://forge.typo3.org/issues/110328) and [Gerrit 95042](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95042) | TYPO3 v15. | Patch set 1; `[WIP]`; CI `+1`; no unresolved comments. | **Yes** | Restricts selectable translation parents to prevent duplicate or structurally invalid assignments. The patch is not an implemented fix. |
| [Forge 110330](https://forge.typo3.org/issues/110330) and [Gerrit 95043](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95043) | TYPO3 v15. | Patch set 1; `[WIP]`; CI `+1`; no unresolved comments. | **Yes** | Hides Connected Mode when the source cannot establish a Default-Language relation. A Free-Mode source cannot create the missing connection. The current revision must be rebased before review can progress. |

### Review action required

| Patch | Target release lines and backports | Current review state | Merge conflict | Scope and boundary |
|---|---|---|---|---|
| [Gerrit 92777](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92777) | TYPO3 v15; 14.3 intended; no backport found. | Patch set 10; two Code-Review `+1`; CI `+1`; 1 unresolved comment. | No | Restricts copied Free-Mode records to languages available in the target context. This improves current-model integrity without selecting a future structure model. |
| [Gerrit 93063](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93063) | TYPO3 v15; 14.3 intended, no backport found. | Patch set 8; CI `+1`; no current Code-Review vote or unresolved comment. | **Yes** | Warns about orphaned translations without repairing or redesigning identity; rebase is required. |

### Review-positive and mergeable

| Patch | Target release lines and backports | Current review state | Merge conflict | Scope and boundary |
|---|---|---|---|---|
| [Forge 110008](https://forge.typo3.org/issues/110008) and [Gerrit 94510](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94510) | TYPO3 v15; 14.3 intended, no backport found. | Patch set 11; Code-Review `+1`; CI `+1`; no unresolved comments. | No | Restricts fallback under Strict. The fix is not merged; the regression remains an open Core correction. Its current footer no longer names 13.4. |

### Awaiting review

| Patch | Target release lines and backports | Current review state | Merge conflict | Scope and boundary |
|---|---|---|---|---|
| [Gerrit 93028](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93028) | TYPO3 v15; 14.3 intended; no backport found. | Patch set 6; CI `+1`; no current Code-Review vote or unresolved comment. | No | Applies the requested parent language to newly created relation children while leaving already localized children unchanged. |
| [Gerrit 95038](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95038) | TYPO3 v15. | Patch set 2; CI `+1`; no current Code-Review vote or unresolved comment. | No | Keeps `pages.doktype` aligned with the Default-Language page through `l10n_mode=exclude` and provides an Upgrade Wizard for existing divergent translations. This enforces a current-model invariant rather than selecting a future structural model. |
| [Gerrit 93752](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93752) | TYPO3 v15; 14.3 intended, no backport found. | Patch set 4; CI `+1`; no current Code-Review vote or unresolved comment. | No | Skips overlays when copying to a Free-Mode language; now mergeable but not yet reviewed positively or merged. |

### Rejected or superseded

| Patch | Target release lines and backports | Official state | Merge conflict | Reason |
|---|---|---|---|---|
| [Gerrit 92585](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92585) | TYPO3 v15; TYPO3 14.3 was named, but no backport change exists. | Abandoned on 2026-08-07. | Not applicable | Its narrow Free-Mode rendering fix was further developed in the merged [TYPO3 v15 change 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170) and [TYPO3 14.3 backport 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199). |
| [Gerrit 94917](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94917) | TYPO3 v15; no backport branch was named and no backport change exists. | Abandoned on 2026-08-27. | Not applicable | Its overlapping Free/Mixed comparison work had already been proposed for replacement by the merged [TYPO3 v15 change 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170) and [TYPO3 14.3 backport 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199). Change 94917 itself was not merged. |
| [Gerrit 84338](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84338) | TYPO3 v15. | Abandoned 2026-10-23. | Not applicable | Configurable Default Language IDs were abandoned because of pervasive `0` assumptions. The author prefers investigating the structure-layer PoC; this does not adopt it in Core. |
| [Gerrit 92267](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92267) | TYPO3 v15. | Abandoned 2026-10-07. | Not applicable | Earlier annotation inventory; merged 95619/96412 provide the bounded marker instead. Not a test suite or semantic replacement. |
| [Gerrit 95476](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95476) | TYPO3 v15/14.3 proposal. | Abandoned 2026-10-23. | Not applicable | Replaced by merged 87595/96783, whose broader child-alignment contract is described above. |

### Supporting patches and non-patch research

| Work | Current state | Merge conflict | Meaning |
|---|---|---|---|
| [dbdoctor PR 98](https://github.com/lolli42/dbdoctor/pull/98) | Merged 2026-10-08. | Not applicable | Repairs divergent `l10n_state` by marking differing stored values `custom`; dbdoctor tooling, not changed Core state enrichment. |
| [dbdoctor PR 171](https://github.com/lolli42/dbdoctor/pull/171) | Closed without merge 2026-10-08; split work described in the closing comment. | Not applicable | The broad cleanup draft is not merged. Generic record deletion when a page translation is absent can delete valid extension data; narrower cleanup must remain site-aware. |
| [Forge 110497](https://forge.typo3.org/issues/110497) and [Forge 110498](https://forge.typo3.org/issues/110498) | Both Closed. | Not applicable | The missing child-language reports are linked to the replacement 87595/96783 through 95476's abandonment. This establishes a delivered correction, not the exact introducing regression commit. |
