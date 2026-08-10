# Core code validation for the T3DD26 presentation

## Validation basis

| Item | Value |
|---|---|
| Repository | [TYPO3/typo3](https://github.com/TYPO3/typo3) |
| Commit | [`ee251c96d55b6e609a77334324be0b91bb0839e5`](https://github.com/TYPO3/typo3/tree/ee251c96d55b6e609a77334324be0b91bb0839e5) |
| Commit date | 7 August 2026 |
| Validation date | 8 August 2026 |
| Scope | Current implementation statements used by the presentation |

The commit hash is part of every code citation. This keeps the presentation evidence stable even if the main branch changes.

## Validated claim register

| ID | Current state claim | Direct code evidence | Used on |
|---|---|---|---|
| C01 | Language aware tables name a language field and translation origin pointer in TCA. | [TCA enrichment](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Configuration/Tca/TcaEnrichment.php#L185-L247) | M06, M18 |
| C02 | Pages use `sys_language_uid`, `l10n_parent` and `l10n_source`. | [Pages TCA](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Configuration/TCA/pages.php#L18-L21) | M06, M14 |
| C03 | Content elements use `sys_language_uid`, `l18n_parent` and `l10n_source`. | [tt_content TCA](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/frontend/Configuration/TCA/tt_content.php#L19-L24) | M06, M14 |
| C04 | FormEngine adds minus one as the all languages option for TCA records except pages. | [TcaLanguage provider](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/Form/FormDataProvider/TcaLanguage.php#L132-L147) | M06, M08, M09 |
| C05 | Pages do not allow minus one in the language field. | [Pages override](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Configuration/TCA/Overrides/pages.php#L19-L24) | M08 |
| C06 | All languages records are excluded from page layout translation candidates. | [ContentFetcher](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/View/BackendLayout/ContentFetcher.php#L155-L168) | M09, M16 |
| C07 | Routing aspect lookup starts with minus one, then the current language, then configured fallbacks. | [SiteLanguageAccessorTrait](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Routing/Aspect/SiteLanguageAccessorTrait.php#L58-L78) | M14, M15 |
| C08 | Slug collision checks include all languages records beside a requested positive language. | [SlugHelper](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/DataHandling/SlugHelper.php#L448-L478) | M16 |
| C09 | A positive origin pointer is connected mode. A zero origin pointer is free mode. Both together produce mixed mode. | [ContentFetcher](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/View/BackendLayout/ContentFetcher.php#L165-L203) | M04, M06, M11, M14 |
| C10 | The page layout exposes connected, free and mixed labels. | [PageLayoutContext](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/View/PageLayoutContext.php#L268-L291) | M04, M11 |
| C11 | Only fields with `allowLanguageSynchronization` participate in localization state. | [Localization State](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/DataHandling/Localization/State.php#L71-L97) | M06, M09, M10 |
| C12 | The valid field states are parent, source and custom. | [Localization State constants](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/DataHandling/Localization/State.php#L29-L39) | M06, M09, M10 |
| C13 | A missing or invalid configured field state becomes parent. | [State enrichment](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/DataHandling/Localization/State.php#L222-L238) | M06, M09, M10 |
| C14 | The default schema adds the `l10n_state` column to language aware tables. | [DefaultTcaSchema](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Database/Schema/DefaultTcaSchema.php#L366-L377) | M06, M09, M10 |
| C15 | PageContext carries validated selected language IDs. | [PageContext](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/Context/PageContext.php#L53-L73) | M12 |
| C16 | The Page and List modules use a shared language selector with single and multiple selection modes. | [LanguageSelectorBuilder](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/Template/Components/Buttons/LanguageSelectorBuilder.php#L25-L50) | M12 |
| C17 | Language selection is validated against translations that exist on the current page and falls back to zero when none remain. | [PageContextFactory](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/Context/PageContextFactory.php#L104-L165) | M12 |
| C18 | Page layout comparison returns the default language first and selected positive language IDs after it. | [PageLayoutContext](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/View/PageLayoutContext.php#L169-L201) | M12, M13 |
| C19 | SiteLanguage stores an integer ID, Locale, fallback type and fallback language IDs as distinct properties. | [SiteLanguage](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Site/Entity/SiteLanguage.php#L26-L156) | M06, M08, M15 |
| C20 | Site configuration offers strict, fallback and free modes. | [Site language TCA](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Configuration/SiteConfiguration/site_language.php#L121-L143) | M06, M14, M15 |
| C21 | LanguageAspectFactory maps strict to `includeFloating`, fallback to `mixed` and free to `off`. | [LanguageAspectFactory](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Context/LanguageAspectFactory.php#L27-L60) | M06, M14, M15 |
| C22 | LanguageAspect carries language ID, content ID, overlay type and fallback chain. | [LanguageAspect](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Context/LanguageAspect.php#L53-L108) | M06, M14, M15 |
| C23 | DataHandler requires a language aware schema to localize a record. | [DataHandler localization preconditions](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/DataHandling/DataHandler.php#L4736-L4762) | M16, M18 |
| C24 | DataHandler validates the target SiteLanguage and writes language and parent relation values. | [DataHandler validation](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/DataHandling/DataHandler.php#L4786-L4808), [DataHandler relation values](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/DataHandling/DataHandler.php#L4830-L4844) | M16, M18 |
| C25 | For the recognized fallback types, LanguageAspectFactory uses the configured fallback IDs and appends `pageNotFound`. It does not automatically append language zero. | [LanguageAspectFactory](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Context/LanguageAspectFactory.php#L27-L60) | M05, M15 |

## Presentation synthesis

The presentation does not describe current Core as one data model. It groups the verified implementation into five interacting contracts:

1. Site language configuration and record language values
2. Translation relation and Page module mode
3. Field synchronization state
4. Backend language selection
5. Frontend fallback policy

This grouping is an explanatory structure. Each member is backed by a distinct current Core API or data contract.

## Claims intentionally excluded as current Core behavior

The following topics may appear on `Vision` or `Open` slides, but are not shown as current Core behavior:

- BCP 47 as the persisted record language identity
- Removal or replacement of the all languages value
- A Boolean all languages synchronization intent
- Hidden, shadow or neutral structure layers
- A new Editing Language product model
- Per-position intent that distinguishes a missing translation from an intentional omission during fallback
- A migration sequence or release roadmap
- A selected future translation architecture

This separation prevents discussion artifacts or possible directions from being presented as implemented facts.

## Revalidation rule

Before changing a visible factual statement:

1. Identify the affected claim ID.
2. Verify the implementation in the intended Core target commit.
3. Update the immutable online link.
4. Update the editorial Markdown and rendered slide together.
5. Keep interpretation in speaker notes when the visible statement does not need it.
