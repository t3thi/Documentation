# Analysis – Backend Extension

## 0. Scope Coverage

### Searched Directories
- `Classes/` (all subdirectories)
- `Tests/` (selective verification of test patterns)

### Productive Files Verified
Direct read confirmation on:
- Domain/Repository/Localization/LocalizationRepository.php
- View/BackendLayout/ContentFetcher.php
- RecordList/DatabaseRecordList.php
- Service/PageLanguageInformationService.php
- Configuration/TranslationConfigurationProvider.php
- Form/FormDataProvider/DatabaseLanguageRows.php
- Form/FormDataProvider/TcaLanguage.php
- LinkHandler/PageLinkHandler.php
- Controller/PageLayoutController.php
- Controller/Wizard/LocalizationController.php
- View/PageLayoutContext.php
- ContextMenu/ItemProviders/PageProvider.php

### Excluded Areas
- `Resources/` – Frontend assets, no database logic
- `Tests/` – Documented separately in section 6
- Configuration files (Services.php, JavaScriptModules.php, etc.) – No language field logic

---

## 1. Determination of Language Fields

Language field names in the backend extension are determined via:

### Primary Method: TcaSchemaCapability API

```php
$schema = $tcaSchemaFactory->get($tableName);
$languageCapability = $schema->getCapability(TcaSchemaCapability::Language);
$languageField = $languageCapability->getLanguageField()->getName();
$translationOriginPointerField = $languageCapability->getTranslationOriginPointerField()->getName();
```

**Locations:**
- LocalizationRepository.php (implicit via hardcoded `sys_language_uid`)
- DatabaseRecordList.php:2571
- PageLanguageInformationService.php:196-198
- TranslationConfigurationProvider.php:146-148
- ContentFetcher.php (hardcoded `sys_language_uid`)
- ContextMenu/ItemProviders/PageProvider.php (`getLanguageField()` method)

### Fallback: TCA ctrl Array Access

```php
$languageField = $result['processedTca']['ctrl']['languageField'];
$transOrigPointerField = $result['processedTca']['ctrl']['transOrigPointerField'];
```

**Location:**
- DatabaseLanguageRows.php:46-47

### Hardcoded References
- ContentFetcher.php:84, 157, 164 – `sys_language_uid`
- LocalizationRepository.php:54, 71, 121 – `sys_language_uid`
- PageLinkHandler.php:174 – `sys_language_uid`
- Multiple controller files – `sys_language_uid` in query parameters

---

## 2. Language-Field Usage with Negative Values

### A. Explicit `-1` Value

#### A1. Query Filter Exclusion (neq)

**LocalizationRepository.php:74-77**
```php
->neq(
    'tt_content_orig.sys_language_uid',
    $queryBuilder->createNamedParameter(-1, Connection::PARAM_INT)
)
```
**Data Flow:**
- SOURCE: Method parameter `$localizedLanguage` (positive int)
- TRANSFORMATION: Join on `l10n_source` to `tt_content_orig`
- CONSTRAINT: Exclude `-1` from origin language records
- SINK: Query result for `fetchOriginLanguage()`

---

#### A2. Query Filter Inclusion (IN array)

**DatabaseRecordList.php:2565-2573**
```php
// Comment: "always include 'all languages' marker (-1) + selected languages"
$allowedLanguages = [-1, ...$filterLanguages];
->in(
    $schema->getCapability(TcaSchemaCapability::Language)->getLanguageField()->getName(),
    $queryBuilder->createNamedParameter($allowedLanguages, Connection::PARAM_INT_ARRAY)
)
```
**Data Flow:**
- SOURCE: `getSelectedLanguageIds()` returns user-selected language IDs
- TRANSFORMATION: Array spread with `-1` prepended
- CONSTRAINT: `languageField IN (-1, selected...)`
- SINK: Query for record list display

**PageLinkHandler.php:173-176**
```php
->in(
    'sys_language_uid',
    $queryBuilder->createNamedParameter([$activePageRecord['sys_language_uid'], -1], Connection::PARAM_INT_ARRAY)
)
```
**Data Flow:**
- SOURCE: `$activePageRecord['sys_language_uid']` from current page
- TRANSFORMATION: Array with active language + `-1`
- SINK: Query for linkable pages

