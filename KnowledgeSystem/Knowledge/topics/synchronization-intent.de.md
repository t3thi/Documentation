---
id: topic:synchronization-intent
title: "Synchronization Intent"
language: de
updated: "2026-08-14"
knowledge:
  - K-000003
  - K-000004
  - K-000006
  - K-000007
  - K-000008
  - K-000015
  - K-000018
  - K-000023
history: []
decisions: []
translation_of: topic:synchronization-intent
source_updated: "2026-08-14"
translation_reviewed_at: "2026-08-14"
source_digest: "sha256:02dd1af203352684aff3cc57a0f4c39ba9bc3d1f68ce62e40879790dc384dfbe"
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
