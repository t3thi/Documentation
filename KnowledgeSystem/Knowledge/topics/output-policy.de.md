---
id: topic:output-policy
title: "Output Policy"
language: de
updated: "2026-10-30"
knowledge:
  - K-000013
  - K-000014
  - K-000020
  - K-000033
history:
  - K-000024
  - K-000025
decisions:
  - D-000003
translation_of: topic:output-policy
source_updated: "2026-10-30"
translation_reviewed_at: "2026-08-14"
source_digest: "sha256:c9532b92cd7d48530c2fa06d41d4c003185c18a1a899997148ecaf6ecce28e06"
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

**Nicht validierter Ansatz:** Explizite Sichtbarkeitsschreibvorgänge könnten
die Strict/Free-Unterscheidung ersetzen: ohne Chain konkrete Datensätze der
angeforderten Sprache unabhängig von der Sichtbarkeit des Default-Language-Parents
auswählen; mit Chain Fallback weiter zur Laufzeit auswerten statt vollständige
Fallback-Kopien anzulegen. Die Chain könnte `fallbackType` ersetzen. Eine
fehlende verbundene Übersetzung würde Fallback erlauben, eine bewusst
deaktivierte ihn stoppen und deren Löschung ihn wieder erlauben. Der
Demonstrator schreibt bereits bestehende `hidden`-Felder. Das Meeting lehnte
ein weiteres Override-Feld ab und wählte eine bewusste Kontextmenüaktion ohne
redundantes Label. Bulk-Schreibvorgänge stellen frühere gemischte Zustände
nicht wieder her. Diese begrenzte Prototypvereinbarung, als vorgeschlagener
Decision Record erfasst, übernimmt weder das Gesamtmodell noch belegt sie
Verhaltensgleichheit oder eine v15-Zusage; gleichwertige API-Unterstützung
und Kompatibilität bleiben zu validieren.

Das akzeptierte Versprechen von Strict, nur die angeforderte Sprache
auszugeben, bleibt bestehen. Das Entfernen eines Auswahlfelds darf weder eine
bisher inaktive gespeicherte Chain unbemerkt aktivieren noch erhaltene
Konfiguration zerstören oder regionale Wiederverwendung ohne unerwünschte
abschließende Default Language verlieren. Migration, lokale Abwesenheit,
Berechtigungen, Workspaces und konsistente Abfragen müssen validiert werden,
bevor dieser Vorschlag einen aktuellen Modus ersetzen kann.

Die statische Prüfung vom 30.10.2026 bestätigt Kontextmenü und Label-Entfall,
nicht die vollständige Laufzeitparität.

Eine versteckte Übersetzung kann noch in Bearbeitung sein, während der bisherige
Fallback sichtbar bleiben soll. `hidden` pauschal als Stoppsignal zu behandeln,
würde diesen Ablauf brechen. Bewusste Auslassung und unfertige Übersetzung
brauchen unterscheidbare Semantik; ein neuer Zustand, ein Unterdrückungsfeld
oder eine ausschließliche Workspace-Lösung sind nicht ausgewählt. Dies begrenzt
den vorläufigen Ansatz, ohne ihn zu beschließen oder zu verwerfen.

**Offene Fragen:**

- Welcher Zustand beendet Fallback für eine einzelne Position?
- Wie unterscheidet sich ein bewusstes Stoppsignal von einer noch unfertigen versteckten Übersetzung?
- Sollte normaler Fallback einen optionalen abschließenden Default-Schritt anbieten, während `strict` auf eine Sprache beschränkt bleibt?
- In welchem Geltungsbereich darf die Ausgabeabsicht konfiguriert werden: Site Language, Seite, Strukturposition, Datensatz oder Feld?
- Wie wird ein konsistentes Verhalten für Seiten, Inhalte, Extbase und eigene Abfragen sichergestellt?
