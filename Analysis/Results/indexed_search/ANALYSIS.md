# Analysis – indexed_search

## 0. Scope Coverage

### Searched top-level directories
- `Classes/` (30 productive PHP files)
- `Tests/` (5 test PHP files)
- `Configuration/` (TCA and module configuration)
- `ext_tables.sql` (database schema)

### Productive files verified via direct read
- Classes/Domain/Repository/IndexSearchRepository.php (primary query construction)
- Classes/Controller/SearchController.php (search parameter handling)
- Classes/Indexer.php (indexing logic with sys_language_uid persistence)
- Classes/EventListener/FrontendGenerationPageIndexingTrigger.php (language ID extraction)
- Classes/Domain/Repository/AdministrationRepository.php (backend statistics)

### Justification for excluded areas
- `ViewHelpers/`: Display-only logic; gr_list formatting detected but no database language filtering
- `Type/` enums: Value objects without database interaction
- `Dto/`: Data transfer objects without language field logic
- `Utility/`, `Lexer`, `FileContentParser`: Content processing without sys_language_uid handling

---

## 1. Determination of Language Fields

The extension **does not use TCA** to derive language field names. The index tables (`index_phash`, `index_fulltext`, `index_words`, `index_rel`, `index_section`, `index_grlist`) are defined directly in `ext_tables.sql` with the comment "Define table and fields since it has no TCA."

Language field identification:
- **Hardcoded field name**: `sys_language_uid` (int(11) DEFAULT '0' NOT NULL) in the `index_phash` table (ext_tables.sql:20)
- **Direct reference**: The field is referenced by string literal `'sys_language_uid'` in:
  - Indexer.php:976 – during page indexing
  - Indexer.php:1108 – during file indexing
  - Indexer.php:1537 – in phash calculation (as `'sys_lang'`)
  - IndexSearchRepository.php:556, 809, 932 – in query construction and GROUP BY clauses
  - EventListener/FrontendGenerationPageIndexingTrigger.php:100 – in configuration assembly

**No metadata-driven derivation** is observed. The extension does not consult TCA `ctrl.languageField`, Schema APIs, or capability interfaces to determine the language field name.

---

## 2. Language-Field Usage with Negative Values

### Finding 1: languageWhere() method

**File**: Classes/Domain/Repository/IndexSearchRepository.php
**Method**: `languageWhere()` (lines 800–810)

**Code excerpt**:
```php
protected function languageWhere(): string
{
    // -1 is the same as ALL language.
    if ($this->languageUid < 0) {
        return '';
    }

    $expressionBuilder = $this->connectionPool->getQueryBuilderForTable('index_phash')->expr();

    return ' AND ' . $expressionBuilder->eq('IP.sys_language_uid', $this->languageUid);
}
```

**Comparison type**: `< 0`

**Data flow**:
```
Context::getAspect('language')->getId()
  → SearchController::initialize() (line 124)
  → $searchData['languageUid']
  → IndexSearchRepository::initialize() (line 164)
  → IndexSearchRepository::$languageUid (property)
  → IndexSearchRepository::languageWhere() (conditional check)
  → QueryBuilder WHERE clause (or empty string)
```

---

### Finding 2: freeIndexUidWhere() method (non-language field)

**File**: Classes/Domain/Repository/IndexSearchRepository.php
**Method**: `freeIndexUidWhere()` (lines 818–883)

**Code excerpt**:
```php
protected function freeIndexUidWhere(int $freeIndexUid): string
{
    if ($freeIndexUid < 0) {
        return '';
    }
    // ... query logic for IP.freeIndexUid filtering
}
```

**Comparison type**: `< 0`

**Data flow**:
```
SearchController::searchAction() (line 186: default -1)
  → IndexSearchRepository::doSearch($searchWords, $freeIndexUid)
  → freeIndexUidWhere($freeIndexUid)
  → QueryBuilder WHERE clause (or empty string)
```

**Note**: `freeIndexUid` is **not a language field**; it filters by indexing configuration (index_config records). Documented here due to structural similarity.

---

### Finding 3: searchRootPageIdList checks (non-language field)

**File**: Classes/Domain/Repository/IndexSearchRepository.php
**Methods**:
- `sectionTableWhere()` (line 737)
- `prepareFinalQuery_fulltext()` (line 501)
- `prepareFinalQuery()` (line 943)

