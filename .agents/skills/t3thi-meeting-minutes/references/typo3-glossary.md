# TYPO3 Translation Handling – Domain Glossary

This glossary provides context for recurring TYPO3 concepts discussed in T3THI
meetings. Use it to verify terminology and understand the domain when
processing transcripts.

## Core Concepts

| Term | Explanation |
|------|-------------|
| T3THI | Abbreviation for **TYPO3 Translation Handling Initiative** — the team producing these meeting minutes. |
| `sys_language_uid` | Database field that stores the language identifier of a record. Central to TYPO3's current translation model. |
| `sys_language_uid = -1` | Special value meaning "all languages". The initiative aims to eliminate this. |
| `sys_language_uid = 0` | Represents the default language. The initiative questions whether a special value for the default is necessary. |
| `l10n_parent` | Field pointing to the default-language parent record of a translation. |
| `l10n_source` | Field pointing to the record a translation was originally created from. |
| `l10n_state` | JSON field tracking per-field synchronization state of a translation. |
| `l10n_mode` | TCA column property controlling localization behavior (`exclude`, `prefixLangTitle`). |
| `l10n_diffsource` | Field storing a snapshot of the parent record for diff comparison. |
| `t3_origuid` | Field storing the UID of the record from which the current one was originally copied. |
| `BCP 47` | IETF standard for language tags (e.g. `en-US`, `de-AT`). The initiative advocates adopting this. |
| TCA | Table Configuration Array — TYPO3's declarative schema for database tables. |
| DataHandler | Core PHP class responsible for creating, updating, and deleting records. |
| PageRepository | Core class responsible for fetching page records with language overlay logic. |
| ContentObjectRenderer | Core class rendering content objects in the frontend. |
| LanguageAspectFactory | Factory class creating LanguageAspect objects from site configuration. |
| L10n Manager | A TYPO3 extension for managing localization workflows. |
| Free mode | A translation mode where translated content is independent of the default language structure. |
| Connected mode | A translation mode where translations are linked to a default-language parent. |
| Mixed mode | A state where Free and Connected mode elements coexist on the same page — generally undesirable. |
| Default Language Binding | TYPO3 v14 behavior where the Content Layout Module binds translated content to default-language columns. |
| Fallback | Mechanism to display default-language content when a translation is missing. |
| Strict mode | Frontend fallback type: only show content that exists in the requested language. |
| Fallback mode | Frontend fallback type: fall back to the default language or fallback chain when translation is missing. |
| Free fallback mode | Frontend mode allowing display of free-mode content independent of default language. |
| IRRE | Inline Relational Record Editing — TYPO3's mechanism for parent-child record relationships. |
| MM relation | Many-to-many database relation between records. |
| `allowLanguageSynchronization` | TCA field behavior enabling automatic sync of field values across translations. |
| `enforceLanguageSynchronization` | Planned replacement for `l10n_mode=exclude` — forces identical values. |
| TransFusion | Extension developed by Jo Hasenau for managing and repairing translation connections. |
| Shadow records | Proposed concept where adding content in one language automatically creates placeholder records in other languages. |
| `isLanguageAllRecord` | Proposed boolean field to replace `language = -1` mechanism. |

## Infrastructure & Tools

| Term | Explanation |
|------|-------------|
| Gerrit | TYPO3's code review platform at `review.typo3.org`. |
| Forge | TYPO3's issue tracker at `forge.typo3.org`. |
| HedgeDoc | Collaborative Markdown editor used for meeting notes (`notes.typo3.org`). |
| Slack Huddle | Voice/video call within a Slack channel — the T3THI meeting venue. |
| DevDays (T3DD) | Annual TYPO3 Developer Days conference. |
| TYPO3 Camp Mitteldeutschland (T3CMD) | Regional TYPO3 camp event. |
| TYPO3 Camp RheinRuhr | Regional TYPO3 camp event. |
| TYPO3 Camp München (T3CM) | Regional TYPO3 camp event in Munich. |
| `EXT:dbdoctor` | Extension by Lolli (Christian Kuhn) for detecting and fixing database inconsistencies. |
| `EXT:translation-handling` | T3THI's testing extension for reproducing translation scenarios. |
| `EXT:autotranslate` | DeepL translation extension for TYPO3. |
| `EXT:wv_deepltranslate` | WebVision's DeepL translation extension for TYPO3. |
| `@channel` | Slack notification that pings all members of a channel. |
| DDEV | Local Docker-based development environment for TYPO3. |
| OBS Studio | Open Broadcaster Software — used to record meetings. |
| Noota | Transcription service used for meeting recordings. |

## Organisations & Roles

| Term | Explanation |
|------|-------------|
| TYPO3 Association | The non-profit organization behind TYPO3. Manages budgets and strategic direction. |
| TYPO3 GmbH | The commercial entity offering TYPO3 Enterprise services. |
| BCC | Budget Committee / Board oversight body. |
| Community Budget | A quarterly allocation (~€10,000) for community-proposed projects, voted on by members. |
| Core Team | The group of developers with merge rights to the TYPO3 Core repository. |
| InnoCoding | Jo Hasenau's company, specializing in funding acquisition. |

## Recurring Patch & Issue References

These patches, PRs, and issues are frequently discussed. If the transcript
mentions them, link to the correct URL.

| Short Name | URL |
|------------|-----|
| Copy content patch (#92580) | https://review.typo3.org/c/Packages/TYPO3.CMS/+/92580 |
| Free-mode content patch (#92585) | https://review.typo3.org/c/Packages/TYPO3.CMS/+/92585 |
| dbdoctor PR #171 | https://github.com/lolli42/dbdoctor/pull/171 |
| André's test patch (#83632) | https://review.typo3.org/c/Packages/TYPO3.CMS/+/83632 |
| André's test patch (#83310) | https://review.typo3.org/c/Packages/TYPO3.CMS/+/83310 |
| Language -1 sorting tests (#85912) | https://review.typo3.org/c/Packages/TYPO3.CMS/+/85912 |
| Schema API for TCA (#75486) | https://review.typo3.org/c/Packages/TYPO3.CMS/+/75486 |
| Benni's locale extension | https://github.com/bmack/locale/ |
| Translation Handling Extension | https://github.com/t3thi/translation-handling |
| Forge ticket #108358 | https://forge.typo3.org/issues/108358 |
| Forge ticket #102345 | https://forge.typo3.org/issues/102345 |
| Forge ticket #103814 | https://forge.typo3.org/issues/103814 |