**PageLayoutController.php:623-638**
```php
// Comment: "always include -1 (all languages) and all selected languages"
$languageIds = [-1];
foreach ($this->pageContext->selectedLanguageIds as $languageId) {
    $languageIds[] = $languageId;
    // ...
}
->in($languageField, $queryBuilder->createNamedParameter($languageIds, Connection::PARAM_INT_ARRAY))
```
**Data Flow:**
- SOURCE: `pageContext->selectedLanguageIds`
- TRANSFORMATION: Array initialized with `[-1]`, extended with selected IDs
- SINK: Query for content elements in page layout

---

#### A3. PHP Value Comparison (Equality)

**ContentFetcher.php:86-95**
```php
if ($recordLanguage === -1) {
    // Record is set to "all languages", place it according to view mode.
    if ($isLanguageComparisonMode) {
        // Force the record to only be shown in default language in "Languages" view mode.
        $recordLanguage = 0;
    } else {
        // Force the record to be shown in the currently active language in "Columns" view mode.
        $recordLanguage = $languageId;
    }
}
```
**Data Flow:**
- SOURCE: `$record['sys_language_uid']` from database
- TRANSFORMATION:
  - If `-1` AND language comparison mode → map to `0`
  - If `-1` AND columns mode → map to `$languageId`
- SINK: Array key for `$fetchedContentRecords[$recordLanguage][$colPos]`

**ContentFetcher.php:164-166**
```php
if ((int)$contentElement['sys_language_uid'] === -1) {
    continue;
}
```
**Data Flow:**
- SOURCE: `$contentElement['sys_language_uid']` from database
- TRANSFORMATION: Skip records with `-1`
- SINK: Translation info processing loop

---

#### A4. PHP Value Comparison (Inequality)

**ContentFetcher.php:156-158**
```php
// Comment: "Eliminate records with '-1' as sys_language_uid since they can not be translated"
array_filter($contentRecordsInDefaultLanguage, static function (array $record): bool {
    return (int)($record['sys_language_uid'] ?? 0) !== -1;
})
```
**Data Flow:**
- SOURCE: `$contentRecordsInDefaultLanguage` array
- TRANSFORMATION: Filter removes records where `sys_language_uid === -1`
- SINK: `$untranslatedRecordUids` for translation status tracking

**LocalizationController.php:246**
```php
// Comment: "Exclude 'All languages' (-1) and default language (0) for target language selection"
if ($languageUid !== -1 && $languageUid !== 0) {
    $availableLanguages[] = $language;
}
```
**Data Flow:**
- SOURCE: `$systemLanguages` from TranslationConfigurationProvider
- TRANSFORMATION: Exclude `-1` and `0` from available targets
- SINK: JSON response for localization wizard

---

#### A5. PHP Array Key Access

**PageLayoutContext.php:212-213**
```php
if ($languageId === -1) {
    return $this->siteLanguages[-1];
}
```
**Data Flow:**
- SOURCE: Method parameter `$languageId`
- TRANSFORMATION: Direct array access with `-1` as key
- SINK: Return SiteLanguage object for "all languages"

**TcaLanguage.php:103, 111**
```php
if (($table !== 'pages' && isset($result['systemLanguageRows'][-1])) || $userDefinedItems !== []) {
    // ...
}
if ($table !== 'pages' && isset($result['systemLanguageRows'][-1])) {
    $fieldConfig['config']['items'][] = [
        'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.allLanguages',
        'value' => -1,
        'icon' => 'flags-multiple',
    ];
}
```
**Data Flow:**
- SOURCE: `$result['systemLanguageRows']` populated by DatabaseSystemLanguageRows provider
- TRANSFORMATION: Check for `-1` key, add TCA select item with value `-1`
- SINK: FormEngine field configuration

---

#### A6. PHP in_array Check

**PageProvider.php:274, 327, 348**
```php
&& !in_array($this->record[$this->getLanguageField()] ?? false, [0, -1])
```
**Data Flow:**
- SOURCE: `$this->record[$languageField]` from database
- TRANSFORMATION: Check if value is `0` or `-1` (returns false if match)
- SINK: Permission check for context menu item visibility (new/edit/paste actions)

---

### B. Range Comparison with 0 (Implicit `-1` Exclusion)

#### B1. Less Than or Equal (lte)

**DatabaseRecordList.php:2592-2593**
```php
$queryBuilder->expr()->lte($schema->getCapability(TcaSchemaCapability::Language)->getLanguageField()->getName(), 0)
```
**Data Flow:**
- SOURCE: No language filter set
- TRANSFORMATION: `languageField <= 0` includes default (0) and "all languages" (-1)
- COMBINED WITH: `OR translationOriginPointerField = 0`
- SINK: Query for record list fallback when no filter active

