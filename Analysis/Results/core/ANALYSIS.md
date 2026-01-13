# Analysis – ext:core

## 0. Scope Coverage

**Searched top-level directories:**

- `Classes/` – all productive PHP code
- `Configuration/` – TCA definitions and service configuration
- `Tests/` – functional and unit tests (isolated in Section 6)

**Productive files verified via direct read:**

- `Classes/Authentication/BackendUserAuthentication.php`
- `Classes/Configuration/Tca/TcaEnrichment.php`
- `Classes/Configuration/Tca/TcaPreparation.php`
- `Classes/DataHandling/DataHandler.php`
- `Classes/DataHandling/SlugHelper.php`
- `Classes/DataHandling/Localization/DataMapProcessor.php`
- `Classes/Domain/Repository/PageRepository.php`
- `Classes/Resource/Index/MetaDataRepository.php`
- `Configuration/TCA/Overrides/pages.php`

**Excluded areas (justification):**

- `Classes/Locking/SemaphoreLockStrategy.php` – `-1` is ftok() error return, unrelated to language
- `Classes/Resource/Driver/LocalDriver.php` – `-1` is filter callback return value convention, unrelated to language
- `Classes/Resource/Search/Result/DriverFilteredSearchResult.php` – same filter callback pattern
- `Documentation/` – changelog/historical documentation, not executable code
- Character/numeric handling in utility classes – unrelated to language field semantics

---

## 1. Determination of Language Fields

Language field names in ext:core are derived through:

**Primary: TCA Schema Capability API**
```php
$schema->getCapability(TcaSchemaCapability::Language)->getLanguageField()->getName()
$schema->getCapability(TcaSchemaCapability::Language)->getTranslationOriginPointerField()->getName()
```

**Secondary: Direct TCA ctrl access**
```php
$tableDefinition['ctrl']['languageField']        // typically 'sys_language_uid'
$tableDefinition['ctrl']['transOrigPointerField'] // typically 'l10n_parent'
```

**TCA definitions in this extension:**

| Table | languageField |
|-------|---------------|
| pages | sys_language_uid |
| sys_category | sys_language_uid |
| sys_file_collection | sys_language_uid |
| sys_file_reference | sys_language_uid |
| sys_file_metadata | sys_language_uid |

---

## 2. Language-Field Usage with Negative Values

### 2.1 PageRepository::getRecordOverlay()

**File:** `Classes/Domain/Repository/PageRepository.php:691`

```php
$incomingLanguageId = (int)($row[$languageField] ?? 0);
// Return record for ALL languages untouched
if ($incomingLanguageId === -1) {
    return $row;
}
```

**Comparison type:** `=== -1`

**Data flow:**
```
DB row[$languageField] → (int) cast → $incomingLanguageId → === -1 comparison → early return (bypass overlay)
```

---

### 2.2 DataMapProcessor::collectItems()

**File:** `Classes/DataHandling/Localization/DataMapProcessor.php:212`

```php
// elements using "all language" cannot be localized
if ($item->getLanguage() === -1) {
    unset($item);
    continue;
}
```

**Comparison type:** `=== -1`

**Data flow:**
```
DataMapItem::build() → $item->language (from DB field) → getLanguage() → === -1 comparison → skip item
```

---

### 2.3 BackendUserAuthentication::checkLanguageAccess()

**File:** `Classes/Authentication/BackendUserAuthentication.php:608`

```php
// Language must either be explicitly allowed OR the lang Value be "-1" (all languages)
if ($langValue !== -1 && !$this->check('allowed_languages', (string)$langValue)) {
    return false;
}
```

**Comparison type:** `!== -1`

**Data flow:**
```
$langValue (from record or SiteLanguage) → (int) cast → !== -1 comparison → access grant/deny
```

---

### 2.4 DataHandler::processCmdmap() – paste operation

**File:** `Classes/DataHandling/DataHandler.php:3238`

```php
// Reset language for a -1 element from original record if copied or moved into language 0
if ($row[$languageField] === -1 && (int)$languageId === 0) {
    $value['update'][$languageField] = $row[$languageField];
}
```

