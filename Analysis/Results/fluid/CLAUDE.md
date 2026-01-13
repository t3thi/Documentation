# CLAUDE.md – fluid

## 1) Extension Profile

The Fluid extension integrates the TYPO3Fluid templating engine into TYPO3 CMS. It provides the RenderingContext factory, ViewHelper resolver infrastructure, and a comprehensive set of ViewHelpers for template rendering in both frontend and backend contexts. The extension handles template compilation, caching, and exposes rendering capabilities through a standardized API consumed by other TYPO3 extensions.

---

## 2) Relation to Database-Level Multilinguality

**Rating: none**

Justification:
- No TCA configuration files exist in the extension
- No SQL schema files (`ext_tables.sql`) are present
- No domain models or repository classes exist
- No QueryBuilder usage or database query construction occurs
- No LanguageAspect usage for data access
- No evaluation or filtering of `sys_language_uid` or equivalent language fields in code
- The extension operates exclusively at the presentation/rendering layer

---

## 3) Observed Code Hotspots (DB Language Logic)

None.

The extension contains no code that reads, compares, propagates, or derives database-level language information.

---

## 4) Structural Patterns

None.

The extension contains no database-language-related code patterns. There are no:
- Numeric language value comparisons in database context
- QueryBuilder constraints on language fields
- Language values stored in domain objects
- Language field derivation via TCA or schema APIs
- Propagation of language values into persistence logic

---

## 5) Explicit Non-Relevant Areas

| Area | File(s) | Reason for Exclusion |
|------|---------|---------------------|
| Translation ViewHelper | `Classes/ViewHelpers/TranslateViewHelper.php` | Handles XLIFF/LLL label resolution, not database records |
| Date formatting locale | `Classes/ViewHelpers/Format/DateViewHelper.php` | Uses locale for display formatting, not database queries |
| Link language parameter | `Classes/ViewHelpers/Uri/PageViewHelper.php`, `Link/PageViewHelper.php`, `Uri/ActionViewHelper.php`, `Link/ActionViewHelper.php`, `Uri/TypolinkViewHelper.php`, `Link/TypolinkViewHelper.php` | Passes language value to URL generation services; no database interaction |
| Country select localization | `Classes/ViewHelpers/Form/CountrySelectViewHelper.php` | Uses `alternativeLanguage` for label translation, not database queries |
| Backend LanguageService usage | `Classes/ViewHelpers/Be/PageRendererViewHelper.php`, `Be/PagePathViewHelper.php` | Accesses `$GLOBALS['LANG']` for UI label translation |
| Test fixture CSV files | `Tests/Functional/Fixtures/pages.csv`, `Tests/Functional/Fixtures/ViewHelpers/ImageViewHelper/fal_image.csv` | Test data containing `sys_language_uid` column, not runtime code |

---

## 6) Open Observations

| Observation | Location |
|-------------|----------|
| The `language` argument in link ViewHelpers accepts string values including numeric IDs and "current"; these values are passed downstream to LinkFactory/UriBuilder without local interpretation | `Classes/ViewHelpers/Uri/PageViewHelper.php:150-152`, `Classes/ViewHelpers/Uri/ActionViewHelper.php` |
| ExtbaseUriBuilder's `setLanguage()` receives the language parameter from ViewHelpers; the resolution of this value to actual language records occurs outside the Fluid extension | `Classes/ViewHelpers/Uri/PageViewHelper.php:203` |
