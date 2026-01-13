# TYPO3 Core Extension Analysis: filemetadata

## 1) Extension Profile

The `filemetadata` extension provides TCA configuration overrides for the `sys_file_metadata` table, adding metadata fields for file asset management. It extends the base file metadata schema with fields for status, geographic coordinates (latitude/longitude), geolocation data (country/region/city), copyright information, creator/publisher details, content dates, and file-type-specific metadata (pages, duration, color space, dimensions). The extension contains no executable code, only declarative TCA array structures merged into the global TCA definition at runtime.

---

## 2) Relation to Database‑Level Multilinguality

**Rating:** none

**Justification:**

The extension contains exclusively declarative TCA configuration without executable logic. Observable structures:

- No queries, query builders, or database connection usage
- No repository classes or data access logic
- No schema or capability API invocations
- No numeric language identifier comparisons or assignments
- No language field name derivation or propagation
- No record filtering by language criteria
- TCA column properties `l10n_mode`, `l10n_display`, and `allowLanguageSynchronization` are UI rendering directives (how translated records display fields in forms), not database-level language logic
- The `language` field (Configuration/TCA/Overrides/sys_file_metadata.php:460) stores metadata about file content language (e.g., language of a PDF document), not database record language identifiers

---

## 3) Observed Code Hotspots (DB Language Logic)

None. The extension contains no code locations where database-level language information is read, compared, propagated, or derived.

---

## 4) Structural Patterns

None applicable to database-level multilingual processing.

Observable TCA configuration patterns (excluded from scope per global rules):
- TCA `l10n_mode` string directives (`'prefixLangTitle'`, `'exclude'`)
- TCA `l10n_display` string directives (`'defaultAsReadonly'`, `''`)
- TCA `behaviour.allowLanguageSynchronization` boolean flag (`true`)

These are form rendering and UI behavior configurations, not database-level language handling structures.

---

## 5) Explicit Non‑Relevant Areas

- **Configuration/TCA/Overrides/sys_file_metadata.php (entire file)** – Declarative TCA column and type definitions for form rendering. Contains no executable logic or database operations.
- **ext_tables.sql** – Database schema definition adding four columns (`status`, `latitude`, `longitude`, `pages`). Contains no queries or language-related constraints.
- **Field `language` (line 460–471)** – Stores human-readable language metadata about file content (e.g., "English", "Deutsch"), not numeric database language identifiers. This is content metadata, not a database language field.

---

## 6) Open Observations

None. The extension scope is fully determinable: TCA configuration overlay with no language-related database operations.
