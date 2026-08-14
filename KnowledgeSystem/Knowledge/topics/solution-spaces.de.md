---
id: topic:solution-spaces
title: "Mögliche Lösungsräume"
language: de
updated: "2026-08-11"
knowledge:
  - K-000003
  - K-000005
  - K-000007
  - K-000009
  - K-000011
  - K-000012
  - K-000014
  - K-000016
  - K-000018
history: []
decisions: []
translation_of: topic:solution-spaces
source_updated: "2026-08-11"
translation_reviewed_at: "2026-08-14"
source_digest: "sha256:9d9b0568e914084110d4c831623e7593a1b6be9fd97de8101b38f211bee2c0df"
---

# Mögliche Lösungsräume

## Aktuelle Synthese

## Mögliche Lösungsräume

Die folgenden Ansätze beantworten Teile der Verantwortlichkeiten. Keiner von ihnen bildet allein die vollständige Vision ab.

| Anforderung oder Frage | Möglicher Ansatz | Erwarteter Nutzen | Trade-offs und offene Punkte | Aktuelle Bewertung |
|---|---|---|---|---|
| Stabile semantische Sprachidentität | Tags gemäß BCP 47 und eine explizite Zuordnung zu Site Languages verwenden. | Site-übergreifende Bedeutung, klarerer gemeinsamer Speicher und Austausch. | Legacy-Zuordnung, Tag-Richtlinie, Datenbank- und API-Kompatibilität sowie mögliche interne Schlüssel. | **Aktuelle Richtung; Speicherentscheidung offen.** |
| `-1`-Verhalten ersetzen | Ein Flag für alle Ziele einführen, das fehlende verbundene Zielrecords anlegt und jedes für die Parität relevante Feld über `l10n_state` oder einen gleichwertigen Zustand erzwingt. | Reproduziert zunächst das Verhalten des vollständigen Datensatzes, entfernt Verhalten aus dem Sprachfeld und verwendet die Zielanlage und Synchronisierung des DataHandlers wieder. | Geltungsbereich von Führung und Zielen, genaue erzwungene Feldmenge, vorhandene Ziele, Atomarität, Herkunft, Workspaces, Beziehungen und Migration. | **Klare Richtung; Wiederverwendungspfad plausibel, aber nicht validiert; Konzeption unvollständig.** |
| Synchronisierungsziele auswählen | Den Boolean für alle Ziele zu einem datensatzweiten Multi-Select der Zielsprachen weiterentwickeln und dabei denselben Prozess für Zielanlage und Synchronisierung des vollständigen Datensatzes wiederverwenden. | Ergänzt granulare Zielsprachen, ohne eine getrennte Synchronisierungsengine zu erfordern. | Stabile Zielidentität, Berechtigungen, Konflikte mit vorhandenen Zielen und Lebenszyklus beim Auswählen oder Entfernen einer Sprache. | **Mögliches Feature; Entscheidung und Lebenszyklus offen.** |
| Konfiguration der Feldsynchronisierung vereinheitlichen | `config.behaviour.enforceLanguageSynchronization` ergänzen, den erzwungenen Feldzustand über `l10n_state` darstellen und die Ersetzung von `l10n_mode=exclude` prüfen. | Ein TCA- und Zustandsmodell für redaktionell auswählbare und konfigurationsseitig erzwungene Feldsynchronisierung; weniger überlappende Auswahlpfade im Core. | Genauer Zustandswert, redaktionelle Darstellung, Migration, `prefixLangTitle`, Standardverhalten und Extension-Kompatibilität. | **Möglicher Ansatz; weder implementiert noch ausgewählt.** |
| Aktuelle Sparse Records erhalten | Aktuelle Datensätze und Beziehungen beibehalten, aber APIs, Tests und UX präzisieren. | Geringste Migrations- und Datenmengenkosten. | Behält Zustände fehlender Datensätze, Overlay-Verzweigungen und Kopplung an die Default Language bei. | **Aktuelle Ausgangsbasis, nicht für jede Anforderung ausreichend.** |
| Redaktionell sichtbare Übersetzungsmodi entfernen | Redakteurinnen und Redakteure Inhalte in der ausgewählten Sprache anlegen, auslassen, ersetzen und umsortieren lassen, während der Core die Structural Identity pflegt. | Der Arbeitsablauf drückt redaktionelle Absicht aus, statt Kenntnisse über `l18n_parent` und den abgeleiteten Seitenmodus zu verlangen. | Hängt von sicherer automatischer Strukturanlage, Legacy-Migration, Berechtigungen, Lebenszyklus, Workspaces und einer klaren Repräsentation unabhängiger Ergebnisse ab. | **Produktempfehlung; Voraussetzungen und UX-Vertrag offen.** |
| Vollständige Language Layers | Jede strukturelle Position in jeder relevanten Sprache materialisieren und bei fehlendem Inhalt Language-Layer-Shadows verwenden. | Jede Sprache ist strukturell eigenständig vollständig und kann eine lokale Sortierung tragen. | Höchstes Duplizierungsrisiko; Synchronisierung, Informationsdichte im Modul „Layout“, Workspace-Versionen, Referenzen, Migration und der tatsächliche Datensatzmultiplikator müssen gemessen werden. | **Diskutierte Richtung; derzeit nicht bevorzugt und nicht ausgewählt.** |
| Gemeinsame verborgene neutrale Strukturebene | Gemeinsame Structural Identity von realen Ausgabesprachen trennen, heutige Default-Ausgabeinhalte in eine eigene reale Sprachebene migrieren und inhaltslose Structural Shadows als gemeinsame Anker anlegen. | Keine reale Sprache muss die strukturelle Führung übernehmen; weniger universelle Shadow-Duplikation und ein sprachübergreifender Bezugspunkt. | Führt eine Abstraktion ein, die jeder Bearbeitungs-, Abfrage-, Beziehungs-, Berechtigungs- und Workspace-Pfad verstehen muss; lokale Sortierung und explizite Abwesenheit benötigen weiterhin einen Vertrag. | **Aktuelle Präferenz für die Untersuchung; weiterhin eine nicht ausgewählte Hypothese.** |
| Begrenzter hybrider Ansatz | Eine gemeinsame Structural Identity beibehalten und Sprachdatensätze nur materialisieren, wenn Inhalte oder explizite Abwesenheit sie erfordern. | Könnte explizite Struktur mit begrenztem Datenwachstum verbinden. | Mehr Zustände und Übergangsregeln; analytische Option, die von der Initiative noch nicht validiert wurde. | **Analytische Option; keine eigenständige Präferenz der Initiative.** |
| Editing Language | Redakteurinnen und Redakteure die Inhaltssprache auswählen lassen, von der aus sie arbeiten, und diese als primären Backend-Kontext verwenden. | Entfernt irrelevante Default-Language-Texte aus dem Arbeitsablauf und unterstützt Quellen, die nicht der Default Language entsprechen. | Page Tree, Module „Layout“ und „Records“, Berechtigungen, Sortierung sowie Verhalten von Quelle und Herkunft. | **Bevorzugte Produktbeschreibung; Prototyp weiterhin erforderlich.** |
| Explizite Absicht bei Abwesenheit | Darstellen, ob Fallback für eine strukturelle Position fortgesetzt oder beendet werden soll. | Macht regionale Auslassung vorhersehbar. | Abwärtskompatibilität, UX und konsistente Frontend-Auswertung. | **Abgeleitete Anforderung; Repräsentation offen.** |

Ein generisches multidimensionales Modell für Sprache, Land, Markt, Marke oder Zielgruppe ist eine angrenzende Zukunftsperspektive. Es könnte später helfen, Sprache von anderen Inhaltskontexten zu trennen, ist aber nicht die unmittelbare Antwort der Initiative auf die vier Verantwortlichkeiten.
