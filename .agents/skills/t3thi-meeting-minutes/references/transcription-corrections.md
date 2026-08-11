# Transcription Corrections

Audio-to-text transcription frequently misrecognizes TYPO3-specific terms,
personal names, and community jargon. Apply **all** corrections below
whenever the erroneous form appears in the transcript.

For project-specific vocabulary, also apply
[`references/vocabulary.md`](vocabulary.md).

Priority order if mappings overlap:
1. `explicit` mappings from `references/vocabulary.md`
2. Mandatory/context-aware mappings in this file
3. `phonetic` mappings from `references/vocabulary.md`

## Mandatory Corrections — Personal Names

| Transcription Error | Correct Form | Notes |
|---------------------|-------------|-------|
| Daniel Selinski | Daniel Zielinski | |
| Timmick / Timmek / Timmig / Timek | Tymek | Nickname for Tymoteusz Motylewski |
| Beni | Benni | Benni Mack |
| Luisa | Luisa Sofie Faßbender | Only if clearly referencing this person |
| Oliver Hader / Oli | Oliver Hader | Core developer, not initiative member |

## Mandatory Corrections — TYPO3 Terms

| Transcription Error | Correct Form | Notes |
|---------------------|-------------|-------|
| LZN-Manager / L-Z-N Manager | L10n Manager | Localization Manager extension |
| DVDs / Dev-Days | DevDays | TYPO3 Developer Days event |
| Developer Days | DevDays | When referring to the TYPO3 event specifically |
| Surf Camp | TYPO3 Surf Camp | Community event |
| Camp Mitteldeutschland | TYPO3 Camp Mitteldeutschland | Regional camp event |
| Data Handler / Datahandler | DataHandler | TYPO3 Core class name |
| Page Repository / Pagerepository | PageRepository | TYPO3 Core class name |
| Content Object Renderer | ContentObjectRenderer | TYPO3 Core class name |
| Language Aspect Factory | LanguageAspectFactory | TYPO3 Core class name |
| Typo3 DB Query Parser | Typo3DbQueryParser | Extbase class |
| Site Configuration | site configuration | Lowercase in prose, backticks when referring to the YAML file |
| Theme Camino | `theme-camino` | TYPO3 site package |
| Styleguide | styleguide | TYPO3 testing extension |

## Mandatory Corrections — Slack & Tooling

| Transcription Error | Correct Form | Notes |
|---------------------|-------------|-------|
| Paddel / Pedal / Hydel / Hodel | Huddle | Slack voice call feature |
| Ad-Channel / At-Channel | @channel | Slack notification |
| Hedge Doc / Hedgedoc | HedgeDoc | Collaborative notes platform |
| Noota | Noota | Transcription service (correct as-is) |
| OBS | OBS Studio | Recording software (correct as-is) |
| Gerrit | Gerrit | Already correct — TYPO3 code review |
| Forge | Forge | Already correct — TYPO3 issue tracker |

## Mandatory Corrections — Standards & Concepts

| Transcription Error | Correct Form | Notes |
|---------------------|-------------|-------|
| BCP47 / BCP 47 | `BCP 47` | Language tag standard; use backticks |
| XLIFF / XLF | XLIFF | XML Localization Interchange File Format |
| Transfusion | TransFusion | Initiative's extension for managing translation connections |
| db doctor / DB Doctor | `EXT:dbdoctor` | Lolli's database cleanup extension |
| deep L / Deep-L | DeepL | Translation service |

## Context-Aware Corrections

Apply these only when the context clearly indicates the TYPO3/technical meaning:

| Transcription Error | Correct Form | When to correct |
|---------------------|-------------|-----------------|
| T-3 / Type-O-3 / Tippo 3 | TYPO3 | When referring to the CMS |
| T3 THI / T-3-THI | T3THI | TYPO3 Translation Handling Initiative |
| Sys-Language / sis language | `sys_language_uid` | When discussing the database field |
| L-ten-N / Ellen | `l10n` | When discussing localization fields |
| L-ten-N parent | `l10n_parent` | Localization parent field |
| L-ten-N source | `l10n_source` | Localization source field |
| L-ten-N state | `l10n_state` | Localization state field |
| L-ten-N mode | `l10n_mode` | Localization mode TCA config |
| L-ten-N diff source | `l10n_diffsource` | Diff tracking field |
| T3 orig uid | `t3_origuid` | Original UID field |
| TCA | TCA | Already correct — ensure uppercase |
| IRRE | IRRE | Inline Relational Record Editing |
| MM | MM | Many-to-many relation |
| CSP | CSP | Content Security Policy |
| DDEV | DDEV | Local development environment |

## General Guidance

- If a word sounds like a TYPO3 technical term but does not appear in the
  table above, verify it against common TYPO3 Core terminology before
  including it. When in doubt, flag it for the user.
- Personal names not listed here should be kept as transcribed unless clearly
  garbled. Ask the user if unsure.
- Non-English content (German is the meeting language) must be **translated to
  English** for the protocol. Never leave German text in the output.
- German compound nouns used as technical jargon (e.g. "Ist-Zustand") may be
  kept in the original if commonly used in the English protocol context, but
  should be italicized: *Ist-Zustand*.
