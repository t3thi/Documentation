# T3DD26 Reveal presentation

Offline capable Reveal implementation of the 30 minute session **Translation Handling in TYPO3: Where We Are and Where We Could Go** by Eric Harrer.

The deck is English. It uses concise visible statements and keeps most explanation in speaker notes. Current Core behavior, problems, vision, open questions and active work use separate status labels.

## Editorial workflow

`Slide-Content.md` is the shared content document for all 19 slides.

`Speaker-Handout.md` condenses the complementary talk track into matching German and English cues for every slide.

1. Edit and discuss the affected slide in `Slide-Content.md`.
2. Confirm its status, source and boundary.
3. Transfer the approved change to `index.html`.
4. Run `npm run check` and browser QA.

The Markdown is the editorial authority for pending changes. The Reveal implementation is the authority for what is rendered. A revision is complete when both agree.

## Deck structure

- 19 horizontal slides for 28 minutes
- 2 minute buffer in the 30 minute slot
- no backup slide branch
- 19 speaker note blocks with timing, sources and boundaries
- Five status values: `Current`, `Problem`, `Vision`, `Open`, `In Progress`

The argument moves from the missing product use case through current semantics to future directions and a controlled next path:

1. The missing middle case and three distinct project gaps
2. Current Core contracts mapped to four concrete questions
3. Language identity, synchronization intent, structural identity and output policy
4. BCP 47, explicit synchronization, local exceptions and complete layers
5. Current work status, proposed Unit context and compatibility first delivery

## Install, run and build

Node.js dependencies are locked in `package-lock.json`.

```bash
npm ci
npm run dev
```

Production verification and build:

```bash
npm run check
npm run preview
```

The output is written to `dist/`. Reveal and its notes plugin are vendored, imports are relative and the presentation does not need runtime network access.

The minimal server-upload copy is written separately to `../T3DD26-Distribution/`. It contains only `index.html` and the three runtime assets required by that document. Its exact manifest and checksums are recorded in `../../Analysis/T3DD26/Distribution-Package.md`.

## Presenter controls

| Key | Action |
|---|---|
| Arrow keys or Space | Navigate |
| `S` | Open speaker view |
| `O` or `Esc` | Open overview |
| `?` | Show Reveal keyboard help |

## Print and PDF

Start the production preview and open:

```text
http://127.0.0.1:4173/?print-pdf
```

Use landscape orientation, background graphics, no margins and one slide per page. Verify the exported PDF before publication.

## Source and status discipline

Every content link in the deck is an absolute HTTPS source. Current Core citations are pinned to [TYPO3 Core commit `ee251c96d55b6e609a77334324be0b91bb0839e5`](https://github.com/TYPO3/typo3/tree/ee251c96d55b6e609a77334324be0b91bb0839e5). Initiative evidence is pinned where possible to [T3THI documentation commit `702db1d691ae4083d0325ea259aff7d639aa4ecd`](https://github.com/t3thi/Documentation/tree/702db1d691ae4083d0325ea259aff7d639aa4ecd).

Important boundaries:

- Minus one remains implemented. Replacement is a direction, not an adopted deprecation.
- BCP 47 is a preferred semantic identity. Record storage is open.
- Complete layers are a direction. Shadows, hidden zero, neutral structure and hybrids remain alternatives.
- Editing Language is a product direction, not a current Core feature.
- Language zero is terminal in a fallback chain only where it is configured.
- Free Mode is not presented as deprecated.
- Gerrit 92267 is a work in progress inventory, not the target implementation.
- The proposed Unit model is under public review and no assignment or priority is claimed.

`Core-Code-Validation.md` records current implementation evidence. `RheinRuhr-2024-Reuse-Audit.md` records which 2024 talk content remains reusable and which wording was corrected.

## Project files

| File | Purpose |
|---|---|
| `index.html` | Slide markup and speaker notes |
| `Slide-Content.md` | Shared editorial source for all 19 slides |
| `Speaker-Handout.md` | Compact bilingual speaker cues for all 19 slides |
| `Core-Code-Validation.md` | Current Core claim register |
| `RheinRuhr-2024-Reuse-Audit.md` | Historical reuse assessment |
| `src/main.js` | Reveal initialization |
| `src/styles.css` | Minimal layout, typography and print rules |
| `vendor/reveal/` | Locked Reveal browser assets and license |
| `scripts/validate.mjs` | Deterministic presentation contract checks |
| `QA-Report.md` | Reproducible QA result |
