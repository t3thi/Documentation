# indexed_search – Database-Level Multilinguality Analysis

## 1) Extension Profile

The indexed_search extension provides full-text search functionality for TYPO3. It indexes page content and external files (PDF, Word, HTML, plain text) into dedicated database tables (index_phash, index_fulltext, index_words, index_rel, index_section, index_grlist) and exposes a frontend search interface with filtering capabilities. The extension processes content during page rendering or via scheduled tasks, extracts words, and stores them with associated metadata for later retrieval.

---

## 2) Relation to Database-Level Multilinguality

**Rating: high**

The extension stores and evaluates numeric language identifiers at multiple points:

- The `index_phash` table contains a `sys_language_uid` field (ext_tables.sql:20).
- Language values are persisted during indexing for both TYPO3 pages and external files.
- Language values are read and compared during search operations to filter results by language.
- Language identifiers participate in phash calculation, affecting content grouping.
- The value -1 is explicitly recognized as "all languages" in search filtering logic.

---

## 3) Observed Code Hotspots (DB Language Logic)

### Indexing (write operations)

**Classes/Indexer.php**
- Line 976: `submitPage()` – stores `sys_language_uid` from configuration into index_phash during page indexing (value transport, persistence)
- Line 1108: `submitFilePage()` – stores `sys_language_uid` from configuration into index_phash during external file indexing (value transport, persistence)
- Line 1537: `setT3Hashes()` – includes `sys_lang` in hArray for phash_grouping calculation (schema derivation)

**Classes/EventListener/FrontendGenerationPageIndexingTrigger.php**
- Line 100: `indexPageContent()` – retrieves language ID from LanguageAspect and assigns to configuration as `sys_language_uid` (value transport)
- Lines 84–89: checks whether languageId differs from contentId to prevent indexing fallback content (comparison, overlay decision)

### Searching (read operations)

**Classes/Domain/Repository/IndexSearchRepository.php**
- Line 73: property `$languageUid` – holds numeric language identifier for search filtering
- Line 164: `initialize()` – receives `languageUid` from search data and stores in property (value transport)
- Lines 800–810: `languageWhere()` – constructs SQL WHERE clause filtering on `IP.sys_language_uid`; returns empty string if languageUid < 0 (query filter)
- Lines 527, 904: `prepareFinalQuery_fulltext()`, `prepareFinalQuery()` – apply languageWhere() to QueryBuilder (query filter)

**Classes/Controller/SearchController.php**
- Line 124: `initialize()` – retrieves current language ID from Context and assigns to `searchData['languageUid']` (value transport)

### Administration (read operations)

**Classes/Domain/Repository/AdministrationRepository.php**
- Lines 137, 309, 548, 583: multiple methods (`getExternalDocumentsStatistic()`, `getPageStatistic()`, `getPhashRowsForPageId()`) – include `sys_language_uid` in GROUP BY clauses when reading from index_phash (query filter, schema derivation)

---

## 4) Structural Patterns

- **Numeric language value comparisons**: The value -1 is treated as a special sentinel meaning "all languages" (IndexSearchRepository.php:802). Language filtering is bypassed when languageUid < 0.
- **Language field persistence**: Both `submitPage()` and `submitFilePage()` store `sys_language_uid` directly from a configuration array into the index_phash table.
- **Language value propagation**: Language identifiers flow from the Context/LanguageAspect → SearchController → IndexSearchRepository → QueryBuilder WHERE clauses. During indexing, they flow from LanguageAspect → FrontendGenerationPageIndexingTrigger → Indexer configuration → database insert.
- **QueryBuilder constraints**: Language constraints are constructed via dedicated helper methods (`languageWhere()`) and merged into the main query via `QueryHelper::stripLogicalOperatorPrefix()`.
- **phash calculation inclusion**: The language value (`sys_lang`) is serialized into the hash array for `phash_grouping`, meaning different language versions of the same page receive distinct phash_grouping values.

---

## 5) Explicit Non-Relevant Areas

- **TCA configuration** (Configuration/TCA/index_config.php): Defines form fields for indexing configuration records; no database-level language filtering logic.
- **ViewHelpers** (Classes/ViewHelpers/): Render output for display; do not read or filter on sys_language_uid.
- **Type enums** (Classes/Type/): Define value objects for search type, media type, section type, etc.; no language field handling.
- **DTO classes** (Classes/Dto/): Transfer objects for indexing data payloads; do not contain language identifiers.
- **FileContentParser, Lexer, Utility classes**: Process file contents and text; no interaction with sys_language_uid.

---

## 6) Open Observations

- **Fallback content detection** (FrontendGenerationPageIndexingTrigger.php:84–89): The code checks whether `languageId !== contentId` to prevent indexing fallback content. The exact role of this check in relation to language overlays and content fallback chains cannot be conclusively determined from local context.
- **-1 sentinel behavior**: The comment "// -1 is the same as ALL language." (IndexSearchRepository.php:802) and the conditional `if ($this->languageUid < 0)` indicate that negative values disable language filtering. Whether 0 or other negative values have distinct semantics is not documented here.
- **phash vs. phash_grouping**: The `setT3Hashes()` method includes `sys_lang` in the phash_grouping calculation but not in the phash itself (which additionally includes `gr_list`). The functional distinction—whether phash_grouping is used for deduplication across languages—is observable but not conclusively explained by the code structure alone.
- **Language value for external files**: `submitFilePage()` stores `sys_language_uid` from the same configuration array as TYPO3 pages. Whether external files inherit the page's language or have independent language assignment logic is not evident from this code.
