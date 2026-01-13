# Analysis – filemetadata

## 0. Scope Coverage

### Searched top‑level directories

```
.
├── Configuration/
│   └── TCA/
│       └── Overrides/
├── Resources/
│   ├── Private/
│   │   └── Language/
│   └── Public/
│       └── Icons/
├── composer.json
├── ext_emconf.php
├── ext_tables.sql
├── LICENSE.txt
└── README.rst
```

### Productive files verified via direct read

- `Configuration/TCA/Overrides/sys_file_metadata.php` (476 lines)
- `ext_emconf.php` (19 lines)
- `ext_tables.sql` (11 lines)
- `composer.json` (49 lines)

Total PHP files: 2 (both read completely)
Total SQL files: 1 (read completely)

### Justification for excluded areas

- `Resources/Private/Language/db.xlf`: UI label translations, excluded per global scope rules
- `Resources/Public/Icons/`: Binary image file
- `LICENSE.txt`: License text containing unrelated numeric patterns (street addresses)
- `README.rst`: Documentation text
- `composer.json`: Package metadata

**No test directories or fixture files exist in this extension.**

---

## 1. Determination of Language Fields

The extension does not determine or reference database language field names.

Observable structures:
- No TCA ctrl property definitions related to language fields (no `languageField`, `transOrigPointerField`, `transOrigDiffSourceField`)
- No queries, repositories, or data access logic
- No schema or capability API usage
- No mapper or metadata structures

The extension provides only TCA column configuration overrides merged into an existing base table definition. Language field determination occurs in the base `sys_file_metadata` table definition located outside this extension's scope.

---

## 2. Language‑Field Usage with Negative Values

**No occurrences found.**

Search methodology:
- Pattern `-1` in all files: 0 matches in productive code
- Pattern `< 0` or `<= 0`: 0 matches
- Pattern `sys_language_uid`: 0 matches
- Pattern `languageField`: 0 matches
- Pattern `l10n_parent`: 0 matches
- Pattern `transOrigPointerField`: 0 matches
- Pattern `LanguageAll|ALL`: 0 matches (case-insensitive)

---

## 3. Semantic Classification

**No occurrences to classify.**

---

## 4. Parser Rule Derivations

**No parser rules required.**

The extension contains no code that:
- Compares language field values
- Filters records by language criteria
- Assigns numeric language identifiers
- Evaluates negative language values

---

## 5. Misclassification Risks

### False Positives

**Extension-specific risks: None identified.**

The extension contains no numeric comparisons, no query construction, and no conditional logic that could trigger false positive matches for language-related negative value patterns.

### False Negatives

**Extension-specific risks: None identified.**

The extension contains:
- No indirect language value references (e.g., through constants, method calls, or configuration arrays)
- No dynamic query construction where negative values could be interpolated
- No language field name derivation that could obscure language-related comparisons

**Rationale for completeness:**
The extension's sole productive code is declarative TCA configuration. Language-related logic is limited to:
1. TCA `l10n_mode` string directives (`'prefixLangTitle'`, `'exclude'`)
2. TCA `l10n_display` string directives (`'defaultAsReadonly'`, `''`)
3. TCA `allowLanguageSynchronization` boolean flag (`true`)

None of these structures can contain or evaluate numeric language identifiers.

---

## 6. Tests and Fixtures (Isolated)

**No test files or fixtures exist in this extension.**

Verified absence via:
- Directory structure scan: No `Tests/`, `tests/`, `Fixtures/`, or `fixtures/` directories
- File pattern search: No `*Test.php` or `*test.php` files
- Extension structure: Configuration-only extension with no business logic to test
