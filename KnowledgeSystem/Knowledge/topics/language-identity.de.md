---
id: topic:language-identity
title: "Language Identity"
language: de
updated: "2026-08-14"
knowledge:
  - K-000001
  - K-000002
  - K-000004
  - K-000005
  - K-000017
history: []
decisions: []
translation_of: topic:language-identity
source_updated: "2026-08-14"
translation_reviewed_at: "2026-08-14"
source_digest: "sha256:877e7f0fab443f3971e20a8b092f1d14697848a61ec2bec20657cd01d74341f5"
---

# Language Identity

## Aktuelle Synthese

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
- Semantische Identität darf nicht davon abhängen, ob eine Locale auf dem Applikationsserver installiert ist.
- Die Site-Konfiguration muss ihre verfügbaren Sprachen explizit auf die semantische Identität abbilden.
- Gemeinsamer Speicher, übersetzte Dateimetadaten sowie Import und Export dürfen nicht von zufällig übereinstimmenden lokalen Zahlen abhängen.

**Vision:** Die Sprache von Inhalten sollte dadurch identifizierbar sein, welche Sprache sie ist, und nicht nur durch die ihr zugewiesene Site-lokale Zahl. BCP 47 ist die aktuelle Präferenz der Initiative für diese semantische Identität.

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
