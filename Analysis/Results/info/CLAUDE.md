# CLAUDE.md – EXT:info

## 1) Extension Profile

EXT:info provides a TYPO3 Backend module (Web > Info) for displaying page tree information and translation status overviews. The extension offers two main sub-modules: one for displaying configurable page property lists in a tree structure, and one for visualizing the translation status of pages across site languages. It operates as a read-only information display without direct data modification capabilities.

---

## 2) Relation to Database-Level Multilinguality

**Rating: high**

Justification:
- `TranslationStatusController` queries `pages` table using language field constraints derived from TCA schema
- `TranslationStatusController` queries `tt_content` table filtering by `sys_language_uid` to count content elements per language
- `PageInformationController` filters page queries by language field value (explicitly querying for `= 0` to fetch default language records)
- Both controllers derive language and translation origin field names dynamically via `LanguageAwareSchemaCapability`
- Numeric language ID comparisons (`=== 0`, `> 0`) control query construction and display logic
- `BackendUtility::getRecordLocalization()` is used to retrieve translated page records

---

## 3) Observed Code Hotspots (DB Language Logic)

| File | Class / Method | Interaction Type |
|------|---------------|------------------|
| `Classes/Controller/TranslationStatusController.php` | `getLangStatus()` | Query filter on `languageField` and `translationOriginPointerField` |
| `Classes/Controller/TranslationStatusController.php` | `getContentElementCount()` | Query filter on `sys_language_uid` |
| `Classes/Controller/TranslationStatusController.php` | `renderL10nTable()` | Numeric language ID comparison for iteration |
| `Classes/Controller/TranslationStatusController.php` | `getAllowedModuleOptions()` | Language ID extraction for menu building |
| `Classes/Controller/PageInformationController.php` | `getTable_pages()` | Language field name derivation via schema; translation origin field access |
| `Classes/Controller/PageInformationController.php` | `getTreeRootPage()` | Query filter on `languageField` and `translationOriginPointerField` |
| `Classes/Controller/PageInformationController.php` | `getPageRecordsRecursive()` | Query filter on `languageField = 0` |
| `Classes/Controller/PageInformationController.php` | `pages_drawItem()` | Language field name derivation; value transport to display |
| `Classes/Controller/PageInformationController.php` | `getLanguageInformation()` | Numeric language ID used for lookup |
| `Configuration/page.tsconfig` | Field definitions | `sys_language_uid` listed as display field |

---

## 4) Structural Patterns

- **Schema-based field name derivation**: Language field and translation origin pointer field names are retrieved via `TcaSchemaCapability::Language` and `LanguageAwareSchemaCapability`, not hardcoded
- **QueryBuilder constraints on language fields**: `$queryBuilder->expr()->eq($languageFieldName, ...)` pattern used consistently for filtering records by language
- **Numeric language ID comparisons**: Direct integer comparisons (`$languageId === 0`, `$language > 0`) determine query branches and iteration behavior
- **Hardcoded `sys_language_uid` reference**: Content element count query in `TranslationStatusController::getContentElementCount()` uses literal field name for `tt_content`
- **Language value propagation**: Numeric language values flow from module data (user selection) through method parameters into query constraints
- **Translation record retrieval**: `BackendUtility::getRecordLocalization()` called with numeric language ID to fetch localized page records

---

## 5) Explicit Non-Relevant Areas

| Area | Reason for Exclusion |
|------|---------------------|
| `SiteLanguage` objects in `$this->siteLanguages` | Used for UI display (titles, flags) and menu building, not database-level filtering |
| `SiteLanguage::getTitle()`, `SiteLanguage::getFlagIdentifier()` | Presentation layer only |
| XLIFF references (`LLL:EXT:...`) | UI label translations, not database record language handling |
| `PageTranslationVisibility` / `l18n_cfg` evaluation | Page visibility configuration flags, not language field filtering |
| Template files (`*.fluid.html`) | Presentation layer, no database queries |

---

## 6) Open Observations

- `TranslationStatusController::getContentElementCount()` uses hardcoded string `'sys_language_uid'` rather than schema-derived field name; unclear if intentional or legacy pattern
- `PageInformationController::getPageRecordsRecursive()` always filters by `$languageFieldName = 0` at query level, then applies `BackendUtility::getRecordLocalization()` post-hoc for non-zero languages; pattern differs from direct language-filtered queries elsewhere
- The module data key `'lang'` stores the user-selected language ID; its propagation path through multiple method calls could affect how language values reach queries
- `initializeSiteLanguages()` methods in both controllers populate arrays keyed by language ID from site configuration; downstream usage varies between display and potential query influence
