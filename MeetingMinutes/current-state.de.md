---
title: "Translation Handling Initiative - Aktueller Stand"
last_updated: "2026-08-11"
weekly_minutes_included_through: "2026-07-31"
transcripts_included_through: "2026-07-31"
external_status_checked_through: "2026-08-11"
---

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
- BCP 47 ist die aktuelle Präferenz für eine semantische Sprachidentität. Die Abbildung in der Datenbank und der Migrationspfad bleiben offen.
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

## Beobachtete Anforderungen und Use Cases

Die Vision der Initiative geht von konkreten Projekt- und Redaktionsanforderungen aus. Diese Use Cases weisen nicht dieselbe Lücke auf. Jeder von ihnen macht eine andere Verantwortung sichtbar, die derzeit implizit, zu grob oder mit einem anderen Aspekt gekoppelt ist.

| Use Case | Aktuelle Schwierigkeit | Sichtbar werdende Verantwortung |
|---|---|---|
| **Mostly connected, selectively different** | Eine Zielsprache teilt den Großteil ihrer Inhalte mit einer anderen Sprache, benötigt aber eine lokale Ergänzung. Heute kann diese Ergänzung einen künstlichen, verborgenen Default-Language-Datensatz erfordern, Mixed Mode erzeugen oder nützliches Connected-Mode-Verhalten aufgeben. | Structural Identity und Synchronization Intent |
| **Gemeinsamer globaler Speicher** | Mehrere Sites verwenden einen gemeinsamen Datensatzspeicher, konfigurieren dieselben menschlichen Sprachen aber mit lokalen numerischen IDs. Die Zahl allein kann die Sprache nicht zuverlässig Site-übergreifend identifizieren. | Language Identity |
| **Regionaler Fallback** | Inhalte für das Vereinigte Königreich sollen allgemeines Englisch wiederverwenden, aber nicht auf eine unpassende Sprache am Ende der Fallback Chain zurückfallen. Eine Site-weite Kette kann nicht zusätzlich ausdrücken, ob an einer fehlenden Position Fallback erfolgen oder diese bewusst leer bleiben soll. | Output Policy |
| **Inhalte für alle Sprachen** | Ein Datensatz verwendet `sys_language_uid = -1` im Sinne von „alle Sprachen“, obwohl dies ein Verhalten und keine menschliche Sprache bezeichnet. Derselbe vollständige Datensatz wird in jeder Sprache verwendet, und der Sonderwert wirkt sich auf viele voneinander unabhängige Core-Pfade aus. | Synchronization Intent und Language Identity |
| **Inhalt ausschließlich für eine Zielsprache** | Redakteurinnen und Redakteure können Inhalte nicht immer direkt dort anlegen, wo sie benötigt werden, und zugleich die nützliche strukturelle Beziehung für den Rest der Seite beibehalten. | Structural Identity |
| **Bearbeitung ausgehend von einer verständlichen Sprache** | Eine chinesische Redakteurin oder ein chinesischer Redakteur muss chinesische Inhalte gegebenenfalls ausgehend von Englisch erstellen, während die Default Language der Site Deutsch ist. Eine dauerhaft privilegierte Default-Language-Spalte erschwert es, diesen Arbeitsablauf zu verstehen. | Structural Identity und redaktioneller Kontext |
| **Übersetzung von Dateimetadaten in größerem Umfang** | Das [Übersetzungsmenü des Moduls „Media“](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/filelist/Classes/FileList.php#L1225-L1305) zeigt für jede Datei, ob Metadaten für eine konfigurierte Sprache angelegt oder bearbeitet werden können. Das Anlegen oder Bearbeiten zielsprachlicher Alternativtexte bleibt ein Ablauf pro Datei; im aktuellen Core ist kein eigener Ablauf für Massenerstellung oder Vollständigkeitsprüfung erkennbar. | Structural Identity und redaktioneller Arbeitsablauf |
| **Beabsichtigte Abwesenheit** | Sowohl eine fehlende Übersetzung als auch eine bewusst deaktivierte oder ausgelassene Übersetzung können zu Fallback führen. Die redaktionelle Absicht wird nicht ausreichend explizit dargestellt. | Output Policy |

„Mostly connected, selectively different“ beschreibt den Zwischenbereich, den TYPO3 besser unterstützen sollte, am deutlichsten. Identische übersetzte Strukturen und vollständig unabhängige Strukturen sind beide valide. Eine kleine lokale Ausnahme sollte Redakteurinnen und Redakteure nicht dazu zwingen, die Vorteile des weitgehend gemeinsamen Inhalts aufzugeben. Siehe die [Use-Case-Analyse vom Juni 2026](https://notes.typo3.org/s/-RP1PwIafA) und ihre [Präzisierung vom Juli](https://notes.typo3.org/s/ccbVIOYfEy).

### Was das Community-Feedback belegt

Die [Matrix des Community-Feedbacks von T3DD22 und nachfolgenden Veranstaltungen](https://docs.google.com/spreadsheets/d/1Y8KnuYxMoXyVaZzVHENBp_1fg2M-JGxHog6K3T9qn_Q/edit?gid=0#gid=0) enthält keine einzelne Ja-oder-Nein-Entscheidung zur Entfernung der Übersetzungsmodi. Sie erfasst „Switching translation modes“ als redaktionelles Problem und eine einfachere Auflösung von Mixed Mode als redaktionelle Anforderung. Andere Rückmeldungen bewerten Free Mode positiv, weil er Inhalte ausschließlich in einer Sprache erlaubt. Auch das redaktionelle Interview von 2024 bestätigt „mostly connected, selectively different“ als validen Use Case, während sowohl Mixed Mode als auch künstliche verborgene Datensätze in der Default Language als unbefriedigend bewertet werden.

Die gesicherte Anforderung besteht daher nicht darin, unabhängige redaktionelle Ergebnisse zu entfernen. Redakteurinnen und Redakteure sollen keine technischen Beziehungszustände verwalten müssen, wenn sie Inhalte lediglich in einer bestimmten Sprache anlegen, auslassen, ersetzen oder umsortieren möchten. Die Initiative empfiehlt, die Unterscheidung zwischen Free Mode, Connected Mode und Mixed Mode aus der normalen redaktionellen Oberfläche zu entfernen, sobald der Core die erforderlichen strukturellen Beziehungen sicher anlegen und pflegen kann. Diese Empfehlung setzt Vorarbeiten für automatische Zielanlage, Beziehungsintegrität, Migration und Lebenszyklus voraus; sie ist keine Deprecation des heutigen Free-Mode-Verhaltens. Siehe das [redaktionelle Interview von 2024](https://notes.typo3.org/s/kqdwFxW1m), die [Diskussion eines durchgehend verbundenen Zustands](https://notes.typo3.org/s/k11hyaA4N) und die [spätere Präzisierung eines technisch verbundenen Zustands](https://notes.typo3.org/s/2Ysd3gDdn).

## Forschungsergebnisse: der heutige Stand

Das aktuelle TYPO3-Verhalten beruht nicht auf einem einzigen Übersetzungsmodell. Es entsteht durch das Zusammenspiel mehrerer Daten- und Konfigurationsverträge.

| Aktueller Vertrag | Was er heute ausdrückt | Wesentliche Kopplung |
|---|---|---|
| **Konfiguration der Site Language** | Eine Site-lokale Integer-ID, Locale, Fallback-Typ und konfigurierte Fallback-IDs. | Eine lokale numerische ID wird zugleich als Sprachwert eines Datensatzes verwendet. |
| **Sprachwert eines Datensatzes** | `sys_language_uid` speichert eine positive Sprach-ID, `0` für die Default Language oder, soweit unterstützt, `-1` für alle Sprachen. | Identität, Default-Rolle und sprachübergreifendes Verhalten teilen sich ein Feld. |
| **Übersetzungsbeziehung** | `l10n_parent` oder `l18n_parent` verbindet eine Übersetzung mit einem Default-Language-Datensatz. | Die Beziehung steuert zugleich die Darstellung im Modul „Layout“ und Teile des Overlay-Verhaltens. |
| **Übersetzungsquelle** | `l10n_source` identifiziert den Datensatz, aus dem Inhalte übernommen wurden. | Herkunft der Quelle und struktureller Parent stehen in Beziehung, sind aber nicht identisch. |
| **Konfigurationsseitig erzwungene Feldsynchronisierung** | `l10n_mode=exclude` kennzeichnet ein Feld statisch in der TCA. Bei Connected Translations ist das Feld von der eigenständigen Bearbeitung in Übersetzungen ausgeschlossen, und sein Wert aus der Default Language wird mit vorhandenen abhängigen Übersetzungen synchronisiert. | Die Regel ist für dieses TCA-Feld fest vorgegeben. Sie wird nicht je Übersetzung über `l10n_state` ausgewählt. |
| **Redaktionell auswählbare Feldsynchronisierung** | `config.behaviour.allowLanguageSynchronization=true` macht ein Feld für die übersetzungsbezogene Wahl zwischen `parent`, `source`, sofern vorhanden, und `custom` verfügbar; `l10n_state` speichert diese Wahl. | Die Redaktion steuert den Feldzustand, ein fehlender oder ungültiger Zustand wird derzeit jedoch als `parent` behandelt. |
| **Übersetzungsmodus im Backend** | Connected Mode, Free Mode oder Mixed Mode wird aus den Datensatzbeziehungen abgeleitet, im Modul „Layout“ angezeigt und zur Beschränkung von Aktionen wie dem direkten Anlegen von Inhalten verwendet. | Der redaktionelle Arbeitsablauf legt Eigenschaften der aktuellen Datenstruktur offen, statt ausschließlich nach der beabsichtigten Inhaltsanlage zu fragen. |
| **Ausgaberichtlinie im Frontend** | `fallbackType` einer Site und konfigurierte Fallback-IDs bestimmen Auswahl- und Overlay-Verhalten. | Ein Fallback zur Laufzeit ist von der strukturellen Beziehung im Backend getrennt. |

Seitenübersetzungen behalten immer eine Parent-Beziehung. Free Mode und Mixed Mode beschreiben hauptsächlich, wie andere Datensätze, insbesondere Inhaltselemente, innerhalb des Moduls „Layout“ zueinander in Beziehung stehen.

Die oben beschriebenen aktuellen Verträge werden durch den für T3DD26 validierten Core-Code-Stand belegt: [TCA-Sprachbeziehungen](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Configuration/Tca/TcaEnrichment.php#L185-L247), [Lokalisierungsstatus](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/DataHandling/Localization/State.php#L29-L39), [Moduserkennung im Modul „Layout“](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/View/BackendLayout/ContentFetcher.php#L165-L203) und [Erzeugung des Fallbacks](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Context/LanguageAspectFactory.php#L27-L60). Der aktuelle Core [ermittelt außerdem die Modusbezeichnungen und beschränkt neue Inhalte im Connected Mode](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/backend/Classes/View/PageLayoutContext.php#L230-L291), während das [Layout-Template den Modus als sichtbares Badge ausgibt](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/backend/Resources/Private/Partials/PageLayout/LanguageColumns.fluid.html#L27-L33).

Der aktuelle Core verarbeitet beide Mechanismen zur Feldsynchronisierung in derselben [DataMapProcessor-Pipeline](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/core/Classes/DataHandling/Localization/DataMapProcessor.php#L50-L57), ermittelt ihre Felder jedoch über getrennte Scopes. `parent` und `source` stammen aus `l10n_state`; der Scope `exclude` wird direkt aus [`l10n_mode=exclude` in der TCA](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/core/Classes/DataHandling/Localization/DataMapProcessor.php#L1338-L1383) ermittelt. Der [Lokalisierungsstatus berücksichtigt nur mit `allowLanguageSynchronization` konfigurierte Felder](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/core/Classes/DataHandling/Localization/State.php#L71-L97), und der [Backend-Selector bietet `custom`, `parent` sowie bei vorhandener Quelle `source` an](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/backend/Classes/Form/FieldWizard/LocalizationStateSelector.php#L48-L140). Beide Mechanismen wirken auf vorhandene miteinander verbundene Sprachdatensätze. Keiner von ihnen erzeugt fehlende Sprachvarianten oder beschreibt für sich eine datensatzweite Synchronisierung.

Die in diesem Dokument verwendeten Modulnamen entsprechen den aktuellen Labels des v14-Cores: [Layout](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/backend/Resources/Private/Language/Modules/layout.xlf#L9-L13), [Records](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/backend/Resources/Private/Language/Modules/list.xlf#L9-L13) und [Media](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/filelist/Resources/Private/Language/module.xlf#L9-L13).

### Gesicherte Erkenntnisse

1. **Verschiedene Verantwortlichkeiten sind teilweise miteinander verflochten.** Sprachidentität, Status als Default Language, Language-All-Verhalten, Datensatzbeziehung und Ausgabe zur Laufzeit beeinflussen einander durch dieselben Werte und Beziehungen.
2. **Sonderwerte wirken Core-weit.** `-1` wird in Backend-Abfragen, Berechtigungen, DataHandler, Overlays, Extbase, Slugs, Dateimetadaten, Workspaces und Tests behandelt. Seine Entfernung ist keine lokale Feldmigration.
3. **Die Default Language hat zwei Rollen.** Sie ist sichtbarer Inhalt und strukturelle Führung, mit der andere Datensätze verbunden sind. In einfachen Übersetzungsabläufen fallen diese Rollen zusammen. Sie stehen jedoch im Konflikt, wenn ausschließlich eine andere Sprache ein strukturelles Element benötigt.
4. **Strukturelle Verbindung besitzt einen konkreten Wert.** Sie unterstützt eine abgestimmte Sortierung, die Erkennbarkeit von Änderungen, Feldsynchronisierung und nachvollziehbare Vergleiche. Ziel ist nicht, Beziehungen zu entfernen, sondern zu vermeiden, dass eine reale Ausgabesprache jede strukturelle Verantwortung tragen muss.
5. **Ein fehlender Datensatz ist ein impliziter Zustand.** Er kann bedeuten: noch nicht übersetzt, bewusst nicht vorhanden, strukturell nicht erforderlich oder durch Fallback verfügbar. Datenbank und redaktioneller Arbeitsablauf unterscheiden diese Bedeutungen nicht immer.
6. **Frontend-Fallback ist nicht die strukturelle Beziehung.** `l10n_parent` beschreibt eine Datensatzbeziehung; die Fallback-Einstellungen der Site entscheiden, welche Sprache ausgegeben werden darf. Beide können dasselbe Ergebnis beeinflussen, beantworten aber unterschiedliche Fragen.
7. **Numerische Sprach-IDs sind lokale Konfiguration.** Dieselbe menschliche Sprache kann in verschiedenen Sites unterschiedliche IDs besitzen, und dieselbe ID kann in unterschiedlichen Sites verschieden bezeichnet sein. Eine Zuordnung allein über Zahl oder Locale ist kein verlässlicher Vertrag für globale Identität.
8. **Explizitere Daten können Verzweigungen zur Laufzeit reduzieren, verursachen aber Kosten.** Datensatzmenge, Synchronisierung, Workspaces, Versionierung, Referenzen, Migration und Performance müssen gemessen werden. Die Initiative hat nicht entschieden, wo das Optimum liegt.
9. **Unabhängige Strukturen bleiben valide, redaktionell sichtbare Beziehungsmodi sind jedoch nicht der gewünschte Produktvertrag.** Das heutige Free-Mode-Verhalten bleibt unterstützt und ist nicht deprecated. Der empfohlene zukünftige Arbeitsablauf verbirgt die Beziehungszustände Free Mode, Connected Mode und Mixed Mode erst, nachdem der Core unabhängige Ergebnisse bewahren und Structural Identity automatisch pflegen kann.
10. **Technische Verbindung erfordert keine identischen Strukturen.** Zwei Sprachvarianten können dieselbe logische Structural Identity teilen, während eine Sprache Inhalte ergänzt, auslässt, ersetzt oder umsortiert. „Durchgehend verbunden“ bezeichnet eine gepflegte Identität, nicht zwingend gleiche Struktur oder gleiche Inhalte.
11. **Kleine Korrekturen und Tests sind Teil der Architekturarbeit.** Sie machen tatsächliche Invarianten sichtbar und verhindern, dass ein zukünftiges Modell auf unvollständigen Annahmen beruht.
12. **Synchronisierungsmetadaten und gespeicherte Werte können einander widersprechen.** In vorhandenen Daten beweist ein leerer oder fehlender `l10n_state`-Eintrag nicht, dass ein lokalisiertes Feld seinem Parent entspricht. Die aktuelle [Zustandsanreicherung im Core](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/core/Classes/DataHandling/Localization/State.php#L223-L238) behandelt einen fehlenden Feldzustand ohne Vergleich der gespeicherten Werte als `parent`. Das Backend kann das Feld daher als vererbt darstellen, obwohl sein gespeicherter Wert abweicht. Der offene [dbdoctor PR 98](https://github.com/lolli42/dbdoctor/pull/98) zeigt einen Reparaturansatz; er ist kein gemergtes Core-Verhalten.
13. **Feldsynchronisierung besitzt heute zwei Steuerungsmodelle.** `l10n_mode=exclude` erzwingt die Synchronisierung durch TCA-Konfiguration. `allowLanguageSynchronization` stellt eine redaktionelle Wahl bereit, die in `l10n_state` gespeichert wird. Die Ausführungspipeline ist gemeinsam, Konfiguration, Zustandsermittlung und Scopes bleiben jedoch getrennt.
14. **Language All wendet den vollständigen Datensatz an.** Die aktuelle [Frontend-Auswahl bezieht `-1` ein](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/frontend/Classes/ContentObject/ContentObjectRenderer.php#L4780-L4846), und die [Overlay-Logik gibt einen solchen Datensatz unverändert zurück](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/core/Classes/Domain/Repository/PageRepository.php#L635-L660). Ein kompatibler erster Ersatz muss daher zunächst die Wirkung einer vollständigen gemeinsamen Datenbankzeile bewahren, bevor eine granularere Synchronisierung hinzukommt.

## Vision: vier Verantwortlichkeiten trennen

Das [T3DD26-Modell der Four Responsibilities](https://content.eric-harrer.de/t3dd26/#/four-responsibilities) ist der aktuelle konzeptionelle Bezugspunkt der Initiative:

> **Separate the responsibilities first. Then reason about possible implementations.**

Bei der Erklärung der Vision müssen die Verantwortlichkeiten in dieser Reihenfolge betrachtet werden: **Identity → Synchronization → Structure → Output**. Sie bilden eine Problem- und Verantwortungszerlegung, kein ausgewähltes Schema, keine ausgewählte API und keine Migrationsreihenfolge.

### 1. Language Identity

**Frage:** Welche menschliche Sprache und Variante repräsentiert dieser Inhalt?

**Aktuelle Kopplung:** Ein Datensatz speichert eine Site-lokale Ganzzahl. `0` bedeutet zusätzlich Default Language und `-1` bedeutet alle Sprachen. Diese zusätzlichen Bedeutungen sind keine Identitäten menschlicher Sprachen.

**Abgeleitete Anforderungen:**

- Eine Sprache muss Site-übergreifend und, soweit erforderlich, installationsübergreifend eine stabile semantische Identität besitzen.
- Der Status als Default Language muss getrennt von der Identität der Sprache modelliert werden.
- Das Verhalten „alle Sprachen“ darf nicht als Sprache erscheinen.
- Semantische Identität darf nicht davon abhängen, ob eine Locale auf dem Applikationsserver installiert ist.
- Die Site-Konfiguration muss ihre verfügbaren Sprachen explizit auf die semantische Identität abbilden.
- Gemeinsamer Speicher, übersetzte Dateimetadaten sowie Import und Export dürfen nicht von zufällig übereinstimmenden lokalen Zahlen abhängen.

**Vision:** Die Sprache von Inhalten sollte dadurch identifizierbar sein, welche Sprache sie ist, und nicht nur durch die ihr zugewiesene Site-lokale Zahl. BCP 47 ist die aktuelle Präferenz der Initiative für diese semantische Identität.

**Offene Fragen:**

- Ist ein Tag gemäß BCP 47 der maßgebliche gespeicherte Wert, eine externe Identität, die auf einen internen Schlüssel abgebildet wird, oder Teil eines anderen Identitätsmodells?
- Welche Script-, Region-, Variant- und Private-Use-Subtags müssen unterstützt werden?
- Wie werden mehrdeutige Legacy-IDs und Locales migriert?
- Können zwei Datensätze mit demselben Tag bewusst unterschiedliche redaktionelle Kontexte repräsentieren?
- Wie werden Berechtigungen, Abfragen, Beziehungen und Extension-APIs ohne unsichere Big-Bang-Änderung angepasst?

BCP 47 adressiert semantische Identität. Es löst nicht selbstständig strukturelle Beziehungen, Synchronisierung, Berechtigungen, Seiten-Geltungsbereiche oder Frontend-Fallback.

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

**Vision:** „Einmal für mehrere Sprachen pflegen“ sollte als Synchronization Intent für konkrete Sprachvarianten dargestellt werden, nicht als fiktive Sprachidentität.

**Offene Fragen:**

- Welcher führende Datensatz und welcher Site- beziehungsweise Shared-Storage-Geltungsbereich bestimmen die Zielsprachen für den ersten Boolean mit allen Zielen?
- Welche Felder reproduzieren die vollständige Language-All-Wirkung, und welche Felder für Zielidentität oder systemseitige Verwaltung müssen abweichen?
- Was geschieht, wenn bereits manuelle Übersetzungen vorhanden sind?
- Welche Werte dürfen überschrieben werden, und wer darf diesen Übergang autorisieren?
- Was geschieht mit erzeugten Datensätzen, wenn die Synchronisierung deaktiviert wird?
- Wie werden erzeugte Inhalte von unabhängig gepflegten Inhalten unterschieden?
- Wird eine später hinzugefügte Sprache automatisch Mitglied einer bestehenden Synchronisierungsgruppe?
- Wie werden fehlende oder inkonsistente `l10n_state`-Einträge eingeordnet, wenn skalare Werte oder Beziehungen abweichen?
- Soll ein neues `config.behaviour.enforceLanguageSynchronization` den erzwungenen Zustand über `l10n_state` abbilden und `l10n_mode=exclude` ersetzen?
- Wie werden `prefixLangTitle`, das Standardverhalten und die Extension-Kompatibilität behandelt, wenn `l10n_mode` entfernt wird?

Ein Boolean-Flag für alle Sprachen ist das nützliche minimale Kompatibilitätsmodell: In der ersten Stufe sollte es alle konfigurierten Ziele ohne feldbezogene Abwahlmöglichkeit bedeuten und damit die Wirkung des vollständigen `-1`-Datensatzes nachbilden. Eine naheliegende darauf aufbauende Feature-Option ist, den Boolean durch ein datensatzweites Multi-Select der Synchronisierungs-Zielsprachen zu ersetzen oder zu erweitern. Derselbe vollständige Synchronisierungsprozess würde Zielrecords dann nur in den ausgewählten Sprachen anlegen und pflegen. Ein [vorläufiger Vorschlag aus einer Sitzung](https://notes.typo3.org/s/Sxl-kkYjW) bezeichnete das Datensatzfeld als `language_sync` und seine TCA-Referenz als `ctrl.languageSyncField`; weder Name noch API sind ausgewählt. Ob und wann das Multi-Select eingeführt wird, muss entschieden werden, und feldbezogene Ausnahmen sind eine eigenständige mögliche Erweiterung. Weder das Flag noch das Multi-Select bildet bereits einen vollständigen Lebenszyklus oder eine beschlossene TCA-API.

**Möglicher technischer Wiederverwendungspfad für die erste Stufe mit `-1`-Parität:**

1. Eine datensatzweite Synchronisierungsabsicht an einem führenden Datensatz wählt zunächst jede Zielsprache in ihrem definierten Site- oder Storage-Geltungsbereich aus.
2. Der DataHandler stellt sicher, dass in jeder Zielsprache genau ein verbundener Zieldatensatz vorhanden ist. Das bestehende [`localize()`](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/core/Classes/DataHandling/DataHandler.php#L4735-L4918) validiert bereits die Ziel-Site-Language, verhindert Duplikate und bereitet Sprache, Parent und Quelle vor; [`localizeRecord()`](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/core/Classes/DataHandling/DataHandler.php#L4921-L5004) legt den Zieldatensatz durch eine verschachtelte DataHandler-Operation an.
3. Jeder Zieldatensatz erhält in `l10n_state` einen erzwungenen Zustand oder eine gleichwertige neue Zustandsrepräsentation für jedes Feld, das zur Reproduktion des vollständigen Quelldatensatzes erforderlich ist. Der bestehende DataMapProcessor kann anschließend seine [Propagation vom Parent zu abhängigen Datensätzen für skalare Werte und Beziehungen](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/core/Classes/DataHandling/Localization/DataMapProcessor.php#L381-L452) wiederverwenden.
4. Spätere Änderungen durchlaufen dieselbe Abhängigkeitspipeline. Nachdem die funktionale Parität nachgewiesen ist, kann derselbe Vertrag ein eigenständig zu entscheidendes Multi-Select der Zielsprachen unterstützen und dabei die Erzwingung aller Felder innerhalb jedes ausgewählten Ziels beibehalten.

„Jedes Feld“ bezeichnet jeden Wert, den der aktuelle `-1`-Datensatz absichtlich identisch bereitstellt, einschließlich Ausgabe- und Strukturwerten. Es bedeutet nicht, dass erzeugte Datensätze dieselben Werte für `uid`, `sys_language_uid`, `l10n_parent`, `l10n_source`, `l10n_state` oder Workspace- und Versionsmetadaten besitzen. Diese Felder stellen Identität und Lebenszyklus jedes Zieldatensatzes her. Die genaue Menge der vom Core verwalteten Ausnahmen muss anhand des Schemas definiert und in Tests charakterisiert werden.

Dies ist ein möglicher Wiederverwendungspfad und keine unmittelbar einsetzbare Konfigurationsänderung. Die datensatzweite Absicht müsste für jedes zur Parität relevante Feld ihrer Ziele wirksame `enforceLanguageSynchronization`-Semantik ableiten. `l10n_mode=exclude` statisch an jedem TCA-Feld zu deklarieren, würde auch nicht synchronisierte Datensätze betreffen. Der aktuelle DataMapProcessor [überspringt `-1`-Datensätze und erfordert verbundene Zieldatensätze](https://github.com/TYPO3/typo3/blob/fe9189fcc3e559e1a442fc398291fed856bf6598/typo3/sysext/core/Classes/DataHandling/Localization/DataMapProcessor.php#L203-L284). Der neue datensatzweite Pfad muss Ziele daher auflösen, sie anlegen oder abgleichen, die vollständige erzwungene Feldmenge ableiten und die Aktivierung atomar sowie idempotent ausführen. Eine aktuelle `-1`-Quelle muss zunächst einem gültigen führenden Datensatz zugeordnet oder über einen neuen Anlagepfad behandelt werden, weil das bestehende `localize()` einen verbundenen Parent herstellt, wenn die Quelle ein Default-Language-Datensatz ist.

Beim Multi-Select kann das Hinzufügen einer Sprache dieselbe Operation „Ziel sicherstellen, dann alle Felder erzwingen“ wiederverwenden. Für das Entfernen einer Sprache ist eine explizite Lebenszyklusentscheidung erforderlich: den erzeugten Datensatz behalten und lösen, deaktivieren, als gelöscht markieren oder entfernen. Auch die gespeicherte Zielidentität muss Site-übergreifend aussagekräftig bleiben; heutige Site-lokale numerische IDs reichen für einen Shared-Storage-Vertrag nicht aus. Deshalb ist das Multi-Select eine konkrete Feature-Option mit Entscheidungsbedarf und weder eine implementierte Felddefinition noch ein festgelegter nächster Schritt.

Eine eigenständige mögliche Konsolidierung auf Feldebene ist `enforceLanguageSynchronization` neben `allowLanguageSynchronization` auf derselben `config.behaviour`-Ebene. Der erzwungene Zustand könnte dann über `l10n_state` dargestellt werden, sodass `l10n_mode=exclude` und dessen separater Scope zur Feldauswahl entfallen könnten. Dies wurde von der Initiative vorgeschlagen, ist aber weder implementiert noch ausgewählt. Die genaue Zustandsdarstellung sowie der Migrations- und Kompatibilitätsvertrag sind offen. Der Ansatz darf nicht mit dem getrennten datensatzweiten Ersatz für `-1` gleichgesetzt werden.

### 3. Structural Identity

**Frage:** Welche Datensätze repräsentieren in verschiedenen Sprachen dieselbe logische Inhaltsposition?

Eine logische Inhaltsposition ist der gemeinsame Ort oder die gemeinsame Funktion einer Seite, eines Inhaltselements oder eines anderen lokalisierbaren Datensatzes. Sie ist nicht notwendigerweise der Datensatz, dessen Text als Übersetzungsquelle verwendet wurde.

**Aktuelle Kopplung:** Im Connected Mode ist der Datensatz der Default Language zugleich sichtbarer Inhalt und struktureller Parent. Free Mode entfernt diese Beziehung. Mixed Mode kombiniert beide Zustände auf einer Seite. Der Core leitet diese Bezeichnungen aus `l18n_parent` ab, zeigt sie im Modul „Layout“ an und verhindert normalerweise die direkte Inhaltsanlage in einer Zielspalte im Connected Mode. Eine lokale Ergänzung erfordert deshalb entweder einen künstlichen Datensatz der Default Language oder einen unabhängigen Datensatz, der die gemeinsame Beziehung verliert.

**Abgeleitete Anforderungen:**

- TYPO3 muss die weitgehend gemeinsame Struktur erhalten und zugleich explizite sprachspezifische Ergänzungen, Auslassungen, Ersetzungen oder Umordnungen ermöglichen können.
- Eine strukturelle Beziehung darf keinen bedeutungslosen sichtbaren Inhalt in einer anderen Sprache erfordern.
- Redakteurinnen und Redakteure sollten Inhalte direkt in der Sprache anlegen können, in der sie benötigt werden, ohne entscheiden zu müssen, ob diese Sprache oder Seite strukturell Free, Connected oder Mixed ist.
- Der Core sollte die erforderliche Structural Identity automatisch anlegen und pflegen, auch für Inhalte, die nur in einer realen Sprache vorhanden sind.
- Eine gepflegte strukturelle Verbindung muss weiterhin sprachspezifische Ergänzungen, Auslassungen, Ersetzungen und Sortierungen ermöglichen.
- Das System sollte die Integrität der Beziehungen verwalten und doppelte oder unmögliche Parent-Zuordnungen verhindern.
- Inhaltsquelle, struktureller Parent und aktueller Bearbeitungskontext müssen voneinander getrennt bleiben.
- Das Modell muss Seiten, Inhalte und andere lokalisierbare Datensätze abdecken und zugleich notwendige Unterschiede zwischen Datensatztypen erhalten.
- Redakteurinnen und Redakteure benötigen eine klare Übersicht darüber, welche Sprachvarianten vorhanden sind, sowie effiziente Abläufe zum Anlegen von Varianten für Datensätze jenseits von Seiten und Inhalten, einschließlich Dateimetadaten.
- Die Modusunterscheidung darf erst aus der normalen redaktionellen UX verschwinden, nachdem Anlage, Migration, Berechtigungen, Löschung, Wiederherstellung und Workspace-Verhalten die heutigen validen Ergebnisse bewahren.

**Vision:** Die Redaktion wählt Sprache und beabsichtigte Inhaltsoperation. Der Core hält die technische Verbindung zu derselben logischen Position aufrecht und erlaubt zugleich jeder realen Sprache eine eigene sichtbare Struktur. Strukturelle Beziehungen sollten „mostly connected, selectively different“ ohne künstliche sichtbare Partner in der Default Language oder einen unbeabsichtigten Verlust der Verbindung unterstützen.

„Technisch verbunden“ bedeutet nicht, dass jede Sprache dieselben Datensätze in derselben Reihenfolge ausgeben muss. Es bedeutet, dass der Core eine explizite sprachübergreifende Identität beibehält, auch wenn eine Sprache Inhalte auslässt, ergänzt, ersetzt oder umsortiert. Ein redaktionell vollständig unabhängiges Ergebnis bleibt damit möglich, ohne eine fehlende Parent-Beziehung als Speichervertrag zu verwenden.

**Empfehlung für die redaktionelle Oberfläche:** Die Unterscheidung zwischen Free Mode, Connected Mode und Mixed Mode soll aus dem normalen Arbeitsablauf im Modul „Layout“ entfernt werden, sobald der Core diesen Vertrag gewährleisten kann. Dies ist eine Produkt- und UI-Empfehlung mit architektonischen Voraussetzungen. Sie besagt weder, dass bestehende Free-Mode-Daten bereits sicher konvertiert werden können, noch dass unabhängige Strukturen entfallen sollen.

**Editing Language:** Das bevorzugte Produktkonzept ist eine auswählbare Inhaltssprache, von der aus Redakteurinnen und Redakteure arbeiten, unabhängig von der Sprache der Backend-Oberfläche. Eine chinesische Redakteurin oder ein chinesischer Redakteur könnte beispielsweise chinesische Inhalte ausgehend von Englisch erstellen, während Deutsch die Default Language der Site bleibt. Das Modul „Layout“ würde Englisch dort anzeigen, wo es heute stets die Default Language anzeigt. Dies ist eine Produktrichtung und keine implementierte Funktion.

#### Aktuelle strukturelle Präferenz und die zwei Bedeutungen von Shadow Record

In den Diskussionen wurde „Shadow Record“ für zwei wesentlich verschiedene Repräsentationen verwendet:

- Ein **Language-Layer-Shadow** ist ein Platzhalter innerhalb einer konkreten Sprache. Er vervollständigt die Struktur dieser Sprache, auch wenn die Position dort keinen sichtbaren Inhalt besitzt.
- Ein **Structural Shadow** ist ein einzelner inhaltsloser Datensatz in einer gemeinsamen verborgenen Strukturebene. Reale Sprachdatensätze verbinden sich mit ihm als gemeinsamer Structural Identity; er wird nicht in jede Sprache dupliziert.

Eine Vermischung beider Begriffe würde den zentralen Trade-off verdecken. Die Initiative hat zwei Wege diskutiert:

| Weg | Repräsentation | Nutzen | Wesentliches Risiko oder offene Arbeit | Aktuelle Bewertung |
|---|---|---|---|---|
| **1. Vollständige Struktur in jeder Sprache** | Jede Sprache enthält jede strukturelle Position und könnte grundsätzlich die strukturelle Führung übernehmen. Der Core erzeugt Language-Layer-Shadows, wenn eine Position in dieser Sprache keinen sichtbaren Inhalt besitzt. | Jede Sprachebene ist strukturell eigenständig vollständig und kann eine lokale Sortierung ausdrücken. | Jede lokale Abweichung muss in andere Language Layers projiziert werden. Datensatzmenge, Synchronisierung, Workspace-Versionen, Referenzen und sichtbare Informationsdichte im Modul „Layout“ können mit Sprachen und strukturellen Abweichungen wachsen. Selbst eine kleine Umordnung kann mehrere erzeugte Platzhalter erfordern; der genaue Multiplikator ist modellabhängig und wurde nicht gemessen. | **Diskutiert, im Vergleich zu einer gemeinsamen Ebene derzeit jedoch nicht bevorzugt. Weder widerlegt noch formal verworfen.** |
| **2. Gemeinsame verborgene Struktur plus reale Language Layers** | Die Rollen der heutigen Default Language werden getrennt. Eine inhaltslose sprachneutrale Strukturebene speichert jede logische Position; die heutigen Inhalte der Default Language wechseln in eine eigene reale Sprachebene wie jede andere Ausgabesprache. Der Core erzeugt einen Structural Shadow, wenn eine Sprache eine neue Position einführt, und jede reale Variante verbindet sich mit dieser gemeinsamen Position. | Ein sprachübergreifender Bezugspunkt ohne universelle Language-Layer-Shadows; keine reale Ausgabesprache muss die gesamte Struktur führen. | Die genaue Entität und ihr Identifikator, die Migration heutiger Inhalte der Default Language, sprachspezifische Sortierung und Abwesenheit, Berechtigungen, APIs, Workspaces, Referenzen sowie das Verbergen der Strukturebene in Backend und Frontend müssen konzipiert und getestet werden. | **Aktuelle Präferenz für die Untersuchung. Weiterhin eine Hypothese und keine ausgewählte oder implementierte Core-Architektur.** |

Der zweite Weg sollte in der normalen Redaktion und Frontend-Ausgabe unsichtbar bleiben. „Verborgen“ ist Bestandteil des angestrebten Produktverhaltens und keine Aussage über den aktuellen Core. Eine gemeinsame Identität löst auch die lokale Sortierung nicht von selbst: Das Modell benötigt weiterhin einen expliziten sprachspezifischen Vertrag für Platzierung, Sortierung oder Abweichungen.

**Offene Fragen:**

- Welcher genaue Datensatz oder welche Entität trägt die Structural Identity, wenn keine reale Ausgabesprache privilegiert ist?
- Verwendet eine gemeinsame Struktur `sys_language_uid = 0` weiter, führt sie eine neue Entität ein oder nutzt sie eine andere Repräsentation?
- Wie werden Sortierung, Verschiebungen, lokale Ergänzungen, Auslassungen und Ersetzungen je Sprache um eine gemeinsame Identität dargestellt?
- Welche strukturellen Datensätze sind für Redakteurinnen und Redakteure, APIs, Referenzen und Workspaces sichtbar?
- Wann kann ein unabhängig erstellter Datensatz später sicher mit einer vorhandenen Struktur verbunden werden?
- Welche Migrations- und Lebenszyklusgarantien sind Voraussetzung dafür, dass Free Mode, Connected Mode und Mixed Mode in der normalen Oberfläche nicht mehr angezeigt werden müssen?
- Wie werden vorhandene Datensätze aus Free Mode und Mixed Mode migriert, ohne ihr unabhängiges Ergebnis zu verlieren?

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

## Was bereits erreicht wurde

Die Initiative und damit verbundene Core-Arbeiten haben bereits klar abgegrenzte Verbesserungen geliefert. Diese Ergebnisse machen das heutige System sicherer oder verständlicher. Sie setzen nicht die vollständige Vision um.

`main` ist ein fortlaufender Entwicklungs-Branch und keine stabile TYPO3-Versionsbezeichnung. Dieses Dokument nennt deshalb zusätzlich die Major-Entwicklungslinie, für die `main` zum jeweils angegebenen Zeitpunkt stand. Bei gemergten Changes ist dies die von `main` zum Merge-Zeitpunkt repräsentierte Linie. Bei offenen Changes repräsentierte `main` bei der Prüfung des externen Status am 11.08.2026 die TYPO3-v15-Entwicklungslinie. Feste Maintenance-Branches wie `14.3` und `13.4` werden direkt benannt.

| Ergebnis | Ausgelieferte Release-Linien | Unmittelbare Verbesserung | Verantwortung oder Erkenntnis |
|---|---|---|---|
| [Gerrit 83632](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83632), gemergt am 26.04.2024 | TYPO3 v13 (`main` zum Merge-Zeitpunkt); es ist keine weitere Release-Linie genannt. | Erzeugte valide Quelldaten für DataHandler-Lokalisierungstests. | Verlässliche Fixtures sind eine Voraussetzung für Verhaltensänderungen. |
| [Gerrit 84237](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84237), gemergt am 25.05.2024 | TYPO3 v13 (`main` zum Merge-Zeitpunkt); es ist keine weitere Release-Linie genannt. | Verhinderte verwaiste übersetzte Datensätze in einem Kopiervorgang. | Strukturelle und sprachliche Validität müssen beim Kopieren erhalten bleiben. |
| [Gerrit 83310](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83310), [86085](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86085) und [85912](https://review.typo3.org/c/Packages/TYPO3.CMS/+/85912), gemergt zwischen dem 13.05.2024 und dem 07.01.2025 | 83310 und 86085: TYPO3 v13 (`main` zum Merge-Zeitpunkt). 85912: TYPO3 v14 (`main` zum Merge-Zeitpunkt), zusätzlich TYPO3 v13 LTS (`13.4`) als gemergter [Gerrit-Patch 87655](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87655). | Ergänzte gezielte Tests für das Kopieren lokalisierter Inhalte auf eine nicht übersetzte Seite, das Kopieren von Inline Child Records und das Verschieben von `-1`-Inhalten. | Die Charakterisierung hält aktuelle Einschränkungen fest, bevor Verhalten geändert wird. |
| [Gerrit 86773](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86773) und [88827](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88827), gemergt am 10.01.2025 und 05.05.2025 | TYPO3 v14 (`main` zum Merge-Zeitpunkt), zusätzlich TYPO3 v13 LTS (`13.4`) als gemergte [Gerrit-Patches 87689](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87689) und [89297](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89297). | Synchronisierte beim Kopieren die Sprache von Inline Child Records und bewahrte beim Kopieren die Sprache von Übersetzungen. | Kopiervorgänge müssen die Sprachabsicht für Child Records und übersetzte Datensätze erhalten. |
| [Gerrit 89199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89199), gemergt am 30.04.2025 | TYPO3 v14 (`main` zum Merge-Zeitpunkt), zusätzlich TYPO3 v13 LTS (`13.4`) als gemergter [Gerrit-Patch 89286](https://review.typo3.org/c/Packages/TYPO3.CMS/+/89286). | Behält bei der Navigation innerhalb einer Site die ausgewählte Sprache bei, zeigt bei fehlender Übersetzung Inhalte der Default Language und setzt die Auswahl zurück, wenn eine andere Site diese Sprache nicht bereitstellt. | Verhindert, dass eine ungültige Sprachauswahl zu einem leeren Modul „Layout“ führt, und erhält zugleich den nützlichen redaktionellen Kontext, soweit dies möglich ist. |
| [Gerrit 92580](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92580), gemergt am 09.02.2026 | TYPO3 v14 (`main` zum Merge-Zeitpunkt), zusätzlich TYPO3 v13 LTS (`13.4`) als gemergter [Gerrit-Patch 92757](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92757). | Beschränkt kopierte Datensatzübersetzungen auf Sprachen, die in der Ziel-Site verfügbar sind. | Eine klar abgegrenzte Integritätskorrektur für den aktuellen Site-lokalen Umgang mit Sprachen. |
| [Gerrit 92881](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92881), gemergt am 20.02.2026 | TYPO3 v14 (`main` zum Merge-Zeitpunkt); es ist keine weitere Release-Linie genannt. | Trennt `localizeRecord()` von `copyRecord()` im DataHandler. | Klarere Code-Pfade unterstützen eine sicherere Charakterisierung und spätere Änderungen. |
| [Gerrit 88837](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88837), gemergt am 11.04.2026 | TYPO3 v14 (`main` zum Merge-Zeitpunkt); es ist keine weitere Release-Linie genannt. | Vermeidet die Neuzuordnung nicht sprachfähiger IRRE-Child-Records und verwendet separat zugewiesene Datensätze für lokalisierte Parent-Records. | Ein konkreter Fall, in dem explizit synchronisierte Daten die Mehrdeutigkeit der Zuständigkeit beseitigten. |
| [Gerrit 94831](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94831), gemergt am 21.07.2026 | TYPO3 v15 (`main` zum Merge-Zeitpunkt), [TYPO3 v14 LTS (`14.3`) als Gerrit-Patch 94866](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94866) und [TYPO3 v13 LTS (`13.4`) als Gerrit-Patch 94867](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94867) sind gemergt. | Löst übersetzte Unterseiten von Mount Points über die Default-Language-Beziehung auf und verhindert einen `404`. | Ein reales Projekt mit gemeinsamem Speicher führte zu einer kleinen, testgestützten Korrektur. |
| [Gerrit 94914](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94914), gemergt am 01.08.2026 | TYPO3 v15 (`main` zum Merge-Zeitpunkt), [TYPO3 v14 LTS (`14.3`) als Gerrit-Patch 94916](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94916) und [TYPO3 v13 LTS (`13.4`) als Gerrit-Patch 94915](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94915) sind gemergt. | Findet vorhandene Übersetzungen über `l10n_parent`, wenn `l10n_source` leer ist. | Bewahrt die Unterscheidung zwischen strukturellem Parent und Übersetzungsquelle und verhindert zugleich Duplikate. |
| [Gerrit 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170), gemergt am 10.08.2026 | TYPO3 v15 (`main` zum Merge-Zeitpunkt) und [TYPO3 v14 LTS (`14.3`) als Gerrit-Patch 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199) sind gemergt. | Korrigiert Vergleichsansichten, die Connected- und Free-Mode-Sprachen kombinieren: Connected-Mode-Inhalte bilden Vergleichszeilen, während jede Free-Mode-Sprache unabhängig dargestellt wird, auch wenn die Default Language keine Inhalte enthält. | Eine klar abgegrenzte Zwischenkorrektur für die aktuellen Modi. Sie bestimmt weder das zukünftige Bearbeitungs- noch das Strukturmodell. |
| [Gerrit 95178](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95178), gemergt am 10.08.2026 | TYPO3 v15 (`main` zum Merge-Zeitpunkt) und [TYPO3 v14 LTS (`14.3`) als Gerrit-Patch 95202](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95202) sind gemergt. | Hält beim Scrollen durch eine lange Vergleichsansicht im Modul „Layout“ Sprachname, Flag und Übersetzungsmodus sichtbar. | Verbessert die redaktionelle Orientierung in der aktuellen Oberfläche. Der Patch ist ausdrücklich eine Zwischenlösung und ändert oder bestimmt kein zukünftiges Strukturmodell. |

Die [Test-Extension der Initiative](https://github.com/t3thi/translation-handling) stellt außerdem reproduzierbare Szenarien für Übersetzungen, Fallback und Beziehungen bereit. Sie wurde 2025 wiederbelebt und um gezielte IRRE-Fälle erweitert. Sie ist Forschungsinfrastruktur und kein Beleg für geändertes Core-Verhalten.

Das wiederkehrende Muster ist hilfreich: Ein realer Fehler wird reproduziert, der verantwortliche Vertrag wird identifiziert, Tests definieren die Grenze und die Korrektur bleibt eng begrenzt. Dies ist die von der Initiative bevorzugte Form der inkrementellen Verbesserung.

## Laufende Arbeit mit Stand vom 11.08.2026

Jeder offene Core-Patch erhält entsprechend seinem aktuellen offiziellen Stand genau einen primären Statuseintrag. **WIP** hat Vorrang vor Review-Befunden. **Review-Nacharbeit erforderlich** bedeutet, dass das aktuelle Patch Set mindestens einen ungelösten Kommentar, eine aktuelle negative Review- beziehungsweise Verifizierungsstimme oder einen Merge-Konflikt besitzt. **Review-positiv und mergefähig** ist die hier verwendete Kategorie für einen finalen Patch-Stand; sie erfordert mindestens ein aktuelles Code-Review `+1`, keine aktuelle negative Stimme, keinen ungelösten Kommentar und ein mergefähiges aktuelles Patch Set. **Review ausstehend** umfasst offene Patches ohne diese Blocker, aber auch ohne aktuelles positives Code-Review. **Abgelehnt oder ersetzt** dokumentiert formal aufgegebene Änderungen, wenn ihre Begründung weiterhin relevant ist.

Für offene Gerrit-Änderungen bedeutet **Merge-Konflikt: Ja**, dass Gerrit das aktuelle Patch Set am 11.08.2026 gegenüber seinem Ziel-Branch als `mergeable: false` gemeldet hat. Dies kann sich ändern, wenn sich der Ziel-Branch oder das Patch Set ändert. **Nein** bedeutet `mergeable: true`; dies ersetzt weder Review noch Submit-Freigabe. Die Spalte für Release-Linien unterscheidet tatsächliche Gerrit-Changes von zusätzlichen Branches, die nur im `Releases:`-Footer eines Commits genannt werden. Ein genannter Branch ohne eigenen Gerrit-Change ist weder ein ausstehender noch ein gemergter Backport.

### In Arbeit (WIP)

| Patch | Ziel-Release-Linien und Backports | Aktueller Review-Stand | Merge-Konflikt | Geltungsbereich und Abgrenzung |
|---|---|---|---|---|
| [Gerrit 84338](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84338) | TYPO3 v15 (aktuelles `main`); es ist keine weitere Release-Linie genannt. | Patch Set 6; WIP; CI `+1`; 4 ungelöste Kommentare. | **Ja** | Schlägt vor, die ID der ersten Site Language als Default Language zu verwenden, statt `0` zu erzwingen. Weitreichende Core-Annahmen bleiben ungelöst, und die Initiative hat ihre unmittelbare Priorität später von diesem Weg weg verlagert. |
| [Gerrit 92267](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92267) | TYPO3 v15 (aktuelles `main`); es ist keine weitere Release-Linie genannt. | Patch Set 6; WIP; CI `+1`; keine ungelösten Kommentare. | Nein | Inventarisiert gespeicherte `Language All`-Annahmen. Ändert kein ausführbares Verhalten und ist weder eine Characterization-Test-Suite noch eine Ersatzimplementierung. |
| [Gerrit 92859](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92859) | TYPO3 v15 (aktuelles `main`); es ist keine weitere Release-Linie genannt. | Patch Set 6; WIP; CI `-1`; 6 ungelöste Kommentare. | **Ja** | Schlägt sprach- und Workspace-fähige MM-Tabellen vor. Das einheitliche Beziehungsmodell ist relevant, aber die Verwendung von Live-UIDs der Default Language ist ein inkrementeller Entwurf und keine Entscheidung über die zukünftige Structural Identity. |
| [Gerrit 93289](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93289) | TYPO3 v15 (aktuelles `main`); es ist keine weitere Release-Linie genannt. | Patch Set 1; WIP; CI `+1`; keine ungelösten Kommentare. | Nein | Ergänzt Workspace-Abdeckung für das Einfügeverhalten von Language All und schließt vor semantischen Änderungen eine Charakterisierungslücke. |
| [Gerrit 93819](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93819) | TYPO3 v15 (aktuelles `main`); TYPO3 v14 LTS (`14.3`) ist genannt, aber ein Backport-Change existiert noch nicht. | Patch Set 2; `[WIP]`; CI `+1`; keine ungelösten Kommentare. | **Ja** | Ergänzt Schutzmechanismen beim Verschieben von Free-Mode-Inhalten, während der aktuelle Free Mode weiterhin unterstützt wird. |
| [Forge 110328](https://forge.typo3.org/issues/110328) und [Gerrit 95042](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95042) | TYPO3 v15 (aktuelles `main`); es ist keine weitere Release-Linie genannt. | Patch Set 1; `[WIP]`; CI `+1`; keine ungelösten Kommentare. | Nein | Beschränkt auswählbare Translation Parents, um doppelte oder strukturell ungültige Zuordnungen zu verhindern. Der Patch ist kein implementierter Fix. |
| [Forge 110330](https://forge.typo3.org/issues/110330) und [Gerrit 95043](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95043) | TYPO3 v15 (aktuelles `main`); es ist keine weitere Release-Linie genannt. | Patch Set 1; `[WIP]`; CI `+1`; keine ungelösten Kommentare. | Nein | Verbirgt Connected Mode, wenn die Quelle keine Default-Language-Beziehung herstellen kann. Eine Free-Mode-Quelle kann die fehlende Verbindung nicht erzeugen. |

### Review-Nacharbeit erforderlich

| Patch | Ziel-Release-Linien und Backports | Aktueller Review-Stand | Merge-Konflikt | Geltungsbereich und Abgrenzung |
|---|---|---|---|---|
| [Gerrit 87595](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87595) | TYPO3 v15 (aktuelles `main`); TYPO3 v14 LTS (`14.3`) ist genannt, aber ein Backport-Change existiert noch nicht. | Patch Set 11; CI `-1`; 3 ungelöste Kommentare. | **Ja** | Ändert die Sprache vorhandener Inline Child Records gemeinsam mit ihrem Parent. Die Reviews erfordern weiterhin eine breitere Abdeckung von Beziehungen, Tests und Migrationsaspekten. |
| [Gerrit 92777](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92777) | TYPO3 v15 (aktuelles `main`); TYPO3 v14 LTS (`14.3`) ist genannt, aber ein Backport-Change existiert noch nicht. | Patch Set 10; zwei Code-Review `+1`; CI `+1`; 1 ungelöster Kommentar. | Nein | Beschränkt kopierte Free-Mode-Datensätze auf im Zielkontext verfügbare Sprachen. Dies verbessert die Integrität des aktuellen Modells, ohne ein zukünftiges Strukturmodell auszuwählen. |
| [Gerrit 93063](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93063) | TYPO3 v15 (aktuelles `main`); TYPO3 v14 LTS (`14.3`) ist genannt, aber ein Backport-Change existiert noch nicht. | Patch Set 7; Code-Review `+1`; CI `+1`; keine ungelösten Kommentare. | **Ja** | Warnt vor ungültigen Translation Parents. Der Patch ist review-positiv, muss aber gegenüber dem aktuellen TYPO3-v15-Branch `main` wieder mergefähig gemacht werden; er macht strukturelle Beschädigungen sichtbar, repariert oder gestaltet Identität aber nicht neu. |
| [Forge 110008](https://forge.typo3.org/issues/110008) und [Gerrit 94510](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94510) | TYPO3 v15 (aktuelles `main`); TYPO3 v14 LTS (`14.3`) und TYPO3 v13 LTS (`13.4`) sind genannt, aber Backport-Changes existieren noch nicht. | Patch Set 7; CI `-1`; 1 ungelöster Kommentar. | Nein | Behandelt eine Regression nach dem gemergten [Gerrit-Patch 88828](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88828), bei der die Ausgabe unter `strict` von einem verborgenen Datensatz in der angeforderten Sprache auf eine andere Sprache zurückfallen kann. Solange der Fix nicht gemergt ist, bleibt das aktuelle Verhalten unverändert. |
| [Gerrit 94917](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94917) | TYPO3 v15 (aktuelles `main`); kein Backport-Branch ist genannt und es existiert kein Backport-Change. | Patch Set 4; keine aktuelle Code-Review-Stimme; 1 ungelöster Kommentar. | **Ja** | Verbessert die Vergleichsdarstellung für Free Mode und Mixed Mode. Im Review wurde die Ersetzung durch den gemergten [TYPO3-v15-Change 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170) und den [TYPO3-v14-LTS-Backport 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199) vorgeschlagen, 94917 ist offiziell jedoch weiterhin offen und nicht aufgegeben. |
| [Gerrit 93752](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93752) | TYPO3 v15 (aktuelles `main`); TYPO3 v14 LTS (`14.3`) ist genannt, aber ein Backport-Change existiert noch nicht. | Patch Set 3; CI `+1`; keine aktuelle Code-Review-Stimme und kein ungelöster Kommentar. | **Ja** | Ergänzt Schutzmechanismen beim Kopieren von Free-Mode-Inhalten. Das aktuelle Patch Set muss zunächst gegenüber dem aktuellen TYPO3-v15-Branch `main` wieder mergefähig gemacht werden. |

### Review-positiv und mergefähig

Derzeit erfüllt kein Patch alle Kriterien. Gerrit 92777 besitzt positive Reviews, aber einen ungelösten Kommentar; Gerrit 93063 besitzt ein positives Review und keinen ungelösten Kommentar, aber einen Merge-Konflikt. Beide verbleiben deshalb unter **Review-Nacharbeit erforderlich**.

### Review ausstehend

| Patch | Ziel-Release-Linien und Backports | Aktueller Review-Stand | Merge-Konflikt | Geltungsbereich und Abgrenzung |
|---|---|---|---|---|
| [Gerrit 93028](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93028) | TYPO3 v15 (aktuelles `main`); TYPO3 v14 LTS (`14.3`) ist genannt, aber ein Backport-Change existiert noch nicht. | Patch Set 6; CI `+1`; keine aktuelle Code-Review-Stimme und kein ungelöster Kommentar. | Nein | Wendet die angeforderte Sprache des Parents auf neu erstellte Relation Child Records an und lässt bereits lokalisierte Child Records unverändert. |
| [Gerrit 95038](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95038) | TYPO3 v15 (aktuelles `main`); es ist keine weitere Release-Linie genannt. | Patch Set 2; CI `+1`; keine aktuelle Code-Review-Stimme und kein ungelöster Kommentar. | Nein | Hält `pages.doktype` mittels `l10n_mode=exclude` an der Default-Language-Seite ausgerichtet und stellt für bereits abweichende Übersetzungen einen Upgrade Wizard bereit. Dies erzwingt eine Invariante des aktuellen Modells und wählt kein zukünftiges Strukturmodell aus. |

### Abgelehnt oder ersetzt

| Patch | Ziel-Release-Linien und Backports | Offizieller Stand | Merge-Konflikt | Begründung |
|---|---|---|---|---|
| [Gerrit 92585](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92585) | TYPO3 v15 (`main` zum Zeitpunkt der Aufgabe); TYPO3 v14 LTS (`14.3`) war genannt, aber es existiert kein Backport-Change. | Am 07.08.2026 aufgegeben. | Nicht anwendbar | Die eng begrenzte Korrektur der Free-Mode-Darstellung wurde im gemergten [TYPO3-v15-Change 95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170) und [TYPO3-v14-LTS-Backport 95199](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95199) weiterentwickelt. |

### Unterstützende Patches und Forschung ohne Patch

| Arbeit | Aktueller Stand | Merge-Konflikt | Bedeutung |
|---|---|---|---|
| [dbdoctor PR 98](https://github.com/lolli42/dbdoctor/pull/98) | Offen; GitHub meldet den aktuellen Stand als nicht mergefähig und `dirty`. | **Ja** | Repariert `l10n_state`, wenn Synchronisierungsmetadaten gespeicherten übersetzten Werten widersprechen. Dies ist kein gemergtes Core-Verhalten. |
| [dbdoctor PR 171](https://github.com/lolli42/dbdoctor/pull/171) | Offen mit `[WIP]`; GitHub meldet den aktuellen Stand als konfliktfrei und mergefähig. | Nein | Erkennt verwaiste Übersetzungen aus historischen Kopiervorgängen. Dies ist Diagnose- und Reparaturwerkzeug, kein gemergter Core-Fix und kein neues Übersetzungsmodell. |
| Untersuchung der strukturellen Ebene und der Editing Language | Eine Produktbeschreibung existiert; ein fertiggestellter Prototyp ist nicht belegt. | Nicht anwendbar | Eine Skizze, ein Click Dummy oder ein Experiment als Extension würde den redaktionellen Nutzen und strukturelle Annahmen vor einer Architekturentscheidung prüfen. |

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

## Nächste sinnvolle Schritte

Dies ist die aus heutiger Sicht sinnvollste Abfolge von Aktivitäten der Initiative und keine verbindliche TYPO3-Release-Roadmap.

1. **Evidenzbasis aktuell halten.** Reproduzierbare Redaktions- und Projekt-Use-Cases ergänzen, insbesondere wenn sich Sprache, Land, Struktur und Ausgabeabsicht unterscheiden.
2. **Gezielte Charakterisierung abschließen.** Das `-1`-Inventar prüfen, jedes valide Verhalten einem Test zuordnen und bekannte Lücken in Workspaces und DataHandler schließen.
3. **Klar abgegrenzte Korrekturen abschließen.** Den weiterhin offenen überlappenden Free-/Mixed-Change 94917 formal klären, nachdem sein Ersatz für TYPO3 v15 (`main`) und TYPO3 v14 LTS (`14.3`) gemergt wurde, Integritäts-Patches für Kopieren und Verschieben voranbringen, die Entwürfe zu Parent Selector und Wizard validieren und den fehlschlagenden Patch zur Strict-Fallback-Regression korrigieren.
4. **Produktverhalten vor der Speicherung prototypisch untersuchen.** Editing Language, einen Arbeitsablauf ohne Moduswahl im Modul „Layout“, direktes Anlegen in einer Zielsprache, lokale strukturelle Ergänzungen und explizite Abwesenheit anhand realistischer redaktioneller Abläufe prüfen.
5. **Die aktuelle strukturelle Präferenz gegenüber ihrem Gegenmodell validieren.** Dieselben Akzeptanzfälle für die gemeinsame verborgene Struktur, vollständige Language-Layer-Shadows, Sparse Records und hybride Ansätze verwenden. Datensatzwachstum, Informationsdichte im Modul „Layout“, Workspaces, Referenzen, Migration und Betriebskosten messen, statt sie anzunehmen.
6. **Parität der ersten Stufe definieren und charakterisieren.** Das Flag für alle Ziele, die Zielanlage, die vollständige erzwungene Feldmenge, Quell- und Zielidentität, Konflikte und jeden Übergang spezifizieren. Zunächst nachweisen, dass damit die aktuelle `-1`-Ausgabe reproduziert wird, und anschließend das eigenständig zu entscheidende Multi-Select sowie andere granulare Erweiterungen am selben Prozess bewerten.
7. **Vertrag für semantische Identität abstimmen.** Entscheiden, was BCP 47 identifiziert, wie Site Languages darauf abgebildet und wie Legacy-Werte migriert werden.
8. **Kompatibilität vor der Entfernung konzipieren.** Zunächst explizite Alternativen einführen, Migrations- und Extension-Hinweise bereitstellen und erst danach eine Deprecation alter Semantik erwägen.
9. **Evidenz zu den zuständigen Entscheidungsträgern bringen.** Die Initiative sollte Trade-offs und Konsequenzen konkret machen, damit Core-, Produkt- und Architekturentscheidungen auf einer gemeinsamen Faktenbasis getroffen werden können.

## Evidenzbasis und Pflege

Diese Rekonstruktion berücksichtigt sämtliche Sitzungsprotokolle des Repositorys bis einschließlich 31.07.2026 und alle verfügbaren Transkripte bis einschließlich 31.07.2026. Ein bereitgestellter Snapshot des Initiative-Channels wurde ergänzend auf dauerhafte Use Cases, Implementierungsreferenzen und nicht protokollierte Lücken geprüft; die Stichtage für Protokolle und Transkripte werden dadurch nicht fortgeschrieben. Die aktuellen Gerrit-, Forge- und verlinkten Statusangaben unterstützender Patches in den Abschnitten zu Ergebnissen und laufender Arbeit wurden am 11.08.2026 geprüft. Die [T3DD26-Präsentation](https://content.eric-harrer.de/t3dd26/) stellt das in dieser Rekonstruktion verwendete konzeptionelle Modell dar.

Zentrale Primärquellen sind:

| Thema | Evidenz aus Sitzungen |
|---|---|
| Community-Feedback und redaktionelle Vereinfachung der Modi | [Feedback-Matrix von T3DD22 und nachfolgenden Veranstaltungen](https://docs.google.com/spreadsheets/d/1Y8KnuYxMoXyVaZzVHENBp_1fg2M-JGxHog6K3T9qn_Q/edit?gid=0#gid=0), [22.03.2024](https://notes.typo3.org/s/kqdwFxW1m), [11.07.2025](https://notes.typo3.org/s/k11hyaA4N), [24.10.2025](https://notes.typo3.org/s/2Ysd3gDdn) |
| Language Identity und BCP 47 | [19.01.2024](https://notes.typo3.org/s/sEONb4kd6), [25.07.2025](https://notes.typo3.org/s/dtw4v9T7S), [31.07.2026](https://notes.typo3.org/s/z5ICno5pK2) |
| Ersatz von `-1`, Parität des vollständigen Datensatzes und Lebenszyklus der Synchronisierung | [28.06.2024](https://notes.typo3.org/s/GQwWxdUKO), [31.01.2025](https://notes.typo3.org/s/kEaZn6jJF), [26.09.2025](https://notes.typo3.org/s/1RnTSuBsq), [28.11.2025](https://notes.typo3.org/s/Sxl-kkYjW), [11.06.2026](https://notes.typo3.org/s/1-J3KsT7VU) |
| Aktuelle Modi der Feldsynchronisierung und mögliche Konsolidierung | [12.04.2024](https://notes.typo3.org/s/gjl-sog92), [26.04.2024](https://notes.typo3.org/s/D32XRXoCk), [18.10.2024](https://notes.typo3.org/s/8vI0MnUbs), [22.08.2025](https://notes.typo3.org/s/gL97CaQ5M), [08.05.2026](https://notes.typo3.org/s/-0p3kqzMll) |
| Konsistenz von `l10n_state` und Schäden durch historische Kopiervorgänge | [26.04.2024](https://notes.typo3.org/s/D32XRXoCk), [06.02.2026](https://notes.typo3.org/s/D8oadqoN-7#) |
| Weitgehend verbundene Strukturen und lokale Ausnahmen | [22.03.2024](https://notes.typo3.org/s/kqdwFxW1m), [08.05.2026](https://notes.typo3.org/s/-0p3kqzMll), [26.06.2026](https://notes.typo3.org/s/-RP1PwIafA), [10.07.2026](https://notes.typo3.org/s/ccbVIOYfEy) |
| Vollständige Ebenen, Shadows und gemeinsame Struktur | [18.07.2025](https://notes.typo3.org/s/L0lQKrWaW), [24.10.2025](https://notes.typo3.org/s/2Ysd3gDdn), [29.05.2026](https://notes.typo3.org/s/0AJqa7JwuJ), [10.07.2026](https://notes.typo3.org/s/ccbVIOYfEy) |
| Editing Language | [08.05.2026](https://notes.typo3.org/s/-0p3kqzMll), [29.05.2026](https://notes.typo3.org/s/0AJqa7JwuJ) |
| Output Policy, Strict-Verhalten und beabsichtigte Abwesenheit | [15.12.2023](https://notes.typo3.org/s/ddSKDuz1Q), [11.06.2026](https://notes.typo3.org/s/1-J3KsT7VU), [10.07.2026](https://notes.typo3.org/s/ccbVIOYfEy), [31.07.2026](https://notes.typo3.org/s/z5ICno5pK2) |
| Jüngster Arbeitsstand und Entscheidungsgrenze | [24.07.2026](https://notes.typo3.org/s/Sn7GKjSk_3), [31.07.2026](https://notes.typo3.org/s/z5ICno5pK2) |

Zukünftige Aktualisierungen müssen den [Pflegehinweisen für den Current State](https://github.com/t3thi/Documentation/blob/main/MeetingMinutes/current-state-maintenance.md) folgen. Die zentrale Regel lautet:

> **Aktualisiere den aktuellen Stand, nicht die Historie.**
