# Analysis – EXT:info

## 0. Scope Coverage

### Searched top-level directories
- `Classes/Controller/` – 4 PHP files (3 controllers + 1 event)
- `Configuration/` – 4 files (Services.yaml, JavaScriptModules.php, Backend/Modules.php, page.tsconfig)
- `Resources/Public/JavaScript/` – 1 file (translation-status.js)
- `Tests/Functional/` – 1 test class + 2 CSV fixtures

### Productive files verified via direct read
- `TranslationStatusController.php` – fully read
- `PageInformationController.php` – fully read
- `InfoModuleController.php` – fully read
- `page.tsconfig` – fully read
- `translation-status.js` – fully read

### Justification for excluded areas
- `Resources/Private/Templates/*.fluid.html` – presentation layer, no database queries
- `Resources/Private/Language/*.xlf` – UI label translations only
- Event class contains no language logic (pass-through container)

---

## 1. Determination of Language Fields

Language field names are derived via TCA schema capability APIs:

```php
$pagesSchema = $this->tcaSchemaFactory->get('pages');
$languageFieldName = $pagesSchema->getCapability(TcaSchemaCapability::Language)->getLanguageField()->getName();
$translationOriginFieldName = $pagesSchema->getCapability(TcaSchemaCapability::Language)->getTranslationOriginPointerField()->getName();
```

Additionally:
- `LanguageAwareSchemaCapability` used in `TranslationStatusController::getLangStatus()`
- One hardcoded reference: `'sys_language_uid'` in `TranslationStatusController::getContentElementCount()` for `tt_content` table

---

## 2. Language-Field Usage with Negative Values

**No occurrences found.**

Exhaustive search patterns applied:
- `-1` literal in any context
- `< 0` comparisons
- `<= -1` comparisons
- `=== -1` or `== -1` comparisons
- `IN (-1, ...)` query patterns
- `LanguageAll`, `ALL_LANGUAGE` constants

All language value comparisons in this extension use:
- `=== 0` (default language check)
- `> 0` (non-default language check)
- `= $languageId` where `$languageId` originates from `SiteLanguage::getLanguageId()` (always >= 0)

---

## 3. Semantic Classification

**Not applicable** – no negative language identifier usage exists in this extension.

---

## 4. Parser Rule Derivations

**Not applicable** – no negative language identifier patterns to detect.

### Observed patterns (for reference, not requiring parser rules):

| Pattern | Location | Semantic |
|---------|----------|----------|
| `$languageId === 0` | TranslationStatusController:117,210,324 | Check for default language in iteration |
| `$language > 0` | PageInformationController:193,326,396 | Branch for non-default language overlay retrieval |
| `createNamedParameter(0, PARAM_INT)` | PageInformationController:378 | Query filter for default language records |

---

## 5. Misclassification Risks

### False Positives

1. **UI "All Languages" label mapping to `0`**
   - `TranslationStatusController::getAllowedModuleOptions()` maps dropdown value `0` to label `LGL.allLanguages`
   - This is a UI-level semantic, NOT a database query filter for "all languages"
   - When `currentLanguageId === 0`, code iterates all languages rather than filtering by `-1`

2. **Hardcoded `sys_language_uid` string**
   - `getContentElementCount()` uses literal `'sys_language_uid'` for `tt_content`
   - Could be misclassified as language-specific logic requiring `-1` support
   - Actual usage: positive integer filter only

### False Negatives

1. **Indirect dependency on BackendUtility**
   - `BackendUtility::getRecordLocalization()` called with positive language IDs
   - Internal implementation may handle `-1` but this extension never passes it

2. **SiteLanguage iteration boundary**
   - `$currentSite->getAvailableLanguages()` provides the language pool
   - Extension assumes no negative IDs in returned collection

---

## 6. Tests and Fixtures (Isolated)

### Test file: `PageInformationControllerTest.php`

- Tests `getPageRecordsRecursive()` method
- All test cases use `'language' => 0` (default language)
- No test cases for negative language identifiers
- `sys_language_uid` in expected rows: always `0`

### Fixture: `pages.csv`

- Contains 4 page records
- No `sys_language_uid` column defined (defaults apply)
- No negative values present

### Non-binding observation

Test coverage does not include:
- Non-zero language filtering scenarios
- Edge cases for language value boundaries
- Behavior when `BackendUtility::getRecordLocalization()` returns empty

These gaps are unrelated to negative language identifier handling since the extension does not implement such logic.
