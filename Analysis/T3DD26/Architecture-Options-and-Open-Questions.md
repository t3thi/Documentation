# T3DD26 Architecture Options and Open Questions

**Corpus snapshot:** 2026-08-08

**Purpose:** Compare the current sparse/overlay model, complete per-language layers with shadow records, a shared neutral Structure/Identity Layer, and one explicitly analytical hybrid.

**Evidence scope:** All nine documents in `Analysis/T3DD26/SourceAudits/` were read completely. Initiative positions are cited back to the original meeting minutes or transcripts. Current technical validation is cited separately where needed.

## Evidence and status discipline

This document uses the repository's controlled status vocabulary. In particular:

- `Current Core Behavior` describes behavior evidenced as current in the cited source or current technical validation.
- `Preferred Direction` is a favored initiative direction, not an approved TYPO3 Core architecture or roadmap.
- `Open Question` means that the corpus does not supply a settled answer.
- `Analytically Derived Recommendation` is this document's own conclusion. It must not be attributed to the initiative.

The comparison deliberately separates three things that were sometimes discussed together:

1. **Semantic language identity:** which real language or language variant a record belongs to.
2. **Logical record and structural identity:** which variants represent the same logical element and where that element sits in a structure.
3. **Availability and content policy:** whether content exists, is intentionally absent, falls back, or is synchronized.

That separation is an `Analytically Derived Recommendation`. It follows from the current coupling of numeric language values, translation-parent relations, and overlay/fallback logic, and from the later distinction between structural identity and content origin (`MeetingMinutes/Weekly/2023/12/2023-12-15.md:111-181,233-297,308-342`; `MeetingMinutes/Weekly/2025/10/2025-10-24.md:58-66`).

## Executive conclusion

1. **`Current Core Behavior`:** TYPO3 persists only the language variants that exist, gives `0` the combined role of concrete default-language content and structural lead, gives `-1` the special meaning “all languages,” and resolves gaps through conditional query, overlay, and fallback paths. Direct `-1` assumptions still span backend queries, permissions, relations, DataHandler, rendering, Extbase, metadata, and Workspaces (`MeetingMinutes/Weekly/2023/12/2023-12-15.md:111-181,257-342`; `Analysis/T3DD26/External-Technical-Validation.md:114-132`).
2. **`Preferred Direction`:** Persisted `-1` should be removed only after its maintain-once behavior has a functional replacement (`MeetingMinutes/Weekly/2024/01/2024-01-19.md:36-67`; `MeetingMinutes/Weekly/2026/04/24.md:29-37`).
3. **`Discussed Direction`:** Explicit synchronization into concrete language records is the strongest repeated replacement design, but its field/API and lifecycle are not decided or implemented (`MeetingMinutes/Weekly/2025/11/2025-11-28.md:47-57`; `MeetingMinutes/Weekly/2026/06/11.md:52-80`).
4. **`Preferred Direction`:** BCP 47 is the favored semantic language identifier because local numeric IDs cannot identify the same language reliably across sites or instances. The sources do not decide whether numeric surrogate keys disappear or remain internally (`MeetingMinutes/Weekly/2024/05/2024-05-31.md:43-49`; `MeetingMinutes/Weekly/2026/07/31.md:55-61`).
5. **`Preferred Direction`:** Historically, complete, self-contained per-language layers reached their strongest support in late 2024. In October 2024 the team favored closing translation gaps at all levels and avoiding cross-language output lookups (`MeetingMinutes/Weekly/2024/10/2024-10-18.md:21-37,60-66`).
6. **`Preferred Direction`:** In the later October 2025 side-by-side comparison, the team favored a shared language-independent structural layer over universal shadow records because the latter duplicate data, complicate synchronization, and compound Workspace overhead (`MeetingMinutes/Weekly/2025/10/2025-10-24.md:45-78`).
7. **`Open Question`:** In the newest architecture evidence from July 2026, the hidden structural layer was explicitly called a hypothesis, and responsibility and prioritization for broader changes remained unclear. Actual work remained characterization, tests, and bounded bug fixes (`MeetingMinutes/Weekly/2026/07/10.md:50-58`; `MeetingMinutes/Weekly/2026/07/24.md:27-35`).
8. **`Analytically Derived Recommendation`:** The most defensible hybrid is a complete shared structural identity, sparse editorial content variants, and selective materialization only for explicit synchronization targets. It is not an initiative decision.

## Terminology: two different meanings of “shadow record”

The corpus uses “shadow record” for two materially different ideas:

| Term used in this document | Meaning | Status | Chronology and evidence |
|---|---|---|---|
| **Language-layer shadow** | A persisted placeholder or hidden record in a concrete target language so every language owns a complete representation. | `Discussed Direction` | Strongly preferred in late 2024, reopened in 2025, and later disfavored in the comparative discussion. `MeetingMinutes/Weekly/2024/10/2024-10-18.md:29-37`; `MeetingMinutes/Weekly/2025/07/2025-07-18.md:49-73`. |
| **Structural shadow** | A hidden `sys_language_uid = 0` partner that supplies structure for a real-language record while reusing today's `l10n_parent` model. It is not a row in every target language. | `Discussed Direction` | Proposed as a prototype hypothesis in May 2026. `MeetingMinutes/Weekly/2026/05/08.md:40-46`; `MeetingMinutes/Weekly/2026/05/29.md:23-43`. |

Conflating these would make the data-volume, identity, and Workspace comparison invalid.

## Evolution and contradictions

