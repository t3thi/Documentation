# TYPO3 Core Extension Analysis: impexp

## 1) Extension Profile

The `impexp` extension provides import and export functionality for TYPO3 database records using XML or the proprietary T3D format. It enables serialization of record trees (pages and their content), manages database relations and file attachments during export, and reconstructs the original record structure with proper reference mapping during import. The extension handles workspace overlays, soft references, and file resource transport between TYPO3 instances.

---

## 2) Relation to Database‑Level Multilinguality

**Rating:** high

**Justification:**

- Queries page translation records via numeric language field constraints (`sys_language_uid > 0`)
- Derives language field names and translation origin pointer field names from TCA schema capabilities (`LanguageAwareSchemaCapability`)
- Filters records by language ID during export via `restrictToLanguageIds` parameter
- Evaluates translation origin pointer values to determine parent-child translation relationships
- Handles language field values during import record mapping and relation restoration
- Explicitly filters out translated pages in tree queries (`sys_language_uid=0`)
- Manages translation source field references (`l10n_source`) during export relation tracking

---

## 3) Observed Code Hotspots (DB Language Logic)

### Export.php

- **Lines 171–178** – `Export::process()` – Schema derivation: Retrieves `transOrigPointerFieldName` and `languageFieldName` from `LanguageAwareSchemaCapability` for pages table
- **Lines 183–192** – `Export::process()` – Value transport: Calls `getTranslationForPage()` to retrieve page translations; integrates translation UIDs into export pagetree structure
- **Lines 199–205** – `Export::process()` – Query filter: Checks translation origin pointer field value; calls `addRecordsForPid()` with language ID restriction when processing translated pages
- **Lines 228–268** – `Export::getTranslationForPage()` – Query construction: Builds QueryBuilder constraints on translation origin pointer and language field; filters for language ID > 0 or specific language IDs
- **Lines 427–439** – `Export::addRecordsForPid()` – Query filter: Derives language field name from schema; skips records not matching `restrictToLanguageIds` during iteration
- **Lines 541–557** – `Export::exportAddRecord()` – Relation tracking: Manually adds `l10n_source` field relations for pages and tt_content (workaround for missing refindex entries)

### Import.php

- **Line 975** – `Import::addSingle()` – Numeric comparison: Checks `sys_language_uid === '0'` for `sys_file_metadata` records
- **Line 1103** – `Import::getSysFileMetaDataFromDatabase()` – Query constraint: Adds `sys_language_uid` equality constraint in QueryBuilder
- **Lines 1044–1053** – `Import::addSingle()` – Persistence logic: Retrieves translation source field name from schema; sets field value to 0 during import data preparation
- **Lines 1229–1246** – `Import::remapRelationsOfField()` – Value transport: Derives translation source field name; handles relation remapping differently for translation source fields (passthrough type)

### ExportPageTreeView.php

- **Line 53** – `ExportPageTreeView::init()` – Query filter: Adds `sys_language_uid=0` constraint to WHERE clause in page tree initialization

---

## 4) Structural Patterns

- **Schema capability-based field name derivation**: Uses `TcaSchema::isLanguageAware()` and `LanguageAwareSchemaCapability` to retrieve language field names (`languageField`, `transOrigPointerField`, `translationSourceField`) instead of hardcoded strings
- **Numeric language ID filtering**: Compares and filters record arrays using numeric language ID values (e.g., `sys_language_uid > 0`, `in_array($record[$languageField], $restrictToLanguageIds)`)
- **QueryBuilder language constraints**: Constructs database query restrictions on language fields using `QueryBuilder::expr()->eq()`, `expr()->gt()`, and `expr()->in()` with language ID parameters
- **Language value propagation**: Passes language ID arrays (`restrictToLanguageIds`, `limitToLanguageIds`) through method signatures to control record filtering at multiple levels
- **Translation relationship traversal**: Reads translation origin pointer field values to identify parent records; recursively fetches related language versions during export
- **Import relation mapping with language field awareness**: During import, checks if a field is a translation source field to determine whether to use passthrough value handling or standard relation remapping

---

## 5) Explicit Non‑Relevant Areas

None identified. All observed language-related code structures directly involve database-level multilingual record handling.

---

## 6) Open Observations

- **Lines 541–557 (Export.php)**: Comment indicates `l10n_source` relations for pages and tt_content are added manually due to missing ReferenceIndex entries. The persistence of this workaround and its interaction with schema-based language field derivation may require validation if ReferenceIndex behavior changes.
- **Line 259 (Export.php)**: Comment explicitly mentions ensuring consistency by checking `sys_language_uid > 0` alongside `l10n_parent` matches. The necessity of this dual-check (schema field + numeric comparison) in relation to schema capability abstractions is unclear from local context.
- **Line 1045 (Import.php)**: Schema capability is retrieved to determine translation source field name, but the relationship between this field and the broader import relation restoration logic (`setRelations()`, `setFlexFormRelations()`) is not fully observable within this file alone.
