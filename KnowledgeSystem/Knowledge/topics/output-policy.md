---
id: topic:output-policy
title: "Output Policy"
language: en
updated: "2026-08-11"
knowledge:
  - K-000013
  - K-000014
  - K-000020
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

**Open questions:**

- Which state stops fallback for one position?
- Is a disabled translation an appropriate stop signal, or is a separate intent required?
- Should normal fallback offer an optional terminal default step while `strict` remains single-language?
- At which scope may output intent be configured: site language, page, structure position, record or field?
- How are page, content, Extbase and custom-query behaviors kept consistent?
