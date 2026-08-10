# T3DD26 source dossier: April-May 2026

## Scope and evidence rules

- Repository root: `/Users/eric/docker/Translation-Handling-Initiative`.
- Reviewed in full: every Markdown file in `MeetingMinutes/Weekly/2026/04` and `MeetingMinutes/Weekly/2026/05`, plus the complete transcripts for 2026-04-24, 2026-05-08, and 2026-05-29.
- This dossier reports only evidence from that slice. It deliberately does not treat frequency or enthusiastic phrasing as a decision.
- The controlled status labels are exactly those requested for the overall analysis: **Current Core Behavior**, **Problem**, **Idea**, **Discussed Direction**, **Preferred Direction**, **Open Question**, **Planned**, **In Progress**, **Implemented**, and **Analytically Derived Recommendation**.
- Transcript evidence is interpreted in conversational context. Meeting minutes are cited as the cleaner summary and transcripts as the primary nuance/context evidence. Where the transcript is more tentative than the minutes, the transcript controls the status assessment.
- “Shadow record” in these meetings normally means a record in a still-existing, hidden `sys_language_uid = 0` structural layer. It must not silently be reinterpreted as either (a) a new language-neutral identity entity or (b) a materialized placeholder record in every target language.

## Complete review ledger

| File | Complete range reviewed | T3DD26 evidence | Non-evidence / exclusions |
|---|---:|---|---|
| `MeetingMinutes/Weekly/2026/04/24.md` | 1-75 | Yes: merged non-language-aware `IRRE` behavior; `-1` strategy, tests, patches, parent-child semantics, Core alignment | 1-16 metadata; 17-21 minutes catch-up except the patch pointer; no other Markdown files exist in the April directory |
| `MeetingMinutes/Weekly/2026/05/08.md` | 1-68 | Yes: roadmap framing, `-1` replacement, BCP 47 perspective, hidden structural layer, editing language, prototype plan | 1-15 metadata only; no other Markdown files exist in the May directory besides the two listed May files |
| `MeetingMinutes/Weekly/2026/05/29.md` | 1-77 | Yes: shadow-record model, extension/prototype option, creation/sorting/permission lifecycle, Free/Connected behavior, Lolli follow-up | 1-16 metadata; 17-21 contributor setup is only indirectly relevant as review capacity; 73-77 schedule is relevant only for the planned `-1` follow-up |
| `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt` | 1-507 | Yes: full context for every April item | 1-18 greetings/minutes catch-up; 44-59 patch-comment recollection; 480-507 closing/personal exchange |
| `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt` | 1-752 | Yes: full context for every 8 May item | No substantial off-topic block; 104-120 humorous aside and 674-693 screenshot-manipulation mechanics are not architectural evidence |
| `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt` | 1-794 | Yes: full context for every 29 May item | 1-20 contributor-setup banter; 501-622 permission-test setup mechanics; 726-774 calendar logistics except that they establish the 11 June follow-up date; 787-794 closing |

All six required sources contain at least some relevant evidence; therefore there is no wholly “no-evidence” file in this slice. The excluded ranges above make the full-file review auditable.

## Executive synthesis as of 2026-05-29

1. **Relatively clear direction, not a roadmap decision:** the participants want to remove the special `-1` “all languages” semantic only together with a replacement that preserves “maintain once, affect several/all languages.” The leading replacement idea is an explicit boolean on a default/structural record, backed by synchronization into dedicated language records; a later target-language multi-select is a possible product enhancement. Evidence: `MeetingMinutes/Weekly/2026/04/24.md:31-37`; `MeetingMinutes/Weekly/2026/05/08.md:24-30`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:133-166`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:47-76`.
2. **Immediate engineering direction:** understand and characterize `-1` behavior before changing it. The WIP inventory patch, missing Workspace tests, and parent-child tests are groundwork. Site-configuration languages must be removed from the `-1` inventory because they cannot be `-1`. No source in this slice shows `-1` removal implemented. Evidence: `MeetingMinutes/Weekly/2026/04/24.md:49-57`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:225-260,415-439`.
3. **May product-story pivot:** `-1` removal alone was judged hard to sell because it is foundational refactoring with little direct editor benefit. The more legible product story became an **editing language** plus a hidden structural layer, allowing editors to add language-specific content while retaining a connected relationship. Evidence: `MeetingMinutes/Weekly/2026/05/08.md:24-30,40-68`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:47-76,217-226,495-518,701-738`.
4. **Nature of the hidden layer:** the discussed near-term model does **not** remove `0`; it repurposes/hides `sys_language_uid = 0` as a non-output structural layer. Every real editorial language, including today’s default output language, would have a positive/dedicated language identity; a new content element created in a translation would create a `0`-layer partner so `l10n_parent`/Connected Mode can continue. Evidence: `MeetingMinutes/Weekly/2026/05/08.md:40-46`; `MeetingMinutes/Weekly/2026/05/29.md:23-27`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:131-194`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:21-38`.
5. **The idea became more concrete, and more conditional, on 29 May:** creation, ordering, placeholder visibility, merging of independently created shadows, and permissions expose substantial unresolved lifecycle issues. Reliable structural sorting may require all relevant structural nodes to be visible or an ambiguity-resolving modal. Evidence: `MeetingMinutes/Weekly/2026/05/29.md:31-61`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:105-150,178-200,203-266,270-481`.
6. **Free Mode is not decided for deprecation:** the desired flexible Connected Mode could replace Free Mode for the common case of small per-language additions. The team explicitly recognized that radically divergent language trees could produce hundreds of structural nodes/placeholders and that completely removing Free Mode remained “daring”; May 8 also said Free Mode could remain available. Evidence: `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:131-140,720-738`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:203-223`.
7. **BCP 47 is a longer-term perspective in this slice:** removing numeric special semantics, especially eventually the special role of `0`, was described as preparing BCP-47-based language identification and opportunities such as cross-root references and file translations. There is no BCP 47 data model, migration, implementation, region/script/private-subtag policy, or decided authority model here. Evidence: `MeetingMinutes/Weekly/2026/05/08.md:24-30`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:61-76`.
8. **No decision on complete per-language materialization:** these meetings discuss a complete hidden structure and UI placeholders, not a decided architecture in which a database record exists in every language layer. Nor do they define a new neutral identity table. Those are open interpretations that require other sources or future architectural work.

## Evolution of the reasoning across the three meetings

### 2026-04-24: characterize `-1`, preserve use cases, seek Core alignment

- **[Preferred Direction]** `-1` was the higher strategic priority than the new Free Mode copy/move patches, but the work should remain test-first and stepwise. Eric’s “waiting is not an option” was immediately bounded by resource and Core-support uncertainty. Sources: `MeetingMinutes/Weekly/2026/04/24.md:29-41`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:133-180`.
- **[Preferred Direction]** Deprecation is meaningful only after an alternative exists for the functional “maintain once, affect all languages” use case. Sources: `MeetingMinutes/Weekly/2026/04/24.md:33-37`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:149-160`.
- **[Planned]** Prepare options and a stepwise plan before Developer Days and obtain input from Lolli/Core on feasible test scenarios and the migration/removal path. Sources: `MeetingMinutes/Weekly/2026/04/24.md:69-75`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:436-475`.
- **[Open Question]** Current parent-child combinations involving `-1` were not sufficiently understood. The group deliberately preferred tests over prematurely enforcing rules that might become obsolete when `-1` records become explicit language records. Sources: `MeetingMinutes/Weekly/2026/04/24.md:59-67`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:294-426`.

### 2026-05-08: reposition foundational work behind an editor-facing vision

- **[Problem]** Removing `-1` by itself can look like removing a feature and offers no obvious editor benefit if behavior remains seamless. Sources: `MeetingMinutes/Weekly/2026/05/08.md:24-30`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:47-70,196-224`.
- **[Discussed Direction]** Frame roadmap outreach broadly as “further development of multilingual support,” not as a narrow delivery promise. Sources: `MeetingMinutes/Weekly/2026/05/08.md:16-22`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:1-45`.
- **[Discussed Direction]** Reuse the historic `0` storage model but hide it as structure; expose only real editorial languages and let background shadow records keep Connected Mode. This is a pragmatic alternative to an immediate BCP 47/identity rewrite. Sources: `MeetingMinutes/Weekly/2026/05/08.md:40-46`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:131-194`.
- **[Preferred Direction]** “Editing language” was selected over “source language” because it denotes the language currently used by the editing interface, not necessarily a translation source and not the backend UI language. Sources: `MeetingMinutes/Weekly/2026/05/08.md:60-64`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:591-663`.
- **[Planned]** Shift near-term effort from Core patching to sketches/clickable prototype material that demonstrates the editor experience; defer deep implementation discussion until stakeholders understand the concept. Sources: `MeetingMinutes/Weekly/2026/05/08.md:60-68`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:495-518,667-738`.

