---
id: topic:current-core-work
title: "Aktuelle Core-Arbeit"
language: de
updated: "2026-10-30"
knowledge:
  - K-000013
  - K-000015
  - K-000016
  - K-000022
  - K-000023
  - K-000027
  - K-000028
  - K-000029
  - K-000031
  - K-000032
  - K-000034
  - K-000035
  - K-000037
  - K-000038
  - K-000039
  - K-000040
history:
  - K-000030
  - K-000026
decisions:
  - D-000002
translation_of: topic:current-core-work
source_updated: "2026-10-30"
translation_reviewed_at: "2026-08-14"
source_digest: "sha256:61fc52739a2437127b22631bc2e78741825bfc6ec455684ab758cb973ab5225d"
---

# Aktuelle Core-Arbeit

## Aktuelle Synthese

## Was bereits erreicht wurde

Initiative und Core liefern abgegrenzte Verbesserungen für das heutige System, nicht bereits die vollständige Vision.

| Ergebnis | Ausgelieferte Release-Linien | Unmittelbare Verbesserung | Verantwortung oder Erkenntnis |
|---|---|---|---|
| [Gerrit 83632](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83632), gemergt am 26.04.2024 | 13. | Erzeugte valide Quelldaten für DataHandler-Lokalisierungstests. | Verlässliche Fixtures sind eine Voraussetzung für Verhaltensänderungen. |
| [Gerrit 84237](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84237), gemergt am 25.05.2024 | 13. | Verhinderte verwaiste übersetzte Datensätze in einem Kopiervorgang. | Strukturelle und sprachliche Validität müssen beim Kopieren erhalten bleiben. |
| [Gerrit 83310](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83310), [86085](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86085) und [85912](https://review.typo3.org/c/Packages/TYPO3.CMS/+/85912), gemergt zwischen dem 13.05.2024 und dem 07.01.2025 | 83310 und 86085: 13. 85912: 14, zusätzlich 13.4 als gemergter [Gerrit 87655](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87655). | Ergänzte gezielte Tests für das Kopieren lokalisierter Inhalte auf eine nicht übersetzte Seite, das Kopieren von Inline Child Records und das Verschieben von `-1`-Inhalten. | Die Charakterisierung hält aktuelle Einschränkungen fest, bevor Verhalten geändert wird. |
| [Gerrit 86773](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86773) und [88827](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88827), gemergt am 10.01.2025 und 05.05.2025 | 14, zusätzlich 13.4 als gemergte [Gerrit-Patches 87689](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87689) und [89297](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89297). | Synchronisierte beim Kopieren die Sprache von Inline Child Records und bewahrte beim Kopieren die Sprache von Übersetzungen. | Kopiervorgänge müssen die Sprachabsicht für Child Records und übersetzte Datensätze erhalten. |
| [Gerrit 89199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89199), gemergt am 30.04.2025 | 14, zusätzlich 13.4 als gemergter [Gerrit 89286](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89286). | Behält bei der Navigation innerhalb einer Site die ausgewählte Sprache bei, zeigt bei fehlender Übersetzung Inhalte der Default Language und setzt die Auswahl zurück, wenn eine andere Site diese Sprache nicht bereitstellt. | Verhindert, dass eine ungültige Sprachauswahl zu einem leeren Modul „Layout“ führt, und erhält zugleich den nützlichen redaktionellen Kontext, soweit dies möglich ist. |
| [Gerrit 92580](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92580), gemergt am 09.02.2026 | 14, zusätzlich 13.4 als gemergter [Gerrit 92757](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92757). | Beschränkt kopierte Datensatzübersetzungen auf Sprachen, die in der Ziel-Site verfügbar sind. | Eine klar abgegrenzte Integritätskorrektur für den aktuellen Site-lokalen Umgang mit Sprachen. |
| [Gerrit 92881](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92881), gemergt am 20.02.2026 | 14. | Trennt `localizeRecord()` von `copyRecord()` im DataHandler. | Klarere Code-Pfade unterstützen eine sicherere Charakterisierung und spätere Änderungen. |
| [Gerrit 88837](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88837), gemergt am 11.04.2026 | 14. | Vermeidet die Neuzuordnung nicht sprachfähiger IRRE-Child-Records und verwendet separat zugewiesene Datensätze für lokalisierte Parent-Records. | Ein konkreter Fall, in dem explizit synchronisierte Daten die Mehrdeutigkeit der Zuständigkeit beseitigten. |
| [Gerrit 94831](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94831), gemergt am 21.07.2026 | 15, [14.3 als Gerrit 94866](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94866) und [13.4 als Gerrit 94867](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94867) sind gemergt. | Löst übersetzte Unterseiten von Mount Points über die Default-Language-Beziehung auf und verhindert einen `404`. | Ein reales Projekt mit gemeinsamem Speicher führte zu einer kleinen, testgestützten Korrektur. |
| [Gerrit 94914](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94914), gemergt am 01.08.2026 | 15, [14.3 als Gerrit 94916](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94916) und [13.4 als Gerrit 94915](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94915) sind gemergt. | Findet vorhandene Übersetzungen über `l10n_parent`, wenn `l10n_source` leer ist. | Bewahrt die Unterscheidung zwischen strukturellem Parent und Übersetzungsquelle und verhindert zugleich Duplikate. |
| [Gerrit 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170), gemergt am 10.08.2026 | 15 und [14.3 als Gerrit 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199) sind gemergt. | Korrigiert Vergleichsansichten, die Connected- und Free-Mode-Sprachen kombinieren: Connected-Mode-Inhalte bilden Vergleichszeilen, während jede Free-Mode-Sprache unabhängig dargestellt wird, auch wenn die Default Language keine Inhalte enthält. | Eine klar abgegrenzte Zwischenkorrektur für die aktuellen Modi. Sie bestimmt weder das zukünftige Bearbeitungs- noch das Strukturmodell. |
| [Gerrit 95178](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95178), gemergt am 10.08.2026 | 15 und [14.3 als Gerrit 95202](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95202) sind gemergt. | Hält beim Scrollen durch eine lange Vergleichsansicht im Modul „Layout“ Sprachname, Flag und Übersetzungsmodus sichtbar. | Verbessert die redaktionelle Orientierung in der aktuellen Oberfläche. Der Patch ist ausdrücklich eine Zwischenlösung und ändert oder bestimmt kein zukünftiges Strukturmodell. |
| [Gerrit 95619](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95619), gemergt am 06.10.2026 | 15 und [14.3 als Gerrit 96412](https://review.typo3.org/c/Packages/TYPO3.CMS/+/96412) sind gemergt. | Benennt gespeicherte und synthetische All-Languages-Werte durch `LanguageMarker::ALL_LANGUAGES`. | Nur interne Vorbereitung der Benennung: Die `-1`-Semantik bleibt; keine Ersatz-API oder Architektur ist übernommen. |
| [Gerrit 87595](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87595), gemergt am 17.10.2026 | 15; [Gerrit 96783](https://review.typo3.org/c/Packages/TYPO3.CMS/+/96783) für 14.3 am 18.10.2026 gemergt. | Gleicht eigene Inline-/File-Kinder nach Beziehungsauflösung an die gespeicherte Parent-Sprache an. | Umfassender als der ersetzte Vorschlag 95476; umfasst vorhandene Geschwister bei relevanten Parent-Operationen, keine globale Reparatur. |
| [Gerrit 94673](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94673), gemergt am 20.10.2026 | 15; [Gerrit 96935](https://review.typo3.org/c/Packages/TYPO3.CMS/+/96935) für 14.3 gemergt. | Stellt das Kontextmenü am Seiten-Icon im Sprachvergleich wieder her. | Opt-in im Renderer, keine Prototyp-Sammelaktion oder neue Berechtigung. |
| [Gerrit 97053](https://review.typo3.org/c/Packages/TYPO3.CMS/+/97053), gemergt am 30.10.2026 | 15; [Gerrit 97225](https://review.typo3.org/c/Packages/TYPO3.CMS/+/97225) für 14.3 gemergt. | Bevorzugt Sprache `0` unabhängig von der Konfigurationsreihenfolge. | Ohne `0` bleibt der Fallback auf die erste Sprache; keine beschlossene verborgene Strukturebene. |

Die [Test-Extension der Initiative](https://github.com/t3thi/translation-handling) bietet reproduzierbare Übersetzungs-, Fallback- und Beziehungsszenarien. Sie wurde 2025 mit IRRE-Fällen wiederbelebt: Forschungsinfrastruktur, kein Beleg für geändertes Core-Verhalten.

Bevorzugtes Vorgehen: reale Fehler reproduzieren, den verantwortlichen Vertrag identifizieren, Grenzen durch Tests definieren und eng begrenzt korrigieren.

## Language-All-Marker: Geltungsbereich und Review-Grenze

[Gerrit 95619](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95619) und sein
14.3-Backport wurden am 06.10.2026 gemergt, erneut geprüft am 30.10.2026.
`LanguageMarker::ALL_LANGUAGES` ist ein interner Integer-Marker einschließlich
der geprüften TCA-Helfer und `SlugHelper`, keine Verhaltensänderung oder stabile
Extension-API. Gespeicherte Absicht, synthetische Auswahl und Fallback bleiben
verschiedene Verträge in Layout, Routing, Workspaces, Recycler, Sitemap und
LinkValidator. Konkrete Auswahl und ein Synchronisierungsersatz bleiben die
langfristige Richtung unter dem Vorbehalt der Charakterisierung; die Benennung
setzt sie weder um noch verhindert sie eine spätere Trennung. Der Decision
Record der Initiative bleibt vorgeschlagen. Die Abfragen in
`ContentObjectRenderer`, frontendseitiger `CategoryCollection` und
Extbase-`Typo3DbQueryParser` selektieren gespeicherte Datensätze, keine
synthetischen Sprachen.

Das Fallback des `LinkAnalyzer` bei fehlender Sprachinformation und
`EditableRestriction` behalten Verhalten und Abfragedarstellung. Die statische
Nachprüfung vom 30.10.2026 bestätigt: Die Sammelabfrage selektiert das Sprachfeld
ausdrücklich, `recheckLinks()` nicht. Ohne beiläufig selektierte Felder oder
Event-Erweiterung fällt `checkLinks()` auch bei einem sprachfähigen Datensatz
auf `-1` zurück. Dies bleibt eine Abdeckungsfrage, keine reproduzierte
Regression und kein geklärter Fallback-Vertrag.

Layout-TypeScript behält sein Literal mit PHP-Synchronisierungskommentar;
eine gemeinsame JavaScript-Konstante oder `isAllLanguage` bleibt Folgearbeit.
TYPO3 v15 hat die typisierte Konstante, 14.3 eine untypisierte für PHP 8.2.
Default-Language-Marker, Datensatz-/Abfrageabstraktionen und allgemeine
Kommentierungsregeln für inverse oder kontextbezogene Fälle bleiben offen;
Integer-Abhängigkeiten im Sprachfeld sind nicht entfernt.

Der [Human Review Explorer](https://content.eric-harrer.de/t3thi/reviews/95619/)
vergleicht 80 direkte/inverse Kandidaten, Astra-/Opus-Bewertungen, menschliche
Entscheidungen und Core-Evidenz. Beide Modelle klassifizierten eine Abfrage
gespeicherter Datensätze im `ContentObjectRenderer` falsch. Übereinstimmung
dient der Priorisierung, nicht als Beweis. Die Prüfung vom 25.09.2026 fand in
Patch Set 2 keinen False Positive; weitere Kandidaten benötigen menschliches Review.
[Gerrit 92267](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92267) wurde nach der Marker-Arbeit am 07.10.2026 aufgegeben. Es bleibt historisches Inventar, kein offener Patch und keine Ersatzimplementierung.

## Struktur-Layer-Demonstrator und Validierung der Sprache null

Andrés [Struktur-Layer-Prototyp](https://github.com/t3thi/structure-layer),
demonstriert am 23.10.2026, behält verborgene strukturelle `0`-Datensätze und
verlagert Inhalte in Sprachvarianten: Editing Language je Site, Page-Tree-Labels
und Anlagekontrollen. Die Strukturansicht dient nur der Entwicklungsinspektion;
direkte Blaupausen und getrennte Strukturberechtigungen bleiben spätere Ideen.

Der am 30.10.2026 statisch geprüfte Code enthält die alleinige Editing-Language-
Auswahl in der Toolbar, eine feste Vergleichsreferenz mit Anlageaktion für
fehlende Seitenübersetzungen, Translate-Buttons und Sprachlisten an Lücken.
Die Sammel-Sichtbarkeitsaktion liegt ohne redundantes Label im Kontextmenü.
Optionale Quellspracherzwingung liefern gebündelte Core-Patches, nicht Upstream.

Die Demo entscheidet keine Strukturhypothese und verspricht keine Übernahme
in v15/v16. Ihr Setup setzt die Datenbank zurück; Migration war nicht getestet.
Produktionsmigration, Rückweg, Berechtigungen, Lebenszyklus, Vergleichspersistenz,
Quell-/Löschverhalten und vollständige Parität bleiben unvalidiert. Die neuen
Codebefunde sind keine frisch reproduzierten UX-Ergebnisse.

Gerrit 97053 und der 14.3-Backport Gerrit 97225 wurden am
30.10.2026 gemergt. Die Default-Ermittlung bevorzugt `0` unabhängig von der
Reihenfolge; bei umgeordneten Sites ändern sich damit Default-Links und
Site-Root-Weiterleitung. Ohne `0` bleibt bewusst die erste Sprache maßgeblich.
Der gewünschte Fehler ist nicht implementiert.

## Sprachabgleich von Inline-Kindern

Gerrit 95476 wurde am 23.10.2026 zugunsten der gemergten Changes
Gerrit 87595 (TYPO3 v15) und Gerrit 96783 (14.3) aufgegeben.
Der Nachfolger gleicht eigene Inline- und File-Kinder nach Beziehungsauflösung
an, wenn ein Parent angelegt, seine Sprache geändert oder neue Kinder
übermittelt werden. Vorhandene Geschwister und verschachtelte Kinder werden
einbezogen; explizite Child-Sprachwerte genießen nicht die Ausnahme des
früheren Vorschlags. Der Abgleich auf `0` oder Language All leert
Übersetzungszeiger. In Workspaces werden Workspace-Versionen geschrieben.

MM-Beziehungen, direkte Child-Sprachänderungen und eine pauschale Reparatur
inkonsistenter Altdaten sind nicht abgedeckt. Der Abgleich prüft den Zugriff
auf Child-Tabelle, Seite oder Sprachfeld nicht separat. Dieser aktuelle Vertrag
ist umfassender als der frühere Vorbelegungsvorschlag, aber kein universelles
Verbot gemischtsprachiger Beziehungen.

## Einheitlicher Recycler-Sprachselektor

[Gerrit 96916](https://review.typo3.org/c/Packages/TYPO3.CMS/+/96916) wurde am
22.10.2026 für TYPO3 v15 gemergt; [Forge 111176](https://forge.typo3.org/issues/111176)
ist Resolved. Recycler und Datensatzhistorie nutzen die gemeinsame Einzelauswahl.
Bei konkreter Recycler-Sprache bleiben gespeicherte All-Datensätze und Tabellen
ohne Sprachunterstützung enthalten; `null` bedeutet uneingeschränkte Auswahl.
Freie Sprach-Mehrfachauswahl und die Entfernung synthetischer Werte in anderen
Pfaden sind damit nicht umgesetzt.

## Laufende Arbeit mit Stand vom 30.10.2026

Der Gesamtabgleich prüfte Changes und verlinkte Issues am 30.10.2026;
die Meeting-Nachbereitung prüfte danach nochmals 94510, 110008 und 88024.
WIP hat Vorrang; sonst erfordern negative Stimmen,
offene Kommentare oder Merge-Konflikte Nacharbeit. Review-positiv bedeutet:
aktuelle positive Code-Review-Stimme, mergefähig, ohne diese Blocker; sonst
Review ausstehend. Mergefähigkeit gilt gegenüber dem damaligen Ziel-Branch
und ist keine Submit-Freigabe.

### In Arbeit (WIP)

| Patch | Ziel-Release-Linien und Backports | Aktueller Review-Stand | Merge-Konflikt | Geltungsbereich und Abgrenzung |
|---|---|---|---|---|
| [Forge 110510](https://forge.typo3.org/issues/110510) und [Gerrit 95475](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95475) | TYPO3 v15. | Patch Set 2; WIP; CI `+1`; keine ungelösten Kommentare. | **Ja** | Zeigt einen gespeicherten Language-All-Datensatz in mehreren Spalten. Der Spaltenkontext schützt die Sprache benachbarter Paste-/Move-Operationen; der gemeinsame Datensatz behält All beim Einfügen. Ein Sortierwert ermöglicht keine unabhängigen Free-Mode-Positionen. Die Move-Guard-Anforderung aus August bleibt zu prüfen. |
| [Gerrit 92859](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92859) | TYPO3 v15. | Patch Set 6; WIP; CI `-1`; 6 ungelöste Kommentare. | **Ja** | Schlägt sprach- und Workspace-fähige MM-Tabellen vor. Das einheitliche Beziehungsmodell ist relevant, aber die Verwendung von Live-UIDs der Default Language ist ein inkrementeller Entwurf und keine Entscheidung über die zukünftige Structural Identity. |
| [Gerrit 93289](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93289) | TYPO3 v15. | Patch Set 1; WIP; CI `+1`; keine ungelösten Kommentare. | Nein | Ergänzt Workspace-Abdeckung für das Einfügeverhalten von Language All und schließt vor semantischen Änderungen eine Charakterisierungslücke. |
| [Gerrit 93819](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93819) | TYPO3 v15; 14.3 vorgesehen; kein Backport gefunden. | Patch Set 2; `[WIP]`; CI `+1`; keine ungelösten Kommentare. | **Ja** | Ergänzt Schutzmechanismen beim Verschieben von Free-Mode-Inhalten, während der aktuelle Free Mode weiterhin unterstützt wird. |
| [Forge 110328](https://forge.typo3.org/issues/110328) und [Gerrit 95042](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95042) | TYPO3 v15. | Patch Set 1; `[WIP]`; CI `+1`; keine ungelösten Kommentare. | **Ja** | Beschränkt auswählbare Translation Parents, um doppelte oder strukturell ungültige Zuordnungen zu verhindern. Der Patch ist kein implementierter Fix. |
| [Forge 110330](https://forge.typo3.org/issues/110330) und [Gerrit 95043](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95043) | TYPO3 v15. | Patch Set 1; `[WIP]`; CI `+1`; keine ungelösten Kommentare. | **Ja** | Verbirgt Connected Mode, wenn die Quelle keine Default-Language-Beziehung herstellen kann. Eine Free-Mode-Quelle kann die fehlende Verbindung nicht erzeugen. Das aktuelle Patch Set muss vor weiteren Reviews rebased werden. |

### Review-Nacharbeit erforderlich

| Patch | Ziel-Release-Linien und Backports | Aktueller Review-Stand | Merge-Konflikt | Geltungsbereich und Abgrenzung |
|---|---|---|---|---|
| [Forge 110008](https://forge.typo3.org/issues/110008) und [Gerrit 94510](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94510) | TYPO3 v15; 14.3 beabsichtigt, kein Backport gefunden. | Patch Set 11; André: Code-Review `-1`, Verified `+1`; Benni: beides `+1`; CI `+1`; 1 ungelöster Kommentar. | Nein | Stoppt Fallback bei verstecktem Übersetzungskandidaten unter `fallbackType: strict`; bei fehlender Übersetzung bleibt Fallback möglich. Erfüllt nicht die gesamte Einsprachen-Anforderung, nicht gemergt. Release-/Backport-Strategie bleibt strittig. |
| [Gerrit 92777](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92777) | TYPO3 v15; 14.3 vorgesehen; kein Backport gefunden. | Patch Set 10; zwei Code-Review `+1`; CI `+1`; 1 ungelöster Kommentar. | Nein | Beschränkt kopierte Free-Mode-Datensätze auf im Zielkontext verfügbare Sprachen. Dies verbessert die Integrität des aktuellen Modells, ohne ein zukünftiges Strukturmodell auszuwählen. |
| [Gerrit 93063](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93063) | TYPO3 v15; 14.3 beabsichtigt, kein Backport gefunden. | Patch Set 8; CI `+1`; keine aktuelle Code-Review-Stimme oder ungelösten Kommentare. | **Ja** | Warnt vor verwaisten Übersetzungen, ohne Identität zu reparieren oder neu zu gestalten; Rebase erforderlich. |

### Review ausstehend

| Patch | Ziel-Release-Linien und Backports | Aktueller Review-Stand | Merge-Konflikt | Geltungsbereich und Abgrenzung |
|---|---|---|---|---|
| [Gerrit 93028](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93028) | TYPO3 v15; 14.3 vorgesehen; kein Backport gefunden. | Patch Set 6; CI `+1`; keine aktuelle Code-Review-Stimme und kein ungelöster Kommentar. | Nein | Wendet die angeforderte Sprache des Parents auf neu erstellte Relation Child Records an und lässt bereits lokalisierte Child Records unverändert. |
| [Gerrit 95038](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95038) | TYPO3 v15. | Patch Set 2; CI `+1`; keine aktuelle Code-Review-Stimme und kein ungelöster Kommentar. | Nein | Hält `pages.doktype` mittels `l10n_mode=exclude` an der Default-Language-Seite ausgerichtet und stellt für bereits abweichende Übersetzungen einen Upgrade Wizard bereit. Dies erzwingt eine Invariante des aktuellen Modells und wählt kein zukünftiges Strukturmodell aus. |
| [Gerrit 93752](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93752) | TYPO3 v15; 14.3 beabsichtigt, kein Backport gefunden. | Patch Set 4; CI `+1`; keine aktuelle Code-Review-Stimme oder ungelösten Kommentare. | Nein | Überspringt Overlays beim Kopieren in eine Free-Mode-Sprache; inzwischen mergefähig, aber noch nicht positiv gereviewt oder gemergt. |

### Abgelehnt oder ersetzt

| Patch | Ziel-Release-Linien und Backports | Offizieller Stand | Merge-Konflikt | Begründung |
|---|---|---|---|---|
| [Gerrit 92585](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92585) | TYPO3 v15; TYPO3 14.3 war genannt, aber es existiert kein Backport-Change. | Am 07.08.2026 aufgegeben. | Nicht anwendbar | Die eng begrenzte Korrektur der Free-Mode-Darstellung wurde im gemergten [TYPO3-v15-Change 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170) und [TYPO3-14.3-Backport 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199) weiterentwickelt. |
| [Gerrit 94917](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94917) | TYPO3 v15; kein Backport-Branch war genannt und es existiert kein Backport-Change. | Am 27.08.2026 aufgegeben. | Nicht anwendbar | Die überlappende Korrektur der Vergleichsdarstellung für Free Mode und Mixed Mode war bereits zur Ersetzung durch den gemergten [TYPO3-v15-Change 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170) und den [TYPO3-14.3-Backport 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199) vorgeschlagen worden. Change 94917 selbst wurde nicht gemergt. |
| [Gerrit 84338](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84338) | TYPO3 v15. | Am 23.10.2026 aufgegeben. | Nicht anwendbar | Konfigurierbare Default-Language-IDs wurden wegen weitreichender `0`-Annahmen aufgegeben. Der Autor bevorzugt die Untersuchung des Struktur-Layer-PoC; dies ist keine Core-Übernahme. |
| [Gerrit 92267](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92267) | TYPO3 v15. | Am 07.10.2026 aufgegeben. | Nicht anwendbar | Früheres Annotationsinventar; 95619/96412 liefern stattdessen den begrenzten Marker. Keine Test-Suite oder semantische Ablösung. |
| [Gerrit 95476](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95476) | Vorschlag für TYPO3 v15/14.3. | Am 23.10.2026 aufgegeben. | Nicht anwendbar | Ersetzt durch 87595/96783 mit dem oben beschriebenen umfassenderen Child-Sprachabgleich. |

### Unterstützende Patches und Forschung ohne Patch

| Arbeit | Aktueller Stand | Merge-Konflikt | Bedeutung |
|---|---|---|---|
| [dbdoctor PR 98](https://github.com/lolli42/dbdoctor/pull/98) | Am 08.10.2026 gemergt. | Nicht anwendbar | Repariert abweichenden `l10n_state`, indem unterschiedliche gespeicherte Werte als `custom` markiert werden; dbdoctor-Werkzeug, keine geänderte Zustandsanreicherung im Core. |
| [dbdoctor PR 171](https://github.com/lolli42/dbdoctor/pull/171) | Am 08.10.2026 ohne Merge geschlossen; der Abschlusskommentar beschreibt aufgeteilte Folgearbeit. | Nicht anwendbar | Der breite Cleanup-Entwurf ist nicht gemergt. Generisches Löschen bei fehlender Seitenübersetzung kann valide Extension-Daten entfernen; engerer Cleanup muss Site-spezifisch bleiben. |
| [Forge 110497](https://forge.typo3.org/issues/110497) und [Forge 110498](https://forge.typo3.org/issues/110498) | Beide Closed. | Nicht anwendbar | Die Meldungen zur fehlenden Child-Sprache sind über die Aufgabe von 95476 mit dem Ersatz 87595/96783 verknüpft. Dies belegt eine gelieferte Korrektur, nicht den exakt regressionsauslösenden Commit. |
| [Forge 88024](https://forge.typo3.org/issues/88024) | New; ursprünglicher v9.5.5-Bericht. | Nicht anwendbar | Crop wird initial kopiert, später nicht nachgezogen. Child-Sprachabgleich implementiert keine rekursive Wertsynchronisierung; der aktuelle Projektfall bleibt unvalidiert. |
