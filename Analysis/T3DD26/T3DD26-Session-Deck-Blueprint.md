# T3DD26 Session Deck Blueprint: Translation Handling

## Zweck und Leitplanken

Dieses Blueprint entwirft eine 30-minütige T3DD26-Session als Problem- und Entscheidungsdramaturgie, nicht als Meeting-Chronologie. Es verdichtet alle Dossiers in `Analysis/T3DD26/SourceAudits/` und bevorzugt bei Widersprüchen die jüngere, präzisere Quelle.

Die Statuswerte sind bewusst streng: `Current` bezeichnet dokumentiertes heutiges Verhalten, `Problem` dessen nachgewiesene Kosten, `Vision` ein Zielbild ohne Roadmap-Zusage, `Open` eine unentschiedene Frage und `In Progress` tatsächlich laufende Vorbereitungs- oder Core-Arbeit. Insbesondere sind weder die Abschaffung von Free Mode noch ein Shadow-/Layer-/Neutral-Identity-Modell beschlossen.

## Dramaturgie und Timing

| Akt | Folien | Zeit | Dramaturgische Bewegung |
|---|---:|---:|---|
| Auftakt | 1 | 00:00–00:45 | Das Versprechen: von technischen Modi zu verständlicher Absicht |
| I — Warum es weh tut | 2–6 | 00:45–09:45 | Vom wichtigsten Marktfall über die heutigen Achsen zu konkreten TYPO3-Schäden |
| II — Was ein explizites Modell leisten könnte | 7–13 | 09:45–23:15 | Zielprinzipien, Identität, Synchronisation und UX; dann der offene Architektur-Fork |
| III — Wo wir wirklich stehen | 14–15 | 23:15–28:15 | Reale Arbeit von Vision trennen und einen gated evolution path anbieten |
| Puffer / Rückfrage | — | 28:15–30:00 | Eine Verständnisfrage oder bewusster Übergang in die Diskussion |

| Slide | Zeitfenster | Dauer |
|---:|---:|---:|
| 1 | 00:00–00:45 | 0:45 |
| 2 | 00:45–02:30 | 1:45 |
| 3 | 02:30–04:15 | 1:45 |
| 4 | 04:15–06:00 | 1:45 |
| 5 | 06:00–07:45 | 1:45 |
| 6 | 07:45–09:45 | 2:00 |
| 7 | 09:45–11:00 | 1:15 |
| 8 | 11:00–12:45 | 1:45 |
| 9 | 12:45–14:45 | 2:00 |
| 10 | 14:45–16:45 | 2:00 |
| 11 | 16:45–18:45 | 2:00 |
| 12 | 18:45–20:45 | 2:00 |
| 13 | 20:45–23:15 | 2:30 |
| 14 | 23:15–25:15 | 2:00 |
| 15 | 25:15–28:15 | 3:00 |

## Main Slides

### Slide 1

**Titel:** Translation Handling: von technischen Modi zu redaktioneller Absicht

**Kernaussage:** Die Session verkauft keine fertige Architektur, sondern eine klarere Problemzerlegung und einen sicheren Weg zur Entscheidung.

**Punkte:**

- TYPO3 ist stark, solange Sprachvarianten derselben Struktur folgen.
- Reale Märkte brauchen zusätzlich gezielte strukturelle Abweichungen.
- Heute vermischen sich Sprachidentität, Struktur, Synchronisation und Ausgabe.
- Ziel der Session ist strategische Anerkennung plus Discovery, nicht die Freigabe eines Großumbaus.

**Visualisierung:**

```text
EDITOR INTENT  →  explicit semantics  →  predictable editing + output
      today: modes, 0/-1, relations and fallback are entangled
```

**Quellen:** `MeetingMinutes/Weekly/2026/06/26.md:31-96,194-224`; `MeetingMinutes/Weekly/2026/07/10.md:24-30,50-58`

**Slide-Status:** `Vision`

**Session-Priorität:** `Essential`

### Slide 2

**Titel:** Der wertvollste Anwendungsfall liegt in der Mitte

**Kernaussage:** „Mostly connected, selectively different“ ist der Produktfall, den das heutige Modell am schlechtesten unterstützt.

