# Analysis – linkvalidator

## 0. Scope Coverage

### Searched Top-Level Directories
- `Classes/` - All productive PHP classes (verified)
- `Configuration/` - TCA overrides and service configuration
- `Tests/` - Functional and unit tests
- `Resources/` - Templates, language files, JavaScript
- `Documentation/` - Extension documentation
- Root files: `ext_tables.sql`, `ext_emconf.php`, `composer.json`

### Productive Files Verified via Direct Read
- `Classes/LinkAnalyzer.php` - Core link analysis logic
- `Classes/QueryRestrictions/EditableRestriction.php` - Permission-based query restrictions
- `Classes/Result/LinkAnalyzerResult.php` - Result processing for scheduler tasks
- `Classes/Repository/BrokenLinkRepository.php` - Database operations for broken links
- `Classes/Repository/PagesRepository.php` - Page translation queries
- `Classes/Task/ValidatorTask.php` - Scheduler task configuration
- `Classes/Controller/LinkValidatorController.php` - Backend module controller
- `ext_tables.sql` - Table schema definitions

### Justification for Excluded Areas
- `Resources/Private/Language/*.xlf` - XLIFF files for UI translations (not database language logic)
- `Resources/Private/Templates/` - Fluid templates (rendering only)
- `Resources/Public/JavaScript/` - Frontend JavaScript (no database interaction)
- `Documentation/` - Documentation files (no executable code)
- `Configuration/Backend/Modules.php`, `Configuration/Services.yaml` - Service wiring only

---

## 1. Determination of Language Fields

### Schema-Based Derivation
The extension uses TCA Schema APIs to dynamically determine language field names:

```php
// LinkAnalyzer.php:141-143
if ($schema->isLanguageAware()) {
    $languageCapability = $schema->getCapability(TcaSchemaCapability::Language);
    $selectFields[] = $languageCapability->getLanguageField()->getName();
}
```

### Extension-Specific Language Column
The extension defines its own `language` column in `tx_linkvalidator_link`:
```sql
-- ext_tables.sql:6
language int(11) DEFAULT '-1' NOT NULL,
```

This column stores the language value from the source record at the time the broken link was detected.

### No TCA Configuration
The `tx_linkvalidator_link` table has no TCA definition (`ctrl.languageField`) as it is a non-editable internal storage table.

---

## 2. Language-Field Usage with Negative Values

### Occurrence 1: Schema Default Value
**File:** `ext_tables.sql:6`
**Context:** Table definition

```sql
language int(11) DEFAULT '-1' NOT NULL,
```

**Comparison type:** Schema default (implicit `= -1` on INSERT without value)
**Data flow:**
```
(no explicit source) → DEFAULT constraint → tx_linkvalidator_link.language
```

---

### Occurrence 2: Fallback Assignment on Record Creation
**File:** `Classes/LinkAnalyzer.php:221-226`
**Class/Method:** `LinkAnalyzer::checkLinks()`

```php
$languageFieldName = $schema->isLanguageAware()
    ? $schema->getCapability(TcaSchemaCapability::Language)->getLanguageField()->getName()
    : false;
if ($languageFieldName && isset($entryValue['row'][$languageFieldName])) {
    $record['language'] = $entryValue['row'][$languageFieldName];
} else {
    $record['language'] = -1;
}
```

**Comparison type:** Conditional assignment with literal `-1`
**Data flow:**
```
TcaSchemaCapability::Language → getLanguageField() → $languageFieldName
  ↓
$entryValue['row'][$languageFieldName] (if exists) → $record['language']
  OR
literal -1 → $record['language'] → BrokenLinkRepository::addBrokenLink() → tx_linkvalidator_link.language
```

---

### Occurrence 3: Query Filter with OR Clause
**File:** `Classes/QueryRestrictions/EditableRestriction.php:242-257`
**Class/Method:** `EditableRestriction::buildExpression()`

