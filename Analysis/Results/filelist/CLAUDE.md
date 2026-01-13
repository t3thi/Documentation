# CLAUDE.md – Database-Level Language Analysis

**Extension:** filelist
**Analysis Date:** 2026-01-12

---

## 1) Extension Profile

The filelist extension provides the TYPO3 backend "Media" module for managing files in FAL (File Abstraction Layer) storages. It implements file and folder browsing, metadata editing, search functionality, and file operations (upload, delete, copy, rename) through both a dedicated backend module and element browser components. The extension operates primarily on file system resources via the FAL API and presents file metadata stored in database tables.

---

## 2) Relation to Database-Level Multilinguality

**Rating:** low

**Justification:**

The extension's primary domain is file system resources (files and folders), which are not inherently language-dependent. Database-level language handling occurs exclusively in the context of `sys_file_metadata` translations. File metadata records can have language variants, and the extension queries, filters, and presents these translations when building the translation dropdown UI. The extension also enforces access control by checking user permissions for default language (0) metadata editing. No language filtering or overlay logic is applied to file listings themselves, as files are language-agnostic resources.

---

## 3) Observed Code Hotspots (DB Language Logic)

### Classes/FileList.php:621-653
- **Method:** `getTranslationsForMetaData()`
- **Type:** Query for translations
- **Details:** Queries `sys_file_metadata` table using QueryBuilder. Retrieves translation records where the translation origin pointer matches the parent record UID and language field value is greater than 0. Language field name and translation origin pointer field name are derived via `LanguageAwareSchemaCapability`. Retrieved translations are indexed by language ID.

### Classes/FileList.php:1235-1239
- **Method:** `createControlTranslation()`
- **Type:** Numeric language value comparison
- **Details:** Filters system languages array using `array_filter` with condition `$languageRecord['uid'] > 0 && $backendUser->checkLanguageAccess($languageRecord['uid'])`. Explicitly excludes default language (0) and all languages (-1) from translation dropdown options.

### Classes/FileList.php:280
- **Method:** `renderTiles()`
- **Type:** Value transport
- **Details:** Assigns `defaultLanguageAccess` boolean to view by checking `$this->getBackendUser()->checkLanguageAccess(0)`. Result is used in frontend for conditional rendering.

### Classes/FileList.php:540-542
- **Method:** `renderListTableBody()`
- **Type:** Value transport
- **Details:** Conditionally adds `data-default-language-access` attribute to table row HTML attributes when user has access to default language (0).

### Classes/FileList.php:1083
- **Method:** `createControlEditMetaData()`
- **Type:** Access control check
- **Details:** Returns null (no button) if user lacks access to default language (0), preventing metadata editing UI from appearing.

### Classes/FileList.php:1396
- **Method:** `createControlUpdateOnlineMedia()`
- **Type:** Access control check
- **Details:** Returns null (no button) if user lacks access to default language (0), preventing online media metadata refresh.

### Classes/Controller/FileListController.php:408
- **Method:** `mainAction()`
- **Type:** Access control check
- **Details:** Checks `checkLanguageAccess(0)` before assigning edit action configuration to view. Controls whether inline metadata editing is available.

### Classes/ContextMenu/ItemProviders/FileProvider.php:250
- **Method:** `canEditMetadata()`
- **Type:** Access control check
- **Details:** Includes `checkLanguageAccess(0)` in boolean chain determining if context menu metadata edit item should be available.

---

## 4) Structural Patterns

### TCA Schema-Based Field Name Derivation
The extension uses `TcaSchemaFactory` to obtain the `sys_file_metadata` schema and checks `isLanguageAware()` before attempting language operations. When language awareness is confirmed, `LanguageAwareSchemaCapability` is retrieved to dynamically obtain the language field name and translation origin pointer field name. This avoids hardcoded field names.

### QueryBuilder Language Constraint Pattern
Queries for metadata translations use `QueryBuilder` with two constraints: equality check on translation origin pointer field (comparing to parent record UID via `Connection::PARAM_INT`) and greater-than check on language field (comparing to 0 via `Connection::PARAM_INT`). This retrieves only actual translations, excluding default language records.

### Language ID as Array Key
Translation records fetched from the database are reorganized into an associative array where keys are language IDs extracted from the language field of each record. This structure supports direct lookup by language ID when building translation UI.

### Default Language Access Guard
Multiple methods perform early-return or conditional logic based on `$this->getBackendUser()->checkLanguageAccess(0)`. This enforces a rule that metadata editing operations require access to the default language, regardless of which language variant is being edited.

### System Language Filtering
When populating translation dropdowns, the extension filters the full system languages array with `$languageRecord['uid'] > 0 && $backendUser->checkLanguageAccess($languageRecord['uid'])`. This removes default language (0), all languages (-1), and any languages the user lacks permission to access.

---

## 5) Explicit Non-Relevant Areas

### LanguageService Usage
All instances of `$this->getLanguageService()` and `LanguageService::sL()` calls are for retrieving translated UI labels from XLIFF files. These are presentation-layer concerns, not database-level language handling.

### File and Folder Operations
Classes under `Classes/ElementBrowser/`, `Classes/Matcher/`, and file operation methods in controllers do not involve language logic. Files and folders are language-agnostic resources; operations like upload, delete, rename, and copy have no language dimension.

### Search and Filtering
`FileSearchDemand` and search-related code in `FileList::render()` operate on file names, extensions, and metadata values without language-specific filtering or awareness.

### Pagination and Sorting
`ResourceCollectionPaginator` and sorting logic in `FileList::sortResources()` operate on resource properties (name, size, modification time) without language context.

### Online Media Helpers
`OnlineMediaHelperRegistry` and online media metadata refresh logic operates on file objects and metadata without language-specific processing beyond the default language access check.

---

## 6) Open Observations

### Metadata Translation Creation Flow
The `createControlTranslation()` method generates dropdown items for creating or editing metadata translations. For existing translations, it builds standard edit URIs. For missing translations, it creates `typo3-backend-localization-button` web component tags with attributes for record type, UID, and target language. The actual translation creation mechanism invoked by this web component is external to this extension.

### Language Field Value Greater-Than-Zero Pattern
The query constraint `$languageCapability->getLanguageField()->getName() > 0` filters out both default language (0) and potentially all languages (-1). The comment on line 1235 explicitly mentions both values, but the query constraint only uses greater-than-zero. Whether negative language values exist in `sys_file_metadata` or whether -1 records would be included/excluded by other query restrictions is not determinable from local code.

### Default Language Access Requirement
The extension consistently requires default language access for any metadata editing operation, even when editing a translation. Whether this is a business rule specific to file metadata or a broader TYPO3 pattern cannot be determined from this extension's code alone.

### Translation Origin Pointer Always Parent UID
The query for translations uses `$metaDataRecord['uid']` as the translation origin pointer value. No handling for nested translations or translation chains is present. Whether `sys_file_metadata` supports such scenarios is not evident in this code.
