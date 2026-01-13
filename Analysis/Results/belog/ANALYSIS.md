# Analysis – EXT:belog

## 0. Scope Coverage

### Searched top-level directories
- `Classes/` (all PHP files read)
- `Configuration/` (all configuration files checked)
- `Resources/Private/` (Fluid templates and language files)
- `Tests/Unit/` (all test files examined)

### Productive files verified via direct read
- `Classes/Domain/Model/Constraint.php`
- `Classes/Domain/Model/LogEntry.php`
- `Classes/Domain/Repository/LogEntryRepository.php`
- `Classes/Controller/BackendLogController.php`
- `Classes/EventListener/SystemInformationEventListener.php`
- `Classes/ViewHelpers/*.php` (all ViewHelpers)
- `Resources/Private/Partials/Content/Filter.fluid.html`

### Justification for excluded areas
- `Resources/Public/` – Contains only JavaScript and icon assets; no database logic
- `Resources/Private/Templates/` and `Resources/Private/Partials/` (except Filter.fluid.html) – Display logic only; no negative value usage beyond the examined filter form
- `Resources/Private/Language/*.xlf` – Translation files (XLIFF); explicitly out of scope per global conventions
- No TCA configuration exists in this extension; `sys_log` table TCA is managed by EXT:core

---

## 1. Determination of Language Fields

**Not applicable.**

The `sys_log` table does not define or utilize database-level language fields. The extension operates exclusively on a non-translatable logging table with no `sys_language_uid`, `l10n_parent`, or equivalent columns.

No mechanisms for language field derivation (TCA `ctrl.languageField`, schema APIs, capability inspection) are present in the extension codebase.

---

## 2. Language-Field Usage with Negative Values

**None found.**

All negative numeric literals identified in the codebase serve non-language purposes:
- User/group filtering (`-1` = current user)
- Workspace filtering (`-99` = all workspaces)
- Error level filtering (array containing `-1` for log severity)
- PID grouping (`-1` = flat list indicator)

---

## 3. Semantic Classification

### Finding 1: User filter "self" value
**File:** `Resources/Private/Partials/Content/Filter.fluid.html:20`
**Code:** `<f:form.select.option value="-1">{f:translate(key:'self')}</f:form.select.option>`
**Category:** IRR
**Justification:** Form select option value for filtering logs by current backend user; no relation to database language fields.

---

### Finding 2: User filter constraint handling
**File:** `Classes/Domain/Repository/LogEntryRepository.php:159`
**Code:** `} elseif ($userOrGroup === '-1') {`
**Comparison type:** String equality (`===`)
**Data flow:**
- SOURCE: `Resources/Private/Partials/Content/Filter.fluid.html:20` (form value)
- TRANSFORMATION: `Classes/Domain/Model/Constraint::$userOrGroup` (string property)
- SINK: `Classes/Domain/Repository/LogEntryRepository.php:160` (query constraint: current user UID from `$GLOBALS['BE_USER']`)

**Category:** IRR
**Justification:** User filtering logic; the negative value represents "current user" semantic, not a language identifier.

---

### Finding 3: Empty user group constraint
**File:** `Classes/Domain/Repository/LogEntryRepository.php:155`
**Code:** `$queryConstraints[] = $query->expr()->eq('userid', $query->createNamedParameter(-1, Connection::PARAM_INT));`
**Comparison type:** Database equality (`=`)
**Data flow:**
- SOURCE: Group member resolution (line 148)
- TRANSFORMATION: Fallback when group has no members
- SINK: Query constraint on `sys_log.userid = -1` (intentional no-match condition)

**Category:** IRR
**Justification:** Sentinel value to produce empty result set when filtering by user group with no members; operates on `userid` field, not language fields.

---

### Finding 4: Error level filtering
**File:** `Classes/EventListener/SystemInformationEventListener.php:60`
**Code:** `$queryBuilder->createNamedParameter([-1, 1, 2], Connection::PARAM_INT_ARRAY)`
**Comparison type:** Array membership (`IN`)
**Data flow:**
- SOURCE: Hardcoded error level array
- SINK: Query constraint on `sys_log.error IN (-1, 1, 2)`

**Category:** IRR
**Justification:** Error severity level filtering on `sys_log.error` field; no relation to language identifiers.

---

### Finding 5: PID grouping indicator
**File:** `Classes/Controller/BackendLogController.php:215`
**Code:** `$pid = -1;`
**Category:** IRR
**Justification:** Array key for grouping log entries in flat list structure; internal rendering logic, not database query parameter.

---

### Finding 6: Workspace filter "any" value
**File:** `Classes/Domain/Model/Constraint.php:41`
**Code:** `protected int $workspaceUid = -99;`
**Comparison type:** Inequality (`!==`) at `Classes/Domain/Repository/LogEntryRepository.php:87`
**Data flow:**
- SOURCE: Default constraint value or form selection
- SINK: Conditional query constraint application (when not `-99`, add workspace filter)

**Category:** IRR
**Justification:** Workspace filtering sentinel; `-99` means "show all workspaces" (no workspace constraint added to query); operates on `sys_log.workspace` field, not language fields.

---

## 4. Parser Rule Derivations

**Not applicable.**

No language-field-related negative value usage exists in this extension. Parser rules for detecting semantic language identifier patterns cannot be derived from this codebase.

---

## 5. Misclassification Risks

### False Positives
- **User filter `-1` constant:** Pattern-based detection of `-1` in query constraints may incorrectly flag `Classes/Domain/Repository/LogEntryRepository.php:155,159` as language-related.
  **Mitigation:** Verify target field name is not a language field (here: `userid`, not `sys_language_uid` or equivalent).

- **Workspace sentinel `-99`:** Uncommon negative value in conditional logic may trigger investigation.
  **Mitigation:** Confirm field context (`workspace`, not language).

### False Negatives
**None applicable.**

This extension contains no language field handling, so no language-related patterns can be missed.

---

## 6. Tests and Fixtures (Isolated)

### Test File 1: `Tests/Unit/Domain/Model/ConstraintTest.php`
**Observations:** Tests only date/time constraint setters; no negative value usage, no language field interaction.
**Binding status:** Non-binding; no productive equivalents.

---

### Test File 2: `Tests/Unit/Domain/Model/LogEntryTest.php`
**Observations:** Tests log data serialization and error icon class mapping; no negative values used in language context.
**Binding status:** Non-binding; no productive equivalents.

---

## Summary

The belog extension contains **zero semantic uses of negative language identifiers**. All negative numeric literals (`-1`, `-99`) serve non-language purposes (user filtering, workspace filtering, error levels, display grouping). The `sys_log` table is non-translatable and contains no language fields.

All findings are classified as **IRR** (irrelevant for productive language logic).
