# CLAUDE.md - extbase Extension Analysis

## 1) Extension Profile

Extbase is a comprehensive MVC framework extension for TYPO3, providing domain-driven design patterns for building frontend plugins and backend modules. It includes an ORM layer with DataMapper and Repository patterns, query abstraction with QueryBuilder integration, property mapping and type conversion, validation framework, and event-driven persistence. The extension handles the mapping between domain objects and database tables configured via TCA, managing object hydration, persistence, and relation resolution.

---

## 2) Relation to Database-Level Multilinguality

**Rating: high**

**Justification:**

- Domain objects carry numeric language identifiers via `_languageUid` and `_localizedUid` properties in `AbstractDomainObject`
- `QuerySettingsInterface` and `Typo3QuerySettings` manage `respectSysLanguage` flag and `LanguageAspect` for query-level language filtering
- `Typo3DbQueryParser::getLanguageStatement()` constructs SQL constraints on language fields based on TCA schema
- `DataMapper::thawProperties()` reads language column values from database rows and maps them to domain object properties
- `Backend::insertObject()` and `Backend::updateObject()` write language field values during persistence
- `Typo3DbBackend::overlayLanguageAndWorkspace*()` methods perform record overlays using `PageRepository` and language aspects
- `DataMapFactory` extracts language capability from TcaSchema to populate `DataMap::languageIdColumnName` and `DataMap::translationOriginColumnName`
- Language values propagate through query settings when resolving relations in `DataMapper::getPreparedQuery()`

---

## 3) Observed Code Hotspots (DB Language Logic)

| File | Class/Method/Area | Interaction Type |
|------|-------------------|------------------|
| `Classes/DomainObject/AbstractDomainObject.php` | `PROPERTY_LANGUAGE_UID`, `PROPERTY_LOCALIZED_UID` constants; `$_languageUid`, `$_localizedUid` properties | Value storage in domain object |
| `Classes/Persistence/Generic/Typo3QuerySettings.php` | `$respectSysLanguage`, `$languageAspect`; `getLanguageAspect()`, `setLanguageAspect()` | Query filter configuration |
| `Classes/Persistence/Generic/QuerySettingsInterface.php` | `setRespectSysLanguage()`, `getRespectSysLanguage()`, `getLanguageAspect()`, `setLanguageAspect()` | Query filter interface |
| `Classes/Persistence/Generic/Storage/Typo3DbQueryParser.php:718-810` | `getLanguageStatement()` | Query filter construction |
| `Classes/Persistence/Generic/Storage/Typo3DbQueryParser.php:602-605` | `getAdditionalWhereClause()` - language statement call | Query filter propagation |
| `Classes/Persistence/Generic/Storage/Typo3DbBackend.php:424-446` | `overlayLanguageAndWorkspace()` | Overlay decision |
| `Classes/Persistence/Generic/Storage/Typo3DbBackend.php:453-475` | `overlayLanguageAndWorkspaceForSelect()` | Overlay iteration |
| `Classes/Persistence/Generic/Storage/Typo3DbBackend.php:484-518` | `overlayLanguageAndWorkspaceForJoinedSelect()` | Overlay for joined queries |
| `Classes/Persistence/Generic/Storage/Typo3DbBackend.php:525-602` | `overlayLanguageAndWorkspaceForSingleRecord()` | Per-record overlay logic |
| `Classes/Persistence/Generic/Mapper/DataMapper.php:209-214` | `thawProperties()` - language field mapping | Value transport to object |
| `Classes/Persistence/Generic/Mapper/DataMapper.php:469-496` | `getPreparedQuery()` - language aspect propagation for relations | Query settings derivation |
| `Classes/Persistence/Generic/Mapper/DataMapper.php:631-643` | `resolveParentId()` - localized UID handling | Value comparison |
| `Classes/Persistence/Generic/Mapper/DataMap.php` | `$languageIdColumnName`, `$translationOriginColumnName`, `$translationOriginDiffSourceName` | Schema derivation |
| `Classes/Persistence/Generic/Mapper/DataMapFactory.php:113-132` | Language capability extraction from TcaSchema | Schema derivation |
| `Classes/Persistence/Generic/Backend.php:547-556` | `insertObject()` - language field initialization | Persistence write |
| `Classes/Persistence/Generic/Backend.php:717-722` | `updateObject()` - language field write | Persistence write |
| `Classes/Persistence/Generic/Backend.php:155-169` | `getObjectByIdentifier()` - language aspect override | Query configuration |
| `Classes/Service/ExtensionService.php:168-184` | `getTargetPidByPlugin()` - sys_language_uid constraint | Query filter |
| `Classes/Configuration/BackendConfigurationManager.php:294` | `getPageChildrenRecursive()` - sys_language_uid = 0 constraint | Query filter |

