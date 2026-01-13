# Extension: beuser

## 1) Extension Profile

The beuser extension provides backend module functionality for administration and management of backend users and backend user groups within the TYPO3 Core. It implements listing, filtering, searching, comparison, and detailed information display for backend users, groups, file mounts, and user sessions. The extension operates primarily as a management interface with repository-based data access and Extbase domain models for be_users and be_groups tables.

---

## 2) Relation to Database‑Level Multilinguality

**Rating: low**

The extension interacts with the `allowed_languages` field, which stores comma-separated numeric language identifiers representing content language permissions for backend users and groups. However, this interaction is limited to:
- Reading the `allowed_languages` field value from group data for display purposes
- Transporting language permission values through domain models (BackendUser::$allowedLanguages)
- No query filtering, overlay logic, or persistence operations involving language-dependent records
- The be_users and be_groups tables are not themselves multilingual (no sys_language_uid or l10n_parent fields)
- Language values are used exclusively for access control permissions, not for managing or filtering translatable content

---

## 3) Observed Code Hotspots (DB Language Logic)

| Location | Class / Method / Area | Type of Interaction |
|----------|----------------------|---------------------|
| Classes/Domain/Model/BackendUser.php:45 | BackendUser::$allowedLanguages property | Value transport (domain object storage) |
| Configuration/Extbase/Persistence/Classes.php:30-32 | Extbase persistence mapping | Field mapping (allowed_languages → allowedLanguages) |
| Classes/Service/UserInformationService.php:133 | UserInformationService::convert() | Value reading (from groupData array) |
| Classes/Service/UserInformationService.php:135-140 | UserInformationService::convert() | Value iteration and storage (loop over numeric language IDs) |

---

## 4) Structural Patterns

**Permission field storage and retrieval:**
- The `allowed_languages` field in be_groups stores comma-separated numeric identifiers
- Values are accessed via `BackendUserAuthentication->groupData['allowed_languages']`
- String values are exploded to arrays and cast to integers for processing

**Domain object transport:**
- BackendUser domain model defines `$allowedLanguages` as string property
- Extbase persistence layer maps `allowed_languages` database field to domain property
- Values flow from database → groupData → domain object → presentation layer

**No query-level language handling:**
- Repository classes (BackendUserRepository, BackendUserGroupRepository) contain no language-based query constraints
- QueryBuilder usage focuses on user/group filtering by title, uid, status, login state
- No WHERE clauses or query restrictions involving language fields

**Display-only language processing:**
- Language IDs retrieved purely for information display in user detail views
- No persistence, modification, or filtering operations on language-dependent content records

---

## 5) Explicit Non‑Relevant Areas

**UI translation infrastructure:**
- All LanguageService / LocalizationUtility usage in Controllers (BackendUserController.php, PermissionController.php)
- All ViewHelper methods calling getLanguageService() or translate()
- LLL: references in PHP code (e.g., lines 112-113, 190, 200 in BackendUserController.php)
- Resources/Private/Language directory contents (XLIFF files)

**Site configuration languages:**
- UserInformationService::getAllSiteLanguages() method (lines 265-289)
- SiteFinder and Site::getAllLanguages() usage
- SiteLanguage object access (getTitle(), getFlagIdentifier())
- These retrieve site configuration languages for display, not database language records

**Parameter-based rendering:**
- Module configuration in Configuration/Backend/Modules.php
- JavaScript module configuration in Configuration/JavaScriptModules.php

---

## 6) Open Observations

**Language ID semantics:**
- Numeric language identifiers stored in `allowed_languages` are treated as permission markers
- The mapping between these numeric IDs and actual sys_language records is not established within this extension's codebase
- Whether these IDs correspond to sys_language.uid values is implied but not explicitly validated or enforced locally

**Site configuration bridge:**
- Language information is retrieved from Site configuration (SiteFinder) rather than directly from database records
- This suggests the resolution from permission IDs to content language records occurs in Core's site configuration layer, outside this extension's scope
- The extension consumes pre-resolved language metadata for display but does not participate in language record selection or overlay logic

**GroupData aggregation:**
- Language permissions are accessed via `BackendUserAuthentication->groupData['allowed_languages']`
- The aggregation mechanism that populates groupData from be_groups records is external to this extension
- How inherited group permissions are merged for language access is not visible in local code
