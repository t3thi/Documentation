---
id: topic:output-policy
title: "Output Policy"
language: en
updated: "2026-10-30"
knowledge:
  - K-000013
  - K-000014
  - K-000020
  - K-000033
history:
  - K-000024
  - K-000025
decisions:
  - D-000003
---

# Output Policy

## Current synthesis

### 4. Output Policy

**Question:** What should render when the requested language variant is unavailable at one content position?

**Current coupling:** Site configuration defines `strict`, `fallback` and `free` behavior plus fallback IDs. A missing or disabled translated record can still result in content from another language. Structural relation and editorial intent are not enough to explain why one record rendered.

**Derived requirements:**

- Strict behavior must remain distinct from fallback behavior.
- A fallback chain must express its allowed sequence and whether a terminal default is intended.
- TYPO3 must distinguish "not translated yet" from "intentionally do not render here" where the product requires that distinction.
- Output rules must be understandable independently of how structural records are stored.
- Any change to absence semantics must include compatibility analysis because current projects may depend on existing fallback.

**Vision:** Output should follow explicit site and, where required, content-position intent. A structural connection must not silently determine the frontend fallback policy.

**Unvalidated approach:** Explicit visibility writes could replace the
Strict/Free distinction: without a chain, select concrete requested-language
records independently of the Default Language parent's visibility; with a
chain, retain runtime fallback instead of complete fallback copies. The chain
could replace `fallbackType`. A missing connected translation would permit
fallback, a deliberately disabled one would stop it, and deletion would permit
it again. The prototype now contains the context-menu action and writes existing
`hidden` fields without another override field or redundant label, as confirmed
by static inspection on 2026-10-30. Bulk writes do not restore previous mixed states.
This bounded prototype agreement, recorded in a proposed Decision Record,
does not adopt the full model, prove behavior parity or commit it to v15;
equivalent API support and compatibility remain to be validated.

Strict's accepted single-language promise remains intact. Removing a selector
must not silently activate a previously inactive saved chain, destroy retained
configuration or lose regional reuse without an unwanted terminal default.
Migration, local absence, permissions, Workspaces and consistent query behavior
require validation before this proposal can replace any current mode.

A hidden translation is not necessarily an omission: an editor may be working
on it while expecting the previous fallback to remain visible. Treating every
`hidden` record as a stop signal would break that workflow. Intentional absence
and unfinished translation both need representation; no new state, suppression
field or Workspaces-only solution has been selected. This constrains the
tentative proposal rather than adopting or rejecting it.

**Open questions:**

- Which state stops fallback for one position?
- How can an explicit stop signal be distinguished from an unfinished hidden translation?
- Should normal fallback offer an optional terminal default step while `strict` remains single-language?
- At which scope may output intent be configured: site language, page, structure position, record or field?
- How are page, content, Extbase and custom-query behaviors kept consistent?