### 2026-05-29: test the concept against creation, sorting, permissions, and divergence

- **[Discussed Direction]** An extension-based proof of concept could hide default output using existing page configuration, reshape the backend, and later create structural partners through `DataHandler` hooks. A hybrid concept/prototype approach was favored as useful for discovering errors, but not committed. Sources: `MeetingMinutes/Weekly/2026/05/29.md:31-37`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:52-127`.
- **[Open Question]** Independently created records in two languages can produce separate structural partners; the model needs a way either to connect/merge them or to preserve deliberate independence. Sources: `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:105-116`.
- **[Open Question]** Hiding structural nodes makes sorting ambiguous because an invisible record can lie between two visible ones; the same visible move can imply different orders in another language. Sources: `MeetingMinutes/Weekly/2026/05/29.md:47-55`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:270-398`.
- **[Open Question]** Cross-language structural changes require a permission model; a likely default would allow one configured language to lead structural changes, but current global `sorting` writes complicate language-specific permissions. Sources: `MeetingMinutes/Weekly/2026/05/29.md:57-61`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:462-481`.
- **[Discussed Direction]** Flexible Connected Mode is suited to small structural divergences; completely replacing Free Mode is unresolved because highly divergent sites would create an impractical amount of structure and UI clutter. Sources: `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:203-223`.
- **[Planned]** Lolli had requested a written position on `-1`; the group deferred the balance between that request and the broader strategy story to the 11 June discussion. Sources: `MeetingMinutes/Weekly/2026/05/29.md:73-77`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:775-786`.

## Current Core behavior and diagnosed pain

### Connected, Free, and relationship semantics

- **[Current Core Behavior]** In the discussed current model, meaningful connected translation relations run from a non-default-language record to a default-language parent; a relation from one non-default language directly to another is treated as not meaningful. Consequently, copying into a Free Mode/non-default target must discard existing translation overlays/relations or it would leave orphan translations. Sources: `MeetingMinutes/Weekly/2026/04/24.md:39-45`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:185-200`.
- **[In Progress]** Patch `#93752` was intended to skip overlays on copy into Free Mode; Eric regarded its behavior as correct but lower priority than `-1` work. A related `EXT:dbdoctor` cleanup was contemplated for legacy orphans. Sources: `MeetingMinutes/Weekly/2026/04/24.md:41-43`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:175-190,242-245`.
- **[In Progress]** Patch `#93819` guarded moves of translated `tt_content` in Free Mode, but its several-hundred-line `DataHandler` delta was considered too difficult to review and needed reduction/cross-review before human review. This is evidence that small-looking translation UX rules can penetrate deeply into `DataHandler`. Sources: `MeetingMinutes/Weekly/2026/04/24.md:45-47`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:192-220`.
- **[Problem]** Connected Mode does not naturally let an editor add content that exists only in a translated language. The present choices are to switch the whole translation to Free Mode and lose connected behavior, or create an otherwise unnecessary default-language record and translate it. Sources: `MeetingMinutes/Weekly/2026/05/08.md:32-42`; `MeetingMinutes/Weekly/2026/05/29.md:23-27`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:78-100,121-140`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:21-38`.
- **[Current Core Behavior]** TYPO3 v14 enforces `CType` consistency for connected `tt_content` translations; the referenced older change also locked `colPos`. Changing a translation from, for example, a teaser into a fallback text element is considered structural divergence and fits Free Mode under the current conceptual distinction. Sources: `MeetingMinutes/Weekly/2026/05/08.md:32-38`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:78-131`; `MeetingMinutes/Weekly/2026/05/29.md:39-45`.
- **[Problem]** Real projects have nevertheless used different translated `CType` values while preserving other connected benefits. One concrete use case had default-language teaser links to untranslated pages, while the translated counterpart used a textual fallback and link back to the default page. The v14 lock can therefore be consistent with the model yet costly for existing projects. Sources: `MeetingMinutes/Weekly/2026/05/08.md:32-38`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:78-131`.
- **[Current Core Behavior]** The May 29 live exploration found that a Spanish-only editor could see the default context in Language Comparison but could not successfully drop connected translated content; the drag affordance still appeared, which was judged a small UI defect. In Free Mode the same user could create and move Spanish content. Sources: `MeetingMinutes/Weekly/2026/05/29.md:63-69`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:621-683`.
- **[Current Core Behavior]** In the tested TYPO3 v14 workflow, the first operation on an empty translated column makes the editor choose Translate or Copy. The older path in which a Free Mode element acquired `l10n_parent` and slipped into Mixed Mode was not directly reproducible through the normal wizard; an inconsistent relation could still be forced by explicitly setting the parent field. Sources: `MeetingMinutes/Weekly/2026/05/29.md:69-71`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:689-724`.
- **[Problem]** These UI facts leave technical model choices exposed to editors: Translate versus Copy/Free, whether a parent relation exists, and whether a language-specific addition should remain connected. The May vision aims to move those decisions behind the system, but this is a product goal, not implemented behavior.

### `sys_language_uid = -1` and special-case behavior

- **[Current Core Behavior]** `-1` represents content maintained once and effective in all languages; the participants treated preserving that use case as mandatory even if its storage representation changes. Sources: `MeetingMinutes/Weekly/2026/04/24.md:33-35`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:149-160`; `MeetingMinutes/Weekly/2026/05/08.md:24-30`.
- **[Problem]** Simply removing `-1` removes an editor-visible capability unless an alternative and migration path ship with it. Its technical cleanup is therefore weak as a standalone product/roadmap story. Sources: `MeetingMinutes/Weekly/2026/05/08.md:24-30`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:47-76,207-224`.
- **[Problem]** Keeping a single `-1` record in the proposed hidden-`0` model creates an ownership/editing question: if the old default column is invisible, where are the shared fields maintained? Showing the same record in every language retains a special frontend lookup; editing it anywhere and synchronizing to every language was suggested as an alternative. Sources: `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:168-194`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:379-395`.
- **[Current Core Behavior]** Site-configuration languages cannot themselves use `-1`; processing paths based on site-configuration language objects are therefore not relevant evidence of `-1` record semantics and should be removed from the inventory patch. Sources: `MeetingMinutes/Weekly/2026/04/24.md:49-51`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:225-236`.
- **[Open Question]** Core currently permits, or at least does not clearly prevent, broad parent-child language combinations. The participants did not know which combinations were supported intentionally versus accidentally and asked for tests before defining new rules. Sources: `MeetingMinutes/Weekly/2026/04/24.md:59-67`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:294-348,401-439`.

### `IRRE`, child records, and explicit persisted copies