| Period | Status | Source-backed position | Later correction or qualification |
|---|---|---|---|
| 2023 | `Problem` | Overlay/fallback behavior is distributed across Extbase, non-Extbase rendering, PageRepository, and several public entry points. Storage alternatives remained open (`MeetingMinutes/Weekly/2023/12/2023-12-15.md:111-395`; `MeetingMinutes/Weekly/2023/12/2023-12-29.md:30-62`). | No 2023 source selected complete layers, a neutral identity layer, or replacements for `0` and `-1`. |
| 2024-01 | `Idea` | A default-record boolean and DataHandler-created variants were proposed as the concrete replacement mechanism for `-1`; BCP 47 and a contentless structure layer were also discussed (`MeetingMinutes/Weekly/2024/01/2024-01-19.md:36-67,78-86`). | The boolean's overwrite and provenance semantics proved incomplete by June (`MeetingMinutes/Weekly/2024/06/2024-06-28.md:36-82`). |
| 2024-01 | `Preferred Direction` | The special `-1` value was considered broken by design and should be removed or replaced while retaining maintain-once behavior (`MeetingMinutes/Weekly/2024/01/2024-01-19.md:36-67`). | The preferred outcome did not settle the replacement lifecycle. |
| 2024-03 | `Preferred Direction` | Automatic hidden default-language control records were rejected because structural ownership, sorting, and editor control would become opaque (`MeetingMinutes/Weekly/2024/03/2024-03-01.md:54-72`). | This is a warning against uncontrolled creation in a privileged default layer, not a permanent rejection of all system-maintained structural identities. |
| 2024-06 to 2024-10 | `Preferred Direction` | Self-contained language data, deliberate redundancy, closed gaps, and no cross-language output lookup became the strongest target (`MeetingMinutes/Weekly/2024/06/2024-06-28.md:110-130`; `MeetingMinutes/Weekly/2024/10/2024-10-18.md:29-37,60-66`). | Even then, fallback changes implied massive resynchronization and no controlled trigger was designed (`MeetingMinutes/Weekly/2024/10/2024-10-18.md:62-66`). |
| H1 2025 | `Discussed Direction` | Concrete variants were emphasized specifically as the replacement for an All-Languages record (`MeetingMinutes/Weekly/2025/01/2025-01-10.md:37-39`). | This is not evidence for universal completeness; the scope narrowed to `-1` materialization and its lifecycle. |
| 2025-07 to 2025-09 | `Open Question` | Complete per-language shadows and a central structure-only layer were explicitly compared; September again presented full shadows as a possible unified future (`MeetingMinutes/Weekly/2025/07/2025-07-18.md:49-81`; `MeetingMinutes/Weekly/2025/09/2025-09-26.md:58-66`). | The options were not yet selected, and data/performance concerns were explicit from July. |
| 2025-10-24 | `Preferred Direction` | The shared neutral structure was favored because it needs fewer records, simplifies synchronization, eases migration, and avoids shadow/Workspace amplification (`MeetingMinutes/Weekly/2025/10/2025-10-24.md:45-78`). | This is the youngest explicit side-by-side preference, but still not a Core decision. |
| 2026-05 | `Discussed Direction` | A pragmatic hidden-`0` structure plus Editing Language and automatically created structural partners became the product hypothesis (`MeetingMinutes/Weekly/2026/05/08.md:40-68`; `MeetingMinutes/Weekly/2026/05/29.md:23-61`). | Hidden `0` is not a genuinely language-neutral identity entity; sorting, markers, merging, permissions, and divergent structures remained unresolved. |
| 2026-06 | `Discussed Direction` | `-1` → explicit sync, resolving `0`, BCP 47, and a hidden layer formed a communicable reasoning path (`MeetingMinutes/Weekly/2026/06/11.md:58-80`). | The sequence was discussion material, not a roadmap. |
| 2026-07 | `Open Question` | The hidden structural layer was explicitly described as a hypothesis (`MeetingMinutes/Weekly/2026/07/10.md:24-30,50-58`). | Responsibility and prioritization remained unclear, and the sequence did not become a roadmap (`MeetingMinutes/Weekly/2026/07/24.md:27-35`). |

## Option 0: Current sparse variants plus overlay/fallback

### Source-backed model and status

`Current Core Behavior`

```text
default row, language 0: content + structural lead
    ├── connected variant, language A (l10n_parent -> row 0)
    ├── connected variant, language B (l10n_parent -> row 0)
    └── missing variant -> overlay/fallback decision at query/output time

free variant, language C: no required parent
language-all row, -1: one special record selected across languages
```

- Overlay and fallback queries explicitly start from `0` and `-1`, inspect `transOrigPointerField`, and conditionally add current-language or untranslated default rows (`MeetingMinutes/Weekly/2023/12/2023-12-15.md:111-181,308-342`).
- Workspace overlay occurs before language overlay in the inspected Extbase path, so both dimensions already compose in the read model (`MeetingMinutes/Weekly/2023/12/2023-12-15.md:257-286`).
- Backend connection and frontend fallback are different axes: `l10n_parent` supplies a structural/translation relation, while site fallback configuration controls frontend availability (`MeetingMinutes/Weekly/2026/06/26.md:206-224,226-232`).
- Inline/default-UID relation storage is deeply rooted; in the 2024 discussion the Reference Index was the component mapping localized targets (`MeetingMinutes/Weekly/2024/04/2024-04-12.md:56-62`).
- Pages require connection to a default-language page, while non-page records can be Free Mode. Current Free/Mixed rendering and wizard behavior still require active fixes (`MeetingMinutes/Weekly/2026/07/24.md:37-75`).

### Analytical evaluation

`Analytically Derived Recommendation`

**Advantages**

- Lowest row count when many translations do not exist.
- Deliberate gaps and fully independent/localized records are natural.
- No new migration is required; this is the compatibility baseline for extensions and existing data.

**Costs and risks**