**Punkte:**

- Identische Strukturen mit übersetzten Feldwerten funktionieren gut.
- Vollständig unabhängige Strukturen bleiben ein legitimer Extremfall.
- Der häufige Marktfall teilt fast alles und ergänzt nur wenige lokale Elemente.
- Eine lokale Ergänzung erzwingt heute Mixed Mode, Verlust der Verbindung oder einen künstlichen Default-Datensatz.

**Visualisierung:**

```text
identical ── reduced ── [ ENRICHED ] ── changed ── independent
                           ^ product gap
```

**Quellen:** `MeetingMinutes/Weekly/2026/06/26.md:31-96,194-214`; `MeetingMinutes/Weekly/2026/07/10.md:34-48`

**Slide-Status:** `Problem`

**Session-Priorität:** `Essential`

### Slide 3

**Titel:** Backend-Verbindung ist nicht Frontend-Fallback

**Kernaussage:** TYPO3 beantwortet zwei verschiedene Fragen mit ähnlich klingenden Sprachmodellen; das erzeugt falsche Erwartungen.

**Punkte:**

- `l10n_parent` und die Backend-Modi beschreiben redaktionelle Beziehungen und Struktur.
- Site-Fallback und Overlay-Modi bestimmen davon getrennt die Frontend-Ausgabe.
- „Connected“ sagt deshalb nicht, welcher Inhalt im Frontend erscheint.
- Die Fallback-/Overlay-Logik ist über mehrere Core-Pfade verteilt und kann unterschiedlich wirken.

**Visualisierung:**

```text
BACKEND:  record ──l10n_parent──> structural parent
FRONTEND: request language ──fallback policy──> rendered record
                         two lanes, not one switch
```

**Quellen:** `MeetingMinutes/Weekly/2023/10/2023-10-27.md:53-77`; `MeetingMinutes/Weekly/2023/12/2023-12-15.md:20-104`; `MeetingMinutes/Weekly/2026/06/26.md:206-232`

**Slide-Status:** `Current`

**Session-Priorität:** `Essential`

### Slide 4

**Titel:** Zwei Zahlen tragen zu viel Bedeutung

**Kernaussage:** `0` und `-1` sind keine bloßen IDs; sie kodieren zugleich reale Sprache, Strukturrolle und Verteilungsabsicht.

**Punkte:**

- `0` bezeichnet eine reale Default-Sprache und zugleich den strukturellen Lead.
- `-1` bedeutet „alle Sprachen“, obwohl es keine reale Sprache bezeichnet.
- Dieselbe reale Sprache kann je Site unterschiedliche IDs haben; dieselbe ID kann unterschiedlich benannt sein.
- Damit sind Portabilität, Cross-Site-Nutzung und eine saubere semantische Sprachzuordnung blockiert.

**Visualisierung:**

```text
0   = visible language + default flag + structural lead
-1  = record identity? + distribution policy
9/10 = possibly the same real language in two sites
```

**Quellen:** `MeetingMinutes/Weekly/2024/01/2024-01-19.md:25-67`; `MeetingMinutes/Weekly/2026/06/11.md:52-80`; `MeetingMinutes/Weekly/2026/07/31.md:55-61`

**Slide-Status:** `Problem`

**Session-Priorität:** `Essential`

### Slide 5

**Titel:** Die implizite Semantik leckt in jede Operation

**Kernaussage:** Sonderwerte und verdeckte Beziehungen werden als Guards, Sonderabfragen und inkonsistente Moduleffekte im ganzen System bezahlt.

**Punkte:**

- Beim Layout-Paste liefert der Zielkontext `0`, der Clipboard-Datensatz `-1`; DataHandler repariert das verdeckt zurück auf `-1`.
- Sortierung, Free/Mixed Mode und Übersetzungs-Parent-Auswahl benötigen weitere Sonderregeln.
- Ein Projekt meldete über 500.000 doppelte Bildreferenzen an einem Tag; die konkrete Kausalkette blieb unbewiesen, die Risikogröße ist real.
- Betroffen sind DataHandler, Workspaces, Queries, Routing, Berechtigungen und Rendering.

