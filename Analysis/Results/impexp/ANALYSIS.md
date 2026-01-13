# Analysis – impexp

## 0. Scope Coverage

### Searched top-level directories
- `Classes/` – All productive PHP code (Export.php, Import.php, ImportExport.php, View/, Controller/, Command/, etc.)
- `Configuration/` – TCA definitions and overrides
- `Tests/Functional/` – Test files and fixtures (analyzed separately in section 6)

### Productive files verified via direct read
- `Classes/Export.php` – Primary export logic with language field filtering
- `Classes/Import.php` – Primary import logic with relation handling
- `Classes/ImportExport.php` – Base class with common functionality
- `Classes/View/ExportPageTreeView.php` – Page tree filtering for export
- `Configuration/TCA/tx_impexp_presets.php` – Extension-specific TCA

### Justification for excluded areas
- `Resources/` – Frontend assets, no database logic
- `Documentation/` – User documentation
- Exception classes in `Classes/Exception/` – No language field logic
- ViewHelpers, ContextMenu, Event classes – No database language field operations
- Initialization classes – Import predefined content, not language field logic

---

## 1. Determination of Language Fields

Language field names in the `impexp` extension are determined through **TCA schema capability APIs**:

1. **Schema awareness check**: `$schema->isLanguageAware()` determines if a table supports multilingual records

2. **Capability-based field name retrieval**: When language-aware, field names are obtained via `LanguageAwareSchemaCapability`:
   - `$languageCapability->getLanguageField()->getName()` → language identifier field (typically `sys_language_uid`)
   - `$languageCapability->getTranslationOriginPointerField()->getName()` → parent translation pointer (typically `l10n_parent` or `l18n_parent`)
   - `$languageCapability->getTranslationSourceField()?->getName()` → translation source field (typically `l10n_source`)

3. **Primary usage locations**:
   - `Export.php:174-177` – Pages table schema derivation
   - `Export.php:428-429` – Per-table schema derivation in record iteration
   - `Import.php:1045-1047` – Translation source field determination during import
   - `Import.php:1230-1232` – Translation source field for relation remapping

4. **Hardcoded fallback**: Only `ExportPageTreeView.php:53` uses hardcoded `sys_language_uid=0` in SQL WHERE clause for page tree initialization

---

## 2. Language-Field Usage with Negative Values

### Finding 1: Export.php:259 – Translation query filter (> 0)

**File**: `Classes/Export.php`
**Method**: `getTranslationForPage()`
**Lines**: 256-259

**Code excerpt**:
```php
} else {
    // Ensure consistency by only fetching pages where not only l10n_parent matches, but also a
    // sys_language_uid > 0 exists.
    $constraints[] = $queryBuilder->expr()->gt($languageCapability->getLanguageField()->getName(), 0);
}
```

**Comparison type**: `> 0` (greater than zero)

**Data flow**:
- SOURCE: `$languageCapability->getLanguageField()->getName()` (schema-derived field name, typically `sys_language_uid`)
- TRANSFORMATION: `QueryBuilder::expr()->gt()` constructs SQL WHERE constraint
- SINK: Database query constraint in `SELECT * FROM pages WHERE l10n_parent = ? AND sys_language_uid > 0`

---

### Finding 2: Export.php:199 – Translation origin pointer check (> 0)

**File**: `Classes/Export.php`
**Method**: `process()`
**Lines**: 199-205

**Code excerpt**:
```php
if (($record[$transOrigPointerFieldName] ?? 0) > 0) {
    $this->addRecordsForPid(
        (int)$record[$transOrigPointerFieldName],
        $this->tables,
        [$record[$languageFieldName]]
    );
}
```

**Comparison type**: `> 0` (greater than zero)

**Data flow**:
- SOURCE: `$record[$transOrigPointerFieldName]` (schema-derived field name, value from database record)
- TRANSFORMATION: PHP null coalescing (`?? 0`) and numeric comparison (`> 0`)
- SINK: Conditional logic determining whether to export content for translated page's parent

---

### Finding 3: Export.php:550 – Translation source field check (> 0)

**File**: `Classes/Export.php`
**Method**: `exportAddRecord()`
**Lines**: 550-556