- **[Implemented]** Core patch `#88837`, merged 2026-04-11 according to the meeting, changed localization of a parent whose `IRRE` field references a non-language-aware child table. The child is skipped in the localization branch, avoiding remapping that would “steal” the original, and synchronization creates/assigns a separate child record to the localized parent. Sources: `MeetingMinutes/Weekly/2026/04/24.md:23-27`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:19-42,59-68`.
- **[Problem]** That fix had prompted concerns about data economy, duplication, and possible performance cost; the meeting nevertheless regarded separate synchronized child records as aligned with the initiative’s desired behavior. This is a concrete precursor to the broader “explicit data versus runtime special logic” discussion, but no measurement was supplied. Sources: `MeetingMinutes/Weekly/2026/04/24.md:23-27`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:37-68`.
- **[Discussed Direction]** A language-all parent with language-specific children was considered a legitimate use case: a product-like parent can be shared across languages while child texts render only in their own languages. Sources: `MeetingMinutes/Weekly/2026/04/24.md:59-63`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:294-317`.
- **[Idea]** Eric derived that an `IRRE` child marked language-all under a translated parent is probably unnecessary because that parent renders only in its own language; a connected translated parent should follow the default parent’s children, while independent children imply Free Mode. André found the reasoning plausible but required tests. This was not adopted as a Core rule. Sources: `MeetingMinutes/Weekly/2026/04/24.md:61-67`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:315-413`.
- **[Preferred Direction]** Do not spend effort enforcing `-1`-specific parent-child rules if the replacement will materialize dedicated language records and make those rules obsolete. Characterize current cases first. Sources: `MeetingMinutes/Weekly/2026/04/24.md:65-67`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:415-439`.

### Sorting and permissions

- **[Current Core Behavior]** According to the May 29 discussion, TYPO3 writes the `sorting` field across the page’s elements even when editors work in individual languages, making language-specific sorting permissions difficult. This statement was conversational and should be technically validated before presentation as definitive Core internals. Sources: `MeetingMinutes/Weekly/2026/05/29.md:57-61`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:462-490`.
- **[Problem]** If structurally relevant records from another language are hidden between two visible records, moving a visible record has multiple possible positions in the shared order; the result can differ in another language even though the current-language view looks identical. Sources: `MeetingMinutes/Weekly/2026/05/29.md:47-55`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:270-378`.
- **[Problem]** The same ambiguity applies when creating content: the automatically created structural record’s position governs where untranslated placeholders appear elsewhere. Forcing creation back into a separate structure view would reproduce the current default-language burden and undermine the product goal. Sources: `MeetingMinutes/Weekly/2026/05/29.md:53-55`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:411-429`.

## BCP 47 and stable language identity

- **[Discussed Direction]** May 8 describes a long-term progression: remove `-1`; eventually remove the special `0` semantics; then identify languages using BCP 47 language text/tags rather than semantically loaded numeric identifiers. It is explicitly called a “perspective,” not the near-term implementation. Sources: `MeetingMinutes/Weekly/2026/05/08.md:24-30`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:61-76`.
- **[Idea]** The proposed hidden-layer transition would give every actual editorial language, including today’s default output language, a dedicated positive identifier while retaining `0` only as background structure. This separates editorial/output language from the special structural slot but does not yet establish BCP 47 as the database authority. Sources: `MeetingMinutes/Weekly/2026/05/08.md:40-46`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:142-166,217-240`.
- **[Open Question]** A migration is required to move current default-language content to a real target-language identifier, and that identifier may not yet exist in an installation. The transcript floated consulting site configuration and reusing an existing internal UID for the same language across sites or creating one, but did not resolve the authority or mapping algorithm. Sources: `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:217-240`.
- **[Idea]** BCP 47 was linked to future “cross-root referencing” and “file translations.” The minutes generalize this only as future capabilities, so the strongest source wording should remain a possibility, not a promised use case. Sources: `MeetingMinutes/Weekly/2026/05/08.md:28-30`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:68-76`.
- **[Analytically Derived Recommendation]** For the session, use a restrained two-site example: two sites contain the same real language but currently depend on local numeric configuration; a stable BCP 47 identity could provide the matching key while numeric database IDs remain internal references. The “could” is essential: these April/May sources do not define whether numeric IDs remain, how a global registry works, or how collisions/variants are migrated.
- **[Open Question]** No April/May source specifies BCP 47 canonicalization, region/script handling, private subtags, authoritative storage, mapping between record language and site language, API changes, import/export, external translation services, XLIFF mechanics, or global storage-page behavior. Those themes require evidence from other dates or must remain analytical possibilities.

## Replacing `sys_language_uid = -1`

### Functional replacement

- **[Preferred Direction]** Removal and replacement belong together. The replacement must express “maintain content once and have it affect all languages” without persisting `-1` in the record’s language field. Sources: `MeetingMinutes/Weekly/2026/04/24.md:33-37`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:149-160`; `MeetingMinutes/Weekly/2026/05/08.md:24-30`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:61-72`.
- **[Discussed Direction]** The direct replacement discussed on May 8 is a boolean flag on the default/structural-language record. It would cause the content to be synchronized into every language as dedicated records. The participants treated this as the preparatory/direct-equivalence step, not a completed design. Sources: `MeetingMinutes/Weekly/2026/05/08.md:24-30`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:61-76`.
- **[Idea]** A subsequent multi-select could replace all-or-nothing distribution with explicit target languages and thereby offer a tangible editor-facing feature. It was presented as a later step whose feasibility/timing was unknown. Sources: `MeetingMinutes/Weekly/2026/05/08.md:26-30`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:68-76,217-224`.
- **[Idea]** In the hidden-structure model, the shared content might be editable in any real language and every edit then synchronized to all other language records. This emerged as a response to the question “where is the content edited when the structural language is invisible?” and was not designed further. Sources: `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:379-395`.

### Synchronization primitives

- **[Current Core Behavior]** Existing mechanisms named as building blocks were `l10n_mode=exclude` and `allowLanguageSynchronization`. The already merged non-language-aware-`IRRE` case also uses synchronization to create/assign separate children. Sources: `MeetingMinutes/Weekly/2026/04/24.md:23-27`; `MeetingMinutes/Weekly/2026/05/08.md:44-46`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:59-68`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:185-194`.
- **[Idea]** A possible future `enforceLanguageSynchronization` was regarded as technically near to those primitives and preferable to reversing the relation so the structural record maintains a target-language list. Sources: `MeetingMinutes/Weekly/2026/05/08.md:44-46`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:185-205`.
- **[Preferred Direction]** Keep the storage relationship close to today’s one-to-one parent relation. A reverse one-to-many list on the structural record would require a central relation table (a comma-separated list was rejected outright) and was judged more complex. Sources: `MeetingMinutes/Weekly/2026/05/08.md:44-46`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:196-205`.
- **[Open Question]** These sources do not actually define the behavioral contract of `enforceLanguageSynchronization`: they do not state exactly which fields are enforced, whether editors can break synchronization, how all fields differ from selected fields, or how the mechanism records provenance. The requested distinction from `allowLanguageSynchronization` therefore cannot be asserted from this slice beyond “a prospective stronger/enforced mechanism.”

### Unresolved lifecycle and migration

- **[Open Question]** No April/May source answers what happens when the proposed all-languages flag is enabled while manually maintained translations already exist: overwrite, adopt, exclude, compare, or block are all unresolved.
- **[Open Question]** No source answers what happens when the flag is disabled: delete generated copies, detach them, or convert them into independently maintained records.
- **[Open Question]** No provenance marker is defined for distinguishing automatically synchronized copies from editorially independent translations. The related shadow-record discussion explicitly leaves even the structural marker open, reinforcing that lifecycle metadata is unfinished. Source: `MeetingMinutes/Weekly/2026/05/29.md:39-45`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:139-150`.
- **[Open Question]** The sources do not specify whether adding a new configured language automatically triggers backfill, how failed synchronization is retried, how deletions cascade, how conflicts are reported, or whether synchronization is synchronous in `DataHandler` or queued.
- **[Open Question]** A migration path is treated as mandatory, but no Upgrade Wizard, reversible data migration, compatibility layer, feature flag, or deprecation window is designed in this slice. Sources: `MeetingMinutes/Weekly/2026/05/08.md:24-30`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:61-76,217-227`.

## Reconsidering language `0`: hidden structure, not yet removed

### Proposed model

- **[Current Core Behavior]** The current default language is the structural anchor for connected translations. Editors who need an additional translated-only element either create a placeholder/default record first or leave the connected structure. Sources: `MeetingMinutes/Weekly/2026/05/29.md:23-27`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:21-38`.
- **[Discussed Direction]** Retain `sys_language_uid = 0` internally as a non-output structural layer, hide it in the backend, and move every real content language to its own editorial language ID. The structural layer should mainly contain nodes/relationships, not translated editorial content. Sources: `MeetingMinutes/Weekly/2026/05/08.md:40-50`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:142-166,265-299`; `MeetingMinutes/Weekly/2026/05/29.md:23-27`.
- **[Idea]** When an editor creates `tt_content` in a real language, the system automatically creates a connected structural/default partner. `l10n_parent` can continue to express the connection. Sources: `MeetingMinutes/Weekly/2026/05/29.md:23-27,39-45`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:21-38,127-176`.
- **[Open Question]** Whether a shadow needs an explicit marker, whether required/text fields are copied, and whether it remains empty were explicitly left open. Existing TCA mandatory fields and `IRRE` behavior were also raised as implementation questions. Sources: `MeetingMinutes/Weekly/2026/05/29.md:39-45`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:507-518`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:139-150`.
- **[Open Question]** The model must distinguish two intentions when content appears independently in another language: connect it to an existing identity/shadow or keep it independent. It must also support merging/linking two independently created structural partners later. Sources: `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:105-116`.

