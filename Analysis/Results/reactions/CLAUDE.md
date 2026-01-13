# EXT:reactions – Static Analysis for Database-Level Multilinguality

## 1) Extension Profile

EXT:reactions provides a webhook handling system for TYPO3, enabling external services to trigger predefined actions via HTTP endpoints. The extension manages reaction configurations in the `sys_reaction` table, authenticates incoming webhook requests using identifier/secret pairs, and executes registered reaction types (e.g., creating database records via DataHandler). It provides a backend module under Administration > Integrations > Reactions for administrators to configure and manage webhook reactions.

---

## 2) Relation to Database-Level Multilinguality

**Rating: none**

**Justification:**

- The `sys_reaction` table is configured as a root-level system table (`rootLevel => 1`) without language field configuration
- TCA definition contains no `languageField`, `transOrigPointerField`, or `transOrigDiffSourceField` settings
- Database schema (`ext_tables.sql`) defines no `sys_language_uid` column
- `ReactionRepository` QueryBuilder queries apply no language restrictions or constraints
- `ReactionInstruction` domain model contains no language-related properties or accessors
- The table is marked `adminOnly => true` and `hideTable => true`, indicating system-level configuration rather than translatable content

---

## 3) Observed Code Hotspots (DB Language Logic)

No database-level language logic observed.

The extension contains no code that:
- Reads language fields from database records
- Compares numeric language identifiers
- Propagates language values into queries
- Applies language overlays
- Derives language information from TCA schema

---

## 4) Structural Patterns

No database-language-related code patterns present.

The extension uses standard QueryBuilder patterns with:
- `DeletedRestriction` for soft-delete handling
- `HiddenRestriction` for visibility filtering
- `StartTimeRestriction` / `EndTimeRestriction` for time-based access

No language-related restrictions or constraints are applied in any query construction.

---

## 5) Explicit Non-Relevant Areas

The following areas contain language-related code that does **not** represent database-level language logic:

| Location | Type | Purpose |
|----------|------|---------|
| `Classes/Http/ReactionHandler.php:44,61` | LanguageServiceFactory injection | Backend user interface language initialization |
| `Classes/Controller/ManagementController.php:30,67` | LanguageService usage | UI label translation via `sL()` |
| `Classes/Form/Element/FieldMapElement.php:51,71,83` | LanguageService usage | FormEngine field label localization |
| `Classes/ConfigurationModuleProvider/ReactionsProvider.php:32,34` | LanguageService usage | Configuration module description localization |
| `Resources/Private/Language/*.xlf` | XLIFF files | Backend interface label translations |

All language service usage serves UI/label localization exclusively.

---

## 6) Open Observations

**CreateRecordReaction and language value passthrough:**

`Classes/Reaction/CreateRecordReaction.php` creates records via DataHandler using field mappings from webhook payloads. If a payload contains a `sys_language_uid` value and the target table's field mapping includes this field, the value would pass through to the created record. This behavior is not explicitly handled by the reactions extension but depends on:
- The webhook payload content
- The administrator-configured field mapping
- The target table's TCA language configuration

The extension neither validates nor restricts language field values in passthrough scenarios.
