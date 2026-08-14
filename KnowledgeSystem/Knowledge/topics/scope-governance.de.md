---
id: topic:scope-governance
title: "Geltungsbereich und Governance"
language: de
updated: "2026-08-14"
knowledge:
  - K-000001
  - K-000005
  - K-000007
  - K-000008
  - K-000009
  - K-000011
  - K-000012
  - K-000017
  - K-000019
  - K-000021
  - K-000027
history: []
decisions:
  - D-000001
translation_of: topic:scope-governance
source_updated: "2026-08-14"
translation_reviewed_at: "2026-08-14"
source_digest: "sha256:3f01711a30ad6a39e91b8e0641a1162e75607c5819797c87987d70aaf1edfb9d"
---

# Geltungsbereich und Governance

## Aktuelle Synthese

# Translation Handling Initiative: Aktueller Stand

[Englische Fassung](https://notes.typo3.org/s/RhkYPguwb) · [Übersicht der Sitzungsprotokolle](https://notes.typo3.org/s/f3ae8fZSD) · [Hinweise zur Pflege dieses Dokuments](https://github.com/t3thi/Documentation/blob/main/MeetingMinutes/current-state-maintenance.md)

Dies ist die deutsche Fassung der kanonischen Beschreibung des aktuellen Verständnisses, der Vision und der Arbeit der Translation Handling Initiative. Sie erläutert, warum die Initiative am Translation Handling arbeitet, welche Erkenntnisse ihre Forschung erbracht hat, welche Richtung sie derzeit verfolgt, welche Ansätze sie untersucht und welche Entscheidungen weiterhin offen sind.

Das Dokument ist keine Chronologie der Sitzungen, keine Patch-Liste, kein eigenständiger Backlog und keine beschlossene TYPO3-Core-Roadmap. Historische Diskussionen bleiben in den Sitzungsprotokollen erhalten. Dieses Dokument wird aktualisiert, wenn sich der aktuelle Stand ändert.

## Geltungsbereich und Lesehinweise

Das [TYPO3 Localization Team](https://typo3.community/contribute/teams-committees/localization) pflegt die Infrastruktur und die Dienste für die Übersetzung statischer TYPO3-Labels für Backend und Frontend. Die Ausgangstexte liegen üblicherweise als XLIFF-Dateien im Dateisystem des Core oder von Extensions; Übersetzungen werden über [Crowdin](https://crowdin.com/) gepflegt, und die [Crowdin Bridge](https://github.com/TYPO3/crowdin-bridge) exportiert sie auf den Translation Server, von dem TYPO3-Instanzen sie als Language Packs abrufen.

Die Translation Handling Initiative arbeitet dagegen an redaktionell gepflegten Datenbankdatensätzen wie Seiten, Inhaltselementen, Dateimetadaten und Extension-Datensätzen. Ihr Tätigkeitsfeld umfasst die Sprachidentität dieser Inhalte, ihre Synchronisierung und strukturellen Beziehungen, den Editing Workflow und die Frontend-Ausgabe. Die Pflege von statischen Label-Übersetzungen, Crowdin-Projekten und der Language-Pack-Infrastruktur gehört nicht zu ihrer primären Verantwortung.

Für Aussagen gelten folgende Unterscheidungen:

| Begriff | Bedeutung in diesem Dokument |
|---|---|
| **Verifiziertes aktuelles Verhalten** | Reproduziertes Verhalten oder Verhalten, das durch aktuellen Core-Code belegt ist. |
| **Gesicherte Erkenntnis** | Eine Schlussfolgerung, die durch die Forschung und Use Cases der Initiative gestützt wird. |
| **Abgeleitete Anforderung** | Eine Fähigkeit, die sich aus einem belegten Problem oder einer gesicherten Erkenntnis ergibt. |
| **Vision** | Eine angestrebte Produkt- oder semantische Eigenschaft, unabhängig von einer bestimmten Implementierung. |
| **Aktuelle Richtung** | Ein Ansatz, den die Initiative derzeit für vielversprechend hält. Er ist keine beschlossene Core-Architektur. |
| **Möglicher Ansatz** | Eine technische oder produktbezogene Option, die noch validiert oder ausgewählt werden muss. |
| **Laufende Arbeit** | Eine aktive Untersuchung, ein Issue, Patch, Review oder Prototyp. |
| **Umgesetzt** | Ein konkretes Ergebnis, das gemergt oder auf andere Weise abgeschlossen wurde. |
| **Offene Frage** | Weitere Forschung, Konzeption oder Validierung ist erforderlich. |
| **Entscheidung erforderlich** | Die Initiative kann Evidenz und Empfehlungen vorbereiten, aber eine weitergehende Produkt-, Architektur- oder Core-Entscheidung ist notwendig. |

### Aktueller Überblick

- TYPO3 unterstützt bereits komplexe mehrsprachige Sites und funktioniert gut für Übersetzungen, deren Struktur gleich bleibt.
- Wichtige Anforderungen bleiben offen, wenn Strukturen weitgehend gemeinsam sind, aber einzelne sprachspezifische Ergänzungen oder Auslassungen enthalten, wenn Datensätze von mehreren Sites gemeinsam verwendet werden oder wenn Fallback mehr ausdrücken muss als „verwende den nächsten verfügbaren Datensatz“.
- Die Initiative beschreibt das Problem inzwischen anhand von vier getrennten Verantwortlichkeiten: **Language Identity**, **Synchronization Intent**, **Structural Identity** und **Output Policy**.
- Die Vision besteht darin, jede Verantwortung explizit zu machen, bevor über ihre Speicherung oder Implementierung entschieden wird.
- BCP 47 ist die aktuelle Präferenz für eine semantische Sprachidentität. Die vollständige Ablösung des heutigen `sys_language_uid`-Vertrags hängt außerdem davon ab, dessen nichtsprachliches `-1`-Synchronisierungsverhalten sowie die mit `0` gekoppelten Rollen als Default Language und strukturelle Führung getrennt zu modellieren; diese Ersatzverträge bleiben offen.
- Gespeichertes `sys_language_uid = -1` durch explizite Synchronisierung zu ersetzen, ist eine klare Richtung. Der Lebenszyklus dieser Synchronisierung ist noch nicht konzipiert.
- Eine Struktur, die „mostly connected, selectively different“ unterstützt, ist eine zentrale Produktanforderung. Redakteurinnen und Redakteure sollen in der benötigten Sprache arbeiten können, ohne Free Mode, Connected Mode oder Mixed Mode als Zustände von Datenbankbeziehungen auswählen oder verstehen zu müssen.
- Die derzeitige strukturelle Präferenz ist eine gemeinsame verborgene, sprachneutrale Strukturebene statt vollständiger Language Layers mit universellen Shadows. Dies ist eine Präferenz für die weitere Untersuchung und keine beschlossene Core-Architektur; die verborgene Ebene bleibt eine Hypothese, die einen Prototyp und eine Konzeption ihres Lebenszyklus benötigt.
- Die aktuelle Umsetzung erfolgt inkrementell: bestehendes Verhalten charakterisieren, klar abgegrenzte Korrekturen mergen, unsichere Konzepte prototypisch untersuchen und die daraus gewonnene Evidenz für weitergehende Entscheidungen nutzen.

## Arbeitsweise der Initiative

Die Initiative verbindet vier Arbeitsformen:

| Aktivität | Zweck |
|---|---|
| **Research** | Reale Projekt- und Redaktions-Use-Cases sammeln, Core-Verhalten reproduzieren, Ursachen identifizieren und Fakten von Annahmen unterscheiden. |
| **Vision Development** | Erkenntnisse in eine kohärente Beschreibung der Verantwortlichkeiten und Fähigkeiten überführen, die TYPO3 bereitstellen sollte. |
| **Incremental Improvement** | Klar abgegrenzte Verbesserungen umsetzen, wenn sie ein reales Problem lösen, zur Vision passen und keine unnötigen zukünftigen Einschränkungen erzeugen. |
| **Critical Alignment** | Arbeiten der Initiative und parallele Core-Vorschläge anhand derselben Verantwortlichkeiten, Trade-offs und Kompatibilitätsanforderungen bewerten. |

Diese Aktivitäten ergänzen einander. Forschung ohne Umsetzung ließe bekannte Probleme ungelöst. Isolierte Korrekturen ohne ein übergreifendes Modell könnten weitere Sonderfälle schaffen. Die Vision leitet deshalb die heutige Arbeit, ohne dass jeder sinnvolle Patch bereits die vollständige langfristige Richtung umsetzen muss.

### Entscheidungsgrenze

Die Initiative kann Probleme identifizieren, Anforderungen ableiten, Core-Verhalten untersuchen, Prototypen erstellen, Korrekturen implementieren und Empfehlungen formulieren. Sie beansprucht keine alleinige Entscheidungshoheit über die TYPO3-Produktstrategie, die zukünftige Core-Architektur oder die Migrationsstrategie.

Eine von der Initiative bevorzugte Richtung ist daher nicht automatisch eine TYPO3-Entscheidung. Weitergehende Änderungen erfordern eine Abstimmung mit dem Core Team, den zuständigen Produkt- und Architekturverantwortlichen, Extension-Autorinnen und -Autoren sowie betroffenen Anwenderinnen und Anwendern.
