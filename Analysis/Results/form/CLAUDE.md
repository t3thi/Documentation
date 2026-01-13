# CLAUDE.md - EXT:form

## 1) Extension Profile

EXT:form provides a flexible frontend form framework with a backend form editor interface. Forms are defined as YAML configuration files stored either in the filesystem via FAL (File Abstraction Layer) or provided by extensions. The extension handles form rendering, validation, and processing through configurable finishers. Form definitions are persisted as YAML documents rather than database records.

## 2) Relation to Database-Level Multilinguality

**Rating: none**

Justification:
- Forms are stored as YAML files, not as database records with language fields
- The extension does not define custom database tables containing `sys_language_uid`, `l10n_parent`, or similar language fields
- `ext_tables.sql` only adds indexes to the system `sys_refindex` table for reference tracking
- The two database-interacting classes (`DatabaseService`, `SaveToDatabaseFinisher`) do not read, filter, or propagate language field values
- No QueryBuilder constraints on language fields exist in the extension's database operations

## 3) Observed Code Hotspots (DB Language Logic)

None identified.

The extension contains no database-level language logic. The following locations interact with databases but do not handle language fields:

| File | Class/Method | Operation |
|------|--------------|-----------|
| `Classes/Service/DatabaseService.php` | `getReferencesByPersistenceIdentifier()` | Queries `sys_refindex` without language constraints |
| `Classes/Service/DatabaseService.php` | `getAllReferences()` | Queries `sys_refindex` without language constraints |
| `Classes/Domain/Finishers/SaveToDatabaseFinisher.php` | `saveToDatabase()` | Generic insert/update to arbitrary tables without language field handling |

## 4) Structural Patterns

No database-language-related code patterns observed.

The extension uses:
- File-based persistence for form definitions (YAML via FAL or extension paths)
- Generic database writes through `SaveToDatabaseFinisher` where column mappings are fully user-configured
- Reference tracking via `sys_refindex` queries that operate on `softref_key` and `ref_string`/`ref_uid` fields only

## 5) Explicit Non-Relevant Areas

The following areas contain language-related code that does **not** represent database-level language logic:

| Location | Description |
|----------|-------------|
| `Classes/Domain/Runtime/FormRuntime.php` | `$currentSiteLanguage` property and `initializeCurrentSiteLanguage()` - obtains site language from request context for rendering/translation purposes |
| `Classes/Controller/FormEditorController.php` | `buildFakeSiteLanguage()` - creates SiteLanguage object for backend preview rendering |
| `Classes/Service/TranslationService.php` | XLIFF-based label translation service using `$languageKey` |
| `Classes/Domain/Finishers/EmailFinisher.php` | Translation language override for email generation |
| `Classes/Domain/Configuration/FormDefinition/Converters/FinisherTranslationLanguageConverter.php` | Normalizes finisher translation language settings |
| `Documentation/I/Concepts/Variants/Index.rst` | Documents `getLanguageId()` accessor for variant conditions (site language context) |

All above items relate to site configuration languages (SiteLanguage), UI/label translations (XLIFF), or rendering context - not database record language fields.

## 6) Open Observations

| Location | Observation |
|----------|-------------|
| `Classes/Domain/Finishers/SaveToDatabaseFinisher.php` | Allows saving form data to arbitrary database tables. If a target table has language fields (`sys_language_uid`, `l10n_parent`), users could map form values to those columns via configuration. The finisher itself is agnostic to language semantics. |
| `Tests/Functional/RequestHandling/Fixtures/OnePageWithMultipleFormIntegrationsScenario.yaml` | Test fixture references `l10n_parent` field - this is fixture data for test scenarios involving `tt_content`, not form extension logic. |
