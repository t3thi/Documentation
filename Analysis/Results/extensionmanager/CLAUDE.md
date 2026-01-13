# Extension: extensionmanager

## 1) Extension Profile

The Extension Manager provides a backend module for viewing, installing, removing, and updating TYPO3 extensions. It manages extension lifecycle operations including fetching extension metadata from the TYPO3 Extension Repository (TER), handling local extension installation, and maintaining a local cache of available extension versions. The extension operates on system-level extension metadata rather than content records.

---

## 2) Relation to Database-Level Multilinguality

**Rating: none**

**Justification:**
- The extension defines one custom database table (`tx_extensionmanager_domain_model_extension`) which explicitly omits TCA definition and contains no language fields (`sys_language_uid`, `l10n_parent`, `l10n_source`).
- No QueryBuilder operations include language-based filtering or constraints.
- No overlay logic or language-aware record fetching is implemented.
- The domain model `Extension` contains no language-related properties.
- Grep searches for `sys_language_uid`, `l10n_parent`, `l10n_source`, `languageField`, `transOrigPointerField`, and overlay methods return no matches.

---

## 3) Observed Code Hotspots (DB Language Logic)

None.

---

## 4) Structural Patterns

None. The extension does not implement database-level language handling patterns.

---

## 5) Explicit Non-Relevant Areas

| Area | File(s) | Reason for Exclusion |
|------|---------|---------------------|
| UI label translations | `Classes/Controller/AbstractController.php`, `Classes/Utility/InstallUtility.php`, `Classes/Report/ExtensionStatus.php`, `Classes/Report/ExtensionComposerStatus.php`, `Classes/ViewHelpers/ReloadSqlDataViewHelper.php` | `LanguageService` usage for XLIFF/LLL backend labels only |
| Scheduler task registration | `Configuration/TCA/Overrides/scheduler_download_extensionlist_task.php` | LLL references for task labels, not database content |
| XLIFF language files | `Resources/Private/Language/*.xlf` | UI translation resources |

---

## 6) Open Observations

None. No ambiguous language-related structures were identified.
