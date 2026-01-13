# Analysis – fluid

## 0. Scope Coverage

**Searched top-level directories:**
- `Classes/` – 86 PHP files (ViewHelpers, Core, Service, View, Command, Event)
- `Configuration/` – Services.yaml, Services.php, Fluid/Namespaces.php
- `Tests/` – Functional test suites and fixture data
- `Resources/` – Public assets only

**Productive files verified via direct read:**
- All 86 PHP files in `Classes/` searched for language-related patterns
- No TCA configuration files exist
- No SQL schema files (`ext_tables.sql`) exist
- No domain model or repository classes exist

**Justification for excluded areas:**
- `Resources/Public/` contains only frontend assets (no PHP logic)
- Test fixtures contain `sys_language_uid` column data but only with values `0` and `1` (no negative values)

---

## 1. Determination of Language Fields

**Not applicable.**

This extension does not derive or reference database language field names:

- No TCA `ctrl.languageField` definitions exist
- No TcaSchema or SchemaFactory usage
- No `getLanguageField()` method calls
- No mapper or metadata structures for language field derivation
- No QueryBuilder or database query construction

The extension operates exclusively at the presentation/rendering layer and delegates all data access to consuming extensions (Extbase, Core).

---

## 2. Language-Field Usage with Negative Values

**None found.**

Comprehensive search for patterns:
- `sys_language_uid` – not referenced in productive code
- `languageField` – not referenced
- `LanguageAspect` – not referenced
- `< 0`, `<= -1`, `== -1`, `=== -1` – no matches in language context
- `setLanguage(-1)` – no matches
- `languageUid.*-1` – no matches

**Occurrences of literal `-1` in Classes/:**

| File | Context | Relation to Language |
|------|---------|---------------------|
| `ViewHelpers/Be/InfoboxViewHelper.php:46` | `STATE_INFO = -1` (deprecated constant) | None – UI styling state |
| `ViewHelpers/Format/DateViewHelper.php:36` | `"-1 year"` in docblock example | None – date modifier string |

---

## 3. Semantic Classification

| Occurrence | Category | Justification |
|------------|----------|---------------|
| `InfoboxViewHelper::STATE_INFO = -1` | IRR | Deprecated CSS styling constant for infobox severity; unrelated to database language |
| `DateViewHelper` docblock `-1 year` | IRR | Documentation example for date calculation; string literal not numeric comparison |

---

## 4. Parser Rule Derivations

**Not applicable.**

No AST signatures required as no database-level language logic exists in this extension.

For reference, patterns that would indicate relevance but were not found:
- `$queryBuilder->expr()->eq('sys_language_uid', -1)`
- `$row['sys_language_uid'] === -1`
- `LanguageAspect::*` with negative value handling
- TCA `languageField` configuration

---

## 5. Misclassification Risks

### False Positives

| Risk | Location | Mitigation |
|------|----------|------------|
| `STATE_INFO = -1` | `InfoboxViewHelper.php` | Constant name and class context (`Be\InfoboxViewHelper`) clearly indicate UI state, not language |
| Link ViewHelper `language` argument | `Uri/PageViewHelper.php`, etc. | Accepts string values passed to URL builder; no local numeric comparison or database interaction |
| FlexForm `<language index="lDEF">` | Test fixture XML | FlexForm structure tag, not database language field |

### False Negatives

| Risk | Assessment |
|------|------------|
| Language parameter passthrough to downstream services | ViewHelpers pass `language` argument to `LinkFactory`/`UriBuilder` without local interpretation; any `-1` handling would occur in Core, not Fluid |

---

## 6. Tests and Fixtures (Isolated)

**Test fixture CSV files with `sys_language_uid` column:**

| File | Tables | Language Values Present |
|------|--------|------------------------|
| `Tests/Functional/Fixtures/pages.csv` | `pages` | `0`, `1` |
| `Tests/Functional/Fixtures/ViewHelpers/ImageViewHelper/fal_image.csv` | `sys_file_metadata`, `sys_file_reference` | `0` |

**Observation:** No `-1` language values exist in any test fixture data.

**Non-binding observations:**
- Test fixtures use standard language value `0` (default language) and `1` (translation)
- No test cases exercise negative language identifier behavior
- Tests do not verify language-related database query behavior (extension has no such logic)
