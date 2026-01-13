# Analysis – EXT:redirects

## 0. Scope Coverage

### Searched top-level directories
- `/Classes` (48 productive PHP files)
- `/Configuration`
- `/Tests` (24 test PHP files)
- `/Resources`
- `/Documentation`

### Productive files verified via direct read
All 48 PHP files in `/Classes` were systematically searched for negative language identifier usage via pattern matching and targeted file reads of:
- `Classes/Service/SlugService.php`
- `Classes/Service/RedirectService.php`
- `Classes/Service/IntegrityService.php`
- `Classes/Repository/RedirectRepository.php`
- `Classes/Repository/Demand.php`
- `Classes/RedirectUpdate/SlugRedirectChangeItemFactory.php`
- `Classes/EventListener/AddUrlsForSubPagesForIntegrityCheck.php`
- `Configuration/TCA/sys_redirect.php`

### Justification for excluded areas
- `/Resources/Private/Language/*`: XLIFF translation files contain no executable language logic
- `/Resources/Public/*`: Frontend assets (JavaScript, SVG, CSS) contain no database-level language handling
- `/Documentation/*`: ReStructuredText files contain no executable code

---

## 1. Determination of Language Fields

### Pages table language field derivation

The extension employs two distinct methods to determine language field names for the `pages` table:

#### Method A: Hardcoded field name access
**Classes:**
- `SlugService`
- `SlugRedirectChangeItemFactory`

**Pattern:**
```php
$languageUid = (int)$pageRecord['sys_language_uid'];
$parentId = (int)$pageRecord['l10n_parent'];
```

Field names `'sys_language_uid'` and `'l10n_parent'` are used as literal array keys without derivation.

#### Method B: Schema API field name derivation
**Classes:**
- `IntegrityService`
- `AddUrlsForSubPagesForIntegrityCheck`

**Pattern:**
```php
$languageCapability = $schema->getCapability(TcaSchemaCapability::Language);
$languageFieldName = $languageCapability->getLanguageField()->getName();
$l10nParentFieldName = $languageCapability->getTranslationOriginPointerField()->getName();
```

Field names are derived at runtime from TCA schema capabilities. The extension does not access TCA `ctrl.languageField` directly.

### Redirect table language field handling

