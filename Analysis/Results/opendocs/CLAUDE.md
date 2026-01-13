# EXT:opendocs - Static Analysis for Database-Level Multilinguality

## 1) Extension Profile

The `opendocs` extension provides a backend toolbar item that tracks and displays open and recently accessed database records for backend users. It renders a dropdown menu listing documents currently being edited and documents that were recently opened, allowing users to quickly navigate back to in-progress work. The extension delegates all persistence and retrieval operations to TYPO3 Core's `OpenDocumentRepository`.

## 2) Relation to Database-Level Multilinguality

**Rating: none**

**Justification:**
- The extension contains no references to `sys_language_uid`, `languageField`, or numeric language identifiers
- No TCA configuration is defined; the extension does not manage database tables
- No QueryBuilder usage with language constraints
- No language value filtering, propagation, or persistence logic
- The extension operates purely on document metadata (table name, uid, title, parameters) without language context
- Record retrieval via `BackendUtility::getRecordWSOL()` is delegated to Core without language parameters

## 3) Observed Code Hotspots (DB Language Logic)

None identified.

The extension contains no code locations where database-level language information is read, compared, propagated, or derived.

## 4) Structural Patterns

No database-language-related code patterns are present in this extension.

## 5) Explicit Non-Relevant Areas

| Location | Description |
|----------|-------------|
| `Resources/Private/Language/locallang.xlf` | UI label translations (XLIFF) |
| `Resources/Private/Templates/ToolbarItems/*.fluid.html` | LLL: references for UI text rendering |

These files contain language references exclusively for backend interface localization, not database-level record language handling.

## 6) Open Observations

| Location | Observation |
|----------|-------------|
| `Classes/Backend/ToolbarItems/OpendocsToolbarItem.php:156` | Calls `BackendUtility::getRecordWSOL()` which internally performs workspace and language overlay operations. The extension does not pass language parameters and does not process overlay results differently based on language. The language handling occurs entirely within the Core utility. |