### Relation to a neutral identity layer

- **[Problem]** The discussed layer is “neutral” only from the editor/output perspective. Technically it remains the historical `0` record layer and uses current parent storage. Thus it removes the editorial privilege of the default output language but does not remove the numeric special value from the data model.
- **[Open Question]** No new identity table, UUID/content-identity object, neutral relation entity, or parentless sibling model is proposed in these dates. No answer is given to whether a localized variant can become the source for another while preserving shared identity.
- **[Analytically Derived Recommendation]** Present this May model as a pragmatic transitional/alternative architecture: **hidden `0` structural anchor + real-language children**. Contrast it with a genuinely language-neutral identity entity only as a still-open architectural alternative sourced elsewhere. Calling the May model “the neutral identity layer” without this qualification would overstate it.

### Extension/prototype path

- **[Idea]** An extension proof of concept could use page-level `l18n_cfg` to hide default-language output, configure the site’s default as a non-output structural language, add translated-column controls, and create structural partners via `DataHandler` hooks. Sources: `MeetingMinutes/Weekly/2026/05/29.md:31-37`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:52-87`.
- **[Discussed Direction]** A hybrid prototype can reveal invalid assumptions before a huge Core patch, possibly contributing parts back later. The counter-risk is spending all effort on backend implementation before the product concept is coherent. Sources: `MeetingMinutes/Weekly/2026/05/29.md:31-37`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:89-127`.
- **[Planned]** During early prototype work, keep the default column visible as a diagnostic so developers can verify automatic structural creation; hide it only later. Sources: `MeetingMinutes/Weekly/2026/05/29.md:39-43`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:127-150`.
- **[Open Question]** No prototype was reported as built by 29 May. The choice between a click dummy, extension, and Core-adjacent proof of concept remained unresolved.

## Completeness of language layers, placeholders, and shadow records

### What these sources do support

- **[Discussed Direction]** The hidden structural layer should contain every structurally relevant node, even if an editorial language lacks a corresponding page/content translation. The Page Tree should remain structurally complete and visually mark entries missing in the selected editing language. Sources: `MeetingMinutes/Weekly/2026/05/08.md:48-58`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:228-299,331-370`.
- **[Discussed Direction]** The Page Tree only needs to convey structure and “exists somewhere”; detailed per-language availability belongs in Page/List/Language Comparison views. Showing icons for every available language would not scale. Sources: `MeetingMinutes/Weekly/2026/05/08.md:50-56`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:350-400`.
- **[Idea]** Missing content partners can be represented as subdued/untranslated placeholders. In an editing-language-centered view, only placeholders derived from that editing language might be shown to reduce clutter; whether this hides information editors need remains open. Sources: `MeetingMinutes/Weekly/2026/05/29.md:47-55`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:178-266`.
- **[Preferred Direction]** For operations that change shared structure, all structurally relevant records must be considered. The team converged on “reliable moving requires awareness of all shadow records,” even if the normal view later hides some. Sources: `MeetingMinutes/Weekly/2026/05/29.md:47-55`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:270-409`.
- **[Idea]** UI mitigations include: disable cut/paste and drag/drop unless an “all untranslated shadows” mode is active; initially display everything and optimize later; or show a modal only where several structural target positions are possible. Sources: `MeetingMinutes/Weekly/2026/05/29.md:49-55`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:397-460`.

### What these sources do not support

- **[Open Question]** A complete structural index does not prove a complete persisted record set in every language. The target-language “placeholders” may be UI projections of hidden structural records; the meetings do not decide that placeholder rows must be written in each missing language.
- **[Open Question]** No formula estimates record multiplication. The only scale warning is qualitative: with many highly divergent languages the structural layer and UI can contain hundreds/many nodes and placeholders. Sources: `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:190-223,239-249,397-460`.
- **[Open Question]** No source compares query plans, database indexes, cache behavior, Reference Index size, Workspace version multiplication, or rendering performance for full language-layer materialization versus sparse overlays.
- **[Open Question]** Workspace evidence in this slice concerns characterization of current `-1` paste behavior (`#93289`), not Workspace semantics for future shadows or complete layers. Sources: `MeetingMinutes/Weekly/2026/04/24.md:49-55`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:225-252`.
- **[Analytically Derived Recommendation]** For the session, distinguish three diagrams explicitly: (1) sparse current translated records; (2) May’s complete hidden structural spine plus optional real-language variants/UI placeholders; (3) fully materialized per-language layers. Only model (2) is directly advanced in these meetings, and even it remains conceptual.

## Editing language and editor-facing workflow

### Definition and intended scope

- **[Preferred Direction]** “Editing language” was the preferred term after rejecting “source language”: source suggests the language copied from, whereas editing language is the language currently underlying the editing interface. Sources: `MeetingMinutes/Weekly/2026/05/08.md:60-64`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:591-637`.
- **[Discussed Direction]** It is a session/context switch comparable in prominence to Workspaces and can change repeatedly during a session. It must not alter backend label/UI language: a Spanish-speaking editor may use Spanish backend labels while editing American English content. Sources: `MeetingMinutes/Weekly/2026/05/08.md:60-64`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:591-637`; `MeetingMinutes/Weekly/2026/05/29.md:23-27`.
- **[Discussed Direction]** The selected editing language would drive the Page Tree, the primary/left column of Language Comparison, and possibly which untranslated placeholders appear in comparison/target columns. Sources: `MeetingMinutes/Weekly/2026/05/08.md:48-64`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:591-663`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:227-266`.
- **[Preferred Direction]** At the end of the May 8 discussion, Eric called selecting an editing language the central sales argument. It bundles flexible per-language additions, hidden shadows, and a potential `-1` replacement into a visible editor benefit; this is product framing, not a Core decision. Sources: `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:701-740`; summarized in `MeetingMinutes/Weekly/2026/05/08.md:60-68`.

### Page Tree and Page/Layout Module behavior

- **[Idea]** In a selected editing-language Page Tree, a structurally existing page lacking that language should remain at its correct position but appear subdued/marked as unavailable. Its temporary label could come from another available language; choosing fallback preference was postponed. Sources: `MeetingMinutes/Weekly/2026/05/08.md:48-54`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:247-370`.
- **[Open Question]** A tree assembled from the first available translation could mix labels from several languages, which may confuse editors. The group favored a generic structural indication over showing every available-language icon, but did not decide the exact label/icon/fallback rule. Sources: `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:260-400`.
- **[Discussed Direction]** Clicking a page missing in the editing language should not display another language’s content as though it belonged to the current context. The Page/Layout Module should instead show a clear empty state and a “Translate Page/Translate Now” action. Sources: `MeetingMinutes/Weekly/2026/05/08.md:54-58`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:401-458`.
- **[Preferred Direction]** Reuse the existing translation wizard: target language is implicit in the editing context; after the action, the editor chooses a source language and which content elements to translate. Sources: `MeetingMinutes/Weekly/2026/05/08.md:54-58`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:451-590`.
- **[Idea]** Once the page exists but is empty, its editing-language column can show “Create New Content,” while other language columns remain comparisons/sources. Sources: `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:628-663`.
- **[Open Question]** Editing language is not automatically the sole structural lead. May 8 briefly entertained moving from any language because all structure is shared; May 29 uncovered cross-language permission and invisible-order problems and leaned toward allowing structural changes in one configured language by default. Sources showing evolution: `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:231-245`; `MeetingMinutes/Weekly/2026/05/29.md:47-61`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:270-481`.

### Prototype/story status

- **[Planned]** Prepare sketches or a clickable prototype resembling the v14 Page/Layout Module, List Module, and Page Tree; AI-assisted HTML or screenshot editing was suggested instead of a real Core patch. Sources: `MeetingMinutes/Weekly/2026/05/08.md:60-68`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:495-518,667-701`.
- **[Open Question]** By May 29 no sketch/prototype had been produced. An extension-based implementation was newly proposed, but Eric warned that it could displace strategic concept work. Sources: `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:21-45,52-127`.

