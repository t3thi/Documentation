---
id: topic:synchronization-intent
title: "Synchronization Intent"
language: de
updated: "2026-10-30"
knowledge:
  - K-000003
  - K-000004
  - K-000006
  - K-000007
  - K-000008
  - K-000015
  - K-000018
  - K-000023
  - K-000029
  - K-000040
history: []
decisions: []
translation_of: topic:synchronization-intent
source_updated: "2026-10-30"
translation_reviewed_at: "2026-08-14"
source_digest: "sha256:45a3877fb00662201620841a8f66be6179fa76ac37004942de3203943243098e"
---

# Synchronization Intent

## Aktuelle Synthese

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

Das minimale Kompatibilitätsmodell ist ein Boolean für alle konfigurierten Ziele ohne Feld-Abwahl: Es soll zunächst den vollständigen `-1`-Datensatz nachbilden. Ein späteres datensatzweites Multi-Select könnte denselben Prozess auf gewählte Zielsprachen begrenzen. Der [vorläufige Vorschlag](https://notes.typo3.org/s/Sxl-kkYjW) nennt `language_sync` und `ctrl.languageSyncField`; Namen, API, Einführung und Zeitpunkt sind nicht beschlossen. Feldbezogene Ausnahmen bleiben eine separate Erweiterung. Weder Boolean noch Multi-Select definiert bereits den vollständigen Lebenszyklus.

**Möglicher technischer Wiederverwendungspfad für die erste Stufe mit `-1`-Parität:**

1. Eine datensatzweite Synchronisierungsabsicht an einem führenden Datensatz wählt zunächst jede Zielsprache in ihrem definierten Site- oder Storage-Geltungsbereich aus.
2. Der DataHandler stellt sicher, dass in jeder Zielsprache genau ein verbundener Zieldatensatz vorhanden ist. Das bestehende [`localize()`](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/core/Classes/DataHandling/DataHandler.php) validiert bereits die Ziel-Site-Language, verhindert Duplikate und bereitet Sprache, Parent und Quelle vor; [`localizeRecord()`](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/core/Classes/DataHandling/DataHandler.php) legt den Zieldatensatz durch eine verschachtelte DataHandler-Operation an.
3. Jeder Zieldatensatz erhält in `l10n_state` einen erzwungenen Zustand oder eine gleichwertige neue Zustandsrepräsentation für jedes Feld, das zur Reproduktion des vollständigen Quelldatensatzes erforderlich ist. Der bestehende DataMapProcessor kann anschließend seine [Propagation vom Parent zu abhängigen Datensätzen für skalare Werte und Beziehungen](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/core/Classes/DataHandling/Localization/DataMapProcessor.php) wiederverwenden.
4. Spätere Änderungen durchlaufen dieselbe Abhängigkeitspipeline. Nachdem die funktionale Parität nachgewiesen ist, kann derselbe Vertrag ein eigenständig zu entscheidendes Multi-Select der Zielsprachen unterstützen und dabei die Erzwingung aller Felder innerhalb jedes ausgewählten Ziels beibehalten.

„Jedes Feld“ umfasst alle absichtlich identischen Werte des heutigen `-1`-Datensatzes, auch Ausgabe und Struktur. Eigene `uid`, `sys_language_uid`, `l10n_parent`, `l10n_source`, `l10n_state` sowie Workspace-/Versionsmetadaten sichern dagegen Identität und Lebenszyklus jedes Ziels. Diese Core-Ausnahmen sind am Schema zu definieren und zu testen.

Dies ist ein möglicher Wiederverwendungspfad, keine sofort nutzbare Konfiguration. Die datensatzweite Absicht müsste für alle paritätsrelevanten Zielfelder `enforceLanguageSynchronization`-Semantik ableiten; statisches `l10n_mode=exclude` würde auch unabhängige Datensätze betreffen. Der DataMapProcessor [überspringt `-1` und benötigt verbundene Ziele](https://github.com/TYPO3/typo3/blob/cdaa725d2d8add6da57e37f269094e8a222973d7/typo3/sysext/core/Classes/DataHandling/Localization/DataMapProcessor.php). Der neue Pfad muss Ziele auflösen, anlegen oder abgleichen, die gesamte erzwungene Feldmenge bestimmen und atomar/idempotent aktivieren. Eine `-1`-Quelle braucht zuvor einen gültigen führenden Datensatz oder einen neuen Anlagepfad: `localize()` stellt den verbundenen Parent aus einer Default-Language-Quelle her.

Beim Multi-Select kann Hinzufügen „Ziel sicherstellen, dann alle Felder erzwingen“ wiederverwenden. Entfernen erfordert eine Entscheidung: Ziel behalten und lösen, deaktivieren, als gelöscht markieren oder entfernen. Die Zielidentität muss Site-übergreifend gelten; Site-lokale Zahlen reichen für Shared Storage nicht aus. Das Multi-Select bleibt daher eine entscheidungsbedürftige Feature-Option, keine implementierte Felddefinition oder festgelegte Folgearbeit.

Eine separate Feld-Konsolidierung könnte `enforceLanguageSynchronization` neben `allowLanguageSynchronization` unter `config.behaviour` einführen. Ein erzwungener `l10n_state` könnte `l10n_mode=exclude` samt separatem Auswahl-Scope ersetzen. Dies ist ein Vorschlag der Initiative, weder implementiert noch ausgewählt; Zustand, Migration und Kompatibilität bleiben offen. Es ist nicht der datensatzweite `-1`-Ersatz.

**Eigene Kinder statt geteilter Ziele:** Die Synchronisierung eines zusammengesetzten
Parent-Feldes soll relevante Werte seiner integralen 1:n-IRRE-Kinder rekursiv
einschließen, nicht mehrfach verwendbare MM-Ziele. Beim File-Feld betrifft das
`sys_file_reference` samt Crop, nicht die geteilte `sys_file`.
[Forge 88024](https://forge.typo3.org/issues/88024) dokumentiert initial kopierte,
später aber nicht aktualisierte Crops bei beiden Synchronisierungsarten.
Der Core gleicht Beziehungen ab und ermittelt Synchronisierungsfelder je
Tabellen-TCA; dies erzwingt nicht alle vorhandenen Child-Werte. Auch der gemergte
Child-Sprachabgleich ist eine andere Operation. Eigentümerschaft folgt aus der
Beziehungskonfiguration, nicht allein aus `inline`; Löschkaskaden steuert separat
`behaviour.enableCascadingDelete`. Rekursive Propagation ist eine Anforderung,
keine implementierte oder ausgewählte API. Verschachtelte Ausnahmen, Workspaces,
Rechte, Zyklen und Migration bleiben zu prüfen; v13-Fall und historischer
Workaround wurden nicht unabhängig reproduziert.