```php
if ($this->allowedLanguages) {
    $additionalWhere = [];
    foreach ($this->allowedLanguages as $langId) {
        $additionalWhere[] = $expressionBuilder->or(
            $expressionBuilder->eq(
                'tx_linkvalidator_link.language',
                $this->queryBuilder->quote((string)$langId)
            ),
            $expressionBuilder->eq(
                'tx_linkvalidator_link.language',
                $this->queryBuilder->quote('-1')
            )
        );
    }
    $constraints[] = $expressionBuilder->or(...$additionalWhere);
}
```

**Comparison type:** `= '-1'` (string-quoted equality in SQL)
**Data flow:**
```
Backend user groupData['allowed_languages'] → getAllowedLanguagesForCurrentUser() → $this->allowedLanguages
  ↓
literal '-1' → QueryBuilder::quote() → SQL WHERE clause
  ↓
tx_linkvalidator_link.language (filter results to include -1 records for any allowed language)
```

---

### Occurrence 4: Implicit Exclusion via > 0 Comparison
**File:** `Classes/Result/LinkAnalyzerResult.php:210-212`
**Class/Method:** `LinkAnalyzerResult::processBrokenLinks()`

```php
$brokenLink['real_pid'] = ((int)($brokenLink['language'] ?? 0) > 0 && $tableName !== 'pages')
    ? $this->getLocalizedPageId((int)$brokenLink['record_pid'], (int)$brokenLink['language'])
    : $brokenLink['record_pid'];
```

**Comparison type:** `> 0` (implicitly excludes `-1` and `0`)
**Data flow:**
```
tx_linkvalidator_link.language → $brokenLink['language'] → (int) cast → comparison > 0
  ↓
If true AND not pages table: getLocalizedPageId() for translated page lookup
If false (including -1): use original record_pid
```

---

## 3. Semantic Classification

### Occurrence 1: Schema Default Value (`ext_tables.sql:6`)
**Category:** SR (Semantically Relevant)
**Justification:** Defines the database-level default that establishes `-1` as the marker for records without language context.

---

### Occurrence 2: Fallback Assignment (`LinkAnalyzer.php:225`)
**Category:** SR (Semantically Relevant)
**Justification:** Assigns `-1` to broken link records from non-language-aware source tables, preserving language-agnostic semantics.

---

### Occurrence 3: Query Filter OR Clause (`EditableRestriction.php:250-253`)
**Category:** SR (Semantically Relevant)
**Justification:** Ensures broken links with `language=-1` are visible to users with any language permission, treating `-1` as "applies to all languages."

---

### Occurrence 4: Implicit Exclusion (`LinkAnalyzerResult.php:210`)
**Category:** SR (Semantically Relevant)
**Justification:** Determines whether localized page lookup is needed; `-1` and `0` records skip translation lookup since they represent default/all-language content.

---

## 4. Parser Rule Derivations

### Rule 1: Literal `-1` Assignment to Language Field

**AST Signature:**
```
AssignmentExpression
  ├── Left: ArrayDimFetch[$record]['language']
  └── Right: UnaryMinus(LNumber(1)) | LNumber(-1)
```

**Detection Signal:** Assignment of `-1` to array key `'language'` or variable containing "language" in name

**Context Conditions:**
- Within method processing database records
- Presence of TCA Schema capability check (`isLanguageAware()`)
- Part of else-branch after language field existence check

**Exclusion Conditions:**
- Assignment to unrelated array keys
- Test/fixture code

**Equivalent AST Forms:**
- `$record['language'] = -1;`
- `$data['language'] = -1;`
- `$row['language'] = (int)'-1';`

---

### Rule 2: String-Quoted `-1` in Query Builder

**AST Signature:**
```
MethodCall
  ├── Object: $queryBuilder | $this->queryBuilder
  ├── Method: quote
  └── Arg: String('-1')
```

**Detection Signal:** `->quote('-1')` or `->createNamedParameter(-1, ...)` in proximity to column reference containing "language"