**Comparison type:** `=== -1`

**Data flow:**
```
DB $row[$languageField] → === -1 comparison → preserve -1 value during paste to language 0
```

---

### 2.5 SlugHelper::applyLanguageConstraint() – skip constraint

**File:** `Classes/DataHandling/SlugHelper.php:458`

```php
if ($languageId === -1) {
    // if language is -1 "all languages" we need to check against all languages, thus not adding
    // any kind of language constraints.
    return;
}
```

**Comparison type:** `=== -1`

**Data flow:**
```
RecordState::getContext()->getLanguageId() → $languageId → === -1 comparison → skip WHERE clause
```

---

### 2.6 SlugHelper::applyLanguageConstraint() – include -1 in query

**File:** `Classes/DataHandling/SlugHelper.php:472-475`

```php
$queryBuilder->expr()->eq(
    $languageFieldName,
    $queryBuilder->createNamedParameter(-1, Connection::PARAM_INT)
)
```

**Comparison type:** `= -1` (SQL equality in OR clause)

**Data flow:**
```
-1 literal → QueryBuilder parameter → SQL WHERE clause: languageField = $languageId OR languageField = -1
```

---

### 2.7 TcaEnrichment::enrichTransOrigPointerField()

**File:** `Classes/Configuration/Tca/TcaEnrichment.php:241`

```php
'foreign_table_where' => 'AND {#' . $table . '}.{#pid}=###CURRENT_PID### AND {#' . $table . '}.{#' . $languageFieldName . '} IN (-1,0)',
```

**Comparison type:** `IN (-1, 0)` (SQL)

**Data flow:**
```
TCA enrichment → foreign_table_where string → SQL IN clause for l10n_parent selector
```

---

### 2.8 TcaPreparation::prepareCategoryFields()

**File:** `Classes/Configuration/Tca/TcaPreparation.php:91`

```php
$fieldConfig['config']['foreign_table_where'] ??= ' AND {#sys_category}.{#sys_language_uid} IN (-1, 0)';
```

**Comparison type:** `IN (-1, 0)` (SQL)

**Data flow:**
```
TCA preparation → foreign_table_where default → SQL IN clause for category selector
```

---

### 2.9 MetaDataRepository::findByFileUid()

**File:** `Classes/Resource/Index/MetaDataRepository.php:106`

```php
$queryBuilder->expr()->in('sys_language_uid', $queryBuilder->createNamedParameter([0, -1], Connection::PARAM_INT_ARRAY))
```

**Comparison type:** `IN (0, -1)` (SQL)

**Data flow:**
```
[0, -1] array → QueryBuilder parameter → SQL WHERE sys_language_uid IN (0, -1)
```

---

### 2.10 Configuration/TCA/Overrides/pages.php – exclusion

**File:** `Configuration/TCA/Overrides/pages.php:24`

```php
// sys_language_uid = -1 is not allowed.
$GLOBALS['TCA']['pages']['columns']['l10n_parent']['config']['foreign_table_where'] = 'AND {#pages}.{#uid}=###CURRENT_PID### AND {#pages}.{#sys_language_uid} = 0';
```

**Comparison type:** N/A (exclusion of -1 from default pattern)

**Data flow:**
```
TCA override → replaces default IN (-1,0) with = 0 only → pages cannot have -1 as l10n_parent target
```

---

### 2.11 LanguageAspect class comment (documentation reference)

**File:** `Classes/Context/LanguageAspect.php:46`

```php
// usually you fetch language 0 and -1, then take the "contentId" and "overlay" them
```

**Comparison type:** N/A (comment)

**Data flow:** N/A (describes expected fetch pattern for overlay processing)

---

## 3. Semantic Classification

