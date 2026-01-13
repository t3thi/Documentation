# Analysis – dashboard

## 0. Scope Coverage

### Searched top-level directories
- `Classes/` — all PHP files (53 files)
- `Configuration/` — TCA, Services, Backend routes
- `Resources/Private/Templates/` — Fluid templates
- `Tests/` — Functional and Unit tests, Fixtures
- `Documentation/` — RST documentation files

### Productive files verified via direct read
- `Classes/Widgets/LatestChangedPagesWidget.php` — sole location with database language field access
- `Classes/Repository/DashboardRepository.php` — dashboard persistence (no language fields)
- `Classes/Widgets/Provider/*.php` — all data providers (no language field access)
- `Configuration/TCA/be_dashboards.php` — table definition (no `languageField`)
- `ext_localconf.php`, `ext_tables.sql` — extension bootstrapping

### Justification for excluded areas
- `Documentation/` contains only configuration examples with UI translation references (LLL:), no database language logic
- `Resources/Private/Language/` contains XLIFF files (UI translations, explicitly excluded per scope)

---

## 1. Determination of Language Fields

### TCA `ctrl.languageField`
The extension's own table `be_dashboards` has **no** `languageField` defined in TCA:

```php
// Configuration/TCA/be_dashboards.php
'ctrl' => [
    'title' => 'dashboard.db:be_dashboard',
    'label' => 'title',
    // ... no 'languageField', 'transOrigPointerField', or 'translationSource'
],
```

### External table access
`LatestChangedPagesWidget` queries external tables (`pages`, `tt_content`) whose language fields are defined by core:
- `pages.sys_language_uid` — language field
- `pages.l10n_parent` — translation original pointer
- `tt_content.sys_language_uid` — language field

These field names are used as hardcoded strings, not derived via TCA APIs or schema capabilities.

---

## 2. Language-Field Usage with Negative Values

**No occurrences found.**

Comprehensive search performed for:
- Literal `-1` in language contexts
- Comparisons `< 0`, `<= -1`, `== -1`, `=== -1`, `!= -1`, `!== -1`
- `IN` clauses containing `-1`
- `createNamedParameter` with `-1`

### Existing language field comparisons (for reference, not negative):

| Location | Code | Comparison |
|----------|------|------------|
| `LatestChangedPagesWidget.php:159` | `$pageRecord['sys_language_uid'] > 0` | Greater than zero |
| `LatestChangedPagesWidget.php:183` | `$page['pageRecord']['sys_language_uid'] > 0` | Greater than zero |
| `LatestChangedPagesWidget.php:211` | `(int)$contentRecord['sys_language_uid'] > 0` | Greater than zero |
| `LatestChangedPagesWidget.php:217` | `eq('sys_language_uid', ...)` | Equality with record value |

All comparisons use `> 0` to distinguish translations from default language records. No code path handles or checks for `-1` (all languages) semantics.

---

## 3. Semantic Classification

**Not applicable** — no negative language identifier usage detected.

---

## 4. Parser Rule Derivations

**Not applicable** — no patterns to codify.

### Note for future reference
If this extension were to add support for "all languages" content, detection rules would need to monitor:
- `LatestChangedPagesWidget::getPageOfContentElement()` — current logic assumes language values ≥ 0
- `LatestChangedPagesWidget::getLatestPagesFromSysHistory()` — page ID derivation assumes binary default/translated distinction

---

## 5. Misclassification Risks

### False Positives

| Pattern | Location | Reason for exclusion |
|---------|----------|---------------------|
| `array_slice(..., 0, -1)` | `LatestChangedPagesWidget.php:244` | PHP array function parameter (exclude last element), not language value |
| `state="-1"` | `RssWidget.fluid.html:22` | ViewHelper `f:be.infobox` state attribute (UI severity indicator), not language field |

### False Negatives

| Risk | Mitigation |
|------|------------|
| Hardcoded `sys_language_uid` field names | Field names not derived from TCA; changes to core schema would not be detected |
| `> 0` comparison assumes no `-1` values exist | If queried tables contain `-1` records, current logic would incorrectly treat them as default language (falls into else branch) |

---

## 6. Tests and Fixtures (Isolated)

### Examined files
- `Tests/Functional/Fixtures/be_users.csv`
- `Tests/Functional/Fixtures/be_groups.csv`
- `Tests/Functional/WidgetRegistryTest.php`
- `Tests/Unit/DashboardPresetRegistryTest.php`
- `Tests/Unit/DependencyInjection/DashboardWidgetPassTest.php`
- `Tests/Unit/WidgetGroupRegistryTest.php`

### Findings
**No language-related content** in any test or fixture file:
- CSV fixtures contain only `be_users` and `be_groups` records (no language fields)
- Unit/Functional tests focus on widget/dashboard registry functionality
- No mock data or assertions involving `sys_language_uid`, `-1`, or language field logic

### Classification
All test files: **IRR** — not relevant for database-level language analysis.
