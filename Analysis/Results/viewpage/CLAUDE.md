# CLAUDE.md – viewpage

## 1) Extension Profile

The viewpage extension provides a backend module ("Web > View" / "Content > Preview") that renders frontend pages inside an iframe within the TYPO3 backend. The module includes responsive preview presets allowing editors to view pages at different viewport sizes. The controller generates preview URLs via PreviewUriBuilder and manages language selection through a dropdown menu in the document header.

---

## 2) Relation to Database-Level Multilinguality

**Rating: low**

Justification:
- The extension consumes numeric language identifiers from `PageContext` but does not query or persist language-related database fields directly
- Language-dependent page retrieval is delegated entirely to `PageRepository::getPage()`, `PageRepository::getPageOverlay()`, and `PageRepository::isPageSuitableForLanguage()`
- The fallback to language ID `0` occurs when the selected language is not in the available preview languages
- No direct QueryBuilder constraints on `sys_language_uid` or related fields exist within this extension

---

## 3) Observed Code Hotspots (DB Language Logic)

| File | Class / Method | Type of Language Interaction |
|------|----------------|------------------------------|
| `Classes/Controller/ViewModuleController.php` | `handleRequest()` | Reads numeric language ID from `PageContext::getPrimaryLanguageId()`; fallback to `0` |
| `Classes/Controller/ViewModuleController.php` | `handleRequest()` | Passes language ID to `PreviewUriBuilder::withLanguage()` for URL generation |
| `Classes/Controller/ViewModuleController.php` | `getPreviewLanguages()` | Iterates `LanguageItem` objects from `PageContext->languageInformation` |
| `Classes/Controller/ViewModuleController.php` | `getPreviewLanguages()` | Calls `PageRepository::getPageOverlay()` with language ID parameter |
| `Classes/Controller/ViewModuleController.php` | `getPreviewLanguages()` | Calls `PageRepository::isPageSuitableForLanguage()` for language availability check |
| `Classes/Controller/ViewModuleController.php` | `registerDocHeader()` | Generates language selector URLs with `languages` array parameter containing numeric IDs |
| `Tests/Fixtures/pages_languages.csv` | Test data | Contains `sys_language_uid` and `l10n_parent` columns for page records |

---

## 4) Structural Patterns

- **Numeric language ID retrieval via PageContext**: The controller obtains the current language ID through `$this->pageContext->getPrimaryLanguageId()`, which returns an integer value
- **Fallback to default language**: When the selected language ID is not present in the available preview languages, the code explicitly falls back to `$languageId = 0`
- **Delegation to PageRepository for overlay logic**: Language-specific page retrieval uses `PageRepository::getPageOverlay($page, $languageId)` rather than direct database queries
- **Language availability filtering**: The method `getPreviewLanguages()` filters `LanguageItem` objects by calling `PageRepository::isPageSuitableForLanguage()` to determine which languages have valid page content
- **Language ID propagation to URL builders**: Numeric language IDs are passed to `PreviewUriBuilder::withLanguage()` and included in route parameters as `['languages' => [$languageId]]`

---

## 5) Explicit Non-Relevant Areas

| Area | Reason for Exclusion |
|------|---------------------|
| `Resources/Private/Language/*.xlf` | UI label translations (XLIFF), not database-level language logic |
| `LanguageItem::getTitle()`, `LanguageItem::getFlagIdentifier()` | Site configuration language display properties |
| `LanguageAspectFactory::createFromSiteLanguage()` | Site language configuration object creation |
| `Configuration/Backend/Modules.php` | Module registration, no language field handling |
| `Resources/Private/Templates/*.fluid.html` | Rendering templates with LLL label references |
| `LANGUAGE_PRESETS` constant in tests | Site configuration language setup, not database field values |

---

## 6) Open Observations

- `PageContext::getPrimaryLanguageId()` returns a numeric language identifier; the derivation mechanism from user preferences or request parameters is not visible in local code
- `PageContext->languageInformation->languageItems` collection: the source and population of this collection is external to this extension
- `LanguageItem::isAvailable()` filtering: the criteria for language availability are determined externally
- The test constant `LANGUAGE_PRESETS` defines language IDs (`0`, `1`, `2`) that correspond to test fixture `sys_language_uid` values, but the binding between site configuration and database records is managed elsewhere
