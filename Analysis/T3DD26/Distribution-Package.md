# T3DD26 distribution package

**Created:** 2026-08-08  
**Purpose:** Minimal static upload copy of the T3DD26 Reveal presentation.  
**Package directory:** `Presentation/T3DD26-Distribution/`

## Required files

| File | Purpose | SHA-256 |
|---|---|---|
| `index.html` | Presentation markup and startup document | `b381f4b2f5ec83deb928602c73ff61432c2fc78d482f38df012eac4170504268` |
| `assets/favicon-BYXeb2kv.svg` | Browser icon referenced by `index.html` | `5052f56ede2ec0825c0979d34974044200c85c4d697b0b48518ec4ee13e772d3` |
| `assets/index-BQxft35I.js` | Bundled Reveal runtime and presentation JavaScript | `46573019ff528819479e6a133b8a9af2ad8e58c26fad7684bda764317f938200` |
| `assets/index-DLx8-X5B.css` | Bundled presentation and Reveal styles | `488b0a18628a46f2324beb12ada587bb64b741c7674a6744e73d9fb92d30e211` |

The package contains four files and occupies approximately 292 KB on disk. It intentionally excludes source files, Markdown content, dependencies, build configuration, development scripts and source maps.

## Deployment contract

- Upload the contents of `Presentation/T3DD26-Distribution/` without changing the `assets/` directory structure.
- Serve `index.html` and the three assets as ordinary static files.
- Relative asset paths allow deployment at the domain root or in a subdirectory.
- The slides do not require runtime package installation or a JavaScript bundler on the server.
- Online citations remain external HTTPS links. The presentation itself contains no references to repository or local filesystem paths.

## Verification

- `npm run check` passed before the copy was created.
- The validator reported 19 main slides, no backup slides, 19 bilingual speaker-note pairs, absolute online sources, relative runtime assets and no em dashes.
- Every copied file matched the corresponding production-build file byte for byte.
- `index.html` references exactly the three included files below `assets/`.
- No source-map file or `sourceMappingURL` reference is present.

