---
title: "2024-05 - Translation Handling Initiative - Monthly report"
---

# Translation Handling Initiative: Monthly report
**May 2024**

[← Back to the overview](https://notes.typo3.org/s/f3ae8fZSD)

## What happened since the last report?
- **XLIFF label management**
    - Handling of XLIFF label management and possible improvements were discussed
- **Site configuration topics**
    - Assessed impacts of language removal on existing configurations.
- **Documentation and Communication**
    - Planning a "Current-State" document alongside the weekly/monthly reports
    - Discussions on cross-team communication
- **Default Language ID Flexibility**:
    - Investigating whether the default language can be determined more variably
    - Investigation of the effects on the backend GUI if the default language is identified differently
    - Creation of the patch [#84338: [WIP][FEATURE] Make default language uid configurable](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84338)
- **Locale Usage**:
    - Discussed custom locales.
    - Discussed locale mapping issues in site configuration.
- **Patches**:
    - Finalized patch [#83310: [TASK] Add tests for copying localized content to non-translated page](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83310)
    - Finalized patch [84237: [BUGFIX] Prevent creation of orphaned records in copy process](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84237)
    - Began planning of a "move record"-patch regarding [Issue #102345](https://forge.typo3.org/issues/102345)

## What will happen until the next report?
- Further work on the "Move" patch (regarding [Issue #102345](https://forge.typo3.org/issues/102345))
- Continuation of planning for variable identification of the default language

## Any scope changes?

- **Website-Update**:
    - not necessary
- **Scope of our initiative**
    - So far, nothing has changed here

## Need help?

- With regard to our ideas for a more variable identification of the default language ([#84338: [WIP][FEATURE] Make default language uid configurable](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84338)), we would now like to obtain the opinion of the core team.

## Any last words?
- We are pleased to have completed two patches this month.
- The range of topics discussed is growing and it is somewhat difficult to set the right focus. For this reason, we would like to set a clear sequence of priorities in our upcoming "Current State" document.

## May Team Meeting Minutes

- [2024-05-10, 12:00 am to 13:00 am CET](https://notes.typo3.org/s/_tq-Z1Stl)
- [2024-05-17, 12:00 am to 13:00 am CET](https://notes.typo3.org/s/7h2OsaMDJ)
- [2024-05-24, 12:00 am to 13:00 am CET](https://notes.typo3.org/s/i7jdSxg1G)
- [2024-05-31, 12:00 am to 13:00 am CET](https://notes.typo3.org/s/ftdguxwrE)
