# CLAUDE.md - EXT:adminpanel

## 1) Extension Profile

The adminpanel extension provides a frontend debugging and administrative interface for TYPO3. It displays real-time information about frontend requests to backend users, including SQL query logs, TypoScript debugging output, cache controls, and request/response diagnostics. The module enables preview features such as showing hidden pages and records, simulating dates, and testing frontend user group access without modifying actual session data.

---

## 2) Relation to Database-Level Multilinguality

**Rating: none**

**Justification:**
- The extension does not define database tables (no TCA definitions, no `ext_tables.sql`).
- No code reads, writes, or evaluates `sys_language_uid` or equivalent language identifier fields.
- QueryBuilder usage in `FrontendGroupsRepository` queries `fe_groups` without language constraints.
- Context aspect manipulation involves `VisibilityAspect`, `DateTimeAspect`, `UserAspect`, and `PreviewAspect`; no `LanguageAspect` interaction occurs.
- No language overlay logic, language-based filtering, or language value propagation exists.

---

## 3) Observed Code Hotspots (DB Language Logic)

None identified.

---

## 4) Structural Patterns

No database-language-related code patterns present in this extension.

---

## 5) Explicit Non-Relevant Areas

| Area | Location | Reason for Exclusion |
|------|----------|---------------------|
| UI label translations | All modules (`getLabel()` methods) | Uses `LLL:EXT:adminpanel/Resources/Private/Language/*.xlf` for XLIFF-based UI translations |
| Backend user language preference | View assignments (`languageKey`) | Passes `$this->getBackendUser()->user['lang']` to Fluid views for UI locale selection |
| LanguageService usage | `AbstractModule`, `AbstractSubModule` | Service used exclusively for translating UI strings via `sL()` |

---

## 6) Open Observations

None. The extension's scope is limited to frontend debugging and preview functionality with no observable database-level language handling structures.
