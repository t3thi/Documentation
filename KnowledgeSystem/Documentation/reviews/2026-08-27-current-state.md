# Human review of the German Current State, 2026-08-27

This note records the human-authorized clarifications identified during a
second proofread of the German Current State. It is an editorial source for the
initiative's current interpretation. It is not evidence that TYPO3 Core has
adopted a particular architecture.

The review established the following corrections:

- Target-language-only content is not a separate use case from "mostly
  connected, selectively different". It is one important expression of that
  broader and generally applicable use case.
- The German text must refer to the Table Configuration Array as "im TCA",
  and scope and reading guidance must be separate chapters. The note about the
  current module labels belongs in the reading guide.
- Backend UI safeguards prevent duplicate numeric Site Language assignments
  and make consistent ID reuse easier, but direct YAML editing can bypass those
  safeguards. Numeric IDs therefore remain local configuration rather than a
  global identity contract.
- A locale is also too narrow as the sole identity contract because a
  language-and-region scope does not reliably represent wider editorial
  variants such as Easy Language.
- The initiative's current direction favors explicit synchronized records and
  simpler processing logic over minimizing database record count. Record
  growth alone is not the primary objection to a model. Synchronization,
  lifecycle, Workspaces, references, migration, backend usability and measured
  operational effects still need to be designed and validated.
- Patch tables should define the time-dependent meaning of `main` once in the
  reading guide and otherwise use concise release-line labels such as TYPO3
  v15, TYPO3 14.3 and TYPO3 13.4. They must continue to distinguish actual
  branch-specific Gerrit changes from branches named only in `Releases:`.
- The publication dates should appear near the beginning as a human-readable
  status summary. Visible prose should explain the relevant dates and their
  meaning without exposing internal frontmatter field names.

The review deliberately records no named-person attribution. Its statements
represent the initiative's current editorial position, not an individual quote
or a completed Core decision.
