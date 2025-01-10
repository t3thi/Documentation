---
title: "2024-10 - Translation Handling Initiative - Monthly report"
---

# Translation Handling Initiative: Monthly report
**October 2024**

[← Back to the overview](https://notes.typo3.org/s/f3ae8fZSD)

## What happened since the last report?

- **Inline Records and Language Copy Operations**
    - Investigated issues with child elements not inheriting the correct language during copy operations.
    - A patch to update inline elements after copying was proposed and is under review.

- **MM Relations and Language Consistency**
    - Discussed ensuring MM relations link records in the same language.
    - Considered generating missing translations (hidden by default) to maintain consistency.

- **Language `-1` Sorting Tests**
    - Developed test cases to resolve sorting inconsistencies for language `-1`.
    - Identified failures in free mode due to identical sorting values.

- **Strategic Concept for Translation Handling**
    - Proposed creating a strategic document to align objectives and secure future funding.

- **TCA Adjustments for Language Synchronization**
    - Discussed changes to `behaviour` configurations, preparing for `enforceLanguageSynchronization`.
    - Suggested states: none, `allowLanguageSynchronization`, and `enforceLanguageSynchronization`.

## What will happen until the next report?

- Finalize the patch for inline element handling.
- Define solutions for consistent MM relations and translation gaps.
- Continue refining sorting behavior for language `-1`.
- Start drafting the strategic document for translation handling.

## Any scope changes?

- **Scope of our initiative**: No changes.

## Need help?

- Review of the inline element handling patch.
- Feedback on MM relation strategies and test cases.
- Support for drafting the strategic document and TCA adjustments.

## Any last words?

- Progress is being made on fixes and long-term improvements.

## October Team Meeting Minutes

- [2024-10-04](https://notes.typo3.org/s/RX64ozM6e)
- [2024-10-18](https://notes.typo3.org/s/8vI0MnUbs)
- [2024-10-25](https://notes.typo3.org/s/zhyro-T1z)  
