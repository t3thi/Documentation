# TYPO3 Camp RheinRuhr 2024 reuse audit

## Result

The 2024 talk remains useful as the historical origin of several central ideas. Its purpose, target groups, BCP 47 direction, fallback question, compatibility principle and invitation to contribute can still be used.

Three statements must not be transferred unchanged:

1. Minus one is not formally deprecated or approved for removal.
2. Complete language layers are not a selected database model.
3. The proposed Unit structure makes the label strategic Core Development Initiative organizationally uncertain.

## Audit basis

| Item | Online source |
|---|---|
| Audited talk | [T3CRR24: Translation Handling Initiative](https://notes.typo3.org/n2MVukjgQleQGO7bObL4lw) |
| Initiative purpose | [Translation Handling Initiative application](https://notes.typo3.org/s/pM80pPOyR) |
| Current Core baseline | [TYPO3 Core commit `ee251c96d55b6e609a77334324be0b91bb0839e5`](https://github.com/TYPO3/typo3/tree/ee251c96d55b6e609a77334324be0b91bb0839e5) |
| Initiative evidence baseline | [T3THI documentation at `702db1d691ae4083d0325ea259aff7d639aa4ecd`](https://github.com/t3thi/Documentation/tree/702db1d691ae4083d0325ea259aff7d639aa4ecd) |
| Governance proposal | [Official Unit rules review article](https://news.typo3.com/article/review-the-proposed-rules-for-typo3-units-and-the-unit-cooperation-panel) |
| Audit date | 8 August 2026 |

## Statement audit

| ID | 2024 content | 2026 assessment | Reuse decision | Deck use |
|---|---|---|---|---|
| R24-01 | The initiative emerged from sessions, workshops and community feedback. | Valid historical context. It is not required for the 30 minute argument. | Keep for speaker context only. | M03 notes |
| R24-02 | Named 2023 member roster and Core contacts. | Historical snapshot. Membership and organizational roles may have changed. | Do not reuse as a current roster without a fresh official roster. | Omitted |
| R24-03 | Strategic Core Development Initiative. | This describes the existing initiative model, while a new Unit model is under public review. | Replace with Translation Handling Initiative and explain the proposed Working Group perspective separately. | M03, M17 |
| R24-04 | Simplify, improve and professionalize translation handling. | Still matches the initiative purpose and the 2026 talk contract. | Reuse in concise form. | M03 notes |
| R24-05 | Editors, integrators, developers and translators are target groups. | Still valid and useful because the problem spans editorial and technical responsibilities. | Reuse. | M03 |
| R24-06 | Existing behavior works in many cases, but projects normalize workarounds. | The measured wording remains compatible with the current problem analysis. | Reuse through concrete use cases instead of general motivation copy. | M04, M05 |
| R24-07 | Changes must respect backward compatibility and the deprecation policy. | Still valid as a delivery principle. | Reuse without implying that a deprecation already exists. | M18 |
| R24-08 | Minus one for All Languages is expiring. | Too definitive. Current Core still implements minus one. Initiative evidence supports removal or replacement as a preferred direction, not an adopted deprecation. | Keep the problem, remove the status claim. | M06, M08, M09 |
| R24-09 | BCP 47 identifies languages by semantic characteristics. | Still a preferred initiative direction and an established standard. Current record storage still uses numeric site language identifiers. | Reuse with the storage boundary visible. | M08 |
| R24-10 | Complete languages deliberately add database redundancy so no lookups are needed. | The topic remains central, but the formulation selects one cost model and overstates the runtime result. Shadows, hidden zero, neutral structure and hybrids remain open. | Reuse only as an explicit tradeoff. | M13 |
| R24-11 | Fallback configuration changes raise unresolved overlay questions. | Still valid. The 2026 model benefits from separating backend relations from frontend fallback policy and from distinguishing absence states. | Reuse with clearer responsibility boundaries. | M14, M15 |
| R24-12 | A strategy paper should contain Core approved goals and enter official TYPO3 strategy. | This describes an aspiration, not an achieved status. No approved translation architecture or migration roadmap is evidenced. | Do not reuse as current status. | Omitted |
| R24-13 | Ask the community for use cases. | Still useful and consistent with current behavior tests. | Reuse as a concrete participation request. | M19 |
| R24-14 | Join the Translation Handling Slack channel every Friday from 12:00 to 13:00. | The channel remains the correct participation link. The old meeting time is not needed on the slide and is not carried forward from the historical source. | Reuse the channel link only. | M19 |

## Detailed corrections

### Minus one

Current Core still adds minus one as the All Languages option for most language aware tables and applies special behavior around it:

- [FormEngine option](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/Form/FormDataProvider/TcaLanguage.php#L132-L147)
- [Page layout handling](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/View/BackendLayout/ContentFetcher.php#L155-L168)
- [Routing order](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Routing/Aspect/SiteLanguageAccessorTrait.php#L58-L78)

Therefore the 2024 label expiring is replaced by the more precise statement that All Languages should become explicit behavior rather than a language identity. The functional direction is preferred. The API, storage, lifecycle and migration are open.

### BCP 47

The standard itself is stable: [RFC 5646](https://www.rfc-editor.org/rfc/rfc5646). The initiative has continued to use it as the semantic cross site identity direction:

- [T3THI minutes, 10 November 2023](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2023/11/2023-11-10.md#L30-L53)
- [T3THI minutes, 25 July 2025](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2025/07/2025-07-25.md#L22-L65)

Current Core already has a Locale beside the numeric SiteLanguage ID, but this does not make BCP 47 the persisted record identity: [SiteLanguage properties](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Site/Entity/SiteLanguage.php#L26-L110).

### Complete language layers

The 2024 talk correctly identified completeness as a way to move complexity from runtime to stored data. Later work made the unresolved costs and alternative representations clearer:

- [Neutral structure preference discussed, 24 October 2025](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2025/10/2025-10-24.md#L45-L78)
- [Complete structures and Editing Language, 8 May 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/05/08.md#L40-L58)
- [Hidden layer remains a hypothesis, 10 July 2026](https://github.com/t3thi/Documentation/blob/702db1d691ae4083d0325ea259aff7d639aa4ecd/MeetingMinutes/Weekly/2026/07/10.md#L50-L58)

The 2026 presentation therefore gives potential and cost equal weight and names the model choice as open.

### Organization

The governance article published on 6 August 2026 states that the Unit rules are proposed and under community review until 6 September 2026. The proposal allows Working Groups and requires cooperation between Feature and Stability & Compliance on cross cutting topics:

- [Proposed Working Group structure](https://github.com/TYPO3-Documentation/Policy/blob/cc48949ec7ccad9e8ac587e11e8ca34251698c59/Documentation/Community/Units/RulesForTypo3Units.rst#L405-L410)
- [Proposed Feature and Stability cooperation](https://github.com/TYPO3-Documentation/Policy/blob/cc48949ec7ccad9e8ac587e11e8ca34251698c59/Documentation/Community/Units/RulesForTypo3Units.rst#L753-L759)

The deck presents the initiative expectation as its own perspective. It does not state that a Unit assignment, charter or product priority has been decided.

## Reuse rule

When reusing an older statement in future versions of the talk:

1. Keep the historical source.
2. Add a current Core or initiative source.
3. Assign exactly one current status.
4. State any open storage, lifecycle, migration or governance decision.
5. Do not convert a preferred direction into an adopted roadmap.