**Code excerpt**:
```php
if ($translationSourceFieldName && ((int)($row[$translationSourceFieldName] ?? 0)) > 0) {
    $this->dat['records'][$table . ':' . $row['uid']]['rels'][$translationSourceFieldName]['type'] = 'db';
    $this->dat['records'][$table . ':' . $row['uid']]['rels'][$translationSourceFieldName]['itemArray'][0] = [
        'id' => $row[$translationSourceFieldName],
        'table' => $table,
    ];
}
```

**Comparison type**: `> 0` (greater than zero, after integer cast)

**Data flow**:
- SOURCE: `$row[$translationSourceFieldName]` (schema-derived field name, typically `l10n_source`)
- TRANSFORMATION: PHP null coalescing (`?? 0`), integer cast `(int)`, and numeric comparison (`> 0`)
- SINK: Manual addition of translation source relation to export data structure (workaround for missing ReferenceIndex entries)

---

### Finding 4: Import.php:1250 – Generic negative relation ID handling (< 0)

**File**: `Classes/Import.php`
**Method**: `remapRelationsOfField()`
**Lines**: 1250-1253

**Code excerpt**:
```php
} elseif ($this->isTableStatic($relation['table']) || $this->isRecordExcluded($relation['table'], (int)$relation['id']) || $relation['id'] < 0) {
    // Some select types could contain negative values, e.g. fe_groups (-1, -2).
    // This must be handled on both export and import.
    $actualRelations[] = $relation['table'] . '_' . $relation['id'];
}
```

**Comparison type**: `< 0` (less than zero)

**Data flow**:
- SOURCE: `$relation['id']` (generic relation ID from parsed export data, NOT language-field-specific)
- TRANSFORMATION: PHP numeric comparison (`< 0`)
- SINK: Passthrough handling for negative relation IDs (e.g., special fe_groups values like -1, -2)

**Note**: This is explicitly documented as handling special values in select fields like `fe_groups`, NOT language fields.

---

### Finding 5: Import.php:975 – sys_file_metadata default language check (=== '0')

**File**: `Classes/Import.php`
**Method**: `addSingle()`
**Lines**: 974-988

**Code excerpt**:
```php
} elseif ($table === 'sys_file_metadata'
    && $record['sys_language_uid'] === '0'
    && isset($this->importMapId['sys_file'][$record['file']])
) {
    // On adding sys_file records the belonging sys_file_metadata record was also created:
    // If there is one, the record needs to be overwritten instead of a new one created.
    $databaseRecord = $this->getSysFileMetaDataFromDatabase(
        $this->importMapId['sys_file'][$record['file']],
        0
    );
```

**Comparison type**: `=== '0'` (strict string equality)

**Data flow**:
- SOURCE: `$record['sys_language_uid']` (hardcoded field name, string value from parsed export XML)
- TRANSFORMATION: PHP strict string comparison (`=== '0'`)
- SINK: Conditional logic determining whether to reuse existing sys_file_metadata record or create new one

**Note**: Uses hardcoded field name `sys_language_uid` rather than schema derivation. String comparison against `'0'` (not integer).

---

### Finding 6: Import.php:1103 – sys_file_metadata language query constraint (eq)

**File**: `Classes/Import.php`
**Method**: `getSysFileMetaDataFromDatabase()`
**Lines**: 1095-1109

**Code excerpt**:
```php
$databaseRecord = $queryBuilder->select('uid')
    ->from('sys_file_metadata')
    ->where(
        $queryBuilder->expr()->eq(
            'file',
            $queryBuilder->createNamedParameter($file, Connection::PARAM_INT)
        ),
        $queryBuilder->expr()->eq(
            'sys_language_uid',
            $queryBuilder->createNamedParameter($sysLanguageUid, Connection::PARAM_INT)
        )
    )
    ->executeQuery()
    ->fetchAssociative();
```

**Comparison type**: `eq` (equality constraint in QueryBuilder)

**Data flow**:
- SOURCE: `$sysLanguageUid` parameter (passed as `0` from line 982 in Finding 5)
- TRANSFORMATION: `QueryBuilder::expr()->eq()` with `PARAM_INT` type
- SINK: Database query constraint `SELECT uid FROM sys_file_metadata WHERE file = ? AND sys_language_uid = ?`

