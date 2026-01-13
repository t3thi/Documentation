# CLAUDE.md – webhooks

## 1) Extension Profile

The webhooks extension provides outgoing HTTP webhook functionality for TYPO3. It dispatches configurable HTTP requests to external endpoints when specific internal events occur (file operations, page modifications, login failures, MFA verification failures). Webhook configurations are stored in the `sys_webhook` database table and managed through a backend module. The extension uses PSR-14 events and Symfony Messenger for asynchronous message handling, with HMAC-SHA256 signature verification for secure payload delivery.

---

## 2) Relation to Database-Level Multilinguality

**Rating: none**

**Justification:**
- The `sys_webhook` TCA configuration contains no `sys_language_uid` field
- No `l10n_parent` or `l10n_source` fields are defined
- No `languageField` configuration in TCA ctrl section
- The table is configured as `rootLevel = 1` (global, not page-bound)
- `WebhookRepository` applies no language-based query restrictions
- No numeric language value comparisons or language field filtering in any repository or service class
- No language overlay logic or translation chain handling exists

---

## 3) Observed Code Hotspots (DB Language Logic)

None identified.

The extension contains no code locations where database-level language information is read, compared, propagated, or derived.

---

## 4) Structural Patterns

None identified.

No database-language-related code patterns exist in this extension. The `WebhookRepository` explicitly removes all default restrictions except `DeletedRestriction` (line 176-178), with no language-specific restriction handling.

---

## 5) Explicit Non-Relevant Areas

| Area | File | Reason for Exclusion |
|------|------|---------------------|
| XLIFF language labels | `Resources/Private/Language/*.xlf` | UI translation files, not database-level language handling |
| LLL: references in TCA | `Configuration/TCA/sys_webhook.php` | Label localization, not record-level language data |
| Site identifier in messages | `Classes/Message/PageModificationMessage.php` | Site context identification, not language field handling |

---

## 6) Open Observations

None identified.

All language-related structures in this extension are conclusively UI/label translations with no ambiguity regarding database-level multilingual processing.
