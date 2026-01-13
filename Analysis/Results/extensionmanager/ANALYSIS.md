# Analysis – extensionmanager

## 0. Scope Coverage

### Searched Top-Level Directories
- `Classes/` — All 60 PHP files searched for `-1`, `< 0`, language field patterns
- `Configuration/` — TCA overrides and service configuration verified
- `Tests/` — Unit tests searched for `-1` patterns and fixtures
- `Resources/` — Language files (XLIFF) excluded per scope rules
- `ext_tables.sql` — Schema verified for language fields

### Productive Files Verified via Direct Read
- `Classes/Domain/Model/Extension.php` — Domain model schema
- `Classes/Domain/Repository/ExtensionRepository.php` — Query patterns
- `Classes/Domain/Repository/BulkExtensionRepositoryWriter.php` — Bulk import
- `Classes/Report/ExtensionStatus.php` — `-1` comparison context
- `Classes/Utility/DependencyUtility.php` — `-1` comparison context
- `ext_tables.sql` — Table schema

### Justification for Excluded Areas
- `Resources/Private/Language/` — XLIFF UI labels, excluded per global scope rules

---

## 1. Determination of Language Fields

**Result: No database language fields exist in this extension.**

Verification methods applied:
- Grep for `sys_language_uid`, `l10n_parent`, `l10n_source` — **0 matches**
- Grep for `languageField`, `transOrigPointerField` — **0 matches**
- Grep for overlay methods (`getLanguageOverlay`, `getRecordOverlay`) — **0 matches**
- Schema inspection (`ext_tables.sql`) — No language columns defined
- TCA inspection (`Configuration/TCA/`) — No TCA definition for extension table; scheduler task override contains no language configuration

The single custom table `tx_extensionmanager_domain_model_extension` is explicitly designed without TCA definition (per SQL comment) and contains no language-related columns.

---

## 2. Language-Field Usage with Negative Values

**Result: No language-field usage with negative values exists.**

All occurrences of `-1` in productive code are unrelated to database language fields:

### Occurrence 1: `version_compare()` return value
- **Files**: `Classes/Utility/DependencyUtility.php:177,183,206,212,248,276`, `Classes/Domain/Model/Dependency.php:109,112`
- **Pattern**: `version_compare($a, $b) === -1`
- **Purpose**: PHP standard library return value indicating "version A < version B"
- **Data flow**: N/A — Not a database field value

### Occurrence 2: `review_state` field comparison
- **File**: `Classes/Report/ExtensionStatus.php:128,143`
- **Code excerpt**:
  ```php
  $insecureStatus = $terObject->reviewState;
  if ($insecureStatus === -1) {
      // extension marked as insecure
  } elseif ($insecureStatus === -2) {
      // extension marked as outdated
  }
  ```
- **Field semantics**: Security review status from TER (TYPO3 Extension Repository)
  - `0` = OK/reviewed
  - `-1` = Insecure
  - `-2` = Outdated
- **Data flow**: `tx_extensionmanager_domain_model_extension.review_state` → `Extension::$reviewState` → status classification
- **Purpose**: Security status evaluation, NOT language handling

### Occurrence 3: `review_state` query filters
- **File**: `Classes/Domain/Repository/ExtensionRepository.php:50,65,87,123,201,245,316`
- **Pattern**: `$queryBuilder->expr()->gte('review_state', 0)` and `->in('review_state', [0, -2])`
- **Purpose**: Filter out insecure extensions (review_state = -1) from query results
- **Data flow**: Query constraint → SQL WHERE clause
- **Purpose**: Security filtering, NOT language handling

---

## 3. Semantic Classification

| Location | Value | Classification | Justification |
|----------|-------|----------------|---------------|
| `DependencyUtility.php:177,183,206,212,248,276` | `-1` | **IRR** | PHP `version_compare()` return value; not a database field |
| `Dependency.php:109,112` | `-1` | **IRR** | PHP `version_compare()` return value; not a database field |
| `ExtensionStatus.php:128` | `-1` | **IRR** | `review_state` field = security status, not language identifier |
| `ExtensionStatus.php:143` | `-2` | **IRR** | `review_state` field = security status, not language identifier |
| `ExtensionRepository.php:201` | `-2` | **IRR** | `review_state` filter for outdated extensions |
| `ExtensionRepository.php:50,65,87,123,245,316` | `>= 0` | **IRR** | `review_state` filter excluding insecure extensions |

**Summary**: All negative value comparisons are classified **IRR** (not relevant for productive language logic) because they operate on fields unrelated to database-level multilinguality.

---

## 4. Parser Rule Derivations

**Result: No parser rules required.**

No semantic uses of negative language identifiers exist in this extension. Therefore:
- No AST signatures to detect
- No detection signals applicable
- No context/exclusion conditions needed

For completeness, potential false-positive patterns to exclude in cross-extension analysis:

### Exclusion Pattern 1: `version_compare()` return value
- **AST signature**: `BinaryOp\Identical` with `FuncCall[name=version_compare]` and `LNumber[-1]`
- **Exclusion condition**: Target is function return value, not database field

### Exclusion Pattern 2: `review_state` field
- **AST signature**: `BinaryOp\Identical` with `PropertyFetch[name=reviewState]` or column name `review_state`
- **Exclusion condition**: Field name is `review_state`, not a language field (`sys_language_uid`, etc.)

---

## 5. Misclassification Risks

### False Positives

| Risk | Description | Mitigation |
|------|-------------|------------|
| `review_state === -1` misidentified as language check | Field name contains no "language" indicator; value `-1` matches language "all" pattern | Verify field origin: `review_state` maps to TER security status, not language |
| `version_compare() === -1` misidentified | Return value `-1` matches search pattern | Verify context: function return comparison, not field comparison |

### False Negatives

| Risk | Description |
|------|-------------|
| None identified | Extension has no database language fields; no language logic can be missed |

---

## 6. Tests and Fixtures (Isolated)

### Test Files Containing `-1`

| File | Usage | Relevance |
|------|-------|-----------|
| `Tests/Unit/Report/ExtensionStatusTest.php:169,212` | `$this->setUpRegistryStatusTests(-1)` | Fixture for `review_state = -1` (insecure extension). **Not language-related.** |
| `Tests/Unit/Utility/DependencyUtilityTest.php:105` | `Dependency::createFromEmConf('typo3', '-15.0.0')` | Version range string with negative prefix. **Not language-related.** |
| `Tests/Unit/Report/ExtensionStatusTest.php:118` | `new \DateTimeImmutable('-14days')` | Relative date string. **Not language-related.** |

**Conclusion**: No test fixtures exercise database language field logic with negative values. All `-1` occurrences in tests relate to `review_state` (security status) or `version_compare()` semantics.