- A missing row simultaneously influences fallback, overlay, relation lookup, sorting, and editor display.
- `0` mixes a real language with structural leadership; `-1` mixes content policy with language identity.
- Query behavior depends on caller and context; localized data may be re-fetched through a default record and overlaid again.
- Logical identity is incomplete: `l10n_parent` covers connected variants, but Free records may have no group identity; `l10n_source` describes content origin rather than stable sibling identity.
- Workspace/version and language overlays multiply reasoning paths even without multiplying all live rows.

**Migration posture:** safest short-term compatibility model, but it preserves the semantic coupling the initiative wants to remove.

## Option 1: Complete per-language layers with language-layer shadows

### Source-backed model and status

`Discussed Direction`

Historically, complete per-language layers were a `Preferred Direction` in late 2024. The model was reopened as an option in 2025 and has not been selected or implemented.

```text
logical element/group
    ├── language A row: visible content
    ├── language B row: visible or synchronized content
    ├── language C shadow: hidden / empty / fallback-derived state
    └── language D shadow: hidden / empty / fallback-derived state
```

- The 2024 goal was for each language to provide all data needed for output from rows in that language; one idea moved fallback from record existence to content values (`MeetingMinutes/Weekly/2024/06/2024-06-28.md:110-130`).
- On 2024-10-18 the team favored closing gaps at all levels, including content, with hidden generated counterparts and same-language relation endpoints (`MeetingMinutes/Weekly/2024/10/2024-10-18.md:21-37`).
- In July 2025, full redundancy and a central structure layer were explicit alternatives; full redundancy ensures complete structure but was already considered inefficient at scale (`MeetingMinutes/Weekly/2025/07/2025-07-18.md:49-73`).
- By October 2025, the shadow model was criticized for massive duplication, synchronization complexity, and additional Workspace cost (`MeetingMinutes/Weekly/2025/10/2025-10-24.md:45-56,74-78`).

### Treatment of the key semantics

Each status cell applies only to the assertion in its row. The concrete interpretation of how the source-backed directions fit this option is an `Analytically Derived Recommendation` unless a row has another explicit status.

| Concern | Complete-layer interpretation | Status |
|---|---|---|
| BCP 47 language identity | Each concrete variant needs a stable semantic language tag. | `Preferred Direction` |
| BCP 47 grouping boundary | Which schema supplies logical group identity alongside the language tag remains undecided. | `Open Question` |
| `-1` replacement behavior | Replace one special row with an explicit sync policy that creates or maintains concrete target rows. | `Discussed Direction` |
| `-1` replacement lifecycle | Activation, overwrite, provenance, detachment, deletion, and restoration semantics remain undecided. | `Open Question` |
| `0` structural privilege | Complete layers could remove the need for a real language to own structural privilege. | `Idea` |
| `0` replacement identity | A separate group identity would still be required, but no schema was chosen. | `Open Question` |
| Record identity | All rows need a group key or equivalent stable link; no schema was chosen. | `Open Question` |
| Absence | Represent hidden, intentionally absent, untranslated, inherited, and synchronized as explicit states rather than one missing-row state. | `Analytically Derived Recommendation` |

### Analytical evaluation

`Analytically Derived Recommendation`

**Advantages**

- Queries can select the requested language directly; same-language relations and sorting are representable without looking into a privileged language.
- “Missing,” “intentionally absent,” “hidden,” and “generated” can become explicit persisted states.
- A complete layer can simplify caches, export, and language-specific indexing if every consumer uses the same contract.
- `-1` synchronization fits naturally because target rows already exist or are created deterministically.

**Costs and risks**

- Data volume approaches `logical elements × configured languages`, before Workspace versions, history, references, and generated relations.
- Every create, move, copy, delete, restore, language addition, fallback change, and sync-policy change can become a multi-row write operation.
- Automatically generated rows require provenance, conflict detection, and a safe detach/delete lifecycle.
- Reference Index size may grow with every shadow and every materialized relation unless references target a canonical group identity.
- Queries become superficially simpler but must consistently exclude technical shadows and distinguish their states; otherwise shadows leak into output or editor choices.
- Workspaces can version every shadow, or need a new derived-record contract. The sources explicitly flag overhead but do not define the solution.
- Backend UX must hide technical rows while exposing enough of them for unambiguous sorting and permissions.

**Migration posture:** potentially simple for reads after completion, but the most write-heavy and conflict-prone migration. The corpus contains no measured row multiplier, query benchmark, Reference Index design, or Workspace/versioning algorithm.

## Option 2: Shared neutral Structure/Identity Layer

### Source-backed model and status

`Open Question`

The shared neutral layer was a `Preferred Direction` in the October 2025 comparison. In the newest 2026 evidence, its concrete realization remained a hypothesis rather than a selected architecture.

```text
language-neutral Structure/Identity record
    ├── language A content variant
    ├── language B content variant
    └── no language C variant -> explicit UI state / fallback policy
```

The October 2025 concept makes the structure record contentless, lets `transOrigPointerField` identify structure, and lets `translationSource` identify the origin of translatable content (`MeetingMinutes/Weekly/2025/10/2025-10-24.md:53-70`). It was favored over complete shadows because it uses fewer records and appeared closer to the Core's existing default-language control role (`MeetingMinutes/Weekly/2025/10/2025-10-24.md:45-78`).

The May 2026 prototype idea is a compatibility realization, not the final neutral model: keep `sys_language_uid = 0` as a hidden, non-output structure and give every real editorial language its own language ID (`MeetingMinutes/Weekly/2026/05/08.md:40-46`; `MeetingMinutes/Weekly/2026/05/29.md:23-43`). It removes the editorial privilege of the current default output language but retains special `0` and today's parent relation internally.

### Treatment of the key semantics