**Note**: Uses hardcoded field name `sys_language_uid` rather than schema derivation.

---

### Finding 7: ExportPageTreeView.php:53 – Page tree default language filter (=0)

**File**: `Classes/View/ExportPageTreeView.php`
**Method**: `init()`
**Lines**: 51-54

**Code excerpt**:
```php
public function init($clause = '', $orderByFields = '')
{
    parent::init(' AND deleted=0 AND sys_language_uid=0 ' . $clause, $orderByFields);
}
```

**Comparison type**: `=0` (equality in SQL WHERE clause string)

**Data flow**:
- SOURCE: Hardcoded SQL string fragment `' AND deleted=0 AND sys_language_uid=0 '`
- TRANSFORMATION: String concatenation into WHERE clause
- SINK: Database query in parent `AbstractTreeView::init()` method

**Note**: Uses hardcoded field name `sys_language_uid` and hardcoded comparison in SQL string, not schema derivation or QueryBuilder.

---

### Finding 8: Import.php:1052 – Translation source field reset to 0

**File**: `Classes/Import.php`
**Method**: `addSingle()`
**Lines**: 1044-1053

**Code excerpt**:
```php
$translationSourceFieldName = null;
if ($schema->isLanguageAware()) {
    $languageCapability = $schema->getCapability(TcaSchemaCapability::Language);
    $translationSourceFieldName = $languageCapability->getTranslationSourceField()?->getName();
}

// Set to "0" for integer fields, or else we will get a db error in DataHandler persistence.
if ($translationSourceFieldName && $field === $translationSourceFieldName) {
    $importData[$table][$ID][$field] = 0;
}
```

**Comparison type**: Assignment to `0` (not a comparison, but value normalization)

**Data flow**:
- SOURCE: Schema-derived `$translationSourceFieldName` (typically `l10n_source`)
- TRANSFORMATION: Conditional field name match, then assignment to integer `0`
- SINK: Prepared import data array for DataHandler persistence

**Note**: Sets translation source field to 0 when relation cannot be resolved, preventing database constraint violations.

---

## 3. Semantic Classification

### Finding 1: Export.php:259 – `> 0` on language field
**Category**: **SR** (Semantically relevant)

**Justification**: Filters translated pages by excluding default language (0) and any potential negative language IDs (e.g., -1 for "all languages").

---

### Finding 2: Export.php:199 – `> 0` on translation origin pointer field
**Category**: **SR** (Semantically relevant)

**Justification**: Determines if a page is a translation by checking for positive translation parent UID; negative or zero values indicate no translation relationship.

---

### Finding 3: Export.php:550 – `> 0` on translation source field
**Category**: **SR** (Semantically relevant)

**Justification**: Identifies translated records with valid translation source references; excludes records without translation source (0) or with invalid references.

---

### Finding 4: Import.php:1250 – `< 0` on generic relation ID
**Category**: **IRR** (Not relevant for productive logic)

**Justification**: Explicitly documented as handling special select field values (e.g., fe_groups -1, -2), not language field semantics; generic relation passthrough logic.

---

### Finding 5: Import.php:975 – `=== '0'` on sys_language_uid
**Category**: **SR** (Semantically relevant)

**Justification**: Determines special import behavior for default language sys_file_metadata records; string comparison on language identifier.

---

### Finding 6: Import.php:1103 – `eq` constraint on sys_language_uid
**Category**: **SR** (Semantically relevant)

**Justification**: Database query filtering by language ID to retrieve existing sys_file_metadata record for specific language.

---

### Finding 7: ExportPageTreeView.php:53 – `=0` on sys_language_uid
**Category**: **SR** (Semantically relevant)

**Justification**: Filters page tree to only include default language pages for export; excludes all translations.

---

### Finding 8: Import.php:1052 – Assignment to `0` on translation source field
**Category**: **SR** (Semantically relevant)

**Justification**: Normalizes unresolved translation source references to 0 to satisfy database integrity constraints during import.

---

## 4. Parser Rule Derivations

