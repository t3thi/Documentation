---
title: "Translation Handling Initiative - Aktueller Stand"
last_updated: "2026-08-10"
weekly_minutes_included_through: "2026-07-31"
transcripts_included_through: "2026-07-31"
external_status_checked_through: "2026-08-10"
---

# Translation Handling Initiative: Aktueller Stand

[Englische Fassung](https://notes.typo3.org/s/RhkYPguwb) · [Übersicht der Sitzungsprotokolle](https://notes.typo3.org/s/f3ae8fZSD) · [Hinweise zur Pflege dieses Dokuments](https://github.com/t3thi/Documentation/blob/main/MeetingMinutes/current-state-maintenance.md)

Dies ist die deutsche Fassung der kanonischen Beschreibung des aktuellen Verständnisses, der Vision und der Arbeit der Translation Handling Initiative. Sie erläutert, warum die Initiative am Translation Handling arbeitet, welche Erkenntnisse ihre Forschung erbracht hat, welche Richtung sie derzeit verfolgt, welche Ansätze sie untersucht und welche Entscheidungen weiterhin offen sind.

Das Dokument ist keine Chronologie der Sitzungen, keine Patch-Liste, kein eigenständiger Backlog und keine beschlossene TYPO3-Core-Roadmap. Historische Diskussionen bleiben in den Sitzungsprotokollen erhalten. Dieses Dokument wird aktualisiert, wenn sich der aktuelle Stand ändert.

## Geltungsbereich und Lesehinweise

Der Schwerpunkt liegt auf dem Umgang mit redaktionell gepflegten Datenbankdatensätzen wie Seiten, Inhaltselementen, Dateimetadaten und Extension-Datensätzen. XLIFF-Dateien für System- und Oberflächenbezeichnungen sind ein verwandter Bereich der Lokalisierung, aber nicht das Hauptthema dieses Dokuments.

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
- Eine Struktur, die „mostly connected, selectively different“ unterstützt, ist eine zentrale Produktanforderung. Vollständige Language Layers, Shadow Records und eine gemeinsame strukturelle Ebene bleiben mögliche Ansätze und sind keine ausgewählte Architektur.
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
| **Inhalte für alle Sprachen** | Ein Datensatz verwendet `sys_language_uid = -1` im Sinne von „alle Sprachen“, obwohl dies ein Verhalten und keine menschliche Sprache bezeichnet. Der Sonderwert wirkt sich auf viele voneinander unabhängige Core-Pfade aus. | Synchronization Intent und Language Identity |
| **Inhalt ausschließlich für eine Zielsprache** | Redakteurinnen und Redakteure können Inhalte nicht immer direkt dort anlegen, wo sie benötigt werden, und zugleich die nützliche strukturelle Beziehung für den Rest der Seite beibehalten. | Structural Identity |
| **Bearbeitung ausgehend von einer verständlichen Sprache** | Eine chinesische Redakteurin oder ein chinesischer Redakteur muss chinesische Inhalte gegebenenfalls ausgehend von Englisch erstellen, während die Default Language der Site Deutsch ist. Eine dauerhaft privilegierte Default-Language-Spalte erschwert es, diesen Arbeitsablauf zu verstehen. | Structural Identity und redaktioneller Kontext |
| **Übersetzung von Dateimetadaten in größerem Umfang** | Das [Übersetzungsmenü des Moduls „Media“](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/filelist/Classes/FileList.php#L1225-L1305) zeigt für jede Datei, ob Metadaten für eine konfigurierte Sprache angelegt oder bearbeitet werden können. Das Anlegen oder Bearbeiten zielsprachlicher Alternativtexte bleibt ein Ablauf pro Datei; im aktuellen Core ist kein eigener Ablauf für Massenerstellung oder Vollständigkeitsprüfung erkennbar. | Structural Identity und redaktioneller Arbeitsablauf |
| **Beabsichtigte Abwesenheit** | Sowohl eine fehlende Übersetzung als auch eine bewusst deaktivierte oder ausgelassene Übersetzung können zu Fallback führen. Die redaktionelle Absicht wird nicht ausreichend explizit dargestellt. | Output Policy |

„Mostly connected, selectively different“ beschreibt den Zwischenbereich, den TYPO3 besser unterstützen sollte, am deutlichsten. Identische übersetzte Strukturen und vollständig unabhängige Strukturen sind beide valide. Eine kleine lokale Ausnahme sollte Redakteurinnen und Redakteure nicht dazu zwingen, die Vorteile des weitgehend gemeinsamen Inhalts aufzugeben. Siehe die [Use-Case-Analyse vom Juni 2026](https://notes.typo3.org/s/-RP1PwIafA) und ihre [Präzisierung vom Juli](https://notes.typo3.org/s/ccbVIOYfEy).

## Forschungsergebnisse: der heutige Stand

Das aktuelle TYPO3-Verhalten beruht nicht auf einem einzigen Übersetzungsmodell. Es entsteht durch das Zusammenspiel mehrerer Daten- und Konfigurationsverträge.

| Aktueller Vertrag | Was er heute ausdrückt | Wesentliche Kopplung |
|---|---|---|
| **Konfiguration der Site Language** | Eine Site-lokale Integer-ID, Locale, Fallback-Typ und konfigurierte Fallback-IDs. | Eine lokale numerische ID wird zugleich als Sprachwert eines Datensatzes verwendet. |
| **Sprachwert eines Datensatzes** | `sys_language_uid` speichert eine positive Sprach-ID, `0` für die Default Language oder, soweit unterstützt, `-1` für alle Sprachen. | Identität, Default-Rolle und sprachübergreifendes Verhalten teilen sich ein Feld. |
| **Übersetzungsbeziehung** | `l10n_parent` oder `l18n_parent` verbindet eine Übersetzung mit einem Default-Language-Datensatz. | Die Beziehung steuert zugleich die Darstellung im Modul „Layout“ und Teile des Overlay-Verhaltens. |
| **Übersetzungsquelle** | `l10n_source` identifiziert den Datensatz, aus dem Inhalte übernommen wurden. | Herkunft der Quelle und struktureller Parent stehen in Beziehung, sind aber nicht identisch. |
| **Feldsynchronisierung** | `l10n_mode=exclude` und `allowLanguageSynchronization` steuern ausgewählte Felder; `l10n_state` speichert `parent`, `source` oder `custom`. | Feldbezogene Absicht ist vom datensatzweiten Language-All-Verhalten getrennt. |
| **Übersetzungsmodus im Backend** | Connected Mode, Free Mode oder Mixed Mode wird aus den Datensatzbeziehungen abgeleitet. | Der redaktionell sichtbare Modus bildet Eigenschaften der aktuellen Datenstruktur ab. |
| **Ausgaberichtlinie im Frontend** | `fallbackType` einer Site und konfigurierte Fallback-IDs bestimmen Auswahl- und Overlay-Verhalten. | Ein Fallback zur Laufzeit ist von der strukturellen Beziehung im Backend getrennt. |

Seitenübersetzungen behalten immer eine Parent-Beziehung. Free Mode und Mixed Mode beschreiben hauptsächlich, wie andere Datensätze, insbesondere Inhaltselemente, innerhalb des Moduls „Layout“ zueinander in Beziehung stehen.

Die oben beschriebenen aktuellen Verträge werden durch den für T3DD26 validierten Core-Code-Stand belegt: [TCA-Sprachbeziehungen](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Configuration/Tca/TcaEnrichment.php#L185-L247), [Lokalisierungsstatus](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/DataHandling/Localization/State.php#L29-L39), [Moduserkennung im Modul „Layout“](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/backend/Classes/View/BackendLayout/ContentFetcher.php#L165-L203) und [Erzeugung des Fallbacks](https://github.com/TYPO3/typo3/blob/ee251c96d55b6e609a77334324be0b91bb0839e5/typo3/sysext/core/Classes/Context/LanguageAspectFactory.php#L27-L60).

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
9. **Free Mode bleibt ein valider Endzustand.** Vollständig unabhängige Strukturen existieren. Die aktuelle Richtung besteht darin, unnötige Modusentscheidungen zu reduzieren und lokale Ausnahmen besser zu unterstützen. Sie besteht nicht in der Behauptung, Free Mode sei deprecated.
10. **Kleine Korrekturen und Tests sind Teil der Architekturarbeit.** Sie machen tatsächliche Invarianten sichtbar und verhindern, dass ein zukünftiges Modell auf unvollständigen Annahmen beruht.
11. **Synchronisierungsmetadaten und gespeicherte Werte können einander widersprechen.** In vorhandenen Daten beweist ein leerer oder fehlender `l10n_state`-Eintrag nicht, dass ein lokalisiertes Feld seinem Parent entspricht. Die aktuelle [Zustandsanreicherung im Core](https://github.com/TYPO3/typo3/blob/f1cb929fe861d3156d1735360aff0a710c884a0d/typo3/sysext/core/Classes/DataHandling/Localization/State.php#L223-L238) behandelt einen fehlenden Feldzustand ohne Vergleich der gespeicherten Werte als `parent`. Das Backend kann das Feld daher als vererbt darstellen, obwohl sein gespeicherter Wert abweicht. Der offene [dbdoctor PR 98](https://github.com/lolli42/dbdoctor/pull/98) zeigt einen Reparaturansatz; er ist kein gemergtes Core-Verhalten.

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

**Aktuelle Kopplung:** `-1` bewirkt, dass ein Datensatz für alle Sprachen gilt. Connected Translations und `l10n_state` können ausgewählte Felder synchronisieren. Diese Mechanismen unterscheiden sich in Geltungsbereich, Durchsetzbarkeit und Lebenszyklus, während „Language All“ weiterhin als Sprachwert codiert ist.

**Abgeleitete Anforderungen:**

- Datensatzweite und feldbezogene Synchronisierung müssen explizit und voneinander unterscheidbar sein.
- Die vorgesehenen Zielsprachen müssen bekannt sein.
- Redakteurinnen und Redakteure müssen verstehen, welche Werte vererbt, synchronisiert oder unabhängig sind.
- Automatisch erstellte Varianten benötigen nachvollziehbare Herkunft und Zuständigkeit.
- Aktivierung, Änderung, Loslösung und Deaktivierung müssen ein definiertes, wiederholbares Verhalten besitzen.
- Workspaces, Versionen, Beziehungen, Löschungen, Wiederherstellung und neu hinzugefügte Site Languages müssen Teil des Lebenszyklus sein.
- Migration und Reparatur müssen `l10n_state` mit gespeicherten Werten und Beziehungen abgleichen, ohne beabsichtigte manuelle Abweichungen zu überschreiben.

**Vision:** „Einmal für mehrere Sprachen pflegen“ sollte als Synchronization Intent für konkrete Sprachvarianten dargestellt werden, nicht als fiktive Sprachidentität.

**Offene Fragen:**

- Ist der erste Ersatz ein Boolean für alle Ziele, eine ausgewählte Zielmenge, Synchronisierungsgruppen oder eine andere Richtlinie?
- Was geschieht, wenn bereits manuelle Übersetzungen vorhanden sind?
- Welche Werte dürfen überschrieben werden, und wer darf diesen Übergang autorisieren?
- Was geschieht mit erzeugten Datensätzen, wenn die Synchronisierung deaktiviert wird?
- Wie werden erzeugte Inhalte von unabhängig gepflegten Inhalten unterschieden?
- Wird eine später hinzugefügte Sprache automatisch Mitglied einer bestehenden Synchronisierungsgruppe?
- Wie werden fehlende oder inkonsistente `l10n_state`-Einträge eingeordnet, wenn skalare Werte oder Beziehungen abweichen?

Ein Boolean-Flag für alle Sprachen ist ein nützliches Minimalmodell für die Diskussion, aber weder ein vollständiger Lebenszyklus noch eine beschlossene TCA-API.

### 3. Structural Identity

**Frage:** Welche Datensätze repräsentieren in verschiedenen Sprachen dieselbe logische Inhaltsposition?

Eine logische Inhaltsposition ist der gemeinsame Ort oder die gemeinsame Funktion einer Seite, eines Inhaltselements oder eines anderen lokalisierbaren Datensatzes. Sie ist nicht notwendigerweise der Datensatz, dessen Text als Übersetzungsquelle verwendet wurde.

**Aktuelle Kopplung:** Im Connected Mode ist der Default-Language-Datensatz zugleich sichtbarer Inhalt und struktureller Parent. Free Mode entfernt diese Beziehung. Mixed Mode kombiniert beide Zustände auf einer Seite. Eine lokale Ergänzung erfordert deshalb entweder einen künstlichen Default-Datensatz oder einen unabhängigen Datensatz, der die gemeinsame Beziehung verliert.

**Abgeleitete Anforderungen:**

- TYPO3 muss die weitgehend gemeinsame Struktur erhalten und zugleich explizite sprachspezifische Ergänzungen, Auslassungen, Ersetzungen oder Umordnungen ermöglichen können.
- Eine strukturelle Beziehung darf keinen bedeutungslosen sichtbaren Inhalt in einer anderen Sprache erfordern.
- Redakteurinnen und Redakteure sollten Inhalte direkt in der Sprache anlegen können, in der sie benötigt werden.
- Das System sollte die Integrität der Beziehungen verwalten und doppelte oder unmögliche Parent-Zuordnungen verhindern.
- Inhaltsquelle, struktureller Parent und aktueller Bearbeitungskontext müssen voneinander getrennt bleiben.
- Das Modell muss Seiten, Inhalte und andere lokalisierbare Datensätze abdecken und zugleich notwendige Unterschiede zwischen Datensatztypen erhalten.
- Redakteurinnen und Redakteure benötigen eine klare Übersicht darüber, welche Sprachvarianten vorhanden sind, sowie effiziente Abläufe zum Anlegen von Varianten für Datensätze jenseits von Seiten und Inhalten, einschließlich Dateimetadaten.

**Vision:** Strukturelle Beziehungen sollten explizit genug sein, um „mostly connected, selectively different“ ohne künstliche Default-Language-Partner oder einen unbeabsichtigten Verlust von Connected-Mode-Verhalten zu unterstützen.

**Editing Language:** Das bevorzugte Produktkonzept ist eine auswählbare Inhaltssprache, von der aus Redakteurinnen und Redakteure arbeiten, unabhängig von der Sprache der Backend-Oberfläche. Eine chinesische Redakteurin oder ein chinesischer Redakteur könnte beispielsweise chinesische Inhalte ausgehend von Englisch erstellen, während Deutsch die Default Language der Site bleibt. Das Modul „Layout“ würde Englisch dort anzeigen, wo es heute stets die Default Language anzeigt. Dies ist eine Produktrichtung und keine implementierte Funktion.

**Offene Fragen:**

- Wo liegt die Structural Identity, wenn keine reale Ausgabesprache privilegiert ist?
- Werden fehlende Sprachpositionen durch Datensätze, eine neutrale Strukturentität, abgeleiteten Zustand oder einen hybriden Ansatz repräsentiert?
- Wie werden Sortierung, Verschiebungen und lokale Ergänzungen über mehrere Language Layers hinweg dargestellt?
- Welche strukturellen Datensätze sind für Redakteurinnen und Redakteure, APIs, Referenzen und Workspaces sichtbar?
- Wann kann ein unabhängig erstellter Datensatz später sicher mit einer vorhandenen Struktur verbunden werden?
- Welche heutigen Verhaltensweisen von Free Mode, Connected Mode und Mixed Mode bleiben in der UX explizit?

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
| `-1`-Verhalten ersetzen | Explizite Datensatzsynchronisierung einführen, zunächst möglicherweise als Flag für alle Ziele und später mit ausgewählten Zielen. | Entfernt Verhalten aus dem Sprachfeld und materialisiert explizite Varianten. | Vollständiger Lebenszyklus, Konflikte, Herkunft, Workspaces, Löschung und Migration. | **Klare Richtung; Konzeption unvollständig.** |
| Aktuelle Sparse Records erhalten | Aktuelle Datensätze und Beziehungen beibehalten, aber APIs, Tests und UX präzisieren. | Geringste Migrations- und Datenmengenkosten. | Behält Zustände fehlender Datensätze, Overlay-Verzweigungen und Kopplung an die Default Language bei. | **Aktuelle Ausgangsbasis, nicht für jede Anforderung ausreichend.** |
| Vollständige Language Layers | Für jede relevante Sprache eine strukturelle beziehungsweise inhaltliche Repräsentation materialisieren und bei fehlendem Inhalt Platzhalter verwenden. | Explizitere Ebenen und potenziell einfachere direkte Abfragen und Ausgabe. | Mehr Datensätze, Synchronisierung, Informationsdichte für Redakteurinnen und Redakteure, Workspace-Versionen, Referenzen und Migration. | **Diskutierte Richtung; nicht ausgewählt.** |
| Gemeinsame neutrale Strukturebene | Gemeinsame Structural Identity getrennt von realen Ausgabesprachen speichern. | Keine reale Sprache muss die strukturelle Führung übernehmen; weniger Duplizierung vollständiger Ebenen. | Führt eine neue Abstraktion ein, die jeder Bearbeitungs-, Abfrage-, Beziehungs- und Berechtigungspfad verstehen muss. | **Möglicher Ansatz; Hypothese.** |
| Begrenzter hybrider Ansatz | Eine gemeinsame Structural Identity beibehalten und Sprachdatensätze nur materialisieren, wenn Inhalte oder explizite Abwesenheit sie erfordern. | Könnte explizite Struktur mit begrenztem Datenwachstum verbinden. | Mehr Zustände und Übergangsregeln; analytische Option, die von der Initiative noch nicht validiert wurde. | **Analytische Option; keine Präferenz etabliert.** |
| Editing Language | Redakteurinnen und Redakteure die Inhaltssprache auswählen lassen, von der aus sie arbeiten, und diese als primären Backend-Kontext verwenden. | Entfernt irrelevante Default-Language-Texte aus dem Arbeitsablauf und unterstützt Quellen, die nicht der Default Language entsprechen. | Page Tree, Module „Layout“ und „Records“, Berechtigungen, Sortierung sowie Verhalten von Quelle und Herkunft. | **Bevorzugte Produktbeschreibung; Prototyp weiterhin erforderlich.** |
| Explizite Absicht bei Abwesenheit | Darstellen, ob Fallback für eine strukturelle Position fortgesetzt oder beendet werden soll. | Macht regionale Auslassung vorhersehbar. | Abwärtskompatibilität, UX und konsistente Frontend-Auswertung. | **Abgeleitete Anforderung; Repräsentation offen.** |

Ein generisches multidimensionales Modell für Sprache, Land, Markt, Marke oder Zielgruppe ist eine angrenzende Zukunftsperspektive. Es könnte später helfen, Sprache von anderen Inhaltskontexten zu trennen, ist aber nicht die unmittelbare Antwort der Initiative auf die vier Verantwortlichkeiten.

## Was bereits erreicht wurde

Die Initiative und damit verbundene Core-Arbeiten haben bereits klar abgegrenzte Verbesserungen geliefert. Diese Ergebnisse machen das heutige System sicherer oder verständlicher. Sie setzen nicht die vollständige Vision um.

| Ergebnis | Unmittelbare Verbesserung | Verantwortung oder Erkenntnis |
|---|---|---|
| [Gerrit 83632](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83632), gemergt am 26.04.2024 | Erzeugte valide Quelldaten für DataHandler-Lokalisierungstests. | Verlässliche Fixtures sind eine Voraussetzung für Verhaltensänderungen. |
| [Gerrit 84237](https://review.typo3.org/c/Packages/TYPO3.CMS/+/84237), gemergt am 25.05.2024 | Verhinderte verwaiste übersetzte Datensätze in einem Kopiervorgang. | Strukturelle und sprachliche Validität müssen beim Kopieren erhalten bleiben. |
| [Gerrit 83310](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83310), [86085](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86085) und [85912](https://review.typo3.org/c/Packages/TYPO3.CMS/+/85912), gemergt zwischen dem 13.05.2024 und dem 07.01.2025 | Ergänzte gezielte Tests für das Kopieren lokalisierter Inhalte auf eine nicht übersetzte Seite, das Kopieren von Inline Child Records und das Verschieben von `-1`-Inhalten. | Die Charakterisierung hält aktuelle Einschränkungen fest, bevor Verhalten geändert wird. |
| [Gerrit 86773](https://review.typo3.org/c/Packages/TYPO3.CMS/+/86773) und [88827](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88827), gemergt am 10.01.2025 und 05.05.2025 | Synchronisierte beim Kopieren die Sprache von Inline Child Records und bewahrte beim Kopieren die Sprache von Übersetzungen. | Kopiervorgänge müssen die Sprachabsicht für Child Records und übersetzte Datensätze erhalten. |
| [Gerrit 92580](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92580), gemergt am 09.02.2026 | Beschränkt kopierte Datensatzübersetzungen auf Sprachen, die in der Ziel-Site verfügbar sind. | Eine klar abgegrenzte Integritätskorrektur für den aktuellen Site-lokalen Umgang mit Sprachen. |
| [Gerrit 92881](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92881), gemergt am 20.02.2026 | Trennt `localizeRecord()` von `copyRecord()` im DataHandler. | Klarere Code-Pfade unterstützen eine sicherere Charakterisierung und spätere Änderungen. |
| [Gerrit 88837](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88837), gemergt am 11.04.2026 | Vermeidet die Neuzuordnung nicht sprachfähiger IRRE-Child-Records und verwendet separat zugewiesene Datensätze für lokalisierte Parent-Records. | Ein konkreter Fall, in dem explizit synchronisierte Daten die Mehrdeutigkeit der Zuständigkeit beseitigten. |
| [Gerrit 94831](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94831), gemergt am 21.07.2026 | Löst übersetzte Unterseiten von Mount Points über die Default-Language-Beziehung auf und verhindert einen `404`. | Ein reales Projekt mit gemeinsamem Speicher führte zu einer kleinen, testgestützten Korrektur. |
| [Gerrit 94914](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94914), [94916](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94916) und [94915](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94915), gemergt am 01.08.2026 | Findet vorhandene Übersetzungen über `l10n_parent`, wenn `l10n_source` leer ist. | Bewahrt die Unterscheidung zwischen strukturellem Parent und Übersetzungsquelle und verhindert zugleich Duplikate. |
| [Gerrit 95178](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95178), am 10.08.2026 auf `main` gemergt | Hält beim Scrollen durch eine lange Vergleichsansicht im Modul „Layout“ Sprachname, Flag und Übersetzungsmodus sichtbar. | Verbessert die redaktionelle Orientierung in der aktuellen Oberfläche. Der Patch ist ausdrücklich eine Zwischenlösung und ändert oder bestimmt kein zukünftiges Strukturmodell. |

Die [Test-Extension der Initiative](https://github.com/t3thi/translation-handling) stellt außerdem reproduzierbare Szenarien für Übersetzungen, Fallback und Beziehungen bereit. Sie wurde 2025 wiederbelebt und um gezielte IRRE-Fälle erweitert. Sie ist Forschungsinfrastruktur und kein Beleg für geändertes Core-Verhalten.

Das wiederkehrende Muster ist hilfreich: Ein realer Fehler wird reproduziert, der verantwortliche Vertrag wird identifiziert, Tests definieren die Grenze und die Korrektur bleibt eng begrenzt. Dies ist die von der Initiative bevorzugte Form der inkrementellen Verbesserung.

## Laufende Arbeit mit Stand vom 10.08.2026

### Forschung und Validierung

| Arbeit | Aktueller Stand | Bedeutung |
|---|---|---|
| [Gerrit 92267](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92267) | WIP, Patch Set 6, CI verifiziert; 59 Kommentarergänzungen in 39 Core-Dateien. | Inventarisiert gespeicherte `Language All`-Annahmen. Ändert kein ausführbares Verhalten und ist weder eine Characterization-Test-Suite noch eine Ersatzimplementierung. |
| [Gerrit 93289](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93289) | WIP-Workspace-Abdeckung für das Einfügeverhalten von Language All. | Schließt eine bekannte Charakterisierungslücke vor semantischen Änderungen. |
| [dbdoctor PR 171](https://github.com/lolli42/dbdoctor/pull/171) | Offene WIP-Regel zur Erkennung verwaister Übersetzungen aus historischen Kopiervorgängen. | Stellt Diagnose- und Reparaturwerkzeuge für vorhandene Daten bereit; sie ist weder ein gemergter Core-Fix noch ein neues Übersetzungsmodell. |
| Untersuchung von struktureller Ebene und Editing Language | Die Produktbeschreibung liegt vor; eine Skizze, ein Click Dummy oder ein Extension-Experiment wurde diskutiert, aber ein abgeschlossener Prototyp ist nicht belegt. | Prüft redaktionellen Nutzen und strukturelle Annahmen vor einer Architekturentscheidung. |

### Inkrementelle Korrekturen und Reviews

| Arbeit | Aktueller Stand | Ausrichtung an der Vision und Abgrenzung |
|---|---|---|
| [Gerrit 92777](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92777) | Offen; beschränkt kopierte Free-Mode-Datensätze auf Zielsprachen. | Erweitert die Integrität des aktuellen Modells, ohne ein zukünftiges Strukturmodell auszuwählen. |
| [Gerrit 93752](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93752) und [93819](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93819) | Offene Schutzmechanismen beim Kopieren und Verschieben von Free-Mode-Inhalten. | Verhindern verwaiste Beziehungen, während der aktuelle Free Mode weiterhin unterstützt wird. |
| [Gerrit 94917](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94917) und [95170](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95170) | Beide offen und teilweise überlappend; 95170 ersetzt die eng begrenzte Änderung [92585](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92585) mit Status Abandoned. | Verbessern die Vergleichsdarstellung für Free Mode und Mixed Mode und erhalten zugleich die Ausrichtung im Connected Mode. Das Review muss Überschneidungen und die genaue Semantik der Zeilen klären. |
| [Forge 110328](https://forge.typo3.org/issues/110328) und [Gerrit 95042](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95042) | Under Review; das offene WIP Patch Set 1 mit aktuell CI Verified +1 beschränkt die auswählbaren Translation Parents. | Verhindert doppelte Zuordnungen von Translation Parents und stellt strukturelle Integrität sicher. Der Patch bleibt ein Entwurf und ist kein implementierter Fix. |
| [Forge 110330](https://forge.typo3.org/issues/110330) und [Gerrit 95043](https://review.typo3.org/c/Packages/TYPO3.CMS/+/95043) | Under Review; das offene WIP Patch Set 1 mit aktuell CI Verified +1 verbirgt Connected Mode, wenn die Quelle keine Default-Language-Beziehung herstellen kann. | Eine Free-Mode-Quelle kann keine fehlende Verbindung erzeugen. Der Wizard sollte deshalb keine irreführende Translate-Option anbieten. Der Patch bleibt ein Entwurf. |
| [Gerrit 93028](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93028) und [87595](https://review.typo3.org/c/Packages/TYPO3.CMS/+/87595) | Offene verwandte Ansätze zur Sprachkonsistenz von Child Records. | Erfordert eine sorgfältige Trennung zwischen der Absicht bei neuen Child Records und Änderungen an vorhandenen Child Records und Beziehungen. |
| [Gerrit 93063](https://review.typo3.org/c/Packages/TYPO3.CMS/+/93063) | Offener Warnhinweis-Patch für ungültige Translation Parents. | Macht aktuelle strukturelle Beschädigungen sichtbar; er repariert oder gestaltet Identität nicht neu. |

### Relevante parallele Core-Arbeit

[Gerrit 92859](https://review.typo3.org/c/Packages/TYPO3.CMS/+/92859) ist ein WIP-Vorschlag, MM-Tabellen sprach- und Workspace-fähig zu machen. Die Initiative betrachtet das einheitliche Beziehungsmodell als vielversprechende Kompatibilitätsgrundlage. Die Verwendung von Live-UIDs der Default Language ist ein inkrementeller Entwurf für heutige Einschränkungen und keine Entscheidung, dass ein zukünftiges Modell die Default Language weiterhin privilegieren muss.

[Forge 110008](https://forge.typo3.org/issues/110008) und der offene [Gerrit-Patch 94510](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94510), derzeit Patch Set 7 mit CI Verified -1, behandeln eine Regression nach dem gemergten [Gerrit-Patch 88828](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88828), bei der die Ausgabe unter `strict` von einem verborgenen Datensatz in der angeforderten Sprache auf eine andere Sprache zurückfallen kann. Der vorgeschlagene Fix ist nicht gemergt; das aktuelle Verhalten bleibt daher unverändert.

## Kritische Ausrichtung an der Vision

Die Vision ist ein Bewertungsrahmen und kein Grund, jede Teillösung abzulehnen.

| Änderung oder Ansatz | Innerhalb des Geltungsbereichs gelöstes Problem | Bewertung anhand der vier Verantwortlichkeiten |
|---|---|---|
| [Eigene `colPos`- und `CType`-Werte für Connected Translations deaktivieren](https://review.typo3.org/c/Packages/TYPO3.CMS/+/85978) | Schützt strukturelle Konsistenz für verbundene Inhalte und Container. | Für verbundene Strukturen sinnvoll. Die Änderung entfernte zugleich einen Workaround, mit dem lokale Abwesenheit ausgedrückt wurde. Dies zeigt, weshalb Structural Identity und Output Policy jeweils einen eigenen expliziten Mechanismus benötigen. |
| [Fallback Chains beim Record Overlay berücksichtigen](https://review.typo3.org/c/Packages/TYPO3.CMS/+/83169), der gemergte [13.4-Folgepatch](https://review.typo3.org/c/Packages/TYPO3.CMS/+/88828) und der offene [Fix zur Strict-Regression](https://review.typo3.org/c/Packages/TYPO3.CMS/+/94510) | Korrigierte reales Fallback-Verhalten, machte aber zugleich eine Regression sichtbar, wenn ein Datensatz in der angeforderten Sprache unter `strict` verborgen ist. | Mit der Vision vereinbar, wenn die Änderung auf den Fallback-Modus beschränkt bleibt. Der aktive Fix bestätigt, dass sich `strict` nicht implizit wie Fallback verhalten darf; sein aktuelles Patch Set ist noch nicht verifiziert oder gemergt. |
| Korrekturen am Vergleich in Free Mode und Mixed Mode | Machen unabhängige und verbundene Inhalte im aktuellen Modul „Layout“ sichtbar und richten sie aus. | Wertvolle Arbeit an der aktuellen UX. Sie erhält valide Unabhängigkeit und verdeutlicht zugleich strukturelle Beziehungen; sie muss nicht auf ein neues Datenmodell warten. |
| MM-Kontext-Vorschlag | Reduziert Mehrdeutigkeit von Beziehungen über Sprachen und Workspaces hinweg. | Ein sinnvolles vorbereitendes Modell, sofern Migration sowie Extbase- und DataHandler-Verhalten konsistent bleiben. Es darf nicht mit der abschließenden semantischen Identität gleichgesetzt werden. |
| Explizite Synchronisierung für alle Sprachen | Entfernt Verhalten aus dem Feld für Sprachidentität. | Grundsätzlich klar an der Vision ausgerichtet. Sie wird unsicher, wenn sie eingeführt wird, bevor Lebenszyklus, Herkunft, Konflikte und Migration definiert sind. |
| Vollständige Language Layers oder eine verborgene Struktur | Könnten fehlende Positionen und strukturelle Beziehungen expliziter machen. | An der strukturellen Anforderung ausgerichtet, aber erst nachdem Datenmenge, Berechtigungen, Workspaces, Referenzen, Sortierung, redaktionelle Sichtbarkeit und Migration geprüft wurden. |

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
- **Offene Frage:** Verhalten bei Aktivierung, Überschreiben, Herkunft, Loslösung, Deaktivierung, Löschung, Wiederherstellung und neuen Sprachen.
- **Offene Frage:** Zusammenspiel mit Feldsynchronisierung, Beziehungen, Workspaces und Berechtigungen.

### Structural Identity

- **Entscheidung erforderlich:** wo die logische Struktur liegt, wenn keine reale Sprache privilegiert ist.
- **Offene Frage:** vollständige Ebenen, gemeinsame Struktur, hybrider oder verbesserter Sparse-Ansatz.
- **Offene Frage:** Lebenszyklus und Sichtbarkeit von Shadows, Platzhaltern oder ausschließlich strukturellen Datensätzen.
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
3. **Klar abgegrenzte Korrekturen abschließen.** Die überlappenden Arbeiten am Vergleich in Free Mode und Mixed Mode abstimmen, Integritäts-Patches für Kopieren und Verschieben voranbringen, die Entwürfe zu Parent Selector und Wizard validieren und den fehlschlagenden Patch zur Strict-Fallback-Regression korrigieren.
4. **Produktverhalten vor der Speicherung prototypisch untersuchen.** Editing Language, direktes Anlegen in einer Zielsprache, lokale strukturelle Ergänzungen und explizite Abwesenheit anhand realistischer redaktioneller Abläufe prüfen.
5. **Strukturelle Optionen evidenzbasiert vergleichen.** Dieselben Akzeptanzfälle für Sparse Records, vollständige Ebenen, gemeinsame Struktur und hybride Ansätze verwenden. Daten- und Betriebskosten messen, statt sie anzunehmen.
6. **Synchronisierung als Zustandsmaschine definieren.** Jeden Übergang und Konflikt spezifizieren, bevor ein Flag für alle Sprachen oder eine Zielgruppe implementiert wird.
7. **Vertrag für semantische Identität abstimmen.** Entscheiden, was BCP 47 identifiziert, wie Site Languages darauf abgebildet und wie Legacy-Werte migriert werden.
8. **Kompatibilität vor der Entfernung konzipieren.** Zunächst explizite Alternativen einführen, Migrations- und Extension-Hinweise bereitstellen und erst danach eine Deprecation alter Semantik erwägen.
9. **Evidenz zu den zuständigen Entscheidungsträgern bringen.** Die Initiative sollte Trade-offs und Konsequenzen konkret machen, damit Core-, Produkt- und Architekturentscheidungen auf einer gemeinsamen Faktenbasis getroffen werden können.

## Evidenzbasis und Pflege

Diese Rekonstruktion berücksichtigt sämtliche Sitzungsprotokolle des Repositorys bis einschließlich 31.07.2026 und alle verfügbaren Transkripte bis einschließlich 31.07.2026. Ein bereitgestellter Snapshot des Initiative-Channels wurde ergänzend auf dauerhafte Use Cases, Implementierungsreferenzen und nicht protokollierte Lücken geprüft; die Stichtage für Protokolle und Transkripte werden dadurch nicht fortgeschrieben. Die aktuellen Gerrit- und Forge-Statusangaben in den Abschnitten zu Ergebnissen und laufender Arbeit wurden am 10.08.2026 geprüft. Die [T3DD26-Präsentation](https://content.eric-harrer.de/t3dd26/) stellt das in dieser Rekonstruktion verwendete konzeptionelle Modell dar.

Zentrale Primärquellen sind:

| Thema | Evidenz aus Sitzungen |
|---|---|
| Language Identity und BCP 47 | [19.01.2024](https://notes.typo3.org/s/sEONb4kd6), [25.07.2025](https://notes.typo3.org/s/dtw4v9T7S), [31.07.2026](https://notes.typo3.org/s/z5ICno5pK2) |
| Ersatz von `-1` und Lebenszyklus der Synchronisierung | [19.01.2024](https://notes.typo3.org/s/sEONb4kd6), [28.06.2024](https://notes.typo3.org/s/GQwWxdUKO), [28.11.2025](https://notes.typo3.org/s/Sxl-kkYjW), [11.06.2026](https://notes.typo3.org/s/1-J3KsT7VU) |
| Konsistenz der Feldsynchronisierung und Schäden durch historische Kopiervorgänge | [26.04.2024](https://notes.typo3.org/s/D32XRXoCk), [06.02.2026](https://notes.typo3.org/s/D8oadqoN-7) |
| Weitgehend verbundene Strukturen und lokale Ausnahmen | [22.03.2024](https://notes.typo3.org/s/kqdwFxW1m), [08.05.2026](https://notes.typo3.org/s/-0p3kqzMll), [26.06.2026](https://notes.typo3.org/s/-RP1PwIafA), [10.07.2026](https://notes.typo3.org/s/ccbVIOYfEy) |
| Vollständige Ebenen, Shadows und gemeinsame Struktur | [18.07.2025](https://notes.typo3.org/s/L0lQKrWaW), [24.10.2025](https://notes.typo3.org/s/2Ysd3gDdn), [29.05.2026](https://notes.typo3.org/s/0AJqa7JwuJ), [10.07.2026](https://notes.typo3.org/s/ccbVIOYfEy) |
| Editing Language | [08.05.2026](https://notes.typo3.org/s/-0p3kqzMll), [29.05.2026](https://notes.typo3.org/s/0AJqa7JwuJ) |
| Output Policy, Strict-Verhalten und beabsichtigte Abwesenheit | [15.12.2023](https://notes.typo3.org/s/ddSKDuz1Q), [11.06.2026](https://notes.typo3.org/s/1-J3KsT7VU), [10.07.2026](https://notes.typo3.org/s/ccbVIOYfEy), [31.07.2026](https://notes.typo3.org/s/z5ICno5pK2) |
| Jüngster Arbeitsstand und Entscheidungsgrenze | [24.07.2026](https://notes.typo3.org/s/Sn7GKjSk_3), [31.07.2026](https://notes.typo3.org/s/z5ICno5pK2) |

Zukünftige Aktualisierungen müssen den [Pflegehinweisen für den Current State](https://github.com/t3thi/Documentation/blob/main/MeetingMinutes/current-state-maintenance.md) folgen. Die zentrale Regel lautet:

> **Aktualisiere den aktuellen Stand, nicht die Historie.**