Each status cell applies only to the assertion in its row. The concrete interpretation of how the source-backed directions fit this option is an `Analytically Derived Recommendation` unless a row has another explicit status.

| Concern | Neutral-layer interpretation | Status |
|---|---|---|
| BCP 47 language identity | Tags identify concrete variants; the neutral identity itself has no language. | `Preferred Direction` |
| BCP 47 storage | The exact storage and mapping contract remains undecided. | `Open Question` |
| `-1` replacement behavior | Use explicit synchronization and materialize concrete targets as policy requires. | `Discussed Direction` |
| `-1` policy ownership | Whether synchronization intent belongs to the logical identity or a designated source variant remains undecided. | `Open Question` |
| Transitional `0` | A hidden `0` structure could preserve compatibility while real editorial languages receive explicit IDs. | `Discussed Direction` |
| Permanent `0` representation | Whether a final neutral model retains any special `0` representation remains undecided. | `Open Question` |
| Record identity concept | A shared structure/identity record supplies stable group identity without privileging a real-language sibling. | `Preferred Direction` |
| Record identity schema | The concrete schema and APIs remain undecided. | `Open Question` |
| Structure split | Store sorting, position, and structural relations once while content-bearing fields remain on variants. | `Discussed Direction` |
| TCA field partition | The exact structural-versus-payload field contract remains undecided. | `Open Question` |

### Analytical evaluation

`Analytically Derived Recommendation`

**Advantages**

- One stable identity exists even when only one variant exists or when variants are created independently.
- Shared structure is complete without creating a full content row for every language.
- Structural edits can be expressed once; language variants can remain sparse and genuinely localized.
- It fits the “mostly connected, selectively different” product goal better than forcing either total connection or total independence (`MeetingMinutes/Weekly/2026/07/10.md:34-48`).
- It offers a canonical target for relations and the Reference Index, potentially avoiding per-shadow relation multiplication.

**Costs and risks**

- Every content read needs identity-to-variant resolution, typically an additional join, mapping, or indexed lookup.
- Existing tables and TCA assume that structure and payload often live in the same record; separating them is invasive for DataHandler, Extbase, Record API, FormEngine, routing, and extensions.
- Deciding which fields are structural is context-dependent. `sorting`, `pid`, `colPos`, `CType`, inline children, and MM relations do not all have identical semantics.
- Shared structure creates cross-language permission and locking questions: moving one identity affects all languages even if the editor can edit only one.
- Independent identities created in different languages need an explicit connect/merge operation without destroying intentional independence.
- Workspaces need version semantics for the neutral identity and each content variant, including atomic publish rules when both change.
- Current Reference Index and relation APIs target concrete record UIDs; migration to identity targets or dual resolution is not designed.

**Migration posture:** fewer generated rows than complete layers, but deeper schema/API change. The 2025 meeting called parent-link conversion easier; that is a preference, not a proven migration algorithm (`MeetingMinutes/Weekly/2025/10/2025-10-24.md:68-72`).

## Option 3: Bounded structural hybrid

> **Status: `Analytically Derived Recommendation`.** No source defines or selects this model. It combines the youngest structural-layer preference with the established explicit-synchronization direction and the continued need for independent content.

### Proposed data contract

```text
StructureIdentity
    - stable logical record/group ID
    - shared structural fields and structural relations
    - optional synchronization policy

ContentVariant
    - StructureIdentity reference
    - semantic BCP 47 language tag
    - editorial payload
    - provenance/state: editorial | synchronized | inherited | intentionally-absent

CompatibilityProjection (temporary and derived)
    - legacy 0/-1/parent representation only where old APIs require it
    - never the canonical identity or editorial payload
```

The hybrid rules would be:

1. **Complete structure, sparse payload:** every logical element has one structural identity, but a real-language content row exists only when editorial content or an explicit synchronization target requires it.
2. **Selective materialization:** the `-1` replacement creates concrete variants only for the configured “all” scope or synchronization group, not universally for unrelated records.
3. **Projected placeholders:** missing-language placeholders are normally a backend projection of the shared identity, not mandatory database rows.
4. **Explicit absence:** an editor can mark a language intentionally absent without confusing that state with “no row yet.”
5. **Independent escape hatch:** radically divergent structures may remain separate identities; the system should offer an explicit connect/merge action rather than silently inventing relations.
6. **Compatibility boundary:** numeric IDs and hidden `0` may remain transitional implementation keys, but they carry no new semantic authority. Whether this is technically viable must be proven.

### Why this hybrid is the analytical candidate

- It retains the complete structural information that both 2025 alternatives required (`MeetingMinutes/Weekly/2025/07/2025-07-18.md:75-81`).
- It follows the later preference for one shared structure rather than massive universal shadows (`MeetingMinutes/Weekly/2025/10/2025-10-24.md:45-78`).
- It preserves the established explicit-materialization approach where maintain-once behavior genuinely needs concrete target records (`MeetingMinutes/Weekly/2024/01/2024-01-19.md:42-56`; `MeetingMinutes/Weekly/2026/06/11.md:62-74`).
- It respects 2026 evidence that highly divergent language structures and Free Mode remain valid, rather than forcing hundreds of shadows (`Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:203-223`; `MeetingMinutes/Weekly/2026/07/24.md:37-75`).

### Risks specific to the hybrid

- It introduces two canonical entities instead of one and can become the worst of both models if compatibility projections are persisted indefinitely.
- Query APIs must not let callers bypass identity/variant resolution and reconstruct overlays inconsistently.
- Structural-only fields and content fields need deterministic, extensible classification.
- Sync-generated variants and editorial variants need a formal state machine before data migration.
- Workspaces, versioning, and publishing must define whether identity and variant changes are one atomic change set.
- Reference Index behavior must choose canonical identity targets, concrete variant targets, or both, without duplicate or stale edges.

