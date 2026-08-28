# HedgeDoc Publication

This repository targets `https://notes.typo3.org`, which currently runs
HedgeDoc 1.12.x. HedgeDoc's documented HTTP API supports creating a new note,
resolving its published URL, and downloading its Markdown. It does **not**
provide a supported endpoint for replacing the content of an existing note.

Official references:

- [HedgeDoc 1.x API](https://docs.hedgedoc.org/dev/api/)
- [HedgeDoc permissions](https://docs.hedgedoc.org/references/permissions/)

## Safety Model

Use `scripts/publish_minutes.py` only after the repository Minutes have passed
human review. The script:

1. validates the dated file path, frontmatter date, and unique overview entry;
2. requires an authenticated HedgeDoc session and verifies it through `/me`;
3. refuses non-HTTPS production origins;
4. creates a new note through the documented `POST /new` endpoint;
5. resolves the canonical `/s/...` URL and downloads the Markdown again without
   credentials, proving that the published note is publicly readable;
6. compares the downloaded bytes with the local reviewed file;
7. links `MeetingMinutes/overview.md` only after exact verification; and
8. treats a matching existing overview URL as an idempotent success.

The script never prints or stores the session cookie. It does not retry an
uncertain create request because a timeout can occur after the server has
already created the note.

## Authentication

HedgeDoc 1.x has no long-lived personal access token for this API. For local
interactive use, select `--cookies-from-browser firefox`. The script discovers
the user's normal Firefox profiles, makes a short-lived file copy of each
`cookies.sqlite` together with available WAL data, and queries only the
`connect.sid` cookie belonging to the exact HedgeDoc host. A bounded retry
handles a copy that changes while Firefox is writing; the tool never waits on
Firefox's live SQLite lock. It tests matching candidates through `/me`, never
prints or persists a cookie value, and removes every temporary database copy
when the process exits.

If no candidate is authenticated, the script opens the exact SAML sign-in page
in the normal Firefox application. Complete the login and press Enter in the
terminal. The script then reads Firefox again and continues only when `/me`
confirms the refreshed session. It does not create a separate browser profile.
Use `--firefox-profile NAME_OR_PATH` only if several normal profiles make
automatic selection ambiguous. Add `--no-browser-login` when an interactive
browser fallback must be prohibited.

For CI or another non-interactive environment, supply the full Cookie header
through `HEDGEDOC_SESSION_COOKIE` in the secret store and select
`--cookies-from-environment`. Never pass the value as a command-line argument,
commit it, write it to a log, or copy it into a repository file. The session
expires and must be rotated; fully unattended permanent CI is therefore not
reliable until the service offers durable API credentials.

The documented API also cannot set or report the note permission. New notes use
the server's `defaultPermission`. The anonymous read-back proves public
readability, but an owner must inspect the editor permission once if the project
requires a stricter write policy than the server default.

## Commands

Run these commands from the repository root.

Validate the latest Minutes locally without network access or remote changes:

```bash
python3 .agents/skills/t3thi-meeting-minutes/scripts/publish_minutes.py check
```

For normal interactive publication, run without parameters:

```bash
python3 .agents/skills/t3thi-meeting-minutes/scripts/publish_minutes.py
```

The script selects the latest `MeetingMinutes/Weekly/YYYY/MM/DD.md` file and
offers `--reviewed --cookies-from-browser firefox` as one combined default.
Press Enter to confirm it. Specify a Minutes path only for an older or other
non-latest document. When just one of the two safety-relevant options is
omitted, the script prompts for that option separately.

To publish a non-latest document interactively, provide only its path and
confirm the same defaults:

```bash
python3 .agents/skills/t3thi-meeting-minutes/scripts/publish_minutes.py \
  MeetingMinutes/Weekly/2026/08/21.md
```

For machine-readable output, append `--json`. For another HedgeDoc 1.x server,
append `--base-url https://notes.example.org`.

For non-interactive publication, pass the Minutes path and all decisions
explicitly. Either use `--cookies-from-browser firefox`, or inject
`HEDGEDOC_SESSION_COOKIE` through the shell or secret manager and add
`--cookies-from-environment`.

After the command succeeds, inspect the `MeetingMinutes/overview.md` diff and
commit the new URL together with the reviewed Minutes. If the environment
variable was used, remove it when the publication step is finished.

## Existing Notes and Failure Recovery

- If the overview already links the date, the script downloads that note. An
  exact content match succeeds without creating another note.
- If the existing remote content differs, the script stops. Update the note in
  the HedgeDoc editor and verify it manually; do not create a duplicate simply
  to bypass the mismatch.
- A pre-created blank `/s/...` note cannot be populated through HedgeDoc's
  documented HTTP API. Fill it once through the editor, or leave the overview
  entry unlinked and let this script create a new note.
- If the create request has an uncertain network outcome, inspect the signed-in
  account history before retrying. A blind retry can create a duplicate.
- If the output reports that a remote note was created and verified but the
  overview write failed, use the reported URL to repair the single overview
  entry locally. The remote note must not be recreated.

## Maintainer Verification

The publication client is tested entirely offline against a local fake server:

```bash
python3 .agents/skills/t3thi-meeting-minutes/scripts/test_publish_minutes.py
```