## Translation versus localization and the future of Free Mode

- **[Problem]** The current workflow asks editors to make technical model choices when their actual intent may be only “I need an element in this language.” Connected Mode demands a default-language partner; Free Mode removes useful connections; Translate/Copy determines relation semantics early. Sources: `MeetingMinutes/Weekly/2026/05/08.md:32-38`; `MeetingMinutes/Weekly/2026/05/29.md:23-27,63-71`; transcript detail: `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:21-38,621-724`.
- **[Preferred Direction]** For the common case of a few language-specific additions, the editor should create content directly in the selected language while TYPO3 creates the structural partner and preserves Connected Mode in the background. Sources: `MeetingMinutes/Weekly/2026/05/29.md:23-27,39-45`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:720-738`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:21-38,127-176`.
- **[Discussed Direction]** This flexible Connected Mode could absorb many uses of Free Mode without generating Mixed Mode. May 8 nevertheless retained Free Mode as an available independent option. Sources: `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:131-140,720-738`.
- **[Open Question]** On May 29 Eric described the idea as replacing Free Mode with a more flexible Connected Mode, then immediately bounded it: completely divergent languages may need genuinely independent trees, and forcing hundreds of shadows/placeholders would be untenable. Jo Hasenau’s earlier caution against fully dropping Free Mode was recalled. Sources: `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:203-223`.
- **[Open Question]** The sources do not use “Free Mode deprecation” as a concrete, scheduled action. They interrogate its UX/semantics and consider reducing its necessity. The presentation must not claim deprecation is decided or planned.
- **[Open Question]** The sources do not establish a general domain distinction between “translation” and market/context “localization.” They do support the product principle that a language-specific variant can differ structurally and need not force editors to manage technical parentage, but the future identity semantics remain unsettled.

## Database/data-model complexity versus runtime/code complexity

- **[Implemented]** The non-language-aware `IRRE` fix accepts extra synchronized child records to avoid remapping/ownership problems. The prior objection was data economy/duplication/performance; the accepted result favors explicit ownership. Sources: `MeetingMinutes/Weekly/2026/04/24.md:23-27`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:37-68`.
- **[Discussed Direction]** For `-1`, Eric preferred dedicated synchronized language records over retaining one shared record and special lookup logic. Existing synchronization primitives were the rationale. Sources: `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:168-194`.
- **[Preferred Direction]** Preserve today’s one-to-one child-to-structural-parent relation rather than introduce a reverse one-to-many target list/relation table at the core identity point. Sources: `MeetingMinutes/Weekly/2026/05/08.md:44-46`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:196-205`.
- **[Problem]** Hidden structural records scale with independent additions. With many divergent languages the database structure and, especially, the placeholder UI could become very large/cluttered. The team did not quantify storage or query cost. Sources: `MeetingMinutes/Weekly/2026/05/29.md:47-55`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:190-249,397-460`.
- **[Open Question]** The exact “where should complexity live?” trade-off is not concluded in these meetings. They provide supporting examples but no comparative architecture analysis, performance benchmark, query simplification inventory, or decision between full per-language materialization and a single structural spine.
- **[Analytically Derived Recommendation]** Use the `IRRE` fix as a small, real precedent: an extra persisted child was accepted to restore explicit ownership and synchronization. Then present the hidden-structure proposal as the larger unresolved version of the same trade-off. Avoid claiming the precedent proves full language layers are desirable.

## Technical work and evidence status

### Implemented

- **[Implemented]** `#88837`: merged 2026-04-11 according to the April meeting; non-language-aware `IRRE` children of a localized parent are handled through synchronization into separate assigned records rather than being stolen by remapping. Sources: `MeetingMinutes/Weekly/2026/04/24.md:23-27`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:19-42,59-68`.

### In progress / existing WIP

- **[In Progress]** `#92267`: described on 24 April as a WIP marker/comment inventory of Core locations involving `-1`. It had merge conflicts; Eric intended to rebase it and remove site-configuration-language findings because those languages cannot be `-1`. The change was expected to become smaller and reveal future touch points. Sources: `MeetingMinutes/Weekly/2026/04/24.md:49-51`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:225-236`.
- **[In Progress]** `#93289`: WIP Workspace coverage for language-all paste. Live copy/paste scenarios appeared substantially covered, but Workspace `ActionTest` cases remained to be reviewed before moving out of WIP. Sources: `MeetingMinutes/Weekly/2026/04/24.md:51-53`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:236-245`.
- **[In Progress]** `#93028`: applies the requested parent language to newly created children and, as a side effect, adds many parent-child `-1` tests. It prevents new children from receiving the parent’s pre-change language when parent language and children are saved together. Existing child languages remain unchanged. Sources: `MeetingMinutes/Weekly/2026/04/24.md:53-57`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:246-260,271-300`.
- **[Discussed Direction]** Compare `#93028` with Sibylle Peters’s `#87595`, which also updates existing child records when the parent language changes. The broader behavior needed careful evaluation, especially direction changes involving `-1`. Sources: `MeetingMinutes/Weekly/2026/04/24.md:55-57`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:271-300`.
- **[In Progress]** `#93752` and `#93819`: Free Mode copy/move hardening existed but was explicitly lower strategic priority; the move patch required substantial simplification/review. Sources: `MeetingMinutes/Weekly/2026/04/24.md:39-47`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:175-220,242-245`.
- **[In Progress]** Martin was setting up Core contribution tooling to cherry-pick patches and provide functional `+1` review, adding review capacity rather than implementing an architecture. Sources: `MeetingMinutes/Weekly/2026/05/29.md:17-21`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:1-24`.

### Planned/discussed next moves

- **[Planned]** Continue systematic `-1` test coverage and document scenarios; do not wait for a complete roadmap before making preparation progress. Sources: `MeetingMinutes/Weekly/2026/04/24.md:29-37,65-67`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:133-166,415-439`.
- **[Planned]** Rebase/trim `#92267`; review the Workspace ActionTests for `#93289`; compare parent-child patches; request Lolli/Core input on missing scenarios and feasibility. Sources: `MeetingMinutes/Weekly/2026/04/24.md:49-75`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:225-300,436-475`.
- **[Planned]** Prepare concrete options and visual product proposals before Developer Days instead of expecting Core to supply a finished plan. Sources: `MeetingMinutes/Weekly/2026/04/24.md:69-75`; `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:461-475`; `MeetingMinutes/Weekly/2026/05/08.md:60-68`.
- **[Discussed Direction]** Talk to product-strategy stakeholders for roadmap visibility and technical stakeholders for feasibility/mergeability. The team’s understanding was Martin Helmich/Product Strategy for strategy and Benni/Core contributors for technical translation; this contact mapping was itself informal and should not be presented as official governance fact without verification. Sources: `MeetingMinutes/Weekly/2026/05/08.md:16-22`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:1-45`.
- **[Planned]** Revisit Lolli’s request for a written `-1` position on 11 June in the context of the broader strategic direction. Sources: `MeetingMinutes/Weekly/2026/05/29.md:73-77`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:775-786`.

### Important status correction for the overall analysis

