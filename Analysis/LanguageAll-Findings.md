# Translation Handling Initiative – Patch Findings (-1 Language Handling)

**Reference commit (HEAD):** `2925d44512d4dab4523451589defef339e6b662a`

This table lists **each changed line** from the supplied diff (`current-state.diff`) that is related to the patch introducing marker comments for `sys_language_uid = -1` / LanguageAll handling.

**Changed files:** 48
**Changed lines (entries):** 82

## Findings

| ID | File | Line | Manual review | Test coverage | Valid case | Comments |
|---|---|---:|:---:|:---:|:---:|:---:|
| F-0001 | `typo3/sysext/backend/Classes/Configuration/TranslationConfigurationProvider.php` | +41 | [ ] | [ ] | [ ] |
| F-0002 | `typo3/sysext/backend/Classes/Configuration/TranslationConfigurationProvider.php` | +188 | [ ] | [ ] | [ ] |
| F-0003 | `typo3/sysext/backend/Classes/ContextMenu/ItemProviders/PageProvider.php` | +273 | [ ] | [ ] | [ ] |
| F-0004 | `typo3/sysext/backend/Classes/ContextMenu/ItemProviders/PageProvider.php` | +327 | [ ] | [ ] | [ ] |
| F-0005 | `typo3/sysext/backend/Classes/ContextMenu/ItemProviders/PageProvider.php` | +349 | [ ] | [ ] | [ ] |
| F-0006 | `typo3/sysext/backend/Classes/Controller/PageLayoutController.php` | +624 | [ ] | [ ] | [ ] |
| F-0007 | `typo3/sysext/backend/Classes/Controller/Wizard/LocalizationController.php` | +252 | [ ] | [ ] | [ ] |
| F-0008 | `typo3/sysext/backend/Classes/Controller/Wizard/LocalizationController.php` | +304 | [ ] | [ ] | [ ] |
| F-0009 | `typo3/sysext/backend/Classes/Domain/Repository/Localization/LocalizationRepository.php` | +74 | [ ] | [ ] | [ ] |
| F-0010 | `typo3/sysext/backend/Classes/Form/FormDataProvider/TcaLanguage.php` | +103 | [ ] | [ ] | [ ] |
| F-0011 | `typo3/sysext/backend/Classes/Form/FormDataProvider/TcaLanguage.php` | +112 | [ ] | [ ] | [ ] |
| F-0012 | `typo3/sysext/backend/Classes/LinkHandler/PageLinkHandler.php` | +173 | [ ] | [ ] | [ ] |
| F-0013 | `typo3/sysext/backend/Classes/RecordList/DatabaseRecordList.php` | +2567 | [ ] | [ ] | [ ] |
| F-0014 | `typo3/sysext/backend/Classes/RecordList/DatabaseRecordList.php` | +2592 | [ ] | [ ] | [ ] |
| F-0015 | `typo3/sysext/backend/Classes/View/BackendLayout/ContentFetcher.php` | +86 | [ ] | [ ] | [ ] |
| F-0016 | `typo3/sysext/backend/Classes/View/BackendLayout/ContentFetcher.php` | +157 | [ ] | [ ] | [ ] |
| F-0017 | `typo3/sysext/backend/Classes/View/BackendLayout/ContentFetcher.php` | +166 | [ ] | [ ] | [ ] |
| F-0018 | `typo3/sysext/backend/Classes/View/PageLayoutContext.php` | +212 | [ ] | [ ] | [ ] |
| F-0019 | `typo3/sysext/core/Classes/Authentication/BackendUserAuthentication.php` | +627 | [ ] | [ ] | [ ] |
| F-0020 | `typo3/sysext/core/Classes/Configuration/Tca/TcaEnrichment.php` | +241 | [ ] | [ ] | [ ] |
| F-0021 | `typo3/sysext/core/Classes/Configuration/Tca/TcaPreparation.php` | +92 | [ ] | [ ] | [ ] |
| F-0022 | `typo3/sysext/core/Classes/DataHandling/DataHandler.php` | +3261 | [ ] | [ ] | [ ] |
| F-0023 | `typo3/sysext/core/Classes/DataHandling/Localization/DataMapProcessor.php` | +212 | [ ] | [ ] | [ ] |
| F-0024 | `typo3/sysext/core/Classes/DataHandling/SlugHelper.php` | +458 | [ ] | [ ] | [ ] |
| F-0025 | `typo3/sysext/core/Classes/DataHandling/SlugHelper.php` | +467 | [ ] | [ ] | [ ] |
| F-0026 | `typo3/sysext/core/Classes/Domain/Repository/PageRepository.php` | +691 | [ ] | [ ] | [ ] |
| F-0027 | `typo3/sysext/core/Classes/Resource/Index/MetaDataRepository.php` | +106 | [ ] | [ ] | [ ] |
| F-0028 | `typo3/sysext/core/Configuration/TCA/Overrides/pages.php` | +24 | [ ] | [ ] | [ ] |
| F-0029 | `typo3/sysext/core/Tests/Functional/Configuration/FlexForm/FlexFormToolsTest.php` | +1420 | [ ] | [ ] | [ ] |
| F-0030 | `typo3/sysext/core/Tests/Functional/Configuration/FlexForm/FlexFormToolsTest.php` | +1433 | [ ] | [ ] | [ ] |
| F-0031 | `typo3/sysext/core/Tests/Functional/DataHandling/Slug/SlugHelperUniqueWithLanguageTest.php` | +86 | [ ] | [ ] | [ ] |
| F-0032 | `typo3/sysext/core/Tests/Functional/DataScenarios/Regular/AbstractActionTestCase.php` | +83 | [ ] | [ ] | [ ] |
| F-0033 | `typo3/sysext/core/Tests/Functional/DataScenarios/Regular/AbstractActionTestCase.php` | +123 | [ ] | [ ] | [ ] |
| F-0034 | `typo3/sysext/core/Tests/Functional/DataScenarios/Regular/AbstractActionTestCase.php` | +180 | [ ] | [ ] | [ ] |
| F-0035 | `typo3/sysext/core/Tests/Functional/Fixtures/Extensions/test_mm/Configuration/TCA/Overrides/tt_content.php` | +11 | [ ] | [ ] | [ ] |
| F-0036 | `typo3/sysext/core/Tests/Functional/Fixtures/Extensions/test_mm/Configuration/TCA/Overrides/tt_content.php` | +28 | [ ] | [ ] | [ ] |
| F-0037 | `typo3/sysext/core/Tests/Functional/Fixtures/Extensions/test_mm/Configuration/TCA/tx_test_mm.php` | +70 | [ ] | [ ] | [ ] |
| F-0038 | `typo3/sysext/core/Tests/Functional/Fixtures/Extensions/test_mm/Configuration/TCA/tx_test_mm.php` | +108 | [ ] | [ ] | [ ] |
| F-0039 | `typo3/sysext/core/Tests/Unit/Configuration/Tca/TcaPreparationTest.php` | +79 | [ ] | [ ] | [ ] |
| F-0040 | `typo3/sysext/core/Tests/Unit/Configuration/Tca/TcaPreparationTest.php` | +170 | [ ] | [ ] | [ ] |
| F-0041 | `typo3/sysext/core/Tests/Unit/Configuration/Tca/TcaPreparationTest.php` | +208 | [ ] | [ ] | [ ] |
| F-0042 | `typo3/sysext/extbase/Classes/DomainObject/AbstractDomainObject.php` | +56 | [ ] | [ ] | [ ] |
| F-0043 | `typo3/sysext/extbase/Classes/Persistence/Generic/Mapper/DataMapper.php` | +483 | [ ] | [ ] | [ ] |
| F-0044 | `typo3/sysext/extbase/Classes/Persistence/Generic/Storage/Typo3DbQueryParser.php` | +737 | [ ] | [ ] | [ ] |
| F-0045 | `typo3/sysext/extbase/Classes/Persistence/Generic/Storage/Typo3DbQueryParser.php` | +745 | [ ] | [ ] | [ ] |
| F-0046 | `typo3/sysext/extbase/Classes/Persistence/Generic/Storage/Typo3DbQueryParser.php` | +766 | [ ] | [ ] | [ ] |
| F-0047 | `typo3/sysext/extbase/Tests/Functional/Persistence/AddTest.php` | +76 | [ ] | [ ] | [ ] |
| F-0048 | `typo3/sysext/extbase/Tests/Functional/Persistence/Generic/Storage/Typo3DbQueryParserTest.php` | +214 | [ ] | [ ] | [ ] |
| F-0049 | `typo3/sysext/extbase/Tests/Functional/Persistence/Generic/Storage/Typo3DbQueryParserTest.php` | +238 | [ ] | [ ] | [ ] |
| F-0050 | `typo3/sysext/extbase/Tests/Functional/Persistence/Generic/Storage/Typo3DbQueryParserTest.php` | +258 | [ ] | [ ] | [ ] |
| F-0051 | `typo3/sysext/filelist/Classes/FileList.php` | +639 | [ ] | [ ] | [ ] |
| F-0052 | `typo3/sysext/filelist/Classes/FileList.php` | +1237 | [ ] | [ ] | [ ] |
| F-0053 | `typo3/sysext/frontend/Classes/Category/Collection/CategoryCollection.php` | +140 | [ ] | [ ] | [ ] |
| F-0054 | `typo3/sysext/frontend/Classes/ContentObject/ContentObjectRenderer.php` | +4925 | [ ] | [ ] | [ ] |
| F-0055 | `typo3/sysext/frontend/Classes/ContentObject/ContentObjectRenderer.php` | +4952 | [ ] | [ ] | [ ] |
| F-0056 | `typo3/sysext/frontend/Tests/Functional/Rendering/LocalizedSiteContentRenderingTest.php` | +75 | [ ] | [ ] | [ ] |
| F-0057 | `typo3/sysext/impexp/Classes/Export.php` | +199 | [ ] | [ ] | [ ] |
| F-0058 | `typo3/sysext/impexp/Classes/Export.php` | +260 | [ ] | [ ] | [ ] |
| F-0059 | `typo3/sysext/impexp/Classes/Export.php` | +552 | [ ] | [ ] | [ ] |
| F-0060 | `typo3/sysext/impexp/Classes/Import.php` | +980 | [ ] | [ ] | [ ] |
| F-0061 | `typo3/sysext/impexp/Classes/Import.php` | +1052 | [ ] | [ ] | [ ] |
| F-0062 | `typo3/sysext/impexp/Classes/Import.php` | +1097 | [ ] | [ ] | [ ] |
| F-0063 | `typo3/sysext/impexp/Classes/View/ExportPageTreeView.php` | +53 | [ ] | [ ] | [ ] |
| F-0064 | `typo3/sysext/indexed_search/Classes/Domain/Repository/IndexSearchRepository.php` | +803 | [ ] | [ ] | [ ] |
| F-0065 | `typo3/sysext/linkvalidator/Classes/LinkAnalyzer.php` | +225 | [ ] | [ ] | [ ] |
| F-0066 | `typo3/sysext/linkvalidator/Classes/QueryRestrictions/EditableRestriction.php` | +245 | [ ] | [ ] | [ ] |
| F-0067 | `typo3/sysext/linkvalidator/Classes/QueryRestrictions/EditableRestriction.php` | +246 | [ ] | [ ] | [ ] |
| F-0068 | `typo3/sysext/linkvalidator/Classes/Result/LinkAnalyzerResult.php` | +210 | [ ] | [ ] | [ ] |
| F-0069 | `typo3/sysext/linkvalidator/Classes/Result/LinkAnalyzerResult.php` | +211 | [ ] | [ ] | [ ] |
| F-0070 | `typo3/sysext/linkvalidator/ext_tables.sql` | +6 | [ ] | [ ] | [ ] |
| F-0071 | `typo3/sysext/rte_ckeditor/Classes/Form/Element/RichTextElement.php` | +281 | [ ] | [ ] | [ ] |
| F-0072 | `typo3/sysext/seo/Classes/HrefLang/HrefLangGenerator.php` | +62 | [ ] | [ ] | [ ] |
| F-0073 | `typo3/sysext/seo/Classes/HrefLang/HrefLangGenerator.php` | +117 | [ ] | [ ] | [ ] |
| F-0074 | `typo3/sysext/seo/Classes/Widgets/Provider/PagesWithoutDescriptionDataProvider.php` | +56 | [ ] | [ ] | [ ] |
| F-0075 | `typo3/sysext/seo/Classes/XmlSitemap/RecordsXmlSitemapDataProvider.php` | +78 | [ ] | [ ] | [ ] |
| F-0076 | `typo3/sysext/workspaces/Classes/Controller/ReviewController.php` | +192 | [ ] | [ ] | [ ] |
| F-0077 | `typo3/sysext/workspaces/Classes/Service/WorkspaceService.php` | +267 | [ ] | [ ] | [ ] |
| F-0078 | `typo3/sysext/workspaces/Classes/Service/WorkspaceService.php` | +331 | [ ] | [ ] | [ ] |
| F-0079 | `typo3/sysext/workspaces/Classes/Service/WorkspaceService.php` | +391 | [ ] | [ ] | [ ] |
| F-0080 | `typo3/sysext/workspaces/Classes/Service/WorkspaceService.php` | +452 | [ ] | [ ] | [ ] |
| F-0081 | `typo3/sysext/workspaces/Classes/Service/WorkspaceService.php` | +712 | [ ] | [ ] | [ ] |
| F-0082 | `typo3/sysext/workspaces/Classes/Service/WorkspaceService.php` | +837 | [ ] | [ ] | [ ] |
