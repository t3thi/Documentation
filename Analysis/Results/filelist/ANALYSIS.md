# Analysis – filelist

## 0. Scope Coverage

### Searched top-level directories
- `./Classes/` — All PHP classes (34 files)
- `./Tests/Unit/` — Unit tests (3 files)
- `./Configuration/` — Backend configuration files (3 files)
- `./Resources/Private/Templates/` — Fluid templates (9 files)

### Productive files verified via direct read
- `Classes/FileList.php` — Primary file list rendering class
- `Classes/Controller/FileListController.php` — Main module controller
- `Classes/Controller/File/EditFileController.php` — File content editing
- `Classes/Controller/FileUpdateOnlineMediaController.php` — Online media metadata update
- `Classes/ContextMenu/ItemProviders/FileProvider.php` — Context menu provider
- `Classes/Dto/ResourceView.php` — Resource view DTO

### Justification for excluded areas
- `Classes/ElementBrowser/` — File/folder selection UI without language semantics
- `Classes/Matcher/` — Resource filtering logic independent of language
- `Classes/LinkHandler/` — Link handling without database language operations
- `Classes/Pagination/` — Pagination logic without language context
- `Classes/Type/` — Enum-like type classes
- `Resources/` — Templates use only display variables (no logic)

---

## 1. Determination of Language Fields

Language field names in this extension are derived exclusively through schema introspection:

### Primary mechanism: TcaSchemaFactory + LanguageAwareSchemaCapability

```php
// Classes/FileList.php:623-628
$schema = $this->tcaSchemaFactory->get('sys_file_metadata');
if (!$schema->isLanguageAware()) {
    return [];
}
/** @var LanguageAwareSchemaCapability $languageCapability */
$languageCapability = $schema->getCapability(TcaSchemaCapability::Language);
```

Field names are then obtained via capability methods:
- `$languageCapability->getLanguageField()->getName()` — Returns language field name (typically `sys_language_uid`)
- `$languageCapability->getTranslationOriginPointerField()->getName()` — Returns translation parent field name (typically `l10n_parent`)

### Table scope
Only `sys_file_metadata` is processed for language operations. No other tables in this extension have language-aware operations.

### No hardcoded field names
No occurrences of literal field names like `'sys_language_uid'` or `'l10n_parent'` exist in queries or field access.

---

## 2. Language-Field Usage with Negative Values

### Occurrence 1: QueryBuilder constraint (implicit -1 exclusion)

**File:** `Classes/FileList.php:639-642`

**Code:**
```php
$queryBuilder->expr()->gt(
    $languageCapability->getLanguageField()->getName(),
    $queryBuilder->createNamedParameter(0, Connection::PARAM_INT)
)
```

**Comparison type:** `> 0` (greater-than-zero)

**Data flow:**
```
$metaDataRecord['uid'] → QueryBuilder
    → WHERE languageField > 0 AND translationPointer = parentUid
    → sys_file_metadata (database)
    → $translationRecords (array of rows)
    → indexed by language ID
    → $translations (array keyed by language ID)
```

---

### Occurrence 2: System languages array filter (explicit -1 exclusion)

**File:** `Classes/FileList.php:1235-1239`

**Code:**
```php
// Fetch all system languages except "default (0)" and "all languages (-1)"
$systemLanguages = array_filter(
    $this->translateTools->getSystemLanguages(),
    static fn(array $languageRecord): bool => $languageRecord['uid'] > 0 && $backendUser->checkLanguageAccess($languageRecord['uid'])
);
```

**Comparison type:** `> 0` (greater-than-zero)

**Data flow:**
```
TranslationConfigurationProvider::getSystemLanguages()
    → array of language records with 'uid' keys
    → array_filter($languageRecord['uid'] > 0)
    → filtered language records (excludes 0 and -1)
    → translation dropdown UI
```

---

### Occurrence 3: Default language (0) access checks