**Visualisierung:**

```text
UI → clipboard → DataHandler → relations → workspace → query → render
          one hidden semantic mismatch ripples through the stack
```

**Quellen:** `MeetingMinutes/Weekly/2026/03/20.md:23-45`; `MeetingMinutes/Weekly/2026/01/23.md:33-40`; `MeetingMinutes/Weekly/2026/07/10.md:50-58`; `MeetingMinutes/Weekly/2026/07/24.md:37-63`

**Slide-Status:** `Problem`

**Session-Priorität:** `Useful`

### Slide 6

**Titel:** Drei TYPO3-Fälle, eine fehlende Abstraktion

**Kernaussage:** Lokale Ergänzung, globaler Storage und regionaler Fallback verlangen dieselbe Trennung von Identität, Absicht, Struktur und Ausgabe.

**Punkte:**

- „Ich brauche genau ein zusätzliches Element auf Deutsch“ soll keine leere Default-Kopie verlangen.
- Drei Sites können einen globalen Storage mit weit mehr Übersetzungen teilen, als jede Site selbst anbietet.
- UK-Englisch soll allgemeines Englisch nutzen, aber niemals bis zur deutschen Default-Sprache fallen.
- Alle drei Fälle brauchen ausdrückliche Semantik statt erratener Bedeutung aus IDs und Lücken.

**Visualisierung:**

```text
[DE-only teaser]   [global storage / 20 variants]   [en-GB → en, never de]
          \                    |                    /
           └──── explicit identity + intent + structure ────┘
```

**Quellen:** `MeetingMinutes/Weekly/2026/05/29.md:23-27`; `MeetingMinutes/Weekly/2026/06/26.md:56-62,194-212`; `MeetingMinutes/Weekly/2026/07/24.md:19-25`; `MeetingMinutes/Weekly/2026/07/31.md:39-45`

**Slide-Status:** `Problem`

**Session-Priorität:** `Essential`

### Slide 7

**Titel:** Das Zielbild trennt vier Verantwortlichkeiten

**Kernaussage:** Ein verständlicheres System macht Sprache, Verteilungsabsicht, Struktur und Ausgabe zu getrennten, expliziten Konzepten.

**Punkte:**

- Sprachidentität beschreibt eine reale Sprache stabil und siteübergreifend.
- Synchronisation beschreibt, welche Inhalte oder Felder geteilt werden sollen.
- Strukturidentität beschreibt Position und Zugehörigkeit ohne versteckte Sprachprivilegien.
- Fallback bleibt eine bewusste Ausgabepolitik und wird nicht aus Backend-Verbindungen abgeleitet.

**Visualisierung:**

```text
IDENTITY  |  SYNC INTENT  |  STRUCTURE  |  OUTPUT POLICY
   who    |   what shares |   where     |   what renders
```

**Quellen:** `MeetingMinutes/Weekly/2026/05/08.md:24-64`; `MeetingMinutes/Weekly/2026/06/11.md:52-80`; `MeetingMinutes/Weekly/2026/06/26.md:206-224`

**Slide-Status:** `Vision`

**Session-Priorität:** `Essential`

### Slide 8

**Titel:** BCP 47 gibt Sprache eine stabile Bedeutung

**Kernaussage:** Eine beschreibende Sprachidentität kann dieselbe Sprache über Sites, Roots und austauschbare Daten hinweg erkennbar machen.

**Punkte:**

- Numerische Site-IDs sind lokale Schlüssel, aber keine verlässliche sprachliche Bedeutung.
- BCP 47 ist die wiederkehrend bevorzugte Richtung für die semantische Identität.
- Das unterstützt Cross-Site-Wiederverwendung und übersetzte Dateimetadaten.
- Speicherung, Legacy-Mapping, Normalisierung und die künftige Rolle numerischer Keys sind noch offen.

**Visualisierung:**

```text
Site A: id 9  ─┐
               ├── language tag: en-GB ── shared meaning/data
Site B: id 14 ─┘
```

**Quellen:** `MeetingMinutes/Weekly/2025/07/2025-07-25.md:22-65`; `MeetingMinutes/Weekly/2026/07/10.md:50-54`; `MeetingMinutes/Weekly/2026/07/31.md:55-61`