- **[In Progress]** In these dated sources `#92267` is an inventory/marker patch with conflicts, not evidence that removal is underway. The surrounding test work is distributed across other patches such as `#93289` and `#93028`.
- **[Open Question]** No April/May source reports implementation of the boolean all-languages flag, `enforceLanguageSynchronization`, BCP 47 record identity, an editing-language selector, a hidden-structure extension, shadow provenance, `0` migration, or complete language layers.

## Architecture dependency graph reconstructed from this slice

```text
Characterize every meaningful `-1` behavior
        |
        +--> inventory Core branches (#92267)
        +--> Workspace paste coverage (#93289)
        +--> parent/child characterization (#93028 / #87595)
        |
        v
Define a behaviorally equivalent explicit replacement
        |
        +--> all-languages boolean on structural/source record
        +--> dedicated language records
        +--> synchronization contract + provenance + lifecycle
        +--> later optional target-language multi-select
        |
        v
Only then can `-1` deprecation/removal be safe

Hidden editorial default / editing-language UX
        |
        +--> move real default content to a real language ID
        +--> keep/create a hidden `0` structural partner
        +--> automatic partner creation through DataHandler
        +--> Page Tree and Page/Layout placeholder UX
        +--> shared structural sorting
        +--> cross-language permission model
        +--> decision about highly divergent Free Mode sites
        |
        +--> `-1` needs an editable/synchronized alternative because `0` is hidden
        |
        v
Possible later stable language identity (BCP 47)
        |
        +--> cross-root reuse / file-translation opportunities
        +--> migration and site-language mapping still undefined
```

The graph is a reconstruction, not a team-approved roadmap. Its explicit source anchors are: `MeetingMinutes/Weekly/2026/04/24.md:29-37,49-75`; `MeetingMinutes/Weekly/2026/05/08.md:24-30,40-68`; `MeetingMinutes/Weekly/2026/05/29.md:23-61`; and transcript detail at `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:149-160,225-260,415-475`, `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:61-76,131-205,217-240,495-518,701-738`, and `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:105-176,178-266,270-481`.

## Possible evolution and migration path

| Path category | Controlled status | Step | Why / dependency | Source boundary |
|---|---|---|---|---|
| Already Started | In Progress | Maintain the Core inventory of `-1` special branches in `#92267`; remove false positives tied to site-configuration languages | Makes implicit special semantics visible before change | `MeetingMinutes/Weekly/2026/04/24.md:49-51`; transcript `:225-236` |
| Already Started | In Progress | Add/inspect current-behavior tests: Workspace paste (`#93289`) and parent-child/new-child behavior (`#93028`, compare `#87595`) | Characterizes behavior and prevents accidental regressions | `MeetingMinutes/Weekly/2026/04/24.md:51-57`; transcript `:236-300` |
| Already Started | Implemented | Use merged `#88837` as verified behavior for non-language-aware `IRRE` children | Concrete example of synchronization plus explicit copies | `MeetingMinutes/Weekly/2026/04/24.md:23-27`; transcript `:59-68` |
| Explicitly Planned | Planned | Rebase/trim the inventory, review Workspace ActionTests, and seek Lolli/Core input on missing scenarios and feasibility | Resolves scope and reviewability before behavior changes | `MeetingMinutes/Weekly/2026/04/24.md:49-75`; transcript `:225-300,436-475` |
| Explicitly Planned | Planned | Prepare options and an editing-language/hidden-layer visual prototype for Product Strategy/Core discussion | Gives foundational work an editor-facing reason and tests concept comprehension | `MeetingMinutes/Weekly/2026/05/08.md:60-68`; transcript `:495-518,667-738` |
| Discussed | Discussed Direction | Introduce an explicit all-languages boolean backed by dedicated synchronized records | Required behavioral alternative before `-1` can be removed | `MeetingMinutes/Weekly/2026/05/08.md:24-30`; transcript `:61-76` |
| Discussed | Idea | Later expand boolean to explicit target-language selection | Turns parity replacement into visible functionality | Same May 8 sources |
| Discussed | Idea | Prototype hidden `0` structure through extension/configuration and `DataHandler` hooks | Exercises create/connect/UI assumptions without starting a huge Core patch | `MeetingMinutes/Weekly/2026/05/29.md:31-45`; transcript `:52-150` |
| Likely Technical Prerequisite | Analytically Derived Recommendation | Freeze a scenario matrix for each `-1` use case, including records, pages, `tt_content`, `IRRE`, workspaces, copy/move, overlays, and extensions | The team repeatedly prioritizes tests; scattered patches otherwise risk gaps | Derived from April inventory/test discussions `MeetingMinutes/Weekly/2026/04/24.md:49-67` and transcript `:225-300,401-439` |
| Likely Technical Prerequisite | Analytically Derived Recommendation | Specify synchronization provenance and enable/disable/new-language/conflict lifecycle before data migration | Without origin metadata, generated copies cannot safely coexist with manual translations | Derived from the boolean direction and explicit marker uncertainty: `MeetingMinutes/Weekly/2026/05/08.md:24-30`; `MeetingMinutes/Weekly/2026/05/29.md:39-45` |
| Likely Technical Prerequisite | Analytically Derived Recommendation | Decide structural identity first: hidden special `0`, a neutral identity entity, or full per-language materialization | Migration, `l10n_parent`, shadow creation, and BCP 47 authority depend on it | May model: `MeetingMinutes/Weekly/2026/05/08.md:40-46`; unresolved lifecycle: `MeetingMinutes/Weekly/2026/05/29.md:39-61` |
| Likely Technical Prerequisite | Analytically Derived Recommendation | Spike shared sorting and permission behavior before broad shadow creation | May 29 shows this can invalidate an otherwise convincing UX model | `MeetingMinutes/Weekly/2026/05/29.md:47-61`; transcript `:270-481` |
| Potential Additional Step | Analytically Derived Recommendation | Prototype separately for pages, `tt_content`, generic records, and `IRRE`, then compare which abstractions are actually shared | The team explicitly noted all these record classes must participate and TCA/IRRE details may differ | `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:507-518`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:105-127` |
| Potential Additional Step | Analytically Derived Recommendation | Benchmark sparse, structural-spine, and fully materialized variants for record count, query behavior, Workspace versions, and Reference Index load | April raises data duplication/performance; May raises record/UI scale without measurements | `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:37-68`; May 29 `:190-249,397-460` |
| Depends on Architecture Decision | Open Question | Migrate current language `0` content to a real language ID and decide whether `0` remains a permanent hidden anchor | Cannot be designed until record identity and authority are chosen | `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:217-240` |
| Depends on Architecture Decision | Open Question | Introduce BCP 47 as record-language authority and map sites/internal IDs | Presented only as future perspective | `MeetingMinutes/Weekly/2026/05/08.md:28-30`; transcript `:68-76` |
| Depends on Architecture Decision | Open Question | Deprecate or retain Free Mode, and migrate extremely divergent sites | Flexible Connected Mode covers only some cases; full removal was considered risky | `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:131-140,720-738`; May 29 `:203-223` |
| Depends on Architecture Decision | Open Question | Decide whether structural placeholders are persisted per language or projected from one identity/spine | The meetings require structural awareness but do not decide target-layer materialization | `MeetingMinutes/Weekly/2026/05/08.md:48-58`; `MeetingMinutes/Weekly/2026/05/29.md:47-55` |
| Analytical Recommendation | Analytically Derived Recommendation | Run three parallel streams: (A) understand/test current behavior, (B) UX prototype and user validation, (C) narrow architectural spikes for identity/sync/sorting; join them before deprecation/migration | Avoids a big-bang rewrite while respecting that UX and data-model discoveries inform each other | Derived from April’s test-first plan, May 8’s visualization pivot, and May 29’s prototype-versus-concept debate |
| Analytical Recommendation | Analytically Derived Recommendation | Treat removal/deprecation as the last proof step, not the first: **Understand -> Characterize -> Model -> Prototype -> Decide -> Migrate in parallel -> Prove -> Deprecate/remove** | Extends the source’s “test before change” principle with missing lifecycle/identity dependencies; not an initiative-approved sequence | Underlying sources above |

### Sequencing cautions

- **[Problem]** Fixing `-1`-specific functional rules before deciding the synchronized-record replacement can waste effort because the illegal/special state may disappear. Source: `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:415-432`.
- **[Problem]** Conversely, building the hidden-layer backend before specifying identity, merging, sorting, and permissions can consume the initiative in implementation and surface architecture failures late. Source: `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:89-127`.
- **[Analytically Derived Recommendation]** `-1` characterization and UX prototype work can proceed in parallel. Actual storage migration, `0` removal/retention, BCP 47 authority, and Free Mode deprecation must wait for architecture decisions.

## Cross-site, global-record, and file-translation scenarios

- **[Idea]** BCP 47 was named as a possible foundation for cross-root referencing and file translations once the numeric special-language model is dismantled. Source: `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:68-76`; condensed in `MeetingMinutes/Weekly/2026/05/08.md:28-30`.
- **[Idea]** During discussion of moving today’s default language to a dedicated ID, André floated checking whether that language already exists elsewhere when a site language is configured and reusing the same internal UID, otherwise creating one. The idea was not resolved and is not equivalent to an adopted global language registry. Source: `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:217-240`.
- **[Open Question]** No source in this slice explicitly discusses global storage pages, shared multilingual domain records across sites with different defaults, XLIFF lookup rules, import/export, or external translation-service payloads.
- **[Analytically Derived Recommendation]** A two-site/same-BCP-47-tag example is presentation-safe only as an extrapolated benefit. Label it “what stable identity could unlock,” cite May 8, and do not imply that record/site mapping is designed.

## Open architecture question register

### All-languages behavior

- **[Open Question]** Where exactly is the new boolean/target selection stored if the historical default becomes a hidden structural record?
- **[Open Question]** On enable, what happens to existing independent translations—block, adopt, compare/merge, overwrite, or exempt?
- **[Open Question]** On disable, what happens to generated records—delete, detach, freeze as normal records, or retain synchronization metadata?
- **[Open Question]** How are generated/synchronized records marked and audited?
- **[Open Question]** Are records generated immediately for all configured languages, lazily, or only for selected site contexts; what happens when a language is added later?
- **[Open Question]** Can any synchronized variant be edited, as briefly suggested on 29 May, and how are conflicts/permissions handled?

Sources underlying the register rather than answers: boolean/multi-select at `MeetingMinutes/Weekly/2026/05/08.md:24-30`; edit-anywhere idea at `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:379-395`; marker uncertainty at `MeetingMinutes/Weekly/2026/05/29.md:39-45`.

### Record identity and language `0`

- **[Open Question]** Is hidden `0` a permanent identity layer, a transition mechanism, or merely a prototype shortcut before a neutral identity abstraction?
- **[Open Question]** Does identity remain `l10n_parent -> uid 0`, move to a neutral relation/entity, or become a group identifier shared by equal-language siblings?
- **[Open Question]** How are separately created shadows/variants linked or merged without losing intentional independence?
- **[Open Question]** Which fields exist on a structural record, and how are required TCA fields, `CType`, `colPos`, `IRRE`, delete/copy/move, and field synchronization represented?
- **[Open Question]** Can any localized variant serve as the source of another localization without reinstating a privileged default?

Sources: hidden-layer model `MeetingMinutes/Weekly/2026/05/08.md:40-46`; explicit creation/marker questions `MeetingMinutes/Weekly/2026/05/29.md:39-45`; connection/merge problem `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:105-116`.

### Layer completeness and lifecycle

- **[Open Question]** Is every identity physically represented in every language, or is only the structural spine complete while target placeholders are projected?
- **[Open Question]** When are shadows created, merged, detached, or deleted, and are they visible to APIs/extensions?
- **[Open Question]** How do Workspaces/versioning, Reference Index, cache invalidation, query overlays, fallbacks, and rendering treat structural-only records?
- **[Open Question]** What is the measured database/index/query cost of sparse versus spine versus fully materialized models?
- **[Open Question]** How can technical records be hidden from normal editors while still exposing enough structure for unambiguous sorting?

Sources: Page Tree completeness `MeetingMinutes/Weekly/2026/05/08.md:48-58`; sorting/visibility `MeetingMinutes/Weekly/2026/05/29.md:47-55`; scale concern in transcript `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:190-249,397-460`.

### Editing UX and permissions

- **[Open Question]** Is editing language merely a view/filter, or can it grant structural leadership?
- **[Open Question]** Which language(s) may create/move structure, and can permissions safely protect records in languages the editor cannot edit?
- **[Open Question]** Should all shadows be visible during structural operations, or should a modal resolve only ambiguous moves/insertions?
- **[Open Question]** How are missing-page labels chosen without a new hidden source-language bias or a confusing mix of languages?
- **[Open Question]** Which installations retain Free Mode, and how are current Free/Mixed configurations migrated?

Sources: editing definition `MeetingMinutes/Weekly/2026/05/08.md:60-64`; Page Tree/page empty state `MeetingMinutes/Weekly/2026/05/08.md:48-58`; sort/permission issues `MeetingMinutes/Weekly/2026/05/29.md:47-71`.

### BCP 47 and migration

- **[Open Question]** What is the authoritative record-language identity and what role remains for internal numeric foreign keys?
- **[Open Question]** How are existing site-local numeric IDs mapped and how are the current `0` records split into structure plus a real language?
- **[Open Question]** How are BCP 47 region/script/private variants normalized and matched across sites and files?
- **[Open Question]** What compatibility/deprecation period allows extensions querying `sys_language_uid`, `l10n_parent`, overlays, or `-1` to migrate?
- **[Open Question]** Which Upgrade Wizards/data migrations are reversible, and how are conflicts reported?

Source for the direction but not answers: `MeetingMinutes/Weekly/2026/05/08.md:24-30`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:61-76,217-240`.

