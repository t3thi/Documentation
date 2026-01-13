You are annotating TYPO3 Core source code based on findings documented in `ANALYSIS.md`.

Objective:
Insert precise, minimal comments explaining **language identifier -1 detection and handling**, without altering runtime behavior.

---

### Comment format (TYPO3 Core standard)

Allowed forms:

- Single‑line:
  // TODO: ...

- Multi‑line:
  /**
    * @TODO: ...
      */

No other formats are allowed.

---

### Comment content rules

Each comment must:
- Explicitly state that language identifier `-1` is involved
- Briefly explain what the code does at that point
- Be self‑contained and understandable without external context
- Avoid evaluation or recommendation

---

### Canonical comment patterns

Use and adapt **only** these patterns:

Pattern A – Query filtering
```php
// TODO: Language identifier -1 ("all languages") is explicitly included in query filtering.
````

Pattern B – Control flow / branching

```php
// TODO: Language identifier -1 disables language inheritance for related records.
```

Pattern C – Data structure / typing

```php
// TODO: This property allows language identifier -1 to represent records valid for all languages.
```

Pattern D – Overlay logic

```php
// TODO: Language identifier -1 is handled as a separate overlay case for language‑agnostic records.
```

---

### Scope rules

* Annotate **all** productive and test code locations identified in `ANALYSIS.md`.
* Each location must be analyzed independently before commenting.
* Do not add comments where `ANALYSIS.md` classifies the code as IRR.
* Do not refactor, reformat, or change code structure.

---

### Output rules

* Produce commented code only
* No explanations outside of code comments
* Preserve original formatting and behavior exactly