**Slide-Status:** `Vision`

**Session-Priorität:** `Essential`

### Slide 9

**Titel:** „Alle Sprachen“ wird Verhalten statt Identität

**Kernaussage:** Die tragfähigste Ersatzrichtung für `-1` ist explizite Synchronisationsabsicht mit konkreten Sprachvarianten.

**Punkte:**

- Heute verkörpert ein `-1`-Datensatz zugleich Inhalt und Verteilungsregel.
- Als erste Paritätsstufe könnte ein Source-Datensatz „in alle Sprachen synchronisieren“ markieren.
- Später wären ausgewählte Sprachziele oder Zielgruppen denkbar, ohne eine neue Pseudo-Sprache zu erfinden.
- `allow`/`exclude`/`enforce` liefern Vorbegriffe; der konkrete Record-/Field-Vertrag ist nicht definiert.

**Visualisierung:**

```text
TODAY                         DIRECTION
[record @ -1]                [source + sync policy]
     └─ implicit everywhere       ├─ [de]
                                  ├─ [en]
                                  └─ [fr]
```

**Quellen:** `MeetingMinutes/Weekly/2024/10/2024-10-18.md:21-66`; `MeetingMinutes/Weekly/2026/05/08.md:24-30,44-46`; `MeetingMinutes/Weekly/2026/06/11.md:62-74`

**Slide-Status:** `Vision`

**Session-Priorität:** `Essential`

### Slide 10

**Titel:** Der Ersatz ist ein Lebenszyklus, kein Boolean

**Kernaussage:** Ohne Konflikt-, Provenienz- und Rückbau-Semantik wäre ein All-Languages-Flag nur ein neuer Sonderfall.

**Punkte:**

- Aktivieren muss vorhandene unabhängige Übersetzungen erkennen: übernehmen, ausnehmen, vergleichen oder blockieren?
- Deaktivieren muss erzeugte Varianten löschen, lösen oder als normale Datensätze einfrieren können.
- Neue Site-Sprachen, manuelle Änderungen und die Herkunft automatisch erzeugter Datensätze brauchen Regeln und Auditierbarkeit.
- Workspaces, Restore/Delete, Referenzen, Rollback und Extension-Kompatibilität sind Migrations-Gates.

**Visualisierung:**

```text
manual ──?──> synchronized ──?──> detached
   │                │                 │
conflict?       new language?      delete/freeze?
```

**Quellen:** `MeetingMinutes/Weekly/2025/01/2025-01-31.md:35-52`; `MeetingMinutes/Weekly/2026/05/29.md:39-45`; `MeetingMinutes/Weekly/2026/07/24.md:59-63`

**Slide-Status:** `Open`

**Session-Priorität:** `Essential`

### Slide 11

**Titel:** Editing Language macht das Modell redaktionell

**Kernaussage:** Redakteurinnen und Redakteure sollten zuerst wählen, in welcher Inhaltssprache sie arbeiten, und nicht, welche technische Relation sie erzeugen.

**Punkte:**

- Editing Language ist der Inhaltskontext und ausdrücklich nicht die Sprache der Backend-Oberfläche.
- Ein vollständiger Page Tree kann fehlende Sprachvarianten dezent als Struktur zeigen.
- Das Page Module kann „Translate Page“ und Quellenauswahl anbieten, statt technische Schatten offenzulegen.
- Dieses UX-Konzept und sein Prototyp waren geplant; sie sind kein implementiertes Core-Feature.

**Visualisierung:**

```text
[Editing language: en-US ▾]
Page tree:  Home  Products  ·Legal·
Page module on ·Legal·:  [Translate page]
```

**Quellen:** `MeetingMinutes/Weekly/2026/05/08.md:48-68`; `Transcripts/2026-05-08 12-13-43 - Meeting der Initiative.txt:401-590,591-663`

**Slide-Status:** `Vision`

**Session-Priorität:** `Essential`

### Slide 12

**Titel:** Connected darf lokale Ausnahmen zulassen

**Kernaussage:** Das Ziel ist ein flexibleres verbundenes Modell und nicht die pauschale Abschaffung legitimer Unabhängigkeit.

