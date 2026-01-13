# CLAUDE.md - styleguide Extension Analysis

## 1) Extension Profile

The styleguide extension provides a reference implementation and testing framework for TYPO3 backend capabilities. It generates demo page trees and records that showcase TCA (Table Configuration Array) field types, FormEngine features, and inline relations. The extension serves as both a developer reference for backend editing patterns and a testing infrastructure for verifying core functionality across different field configurations.

---

## 2) Relation to Database-Level Multilinguality

**Rating: medium**

**Justification:**
- TCA configurations declare `languageField`, `transOrigPointerField`, `transOrigDiffSourceField`, and `translationSource` in 70+ table definitions
- `RecordFinder::findPidOfMainTableRecord()` applies QueryBuilder constraint `sys_language_uid = 0` to filter default language pages
- `RecordFinder::findIdsOfDemoLanguages()` compares language ID against `0` to exclude default language from demo language list
- `Generator::create()` directly sets `sys_language_uid`, `l10n_parent`, and `l10n_source` values when creating page translation records
- `AbstractTableHandler::generateTranslatedRecords()` checks `TcaSchemaCapability::Language` before creating translations and issues DataHandler `localize` and `copyToLanguage` commands with numeric language IDs
- Multiple TCA files contain `foreign_table_where` clauses with explicit `sys_language_uid` constraints

---

## 3) Observed Code Hotspots (DB Language Logic)

| File | Class / Method / Area | Type of Interaction |
|------|----------------------|---------------------|
| `Classes/TcaDataGenerator/RecordFinder.php:88-92` | `findPidOfMainTableRecord()` | Query filter: `sys_language_uid = 0` |
| `Classes/TcaDataGenerator/RecordFinder.php:123` | `findIdsOfDemoLanguages()` | Value comparison: `languageId === 0` |
| `Classes/TcaDataGenerator/Generator.php:104-107` | `create()` | Persistence: sets `sys_language_uid`, `l10n_parent`, `l10n_source` |
| `Classes/TcaDataGenerator/TableHandler/AbstractTableHandler.php:69` | `generateTranslatedRecords()` | Schema derivation: `TcaSchemaCapability::Language` check |
| `Classes/TcaDataGenerator/TableHandler/AbstractTableHandler.php:74-100` | `generateTranslatedRecords()` | Value transport: language ID passed to localize/copy commands |
| `Classes/TcaDataGenerator/TableHandler/AbstractTableHandler.php:111-125` | `localizeRecord()` | Persistence: DataHandler `localize` command with language ID |
| `Classes/TcaDataGenerator/TableHandler/AbstractTableHandler.php:135-148` | `copyRecordToLanguage()` | Persistence: DataHandler `copyToLanguage` command with language ID |
| `Classes/TcaDataGenerator/FieldGenerator/TypeInputForceL10nParent.php:29-36` | `match()`, `generate()` | Value generation: matches `l10n_parent` field, returns `0` |
| `Classes/TcaDataGenerator/FieldGenerator/TypePassthroughFieldL10nSource.php:29-41` | `matchArray`, `generate()` | Value generation: matches `l10n_source` passthrough field, returns `0` |
| `Configuration/TCA/tx_styleguide_l10nreadonly.php:428` | `foreign_table_where` | Query filter: `sys_language_uid = 0` |
| `Configuration/TCA/tx_styleguide_elements_select.php:789` | `foreign_table_where` | Query filter: `sys_language_uid = 0 OR l10n_parent = 0` |
| `Configuration/TCA/tx_styleguide_inline_mn_mm.php:31,41` | `foreign_table_where` | Query filter: `sys_language_uid = ###REC_FIELD_sys_language_uid###` |

---

## 4) Structural Patterns

**TCA Language Field Declaration:**
Tables define `languageField => 'sys_language_uid'`, `transOrigPointerField => 'l10n_parent'`, `transOrigDiffSourceField => 'l10n_diffsource'`, and `translationSource => 'l10n_source'` in their `ctrl` section. These declarations appear in 70+ TCA configuration files.

**QueryBuilder Default Language Constraint:**
The pattern `$queryBuilder->expr()->eq('sys_language_uid', $queryBuilder->createNamedParameter(0, Connection::PARAM_INT))` restricts queries to default language records.

**Numeric Language ID Comparison:**
Direct comparison `$language->getLanguageId() === 0` identifies and excludes default language entries from processing lists.

**DataHandler Translation Commands:**
Records are translated using command arrays with `'localize' => $languageId` (connected mode) or `'copyToLanguage' => $languageId` (free mode), where `$languageId` is a numeric identifier.

**TCA Schema Capability Check:**
Before translation generation, `$this->tcaSchemaFactory->get($tableName)->hasCapability(TcaSchemaCapability::Language)` determines whether a table supports translations.

**Direct Language Field Assignment:**
Page translation records are created by directly setting `'sys_language_uid' => $languageUid`, `'l10n_parent' => $newIdOfPage`, and `'l10n_source' => $newIdOfPage` in the data array passed to DataHandler.

**Foreign Table Language Filtering:**
TCA `foreign_table_where` clauses use three patterns:
- Default language only: `sys_language_uid = 0`
- Default or parent records: `sys_language_uid = 0 OR l10n_parent = 0`
- Current record language: `sys_language_uid = '###REC_FIELD_sys_language_uid###'`

---

## 5) Explicit Non-Relevant Areas

| Area | Reason for Exclusion |
|------|---------------------|
| `AbstractGenerator::createSiteConfiguration()` | Creates site configuration with language variants; site-level configuration, not database record language handling |
| `RecordFinder::findHighestLanguageId()` | Iterates site languages to find highest ID; site configuration retrieval, not record filtering |
| TCA `label` and `title` fields with `LLL:EXT:` prefixes | XLIFF label references for UI translation |
| `l10n_mode` and `l10n_display` TCA field settings | FormEngine display behavior, not database-level language processing |
| `allowLanguageSynchronization` TCA behavior setting | FormEngine field synchronization control |
| `KauderwelschService` | Generates random dummy text content; no language field involvement |

---

## 6) Open Observations

- The extension creates demo language IDs dynamically based on existing highest language ID in site configurations; the relationship between site-level language ID assignment and subsequent database record creation spans multiple classes.
- `AbstractTableHandler::generateTranslatedRecords()` implements four distinct translation modes (Danish/copy, German/connected, French/chained, Spanish/copy-from-chain) with different `l10n_parent` and `l10n_source` value combinations; the selection logic relies on array index position rather than language properties.
- `TypeInputForceL10nParent` and `TypePassthroughFieldL10nSource` both return hardcoded `0` values; these generators intercept specific field names during demo data creation.
- Multiple TCA tables use `l18n_parent` (with "18") naming in showitem strings while the ctrl section uses `transOrigPointerField => 'l10n_parent'` (with "10"); actual field creation follows the ctrl configuration.
