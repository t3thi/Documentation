# CLAUDE.md - rte_ckeditor Extension Analysis

## 1) Extension Profile

The `rte_ckeditor` extension provides CKEditor 5 integration for the TYPO3 backend FormEngine. It renders rich text editing capabilities for TCA text fields with `enableRichtext` enabled. The extension handles editor configuration, external plugin loading, and link browser functionality within the backend editing interface.

---

## 2) Relation to Database-Level Multilinguality

**Rating: low**

**Justification:**
- The extension reads the numeric `sys_language_uid` field from the current record's database row to determine content language for the editor
- Language metadata is accessed from pre-populated `systemLanguageRows` array provided by FormEngine
- No direct database queries for language information are performed
- No QueryBuilder usage with language constraints
- No record overlay logic implemented
- No database schema defined (no `ext_tables.sql`)
- All language-aware data retrieval is delegated to core FormEngine data providers

---

## 3) Observed Code Hotspots (DB Language Logic)

| File Path | Class / Method | Type of Language Interaction |
|-----------|----------------|------------------------------|
| `Classes/Form/Element/RichTextElement.php:277-280` | `RichTextElement::getLanguageIsoCodeOfContent()` | Value read: extracts `sys_language_uid` from `$this->data['databaseRow']` |
| `Classes/Form/Element/RichTextElement.php:281` | `RichTextElement::getLanguageIsoCodeOfContent()` | Value transport: casts and normalizes numeric language UID |
| `Classes/Form/Element/RichTextElement.php:282-284` | `RichTextElement::getLanguageIsoCodeOfContent()` | Value derivation: looks up ISO code from `systemLanguageRows[uid]['iso']` |
| `Classes/Form/Element/RichTextElement.php:443` | `RichTextElement::prepareConfigurationForEditor()` | Value propagation: assigns content language to CKEditor configuration |
| `Classes/Controller/BrowseLinksController.php:105` | `BrowseLinksController::initVariables()` | Value read: receives `contentsLanguage` from request query parameters |
| `Classes/Controller/BrowseLinksController.php:106` | `BrowseLinksController::initVariables()` | Service initialization: creates LanguageService based on content language code |
| `Classes/Controller/BrowseLinksController.php:81` | `BrowseLinksController::getUrlParameters()` | Value transport: includes `contentsLanguage` in URL parameters |

---

## 4) Structural Patterns

### Language UID Extraction from FormEngine Data
```php
$currentLanguageUid = ($this->data['databaseRow']['sys_language_uid'] ?? 0);
if (is_array($currentLanguageUid)) {
    $currentLanguageUid = $currentLanguageUid[0];
}
$contentLanguageUid = (int)max($currentLanguageUid, 0);
```
- Numeric language identifier read from database row
- Array handling for special FormEngine value formats
- Normalization to ensure non-negative integer

### Language Metadata Lookup via Pre-Populated Array
```php
$contentLanguage = $this->data['systemLanguageRows'][$currentLanguageUid]['iso'] ?? 'en-US';
```
- Language UID used as array index
- ISO code field accessed from metadata structure
- Fallback value for missing entries

### Default Language Handling (UID 0)
```php
if ($contentLanguageUid) {
    $contentLanguage = $this->data['systemLanguageRows'][$currentLanguageUid]['iso'] ?? 'en-US';
} else {
    $contentLanguage = $this->rteConfiguration['config']['defaultContentLanguage'] ?? 'en-US';
}
```
- Language UID 0 treated as default language
- Configuration-based fallback for default language

### Language Code Validation
```php
if ($contentLanguage === 'default' || !$this->locales->isValidLanguageKey($contentLanguage)) {
    $contentLanguage = 'en';
}
```
- Validation against `Locales::isValidLanguageKey()`
- String "default" handled as invalid

---

## 5) Explicit Non-Relevant Areas

| Area | Location | Reason for Exclusion |
|------|----------|---------------------|
| Backend UI language | `RichTextElement.php:436-437` | Uses backend user's `lang` preference, not database record language |
| XLIFF label translations | `RichTextElement.php:365-375` | LLL: reference resolution for configuration strings |
| CKEditor translation files | `RichTextElement.php:257-265` | JavaScript translation module loading based on derived language codes |
| LanguageService for link browser | `BrowseLinksController.php:106` | Service instance for UI label localization, not database record processing |
| RTE configuration presets | `Configuration/RTE/` directory | YAML-based editor configuration, no database interaction |
| Default field wizards | `RichTextElement.php:57-73` | FormEngine wizard configuration including `localizationStateSelector`, `otherLanguageContent`, `defaultLanguageDifferences` - these are rendering concerns delegated to core |

---

## 6) Open Observations

| Observation | Location | Notes |
|-------------|----------|-------|
| `systemLanguageRows` data structure origin | `RichTextElement.php:284` | Pre-populated by FormEngine data providers; exact population mechanism outside extension scope |
| Array format of `sys_language_uid` | `RichTextElement.php:278-279` | FormEngine may provide array format in certain contexts; specific conditions undetermined |
| `contentsLanguage` parameter propagation | `BrowseLinksController.php:81,105` | Language code string passed via URL; original source (whether from database lookup or other) indeterminate from local context |
| Event data payload | `Classes/Form/Element/Event/*.php` | Events receive full `$data` array containing `systemLanguageRows`; event listeners may access language information |