**Punkte:**

- Ein Zielsprachen-Element könnte direkt erstellt werden, während TYPO3 den nötigen strukturellen Partner verwaltet.
- Die große gemeinsame Struktur behält Synchronisation, Zuordnung und Re-Translation-Unterstützung.
- Die lokale Ausnahme benötigt keinen leeren sichtbaren Default-Datensatz und kippt nicht alles in Mixed Mode.
- Radikal abweichende Sites können weiterhin Free Mode benötigen; eine Deprecation ist nicht beschlossen.

**Visualisierung:**

```text
shared:   A ── B ── C
                  \
market:   A ── B ── C ── [local event]
          connection survives the exception
```

**Quellen:** `MeetingMinutes/Weekly/2026/06/26.md:194-214`; `Transcripts/2026-06-26 12-00-22 - Meeting der Initiative.txt:470-483,514-544`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:203-223`

**Slide-Status:** `Vision`

**Session-Priorität:** `Essential`

### Slide 13

**Titel:** Wo lebt Struktur? Drei Modelle, keine Entscheidung

**Kernaussage:** Sparse Overlays, materialisierte Shadows/Layers und eine neutrale Strukturidentität verschieben Komplexität unterschiedlich; der Fork bleibt offen.

**Punkte:**

- Das heutige sparse/default-geführte Modell spart Datensätze, verlangt aber Laufzeit-Overlay und Sonderlogik.
- Vollständige oder Shadow-Layer materialisieren Lücken, benötigen dafür Provenienz und einen robusten Datensatz-Lebenszyklus.
- Eine neutrale Strukturidentität trennt Position/Zugehörigkeit von jeder realen Sprache, braucht aber ein neues Identitäts- und API-Modell.
- Das versteckte `0`-Gerüst ist eine PoC-Hypothese, kein Beschluss für eine echte neutrale Ebene; auch Hybride sind offen.

**Visualisierung:**

```text
A  sparse/default-led     B  materialized layers     C  neutral spine
   [DE lead]                 [S][S][S]                  [structure]
    ├─[EN]                   [DE][EN][FR]               ├[DE] ├[EN] └[FR?]
    └─[FR?]                  shadows/records            language-independent
```

**Quellen:** `MeetingMinutes/Weekly/2025/10/2025-10-24.md:45-78`; `MeetingMinutes/Weekly/2026/05/08.md:40-58`; `MeetingMinutes/Weekly/2026/07/10.md:50-58`

**Slide-Status:** `Open`

**Session-Priorität:** `Essential`

### Slide 14

**Titel:** Der reale Stand ist Vorbereitung, nicht Rollout

**Kernaussage:** Laufende Arbeit macht das heutige Verhalten testbar und repariert begrenzte Fehler; sie implementiert noch kein Zielmodell.

**Punkte:**

- `#92267` inventarisiert/markiert `-1`-Sonderbehandlung und war im April weiterhin WIP mit Bereinigungsbedarf.
- Charakterisierung, Workspaces und konkrete Producer-Pfade werden vor funktionaler Änderung untersucht.
- Begrenzte Fixes wie `#92580`, `#88837` und `#94831` sind gemergt, ohne die Architektur zu entscheiden.
- Editing-Language-/Hidden-Layer-Arbeit blieb Prototyp- beziehungsweise Discovery-Idee.
- Nach den Dialog Days waren Core-Ownership und Priorisierung weiterhin unklar; es gibt keine verbindliche Migrationsroadmap.

**Visualisierung:**

```text
MERGED SMALL FIXES       IN PROGRESS              NOT IMPLEMENTED
#92580 #88837 #94831     inventory + tests        target model + migration
```

**Quellen:** `MeetingMinutes/Weekly/2026/01/09.md:21-77`; `MeetingMinutes/Weekly/2026/02/13.md:19-35`; `MeetingMinutes/Weekly/2026/04/24.md:23-53`; `MeetingMinutes/Weekly/2026/07/24.md:17-35`

**Slide-Status:** `In Progress`

**Session-Priorität:** `Essential`

### Slide 15

