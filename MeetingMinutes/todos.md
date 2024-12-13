---
title: "Translation Handling Initiative - Current TODOs"
---

# Translation Handling Initiative<br>Current TODOs

## Immediately

- 🔲 Finalization of Jos Patch to standardize the translation process between content and pages or records in general<br>In particular: Adaptation of all functional tests
- 🔲 Make `OVERLAYS_ON` and `OVERLAYS_ON_WITH_FLOATING` language fallback types distinguishable in Site Configuration
- 🔲 

## Further elaboration

- 🔲 Examine ways of ensuring that the mixed mode can no longer be produced editorially
- 🔲 Work out ways to remove the value -1 "All languages" in the [languageField](https://docs.typo3.org/m/typo3/reference-tca/main/en-us/Ctrl/Properties/LanguageField.html) `sys_language_uid`
  - Introduction of an "All Languages" bool field for default language data records
- 🔲 Find a way to replace integer as language ID with a BCP47 string
- 🔲 Further elaboration of the community survey

## Deepen understanding

- 🔲 View and understand functional tests of the core with regard to translation handling
- 🔲 