# T3DD26 slide content

## Editorial contract

This file is the shared source for content review before approved changes are transferred to the Reveal presentation.

- Talk: **Translation Handling in TYPO3: Where We Are and Where We Could Go**
- Slot: **8 August 2026, 14:00 to 14:30, Campfire Room**
- Main deck: **19 slides, 28 minutes, 2 minutes buffer**
- Backup slides: **none**
- Language: **English**
- Audience: TYPO3 users who do not need prior initiative knowledge
- Sources: absolute online sources only
- Status vocabulary: `Current`, `Problem`, `Vision`, `Open`, `In Progress`
- Content rule: every technical term is defined by the concrete question it answers
- Language rule: no em dashes and no exaggerated claims

The session contract is available on the [official T3DD26 schedule](https://t3dd.typo3.com/schedule/sessions/translation-handling-in-typo3-where-we-are-and-where-we-could-go-1203).

## Main slide M01: Session promise

- **Reveal ID:** `session-promise`
- **Timing:** `00:00 to 00:35`
- **Status:** `Current`
- **Purpose:** State the topic without introducing a technical model.

### Visible slide copy

> T3DD26 · Eric Harrer  
> **Translation Handling in TYPO3**  
> Where we are and where we could go

### Layout intent

Large title, one subtitle and the subtle background circle.

### Speaker notes

The talk covers current pain points, the direction envisioned by the Translation Handling Initiative and concrete next steps. Open architecture is not presented as a committed Core roadmap.

### Sources

- [Official T3DD26 session description](https://t3dd.typo3.com/schedule/sessions/translation-handling-in-typo3-where-we-are-and-where-we-could-go-1203)

**Boundary:** Current behavior, vision, open questions and active work stay distinct.

## Main slide M02: Overview

- **Reveal ID:** `overview`
- **Timing:** `00:35 to 01:15`
- **Status:** `Current`
- **Purpose:** Give the audience the complete route before any detail.

### Visible slide copy

> Overview  
> **Three gaps, four responsibilities, one path**  
> 1 · Where we are · current behavior and missing case  
> 2 · What we separate · four explicit responsibilities  
> 3 · Where we could go · identity, sync, structure, output  
> 4 · How we proceed · evidence, cooperation, next steps

### Layout intent

Four numbered rows. Each row names one part of the talk and its concrete content.

### Speaker notes

Start with the product gap and current behavior. Then separate the problem into four responsibilities. Follow those responsibilities in the same order when discussing future directions. Close with current work, cooperation and a controlled next path.

### Sources

- [Official T3DD26 session description](https://t3dd.typo3.com/schedule/sessions/translation-handling-in-typo3-where-we-are-and-where-we-could-go-1203)

**Boundary:** This is an explanatory order, not an approved implementation sequence.

## Main slide M03: Who we are

- **Reveal ID:** `who-we-are`
- **Timing:** `01:15 to 02:00`
- **Status:** `Current`
- **Purpose:** Introduce the initiative by its work and audience.

### Visible slide copy

> Current  
> **Who we are**  
> Translation Handling Initiative  
> Listen · project use cases  
> Verify · Core behavior  
> Contribute · focused changes  
> Editors · integrators · developers · translators

### Layout intent

The initiative name leads. Three columns describe the work. The target groups close the slide.

### Speaker notes

The initiative combines project experience and Core contribution. Its purpose is to simplify, improve and professionalize translation handling for the listed user groups.

### Sources

- [Translation Handling Initiative application](https://notes.typo3.org/s/pM80pPOyR)
- [TYPO3 Camp RheinRuhr 2024 presentation](https://notes.typo3.org/n2MVukjgQleQGO7bObL4lw)
- [T3THI documentation repository](https://github.com/t3thi/Documentation)

**Boundary:** The proposed TYPO3 Unit model may change the organizational label, not this working purpose.

## Main slide M04: The missing middle case

- **Reveal ID:** `middle-case`
- **Timing:** `02:00 to 03:30`
- **Status:** `Problem`
- **Purpose:** Establish the product case that guides every later model.

### Visible slide copy

> Problem  
> **The missing case sits in the middle**  
> identical · reduced · enriched · changed · independent  
> Mostly connected, selectively different

### Layout intent

One spectrum. `enriched` receives the only emphasis.

### Speaker notes

TYPO3 handles identical translated structures and independent structures. The gap appears when a language variant shares most of a structure but needs one local addition or omission. Today this may require Mixed Mode, loss of the connection or an artificial default language partner.

### Sources

- [T3THI minutes, 26 June 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/06/26.md#L31-L96)
- [T3THI minutes, 10 July 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/07/10.md#L34-L58)

**Boundary:** Free Mode remains a valid endpoint. Its deprecation is not established.

## Main slide M05: Three project cases

- **Reveal ID:** `use-cases`
- **Timing:** `03:30 to 05:00`
- **Status:** `Problem`
- **Purpose:** Separate the structural, identity and output gaps behind three valid use cases.

### Visible slide copy

> Problem  
> **Three use cases reveal three different gaps**  
> Local addition · Content only in the target language · Gap: Connected Mode requires a default partner  
> Global storage · Shared records across sites · Gap: Numeric IDs have only site-local meaning  
> Regional fallback · en-GB may reuse en, not de · Gap: One chain cannot express per-position intent

### Layout intent

Three equal columns. Each names the use case, need and distinct gap.

### Speaker notes

The local-addition gap is structural: Connected Mode expects a target-language record to have a default-language partner. The global-storage gap is identity: numeric language IDs are configured per site. The regional-fallback gap is output policy: one configured chain does not say whether a missing position should continue through fallback or remain intentionally absent.

### Sources

- [T3THI minutes, 29 May 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/05/29.md#L23-L61)
- [Global storage case](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/06/26.md#L56-L62)
- [Cross-site language case](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/07/24.md#L19-L25)
- [Current relation modes](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/View/BackendLayout/ContentFetcher.php#L165-L203)
- [Current site language properties](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Site/Entity/SiteLanguage.php#L110-L156)
- [Current fallback mapping](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Context/LanguageAspectFactory.php#L27-L60)

**Boundary:** Each case exposes a distinct gap. The examples do not imply one shared implementation defect.

## Main slide M06: Current overlap

- **Reveal ID:** `contract-overlap`
- **Timing:** `05:00 to 06:30`
- **Status:** `Current`
- **Purpose:** Show how several current contracts contribute to the four questions.

### Visible slide copy

> Current · Interacting contracts  
> **Four questions use different contracts**  
> Language identity · Site config maps IDs to languages · `0 default · −1 all`  
> Synchronization intent · Which fields or records stay in sync? · `l10n_state · −1`  
> Structural identity · Do records belong together? If so, which ones? · `l10n_parent · mode`  
> Output policy · Which records may render? · `fallbackType · fallbacks`

### Layout intent

Four rows with responsibility, concrete question and current representation.

### Speaker notes

Current Core does not answer the questions with one model. Site configuration maps numeric IDs to languages. Zero additionally denotes the default language and structural source. Minus one denotes one record for all languages. Localization state controls selected fields. Origin pointers and Page module modes describe record relations. Site fallback type and fallback IDs control frontend selection.

### Sources

- [Current site language configuration](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Site/Entity/SiteLanguage.php#L110-L156)
- [Current language values](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/Form/FormDataProvider/TcaLanguage.php#L83-L147)
- [Current field states](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/DataHandling/Localization/State.php#L29-L97)
- [Current relation modes](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/View/BackendLayout/ContentFetcher.php#L165-L203)
- [Current output mapping](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Context/LanguageAspectFactory.php#L27-L60)

**Boundary:** The four-row mapping is an explanatory decomposition, not one existing Core API or one data model.

## Main slide M07: Four responsibilities

- **Reveal ID:** `four-responsibilities`
- **Timing:** `06:30 to 09:00`
- **Status:** `Vision`
- **Purpose:** Define the four terms that organize the remaining talk.

### Visible slide copy

> Vision · Problem decomposition  
> **Separate four responsibilities**  
> 1 · Language identity · Which human language does this content represent?  
> 2 · Synchronization intent · Which fields or records stay in sync, and where may they differ?  
> 3 · Structural identity · Which records are the same logical node across languages?  
> 4 · Output policy · What should render when the requested variant is missing?  
> Make each contract explicit, then decide how the database represents it.

### Layout intent

Four equal columns. Each term is defined by a full question, so no initiative vocabulary is assumed.

### Speaker notes

Language identity names the human language. Synchronization intent states what remains aligned. Structural identity links the records that represent the same content position. Output policy decides what a request may render. The next slides keep this order.

### Sources

- [T3THI minutes, 8 May 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/05/08.md#L24-L64)
- [T3THI minutes, 11 June 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/06/11.md#L52-L80)
- [T3THI minutes, 26 June 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/06/26.md#L206-L224)

**Boundary:** This is a design decomposition, not a selected database model.

## Main slide M08: Language identity

- **Reveal ID:** `language-identity`
- **Timing:** `09:00 to 10:45`
- **Status:** `Vision`
- **Purpose:** Explain why a semantic language tag is needed across sites.

### Visible slide copy

> Vision · 1 Language identity  
> **Site language IDs have only local meaning**  
> Site A · ID 9 → **en-GB** ← Site B · ID 14  
> Direction: BCP 47 provides shared language identity.

### Layout intent

One mapping. The same BCP 47 tag explains the meaning of two local numbers.

### Speaker notes

Each site language has a configured integer ID. The same human language can therefore use different IDs in different sites. Zero also denotes the default language and translation source. Minus one is a special record value for all languages, not a human language. BCP 47 is the preferred semantic identity across sites and shared storage. Record storage, migration and the future role of numeric keys remain open.

### Sources

- [RFC 5646](https://www.rfc-editor.org/rfc/rfc5646)
- [TYPO3 Camp RheinRuhr 2024 presentation](https://notes.typo3.org/n2MVukjgQleQGO7bObL4lw)
- [T3THI minutes, 10 November 2023](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2023/11/2023-11-10.md#L30-L53)
- [T3THI minutes, 25 July 2025](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2025/07/2025-07-25.md#L22-L65)
- [Current SiteLanguage properties](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Site/Entity/SiteLanguage.php#L110-L156)
- [Special record language values](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/Form/FormDataProvider/TcaLanguage.php#L83-L147)

**Boundary:** BCP 47 is not current record storage in Core.

## Main slide M09: Synchronization rule

- **Reveal ID:** `sync-intent`
- **Timing:** `10:45 to 12:15`
- **Status:** `Vision`
- **Purpose:** Replace an artificial language value with a stated distribution rule.

### Visible slide copy

> Vision · 2 Synchronization intent  
> **All Languages becomes an explicit rule**  
> Today · one record labelled All Languages  
> Direction · one source + named targets · de · en · fr  
> Exact API and target set remain open

### Layout intent

One transition from the current representation to the functional direction.

### Speaker notes

Today one minus one record is both content and distribution rule. The direction makes that rule explicit and creates concrete language variants. The field contract, target set and provenance model are not defined Core APIs.

### Sources

- [T3THI minutes, 18 October 2024](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2024/10/2024-10-18.md#L21-L66)
- [T3THI minutes, 8 May 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/05/08.md#L24-L46)
- [T3THI minutes, 11 June 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/06/11.md#L62-L74)

**Boundary:** The replacement behavior is a direction. Its concrete Core contract is open.

## Main slide M10: Synchronization lifecycle

- **Reveal ID:** `sync-lifecycle`
- **Timing:** `12:15 to 13:45`
- **Status:** `Open`
- **Purpose:** Define the three moments that a synchronization feature must handle.

### Visible slide copy

> Open · 2 Synchronization intent  
> **Synchronization needs rules for start, change and stop**  
> Start · handle existing language versions  
> Change · define allowed local differences  
> Stop · keep, detach or delete generated versions  
> A flag alone is not enough

### Layout intent

Three explicit rows replace an abstract state diagram.

### Speaker notes

Starting synchronization must handle existing variants. While it is active, the system must know which local differences are allowed. Stopping it must define what happens to generated variants. Workspaces, restore, delete and references follow from these rules.

### Sources

- [T3THI minutes, 31 January 2025](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2025/01/2025-01-31.md#L35-L52)
- [T3THI minutes, 29 May 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/05/29.md#L39-L45)
- [T3THI minutes, 24 July 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/07/24.md#L59-L63)

**Boundary:** These lifecycle rules are unresolved.

## Main slide M11: Structural exceptions

- **Reveal ID:** `structural-exceptions`
- **Timing:** `13:45 to 15:30`
- **Status:** `Vision`
- **Purpose:** Make the need for target-language-only additions in Connected Mode explicit.

### Visible slide copy

> Vision · 3 Structural identity  
> **Connected Mode needs local additions**  
> Default language · A → B → C  
> Target language · A → B → C → Local  
> Need: add Local without a default-language placeholder

### Layout intent

Two aligned content sequences. Only the local element uses the accent.

### Speaker notes

In current Connected Mode, translated records point to a default-language record. A target-language-only record has no such parent and is treated as standalone content, which can create Free or Mixed Mode semantics. The requirement is to keep A, B and C connected while adding Local only in the target language, without creating an unused default-language placeholder. Free Mode remains suitable for strongly divergent structures.

### Sources

- [T3THI minutes, 26 June 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/06/26.md#L194-L214)
- [T3THI minutes, 29 May 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/05/29.md#L23-L61)
- [Current Connected, Free and Mixed Mode detection](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/View/BackendLayout/ContentFetcher.php#L165-L203)

**Boundary:** The mechanism that stores this relationship is not selected or implemented.

## Main slide M12: Editing Language

- **Reveal ID:** `editing-language`
- **Timing:** `15:30 to 17:00`
- **Status:** `Vision`
- **Purpose:** Show how an editor chooses the content language used as the source for translation work.

### Visible slide copy

> Vision · 3 Structural identity  
> **Editors choose the language they translate from**  
> Site default · German  
> Editing language · English  
> Translate into · Chinese  
> The editing view shows English instead of German as its source

### Layout intent

Three plain interface rows distinguish site default, editing source and target language.

### Speaker notes

Editing Language defines the content language from which an editor works. German remains the site default in this example, but a Chinese editor chooses English as the source for Chinese translations. The Page module would show English where it currently places the default language, so German text does not obstruct the workflow. Editing Language is separate from the backend user interface language.

### Sources

- [T3THI minutes, 8 May 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/05/08.md#L48-L68)
- [T3THI minutes, 29 May 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/05/29.md#L23-L61)

**Boundary:** Editing Language is a product direction, not a current Core feature.

## Main slide M13: Complete language layers

- **Reveal ID:** `language-layers`
- **Timing:** `17:00 to 19:00`
- **Status:** `Open`
- **Purpose:** Define a complete layer before discussing its tradeoff.

### Visible slide copy

> Open · 3 Structural identity  
> **A complete layer gives every language the same record positions**  
> Potential · missing positions are explicit · less runtime lookup  
> Cost · more records · more sync and workspace work  
> Direction: complete layers. Representation remains open.

### Layout intent

The definition is the title. Potential and cost receive equal visual weight.

### Speaker notes

A complete layer means that every language has a record position for the same logical structure. This can make missing content explicit and reduce runtime overlay cases. It also adds records and requires synchronization, workspace, reference and migration rules. The exact representation is not selected.

### Sources

- [TYPO3 Camp RheinRuhr 2024 presentation](https://notes.typo3.org/n2MVukjgQleQGO7bObL4lw)
- [T3THI minutes, 24 October 2025](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2025/10/2025-10-24.md#L45-L78)
- [T3THI minutes, 8 May 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/05/08.md#L40-L58)
- [T3THI minutes, 10 July 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/07/10.md#L50-L58)

**Boundary:** Complete layers are a direction. Their database representation and cost model remain open.

## Main slide M14: Output policy

- **Reveal ID:** `output-policy`
- **Timing:** `19:00 to 20:30`
- **Status:** `Current`
- **Purpose:** Separate the backend record relation from the frontend rendering decision.

### Visible slide copy

> Current · 4 Output policy  
> **Backend connection is not frontend fallback**  
> Backend · record → `l10n_parent` → relation  
> Frontend · request → fallback policy → output

### Layout intent

Two horizontal lanes with aligned terms.

### Speaker notes

The backend parent pointer says which records belong together. The site fallback configuration and LanguageAspect decide what the frontend renders. A connected record relation therefore does not define frontend output.

### Sources

- [Backend relation modes in Core](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/View/BackendLayout/ContentFetcher.php#L165-L203)
- [Frontend fallback mapping in Core](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Context/LanguageAspectFactory.php#L25-L60)
- [T3THI minutes, 15 December 2023](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2023/12/2023-12-15.md#L20-L104)

**Boundary:** Backend relation and frontend output interact but remain different responsibilities.

## Main slide M15: Explicit absence

- **Reveal ID:** `output-absence`
- **Timing:** `20:30 to 21:45`
- **Status:** `Open`
- **Purpose:** Show why a configured fallback chain needs per-position absence intent.

### Visible slide copy

> Open · 4 Output policy  
> **Absence must tell fallback whether to continue**  
> Configured chain · en-GB → en → de (default)  
> missing translation · continue through allowed fallbacks  
> intentionally omitted · stop and render nothing  
> Current fallback configuration has no per-position intent

### Layout intent

One concrete chain followed by the two different intentions it must preserve.

### Speaker notes

In this example, language zero is the final configured fallback. A missing English variant should continue through the allowed chain. An intentionally omitted position should stop and render nothing. Current Core applies the configured language-wide chain but has no per-position intent for this distinction. Core does not automatically append language zero to every valid chain, so the problem applies where zero is configured. Strict behavior remains separate.

### Sources

- [T3THI minutes, 11 June 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/06/11.md#L20-L42)
- [T3THI minutes, 10 July 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/07/10.md#L68-L80)
- [Configured fallback language IDs](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Site/Entity/SiteLanguage.php#L135-L143)
- [Fallback order and overlay type](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Context/LanguageAspectFactory.php#L27-L60)

**Boundary:** The per-position intent is a future requirement. Language zero is terminal only where it is configured.

## Main slide M16: Current work status

- **Reveal ID:** `real-status`
- **Timing:** `21:45 to 23:15`
- **Status:** `In Progress`
- **Purpose:** Separate present work from the future model.

### Visible slide copy

> In Progress  
> **Today is preparation, not rollout**  
> Merged · focused fixes  
> Active · inventory + behavior tests  
> Open · architecture + migration

### Layout intent

Three evidence levels with equal visual weight.

### Speaker notes

Current work documents existing behavior, adds tests and lands focused fixes. Gerrit 92267 was verified on 8 August 2026 as patch set 6, status NEW and work in progress. It marks code paths and does not implement the future model.

### Sources

- [Gerrit 92267](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92267)
- [T3THI minutes, 9 January 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/01/09.md#L21-L77)
- [T3THI minutes, 24 April 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/04/24.md#L23-L53)
- [T3THI minutes, 24 July 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/07/24.md#L17-L35)

**Boundary:** There is no committed migration roadmap.

## Main slide M17: Proposed Unit model

- **Reveal ID:** `unit-model`
- **Timing:** `23:15 to 24:45`
- **Status:** `Open`
- **Purpose:** State the initiative perspective on the proposed organization.

### Visible slide copy

> Open  
> **Our place in the proposed Unit model**  
> Expected start · Stability & Compliance · prepare refactoring with the Core Team  
> Perspective · Feature · develop multilingual functions with the Core Team  
> Working Group role, charters and priorities remain open

### Layout intent

Two stages on one line. The arrow expresses the initiative perspective.

### Speaker notes

The Unit model is under community review. Our perspective is to work first through Stability & Compliance while preparing required refactoring with the Core Team and Unit lead. Later work may fit the Feature Unit, again with the Core Team and applicable rules. We hope product strategy gives multilingual Core functions suitable priority.

### Sources

- [Official community review article](https://news.typo3.com/article/review-the-proposed-rules-for-typo3-units-and-the-unit-cooperation-panel)
- [Proposed Rules for TYPO3 Units](https://github.com/TYPO3-Documentation/Policy/pull/49)
- [Proposed Working Group structure](https://github.com/TYPO3-Documentation/Policy/blob/cc48949ec7ccad9e8ac587e11e8ca34251698c59/Documentation/Community/Units/RulesForTypo3Units.rst#L405-L410)
- [Proposed Feature and Stability cooperation](https://github.com/TYPO3-Documentation/Policy/blob/cc48949ec7ccad9e8ac587e11e8ca34251698c59/Documentation/Community/Units/RulesForTypo3Units.rst#L753-L759)

**Boundary:** The proposal is not adopted. No Unit assignment or product priority is claimed.

## Main slide M18: Controlled path

- **Reveal ID:** `next-path`
- **Timing:** `24:45 to 27:30`
- **Status:** `In Progress`
- **Purpose:** Close the argument with one evidence based sequence.

### Visible slide copy

> In Progress  
> **Change only after the contracts are explicit**  
> Understand → Test → Decide → Change → Prove  
> Compatibility first. No release promise.

### Layout intent

One five step line.

### Speaker notes

List every Core path that reads language values or translation relationships. Add tests for current behavior, including workspaces and frontend output. Use focused prototypes to decide the four contracts. Then define reversible migration and prove the three project cases.

### Sources

- [TYPO3 Camp RheinRuhr 2024 compatibility principle](https://notes.typo3.org/n2MVukjgQleQGO7bObL4lw)
- [T3THI minutes, 9 January 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/01/09.md#L21-L77)
- [T3THI minutes, 24 April 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/04/24.md#L29-L75)
- [T3THI minutes, 24 July 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/07/24.md#L27-L35)

**Boundary:** This is a decision path, not an approved calendar.

## Main slide M19: Thank you

- **Reveal ID:** `thanks`
- **Timing:** `27:30 to 28:00`
- **Status:** `Current`
- **Purpose:** Thank the audience and provide one participation path.

### Visible slide copy

> Join us  
> **Thank you for your attention**  
> [#typo3-translation-handling](https://typo3.slack.com/archives/C05D7UF1L8M)  
> Bring a use case. Review a test. Shape the next step.

### Layout intent

Large thank you line, one Slack link and one invitation.

### Speaker notes

Invite participants to bring project cases, help with behavior tests, review proposals and join the Translation Handling discussion on TYPO3 Slack.

### Sources

- [Translation Handling Slack channel](https://typo3.slack.com/archives/C05D7UF1L8M)
- [Translation Handling Initiative application](https://notes.typo3.org/s/pM80pPOyR)

**Boundary:** Specific work follows Core review and the applicable governance.
