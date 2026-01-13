# CLAUDE.md - linkvalidator Extension Analysis

## 1) Extension Profile

The linkvalidator extension provides a backend module for detecting and reporting broken links within TYPO3 content records. It scans configured database tables and fields for soft references (internal page links, external URLs, file references), validates link targets, and persists broken link information in a dedicated database table (`tx_linkvalidator_link`). The extension supports scheduled link checking via the Scheduler extension and provides email notification capabilities for broken link reports.

## 2) Relation to Database-Level Multilinguality

**Rating: high**

Justification:
- The extension stores a `language` field in its `tx_linkvalidator_link` table with a default value of `-1`
- Language field values are read from source records via TCA Schema API (`TcaSchemaCapability::Language`)
- Query restrictions filter broken link results by backend user's `allowed_languages` permission
- Page translations are explicitly queried using `sys_language_uid` and `l10n_parent` fields
- The scheduler task accepts a `languages` parameter to limit validation scope to specific language IDs
- Broken link retrieval supports language filtering via the `getAllBrokenLinksForPages()` method

## 3) Observed Code Hotspots (DB Language Logic)

| File Path | Class/Method | Type of Interaction |
|-----------|--------------|---------------------|
| `Classes/LinkAnalyzer.php:141-144` | `LinkAnalyzer::getLinkStatistics()` | Schema derivation - retrieves language field name via `TcaSchemaCapability::Language` |
| `Classes/LinkAnalyzer.php:221-226` | `LinkAnalyzer::checkLinks()` | Value transport - extracts language value from source record and assigns to broken link record; defaults to `-1` |
| `Classes/QueryRestrictions/EditableRestriction.php:99-108` | `EditableRestriction::getAllowedLanguagesForCurrentUser()` | Value derivation - parses `allowed_languages` from backend user group data |
| `Classes/QueryRestrictions/EditableRestriction.php:242-257` | `EditableRestriction::buildExpression()` | Query filter - adds language constraint comparing `tx_linkvalidator_link.language` against allowed language IDs and `-1` |
| `Classes/Result/LinkAnalyzerResult.php:98` | `LinkAnalyzerResult::getResultForTask()` | Value transport - parses language IDs from comma-separated string parameter |
| `Classes/Result/LinkAnalyzerResult.php:210-212` | `LinkAnalyzerResult::processBrokenLinks()` | Value comparison - checks if language > 0 to determine localized page lookup |
| `Classes/Result/LinkAnalyzerResult.php:250-266` | `LinkAnalyzerResult::getLocalizedPageId()` | Query filter - queries pages table using `TranslationOriginPointerField` and `LanguageField` from TCA Schema |
| `Classes/Repository/PagesRepository.php:164-175` | `PagesRepository::getTranslationForPage()` | Query filter - constrains query by `l10n_parent` and `sys_language_uid` |
| `Classes/Repository/BrokenLinkRepository.php:237-324` | `BrokenLinkRepository::getAllBrokenLinksForPages()` | Query filter - applies language array constraint on `language` column when provided |
| `Classes/Controller/LinkValidatorController.php:384-385` | `LinkValidatorController::generateTableRow()` | Value read - retrieves language value from broken link row for display |
| `Classes/Controller/LinkValidatorController.php:429-437` | `LinkValidatorController::getSystemLanguageValue()` | Value read - looks up language metadata (title, flagIcon) via `TranslationConfigurationProvider` |
| `Classes/Task/ValidatorTask.php:91,179,344,356` | `ValidatorTask` | Value transport - stores/retrieves languages parameter for scheduled validation |
| `ext_tables.sql:6` | Table schema | Persistence - defines `language` column with default `-1` |

## 4) Structural Patterns

### Numeric Language Value Comparisons
- Comparison against `-1` to represent "all languages" marker: `EditableRestriction.php:250-253`
- Comparison of language value > 0 to determine if localized page lookup is needed: `LinkAnalyzerResult.php:210`

### QueryBuilder Constraints on Language Fields
- `IN` constraint for language filtering: `BrokenLinkRepository.php:289-294`
- `EQ` constraint against specific language ID: `LinkAnalyzerResult.php:259-261`
- `EQ` constraint against `-1` (all languages marker): `EditableRestriction.php:250-253`
- `IN` constraint on `sys_language_uid`: `PagesRepository.php:171-174`

### Language Values in Domain Objects/DTOs
- `$record['language']` assignment during broken link creation: `LinkAnalyzer.php:223,225`
- `$this->languages` property in `ValidatorTask` class
- `$this->allowedLanguages` array in `EditableRestriction` class

### Language Field Name Derivation via TCA Schema APIs
- `$schema->getCapability(TcaSchemaCapability::Language)->getLanguageField()->getName()`: `LinkAnalyzer.php:143,221`
- `$languageCapability->getTranslationOriginPointerField()->getName()`: `LinkAnalyzerResult.php:256`
- `$languageCapability->getLanguageField()->getName()`: `LinkAnalyzerResult.php:260`

### Propagation of Language Values Through Services
- Language IDs passed from `ValidatorTask` through `LinkAnalyzerResult::getResultForTask()` to `BrokenLinkRepository::getAllBrokenLinksForPages()`
- Language IDs parsed from backend user `groupData['allowed_languages']` and applied in `EditableRestriction`

## 5) Explicit Non-Relevant Areas

| Location | Description |
|----------|-------------|
| `Resources/Private/Language/*.xlf` | XLIFF translation files for UI labels - not database-level language logic |
| `Classes/Task/ValidatorTask.php:$languageFile` | Property storing path to XLIFF file for localized error messages |
| `Classes/Task/ValidatorTask.php` (various lines) | `$this->getLanguageService()->sL()` calls for UI label translation |
| `Classes/Controller/LinkValidatorController.php` | `$this->getLanguageService()` calls for UI label translation |
| `Classes/Linktype/InternalLinktype.php:35` | Comment showing URL format `t3://page?uid=123&_language=1` - documentation only |
| `Classes/Result/LinkAnalyzerResult.php:217` | `$site->getLanguageById()->getLocale()->getLanguageCode()` - site language configuration lookup for display purposes |

## 6) Open Observations

- The default value `-1` for the `language` column in `tx_linkvalidator_link` is used when source records lack language awareness or when the language field value cannot be determined. The semantic meaning of `-1` as "all languages" versus "undefined" is not locally documented.
- The `languages` parameter in `ValidatorTask` accepts a comma-separated string of language IDs but no validation of these IDs against existing site languages occurs at task configuration time.
- The `EditableRestriction` class returns an empty array from `getAllowedLanguagesForCurrentUser()` when the user has no language restrictions, which results in no language constraint being added to queries. This behavior differs from the pattern of explicit `-1` handling elsewhere.
- The relationship between the `language` value stored in `tx_linkvalidator_link` and the original record's workspace state is not observable from local code.
