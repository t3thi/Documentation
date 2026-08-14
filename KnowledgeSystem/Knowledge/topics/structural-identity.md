---
id: topic:structural-identity
title: "Structural Identity"
language: en
updated: "2026-08-14"
knowledge:
  - K-000002
  - K-000009
  - K-000010
  - K-000011
  - K-000012
  - K-000016
  - K-000019
  - K-000022
history: []
decisions: []
---

# Structural Identity

## Current synthesis

### 3. Structural Identity

**Question:** Which records represent the same logical content position across languages?

A logical content position is the shared place or role of a page, content element or other localizable record. It is not necessarily the record whose text was used as the translation source.

**Current coupling:** In Connected Mode, the record with
`sys_language_uid = 0` is both visible content in one real language and the
structural parent or lead for connected variants. Its language identity,
Site-default role and structural responsibility are therefore coupled. Free
Mode removes the parent relation. Mixed Mode combines both states on one page.
Core derives those labels from `l18n_parent`, displays them in the Layout module
and normally prevents direct content creation in a Connected-Mode target
column. A local addition therefore needs either a fabricated Default-Language
record or an independent record that loses the shared relation.

**Derived requirements:**

- TYPO3 must be able to preserve the shared majority while allowing explicit language-specific additions, omissions, replacement or reordering.
- A structural relation must not require meaningless visible content in another language.
- Editors should be able to create content directly in the language where it is needed without deciding whether that language or page is structurally Free, Connected or Mixed.
- Core should create and maintain the necessary structural identity automatically, including for content that exists in only one real language.
- A maintained structural connection must still allow language-specific additions, omissions, replacements and ordering.
- The system should manage relation integrity and prevent duplicate or impossible parent assignments.
- Content source, structural parent and current editing context must remain distinct.
- Structural reference and leadership must be modelled independently of which
  real language is configured as the Site's Default Language; no real output
  language should be structurally privileged for that reason alone.
- The model must cover pages, content and other localizable records while retaining necessary record-type differences.
- Editors need a clear view of which language variants exist and efficient creation workflows for records beyond pages and content, including file metadata.
- The mode distinction may disappear from normal editor UX only after creation, migration, permissions, deletion, restoration and Workspace behavior preserve today's valid outcomes.

**Vision:** The editor chooses the language and the intended content operation. Core maintains a technical connection to the same logical position while allowing each real language to have its own visible structure. Structural relationships should support "mostly connected, selectively different" content without artificial visible Default-Language partners or accidental loss of connection.

"Technically connected" does not mean that every language must render the same records in the same order. It means that Core retains an explicit cross-language identity even when a language omits, adds, replaces or reorders content. A genuinely independent editorial result therefore remains possible without using a missing parent relation as its storage contract.

**Editor-facing recommendation:** Remove the Free, Connected and Mixed mode distinction from the normal Layout workflow once Core can uphold that contract. This is a UI and product recommendation with architectural prerequisites. It is not a statement that existing Free-Mode data can already be converted safely or that independent structures should disappear.

**Editing Language:** The preferred product concept is a selectable content language from which the editor works, independent of the backend interface language. For example, a Chinese editor could create Chinese content from English while German remains the site default. The Layout module would place English where it currently always places the default language. This is a product direction, not an implemented feature.

#### Current structural preference and the two meanings of Shadow Record

The discussions have used "Shadow Record" for two materially different representations:

- A **language-layer shadow** is a placeholder inside a concrete language. It completes that language's structure even when the position has no visible content there.
- A **structural shadow** is one contentless record in a shared hidden structure layer. Real language records connect to it as their common structural identity; it is not duplicated into every language.

Conflating them would hide the main trade-off. The comparison also addresses a
migration dependency: if `0` no longer gives one real language implicit
structural leadership, an explicit Structural-Identity model must take over
that reference and responsibility. The initiative has discussed two possible
paths; neither is selected by the language-identity migration:

| Path | Representation | Benefit | Main risk or open work | Current assessment |
|---|---|---|---|---|
| **1. Complete structure in every language** | Every language contains every structural position and could in principle act as the structural lead. Core creates language-layer shadows wherever that language has no visible content. | Each language layer is structurally self-contained and can express local ordering. | Every local deviation must be projected into other language layers. Record volume, synchronization, Workspace versions, references and visible Layout density can grow with languages and structural differences. Even a small reorder can require several generated placeholders; the exact multiplier is model-dependent and has not been measured. | **Discussed, but currently disfavored in comparison with a shared layer. Not disproved or formally rejected.** |
| **2. Shared hidden structure plus real language layers** | Split the current Default Language's roles. A contentless, language-neutral structure layer stores each logical position; the current default output content moves to its own real language layer, like every other output language. Core creates a structural shadow when a language introduces a new position, and every real variant connects to that shared position. | One cross-language reference point without universal language-layer shadows; no real output language has to lead all structure. | The exact entity and identifier, migration of current Default-Language content, per-language ordering and absence, permissions, APIs, Workspaces, references and hiding the structural layer from backend and frontend output all require design and testing. | **Current preference for investigation. Still a hypothesis, not selected or implemented Core architecture.** |

The second path should remain invisible in normal editorial and frontend output. "Hidden" is part of the desired product behavior, not a claim about current Core. A shared identity alone also does not solve local ordering: the model still needs an explicit language-specific placement, ordering or delta contract.

**Open questions:**

- What exact record or entity owns structural reference and leadership if no
  real output language is privileged?
- Does a shared structure introduce a separate entity, use another
  representation or require a temporary compatibility mapping without keeping
  `0` as a semantic human-language identity?
- How are sorting, moves, local additions, omissions and replacements represented per language around one shared identity?
- Which structural records are visible to editors, APIs, references and Workspaces?
- When can an independently created record later join an existing structure safely?
- Which migration and lifecycle guarantees are prerequisites before the normal UI can stop showing Free, Connected and Mixed modes?
- How are existing Free- and Mixed-Mode records migrated without losing their independent outcome?