## Cross-option comparison

**Status:** `Analytically Derived Recommendation`. These matrices compare architectural consequences; they are not a recorded initiative decision. Source-backed maturity is documented in the preceding option sections.

### Identity, persistence, and runtime

| Dimension | Current sparse/overlay | Complete language layers | Neutral Structure/Identity Layer | Bounded hybrid |
|---|---|---|---|---|
| Semantic language identity | Numeric `0`, `-1`, positive site-local IDs | Real-language ID/tag on every row | Real-language ID/tag only on variants | BCP 47 on variants; internal numeric key only as a possible compatibility mechanism |
| Meaning of `-1` | Special persisted “all languages” value | Removed; policy materializes all target rows | Removed; policy belongs to identity/source and materializes targets | Removed; explicit target set selectively materializes variants |
| Meaning of `0` | Concrete default content + structural lead | No language needs the structural privilege | Transitional hidden anchor or no semantic `0` in final model | Transitional adapter only; not canonical identity |
| Logical record identity | Connected variants point to default row; Free records may be ungrouped | Requires a new/shared group key across all rows | Neutral structure record is the group identity | Neutral structure identity is canonical; compatibility links are derived |
| Missing language | Missing row; fallback/overlay decides | Persisted shadow/state row | No content variant; identity remains | No content variant unless explicitly synchronized; projected placeholder/state |
| Query path | Conditional fetch + overlay/fallback; caller-specific branches | Direct language query plus shadow-state filtering | Identity-to-variant resolution plus fallback policy | Canonical resolver; direct target variant when materialized, otherwise explicit state/fallback |
| Runtime fallback | Central to missing-record behavior | Potentially reduced or shifted to values/states | Still needed for sparse variants unless explicit sync replaces it | Retained per policy; synchronization can replace it for selected groups |

The BCP 47/internal-numeric split in the hybrid column is an `Analytically Derived Recommendation`. Sources prefer BCP 47 strings but do not decide whether surrogate database keys remain (`MeetingMinutes/Weekly/2024/05/2024-05-31.md:43-49`; `MeetingMinutes/Weekly/2026/07/31.md:55-61`).

### Operational effects

| Dimension | Current sparse/overlay | Complete language layers | Neutral Structure/Identity Layer | Bounded hybrid |
|---|---|---|---|---|
| Data volume | Lowest live-row count | Highest; roughly multiplicative in languages before versions/relations | Identities + existing variants | Identities + existing/explicitly synchronized variants; bounded projections |
| Write amplification | Usually local, with special sync/copy cases | High for structural and language-set changes | Shared structure once; variant writes separately | Shared structure once; sync writes only selected targets |
| Workspaces | Existing workspace overlay composed with language overlay | Potential version multiplication for every shadow | Must version shared identity and variants coherently | Same neutral challenge plus rules for generated variants/projections |
| Versioning/restore | Existing concrete-row semantics, already with duplicate-parent edge cases | Restore can resurrect conflicting shadows or sync states | Restore may combine incompatible identity and variant versions | Needs group-level conflict validation and deterministic projection rebuild |
| Reference Index | Concrete/default UID relations; localized mapping exists in current paths | More rows and potentially more edges unless targets are canonicalized | Natural canonical identity target, but requires Core/API migration | Prefer identity edges for structural relations and variant edges only for language-specific payload; unproven |
| Backend UX | Default column, Translate/Copy, Free/Connected/Mixed exposed | Must hide shadows but reveal enough for sorting and state | Editing Language projects one structure into a language context | Same projection, with explicit sync/absence/connect actions |
| Permissions | Default-language access often controls structure | A move may update several language rows outside editor permission | Shared structural permission is explicit but cross-language | Separate structural capability from language-payload capability |
| Migration complexity | None | Broad data expansion and conflict classification | Deep identity/API conversion | Phased dual model; highest temporary compatibility complexity |

No source quantifies these effects. Record counts, query plans, Reference Index size, and Workspace/version counts remain `Open Question`; the table is analytical except where a source-backed fact is explicitly cited.

## BCP 47: what it solves and what it does not

### Source-backed statements

- `Preferred Direction`: BCP 47 provides a stable descriptive identifier suitable for data exchange across instances and should be independent of server locale (`MeetingMinutes/Weekly/2024/05/2024-05-31.md:43-49`).
- `Problem`: the same real language can receive different numeric IDs across sites, while one numeric ID can carry different meanings/titles; no site is inherently primary (`MeetingMinutes/Weekly/2026/07/31.md:55-61`).
- `Discussed Direction`: special `-1` and `0` semantics need resolution before a clean conversion to BCP 47 language identity (`MeetingMinutes/Weekly/2026/06/11.md:62-80`).
- `Open Question`: authoritative storage, canonicalization, region/script/private subtags, site mapping, import/export behavior, and retention of internal numeric keys are not decided.

### Analytical boundary

`Analytically Derived Recommendation`

BCP 47 should identify a **language variant**, not a logical record, structural position, default role, synchronization group, or fallback chain. Those require separate identifiers or policies. Treating `en-GB` as both language identity and record-group identity would merely replace one overloaded value with another.

## Replacing `-1`: explicit behavior, not another language

### Source-backed direction

- The January 2024 proposal covered flag activation, edits, new page translations, page-translation deletion, and flag deactivation by creating, synchronizing, or deleting target copies (`MeetingMinutes/Weekly/2024/01/2024-01-19.md:42-56`).
- By June 2024 the simple boolean was considered insufficient because pre-existing manual translations, source leadership, overwrite permission, and provenance were unresolved (`MeetingMinutes/Weekly/2024/06/2024-06-28.md:36-82`).
- In November 2025 a tentative `language_sync` / `ctrl.languageSyncField` was again proposed, initially as a boolean on default records and later possibly a multi-select. Soft deletion/restoration was preferred over immediate destruction, with explicit concern about exponential duplication (`MeetingMinutes/Weekly/2025/11/2025-11-28.md:47-57`).
- June 2026 retained the direction from boolean parity to explicit synchronization target groups (`MeetingMinutes/Weekly/2026/06/11.md:62-80`).