**Titel:** Sicher weiterentwickeln: Understand → Test → Decide → Change → Prove

**Kernaussage:** TYPO3 kann jetzt belastbar vorarbeiten, ohne einen offenen Architektur-Fork als Roadmap auszugeben.

**Punkte:**

- **Understand:** Sonderwerte, Producer, Extension-Zugriffe und zu erhaltende Use Cases vollständig inventarisieren.
- **Test:** heutige Semantik einschließlich Workspaces, Beziehungen und Rendering charakterisieren.
- **Decide/PoC:** Sync-Lifecycle, Sprachidentität und Strukturmodell wählen und UX-, Daten- sowie Codekosten messen.
- **Change/Migrate:** reversible Migration, Konfliktberichte, Kompatibilitätsfenster und Upgrade-Dokumentation definieren.
- **Prove:** die konkreten Fälle „lokale Ergänzung“, „globaler Storage“ und „regionaler Fallback“ im alten und neuen Modell nachweisen.

**Visualisierung:**

```text
UNDERSTAND ─→ TEST ─┬─→ bounded fixes
                    └─→ DECIDE ─→ PoC ─→ MIGRATE ─→ PROVE
                         ^ architecture gate, not calendar promise
```

**Quellen:** `MeetingMinutes/Weekly/2024/11/2024-11-22.md:37-39`; `MeetingMinutes/Weekly/2024/11/2024-11-29.md:20-26`; `MeetingMinutes/Weekly/2026/01/09.md:21-77`; `MeetingMinutes/Weekly/2026/04/24.md:29-37,69-75`; `MeetingMinutes/Weekly/2026/07/24.md:27-35`

**Slide-Status:** `In Progress`

**Session-Priorität:** `Essential`

## Backup Slides

### Backup Slide B1

**Titel:** Die aktuelle Modus-Matrix

**Kernaussage:** Backend-Verknüpfung und Frontend-Ausgabe bilden zwei Achsen; eine einzige Modusbezeichnung kann beide nicht erklären.

**Punkte:**

- Backend: Free, Connected und Mixed beschreiben Datensatzbeziehungen und Bearbeitung.
- Frontend: freie Ausgabe, Fallback-Kette und Strict bestimmen die Ausgabeauswahl.
- Zusätzlich existieren Overlay-Varianten in LanguageAspect/PageRepository-Pfaden.
- Gleiche Wörter für verschiedene Achsen erzeugen Fehlannahmen in UX, Tests und Extensions.

**Visualisierung:**

```text
                 FRONTEND OUTPUT
BACKEND      free     fallback     strict
Free          ·          ·            ·
Connected     ·          ·            ·
Mixed         ·          ·            ·
```

**Quellen:** `MeetingMinutes/Weekly/2023/10/2023-10-27.md:53-77`; `MeetingMinutes/Weekly/2023/12/2023-12-15.md:20-104`; `MeetingMinutes/Weekly/2023/12/2023-12-29.md:20-62`

**Slide-Status:** `Current`

**Session-Priorität:** `Too Detailed`

### Backup Slide B2

**Titel:** Fallback braucht ausdrückliche Abwesenheit

**Kernaussage:** „Nicht vorhanden“, „absichtlich verborgen“ und „regional wiederverwenden“ sind drei verschiedene Produktabsichten.

**Punkte:**

- Strict soll nur die angefragte Sprache rendern und keine konfigurierte Kette einschmuggeln.
- Der legitime Fall en-GB → en braucht eine Fallback-Kette ohne zwingenden letzten Sprung zu Deutsch.
- Heute kann eine deaktivierte verbundene Übersetzung den Default-Fallback nicht zuverlässig blockieren.
- Eine Änderung wäre potenziell breaking und benötigt explizite Semantik plus Regressionstests.

**Visualisierung:**

```text
missing ─────→ try fallback
disabled ────→ ? intentionally absent
en-GB → en ──→ stop before de
```

**Quellen:** `MeetingMinutes/Weekly/2026/06/11.md:20-42`; `MeetingMinutes/Weekly/2026/07/10.md:68-80`; `MeetingMinutes/Weekly/2026/07/31.md:39-45`

