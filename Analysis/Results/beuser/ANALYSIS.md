# Analysis – beuser

## 0. Scope Coverage

**Searched directories:**
- `./Classes/` (23 PHP files)
- `./Configuration/` (4 PHP configuration files)
- `./Tests/` (7 PHP test files)
- `./Tests/Functional/Fixtures/` (3 CSV fixtures)

**Productive files verified via direct read:**
- Classes/Domain/Model/BackendUser.php
- Classes/Domain/Model/BackendUserGroup.php
- Classes/Service/UserInformationService.php
- Classes/Domain/Repository/BackendUserRepository.php
- Classes/Domain/Repository/BackendUserGroupRepository.php
- Classes/Controller/PermissionController.php
- Configuration/Extbase/Persistence/Classes.php

**Excluded areas:**
- `./Resources/` – Contains only frontend assets (JavaScript, Language/XLIFF, Templates/Fluid)
- ViewHelper classes – Examined but contain only UI translation calls (LanguageService for labels)
- Controller classes except PermissionController – Examined but contain no database language operations

**Justification:**
All code paths involving database field access, query construction, or data transport have been verified. The extension operates on non-translatable tables (be_users, be_groups) and does not interact with content records that have language overlays.

---

## 1. Determination of Language Fields

**Method of language field identification:**

The extension does NOT derive language field names dynamically. Language-related field handling occurs only for the `allowed_languages` field in be_users/be_groups tables through:

1. **Static Extbase persistence mapping** (Configuration/Extbase/Persistence/Classes.php:30-32):
   ```php
   'allowedLanguages' => [
       'fieldName' => 'allowed_languages',
   ],
   ```

2. **Domain model property** (Classes/Domain/Model/BackendUser.php:45):
   ```php
   protected string $allowedLanguages = '';
   ```

3. **Direct groupData array access** (Classes/Service/UserInformationService.php:133):
   ```php
   $userLanguages = GeneralUtility::trimExplode(',', $user->groupData['allowed_languages'] ?? '', true);
   ```

**No TCA-based language field derivation:**
- Zero references to `$GLOBALS['TCA']`
- Zero references to `ctrl.languageField` or `ctrl.transOrigPointerField`
- Zero references to schema/capability APIs for language field resolution
- TcaSchemaFactory usage exists (UserInformationService.php:42,149,206,224,225) but exclusively for retrieving table/field titles and non_exclude_fields metadata, not language field configuration

**Scope limitation:**
The `allowed_languages` field represents **permission/access control** (which content languages a backend user may work with), not a database language field for record translation. The be_users and be_groups tables themselves are not translatable.

---

## 2. Language‑Field Usage with Negative Values

**Result: ZERO occurrences found.**

Comprehensive searches performed:
- Pattern: `-1` in all PHP files
- Pattern: `< 0` and `<= 0` comparison operators
- Pattern: `sys_language_uid`, `l10n_parent`, `languageField`
- Context: Database queries, field assignments, comparisons

**Negative values found (non-language context):**

| File | Line | Code | Context |
|------|------|------|---------|
| PermissionController.php | 207 | `if ($conf['new_owner_uid'] < 0)` | Page owner validation |
| PermissionController.php | 233 | `if ($conf['new_group_uid'] < 0)` | Page group validation |
| PermissionController.php | 320 | `$beUserDataArray[-1] = $selectUnchanged;` | Dropdown sentinel value |
| PermissionController.php | 327 | `$beGroupDataArray[-1] = $selectUnchanged;` | Dropdown sentinel value |
| PermissionController.php | 361 | `if ((int)($properties['perms_userid'] ?? 0) === -1)` | Permission update filter |
| PermissionController.php | 364 | `if ((int)($properties['perms_groupid'] ?? 0) === -1)` | Permission update filter |

**Data flow (page permission context only):**

```
Edit form → POST data → PermissionController::updateAction()
  ↓
properties['perms_userid'] or properties['perms_groupid'] = -1 (user selection: "unchanged")
  ↓
if === -1: unset($properties[field]) → exclude from DataHandler input
  ↓
DataHandler persists only non-unchanged fields
```

**No language-field data flow exists in this extension.**

---

## 3. Semantic Classification

