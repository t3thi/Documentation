# Analysis – SEO Extension

## 0. Scope Coverage

### Searched Top-Level Directories
- `/Classes` (16 PHP files) - All productive code
- `/Configuration/TCA/Overrides` - TCA field definitions (non-runtime)
- `/Tests` (14 test files) - Test and fixture data

### Productive Files Verified via Direct Read
All files in `/Classes` directory:
- `Classes/XmlSitemap/RecordsXmlSitemapDataProvider.php`
- `Classes/XmlSitemap/PagesXmlSitemapDataProvider.php`
- `Classes/HrefLang/HrefLangGenerator.php`
- `Classes/Widgets/Provider/PagesWithoutDescriptionDataProvider.php`
- `Classes/Canonical/CanonicalGenerator.php`
- `Classes/MetaTag/MetaTagGenerator.php`
- `Classes/MetaTag/TwitterCardMetaTagManager.php`
- `Classes/MetaTag/OpenGraphMetaTagManager.php`
- `Classes/XmlSitemap/XmlSitemapRenderer.php`
- `Classes/XmlSitemap/AbstractXmlSitemapDataProvider.php`
- `Classes/PageTitle/SeoTitlePageTitleProvider.php`
- `Classes/Widgets/PagesWithoutDescriptionWidget.php`
- Exception classes (contain no language logic)
- Event classes (contain no language logic)

