# Backend Extension - Database-Level Multilinguality Analysis

## 1) Extension Profile

The backend extension provides TYPO3's administrative interface, encompassing record management, form rendering, page layout editing, clipboard operations, and user authentication. It implements the FormEngine data pipeline for record editing, manages record list displays with filtering and permissions, handles content element placement in backend layouts, and provides repository and service layers for querying and manipulating database records across all TYPO3 tables.

---

## 2) Relation to Database-Level Multilinguality

**Rating: high**

**Justification:**

The backend extension exhibits extensive database-level multilinguality integration across multiple architectural layers:

- **Query constraints**: Widespread use of `sys_language_uid`, `l10n_parent`, `l10n_source`, and `l18n_parent` fields in QueryBuilder operations for filtering, joining, and grouping database records by language.
- **Schema-driven field access**: Dynamic resolution of language field names via `TcaSchemaFactory` and `TcaSchemaCapability::Language`, enabling programmatic identification of language fields and translation pointer fields without hardcoded names.
- **Record overlay logic**: Application of workspace overlays combined with language-aware record retrieval for fetching default language records and translation sources.
- **Domain models and repositories**: Dedicated `LocalizationRepository` for language-specific queries; `PageLanguageInformation` and `LanguageItem` models encapsulating language states and translation metadata.
- **Permission filtering**: Integration with `BackendUserAuthentication::checkLanguageAccess()` to enforce user-level language restrictions in queries and UI display.
- **Form data providers**: Multiple providers (`DatabaseLanguageRows`, `DatabaseSystemLanguageRows`, `TcaLanguage`) populate FormEngine with language field data, default language records, and translation source records for rendering edit forms.

---

## 3) Observed Code Hotspots (DB Language Logic)

### Domain Repositories

- **Classes/Domain/Repository/Localization/LocalizationRepository.php**
  - `fetchOriginLanguage()` – Query filter / join on `sys_language_uid`, `l10n_source`
  - `getLocalizedRecordCount()` – Query filter on `sys_language_uid`, `l10n_source`
  - `fetchAvailableLanguages()` – Query filter / grouping by `sys_language_uid`
  - `getRecordsToCopyDatabaseResult()` – Query filter on `sys_language_uid`, `l10n_source`, dual-phase query for excluding existing translations
  - `getAllowedLanguageConstraintsForBackendUser()` – Permission-based query constraint using `IN (allowed_language_ids)`

### Form Data Providers

- **Classes/Form/FormDataProvider/DatabaseLanguageRows.php**
  - `addData()` – Value comparison (`languageField > 0`, `transOrigPointerField > 0`); fetches default language record via workspace overlay; retrieves `translationSource` record if configured

- **Classes/Form/FormDataProvider/TcaLanguage.php**
  - Field name derivation via `TcaSchemaCapability::Language->getLanguageField()->getName()`

- **Classes/Form/FormDataProvider/DatabasePageLanguageOverlayRows.php**
  - Query filter on `translationOriginPointerField = pageId` for fetching page translations

- **Classes/Form/FormDataProvider/DatabaseEffectivePid.php**
  - Value transport from `l10n_parent` to determine effective PID for form context

- **Classes/Form/FormDataProvider/DatabaseSystemLanguageRows.php**
  - Populates `systemLanguageRows` with site language configurations; used for language selection in forms

### Record List Display

- **Classes/RecordList/DatabaseRecordList.php** (lines 2560–2605)
  - Query filter: `languageField IN ([-1, ...filterLanguages])`
  - Query filter for non-page tables: `translationOriginPointerField = 0` (only original records)
  - Fallback constraint: `languageField <= 0 OR translationOriginPointerField = 0`
  - Permission check: integrates `backendUser->checkLanguageAccess()`

### Backend Layout & Content Fetching

- **Classes/View/BackendLayout/ContentFetcher.php**
  - Value comparison: `sys_language_uid === -1` (special handling for "all languages" marker)
  - Value transport: maps `-1` to `0` (language comparison mode) or current language ID (columns mode)
  - Record indexing by `sys_language_uid` for segregating content by language

### Services

- **Classes/Service/PageLanguageInformationService.php**
  - `fetchExistingTranslations()` – Query filter: `translationOriginField = pageId AND languageField != 0`; applies workspace overlay
  - Field name derivation via `TcaSchemaCapability::Language`
  - Permission filtering: `backendUser->checkLanguageAccess(languageId)`