| ID | Location | Category | Justification |
|----|----------|----------|---------------|
| 2.1 | PageRepository::getRecordOverlay | **SR** | Determines overlay bypass for "all languages" records |
| 2.2 | DataMapProcessor::collectItems | **SR** | Excludes -1 records from localization synchronization processing |
| 2.3 | BackendUserAuthentication::checkLanguageAccess | **SR** | Grants implicit access to -1 records regardless of user language restrictions |
| 2.4 | DataHandler::processCmdmap | **SR** | Preserves -1 value when pasting "all languages" content to default language context |
| 2.5 | SlugHelper::applyLanguageConstraint (skip) | **SR** | Removes language constraint to check slug uniqueness across all languages |
| 2.6 | SlugHelper::applyLanguageConstraint (include) | **SR** | Includes -1 records in uniqueness check for any specific language |
| 2.7 | TcaEnrichment::enrichTransOrigPointerField | **STR** | Structural default for l10n_parent foreign_table_where |
| 2.8 | TcaPreparation::prepareCategoryFields | **STR** | Structural default for category relation foreign_table_where |
| 2.9 | MetaDataRepository::findByFileUid | **SR** | Fetches file metadata in default or "all languages" |
| 2.10 | pages TCA override | **STR** | Structural constraint: pages table does not allow -1 in l10n_parent reference |
| 2.11 | LanguageAspect comment | **IRR** | Documentation only, no executable logic |

---

## 4. Parser Rule Derivations

### Rule 4.1: Direct equality comparison with -1

**AST signature:**
```
BinaryOp\Identical | BinaryOp\Equal | BinaryOp\NotIdentical | BinaryOp\NotEqual
  left: Variable | PropertyFetch | MethodCall | ArrayDimFetch
  right: UnaryMinus(LNumber(1)) | LNumber(-1)
```

**Detection signal:**
- Comparison operator with literal `-1` on either side
- Left operand involves variable/property containing "language" (case-insensitive)

**Context conditions:**
- Variable name contains `language`, `lang`, `languageId`, `languageField`
- Property access on `$row`, `$record`, `$item` with key containing `language` or `sys_language`
- Method call `getLanguage()`, `getLanguageId()`

**Exclusion conditions:**
- Context is workspace stage comparison (e.g., `-10`, `-20` are stage IDs)
- Context is ftok() or other system function return value
- Inside catch block or error handling for non-language operations

**Equivalent AST forms:**
```php
$var === -1
$var == -1
-1 === $var
-1 == $var
$var !== -1
$var != -1
(int)$var === -1
```

---

### Rule 4.2: IN clause with -1 in SQL string

**AST signature:**
```
String_ containing pattern: IN\s*\(\s*-1\s*,|,\s*-1\s*\)
Arg to: MethodCall[name=in|createNamedParameter]
```

**Detection signal:**
- String literal containing `IN (-1` or `, -1)` or `IN (0, -1)`
- Or array literal `[0, -1]` or `[-1, 0]` passed to `createNamedParameter`

**Context conditions:**
- String assigned to `foreign_table_where` key
- Array passed to QueryBuilder `in()` expression with language field reference
- Within TCA configuration context

**Exclusion conditions:**
- Array contains values other than language IDs (workspace IDs, etc.)

**Equivalent AST forms:**
```php
'... IN (-1, 0)'
'... IN (0, -1)'
'... IN (-1,0)'
$queryBuilder->createNamedParameter([0, -1], Connection::PARAM_INT_ARRAY)
$queryBuilder->createNamedParameter([-1, 0], Connection::PARAM_INT_ARRAY)
```

---

### Rule 4.3: Conditional skip/return on -1 language

**AST signature:**
```
If_
  cond: BinaryOp\Identical(Variable|MethodCall, UnaryMinus(LNumber(1)))
  stmts: [Return_ | Continue_ | Unset_]
```

**Detection signal:**
- `if ($languageId === -1) { return; }` pattern
- `if ($item->getLanguage() === -1) { continue; }` pattern

**Context conditions:**
- Variable/method relates to language field
- Body contains early exit (return, continue, unset)

**Exclusion conditions:**
- Variable is clearly not language-related based on surrounding context

---

### Rule 4.4: SQL equality with -1 via QueryBuilder

**AST signature:**
```
MethodCall[name=eq]
  args[0]: String_ (field name containing 'language')
  args[1]: MethodCall[name=createNamedParameter]
    args[0]: UnaryMinus(LNumber(1)) | LNumber(-1)
```