**Context Conditions:**
- Within `buildExpression()` or query-building method
- Expression builder `eq()` or `in()` call nearby
- Column reference to `*.language` field

**Exclusion Conditions:**
- Unrelated column comparisons
- Non-database-related quoting

**Equivalent AST Forms:**
- `$queryBuilder->quote('-1')`
- `$qb->createNamedParameter(-1, Connection::PARAM_INT)`
- `$expr->literal(-1)`

---

### Rule 3: Greater-Than-Zero Language Comparison

**AST Signature:**
```
BinaryOp\Greater
  ├── Left: Cast\Int_(ArrayDimFetch[...]['language'])
  └── Right: LNumber(0)
```

**Detection Signal:** `(int)$var['language'] > 0` pattern

**Context Conditions:**
- Array access with 'language' key
- Used as condition for translation/localization logic
- Presence of fallback value (`?? 0`)

**Exclusion Conditions:**
- Comparison against other numeric fields
- Non-language-related array access

**Equivalent AST Forms:**
- `$row['language'] > 0`
- `(int)($data['language'] ?? 0) > 0`
- `$language > 0` where `$language` is derived from language field

---

### Rule 4: SQL DEFAULT '-1' for Language Column

**AST Signature:** (SQL parsing)
```
ColumnDefinition
  ├── Name: 'language'
  ├── Type: int(...)
  └── Default: '-1' | -1
```

**Detection Signal:** Column named `language` with `DEFAULT '-1'` or `DEFAULT -1`

**Context Conditions:**
- CREATE TABLE statement
- Column type is integer variant

**Exclusion Conditions:**
- Columns not named "language" or containing "lang"
- Non-integer defaults

---

## 5. Misclassification Risks

### False Positives

1. **Task depth validation:** `ValidatorTask.php:386` contains `< 0` comparison for `$parameters['depth']` - this is depth validation, not language logic.

2. **XLIFF date attributes:** Language files contain date strings like `2011-10-17` which include `-1` as part of dates - not language identifiers.

3. **Line number references in CLAUDE.md:** The documentation file contains references like `141-144` which could match `-1` patterns.

4. **SVG path coordinates:** `Extension.svg` contains numeric paths that may include negative values.

### False Negatives

1. **Indirect language value propagation:** The `$languages` parameter in `ValidatorTask` is passed as a comma-separated string through multiple method calls. The `-1` value is never explicitly used in task configuration but could theoretically be passed.

2. **Empty array semantics:** In `EditableRestriction::getAllowedLanguagesForCurrentUser()`, an empty return array means "all languages allowed" - this differs from explicit `-1` handling and could be missed by pattern matching.

3. **Database NULL vs -1:** The schema uses `DEFAULT '-1' NOT NULL`, precluding NULL. Any analysis assuming NULL semantics would miss the `-1` marker pattern.

---

## 6. Tests and Fixtures (Isolated)

### Test Files Examined
- `Tests/Functional/LinkAnalyzerTest.php`
- `Tests/Functional/Repository/BrokenLinkRepositoryTest.php`
- `Tests/Functional/Repository/PagesRepositoryTest.php`
- `Tests/Unit/Repository/PagesRepositoryTest.php`

### Observations

**No explicit `-1` language testing found:** The functional tests use CSV fixtures that specify `'language' => 0` for all test records. No test case explicitly tests the `-1` fallback behavior.

**Test fixture: `input_languages.csv`**
Uses `sys_language_uid` values `0`, `1`, `2` for pages and content - no `-1` values in test data.

**BrokenLinkRepositoryTest expected values:**
All expected `'language'` values in data provider are `0`, confirming tests focus on default language content only.

**Non-binding observation:** The absence of `-1` test coverage suggests the fallback behavior for non-language-aware tables is untested at the functional level. This is a gap but does not indicate the productive code behavior differs from analysis.

### Provable Equivalence
None established. Tests do not exercise the `-1` code paths, so no test-to-production equivalence can be demonstrated for negative language value handling.
