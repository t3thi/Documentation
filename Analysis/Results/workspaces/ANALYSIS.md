# Analysis – Workspaces Extension

## 0. Scope Coverage

**Searched top‑level directories:**
- `Classes/` (all subdirectories including Controller, Service, Hook, Domain, Event, Authorization, Backend, Command, DataHandler, Dependency, MessageHandler, Messages, Middleware, Notification, Preview)
- `Configuration/` (TCA definitions, Backend routes)
- `Tests/Functional/` (test files examined for reference patterns)

**Productive files verified via direct read:**
- `Classes/Controller/ReviewController.php`
- `Classes/Controller/WorkspacesAjaxController.php`
- `Classes/Service/WorkspaceService.php`
- `Classes/Service/StagesService.php`
- `Classes/Service/GridDataService.php`
- `Classes/Service/IntegrityService.php`
- `Classes/Hook/DataHandlerHook.php`
- `Classes/Notification/StageChangeNotification.php`
- `Classes/Preview/PreviewUriBuilder.php`

**Justification for excluded areas:**
- `Resources/` – Frontend assets, JavaScript modules, and localization files contain no database-level language logic
- `Documentation/` – User documentation without programmatic relevance
- Configuration files (TCA) – Already covered in CLAUDE.md; no negative language identifier usage found

---

## 1. Determination of Language Fields

Language field names in the workspaces extension are derived exclusively through **TCA Schema Language Capability API**:

```php
$schema = $this->tcaSchemaFactory->get($table);
if ($schema->isLanguageAware()) {
    $languageCapability = $schema->getCapability(TcaSchemaCapability::Language);
    $languageField = $languageCapability->getLanguageField()->getName();
    $translationOriginPointerField = $languageCapability->getTranslationOriginPointerField()->getName();
    $translationSourceField = $languageCapability->getTranslationSourceField()?->getName();
}
```

No hardcoded field names (`sys_language_uid`, `l10n_parent`, `l10n_source`) are used in language value operations. Field names are always retrieved dynamically from schema capabilities at runtime.

**Exception:** `WorkspaceService::getPageChildrenRecursive()` line 712 contains hardcoded `sys_language_uid = 0` constraint for page tree queries (see Section 2.2).

---

## 2. Language‑Field Usage with Negative Values

### 2.1 User Interface Language Selection (ReviewController.php)

**File:** `Classes/Controller/ReviewController.php`
**Method:** `getSystemLanguages()`
**Lines:** 192-193

```php
$languages = $this->translationConfigurationProvider->getSystemLanguages($pageId);
if (isset($languages[-1])) {
    $languages[-1]['uid'] = 'all';
}
```

**Comparison type:** Array key check `isset($languages[-1])`, array value assignment
**Data flow:**
```
TranslationConfigurationProvider::getSystemLanguages($pageId)
  → returns array indexed by language identifiers including potential -1 key
    → ReviewController::getSystemLanguages()
      → modifies $languages[-1]['uid'] = 'all'
        → assigned to view template variable 'availableLanguages'
          → rendered in backend UI language selector
```

**Context:** Backend module language filter dropdown. Transforms numeric `-1` identifier to string `'all'` for client-side JavaScript compatibility.

---

### 2.2 Page Tree Default Language Filter (WorkspaceService.php)

**File:** `Classes/Service/WorkspaceService.php`
**Method:** `getPageChildrenRecursive()`
**Line:** 712

```php
$statement = $queryBuilder->select('uid')
    ->from('pages')
    ->where(
        $queryBuilder->expr()->eq('pid', $queryBuilder->createNamedParameter($pid, Connection::PARAM_INT)),
        $queryBuilder->expr()->eq('sys_language_uid', 0),  // Explicit 0, excludes negative values
        $permsClause
    )
    ->executeQuery();
```

**Comparison type:** `= 0` (explicit equality, not `>= 0`)
**Data flow:**
```
WorkspaceService::getTreeUids($pageId, $wsid, $recursionLevel)
  → WorkspaceService::getPageChildrenRecursive($pid, $depth, $begin, $permsClause)
    → QueryBuilder constraint: sys_language_uid = 0
      → Result set contains only default language pages (uid 0)
```

**Context:** Recursive page tree traversal for workspace operations. Hardcoded field name and explicit zero comparison ensure only default language pages are included in tree structure. Implicitly excludes any negative language identifiers (e.g., `-1` for "all languages").

---

### 2.3 Language Query Comparison Patterns (WorkspaceService.php)

