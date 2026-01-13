# Analysis – extbase

## 0. Scope Coverage

### Searched Top-Level Directories
- `Classes/` — Productive PHP code (verified)
- `Configuration/` — Services and TCA configuration (verified, no language-related -1 usage)
- `Tests/` — Functional and unit tests (documented separately)
- `Resources/` — Language files only (XLIFF, excluded per scope)

### Productive Files Verified via Direct Read
- `Classes/DomainObject/AbstractDomainObject.php`
- `Classes/Persistence/Generic/Storage/Typo3DbQueryParser.php`
- `Classes/Persistence/Generic/Mapper/DataMapper.php`
- `Classes/Persistence/Generic/Mapper/DataMapFactory.php`

### Justification for Excluded Areas
- `Resources/Private/Language/` — XLIFF UI translation files, not database-level
- `Migrations/` — Code migration utilities, no language field logic
- `Classes/Utility/LocalizationUtility.php` — XLIFF label handling, not database records

---

## 1. Determination of Language Fields

Language field names are derived through a layered approach:

1. **TCA Schema API** (`TcaSchemaFactory` + `TcaSchemaCapability::Language`)
   - `DataMapFactory::buildDataMapInternal()` calls `$schema->getCapability(TcaSchemaCapability::Language)`
   - Extracts `languageCapability->getLanguageField()->getName()` → stored in `DataMap::languageIdColumnName`

2. **DataMap Metadata Structure**
   - `DataMap` holds `languageIdColumnName`, `translationOriginColumnName`, `translationOriginDiffSourceName`
   - Used by `DataMapper` for property hydration and `Backend` for persistence

3. **Query Parser Direct Schema Access**
   - `Typo3DbQueryParser::getLanguageStatement()` directly accesses `TcaSchemaFactory` to obtain:
     - `languageCapability->getLanguageField()->getName()` → SQL column name
     - `languageCapability->getTranslationOriginPointerField()->getName()` → l10n_parent equivalent

---

## 2. Language-Field Usage with Negative Values

### Finding 2.1: Type Annotation in AbstractDomainObject

**File:** `Classes/DomainObject/AbstractDomainObject.php`
**Line:** 52
**Code:**
```php
/**
 * @var int<-1, max>|null The uid of the language of the object.
 */
protected ?int $_languageUid = null;
```
**Comparison type:** Type range specification (PHPDoc `int<-1, max>`)
**Data flow:** N/A — structural definition only

---

### Finding 2.2: Parent Language Guard in DataMapper

**File:** `Classes/Persistence/Generic/Mapper/DataMapper.php`
**Method:** `getPreparedQuery()`
**Lines:** 481–483
**Code:**
```php
$parentLanguageUid = (int)$parentObject->_getProperty(AbstractDomainObject::PROPERTY_LANGUAGE_UID);
// do not override the language when the parent language uid is set to all languages (-1)
if ($parentLanguageUid !== -1) {
    $languageUid = $parentLanguageUid;
}
```
**Comparison type:** `!== -1` (strict not-equal)
**Data flow:**
`DomainObject::_languageUid` → `(int)` cast → comparison → conditional assignment to `$languageUid` → `LanguageAspect` constructor → `QuerySettings`

---

### Finding 2.3: Default Language Query Filter (contentId = 0)

**File:** `Classes/Persistence/Generic/Storage/Typo3DbQueryParser.php`
**Method:** `getLanguageStatement()`
**Lines:** 737–740
**Code:**
```php
if (!$languageAspect->getContentId()) {
    return $this->queryBuilder->expr()->in(
        $tableAlias . '.' . $languageField,
        [$languageAspect->getContentId(), -1]
    );
}
```
**Comparison type:** `IN (0, -1)` (array literal in SQL IN clause)
**Data flow:**
`LanguageAspect::getContentId()` (returns 0) → array literal `[0, -1]` → `QueryBuilder::expr()->in()` → SQL WHERE clause

---

### Finding 2.4: Non-Overlay Mode Query Filter

**File:** `Classes/Persistence/Generic/Storage/Typo3DbQueryParser.php`
**Method:** `getLanguageStatement()`
**Lines:** 743–748
**Code:**
```php
if (!$languageAspect->doOverlays()) {
    return $this->queryBuilder->expr()->in(
        $tableAlias . '.' . $languageField,
        [$languageAspect->getContentId(), -1]
    );
}
```
**Comparison type:** `IN ($contentId, -1)` (array literal in SQL IN clause)
**Data flow:**
`LanguageAspect::getContentId()` → array literal `[$contentId, -1]` → `QueryBuilder::expr()->in()` → SQL WHERE clause

---

### Finding 2.5: All-Languages Condition in Overlay Mode

**File:** `Classes/Persistence/Generic/Storage/Typo3DbQueryParser.php`
**Method:** `getLanguageStatement()`
**Line:** 764
**Code:**
```php
// records in language 'all'
$andConditions[] = $this->queryBuilder->expr()->eq($tableAlias . '.' . $languageField, -1);
```
**Comparison type:** `= -1` (equality, integer literal)
**Data flow:**
Integer literal `-1` → `QueryBuilder::expr()->eq()` → added to `$andConditions` array → `QueryBuilder::expr()->or()` → SQL WHERE clause

---

## 3. Semantic Classification

| Finding | Category | Justification |
|---------|----------|---------------|
| 2.1 | **STR** | PHPDoc type range annotation; defines valid value domain but does not execute comparison logic |
| 2.2 | **SR** | Guards language propagation to child queries; prevents override when parent record applies to all languages |
| 2.3 | **SR** | Constructs SQL constraint including "all languages" records when querying default language (contentId=0) |
| 2.4 | **SR** | Constructs SQL constraint including "all languages" records when overlays are disabled |
| 2.5 | **SR** | Explicit OR-branch in overlay mode query to always include records with sys_language_uid=-1 |

