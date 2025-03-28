---
title: "2024-09 - Translation Handling Initiative - Monthly report"
---

# Translation Handling Initiative: Monthly report
**September 2024**

[← Back to the overview](https://notes.typo3.org/s/f3ae8fZSD)

## What happened since the last report?

- **Inline Records and Language Copy Operations**
    - Issues with IRRE child elements not inheriting the correct language during copy operations remain unresolved.
    - Investigations into `copyToLanguage` and `copy` processes in the DataHandler are ongoing.

- **MM Relations and Language Consistency**
    - Problems persist with inconsistent MM relations when records in different languages are linked.
    - A translation-parent field is being considered to improve relation handling.

- **Migration Path for Language `-1`**
    - Strategies for removing `sys_language_uid=-1` were discussed, including an upgrade wizard to transition to language `0`.
    - Ensuring backward compatibility without `-1` remains a key focus.

- **TYPO3 Camp Munich**
    - Team members attended the event and exchanged insights on translation handling challenges.

## What will happen until the next report?

- Continue work on inline record handling and language copy operations.
- Refine solutions for MM relation consistency.
- Advance the migration path for language `-1` deprecation.

## Any scope changes?

- **Scope of our initiative**: No changes.

## Need help?

- Review of DataHandler adjustments for language copy processes.
- Feedback on improving MM relation consistency.
- Guidance for the deprecation and migration of language `-1`.

## Any last words?

- Dealing with the issues brought to us by the community sharpened our focus on the internal core processes.
- At the same time, we have taken small steps towards our main goal: the deprecation of language `-1`.

## September Team Meeting Minutes

- [2024-09-06](https://notes.typo3.org/s/NyANNnbZ3)
- [2024-09-13](https://notes.typo3.org/s/2CyjIgYfC)
- [2024-09-20](https://notes.typo3.org/s/UwIbZ6el0)
- [2024-09-27](https://notes.typo3.org/s/jFpzn3E6J)