**File:** `Classes/Service/WorkspaceService.php`
**Method:** `selectAllVersionsFromPages()`
**Lines:** 267-269

```php
// If table is not localizable, but localized records shall
// be collected, an empty result array needs to be returned:
if (!$schema->isLanguageAware() && $language > 0) {
    return [];
}
```

**Comparison type:** `> 0` (strictly positive)
**Data flow:**
```
selectVersionsInWorkspace($wsid, $stage, $pageId, $recursionLevel, $selectionType, $language)
  → selectAllVersionsFromPages($schema, $pageList, $wsid, $stage, $language)
    → Guard: if $language > 0 and table not language-aware → return []
```

**Method:** `getNewVersionsForPages()`
**Lines:** 389-391

```php
// If table is not localizable, but localized records shall
// be collected, an empty result array needs to be returned:
if (!$schema->isLanguageAware() && $language > 0) {
    return [];
}
```

**Method:** `isNewPage()`
**Lines:** 832

```php
// If the language is not default, check state of overlay
if ($language > 0) {
    $schema = $this->tcaSchemaFactory->get('pages');
    // ... query for translated page
}
```

**Context:** All three methods use `$language > 0` to detect non-default language requests. This comparison pattern:
- Treats `0` as default language (standard TYPO3 semantics)
- Treats positive integers as translation languages
- **Implicitly excludes negative values** (e.g., `-1`) from translation-specific logic paths

**Data flow (conditional branching):**
```
if ($language > 0) {
    // Translation-specific query path
} else {
    // Default language or unspecified language path
}
```

When `$language` is `-1`, `null`, or `0`, the condition is false, and translation-specific filtering is not applied.

---

### 2.4 Language Query Filtering (WorkspaceService.php)

**File:** `Classes/Service/WorkspaceService.php`
**Method:** `selectAllVersionsFromPages()`
**Lines:** 330-335

```php
if ($schema->isLanguageAware() && MathUtility::canBeInterpretedAsInteger($language)) {
    $constraints[] = $queryBuilder->expr()->eq(
        'A.' . $schema->getCapability(TcaSchemaCapability::Language)->getLanguageField()->getName(),
        $queryBuilder->createNamedParameter($language, Connection::PARAM_INT)
    );
}
```

**Comparison type:** `= $language` (parameterized equality)
**Data flow:**
```
$language parameter (nullable int)
  → MathUtility::canBeInterpretedAsInteger($language) check
    → if true and table is language-aware:
      → QueryBuilder: WHERE languageField = $language
        → Filters query results to specific language value
```

**Method:** `getNewVersionsForPages()`
**Lines:** 449-454

```php
if ($schema->isLanguageAware() && MathUtility::canBeInterpretedAsInteger($language)) {
    $constraints[] = $queryBuilder->expr()->eq(
        $languageField,
        $queryBuilder->createNamedParameter((int)$language, Connection::PARAM_INT)
    );
}
```

**Context:** When `$language` is an integer (including `-1`), this constraint is added to the query, filtering records by exact language field value match. If `-1` were passed, the query would select only records with `sys_language_uid = -1`.

---

## 3. Semantic Classification

### Finding 1: ReviewController Language UI Transformation (Line 192-193)

**Category:** STR (Structurally relevant)

**Justification:** Transforms numeric language identifier `-1` to string `'all'` for UI compatibility, but does not query or filter database records by `-1`; purely presentational conversion after data retrieval from `TranslationConfigurationProvider`.

---

### Finding 2: WorkspaceService Page Tree Filter (Line 712)

**Category:** SR (Semantically relevant)

**Justification:** Hardcoded `sys_language_uid = 0` constraint in recursive page tree queries explicitly excludes all non-default language pages including any hypothetical `-1` records; directly affects which workspace records are selected for publishing/discarding operations.

---

### Finding 3: WorkspaceService Translation Detection Guards (Lines 267, 389, 832)

**Category:** SR (Semantically relevant)

**Justification:** `$language > 0` comparisons determine whether translation-specific query logic is executed; negative values (including `-1`) are implicitly treated as non-translation contexts, affecting query construction for workspace version selection.

---

### Finding 4: WorkspaceService Language Field Filtering (Lines 330-335, 449-454)

**Category:** SR (Semantically relevant)

**Justification:** Conditional equality constraint `WHERE languageField = $language` would accept `-1` as a valid filter value if passed by caller; creates exact-match database query for language field, enabling potential selection of "all languages" records if such records exist with `-1` in database.