**Detection signal:**
- `$queryBuilder->expr()->eq($languageField, $queryBuilder->createNamedParameter(-1, ...))`

**Context conditions:**
- First argument is language field name or variable containing such
- Inside `or()` or `and()` expression composition

---

## 5. Misclassification Risks

### False Positives

1. **Workspace stage values:** `-10` (ready to publish) and `-20` (rejected) are workspace stage constants, not language IDs. The comparison `$stage === -10` in `BackendUserAuthentication.php:848,867` must be excluded.

2. **Filter callback return values:** `-1` as "don't include" return from file filter callbacks (`LocalDriver.php:407`, `DriverFilteredSearchResult.php:126`) is unrelated to language.

3. **Error return values:** `ftok()` returns `-1` on error (`SemaphoreLockStrategy.php:86`), unrelated to language.

4. **Numeric string processing:** `explode(':', $name, -1)` uses `-1` as limit parameter, unrelated to language.

5. **Mathematical values:** CharsetProvider contains `'-1/2'` as numeric fraction string.

### False Negatives

1. **Dynamic field name resolution:** When language field name is determined at runtime via `$schema->getCapability(...)->getLanguageField()->getName()`, the field name `sys_language_uid` is not hardcoded. Parser rules must track the variable assignment chain.

2. **Indirect comparison via DTO:** `DataMapItem::getLanguage()` returns the language value stored internally. The `-1` check happens against the return value, not directly against a field access.

3. **Configuration-driven IN clauses:** The `IN (-1, 0)` pattern appears in string literals for `foreign_table_where`. A pure AST parser needs string content analysis.

4. **Negated conditions:** `$langValue !== -1` (2.3) is semantically relevant but inverted—access is granted if NOT -1 AND not in allowed list, denied otherwise.

5. **Comment-only references:** The LanguageAspect comment (2.11) mentions `-1` but has no executable logic. A comprehensive scanner might flag it; semantic analysis should exclude.

---

## 6. Tests and Fixtures (Isolated)

### Test files with -1 language usage:

| File | Pattern | Observation |
|------|---------|-------------|
| `Tests/Functional/DataHandling/Slug/SlugHelperUniqueWithLanguageTest.php:91` | `'sys_language_uid' => -1` | Test fixture creates record with language -1 |
| `Tests/Functional/DataScenarios/Regular/AbstractActionTestCase.php:83` | `'sys_language_uid' => -1` | Test creates content with "Language set to all" |
| `Tests/Functional/DataScenarios/Regular/AbstractActionTestCase.php:122` | `'sys_language_uid' => '-1'` | Test modifies record to language -1 (string) |
| `Tests/Functional/DataScenarios/Regular/AbstractActionTestCase.php:180` | Comment referencing -1 behavior | Documents paste behavior for -1 elements |
| `Tests/Unit/Configuration/Tca/TcaPreparationTest.php:79,169,206` | `IN (-1, 0)` in expected output | Verifies TcaPreparation produces correct foreign_table_where |
| `Tests/Functional/Configuration/FlexForm/FlexFormToolsTest.php:1420,1432` | `IN (-1, 0)` in expected output | Verifies FlexForm category field configuration |

### Fixture TCA definitions:

| File | Pattern |
|------|---------|
| `Tests/Functional/Fixtures/Extensions/test_mm/Configuration/TCA/tx_test_mm.php:70,107` | `IN (-1, 0)` and `IN (-1,0)` |
| `Tests/Functional/Fixtures/Extensions/test_mm/Configuration/TCA/Overrides/tt_content.php:11,27` | `IN (-1, 0)` |

**Assessment:** Test patterns are **provably equivalent** to productive code patterns in TcaEnrichment and TcaPreparation. The `-1` handling in tests mirrors the semantic behavior documented in Section 2.

### Non-binding observations:

- Tests exercise both creation (`sys_language_uid => -1`) and modification to `-1`
- String cast `'-1'` in test (line 122) is implicitly converted, matching productive DataHandler behavior
- No tests appear to verify the `pages` table exclusion of `-1` (TCA override in 2.10)
