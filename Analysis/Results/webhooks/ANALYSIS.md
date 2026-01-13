# Analysis – webhooks

## 0. Scope Coverage

### Searched top-level directories
- `Classes/` — 21 PHP files (all productive code)
- `Configuration/` — TCA, backend modules, services, icons
- `Tests/` — 2 test files (1 functional, 1 unit)
- `Documentation/Triggers/_snippets/` — 2 PHP example snippets
- `Resources/` — templates, language files, icons (excluded: non-PHP)
- Root files: `ext_emconf.php`, `ext_localconf.php`, `ext_tables.sql`

### Productive files verified via direct read
| File | Verification |
|------|--------------|
| `Configuration/TCA/sys_webhook.php` | Full read — no `languageField` in ctrl |
| `ext_tables.sql` | Full read — no language columns |
| `Classes/Repository/WebhookRepository.php` | Full read — no language restrictions |
| All 21 Classes/*.php files | Grep verified — no `-1` or `< 0` patterns |

### Justification for excluded areas
- `Resources/Private/Language/*.xlf` — XLIFF UI translations, not DB-level language
- `Resources/Private/Templates/` — Fluid templates, presentation layer only
- `Resources/Public/` — static assets (SVG, CSS)
- `Documentation/` except PHP snippets — reStructuredText documentation

---

## 1. Determination of Language Fields

### TCA ctrl configuration
The `sys_webhook` table TCA (Configuration/TCA/sys_webhook.php:4-27) does not define:
- `languageField`
- `transOrigPointerField`
- `translationSource`

### Schema definition
ext_tables.sql defines only index additions. No column definitions for language fields.

### Repository layer
`WebhookRepository::getQueryBuilder()` (lines 172-188) explicitly removes all default restrictions except `DeletedRestriction`. No `LanguageRestriction` is applied or referenced.

**Conclusion**: This extension defines no language fields for the `sys_webhook` table. No language field name derivation occurs.

---

## 2. Language-Field Usage with Negative Values

**No occurrences found.**

Systematic searches performed:
- Pattern `= -|== -|=== -|< 0|<= 0|-1\b` in Classes/ — 0 matches
- Pattern `languageField|sys_language|l10n_` in Classes/ — 0 matches
- Pattern `LanguageAspect|getLanguageId|LanguageRestriction` — 0 matches

---

## 3. Semantic Classification

**Not applicable.** No language-field usage with negative values exists in productive code.

---

## 4. Parser Rule Derivations

**Not applicable.** No patterns exist that would require parser rules for negative language identifier detection in this extension.

---

## 5. Misclassification Risks

### False Positives

| Risk | Location | Mitigation |
|------|----------|------------|
| `fe_group = -2` in test fixtures | `Tests/Functional/Fixtures/pages.csv:8,18` | Value `-2` in `fe_group` column represents "show at any login" access restriction, not a language identifier |
| `LANGUAGE_PRESETS` constant | `Tests/Functional/WebhookExecutionTest.php:51-53` | Site configuration language preset (id: 0), not database-level language field usage |

### False Negatives

| Risk | Description |
|------|-------------|
| Indirect language handling via event payloads | Message classes serialize event data that may contain language information from source records. The extension does not inspect or filter by these values. |
| `PageModificationMessage` site context | Contains `siteIdentifier` field derived from `SiteFinder`, which relates to site configuration, not database language fields |

---

## 6. Tests and Fixtures (Isolated)

### Test fixtures with language-adjacent data

**File**: `Tests/Functional/Fixtures/pages.csv`

| Column | Values observed | Relevance |
|--------|-----------------|-----------|
| `sys_language_uid` | 0, 1 | Standard pages table language field — used as test context for page modification webhooks, not for `sys_webhook` table |
| `l10n_parent` | 0, 1, 2, 3, 5, 6, 9, 1001, 1003 | Translation parent references for pages fixture |
| `l18n_parent` (tt_content) | 0, 1, 3 | Translation parent for content elements fixture |

**Assessment**: These fixtures establish a multilingual page tree context for functional testing of `PageModificationMessage` dispatch. They do not represent language handling within the webhooks extension itself.

### Non-binding observations

1. `WebhookExecutionTest::LANGUAGE_PRESETS` defines site language configuration with `'id' => 0` — this is site-level language configuration, excluded from scope.

2. Functional test `setUp()` calls `buildDefaultLanguageConfiguration('EN', '/')` — site configuration helper, not database language field handling.

3. No test assertions verify language field values in `sys_webhook` records.