### Required lifecycle decisions

Every row below remains `Open Question` unless marked otherwise.

| Event | Required decision | Option sensitivity |
|---|---|---|
| Enable synchronization with no target variant | Create immediately, enqueue, or create lazily; define insertion/sorting and error handling. | Complete layers already have shadows; neutral/hybrid create selected payload variants. |
| Enable when an editorial target variant exists | Block, compare/adopt, exempt, merge, or overwrite with explicit consent. | Required in every replacement model. |
| Edit the designated source | Define target set, field scope, transaction boundary, retry behavior, and conflict reporting. | Complete layers amplify every write; neutral/hybrid can limit targets. |
| Edit a generated target | Reject, redirect to source, detach, or create a conflict branch. | Requires provenance in every explicit-sync model. |
| Add/remove a configured language | Decide whether membership is site-local, global, or group-based and whether backfill is automatic. | BCP 47/site mapping is a prerequisite. |
| Change a fallback chain | Decide whether fallback is runtime-only or triggers persisted resynchronization. | Full layers proposed resync; neutral/hybrid can retain runtime fallback. |
| Disable synchronization | Soft-delete, detach as editorial, freeze, or remove generated targets; preserve auditability. | The 2025 soft-delete preference is a starting point, not a full contract. |
| Delete/restore source or target | Define cascading, restoration, duplicate prevention, and stale relation cleanup. | Workspaces and history can reintroduce older states. |
| Copy/move identity or variant | Define whether sync policy, group membership, provenance, and target records are copied. | Must avoid cross-site numeric-language remapping. |
| Publish a Workspace | Define group completeness and whether structure/payload/sync changes publish atomically. | Most costly for universal shadows; still unresolved for neutral/hybrid. |

`Analytically Derived Recommendation`: define a persisted provenance/state model before enabling any mutating migration. At minimum it must distinguish editorial, generated-synchronized, detached, intentionally absent, and pending/error states.

## Record identity, relations, and Reference Index

### Source-backed statements

- `Current Core Behavior`: connected variants use `transOrigPointerField`/`l10n_parent`; `translationSource` can name the content source; Free records may lack a parent (`MeetingMinutes/Weekly/2025/10/2025-10-24.md:21-43`).
- `Problem`: `t3_origuid` and `l10n_source` were found insufficient or ambiguous for general logical identity, especially across copies and Workspaces (`MeetingMinutes/Weekly/2024/02/2024-02-16.md:20-40`).
- `Preferred Direction`: the October 2025 structural model separates structural identity (`transOrigPointerField`) from content origin (`translationSource`) (`MeetingMinutes/Weekly/2025/10/2025-10-24.md:58-66`).
- `Current Core Behavior`: default-language UID storage is deeply rooted in relations; the Reference Index maps localized targets in the discussed current path (`MeetingMinutes/Weekly/2024/04/2024-04-12.md:56-62`).
- `Problem`: MM rows lack sufficient language/Workspace context, so DataHandler, RelationHandler, Extbase, and FormEngine can infer different target UIDs (`MeetingMinutes/Weekly/2026/02/20.md:29-35`).

### Open decisions

- Is identity a new table/entity, a contentless row in each localizable table, a shared group field, or a formalized hidden-`0` row?
- Do structural relations target identity while language-specific relations target variants?
- How does the Reference Index expose both canonical and rendered/localized targets without duplicate edges?
- Can two independently created variants be connected later, and can a connected variant be detached without changing its UID?
- Can any variant serve as translation source while identity remains stable and source-neutral?
- Which identity and reference fields participate in Workspaces, history, import/export, and copy/move?

`Analytically Derived Recommendation`: prototype relation and Reference Index semantics before choosing a storage model. A model that simplifies content lookup but cannot express canonical relations is not a viable Core architecture.

## Workspaces and versioning

### Source-backed statements

- Any translation-handling change was said to require working Workspace behavior (`MeetingMinutes/Weekly/2024/01/2024-01-19.md:118-120`).
- Current workspace overlay precedes language overlay in the inspected path (`MeetingMinutes/Weekly/2023/12/2023-12-15.md:257-286`).
- Full shadows were later criticized because their overhead compounds with Workspaces (`MeetingMinutes/Weekly/2025/10/2025-10-24.md:74-78`).
- Delete/restore and duplicate-parent integrity already become more complex with Workspaces in today's model (`MeetingMinutes/Weekly/2026/07/24.md:57-63`).

### Open decisions

- Does each shadow receive its own Workspace version, or is it derived from one canonical change?
- Is the neutral identity independently versioned from each language payload?
- Must publish/discard be atomic across structure, source, generated targets, and reference updates?
- How are conflicts detected when one Workspace changes structure and another changes a variant or synchronization target set?
- How are generated rows represented in history and restored without exponential duplication?
- Which live UID is stable when a structure identity or variant is versioned?

`Analytically Derived Recommendation`: require scenario tests for live/workspace create, edit, move, delete, restore, publish, discard, and publish-all before any architecture is judged simpler.

## Queries, overlays, and fallback

### Source-backed statements

