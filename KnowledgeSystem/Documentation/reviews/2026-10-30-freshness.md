---
title: "Current State freshness reconciliation — 2026-10-30"
---

# Current State freshness reconciliation — 2026-10-30

This is a source-reconciliation report prepared by an agent, not human semantic
acceptance. The proposed semantic transitions remain review-required. No Core
checkout, historical Minutes or raw transcript was modified, and no remote
publication, commit or push was performed.

## Scope and dating

- Last semantic update: 2026-10-30.
- Reviewed meeting/transcript coverage: through 2026-10-23, retaining the
  previously established baseline through 2026-08-14 and reconciling every
  available later meeting bundle.
- External observation: 2026-10-30. All 50 Gerrit IDs in the pre-audit Current
  State were read from the official service, plus named 94673 and 96783.
  Change-ID sibling queries found 96935 and 97225. A Core follow-up identified
  Recycler change 96916: 55 unique changes in total, each checked officially.
  No query page reported additional results. A release footer alone was never
  counted as a backport. An absent sibling means no corresponding backport was
  found by this search, not proof against all possible differently named work.
- Every registered Forge issue and both linked dbdoctor PRs were checked;
  additional issues for the newly documented merges were checked as well.

The main Core checkout is clean and at
`cdaa725d2d8add6da57e37f269094e8a222973d7`, matching the official main head.
`Typo3Version` identifies 15.0.0-dev. The observed 14.3 head is
`94cd2b6dc2bab7d204bf3f2435b14e1caae9e5cc`; backport lifecycle comes from Gerrit,
not from assumptions about locally checked-out branches or released packages.
“Merged for 14.3” does not assert inclusion in a particular published patch release.

## Meeting reconciliation

Every post-baseline Minutes file was read completely. The previously missing
August 21/28 transcript bundles were read completely and registered with their
actual hashes. For the later bundles, the prior reviewed ingestions are retained;
all available registered transcript hashes were reverified against the unchanged
local payloads. This is not a claim to have re-read every historical transcript
again. Raw transcripts remain ignored and local-restricted; excluded passages
are not reproduced here.

| Meeting | Result of reconciliation |
|---|---|
| 2026-08-21 | Refine K-000028: one shared sorting value, neighboring move-language protection and bounded permission observation. Migration of independent Free structures still requires human matching; this is already covered by K-000019, not a new selected model. Off-topic upgrade discussion is no-change. |
| 2026-08-28 | Refine K-000028: repeated DOM occurrences, hidden counting, Free-Mode move restriction as a review requirement and copy-language boundary. The early inline-child draft is historical input to K-000030, now superseded by verified Core work; no new DataHandler architecture is inferred. Awareness/publicity discussion is no-change. |
| 2026-09-04 | K-000029 captures synthetic/record/fallback distinctions. Its Recycler consistency goal is partially delivered by 96916 (new K-000039), not resolved as arbitrary multi-selection. |
| 2026-09-18 | K-000029 already captures persisted-record query findings. K-000030's patch observation was stale and is superseded; structural preference remains unselected. |
| 2026-09-25 | K-000031 and proposed D-000002 retain the human evidence gate and bounded marker scope. No additional decision is accepted. |
| 2026-10-02 | TCA/SlugHelper, LinkValidator coverage question and TypeScript boundary remain. The context-menu work mentioned as unfinished now has verified implementation K-000038. |
| 2026-10-09 | Merged marker K-000032 remains implemented. K-000033 stays tentative; no output-mode or compatibility decision is inferred. |
| 2026-10-23 | Editing Language, bulk visibility and gap translation progressed in prototype code; K-000016/33/34/36 are refined without Core adoption. K-000035's lookup correction is now merged, but the requested missing-zero error is not. |

The August 21 Minutes have inconsistent participant surnames compared with the
roster and transcript. They were preserved as historical reviewed material,
not silently rewritten; a targeted human editorial correction can follow.
This does not change the technical propositions used here.

## Material findings

1. **87595 / 96783:** merged owned-child alignment is broader than abandoned
   95476. Relevant parent operations can overwrite explicit child-language
   input and align existing siblings. K-000030 is superseded by K-000037;
   MM, direct child edits and blanket old-data repair remain excluded.
2. **97053 / 97225:** both merged. Lookup prefers `0`, but deliberately retains
   the first-language fallback without `0`; no validation error was delivered.
   84338 was separately abandoned on 2026-10-23.
3. **94673 / 96935:** both merged, restoring comparison page-icon context menus
   through an opt-in renderer flag (K-000038).
