# TYPO3 Core Extension: workspaces

## 1) Extension Profile

The workspaces extension provides workspace functionality for versioning and staged publishing of content records within TYPO3. It manages draft versions of records that exist in custom workspaces, implements multi-stage approval workflows, and coordinates the publishing process that swaps versioned records with their live counterparts. The extension handles version integrity, dependency resolution, and reference index maintenance during publishing operations.

---

## 2) Relation to Database‑Level Multilinguality

**Rating:** high

**Justification:**

- Updates `l10n_parent` and `l10n_source` fields during publishing operations to maintain translation relationships
- Queries records by translation parent field values to locate dependent translations
- Filters queries by numeric `sys_language_uid` values for language-specific record selection
- Derives language field names dynamically from TCA schema language capabilities
- Validates translation integrity by checking if parent records are new in workspace
- Evaluates numeric language field values to determine if records are translations (value > 0)
- Checks backend user language access permissions before including records in workspace operations
- Propagates language identifier values for preview URL generation

---

## 3) Observed Code Hotspots (DB Language Logic)

### Classes/Hook/DataHandlerHook.php
- **Line 353-355** (`version_swap`) – Field preservation: Keeps translation origin pointer field during version swap
- **Line 408** (`version_swap`) – Method invocation: Calls `updateL10nOverlayRecordsOnPublish()` to update translation relationships
- **Lines 476-540** (`updateL10nOverlayRecordsOnPublish`) – Translation parent updates: Queries translations by `l10n_parent`/`l10n_source`, updates fields to point to live record
- **Lines 488-494** – Schema capability: Derives `l10n_parent` and `l10n_source` field names from TCA schema
- **Lines 504-516** – Query constraints: Builds OR constraint matching either `l10n_parent` or `l10n_source` fields
- **Lines 518-539** – Field updates: Updates translation parent/source fields and reference index per translation record
- **Lines 666-710** (`updateReferenceIndexForL10nOverlays`) – Reference index: Updates reference index for translations after publishing new records
- **Lines 677-691** – Query structure: Similar translation parent query pattern with workspace filtering

### Classes/Service/IntegrityService.php
- **Lines 85-124** (`checkElement`) – Integrity validation: Checks workspace localization integrity for translation records
- **Lines 93-98** – Schema derivation: Gets language field and translation origin pointer field from schema capability
- **Line 101** – Language comparison: Checks if `languageField > 0` to detect translation records
- **Line 103** – Parent retrieval: Fetches translation parent record by translation origin pointer value
- **Lines 105-121** – State validation: Issues warning if translation parent is new placeholder in workspace

### Classes/Service/WorkspaceService.php
- **Lines 256-367** (`selectAllVersionsFromPages`) – Version selection: Queries versioned records with language field handling
- **Lines 267-269** – Empty result: Returns empty array if not language-aware but language filter specified
- **Lines 275-278** – Field selection: Adds language field and translation origin pointer to SELECT clause
- **Lines 301-318** – Translation filtering: For pages table, includes translation origin pointer in WHERE clause
- **Lines 330-335** – Language constraint: Filters by language field value when language parameter specified
- **Lines 373-480** (`getNewVersionsForPages`) – New version selection: Handles language fields for new placeholder records
- **Lines 389-391** – Early return: Returns empty if table not language-aware but language requested
- **Lines 393-394** – Field derivation: Gets language field and translation origin pointer field names
- **Lines 404-407** – Field addition: Adds language fields to SELECT if table is language-aware
- **Lines 421-437** – Page filtering: Uses translation origin pointer for translated page filtering
- **Lines 449-454** – Language filtering: Adds language field constraint for language-specific queries
- **Lines 485-577** (`getMovedRecordsFromPages`) – Moved records: Handles translation origin pointer for moved page records
- **Lines 532-555** – Translation constraints: Includes translation origin pointer in WHERE clause for pages
- **Lines 702-727** (`getPageChildrenRecursive`) – Page tree: Queries page children with explicit language filtering
- **Line 712** – Default language filter: Explicit constraint `sys_language_uid = 0` for page tree queries
- **Lines 810-820** (`isLanguageAccessibleForCurrentUser`) – Permission check: Validates backend user language access
- **Lines 813-815** – Schema check: Gets language field from schema capability if table is language-aware
- **Line 819** – Access validation: Checks backend user language access by numeric language value
- **Lines 828-866** (`isNewPage`) – New page detection: Determines if page is new in workspace, handles translations
- **Lines 832-854** – Translation query: For language > 0, queries by translation origin pointer and language field
- **Lines 840-845** – Field constraints: Uses both translation origin pointer and language field in WHERE clause

