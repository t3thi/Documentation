# Analysis – frontend

## 0. Scope Coverage

### Searched top‑level directories
- `Classes/` (142 PHP files)
- `Configuration/`
- `Tests/` (examined for semantic equivalence to productive code)

### Productive files verified via direct read
- `Classes/ContentObject/ContentObjectRenderer.php` (lines 4880–4952)
- `Classes/Category/Collection/CategoryCollection.php` (lines 100–177)
- `Classes/Http/Application.php` (lines 65–73)
- `Classes/Page/PageInformationFactory.php` (lines 324–423)

### Justification for excluded areas
- **Resources/**: Contains non‑PHP assets (templates, CSS, JS, translations) – no database logic
- **Configuration/TCA/**: Declarative TCA definitions – language field names defined here but not evaluated (covered via schema capability API)
- **Documentation/**: Not present in this extension

---

## 1. Determination of Language Fields

Language field names are derived exclusively via **TCA Schema Capability API** at runtime.

### Standard pattern (used in all productive code)

```php
$schema = $tcaSchemaFactory->get($table);
if ($schema->isLanguageAware()) {
    $languageCapability = $schema->getCapability(TcaSchemaCapability::Language);
    $languageField = $languageCapability->getLanguageField()->getName();
    $translationOriginPointer = $languageCapability->getTranslationOriginPointerField()->getName();
}
```

**Locations:**
- ContentObjectRenderer::getLanguageRestriction() (lines 4901–4912)
- CategoryCollection::getCollectedRecords() (lines 129–137)

### Configuration override mechanism

ContentObjectRenderer supports TypoScript override:
```php
// select.languageField = 'custom_field_name'
if (isset($conf['languageField']) && $schema?->hasField($conf['languageField'])) {
    $languageField = $conf['languageField'];
}
// select.languageField = 0  disables language filtering
```

### Concrete field names in this extension

From TCA definition in `Configuration/TCA/tt_content.php`:
```php
'ctrl' => [
    'languageField' => 'sys_language_uid',
    'transOrigPointerField' => 'l18n_parent',
    'translationSource' => 'l10n_source',
]
```

These are read via schema API, never hardcoded in query logic.

---

## 2. Language‑Field Usage with Negative Values

### Occurrence 1

**File:** `Classes/ContentObject/ContentObjectRenderer.php`
**Method:** `getLanguageRestriction()`
**Line:** 4925

```php
$languageQuery = $expressionBuilder->in($languageField, [0, -1]);
```

**Comparison type:** `IN (0, -1)`
**Data flow:**
```
LanguageAspect::doOverlays() → TRUE
→ getLanguageRestriction() builds ExpressionBuilder constraint
→ QueryBuilder::andWhere()
→ SQL: WHERE languageField IN (0, -1)
→ Database result set
→ PageRepository::getLanguageOverlay() applied per row
```

**Context:** Overlay mode activated via LanguageAspect. Comment at line 4923 states: *"Sys language content is set to zero/-1 – and it is expected that whatever routine processes the output will OVERLAY the records with localized versions!"*

---

### Occurrence 2

**File:** `Classes/ContentObject/ContentObjectRenderer.php`
**Method:** `getLanguageRestriction()`
**Line:** 4951

```php
return $expressionBuilder->in($languageField, [$languageAspect->getContentId(), -1]);
```

**Comparison type:** `IN (contentId, -1)` where `contentId` is a positive integer or 0
**Data flow:**
```
LanguageAspect::doOverlays() → FALSE (free mode)
→ getLanguageRestriction() builds constraint with requested language + -1
→ QueryBuilder::andWhere()
→ SQL: WHERE languageField IN (requestedLanguageId, -1)
→ Database result set (no overlays applied)
```

**Context:** Free mode (no overlays). Comment at line 4950: *"No overlays = only fetch records given for the requested language and 'all languages'"*

---

### Occurrence 3

**File:** `Classes/Category/Collection/CategoryCollection.php`
**Method:** `getCollectedRecords()`
**Line:** 142

```php
$languageConstraint = $queryBuilder->expr()->in(
    $languageField,
    $queryBuilder->createNamedParameter([0, -1], Connection::PARAM_INT_ARRAY)
);
```

**Comparison type:** `IN (0, -1)`
**Data flow:**
```
Context::getPropertyFromAspect('language', 'contentId') → $languageId
→ CategoryCollection::getCollectedRecordsQueryBuilder()
→ QueryBuilder with IN (0, -1) constraint
→ executeQuery()
→ PageRepository::versionOL() per row
→ PageRepository::getLanguageOverlay() per row
```

**Context:** Category collection query always fetches default language (0) and all‑languages (-1) records, then applies overlays. Comment at line 133: *"Consider default or 'all' language"*

---

### Occurrence 4 (Non‑language context)

**File:** `Classes/Http/Application.php`
**Method:** `initializeContext()`
**Line:** 71

```php
$this->context->setAspect('frontend.user', new UserAspect(null, [0, -1]));
```

**Comparison type:** Not applicable (array parameter to UserAspect constructor)
**Data flow:** `[0, -1]` passed as user group IDs, not language identifiers

**Context:** Frontend user groups initialization. The second parameter to `UserAspect` represents accessible user groups, not language fields.

---

## 3. Semantic Classification

### Occurrence 1: ContentObjectRenderer line 4925

**Category:** SR (Semantically relevant)
**Justification:** Core query‑building logic for overlay mode; `-1` represents "all languages" in database queries, directly affecting which records are fetched for translation processing.

---

### Occurrence 2: ContentObjectRenderer line 4951

**Category:** SR (Semantically relevant)
**Justification:** Core query‑building logic for free mode; `-1` represents "all languages" records that should be rendered regardless of current language context.

---

### Occurrence 3: CategoryCollection line 142

**Category:** SR (Semantically relevant)
**Justification:** Category record fetching with language awareness; `-1` ensures records marked as "all languages" are always included in category collections.

---

### Occurrence 4: Application line 71

**Category:** IRR (Not relevant for productive logic)
**Justification:** UserAspect parameter for frontend user groups (fe_group field), not language identifiers; semantically unrelated to database language fields.

---

## 4. Parser Rule Derivations

### Rule 1: IN‑clause array literal with -1

**AST signature:**
```
MethodCall
├─ expr() → in()
└─ Arguments
    ├─ Variable/String ($languageField or literal field name)
    └─ Array [0, -1] or [$var, -1]
```

**Detection signal:**
- Method call to `ExpressionBuilder::in()` or `expr()->in()`
- Second argument is array literal containing `-1`
- First argument is variable or expression derived from language field name

**Context conditions (must satisfy at least one):**
1. Variable name contains `language` substring (case‑insensitive)
2. Variable assigned from `getLanguageField()->getName()`
3. Variable assigned from TCA `ctrl.languageField`
4. Method context: within getLanguageRestriction, getCollectedRecords, or similar language‑aware query building

**Exclusion conditions:**
- Method context is UserAspect initialization
- First argument contains `group`, `fe_group`, `usergroup` (user group fields)
- Parent class is not QueryBuilder/ExpressionBuilder related

**Equivalent AST forms:**
```php
// Form A: Direct array literal
$expr->in($field, [0, -1])

// Form B: Variable expansion
$expr->in($field, [$languageId, -1])

// Form C: Named parameter (Doctrine DBAL)
$queryBuilder->createNamedParameter([0, -1], Connection::PARAM_INT_ARRAY)
```

---

### Rule 2: Language field determination via TCA Schema

**AST signature:**
```
Assign
├─ Variable ($languageField)
└─ MethodCall chain
    └─ getCapability(TcaSchemaCapability::Language)
        └─ getLanguageField()
            └─ getName()
```

**Detection signal:**
- Assignment to variable containing `language` substring
- Method call chain: `getCapability()` → `getLanguageField()` → `getName()`
- Constant argument `TcaSchemaCapability::Language`

**Context conditions:**
- Within query‑building method or record‑fetching method
- Followed by QueryBuilder usage of assigned variable

**Exclusion conditions:**
- None (this pattern is unambiguous)

**Equivalent AST forms:**
```php
// Standard form
$languageField = $schema->getCapability(TcaSchemaCapability::Language)->getLanguageField()->getName();

// Multi-step form
$capability = $schema->getCapability(TcaSchemaCapability::Language);
$field = $capability->getLanguageField();
$languageField = $field->getName();
```

---

### Rule 3: Comment annotation for -1 semantics

**AST signature:**
```
Comment (single‑line or multi‑line)
├─ Contains: "-1" or "all language"
└─ Context: within 5 lines of IN‑clause with -1
```

**Detection signal:**
- Inline comment or docblock comment
- Contains patterns: `/all\s+language/i`, `/-1/`, `/zero\/-1/`
- Proximate to query constraint construction

**Context conditions:**
- Comment precedes or follows IN‑clause construction
- Same method scope as language field usage

**Exclusion conditions:**
- Comment discusses historical behavior or deprecated patterns
- Comment is in test documentation

**Example patterns:**
```php
// "Sys language content is set to zero/-1"
// "only fetch records given for the requested language and 'all languages'"
// "Consider default or 'all' language"
```

---

### Rule 4: LanguageAspect conditional branching

**AST signature:**
```
If
├─ Condition: MethodCall → doOverlays()
├─ Then: IN‑clause [0, -1]
└─ Else: IN‑clause [$contentId, -1]
```

**Detection signal:**
- Conditional on `LanguageAspect::doOverlays()` or `$languageAspect->doOverlays()`
- Both branches construct IN expressions containing `-1`
- Different companion values (0 vs contentId)

**Context conditions:**
- Method returns ExpressionBuilder constraint
- Variable `$languageAspect` typed as LanguageAspect
- Method name contains `restriction`, `constraint`, or `where`

**Exclusion conditions:**
- None (pattern is specific to language query logic)

---

## 5. Misclassification Risks

### False Positives

#### FP1: User group fields with -1
**Risk:** UserAspect and frontend user group (fe_group) fields may use `-1` to represent "all user groups."

**Mitigation:**
- Exclude variables named `*group*`, `fe_group`, `usergroup`
- Exclude UserAspect constructor contexts
- Verify variable assignment chain traces to language capability API

**Example (Application.php:71):**
```php
new UserAspect(null, [0, -1])  // NOT a language field
```

#### FP2: Numeric literals in unrelated contexts
**Risk:** Integer `-1` appears in many non‑language contexts (array indexing, string operations, version IDs).

**Mitigation:**
- Require IN‑clause or comparison operator context
- Require variable name or assignment source indicating language field
- Exclude contexts: array access (`$arr[-1]`), substr operations, arithmetic

#### FP3: Test fixture IDs
**Risk:** Test data may use `-1` as placeholder UID or workspace ID.

**Mitigation:**
- Isolate test file analysis (see Section 6)
- Require productive code path (exclude `Tests/` directory)
- Verify data flow leads to actual database query construction

---

### False Negatives

#### FN1: Dynamic IN‑clause construction
**Risk:** Array may be built dynamically, obscuring the literal `-1` value.

**Example:**
```php
$values = [0];
if ($someCondition) {
    $values[] = -1;
}
$expr->in($languageField, $values);
```

**Mitigation:**
- Perform data‑flow analysis to track array mutations
- Flag any array append operation with `-1` in language‑context methods
- Heuristic: treat variables named `*language*` as potential carriers

#### FN2: Indirect comparison via variable
**Risk:** Comparison may use variable holding `-1` without literal presence.

**Example:**
```php
$allLanguagesId = -1;
// ... later ...
$expr->eq($languageField, $allLanguagesId);
```

**Mitigation:**
- Track constant/variable assignments of `-1` value
- Propagate semantic tag through variable usage
- Require variable name indicating language semantics

**Observed status in this extension:** Not found in current codebase. All occurrences use literal `-1` in array expressions.

#### FN3: Alternative comparison operators
**Risk:** Negative value checks might use `< 0`, `<= -1`, `!= -1`, etc.

**Observed status in this extension:** No occurrences found. All language field logic uses IN‑clause equality, never inequality operators.

#### FN4: String coercion in legacy code
**Risk:** Some code might use string `"-1"` which PHP coerces to integer.

**Example:**
```php
$field = $row['sys_language_uid'];  // "-1" as string
if ($field == -1) { ... }  // Loose comparison succeeds
```

**Mitigation:**
- Search for string literals `"-1"` in language contexts
- Flag loose equality operators (==) vs strict (===)

**Observed status in this extension:** Not found. All QueryBuilder usage employs integer arrays.

---

## 6. Tests and Fixtures (Isolated)

### Test file documentation

**File:** `Tests/Functional/Rendering/LocalizedSiteContentRenderingTest.php`
**Line:** 74

```php
// Records marked as "All Languages" (sys_language_uid = -1) are always fetched
```

**Classification:** TEST
**Justification:** Explicit documentation of `-1` semantics in functional test comment; confirms productive code behavior but is not executable logic.

**Equivalence to productive code:** Confirms that the behavior in ContentObjectRenderer and CategoryCollection is intentional and tested.

---

### Fixture data

**File:** `Tests/Functional/Fixtures/pages-title-tag.csv`
**Line:** 14

```csv
,12,0,"Workspace Root",0,15,11,987654321,-1,
```

**Classification:** TEST
**Justification:** CSV test fixture; `-1` in column 9 may represent workspace ID or sys_language_uid depending on schema.

**Equivalence to productive code:** Cannot determine without schema context; observed but not classified as binding.

---

### Unit test case

**File:** `Tests/Unit/ContentObject/Menu/AbstractMenuContentObjectTest.php`
**Lines:** 201–205

```php
'with useColPos -1' => [
    $input,
    ['useColPos' => -1],
    $expected,
    '-1',
],
```

**Classification:** TEST
**Justification:** Menu configuration test for column position, not language field.

**Equivalence to productive code:** Not equivalent; tests menu column logic unrelated to language fields.

---

### Non‑binding observation

No test fixtures explicitly validate the IN‑clause construction with `[0, -1]` for language fields. The functional test comment (line 74) documents expected behavior but does not provide executable verification of the literal array values used in QueryBuilder constraints.

**Recommendation for test coverage:**
A functional test that inspects generated SQL or uses query logging to verify the literal `IN (0, -1)` constraint would strengthen confidence in parser rule derivation.

---

## 7. Summary

- **Total occurrences of `-1` in language contexts:** 3 (all SR)
- **Total occurrences of `-1` in non‑language contexts:** 1 (IRR)
- **Negative comparison operators (`< 0`, `<= -1`):** 0 occurrences
- **All productive usages:** IN‑clause array literals in QueryBuilder expressions
- **Semantic meaning:** `-1` represents "all languages" – records visible regardless of current language context
- **Determination method:** TCA Schema Capability API exclusively
- **Data flow:** Always leads to SQL WHERE constraint, always followed by overlay processing (except free mode)
