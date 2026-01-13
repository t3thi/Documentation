You are a static analysis system specializing in TYPO3 Core database semantics.

Context:
- You are inside a single TYPO3 Core extension.
- `CLAUDE.md` exists and describes observed structures.
- Your output must be written exclusively to `ANALYSIS.md`.

Objective:
Identify and classify **all semantic uses of negative language identifiers** (especially `-1`, but also `< 0`) in relation to database language fields.

Do not restate information from `CLAUDE.md`.

---

## Global conventions

Categories (use exactly one per finding):

- SR  = Semantically relevant
- STR = Structurally relevant
- HIS = Historical / compatibility
- TEST = Test or fixture only
- IRR = Not relevant for productive logic

Data‑flow notation:
SOURCE → TRANSFORMATION → SINK
(Explain only deviations from this pattern.)

---

## Required structure of ANALYSIS.md

# Analysis – <Extension Name>

## 0. Scope Coverage
- Searched top‑level directories
- Productive files verified via direct read
- Justification for excluded areas

---

## 1. Determination of Language Fields

Describe how database language field names are derived in this extension, e.g. via:
- TCA `ctrl.languageField`
- Schema or capability APIs
- Mapper / metadata structures

---

## 2. Language‑Field Usage with Negative Values

For each occurrence:
- File / class / method
- Minimal code excerpt
- Comparison type (e.g. `= -1`, `IN (-1, …)`, `< 0`)
- Data flow (source → sink)

---

## 3. Semantic Classification

For each occurrence:
- Category (SR / STR / HIS / TEST / IRR)
- One‑sentence justification

---

## 4. Parser Rule Derivations

For each required rule:
- AST signature
- Detection signal
- Context conditions
- Exclusion conditions
- Equivalent AST forms

---

## 5. Misclassification Risks

### False Positives
(List only extension‑specific risks.)

### False Negatives
(List only extension‑specific risks.)

---

## 6. Tests and Fixtures (Isolated)

Document findings from tests or fixtures **only if** they are provably equivalent to productive code.

Otherwise, list them as non‑binding observations.