- The current query model contains explicit `0`, `-1`, current-language, parent-subquery, and overlay branches across different callers (`MeetingMinutes/Weekly/2023/12/2023-12-15.md:111-181,233-342`).
- Complete self-contained layers were intended to remove cross-language lookup, but changing fallback configuration could trigger massive persisted shifts (`MeetingMinutes/Weekly/2024/10/2024-10-18.md:60-66`).
- Backend connection and frontend fallback remain different concerns (`MeetingMinutes/Weekly/2026/06/26.md:206-232`).
- A disabled translation currently cannot express “intentionally absent, do not fall back” in the discussed fallback behavior (`MeetingMinutes/Weekly/2026/07/10.md:68-80`).

### Architectural questions

- Does fallback select another variant at runtime, synchronize content ahead of time, or combine both by policy?
- Can query builders request `identity + language + availability state` through one canonical API?
- How are structural-only identities excluded from output but retained for navigation, permissions, and editing?
- Are caches keyed by site language ID, BCP 47 tag, identity, variant UID, fallback chain, synchronization state, or a stable combination?
- Can Extbase, Record API, DataProcessing, and direct Core rendering use the same resolution contract?

`Analytically Derived Recommendation`: do not equate “more rows” with “simpler queries” until the same representative workloads are benchmarked across all models.

## Backend UX and permissions

### Source-backed product direction

- `Problem`: editors currently face technical Translate/Copy and Free/Connected/Mixed choices even when their intent is simply to add or adapt content in one language (`MeetingMinutes/Weekly/2026/05/08.md:32-46`; `MeetingMinutes/Weekly/2026/07/24.md:37-75`).
- `Preferred Direction`: “Editing Language” should be a high-level editorial context distinct from backend UI language and should drive Page Tree and comparison views (`MeetingMinutes/Weekly/2026/05/08.md:48-68`).
- `Problem`: invisible structural nodes make sorting ambiguous, and cross-language structure changes need explicit permissions (`MeetingMinutes/Weekly/2026/05/29.md:47-61`).
- `Open Question`: fully independent structures remain valid; Free Mode has not been formally deprecated (`Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:203-223`; `MeetingMinutes/Weekly/2026/07/24.md:37-75`).

### Required UX contract

`Analytically Derived Recommendation`

- Editing Language selects the payload context; it must not silently grant structural permission.
- Structural permission and language-payload permission should be separate capabilities.
- Missing variants need distinct actions: translate from source, create independently, synchronize, mark intentionally absent, or connect to an existing identity.
- Technical shadows/projections must normally be hidden, but structural operations must reveal ambiguity before a move is committed.
- A “free” editorial experience can remain while the system maintains a technical identity link; genuine independence must be explicit rather than an accidental missing parent.

## Data volume and performance questions

No source supplies measurements. The following are `Open Question` and must be measured, not inferred:

1. Live rows per logical element and language distribution.
2. Workspace/history row multiplication.
3. Reference Index edges and rebuild time.
4. Write amplification for create, move, delete, restore, sync, site-language, and fallback changes.
5. Query count, join count, subquery cost, cache hit rate, and hydration cost for pages, `tt_content`, generic records, IRRE, and MM relations.
6. Backend list/page-tree payload when technical records are hidden or projected.
7. Import/export size and collision behavior across sites or instances.
8. Failure recovery when a multi-variant transaction or asynchronous synchronization stops halfway.

`Analytically Derived Recommendation`: use the same fixtures for all options—2, 5, 20, and 50 languages; sparse and dense translation coverage; deep nesting; MM/IRRE relations; global storage; live plus Workspace variants—and report absolute counts rather than adjectives such as “massive” or “simpler.”

## Migration and compatibility

### Source-backed state

- `In Progress`: inventory and characterization of `-1` branches and missing tests precede functional change (`MeetingMinutes/Weekly/2026/03/13.md:39-51`; `MeetingMinutes/Weekly/2026/07/24.md:27-35`).
- `Preferred Direction`: replacement must preserve maintain-once behavior before deprecation/removal (`MeetingMinutes/Weekly/2026/04/24.md:29-37`).
- `Open Question`: existing translations, source leadership, overwrite, provenance, and fallback/site changes prevent a trivial field rewrite (`MeetingMinutes/Weekly/2024/06/2024-06-28.md:36-82,122-130`).
- `Open Question`: moving current `0` content to a real language ID requires authoritative site/language mapping, which may be ambiguous (`MeetingMinutes/Weekly/2026/05/08.md:40-46`; `MeetingMinutes/Weekly/2026/07/31.md:55-61`).

### Proposed phased path

Except for the already-started characterization work, every phase below is an `Analytically Derived Recommendation`.

1. **Characterize:** classify every use of `-1` and `0` by semantic role; add tests for DataHandler, queries, overlays, permissions, relations, Workspaces, copy/move, import/export, and rendering.
2. **Introduce semantic APIs:** replace direct comparisons with explicit concepts such as `isAllLanguagesPolicy`, `isDefaultForSite`, `languageIdentity`, and `logicalRecordIdentity`, without changing storage behavior yet.
3. **Build an identity map:** dry-run grouping of connected/default/free records; list ambiguous copies, duplicate parents, orphan translations, and cross-site language collisions.
4. **Add BCP 47 mapping in parallel:** map site-local numeric languages to canonical tags while retaining a reversible compatibility mapping; require manual resolution for ambiguous cases.
5. **Add synchronization provenance and lifecycle:** implement states and conflict reporting before activating any flag or target group.
6. **Materialize `-1` replacements:** dry-run per record, show affected target variants and conflicts, then create concrete variants transactionally or through a recoverable queue.
7. **Prototype both structural candidates:** compare universal shadows and shared identity against Workspaces, versioning, Reference Index, query, sorting, permission, and UX scenarios.
8. **Migrate structure/relations behind compatibility APIs:** keep legacy reads available during a bounded transition; rebuild and validate references before switching canonical resolution.
9. **Introduce Editing Language UX:** hide compatibility rows only after structure, permission, and ambiguity behavior is proven.
10. **Deprecate/remove semantic `-1` and `0`:** only after old and new outputs match for preserved use cases, extension APIs have migration guidance, and rollback remains possible.

