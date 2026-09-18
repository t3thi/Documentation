---
id: topic:current-core-work
title: "Aktuelle Core-Arbeit"
language: de
updated: "2026-09-18"
knowledge:
  - K-000013
  - K-000015
  - K-000016
  - K-000022
  - K-000023
  - K-000027
  - K-000028
  - K-000029
  - K-000030
history:
  - K-000026
decisions: []
translation_of: topic:current-core-work
source_updated: "2026-09-18"
translation_reviewed_at: "2026-08-14"
source_digest: "sha256:e8f9e83c2e78530e58789b9ca217ae6d5a51e3ca4416f3743b69e6da05948c40"
---

# Aktuelle Core-Arbeit

## Aktuelle Synthese

## Was bereits erreicht wurde

Die Initiative und damit verbundene Core-Arbeiten haben bereits klar abgegrenzte Verbesserungen geliefert. Diese Ergebnisse machen das heutige System sicherer oder verständlicher. Sie setzen nicht die vollständige Vision um.

| Ergebnis | Ausgelieferte Release-Linien | Unmittelbare Verbesserung | Verantwortung oder Erkenntnis |
|---|---|---|---|
| [Gerrit 83632](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83632), gemergt am 26.04.2024 | TYPO3 v13. | Erzeugte valide Quelldaten für DataHandler-Lokalisierungstests. | Verlässliche Fixtures sind eine Voraussetzung für Verhaltensänderungen. |
| [Gerrit 84237](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84237), gemergt am 25.05.2024 | TYPO3 v13. | Verhinderte verwaiste übersetzte Datensätze in einem Kopiervorgang. | Strukturelle und sprachliche Validität müssen beim Kopieren erhalten bleiben. |
| [Gerrit 83310](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83310), [86085](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86085) und [85912](https://review.typo3.org/c/Packages/TYPO3.CMS/+/85912), gemergt zwischen dem 13.05.2024 und dem 07.01.2025 | 83310 und 86085: TYPO3 v13. 85912: TYPO3 v14, zusätzlich TYPO3 13.4 als gemergter [Gerrit-Patch 87655](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87655). | Ergänzte gezielte Tests für das Kopieren lokalisierter Inhalte auf eine nicht übersetzte Seite, das Kopieren von Inline Child Records und das Verschieben von `-1`-Inhalten. | Die Charakterisierung hält aktuelle Einschränkungen fest, bevor Verhalten geändert wird. |
| [Gerrit 86773](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86773) und [88827](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88827), gemergt am 10.01.2025 und 05.05.2025 | TYPO3 v14, zusätzlich TYPO3 13.4 als gemergte [Gerrit-Patches 87689](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87689) und [89297](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89297). | Synchronisierte beim Kopieren die Sprache von Inline Child Records und bewahrte beim Kopieren die Sprache von Übersetzungen. | Kopiervorgänge müssen die Sprachabsicht für Child Records und übersetzte Datensätze erhalten. |
| [Gerrit 89199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89199), gemergt am 30.04.2025 | TYPO3 v14, zusätzlich TYPO3 13.4 als gemergter [Gerrit-Patch 89286](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89286). | Behält bei der Navigation innerhalb einer Site die ausgewählte Sprache bei, zeigt bei fehlender Übersetzung Inhalte der Default Language und setzt die Auswahl zurück, wenn eine andere Site diese Sprache nicht bereitstellt. | Verhindert, dass eine ungültige Sprachauswahl zu einem leeren Modul „Layout“ führt, und erhält zugleich den nützlichen redaktionellen Kontext, soweit dies möglich ist. |
| [Gerrit 92580](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92580), gemergt am 09.02.2026 | TYPO3 v14, zusätzlich TYPO3 13.4 als gemergter [Gerrit-Patch 92757](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92757). | Beschränkt kopierte Datensatzübersetzungen auf Sprachen, die in der Ziel-Site verfügbar sind. | Eine klar abgegrenzte Integritätskorrektur für den aktuellen Site-lokalen Umgang mit Sprachen. |
| [Gerrit 92881](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92881), gemergt am 20.02.2026 | TYPO3 v14. | Trennt `localizeRecord()` von `copyRecord()` im DataHandler. | Klarere Code-Pfade unterstützen eine sicherere Charakterisierung und spätere Änderungen. |
| [Gerrit 88837](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88837), gemergt am 11.04.2026 | TYPO3 v14. | Vermeidet die Neuzuordnung nicht sprachfähiger IRRE-Child-Records und verwendet separat zugewiesene Datensätze für lokalisierte Parent-Records. | Ein konkreter Fall, in dem explizit synchronisierte Daten die Mehrdeutigkeit der Zuständigkeit beseitigten. |
| [Gerrit 94831](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94831), gemergt am 21.07.2026 | TYPO3 v15, [TYPO3 14.3 als Gerrit-Patch 94866](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94866) und [TYPO3 13.4 als Gerrit-Patch 94867](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94867) sind gemergt. | Löst übersetzte Unterseiten von Mount Points über die Default-Language-Beziehung auf und verhindert einen `404`. | Ein reales Projekt mit gemeinsamem Speicher führte zu einer kleinen, testgestützten Korrektur. |
| [Gerrit 94914](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94914), gemergt am 01.08.2026 | TYPO3 v15, [TYPO3 14.3 als Gerrit-Patch 94916](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94916) und [TYPO3 13.4 als Gerrit-Patch 94915](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94915) sind gemergt. | Findet vorhandene Übersetzungen über `l10n_parent`, wenn `l10n_source` leer ist. | Bewahrt die Unterscheidung zwischen strukturellem Parent und Übersetzungsquelle und verhindert zugleich Duplikate. |
| [Gerrit 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170), gemergt am 10.08.2026 | TYPO3 v15 und [TYPO3 14.3 als Gerrit-Patch 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199) sind gemergt. | Korrigiert Vergleichsansichten, die Connected- und Free-Mode-Sprachen kombinieren: Connected-Mode-Inhalte bilden Vergleichszeilen, während jede Free-Mode-Sprache unabhängig dargestellt wird, auch wenn die Default Language keine Inhalte enthält. | Eine klar abgegrenzte Zwischenkorrektur für die aktuellen Modi. Sie bestimmt weder das zukünftige Bearbeitungs- noch das Strukturmodell. |
| [Gerrit 95178](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95178), gemergt am 10.08.2026 | TYPO3 v15 und [TYPO3 14.3 als Gerrit-Patch 95202](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95202) sind gemergt. | Hält beim Scrollen durch eine lange Vergleichsansicht im Modul „Layout“ Sprachname, Flag und Übersetzungsmodus sichtbar. | Verbessert die redaktionelle Orientierung in der aktuellen Oberfläche. Der Patch ist ausdrücklich eine Zwischenlösung und ändert oder bestimmt kein zukünftiges Strukturmodell. |

Die [Test-Extension der Initiative](https://github.com/t3thi/translation-handling) stellt außerdem reproduzierbare Szenarien für Übersetzungen, Fallback und Beziehungen bereit. Sie wurde 2025 wiederbelebt und um gezielte IRRE-Fälle erweitert. Sie ist Forschungsinfrastruktur und kein Beleg für geändertes Core-Verhalten.

Das wiederkehrende Muster ist hilfreich: Ein realer Fehler wird reproduziert, der verantwortliche Vertrag wird identifiziert, Tests definieren die Grenze und die Korrektur bleibt eng begrenzt. Dies ist die von der Initiative bevorzugte Form der inkrementellen Verbesserung.

## Gezielte Language-All-Prüfung vom 04.09.2026

Eine gezielte Folgeprüfung betrachtete die beiden WIP-Changes zu
Language-All-Markern. [Gerrit
95619](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95619), Patch Set 2,
führt einen benannten Marker für gespeicherte und synthetische Vorkommen ein,
ohne das Verhalten zu ändern. [Gerrit
92267](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92267), Patch Set 6,
kennzeichnet Annahmen über gespeicherte Language-All-Datensätze und hatte bei
der Prüfung am 04.09.2026 einen ungelösten Kommentar. Beide Changes waren zu
diesem Zeitpunkt `NEW`, WIP, CI-positiv und mergefähig.

Die Prüfung der Initiative unterscheidet diese Semantiken: Ein tatsächlich in
einem Datensatz gespeicherter Wert steht für die Language-All-Auswahl der
Redaktion; ein nur für einen Anzeige- oder Filterzustand des Backends erzeugter
Wert ist synthetisch. Die Prüfung von Core `main` beim Commit
`028b93bddf49a950eb3a58c4606b5e06145fb567` bestätigt aktive Abhängigkeiten in
Aufrufpfaden von Layout, Routing, Workspaces, Recycler, Sitemap und
LinkValidator. Sie belegt nicht, dass all diese Pfade dieselbe Darstellung
benötigen. Die unterstützte Zielrichtung ist daher, synthetische
Auswahl-Platzhalter dort durch explizite konkrete Sprachauswahlen zu ersetzen,
wo eine Charakterisierung dies als sicher bestätigt, während das
datensatzbezogene Verhalten bis zu seinem Synchronisierungsersatz erhalten
bleibt.

Diese gezielte Prüfung ersetzt nicht den vollständigen externen Statusstand im
folgenden Abschnitt. Sie aktualisiert ausschließlich Gerrit 92267 und 95619
sowie die für ihre semantische Einordnung untersuchten Code-Pfade.

## Gezielte Folgeprüfung vom 18.09.2026

Die fortgesetzte Prüfung von [Gerrit
95619](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95619) ordnete vier
weitere Core-Pfade anhand der vorstehenden Unterscheidung ein. Der aktuelle
`ContentObjectRenderer`, die frontendseitige `CategoryCollection` und der
Extbase-`Typo3DbQueryParser` beziehen in ihren Abfragen gezielt Datensätze ein,
die mit Language All gespeichert sind. Es handelt sich damit um
datensatzbezogene Verwendungen und nicht um synthetische Auswahlwerte des
Backends. Der `LinkAnalyzer` übernimmt, soweit vorhanden, die tatsächliche
Sprache des Datensatzes, der einen Link enthält. Fehlt eine nutzbare
Datensatzsprache, verwendet er jedoch ebenfalls `-1` als Fallback. Dieses
Fallback ist daher ein dritter Vertrag, der explizit gemacht werden muss,
bevor seine Darstellung geändert wird. Gerrit 95619 war bei der Prüfung am
18.09.2026 weiterhin `NEW`, WIP und mergefähig; Patch Set 2 hatte eine
erfolgreiche CI, aber keine menschliche Code-Review-Stimme.

[Gerrit
95476](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95476), Patch Set 1,
ist ein separater WIP-Vorschlag für TYPO3 v15 und 14.3. Wenn ein neu angelegter
Inline- oder File-Reference-Child-Record ohne explizite Sprache ankommt, wird
seine Sprache vom referenzierenden Parent abgeleitet. Eine explizit
übergebene Sprache des Child Records bleibt erhalten, und vorhandene Child
Records werden nicht nachträglich einer anderen Sprache zugeordnet. Diese
klar begrenzte Default-Regel behebt die gemeldete Regression, ohne valide
gemischtsprachige Beziehungen zu verbieten. Der Change war bei der Prüfung am
18.09.2026 `NEW`, WIP und mergefähig, mit erfolgreicher CI, keinen ungelösten
Kommentaren und keiner menschlichen Code-Review-Stimme. Er ist kein aktuelles
Core-Verhalten.

Diese gezielte Folgeprüfung ersetzt nicht den vollständigen externen
Statusstand im folgenden Abschnitt. Sie aktualisiert ausschließlich Gerrit
95476 und 95619 sowie die neu charakterisierten Language-All-Aufrufpfade.

## Laufende Arbeit mit Stand vom 28.08.2026

Dieser Abschnitt beruht auf der vollständigen externen Statusprüfung vom
28.08.2026.

Jeder offene Core-Patch erhält entsprechend seinem aktuellen offiziellen Stand genau einen primären Statuseintrag. **WIP** hat Vorrang vor Review-Befunden. **Review-Nacharbeit erforderlich** bedeutet, dass das aktuelle Patch Set mindestens einen ungelösten Kommentar, eine aktuelle negative Review- beziehungsweise Verifizierungsstimme oder einen Merge-Konflikt besitzt. **Review-positiv und mergefähig** ist die hier verwendete Kategorie für einen finalen Patch-Stand; sie erfordert mindestens ein aktuelles Code-Review `+1`, keine aktuelle negative Stimme, keinen ungelösten Kommentar und ein mergefähiges aktuelles Patch Set. **Review ausstehend** umfasst offene Patches ohne diese Blocker, aber auch ohne aktuelles positives Code-Review. **Abgelehnt oder ersetzt** dokumentiert formal aufgegebene Änderungen, wenn ihre Begründung weiterhin relevant ist.

Für offene Gerrit-Änderungen bedeutet **Merge-Konflikt: Ja**, dass Gerrit das aktuelle Patch Set am 28.08.2026 gegenüber seinem Ziel-Branch als `mergeable: false` gemeldet hat. Dies kann sich ändern, wenn sich der Ziel-Branch oder das Patch Set ändert. **Nein** bedeutet `mergeable: true`; dies ersetzt weder Review noch Submit-Freigabe.

### In Arbeit (WIP)

| Patch | Ziel-Release-Linien und Backports | Aktueller Review-Stand | Merge-Konflikt | Geltungsbereich und Abgrenzung |
|---|---|---|---|---|
| [Gerrit 84338](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84338) | TYPO3 v15. | Patch Set 6; WIP; CI `+1`; 4 ungelöste Kommentare. | **Ja** | Schlägt vor, die ID der ersten Site Language als Default Language zu verwenden, statt `0` zu erzwingen. Weitreichende Core-Annahmen bleiben ungelöst, und die Initiative hat ihre unmittelbare Priorität später von diesem Weg weg verlagert. |
| [Gerrit 92267](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92267) | TYPO3 v15. | Patch Set 6; WIP; CI `+1`; keine ungelösten Kommentare. | Nein | Inventarisiert gespeicherte `Language All`-Annahmen. Ändert kein ausführbares Verhalten und ist weder eine Characterization-Test-Suite noch eine Ersatzimplementierung. |
| [Forge 110510](https://forge.typo3.org/issues/110510) und [Gerrit 95475](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95475) | TYPO3 v15. | Patch Set 1; WIP; CI `+1`; keine ungelösten Kommentare. | Nein | Zeigt jeden bestehenden Language-All-Datensatz in jeder Sprachspalte und behält die heutige Speicherung bei. Die Änderung ist eine klar abgegrenzte Backend-Verbesserung, bleibt ungemergt und bestimmt kein zukünftiges Strukturmodell. |
| [Gerrit 92859](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92859) | TYPO3 v15. | Patch Set 6; WIP; CI `-1`; 6 ungelöste Kommentare. | **Ja** | Schlägt sprach- und Workspace-fähige MM-Tabellen vor. Das einheitliche Beziehungsmodell ist relevant, aber die Verwendung von Live-UIDs der Default Language ist ein inkrementeller Entwurf und keine Entscheidung über die zukünftige Structural Identity. |
| [Gerrit 93289](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93289) | TYPO3 v15. | Patch Set 1; WIP; CI `+1`; keine ungelösten Kommentare. | Nein | Ergänzt Workspace-Abdeckung für das Einfügeverhalten von Language All und schließt vor semantischen Änderungen eine Charakterisierungslücke. |
| [Gerrit 93819](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93819) | TYPO3 v15; TYPO3 14.3 ist genannt, aber ein Backport-Change existiert noch nicht. | Patch Set 2; `[WIP]`; CI `+1`; keine ungelösten Kommentare. | **Ja** | Ergänzt Schutzmechanismen beim Verschieben von Free-Mode-Inhalten, während der aktuelle Free Mode weiterhin unterstützt wird. |
| [Forge 110328](https://forge.typo3.org/issues/110328) und [Gerrit 95042](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95042) | TYPO3 v15. | Patch Set 1; `[WIP]`; CI `+1`; keine ungelösten Kommentare. | Nein | Beschränkt auswählbare Translation Parents, um doppelte oder strukturell ungültige Zuordnungen zu verhindern. Der Patch ist kein implementierter Fix. |
| [Forge 110330](https://forge.typo3.org/issues/110330) und [Gerrit 95043](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95043) | TYPO3 v15. | Patch Set 1; `[WIP]`; CI `+1`; keine ungelösten Kommentare. | **Ja** | Verbirgt Connected Mode, wenn die Quelle keine Default-Language-Beziehung herstellen kann. Eine Free-Mode-Quelle kann die fehlende Verbindung nicht erzeugen. Das aktuelle Patch Set muss vor weiteren Reviews rebased werden. |

### Review-Nacharbeit erforderlich

| Patch | Ziel-Release-Linien und Backports | Aktueller Review-Stand | Merge-Konflikt | Geltungsbereich und Abgrenzung |
|---|---|---|---|---|
| [Gerrit 87595](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87595) | TYPO3 v15; TYPO3 14.3 ist genannt, aber ein Backport-Change existiert noch nicht. | Patch Set 11; CI `-1`; 3 ungelöste Kommentare. | **Ja** | Ändert die Sprache vorhandener Inline Child Records gemeinsam mit ihrem Parent. Die Reviews erfordern weiterhin eine breitere Abdeckung von Beziehungen, Tests und Migrationsaspekten. |
| [Gerrit 92777](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92777) | TYPO3 v15; TYPO3 14.3 ist genannt, aber ein Backport-Change existiert noch nicht. | Patch Set 10; zwei Code-Review `+1`; CI `+1`; 1 ungelöster Kommentar. | Nein | Beschränkt kopierte Free-Mode-Datensätze auf im Zielkontext verfügbare Sprachen. Dies verbessert die Integrität des aktuellen Modells, ohne ein zukünftiges Strukturmodell auszuwählen. |
| [Gerrit 93063](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93063) | TYPO3 v15; TYPO3 14.3 ist genannt, aber ein Backport-Change existiert noch nicht. | Patch Set 7; Code-Review `+1`; CI `+1`; keine ungelösten Kommentare. | **Ja** | Warnt vor ungültigen Translation Parents. Der Patch ist review-positiv, muss aber gegenüber dem TYPO3-v15-Ziel-Branch wieder mergefähig gemacht werden; er macht strukturelle Beschädigungen sichtbar, repariert oder gestaltet Identität aber nicht neu. |
| [Forge 110008](https://forge.typo3.org/issues/110008) und [Gerrit 94510](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94510) | TYPO3 v15; TYPO3 14.3 und TYPO3 13.4 sind genannt, aber Backport-Changes existieren noch nicht. | Patch Set 8; CI `+1`; 1 ungelöster Kommentar. | Nein | Behandelt eine Regression nach dem gemergten [Gerrit-Patch 88828](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88828), bei der die Ausgabe unter `strict` von einem verborgenen Datensatz in der angeforderten Sprache auf eine andere Sprache zurückfallen kann. Solange der Fix nicht gemergt ist, bleibt das aktuelle Verhalten unverändert. |
| [Gerrit 93752](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93752) | TYPO3 v15; TYPO3 14.3 ist genannt, aber ein Backport-Change existiert noch nicht. | Patch Set 3; CI `+1`; keine aktuelle Code-Review-Stimme und kein ungelöster Kommentar. | **Ja** | Ergänzt Schutzmechanismen beim Kopieren von Free-Mode-Inhalten. Das aktuelle Patch Set muss zunächst gegenüber dem TYPO3-v15-Ziel-Branch wieder mergefähig gemacht werden. |

### Review-positiv und mergefähig

Derzeit erfüllt kein Patch alle Kriterien. Gerrit 92777 besitzt positive Reviews, aber einen ungelösten Kommentar; Gerrit 93063 besitzt ein positives Review und keinen ungelösten Kommentar, aber einen Merge-Konflikt. Beide verbleiben deshalb unter **Review-Nacharbeit erforderlich**.

### Review ausstehend

| Patch | Ziel-Release-Linien und Backports | Aktueller Review-Stand | Merge-Konflikt | Geltungsbereich und Abgrenzung |
|---|---|---|---|---|
| [Gerrit 93028](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93028) | TYPO3 v15; TYPO3 14.3 ist genannt, aber ein Backport-Change existiert noch nicht. | Patch Set 6; CI `+1`; keine aktuelle Code-Review-Stimme und kein ungelöster Kommentar. | Nein | Wendet die angeforderte Sprache des Parents auf neu erstellte Relation Child Records an und lässt bereits lokalisierte Child Records unverändert. |
| [Gerrit 95038](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95038) | TYPO3 v15. | Patch Set 2; CI `+1`; keine aktuelle Code-Review-Stimme und kein ungelöster Kommentar. | Nein | Hält `pages.doktype` mittels `l10n_mode=exclude` an der Default-Language-Seite ausgerichtet und stellt für bereits abweichende Übersetzungen einen Upgrade Wizard bereit. Dies erzwingt eine Invariante des aktuellen Modells und wählt kein zukünftiges Strukturmodell aus. |

### Abgelehnt oder ersetzt

| Patch | Ziel-Release-Linien und Backports | Offizieller Stand | Merge-Konflikt | Begründung |
|---|---|---|---|---|
| [Gerrit 92585](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92585) | TYPO3 v15; TYPO3 14.3 war genannt, aber es existiert kein Backport-Change. | Am 07.08.2026 aufgegeben. | Nicht anwendbar | Die eng begrenzte Korrektur der Free-Mode-Darstellung wurde im gemergten [TYPO3-v15-Change 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170) und [TYPO3-14.3-Backport 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199) weiterentwickelt. |
| [Gerrit 94917](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94917) | TYPO3 v15; kein Backport-Branch war genannt und es existiert kein Backport-Change. | Am 27.08.2026 aufgegeben. | Nicht anwendbar | Die überlappende Korrektur der Vergleichsdarstellung für Free Mode und Mixed Mode war bereits zur Ersetzung durch den gemergten [TYPO3-v15-Change 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170) und den [TYPO3-14.3-Backport 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199) vorgeschlagen worden. Change 94917 selbst wurde nicht gemergt. |

### Unterstützende Patches und Forschung ohne Patch

| Arbeit | Aktueller Stand | Merge-Konflikt | Bedeutung |
|---|---|---|---|
| [dbdoctor PR 98](https://github.com/lolli42/dbdoctor/pull/98) | Offen; GitHub meldet den aktuellen Stand als nicht mergefähig und `dirty`. | **Ja** | Repariert `l10n_state`, wenn Synchronisierungsmetadaten gespeicherten übersetzten Werten widersprechen. Dies ist kein gemergtes Core-Verhalten. |
| [dbdoctor PR 171](https://github.com/lolli42/dbdoctor/pull/171) | Offen mit `[WIP]`; GitHub meldet den aktuellen Stand als konfliktfrei und mergefähig. | Nein | Erkennt verwaiste Übersetzungen aus historischen Kopiervorgängen. Dies ist Diagnose- und Reparaturwerkzeug, kein gemergter Core-Fix und kein neues Übersetzungsmodell. |
| [Forge 110497](https://forge.typo3.org/issues/110497) und [Forge 110498](https://forge.typo3.org/issues/110498) | Beide Issues sind neu; das offizielle Feld für die Zuordnung nennt Tymoteusz Motylewski, und es ist kein Gerrit-Fix registriert. | Nicht anwendbar | Beide melden, dass neue Inline- oder File-Reference-Child-Records nicht verbundener Datensätze einer Nicht-Default-Sprache die Sprache `0` erhalten, wenn keine explizite Child-Sprache den DataHandler erreicht. Eine gemeinsame Ursache oder Lösung ist noch nicht belegt. |
| Untersuchung der strukturellen Ebene und der Editing Language | Eine Produktbeschreibung existiert; ein fertiggestellter Prototyp ist nicht belegt. | Nicht anwendbar | Eine Skizze, ein Click Dummy oder ein Experiment als Extension würde den redaktionellen Nutzen und strukturelle Annahmen vor einer Architekturentscheidung prüfen. |