---

#### B2. Greater Than (gt, >)

**TranslationConfigurationProvider.php:188-192**
```php
$queryBuilder->expr()->gt(
    $languageFieldName,
    $queryBuilder->createNamedParameter(0, Connection::PARAM_INT)
)
```
**Data Flow:**
- SOURCE: `translationInfo()` method parameter `$languageUid = 0` (all languages requested)
- TRANSFORMATION: `languageField > 0` retrieves only translations (excludes 0 and -1)
- SINK: Query for translation records

**TranslationConfigurationProvider.php:149**
```php
if ($row[$languageFieldName] > 0) {
    return 'Record "..." seems to be a translation already...';
}
```
**Data Flow:**
- SOURCE: `$row` from database or method parameter
- TRANSFORMATION: `> 0` check identifies translations (0 and -1 are not translations)
- SINK: Early return with error message

**LocalizationController.php:297**
```php
if ($languageUid > 0) { // Skip default language (0) and "All languages" (-1)
    // getRecordLocalization...
}
```
**Data Flow:**
- SOURCE: `array_keys($systemLanguages)` iteration
- TRANSFORMATION: `> 0` excludes default and "all languages"
- SINK: Existing language UID collection for source language selection

---

#### B3. Less Than or Equal (<=)

**DatabaseLanguageRows.php:85**
```php
// Comment: "Continue if this system language record does not exist or if 0 or -1 is requested"
if ($additionalLanguageUid <= 0
    || !isset($result['systemLanguageRows'][$additionalLanguageUid])
    || $additionalLanguageUid === (int)$result['databaseRow'][$languageField]
) {
    continue;
}
```
**Data Flow:**
- SOURCE: `options.additionalPreviewLanguages` TSconfig value
- TRANSFORMATION: `<= 0` skips default (0) and "all languages" (-1)
- SINK: Skip iteration for additional language overlay fetching

---

#### B4. Not Equal to Zero (neq 0, != 0)

**PageLanguageInformationService.php:213-216**
```php
$queryBuilder->expr()->neq(
    $languageField,
    0
)
```
**Data Flow:**
- SOURCE: `fetchExistingTranslations()` for page translations
- TRANSFORMATION: `!= 0` retrieves translations (includes -1 if present in database)
- COMBINED WITH: `translationOriginField = pageId`
- SINK: Existing translations array

---

### C. Type Annotations

**TranslationConfigurationProvider.php:40**
```php
/**
 * @phpstan-type LanguageRef -1|0|positive-int
 */
```
**Data Flow:**
- SOURCE: PHPStan static analysis type definition
- TRANSFORMATION: Declares `-1` as valid language reference type
- SINK: Method signatures using `@return array<LanguageRef, ...>`

---

## 3. Semantic Classification

### SR (Semantically Relevant)

| Location | Category | Justification |
|----------|----------|---------------|
| LocalizationRepository.php:76 | SR | Excludes "all languages" marker from origin language query to prevent invalid translation chain detection |
| ContentFetcher.php:86 | SR | Transforms `-1` into language-specific display logic; affects page layout rendering based on view mode |
| ContentFetcher.php:157 | SR | Excludes `-1` records from untranslated record tracking; records with `-1` cannot be translated |
| ContentFetcher.php:164 | SR | Skips `-1` records in translation status processing; prevents invalid translation mode detection |
| DatabaseRecordList.php:2566 | SR | Includes `-1` in allowed languages to display records marked "all languages" in record list |
| DatabaseRecordList.php:2592 | SR | Fallback query includes `<= 0` to show default language and "all languages" records when no filter active |
| PageLinkHandler.php:175 | SR | Includes `-1` in query to show "all languages" pages as linkable targets |
| PageLayoutController.php:624 | SR | Always includes `-1` in query to display "all languages" content elements in page layout |
| LocalizationController.php:246 | SR | Excludes `-1` from target language selection; "all languages" is not a valid translation target |
| LocalizationController.php:297 | SR | Skips `-1` when collecting existing translations; prevents treating "all languages" as translation |
| TranslationConfigurationProvider.php:189 | SR | Excludes `-1` from translation query via `> 0`; "all languages" records are not translations |
| PageProvider.php:274, 327, 348 | SR | Restricts context menu actions to default or "all languages" records; translations cannot be copied/new page created |