| Location | Category | Justification |
|----------|----------|---------------|
| PermissionController.php:207 | IRR | Validation logic for page owner UID; unrelated to language fields |
| PermissionController.php:233 | IRR | Validation logic for page group UID; unrelated to language fields |
| PermissionController.php:320 | IRR | UI dropdown sentinel for "select unchanged" option in permission form |
| PermissionController.php:327 | IRR | UI dropdown sentinel for "select unchanged" option in permission form |
| PermissionController.php:361 | IRR | Filters "unchanged" marker from DataHandler input (page owner field) |
| PermissionController.php:364 | IRR | Filters "unchanged" marker from DataHandler input (page group field) |

**No SR, STR, HIS, or TEST classifications apply** – zero semantic relevance to database language field handling.

---

## 4. Parser Rule Derivations

**Required rules: NONE**

**Reasoning:**
No code patterns involving negative language identifiers were observed. The extension does not:
- Query records by language field values
- Compare language field values to negative constants
- Persist negative language identifiers
- Derive language field names from TCA or schema metadata
- Apply language-based query constraints

**Non-applicable pattern (for reference only):**

The `-1` sentinel pattern observed in PermissionController (lines 320, 327, 361, 364) follows this structure:

```
AST: BinaryOp(op='===', left=Cast(target='int', value=ArrayDimFetch), right=UnaryOp(op='-', value=1))
Context: Variable name matches /perms_(userid|groupid)/
Signal: Int comparison to -1
```

This pattern is **explicitly irrelevant** to language field analysis as it operates on page ownership fields, not language fields.

---

## 5. Misclassification Risks

### False Positives

**Risk: Page permission field pattern collision**
- Detection: `-1` comparisons in PermissionController
- Mitigation: Exclude fields matching `perms_userid`, `perms_groupid`, `perms_user`, `perms_group`, `perms_everybody`
- Scope: beuser extension only; pattern specific to TYPO3 page permission model

**Risk: Dropdown sentinel value pattern**
- Detection: Array assignment `$array[-1] = ...` followed by form rendering
- Mitigation: Exclude assignments where value is translation label or "unchanged"/"none" sentinel string
- Context: HTML select element option with special meaning (e.g., "do not modify existing value")

### False Negatives

**Risk: External language field resolution**
- Scenario: If Core's BackendUserAuthentication aggregates `allowed_languages` from be_groups with special handling for `-1` (e.g., "all languages")
- Impact: Semantic use of negative language identifier would occur outside this extension's codebase
- Observable evidence in beuser: None – only reads pre-aggregated `groupData['allowed_languages']` string
- Validation required: Examine `TYPO3\CMS\Core\Authentication\BackendUserAuthentication::fetchGroupData()`

**Risk: Test fixture implicit semantics**
- Scenario: CSV fixtures contain empty `allowed_languages` values but runtime code in other extensions might populate with `-1`
- Impact: Test-derived rules would miss productive runtime patterns
- Observable evidence: Tests/Functional/Fixtures/be_groups.csv contains column but no non-empty values

**No other extension-specific false negative risks identified.**

---

## 6. Tests and Fixtures (Isolated)

**Test file inventory:**
- 2 Unit tests (Demand, BackendUser model)
- 5 Functional tests (ViewHelper, Controller, Repository)

**Language-related test observations:**

| File | Observation | Classification |
|------|-------------|----------------|
| Tests/Functional/Fixtures/be_groups.csv | Contains `allowed_languages` column (position 18) with empty values in all 3 fixture records | Non-binding: no negative values |
| Tests/Functional/Fixtures/be_users.csv | No `allowed_languages` column (not in be_users table per schema) | N/A |
| Tests/Unit/Domain/Model/BackendUserTest.php:97,135 | Contains `-10 days` date arithmetic (DateTime modification) | IRR: unrelated to language |

**No test code exercises negative language identifier scenarios.**

**Fixture data structure:**
```csv
"be_groups"
,"uid",...,"allowed_languages",...
,1,...,"",...        # Empty string
,2,...,"",...        # Empty string
,3,...,"",...        # Empty string
```

**Conclusion:**
Test fixtures define the `allowed_languages` field structure but provide no behavioral patterns involving negative values or language-based filtering. No test assertions verify language permission logic with special values like `-1` (all languages) or `0` (default/no restriction).

**Non-equivalence to productive code:**
Test fixtures cannot inform parser rules as they contain no populated language permission data. Real-world usage patterns would need to be derived from production database analysis or Core's permission evaluation logic.