4. **94510:** patch set 11 is review-positive and mergeable, not merged. The
   current release intent names main and 14.3, not 13.4. Strict's regression
   remains an open correction; no silent output-policy resolution.
5. **93752:** patch set 4 is mergeable and awaiting review. **93063:** patch
   set 8 still conflicts and has no current positive Code-Review vote.
6. **92267:** abandoned 2026-10-07. 95619/96412 are merged naming work, not
   implementation of the record-wide replacement or a stable extension API.
7. **95475:** patch set 2 is WIP with a merge conflict. Its current description
   preserves Language All when pasting the shared record. The meetings' guard
   against damaging shared sorting from Free columns remains a review requirement.
8. **dbdoctor:** PR 98 merged 2026-10-08, marking divergent inherited values
   `custom`; Core State enrichment is unchanged. PR 171 closed without merge.
   Its closing comment describes split work and rejects generic deletion of
   all extension records merely because a page translation is missing.
9. **96916:** merged for v15 on 2026-10-22; Forge 111176 is Resolved. Recycler
   and record history now share a single-select. Recycler uses `null` for the
   unrestricted selection and includes stored All records and tables without
   language support for a concrete language. This partially delivers the
   consistency goal, not arbitrary multi-selection or removal of every
   synthetic backend value. K-000039 records the bounded implementation.

## Core and prototype verification boundary

The documented Core paths were inspected statically at the pinned main revision:

- `Site::getDefaultLanguage()` and synthetic available languages;
- TCA language/parent enrichment and site-local numeric configuration;
- `State::getFieldNames()`/`enrich()`, DataMapProcessor parent/source/exclude
  scopes, dependent propagation and its exclusion of Language-All sources;
- DataHandler localization/duplicate checks and the new owned-child alignment;
- frontend `getLanguageRestriction()`, PageRepository overlay/fallback behavior,
  frontend CategoryCollection, Extbase language statements and sitemap selection;
- Layout mode detection, creation guards, comparison page-icon rendering,
  localization-state choices and Layout/Records/Media labels;
- page-wizard source filtering, LinkAnalyzer bulk/recheck selection and
  Workspaces/Recycler selector contracts, including the actual
  `DeletedRecords::setData()` language query.

For 94510, 93752, 93063 and 95475, the current commit descriptions and
production-code diffs were also compared with the published summaries. This
is a scope check, not a complete merge-readiness review or a fresh run of their
included tests. 93752 now overrides the target language before copying and
checks access before inline-copy side effects; 93063 distinguishes missing,
non-default and All-language parents while retaining Connected/Mixed semantics.

No fresh Core functional suite, live database reproduction, browser acceptance,
exhaustive extension audit or complete deletion/restore audit was performed.
The LinkValidator missing-language coverage question and deleted-source
characterization remain open; static confirmation is not runtime reproduction.

The prototype head is `c9c16f83281683c34c735ecbf420ec1c5621033e`, nine commits
beyond the demonstrated revision. README, compare patches and the current
selection middleware, comparison template and context-menu callback confirm
the top-bar-only selection, missing reference column, available-language lists,
per-record Translate action and deliberate bulk visibility action. Its source
enforcement switch is supplied by a bundled Core patch, not upstream Core.
Documentation contains an older “not fixed” UX note despite the newer code;
the audit therefore describes code presence, not tested completeness. The PoC
remains explicitly not for production. Its tests and migration were not run.

## Gerrit observations

All rows were observed on 2026-10-30. `n/a` is used for closed changes, not a
claim that merge conflicts were measured there. Votes list the nonzero values
on the current revision without publishing account details. Historical main
merges retain their original release-line mapping in Current State.

