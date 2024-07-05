---
title: "Translation Handling Initiative - Current State"
---

# Translation Handling Initiative<br>Current State

[← Back to the overview](https://notes.typo3.org/s/f3ae8fZSD)

In this document, we record the current status of those topics that we are currently actively working on, are in the planning phase and have already been finalised.

## Work

### Work in progress
- Investigation of current locale problems (Astrid)
- Astrid consults with Yannis about [#84514](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84514)
- André and Astrid optimise the copy/move process ([Issue #93744](https://forge.typo3.org/issues/93744), [Issue #102345](https://forge.typo3.org/issues/102345))

### Current ToDos

- Create a new patch "[TASK] Restore deprecated site config properties `typo3Language` and `hreflang`"
- Cleanup of the documentation for the comma-separated list of the [`locale` property](https://docs.typo3.org/m/typo3/reference-coreapi/main/en-us/ApiOverview/SiteHandling/AddLanguages.html#confval-sitehandling-addinglanguages-locale) of the site configuration
- Give feedback on patch "[BUGFIX] Only render working links in language menu" | [Issue](https://forge.typo3.org/issues/103658), [Patch](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84514)
- Create a new patch "[BUGFIX] Prevent creation of orphaned records in **move** process" | [Issue](https://forge.typo3.org/issues/102345)
- Create a new patch "[BUGFIX] Fix locale fallback" | [Issue](https://forge.typo3.org/issues/103887)
- Check to what extent replacement of `l10n_mode=exclude` by `l10n_state` with `enforceLanguageSynchronization` is feasible
- Clean-up of TCA `eval` unique variants Inconsistencies between the field types [`input`](https://docs.typo3.org/m/typo3/reference-tca/main/en-us/ColumnsConfig/Type/Input/Properties/Eval.html#columns-input-properties-eval) and [`slug`](https://docs.typo3.org/m/typo3/reference-tca/main/en-us/ColumnsConfig/Type/Slug/Properties/Eval.html#columns-slug-properties-eval)

### Ongoing work

- Exchange on topics from the community
- Deepening basic knowledge of how the core works and contribution processes

### Work on hold

- Development of the next level of the [TransFusion Extension](https://extensions.typo3.org/extension/transfusion)
- Development of our [testing extension](https://github.com/t3thi/translation-handling)

---

## Planning

### Planned in the short term (v13)

- Keep deprecated site config properties `typo3Language` and `hreflang` until a fully-fledged replacement has been found

### Planned for the long term
- Remove special language "All" `-1` and replace it with a new bool field in the default record that causes cross-language synchronisation by the DataHandler
- Configurable default language identification
- Replace integer language identification (`sys_language_uid`) with [BCP-47](https://www.ietf.org/rfc/bcp/bcp47.html) string

### Statements made

- The different treatment of records and pages in the DataHandler is retained when translating, as the page tree must follow different rules (always connected)
- A free-connected mode switch, as provided by the [TransFusion Extension](https://extensions.typo3.org/extension/transfusion), should become superfluous in future
- We should become independent of locales installed on the server

### In planning

- How to handle "[BUGFIX] Prevent creation of orphaned records in **move** process"? | [Issue](https://forge.typo3.org/issues/102345)
- Further development steps as part of our [testing extension](https://github.com/t3thi/translation-handling)
- When handling language fallbacks, there are differences in the core code which should be harmonised

---

## Completed

### Core Patches

- [TASK] Create valid source data for DataHandler tests | [Issue](https://forge.typo3.org/issues/103734), [Patch](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83632), [Commit](https://github.com/TYPO3/typo3/commit/eef9e63a4ec79f891dbf6e589a1ac83d86e423d9)
- [BUGFIX] Prevent creation of orphaned records in **copy** process |  [Issue](https://forge.typo3.org/issues/103828), [Patch](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84237), [Commit](https://github.com/TYPO3/typo3/commit/d28f7b04d823142a59581019fe04c1d22cf6921e)