### Page Tree Filtering

- **Classes/Tree/Repository/PageTreeFilter.php**
  - `fetchTranslatedPages()` – Query filter: `sys_language_uid > 0`, `l10n_parent > 0`, permission-based language constraint

### Clipboard Operations

- **Classes/Clipboard/Clipboard.php**
  - Field name access via `languageCapability->getLanguageField()->getName()`, `getTranslationOriginPointerField()->getName()`

### Utilities

- **Classes/Utility/BackendUtility.php**
  - `getRecordWSOL()` – Workspace overlay; used in conjunction with language record retrieval
  - `workspaceOL()` – Workspace overlay applied to translation records

---

## 4) Structural Patterns

### Schema-Driven Language Field Resolution

Language field names are resolved dynamically via `TcaSchemaFactory`:

```
$schema = $tcaSchemaFactory->get($tableName);
$languageCapability = $schema->getCapability(TcaSchemaCapability::Language);
$languageField = $languageCapability->getLanguageField()->getName();
$translationOriginField = $languageCapability->getTranslationOriginPointerField()->getName();
```

This pattern avoids hardcoded field names and allows TCA-defined language field names to be used consistently.

### Numeric Language Value Semantics

- **0**: Default language
- **> 0**: Specific translation language (positive integer language ID)
- **-1**: Special marker for "all languages"

The `-1` value receives distinct treatment:
- In language comparison mode: mapped to `0` (default language)
- In columns mode: mapped to current language ID
- In queries: often excluded via `!= -1` or included via `IN ([-1, ...allowedLanguages])`

### QueryBuilder Language Constraints

Common constraint patterns:

1. **Equality**: `->eq('sys_language_uid', $languageId)`
2. **Range**: `->gt('sys_language_uid', 0)` (only translations)
3. **Inclusion**: `->in('sys_language_uid', $allowedLanguageIds)`
4. **Combined with translation pointer**: `sys_language_uid > 0 AND l10n_parent > 0`
5. **Negation**: `->neq('sys_language_uid', -1)` (exclude "all languages")

### Translation Pointer Fields

Multiple pointer fields used across codebase:

- **l10n_parent**: Links translation to default language record (0 = original record)
- **l10n_source**: Links translation to immediate source language record (for translation chains)
- **l18n_parent**: Legacy translation parent field (older TCA configurations)
- **translationSource**: TCA ctrl field pointing to source record (differs from `l10n_parent` in some workflows)

Queries often check `l10n_parent = 0` to identify original (non-translated) records or `l10n_parent > 0` to identify translations.

### Workspace + Language Record Overlay

Records are retrieved with dual overlay logic:

1. Fetch record by UID
2. Apply workspace overlay (`BackendUtility::getRecordWSOL()` or `workspaceOL()`)
3. Check if overlaid record is delete placeholder (`VersionState::DELETE_PLACEHOLDER`)
4. Use overlaid record for language-aware operations

This ensures workspace modifications to translations are respected.

### Permission-Based Language Filtering

Language filtering integrates backend user permissions:

- `backendUser->checkLanguageAccess($languageId)` returns boolean for language access
- `TranslationConfigurationProvider::getSystemLanguages($pageId)` returns array of accessible languages
- QueryBuilder constraints: `->in('sys_language_uid', array_keys($allowedLanguages))`

Non-admin users see only records in languages they are permitted to access.

### Domain Model Encapsulation

Language state is encapsulated in value objects:

- **PageLanguageInformation**: Container for page translation state
  - `availableLanguages`: SiteLanguage objects user can access
  - `existingTranslations`: Database records keyed by language ID
  - `languageStatuses`: Enum values (`Existing | Creatable | Unavailable`)
  - `creatableLanguageIds`: Languages user can create translations for

- **LanguageItem**: Combines SiteLanguage with LanguageStatus for UI rendering

### Localization Workflow Components

- **LocalizationHandlerInterface**: Contract for record localization operations
- **ManualLocalizationHandler**: Executes database-level record localization
- **LocalizationMode**: Enum (`CLONE | TRANSLATE | LINK`)
- **LocalizationInstructions**: Transport object for localization parameters (source language, target language, record UIDs)
- **LocalizationResult**: Return type encapsulating success/failure state

