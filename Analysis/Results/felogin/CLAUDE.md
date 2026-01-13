# CLAUDE.md — EXT:felogin

## 1) Extension Profile

The felogin extension provides frontend user authentication functionality for TYPO3. It manages login and logout flows for website users (fe_users), password recovery mechanisms, and post-authentication redirects. The extension operates as a frontend plugin that handles user session establishment, credential validation delegation, and configurable redirect behavior based on user properties, group membership, or referrer context.

---

## 2) Relation to Database‑Level Multilinguality

**Rating:** none

**Justification:**

The extension performs database operations exclusively on the `fe_users` and `fe_groups` tables. All queries in `FrontendUserRepository` and `FrontendUserGroupRepository` select, update, or filter records based on non-language criteria: user identifiers (uid, username, email), password recovery hashes (felogin_forgotHash), redirect page identifiers (felogin_redirectPid), and page storage constraints (pid). No queries reference, filter, or evaluate language-related fields such as `sys_language_uid`. The TCA overrides in `Configuration/TCA/Overrides/` add only extension-specific fields (felogin_redirectPid, felogin_forgotHash) without language-aware configuration. The fe_users and fe_groups tables themselves are not subject to TYPO3's content translation/overlay system in the context of this extension's operations.

---

## 3) Observed Code Hotspots (DB Language Logic)

None.

---

## 4) Structural Patterns

Not applicable. No database‑language‑related code patterns are present.

---

## 5) Explicit Non‑Relevant Areas

- **Resources/Private/Language/locallang.xlf**: UI label translations for frontend forms and flash messages (XLIFF)
- **Resources/Private/Language/Database.xlf**: Backend TCA label translations (XLIFF)
- **Configuration/Sets/Felogin/labels.xlf**: Configuration set label translations (XLIFF)
- **Configuration/FlexForms/Login.xml**: Plugin configuration FlexForm referencing label files via LLL: syntax

All language references in the codebase pertain to user interface localization (label translation) and not to database-level multilingual record handling.

---

## 6) Open Observations

None. The extension's database interaction scope is fully determinable from local context: it queries fe_users and fe_groups for authentication and redirect purposes without language dimension.