### STR (Structurally Relevant)

| Location | Category | Justification |
|----------|----------|---------------|
| TcaLanguage.php:103, 111, 114 | STR | Adds `-1` as TCA select item for non-page tables; populates form field options |
| PageLayoutContext.php:212-213 | STR | Array access pattern for retrieving "all languages" SiteLanguage object; data structure navigation |
| TranslationConfigurationProvider.php:40 | STR | Type annotation declares `-1` as valid language reference type; static analysis boundary |

### IRR (Not Relevant for Productive Logic)

| Location | Category | Justification |
|----------|----------|---------------|
| TranslationConfigurationProvider.php:70 | IRR | Comment about page=0 having no "-1" selectable; documentation only, no code logic |

---

## 4. Parser Rule Derivations

### Rule 1: QueryBuilder neq() with -1

**AST Signature:**
```
MethodCall
  var: MethodCall(name: "expr")
  name: "neq"
  args: [
    Arg(value: String | MethodCall),  // field name
    Arg(value: MethodCall(name: "createNamedParameter", args: [
      Arg(value: UnaryOp_Minus(expr: LNumber(1))),
      ...
    ]))
  ]
```

**Detection Signal:**
- Method name `neq`
- Second argument is `createNamedParameter()` with first argument `-1`

**Context Conditions:**
- First argument (field name) must match language field pattern:
  - Exact: `sys_language_uid`
  - Dynamic: Result of `getLanguageField()->getName()`
  - Via capability: `getCapability(TcaSchemaCapability::Language)->getLanguageField()->getName()`

**Exclusion Conditions:**
- First argument is non-language field (e.g., `uid`, `pid`, `deleted`)

**Equivalent AST Forms:**
- Scalar type: `Connection::PARAM_INT` (explicit)
- Scalar type omitted (implicit int casting)

---

### Rule 2: QueryBuilder in() with -1 in Array

**AST Signature:**
```
MethodCall
  name: "in"
  args: [
    Arg(value: String | MethodCall),  // language field
    Arg(value: MethodCall(name: "createNamedParameter", args: [
      Arg(value: Array(items: [
        ArrayItem(value: UnaryOp_Minus(expr: LNumber(1))),
        ...
      ])),
      Arg(value: ClassConstFetch(name: "PARAM_INT_ARRAY"))
    ]))
  ]
```

**Detection Signal:**
- Method name `in`
- Second argument array contains `-1` as first or any element

**Context Conditions:**
- First argument is language field (see Rule 1)
- Array construction uses spread operator: `[-1, ...$otherLanguages]`
- OR explicit array: `[$var, -1]`

**Exclusion Conditions:**
- Array does not contain language field as target

**Equivalent AST Forms:**
- Array with `-1` at any position
- Array spread: `[-1, ...$filterLanguages]`
- Explicit construction: `[$activeLanguage, -1]`

---

### Rule 3: QueryBuilder lte() with 0

**AST Signature:**
```
MethodCall
  name: "lte"
  args: [
    Arg(value: MethodCall),  // getLanguageField()->getName()
    Arg(value: LNumber(0))
  ]
```

**Detection Signal:**
- Method name `lte` (less than or equal)
- Second argument is `0` (not wrapped in createNamedParameter)

**Context Conditions:**
- First argument is language field
- Used in OR expression: `lte(languageField, 0) OR eq(translationOriginPointerField, 0)`

**Exclusion Conditions:**
- First argument is timestamp/date field (e.g., `starttime`, `endtime`)
- First argument is sorting/position field

**Equivalent AST Forms:**
- Direct value: `0`
- Expression: `$queryBuilder->createNamedParameter(0, Connection::PARAM_INT)`

---

### Rule 4: QueryBuilder gt() with 0

**AST Signature:**
```
MethodCall
  name: "gt"
  args: [
    Arg(value: String | MethodCall),  // language field
    Arg(value: MethodCall(name: "createNamedParameter", args: [
      Arg(value: LNumber(0)),
      ...
    ]))
  ]
```

**Detection Signal:**
- Method name `gt` (greater than)
- Second argument is `0`

**Context Conditions:**
- First argument is language field
- Query is selecting translations (WHERE clause includes translationOriginPointerField condition)

**Exclusion Conditions:**
- First argument is `uid`, `pid`, or other numeric field unrelated to language

