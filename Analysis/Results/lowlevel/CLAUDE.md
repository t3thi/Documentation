# CLAUDE.md – lowlevel

## 1) Extension Profile

The `lowlevel` extension provides technical analysis and maintenance tools for TYPO3 database integrity. It offers backend modules for advanced query building, raw database search, and configuration inspection. CLI commands handle cleanup operations including removal of deleted records, orphan detection, broken reference repair, and FlexForm field sanitization. The extension operates at the database structure level rather than content delivery level.

---

## 2) Relation to Database-Level Multilinguality

**Rating: low**

**Justification:**
- The extension reads `sys_language_uid` in two locations to segregate or filter pages by language
- Numeric comparison against value `0` is performed to identify default language records
- No language overlay logic, no `l10n_parent` resolution, no `languageField` TCA access
- Language fields are used solely for page tree partitioning, not for multilingual content processing
- The extension does not persist, derive, or propagate language values beyond simple filtering

---

## 3) Observed Code Hotspots (DB Language Logic)

| File | Class / Method | Type of Interaction |
|------|----------------|---------------------|
| `Classes/Integrity/DatabaseIntegrityCheck.php` | `genTree()` | Query select: reads `sys_language_uid` field |
| `Classes/Integrity/DatabaseIntegrityCheck.php` | `genTree()` (line 102-106) | Value comparison: `$row['sys_language_uid'] === 0` |
| `Classes/Integrity/DatabaseIntegrityCheck.php` | `getPageTranslatedPageIDArray()` | Value transport: returns non-default-language pages |
| `Classes/Controller/QuerySearchController.php` | `getTreeList()` (line 573) | Query filter: `->expr()->eq('sys_language_uid', 0)` |

---

## 4) Structural Patterns

**Numeric language value comparison:**
- Comparison against integer `0` to identify default language records
- Strict equality check (`=== 0`) in PHP code
- QueryBuilder expression (`->expr()->eq('sys_language_uid', 0)`) in SQL constraints

**Page segregation by language value:**
- Default language pages (`sys_language_uid = 0`) stored in `$pageIdArray`
- Translated pages (`sys_language_uid != 0`) stored in `$pageTranslatedPageIDArray`
- Segregation occurs during page tree traversal, not during content retrieval

**Query filtering pattern:**
- Page tree queries constrained to default language only
- Purpose: avoid including translated page versions in hierarchical listings

---

## 5) Explicit Non-Relevant Areas

| Area | Reason for Exclusion |
|------|----------------------|
| `Classes/Command/TranslationDomainListCommand.php` | Operates on XLIFF translation files, not database language fields |
| `Classes/Command/TranslationDomainSearchCommand.php` | Searches XLIFF label content, not database records |
| `Classes/Localization/LabelFinder.php` | Searches translation labels in XLIFF resources |
| `Classes/Localization/Dto/LabelSearchResult.php` | DTO for XLIFF search results |
| `Classes/Localization/Dto/DomainSearchResult.php` | DTO for translation domain search results |
| `Classes/ConfigurationModuleProvider/*` | Configuration inspection providers with no language field access |
| `t3ver_oid`, `t3ver_wsid`, `pid = -1` checks | Workspace/versioning logic, not language handling |

---

## 6) Open Observations

- `DatabaseIntegrityCheck::genTree()` segregates pages into two arrays by language value but the translated page array (`$pageTranslatedPageIDArray`) is only accessible via a getter method; consumer usage cannot be determined from local context
- `QuerySearchController::getTreeList()` filters to `sys_language_uid = 0` unconditionally; whether this filtering should apply in all query contexts is not determinable locally
- The extension does not access TCA schema capabilities for language fields (`languageField`, `transOrigPointerField`); whether this omission is intentional design or a gap cannot be determined from the code alone
