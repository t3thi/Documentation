---
id: topic:output-policy
title: "Output Policy"
language: de
updated: "2026-10-10"
knowledge:
  - K-000013
  - K-000014
  - K-000020
  - K-000033
history:
  - K-000024
  - K-000025
decisions: []
translation_of: topic:output-policy
source_updated: "2026-10-10"
translation_reviewed_at: "2026-08-14"
source_digest: "sha256:4f1feec6807c4d3cbd3a560b85af8152a2966f8a83a4eb7c379eeb86ac11fb39"
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

**Nicht validierter Ansatz:** André schlug explizite Aktivierungs- und
Deaktivierungsoperationen für eine oder alle Sprachen vor, die bestehende
`hidden`-Werte schreiben, mit gleichwertiger API-Unterstützung. Ohne Fallback
Chain würde die Ausgabe konkrete Datensätze der angeforderten Sprache
unabhängig von der Sichtbarkeit des Default-Language-Parents auswählen.
Mit konfigurierter Chain würde Fallback weiterhin zur Laufzeit ausgewertet.
Das Vorhandensein der Chain könnte `fallbackType` ersetzen: Eine fehlende
Übersetzung zu verbundenen Inhalten würde Fallback erlauben, eine vorhandene bewusst deaktivierte
würde ihn blockieren; ihr Löschen würde Fallback wieder erlauben. Vollständige
Fallback-Kopien oder ein neues gespeichertes Disable-All-Flag sind dafür nicht
vorgesehen. Die Diskussion vom 09.10.2026 belegte weder ein gemeinsames
Verständnis noch Verhaltensgleichheit oder eine v15-Zusage. Dies ist keine
übernommene Architektur und kein geändertes Core-Verhalten.

Das akzeptierte Versprechen von Strict, nur die angeforderte Sprache
auszugeben, bleibt bestehen. Das Entfernen eines Auswahlfelds darf weder eine
bisher inaktive gespeicherte Chain unbemerkt aktivieren noch erhaltene
Konfiguration zerstören oder regionale Wiederverwendung ohne unerwünschte
abschließende Default Language verlieren. Migration, lokale Abwesenheit,
Berechtigungen, Workspaces und konsistente Abfragen müssen validiert werden,
bevor dieser Vorschlag einen aktuellen Modus ersetzen kann.

**Offene Fragen:**

- Welcher Zustand beendet Fallback für eine einzelne Position?
- Ist eine deaktivierte Übersetzung ein geeignetes Stoppsignal, oder ist eine separate Absicht erforderlich?
- Sollte normaler Fallback einen optionalen abschließenden Default-Schritt anbieten, während `strict` auf eine Sprache beschränkt bleibt?
- In welchem Geltungsbereich darf die Ausgabeabsicht konfiguriert werden: Site Language, Seite, Strukturposition, Datensatz oder Feld?
- Wie wird ein konsistentes Verhalten für Seiten, Inhalte, Extbase und eigene Abfragen sichergestellt?
