# Database-Level Multilinguality Analysis: EXT:tstemplate

## 1) Extension Profile

The `tstemplate` extension provides backend modules for managing TypoScript template records (`sys_template`). It offers interfaces for viewing, editing, and analyzing TypoScript constants and setup configurations attached to page records. The extension includes controllers for template record overview, constant editing, template analysis, active TypoScript inspection, and template information display.

---

## 2) Relation to Database-Level Multilinguality

**Rating:** none

**Justification:**

All database queries in the extension filter `sys_template` records exclusively by `pid` (page identifier). No language field constraints, evaluations, or propagations occur in any QueryBuilder instance, repository method, or data persistence operation. The extension operates on page-scoped template records without consideration of language dimensions. References to "language" in the codebase exclusively involve `LanguageService` for UI label translation, which falls outside the scope of database-level language handling.

---

## 3) Observed Code Hotspots (DB Language Logic)

None.

---

## 4) Structural Patterns

None.

---

## 5) Explicit Non-Relevant Areas

### UI Label Translation (LanguageService)

- `AbstractTemplateModuleController.php:287`: `getLanguageService(): LanguageService` retrieves UI label translation service
- `AbstractTemplateModuleController.php:118,125`: Usage in template creation actions for placeholder text
- `InfoModifyController.php:67,102`: Label retrieval for view titles and module headers
- `ConstantEditorController.php:93,265`: Label retrieval for flash messages and module titles
- `TemplateAnalyzerController.php:60`: Label retrieval for module display
- `ActiveTypoScriptController.php:71,205,320`: Label retrieval throughout active TypoScript controller
- `TemplateRecordsOverviewController.php:109,112`: Label retrieval for page breadcrumbs

**Reason:** All `LanguageService` invocations serve XLIFF-based UI text localization, not database-level record language handling.

### QueryBuilder Operations Without Language Constraints

- `AbstractTemplateModuleController.php:265-284`: `getTemplateQueryBuilder()` constructs queries filtering `sys_template` by `pid` only
- `TemplateRecordsOverviewController.php:89-99`: Global template selection query uses `pid > 0` constraint without language filtering
- `AbstractTemplateModuleController.php:248-260`: `getFirstTemplateRecordOnPage()` queries by `pid` and optional `uid`, no language fields

**Reason:** These queries operate on page-scoped template configurations that exist independently of language dimensions.

---

## 6) Open Observations

### sys_template Table Schema

The extension performs no TCA or schema introspection for language-related capabilities on the `sys_template` table. The table definition resides outside this extension (likely in core system extensions). Whether `sys_template` possesses language fields (`sys_language_uid`, `l10n_parent`, etc.) cannot be determined from local context.

**Location:** Schema definition not present in extension codebase.

### TcaSchemaCapability Usage

`AbstractTemplateModuleController.php:277-283` queries `TcaSchemaCapability::SortByField` to derive sort order for template records. The code does not examine language-related TCA capabilities such as `LanguageAwareSchemaCapability` or `RestrictionCapability` with language constraints.

**Location:** `AbstractTemplateModuleController.php:277-283`

### DataHandler Invocations

Template record creation and updates via `DataHandler` (`AbstractTemplateModuleController.php:108,135`, `ConstantEditorController.php:256`, `ActiveTypoScriptController.php:397`) pass field values without explicit language field assignments. Whether DataHandler internally propagates language context from request or page context cannot be determined from extension code.

**Locations:**
- `AbstractTemplateModuleController.php:104-110,123-137`
- `ConstantEditorController.php:253-258`
- `ActiveTypoScriptController.php:389-398`