| Change | Branch | Official state | PS | Mergeable | Code-Review | Verified | Unresolved | Revision |
|---|---|---|---|---|---|---|---|---|
| [83169](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83169) | main | MERGED | 11 | n/a | +1, +2 | +1, +1, +2 | 0 | `c1701b21d5aa9c65b616719eba3ff52e47275ee1` |
| [83310](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83310) | main | MERGED | 11 | n/a | +1, +2 | +1, +1, +1, +2 | 0 | `6cc90b3dc1c8a9575aed82529ac7f1c48c550b38` |
| [83632](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83632) | main | MERGED | 12 | n/a | +1, +2 | +1, +1, +1, +2 | 0 | `eef9e63a4ec79f891dbf6e589a1ac83d86e423d9` |
| [84237](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84237) | main | MERGED | 4 | n/a | +1, +2 | +1, +1, +2 | 0 | `d28f7b04d823142a59581019fe04c1d22cf6921e` |
| [84338](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84338) | main | ABANDONED / WIP | 6 | n/a | none | +1 | 4 | `6db1e8ea807bc009ac6de0b7a2f6d4eccb46887e` |
| [85912](https://review.typo3.org/c/Packages/TYPO3.CMS/+/85912) | main | MERGED | 10 | n/a | +1, +1, +2 | +1, +1, +2 | 0 | `a9e46db797390bc87321a768ce1848816a9e2905` |
| [85978](https://review.typo3.org/c/Packages/TYPO3.CMS/+/85978) | main | MERGED | 16 | n/a | +1, +2 | +1, +1, +2 | 0 | `f9d64b006d6897d0154c349e485ba4bee3db256d` |
| [86085](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86085) | main | MERGED | 4 | n/a | +1, +1, +2 | +1, +1, +1, +2 | 0 | `bb17ea06eb416de6a58529837901fb41b0129463` |
| [86773](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86773) | main | MERGED | 16 | n/a | +1, +1, +2 | +1, +1, +1, +2 | 0 | `73aca5114554e55363dfe6f6e62028168c56829e` |
| [87595](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87595) | main | MERGED | 18 | n/a | +1, +2 | +1, +1, +2 | 0 | `c4c5e37ff8f8d7ef215a16228c47006ad844a346` |
| [87655](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87655) | 13.4 | MERGED | 2 | n/a | +2 | +1, +2 | 0 | `57e452cc88c307d8a93be801f5492970e3f7609c` |
| [87689](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87689) | 13.4 | MERGED | 2 | n/a | +2 | +1, +2 | 0 | `e2f79307299f3d5a1c5aa792c5f1efd1d09f681f` |
| [88827](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88827) | main | MERGED | 6 | n/a | +1, +2 | +1, +1, +2 | 0 | `140669d94e5dbdb2bef61195e8c0c880f1a42215` |
| [88828](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88828) | 13.4 | MERGED | 2 | n/a | +2 | +1, +2 | 0 | `3d695ad3179c1925b9d7d9068dbb249df1676a7a` |
| [88837](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88837) | main | MERGED | 11 | n/a | +1, +1, +2 | +1, +1, +1, +1, +2 | 0 | `c3642829a320c4b5e131b352fc5adefa67242cb6` |
| [89199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89199) | main | MERGED | 7 | n/a | +1, +2 | +1, +1, +2 | 0 | `ed30eb485846461b7c3a330201f78b2710e22805` |
| [89286](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89286) | 13.4 | MERGED | 2 | n/a | +2 | +1, +2 | 0 | `a895b2909527851c4028acf3b96aa87fcc6d702b` |
| [89297](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89297) | 13.4 | MERGED | 2 | n/a | +2 | +1, +2 | 0 | `0a86a2a73b3fbd9f943d94bd4fad730752db6933` |
| [92267](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92267) | main | ABANDONED / WIP | 6 | n/a | none | +1 | 1 | `719c5f26b9e92722e63d4b976fe9f16594b4d88d` |
| [92580](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92580) | main | MERGED | 11 | n/a | +1, +1, +2 | +1, +1, +1, +2 | 0 | `c901be21e2048f3b5f4d33b75f84dbb02bcd4f93` |
| [92585](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92585) | main | ABANDONED | 7 | n/a | +1 | +1, +1, +1 | 0 | `fb77ac356bfe1485d7ac745eb05b4c6dc0cdae07` |
| [92757](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92757) | 13.4 | MERGED | 4 | n/a | +2 | +1, +2 | 0 | `6a8353cef171e4228c3b981d357795a38ef3962b` |
| [92777](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92777) | main | NEW | 10 | true | +1, +1 | +1, +1, +1 | 1 | `eba7fb45fe25deee4227867a47f20431c6b04ce5` |
| [92859](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92859) | main | NEW / WIP | 6 | false | none | -1 | 6 | `7f7e22b886c119df7fcc456cce60e23762b49cd1` |
| [92881](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92881) | main | MERGED | 8 | n/a | +1, +1, +2 | +1, +1, +1, +2 | 0 | `cc880c677772942da8f041667857aa1cad07b267` |
| [93028](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93028) | main | NEW | 6 | true | none | +1 | 0 | `740aff9fed68617e02be463800481e8b07e6848b` |
| [93063](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93063) | main | NEW | 8 | false | none | +1 | 0 | `07118485a7c9aa85cabd2ee31941756b603d2d86` |
| [93289](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93289) | main | NEW / WIP | 1 | true | none | +1 | 0 | `1c5c1922363d218c668fefec3b5f764b7a0f6142` |
| [93752](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93752) | main | NEW | 4 | true | none | +1 | 0 | `9335926f210d84971b5080a63cfa6e001dfc49f9` |
| [93819](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93819) | main | NEW / WIP | 2 | false | none | +1 | 0 | `1fd1fe4567407aee58cfec813429e3c3c99fa332` |
| [94510](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94510) | main | NEW | 11 | true | +1 | +1, +1 | 0 | `5f5b7c72824cc6fcd3921c4f4fe40238e4fc02b2` |
| [94673](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94673) | main | MERGED | 5 | n/a | +1, +1, +1, +1, +2 | +1, +1, +1, +1, +1, +2 | 0 | `d67b99026ad58285c2fdae8ff51fdbb58db51d1d` |
| [94831](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94831) | main | MERGED | 2 | n/a | +1, +1, +2 | +1, +1, +2 | 0 | `1fe51c1a66864929a149a4400b20f44f073a3407` |
| [94866](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94866) | 14.3 | MERGED | 2 | n/a | +2 | +1, +2 | 0 | `044ade1ec9f8e1ba93091600d4280885a4313e7f` |
| [94867](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94867) | 13.4 | MERGED | 2 | n/a | +2 | +1, +2 | 0 | `f00d7f343f59f1269d3a2312bbe5a6e6d2a4255d` |
| [94914](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94914) | main | MERGED | 3 | n/a | +1, +1, +2 | +1, +1, +1, +1, +2 | 0 | `c71b2bdb2f9b81eb17176cd297848c2702e77177` |
| [94915](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94915) | 13.4 | MERGED | 2 | n/a | +1, +2 | +1, +1, +2 | 0 | `1d104f3b95efc220afe299c14dc5a37d0b4fd301` |
| [94916](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94916) | 14.3 | MERGED | 2 | n/a | +1, +2 | +1, +1, +2 | 0 | `faf60eea222288a77ce5788238946a003537e954` |
| [94917](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94917) | main | ABANDONED | 4 | n/a | none | +1 | 1 | `432cc8b6e707549b9618f77c9455ddb6f1d88faf` |
| [95038](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95038) | main | NEW | 2 | true | none | +1 | 0 | `fa1152649d6acccab3b9b912dfccc9af15b14a56` |
| [95042](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95042) | main | NEW / WIP | 1 | false | none | +1 | 0 | `f9518beee05e88361d407dae457b80dfda54d5ba` |
| [95043](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95043) | main | NEW / WIP | 1 | false | none | +1 | 0 | `543c4a596d5c36b968c1c4fc0a5d5b171cfd2184` |
| [95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170) | main | MERGED | 4 | n/a | +1, +1, +2 | +1, +1, +1, +2 | 0 | `24f33e7def6d5589e933abb5d279eb3320c95266` |
| [95178](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95178) | main | MERGED | 6 | n/a | +1, +2 | +1, +1, +2 | 0 | `92d936bd8cf4fc780963c4c42f3fb6ac4204b9e7` |
| [95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199) | 14.3 | MERGED | 8 | n/a | +2 | +1, +2 | 0 | `8225f3334c154e6ed5de7771c21c902508c33cd8` |
| [95202](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95202) | 14.3 | MERGED | 2 | n/a | +2 | +1, +2 | 0 | `2932656a35c91e525a2ded69aa0da58605b93e40` |
| [95475](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95475) | main | NEW / WIP | 2 | false | none | +1 | 0 | `b1b78ed2b34baac398e824537c7fa39b74ad56ac` |
| [95476](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95476) | main | ABANDONED / WIP | 1 | n/a | none | +1 | 0 | `7c0ace827e37b133d365a4f1221474cb20504618` |
| [95619](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95619) | main | MERGED | 4 | n/a | +1, +1, +2 | +1, +1, +1, +2 | 0 | `d2a9eed77539b081a40fc698346aab937bb6db5f` |
| [96412](https://review.typo3.org/c/Packages/TYPO3.CMS/+/96412) | 14.3 | MERGED | 4 | n/a | +1, +2 | +1, +1, +2 | 0 | `3f53e06144ed45c162863b8e0d893293e15370e7` |
| [96783](https://review.typo3.org/c/Packages/TYPO3.CMS/+/96783) | 14.3 | MERGED | 2 | n/a | +2 | +1, +2 | 0 | `68242812b9951c334eaa104d54d618b3ce914d6c` |
| [96916](https://review.typo3.org/c/Packages/TYPO3.CMS/+/96916) | main | MERGED | 8 | n/a | +1, +1, +2 | +1, +1, +1, +2 | 0 | `9049094d9b8422a5112a4d51de0e099470a7760b` |
| [96935](https://review.typo3.org/c/Packages/TYPO3.CMS/+/96935) | 14.3 | MERGED | 2 | n/a | +2 | +1, +2 | 0 | `1b07150e6656d8cad8a7e138b870777c719b1f62` |
| [97053](https://review.typo3.org/c/Packages/TYPO3.CMS/+/97053) | main | MERGED | 7 | n/a | +1, +1, +2 | +1, +1, +1, +2 | 0 | `cdaa725d2d8add6da57e37f269094e8a222973d7` |
| [97225](https://review.typo3.org/c/Packages/TYPO3.CMS/+/97225) | 14.3 | MERGED | 2 | n/a | +2 | +1, +2 | 0 | `94cd2b6dc2bab7d204bf3f2435b14e1caae9e5cc` |

## Forge and supporting observations

| Source | Observed lifecycle |
|---|---|
| [Forge 103970](https://forge.typo3.org/issues/103970) | Resolved |
| [Forge 110008](https://forge.typo3.org/issues/110008) | Under Review |
| [Forge 110152](https://forge.typo3.org/issues/110152) | Resolved |
| [Forge 110281](https://forge.typo3.org/issues/110281) | Closed |
| [Forge 110328](https://forge.typo3.org/issues/110328) | Under Review |
| [Forge 110330](https://forge.typo3.org/issues/110330) | Under Review |
| [Forge 110497](https://forge.typo3.org/issues/110497) | Closed |
| [Forge 110498](https://forge.typo3.org/issues/110498) | Closed |
| [Forge 110510](https://forge.typo3.org/issues/110510) | Under Review |
| [Forge 111176](https://forge.typo3.org/issues/111176) | Resolved |
| [Forge 99064](https://forge.typo3.org/issues/99064) | Resolved |
| [dbdoctor PR 98](https://github.com/lolli42/dbdoctor/pull/98) | Merged 2026-10-08; merge commit `d1e4d519f9ec4ff69f609c5715127dc56b628199`. |
| [dbdoctor PR 171](https://github.com/lolli42/dbdoctor/pull/171) | Closed without merge 2026-10-08; no replacement PR number is invented. |

## Human gates

Review the complete semantic diff, especially the broader owned-child contract,
K-000030's supersession, K-000035's implementation/maturity increase and the
English/German projections. Existing proposed Decisions stay proposed, and
translation-review dates are not advanced automatically. Source coverage dates
describe incorporated evidence, not acceptance of every inferred proposition.

## Verification results

The existing local Python environment was activated; no new dependency or
scanner infrastructure was installed. Checks were run with `python3` and
`PYTHONDONTWRITEBYTECODE=1`:

- Schema/source/generated validation: 39 Knowledge Objects, 3 Decisions,
  13 Change sets and 22 Topic files passed.
- Backlink resolution, deterministic index/view checks and `git diff --check`
  passed.
- Knowledge tooling: 51 unit tests passed, including the new regression test
  separating last edit, meeting coverage and external observation dates.
- Publisher: 16 isolated tests passed; Minutes workflow contract passed.
  Authentication/publication messages in these tests are mocked, not a real
  Firefox-session extraction or upload.
- An additional read-only reconciliation check matched all 55 published Gerrit
  IDs and revisions to the official observations and the audit table. Every
  open change occurs once in the open-work inventory, with no closed change
  misclassified as open. All 11 Forge observations match the source registry.
- All 22 registered local transcript hashes match. Only `Transcripts/README.md`
  is tracked, historical weekly Minutes are unchanged, the Git index is empty,
  and the Core checkout remains clean.
- Both Current States retain valid table widths and current pinned Core links.
  English uses 86,095 and German 98,992 of the 100,000-character publication
  limit. These are local build checks, not a remote upload acceptance test.

`lint-knowledge --strict` exits with status 1 solely for the 11 advisory German
translation-human-review warnings. Metadata parity passes; no stale external
observation warning remains. Do not remove these warnings by inventing a human
review date. The 12 transitions in the new Change set and the translated
projections remain available for explicit human review.
