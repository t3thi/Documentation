# CLAUDE.md – fluid_styled_content

## 1) Extension Profile

The fluid_styled_content extension provides Fluid‑based templates and TypoScript configurations for rendering TYPO3 frontend content elements. It defines presentation logic for standard content types (text, image, table, menu variants, etc.) through FLUIDTEMPLATE objects and DataProcessors. This extension operates exclusively at the frontend rendering layer and contains minimal PHP code (one ViewHelper for image popup links).

---

## 2) Relation to Database‑Level Multilinguality

**Rating:** none

**Justification:**

The extension contains no code that reads, compares, propagates, or derives database‑level language information. All PHP classes operate on already‑fetched data structures without accessing language fields. TypoScript configurations delegate data retrieval to Core‑provided content objects (FLUIDTEMPLATE, RECORDS) and DataProcessors (menu, files) which may internally handle language resolution, but this extension implements no language‑specific query logic, filtering, or persistence. Test fixtures reference language fields (sys_language_uid, l18n_parent, l10n_source) for test data structure only, not processing logic.

---

## 3) Observed Code Hotspots (DB Language Logic)

None.

---

## 4) Structural Patterns

None.

---

## 5) Explicit Non‑Relevant Areas

**Test Fixtures (Language Structure Definition):**
- Tests/Functional/Rendering/Fixtures/SecureHtmlScenario.yaml:7 – columnNames mapping includes sys_language_uid
- Tests/Functional/Rendering/Fixtures/SecureHtmlScenario.yaml:13 – languageColumnNames for pages table
- Tests/Functional/Rendering/Fixtures/SecureHtmlScenario.yaml:18 – languageColumnNames for tt_content table

These entries define test data structure for the TYPO3 Testing Framework DataHandler but do not represent processing logic within the extension.

**Site Configuration (Excluded by Scope):**
- Tests/Functional/Rendering/SecureHtmlRenderingTest.php:36-38 – LANGUAGE_PRESETS constant with ISO codes and locale
- Tests/Functional/Rendering/SecureHtmlRenderingTest.php:49 – buildDefaultLanguageConfiguration for site setup

**UI Translation Infrastructure (Excluded by Scope):**
- Tests/Functional/Rendering/SecureHtmlRenderingTest.php:21 – LanguageServiceFactory for backend user language
- Resources/Private/Language/locallang.xlf – XLIFF label translations
- Configuration/Sets/FluidStyledContent/labels.xlf – XLIFF label translations

**Rendering Configuration (No DB Language Logic):**
- All Configuration/TypoScript/*.typoscript files – Define FLUIDTEMPLATE and DataProcessor configurations without language‑specific query constraints
- Classes/ViewHelpers/Link/ClickEnlargeViewHelper.php:58-80 – Operates on FileInterface and ContentObjectRenderer without accessing language fields

---

## 6) Open Observations

None.
