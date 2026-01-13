# Analysis – lowlevel

## 0. Scope Coverage

### Searched top-level directories
- `Classes/` (Command, ConfigurationModuleProvider, Controller, DependencyInjection, Event, Integrity, Localization, Service)
- `Configuration/` (Backend, JavaScriptModules, Services)
- `Tests/` (Functional, Unit)

### Productive files verified via direct read
- Classes/Controller/QuerySearchController.php (2773 lines)
- Classes/Integrity/DatabaseIntegrityCheck.php (284 lines)
- Classes/Command/MissingRelationsCommand.php (578 lines)
- Classes/Command/DeletedRecordsCommand.php (344 lines)
- Classes/Command/OrphanRecordsCommand.php (206 lines)

### Justification for excluded areas
- `Classes/ConfigurationModuleProvider/*` – Configuration inspection providers; no database queries on content tables
- `Classes/Localization/*` – XLIFF translation file handling; no database language fields
- `Classes/Command/TranslationDomain*.php` – XLIFF label commands; no database queries
- `Classes/Controller/RawSearchController.php` – Full-text search with no language field constraints
- `Classes/Controller/ConfigurationController.php` – Configuration UI; no database content queries

---

## 1. Determination of Language Fields

**No dynamic language field determination occurs in this extension.**

The extension does not:
- Read `$GLOBALS['TCA'][table]['ctrl']['languageField']`
- Access `transOrigPointerField` or `translationSource` TCA configuration
- Use schema capability APIs for language field discovery
- Invoke LanguageFieldCapability or similar services

Language field access is limited to:
- Hardcoded field name `sys_language_uid` in two locations (pages table only)
- No generalized language field handling for arbitrary tables

---

## 2. Language-Field Usage with Negative Values

**No occurrences found.**

### Search methodology
| Pattern | Matches | Relevance |
|---------|---------|-----------|
| `-1` in PHP files | 12 | All non-language contexts (see dismissals below) |
| `sys_language.*-1` | 0 | — |
| `languageField.*-1` | 0 | — |
| `< 0` comparisons | 7 | All non-language contexts |
| `l10n_parent`, `transOrigPointer` | 0 | — |

### Dismissed occurrences (not language-related)

**QuerySearchController.php:903, 909**
```php
case 'date':
    if ($fieldValue != -1) {
        $formatter = new DateFormatter();
```
Context: Date/time field value check. `-1` represents "no timestamp value set".
Dismissal: Date formatting logic, not language field comparison.

**QuerySearchController.php:1503, 1505**
```php
$first = -1;
for ($i = 32 * $compOffSet + $neg; $i < 32 * ($compOffSet + 1); $i += 2) {
    if ($first === -1) {
```
Context: Sentinel value in `verifyComparison()` algorithm for query operator validation.
Dismissal: Loop initialization pattern, not language value.

**QuerySearchController.php:558**
```php
if ($id < 0) {
    $id = abs($id);
}
```
Context: Page ID sanitization in `getTreeList()` method.
Dismissal: Page UID handling, not language field.

**DatabaseIntegrityCheck.php:141-144**
```php
// Remove preceding "-1," for non-versioned tables
if (!$schema->isWorkspaceAware()) {
    $pageIdsForTable = array_combine($pageIdsForTable, $pageIdsForTable);
    unset($pageIdsForTable[-1]);
}
```
Context: Page ID `-1` represents workspace offline versions (`pid = -1`).
Dismissal: Workspace versioning logic using `isWorkspaceAware()`, not language handling.

**MissingRelationsCommand.php:137, 314**
```php
// These records are offline versions having a pid=-1 and references should never occur directly to their uids.
```
Context: Comment documenting workspace offline version behavior.
Dismissal: Workspace versioning documentation, not language field.

---

## 3. Semantic Classification

**No findings to classify.**

All `-1` occurrences in the extension are categorically non-language-related:
- Date/time sentinel values
- Algorithm initialization patterns
- Workspace version page ID handling
- Page UID parameter sanitization

---

## 4. Parser Rule Derivations

**No extension-specific parser rules required.**

### General exclusion rules applicable

1. **Exclude date/time `-1` checks**
   - AST signature: `$fieldValue != -1` in switch cases with `'date'` or `'time'` labels
   - Context: DateFormatter instantiation follows
   - Exclusion: Date formatting context, not language field

2. **Exclude workspace pid = -1 handling**
   - AST signature: `unset($array[-1])` with prior `isWorkspaceAware()` check
   - Context: Page ID array manipulation
   - Exclusion: Workspace versioning, confirmed by schema capability check

3. **Exclude page ID sanitization**
   - AST signature: `if ($id < 0) { $id = abs($id); }`
   - Context: Page tree traversal methods
   - Exclusion: UID parameter handling, not content language field

---

## 5. Misclassification Risks

### False Positives

**Risk**: Classifying `pid = -1` workspace checks as language `-1` handling.

**Mitigation signals**:
- Accompanying `isWorkspaceAware()` schema capability check
- Comment explicitly mentions "offline versions" and "pid=-1"
- No `sys_language_uid` or language field access in surrounding code
- Located in orphan/lost record detection context

**Risk**: Classifying date/time `-1` sentinel as language value.

**Mitigation signals**:
- Occurs within `case 'date':` or `case 'time':` switch blocks
- Followed by `DateFormatter` instantiation
- Variable named `$fieldValue` in field formatting context, not language context

### False Negatives

**None identified.**

The extension's language field usage is limited to:
- Reading `sys_language_uid` from pages table (value `0` comparison only)
- No generalized language field handling
- No overlay or translation resolution logic

There are no ambiguous structures that could hide negative language identifier usage.

---

## 6. Tests and Fixtures (Isolated)

### Test occurrences

**QuerySearchControllerTest.php:73**
```php
$id = -1;
$depth = 0;
$subject = $this->getAccessibleMock(QuerySearchController::class, null, [], '', false);
$treeList = $subject->_call('getTreeList', $id, $depth);
self::assertEquals(1, $treeList);
```
Context: Tests page ID sanitization (negative ID converted to positive).
Classification: TEST (non-binding)
Note: Tests `abs()` behavior on page UID, not language handling.

**QuerySearchControllerTest.php:180**
```php
$treeList = $subject->_call('getTreeList', $id, $depth, -1);
```
Context: Tests `$begin` parameter with value `-1`.
Classification: TEST (non-binding)
Note: Page tree traversal depth parameter, not language value.

---

## Summary

The `lowlevel` extension has **zero occurrences** of negative language identifier usage in database language field contexts. All `-1` values found serve non-language purposes:

| Usage | Count | Purpose |
|-------|-------|---------|
| Date/time sentinel | 2 | "No value" marker for timestamps |
| Algorithm init | 2 | Loop sentinel in comparison validation |
| Workspace pid | 3 | Offline version page ID (-1) |
| Page UID sanitization | 1 | Negative ID correction |
| Test parameters | 3 | Page ID and depth testing |

No parser rules, semantic classifications, or data flow analyses are required for this extension in the context of negative language identifier detection.
