---
id: topic:editorial-needs
title: "Editorial Needs and Use Cases"
language: en
updated: "2026-08-11"
knowledge:
  - K-000004
  - K-000006
  - K-000009
  - K-000013
  - K-000014
  - K-000016
history: []
decisions: []
---

# Editorial Needs and Use Cases

## Current synthesis

## Observed needs and use cases

The initiative's vision starts from concrete project and editorial needs. These use cases do not expose one identical gap. Each reveals a different responsibility that is currently implicit, too coarse or coupled to another concern.

| Use case | Current difficulty | Responsibility exposed |
|---|---|---|
| **Mostly connected, selectively different** | A target language shares most content with another language but needs one local addition. Today that addition can require an artificial hidden default-language record, create Mixed Mode or lose useful connected behavior. | Structural Identity and Synchronization Intent |
| **Shared global storage** | Several sites use a common record store but configure the same human languages with local numeric IDs. The number alone cannot reliably identify the language across sites. | Language Identity |
| **Regional fallback** | UK content should reuse general English, but not an unrelated terminal language. A site-wide chain cannot also express whether one missing position should fall back or remain intentionally absent. | Output Policy |
| **Content for all languages** | A record uses `sys_language_uid = -1` to mean "all languages", although this is behavior rather than a human language. The same complete record is used in every language, and the special value affects many unrelated Core paths. | Synchronization Intent and Language Identity |
| **Target-language-only content** | An editor cannot always create content directly where it is needed while retaining the useful structural relation for the rest of the page. | Structural Identity |
| **Editing from a comprehensible language** | A Chinese editor may need to create Chinese content from English while the site default is German. A permanently privileged default-language column makes the workflow harder to understand. | Structural Identity and editorial context |
| **File-metadata translation at scale** | The [Media module translation control](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/filelist/Classes/FileList.php#L1225-L1305) shows for each file whether metadata for a configured language can be created or edited. Creating or editing target-language alternative text remains a per-file workflow; no dedicated bulk creation or completeness workflow is evident in current Core. | Structural Identity and editorial workflow |
| **Intentional absence** | A missing translation and an intentionally disabled or omitted translation can both lead to fallback. The editor's intent is not represented explicitly enough. | Output Policy |

The "mostly connected, selectively different" case is the clearest description of the middle ground TYPO3 should support better. Identical translated structures and fully independent structures are both valid. A small local exception should not force editors to give up the benefits of the shared majority. See the [June 2026 use-case analysis](https://notes.typo3.org/s/-RP1PwIafA) and its [July refinement](https://notes.typo3.org/s/ccbVIOYfEy).

### What community feedback supports

The [community-feedback matrix from T3DD22 and subsequent events](https://docs.google.com/spreadsheets/d/1Y8KnuYxMoXyVaZzVHENBp_1fg2M-JGxHog6K3T9qn_Q/edit?gid=0#gid=0) does not contain one yes-or-no decision about removing translation modes. It records "Switching translation modes" as an editor problem and easier Mixed-Mode resolution as an editor requirement. Other responses value Free Mode because it permits content in only one language. The 2024 editor interview likewise confirms that "mostly connected, selectively different" is valid while both Mixed Mode and artificial hidden Default-Language records are unsatisfactory.

The established need is therefore not to remove independent editorial outcomes. It is to stop requiring editors to manage technical relation states when their intent is simply to create, omit, replace or reorder content in a particular language. The initiative recommends removing the Free, Connected and Mixed distinction from the normal editor interface once Core can create and maintain the necessary structural relations safely. This recommendation depends on prior work for automatic target creation, relation integrity, migration and lifecycle handling; it is not a deprecation of today's Free Mode behavior. See the [2024 editor interview](https://notes.typo3.org/s/kqdwFxW1m), the [always-connected discussion](https://notes.typo3.org/s/k11hyaA4N) and the [later technically-connected refinement](https://notes.typo3.org/s/2Ysd3gDdn).