**Multiple locations:**
- `Classes/FileList.php:280` — UI variable assignment
- `Classes/FileList.php:540` — HTML attribute addition
- `Classes/FileList.php:1083` — Metadata edit button guard
- `Classes/FileList.php:1396` — Online media update button guard
- `Classes/Controller/FileListController.php:408` — Edit configuration guard
- `Classes/ContextMenu/ItemProviders/FileProvider.php:250` — Context menu guard

**Code pattern:**
```php
$this->getBackendUser()->checkLanguageAccess(0)
```

**Comparison type:** Equality check (implicit `= 0` inside backend user API)

**Data flow:**
```
Backend user language permissions
    → checkLanguageAccess(0)
    → boolean (true if user can access default language)
    → UI element enablement / data attribute
```

---

## 3. Semantic Classification

### Occurrence 1: QueryBuilder constraint `> 0`

**Category:** SR (Semantically relevant)

**Justification:**
Query constraint directly filters database records by language field value, excluding both default language (0) and all-languages (-1) records from translation result set.

---

### Occurrence 2: Array filter `$languageRecord['uid'] > 0`

**Category:** SR (Semantically relevant)

**Justification:**
Filter explicitly excludes language identifiers 0 and -1 as documented in inline comment, determining which languages appear in translation dropdown UI.

---

### Occurrence 3: `checkLanguageAccess(0)` pattern

**Category:** STR (Structurally relevant)

**Justification:**
Access control logic gates metadata editing features based on default language (0) permissions; indirect language field usage through permission check rather than direct database operation.

---

## 4. Parser Rule Derivations

### Rule 1: Greater-than-zero on schema-derived language field in QueryBuilder WHERE clause

**AST signature:**
```
MethodCall(
  expr() → gt(
    MethodCall(getLanguageField() → getName()),
    MethodCall(createNamedParameter(IntegerLiteral(0), ...))
  )
)
```

**Detection signal:**
- Method call to `QueryBuilder::expr()->gt()`
- First argument is result of `getLanguageField()->getName()`
- Second argument is `createNamedParameter(0, Connection::PARAM_INT)`

**Context conditions:**
1. Query operates on table verified as language-aware via `$schema->isLanguageAware()`
2. Language field name derived via `LanguageAwareSchemaCapability`
3. Occurs within WHERE clause construction

**Exclusion conditions:**
- Comparison on non-language fields
- Comparisons not using schema-derived field names
- Greater-than checks with non-zero thresholds

**Equivalent AST forms:**
```php
// Alternative ordering
$queryBuilder->expr()->gte($fieldName, $queryBuilder->createNamedParameter(1, ...))

// Negated form
$queryBuilder->expr()->notIn($fieldName, [0, -1])
```

---

### Rule 2: Greater-than-zero filter on language record UID in array_filter

**AST signature:**
```
FunctionCall(array_filter(
  MethodCall(getSystemLanguages()),
  Closure(
    param: $languageRecord,
    body: BinaryOp(
      left: ArrayDimFetch($languageRecord, 'uid'),
      operator: '>',
      right: IntegerLiteral(0)
    )
  )
))
```

**Detection signal:**
- `array_filter()` call on result of `getSystemLanguages()`
- Closure parameter represents language record array
- Comparison of `$languageRecord['uid']` with `> 0`

**Context conditions:**
1. Source array contains language records with `uid` keys
2. Context is translation UI construction (dropdown, selection list)
3. Comment or variable name references "system languages" or "translations"

**Exclusion conditions:**
- Array filters on non-language data structures
- UID comparisons on non-language record types
- Filters with different comparison operators or thresholds

**Equivalent AST forms:**
```php
// With explicit -1 exclusion
static fn($rec): bool => $rec['uid'] > 0 && $rec['uid'] !== -1

// Negated form
static fn($rec): bool => !in_array($rec['uid'], [0, -1], true)
```

---

### Rule 3: Default language access check with literal zero

**AST signature:**
```
MethodCall(
  receiver: BackendUserAuthentication,
  method: 'checkLanguageAccess',
  args: [IntegerLiteral(0)]
)
```

