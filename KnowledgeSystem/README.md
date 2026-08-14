# Git-native Knowledge System

This directory contains the Git-native knowledge system of the TYPO3
Translation Handling Initiative. Git stores the reviewed semantic state,
schemas protect its structure, humans authorize material semantic changes, and
deterministic Python tools build the publication views.

```text
local transcript
  -> reviewed Meeting Minutes
  -> Knowledge Objects, Decisions, and Semantic Changes
  -> reviewed Topic Syntheses
  -> generated Current State and registers
```

The English and German Current State documents are generated. Do not edit
[`../MeetingMinutes/current-state.md`](../MeetingMinutes/current-state.md) or
[`../MeetingMinutes/current-state.de.md`](../MeetingMinutes/current-state.de.md)
directly.

## Local Python setup

Run all commands from the repository root. CI uses Python 3.12. A repository-
local virtual environment keeps the two pinned dependencies separate from the
system Python installation. The `.venv-knowledge/` directory is ignored by
Git.

### Unix and macOS

Create the environment once:

```bash
python3 -m venv .venv-knowledge
. .venv-knowledge/bin/activate
python3 -m pip install --disable-pip-version-check --requirement KnowledgeSystem/requirements.txt
```

Activate it in each new shell:

```bash
. .venv-knowledge/bin/activate
```

All examples can then be run directly with `python3`:

```bash
python3 KnowledgeSystem/Tools/validate
```

Without activation, invoke the persistent environment directly:

```bash
.venv-knowledge/bin/python3 KnowledgeSystem/Tools/validate
```

### Windows PowerShell

Create the environment once:

```powershell
py -3 -m venv .venv-knowledge
. .\.venv-knowledge\Scripts\Activate.ps1
python -m pip install --disable-pip-version-check --requirement KnowledgeSystem/requirements.txt
```

Activate it in each new PowerShell session:

```powershell
. .\.venv-knowledge\Scripts\Activate.ps1
```

On Windows, replace `python3` in the following examples with `python`. Without
activation, use:

```powershell
.\.venv-knowledge\Scripts\python.exe KnowledgeSystem/Tools/validate
```

## Command selection by requirement

| Requirement | Command | Writes files? | Human review? |
|---|---|---:|---:|
| Validate schemas, IDs, sources, references, and generated output | `python3 KnowledgeSystem/Tools/validate` | No | No |
| Validate an isolated test fixture without generated output | `python3 KnowledgeSystem/Tools/validate --skip-generated` | No | No |
| Rebuild Knowledge, Decision, and Change indexes | `python3 KnowledgeSystem/Tools/build-index` | Yes | Beforehand for semantic changes |
| Check whether those indexes are current | `python3 KnowledgeSystem/Tools/build-index --check` | No | No |
| Rebuild Current State, knowledge map, backlinks, and question views | `python3 KnowledgeSystem/Tools/build-views` | Yes | Beforehand for semantic changes |
| Check whether all publication views are current | `python3 KnowledgeSystem/Tools/build-views --check` | No | No |
| Check internal references and the generated backlink view | `python3 KnowledgeSystem/Tools/check-backlinks --check` | No | No |
| Show incoming references for one ID | `python3 KnowledgeSystem/Tools/check-backlinks --target K-000008` | No | No |
| Report advisory semantic findings | `python3 KnowledgeSystem/Tools/lint-knowledge` | No | For reported warnings |
| Treat semantic lint warnings as failures | `python3 KnowledgeSystem/Tools/lint-knowledge --strict` | No | For reported warnings |
| Compare cached Gerrit or Forge state with the live service | `python3 KnowledgeSystem/Tools/check-external-status gerrit:94510 forge:110281` | No | Before adopting a changed status |
| Prepare Stage 1 for a new transcript | `python3 KnowledgeSystem/Tools/prepare-meeting-minutes "Transcripts/FILE.txt"` | No | Required for the resulting Minutes |
| Prepare Stage 2 for reviewed Meeting Minutes | `python3 KnowledgeSystem/Tools/ingest-reviewed-meeting MeetingMinutes/Weekly/YYYY/MM/DD.md --reviewed` | No | Required before invocation |
| Show all options for a tool | `python3 KnowledgeSystem/Tools/validate --help` | No | No |