**Code excerpts**:
```php
// Line 737
if (!($this->searchRootPageIdList < 0)) {
    $whereClause = $whereClause->with(/*...*/);
}

// Line 501
if ($searchRootPageIdList[0] >= 0) {
    // page filtering logic
}

// Line 943
if ($this->searchRootPageIdList >= 0) {
    // page filtering logic
}
```

**Comparison types**: `< 0`, `>= 0`

**Note**: `searchRootPageIdList` is **not a language field**; it specifies page tree root UIDs for search scope. Negative values mean "search all page trees." Documented here to distinguish from language filtering.

---

## 3. Semantic Classification

### Finding 1: languageWhere() with `languageUid < 0`

**Category**: **SR** (Semantically relevant)

**Justification**: Directly controls whether a WHERE clause filtering on the `sys_language_uid` database field is applied to search queries; `-1` bypasses language filtering to return results from all languages.

---

### Finding 2: freeIndexUidWhere() with `freeIndexUid < 0`

**Category**: **STR** (Structurally relevant)

**Justification**: Uses identical control flow pattern (`< 0` → return empty string) but operates on the `freeIndexUid` field (indexing configuration scope), not a language field; structurally equivalent but semantically distinct domain.

---

### Finding 3: searchRootPageIdList checks with `< 0` and `>= 0`

**Category**: **IRR** (Not relevant for productive logic)

**Justification**: Controls page tree filtering scope, unrelated to language or localization; negative values indicate "all page trees," not a language-related sentinel.

---

## 4. Parser Rule Derivations

### Rule 1: Detect `< 0` comparison on language field variable

**AST signature**:
```
BinaryOp(left=Name(id='languageUid'), op=Lt, right=Constant(value=0))
```

**Detection signal**:
- Variable or property name contains language-related tokens: `language`, `lang`, `sys_language`, `languageUid`
- Comparison operator: `<`
- Right-hand side: integer literal `0`

**Context conditions**:
- Must appear in a conditional statement (if, ternary, while, etc.)
- The comparison result directly or indirectly determines whether a database query constraint on a language field is applied
- The field referenced in the query construction must be a language field (e.g., `sys_language_uid`)

**Exclusion conditions**:
- Variable name is `freeIndexUid`, `searchRootPageIdList`, `rootPageId`, or similar non-language identifiers
- The field name in query construction is not a language field (check against known language field names or TCA metadata)
- Comparison appears in test fixtures or migration code (unless provably equivalent to productive code)

**Equivalent AST forms**:
```python
# Form 1: Direct property check
if ($this->languageUid < 0) { return ''; }

# Form 2: Negated comparison
if (!($languageUid >= 0)) { /* skip filter */ }

# Form 3: Array element check
if ($languageIds[0] < 0) { /* all languages */ }
```

---

### Rule 2: Detect hardcoded -1 in language parameter defaults

**AST signature**:
```
FunctionDef(
    args=arguments(defaults=[Constant(value=-1)]),
    args=[arg(arg='freeIndexUid', annotation=Name(id='int'))]
)
```

**Detection signal**:
- Function parameter with type hint `int`
- Parameter name contains `language`, `lang`, `languageUid`
- Default value is integer literal `-1`

**Context conditions**:
- Parameter is used in query construction logic
- Function documentation mentions "no filtering" or "all languages" semantics for `-1`

**Exclusion conditions**:
- Parameter name is `freeIndexUid` or other non-language identifier
- Function is a test helper or fixture generator

**Equivalent AST forms**:
```php
// Form 1: Method parameter default
protected function getDisplayResults(array $searchData, array $searchWords, array|bool $resultData, int $freeIndexUid = -1): array

// Form 2: Variable initialization
$freeIndexUid = -1;

// Form 3: Conditional assignment
$freeIndexUid = !isset($searchData['freeIndexUid']) ? -1 : $searchData['freeIndexUid'];
```

---

## 5. Misclassification Risks

### False Positives

**FP1: freeIndexUid parameter**
- **Risk**: Parameters named `freeIndexUid` use `-1` as "no filtering" sentinel with identical control flow (`< 0` checks) as language fields.
- **Mitigation**: Require that the field name in the resulting SQL query is a known language field (e.g., `sys_language_uid`, `languageField` from TCA). Parser must track data flow from conditional check to query construction.

