# TYPO3 Core Extension: SEO - Database-Level Language Analysis

## 1) Extension Profile

The SEO extension provides search engine optimization features for TYPO3, including XML sitemap generation for pages and records, canonical URL management, HrefLang tag generation for multilingual sites, and Open Graph/Twitter Card meta tag rendering. It extends the pages table with SEO-specific fields and provides backend widgets for SEO analysis. The extension integrates with TYPO3's content rendering pipeline to inject meta tags and structured data into the frontend output.

## 2) Relation to Database-Level Multilinguality

**Rating:** high

**Justification:**

- `RecordsXmlSitemapDataProvider` explicitly queries language-aware tables with numeric language constraints, including the special value `-1` for "all languages" records (Classes/XmlSitemap/RecordsXmlSitemapDataProvider.php:78-84)
- `PagesXmlSitemapDataProvider` applies PageRepository language overlays and filters pages based on language suitability (Classes/XmlSitemap/PagesXmlSitemapDataProvider.php:46-50)
- `HrefLangGenerator` retrieves translated page records via PageRepository with custom LanguageAspect contexts and evaluates pseudo-fields (`_LOCALIZED_UID`) to determine overlay success (Classes/HrefLang/HrefLangGenerator.php:105-119)
- `PagesWithoutDescriptionDataProvider` directly reads `sys_language_uid` and `l10n_parent` fields from query results to generate language-specific URLs and validate language configuration (Classes/Widgets/Provider/PagesWithoutDescriptionDataProvider.php:56-65, 87)
- Multiple classes retrieve numeric language identifiers from Context API's language aspect for filtering and overlay operations

## 3) Observed Code Hotspots (DB Language Logic)

### Classes/XmlSitemap/RecordsXmlSitemapDataProvider.php
- **Line 75:** `$schema->isLanguageAware()` - Query condition branch based on language-awareness capability
- **Lines 76-77:** Retrieval of LanguageAwareSchemaCapability and language field name from TCA schema
- **Lines 78-84:** QueryBuilder constraint with `IN` expression for language field, values: `-1` and current language ID
- **Lines 180-184:** `getLanguageId()` method - Language ID retrieval from Context API

**Type:** Query filter with explicit language field constraint; special value `-1` handling

### Classes/XmlSitemap/PagesXmlSitemapDataProvider.php
- **Line 46:** `$pageRepository->getPagesOverlay($this->getPages())` - Language overlay application to page result set
- **Line 47:** `$this->getCurrentLanguageAspect()` - Language context retrieval
- **Line 49:** `$pageRepository->isPageSuitableForLanguage($page, $languageAspect)` - Language suitability filter
- **Lines 103-105:** `getCurrentLanguageAspect()` method - LanguageAspect retrieval from Context

**Type:** Overlay decision; language suitability filtering via PageRepository

### Classes/HrefLang/HrefLangGenerator.php
- **Line 64:** `($pageRecord['_TRANSLATION_SOURCE'] ?? null)?->toArray(true) ?? $pageRecord` - Pseudo-field access for translation source
- **Line 65:** `$language['languageId'] === ($pageRecord['_REQUESTED_OVERLAY_LANGUAGE'] ?? false)` - Pseudo-field comparison for requested overlay language
- **Line 69:** `$this->getTranslatedPageRecord($pageId, $language['languageId'], $site)` - Translated page retrieval
- **Lines 107-108:** Creation of target LanguageAspect from SiteLanguage
- **Lines 110-111:** Context cloning and language aspect injection
- **Lines 113-114:** PageRepository::getPage() call with custom language context
- **Line 116:** `!isset($pageRecord['_LOCALIZED_UID'])` - Overlay success detection via pseudo-field

**Type:** Pseudo-field evaluation; language context manipulation; overlay success detection

### Classes/Widgets/Provider/PagesWithoutDescriptionDataProvider.php
- **Line 56:** `$row['l10n_parent'] ?: $row['uid']` - Localization parent field access for page ID derivation
- **Line 60:** `$site->getLanguageById($row['sys_language_uid'])` - Language validation via sys_language_uid value
- **Line 65:** `['_language' => $row['sys_language_uid']]` - Language value transport to URL generation
- **Line 87:** Query selects `sys_language_uid`, `l10n_parent` fields explicitly

**Type:** Direct language field access; language value transport; query field selection

### Classes/Canonical/CanonicalGenerator.php
- **Line 117:** `$pageRepository->getPage($contentPid, true)` - PageRepository call (respects language context implicitly)

**Type:** Implicit language overlay via PageRepository

## 4) Structural Patterns

### Pattern 1: Explicit Language Field Query with Special Value `-1`
`RecordsXmlSitemapDataProvider` uses TCA schema capabilities to determine language-awareness and constructs QueryBuilder constraints with numeric language values. The query explicitly includes `-1` (representing "all languages") alongside the current language ID in an `IN` expression (line 78-84). The language field name is derived from `LanguageAwareSchemaCapability` rather than hardcoded.

### Pattern 2: PageRepository Overlay with LanguageAspect Filtering
`PagesXmlSitemapDataProvider` applies PageRepository's overlay mechanism to a collection of pages, then filters the overlaid results using `isPageSuitableForLanguage()` with the current LanguageAspect (lines 46-50). The overlay operation occurs before suitability filtering. The LanguageAspect is retrieved from Context API (line 47).