Every tool also accepts `--root PATH`. It is normally unnecessary because the
repository root is discovered automatically.

## Validate without writing files

Use this sequence for a quick read-only check of the current repository state:

```bash
python3 KnowledgeSystem/Tools/validate
python3 KnowledgeSystem/Tools/check-backlinks --check
python3 KnowledgeSystem/Tools/lint-knowledge
python3 KnowledgeSystem/Tools/build-index --check
python3 KnowledgeSystem/Tools/build-views --check
```

`validate`, `check-backlinks`, `lint-knowledge`, and both `--check` commands do
not write files. Lint is advisory by default and exits successfully even if it
reports warnings. With `--strict`, any warning produces exit code `1`.

## Change Current State outside a meeting

A requested Current State adjustment must not be made directly in the generated
document. Model it as a change to canonical knowledge first.

1. Use [`Prompts/review-knowledge.md`](Prompts/review-knowledge.md) to compare
   the request with the existing Knowledge Objects, Decisions, Changes, Topics,
   and registered sources.
2. Classify whether the request creates, refines, confirms, contradicts,
   supersedes, rejects, resolves, or implements durable knowledge.
3. Edit only the affected canonical inputs:
   - `Knowledge/items/K-*.md` for individual durable propositions;
   - `Decisions/D-*.md` for explicit initiative decisions;
   - `Changes/YYYY/*.md` for visible semantic transitions;
   - `Knowledge/topics/*.md` for coherent editorial synthesis;
   - `Knowledge/sources.yaml` for provenance and publication metadata;
   - `Views/*.template.md` for publication structure.
4. If human review is required, retain `review-required`, or retain `proposed`
   for a Decision Record, until the review is complete.
5. Have a human inspect the complete canonical diff, supporting evidence, and
   resulting English and German meaning.
6. After explicit approval, update the applicable review metadata and rebuild:

```bash
python3 KnowledgeSystem/Tools/build-index
python3 KnowledgeSystem/Tools/build-views
```

7. Run the complete final check and inspect the Git diff.

A wording-only edit must not silently alter meaning, maturity, or authority. If
the comparison produces no durable semantic change, `no-change` is a valid
result and no artificial Change entry is created.

## Process a new meeting

### Stage 1: transcript to Meeting Minutes

Keep a raw transcript local. Do not stage or publish it without explicit human
confidentiality clearance.

```bash
python3 KnowledgeSystem/Tools/prepare-meeting-minutes \
  "Transcripts/YYYY-MM-DD HH-MM-SS - Meeting der Initiative.txt"
```

The command validates the path and prints the required handoff to
[`../.agents/skills/t3thi-meeting-minutes/SKILL.md`](../.agents/skills/t3thi-meeting-minutes/SKILL.md).
It does not create Minutes and does not execute an LLM.

A human must then review the complete Meeting Minutes. The review covers at
least participants, statements, decisions, links, and any confidential or
not-for-protocol passages.

### Stage 2: reviewed Minutes to canonical knowledge

After the Minutes have been accepted, register the transcript and Minutes in
`Knowledge/sources.yaml`. The Minutes entry requires, among other fields,
`review_status: reviewed`, derivation from the transcript, and the generating
Meeting Minutes skill.

```bash
python3 KnowledgeSystem/Tools/ingest-reviewed-meeting \
  MeetingMinutes/Weekly/YYYY/MM/DD.md \
  --reviewed
```

`--reviewed` explicitly attests that the mandatory human Minutes review has
occurred. The command refuses the handoff if the attestation or matching source
registration is missing. It prints the handoff for
[`Prompts/ingest-reviewed-meeting.md`](Prompts/ingest-reviewed-meeting.md), but
does not execute an LLM or edit canonical knowledge.

Review, accept, build, and validate the proposed semantic changes in the same
way as any other knowledge change.

## Human review requirements

Explicit human review is required at least when:

- Meeting Minutes are first derived from a transcript;
- confidential, private, or not-for-protocol transcript material may be in
  scope;