**Slide-Status:** `Open`

**Session-Priorität:** `Useful`

### Backup Slide B3

**Titel:** Synchronisation ist eine Policy-Leiter

**Kernaussage:** `exclude`, editor-erlaubtes `allow` und systemisches `enforce` dürfen nicht als austauschbare Schalter behandelt werden.

**Punkte:**

- `l10n_mode=exclude` repräsentiert bestehende systemische Feldkopplung mit bekannten Randfällen.
- `allowLanguageSynchronization` gibt die Entscheidung pro Feld an Redakteurinnen und Redakteure.
- `enforceLanguageSynchronization` wurde als dritter Zustand diskutiert, aber nicht als fertiger TCA/API-Vertrag definiert.
- Record-weite All-Languages-Synchronisation und feldweise Policy müssen getrennt spezifiziert werden.

**Visualisierung:**

```text
none ───── allow(editor choice) ───── enforce(system policy)
 field scope ?                         record scope ?
```

**Quellen:** `MeetingMinutes/Weekly/2024/04/2024-04-12.md:40-74`; `MeetingMinutes/Weekly/2024/10/2024-10-18.md:21-66`; `MeetingMinutes/Weekly/2026/06/11.md:62-74`

**Slide-Status:** `Open`

**Session-Priorität:** `Useful`

### Backup Slide B4

**Titel:** Das Sortierungsproblem in drei Buchstaben

**Kernaussage:** Verdeckte Struktur macht eine scheinbar einfache Bewegung mehrdeutig und verbindet UX unmittelbar mit dem Datenmodell.

**Punkte:**

- In einer Sprache sind A und C sichtbar, während B aus einer anderen Sprache dazwischenliegt.
- „C vor A“ kann vor B, zwischen B und A oder nur in der sichtbaren Projektion bedeuten.
- Vollständige Strukturansicht oder ein gezielter Konfliktdialog könnten die Mehrdeutigkeit sichtbar machen.
- Strukturführerschaft und Berechtigungen sind dabei ebenso offen wie der Sortieralgorithmus.

**Visualisierung:**

```text
all structure:   A ─ B(hidden) ─ C
visible view:    A ───────────── C
move C before A:  C-A-B ?  B-C-A ?  C-B-A ?
```

**Quellen:** `MeetingMinutes/Weekly/2026/05/29.md:47-61`; `Transcripts/2026-05-29 12-01-43 - Meeting der Initiative.txt:270-481`

**Slide-Status:** `Open`

**Session-Priorität:** `Useful`

### Backup Slide B5

**Titel:** IRRE zeigt den Code-versus-Daten-Trade-off

**Kernaussage:** Ein gemergter enger Fix belegt, dass explizit persistierte Kinder Ownership vereinfachen können; er entscheidet nicht über vollständige Sprachlayer.

**Punkte:**

- `#88837` erzeugt für lokalisierte Parents separate synchronisierte Kinder aus nicht sprachfähigen IRRE-Tabellen.
- Das verhindert, dass Remapping das ursprüngliche Kind dem neuen Parent „stiehlt“.
- Befürworter sehen einfacheres Ownership und Lookup; das Gegenargument ist Datenökonomie.
- Die Übertragbarkeit auf Shadows oder komplette Layer bleibt eine Core-Architekturfrage.

**Visualisierung:**

```text
before: Parent-DE ─┐
                   ├─ Child X   (ownership ambiguity)
        Parent-EN ─┘
after:  Parent-DE ─ Child X-DE   |   Parent-EN ─ Child X-EN
```

**Quellen:** `MeetingMinutes/Weekly/2026/03/27.md:32-40`; `MeetingMinutes/Weekly/2026/04/24.md:23-27`; `Transcripts/2026-03-27 12-02-56 - Meeting der Initiative.txt:371-420,582-664`

**Slide-Status:** `Open`

**Session-Priorität:** `Useful`

### Backup Slide B6

**Titel:** Migration ist eine Kompatibilitätsmatrix

**Kernaussage:** Ein sicheres Upgrade muss Datenidentität, Beziehungen, Laufzeit-APIs und Extensions gemeinsam migrieren.

**Punkte:**

