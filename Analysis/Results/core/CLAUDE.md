# CLAUDE.md - ext:core

## 1) Extension Profile

The `core` extension provides the foundational framework for the TYPO3 CMS. It contains the application bootstrap, database abstraction layer (Doctrine DBAL), data handling infrastructure (DataHandler), schema management, context system, authentication services, and domain repository layer. All other TYPO3 extensions depend on APIs and abstractions defined in this extension. It is a mandatory, protected part of every TYPO3 installation.

## 2) Relation to Database-Level Multilinguality

**Rating: high**

Justification:
- Defines the `LanguageAwareSchemaCapability` class that encapsulates language field name resolution (`sys_language_uid`, `l10n_parent`, `l10n_source`, `l10n_diffsource`)
- `TcaSchema::isLanguageAware()` determines whether tables support language records
- `PageRepository` implements the complete overlay logic using numeric language comparisons and QueryBuilder constraints
- `DataHandler` handles language field persistence during record creation, copying, and localization
- `DataMapProcessor` synchronizes localized records with explicit language value checks
- `LanguageAspect` carries runtime language configuration with numeric IDs and overlay type decisions
- `SlugHelper` applies language constraints to uniqueness queries
- TCA enrichment automatically creates language field configurations with `IN (-1, 0)` foreign table constraints

## 3) Observed Code Hotspots (DB Language Logic)

| File | Class/Method | Interaction Type |
|------|--------------|------------------|
| `Classes/Schema/Capability/LanguageAwareSchemaCapability.php` | `getLanguageField()`, `getTranslationOriginPointerField()` | Schema derivation |
| `Classes/Schema/TcaSchema.php` | `isLanguageAware()` | Schema capability check |
| `Classes/Domain/Repository/PageRepository.php` | `getRecordOverlay()` | Query filter, overlay decision |
| `Classes/Domain/Repository/PageRepository.php` | `getPageOverlaysForLanguage()` | Query filter, value transport |
| `Classes/Domain/Repository/PageRepository.php` | `isPageSuitableForLanguage()` | Numeric comparison |
| `Classes/Domain/Repository/PageRepository.php` | `getLanguageFallbackChain()` | Value derivation |
| `Classes/DataHandling/DataHandler.php` | `localize()`, `copyRecord()` | Persistence, value transport |
| `Classes/DataHandling/DataHandler.php` | Language field checks (80+ occurrences) | Query filter, persistence |
| `Classes/DataHandling/Localization/DataMapProcessor.php` | `collectItems()` | Numeric comparison (-1 skip), query filter |
| `Classes/DataHandling/Localization/DataMapProcessor.php` | `fetchDependentElements()` | Query filter (`language > 0`, `parent > 0`) |
| `Classes/DataHandling/Localization/DataMapProcessor.php` | `applyLocalizationReferences()` | Persistence |
| `Classes/DataHandling/Localization/DataMapItem.php` | `getLanguage()`, `getParent()`, `getSource()` | Value transport |
| `Classes/DataHandling/Localization/State.php` | `isApplicable()` | Schema check |
| `Classes/DataHandling/SlugHelper.php` | `applyLanguageConstraint()` | Query filter (`= languageId OR = -1`) |
| `Classes/DataHandling/SlugHelper.php` | `generate()`, `resolveParentPageRecord()` | Value transport, query filter |
| `Classes/DataHandling/Model/RecordState.php` | `getLanguageLink()` | Value transport |
| `Classes/DataHandling/Model/EntityContext.php` | `getLanguageId()`, `withLanguageId()` | Value transport |
| `Classes/Context/LanguageAspect.php` | `getId()`, `getContentId()`, `doOverlays()` | Value transport, numeric comparison |
| `Classes/Domain/RecordFactory.php` | `extractSystemInformation()` | Value extraction, LanguageInfo creation |
| `Classes/Domain/Record/LanguageInfo.php` | `getLanguageId()`, `getTranslationParent()` | Value transport (DTO) |
| `Classes/Routing/Aspect/PersistedAliasMapper.php` | `findByRouteFieldValue()`, `resolveOverlay()` | Query filter, overlay decision |
| `Classes/Routing/Aspect/PersistedPatternMapper.php` | Similar to PersistedAliasMapper | Query filter, overlay decision |
| `Classes/Configuration/Tca/TcaEnrichment.php` | `enrichLanguageField()`, `enrichTransOrigPointerField()` | Schema derivation |
| `Classes/Configuration/Tca/TcaEnrichment.php` | `setTransOrigPointerFieldInCtrl()` | Schema enrichment |
| `Classes/Database/Schema/DefaultTcaSchema.php` | Auto-add `l10n_state` column | Schema derivation |
| `Classes/Authentication/BackendUserAuthentication.php` | `checkLanguageAccess()` | Permission check on language field |
| `Classes/Resource/MetaDataEventListener.php` | `afterFileMetaDataUpdated()` | Persistence (update by `l10n_parent`) |
| `Classes/Type/Bitmask/PageTranslationVisibility.php` | `shouldBeHiddenInDefaultLanguage()` | Numeric comparison |
| `Configuration/TCA/pages.php` | TCA ctrl section | Schema definition (languageField, transOrigPointerField) |
| `ext_tables.sql` | Index definitions | Schema (KEY on sys_language_uid, l10n_parent) |

