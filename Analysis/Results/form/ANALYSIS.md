# Analysis – EXT:form

## 0. Scope Coverage

### Searched top-level directories
- `Classes/` - All 100+ PHP files verified
- `Configuration/` - TCA overrides and YAML configurations
- `Tests/` - Functional and Unit test suites
- `ext_tables.sql` - Database schema

### Productive files verified via direct read
- `Classes/Service/DatabaseService.php` - QueryBuilder operations
- `Classes/Domain/Finishers/SaveToDatabaseFinisher.php` - Database write operations
- `Classes/Domain/Runtime/FormState.php` - Contains `NOPAGE = -1` constant
- `Classes/Domain/Runtime/FormRuntime.php` - Site language context handling
- `Classes/Mvc/Persistence/FormPersistenceManager.php` - Contains `$sortMultiplier = -1`

### Justification for excluded areas
- `Resources/` - Contains templates, XLIFF translations, and static assets; no PHP logic
- `Documentation/` - RST files; documents `getLanguageId()` but this references SiteLanguage API, not database fields

---

## 1. Determination of Language Fields

**No database language field derivation exists in this extension.**

The extension:
- Does not define custom database tables with language fields
- Does not access TCA `ctrl.languageField` or `transOrigPointerField`
- Does not use Schema or capability APIs for language field resolution
- Does not contain mapper/metadata structures for language fields

The only database operations occur in:
1. `DatabaseService` - queries `sys_refindex` (no language fields)
2. `SaveToDatabaseFinisher` - generic writes to arbitrary tables (language-field-agnostic)

---

## 2. Language-Field Usage with Negative Values

**No occurrences found.**

All instances of `-1` in productive code are unrelated to database language fields:

| File | Code | Purpose |
|------|------|---------|
| `Classes/Domain/Runtime/FormState.php:41` | `public const NOPAGE = -1;` | Form page index sentinel (no page displayed yet) |
| `Classes/Mvc/Persistence/FormPersistenceManager.php:370` | `$sortMultiplier = $ascending ? 1 : -1;` | Sorting direction multiplier |
| `Classes/Controller/FormEditorController.php:348` | `substr($firstLevelItemKey, 0, -10)` | String manipulation (negative offset) |

**None of these involve:**
- `sys_language_uid` comparisons
- `l10n_parent` checks
- Language field constraints in queries
- "All languages" (-1) semantics

---

## 3. Semantic Classification

| Location | Category | Justification |
|----------|----------|---------------|
| `FormState::NOPAGE = -1` | **IRR** | Page index tracking for multi-step forms; no relation to language fields |
| `$sortMultiplier = -1` | **IRR** | Arithmetic operation for descending sort order |
| `substr(..., -10)` | **IRR** | String offset parameter in PHP's substr function |

---

## 4. Parser Rule Derivations

**No rules required.**

This extension contains zero semantic uses of negative language identifiers in database contexts.

If a static analyzer were to scan this extension for `-1` language patterns, it should:

### Exclusion conditions (all apply to this extension)
1. Exclude constant definitions where the constant name indicates non-language purpose (e.g., `NOPAGE`)
2. Exclude arithmetic expressions using `-1` as a multiplier
3. Exclude `substr()` calls with negative offset parameters
4. Exclude form element identifiers containing `-1` suffix patterns (e.g., `text-1`, `page-1`)

---

## 5. Misclassification Risks

### False Positives

| Risk | Location | Mitigation |
|------|----------|------------|
| `NOPAGE = -1` flagged as language constant | `FormState.php:41` | Name analysis: "NOPAGE" clearly indicates page semantics, not language |
| Element identifiers like `text-1` flagged | Throughout YAML and tests | Context analysis: These are form element identifiers, not language values |
| Sort multiplier flagged | `FormPersistenceManager.php:370` | Pattern analysis: `? 1 : -1` ternary with boolean condition indicates arithmetic |

### False Negatives

| Risk | Description |
|------|-------------|
| `SaveToDatabaseFinisher` indirect language handling | If users configure `databaseColumnMappings` to map form values to `sys_language_uid` columns, negative values could flow through. The finisher itself is agnostic; detection would require configuration analysis. |

---

## 6. Tests and Fixtures (Isolated)

### Test fixture observations (non-binding)

| File | Content | Analysis |
|------|---------|----------|
| `Tests/Functional/RequestHandling/Fixtures/OnePageWithMultipleFormIntegrationsScenario.yaml` | References `l10n_parent`, `l18n_parent` in entity settings | Generic test tree builder configuration for `pages` and `tt_content` tables; uses standard TYPO3 core table structures. This is test infrastructure, not form extension logic. |

### Classification
- **TEST** - The language column references in test fixtures are:
  1. Declarative metadata for test data generation
  2. Targeting standard TYPO3 core tables (`pages`, `tt_content`)
  3. Not exercising any form extension-specific language logic

No test or fixture in this extension demonstrates productive-equivalent negative language identifier usage.