### Classes/Service/GridDataService.php
- **Lines 116-305** (`getRowDetails`) – Row details: Prepares record diff view with language field handling
- **Lines 171-173** – Field exclusion: Skips `l10n_diffsource` field from diff processing
- **Lines 369-370** – Page ID calculation: Uses `l10n_parent` value for translated page ID determination
- **Lines 408-413** – Language display: Retrieves and formats language value for grid display
- **Lines 570-580** (`getLanguageValue`) – Language extraction: Gets numeric language value from record via schema capability
- **Lines 573-577** – Value retrieval: Returns integer value from language field if table is language-aware
- **Lines 589-597** (`getSystemLanguageValue`) – Language configuration: Retrieves system language metadata by numeric ID

### Classes/Notification/StageChangeNotification.php
- **Lines 75-81** (`notifyStageChange`) – Preview link: Derives language ID from record for preview URL generation
- **Lines 76-77** – Schema check: Checks if table is language-aware before accessing language field
- **Line 77** – Field access: Gets language field name from schema capability and retrieves value from record

### Classes/Preview/PreviewUriBuilder.php
- **Lines 71-86** (`buildUriForPage`) – Preview URL: Generates preview link with language parameter
- **Line 77** – Language resolution: Maps numeric language ID to site language configuration

---

## 4) Structural Patterns

1. **TCA Schema Language Capability Derivation**: Uses `$schema->getCapability(TcaSchemaCapability::Language)` to dynamically retrieve language field names (`getLanguageField()->getName()`, `getTranslationOriginPointerField()->getName()`, `getTranslationSourceField()->getName()`) rather than hardcoding `sys_language_uid`, `l10n_parent`, or `l10n_source`.

2. **Translation Parent Field Updates During Publishing**: QueryBuilder pattern that selects translation records where `l10n_parent` or `l10n_source` equals the versioned record ID, then executes UPDATE to set these fields to the live record ID, maintaining translation relationships after workspace publishing.

3. **Numeric Language Value Comparisons**: Direct integer comparisons on language field values (e.g., `$record[$languageField] > 0` to detect translations, `sys_language_uid = 0` to filter default language records).

4. **Conditional Language-Aware Processing Guards**: Method-level checks using `$schema->isLanguageAware()` before accessing language capabilities or performing language-specific database operations; returns empty arrays or skips processing if table lacks language support.

5. **Language-Filtered QueryBuilder Constraints**: Addition of `$queryBuilder->expr()->eq($languageField, $languageValue)` constraints when language parameter is provided, using `Connection::PARAM_INT` for numeric language identifiers.

6. **Workspace-Language Combined Filtering**: Query patterns combining `t3ver_wsid` (workspace ID) constraints with language field constraints to select workspace-specific translation records.

7. **Translation Origin Pointer Propagation**: SELECT clauses that include translation origin pointer field alongside standard version fields (uid, pid, t3ver_oid, t3ver_stage) for workspace version queries on language-aware tables.

8. **Language Field Preservation During Swap**: Explicit inclusion of translation origin pointer field in `$keepFields` array during `version_swap()` to prevent loss of translation relationships when swapping version and live records.

---

## 5) Explicit Non‑Relevant Areas

- Backend module UI labels and translations (Resources/Private/Language/locallang.xlf files)
- Email notification template text content (notification email body, subject lines)
- JavaScript module localization strings (Resources/Public/JavaScript/*)
- Stage change notification message text and formatting
- Preview module rendering labels and UI text
- Backend toolbar workspace selector display strings
- Workspace title and description display values
- History entry human-readable descriptions
- Grid column header labels and tooltips
- Diff view UI text and change descriptions

---

## 6) Open Observations

1. **Default Language Only Page Tree Query**: `getPageChildrenRecursive()` line 712 explicitly filters `sys_language_uid = 0`, suggesting only default language pages are considered for workspace page tree structure; whether this represents intentional limitation for workspace tree operations or optimization strategy cannot be determined from local context.

2. **Translation Source vs Parent Field Usage**: `updateL10nOverlayRecordsOnPublish()` queries both `l10n_parent` and `l10n_source` fields with OR constraint and updates both independently; conditions determining which field is authoritative for translation relationships or whether both must be maintained simultaneously require broader TCA schema context.

3. **Language Access and Publishing Boundaries**: `isLanguageAccessibleForCurrentUser()` checks backend user language permissions during workspace record filtering; interaction between this permission boundary and ability to publish translations (e.g., cascading publish of translations in languages without direct access) cannot be determined from local workspace service logic.

4. **Translation Integrity Warning Enforcement**: `IntegrityService::checkElement()` issues STATUS_Warning when translated record has new placeholder parent but continues processing; whether this warning blocks publishing or serves as advisory notification requires examination of publish gate authorization logic outside this service.

5. **New Placeholder Translation State**: When `t3ver_state = VersionState::NEW_PLACEHOLDER` for translated records, relationship between placeholder language field value, translation parent pointer, and eventual publishing to correct language context is not fully evident from `publishNewRecord()` method implementation.

6. **Language Parent Field Swap Logic**: `version_swap()` line 353-355 preserves translation origin pointer during swap but implementation shows this field is swapped between version and live records; whether this maintains or disrupts translation relationships for records with multiple language versions requires analysis of swap operation complete lifecycle.