- accepted Knowledge would be weakened, rejected, or superseded;
- evidence contradicts accepted Knowledge;
- the maturity of a proposition would materially increase;
- the vision or a fundamental direction would change;
- an accepted Decision Record would be created;
- initiative or TYPO3 Core authority is unclear;
- an English Topic Synthesis changed semantically and the German translation
  was updated accordingly.

Human review is more than setting a date. The reviewer:

1. reads the complete diff;
2. checks the proposition, uncertainty, and authority against its evidence;
3. confirms that confidential material did not propagate;
4. compares English and German meaning for Topic changes;
5. explicitly approves the result;
6. then updates the applicable metadata, such as `review.status: accepted`,
   `reviewed_at`, `review_status: accepted`, or `translation_reviewed_at`;
7. rebuilds and validates all generated output.

Keep `requires_human_review: true` in a Semantic Change after approval. It
permanently records that the transition required human authorization. The
accepted result is recorded by `review_status: accepted`.

## Check external Gerrit and Forge state

External states are volatile. When current status matters, compare the cached
observation read-only with the official service:

```bash
python3 KnowledgeSystem/Tools/check-external-status \
  gerrit:94510 \
  forge:110281
```

With no IDs, the command checks all registered Gerrit and Forge sources:

```bash
python3 KnowledgeSystem/Tools/check-external-status
```

The command never rewrites `Knowledge/sources.yaml`. Review any reported
difference and update canonical files deliberately.

For a custom deterministic offline test, provide a fixture containing
observations for the selected IDs registered in `Knowledge/sources.yaml`:

```bash
python3 KnowledgeSystem/Tools/check-external-status \
  gerrit:94510 \
  --fixture /path/to/external-status.json
```

The fixture under `Tests/knowledge/fixtures/` uses synthetic IDs for automated
fixture repositories and is not intended for the canonical registry. External
network checks do not belong in the deterministic offline build or CI pipeline.

## Generated and editable files

`build-index` generates:

- `Knowledge/index.md`;
- `Decisions/index.md`;
- `Changes/index.md`.

`build-views` generates:

- `Views/open-questions.md`;
- `Views/decisions-required.md`;
- `Views/knowledge-map.md`;
- `Views/backlinks.md`;
- `../MeetingMinutes/current-state.md`;
- `../MeetingMinutes/current-state.de.md`.

Do not edit these outputs directly. If a `--check` command reports `STALE`,
first finish all canonical edits and required reviews. Then run the relevant
builder without `--check` and verify the result again.

## Complete final check

Run this sequence after every semantic change:

```bash
python3 KnowledgeSystem/Tools/build-index
python3 KnowledgeSystem/Tools/build-views
python3 KnowledgeSystem/Tools/validate
python3 KnowledgeSystem/Tools/check-backlinks --check
python3 KnowledgeSystem/Tools/lint-knowledge --strict
python3 -m unittest discover \
  --start-directory KnowledgeSystem/Tests/knowledge \
  --pattern "test_*.py" \
  --verbose
python3 .agents/skills/t3thi-meeting-minutes/scripts/verify_minutes_contract.py
python3 KnowledgeSystem/Tools/build-index --check
python3 KnowledgeSystem/Tools/build-views --check
git diff --check
git status --short
git diff
git diff --cached
```

Stage and commit files only after these checks pass and a human has accepted the
complete semantic diff.

## Exit codes

- `0`: success; normal lint may still contain advisory warnings;
- `1`: validation failure, stale generated output, status difference, or a
  warning in `--strict` mode;
- `2`: usage or setup error, missing dependency, or unavailable external
  interface.

## Further documentation

- [Architecture and contributor guide](Knowledge/README.md)
- [Repository agent policy](AGENTS.md)
- [Human Current State maintenance workflow](Documentation/current-state-maintenance.md)
- [Transcript and confidentiality rules](Documentation/transcripts.md)
- [Meeting Minutes overview](../MeetingMinutes/overview.md)
- [Current State, English](../MeetingMinutes/current-state.md)
- [Current State, German](../MeetingMinutes/current-state.de.md)