## Presentation-ready use cases and argument lines

| Priority | Use case / slide move | Status and lesson | Source evidence |
|---|---|---|---|
| Essential | **“I need one extra element in German.”** Show today’s choice: leave Connected Mode or create an empty default element; then show automatic hidden structural partner | Problem -> Vision; clearest editor-facing reason for hidden structure/editing language | `MeetingMinutes/Weekly/2026/05/29.md:23-27,39-45`; transcript `:21-38,127-176` |
| Essential | **One shared item, all languages.** Today `sys_language_uid=-1`; possible future boolean creates dedicated language records through synchronization | Current -> Discussed Direction; exposes why removal needs replacement | `MeetingMinutes/Weekly/2026/05/08.md:24-30`; May 8 transcript `:61-76,185-194` |
| Essential | **Invisible record between two visible records.** Moving “C” above “A” has several possible positions because another language’s “B” is hidden | Open architecture problem; excellent minimal animation for shared sorting | `MeetingMinutes/Weekly/2026/05/29.md:47-55`; May 29 transcript `:270-378` |
| Essential | **Editing language is not interface language.** Spanish-speaking editor, Spanish backend labels, editing American English | Preferred product concept; makes terminology intuitive | `MeetingMinutes/Weekly/2026/05/08.md:60-64`; May 8 transcript `:591-637` |
| Useful | **Missing page in Danish.** Page Tree retains a subdued structural node; Page Module says “Translate Page”; existing wizard asks for source and content selection | Vision built from existing UX rather than a wholly new workflow | `MeetingMinutes/Weekly/2026/05/08.md:48-58`; May 8 transcript `:401-590` |
| Useful | **Shared product + translated child texts.** A language-all parent with language-specific `IRRE` children is meaningful | Prevents an over-simple rule that all parent/child language values must match | `MeetingMinutes/Weekly/2026/04/24.md:59-67`; April transcript `:294-317` |
| Useful | **Teaser versus translated fallback element.** Current connected `CType` lock protects structure but conflicts with a real project’s localized variant | Shows translation versus localization/structural divergence tension | `MeetingMinutes/Weekly/2026/05/08.md:32-38`; May 8 transcript `:78-131` |
| Useful | **Spanish-only editor.** Connected drag affordance appears but drop is refused; Free Mode permits create/move | Concrete present-day UX/permission mismatch | `MeetingMinutes/Weekly/2026/05/29.md:63-69`; May 29 transcript `:621-683` |
| Optional | **Non-language-aware `IRRE` child fix.** Separate synchronized child records avoid stealing the original | Small real precedent for explicit persisted data | `MeetingMinutes/Weekly/2026/04/24.md:23-27`; April transcript `:59-68` |
| Optional | **Boolean becomes target-language multi-select.** “all” parity first, explicit destinations later | Future product value, not promised | `MeetingMinutes/Weekly/2026/05/08.md:24-30`; May 8 transcript `:61-76` |
| Too Detailed / backup | Patch queue `#92267`, `#93289`, `#93028`, `#87595`, `#93752`, `#93819` | Useful for “where we actually are,” but too granular for the main narrative | `MeetingMinutes/Weekly/2026/04/24.md:39-57` |
| Too Detailed / backup | Exact Page Tree fallback-label/icon logic, ambiguous-move modal, TCA mandatory-field handling | Valuable Q&A/architecture backup | May 8 transcript `:260-400,507-518`; May 29 transcript `:397-460` |

