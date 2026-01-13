# Analysis – recycler

## 0. Scope Coverage

### Searched Top-Level Directories

- `Classes/` – All 4 PHP files verified via direct read
- `Configuration/` – All 4 PHP configuration files reviewed
- `Tests/` – All 5 test PHP files and 6 CSV fixtures verified
- `Resources/` – Excluded (contains only frontend assets and XLIFF translation files)
- `Documentation/` – Verified via grep (0 language-related mentions)

### Productive Files Verified via Direct Read

1. `Classes/Domain/Model/DeletedRecords.php` – Core domain logic (558 lines)
2. `Classes/Controller/RecyclerAjaxController.php` – AJAX controller (422 lines)
3. `Classes/Controller/RecyclerModuleController.php` – Module controller (117 lines)
4. `Classes/Task/CleanerTask.php` – Scheduler task (175 lines)

All TCA override and configuration files examined.

### Justification for Excluded Areas

- **Resources/Private/Language/**: Contains only XLIFF files for UI label translation (non-database)
- **Resources/Private/Templates/**: Fluid templates for UI rendering (non-database)
- **Resources/Public/**: JavaScript and CSS assets (non-database)
- **Documentation/**: ReST documentation with zero language-related content

---

## 1. Determination of Language Fields

The recycler extension does **not** determine or interact with language fields.

### Schema Capability Usage

The extension exclusively uses:
- `TcaSchemaCapability::SoftDelete` – to obtain the `deleted` field name
- `TcaSchemaCapability::UpdatedAt` – to obtain timestamp field names
- `TcaSchemaCapability::CreatedAt` – to obtain creation timestamp field names
- `TcaSchemaCapability::Label` – to obtain record label field names

### No Language Field Derivation

Exhaustive search conducted:
```
Pattern: languageField|TranslationOrigin|Language
Result: 0 matches in PHP files
```

The extension does not:
- Access `$GLOBALS['TCA'][<table>]['ctrl']['languageField']`
- Use `TcaSchemaCapability::Language` or `TcaSchemaCapability::TranslationOrigin`
- Read or derive language-related field names via any mechanism

---

## 2. Language-Field Usage with Negative Values

### Summary

**Zero occurrences found.**

### Exhaustive Search Results

| Pattern | Scope | Matches |
|---------|-------|---------|
| `-1` | All PHP files | 0 |
| `< 0` | All PHP files | 0 |
| `<= -1` | All PHP files | 0 |
| `!= 0` | All PHP files | 0 (in language context) |
| `IN (-1` | All PHP files | 0 |
| `sys_language_uid` | All PHP + CSV | 0 |
| `l10n_parent` | All PHP + CSV | 0 |

### Detailed Verification

All query construction locations verified:

1. **DeletedRecords.php:143-154** – Count query uses `deleted` field only
2. **DeletedRecords.php:211-218** – Select query uses `deleted` field only
3. **DeletedRecords.php:240-285** – PID filtering with no language constraints
4. **RecyclerAjaxController.php:285-296** – Page path query (uid/pid only)
5. **RecyclerAjaxController.php:350-362** – Deleted count query uses `deleted` field only
6. **CleanerTask.php:77-99** – Delete query uses `deleted` and `tstamp` fields only

No negative value comparisons in any database context.

---

## 3. Semantic Classification

Not applicable – no findings to classify.

---

## 4. Parser Rule Derivations

### Required Rules

**None.**

### Rationale

The recycler extension operates exclusively on the soft-delete mechanism and does not interact with database-level language fields. Therefore:

- No AST patterns for negative language identifier detection are required
- No detection signals need to be defined
- No context or exclusion conditions are applicable

---

## 5. Misclassification Risks

### False Positives

**Extension-Specific Risk: None.**

Generic false positive patterns that would affect other extensions but are absent here:
- Variable names containing "language" – not present in this extension
- Method names containing "l10n" – not present in this extension
- Constants named `LANGUAGE_ALL` – not present in this extension

### False Negatives

**Extension-Specific Risk: None.**

Potential false negative scenarios that do not apply:
- Dynamic field name construction – extension uses only static TcaSchemaCapability derivation for `deleted`, `tstamp`, `crdate`, and `uid` fields
- Indirect language value propagation – extension does not receive or transport language identifiers
- Language values in configuration arrays – no language-related configuration exists

---

## 6. Tests and Fixtures (Isolated)

### Functional Test Coverage

Three test classes examined:
1. `Tests/Functional/Recycle/AbstractRecycleTestCase.php`
2. `Tests/Functional/Recycle/Pages/AdminRecycleTest.php`
3. `Tests/Functional/Recycle/Pages/UserRecycleTest.php`
4. `Tests/Functional/Task/CleanerTaskTest.php`

### CSV Fixture Analysis

Six CSV fixture files examined:

| File | Fields | Language Fields |
|------|--------|-----------------|
| `Tests/Functional/Fixtures/Database/pages.csv` | uid, pid, title, doktype, deleted, perms_everybody | None |
| `Tests/Functional/Fixtures/Database/be_users.csv` | uid, username, admin, etc. | None |
| `Tests/Functional/Fixtures/Database/be_groups.csv` | uid, title, tables_modify | None |
| `Tests/Functional/Task/DataSet/Fixtures/pages.csv` | uid, pid, title, deleted, tstamp | None |
| `Tests/Functional/Task/DataSet/Assertion/pages_deleted.csv` | uid, pid, title, deleted | None |
| `Tests/Functional/Task/DataSet/Assertion/pages_deleted_with_period.csv` | uid, pid, title, deleted, tstamp | None |

### Observations

- No `sys_language_uid` field present in any fixture
- No `l10n_parent` or translation-related fields
- No negative language identifier values in test data
- Tests verify only soft-delete mechanics, not language behavior

**Conclusion**: Test fixtures contain no language-related data structures and therefore provide no evidence of productive language field handling.

---

## Summary

The recycler extension has **zero interaction** with database-level language fields or negative language identifiers. The extension's scope is strictly limited to:

1. Querying records where `deleted = 1`
2. Restoring records by setting `deleted = 0`
3. Permanently removing records where `deleted = 1`
4. Access control based on backend user permissions
5. Workspace overlay operations (via `BackendUtility::workspaceOL`)

No parser rules, detection patterns, or classification logic for negative language identifiers are required for this extension.