---

## 4) Structural Patterns

### Numeric Language Value Storage
- `AbstractDomainObject::$_languageUid` holds `int<-1, max>|null` representing the language id (-1 = all languages, 0 = default, >0 = specific language)
- `AbstractDomainObject::$_localizedUid` holds the UID of the default language record for translations

### QueryBuilder Language Constraints
- `Typo3DbQueryParser::getLanguageStatement()` constructs expressions comparing table alias + language field against `LanguageAspect::getContentId()`
- Conditions include `-1` (all languages) via `$this->queryBuilder->expr()->in(..., [$languageUid, -1])`
- Overlay modes (`OVERLAYS_OFF`, `OVERLAYS_MIXED`, `OVERLAYS_ON_WITH_FLOATING`) determine subquery construction for translation origin pointer checks

### Language Field Name Derivation via TCA Schema
- `DataMapFactory::buildDataMapInternal()` extracts `languageCapability` from `TcaSchemaFactory`
- Language field names derived via `$languageCapability->getLanguageField()->getName()` and `$languageCapability->getTranslationOriginPointerField()->getName()`
- These values populate `DataMap::languageIdColumnName` and `DataMap::translationOriginColumnName`

### LanguageAspect Transport
- `Typo3QuerySettings` clones the `Context` and extracts `LanguageAspect` in constructor
- `LanguageAspect` propagates through `QuerySettingsInterface` to query parser and overlay methods
- `DataMapper::getPreparedQuery()` creates new `LanguageAspect` instances for relation queries, inheriting overlay type and fallback chain

### Record Overlay Delegation
- `Typo3DbBackend` delegates to `PageRepository::getLanguageOverlay()` and `PageRepository::versionOL()` for overlay processing
- Language field values from row determine whether default language record needs re-fetching before overlay

### Persistence Language Field Handling
- `Backend::insertObject()` initializes `languageIdColumnName` to 0 for new objects without explicit language
- `Backend::updateObject()` writes `languageIdColumnName` from `_languageUid` property
- `_localizedUid` determines which UID to update for translated records

---

## 5) Explicit Non-Relevant Areas

| Area | Reason for Exclusion |
|------|----------------------|
| `Classes/Utility/LocalizationUtility.php` | Handles XLIFF label translation (LLL:), not database record language |
| `Classes/Configuration/FrontendConfigurationManager.php` | TypoScript configuration loading, no record language logic |
| `Classes/Mvc/Controller/ActionController.php` | Controller dispatch, no database language interaction |
| `Classes/Property/TypeConverter/*` | Type conversion for form data, no language field handling |
| `Classes/Validation/Validator/*` | Input validation, no language context |
| `Classes/Routing/ExtbasePluginEnhancer.php` | URL routing, no database language |
| `Resources/Private/Language/*.xlf` | XLIFF UI translations |

---

## 6) Open Observations

- `DataMapper::getPreparedQuery()` at lines 477-486 conditionally propagates parent object's `_languageUid` to child queries when `respectSysLanguage` is false. The interaction between this propagation and overlay modes may produce varying results depending on relation type and parent language state.

- `Typo3DbBackend::overlayLanguageAndWorkspaceForSingleRecord()` at lines 567-576 overrides `languageUid` based on `respectSysLanguage` and parent query presence. The conditions under which this override occurs depend on runtime query hierarchy state.

- `Typo3DbQueryParser::getLanguageStatement()` constructs subqueries for translation origin checking. The visibility constraints applied to these subqueries (`getVisibilityConstraintStatement`) may interact with the main query's enable field settings.

- `Backend::attachObjectToParentObjectRelationHasMany()` at line 456 uses `_localizedUid` for parent key field value if available. This suggests relation persistence considers localized record identity.

- The `_LOCALIZED_UID` marker in database rows (set by overlay methods) serves as a signal for `DataMapper` to handle translated record mapping. This marker originates from `PageRepository` overlay logic.
