# Analysis – reports

## 0. Scope Coverage

### Searched top-level directories

| Directory | Files Examined | Method |
|-----------|----------------|--------|
| `Classes/` | 16 PHP files | Direct read + grep patterns |
| `Configuration/` | 3 PHP files | Direct read |
| `Tests/Unit/` | 2 PHP files | Direct read |
| `Documentation/CodeSnippets/` | 1 PHP file | Grep scan |

### Productive files verified via direct read

- `Classes/Service/RecordStatisticsService.php` — Database statistics aggregation
- `Classes/Report/Status/ConfigurationStatus.php` — QueryBuilder usage for sys_refindex, information_schema
- `Classes/Report/Status/SecurityStatus.php` — QueryBuilder usage for sys_file
- `Classes/Report/Status/FalStatus.php` — QueryBuilder usage for sys_file
- `Configuration/TCA/Overrides/scheduler_system_status_update_task.php` — TCA column additions

### Justification for excluded areas

| Area | Reason |
|------|--------|
| `Resources/Private/Language/*.xlf` | XLIFF files (UI translation, not DB language logic) |
| `Resources/Private/Templates/*.fluid.*` | Fluid templates (presentation layer) |
| `Documentation/*.rst` | Documentation files |

---

## 1. Determination of Language Fields

**Not applicable.**

This extension does not determine or derive database language field names. Analysis confirms:

- No `ext_tables.sql` exists — extension defines no database tables
- No TCA `ctrl.languageField` configuration for own tables
- No usage of `TcaSchemaCapability::Language` or equivalent APIs for language field introspection
- No mapper structures handling language field derivation
- The `TcaSchemaFactory` usage in `RecordStatisticsService` iterates schemas for UI visibility (`HideInUi`), not language capabilities

Database operations target exclusively non-language-aware tables:
- `sys_file` (FAL — no language semantics)
- `sys_refindex` (reference index — no language semantics)
- `information_schema.*` (MySQL metadata — no language semantics)

---

## 2. Language-Field Usage with Negative Values

**None found.**

Comprehensive search performed:
- Pattern `-1` — 0 matches in PHP files
- Pattern `< ?0|<= ?-1|== ?-1|=== ?-1` — 0 matches
- Pattern `sys_language|languageField|l10n_` — 0 matches
- Pattern `LanguageAspect` — 0 matches

All QueryBuilder operations verified contain no language field constraints:

```php
// ConfigurationStatus.php:78-82 — sys_refindex count
$queryBuilder->count('*')->from('sys_refindex')

// ConfigurationStatus.php:245-247 — charset detection
$queryBuilder->select('DEFAULT_CHARACTER_SET_NAME')->from('information_schema.SCHEMATA')

// SecurityStatus.php:204-215 — exported files detection
$queryBuilder->select('storage', 'identifier')->from('sys_file')
    ->where($queryBuilder->expr()->like('identifier', ...))

// FalStatus.php:83-95 — missing files count
$queryBuilder->count('*')->from('sys_file')
    ->where($queryBuilder->expr()->eq('missing', ...))
```

---

## 3. Semantic Classification

**Not applicable** — no occurrences to classify.

---

## 4. Parser Rule Derivations

**Not applicable** — no language-related patterns to derive rules from.

The extension provides no signatures for:
- AST patterns involving negative language values
- Detection signals for language field comparisons
- Context conditions for language-aware queries

---

## 5. Misclassification Risks

### False Positives

| Risk | Description |
|------|-------------|
| `LanguageService` references | Extension uses `LanguageService::sL()` extensively for UI label translation. This is XLIFF-based localization, not database-level language handling. Pattern: `$languageService->sL('LLL:EXT:...')` |
| `getPageTranslatedPageIDArray()` call | `RecordStatisticsService:62` displays "translated_pages" count. The actual database query and language logic resides in `EXT:lowlevel/DatabaseIntegrityCheck`, not in this extension. |
| `TcaSchemaFactory` iteration | `RecordStatisticsService:120` iterates TCA schemas but only checks `HideInUi` capability, not language capabilities. |

### False Negatives

| Risk | Description |
|------|-------------|
| Delegated language logic | The `DatabaseIntegrityCheck` service (from `EXT:lowlevel`) called in `RecordStatisticsService` may contain language-related database queries internally. These would not appear in this extension's codebase. |

---

## 6. Tests and Fixtures (Isolated)

### Test files examined

- `Tests/Unit/Report/Status/Typo3StatusTest.php`
- `Tests/Unit/Service/StatusServiceTest.php`

### Findings

No language-related test fixtures or database language logic found.

Tests focus on:
- Status provider registration and collection
- Severity determination
- Xclass detection

**Non-binding observations:** None. Test files contain no structures relevant to database-level language processing.
