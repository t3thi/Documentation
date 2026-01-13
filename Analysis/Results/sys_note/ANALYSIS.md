# Analysis – sys_note

## 0. Scope Coverage

### Searched Top-Level Directories
- `Classes/` — all PHP classes (Domain, Migration, Persistence, Provider, Renderer, Widgets)
- `Configuration/` — TCA, Services, Backend configuration
- `Tests/` — Functional tests and fixtures
- `Resources/` — Templates and language files (excluded from analysis scope)

### Productive Files Verified via Direct Read
| File | Status |
|------|--------|
| `Classes/Domain/Repository/SysNoteRepository.php` | Verified |
| `Classes/Migration/SysNoteDashboardWidgetDatabaseMigration.php` | Verified |
| `Classes/Persistence/NoteCreationEnricher.php` | Verified |
| `Classes/Provider/ButtonBarProvider.php` | Verified |
| `Classes/Provider/InfoModuleProvider.php` | Verified |
| `Classes/Provider/PageModuleProvider.php` | Verified |
| `Classes/Provider/RecordListProvider.php` | Verified |
| `Classes/Renderer/NoteRenderer.php` | Verified |
| `Classes/Widgets/PagesWithInternalNote.php` | Verified |
| `Configuration/TCA/sys_note.php` | Verified |
| `Configuration/TCA/Overrides/sys_reaction.php` | Verified |
| `ext_tables.sql` | Verified |

### Justification for Excluded Areas
- `Resources/Private/Language/` — XLIFF UI translations (out of scope)
- `Resources/Private/Templates/` — Fluid templates with no database language logic
- `Resources/Public/JavaScript/` — Client-side code (out of scope)
- `Configuration/Services.yaml`, `Configuration/Services.php` — DI wiring only

---

## 1. Determination of Language Fields

**Result: No language fields exist for the `sys_note` table.**

### TCA Analysis (`Configuration/TCA/sys_note.php`)

The `ctrl` section contains no language-related keys:
- No `languageField`
- No `transOrigPointerField`
- No `translationSource`
- No `transOrigDiffSourceField`

### Column Definition Analysis

Defined columns: `category`, `subject`, `message`, `personal`, `position`, `cruser`

None of these are language fields. No column is named or aliased to `sys_language_uid`, `l10n_parent`, or `l10n_source`.

### Database Schema Analysis (`ext_tables.sql`)

```sql
CREATE TABLE sys_note (
  cruser int(11) unsigned DEFAULT 0 NOT NULL,
);
```

Only `cruser` is explicitly defined. No language columns exist.

### Schema/Capability API Usage

`ButtonBarProvider` uses `TcaSchemaFactory` and `TcaSchemaCapability` for checking:
- `AccessReadOnly`
- `HideInUi`
- `AccessAdminOnly`

No language-related capabilities are queried.

---

## 2. Language-Field Usage with Negative Values

**None found.**

Systematic grep search for patterns:
- `-1` in numeric context
- `< 0` comparisons
- `<= -1` comparisons
- `sys_language_uid`
- `l10n_parent`
- `languageField`

All results were either:
- XLIFF date metadata (e.g., `date="2011-10-17..."`)
- LICENSE.txt address lines
- Documentation references in CLAUDE.md

No productive PHP code contains negative language identifier usage.

---

## 3. Semantic Classification

**Not applicable.**

No occurrences of negative language identifiers exist in productive or test code.

---

## 4. Parser Rule Derivations

**Not applicable.**

No language-related code patterns exist that would require parser rules.

For reference, if language fields were present, the following AST signatures would be monitored:

| Rule Type | Expected AST Signature |
|-----------|----------------------|
| Equality comparison | `BinaryOp\Identical` or `BinaryOp\Equal` with `-1` literal |
| Less-than comparison | `BinaryOp\Smaller` with `0` literal |
| IN clause | `Expr\FuncCall` to `->expr()->in()` with array containing `-1` |
| QueryBuilder constraint | `MethodCall` on `expr()` with language field name |

None of these patterns are present in this extension.

---

## 5. Misclassification Risks

### False Positives

| Risk | Description |
|------|-------------|
| Category field | `category` column uses integers 0-4 but represents note types, not languages |
| Position field | `position` column uses 0/1 but represents top/bottom placement |
| Constants `SYS_NOTE_POSITION_BOTTOM = 0` / `SYS_NOTE_POSITION_TOP = 1` | Numeric constants unrelated to language |

### False Negatives

| Risk | Description |
|------|-------------|
| External language resolution | If core overlay services are invoked externally for `sys_note`, this extension would not detect it (but TCA configuration prevents this) |
| Future TCA changes | If `sys_note` gains language fields in future versions, this analysis becomes outdated |

---

## 6. Tests and Fixtures (Isolated)

### Test File
`Tests/Functional/Repository/SysNoteRepositoryTest.php`

### Fixture Files
- `Tests/Functional/Fixtures/sys_notes.csv`
- `Tests/Functional/Fixtures/be_users.csv`

### Fixture Column Structure (`sys_notes.csv`)
```
uid, sorting, pid, tstamp, subject, personal, deleted, cruser, message, category, position
```

**Observation:** No language-related columns (`sys_language_uid`, `l10n_parent`, `l10n_source`) appear in test fixtures.

### Test Data Values

All test records use:
- `category`: 0, 1, 2
- `position`: 0, 1, 2
- `personal`: 0, 1
- `deleted`: 0, 1
- `cruser`: 1, 2, 3

No negative values appear in any context. No language field testing exists.

### Equivalence to Productive Code

Test fixtures accurately reflect the absence of language fields in the productive schema. The test data is consistent with the non-translatable design of the `sys_note` table.