**Equivalent AST Forms:**
- PHP comparison: `$row[$languageFieldName] > 0`
- Direct value: `> 0` without createNamedParameter

---

### Rule 5: PHP Equality Comparison with -1

**AST Signature:**
```
BinaryOp_Identical | BinaryOp_Equal | BinaryOp_NotIdentical | BinaryOp_NotEqual
  left: ArrayDimFetch(
    var: Variable,
    dim: String(value: "sys_language_uid")
  )
  right: UnaryOp_Minus(expr: LNumber(1))
```

**Detection Signal:**
- Binary operation: `===`, `==`, `!==`, `!=`
- One operand is array access with `sys_language_uid` key
- Other operand is `-1` literal

**Context Conditions:**
- Array access target is:
  - Database row: `$record['sys_language_uid']`
  - Form data: `$result['databaseRow'][$languageField]`
  - DTO property: `$this->record[$this->getLanguageField()]`

**Exclusion Conditions:**
- Array key is non-language field

**Equivalent AST Forms:**
- With cast: `(int)$record['sys_language_uid'] === -1`
- With null coalescing: `(int)($record['sys_language_uid'] ?? 0) !== -1`
- Variable storage: `$recordLanguage === -1` where `$recordLanguage` is assigned from language field

---

### Rule 6: PHP Range Comparison (<= 0)

**AST Signature:**
```
BinaryOp_SmallerOrEqual
  left: Variable | ArrayDimFetch
  right: LNumber(0)
```

**Detection Signal:**
- Operator: `<=`
- Right operand is `0`
- Left operand is variable holding language ID

**Context Conditions:**
- Variable name contains `language` substring (case-insensitive)
- OR variable is assigned from language field array access
- Used in conditional: `if ($languageId <= 0) { continue; }`

**Exclusion Conditions:**
- Variable is timestamp/date related
- Comparison is in mathematical calculation context

**Equivalent AST Forms:**
- Alternative: `$languageId < 1`
- Alternative: `in_array($languageId, [0, -1])`

---

### Rule 7: in_array with [0, -1]

**AST Signature:**
```
FuncCall
  name: "in_array"
  args: [
    Arg(value: ArrayDimFetch | Variable),  // language value
    Arg(value: Array(items: [
      ArrayItem(value: LNumber(0)),
      ArrayItem(value: UnaryOp_Minus(expr: LNumber(1)))
    ])),
    Arg(value: ConstFetch(name: "true"), optional)  // strict comparison
  ]
```

**Detection Signal:**
- Function name: `in_array`
- Second argument is array with exactly `[0, -1]`

**Context Conditions:**
- First argument accesses language field
- Used in boolean context (permission checks, visibility conditions)

**Exclusion Conditions:**
- Array contains other values besides 0 and -1

**Equivalent AST Forms:**
- Order variation: `[0, -1]` or `[-1, 0]`
- Negation: `!in_array($val, [0, -1])` means "is translation"

---

### Rule 8: Array Key Access with -1

**AST Signature:**
```
ArrayDimFetch
  var: Variable | PropertyFetch
  dim: UnaryOp_Minus(expr: LNumber(1))
```

**Detection Signal:**
- Array dimension fetch with `-1` as key

**Context Conditions:**
- Array variable name contains `language` or `systemLanguage`
- Usage: `isset($array[-1])` (check for presence)
- OR direct access: `$array[-1]` (retrieve "all languages" data)

**Exclusion Conditions:**
- Array is non-language related (e.g., error codes, status flags)

**Equivalent AST Forms:**
- `isset($result['systemLanguageRows'][-1])`
- `$this->siteLanguages[-1]`

---

## 5. Misclassification Risks

### False Positives

#### FP1: Non-Language Integer Comparisons

**Risk:**
Variables named with "language" substring but representing other numeric values.

**Example:**
```php
// Hypothetical: language mode flag, not language ID
$displayLanguageMode = -1; // -1 = auto, 0 = off, 1 = on
if ($displayLanguageMode === -1) { ... }
```

**Mitigation:**
- Require variable to be assigned from database language field
- OR variable name must match `sys_language_uid` or contain `languageId`/`languageUid` (camelCase)

---

#### FP2: Array Key -1 in Non-Language Context

**Risk:**
Array using `-1` as key for non-language purposes (e.g., "select all" option in generic dropdown).

**Example:**
```php
$options = [-1 => 'All Options', 1 => 'Option A', 2 => 'Option B'];
```

