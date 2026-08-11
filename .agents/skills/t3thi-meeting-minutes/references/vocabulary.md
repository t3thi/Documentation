# Vocabulary Overlay (SuperWhisper-Style)

This file defines project-specific vocabulary mappings for terms that are often
misheard in transcripts.

It supports two modes:

- `explicit`: deterministic replacement for known transcription forms.
- `phonetic`: sound-alike replacement when context clearly supports the mapped
  term.

## Matching Rules

1. Match case-insensitively.
2. Treat spaces and hyphens as equivalent for matching.
3. Apply mappings in this order:
   1. `explicit` mappings from this file
   2. mappings from `transcription-corrections.md`
   3. `phonetic` mappings from this file
4. If multiple `phonetic` mappings are plausible, keep the original wording and
   ask the user.

## Vocabulary Entries

| Mode | Transkription / Klangvarianten | Korrekt | Hinweise |
|------|--------------------------------|---------|----------|
| phonetic | LZN-Records / LZN Records | `l10n records` | TYPO3 localization context |
| explicit | PHP-Storm / PHP Storm | `PhpStorm` | IDE name |
| explicit | Git-Pull / Git Pull | `git pull` | command |
| explicit | Reset-Hard / Reset Hard | `git reset --hard` | command |
| explicit | Git-Apply / Git Apply | `git apply` | command |
| phonetic | regebased / re-based | `rebased` | Git workflow context |
| phonetic | Functionell / Funktionell | `Functional` | test context |
| explicit | Auto-Vervollstättigung / Auto Vervollstättigung | `Autovervollständigung` | German UI term |
| phonetic | Datahändler | `DataHandler` | TYPO3 Core class |
| phonetic | Datahändling | `data handling` | generic concept |
| explicit | Abstract-Action-Test-Case / Abstract Action Test Case | `AbstractActionTestCase` | class name |
| explicit | Abstract-Data-Händler-Action-Test-Case / Abstract Data Händler Action Test Case | `AbstractDataHandlerActionTestCase` | class name |
| explicit | View Helper / View-Helper | `ViewHelper` | TYPO3/Fluid term |
| phonetic | Z-Object View Helper / Z Object View Helper | `cObject ViewHelper` | TYPO3 rendering context |
| explicit | Sys-File-Reference / Sys File Reference | `sys_file_reference` | DB table name |
| phonetic | Dyslog | `sys_log` | DB table name |
| phonetic | VIP-State / VIP State | `WIP state` | workflow context |