### Pattern 3: Pseudo-Field Evaluation for Overlay Detection
`HrefLangGenerator` accesses pseudo-fields added by PageRepository during overlay operations: `_TRANSLATION_SOURCE` (reference to source record), `_REQUESTED_OVERLAY_LANGUAGE` (requested language ID), and `_LOCALIZED_UID` (localized record UID). The presence/absence of `_LOCALIZED_UID` determines whether an overlay was successfully applied (line 116). These fields are not stored in the database but added to result arrays by PageRepository.

### Pattern 4: Context Cloning for Multi-Language Traversal
`HrefLangGenerator` clones the global Context object, injects a custom LanguageAspect for the target language, and passes this modified context to PageRepository instantiation (lines 110-113). This allows retrieval of page records in arbitrary languages without affecting the global language state.

### Pattern 5: Direct sys_language_uid Field Access
`PagesWithoutDescriptionDataProvider` explicitly selects `sys_language_uid` and `l10n_parent` in its query (line 87) and reads these values directly from result rows (lines 56, 60, 65). The query does not filter by language; all language versions are considered as independent candidates. The `sys_language_uid` value is propagated to site language validation and URL generation.

### Pattern 6: Language ID Retrieval via Context API
All classes retrieve the current language ID using `Context->getPropertyFromAspect('language', 'id')` or by accessing the LanguageAspect directly. This pattern appears in `RecordsXmlSitemapDataProvider::getLanguageId()` (line 182) and `PagesXmlSitemapDataProvider::getCurrentLanguageAspect()` (line 104).

## 5) Explicit Non-Relevant Areas

### TCA Language Mode Declarations
File `Configuration/TCA/Overrides/pages.php` contains `l10n_mode` and `allowLanguageSynchronization` settings for SEO fields (lines 66, 77, 93, 164, 175, 190, 201, 212, 227). These declarations define translation behavior but are not runtime database-level language logic.

### Site Configuration Language Handling
`HrefLangGenerator` retrieves SiteLanguage objects and accesses their hreflang codes and base URLs (lines 56, 80-81, 92-102, 107). This represents site configuration language mapping (ISO codes, domains) rather than database-level language identifiers.

### URL Generation Parameters
Both `RecordsXmlSitemapDataProvider` (lines 127-151) and `PagesXmlSitemapDataProvider` (lines 108-117) generate URLs via ContentObjectRenderer. The language context is implicit in the request; no explicit language parameters are added to URLs in these classes. The `_language` parameter in `PagesWithoutDescriptionDataProvider` (line 65) is URL generation transport, not database query logic.

### Meta Tag Field Values
`MetaTagGenerator` (Classes/MetaTag/MetaTagGenerator.php) reads SEO field values from page records to populate meta tags. The page records it receives have already undergone language overlay; the class itself does not perform database-level language operations.

### LanguageMenuProcessor Integration
`HrefLangGenerator` invokes `LanguageMenuProcessor` (line 54) to obtain available languages with their URLs. This processor handles site language configuration traversal and URL generation; the HrefLangGenerator's database-level language logic is limited to its `getTranslatedPageRecord()` method.

## 6) Open Observations

### Pseudo-Field Population Mechanism
`HrefLangGenerator` evaluates `_TRANSLATION_SOURCE`, `_REQUESTED_OVERLAY_LANGUAGE`, and `_LOCALIZED_UID` pseudo-fields (lines 64-65, 116). The mechanism by which PageRepository populates these fields during overlay operations, and their precise semantics in different overlay modes (fallback, strict, free), cannot be determined from local code inspection.

### isPageSuitableForLanguage() Decision Logic
`PagesXmlSitemapDataProvider` filters pages using `isPageSuitableForLanguage($page, $languageAspect)` (line 49) after overlay application. The criteria used by this PageRepository method to determine language suitability, and whether it evaluates database-stored fields or pseudo-fields, is not observable locally.

### Language Field Name Derivation
`RecordsXmlSitemapDataProvider` derives the language field name via `$languageCapability->getLanguageField()->getName()` (line 79). The TCA schema capability abstraction suggests this field name could vary per table, but whether non-standard language field names exist in TYPO3 Core tables, and how TCA schema determines this name, is not evident from this extension's code.

### Workspace Overlay Interaction with Language
`PagesWithoutDescriptionDataProvider` applies workspace overlay via `BackendUtility::workspaceOL('pages', $row, $backendUser->workspace)` (line 55) before reading `sys_language_uid` and `l10n_parent` (line 56). Whether workspace overlay modifies these language fields, and how workspace versions interact with language versions in the database, is not determinable from this context.

### Empty Page Array Semantics in HrefLangGenerator
`HrefLangGenerator` checks `if (empty($page))` after `getTranslatedPageRecord()` (line 72) to detect missing translations. Whether this condition indicates absence of a database record, overlay failure, access restriction, or page visibility constraint cannot be determined conclusively from the returned empty array.

### Language-Aware Schema Detection Criteria
`RecordsXmlSitemapDataProvider` branches on `$schema->isLanguageAware()` (line 75) to conditionally add language constraints. The criteria by which TcaSchemaFactory determines language-awareness (TCA ctrl field presence, capability registration, inheritance rules) is abstracted away and not observable in this class.