---

## 4. Parser Rule Derivations

### Rule WS-NEG-01: Language Array Key Transformation

**AST Signature:**
```php
if (isset($array[$key])) {
    $array[$key]['uid'] = <string_value>;
}
```

**Detection Signal:**
- Variable name contains "language" (case-insensitive)
- Array key is integer literal `-1`
- Assignment to nested array key `['uid']`

**Context Conditions:**
- Array source is method call to `TranslationConfigurationProvider::getSystemLanguages()`
- Located in Controller context (namespace contains `\Controller\`)
- Assignment value is string literal

**Exclusion Conditions:**
- Array key is variable (not literal `-1`)
- Nested key is not `'uid'`

**Equivalent AST Forms:**
```php
// Direct assignment without isset check
$languages[-1]['uid'] = 'all';

// With intermediate variable
$allLangKey = -1;
if (isset($languages[$allLangKey])) {
    $languages[$allLangKey]['uid'] = 'all';
}
```

---

### Rule WS-NEG-02: Default Language Page Tree Filter

**AST Signature:**
```php
$queryBuilder->expr()->eq(<field_identifier>, 0)
```

**Detection Signal:**
- Field identifier is string literal `'sys_language_uid'`
- Right-hand operand is integer literal `0`
- Within QueryBuilder expression context
- Method call is `eq()` (not `neq()`, `gt()`, `gte()`)

**Context Conditions:**
- Located in recursive page selection method
- Query table is `'pages'`
- Part of WHERE clause construction

**Exclusion Conditions:**
- Field identifier is variable or comes from schema capability
- Comparison operator is `neq`, `gt`, `gte`, `lt`, `lte`
- Right-hand operand is non-zero

**Equivalent AST Forms:**
```php
// With createNamedParameter
$queryBuilder->expr()->eq('sys_language_uid', $queryBuilder->createNamedParameter(0, Connection::PARAM_INT))

// With string concatenation (legacy)
"sys_language_uid = 0"
```

---

### Rule WS-NEG-03: Translation Context Detection

**AST Signature:**
```php
if (<language_variable> > 0) {
    // translation-specific logic
}
```

**Detection Signal:**
- Variable name is `$language` or `$languageId` or `$languageUid`
- Binary operator is `>` (strictly greater than)
- Right-hand operand is integer literal `0`
- Located in workspace service methods

**Context Conditions:**
- Method signature includes language parameter: `?int $language = null`
- Within conditional block that checks `$schema->isLanguageAware()`
- Guards translation-specific query construction

**Exclusion Conditions:**
- Operator is `>=` (greater than or equal)
- Operator is `!=` or `!==` (not equal)
- Left-hand operand is not language-related variable

**Equivalent AST Forms:**
```php
// With explicit type cast
if ((int)$language > 0) { }

// With null coalescing
if (($language ?? 0) > 0) { }

// Inverted logic
if ($language <= 0) {
    // default language logic
} else {
    // translation logic
}
```

---

### Rule WS-NEG-04: Parameterized Language Field Query

**AST Signature:**
```php
if (<schema_check> && MathUtility::canBeInterpretedAsInteger($language)) {
    $constraints[] = $queryBuilder->expr()->eq(
        <language_field_from_schema>,
        $queryBuilder->createNamedParameter($language, Connection::PARAM_INT)
    );
}
```

**Detection Signal:**
- Conditional includes `MathUtility::canBeInterpretedAsInteger($language)`
- Schema language awareness check: `$schema->isLanguageAware()`
- QueryBuilder equality expression with parameterized integer
- Field name derived from `getLanguageField()->getName()`

**Context Conditions:**
- Within workspace version selection methods
- Language parameter is nullable: `?int $language`
- Part of constraints array construction for WHERE clause

**Exclusion Conditions:**
- Field name is hardcoded string (not from schema capability)
- Operator is not `eq()` (e.g., `gt()`, `lt()`)
- Parameter type is not `Connection::PARAM_INT`

**Equivalent AST Forms:**
```php
// With null check instead of MathUtility
if ($schema->isLanguageAware() && $language !== null) {
    $constraints[] = $queryBuilder->expr()->eq(
        $languageFieldName,
        (int)$language
    );
}

// With multiple conditions combined
if ($schema->isLanguageAware()) {
    if (MathUtility::canBeInterpretedAsInteger($language)) {
        // ... constraint
    }
}
```

---

## 5. Misclassification Risks

### False Positives

1. **Stage Identifier Constants**
   - `StagesService::STAGE_PUBLISH_EXECUTE_ID = -20`
   - `StagesService::STAGE_PUBLISH_ID = -10`
   - **Risk:** Negative stage constants may trigger pattern matching for negative language identifiers
   - **Mitigation:** Require variable/field name contains "language" or "lang" substring; exclude constant definitions in stage-related contexts

2. **Page ID Sentinel Values**
   - `WorkspacesAjaxController::getWorkspaceInfos()` line 128: `$pageId = $parameter->id > 0 ? $parameter->id : -1;`
   - **Risk:** Use of `-1` as sentinel for "all pages" may be confused with language identifier
   - **Mitigation:** Exclude assignments to variables named `$pageId`, `$pid`, or `$id`

3. **Stage Filter Sentinel Values**
   - `WorkspacesAjaxController::getWorkspaceInfos()` line 134: `$parameter->stage = -99;`
   - `ReviewController::getAvailableSelectStages()` line 237: `'uid' => -99`
   - **Risk:** Negative stage filter values (`-99` for "all stages") may trigger false positives
   - **Mitigation:** Exclude stage-related variables (`$stage`, `$stageId`); require context includes language field access

4. **Test Fixture Stage Values**
   - `WorkspaceServiceTest.php` lines 46, 60, 98: `selectVersionsInWorkspace(91, -99, ...)`
   - **Risk:** Test method calls with `-99` stage parameter
   - **Mitigation:** Exclude files under `Tests/` directory; require productive code context

---

### False Negatives

1. **Dynamic Language Value Construction**
   - **Risk:** Language identifiers constructed through arithmetic, ternary operators, or function returns
   - **Example:** `$lang = $someCondition ? -1 : 0;` followed by query usage
   - **Impact:** Would not match literal `-1` pattern in AST
   - **Mitigation:** Require data flow analysis to track variable assignments; not feasible for this extension as no such patterns exist in current codebase

2. **Language Identifier from External Source**
   - **Risk:** Language values originating from `$_GET`, `$_POST`, request objects, or database queries without literal `-1` in code
   - **Example:** `$language = $request->getQueryParams()['language'];` where user provides `-1`
   - **Impact:** No syntactic marker for detection in static analysis
   - **Mitigation:** Not applicable to workspaces extension; all language parameters are either `null` or derived from controlled sources (TranslationConfigurationProvider)

3. **Implicit Negative Exclusion via Greater-Than**
   - **Risk:** Code using `$language > 0` implicitly handles `-1` without explicit mention
   - **Example:** Findings 2.3 where negative values are excluded by implication
   - **Impact:** Semantic relevance exists but no explicit `-1` in AST
   - **Mitigation:** Rule WS-NEG-03 captures this pattern; requires recognizing `> 0` as implicit negative exclusion

4. **Configuration-Driven Language Values**
   - **Risk:** Language identifiers stored in TCA, TypoScript, or site configuration YAML files
   - **Impact:** Static code analysis cannot detect negative values in configuration files
   - **Mitigation:** Not applicable; workspaces extension does not define language identifiers in configuration files

---

## 6. Tests and Fixtures (Isolated)

### Test File Analysis: WorkspaceServiceTest.php

**Location:** `Tests/Functional/Service/WorkspaceServiceTest.php`

**Stage Parameter Usage (Non-binding observations):**
- Line 46: `selectVersionsInWorkspace(90)` – no stage parameter, defaults to `-99`
- Line 46: `selectVersionsInWorkspace(91, -99, 2)` – explicit `-99` stage ("all stages")
- Line 60: `selectVersionsInWorkspace(91, -99, 1, 99)` – explicit `-99` stage
- Line 74: `selectVersionsInWorkspace(91, 1, 1, 99)` – positive stage filter
- Line 83: `selectVersionsInWorkspace(91, 2, 1, 99)` – positive stage filter
- Line 98: `selectVersionsInWorkspace(91, -99, 5, 99)` – explicit `-99` stage

**Classification:** TEST
**Justification:** `-99` is stage filter parameter, not language identifier; no language parameter provided in any test call; tests verify stage filtering logic only.

**No language-specific negative value tests found.** The test suite does not exercise language filtering with `-1` or other negative language identifiers.

**Conclusion:** Test files provide no evidence of productive negative language identifier usage beyond confirming that stage parameter `-99` is distinct from language semantics.