## 4) Structural Patterns

**Schema Capability Access Pattern:**
Language field names are retrieved via `TcaSchemaCapability::Language`:
```php
$languageCapability = $schema->getCapability(TcaSchemaCapability::Language);
$languageField = $languageCapability->getLanguageField()->getName();
$transOrigPointerField = $languageCapability->getTranslationOriginPointerField()->getName();
```

**QueryBuilder Language Constraint Pattern:**
```php
$queryBuilder->expr()->in($languageField, $queryBuilder->createNamedParameter($languageUids, Connection::PARAM_INT_ARRAY))
$queryBuilder->expr()->eq($transOrigPointerField, $queryBuilder->createNamedParameter($recordUid, Connection::PARAM_INT))
```

**Numeric Language Value Comparisons:**
- `=== 0` for default language records
- `> 0` for translation records
- `=== -1` for "all languages" records (skip processing or include in queries)
- Fallback chain as integer array

**Language Value Transport in DTOs:**
- `LanguageInfo` (languageId, translationParent, translationSource)
- `EntityContext::getLanguageId()`
- `RecordState::getLanguageLink()`
- `DataMapItem` (language, parent, source)

**TCA Enrichment Defaults:**
- Auto-creates `sys_language_uid` column with type `language`
- Auto-creates `l10n_parent` field with `foreign_table_where IN (-1, 0)`
- Auto-adds `l10n_state` column for language-aware tables

**Overlay Decision Pattern:**
- Check `$languageAspect->getContentId() > 0` before attempting overlay
- Check `$incomingLanguageId === 0` (default language) as overlay source requirement
- Return `null` for strict overlay modes when no translation exists

## 5) Explicit Non-Relevant Areas

| Area | Location | Reason |
|------|----------|--------|
| XLIFF/Label translation | `Classes/Localization/Parser/XliffParser.php`, `Classes/Localization/LanguageService.php` | UI label resolution, not database records |
| Locale handling | `Classes/Localization/Locale.php`, `Classes/Localization/Locales.php` | ISO code/locale formatting, not DB storage |
| SiteLanguage configuration | `Classes/Site/Entity/SiteLanguage.php` | Site YAML configuration entity, not DB language field |
| Language service factory | `Classes/Localization/LanguageServiceFactory.php` | XLIFF label loading |
| Official languages list | `Classes/Localization/OfficialLanguages.php` | Static language metadata |
| Date formatter | `Classes/Localization/DateFormatter.php` | Locale-based formatting |
| TcaSystemLanguageCollector | `Classes/Localization/TcaSystemLanguageCollector.php` | Populates language selector from SiteLanguage, not DB queries |
| SiteLanguageAwareInterface | `Classes/Site/SiteLanguageAwareInterface.php` | Injection interface for SiteLanguage objects |
| LanguageAspectFactory | `Classes/Context/LanguageAspectFactory.php` | Creates LanguageAspect from SiteLanguage config |
| RequestWrapper | `Classes/ExpressionLanguage/RequestWrapper.php` | Exposes SiteLanguage to conditions |

## 6) Open Observations

- `DataMapProcessor::collectItems()` skips records with `language === -1` without explanation of downstream implications
- `SlugHelper::applyLanguageConstraint()` returns early for `languageId === -1` without adding constraints, potentially allowing cross-language slug collisions
- `LanguageAspect::doOverlays()` returns `false` when `contentId === 0`, which may affect overlay behavior for default language requests in edge cases
- `PageRepository::getRecordOverlay()` returns the original row unchanged when `incomingLanguageId === -1` (all languages), but the interaction with workspace overlays in this scenario is not locally determinable
- `RecordState::getLanguageLink()` is nullable; the conditions under which it is set versus null are determined by `RecordStateFactory` in a separate context
- `TcaEnrichment` uses hardcoded `IN (-1, 0)` for `foreign_table_where` in transOrigPointerField; the semantic contract of `-1` inclusion is not documented locally
- The relationship between `LanguageAspect::getId()` (requested language) and `LanguageAspect::getContentId()` (content language) during fallback scenarios is configuration-dependent
