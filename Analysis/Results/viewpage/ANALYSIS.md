# Analysis – viewpage

## 0. Scope Coverage

### Searched top-level directories
- `Classes/` – 1 PHP file (ViewModuleController.php)
- `Configuration/` – 4 files (Backend/Modules.php, JavaScriptModules.php, Services.yaml, page.tsconfig)
- `Resources/` – Templates, JavaScript, Language files
- `Tests/` – 1 functional test, 2 CSV fixtures

### Productive files verified via direct read
- `Classes/Controller/ViewModuleController.php` – fully analyzed
- `Configuration/Backend/Modules.php` – module registration only
- `Configuration/page.tsconfig` – viewport presets only

### Justification for excluded areas
- `Resources/Private/Language/*.xlf` – UI label translations (XLIFF), excluded per global scope rules
- `Resources/Private/Templates/*.fluid.html` – rendering templates, no database logic
- `Resources/Public/JavaScript/` – frontend JavaScript, no server-side language handling

---

## 1. Determination of Language Fields

**No language field determination occurs in this extension.**

The extension:
- Does not define TCA configurations
- Does not contain `ext_tables.sql`
- Does not query database tables directly
- Does not reference `languageField` or schema APIs

Language field resolution is entirely delegated to:
- `PageRepository::getPage()` / `PageRepository::getPageOverlay()`
- `PageRepository::isPageSuitableForLanguage()`
- `PageContext` object from request attributes

---

## 2. Language-Field Usage with Negative Values

**No occurrences found.**

Systematic search performed:
- Pattern `\b-1\b` in `*.php` files: 0 matches
- Pattern `\b-1\b` in `*.csv` files: 0 matches
- Pattern `< 0|<= -1|== -1|=== -1` in all files: 0 matches
- Pattern `ALL_LANGUAGES|LanguageAll` (case-insensitive): 0 matches

The only numeric language value explicitly used in code is `0` (default language fallback):
```php
// Classes/Controller/ViewModuleController.php:94-95
// Fall back to 0 in case currently selected language is not allowed
$languageId = 0;
```

---

## 3. Semantic Classification

**Not applicable** – no negative language identifier occurrences exist to classify.

---

## 4. Parser Rule Derivations

**Not applicable** – no patterns to derive rules from within this extension.

---

## 5. Misclassification Risks

### False Positives
- **External delegation calls**: `PageRepository::getPageOverlay()` and `PageRepository::isPageSuitableForLanguage()` may internally handle `-1` values, but these are external to this extension. A parser should not attribute such handling to viewpage.
- **LanguageItem::getLanguageId()**: Returns numeric IDs from external sources; the range of possible values is not constrained within this extension.

### False Negatives
- **Transitive propagation**: Language IDs retrieved via `PageContext::getPrimaryLanguageId()` or `LanguageItem::getLanguageId()` could theoretically contain `-1` at runtime, but no local code validates or branches on negative values.
- **PreviewUriBuilder::withLanguage()**: Accepts the language ID parameter; behavior for negative values is determined externally.

---

## 6. Tests and Fixtures (Isolated)

### Test fixture: `Tests/Fixtures/pages_languages.csv`
```csv
"pages"
,"uid","pid","title","doktype","deleted","sys_language_uid","l10n_parent"
,1,0,"Default Root Page",1,0,0,0
,2,0,"French Root Page",1,0,1,1
,3,0,"German Root Page",1,0,2,1
,4,0,"Sysfolder",254,0,0,0
```

**Observation**: Only non-negative `sys_language_uid` values (`0`, `1`, `2`) are present. No `-1` test cases exist.

### Test constant: `LANGUAGE_PRESETS`
```php
protected const LANGUAGE_PRESETS = [
    'EN' => ['id' => 0, 'title' => 'English', 'locale' => 'en_US.UTF8'],
    'FR' => ['id' => 1, 'title' => 'French', 'locale' => 'fr_FR.UTF8'],
    'DE' => ['id' => 2, 'title' => 'German', 'locale' => 'de_DE.UTF8'],
];
```

**Observation**: Site configuration presets use only non-negative language IDs. No "all languages" (`-1`) configuration tested.

### Non-binding observations
- Tests verify fallback to language `0` when selected language unavailable (ID `99`)
- Tests verify fallback to language `0` when multiple languages selected
- No test coverage for negative language ID handling exists

---

## Summary

The viewpage extension contains **zero occurrences** of negative language identifiers (`-1` or `< 0`) in database-level language handling. All language ID operations:

1. Consume values from external sources (`PageContext`, `LanguageItem`)
2. Pass values to external sinks (`PreviewUriBuilder`, `PageRepository`)
3. Fall back to `0` (not `-1`) when validation fails

This extension is **not a candidate** for `-1` language value refactoring.
