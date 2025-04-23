# Generic Dimensions in TYPO3

**Current status of the draft concept for discussion in the [Translation Handling Initiative](https://typo3.slack.com/archives/C05D7UF1L8M)**

---

This document outlines the current draft for introducing generic dimensions in TYPO3. It serves as a discussion basis for the team to evaluate possible use cases, technical requirements, and limitations. The goal is to provide a flexible and structured method for modeling context-aware content beyond the existing language model.

---

## 📒 Basic Structure

Generic dimensions are to be configured in `config.yaml` similarly to `languages:` under the key `dimensions:`. All entries in `values:` are listed as a **numerically indexed array**. Each entry contains a unique `id:` used for references such as `fallbacks:`.

### Example Structure

```yaml
dimensions:
  country:
    context: true
    routing: true
    values:
      -
        id: us
        title: USA
        icon: 'flags/us.svg' # Path relative to the public web root
        base: 'https://us.example.com/'
        fallbackType: strict
        fallbacks: de
      -
        id: de
        title: Germany
        icon: 'flags/de.svg' # Path relative to the public web root
        base: '/de/'
```

---

## 🌐 Dimension Properties

Dimension properties can be grouped into three categories:

- **Required properties** are essential for TYPO3 to interpret a dimension’s presence and purpose.
- **System-relevant properties** are optional but influence system behavior, such as automatic resolution, fallback logic, or availability states.
- **Metadata** provides descriptive or visual information used in the UI but not essential for system logic.


### Required Properties

| Key         | Meaning                                                  |
|-------------|----------------------------------------------------------|
| `context`   | Whether the value is available in the TYPO3 context     |
| `routing`   | Whether the value influences the URL structure          |

### Optional, System-Relevant Properties

| Key               | Meaning                                                                 |
|--------------------|-------------------------------------------------------------------------|
| `base`             | Primary URL base (path or domain)                                       |
| `baseVariants`     | Array of additional URL bases with conditions                           |
| `fallbackType`     | Fallback resolution strategy (`strict`, `free`, `none`, etc.)           |
| `fallbacks`        | Comma-separated list of `id` values as fallback targets                 |
| `enabled`          | Activation status of the value                                          |
| `autoDetectable`   | Allows automatic detection (e.g., via IP, headers, cookies, etc.)       |

### Optional Metadata

| Key               | Purpose                                               |
|--------------------|--------------------------------------------------------|
| `title`            | Display name for menus or selectors                   |
| `icon`             | Symbol/icon (e.g., flag, brand, role)                |
| `hreflang`         | hreflang output for SEO                              |
| `locale`           | ICU or PHP locale                                     |
| `direction`        | Text direction (e.g., `ltr`, `rtl`)                  |
| `navigationTitle`  | Alternative label for navigation                     |
| `navigation`       | Controls visibility in menus                         |

---

## 🔍 Behavior and Resolution

- **Routing is defined via `base` and `baseVariants`**
- **Each `id:` acts as a reference value** for fallbacks, conditions, and middleware
- **If `autoDetectable: true` is set**, TYPO3 or custom middleware may automatically resolve the dimension value based on IP address, browser headers, cookies, or subdomains. This allows location- or user-based behavior without requiring manual selection.
- **Another open topic is the influence of dimensions on backend behavior**: In the case of `languages:`, the selected language affects various backend display areas, such as the page tree, column views, and translation overlays. It must be evaluated whether and how generic dimensions should affect backend visibility, filters, or layout logic as well.
- **The `icon` property supports all standard TYPO3 path formats**, including relative paths from the public web root and `EXT:` paths for extension-based assets.
    - `EXT:` paths (e.g., `EXT:site_package/Resources/Public/Icons/Flags/us.svg`) can be used for assets bundled within extensions.

---

## 🔹 Consistency with `languages:`

The structure of `dimensions:` is deliberately modeled after `languages:` to ensure maximum compatibility:

| Aspect         | `languages:`                          | `dimensions:`                          |
|----------------|----------------------------------------|----------------------------------------|
| Structure      | Numerically indexed array              | Numerically indexed array              |
| Identifier     | `languageId`                           | `id`                                   |
| Routing        | via `base` + `baseVariants`            | via `base` + `baseVariants`            |
| Fallback       | `fallbackType`, `fallbacks`            | `fallbackType`, `fallbacks`            |

---

## ✅ Benefits of the Model

- High reusability and flexibility
- Same mechanisms for languages, countries, brands, user levels, and more
- Clear separation between system and semantic configuration
- Easy to test, extend, and maintain

---

## ⚡ Open Questions for Discussion

1. Which of the optional system-relevant properties should be officially supported in the initial implementation?
2. Should purely informative dimensions be allowed, or should `routing` and `context` be treated as always enabled by default to simplify the model?
   Alternatively, should routing/context be considered implicit defaults unless explicitly required for such cases?
3. How can conditions on dimensions be defined consistently via TypoScript/TSconfig?
4. Is a global `dimensionOrder` needed to control slug segment order across dimensions/languages?
5. Are `id` + `title` sufficient for identification and UI, or are more required fields necessary?
6. What kind of backend influence should dimensions have on content visibility or UI layout? Should this remain a language-specific feature, or become a general capability of all dimensions?
7. Should the existing `languages:` block be fully migrated to `dimensions:`?
   The structural foundation is already in place, but core changes would be required to support the new keys for language-related features.
8. To what extent should dimension values influence TYPO3's caching mechanisms?
   Should there be a dedicated property such as `cacheVariant` to explicitly declare cache relevance?
   The structural foundation is already in place, but core changes would be required to support the new keys for language-related features.

