---
title: "Technical verification for the reviewed 2026-10-30 Minutes"
---

# Technical verification for the reviewed 2026-10-30 Minutes

This records the technical checks performed while preparing the
[Minutes](../../../MeetingMinutes/Weekly/2026/10/30.md). The user subsequently
reviewed the text, corrected individual name attributions and published it at
[HedgeDoc](https://notes.typo3.org/s/8Dua37LZux). The downloaded publication is
byte-for-byte identical to the final local file. This is not a complete Current
State audit or acceptance of canonical semantic changes. The separate
[ingestion report](2026-10-30-meeting-ingestion.md) covers the next processing stage.

## Evidence boundary

The transcript was read completely. Participants are André Buchmann, Eric
Harrer and Martin Clewing. The overview time is derived from the filename's
12:01 start and the final transcript interval ending at 1:04:44, expressed at
minute precision; CET applies on October 30. The publication URL is verified above.
The Forge 88024 URL was supplied by the user during preparation.

The Core working tree is clean but is **not pristine upstream main**. Local
HEAD `18b435309294ce5dac899bafd7a37647229a86c1` applies 94510 over
`cdaa725d2d8add6da57e37f269094e8a222973d7`. The local commit and official
patch share Change-ID `Ie61a04dfb169bad88dc6718a3bd44fce558ba105`.
Its presence locally must not be described as an upstream merge.
The existing `origin/main` reference is four commits ahead of that base;
the inspected PageRepository, localization and file-reference paths have no
changes between the base and that reference. No fetch, checkout, reset,
Core-code edit or database operation was performed.

## Findings and wording decisions

### Fallback types and page versus content fallback

[Feature 88137](https://docs.typo3.org/c/typo3/cms-core/main/en-us/Changelog/12.2/Feature-88137-Multi-levelFallbackForContentInFrontendRendering.html)
describes content under `fallbackType: strict` as explicitly translated or created in the selected
language, with default-language sorting, and limits multilevel content fallback
to `fallbackType: fallback`. That supports the participants' interpretation of the documented
content contract, not an assertion that the present implementation matches it.

Static baseline code confirms the discrepancy:

- `LanguageAspectFactory::createFromSiteLanguage()` preserves the configured
  fallback IDs and selects `LanguageAspect::OVERLAYS_ON_WITH_FLOATING` for `fallbackType: strict`.
- `PageRepository::getRecordOverlay()` combines the requested language and
  fallback IDs even under `fallbackType: strict`. `getLanguageFallbackChain()` does not
  filter by overlay mode.
- `PageRepository::getLanguageOverlay()` retains the original default record
  as fallback output in the `LanguageAspect::OVERLAYS_MIXED` path. This is distinct from simply
  appending `0` to every configured chain.
- Content elements under `fallbackType: free` do not use record overlays, while page resolution
  can still use `getPageOverlay()`. The meeting's “no fallback” formulation
  must not be generalized into a proven prohibition of page fallback under `fallbackType: free`.

See the pinned baseline
[PageRepository](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/core/Classes/Domain/Repository/PageRepository.php)
and [LanguageAspectFactory](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/core/Classes/Context/LanguageAspectFactory.php).
The Minutes attribute the desired contract to the participants and keep wider
product decisions open.

### Patch behavior and actual review outcome

Official [Gerrit 94510](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94510)
was checked on 2026-10-30: `NEW`, patch set 11, revision
`5f5b7c72824cc6fcd3921c4f4fe40238e4fc02b2`, release intent main/14.3.
Its inspected code removes `HiddenRestriction` from the query restrictions,
applies the workspace overlay and checks candidates with `RecordAccessVoter`.
It returns no record for a rejected candidate under `LanguageAspect::OVERLAYS_ON`
or `LanguageAspect::OVERLAYS_ON_WITH_FLOATING` and continues checking fallback
languages under `LanguageAspect::OVERLAYS_MIXED`. A missing
translation can still select a configured fallback. This verifies the scope
described in the Minutes, not a completed migration or universal runtime test.

The published October 30 comment is by André, despite ambiguous speaker
attribution while the transcript describes editing and testing. It questions
fallback under `fallbackType: strict` and `fallbackType: free` using Feature 88137 and the named missing-translation test.
The official votes are André `Code-Review -1`, `Verified +1`; Benni
`Code-Review +1`, `Verified +1`; CI `Verified +1`, with one unresolved comment.
The Minutes do not turn “two pluses” in conversation into a numerical
`Code-Review +2` or imply consensus to merge.

[Forge 110008](https://forge.typo3.org/issues/110008) identifies Johannes
Seipelt as the reporter. The transcript corrects its earlier surname confusion;
the Minutes use only Johannes, per the skill's body-name convention.

The historical 83169 production diff was inspected. It moves chain evaluation
into `getRecordOverlay()` without an overlay-mode guard. The Minutes preserve
the meeting's deliberate omission of a definitive regression attribution from
the review comment; this static examination is not a complete historical
runtime bisection or review of every related issue.

### Crop and dependent-record synchronization

The user-supplied [Forge 88024](https://forge.typo3.org/issues/88024) is New.
It reports initial copied cropping followed by missing updates, under both
`allowLanguageSynchronization` and `l10n_mode=exclude`, originally in v9.5.5.
Its comments describe a global crop-field workaround and limitations of
contextual configuration and localization tooling. Those historical results
are not proof that the reported v13 project setup currently works.

The inspected Core paths establish separate contracts:

- [TcaPreparation::configureFileReferences()](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/core/Classes/Configuration/Tca/TcaPreparation.php)
  supplies file-reference relation metadata for the dedicated `file` type;
  it does not automatically enable synchronization on every child field.
- [The standard crop TCA](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/core/Configuration/TCA/sys_file_reference.php)
  uses `imageManipulation` and backend access-control `exclude: true`.
  That `exclude` is not `l10n_mode=exclude`; neither that localization mode nor
  `allowLanguageSynchronization` is enabled on the standard crop field.
- [State::getFieldNames()](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/core/Classes/DataHandling/Localization/State.php)
  discovers synchronization fields from the record table's own TCA schema.
- [DataMapProcessor](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/core/Classes/DataHandling/Localization/DataMapProcessor.php)
  resolves parent/source/exclude scopes and reconciles inline/file relations,
  including ordering and creation/removal of dependent records. It does not
  equate relation synchronization with unconditional synchronization of every
  arbitrary descendant value. An unchanged child-ID map can update the parent
  relation and return without copying arbitrary existing child values.
- [DataHandler's deletion handling](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/core/Classes/DataHandling/DataHandler.php)
  checks relation type and `enableCascadingDelete`. Inline configuration alone
  does not prove unconditional ownership and deletion semantics for all cases.

The user clarified during review that the intended recursive synchronization
concerns parent-owned one-to-many IRRE child records, not independently shared
MM targets. `DataHandler::alignLanguageOfInlineChildren()` explicitly skips MM
relations, supporting the ownership distinction without implementing the wider
child-field synchronization proposal. `getRelationFieldType()` also distinguishes
the relation storage models. For a file field, the owned child is the file
reference record, not the potentially shared `sys_file` record. The Minutes
make this intended scope explicit without inventing a new meeting decision.

The Minutes include a clearly labelled post-meeting clarification rather than
presenting the desired recursive synchronization as existing Core behavior.
No project-specific TCA or data was supplied for a fresh reproduction. No
v13/v9 comparison, crop runtime test, workspace suite or arbitrary-depth
relation audit was performed.

## Human review gate

The user has accepted and published the Minutes, including the distinction
between intended Strict behavior and current code, the unfinished-translation
counterexample and the clarified ownership scope. Reviewed-meeting ingestion
can therefore proceed. Canonical semantic changes and English/German parity
remain separately reviewable; publication of the Minutes does not authorize
accepting new Decision Records or changing the Core implementation.

## Preparation checks

- `prepare-meeting-minutes` recognized the exact local transcript and target.
- The actual draft passed explicit structure, participant-order, seven-topic,
  required-link, prose-voice and unique-overview-entry checks.
- Terminology was aligned with Core identifiers and labels: `hidden`, falling
  back, `fallbackType: strict`/`fallback`/`free`, record overlays, file reference
  records and inline child records. “Custom value” and “Value of default language”
  were checked against Core's `locallang_wizards.xlf`. This is a terminology
  revision, not a new runtime test or a change to the meeting's conclusions.
- At preparation time, `publish_minutes.py check` reported `ready` without an
  overview URL. After the user's publication, the unique overview entry was linked.
- The skill's Minutes/workflow contract verifier passed.
- Knowledge validation, backlinks, index/view determinism and `git diff --check`
  passed without changing canonical knowledge or generated Current States.
- Raw transcripts remain ignored; only their README is tracked. The Git index
  and the local Core working tree were left unchanged. No commit or push occurred.

Reviewed local and published Minutes SHA-256:
`98c6ece765291dd344a208119d4462755dd0d98019e5acbc0eb4b10067fc46ec`.
The user's review and publication close the Minutes gate, not the separate
canonical semantic or English/German parity gates. Their corrected attributions
are preserved: André reported the crop case and colleague's workaround attempt
and raised the multiple-reference concern; Martin supplied the unfinished hidden
translation counterexample. Ambiguous transcript speaker labels are not used
to reverse those reviewed corrections.
