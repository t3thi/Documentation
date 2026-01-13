# CLAUDE.md – EXT:scheduler

## 1) Extension Profile

The scheduler extension provides a task scheduling and execution framework for TYPO3 Core. It enables one-time or recurring execution of tasks via CLI commands or backend triggers, supporting both legacy serialized task objects and modern native task types defined via TCA. Task configuration, execution state, and scheduling metadata are persisted in the `tx_scheduler_task` table, with optional organizational grouping via `tx_scheduler_task_group`.

## 2) Relation to Database-Level Multilinguality

**Rating: none**

Justification:
- The extension's database tables (`tx_scheduler_task`, `tx_scheduler_task_group`) contain no language-related fields.
- TCA configurations for both tables define no `languageField`, `transOrigPointerField`, or `translationSource`.
- No QueryBuilder constraints filter or select records by language fields.
- No domain objects or DTOs carry language identifiers.
- The repository (`SchedulerTaskRepository`) performs no language-aware queries or overlay operations.
- Built-in tasks that operate on external tables (`IpAnonymizationTask`, `TableGarbageCollectionTask`) filter by timestamp fields only, with no language field handling.

## 3) Observed Code Hotspots (DB Language Logic)

None.

## 4) Structural Patterns

None.

## 5) Explicit Non-Relevant Areas

| Location | Appearance | Reason for Exclusion |
|----------|------------|---------------------|
| `Resources/Private/Language/*.xlf` | XLIFF translation files | UI label translations, not DB-level language handling |
| `Classes/Task/FileStorageIndexingTask.php:34` | `$storageUid = -1` | Default file storage UID, not a language identifier |
| `Classes/Task/FileStorageExtractionTask.php:34` | `$storageUid = -1` | Default file storage UID, not a language identifier |
| `Configuration/Backend/Modules.php:14` | `'workspaces' => 'live'` | Workspace context restriction, not language handling |
| `Tests/Functional/Controller/NewSchedulerTaskControllerTest.php` | `iconOverlay` references | UI icon overlay rendering, not language overlays |
| `Classes/CronCommand/NormalizeCommand.php` | Numeric range expressions (e.g., `1-12`, `2-10/3`) | Cron expression parsing, not language identifiers |

## 6) Open Observations

None.
