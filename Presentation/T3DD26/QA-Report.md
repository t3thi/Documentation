# T3DD26 presentation QA report

## Outcome

**PASS** for the current content and Reveal implementation.

Validation date: **8 August 2026**

## Content contract

| Check | Result |
|---|---|
| Main slides | 19 |
| Backup slides | 0 |
| Prepared duration | 28:00 |
| Buffer | 2:00 |
| Speaker note blocks | 19 |
| Speaker handout cues | 19 matched German and English pairs, each with two short sentences |
| Status vocabulary | `Current`, `Problem`, `Vision`, `Open`, `In Progress` |
| Visible words | 603 total |
| Largest slide | 66 words on the four responsibilities definition slide |
| Content links | Absolute HTTPS only |
| Local content references | None |
| Em dashes | None |

## Dramaturgy

The linear route is visible on slide M02 and followed by the complete deck:

1. Current behavior, the missing middle case and three distinct project gaps
2. Four explicit responsibilities
3. Language identity
4. Synchronization intent
5. Structural identity
6. Output policy
7. Current work, proposed cooperation and next steps

The four responsibility slide defines every term with a concrete question. Later slides repeat the responsibility number and name in the kicker. No backup branch interrupts the route.

## Static validation

Command:

```bash
npm run check
```

Result:

- HTML validation passed
- Presentation contract validation passed
- Production build passed
- Reveal imports are relative browser resolvable modules
- Vendored Reveal assets match the locked dependency
- Current TYPO3 Core citations are pinned to [commit `ee251c96d55b6e609a77334324be0b91bb0839e5`](https://github.com/TYPO3/typo3/tree/ee251c96d55b6e609a77334324be0b91bb0839e5)
- Runtime CSS and JavaScript load no remote assets
- Text contrast meets the validator threshold of 4.5:1
- Reduced motion and print styles are present

## Browser validation

Environment:

- Production Vite preview
- Chromium through Playwright
- 1600 by 900 viewport

Checks:

- All 19 slide IDs opened successfully
- All direct slide children remained inside the 1600 by 900 slide area
- No content overlap or clipping was detected
- Online mode produced no console errors or warnings
- The loaded presentation requested only local HTML, JavaScript, CSS and favicon assets
- Keyboard navigation continued after the browser was switched offline
- The only offline console entry was a favicon retry blocked by the simulated offline state
- The generated print PDF contained exactly 19 pages

Visually inspected slides included the three project gaps, current four-question mapping, four responsibilities, BCP 47 identity, Connected Mode additions, Editing Language, explicit absence, complete layers, Unit model and closing invitation.

The six slides changed in the latest content revision were rechecked at 1600 by 900. Their titles remain on one line, their direct elements remain inside the slide area and no top-level elements overlap.

## Feedback-specific content checks

| Topic | Result |
|---|---|
| Three use cases | Structural, identity and output gaps are stated separately. |
| Current state | Several interacting Core contracts are shown instead of one data model. |
| Language identity | Site-local numeric IDs are contrasted with shared BCP 47 identity. |
| Connected Mode | The need for a target-language-only addition without a default-language placeholder is explicit. |
| Editing Language | German remains the site default while English becomes the source shown for Chinese translation work. |
| Regional fallback | Missing translation and intentional omission receive different desired outcomes within one concrete configured chain. |

## Evidence boundaries

- Minus one remains implemented in current Core.
- BCP 47 is a preferred identity direction. Record storage is open.
- Explicit synchronization is a functional direction. API and lifecycle rules are open.
- Complete language layers are a direction. Their database representation is not selected.
- Editing Language is a product direction, not a current Core feature.
- Language zero is not automatically appended to every valid fallback chain. It is terminal only where configured.
- Free Mode is not presented as deprecated.
- Gerrit 92267 is work in progress and does not implement the target architecture.
- The proposed Unit model is under review. No Unit assignment or product priority is presented as decided.

## Historical reuse check

The TYPO3 Camp RheinRuhr 2024 talk was audited separately. The initiative purpose, target groups, compatibility principle, BCP 47 direction, fallback question and invitation to contribute were retained. The former claims that minus one was expiring and that one complete-layer database model was established were corrected.

Primary historical source: [T3CRR24: Translation Handling Initiative](https://notes.typo3.org/n2MVukjgQleQGO7bObL4lw).
