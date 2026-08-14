---
id: topic:language-identity
title: "Language Identity"
language: en
updated: "2026-08-14"
knowledge:
  - K-000001
  - K-000002
  - K-000004
  - K-000005
  - K-000017
history: []
decisions: []
---

# Language Identity

## Current synthesis

## Vision: separate four responsibilities

The [T3DD26 Four Responsibilities model](https://content.eric-harrer.de/t3dd26/#/four-responsibilities) is the initiative's current conceptual reference point:

> **Separate the responsibilities first. Then reason about possible implementations.**

The responsibilities must be considered in this order when explaining the vision: **Identity → Synchronization → Structure → Output**. They are a problem and responsibility decomposition, not a selected schema, API or migration sequence.

### 1. Language Identity

**Question:** Which human language and variant does this content represent?

**Current coupling:** A record stores a site-local integer. `0` additionally means default language and `-1` means all languages. These extra meanings are not human-language identities.

**Derived requirements:**

- A language must have a stable semantic identity across sites and, where needed, across installations.
- A complete migration away from today's `sys_language_uid` contract requires
  explicit replacements for its non-language meanings: `-1` as record-wide
  Language-All synchronization intent, and `0` as both the Site-default role
  and today's structural lead. The future identity value may identify only a
  real human language or variant.
- Semantic identity must not depend on a locale being installed on the application server.
- Site configuration must map its available languages to the semantic identity explicitly.
- Shared storage, translated file metadata and import/export must not depend on coincidentally equal local numbers.

**Vision:** Content language should be identifiable by what the language is, not only by the site-local number assigned to it. BCP 47 is the initiative's current preference for that semantic identity.

**Open questions:**

- Is a BCP 47 tag the authoritative persisted value, an external identity mapped to an internal key, or part of a different identity model?
- How does each Site assign its Default-Language role to one real semantic
  language without making `0` a special language identity?
- Which script, region, variant and private-use subtags must be supported?
- How are ambiguous legacy IDs and locales migrated?
- Can two records with the same tag intentionally represent different editorial contexts?
- How are permissions, queries, relations and extension APIs adapted without an unsafe big-bang change?

BCP 47 addresses semantic identity only. It does not by itself replace the
current `-1` synchronization behavior or decide which Structural-Identity model
assumes the role currently coupled to `0`. Whether the tag is stored directly
or mapped to an internal identifier also remains open. The current field
contract can therefore be replaced completely only after those separate
responsibilities have explicit migration contracts; this dependency does not
select their implementation.
