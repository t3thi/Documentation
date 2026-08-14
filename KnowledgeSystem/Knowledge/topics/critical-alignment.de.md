---
id: topic:critical-alignment
title: "Kritische Ausrichtung und offene Entscheidungen"
language: de
updated: "2026-08-11"
knowledge:
  - K-000001
  - K-000003
  - K-000007
  - K-000009
  - K-000010
  - K-000011
  - K-000012
  - K-000013
  - K-000014
  - K-000016
  - K-000017
  - K-000018
  - K-000019
  - K-000020
  - K-000021
  - K-000027
history: []
decisions: []
translation_of: topic:critical-alignment
source_updated: "2026-08-11"
translation_reviewed_at: "2026-08-11"
source_digest: "sha256:89915519275331d65d5a24d6f71d64fcf6a1d13eeb21c923572b4431851a9311"
---

# Kritische Ausrichtung und offene Entscheidungen

## Aktuelle Synthese

## Kritische Ausrichtung an der Vision

Die Vision ist ein Bewertungsrahmen und kein Grund, jede Teillösung abzulehnen.

| Änderung oder Ansatz | Innerhalb des Geltungsbereichs gelöstes Problem | Bewertung anhand der vier Verantwortlichkeiten |
|---|---|---|
| [Eigene `colPos`- und `CType`-Werte für Connected Translations deaktivieren](https://review.typo3.org/c/Packages/TYPO3.CMS/+/85978), für TYPO3 v13 (`main` zum Merge-Zeitpunkt) gemergt; es ist keine weitere Release-Linie genannt | Schützt strukturelle Konsistenz für verbundene Inhalte und Container. | Für verbundene Strukturen sinnvoll. Die Änderung entfernte zugleich einen Workaround, mit dem lokale Abwesenheit ausgedrückt wurde. Dies zeigt, weshalb Structural Identity und Output Policy jeweils einen eigenen expliziten Mechanismus benötigen. |
| [Fallback Chains beim Record Overlay berücksichtigen](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83169), für TYPO3 v14 (`main` zum Merge-Zeitpunkt) gemergt, und der gemergte [Backport für TYPO3 v13 LTS (`13.4`)](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88828); der [Fix zur Strict-Regression](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94510) ist für TYPO3 v15 (aktuelles `main`) offen, während die genannten Backport-Changes für TYPO3 v14 LTS (`14.3`) und TYPO3 v13 LTS (`13.4`) noch nicht existieren | Korrigierte reales Fallback-Verhalten, machte aber zugleich eine Regression sichtbar, wenn ein Datensatz in der angeforderten Sprache unter `strict` verborgen ist. | Mit der Vision vereinbar, wenn die Änderung auf den Fallback-Modus beschränkt bleibt. Der aktive Fix bestätigt, dass sich `strict` nicht implizit wie Fallback verhalten darf; sein aktuelles Patch Set besitzt CI `-1` und einen ungelösten Kommentar und ist nicht gemergt. |
| Korrekturen am Vergleich in Free Mode und Mixed Mode | Machen unabhängige und verbundene Inhalte im aktuellen Modul „Layout“ sichtbar und richten sie aus. | Wertvolle Arbeit an der aktuellen UX. Sie erhält valide Unabhängigkeit und verdeutlicht zugleich strukturelle Beziehungen; sie muss nicht auf ein neues Datenmodell warten. |
| MM-Kontext-Vorschlag | Reduziert Mehrdeutigkeit von Beziehungen über Sprachen und Workspaces hinweg. | Ein sinnvolles vorbereitendes Modell, sofern Migration sowie Extbase- und DataHandler-Verhalten konsistent bleiben. Es darf nicht mit der abschließenden semantischen Identität gleichgesetzt werden. |
| Explizite Synchronisierung für alle Sprachen | Ersetzt eine gemeinsame `-1`-Datenbankzeile durch konkrete zielsprachliche Datensätze, deren für die Parität relevante Felder vollständig erzwungen bleiben. | Grundsätzlich klar an der Vision ausgerichtet. Die erste Stufe sollte das Verhalten des vollständigen Datensatzes ohne redaktionelle Abwahlmöglichkeit bewahren; Granularität folgt später. Der Ansatz wird unsicher, wenn Zielanlage, Lebenszyklus, Herkunft, Konflikte und Migration nicht definiert sind. |
| Multi-Select der Zielsprachen | Beschränkt denselben Prozess zur Synchronisierung des vollständigen Datensatzes auf ausgewählte Zielsprachen. | Eine naheliegende Erweiterung nach der Parität, aber kein verbindlich festgelegtes nächstes Feature. Sie bleibt ausgerichtet, wenn Zielidentität und Semantik bei Abwahl explizit sind. |
| Feldbezogenes `enforceLanguageSynchronization` | Könnte `l10n_mode=exclude` ersetzen und dabei konfigurationsseitig erzwungene Synchronisierung erhalten. | An expliziter Synchronization Intent ausgerichtet, wenn erzwungene und redaktionell auswählbare Zustände unterscheidbar bleiben. Der aktuelle Core verwendet bereits eine gemeinsame Ausführungspipeline; der Gewinn läge in der Konsolidierung von Konfiguration, Zustandsermittlung und Scopes. Migration und Kompatibilität sind nicht entschieden. |
| Arbeitsablauf ohne redaktionelle Moduswahl | Entfernt die Notwendigkeit, Free Mode, Connected Mode oder Mixed Mode zu wählen, wenn die tatsächliche Absicht darin besteht, in einer Sprache zu arbeiten. | Als Produktanforderung klar ausgerichtet, sobald der Core die Identität pflegt und lokale strukturelle Freiheit bewahrt. Die heutigen Steuerelemente dürfen nicht entfernt werden, bevor Migration und Lebenszyklus abgesichert sind. |
| Vollständige Language Layers mit universellen Shadows | Vervollständigen die Struktur jeder Sprache. | Decken lokale Struktur ab, sind derzeit jedoch nicht bevorzugt, weil sie Datensätze, Synchronisierung, Workspace-Versionen und Informationsdichte im Modul „Layout“ verstärken können. Die Kosten sind noch nicht quantifiziert; die Bewertung ist daher keine Ablehnung aufgrund gemessener Performance. |
| Gemeinsame verborgene Strukturebene | Gibt jeder realen Sprache denselben sprachneutralen strukturellen Bezugspunkt. | Die aktuelle strukturelle Präferenz, weil sie universelle Shadows vermeidet und sichtbare Inhalte von struktureller Führung trennt. Sie bleibt eine nicht ausgewählte Hypothese, bis lokale Sortierung, Berechtigungen, Workspaces, Referenzen, Migration und redaktionelle Unsichtbarkeit validiert wurden. |

Bei jedem neuen Vorschlag stellt die Initiative folgende Fragen:

1. Welches beobachtete Problem löst er?
2. Welche Verantwortung betrifft er?
3. Hält er diese Verantwortung von den anderen getrennt?
4. Führt er einen neuen Sonderwert, impliziten Zustand oder unumkehrbaren Übergang ein?
5. Ist die klar abgegrenzte Verbesserung für sich genommen nützlich?
6. Erhält er einen glaubwürdigen Entwicklungspfad zu klarerer Semantik?

## Offene Entscheidungen

### Language Identity

- **Entscheidung erforderlich:** maßgebliche semantische Identität und ihre Darstellung in Datenbank und API.
- **Entscheidung erforderlich:** Zuordnungs- und Migrationsregeln für heutige IDs der Site Languages und Locales.
- **Offene Frage:** ob interne numerische Schlüssel erhalten bleiben und, falls ja, welche Ebenen sie sehen dürfen.

### Synchronization Intent

- **Entscheidung erforderlich:** der Vertrag für datensatzweite Synchronisierung und das Modell zur Auswahl der Ziele.
- **Entscheidung erforderlich:** der genaue Paritätsvertrag der ersten Stufe: alle Zielsprachen, jedes verhaltensrelevante Feld erzwungen und ausschließlich Felder für Zielidentität oder vom Core verwalteten Lebenszyklus ausgenommen.
- **Offene Frage:** wie der Ziel-Geltungsbereich für Shared Storage aufgelöst, wie vorhandene Zielrecords abgeglichen und wie die Anlage mehrerer Ziele atomar und idempotent ausgeführt wird.
- **Möglicher Ansatz:** Nach der Boolean-Parität denselben Prozess für ein datensatzweites Multi-Select der Synchronisierungs-Zielsprachen wiederverwenden und innerhalb jedes gewählten Ziels weiterhin alle für die Parität relevanten Felder erzwingen.
- **Entscheidung erforderlich:** ob und wann das Multi-Select eingeführt wird und in welchem Site-, Storage- oder semantischen Sprach-Geltungsbereich es arbeitet.
- **Offene Frage:** die stabile Identität im Multi-Select sowie das Verhalten zum Lösen, Deaktivieren, Löschen oder Wiederherstellen, wenn eine Zielsprache entfernt wird.
- **Offene Frage:** ob `enforceLanguageSynchronization` das konfigurationsseitig erzwungene Gegenstück zu `allowLanguageSynchronization` werden und `l10n_mode=exclude` über `l10n_state` ersetzen soll.
- **Offene Frage:** genauer erzwungener Zustand, redaktionelle Darstellung sowie Migration von `exclude`, `prefixLangTitle`, Standardverhalten und Extension-TCA.
- **Offene Frage:** Verhalten bei Aktivierung, Überschreiben, Herkunft, Loslösung, Deaktivierung, Löschung, Wiederherstellung und neuen Sprachen.
- **Offene Frage:** Zusammenspiel mit Feldsynchronisierung, Beziehungen, Workspaces und Berechtigungen.

### Structural Identity

- **Aktuelle Richtung:** Eine gemeinsame verborgene, sprachneutrale Strukturebene vor vollständigen Language-Layer-Shadows untersuchen; diese Präferenz ist keine beschlossene Core-Architektur.
- **Entscheidung erforderlich:** die genaue Repräsentation und Zuständigkeit der logischen Struktur, wenn keine reale Ausgabesprache privilegiert ist.
- **Offene Frage:** ob die bevorzugte gemeinsame Struktur, vollständige Ebenen, ein begrenzter hybrider Ansatz oder ein verbesserter Sparse-Ansatz die Akzeptanzfälle nach Prototyp und Messung am besten erfüllt.
- **Offene Frage:** Lebenszyklus und Sichtbarkeit von Language-Layer-Shadows, Structural Shadows, Platzhaltern oder ausschließlich strukturellen Datensätzen.
- **Entscheidung erforderlich:** Voraussetzungen und Migrationsregeln für die Entfernung von Free Mode, Connected Mode und Mixed Mode aus der normalen redaktionellen Oberfläche bei Erhalt vorhandener unabhängiger Ergebnisse.
- **Offene Frage:** der sprachspezifische Vertrag für Platzierung, Sortierung und Abwesenheit um eine gemeinsame Structural Identity.
- **Offene Frage:** ein konsistentes Modell für Seiten, Inhalte und andere Datensätze, ohne deren notwendige Unterschiede zu ignorieren.

### Output Policy

- **Entscheidung erforderlich:** die Produktsemantik fehlender, deaktivierter und bewusst abwesender Varianten.
- **Offene Frage:** optionales abschließendes Default-Verhalten im normalen Fallback bei gleichzeitiger Bewahrung der Strict-Semantik.
- **Offene Frage:** konsistente Auswertung über Core-Rendering, Extbase und eigene Abfragen hinweg.

### Übergreifend

- **Entscheidung erforderlich:** akzeptables Verhältnis zwischen explizit gespeicherten Daten und Komplexität in Code und Laufzeit.
- **Offene Frage:** messbare Auswirkungen auf Anzahl der Abfragen, Write Amplification, Datensatzmenge, Reference Index, Workspaces und Nutzbarkeit des Backends.
- **Entscheidung erforderlich:** Strategie für Kompatibilität, Migration, Deprecation und Extension-APIs.
- **Entscheidung erforderlich:** Zuständigkeit und Priorisierung gemeinsam mit den zuständigen TYPO3-Core- und Produktstrukturen.
