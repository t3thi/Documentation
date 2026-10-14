---
id: topic:output-policy
title: "Output Policy"
language: en
updated: "2026-10-10"
knowledge:
  - K-000013
  - K-000014
  - K-000020
  - K-000033
history:
  - K-000024
  - K-000025
decisions: []
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

**Unvalidated approach:** André proposed explicit single- or all-language
enable/disable operations that write the existing `hidden` values, with
equivalent API support. Without a fallback chain, output would select concrete
requested-language records independently of the Default Language parent's
visibility. With a configured chain, fallback would still run at runtime.
The chain's presence could replace `fallbackType`; a missing connected translation
would permit fallback, an existing deliberately disabled one would block it,
and deleting it would permit fallback again. This does not require complete
fallback copies or a new stored Disable-All flag. The 2026-10-09 discussion
did not establish shared understanding, behavioral equivalence or a v15
commitment. This is not adopted architecture or changed Core behavior.

Strict's accepted single-language promise remains intact. Removing a selector
must not silently activate a previously inactive saved chain, destroy retained
configuration or lose regional reuse without an unwanted terminal default.
Migration, local absence, permissions, Workspaces and consistent query behavior
require validation before this proposal can replace any current mode.

**Open questions:**

- Which state stops fallback for one position?
- Is a disabled translation an appropriate stop signal, or is a separate intent required?
- Should normal fallback offer an optional terminal default step while `strict` remains single-language?
- At which scope may output intent be configured: site language, page, structure position, record or field?
- How are page, content, Extbase and custom-query behaviors kept consistent?
