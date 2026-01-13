# Analysis – EXT:reactions

## 0. Scope Coverage

### Searched top-level directories

| Directory | Files Examined | Relevance |
|-----------|----------------|-----------|
| `Classes/` | 15 PHP files | Productive code – fully verified |
| `Configuration/` | 7 PHP files | TCA, services, routes – fully verified |
| `Tests/Functional/` | 3 PHP files, 3 CSV fixtures | Test code and fixtures – verified |
| `Documentation/` | 2 PHP example files | Documentation snippets – verified |
| `Resources/` | 2 XLIFF files, 2 Fluid templates | UI localization only – excluded |

### Productive files verified via direct read

- `Classes/Repository/ReactionRepository.php` – QueryBuilder usage, no language constraints
- `Classes/Reaction/CreateRecordReaction.php` – DataHandler delegation, no language handling
- `Classes/Model/ReactionInstruction.php` – Domain model, no language properties
- `Configuration/TCA/sys_reaction.php` – No `languageField` configuration
- `ext_tables.sql` – No `sys_language_uid` column

### Justification for excluded areas

- `Resources/Private/Language/*.xlf` – XLIFF files for UI label localization only
- `Resources/Private/Templates/` – Fluid templates for backend UI rendering
- `Documentation/` – RST files and example code for documentation purposes

---

## 1. Determination of Language Fields

### TCA `ctrl.languageField`

**Not configured.** The `sys_reaction` table TCA (`Configuration/TCA/sys_reaction.php`) defines no language-related control fields:

```php
'ctrl' => [
    'rootLevel' => 1,
    'adminOnly' => true,
    'hideTable' => true,
    // No 'languageField' key
    // No 'transOrigPointerField' key
    // No 'transOrigDiffSourceField' key
]
```

### Database schema

**No language column.** The `ext_tables.sql` defines only:

```sql
CREATE TABLE sys_reaction (
    impersonate_user int(11) unsigned DEFAULT '0' NOT NULL,
    storage_pid int(11) unsigned DEFAULT '0' NOT NULL,
    UNIQUE identifier_key (identifier),
    KEY index_source (reaction_type(5))
);
```

No `sys_language_uid` or equivalent column exists.

### Schema / capability APIs

Not utilized. The extension does not query `TcaSchemaFactory`, `TableSchemaInterface`, or any capability API for language field resolution.

### Mapper / metadata structures

Not applicable. `ReactionInstruction` model directly wraps database rows without language field extraction.

---

## 2. Language-Field Usage with Negative Values

**No occurrences found.**

Comprehensive search across all PHP files, TCA configurations, and test fixtures yielded:

- Zero instances of `-1` in language-related contexts
- Zero instances of `< 0` comparisons on language fields
- Zero instances of `IN (-1, …)` query patterns
- Zero references to `sys_language_uid` in productive code

The literal `-1` appears only in:
- `LICENSE.txt` – Address line (street number)
- `Resources/Private/Templates/*.fluid.html` – CSS class names (`my-1`, `me-2`)
- `Resources/Private/Language/*.xlf` – Date strings in XML attributes

None relate to database language fields.

---

## 3. Semantic Classification

**No findings to classify.**

The extension contains zero semantic uses of negative language identifiers in relation to database language fields.

---

## 4. Parser Rule Derivations

### Not applicable

No AST patterns for negative language identifier detection can be derived from this extension because:

1. The `sys_reaction` table has no language field
2. No code paths evaluate, compare, or propagate language values
3. No QueryBuilder constraints reference language columns

### Potential false signal patterns to exclude

If analyzing cross-extension code that interacts with EXT:reactions:

| Pattern | Context | Classification |
|---------|---------|----------------|
| `LanguageServiceFactory` injection | `ReactionHandler.php:44` | IRR – UI localization |
| `LanguageService::sL()` calls | Multiple files | IRR – XLIFF label resolution |
| `$GLOBALS['LANG']` assignment | `ReactionHandler.php:61` | IRR – Backend user preference |

---

## 5. Misclassification Risks

### False Positives

| Risk | Location | Mitigation |
|------|----------|------------|
| `LanguageServiceFactory` injection detected as language-handling | `Classes/Http/ReactionHandler.php:44` | Verify sink is `$GLOBALS['LANG']` assignment, not database query |
| `LanguageService` method calls detected | Multiple controller/form classes | Verify pattern is `sL('LLL:...')`, not field comparison |
| Numeric literals in unrelated contexts | CSS classes, street addresses | Verify context is database field comparison, not string/UI content |

### False Negatives

| Risk | Description |
|------|-------------|
| DataHandler passthrough | `CreateRecordReaction::react()` delegates to DataHandler without validating field values. If a webhook payload contains `sys_language_uid` and the field mapping includes it, the value passes through. This is external to the extension's logic but could transport language values. |
| Future TCA additions | If `sys_reaction` gains language support, this analysis would need revision. |

---

## 6. Tests and Fixtures (Isolated)

### CSV Fixtures

| File | Language Columns | Language Values |
|------|------------------|-----------------|
| `ReactionsRepositoryTest_reactions.csv` | None | N/A |
| `ReactionsRepositoryTest_pages.csv` | None | N/A |
| `be_users.csv` | None | N/A |

### Test Code

| File | Language Handling |
|------|-------------------|
| `CreateRecordReactionTest.php` | `LanguageServiceFactory` used for test setup (`$GLOBALS['LANG']` initialization) – UI localization only |
| `ReactionsRepositoryTest.php` | No language-related assertions |
| `ReactionRegistryTest.php` | Service registration testing only |

### Non-binding observations

- Test fixtures define no `sys_language_uid` column in any table structure
- No test case exercises language-specific record creation via `CreateRecordReaction`
- The absence of language testing is consistent with the table's root-level, non-translatable design
