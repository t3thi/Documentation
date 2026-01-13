# Analysis – styleguide

## 0. Scope Coverage

**Searched top-level directories:**
- `Classes/` (all 98 PHP files)
- `Configuration/TCA/` (all 79 TCA definition files)
- `Configuration/TCA/Overrides/` (6 override files)
- `Configuration/FlexForms/` (3 XML files)
- `Tests/Unit/` (1 test file)

**Productive files verified via direct read:**
- `Classes/TcaDataGenerator/RecordFinder.php`
- `Classes/TcaDataGenerator/Generator.php`
- `Classes/TcaDataGenerator/AbstractGenerator.php`
- `Classes/TcaDataGenerator/TableHandler/AbstractTableHandler.php`
- `Classes/TcaDataGenerator/FieldGenerator/TypeInputForceL10nParent.php`
- `Classes/TcaDataGenerator/FieldGenerator/TypePassthroughFieldL10nSource.php`
- All TCA files containing `-1` values

**Justification for excluded areas:**
- `Resources/` contains only XLIFF translations and static assets
- `Documentation/` contains no executable code

---

## 1. Determination of Language Fields

Language field names are derived through:

1. **TCA `ctrl.languageField`**: 70+ tables declare `'languageField' => 'sys_language_uid'`

2. **TCA Schema Capability API**: `AbstractTableHandler.php:69` checks translation support:
   ```php
   $this->tcaSchemaFactory->get($tableName)->hasCapability(TcaSchemaCapability::Language)
   ```

3. **Direct field references in code**:
   - `sys_language_uid` in QueryBuilder constraints
   - `l10n_parent`, `l10n_source` in DataHandler data arrays

---

## 2. Language-Field Usage with Negative Values

### Result: **No occurrences found**

Systematic search for patterns:
- `sys_language_uid.*-1` → No matches
- `language.*-1` (in language field context) → No matches
- `< 0` comparisons on language values → No matches
- `<= -1` comparisons → No matches

**All `-1` occurrences in this extension are NOT language-related:**

| Location | Code | Purpose |
|----------|------|---------|
| `Configuration/TCA/tx_styleguide_ctrl_common.php:14` | `'rootLevel' => -1` | TCA page storage setting (all levels allowed) |
| `Configuration/TCA/tx_styleguide_elements_select.php:63` | `['label' => 'static -1', 'value' => -1]` | Demo select item value |
| `Configuration/TCA/tx_styleguide_elements_select.php:851` | `['label' => 'and yet another one', 'value' => -1]` | Demo select item value |
| `Configuration/TCA/tx_styleguide_l10nreadonly.php:330,348,366` | `['label' => 'static -1', 'value' => -1]` | Demo select item values |

**Sentinel value (not language-related):**
| Location | Code | Purpose |
|----------|------|---------|
| `Classes/TcaDataGenerator/TableHandler/AbstractTableHandler.php:73` | `$translatedRecord = -42` | Initial placeholder for record UID variable |

---

## 3. Semantic Classification

| Occurrence | Category | Justification |
|------------|----------|---------------|
| `rootLevel => -1` | **IRR** | TCA storage configuration, not a language identifier |
| Select item `value => -1` (5 occurrences) | **IRR** | Arbitrary demo values for select field showcase |
| `$translatedRecord = -42` | **IRR** | Sentinel value for record UID, overwritten before use |

---

## 4. Parser Rule Derivations

### No rules required for this extension

The extension contains no semantic usage of negative language identifiers. Parser rules for detecting `-1` language usage would yield only false positives in this codebase.

**Potential false-positive patterns to exclude:**

| Pattern | Exclusion Reason |
|---------|------------------|
| `'rootLevel' => -1` | TCA ctrl setting, field name `rootLevel` ≠ language field |
| `'value' => -1` in TCA `items` arrays | Static select options, not language field assignments |
| Variable initialization with negative sentinel | Context: variable holds record UID, not language ID |

---

## 5. Misclassification Risks

### False Positives

1. **TCA `rootLevel` setting**: `'rootLevel' => -1` could be mistakenly flagged if parser matches any `-1` in TCA files without checking the field context.

2. **Select item demo values**: Multiple TCA select fields use `-1` as arbitrary option values to demonstrate negative number handling in forms.

3. **ISO language codes**: Strings like `'iso-639-1' => 'en'` contain `-1` as substring but represent ISO standard identifiers, not language IDs.

### False Negatives

1. **Indirect language value propagation**: Language IDs are passed through `$languageId` and `$demoLanguageUid` variables to DataHandler commands. A parser tracking only direct `-1` literals would miss hypothetical future negative values passed through these variables.

2. **TcaSchemaCapability checks**: The extension uses capability checks (`TcaSchemaCapability::Language`) rather than explicit language field evaluation, which could mask language-related logic from field-focused analysis.

---

## 6. Tests and Fixtures (Isolated)

### Test files examined:
- `Tests/Unit/Service/KauderwelschServiceTest.php`

**Findings:** No language-related testing. Single test verifies dummy text generation returns expected string.

### Non-binding observations:

The extension's demo data generation creates translations using only **positive language IDs** derived from:
```php
$highestLanguageId = $this->recordFinder->findHighestLanguageId();
$styleguideDemoLanguageIds = range($highestLanguageId + 1, $highestLanguageId + 4);
```

The demo explicitly uses `languageId: 0` for default language and positive incremental IDs for additional languages. No test or fixture demonstrates `-1` ("all languages") semantics.
