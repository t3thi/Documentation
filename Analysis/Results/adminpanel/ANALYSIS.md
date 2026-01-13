# Analysis – EXT:adminpanel

## 0. Scope Coverage

### Searched top-level directories
- `Classes/` (47 PHP files) — all productive code
- `Configuration/` (4 PHP files) — routing, middleware, CSP, JS modules
- `Tests/` (7 PHP files) — unit and functional tests
- `Resources/` — templates, XLIFF, CSS, JS assets
- Root configuration files (`ext_emconf.php`, `ext_localconf.php`)

### Productive files verified via direct read
- `Classes/Utility/MemoryUtility.php` — only file containing literal `-1`
- `Classes/Repositories/FrontendGroupsRepository.php` — only QueryBuilder usage
- `Classes/Modules/PreviewModule.php` — Context aspect manipulation

### Justification for excluded areas
- `Resources/Private/Language/` — XLIFF UI translation files (out of scope)
- `Resources/Public/Css/` — CSS styling with `-1px` values (irrelevant)
- `Documentation/` — user documentation (no code)

---

## 1. Determination of Language Fields

**Not applicable.**

This extension:
- Defines no database tables (`ext_tables.sql` absent)
- Contains no TCA configuration (`Configuration/TCA/` absent)
- Does not reference `ctrl.languageField` or equivalent schema APIs
- Does not interact with `LanguageAspect` or language overlay mechanisms

No language field derivation logic exists.

---

## 2. Language-Field Usage with Negative Values

**No occurrences found.**

### Non-language `-1` occurrences (for completeness)

| File | Line | Code | Purpose |
|------|------|------|---------|
| `Classes/Utility/MemoryUtility.php` | 40 | `$iniLimit === '-1' ? -1 : ...` | PHP `memory_limit` INI value representing "unlimited" |

This usage is unrelated to database language semantics.

---

## 3. Semantic Classification

**No database-language-related occurrences to classify.**

The single `-1` occurrence in `MemoryUtility.php` represents PHP's memory limit "unlimited" sentinel value:

| Occurrence | Category | Justification |
|------------|----------|---------------|
| `MemoryUtility.php:40` | IRR | PHP INI setting for unlimited memory; no relation to database language fields |

---

## 4. Parser Rule Derivations

**No rules derivable from this extension.**

The extension contains no patterns involving:
- Negative language identifier comparisons
- Language field constraints in queries
- Language value propagation to database operations

---

## 5. Misclassification Risks

### False Positives

| Risk | Description |
|------|-------------|
| Memory limit sentinel | `'-1'` string comparison in `MemoryUtility.php` may match `-1` patterns but represents PHP memory configuration |
| CSS pixel offsets | `-1px` values in CSS files may match numeric patterns |
| PSR-15 references | Comment text "PSR-15" contains hyphenated numbers |

### False Negatives

None identified. The extension has no database-level language handling, eliminating risk of missed language-related patterns.

---

## 6. Tests and Fixtures (Isolated)

### Search results
- No `-1` literals in test files
- No `sys_language` references in test files
- No `languageField` references in test files

### Conclusion
Test fixtures do not contain database-language-related patterns. No non-binding observations to report.