### Rule 1: QueryBuilder `gt()` on schema-derived language field

**AST signature**:
```
MethodCall(
  object: ChainedMethodCall(QueryBuilder, "expr"),
  method: "gt",
  args: [
    MethodCall(
      object: MethodCall(schemaCapability, "getLanguageField"),
      method: "getName"
    ),
    Scalar(0)
  ]
)
```

**Detection signal**: `$queryBuilder->expr()->gt($languageCapability->getLanguageField()->getName(), 0)`

**Context conditions**:
- Must be within database query construction context (QueryBuilder instance)
- First argument must be schema-derived language field name via `getLanguageField()->getName()`
- Second argument must be literal `0` or integer parameter

**Exclusion conditions**:
- If first argument is NOT from `getLanguageField()` chain (e.g., other schema fields)
- If comparison is against non-zero value

**Equivalent AST forms**:
- `$queryBuilder->expr()->gt($schema->getCapability(TcaSchemaCapability::Language)->getLanguageField()->getName(), 0)`
- Stored in variable: `$fieldName = $languageCapability->getLanguageField()->getName(); ... ->gt($fieldName, 0)`

---

### Rule 2: PHP comparison `> 0` on schema-derived translation pointer field

**AST signature**:
```
Greater(
  left: Coalesce(
    ArrayDimFetch(array: $record, dim: $transOrigPointerFieldName),
    Scalar(0)
  ),
  right: Scalar(0)
)
```

**Detection signal**: `($record[$transOrigPointerFieldName] ?? 0) > 0`

**Context conditions**:
- Variable `$transOrigPointerFieldName` must be assigned from `getTranslationOriginPointerField()->getName()`
- Array access on record data structure (e.g., `$record`, `$row`)
- Comparison against literal `0`

**Exclusion conditions**:
- If field name is NOT schema-derived (e.g., hardcoded string literal)
- If comparison is `>= 0`, `!= 0`, or other operators

**Equivalent AST forms**:
- `(int)($record[$transOrigPointerFieldName] ?? 0) > 0` (with explicit cast)
- `isset($record[$transOrigPointerFieldName]) && $record[$transOrigPointerFieldName] > 0`

---

### Rule 3: PHP comparison `> 0` on schema-derived translation source field

**AST signature**:
```
Greater(
  left: Cast(
    type: "int",
    expr: Coalesce(
      ArrayDimFetch(array: $row, dim: $translationSourceFieldName),
      Scalar(0)
    )
  ),
  right: Scalar(0)
)
```

**Detection signal**: `((int)($row[$translationSourceFieldName] ?? 0)) > 0`

**Context conditions**:
- Variable `$translationSourceFieldName` must be assigned from `getTranslationSourceField()?->getName()`
- Preceded by null check: `if ($translationSourceFieldName && ...)`
- Array access on record data structure

**Exclusion conditions**:
- If field name is NOT schema-derived
- If null check on field name variable is missing

**Equivalent AST forms**:
- Without explicit cast: `($row[$translationSourceFieldName] ?? 0) > 0`
- With different null coalescing: `(int)($row[$translationSourceFieldName] ?: 0) > 0`

---

### Rule 4: PHP comparison `< 0` on generic relation ID

**AST signature**:
```
Smaller(
  left: ArrayDimFetch(
    array: ArrayDimFetch($relation, 'table'),
    dim: 'id'
  ),
  right: Scalar(0)
)
```

**Detection signal**: `$relation['id'] < 0`

**Context conditions**:
- Must be within relation remapping logic (method handling DB relations)
- Part of compound conditional with static table or excluded record checks
- Accompanied by comment mentioning select field special values (fe_groups, etc.)

**Exclusion conditions**:
- If array key is language-field-specific (e.g., `sys_language_uid`, `languageField`)
- If NOT in relation remapping context

**Equivalent AST forms**:
- `(int)$relation['id'] < 0` (with explicit cast)
- `0 > $relation['id']` (reversed operands)

**IMPORTANT**: This rule should NOT trigger on language field operations. Exclude if context analysis shows language field handling.

---

### Rule 5: String comparison `=== '0'` on hardcoded sys_language_uid

