# CLAUDE.md – sys_note Extension

## 1) Extension Profile

The sys_note extension provides backend functionality for creating and managing internal notes attached to pages in the TYPO3 page tree. Notes can be categorized, marked as personal (visible only to the creator) or shared, and positioned at the top or bottom of backend module views. The extension integrates with the Page Module, Records Module, Info Module, and Dashboard via event listeners and widgets.

---

## 2) Relation to Database-Level Multilinguality

**Rating: none**

**Justification:**
- The `sys_note` TCA configuration contains no language-related control fields (`sys_language_uid`, `l10n_parent`, `l10n_source`, `transOrigPointerField`, `translationSource`)
- The database schema (`ext_tables.sql`) defines no language columns
- `SysNoteRepository` query methods contain no language field constraints or filtering
- No overlay logic or language-dependent record fetching exists in the codebase
- No numeric language identifier comparisons or assignments appear in any class

---

## 3) Observed Code Hotspots (DB Language Logic)

None identified.

The extension contains no code locations where database-level language information is read, compared, propagated, or derived.

---

## 4) Structural Patterns

None applicable.

No database-language-related code patterns are present in this extension:
- No numeric language value comparisons
- No QueryBuilder constraints on language fields
- No language values in domain objects or DTOs
- No language field name derivation via TCA or schema APIs
- No propagation of language values through services

---

## 5) Explicit Non-Relevant Areas

| Area | Reason for Exclusion |
|------|---------------------|
| `NoteRenderer` | Renders backend UI elements; no database language fields involved |
| `ButtonBarProvider` | Creates UI buttons; no language-related record handling |
| `PageModuleProvider`, `RecordListProvider`, `InfoModuleProvider` | Event listeners for module display; no language filtering logic |
| `PagesWithInternalNote` widget | Dashboard rendering; queries notes without language constraints |
| `SysNoteDashboardWidgetDatabaseMigration` | Operates on `be_dashboards` table for widget configuration migration; unrelated to content language |

---

## 6) Open Observations

None.

No language-related structures of indeterminate role were identified in this extension.