- `0`, `-1` und site-lokale IDs brauchen eine konfliktfähige Zuordnung zu semantischen Sprachen.
- Vorhandene manuelle Varianten dürfen nicht still überschrieben oder als automatisch erzeugt umgedeutet werden.
- Workspaces, Restore/Delete, MM/IRRE, Reference Index und Fallback-Ausgabe benötigen Migrationsproben.
- Extensions mit direkten Abfragen auf `sys_language_uid`, `l10n_parent` oder Overlay-APIs brauchen ein Kompatibilitätsfenster.
- Preflight, Protokollierung, Abbruch und Rollback sind Teil des Features, nicht nachgelagerte Ops-Arbeit.

**Visualisierung:**

```text
legacy data ─→ preflight ─→ map/conflicts ─→ migrate ─→ verify ─→ rollback?
                DB + Workspace + APIs + extensions + rendered output
```

**Quellen:** `MeetingMinutes/Weekly/2024/09/2024-09-27.md:44-68`; `MeetingMinutes/Weekly/2025/01/2025-01-31.md:35-52`; `MeetingMinutes/Weekly/2026/05/29.md:39-61`; `MeetingMinutes/Weekly/2026/07/24.md:59-63`

**Slide-Status:** `Open`

**Session-Priorität:** `Too Detailed`

### Backup Slide B7

**Titel:** Extension-, Datei- und Dokumentationsvertrag

**Kernaussage:** Sprachidentität und Strukturmodell werden erst dann ein Core-Feature, wenn ihr öffentlicher Vertrag für Extensions und Dateidaten klar ist.

**Punkte:**

- Direkte DB-Abfragen, Extbase, DataProcessors und PageRepository-Pfade tragen heutige Annahmen unterschiedlich weiter.
- BCP 47 wurde mit übersetzten Dateimetadaten und Cross-Site-Nutzung verbunden.
- XLIFF- und Datei-Import/Export-Prozesse wurden jedoch nicht als vollständiges Zielmodell entworfen.
- Benötigt werden versionierte Semantik, Upgrade-Anleitung, Extension-Inventar und charakterisierende Beispiele.

**Visualisierung:**

```text
Core contract
 ├─ DB/TCA/DataHandler
 ├─ Extbase/DataProcessors
 ├─ files + XLIFF
 └─ extension migration docs
```

**Quellen:** `MeetingMinutes/Weekly/2023/12/2023-12-15.md:111-181,308-342`; `MeetingMinutes/Weekly/2024/05/2024-05-10.md:66-68`; `MeetingMinutes/Weekly/2025/01/2025-01-24.md:55-60`; `MeetingMinutes/Weekly/2026/07/10.md:50-54`

**Slide-Status:** `Open`

**Session-Priorität:** `Optional`

### Backup Slide B8

**Titel:** Status-Ledger: Was ist wirklich belegt?

**Kernaussage:** Merged Fixes, laufende Charakterisierung und Architekturvision sind drei verschiedene Evidenzklassen.

**Punkte:**

- Merged: Copy-Filtering `#92580`, IRRE-Kinder `#88837`, Mount-Point-Fix `#94831`.
- In Progress: `-1`-Inventar/Marker `#92267`, Workspace-/Producer-Tests und mehrere begrenzte Sprach-Fixes.
- Vision/PoC: Editing Language, automatische strukturelle Partner und ein verstecktes Gerüst.
- Nicht belegt: fertige Zielarchitektur, vollständige Migration, BCP-47-Rollout oder Free-Mode-Deprecation.

**Visualisierung:**

```text
CURRENT/MERGED      IN PROGRESS           VISION / OPEN
small fixes         inventory + tests     identity + structure + migration
```

**Quellen:** `MeetingMinutes/Weekly/2026/01/09.md:65-77`; `MeetingMinutes/Weekly/2026/02/13.md:19-35`; `MeetingMinutes/Weekly/2026/04/24.md:23-53`; `MeetingMinutes/Weekly/2026/05/08.md:40-68`; `MeetingMinutes/Weekly/2026/07/24.md:17-35`

**Slide-Status:** `Current`

**Session-Priorität:** `Too Detailed`