**AST signature**:
```
Identical(
  left: ArrayDimFetch(
    array: $record,
    dim: StringLiteral('sys_language_uid')
  ),
  right: StringLiteral('0')
)
```

**Detection signal**: `$record['sys_language_uid'] === '0'`

**Context conditions**:
- Hardcoded field name string literal `'sys_language_uid'`
- String literal comparison value `'0'` (not integer 0)
- Array access on import record data

**Exclusion conditions**:
- If field name is schema-derived variable (not hardcoded)
- If comparison value is integer `0` instead of string `'0'`

**Equivalent AST forms**:
- `$record['sys_language_uid'] == '0'` (loose equality, likely equivalent in this context)
- Reversed: `'0' === $record['sys_language_uid']`

---

### Rule 6: QueryBuilder `eq()` on hardcoded sys_language_uid

**AST signature**:
```
MethodCall(
  object: ChainedMethodCall(QueryBuilder, "expr"),
  method: "eq",
  args: [
    StringLiteral('sys_language_uid'),
    MethodCall(
      object: $queryBuilder,
      method: "createNamedParameter",
      args: [$sysLanguageUid, Connection::PARAM_INT]
    )
  ]
)
```

**Detection signal**: `$queryBuilder->expr()->eq('sys_language_uid', $queryBuilder->createNamedParameter($sysLanguageUid, Connection::PARAM_INT))`

**Context conditions**:
- Hardcoded field name string literal `'sys_language_uid'`
- Within sys_file_metadata query context
- Parameter type `Connection::PARAM_INT`

**Exclusion conditions**:
- If field name is schema-derived variable
- If table context is NOT sys_file_metadata

**Equivalent AST forms**:
- Without named parameter: `->eq('sys_language_uid', $sysLanguageUid)` (deprecated pattern)
- With PDO constant: `->eq('sys_language_uid', $queryBuilder->createNamedParameter($sysLanguageUid, \PDO::PARAM_INT))`

---

### Rule 7: Hardcoded SQL string with `sys_language_uid=0`

**AST signature**:
```
String(' AND deleted=0 AND sys_language_uid=0 ')
```

**Detection signal**: SQL string literal containing `sys_language_uid=0`

**Context conditions**:
- String concatenation into WHERE clause
- Within page tree initialization (ExportPageTreeView or similar)
- Part of legacy SQL string building (not QueryBuilder)

**Exclusion conditions**:
- If within comment or docblock
- If part of test fixture SQL

**Equivalent AST forms**:
- ` AND sys_language_uid=0 AND deleted=0` (different order)
- ` AND sys_language_uid = 0 ` (with spaces around operator)

---

### Rule 8: Assignment to `0` on schema-derived translation source field

**AST signature**:
```
Assign(
  var: ArrayDimFetch(
    array: ArrayDimFetch(
      array: ArrayDimFetch($importData, $table),
      dim: $ID
    ),
    dim: $field
  ),
  expr: Scalar(0)
)
WHERE $field === $translationSourceFieldName
```

**Detection signal**: `$importData[$table][$ID][$field] = 0` where `$field === $translationSourceFieldName`

**Context conditions**:
- Variable `$translationSourceFieldName` must be assigned from `getTranslationSourceField()?->getName()`
- Preceded by conditional: `if ($translationSourceFieldName && $field === $translationSourceFieldName)`
- Within import data preparation context

**Exclusion conditions**:
- If field name is NOT schema-derived
- If assigned value is NOT literal `0`

**Equivalent AST forms**:
- With cast: `$importData[$table][$ID][$field] = (int)0`
- Direct array write: `$data[$field] = 0` (in different data structure)

---

## 5. Misclassification Risks

### False Positives

1. **Generic `> 0` checks on non-language fields**
   - Risk: Parser may match `> 0` comparisons on any schema-derived field, not just language-related fields
   - Mitigation: Require AST pattern to include specific method chain: `getLanguageField()`, `getTranslationOriginPointerField()`, or `getTranslationSourceField()`

2. **Import.php:1250 generic relation ID check**
   - Risk: The `< 0` comparison could be misclassified as language field logic
   - Mitigation: Exclude if NOT preceded by language capability schema derivation; require comment analysis mentioning "select types" or "fe_groups"

