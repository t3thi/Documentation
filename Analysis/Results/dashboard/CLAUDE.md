# Extension: dashboard

## 1) Extension Profile

The dashboard extension provides a TYPO3 backend module for managing customizable dashboards composed of configurable widgets. It stores dashboard configurations in the `be_dashboards` table (user-specific, no page tree placement) and renders widgets that display aggregated information from various data sources. The extension defines a widget registry, preset system, and repository pattern for dashboard persistence.

## 2) Relation to Database-Level Multilinguality

**Rating: low**

Justification:
- The extension's own data model (`be_dashboards`) contains no language fields (`sys_language_uid`, `l10n_parent`, `l18n_diffsource`, etc.)
- The `DashboardRepository` performs no language-aware queries or filtering
- One widget (`LatestChangedPagesWidget`) queries external tables (`pages`, `tt_content`) and evaluates their language fields to determine page identity and construct backend links
- Other data provider classes query non-localized tables (`sys_log`, `be_users`) without language considerations

## 3) Observed Code Hotspots (DB Language Logic)

| File | Class/Method | Type of Interaction |
|------|--------------|---------------------|
| `Classes/Widgets/LatestChangedPagesWidget.php:159` | `getLatestPagesFromSysHistory()` | Value comparison: `$pageRecord['sys_language_uid'] > 0` to derive `_uid` |
| `Classes/Widgets/LatestChangedPagesWidget.php:162` | `getLatestPagesFromSysHistory()` | Value transport: `sys_language_uid` passed to `SiteFinder::getLanguageById()` |
| `Classes/Widgets/LatestChangedPagesWidget.php:183` | `enrichPageInformation()` | Value comparison: `sys_language_uid > 0` to determine URI page ID |
| `Classes/Widgets/LatestChangedPagesWidget.php:198` | `getPageOfContentElement()` | Query selection: `sys_language_uid` selected from `tt_content` |
| `Classes/Widgets/LatestChangedPagesWidget.php:211` | `getPageOfContentElement()` | Value comparison: `(int)$contentRecord['sys_language_uid'] > 0` |
| `Classes/Widgets/LatestChangedPagesWidget.php:216-217` | `getPageOfContentElement()` | QueryBuilder filter: `eq('l10n_parent', ...)` and `eq('sys_language_uid', ...)` on `pages` |
| `Resources/Private/Templates/Widget/LatestChangedPagesWidget.fluid.html:83` | Template | Value transport: `page.pageRecord.sys_language_uid` passed as route parameter |

## 4) Structural Patterns

- **Numeric language value comparison**: Direct integer comparison `sys_language_uid > 0` used to distinguish default language records from translations
- **Conditional page ID derivation**: Pattern of selecting `l10n_parent` when `sys_language_uid > 0`, otherwise `uid`, to identify the canonical page
- **QueryBuilder language constraints**: `$queryBuilder->expr()->eq('sys_language_uid', ...)` and `$queryBuilder->expr()->eq('l10n_parent', ...)` used to locate translated page records
- **Language value transport**: `sys_language_uid` values propagated to backend route parameters for context-aware navigation

## 5) Explicit Non-Relevant Areas

| Area | Reason for Exclusion |
|------|---------------------|
| `LanguageService` usage in controllers and data providers | UI label translation (XLIFF), not database-level language logic |
| `LanguageServiceFactory::createFromUserPreferences()` | Backend user preference for UI language |
| `$GLOBALS['LANG']->sL()` calls throughout | Localization of interface strings |
| `SiteLanguage` object assignment in `LatestChangedPagesWidget` | Display purpose (flag icon rendering), not query/persistence logic |
| `addInlineLanguageLabelFile()` in `DashboardController` | JavaScript UI translations |

## 6) Open Observations

- The `siteLanguage` property populated in `LatestChangedPagesWidget::getLatestPagesFromSysHistory()` is derived from database `sys_language_uid` values but its usage is limited to display context (flag icons in templates); whether this constitutes "database-level" handling or presentation-layer derivation is context-dependent
- The widget queries `pages` and `tt_content` language fields but does not perform language overlays; it operates on raw record data
