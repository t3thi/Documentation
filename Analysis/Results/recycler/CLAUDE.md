# TYPO3 Core Extension: recycler

## 1) Extension Profile

The recycler extension provides management capabilities for soft-deleted records in TYPO3. It offers a backend module that displays deleted records across all tables with soft-delete capability, enabling users to restore (undelete) or permanently remove these records. The extension includes a scheduler task for automated cleanup of deleted records based on configurable age thresholds.

---

## 2) Relation to Database-Level Multilinguality

**Rating: none**

The recycler extension operates exclusively on the soft-delete mechanism (`deleted` field) and does not interact with database-level language fields. Analysis of all source files reveals:

- No references to `sys_language_uid` or language-related TCA fields
- No language-based query constraints or filtering
- No language field evaluation in record selection or display logic
- No language-specific overlays (only workspace overlays via `BackendUtility::workspaceOL`)
- Record restoration and deletion operations apply uniformly regardless of language context

---

## 3) Observed Code Hotspots (DB Language Logic)

None.

---

## 4) Structural Patterns

None.

---

## 5) Explicit Non-Relevant Areas

- **Classes/Controller/RecyclerModuleController.php**: References to `LanguageService` are for UI label translation only
- **Classes/Controller/RecyclerAjaxController.php**:
  - `LocalizationUtility` usage for flash messages (lines 126, 136, 155)
  - `LanguageService` usage for UI labels (lines 344, 383)
  - `addInlineLanguageLabelFile` for JavaScript UI labels (line 68 in RecyclerModuleController.php)
- **Classes/Task/CleanerTask.php**: `getLanguageService()` calls for scheduler task description labels only
- **Resources/Private/Language/**: All XLIFF files contain UI translations, not database language logic

---

## 6) Open Observations

None.