3. **Variable name heuristics**
   - Risk: Variables named `$languageField` or `$sysLanguageUid` in non-language contexts
   - Mitigation: Require schema capability API usage in same scope, not just variable naming patterns

4. **TCA 'rootLevel' configuration**
   - Risk: `'rootLevel' => -1` in TCA (line 14 of tx_impexp_presets.php) could match `-1` pattern search
   - Mitigation: Exclude array assignments in `'ctrl'` TCA context; only match runtime comparisons/queries

### False Negatives

1. **Dynamic field name construction**
   - Risk: If language field names are constructed dynamically (e.g., via string concatenation), schema API call may not be detectable
   - Mitigation: Manual review of any string manipulation on schema field names; no instances found in impexp

2. **Indirect QueryBuilder constraints**
   - Risk: If `gt()` or `eq()` constraints are built indirectly via helper methods or stored in arrays
   - Mitigation: Track QueryBuilder constraint building methods; expand pattern to include constraint array construction

3. **Legacy SQL string patterns**
   - Risk: Additional hardcoded SQL strings in parent classes or dependencies (e.g., AbstractTreeView)
   - Mitigation: Analyze inheritance hierarchy; ExportPageTreeView.php:53 is sole instance in impexp

4. **Implicit zero comparisons**
   - Risk: Implicit truthiness checks like `if ($record[$languageField])` exclude zero and negative values without explicit comparison
   - Mitigation: Extend parser rules to match boolean context usage of language field values

5. **Negative language ID constants**
   - Risk: If TYPO3 Core defines constants like `LanguageAspect::ALL_LANGUAGES = -1`, references may not be detectable as `-1`
   - Mitigation: Include constant resolution in parser; check for Core language-related constants (none found in impexp)

---

## 6. Tests and Fixtures (Isolated)

### Test File Analysis

**Analyzed files**:
- `Tests/Functional/Export/MultilingualPagesAndTtContentTest.php`
- `Tests/Functional/Fixtures/DatabaseImports/pages-multilingual.csv`
- `Tests/Functional/Fixtures/DatabaseImports/tt_content-multilingual.csv`
- `Tests/Functional/Fixtures/XmlExports/pages-and-ttcontent-multilingual*.xml`

**Findings**:

1. **No negative language IDs in test data**
   - CSV fixtures use language IDs: `0` (default), `1` (German), `2` (French)
   - No instances of `-1` or other negative language IDs in functional test databases

2. **No `-1` in test code**
   - Test grep search for `-1` in `Tests/**/*.php` found only:
     - File path references (e.g., `fileadmin-1`, `used-1.jpg`)
     - SHA-1 hash references in error messages
   - No negative language ID usage in test assertions or setup

3. **Test code mirrors productive patterns**
   - `MultilingualPagesAndTtContentTest.php:48` includes `sys_language_uid` in `recordTypesIncludeFields`
   - Tests verify export/import of language IDs 0, 1, 2 only
   - No special handling or testing of negative language IDs

**Conclusion**: Tests do NOT provide evidence of negative language ID usage. All multilingual test scenarios use positive integer language IDs (0, 1, 2), consistent with standard TYPO3 language semantics. No test coverage for potential "all languages" (-1) scenarios.

---

## Summary of Key Findings

1. **No explicit `-1` language field usage found**: The impexp extension does not contain any comparisons like `sys_language_uid = -1` or `$languageField === -1`.

2. **Implicit exclusion of negative language IDs**: Finding 1 (Export.php:259) uses `> 0` which implicitly excludes both zero (default language) AND any negative values like -1.

3. **Schema-driven architecture**: Language field names are derived via TCA schema capability APIs in all productive code except two legacy hardcoded instances (Import.php:975,1103 for sys_file_metadata; ExportPageTreeView.php:53 for page tree SQL).

4. **Generic negative relation handling**: Finding 4 (Import.php:1250) handles negative relation IDs for select fields like fe_groups, NOT language fields.

5. **All test data uses non-negative language IDs**: No evidence of -1 usage in functional tests or fixtures.