---

## 4. Parser Rule Derivations

### Rule 4.1: Strict Inequality Against -1

**AST signature:**
```
BinaryOp\NotIdentical(
    left: Variable|MethodCall|PropertyFetch,
    right: LNumber(-1)
)
```

**Detection signal:** `!== -1` token sequence
**Context conditions:**
- Left operand derived from language property (`_languageUid`, `languageUid`, `sys_language_uid`)
- Within method handling relation/query preparation

**Exclusion conditions:**
- Comparisons in unrelated arithmetic (e.g., array index checks)

**Equivalent AST forms:**
- `$var !== -1`
- `-1 !== $var`
- `$obj->_getProperty('_languageUid') !== -1`

---

### Rule 4.2: Array Literal Containing -1 in IN Expression

**AST signature:**
```
MethodCall(
    var: MethodCall(name: 'expr'),
    name: 'in',
    args: [
        Arg(value: ...),
        Arg(value: Array(items: [..., ArrayItem(value: LNumber(-1))]))
    ]
)
```

**Detection signal:** `->expr()->in(..., [..., -1])`
**Context conditions:**
- First argument references language field (column name contains `language` or derived from schema)
- Second argument is array containing integer -1

**Exclusion conditions:**
- Array contains only positive integers or zero
- Method is not `in()` on ExpressionBuilder

**Equivalent AST forms:**
- `[$id, -1]`
- `[-1, $id]`
- `array($id, -1)`

---

### Rule 4.3: Equality Expression with -1 Literal

**AST signature:**
```
MethodCall(
    var: MethodCall(name: 'expr'),
    name: 'eq',
    args: [
        Arg(value: ...languageField...),
        Arg(value: LNumber(-1))
    ]
)
```

**Detection signal:** `->expr()->eq(..., -1)`
**Context conditions:**
- First argument is column reference to language field
- Second argument is integer literal -1

**Exclusion conditions:**
- Column name does not match language field pattern
- Value is variable rather than literal (may still be relevant but requires data-flow analysis)

**Equivalent AST forms:**
- `->expr()->eq($alias . '.' . $field, -1)`
- `->expr()->eq('tablename.sys_language_uid', -1)`

---

## 5. Misclassification Risks

### False Positives

1. **CSS/Style -1 values:** `DebuggerUtility.php:532` contains `'vertical-align' => '-12%'` — string context, not language field
2. **Date format strings:** `DateTimeConverter.php` contains ISO date patterns with hyphens — string literals, not integers
3. **Generic integer comparisons:** `Query.php:316` has `$offset < 0` — pagination validation, unrelated to language

### False Negatives

1. **Dynamic -1 via variable:** If `-1` is assigned to a variable before comparison, the literal pattern would not match:
   ```php
   $allLanguages = -1;
   if ($langUid !== $allLanguages) { ... }
   ```
   This pattern does not appear in extbase but would require data-flow tracking.

2. **Indirect schema field access:** Language field names accessed via string variables rather than direct schema API calls may escape detection if field name derivation is not traced.

3. **Core delegations:** `PageRepository::getLanguageOverlay()` handles -1 internally; extbase delegates to this without explicit -1 checks—the semantic is external to extbase code.

---

## 6. Tests and Fixtures (Isolated)

### Non-Binding Test Observations

| File | Line | Content | Notes |
|------|------|---------|-------|
| `Tests/Functional/Persistence/AddTest.php` | 76 | `$newBlog->_setProperty(AbstractDomainObject::PROPERTY_LANGUAGE_UID, -1)` | Tests persistence of "all languages" record |
| `Tests/Functional/Persistence/Generic/Storage/Typo3DbQueryParserTest.php` | 214 | `assertMatchesRegularExpression('/sys_language_uid. IN \(0, -1\)/', ...)` | Validates Finding 2.3 |
| `Tests/Functional/Persistence/Generic/Storage/Typo3DbQueryParserTest.php` | 237, 256 | `assertMatchesRegularExpression('/sys_language_uid. IN \(1, -1\)/', ...)` | Validates Findings 2.4/2.5 |

### Test Fixture TCA Configurations

| File | Content |
|------|---------|
| `Tests/Functional/Fixtures/Extensions/extbase_upload/Configuration/TCA/tx_extbaseupload_domain_model_singlefile.php:67` | `'foreign_table_where' => '... sys_language_uid IN (-1,0)'` |
| `Tests/Functional/Fixtures/Extensions/parent_child_translation/Configuration/TCA/tx_parentchildtranslation_domain_model_main.php:44,54` | `'foreign_table_where' => '... {#sys_language_uid} IN (0,-1)'` |
| `Tests/Functional/Fixtures/Extensions/parent_child_translation/Configuration/TCA/tx_parentchildtranslation_domain_model_squeeze.php:44` | `'foreign_table_where' => '... {#sys_language_uid} IN (0,-1)'` |

**Assessment:** These TCA fixtures use `foreign_table_where` constraints that mirror productive TYPO3 patterns. They are test-specific but demonstrate standard -1 inclusion for relation filtering.

### Test Data CSV

| File | Content |
|------|---------|
| `Tests/Functional/Persistence/Fixtures/TestResultAddObjectSetsDefinedLanguage.csv` | `sys_language_uid` column contains `-1` |

**Assessment:** Asserts that persistence layer correctly writes -1 to database when domain object has `_languageUid = -1`.