### Justification for Excluded Areas
- **Configuration/TCA/Overrides/**: Contains only TCA field definitions with `l10n_mode` declarations; these are metadata consumed by the framework, not runtime logic.
- **Tests/Unit/**: Unit tests mock all dependencies; no actual database queries or language field evaluation occurs.
- **Tests/Functional/Fixtures/**: CSV fixture data contains language field values but represents test data state, not productive logic.
- **Event classes**: DTOs without language-related logic.
- **Exception classes**: No language-related logic.

---

## 1. Determination of Language Fields

### Method 1: TCA Schema Capability API (Dynamic)
**Location:** `Classes/XmlSitemap/RecordsXmlSitemapDataProvider.php:75-79`

**Mechanism:**
```php
if ($schema->isLanguageAware()) {
    $languageCapability = $schema->getCapability(TcaSchemaCapability::Language);
    $languageCapability->getLanguageField()->getName()
}
```

**Data Flow:**
TcaSchemaFactory → TCA schema object → LanguageAwareSchemaCapability → Field name

**Characteristics:**
- Determines language field name per table from TCA configuration
- Abstraction layer; field name not hardcoded
- Returns field name string (typically `sys_language_uid` for standard tables)

### Method 2: Hardcoded Field Name (Static)
**Location:** `Classes/Widgets/Provider/PagesWithoutDescriptionDataProvider.php:87`

**Mechanism:**
```php
->select('uid', 'pid', 'title', 'slug', 'sys_language_uid', 'l10n_parent', ...)
$row['sys_language_uid']
$row['l10n_parent']
```

**Characteristics:**
- Directly references `sys_language_uid` and `l10n_parent` field names
- Specific to `pages` table
- No abstraction layer

### Method 3: Implicit via PageRepository (Framework-Delegated)
**Locations:**
- `Classes/XmlSitemap/PagesXmlSitemapDataProvider.php:46-49`
- `Classes/HrefLang/HrefLangGenerator.php:114`
- `Classes/Canonical/CanonicalGenerator.php:117`

**Mechanism:**
```php
$pageRepository->getPagesOverlay($pages)
$pageRepository->isPageSuitableForLanguage($page, $languageAspect)
$pageRepository->getPage($pageId)
```

**Characteristics:**
- Language field determination delegated to PageRepository
- Framework applies overlay logic internally
- Extension receives already-processed records or pseudo-fields

---

## 2. Language-Field Usage with Negative Values

### Occurrence 1: Explicit `-1` in Query Constraint

**Location:** `Classes/XmlSitemap/RecordsXmlSitemapDataProvider.php:78-84`

**Code Excerpt:**
```php
$constraints[] = $queryBuilder->expr()->in(
    $languageCapability->getLanguageField()->getName(),
    [
        -1, // All languages
        $this->getLanguageId(),
    ]
);
```

**Comparison Type:** `IN (-1, <current_language_id>)`

**Data Flow:**
- SOURCE: Literal integer `-1` + Context API language ID
- TRANSFORMATION: QueryBuilder `IN` expression construction
- SINK: SQL WHERE clause on dynamically determined language field

**Context:**
- Conditional execution: Only when `$schema->isLanguageAware()` returns true
- Field name derived via TCA schema capability
- Applied to arbitrary TCA tables in sitemap generation

---

### Occurrence 2: Default Language Detection via `=== 0`

**Location:** `Classes/HrefLang/HrefLangGenerator.php:62`

**Code Excerpt:**
```php
if ($language['languageId'] === 0) {
    // No need to fetch default language
    $page = ($pageRecord['_TRANSLATION_SOURCE'] ?? null)?->toArray(true) ?? $pageRecord;
}
```

**Comparison Type:** `=== 0` (strict equality)

**Data Flow:**
- SOURCE: `$language['languageId']` from LanguageMenuProcessor
- TRANSFORMATION: Strict equality comparison with `0`
- SINK: Branch decision: use `_TRANSLATION_SOURCE` or current `$pageRecord`

**Context:**
- Part of multi-language HrefLang tag generation loop
- Value `0` represents default/base language
- Controls whether PageRepository fetch is necessary

---

### Occurrence 3: Translated Record Detection via `> 0`

**Location:** `Classes/HrefLang/HrefLangGenerator.php:116`

**Code Excerpt:**
```php
if ($languageId > 0 && !isset($pageRecord['_LOCALIZED_UID'])) {
    return [];
}
```

**Comparison Type:** `> 0` (greater than)

**Data Flow:**
- SOURCE: `$languageId` parameter (target language for overlay)
- TRANSFORMATION: Numeric comparison `> 0` AND pseudo-field absence check
- SINK: Decision to return empty array (translation unavailable)

**Context:**
- Validates successful overlay for non-default languages
- Positive language IDs indicate translation request
- Value `0` (default language) excluded from validation
- Pseudo-field `_LOCALIZED_UID` presence indicates successful overlay

---

### Occurrence 4: Implicit `sys_language_uid` Value Transport (No Negative Value)

**Location:** `Classes/Widgets/Provider/PagesWithoutDescriptionDataProvider.php:56-65`

**Code Excerpt:**
```php
$pageId = $row['l10n_parent'] ?: $row['uid'];
$site->getLanguageById($row['sys_language_uid']);
$row['frontendUrl'] = (string)$router->generateUri($pageId, ['_language' => $row['sys_language_uid']]);
```

**Comparison Type:** N/A (direct value access and transport)

**Data Flow:**
- SOURCE: `$row['sys_language_uid']` from database query result
- TRANSFORMATION: Value validation via `Site::getLanguageById()`, URL parameter assignment
- SINK: Frontend URL generation parameter

**Context:**
- No negative value handling observed
- Query selects all language versions without filtering (line 87)
- Assumes non-negative language IDs exist in site configuration

---

## 3. Semantic Classification

### Classification 1: `-1` in RecordsXmlSitemapDataProvider

**Category:** SR (Semantically Relevant)

**Justification:** Represents the TYPO3 Core semantic "all languages" special value; records with language field value `-1` are visible in all language contexts and must be included in sitemap generation for any language.

---

### Classification 2: `=== 0` in HrefLangGenerator (Line 62)

**Category:** SR (Semantically Relevant)

**Justification:** Value `0` represents the default language in TYPO3's language system; this comparison controls critical logic path determining whether to access translation source or use current page record for HrefLang tag generation.

---

### Classification 3: `> 0` in HrefLangGenerator (Line 116)

**Category:** SR (Semantically Relevant)

**Justification:** Distinguishes translated records (positive language IDs) from default language records (ID `0`) to determine whether overlay validation is required; negative or zero values represent non-translated contexts where overlay failure is not an error.

---

### Classification 4: `sys_language_uid` Direct Access in PagesWithoutDescriptionDataProvider

**Category:** SR (Semantically Relevant)

**Justification:** Direct database language field access for validation and URL generation; while no negative values are explicitly handled, the field represents database-level language semantics and would transport negative values if present in query results.

---

## 4. Parser Rule Derivations

### Rule 1: QueryBuilder IN Expression with Literal `-1` and Language Context

**AST Signature:**
```
MethodCall[
  var: QueryBuilder $queryBuilder,
  method: "expr",
  chain: MethodCall[
    method: "in",
    args: [
      Expr[MethodCall[getLanguageField()->getName()]],
      Array[
        ArrayItem[value: UnaryMinus[1] | ScalarInt[-1]],
        ArrayItem[value: MethodCall[getLanguageId()]]
      ]
    ]
  ]
]
```

**Detection Signal:**
- Method call chain: `$queryBuilder->expr()->in(...)`
- Second argument contains array literal
- Array contains scalar integer `-1` or unary minus operator on `1`
- Array contains call to method returning language ID from Context API

**Context Conditions:**
- Must occur within conditional block checking `$schema->isLanguageAware()`
- First argument must be result of language field name retrieval via TCA schema capability
- QueryBuilder instance constructed for TCA-registered table

**Exclusion Conditions:**
- Literal `-1` in array not related to language field (check first argument field name)
- Literal `-1` in IN expression for non-language fields (e.g., UID, PID)
- Comment annotation does NOT reliably indicate semantics (comment "// All languages" is descriptive but not definitive)

**Equivalent AST Forms:**
```php
// Form A: Inline array literal
$expr->in($field, [-1, $langId])

// Form B: Variable array
$values = [-1, $this->getLanguageId()];
$expr->in($field, $values)

// Form C: Negative unary operator
$expr->in($field, [-1, $context->getPropertyFromAspect('language', 'id')])

// Form D: Array merge/spread
$expr->in($field, array_merge([-1], [$languageId]))
```

---

### Rule 2: Strict Equality Comparison with Language ID `0`

**AST Signature:**
```
BinaryOp[
  operator: "===" | "!==",
  left: ArrayDimFetch[var: $language, dim: 'languageId'] | Var[$languageId],
  right: ScalarInt[0]
]
OR
[
  left: ScalarInt[0],
  right: ArrayDimFetch | Var
]
```

**Detection Signal:**
- Strict equality operators: `===` or `!==`
- One operand is scalar integer `0`
- Other operand is variable named `languageId` or array access with key `'languageId'`

**Context Conditions:**
- Variable source must trace to site language configuration or Context API language aspect
- Occurs in control flow (if/elseif/ternary) where branch affects page record retrieval or overlay logic
- Not a generic zero check (e.g., count, UID, PID)

**Exclusion Conditions:**
- Comparison context is unrelated to language (e.g., `$recordUid === 0`)
- Variable name coincidentally contains "language" but represents non-language semantics
- Zero represents empty/null state rather than default language ID

**Equivalent AST Forms:**
```php
// Form A: Direct comparison
if ($language['languageId'] === 0)

// Form B: Negated comparison
if ($language['languageId'] !== 0)

// Form C: Variable extraction
$langId = $language['languageId'];
if ($langId === 0)

// Form D: Reversed operands
if (0 === $language['languageId'])

// Form E: Method call result
if ($this->getLanguageId() === 0)
```

---

### Rule 3: Greater-Than Comparison with Language ID and Overlay Validation

**AST Signature:**
```
BinaryOp[
  operator: "&&",
  left: BinaryOp[
    operator: ">",
    left: Var[$languageId],
    right: ScalarInt[0]
  ],
  right: UnaryOp[
    operator: "!",
    operand: Isset[
      Expr: ArrayDimFetch[
        var: Var[$pageRecord],
        dim: ScalarString['_LOCALIZED_UID']
      ]
    ]
  ]
]
```

**Detection Signal:**
- Boolean AND expression
- Left operand: `$languageId > 0` or equivalent
- Right operand: Negated isset check on pseudo-field `_LOCALIZED_UID` or similar overlay indicator

**Context Conditions:**
- Occurs after PageRepository call (`getPage`, `getPagesOverlay`)
- Variable `$pageRecord` or equivalent contains result from PageRepository
- Pseudo-field name matches known overlay indicators: `_LOCALIZED_UID`, `_TRANSLATION_SOURCE`, `_REQUESTED_OVERLAY_LANGUAGE`
- Context is translation/overlay validation logic

**Exclusion Conditions:**
- `> 0` comparison on non-language variable (UID, PID, count)
- Pseudo-field check unrelated to language overlay (e.g., `_ORIG_uid` for workspace)
- Comparison used for non-overlay purposes (e.g., boundary validation)

**Equivalent AST Forms:**
```php
// Form A: Combined condition
if ($languageId > 0 && !isset($pageRecord['_LOCALIZED_UID']))

// Form B: Separate conditions
if ($languageId > 0) {
    if (!isset($pageRecord['_LOCALIZED_UID']))
}

// Form C: Alternative comparison
if ($languageId >= 1 && !isset($pageRecord['_LOCALIZED_UID']))

// Form D: Inverted logic
if (!($languageId <= 0) && empty($pageRecord['_LOCALIZED_UID']))

// Form E: Alternative pseudo-field
if ($languageId > 0 && !isset($pageRecord['_PAGES_OVERLAY_UID']))
```

---

### Rule 4: Direct sys_language_uid Field Access

**AST Signature:**
```
MethodCall[
  var: QueryBuilder,
  method: "select",
  args: [
    ...,
    ScalarString['sys_language_uid'],
    ...
  ]
]
AND
ArrayDimFetch[
  var: Var[$row],
  dim: ScalarString['sys_language_uid']
]
```

**Detection Signal:**
- String literal `'sys_language_uid'` in QueryBuilder `select()` call
- Array dimension fetch with key `'sys_language_uid'` on database result variable
- Same pattern for `'l10n_parent'`

**Context Conditions:**
- QueryBuilder constructed for table with TCA language configuration (typically `pages`)
- Result variable iterates over query results
- Field value used for: site language validation, URL parameter, conditional logic

**Exclusion Conditions:**
- String literal in non-query context (e.g., TCA configuration array)
- Field name in SQL comment or string concatenation
- Array key unrelated to database record (e.g., configuration array)

**Equivalent AST Forms:**
```php
// Form A: Multiple field select
->select('uid', 'sys_language_uid', 'l10n_parent')

// Form B: Wildcard select (implicit)
->select('*')  // includes sys_language_uid if present

// Form C: Variable field name
$field = 'sys_language_uid';
$row[$field]

// Form D: Array access chain
$record = $row;
$langId = $record['sys_language_uid'];
```

---

## 5. Misclassification Risks

### False Positives

#### FP1: Literal `-1` in Non-Language Context
**Risk:** QueryBuilder IN expressions with `-1` for non-language fields (e.g., deleted flag `-1` representing "include deleted").

**Mitigation:** Verify first argument to `expr()->in()` is language field name by:
- Tracing to `getLanguageField()->getName()` call
- Checking conditional context: `if ($schema->isLanguageAware())`
- Confirming field name is typically `sys_language_uid` or TCA `ctrl.languageField`

---

#### FP2: Variable Named `languageId` in Unrelated Context
**Risk:** Variables coincidentally named `languageId` but representing non-language data (e.g., external API response, configuration parameter).

**Mitigation:**
- Trace variable assignment to Context API (`getPropertyFromAspect('language', 'id')`)
- Verify source is SiteLanguage object (`$siteLanguage->getLanguageId()`)
- Check for LanguageAspect type annotation in method signature

---

#### FP3: Comparison with `0` for Non-Language Zero Values
**Risk:** Generic zero checks on integer fields (UID, PID, count, flags).

**Mitigation:**
- Verify variable name semantics: `languageId`, `sys_language_uid`, `langId`
- Check control flow consequence: does branch affect overlay, translation fetch, or language-specific output?
- Confirm zero represents default language, not empty/null/false state

---

#### FP4: Pseudo-Field Access for Non-Language Purposes
**Risk:** Pseudo-fields like `_ORIG_uid` (workspace), `_ORIG_pid` (versioning) contain underscore prefix but are not language-related.

**Mitigation:**
- Whitelist known language overlay pseudo-fields: `_LOCALIZED_UID`, `_TRANSLATION_SOURCE`, `_REQUESTED_OVERLAY_LANGUAGE`
- Verify context is PageRepository overlay, not workspace or versioning logic
- Check accompanying logic references language ID or overlay validation

---

### False Negatives

#### FN1: Abstracted Language Value Constants
**Risk:** Negative language values defined as class constants or enums not detected by literal matching.

**Example:**
```php
const LANGUAGE_ALL = -1;
$expr->in($field, [self::LANGUAGE_ALL, $langId])
```

**Mitigation:**
- Expand AST pattern to resolve constant/enum values
- Trace constant definition to value `-1`
- Check constant name semantics: `LANGUAGE_ALL`, `ALL_LANGUAGES`, `LANG_ALL`

---

#### FN2: Implicit Negative Language Handling in Repository Calls
**Risk:** PageRepository methods internally handle `-1` but extension code only passes language ID from Context, never explicitly references negative values.

**Example:**
```php
// Extension code - no visible -1
$langId = $context->getPropertyFromAspect('language', 'id');
$page = $pageRepository->getPage($id);  // PageRepository internally checks -1
```

**Mitigation:**
- Document that negative language handling is delegated to PageRepository
- Flag PageRepository calls in language-overlay context as implicit negative value interaction
- Classify as "Structurally Relevant" rather than "Semantically Relevant" for extension code

---

#### FN3: Dynamic Language Field Name Construction
**Risk:** Language field name built dynamically via string concatenation or variable interpolation, not detected by static schema API pattern.

**Example:**
```php
$prefix = 'sys_';
$field = $prefix . 'language_uid';
$row[$field]
```

**Mitigation:**
- Search for patterns: `$row[$field]` where `$field` is string variable
- Trace `$field` assignment for language-related substrings
- Flag dynamic field access in TCA table context for manual review

---

#### FN4: Negative Language Values in Configuration or TypoScript
**Risk:** `-1` specified in TypoScript or site configuration YAML, consumed by extension but not visible in PHP code.

**Example:**
```typoscript
plugin.tx_seo.languageFilter = -1,0,1
```

**Mitigation:**
- Scan TypoScript and YAML configuration files for numeric language values
- Trace configuration consumption in PHP code (`$this->config[...]`)
- Document configuration-driven language semantics separately from code analysis

---

## 6. Tests and Fixtures (Isolated)

### Test Observation 1: Fixture Language Values

**File:** `Tests/Functional/Fixtures/sys_category.csv`

**Data:**
```csv
"uid","sys_language_uid","title"
1,0,"Examples"
2,0,"News"
3,1,"Alternative language"
4,1,"Category in workspace"
```

**Observation:**
- Test data contains `sys_language_uid` values `0` (default) and `1` (French)
- No negative language values (`-1`) in fixture data
- **NOT provably equivalent** to productive code logic; fixtures represent specific test scenarios

---

### Test Observation 2: Language Filtering Behavior

**File:** `Tests/Functional/XmlSitemap/XmlSitemapRecordsTest.php:109-135`

**Test Case:** `default-language` vs `french-language`

**Behavior:**
- Default language request (`http://localhost/`) returns records with `sys_language_uid = 0` only
- French language request (`http://localhost/fr`) returns records with `sys_language_uid = 1` only
- **Confirms:** `RecordsXmlSitemapDataProvider` filters records by language (via `-1` OR current language logic)

**Equivalence:** **YES** - Verifies productive code behavior in `RecordsXmlSitemapDataProvider.php:78-84`

---

### Test Observation 3: No `-1` Test Coverage

**Gap:** No test case validates that records with `sys_language_uid = -1` appear in **both** default and translated sitemaps.

**Implication:** While productive code includes `-1` in the query (line 81), functional tests do not exercise this code path. The "all languages" semantic is implemented but not verified by tests.

**Status:** Non-binding observation; absence of test does not indicate code is unused, as `-1` records could exist in production databases.

---

### Test Observation 4: HrefLang Generator Language ID Comparisons

**File:** `Tests/Unit/HrefLang/HrefLangGeneratorTest.php`

**Observation:**
- Unit test mocks LanguageMenuProcessor, PageRepository, and SiteLanguage
- Does not validate specific `languageId === 0` or `languageId > 0` comparison logic
- Tests only verify output structure, not internal branching logic

**Equivalence:** **NO** - Unit tests do not exercise the language ID comparison logic (lines 62, 116); comparisons are internal implementation details not validated by tests.

---

### Summary: Test-Derived Insights

1. **Functional tests confirm:** Language filtering in `RecordsXmlSitemapDataProvider` works for positive language IDs (`0`, `1`).
2. **Gap identified:** No test coverage for `-1` (all languages) behavior despite productive code implementation.
3. **Unit tests insufficient:** Do not validate internal language ID comparison logic in `HrefLangGenerator`.
4. **Test data is not authoritative:** Fixture values represent test scenarios, not complete semantic specification.
