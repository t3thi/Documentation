# Analysis – EXT:opendocs

## 0. Scope Coverage

### Searched Top-Level Directories
- `Classes/` — 2 PHP files (all productive code)
- `Configuration/` — 3 files (AjaxRoutes.php, JavaScriptModules.php, Services.yaml)
- `Resources/` — Templates and static assets
- Root level — ext_emconf.php, ext_localconf.php, composer.json

### Productive Files Verified via Direct Read
| File | Verified |
|------|----------|
| `Classes/Backend/ToolbarItems/OpendocsToolbarItem.php` | ✓ |
| `Classes/Controller/OpenDocumentController.php` | ✓ |
| `Configuration/Backend/AjaxRoutes.php` | ✓ |
| `Configuration/JavaScriptModules.php` | ✓ |
| `Configuration/Services.yaml` | ✓ |
| `ext_localconf.php` | ✓ |
| `ext_emconf.php` | ✓ |

### Justification for Excluded Areas
| Area | Reason for Exclusion |
|------|---------------------|
| `Resources/Private/Language/` | XLIFF UI translations only |
| `Resources/Private/Templates/` | Fluid templates with LLL: references only |
| `Resources/Public/` | Static assets (icons, JavaScript) |
| `LICENSE.txt`, `README.rst` | Documentation/legal |

### Test Directory
No `Tests/` directory exists in this extension.

---

## 1. Determination of Language Fields

**Finding: Not applicable**

This extension does not determine or derive database language field names:
- No TCA configuration defined (`Configuration/TCA/` directory absent)
- No `ext_tables.sql` schema definitions
- No usage of `$GLOBALS['TCA']` language field access
- No Schema API or capability API invocations
- No mapper or metadata structures for language fields

All database operations are delegated to external Core components:
- `OpenDocumentRepository` (from `typo3/cms-backend`)
- `BackendUtility::getRecordWSOL()` (from `typo3/cms-backend`)

---

## 2. Language-Field Usage with Negative Values

**Finding: None**

Exhaustive search performed:
- Pattern `-1` → No database-language-related matches (only LICENSE.txt addresses)
- Pattern `< 0|<= -|== -|=== -|!= -|!== -` → No matches
- Pattern `sys_language|languageField` → No matches in PHP code

The extension contains zero occurrences of negative language identifier usage in any context.

---

## 3. Semantic Classification

**Finding: No classifications required**

No occurrences of negative language values exist to classify.

---

## 4. Parser Rule Derivations

**Finding: No rules derivable**

No language-related code patterns exist in this extension that would inform parser rule design.

### Structural Observations for Parser Context

The following delegation patterns exist but contain no internal language logic:

| Pattern | Location | Observation |
|---------|----------|-------------|
| `BackendUtility::getRecordWSOL($table, $uid)` | `OpendocsToolbarItem.php:156` | No language parameter passed; overlay handling internal to Core |
| `OpenDocumentRepository::findOpenDocumentsForUser()` | `OpendocsToolbarItem.php:87` | Returns `OpenDocument` DTOs without language context |
| `OpenDocumentRepository::closeDocument()` | `OpenDocumentController.php:63` | Operates on table/uid identifier only |

---

## 5. Misclassification Risks

### False Positives

| Risk | Description |
|------|-------------|
| `BackendUtility::getRecordWSOL()` call | May be flagged as language-relevant due to "WSOL" (WorkSpace OverLay) in method name. This extension passes no language parameters and does not process returned records for language. |
| LLL: references in templates | May be detected as language patterns; these are strictly UI localization. |

### False Negatives

None identified.

The extension has no custom database queries, no language field access, and no data structures that could obscure language value handling.

---

## 6. Tests and Fixtures (Isolated)

**Finding: No test directory exists**

The extension contains no `Tests/` directory and no test fixtures.

No test-related observations to document.
