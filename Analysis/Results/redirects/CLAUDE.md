# Database-Level Multilinguality Analysis: EXT:redirects

## 1) Extension Profile

The redirects extension manages HTTP redirects through the `sys_redirect` database table, enabling manual redirect creation and automatic redirect generation when page slugs change. It provides a middleware component that intercepts incoming requests and matches them against stored redirect records to perform URL forwarding. The extension handles redirect integrity validation by detecting conflicts between redirect sources and existing page URLs across a site's page tree.

## 2) Relation to Database-Level Multilinguality

**Rating:** medium

**Justification:**

The extension's own redirect table (`sys_redirect`) contains no language-related fields. However, the extension reads and evaluates language fields from the `pages` table when:

- Automatically creating redirects after slug changes in localized page records
- Determining whether a page is a translation (via `sys_language_uid` comparison)
- Resolving parent-child relationships between default and translated pages (via `l10n_parent`)
- Querying subpages in specific languages for recursive slug updates
- Validating redirect integrity against page URLs in all configured languages

The extension propagates language values read from page records into redirect target link parameters but does not persist language identifiers in its own table schema.

## 3) Observed Code Hotspots (DB Language Logic)

### Classes/Service/SlugService.php
- **Line 89**: Read `sys_language_uid` from changed page record
- **Line 204**: Read `sys_language_uid` from current page record; numeric comparison
- **Line 206**: Read `l10n_parent` when `languageUid` is non-zero; value transport
- **Line 218**: Read `sys_language_uid` from subpage record; numeric comparison; read `l10n_parent`
- **Line 235**: Query constraint on `sys_language_uid = 0` (default language filter)
- **Line 242**: Conditional query execution for `languageUid > 0`
- **Line 248**: Query constraint using `l10n_parent` field for IN clause
- **Line 249**: Query constraint on `sys_language_uid` for localized pages
- **Line 257**: PageRepository overlay call with `languageUid` parameter
- **Line 261**: Read `l10n_parent` when `languageUid` is non-zero

### Classes/RedirectUpdate/SlugRedirectChangeItemFactory.php
- **Line 44**: Read `sys_language_uid` from original page record
- **Line 45**: Numeric comparison (`> 0`); conditional read of `l10n_parent`; value transport into `defaultLanguagePageId`
- **Line 53**: Value transport of language ID to Site method call

### Classes/Service/IntegrityService.php
- **Line 110**: Retrieve language capability from TCA schema
- **Line 121**: Derive language field name via schema API; use in SELECT clause
- **Line 131**: Derive translation origin pointer field name via schema API; use in query constraint
- **Line 142**: Read language field value from result row using derived field name

### Classes/EventListener/AddUrlsForSubPagesForIntegrityCheck.php
- **Line 64**: Retrieve language capability from TCA schema
- **Line 69**: Derive language field name via schema API; use in SELECT clause
- **Line 80**: Read language field value from result row using derived field name; cast to int
- **Line 96**: Numeric comparison of `languageId === 0`

## 4) Structural Patterns

### Direct field access with hardcoded names
Page record language fields are accessed by literal string keys `'sys_language_uid'` and `'l10n_parent'` in SlugService and SlugRedirectChangeItemFactory.

### Numeric language value comparisons
Comparison operators test whether a language value equals `0` (default language) or is greater than `0` (localized content). These comparisons control query construction and recursion logic.

### Conditional field selection
The value of `sys_language_uid` determines whether `l10n_parent` is read to resolve the default-language page ID. This pattern appears in both service and factory classes.

### QueryBuilder language constraints
Language field values are used as literal parameters in QueryBuilder `eq()` and `in()` constraint methods to filter pages by language or by translation parent relationship.

### Schema-derived field names
IntegrityService and AddUrlsForSubPagesForIntegrityCheck derive language field names at runtime via `TcaSchemaCapability::Language`, then use the returned field objects' `getName()` method in queries and result row access.

### Language value propagation into link parameters
Language identifiers read from page records are passed as parameters to link construction methods and stored in redirect target definitions, but not persisted as separate columns in `sys_redirect`.

## 5) Explicit Non-Relevant Areas

### SiteLanguage objects
`SiteLanguage` instances are used extensively throughout the codebase but represent site configuration entities, not database-level language records. These objects provide locale and base URL information for URL generation.

### Request attribute language
In RedirectService (line 432, 479), language is retrieved from ServerRequest attributes. This represents the current request context language, not a database field value.

### EventDispatcher language references
Event objects such as SlugRedirectChangeItem transport `SiteLanguage` instances. These are configuration objects, not database language identifiers.

### PageRepository overlay operations
The `getPagesOverlay()` call in SlugService (line 257) performs language overlay logic internally but is not database-level language field access from the redirects extension's perspective.

## 6) Open Observations

### Ambiguous language field usage context
The `_language` parameter construction in SlugService:139 and AddPageTypeZeroSource:99 uses language values derived from database fields but passes them to routing infrastructure. The boundary between database-level and routing-level language handling is not locally evident.

### Schema capability adoption inconsistency
IntegrityService and AddUrlsForSubPagesForIntegrityCheck use `TcaSchemaCapability::Language` to derive field names dynamically. SlugService and SlugRedirectChangeItemFactory access the same fields via hardcoded string literals. The rationale for this divergence cannot be determined from local code inspection.

### Language field persistence absence in sys_redirect
The extension creates redirects that reference specific page language versions via target link parameters but does not store a language field in the redirect record itself. The implications for redirect matching against multilingual page structures are not documented in code.

### Translation parent query pattern
The query in SlugService:248 uses `l10n_parent` with an IN clause over default-language page UIDs. Whether this pattern correctly handles all localization modes or edge cases (e.g., free-mode translations) cannot be determined without external knowledge.

### PageRepository overlay language semantics
The language parameter passed to `getPagesOverlay()` in SlugService:257 controls overlay behavior, but the method's internal language handling logic is external to the redirects extension. Local code does not reveal whether special language values (e.g., `-1`) would affect redirect creation.
