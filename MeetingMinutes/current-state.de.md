---
title: "Translation Handling Initiative - Aktueller Stand"
last_updated: "2026-10-30"
weekly_minutes_included_through: "2026-10-23"
transcripts_included_through: "2026-10-23"
external_status_checked_through: "2026-10-30"
---

<!--
This file is generated from reviewed Topic Syntheses and structured
Knowledge metadata. Do not edit it directly.
-->

# Translation Handling Initiative: Aktueller Stand

[Englische Fassung](https://notes.typo3.org/s/RhkYPguwb) · [Übersicht der Sitzungsprotokolle](https://notes.typo3.org/s/f3ae8fZSD) · [Hinweise zur Pflege dieses Dokuments][cs6]

**Stand dieser Fassung:** Die Inhalte wurden zuletzt am 30. Oktober 2026 aktualisiert. Berücksichtigt sind geprüfte Sitzungsprotokolle und Transkripte bis einschließlich 23. Oktober 2026. Die beschriebenen Core-Codepfade und die erfassten externen Patch- und Issue-Stände wurden zuletzt am 30. Oktober 2026 geprüft. Sofern ein Eintrag keinen späteren eigenen Prüfzeitpunkt nennt, sind die Angaben zu Patches und Reviews mit diesem Stichtag zu lesen.

Dies ist die deutsche Fassung der kanonischen Beschreibung des aktuellen Verständnisses, der Vision und der Arbeit der Translation Handling Initiative. Sie erläutert, warum die Initiative am Translation Handling arbeitet, welche Erkenntnisse ihre Forschung erbracht hat, welche Richtung sie derzeit verfolgt, welche Ansätze sie untersucht und welche Entscheidungen weiterhin offen sind.

Das Dokument ist keine Chronologie der Sitzungen, keine Patch-Liste, kein eigenständiger Backlog und keine beschlossene TYPO3-Core-Roadmap. Historische Diskussionen bleiben in den Sitzungsprotokollen erhalten. Dieses Dokument wird aktualisiert, wenn sich der aktuelle Stand ändert.

## Geltungsbereich

Das [TYPO3 Localization Team](https://typo3.community/contribute/teams-committees/localization) pflegt die Infrastruktur und die Dienste für die Übersetzung statischer TYPO3-Labels für Backend und Frontend. Die Ausgangstexte liegen üblicherweise als XLIFF-Dateien im Dateisystem des Core oder von Extensions; Übersetzungen werden über [Crowdin](https://crowdin.com/) gepflegt, und die [Crowdin Bridge](https://github.com/TYPO3/crowdin-bridge) exportiert sie auf den Translation Server, von dem TYPO3-Instanzen sie als Language Packs abrufen.

Die Translation Handling Initiative arbeitet dagegen an redaktionell gepflegten Datenbankdatensätzen wie Seiten, Inhaltselementen, Dateimetadaten und Extension-Datensätzen. Ihr Tätigkeitsfeld umfasst die Sprachidentität dieser Inhalte, ihre Synchronisierung und strukturellen Beziehungen, den Editing Workflow und die Frontend-Ausgabe. Die Pflege von statischen Label-Übersetzungen, Crowdin-Projekten und der Language-Pack-Infrastruktur gehört nicht zu ihrer primären Verantwortung.

## Lesehinweise

Die in diesem Dokument verwendeten Modulnamen entsprechen den aktuellen Labels
des TYPO3-v15-Cores: [Layout](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/backend/Resources/Private/Language/Modules/layout.xlf), [Records](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/backend/Resources/Private/Language/Modules/list.xlf) und [Media](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/filelist/Resources/Private/Language/module.xlf).

Am oben genannten Stichtag für externe Statusangaben bezeichnete `main` die
TYPO3-v15-Entwicklungslinie. Patch-Tabellen nutzen knappe TYPO3-Versionsnummern
(15, 14.3, 13.4); historische Merges behalten ihre damalige Major-Linie.
Ein Branch-Merge belegt keine Aufnahme in einen veröffentlichten Patch-Release.
Ein Branch zählt nur dann als Backport, wenn ein entsprechender Gerrit-Change
existiert; die bloße Nennung in einem `Releases:`-Footer belegt keinen
ausstehenden oder gemergten Backport.

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
- Die aktuelle Richtung bevorzugt explizite synchronisierte Datensätze und
  eine einfachere, vorhersehbare Verarbeitungslogik gegenüber einer möglichst
  kleinen Datensatzmenge. Das genaue Modell, sein Lebenszyklus und seine
  messbaren betrieblichen Auswirkungen bleiben offen.
- Die derzeitige strukturelle Präferenz ist eine gemeinsame verborgene, sprachneutrale Strukturebene statt vollständiger Language Layers mit universellen Shadows. Ein Demonstrator existiert inzwischen, aber die Hypothese benötigt weiterhin Validierung und Lebenszykluskonzeption; sie ist keine beschlossene Core-Architektur.
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

## Beobachtete Anforderungen und Use Cases

Die Vision der Initiative geht von konkreten Projekt- und Redaktionsanforderungen aus. Diese Use Cases weisen nicht dieselbe Lücke auf. Jeder von ihnen macht eine andere Verantwortung sichtbar, die derzeit implizit, zu grob oder mit einem anderen Aspekt gekoppelt ist.

| Use Case | Aktuelle Schwierigkeit | Sichtbar werdende Verantwortung |
|---|---|---|
| **Mostly connected, selectively different** | Eine Zielsprache teilt den Großteil ihrer Inhalte mit einer anderen Sprache, benötigt aber ausgewählte lokale Ergänzungen, Auslassungen, Ersetzungen oder Sortierungen. Inhalt ausschließlich für eine Zielsprache ist eine wichtige Ausprägung dieses übergeordneten Use Cases. Heute kann eine lokale Ergänzung einen künstlichen, verborgenen Default-Language-Datensatz erfordern, Mixed Mode erzeugen oder nützliches Connected-Mode-Verhalten aufgeben. | Structural Identity und Synchronization Intent |
| **Gemeinsamer globaler Speicher** | Mehrere Sites verwenden einen gemeinsamen Datensatzspeicher, konfigurieren dieselben menschlichen Sprachen aber mit lokalen numerischen IDs. Die Zahl allein kann die Sprache nicht zuverlässig Site-übergreifend identifizieren. | Language Identity |
| **Regionaler Fallback** | Inhalte für das Vereinigte Königreich sollen allgemeines Englisch wiederverwenden, aber nicht auf eine unpassende Sprache am Ende der Fallback Chain zurückfallen. Eine Site-weite Kette kann nicht zusätzlich ausdrücken, ob an einer fehlenden Position Fallback erfolgen oder diese bewusst leer bleiben soll. | Output Policy |
| **Inhalte für alle Sprachen** | Ein Datensatz verwendet `sys_language_uid = -1` im Sinne von „alle Sprachen“, obwohl dies ein Verhalten und keine menschliche Sprache bezeichnet. Derselbe vollständige Datensatz wird in jeder Sprache verwendet, und der Sonderwert wirkt sich auf viele voneinander unabhängige Core-Pfade aus. | Synchronization Intent und Language Identity |
| **Bearbeitung ausgehend von einer verständlichen Sprache** | Eine chinesische Redakteurin oder ein chinesischer Redakteur muss chinesische Inhalte gegebenenfalls ausgehend von Englisch erstellen, während die Default Language der Site Deutsch ist. Eine dauerhaft privilegierte Default-Language-Spalte erschwert es, diesen Arbeitsablauf zu verstehen. | Structural Identity und redaktioneller Kontext |
| **Übersetzung von Dateimetadaten in größerem Umfang** | Das [Übersetzungsmenü des Moduls „Media“](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/filelist/Classes/FileList.php) zeigt für jede Datei, ob Metadaten für eine konfigurierte Sprache angelegt oder bearbeitet werden können. Das Anlegen oder Bearbeiten zielsprachlicher Alternativtexte bleibt ein Ablauf pro Datei; im aktuellen Core ist kein eigener Ablauf für Massenerstellung oder Vollständigkeitsprüfung erkennbar. | Structural Identity und redaktioneller Arbeitsablauf |
| **Beabsichtigte Abwesenheit** | Sowohl eine fehlende Übersetzung als auch eine bewusst deaktivierte oder ausgelassene Übersetzung können zu Fallback führen. Die redaktionelle Absicht wird nicht ausreichend explizit dargestellt. | Output Policy |

„Mostly connected, selectively different“ beschreibt den Zwischenbereich, den TYPO3 besser unterstützen sollte, am deutlichsten und bildet die übergeordnete Stoßrichtung für die meisten strukturellen Use Cases. Inhalt ausschließlich für eine Zielsprache ist kein davon getrennter Use Case, sondern die Ausprägung einer lokalen Ergänzung innerhalb derselben Anforderung. Identische übersetzte Strukturen und vollständig unabhängige Strukturen sind beide valide. Eine kleine lokale Ausnahme sollte Redakteurinnen und Redakteure nicht dazu zwingen, die Vorteile des weitgehend gemeinsamen Inhalts aufzugeben. Siehe die [Use-Case-Analyse vom Juni 2026][cs8] und ihre [Präzisierung vom Juli][cs14].

### Was das Community-Feedback belegt

Die [Matrix des Community-Feedbacks von T3DD22 und nachfolgenden Veranstaltungen][cs1] enthält keine einzelne Ja-oder-Nein-Entscheidung zur Entfernung der Übersetzungsmodi. Sie erfasst „Switching translation modes“ als redaktionelles Problem und eine einfachere Auflösung von Mixed Mode als redaktionelle Anforderung. Andere Rückmeldungen bewerten Free Mode positiv, weil er die Ausprägung „Inhalt ausschließlich für eine Zielsprache“ innerhalb einer „mostly connected, selectively different“-Struktur ermöglicht. Auch das redaktionelle Interview von 2024 bestätigt diesen übergeordneten Use Case, während sowohl Mixed Mode als auch künstliche verborgene Datensätze in der Default Language als unbefriedigend bewertet werden.

Die gesicherte Anforderung besteht daher nicht darin, unabhängige redaktionelle Ergebnisse zu entfernen. Redakteurinnen und Redakteure sollen keine technischen Beziehungszustände verwalten müssen, wenn sie Inhalte lediglich in einer bestimmten Sprache anlegen, auslassen, ersetzen oder umsortieren möchten. Die Initiative empfiehlt, die Unterscheidung zwischen Free Mode, Connected Mode und Mixed Mode aus der normalen redaktionellen Oberfläche zu entfernen, sobald der Core die erforderlichen strukturellen Beziehungen sicher anlegen und pflegen kann. Diese Empfehlung setzt Vorarbeiten für automatische Zielanlage, Beziehungsintegrität, Migration und Lebenszyklus voraus; sie ist keine Deprecation des heutigen Free-Mode-Verhaltens. Siehe das [redaktionelle Interview von 2024][cs16], die [Diskussion eines durchgehend verbundenen Zustands][cs15] und die [spätere Präzisierung eines technisch verbundenen Zustands][cs11].

## Forschungsergebnisse: der heutige Stand

Das aktuelle TYPO3-Verhalten beruht nicht auf einem einzigen Übersetzungsmodell. Es entsteht durch das Zusammenspiel mehrerer Daten- und Konfigurationsverträge.

| Aktueller Vertrag | Was er heute ausdrückt | Wesentliche Kopplung |
|---|---|---|
| **Konfiguration der Site Language** | Eine Site-lokale Integer-ID, Locale, Fallback-Typ und konfigurierte Fallback-IDs. | Eine lokale numerische ID wird zugleich als Sprachwert eines Datensatzes verwendet. |
| **Sprachwert eines Datensatzes** | `sys_language_uid` speichert eine positive Sprach-ID, `0` für die Default Language oder, soweit unterstützt, `-1` für alle Sprachen. | Identität, Default-Rolle und sprachübergreifendes Verhalten teilen sich ein Feld. |
| **Übersetzungsbeziehung** | `l10n_parent` oder `l18n_parent` verbindet eine Übersetzung mit einem Default-Language-Datensatz. | Die Beziehung steuert zugleich die Darstellung im Modul „Layout“ und Teile des Overlay-Verhaltens. |
| **Übersetzungsquelle** | `l10n_source` identifiziert den Datensatz, aus dem Inhalte übernommen wurden. | Herkunft der Quelle und struktureller Parent stehen in Beziehung, sind aber nicht identisch. |
| **Konfigurationsseitig erzwungene Feldsynchronisierung** | `l10n_mode=exclude` kennzeichnet ein Feld statisch im TCA. Bei Connected Translations ist das Feld von der eigenständigen Bearbeitung in Übersetzungen ausgeschlossen, und sein Wert aus der Default Language wird mit vorhandenen abhängigen Übersetzungen synchronisiert. | Die Regel ist für dieses TCA-Feld fest vorgegeben. Sie wird nicht je Übersetzung über `l10n_state` ausgewählt. |
| **Redaktionell auswählbare Feldsynchronisierung** | `config.behaviour.allowLanguageSynchronization=true` macht ein Feld für die übersetzungsbezogene Wahl zwischen `parent`, `source`, sofern vorhanden, und `custom` verfügbar; `l10n_state` speichert diese Wahl. | Die Redaktion steuert den Feldzustand, ein fehlender oder ungültiger Zustand wird derzeit jedoch als `parent` behandelt. |
| **Übersetzungsmodus im Backend** | Connected Mode, Free Mode oder Mixed Mode wird aus den Datensatzbeziehungen abgeleitet, im Modul „Layout“ angezeigt und zur Beschränkung von Aktionen wie dem direkten Anlegen von Inhalten verwendet. | Der redaktionelle Arbeitsablauf legt Eigenschaften der aktuellen Datenstruktur offen, statt ausschließlich nach der beabsichtigten Inhaltsanlage zu fragen. |
| **Ausgaberichtlinie im Frontend** | `fallbackType` einer Site und konfigurierte Fallback-IDs bestimmen Auswahl- und Overlay-Verhalten. | Ein Fallback zur Laufzeit ist von der strukturellen Beziehung im Backend getrennt. |

Eigene Inline-/File-Kinder folgen inzwischen bei relevanten Parent-Operationen dessen Sprache (87595/96783); dies ist von Feldsynchronisierung getrennt und schließt MM-Beziehungen aus.

Seitenübersetzungen behalten immer eine Parent-Beziehung. Free Mode und Mixed Mode beschreiben hauptsächlich, wie andere Datensätze, insbesondere Inhaltselemente, innerhalb des Moduls „Layout“ zueinander in Beziehung stehen.

Die oben beschriebenen aktuellen Verträge wurden am 30.10.2026 statisch gegen TYPO3 v15 main geprüft: [TCA-Sprachbeziehungen](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/core/Classes/Configuration/Tca/TcaEnrichment.php), [Lokalisierungsstatus][cs4], [Moduserkennung im Modul „Layout“](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/backend/Classes/View/BackendLayout/ContentFetcher.php) und [Erzeugung des Fallbacks](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/core/Classes/Context/LanguageAspectFactory.php). Der aktuelle Core [ermittelt außerdem die Modusbezeichnungen und beschränkt neue Inhalte im Connected Mode](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/backend/Classes/View/PageLayoutContext.php), während das [Layout-Template den Modus als sichtbares Badge ausgibt](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/backend/Resources/Private/Partials/PageLayout/LanguageColumns.fluid.html).

Der aktuelle Core verarbeitet beide Mechanismen zur Feldsynchronisierung in derselben [DataMapProcessor-Pipeline][cs3], ermittelt ihre Felder jedoch über getrennte Scopes. `parent` und `source` stammen aus `l10n_state`; der Scope `exclude` wird direkt aus [`l10n_mode=exclude` im TCA][cs3] ermittelt. Der [Lokalisierungsstatus berücksichtigt nur mit `allowLanguageSynchronization` konfigurierte Felder][cs4], und der [Backend-Selector bietet `custom`, `parent` sowie bei vorhandener Quelle `source` an](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/backend/Classes/Form/FieldWizard/LocalizationStateSelector.php). Beide Mechanismen wirken auf vorhandene miteinander verbundene Sprachdatensätze. Keiner von ihnen erzeugt fehlende Sprachvarianten oder beschreibt für sich eine datensatzweite Synchronisierung.

### Gesicherte Erkenntnisse

1. **Verschiedene Verantwortlichkeiten sind teilweise miteinander verflochten.** Sprachidentität, Status als Default Language, Language-All-Verhalten, Datensatzbeziehung und Ausgabe zur Laufzeit beeinflussen einander durch dieselben Werte und Beziehungen.
2. **Sonderwerte wirken Core-weit.** `-1` wird in Backend-Abfragen, Berechtigungen, DataHandler, Overlays, Extbase, Slugs, Dateimetadaten, Workspaces und Tests behandelt. Seine Entfernung ist keine lokale Feldmigration.
3. **Die Default Language hat zwei Rollen.** Sie ist sichtbarer Inhalt und strukturelle Führung, mit der andere Datensätze verbunden sind. In einfachen Übersetzungsabläufen fallen diese Rollen zusammen. Sie stehen jedoch im Konflikt, wenn ausschließlich eine andere Sprache ein strukturelles Element benötigt.
4. **Strukturelle Verbindung besitzt einen konkreten Wert.** Sie unterstützt eine abgestimmte Sortierung, die Erkennbarkeit von Änderungen, Feldsynchronisierung und nachvollziehbare Vergleiche. Ziel ist nicht, Beziehungen zu entfernen, sondern zu vermeiden, dass eine reale Ausgabesprache jede strukturelle Verantwortung tragen muss.
5. **Ein fehlender Datensatz ist ein impliziter Zustand.** Er kann bedeuten: noch nicht übersetzt, bewusst nicht vorhanden, strukturell nicht erforderlich oder durch Fallback verfügbar. Datenbank und redaktioneller Arbeitsablauf unterscheiden diese Bedeutungen nicht immer.
6. **Frontend-Fallback ist nicht die strukturelle Beziehung.** `l10n_parent` beschreibt eine Datensatzbeziehung; die Fallback-Einstellungen der Site entscheiden, welche Sprache ausgegeben werden darf. Beide können dasselbe Ergebnis beeinflussen, beantworten aber unterschiedliche Fragen.
7. **Numerische Sprach-IDs sind lokale Konfiguration.** Dieselbe menschliche Sprache kann in verschiedenen Sites unterschiedliche IDs besitzen, und dieselbe ID kann in unterschiedlichen Sites verschieden bezeichnet sein. Die Backend-Oberfläche verhindert Doppelbelegungen und erleichtert eine konsistente Wiederverwendung, direkte Änderungen an der Site-YAML-Konfiguration können diese Schutzmechanismen jedoch umgehen. Eine Zahl ist daher kein verlässlicher Vertrag für globale Identität. Eine herkömmliche Locale ist ebenfalls zu eng, weil ihr Sprach- und Landesbezug weitergehende redaktionelle Varianten wie Leichte Sprache nicht verlässlich abbildet.
8. **Explizite synchronisierte Daten sind zu bevorzugen, wenn sie die Verarbeitung vereinfachen.** Die aktuelle Richtung gewichtet einfachere, vorhersehbare Code-Pfade höher als eine möglichst kleine Datensatzmenge. Zusätzliche konkrete Datensätze sind akzeptabel, wenn sie Sonderfallverzweigungen zur Laufzeit entfernen und Invarianten explizit machen. Das genaue Modell sowie seine Auswirkungen auf Synchronisierung, Lebenszyklus, Workspaces, Referenzen, Migration, Backend-Usability und Performance müssen weiterhin konzipiert und gemessen werden.
9. **Unabhängige Strukturen bleiben valide, redaktionell sichtbare Beziehungsmodi sind jedoch nicht der gewünschte Produktvertrag.** Das heutige Free-Mode-Verhalten bleibt unterstützt und ist nicht deprecated. Der empfohlene zukünftige Arbeitsablauf verbirgt die Beziehungszustände Free Mode, Connected Mode und Mixed Mode erst, nachdem der Core unabhängige Ergebnisse bewahren und Structural Identity automatisch pflegen kann.
10. **Technische Verbindung erfordert keine identischen Strukturen.** Zwei Sprachvarianten können dieselbe logische Structural Identity teilen, während eine Sprache Inhalte ergänzt, auslässt, ersetzt oder umsortiert. „Durchgehend verbunden“ bezeichnet eine gepflegte Identität, nicht zwingend gleiche Struktur oder gleiche Inhalte.
11. **Kleine Korrekturen und Tests sind Teil der Architekturarbeit.** Sie machen tatsächliche Invarianten sichtbar und verhindern, dass ein zukünftiges Modell auf unvollständigen Annahmen beruht.
12. **Synchronisierungsmetadaten und gespeicherte Werte können einander widersprechen.** In vorhandenen Daten beweist ein leerer oder fehlender `l10n_state`-Eintrag nicht, dass ein lokalisiertes Feld seinem Parent entspricht. Die aktuelle [Zustandsanreicherung im Core][cs4] behandelt einen fehlenden Feldzustand ohne Vergleich der gespeicherten Werte als `parent`. Das Backend kann das Feld daher als vererbt darstellen, obwohl sein gespeicherter Wert abweicht. Der [dbdoctor PR 98][cs5] wurde am 08.10.2026 gemergt; er repariert Metadaten in dbdoctor, nicht die Zustandsanreicherung des Core.
13. **Feldsynchronisierung besitzt heute zwei Steuerungsmodelle.** `l10n_mode=exclude` erzwingt die Synchronisierung durch TCA-Konfiguration. `allowLanguageSynchronization` stellt eine redaktionelle Wahl bereit, die in `l10n_state` gespeichert wird. Die Ausführungspipeline ist gemeinsam, Konfiguration, Zustandsermittlung und Scopes bleiben jedoch getrennt.
14. **Language All wendet den vollständigen Datensatz an.** Die aktuelle [Frontend-Auswahl bezieht `-1` ein](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/frontend/Classes/ContentObject/ContentObjectRenderer.php), und die [Overlay-Logik gibt einen solchen Datensatz unverändert zurück](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/core/Classes/Domain/Repository/PageRepository.php). Ein kompatibler erster Ersatz muss daher zunächst die Wirkung einer vollständigen gemeinsamen Datenbankzeile bewahren, bevor eine granularere Synchronisierung hinzukommt.

## Vision: vier Verantwortlichkeiten trennen

Das [T3DD26-Modell der Four Responsibilities](https://content.eric-harrer.de/t3dd26/#/four-responsibilities) ist der aktuelle konzeptionelle Bezugspunkt der Initiative:

> **Separate the responsibilities first. Then reason about possible implementations.**

Bei der Erklärung der Vision müssen die Verantwortlichkeiten in dieser Reihenfolge betrachtet werden: **Identity → Synchronization → Structure → Output**. Sie bilden eine Problem- und Verantwortungszerlegung, kein ausgewähltes Schema, keine ausgewählte API und keine Migrationsreihenfolge.

### 1. Language Identity

**Frage:** Welche menschliche Sprache und Variante repräsentiert dieser Inhalt?

**Aktuelle Kopplung:** Ein Datensatz speichert eine Site-lokale Ganzzahl. `0` bedeutet zusätzlich Default Language und `-1` bedeutet alle Sprachen. Diese zusätzlichen Bedeutungen sind keine Identitäten menschlicher Sprachen.

**Abgeleitete Anforderungen:**

- Eine Sprache muss Site-übergreifend und, soweit erforderlich, installationsübergreifend eine stabile semantische Identität besitzen.
- Eine vollständige Migration weg vom heutigen `sys_language_uid`-Vertrag
  benötigt explizite Ersatzmodelle für dessen nichtsprachliche Bedeutungen:
  `-1` als datensatzweite Language-All-Synchronisierungsabsicht sowie `0` als
  Rolle der Default Language einer Site und als heutige strukturelle Führung.
  Der zukünftige Identitätswert darf ausschließlich eine reale menschliche
  Sprache oder Sprachvariante identifizieren.
- Synthetische Anzeige- und Filterauswahlen im Backend dürfen nicht als
  fiktive Sprachidentität modelliert werden. Wenn ein Selektor seinen
  Geltungsbereich durch konkrete Sprach-IDs ausdrücken kann, einschließlich
  einer expliziten Auswahl aller verfügbaren Overlays, sollte er dafür `-1`
  nicht wiederverwenden. Vor der Entfernung dieses Platzhalters muss jeder
  heutige Core-Aufrufpfad charakterisiert werden.
- Semantische Identität darf nicht davon abhängen, ob eine Locale auf dem Applikationsserver installiert ist.
- Semantische Identität muss redaktionelle Sprachvarianten jenseits einer
  herkömmlichen Locale mit Sprach- und Landesbezug abdecken, einschließlich Varianten wie
  Leichte Sprache.
- Die Site-Konfiguration muss ihre verfügbaren Sprachen explizit auf die semantische Identität abbilden.
- Gemeinsamer Speicher, übersetzte Dateimetadaten sowie Import und Export dürfen nicht von zufällig übereinstimmenden lokalen Zahlen abhängen.

**Vision:** Die Sprache von Inhalten sollte dadurch identifizierbar sein,
welche Sprache und redaktionelle Variante sie ist, und nicht nur durch eine
Site-lokale Zahl oder herkömmliche Locale. BCP 47 ist die aktuelle Präferenz
der Initiative für diese semantische Identität.

**Offene Fragen:**

- Ist ein Tag gemäß BCP 47 der maßgebliche gespeicherte Wert, eine externe Identität, die auf einen internen Schlüssel abgebildet wird, oder Teil eines anderen Identitätsmodells?
- Wie weist jede Site ihre Rolle als Default Language einer realen semantischen
  Sprache zu, ohne `0` zu einer besonderen Sprachidentität zu machen?
- Welche Script-, Region-, Variant- und Private-Use-Subtags müssen unterstützt werden?
- Wie werden mehrdeutige Legacy-IDs und Locales migriert?
- Können zwei Datensätze mit demselben Tag bewusst unterschiedliche redaktionelle Kontexte repräsentieren?
- Wie werden Berechtigungen, Abfragen, Beziehungen und Extension-APIs ohne unsichere Big-Bang-Änderung angepasst?

BCP 47 adressiert ausschließlich semantische Identität. Es ersetzt nicht selbst
das heutige `-1`-Synchronisierungsverhalten und entscheidet nicht, welches
Structural-Identity-Modell die derzeit mit `0` gekoppelte Rolle übernimmt. Auch
ob der Tag direkt gespeichert oder auf einen internen Identifikator abgebildet
wird, bleibt offen. Der heutige Feldvertrag kann daher erst vollständig ersetzt
werden, wenn diese getrennten Verantwortlichkeiten explizite
Migrationsverträge besitzen; diese Abhängigkeit wählt ihre Implementierung
nicht aus.

### 2. Synchronization Intent

**Frage:** Welche Felder oder Datensätze müssen synchron bleiben, und wo dürfen sie voneinander abweichen?

**Aktuelle Kopplung:** Auf Feldebene erzwingt `l10n_mode=exclude` die Synchronisierung über TCA, während `allowLanguageSynchronization` der Redaktion über `l10n_state` die Wahl zwischen `parent`, `source` und `custom` ermöglicht. Auf Datensatzebene bewirkt `-1`, dass derselbe vollständige Datensatz für alle Sprachen gilt. Diese Mechanismen unterscheiden sich in Geltungsbereich, Steuerung und Lebenszyklus, während „Language All“ weiterhin als Sprachwert codiert ist.

**Abgeleitete Anforderungen:**

- Datensatzweite und feldbezogene Synchronisierung müssen explizit und voneinander unterscheidbar sein.
- Redaktionell auswählbare und konfigurationsseitig erzwungene Feldsynchronisierung müssen unterscheidbar bleiben, auch wenn sie durch ein gemeinsames TCA- und Zustandsmodell dargestellt werden.
- Der erste Ersatz für `-1` muss das vollständige Language-All-Verhalten des Datensatzes reproduzieren, bevor spätere Versionen Ausnahmen für Zielsprachen oder Felder ergänzen.
- Solange die vollständige Datensatzsynchronisierung der ersten Stufe aktiv ist, muss die datensatzweite Erzwingung Vorrang vor feldbezogenen `custom`-Entscheidungen besitzen, und die Redaktion darf keine wirkungslose Abwahlmöglichkeit erhalten.
- Die vorgesehenen Zielsprachen müssen bekannt sein.
- Redakteurinnen und Redakteure müssen verstehen, welche Werte vererbt, synchronisiert oder unabhängig sind.
- Automatisch erstellte Varianten benötigen nachvollziehbare Herkunft und Zuständigkeit.
- Aktivierung, Änderung, Loslösung und Deaktivierung müssen ein definiertes, wiederholbares Verhalten besitzen.
- Workspaces, Versionen, Beziehungen, Löschungen, Wiederherstellung und neu hinzugefügte Site Languages müssen Teil des Lebenszyklus sein.
- Migration und Reparatur müssen `l10n_state` mit gespeicherten Werten und Beziehungen abgleichen, ohne beabsichtigte manuelle Abweichungen zu überschreiben.
- Ein Ersatz für `l10n_mode=exclude` muss dessen Verhalten ohne redaktionelle Abwahlmöglichkeit für betroffene Übersetzungen bewahren und explizite Migrations- und Kompatibilitätsregeln bereitstellen.
- Materialisierte Zielrecords benötigen eigene Identitäts- und Lebenszyklusmetadaten, auch wenn jeder verhaltensrelevante Wert der Quelle erzwungen bleibt.
- Während der Migration bleibt ein tatsächlich im Sprachfeld eines Datensatzes
  gespeichertes `-1` die bewusste Language-All-Auswahl der Redaktion und damit
  eine datensatzweite Synchronisierungsabsicht. Synthetische Auswahlzustände
  des Backends müssen getrennt dargestellt werden, vorzugsweise durch die
  explizite Menge ausgewählter konkreter Sprachen; diese Zielrichtung erfordert
  weiterhin eine Prüfung jedes einzelnen Aufrufpfads.

**Vision:** „Einmal für mehrere Sprachen pflegen“ sollte als Synchronization Intent für konkrete Sprachvarianten dargestellt werden, nicht als fiktive Sprachidentität.

**Offene Fragen:**

- Welcher führende Datensatz und welcher Site- beziehungsweise Shared-Storage-Geltungsbereich bestimmen die Zielsprachen für den ersten Boolean mit allen Zielen?
- Welche Felder reproduzieren die vollständige Language-All-Wirkung, und welche Felder für Zielidentität oder systemseitige Verwaltung müssen abweichen?
- Wenn bei der Aktivierung bereits Zieldatensätze oder manuelle Übersetzungen
  vorhanden sind: Werden sie in die Synchronisierungsgruppe übernommen,
  abgeglichen, überschrieben, ersetzt oder unabhängig beibehalten, und wer darf
  diesen Übergang autorisieren?
- Sind automatisch erstellte oder übernommene Zieldatensätze direkt
  bearbeitbar? Falls ja, welche lokalen Änderungen sind erlaubt und wie wirken
  sie mit erzwungener Synchronisierung zusammen? Falls nein, wie erkennt die
  Redaktion sie als synchronisierte Abbilder des führenden Datensatzes?
- Wenn die datensatzweite Synchronisierung deaktiviert wird: Werden
  materialisierte Ziele beibehalten und losgelöst, deaktiviert, als gelöscht
  markiert oder entfernt, und wie bleiben ihre Herkunft und ihr bisheriger
  Synchronisierungszustand erhalten, falls sie unabhängig werden?
- Wird eine später hinzugefügte Sprache automatisch Mitglied einer bestehenden Synchronisierungsgruppe?
- Wie werden fehlende oder inkonsistente `l10n_state`-Einträge eingeordnet, wenn skalare Werte oder Beziehungen abweichen?
- Soll ein neues `config.behaviour.enforceLanguageSynchronization` den erzwungenen Zustand über `l10n_state` abbilden und `l10n_mode=exclude` ersetzen?
- Wie werden `prefixLangTitle`, das Standardverhalten und die Extension-Kompatibilität behandelt, wenn `l10n_mode` entfernt wird?

Ein Boolean-Flag für alle Sprachen ist das nützliche minimale Kompatibilitätsmodell: In der ersten Stufe sollte es alle konfigurierten Ziele ohne feldbezogene Abwahlmöglichkeit bedeuten und damit die Wirkung des vollständigen `-1`-Datensatzes nachbilden. Eine naheliegende darauf aufbauende Feature-Option ist, den Boolean durch ein datensatzweites Multi-Select der Synchronisierungs-Zielsprachen zu ersetzen oder zu erweitern. Derselbe vollständige Synchronisierungsprozess würde Zielrecords dann nur in den ausgewählten Sprachen anlegen und pflegen. Ein [vorläufiger Vorschlag aus einer Sitzung][cs13] bezeichnete das Datensatzfeld als `language_sync` und seine TCA-Referenz als `ctrl.languageSyncField`; weder Name noch API sind ausgewählt. Ob und wann das Multi-Select eingeführt wird, muss entschieden werden, und feldbezogene Ausnahmen sind eine eigenständige mögliche Erweiterung. Weder das Flag noch das Multi-Select bildet bereits einen vollständigen Lebenszyklus oder eine beschlossene TCA-API.

**Möglicher technischer Wiederverwendungspfad für die erste Stufe mit `-1`-Parität:**

1. Eine datensatzweite Synchronisierungsabsicht an einem führenden Datensatz wählt zunächst jede Zielsprache in ihrem definierten Site- oder Storage-Geltungsbereich aus.
2. Der DataHandler stellt sicher, dass in jeder Zielsprache genau ein verbundener Zieldatensatz vorhanden ist. Das bestehende [`localize()`][cs2] validiert bereits die Ziel-Site-Language, verhindert Duplikate und bereitet Sprache, Parent und Quelle vor; [`localizeRecord()`][cs2] legt den Zieldatensatz durch eine verschachtelte DataHandler-Operation an.
3. Jeder Zieldatensatz erhält in `l10n_state` einen erzwungenen Zustand oder eine gleichwertige neue Zustandsrepräsentation für jedes Feld, das zur Reproduktion des vollständigen Quelldatensatzes erforderlich ist. Der bestehende DataMapProcessor kann anschließend seine [Propagation vom Parent zu abhängigen Datensätzen für skalare Werte und Beziehungen][cs3] wiederverwenden.
4. Spätere Änderungen durchlaufen dieselbe Abhängigkeitspipeline. Nachdem die funktionale Parität nachgewiesen ist, kann derselbe Vertrag ein eigenständig zu entscheidendes Multi-Select der Zielsprachen unterstützen und dabei die Erzwingung aller Felder innerhalb jedes ausgewählten Ziels beibehalten.

„Jedes Feld“ bezeichnet jeden Wert, den der aktuelle `-1`-Datensatz absichtlich identisch bereitstellt, einschließlich Ausgabe- und Strukturwerten. Es bedeutet nicht, dass erzeugte Datensätze dieselben Werte für `uid`, `sys_language_uid`, `l10n_parent`, `l10n_source`, `l10n_state` oder Workspace- und Versionsmetadaten besitzen. Diese Felder stellen Identität und Lebenszyklus jedes Zieldatensatzes her. Die genaue Menge der vom Core verwalteten Ausnahmen muss anhand des Schemas definiert und in Tests charakterisiert werden.

Dies ist ein möglicher Wiederverwendungspfad und keine unmittelbar einsetzbare Konfigurationsänderung. Die datensatzweite Absicht müsste für jedes zur Parität relevante Feld ihrer Ziele wirksame `enforceLanguageSynchronization`-Semantik ableiten. `l10n_mode=exclude` statisch an jedem TCA-Feld zu deklarieren, würde auch nicht synchronisierte Datensätze betreffen. Der aktuelle DataMapProcessor [überspringt `-1`-Datensätze und erfordert verbundene Zieldatensätze][cs3]. Der neue datensatzweite Pfad muss Ziele daher auflösen, sie anlegen oder abgleichen, die vollständige erzwungene Feldmenge ableiten und die Aktivierung atomar sowie idempotent ausführen. Eine aktuelle `-1`-Quelle muss zunächst einem gültigen führenden Datensatz zugeordnet oder über einen neuen Anlagepfad behandelt werden, weil das bestehende `localize()` einen verbundenen Parent herstellt, wenn die Quelle ein Default-Language-Datensatz ist.

Beim Multi-Select kann das Hinzufügen einer Sprache dieselbe Operation „Ziel sicherstellen, dann alle Felder erzwingen“ wiederverwenden. Für das Entfernen einer Sprache ist eine explizite Lebenszyklusentscheidung erforderlich: den erzeugten Datensatz behalten und lösen, deaktivieren, als gelöscht markieren oder entfernen. Auch die gespeicherte Zielidentität muss Site-übergreifend aussagekräftig bleiben; heutige Site-lokale numerische IDs reichen für einen Shared-Storage-Vertrag nicht aus. Deshalb ist das Multi-Select eine konkrete Feature-Option mit Entscheidungsbedarf und weder eine implementierte Felddefinition noch ein festgelegter nächster Schritt.

Eine eigenständige mögliche Konsolidierung auf Feldebene ist `enforceLanguageSynchronization` neben `allowLanguageSynchronization` auf derselben `config.behaviour`-Ebene. Der erzwungene Zustand könnte dann über `l10n_state` dargestellt werden, sodass `l10n_mode=exclude` und dessen separater Scope zur Feldauswahl entfallen könnten. Dies wurde von der Initiative vorgeschlagen, ist aber weder implementiert noch ausgewählt. Die genaue Zustandsdarstellung sowie der Migrations- und Kompatibilitätsvertrag sind offen. Der Ansatz darf nicht mit dem getrennten datensatzweiten Ersatz für `-1` gleichgesetzt werden.

### 3. Structural Identity

**Frage:** Welche Datensätze repräsentieren in verschiedenen Sprachen dieselbe logische Inhaltsposition?

Eine logische Inhaltsposition ist der gemeinsame Ort oder die gemeinsame Funktion einer Seite, eines Inhaltselements oder eines anderen lokalisierbaren Datensatzes. Sie ist nicht notwendigerweise der Datensatz, dessen Text als Übersetzungsquelle verwendet wurde.

**Aktuelle Kopplung:** Im Connected Mode ist der Datensatz mit
`sys_language_uid = 0` zugleich sichtbarer Inhalt in einer realen Sprache und
struktureller Parent beziehungsweise strukturelle Führung für verbundene
Varianten. Seine Sprachidentität, seine Rolle als Default Language der Site und
seine strukturelle Verantwortung sind damit gekoppelt. Free Mode entfernt die
Parent-Beziehung. Mixed Mode kombiniert beide Zustände auf einer Seite. Der
Core leitet diese Bezeichnungen aus `l18n_parent` ab, zeigt sie im Modul
„Layout“ an und verhindert normalerweise die direkte Inhaltsanlage in einer
Zielspalte im Connected Mode. Eine lokale Ergänzung erfordert deshalb entweder
einen künstlichen Datensatz der Default Language oder einen unabhängigen
Datensatz, der die gemeinsame Beziehung verliert.

**Abgeleitete Anforderungen:**

- TYPO3 muss die weitgehend gemeinsame Struktur erhalten und zugleich explizite sprachspezifische Ergänzungen, Auslassungen, Ersetzungen oder Umordnungen ermöglichen können.
- Eine strukturelle Beziehung darf keinen bedeutungslosen sichtbaren Inhalt in einer anderen Sprache erfordern.
- Redakteurinnen und Redakteure sollten Inhalte direkt in der Sprache anlegen können, in der sie benötigt werden, ohne entscheiden zu müssen, ob diese Sprache oder Seite strukturell Free, Connected oder Mixed ist.
- Der Core sollte die erforderliche Structural Identity automatisch anlegen und pflegen, auch für Inhalte, die nur in einer realen Sprache vorhanden sind.
- Eine gepflegte strukturelle Verbindung muss weiterhin sprachspezifische Ergänzungen, Auslassungen, Ersetzungen und Sortierungen ermöglichen.
- Das System sollte die Integrität der Beziehungen verwalten und doppelte oder unmögliche Parent-Zuordnungen verhindern.
- Inhaltsquelle, struktureller Parent und aktueller Bearbeitungskontext müssen voneinander getrennt bleiben.
- Strukturelle Referenz und Führung müssen unabhängig davon modelliert werden,
  welche reale Sprache als Default Language der Site konfiguriert ist; keine
  reale Ausgabesprache darf allein deshalb strukturell privilegiert sein.
- Das Modell muss Seiten, Inhalte und andere lokalisierbare Datensätze abdecken und zugleich notwendige Unterschiede zwischen Datensatztypen erhalten.
- Redakteurinnen und Redakteure benötigen eine klare Übersicht darüber, welche Sprachvarianten vorhanden sind, sowie effiziente Abläufe zum Anlegen von Varianten für Datensätze jenseits von Seiten und Inhalten, einschließlich Dateimetadaten.
- Die Modusunterscheidung darf erst aus der normalen redaktionellen UX verschwinden, nachdem Anlage, Migration, Berechtigungen, Löschung, Wiederherstellung und Workspace-Verhalten die heutigen validen Ergebnisse bewahren.

**Vision:** Die Redaktion wählt Sprache und beabsichtigte Inhaltsoperation. Der Core hält die technische Verbindung zu derselben logischen Position aufrecht und erlaubt zugleich jeder realen Sprache eine eigene sichtbare Struktur. Strukturelle Beziehungen sollten „mostly connected, selectively different“ ohne künstliche sichtbare Partner in der Default Language oder einen unbeabsichtigten Verlust der Verbindung unterstützen.

„Technisch verbunden“ bedeutet nicht, dass jede Sprache dieselben Datensätze in derselben Reihenfolge ausgeben muss. Es bedeutet, dass der Core eine explizite sprachübergreifende Identität beibehält, auch wenn eine Sprache Inhalte auslässt, ergänzt, ersetzt oder umsortiert. Ein redaktionell vollständig unabhängiges Ergebnis bleibt damit möglich, ohne eine fehlende Parent-Beziehung als Speichervertrag zu verwenden.

**Empfehlung für die redaktionelle Oberfläche:** Die Unterscheidung zwischen Free Mode, Connected Mode und Mixed Mode soll aus dem normalen Arbeitsablauf im Modul „Layout“ entfernt werden, sobald der Core diesen Vertrag gewährleisten kann. Dies ist eine Produkt- und UI-Empfehlung mit architektonischen Voraussetzungen. Sie besagt weder, dass bestehende Free-Mode-Daten bereits sicher konvertiert werden können, noch dass unabhängige Strukturen entfallen sollen.

**Editing Language:** Die Redaktion soll aus einer verständlichen Inhaltssprache
arbeiten, unabhängig von Backend-Oberflächensprache und Site-Default. Der
Prototyp merkt sie sich je Site. Der am 30.10.2026 geprüfte Code hält sie im
Vergleich sichtbar, bietet eine Aktion für fehlende Seitenübersetzungen und
schließt ihre Abwahl aus; die Toolbar ist der normale Umschalter.
Auswahlpersistenz und ein unabhängig gemerkter vorübergehender Ansichtskontext
benötigen weiterhin redaktionelle Validierung. Dies sind Prototypfähigkeiten
und Ziele, kein implementiertes Core-Verhalten.

#### Aktuelle strukturelle Präferenz und die zwei Bedeutungen von Shadow Record

In den Diskussionen wurde „Shadow Record“ für zwei wesentlich verschiedene Repräsentationen verwendet:

- Ein **Language-Layer-Shadow** ist ein Platzhalter innerhalb einer konkreten Sprache. Er vervollständigt die Struktur dieser Sprache, auch wenn die Position dort keinen sichtbaren Inhalt besitzt.
- Ein **Structural Shadow** ist ein einzelner inhaltsloser Datensatz in einer gemeinsamen verborgenen Strukturebene. Reale Sprachdatensätze verbinden sich mit ihm als gemeinsamer Structural Identity; er wird nicht in jede Sprache dupliziert.

Eine Vermischung beider Begriffe würde den zentralen Trade-off verdecken. Der
Vergleich behandelt zugleich eine Migrationsabhängigkeit: Wenn `0` einer realen
Sprache keine implizite strukturelle Führung mehr gibt, muss ein explizites
Structural-Identity-Modell diese Referenz und Verantwortung übernehmen. Die
Initiative hat zwei mögliche Wege diskutiert; keiner von ihnen wird durch die
Migration der Language Identity ausgewählt:

| Weg | Repräsentation | Nutzen | Wesentliches Risiko oder offene Arbeit | Aktuelle Bewertung |
|---|---|---|---|---|
| **1. Vollständige Struktur in jeder Sprache** | Jede Sprache enthält jede strukturelle Position und könnte grundsätzlich die strukturelle Führung übernehmen. Der Core erzeugt Language-Layer-Shadows, wenn eine Position in dieser Sprache keinen sichtbaren Inhalt besitzt. | Jede Sprachebene ist strukturell eigenständig vollständig und kann eine lokale Sortierung ausdrücken. | Jede lokale Abweichung muss in andere Language Layers projiziert werden. Eine höhere Datensatzmenge ist akzeptabel, wenn sie die Verarbeitung vereinfacht; universelle Shadows können jedoch zugleich Synchronisierungs- und Lebenszykluslogik, Workspace-Versionen, Referenzen und die sichtbare Informationsdichte im Modul „Layout“ erhöhen. Selbst eine kleine Umordnung kann mehrere erzeugte Platzhalter erfordern; Gesamtkomplexität und genauer Multiplikator sind modellabhängig und wurden nicht gemessen. | **Diskutiert, im Vergleich zu einer gemeinsamen Ebene derzeit jedoch nicht bevorzugt, solange keine größere Gesamtvereinfachung nachgewiesen ist. Weder widerlegt noch formal verworfen.** |
| **2. Gemeinsame verborgene Struktur plus reale Language Layers** | Die Rollen der heutigen Default Language werden getrennt. Eine inhaltslose sprachneutrale Strukturebene speichert jede logische Position; die heutigen Inhalte der Default Language wechseln in eine eigene reale Sprachebene wie jede andere Ausgabesprache. Der Core erzeugt einen Structural Shadow, wenn eine Sprache eine neue Position einführt, und jede reale Variante verbindet sich mit dieser gemeinsamen Position. | Ein sprachübergreifender Bezugspunkt ohne universelle Language-Layer-Shadows; keine reale Ausgabesprache muss die gesamte Struktur führen. | Die genaue Entität und ihr Identifikator, die Migration heutiger Inhalte der Default Language, sprachspezifische Sortierung und Abwesenheit, Berechtigungen, APIs, Workspaces, Referenzen sowie das Verbergen der Strukturebene in Backend und Frontend müssen konzipiert und getestet werden. | **Aktuelle Präferenz für die Untersuchung. Weiterhin eine Hypothese und keine ausgewählte oder implementierte Core-Architektur.** |

Der zweite Weg sollte in der normalen Redaktion und Frontend-Ausgabe unsichtbar bleiben. „Verborgen“ ist Bestandteil des angestrebten Produktverhaltens und keine Aussage über den aktuellen Core. Eine gemeinsame Identität löst auch die lokale Sortierung nicht von selbst: Das Modell benötigt weiterhin einen expliziten sprachspezifischen Vertrag für Platzierung, Sortierung oder Abweichungen.

**Offene Fragen:**

- Welcher genaue Datensatz oder welche Entität trägt strukturelle Referenz und
  Führung, wenn keine reale Ausgabesprache privilegiert ist?
- Führt eine gemeinsame Struktur eine getrennte Entität ein, nutzt sie eine
  andere Repräsentation oder benötigt sie eine vorübergehende
  Kompatibilitätsabbildung, ohne `0` als semantische Identität einer
  menschlichen Sprache beizubehalten?
- Wie werden Sortierung, Verschiebungen, lokale Ergänzungen, Auslassungen und Ersetzungen je Sprache um eine gemeinsame Identität dargestellt?
- Welche strukturellen Datensätze sind für Redakteurinnen und Redakteure, APIs, Referenzen und Workspaces sichtbar?
- Wann kann ein unabhängig erstellter Datensatz später sicher mit einer vorhandenen Struktur verbunden werden?
- Welche Migrations- und Lebenszyklusgarantien sind Voraussetzung dafür, dass Free Mode, Connected Mode und Mixed Mode in der normalen Oberfläche nicht mehr angezeigt werden müssen?
- Wie werden vorhandene Datensätze aus Free Mode und Mixed Mode migriert, ohne ihr unabhängiges Ergebnis zu verlieren?
- Wann darf eine Übersetzungsquelle wechseln oder nach Löschung zurückgesetzt werden? Der Seiten-Wizard des Core ermittelt Quellen aus vorhandenen Referenzen, nicht aus einer unveränderlichen ersten Auswahl; der beobachtete Löschfall benötigt weiterhin Charakterisierung.

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

Die statische Prüfung vom 30.10.2026 bestätigt inzwischen die Kontextmenü-Aktion
und den Wegfall des redundanten Labels im Prototyp. Dies ist keine neue
Laufzeitvalidierung oder Übernahme des vollständigen Modells.

**Offene Fragen:**

- Welcher Zustand beendet Fallback für eine einzelne Position?
- Ist eine deaktivierte Übersetzung ein geeignetes Stoppsignal, oder ist eine separate Absicht erforderlich?
- Sollte normaler Fallback einen optionalen abschließenden Default-Schritt anbieten, während `strict` auf eine Sprache beschränkt bleibt?
- In welchem Geltungsbereich darf die Ausgabeabsicht konfiguriert werden: Site Language, Seite, Strukturposition, Datensatz oder Feld?
- Wie wird ein konsistentes Verhalten für Seiten, Inhalte, Extbase und eigene Abfragen sichergestellt?

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
| Vollständige Language Layers | Jede strukturelle Position in jeder relevanten Sprache materialisieren und bei fehlendem Inhalt Language-Layer-Shadows verwenden. | Jede Sprache ist strukturell eigenständig vollständig und kann eine lokale Sortierung tragen. | Datensatzwachstum ist akzeptabel, wenn es die Verarbeitung vereinfacht; universelle Shadows können jedoch zugleich Synchronisierungs- und Lebenszykluslogik, die Informationsdichte im Modul „Layout“, Workspace-Versionen, Referenzen und Migration verstärken. Gesamtvereinfachung und tatsächlicher Datensatzmultiplikator müssen gemessen werden. | **Diskutierte Richtung; derzeit nicht bevorzugt, solange keine größere Gesamtvereinfachung nachgewiesen ist, und nicht ausgewählt.** |
| Gemeinsame verborgene neutrale Strukturebene | Gemeinsame Structural Identity von realen Ausgabesprachen trennen, heutige Default-Ausgabeinhalte in eine eigene reale Sprachebene migrieren und inhaltslose Structural Shadows als gemeinsame Anker anlegen. | Keine reale Sprache muss die strukturelle Führung übernehmen; weniger universelle Shadow-Duplikation und ein sprachübergreifender Bezugspunkt. | Führt eine Abstraktion ein, die jeder Bearbeitungs-, Abfrage-, Beziehungs-, Berechtigungs- und Workspace-Pfad verstehen muss; lokale Sortierung und explizite Abwesenheit benötigen weiterhin einen Vertrag. | **Aktuelle Präferenz für die Untersuchung; weiterhin eine nicht ausgewählte Hypothese.** |
| Begrenzter hybrider Ansatz | Eine gemeinsame Structural Identity beibehalten und Sprachdatensätze nur materialisieren, wenn Inhalte oder explizite Abwesenheit sie erfordern. | Könnte explizite Struktur mit begrenztem Datenwachstum verbinden. | Mehr Zustände und Übergangsregeln; analytische Option, die von der Initiative noch nicht validiert wurde. | **Analytische Option; keine eigenständige Präferenz der Initiative.** |
| Editing Language | Redakteurinnen und Redakteure die Inhaltssprache auswählen lassen, von der aus sie arbeiten, und diese als primären Backend-Kontext verwenden. | Entfernt irrelevante Default-Language-Texte aus dem Arbeitsablauf und unterstützt Quellen, die nicht der Default Language entsprechen. | Page Tree, Module „Layout“ und „Records“, Berechtigungen, Sortierung sowie Verhalten von Quelle und Herkunft. | **Bevorzugte Produktbeschreibung; Demonstrator vorhanden, Validierung offen.** |
| Explizite Absicht bei Abwesenheit | Darstellen, ob Fallback für eine strukturelle Position fortgesetzt oder beendet werden soll. | Macht regionale Auslassung vorhersehbar. | Abwärtskompatibilität, UX und konsistente Frontend-Auswertung. | **Abgeleitete Anforderung; Repräsentation offen.** |

Ein generisches multidimensionales Modell für Sprache, Land, Markt, Marke oder Zielgruppe ist eine angrenzende Zukunftsperspektive. Es könnte später helfen, Sprache von anderen Inhaltskontexten zu trennen, ist aber nicht die unmittelbare Antwort der Initiative auf die vier Verantwortlichkeiten.

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
| [Gerrit 95170][cs20], gemergt am 10.08.2026 | 15 und [14.3 als Gerrit 95199][cs21] sind gemergt. | Korrigiert Vergleichsansichten, die Connected- und Free-Mode-Sprachen kombinieren: Connected-Mode-Inhalte bilden Vergleichszeilen, während jede Free-Mode-Sprache unabhängig dargestellt wird, auch wenn die Default Language keine Inhalte enthält. | Eine klar abgegrenzte Zwischenkorrektur für die aktuellen Modi. Sie bestimmt weder das zukünftige Bearbeitungs- noch das Strukturmodell. |
| [Gerrit 95178](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95178), gemergt am 10.08.2026 | 15 und [14.3 als Gerrit 95202](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95202) sind gemergt. | Hält beim Scrollen durch eine lange Vergleichsansicht im Modul „Layout“ Sprachname, Flag und Übersetzungsmodus sichtbar. | Verbessert die redaktionelle Orientierung in der aktuellen Oberfläche. Der Patch ist ausdrücklich eine Zwischenlösung und ändert oder bestimmt kein zukünftiges Strukturmodell. |
| [Gerrit 95619][cs22], gemergt am 06.10.2026 | 15 und [14.3 als Gerrit 96412](https://review.typo3.org/c/Packages/TYPO3.CMS/+/96412) sind gemergt. | Benennt gespeicherte und synthetische All-Languages-Werte durch `LanguageMarker::ALL_LANGUAGES`. | Nur interne Vorbereitung der Benennung: Die `-1`-Semantik bleibt; keine Ersatz-API oder Architektur ist übernommen. |
| [Gerrit 87595](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87595), gemergt am 17.10.2026 | 15; [Gerrit 96783](https://review.typo3.org/c/Packages/TYPO3.CMS/+/96783) für 14.3 am 18.10.2026 gemergt. | Gleicht eigene Inline-/File-Kinder nach Beziehungsauflösung an die gespeicherte Parent-Sprache an. | Umfassender als der ersetzte Vorschlag 95476; umfasst vorhandene Geschwister bei relevanten Parent-Operationen, keine globale Reparatur. |
| [Gerrit 94673](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94673), gemergt am 20.10.2026 | 15; [Gerrit 96935](https://review.typo3.org/c/Packages/TYPO3.CMS/+/96935) für 14.3 gemergt. | Stellt das Kontextmenü am Seiten-Icon im Sprachvergleich wieder her. | Opt-in im Renderer, keine Prototyp-Sammelaktion oder neue Berechtigung. |
| [Gerrit 97053](https://review.typo3.org/c/Packages/TYPO3.CMS/+/97053), gemergt am 30.10.2026 | 15; [Gerrit 97225](https://review.typo3.org/c/Packages/TYPO3.CMS/+/97225) für 14.3 gemergt. | Bevorzugt Sprache `0` unabhängig von der Konfigurationsreihenfolge. | Ohne `0` bleibt der Fallback auf die erste Sprache; keine beschlossene verborgene Strukturebene. |

Die [Test-Extension der Initiative](https://github.com/t3thi/translation-handling) bietet reproduzierbare Übersetzungs-, Fallback- und Beziehungsszenarien. Sie wurde 2025 mit IRRE-Fällen wiederbelebt: Forschungsinfrastruktur, kein Beleg für geändertes Core-Verhalten.

Bevorzugtes Vorgehen: reale Fehler reproduzieren, den verantwortlichen Vertrag identifizieren, Grenzen durch Tests definieren und eng begrenzt korrigieren.

## Language-All-Marker: Geltungsbereich und Review-Grenze

[Gerrit 95619][cs22] und sein
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
[Gerrit 92267][cs18] wurde nach der Marker-Arbeit am 07.10.2026 aufgegeben. Es bleibt historisches Inventar, kein offener Patch und keine Ersatzimplementierung.

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

Gerrit-Changes samt Change-ID-Backports, Forge-Issues und dbdoctor-PRs wurden
am 30.10.2026 geprüft. WIP hat Vorrang; sonst erfordern negative Stimmen,
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
| [Gerrit 92777](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92777) | TYPO3 v15; 14.3 vorgesehen; kein Backport gefunden. | Patch Set 10; zwei Code-Review `+1`; CI `+1`; 1 ungelöster Kommentar. | Nein | Beschränkt kopierte Free-Mode-Datensätze auf im Zielkontext verfügbare Sprachen. Dies verbessert die Integrität des aktuellen Modells, ohne ein zukünftiges Strukturmodell auszuwählen. |
| [Gerrit 93063](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93063) | TYPO3 v15; 14.3 beabsichtigt, kein Backport gefunden. | Patch Set 8; CI `+1`; keine aktuelle Code-Review-Stimme oder ungelösten Kommentare. | **Ja** | Warnt vor verwaisten Übersetzungen, ohne Identität zu reparieren oder neu zu gestalten; Rebase erforderlich. |

### Review-positiv und mergefähig

| Patch | Ziel-Release-Linien und Backports | Aktueller Review-Stand | Merge-Konflikt | Geltungsbereich und Abgrenzung |
|---|---|---|---|---|
| [Forge 110008](https://forge.typo3.org/issues/110008) und [Gerrit 94510][cs19] | TYPO3 v15; 14.3 beabsichtigt, kein Backport gefunden. | Patch Set 11; Code-Review `+1`; CI `+1`; keine ungelösten Kommentare. | Nein | Begrenzt Fallback unter Strict. Nicht gemergt; die Regression bleibt eine offene Core-Korrektur. Der aktuelle Footer nennt 13.4 nicht mehr. |

### Review ausstehend

| Patch | Ziel-Release-Linien und Backports | Aktueller Review-Stand | Merge-Konflikt | Geltungsbereich und Abgrenzung |
|---|---|---|---|---|
| [Gerrit 93028](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93028) | TYPO3 v15; 14.3 vorgesehen; kein Backport gefunden. | Patch Set 6; CI `+1`; keine aktuelle Code-Review-Stimme und kein ungelöster Kommentar. | Nein | Wendet die angeforderte Sprache des Parents auf neu erstellte Relation Child Records an und lässt bereits lokalisierte Child Records unverändert. |
| [Gerrit 95038](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95038) | TYPO3 v15. | Patch Set 2; CI `+1`; keine aktuelle Code-Review-Stimme und kein ungelöster Kommentar. | Nein | Hält `pages.doktype` mittels `l10n_mode=exclude` an der Default-Language-Seite ausgerichtet und stellt für bereits abweichende Übersetzungen einen Upgrade Wizard bereit. Dies erzwingt eine Invariante des aktuellen Modells und wählt kein zukünftiges Strukturmodell aus. |
| [Gerrit 93752](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93752) | TYPO3 v15; 14.3 beabsichtigt, kein Backport gefunden. | Patch Set 4; CI `+1`; keine aktuelle Code-Review-Stimme oder ungelösten Kommentare. | Nein | Überspringt Overlays beim Kopieren in eine Free-Mode-Sprache; inzwischen mergefähig, aber noch nicht positiv gereviewt oder gemergt. |

### Abgelehnt oder ersetzt

| Patch | Ziel-Release-Linien und Backports | Offizieller Stand | Merge-Konflikt | Begründung |
|---|---|---|---|---|
| [Gerrit 92585](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92585) | TYPO3 v15; TYPO3 14.3 war genannt, aber es existiert kein Backport-Change. | Am 07.08.2026 aufgegeben. | Nicht anwendbar | Die eng begrenzte Korrektur der Free-Mode-Darstellung wurde im gemergten [TYPO3-v15-Change 95170][cs20] und [TYPO3-14.3-Backport 95199][cs21] weiterentwickelt. |
| [Gerrit 94917](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94917) | TYPO3 v15; kein Backport-Branch war genannt und es existiert kein Backport-Change. | Am 27.08.2026 aufgegeben. | Nicht anwendbar | Die überlappende Korrektur der Vergleichsdarstellung für Free Mode und Mixed Mode war bereits zur Ersetzung durch den gemergten [TYPO3-v15-Change 95170][cs20] und den [TYPO3-14.3-Backport 95199][cs21] vorgeschlagen worden. Change 94917 selbst wurde nicht gemergt. |
| [Gerrit 84338](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84338) | TYPO3 v15. | Am 23.10.2026 aufgegeben. | Nicht anwendbar | Konfigurierbare Default-Language-IDs wurden wegen weitreichender `0`-Annahmen aufgegeben. Der Autor bevorzugt die Untersuchung des Struktur-Layer-PoC; dies ist keine Core-Übernahme. |
| [Gerrit 92267][cs18] | TYPO3 v15. | Am 07.10.2026 aufgegeben. | Nicht anwendbar | Früheres Annotationsinventar; 95619/96412 liefern stattdessen den begrenzten Marker. Keine Test-Suite oder semantische Ablösung. |
| [Gerrit 95476](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95476) | Vorschlag für TYPO3 v15/14.3. | Am 23.10.2026 aufgegeben. | Nicht anwendbar | Ersetzt durch 87595/96783 mit dem oben beschriebenen umfassenderen Child-Sprachabgleich. |

### Unterstützende Patches und Forschung ohne Patch

| Arbeit | Aktueller Stand | Merge-Konflikt | Bedeutung |
|---|---|---|---|
| [dbdoctor PR 98][cs5] | Am 08.10.2026 gemergt. | Nicht anwendbar | Repariert abweichenden `l10n_state`, indem unterschiedliche gespeicherte Werte als `custom` markiert werden; dbdoctor-Werkzeug, keine geänderte Zustandsanreicherung im Core. |
| [dbdoctor PR 171](https://github.com/lolli42/dbdoctor/pull/171) | Am 08.10.2026 ohne Merge geschlossen; der Abschlusskommentar beschreibt aufgeteilte Folgearbeit. | Nicht anwendbar | Der breite Cleanup-Entwurf ist nicht gemergt. Generisches Löschen bei fehlender Seitenübersetzung kann valide Extension-Daten entfernen; engerer Cleanup muss Site-spezifisch bleiben. |
| [Forge 110497](https://forge.typo3.org/issues/110497) und [Forge 110498](https://forge.typo3.org/issues/110498) | Beide Closed. | Nicht anwendbar | Die Meldungen zur fehlenden Child-Sprache sind über die Aufgabe von 95476 mit dem Ersatz 87595/96783 verknüpft. Dies belegt eine gelieferte Korrektur, nicht den exakt regressionsauslösenden Commit. |

## Kritische Ausrichtung an der Vision

Die Vision ist ein Bewertungsrahmen und kein Grund, jede Teillösung abzulehnen.

| Änderung oder Ansatz | Innerhalb des Geltungsbereichs gelöstes Problem | Bewertung anhand der vier Verantwortlichkeiten |
|---|---|---|
| [Eigene `colPos`- und `CType`-Werte für Connected Translations deaktivieren](https://review.typo3.org/c/Packages/TYPO3.CMS/+/85978), für TYPO3 v13 gemergt | Schützt strukturelle Konsistenz für verbundene Inhalte und Container. | Für verbundene Strukturen sinnvoll. Die Änderung entfernte zugleich einen Workaround, mit dem lokale Abwesenheit ausgedrückt wurde. Dies zeigt, weshalb Structural Identity und Output Policy jeweils einen eigenen expliziten Mechanismus benötigen. |
| [Fallback Chains beim Record Overlay berücksichtigen](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83169), für TYPO3 v14 gemergt, und der gemergte [TYPO3-13.4-Backport](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88828); der [Fix zur Strict-Regression][cs19] ist für TYPO3 v15 offen, während die genannten Backport-Changes für TYPO3 14.3 noch nicht existieren | Korrigierte reales Fallback-Verhalten, machte aber zugleich eine Regression sichtbar, wenn ein Datensatz in der angeforderten Sprache unter `strict` verborgen ist. | Mit der Vision vereinbar, wenn die Änderung auf den Fallback-Modus beschränkt bleibt. Der aktive Fix bestätigt, dass sich `strict` nicht implizit wie Fallback verhalten darf; Patch Set 11 besitzt positives Code-Review und CI, keine ungelösten Kommentare und ist mergefähig, aber nicht gemergt. |
| Korrekturen am Vergleich in Free Mode und Mixed Mode | Machen unabhängige und verbundene Inhalte im aktuellen Modul „Layout“ sichtbar und richten sie aus. | Wertvolle Arbeit an der aktuellen UX. Sie erhält valide Unabhängigkeit und verdeutlicht zugleich strukturelle Beziehungen; sie muss nicht auf ein neues Datenmodell warten. |
| MM-Kontext-Vorschlag | Reduziert Mehrdeutigkeit von Beziehungen über Sprachen und Workspaces hinweg. | Ein sinnvolles vorbereitendes Modell, sofern Migration sowie Extbase- und DataHandler-Verhalten konsistent bleiben. Es darf nicht mit der abschließenden semantischen Identität gleichgesetzt werden. |
| Explizite Synchronisierung für alle Sprachen | Ersetzt eine gemeinsame `-1`-Datenbankzeile durch konkrete zielsprachliche Datensätze, deren für die Parität relevante Felder vollständig erzwungen bleiben. | Grundsätzlich klar an der Vision ausgerichtet. Die erste Stufe sollte das Verhalten des vollständigen Datensatzes ohne redaktionelle Abwahlmöglichkeit bewahren; Granularität folgt später. Der Ansatz wird unsicher, wenn Zielanlage, Lebenszyklus, Herkunft, Konflikte und Migration nicht definiert sind. |
| Multi-Select der Zielsprachen | Beschränkt denselben Prozess zur Synchronisierung des vollständigen Datensatzes auf ausgewählte Zielsprachen. | Eine naheliegende Erweiterung nach der Parität, aber kein verbindlich festgelegtes nächstes Feature. Sie bleibt ausgerichtet, wenn Zielidentität und Semantik bei Abwahl explizit sind. |
| Feldbezogenes `enforceLanguageSynchronization` | Könnte `l10n_mode=exclude` ersetzen und dabei konfigurationsseitig erzwungene Synchronisierung erhalten. | An expliziter Synchronization Intent ausgerichtet, wenn erzwungene und redaktionell auswählbare Zustände unterscheidbar bleiben. Der aktuelle Core verwendet bereits eine gemeinsame Ausführungspipeline; der Gewinn läge in der Konsolidierung von Konfiguration, Zustandsermittlung und Scopes. Migration und Kompatibilität sind nicht entschieden. |
| Arbeitsablauf ohne redaktionelle Moduswahl | Entfernt die Notwendigkeit, Free Mode, Connected Mode oder Mixed Mode zu wählen, wenn die tatsächliche Absicht darin besteht, in einer Sprache zu arbeiten. | Als Produktanforderung klar ausgerichtet, sobald der Core die Identität pflegt und lokale strukturelle Freiheit bewahrt. Die heutigen Steuerelemente dürfen nicht entfernt werden, bevor Migration und Lebenszyklus abgesichert sind. |
| Vollständige Language Layers mit universellen Shadows | Vervollständigen die Struktur jeder Sprache. | Datensatzwachstum ist akzeptabel, wenn es die Verarbeitung vereinfacht. Dieser Ansatz ist derzeit nicht bevorzugt, weil universelle Shadows dennoch die gesamte Synchronisierungs- und Lebenszykluslogik, Workspace-Versionen, Referenzen und die Informationsdichte im Modul „Layout“ erhöhen können, ohne dass eine Nettovereinfachung nachgewiesen ist. Dies ist keine Ablehnung allein aufgrund der Datenbankgröße. |
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

- **Aktuelle Präferenz:** explizit gespeicherte Synchronisierungsdaten und
  einfachere, vorhersehbare Code-Pfade gegenüber einer möglichst kleinen
  Datensatzmenge bevorzugen.
- **Entscheidung erforderlich:** genaue Repräsentation und
  Lebenszyklusgrenzen, die diese Präferenz sicher umsetzen.
- **Offene Frage:** messbare Nettovereinfachung und Auswirkungen auf die Anzahl
  der Abfragen, Write Amplification, Datensatzmenge, Reference Index,
  Workspaces und Nutzbarkeit des Backends.
- **Entscheidung erforderlich:** Strategie für Kompatibilität, Migration, Deprecation und Extension-APIs.
- **Entscheidung erforderlich:** Zuständigkeit und Priorisierung gemeinsam mit den zuständigen TYPO3-Core- und Produktstrukturen.

## Nächste sinnvolle Schritte

Dies ist die aus heutiger Sicht sinnvollste Abfolge von Aktivitäten der Initiative und keine verbindliche TYPO3-Release-Roadmap.

1. **Evidenzbasis aktuell halten.** Reproduzierbare Redaktions- und Projekt-Use-Cases ergänzen, insbesondere wenn sich Sprache, Land, Struktur und Ausgabeabsicht unterscheiden.
2. **Gezielte Charakterisierung mit menschlichem Evidenz-Gate abschließen.**
   Das `-1`-Inventar prüfen, jedes Vorkommen als gespeicherten Datensatzwert,
   synthetische Backend-Auswahl oder weiteren Fallback-Vertrag einordnen und
   jedes valide Verhalten einem Test zuordnen. Unabhängige maschinelle
   Analysen können Discovery und Priorisierung beschleunigen; ein Mensch muss
   jedoch für jedes akzeptierte Vorkommen den Ausdruck, die Herkunft des
   Wertes, dessen Verbraucher und die Core-Evidenz prüfen. Insbesondere ist
   vor der Entfernung synthetischer Platzhalter zu prüfen, welche
   TYPO3-v15-Selektoren eine Auswahl aller Overlays durch konkrete Sprach-IDs
   ausdrücken können; bekannte Lücken in Workspaces und DataHandler sind
   ebenfalls zu schließen.
3. **Klar abgegrenzte Korrekturen abschließen.** 95475 rebasen und reviewen, Copy-/Move-, Parent-Selector- und Wizard-Arbeit voranbringen und das Review der inzwischen mergefähigen Strict-Korrektur 94510 abschließen. Auf 87595/96783, 94673/96935 und 97053/97225 aufbauen, ohne daraus eine Übernahme des Zukunftsmodells abzuleiten.
4. **Produktverhalten vor der Speicherung prototypisch untersuchen.** Editing Language, einen Arbeitsablauf ohne Moduswahl im Modul „Layout“, direktes Anlegen in einer Zielsprache, lokale strukturelle Ergänzungen und explizite Abwesenheit anhand realistischer redaktioneller Abläufe prüfen.
5. **Die aktuelle strukturelle Präferenz gegenüber ihrem Gegenmodell validieren.** Dieselben Akzeptanzfälle für die gemeinsame verborgene Struktur, vollständige Language-Layer-Shadows, Sparse Records und hybride Ansätze verwenden. Vereinfachungen von Code und Laufzeit gemeinsam mit Datensatzwachstum, Informationsdichte im Modul „Layout“, Workspaces, Referenzen, Migration und Betriebskosten messen, statt die Datenbankgröße allein als entscheidend zu behandeln.
6. **Parität der ersten Stufe definieren und charakterisieren.** Das Flag für alle Ziele, die Zielanlage, die vollständige erzwungene Feldmenge, Quell- und Zielidentität, Konflikte und jeden Übergang spezifizieren. Zunächst nachweisen, dass damit die aktuelle `-1`-Ausgabe reproduziert wird, und anschließend das eigenständig zu entscheidende Multi-Select sowie andere granulare Erweiterungen am selben Prozess bewerten.
7. **Vertrag für semantische Identität abstimmen.** Entscheiden, was BCP 47 identifiziert, wie Site Languages darauf abgebildet und wie Legacy-Werte migriert werden.
8. **Kompatibilität vor der Entfernung konzipieren.** Zunächst explizite Alternativen einführen, Migrations- und Extension-Hinweise bereitstellen und erst danach eine Deprecation alter Semantik erwägen.
9. **Evidenz zu den zuständigen Entscheidungsträgern bringen.** Die Initiative sollte Trade-offs und Konsequenzen konkret machen, damit Core-, Produkt- und Architekturentscheidungen auf einer gemeinsamen Faktenbasis getroffen werden können.

## Evidenzbasis und Pflege

Die Meetingbasis ist bis 23.10.2026 abgeglichen, einschließlich der zuvor
unregistrierten Quellen vom 21./28. August. Wiederholungen und Off-Topic erzeugen
kein neues Wissen. Am 30.10.2026 wurden 55 Gerrit-Changes geprüft: alle 50 bisher
verlinkten, zwei zusätzlich benannte, zwei gefundene Backports und 96916.
Forge-Issues, dbdoctor-PRs und die beschriebenen Core-Pfade wurden ebenfalls
geprüft, letztere statisch an einer festen v15-Revision. Dies ist weder ein
neuer Laufzeittest aller Szenarien noch eine fachliche Freigabe der Änderungen.
Umfang und Grenzen stehen im [Prüfbericht](https://github.com/t3thi/Documentation/blob/main/KnowledgeSystem/Documentation/reviews/2026-10-30-freshness.md).
Die [T3DD26-Präsentation](https://content.eric-harrer.de/t3dd26/) bleibt konzeptioneller Hintergrund.

Für das aktuelle Language-All-Inventar stellt der [Human Review
Explorer](https://content.eric-harrer.de/t3thi/reviews/95619/) direkte und
inverse Findings, modellspezifische Begründungen, frühere menschliche
Entscheidungen und Evidenzlinks bereit. Er ist ein abgeleitetes
Review-Hilfsmittel und kein kanonisches Wissen. Die Übereinstimmung von
Modellen kann Arbeiten priorisieren; ausschließlich das menschliche
Evidenz-Gate und geprüfte Git-Änderungen autorisieren jedoch eine
Schlussfolgerung.

Zentrale Primärquellen sind:

| Thema | Evidenz aus Sitzungen |
|---|---|
| Community-Feedback und redaktionelle Vereinfachung der Modi | [Feedback-Matrix von T3DD22 und nachfolgenden Veranstaltungen][cs1], [22.03.2024][cs16], [11.07.2025][cs15], [24.10.2025][cs11] |
| Language Identity und BCP 47 | [19.01.2024](https://notes.typo3.org/s/sEONb4kd6), [25.07.2025](https://notes.typo3.org/s/dtw4v9T7S), [31.07.2026][cs17] |
| Ersatz von `-1`, Parität des vollständigen Datensatzes und Lebenszyklus der Synchronisierung | [28.06.2024](https://notes.typo3.org/s/GQwWxdUKO), [31.01.2025](https://notes.typo3.org/s/kEaZn6jJF), [26.09.2025](https://notes.typo3.org/s/1RnTSuBsq), [28.11.2025][cs13], [11.06.2026][cs10], [04.09.2026](https://notes.typo3.org/s/FsawsB3Y2K), [25.09.2026](https://notes.typo3.org/s/IeIMwXw8bM) |
| Aktuelle Modi der Feldsynchronisierung und mögliche Konsolidierung | [12.04.2024](https://notes.typo3.org/s/gjl-sog92), [26.04.2024][cs12], [18.10.2024](https://notes.typo3.org/s/8vI0MnUbs), [22.08.2025](https://notes.typo3.org/s/gL97CaQ5M), [08.05.2026][cs7] |
| Konsistenz von `l10n_state` und Schäden durch historische Kopiervorgänge | [26.04.2024][cs12], [06.02.2026](https://notes.typo3.org/s/D8oadqoN-7#) |
| Weitgehend verbundene Strukturen und lokale Ausnahmen | [22.03.2024][cs16], [08.05.2026][cs7], [26.06.2026][cs8], [10.07.2026][cs14] |
| Vollständige Ebenen, Shadows und gemeinsame Struktur | [18.07.2025](https://notes.typo3.org/s/L0lQKrWaW), [24.10.2025][cs11], [29.05.2026][cs9], [10.07.2026][cs14] |
| Editing Language | [08.05.2026][cs7], [29.05.2026][cs9] |
| Output Policy, Strict-Verhalten und beabsichtigte Abwesenheit | [15.12.2023](https://notes.typo3.org/s/ddSKDuz1Q), [11.06.2026][cs10], [10.07.2026][cs14], [31.07.2026][cs17] |
| Jüngster Prototyp und redaktioneller Workflow | [23.10.2026](https://notes.typo3.org/s/TXqazBh8D3) |

Zukünftige Aktualisierungen müssen den [Pflegehinweisen für den Current State][cs6] folgen. Die zentrale Regel lautet:

> **Aktualisiere den aktuellen Stand, nicht die Historie.**

[cs1]: https://docs.google.com/spreadsheets/d/1Y8KnuYxMoXyVaZzVHENBp_1fg2M-JGxHog6K3T9qn_Q/edit?gid=0#gid=0
[cs2]: https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/core/Classes/DataHandling/DataHandler.php
[cs3]: https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/core/Classes/DataHandling/Localization/DataMapProcessor.php
[cs4]: https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/core/Classes/DataHandling/Localization/State.php
[cs5]: https://github.com/lolli42/dbdoctor/pull/98
[cs6]: https://github.com/t3thi/Documentation/blob/main/KnowledgeSystem/Documentation/current-state-maintenance.md
[cs7]: https://notes.typo3.org/s/-0p3kqzMll
[cs8]: https://notes.typo3.org/s/-RP1PwIafA
[cs9]: https://notes.typo3.org/s/0AJqa7JwuJ
[cs10]: https://notes.typo3.org/s/1-J3KsT7VU
[cs11]: https://notes.typo3.org/s/2Ysd3gDdn
[cs12]: https://notes.typo3.org/s/D32XRXoCk
[cs13]: https://notes.typo3.org/s/Sxl-kkYjW
[cs14]: https://notes.typo3.org/s/ccbVIOYfEy
[cs15]: https://notes.typo3.org/s/k11hyaA4N
[cs16]: https://notes.typo3.org/s/kqdwFxW1m
[cs17]: https://notes.typo3.org/s/z5ICno5pK2
[cs18]: https://review.typo3.org/c/Packages/TYPO3.CMS/+/92267
[cs19]: https://review.typo3.org/c/Packages/TYPO3.CMS/+/94510
[cs20]: https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170
[cs21]: https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199
[cs22]: https://review.typo3.org/c/Packages/TYPO3.CMS/+/95619