**FP2: searchRootPageIdList comparisons**
- **Risk**: The property `searchRootPageIdList` is checked with `< 0` to mean "all page trees."
- **Mitigation**: Exclude variable names matching `*RootPageIdList`, `*PageId`, `*Pid` from language field detection.

**FP3: gr_list with "0,-1" string**
- **Risk**: The string `"0,-1"` appears in gr_list fields (frontend user group identifiers), where `-1` represents "all users" (not logged in).
- **Mitigation**: This is a string literal, not an integer comparison, and gr_list is not a language field. Parser should ignore string literals containing `-1` unless they are coerced to integers in a language field context.

---

### False Negatives

**FN1: Hardcoded 'sys_language_uid' string literals**
- **Risk**: The language field name is never derived from TCA or metadata APIs in this extension; it is always the literal string `'sys_language_uid'`. Parsers relying on TCA introspection will miss this extension's language logic.
- **Mitigation**: Parser must also detect direct SQL field references matching known language field names (e.g., `sys_language_uid`) in QueryBuilder expressions, even without TCA metadata.

**FN2: Language value in phash calculation**
- **Risk**: The language ID is serialized into the `phash_grouping` hash calculation (Indexer.php:1537) as `'sys_lang' => $this->conf['sys_language_uid']`. This affects deduplication logic but does not involve a negative value comparison.
- **Mitigation**: Extend parser to detect language values in hash/digest computations that determine record uniqueness.

**FN3: Implicit negative value handling in tests**
- **Risk**: Test methods call `initialize([], $options, [], -1)` (IndexSearchRepositoryTest.php:170, 217) with `-1` as the `freeIndexUid` argument, but the language field uses the string `'current'` (line 212: `'languageUid' => 'current'`), which is later resolved to an integer by SearchController. The test does not exercise negative language ID code paths.
- **Mitigation**: Parser should analyze test data flow to determine whether `-1` values reach language field conditionals (they do not in these tests).

---

## 6. Tests and Fixtures (Isolated)

### Test Finding 1: doSearch() calls with freeIndexUid = -1

**File**: Tests/Functional/IndexSearchRepositoryTest.php
**Lines**: 82, 92, 197

**Code excerpt**:
```php
$searchResults = $searchRepository->doSearch([['sword' => 'lorem']], -1);
```

**Observation**: The second parameter (`-1`) is `freeIndexUid`, not a language field. This exercises the `freeIndexUidWhere()` method's `< 0` check (Finding 2), but **does not test language filtering**.

**Equivalence to productive code**: **Non-binding**. The test does not pass a negative language ID; `'languageUid' => 'current'` is used (line 212), which resolves to `0` via Context in productive code.

---

### Test Finding 2: Indexing configuration with sys_language_uid = 0

**File**: Tests/Functional/IndexerTest.php
**Lines**: 41, 75, 113

**Code excerpt**:
```php
'sys_language_uid' => 0,
'gr_list' => '0,-1',
```

**Observation**: All test fixtures use `sys_language_uid => 0` (default language). No negative language ID is indexed or searched.

**Equivalence to productive code**: **Binding** for sys_language_uid = 0 behavior; **non-binding** for negative language ID handling (not tested).

---

### Test Finding 3: gr_list with "0,-1" in fixtures

**File**: Tests/Functional/IndexSearchRepositoryTest.php
**Lines**: 54, 75 (Context aspect)

**Code excerpt**:
```php
'gr_list' => '0,-1',
// ...
$this->get(Context::class)->setAspect('frontend.user', new UserAspect(null, [0, -1]));
```

**Observation**: The gr_list field stores frontend user group IDs; `-1` means "not logged in." This is **not a language field** but demonstrates the pattern of using `-1` as a sentinel for "all" or "default."

**Equivalence to productive code**: **Non-applicable** (different domain: user groups, not languages).

---

### Summary of Test Coverage

**Tested productive code paths**:
- Indexing with sys_language_uid = 0
- Searching with freeIndexUid = -1 (indexing configuration filtering disabled)
- gr_list handling with "0,-1"

**Untested productive code paths**:
- languageWhere() with languageUid < 0 (no test passes a negative language ID to search)
- Indexing with negative sys_language_uid values
- Search results when index_phash contains records with sys_language_uid = -1

**Conclusion**: The test suite does not provide coverage for the language filtering bypass behavior (`languageUid < 0` → return all languages). The observed `-1` usage in tests pertains to `freeIndexUid`, not the language field.