**Detection signal:**
- Method call to `checkLanguageAccess()` on backend user object
- Single argument is literal integer `0`

**Context conditions:**
1. Used in conditional (if statement, ternary, boolean expression)
2. Guards metadata editing operations
3. Table context is `sys_file_metadata` or file resource operations

**Exclusion conditions:**
- `checkLanguageAccess()` with non-zero language IDs
- Other backend user method calls
- Access checks on non-metadata tables

**Equivalent AST forms:**
```php
// Negated form
!$backendUser->checkLanguageAccess(0)

// Stored in variable
$hasDefaultLanguageAccess = $backendUser->checkLanguageAccess(0);
if ($hasDefaultLanguageAccess) { ... }
```

---

## 5. Misclassification Risks

### False Positives

#### FP1: Sort multiplier -1
**Location:** `Classes/FileList.php:1655, 1665`

**Pattern:**
```php
$sortMultiplier = $this->sortDirection === SortDirection::DESCENDING ? -1 : 1;
return -1 * $sortMultiplier;
```

**Risk:**
Literal `-1` used for sort direction inversion, not language semantics.

**Mitigation:**
Require language field context; exclude arithmetic operations with `*` operator on `-1` values.

---

#### FP2: File/folder UID comparisons
**Location:** `Classes/Controller/File/EditFileController.php:65, 67`

**Pattern:**
```php
'uid' => 0,
'target' => 0,
```

**Risk:**
Array initialization with zero UIDs for form data, not language comparisons.

**Mitigation:**
Exclude array literal initializations; require comparison operators or function call contexts.

---

#### FP3: Pagination currentPage reset
**Location:** `Classes/FileList.php:471`

**Pattern:**
```php
$params = ['sortField' => $field, 'currentPage' => 0];
```

**Risk:**
Zero used for pagination reset, not language value.

**Mitigation:**
Require field name or variable name containing "language", "lang", or "sys_language"; exclude "page", "sort", "index" contexts.

---

### False Negatives

#### FN1: Indirect language value propagation
**Risk:**
Language values assigned to variables then compared without schema API calls:
```php
$langId = $record[$languageCapability->getLanguageField()->getName()];
if ($langId > 0) { ... } // Parser may miss if $langId origin not tracked
```

**Mitigation:**
Track data flow from `getLanguageField()->getName()` array access to subsequent variable uses; alias analysis required.

---

#### FN2: Language field name in string variable
**Risk:**
Dynamic field name stored in variable before query usage:
```php
$langFieldName = $languageCapability->getLanguageField()->getName();
$qb->expr()->gt($langFieldName, 0); // Parser may not recognize as language field
```

**Mitigation:**
Trace variable assignments from schema API methods; require inter-procedural analysis.

---

#### FN3: Implicit exclusion via IN operator
**Risk:**
Language filtering using positive value lists without explicit negative checks:
```php
// Hypothetical: exclude -1 and 0 without using > 0
$qb->expr()->in($langField, [1, 2, 3, ...]) // All positive language IDs
```

**Mitigation:**
Flag `IN` operator on language fields when value list contains only positive integers; heuristic may require configuration schema awareness.

---

## 6. Tests and Fixtures (Isolated)

### Test file analysis

**File:** `Tests/Unit/FileListTest.php`

**Finding:** No language-related tests.

The unit test file contains only resource sorting tests (`sortResourcesByNameSortsCorrectly`, `sortResourcesByFileextNameSortsCorrectly`) that verify collation behavior with accented characters. Tests mock `LanguageService::getLocale()` but this is for UI label translation locale, not database language field operations.

**Conclusion:** No test coverage for language field query constraints or system language filtering logic. The `> 0` pattern in productive code is **not** validated by tests, increasing risk of undetected regressions.

### Non-binding observation

The comment on line 1235 ("all languages (-1)") documents intent but is not enforced by explicit `-1` checks. A test asserting translation query excludes `-1` records or system language array excludes `-1` entries would validate documented behavior.
