---
title: "2024-06 - Translation Handling Initiative - Monthly report"
---

# Translation Handling Initiative: Monthly report
**June 2024**

[← Back to the overview](https://notes.typo3.org/s/f3ae8fZSD)

## What happened since the last report?
- **Documentation and Communication**
    - We have created a ["Current State" document](https://notes.typo3.org/s/RhkYPguwb)
    - The "Current State" document will be updated regularly in the future and represent the current status
    - We spoke to Tymoteusz Motylewski about the TYPO3 product strategy in the field of translation handling
    - In this context we also discussed our self-definition as an initiative
- **Variable identification of the default language**
    - We discussed the possibility of introducing deprecations in v13, paving the way for this patch
    - However, after consulting with the core team, we are now putting further discussions on this topic and the patch [#84338: [WIP][FEATURE] Make default language uid configurable](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84338) on hold in favour of removing `sys_language_uid=-1`
- **Locale**
    - We have looked further into the use of locales in the context of site configuration
    - We have discussed the further handling of the deprecated property `typo3Language` in v13, as its functionality cannot yet be fully replaced
- **Patches**:
    - Continuation of the planning of a "move record" patch regarding [Issue #102345](https://forge.typo3.org/issues/102345)
    - Discussion/Review of patch [#84514: [BUGFIX] Only render working links in language menu](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84514)
- **Planning the next steps regarding the removal of `sys_language_uid=-1`**
  - We have agreed that we want to formulate an official and public mission statement on this subject

## What will happen until the next report?

- Consultations on the removal of `sys_language_uid=-1` with the core team
- Possibly formulation of a mission statement to remove `sys_language_uid=-1`

## Any scope changes?

- **Website-Update**:
> **Please update**
>  - André Buchmann is now our new co-lead. This has been agreed with all those involved.
>  - Please change the name and position of André Buchmann and Sven Wappler accordingly
- **Scope of our initiative**
  - So far, nothing has changed here

## Need help?
- We would like to see an approved and robust mission statement for the removal of `sys_language_uid=-1`
- We need support to go the right way when it comes to officially deprecating `sys_language_uid=-1`

## Any last words?
- We have decided that we now want to concentrate more on the goal of removing `sys_language_uid=-1`, as otherwise this will get in the way of all other endeavours.
- In this respect, we would like to ensure that we have an official mission statement, as this is a major remodelling project

## June Team Meeting Minutes

- [2024-06-07, 12:00 am to 13:00 am CET](https://notes.typo3.org/s/bOmHztnp4)
- [2024-06-14, 12:00 am to 13:00 am CET](https://notes.typo3.org/s/75adkC7sT)
- [2024-06-21, 12:00 am to 13:00 am CET](https://notes.typo3.org/s/l0_ju_W5Z)
- [2024-06-28, 12:00 am to 13:00 am CET](https://notes.typo3.org/s/GQwWxdUKO)