## Decision gates and open-question register

| ID | Decision gate | Why it blocks architecture selection | Status | Evidence |
|---|---|---|---|---|
| LID-1 | What is the authoritative BCP 47 representation, and do numeric surrogate keys remain? | Cross-site mapping, queries, FKs, import/export, and migration depend on it. | `Open Question` | Direction at `MeetingMinutes/Weekly/2026/07/31.md:55-61`. |
| RID-1 | What is the schema and lifecycle of logical record identity? | BCP 47 identifies language, not sibling grouping; Free records and copies remain ambiguous. | `Open Question` | Structural preference at `MeetingMinutes/Weekly/2025/10/2025-10-24.md:53-70`. |
| STR-1 | Which fields and relations are structural rather than language payload? | Determines storage, permissions, versioning, sync scope, and rendering. | `Open Question` | Unified-layer idea at `MeetingMinutes/Weekly/2026/06/26.md:116-160,216-224`. |
| SYN-1 | What exactly happens on sync enable, edit, target-set change, disable, delete, and restore? | Generated data is unsafe without provenance and reversible transitions. | `Open Question` | Gaps at `MeetingMinutes/Weekly/2024/06/2024-06-28.md:36-82`. |
| ABS-1 | How are untranslated, hidden, intentionally absent, inherited, and synchronized states represented? | Missing-row fallback cannot express all editorial intents. | `Open Question` | Disabled/fallback case at `MeetingMinutes/Weekly/2026/07/10.md:68-80`. |
| WS-1 | What is the Workspace/version unit and atomic publish boundary? | Full shadows multiply versions; neutral/hybrid split identity and payload. | `Open Question` | Warning at `MeetingMinutes/Weekly/2025/10/2025-10-24.md:74-78`. |
| REF-1 | Do relations and Reference Index target identity, variant, or both? | Canonical references, localized output, copy/move, and cleanup depend on it. | `Open Question` | Current behavior at `MeetingMinutes/Weekly/2024/04/2024-04-12.md:56-62`. |
| QRY-1 | Which fallback remains runtime and which becomes persisted synchronization? | Determines query simplicity, write amplification, and site-config change behavior. | `Open Question` | Resynchronization warning at `MeetingMinutes/Weekly/2024/10/2024-10-18.md:60-66`. |
| UX-1 | How do Editing Language, structural permission, and independent structure interact? | A hidden model is not usable if editors cannot understand or safely change structure. | `Open Question` | `MeetingMinutes/Weekly/2026/05/08.md:48-68`; `MeetingMinutes/Weekly/2026/05/29.md:47-61`. |
| SCALE-1 | What are the measured row, index, query, cache, and Workspace costs? | The central data-versus-code trade-off is currently qualitative. | `Open Question` | Competing claims at `MeetingMinutes/Weekly/2025/07/2025-07-18.md:61-73` and `MeetingMinutes/Weekly/2025/10/2025-10-24.md:45-78`. |
| MIG-1 | What is the reversible migration and extension-compatibility boundary? | A big-bang rewrite would span Core subsystems and project code. | `Open Question` | Test-first path at `MeetingMinutes/Weekly/2026/03/13.md:39-51`. |

## Comparative proof-of-concept acceptance criteria

`Analytically Derived Recommendation`

No option should be called simpler or preferred for Core implementation until one prototype corpus proves all of the following:

- Same output and visibility for strict, fallback, free, connected, mixed, `0`, and `-1` baseline scenarios.
- Deterministic create/edit/move/copy/delete/restore behavior in live and Workspaces.
- Stable logical identity when variants are created in any language, connected, detached, merged, or copied across sites.
- Correct MM, IRRE, file metadata, page, `tt_content`, and generic-record relations.
- Reference Index rebuild and stale-edge cleanup.
- Comparable query count, latency, cache behavior, row count, version count, and write amplification.
- Backend workflows for Editing Language, missing variants, intentional absence, target-language synchronization, structural permissions, and genuinely independent content.
- Dry-run migration with conflict classes, reversible execution, resumability, and extension/API compatibility reporting.

## Audit inputs reviewed in full

- `Analysis/T3DD26/SourceAudits/2023-weekly.md`
- `Analysis/T3DD26/SourceAudits/2024-H1-weekly.md`
- `Analysis/T3DD26/SourceAudits/2024-H2-weekly.md`
- `Analysis/T3DD26/SourceAudits/2025-H1-weekly.md`
- `Analysis/T3DD26/SourceAudits/2025-H2-weekly.md`
- `Analysis/T3DD26/SourceAudits/2026-Q1.md`
- `Analysis/T3DD26/SourceAudits/2026-April-May.md`
- `Analysis/T3DD26/SourceAudits/2026-June-July.md`
- `Analysis/T3DD26/SourceAudits/Monthly-and-Meta.md`

## Latest supportable architecture statement

The current system remains sparse and overlay-driven. The initiative's stable directions are to remove semantic magic values, make language identity stable with BCP 47, replace `Language All` with explicit synchronization, and hide unnecessary technical mode choices from editors. Complete language layers were a serious and at times preferred proposal, but the youngest comparative preference favors a shared structural identity because universal shadows create duplication, synchronization, and Workspace costs. The newest 2026 evidence still calls that layer a hypothesis.

The bounded hybrid in this document is therefore a candidate for evaluation, not an initiative or Core decision: **one complete shared structure, sparse editorial variants, explicit availability/provenance states, and selective materialization for synchronization groups.**
