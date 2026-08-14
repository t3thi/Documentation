---
id: topic:editorial-needs
title: "Redaktionelle Anforderungen und Use Cases"
language: de
updated: "2026-08-11"
knowledge:
  - K-000004
  - K-000006
  - K-000009
  - K-000013
  - K-000014
  - K-000016
history: []
decisions: []
translation_of: topic:editorial-needs
source_updated: "2026-08-11"
translation_reviewed_at: "2026-08-14"
source_digest: "sha256:13008c3ceea6f3f969f2bcc76f63b95ceec3c16bbb7e433b61c0c12dedd4e5f8"
---

# Redaktionelle Anforderungen und Use Cases

## Aktuelle Synthese

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
