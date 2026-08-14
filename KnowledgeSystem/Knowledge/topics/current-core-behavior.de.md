---
id: topic:current-core-behavior
title: "Aktuelles Core-Verhalten"
language: de
updated: "2026-08-11"
knowledge:
  - K-000002
  - K-000003
  - K-000004
  - K-000006
  - K-000009
  - K-000010
  - K-000014
  - K-000015
  - K-000021
  - K-000027
history: []
decisions: []
translation_of: topic:current-core-behavior
source_updated: "2026-08-11"
translation_reviewed_at: "2026-08-11"
source_digest: "sha256:ee8205c91ae0c5cf6540683550604c642303feba38cff91d15fa6d02feea30e6"
---

# Aktuelles Core-Verhalten

## Aktuelle Synthese

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
