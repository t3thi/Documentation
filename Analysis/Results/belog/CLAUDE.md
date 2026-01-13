# CLAUDE.md – EXT:belog

## 1) Extension Profile

The belog extension provides a backend module for viewing and filtering log entries stored in the `sys_log` database table. It displays system events, errors, and actions performed by backend users, offering constraint-based filtering by user, workspace, channel, log level, timestamp range, and page tree context. The extension is read-only and does not modify log data beyond optional deletion of specific message groups.

---

## 2) Relation to Database-Level Multilinguality

**Rating:** none

**Justification:**

The `sys_log` table stores backend system events and does not contain language-related fields such as `sys_language_uid`, `l10n_parent`, or `transOrigPointer`. Log entries represent actions and events in the backend context and are not subject to database-level translation or language overlays. The extension performs no queries filtering by language identifiers, no language value comparisons, and no language-aware record selection or persistence.

---

## 3) Observed Code Hotspots (DB Language Logic)

None.

---

## 4) Structural Patterns

Not applicable.

---

## 5) Explicit Non-Relevant Areas

- **Classes/Controller/BackendLogController.php:342** – `getLanguageService()` method retrieves `LanguageService` for UI label translation (XLIFF)
- **Classes/ViewHelpers/WorkspaceTitleViewHelper.php:23, 61, 73** – `LanguageService` usage for translating workspace labels in the backend UI
- **Classes/EventListener/SystemInformationEventListener.php:28, 73, 101** – `LanguageService` usage for translating system information toolbar messages
- **Resources/Private/Language/*.xlf** – XLIFF translation files for backend module labels and messages

All instances of "language" or "Language" in the codebase refer exclusively to UI translation infrastructure (`LanguageService`, XLIFF), which fall outside the scope of database-level multilinguality.

---

## 6) Open Observations

None.
