---
id: topic:output-policy
title: "Output Policy"
language: de
updated: "2026-08-11"
knowledge:
  - K-000013
  - K-000014
  - K-000020
history:
  - K-000024
  - K-000025
decisions: []
translation_of: topic:output-policy
source_updated: "2026-08-11"
translation_reviewed_at: "2026-08-14"
source_digest: "sha256:fd6bcc0310dc7368eb2940dbe3a8ac86b670a6682239e9fd042e9a56a6f24689"
---

# Output Policy

## Aktuelle Synthese

### 4. Output Policy

**Frage:** Was soll ausgegeben werden, wenn die angeforderte Sprachvariante an einer Inhaltsposition nicht verfügbar ist?

**Aktuelle Kopplung:** Die Site-Konfiguration definiert das Verhalten `strict`, `fallback` und `free` sowie Fallback-IDs. Ein fehlender oder deaktivierter übersetzter Datensatz kann dennoch zur Ausgabe von Inhalten aus einer anderen Sprache führen. Strukturelle Beziehung und redaktionelle Absicht reichen nicht aus, um zu erklären, weshalb ein bestimmter Datensatz ausgegeben wurde.

**Abgeleitete Anforderungen:**

- Strict-Verhalten muss von Fallback-Verhalten getrennt bleiben.
- Eine Fallback Chain muss ihre zulässige Reihenfolge ausdrücken und angeben, ob eine abschließende Default Language vorgesehen ist.
- TYPO3 muss „noch nicht übersetzt“ von „hier bewusst nicht ausgeben“ unterscheiden, wenn das Produkt diese Unterscheidung erfordert.
- Ausgaberegeln müssen unabhängig davon verständlich sein, wie strukturelle Datensätze gespeichert werden.
- Jede Änderung an der Semantik von Abwesenheit erfordert eine Kompatibilitätsanalyse, weil bestehende Projekte vom aktuellen Fallback abhängen können.

**Vision:** Die Ausgabe sollte einer expliziten Site-weiten und, soweit erforderlich, auf einzelne Inhaltspositionen bezogenen Absicht folgen. Eine strukturelle Verbindung darf die Frontend-Fallback-Richtlinie nicht implizit bestimmen.

**Offene Fragen:**

- Welcher Zustand beendet Fallback für eine einzelne Position?
- Ist eine deaktivierte Übersetzung ein geeignetes Stoppsignal, oder ist eine separate Absicht erforderlich?
- Sollte normaler Fallback einen optionalen abschließenden Default-Schritt anbieten, während `strict` auf eine Sprache beschränkt bleibt?
- In welchem Geltungsbereich darf die Ausgabeabsicht konfiguriert werden: Site Language, Seite, Strukturposition, Datensatz oder Feld?
- Wie wird ein konsistentes Verhalten für Seiten, Inhalte, Extbase und eigene Abfragen sichergestellt?