**Mitigation:**
- Check array variable name contains `language` or `systemLanguage`
- OR array is populated from `getSystemLanguages()` or `getAllLanguages()`

---

#### FP3: Timestamp/Date Field Comparisons

**Risk:**
Fields using `lte(field, 0)` for timestamp checks (e.g., "no start time set").

**Example:**
```php
// Checking if starttime is unset
$queryBuilder->expr()->lte('starttime', 0)
```

**Mitigation:**
- Exclude fields named: `starttime`, `endtime`, `tstamp`, `crdate`, `lastlogin`
- Require first argument to match language field name resolution pattern

---

### False Negatives

#### FN1: Indirect Variable Assignment

**Risk:**
Language field value stored in intermediate variable with non-descriptive name.

**Example:**
```php
$val = (int)$record['sys_language_uid'];
// Many lines later...
if ($val === -1) { ... }
```

**Mitigation:**
- Implement data flow tracking to trace variable origins
- Flag variables assigned from language field array access

---

#### FN2: Dynamic Field Name Construction

**Risk:**
Language field name constructed dynamically without using TcaSchemaCapability API.

**Example:**
```php
$fieldName = $GLOBALS['TCA'][$table]['ctrl']['languageField'];
$row[$fieldName] === -1
```

**Mitigation:**
- Pattern match against TCA global access with `['ctrl']['languageField']`
- Track variables assigned from TCA array access

---

#### FN3: Implicit Exclusion via IN Clause

**Risk:**
Query uses `IN (1, 2, 3)` with only positive integers, implicitly excluding `-1` and `0`, but without explicit signal.

**Example:**
```php
// Only translations in specific languages, implicitly excludes -1
$queryBuilder->expr()->in('sys_language_uid', [1, 2, 5])
```

**Mitigation:**
- Consider `IN` clauses with all positive integers as implicit `-1` exclusion
- Require comment or context (e.g., method name contains `Translation` or `Localized`)

---

#### FN4: Negated Range Checks

**Risk:**
Implicit `-1` exclusion through negated range check.

**Example:**
```php
// Equivalent to "not (language <= 0)", i.e., language > 0
!($languageId <= 0)
```

**Mitigation:**
- Detect boolean negation (`!`) applied to range comparison
- Apply De Morgan's laws to normalize to positive form

---

#### FN5: Custom Repository Methods

**Risk:**
Repository methods wrapping query logic with `-1` handling but not exposing it in method signature.

**Example:**
```php
public function findTranslations(int $pageId): array {
    // Internal query excludes -1, but method signature doesn't indicate this
    return $qb->where($qb->expr()->gt('sys_language_uid', 0))->execute();
}
```

**Mitigation:**
- Analyze method bodies even when method name doesn't suggest language handling
- Track methods accepting `$languageId` or `$languageUid` parameters

---

## 6. Tests and Fixtures (Isolated)

### Test File Occurrences

#### Tests/Functional/Form/FormDataProvider/TcaCategoryTest.php:524
```php
'foreign_table_where' => ' AND {#sys_category}.{#sys_language_uid} IN (-1, 0)',
```
**Classification:** TEST
**Justification:** Test fixture defining TCA foreign_table_where clause; validates query string parsing but does not represent productive query logic. The pattern `IN (-1, 0)` demonstrates expected TCA syntax for allowing default and "all languages" categories.

---

#### Tests/Unit/Form/FormDataProvider/TcaSlugTest.php:210, 242
```php
'sys_language_uid' => [-1],
```
**Classification:** TEST
**Justification:** Unit test data structure simulating database row with `sys_language_uid` set to `-1`. Tests FormDataProvider handling of "all languages" records but does not execute database queries.

---

### Observations

**No Provably Equivalent Patterns:**
Test fixtures use `-1` in expected data structures and TCA configuration strings, but do not demonstrate productive query execution or data flow beyond unit test boundaries. These occurrences validate that productive code *expects* `-1` as input, but do not provide additional semantic patterns beyond those documented in section 2.

**Test Coverage Indication:**
Presence of `-1` in test data confirms:
1. FormDataProvider classes must handle `sys_language_uid = -1` without errors
2. TCA `foreign_table_where` clauses support `IN (-1, 0)` syntax
3. TcaSlug processing expects language field arrays containing `-1`

These do not warrant parser rule derivation as they mirror productive patterns already documented.
