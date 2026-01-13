# Analysis – EXT:felogin

## 0. Scope Coverage

### Searched top‑level directories
- `Classes/` (22 PHP files)
- `Configuration/` (3 PHP files)
- `Tests/` (8 PHP/CSV files)
- `Resources/Private/Templates/` (Fluid templates)

### Productive files verified via direct read
- `Classes/Domain/Repository/FrontendUserRepository.php`
- `Classes/Domain/Repository/FrontendUserGroupRepository.php`
- `Classes/Controller/LoginController.php`
- `Classes/Controller/PasswordRecoveryController.php`
- `Classes/Redirect/RedirectHandler.php`
- `Classes/Redirect/RedirectModeHandler.php`
- `Classes/Service/RecoveryService.php`
- `Configuration/TCA/Overrides/fe_users.php`
- `Configuration/TCA/Overrides/fe_groups.php`
- `Configuration/TCA/Overrides/tt_content.php`

### Justification for excluded areas
- `Resources/Private/Language/*.xlf`: XLIFF label files (UI localization, explicitly out of scope)
- `Documentation/`: ReST documentation files (no executable logic)
- Event classes (`Classes/Event/*`): DTOs without database operations
- Unit tests: No database interaction or language field references

---

## 1. Determination of Language Fields

**Determination method:** Not applicable.

**Rationale:**
The extension performs no language field derivation. Database operations target exclusively `fe_users` and `fe_groups` tables via direct QueryBuilder usage without:
- TCA `ctrl.languageField` lookups
- Schema or capability API calls
- Language aspect evaluation for field names
- Mapper or metadata introspection

All queries constrain records by non-language criteria: `uid`, `username`, `email`, `felogin_forgotHash`, `felogin_redirectPid`, `pid`.

---

## 2. Language‑Field Usage with Negative Values

**Zero occurrences found.**

---

## 3. Semantic Classification

**Not applicable.** No language‑field usage with negative values exists in this extension.

---

## 4. Parser Rule Derivations

**No rules required.** The extension contains no patterns involving negative language identifier semantics.

---

## 5. Misclassification Risks

### False Positives

**Use of `-1` for non-language semantics:**

- **Location:** `Classes/Controller/LoginController.php:187`
  ```php
  return $this->isPermaloginDisabled($permaLogin) ? -1 : $permaLogin;
  ```
  **Risk:** AST parsers detecting literal `-1` in return statements might flag this as language-related. This value controls permanent login UI visibility (`$GLOBALS['TYPO3_CONF_VARS']['FE']['permalogin']`) and has zero connection to database language fields.

- **Location:** `Resources/Private/Templates/Login/Login.fluid.html:42`
  ```html
  <f:if condition="{permaloginStatus} > -1">
  ```
  **Risk:** Template parsers might misidentify this comparison. The variable `permaloginStatus` derives from the above controller method and controls checkbox rendering, not language records.

**Mitigation:** Parser rules must verify the semantic domain of compared values. Variable names containing "perma", "login", "status" in frontend authentication contexts are not language-related.

### False Negatives

**None identified.** The extension performs no database operations involving language fields, eliminating the possibility of undetected negative language identifier usage.

---

## 6. Tests and Fixtures (Isolated)

### Test fixture schema verification

**Fixtures inspected:**
- `Tests/Functional/Fixtures/fe_users.csv`
- `Tests/Functional/Fixtures/fe_groups.csv`

**Fields present:**
- `fe_users`: uid, pid, name, username, email, felogin_forgotHash, felogin_redirectPid
- `fe_groups`: uid, felogin_redirectPid

**Absence of language fields:** Neither fixture includes `sys_language_uid`, `l10n_parent`, `l10n_source`, or `l10n_diffsource`.

**Conclusion:** Test fixtures confirm that the extension's operational scope excludes language-aware record handling. No negative language identifier occurrences exist in test data.

### Test code analysis

**Files inspected:**
- `Tests/Functional/Domain/Repository/FrontendUserRepositoryTest.php`
- `Tests/Functional/Domain/Repository/FrontendUserGroupRepositoryTest.php`
- 4 unit test files

**Findings:** Zero references to:
- Literal `-1` values
- Language field names
- TCA language configuration

**Observation:** Tests validate authentication flows (password recovery, redirect resolution) without language context, confirming productive code semantics.

---

## Summary

The extension exhibits **zero semantic interaction** with database-level language fields. The single false-positive risk (`-1` for permanent login control) requires context-aware parser exclusion rules based on variable naming and feature domain.