### Especially useful source-grounded formulations

- **“Waiting is not an option”** captures April’s intent to keep preparing, but should be paired with the admission that Core support and the correct sequence were unresolved. Source context: `Transcripts/2026-04-24 12-01-11 - Meeting der Initiative.txt:133-166,436-475`.
- **“The central sales argument is selecting an editing language”** is the clearest May product-story pivot. It packages hidden shadows and `-1` replacement as enabling infrastructure rather than the headline. Source context: `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:701-738`.
- **“Flexible additions per language while remaining connected”** is a defensible vision statement. It must be followed by “Free Mode may still be needed for radically divergent structures.” Sources: May 8 transcript `:720-738`; May 29 transcript `:203-223`.
- **“Show everything first, then find ways to reduce the information”** captures the pragmatic response to shadow visibility, but is prototype advice rather than a product decision. Source context: `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:397-410`.

## Compact source matrix

| Theme | Finding | Status | Date | Exact source |
|---|---|---|---|---|
| Non-language-aware `IRRE` | Separate synchronized children assigned to localized parent | Implemented | 2026-04-24 | `MeetingMinutes/Weekly/2026/04/24.md:23-27`; transcript `:59-68` |
| `-1` strategy | Tests and alternative precede safe removal/deprecation | Preferred Direction | 2026-04-24 | minutes `:29-37`; transcript `:133-160` |
| `-1` inventory | Rebase/trim WIP; exclude site-config languages | In Progress | 2026-04-24 | minutes `:49-51`; transcript `:225-236` |
| Workspaces | Missing language-all paste coverage in WIP | In Progress | 2026-04-24 | minutes `:51-53`; transcript `:236-245` |
| Parent-child | New-child requested-language tests/fix | In Progress | 2026-04-24 | minutes `:53-57`; transcript `:246-300` |
| Parent-child `-1` | Shared parent with translated children can be valid | Discussed Direction | 2026-04-24 | minutes `:59-63`; transcript `:294-317` |
| Parent-child enforcement | Test current behavior; avoid obsolete `-1` rules | Preferred Direction | 2026-04-24 | minutes `:65-67`; transcript `:401-439` |
| Core alignment | Bring options and request feasibility/test input | Planned | 2026-04-24 | minutes `:69-75`; transcript `:436-475` |
| Roadmap framing | “Further development of multilingual support” | Discussed Direction | 2026-05-08 | minutes `:16-22`; transcript `:1-45` |
| `-1` editor value | Removal alone looks like feature loss | Problem | 2026-05-08 | minutes `:24-30`; transcript `:47-76,207-224` |
| `-1` replacement | Boolean syncs to all languages; later multi-select | Discussed Direction / Idea | 2026-05-08 | minutes `:24-30`; transcript `:61-76` |
| BCP 47 | Future stable identity enabling cross-root/file use | Discussed Direction | 2026-05-08 | minutes `:28-30`; transcript `:68-76` |
| Connected flexibility | Additional translated-only content is hard today | Problem | 2026-05-08 | minutes `:32-38`; transcript `:78-140` |
| Hidden layer | Keep/hide `0` as structure; real languages get IDs | Discussed Direction | 2026-05-08 | minutes `:40-46`; transcript `:131-194` |
| Synchronization | Build on exclude/allow; possible enforce mechanism | Idea | 2026-05-08 | minutes `:44-46`; transcript `:185-205` |
| Page Tree | Complete structure with subdued missing-language nodes | Discussed Direction | 2026-05-08 | minutes `:48-54`; transcript `:247-400` |
| Page Module | Empty state + existing translation wizard | Preferred Direction | 2026-05-08 | minutes `:54-58`; transcript `:401-590` |
| Editing language | Editorial context distinct from UI language | Preferred Direction | 2026-05-08 | minutes `:60-64`; transcript `:591-663` |
| Prototype | Visualize product story before deep Core work | Planned | 2026-05-08 | minutes `:66-68`; transcript `:495-518,667-738` |
| Extension prototype | Use existing hide-default config and DataHandler hooks | Idea | 2026-05-29 | minutes `:31-37`; transcript `:52-127` |
| Shadow lifecycle | Marker/field content/merge semantics unresolved | Open Question | 2026-05-29 | minutes `:39-45`; transcript `:105-150` |
| Sorting | Reliable moves require all structural nodes/ambiguity UI | Open Question | 2026-05-29 | minutes `:47-55`; transcript `:270-460` |
| Permissions | Structural edits need explicit lead/permission model | Open Question | 2026-05-29 | minutes `:57-61`; transcript `:462-481` |
| Current v14 UX | Connected drop denied; Free create/move works | Current Core Behavior | 2026-05-29 | minutes `:63-69`; transcript `:621-683` |
| Mixed Mode | Normal wizard now forces earlier Translate/Copy choice | Current Core Behavior | 2026-05-29 | minutes `:69-71`; transcript `:689-724` |
| Free Mode future | Flexible Connected helps common case; total removal risky | Open Question | 2026-05-29 | transcript `:203-223` |
| `-1` written position | Revisit Lolli request on 11 June | Planned | 2026-05-29 | minutes `:73-77`; transcript `:775-786` |

## Negative-evidence checklist for the parent synthesis

The following claims are **not established** by the April-May sources and must not be attributed to these meetings without other evidence:

1. Full per-language database layers are a preferred or decided architecture.
2. A language-neutral identity table/entity will replace `l10n_parent` or `0`.
3. Free Mode will be deprecated.
4. `enforceLanguageSynchronization` has a defined TCA/API contract or prevents editor opt-out.
5. The all-languages flag’s enable/disable/migration lifecycle has been decided.
6. BCP 47 is implemented, scheduled, or fully specified as authoritative record identity.
7. Numeric IDs will disappear entirely rather than remain internal references.
8. Global storage pages or cross-site multilingual records already have a designed solution.
9. XLIFF/file-translation mechanics, external services, imports, or exports have been designed.
10. Database growth, query savings, Reference Index cost, Workspace/versioning impact, or fallback simplification have been measured.
11. `#92267` itself proves a completed test suite or actual `-1` removal; the meeting describes a WIP inventory/marker patch.
12. The Product Strategy/Core contact model discussed on May 8 is an officially verified governance decision.

## Bottom-line contribution of this date slice to the T3DD26 story

- April supplies the **engineering discipline**: preserve the all-languages use case, inventory special behavior, characterize it in tests, and avoid investing in rules that the replacement model would erase.
- Early May supplies the **product reframing**: `-1` cleanup is enabling work; the compelling story is editing in the language that matters while the system manages structure and relations.
- Late May supplies the **architectural honesty**: automatic shadows make the vision tangible but immediately create identity, visibility, sorting, permission, lifecycle, and scale questions. The hidden-`0` spine is a working hypothesis, not the final architecture.
- The most accurate session statement from these sources is therefore: **the initiative has moved from isolated special-case cleanup toward a more explicit editor-centered model, has begun characterization work, and is using prototypes/options to discover the still-open architecture—without yet committing to full language layers, a neutral identity layer, BCP 47 migration, or Free Mode removal.**