The `sys_redirect` table contains **no language-related fields**. Language information flows through:
- Target link parameters (`_language` parameter in t3:// links)
- Source evaluation against localized page slugs
- Event payloads containing SiteLanguage configuration objects

---

## 2. Language-Field Usage with Negative Values

### Exhaustive search results

**Patterns searched:**
- Literal `-1` in all files
- Comparisons: `< 0`, `<= -1`, `!= 0`
- Constants: `LanguageAll`, `LANGUAGE_ALL`
- Combined patterns: `sys_language_uid.*-`, `language.*-1`

**Result:** Zero occurrences of negative language identifiers in productive code.

### Non-language uses of `-1` in the extension

#### Configuration/TCA/sys_redirect.php:17
```php
'rootLevel' => -1,
```
**Context:** TCA ctrl section
**Semantic:** Record placement setting (allows records on root level AND within page tree)
**Data flow:** N/A (TCA configuration constant)

#### Classes/Repository/Demand.php:58-59, 73-74
```php
protected ?int $creationType = -1;
protected ?int $protected = -1;

public function __construct(
    ...
    ?int $creationType = -1,
    ?int $protected = -1,
    ...
) { ... }
```
**Context:** Filter object for backend module
**Semantic:** Sentinel value meaning "no filter applied"
**Data flow:** Request parameters → Demand constructor → `hasCreationType()` / `hasProtected()` checks

#### Classes/Repository/Demand.php:270, 275
```php
public function hasCreationType(): bool
{
    return $this->creationType !== null && $this->creationType !== -1;
}

public function hasProtected(): bool
{
    return $this->protected !== null && $this->protected !== -1;
}
```
**Context:** Filter presence detection
**Semantic:** Distinguishes "filter inactive" (`-1`) from "filter active" (0 or 1)
**Data flow:** Sentinel comparison → QueryBuilder constraint inclusion decision

---

## 3. Semantic Classification

### Finding: TCA rootLevel = -1
- **Category:** IRR
- **Justification:** TCA placement control unrelated to record language fields or multilingual data queries.

### Finding: Demand::creationType = -1
- **Category:** IRR
- **Justification:** Backend filter sentinel for redirect metadata field, not a language identifier.

### Finding: Demand::protected = -1
- **Category:** IRR
- **Justification:** Backend filter sentinel for redirect protection flag, not a language identifier.

### Finding: Demand::hasCreationType() comparison with -1
- **Category:** IRR
- **Justification:** Logical test for filter presence, operates on redirect metadata domain.

### Finding: Demand::hasProtected() comparison with -1
- **Category:** IRR
- **Justification:** Logical test for filter presence, operates on redirect metadata domain.

---

## 4. Parser Rule Derivations

### Conclusion: No rules required

**Rationale:**
The extension contains zero instances of negative language identifier usage in database-level language handling. All language field interactions use non-negative integer comparisons:
- `sys_language_uid = 0` (default language)
- `sys_language_uid > 0` (localized content)
- `sys_language_uid = $languageUid` (specific language match)

The literal `-1` values present in the codebase operate exclusively in non-language domains (TCA configuration, filter logic).

### Potential future rule (speculative)

If the extension were to adopt LanguageAll handling in future versions, the following rule would be required:

**AST Signature:**
```
BinaryOp[
  left: ArrayDimFetch[var: $pageRecord, dim: 'sys_language_uid']
  operator: '===' | '!=='
  right: UnaryMinus[expr: LNumber[value: 1]]
]
```

**Detection Signal:** Comparison of `$record['sys_language_uid']` against `-1`

**Context Conditions:**
- Variable name contains `page`, `record`, `row`, or `data`
- Array key is `'sys_language_uid'` OR derived from `getLanguageField()->getName()`

**Exclusion Conditions:**
- Right operand is variable named `$creationType` or `$protected`
- Comparison occurs within `Demand` class methods

---

## 5. Misclassification Risks

### False Positives

#### Risk: Demand filter sentinel detection
**Scenario:** AST parser encounters `$this->creationType !== -1`
**Mitigation:** Require left operand to be language-field array access, not object property

#### Risk: TCA configuration parsing
**Scenario:** Parser encounters `'rootLevel' => -1` in TCA arrays
**Mitigation:** Exclude matches where context is assignment to TCA ctrl keys

#### Risk: Fixture CSV data
**Scenario:** Test fixtures may contain numeric `-1` in CSV columns
**Mitigation:** Exclude file paths matching `Tests/**/Fixtures/**/*.csv`

### False Negatives

#### Risk: Dynamic field name construction
**Scenario:**
```php
$field = 'sys_language_' . 'uid';
if ($record[$field] === -1) { ... }
```
**Likelihood:** None observed in current codebase
**Impact:** Would miss LanguageAll handling if field name is dynamically assembled

#### Risk: Indirect comparison via function call
**Scenario:**
```php
if ($this->isLanguageAll($record['sys_language_uid'])) { ... }
// where isLanguageAll() internally checks === -1
```
**Likelihood:** None observed in current codebase
**Impact:** Requires interprocedural analysis to detect

#### Risk: Schema API field name variability
**Scenario:** Future TYPO3 versions allow custom language field names via TCA
**Mitigation:** Parser must resolve schema API calls (`getLanguageField()->getName()`) to match dynamic field names against comparisons

---

## 6. Tests and Fixtures (Isolated)

### Test file coverage
Searched 24 PHP test files and associated CSV fixtures for negative language value usage.

### Findings

#### Test CSV fixtures: sys_language_uid columns
**Files examined:**
- `Tests/Functional/Service/Fixtures/*.csv` (23 files)
- `Tests/Functional/EventListener/Fixtures/*.csv` (2 files)
- `Tests/Functional/RedirectUpdate/Fixtures/*.csv` (1 file)

**Result:** All `sys_language_uid` column values are non-negative integers (0, 1, 2).

**Sample from LocalizedPages.csv:**
```csv
"uid","pid","hidden","deleted","sys_language_uid","l10n_parent","slug"
10,1,0,0,0,0,"/page-1"
11,1,0,0,1,10,"/page-1-translated"
```

#### SlugServiceTest.php: _language parameter assertions
**Lines 254-257, 298-306, 346-349, 391-392, etc.:**
```php
['source_host' => '*', 'source_path' => '/dummy-1-2', 'target' => 't3://page?uid=2&_language=0'],
```

**Observation:** Test assertions verify redirect targets include `_language=0` and `_language=1` parameters. No negative language values tested.

**Classification:** IRR (tests do not exercise LanguageAll logic)

### Non-binding observation

The test suite does not contain any test cases for `-1` language handling. This confirms the extension's documented scope: it processes only explicitly assigned language versions, not "all languages" semantics.

If LanguageAll support were to be added:
- New test fixtures would require CSV rows with `sys_language_uid = -1`
- Test assertions would need to verify redirect creation behavior when source/target pages have `sys_language_uid = -1`
- Such tests would become **structurally relevant (STR)** as they would demonstrate productive-equivalent logic