These components abstract record copying/translation operations.

---

## 5) Explicit Non-Relevant Areas

The following areas use "language" terminology but do **not** represent database-level language logic:

### UI Label Translation

- `LLL:` references in PHP files (XLIFF language file labels)
- ViewHelper usage of `TranslationService` or `LocalizationUtility`
- Language file path resolution in controllers and ViewHelpers
- Example: `Classes/ViewHelpers/LoginLogoViewHelper.php`, `Classes/Template/Components/Buttons/Action/ShortcutButton.php`

### Site Configuration Language Objects

- `SiteLanguage` objects representing site configuration languages (ISO codes, base URLs, locales)
- Methods: `getAllLanguages()`, `getLanguages()`, `getLanguageById()`
- Used for: dropdown rendering, UI language selection, flag icons
- **Note**: These objects are used to *populate* language selectors and to *validate* against database records, but the objects themselves do not represent database-level multilinguality.

### Form Configuration Language Handling

- **Classes/Form/Container/SiteLanguageContainer.php**: FormEngine container for rendering site language configuration forms (system extension configuration, not record translation)
- **Classes/Form/FormDataProvider/TcaSiteLanguage.php**: Populates site language dropdowns in forms; no database language field interaction

### Template/Rendering Language Options

- `LanguageSelectorBuilder`, `LanguageSelectorMode` in template rendering (UI components for language switching in page module)
- Drawing configuration language options (`DrawingConfiguration::isLanguageComparisonMode()`) – UI rendering mode, not database query logic

### Authentication Language Preference

- `BackendUserAuthentication` language preference for UI (not for database record filtering beyond permission checks)

---

## 6) Open Observations

### Translation Source vs. Translation Origin Pointer

The codebase uses both `l10n_parent` (translation origin pointer) and `l10n_source` (translation source) fields. The distinction between these fields and when each is used for overlay operations vs. query constraints is not uniformly clear from local context. Some queries join on `l10n_source`, others filter by `l10n_parent`.

**Observation**: The semantic difference between "origin" and "source" in multi-step translation chains (e.g., EN → DE → FR) requires external TCA documentation to interpret.

### Special Language Value -1 Handling Consistency

The `-1` language value (all languages marker) is handled differently across contexts:
- ContentFetcher maps it to `0` or current language ID based on view mode
- LocalizationRepository excludes it via `!= -1` in origin language queries
- DatabaseRecordList includes it in allowed languages via `IN ([-1, ...])`

**Observation**: Whether `-1` records should be included or excluded in a given query depends on business logic not always evident from the query context.

### Workspace Overlay Application Timing

Some code paths apply workspace overlay before language processing (e.g., `PageLanguageInformationService::fetchExistingTranslations()`), while others apply it after (e.g., `DatabaseLanguageRows::getRecordWorkspaceOverlay()`).

**Observation**: Whether overlay occurs before or after language field reading affects which record version's language field value is used. The ordering logic is not consistently documented in method signatures.

### TCA translationSource vs. transOrigPointerField

The `translationSource` TCA ctrl field is populated separately from `transOrigPointerField` in `DatabaseLanguageRows`. The conditions under which `translationSource` differs from `transOrigPointerField` and the implications for overlay logic are not determinable from backend extension code alone.

**Observation**: This field's role in database-level language processing depends on TCA configuration patterns defined outside the backend extension.

### Language Permission Enforcement Points

Language permission checks occur in multiple layers:
- Repository query constraints (`LocalizationRepository::getAllowedLanguageConstraintsForBackendUser()`)
- Service-level filtering (`PageLanguageInformationService::getLanguageInformationForPage()`)
- RecordList display filtering (`DatabaseRecordList` language filtering)

**Observation**: Whether a language restriction is enforced at query level (database-level filtering) or post-query (in-memory filtering) varies by component. The rationale for choosing enforcement points is not evident from code structure alone.

### Default Language Row Population in FormEngine

FormEngine populates `defaultLanguageRow` for translated records, but the timing of when this row is used (vs. `databaseRow`) in field value derivation is determined by other FormDataProviders not analyzed here.

**Observation**: The downstream consumption of `defaultLanguageRow` for database operations (e.g., field inheritance, placeholder resolution) requires tracing beyond the backend extension scope.
