---
id: topic:evidence-maintenance
title: "Nächste Schritte, Evidenz und Pflege"
language: de
updated: "2026-08-27"
knowledge:
  - K-000005
  - K-000006
  - K-000007
  - K-000008
  - K-000009
  - K-000011
  - K-000012
  - K-000013
  - K-000014
  - K-000016
  - K-000017
  - K-000018
  - K-000019
  - K-000021
  - K-000022
  - K-000027
history:
  - K-000026
decisions:
  - D-000001
translation_of: topic:evidence-maintenance
source_updated: "2026-08-27"
translation_reviewed_at: "2026-08-14"
source_digest: "sha256:b3f01427ff5d582eae292b6abc66f98ffc0c6b4c5ef28a23162d55916412bc25"
---

# Nächste Schritte, Evidenz und Pflege

## Aktuelle Synthese

## Nächste sinnvolle Schritte

Dies ist die aus heutiger Sicht sinnvollste Abfolge von Aktivitäten der Initiative und keine verbindliche TYPO3-Release-Roadmap.

1. **Evidenzbasis aktuell halten.** Reproduzierbare Redaktions- und Projekt-Use-Cases ergänzen, insbesondere wenn sich Sprache, Land, Struktur und Ausgabeabsicht unterscheiden.
2. **Gezielte Charakterisierung abschließen.** Das `-1`-Inventar prüfen, jedes valide Verhalten einem Test zuordnen und bekannte Lücken in Workspaces und DataHandler schließen.
3. **Klar abgegrenzte Korrekturen abschließen.** Die aufgegebenen überlappenden Changes 92585 und 94917 als ersetzte Historie erhalten und auf ihrem gemergten Ersatz für TYPO3 v15 und TYPO3 14.3 aufbauen, Integritäts-Patches für Kopieren und Verschieben voranbringen, die Entwürfe zu Parent Selector und Wizard validieren und den fehlschlagenden Patch zur Strict-Fallback-Regression korrigieren.
4. **Produktverhalten vor der Speicherung prototypisch untersuchen.** Editing Language, einen Arbeitsablauf ohne Moduswahl im Modul „Layout“, direktes Anlegen in einer Zielsprache, lokale strukturelle Ergänzungen und explizite Abwesenheit anhand realistischer redaktioneller Abläufe prüfen.
5. **Die aktuelle strukturelle Präferenz gegenüber ihrem Gegenmodell validieren.** Dieselben Akzeptanzfälle für die gemeinsame verborgene Struktur, vollständige Language-Layer-Shadows, Sparse Records und hybride Ansätze verwenden. Vereinfachungen von Code und Laufzeit gemeinsam mit Datensatzwachstum, Informationsdichte im Modul „Layout“, Workspaces, Referenzen, Migration und Betriebskosten messen, statt die Datenbankgröße allein als entscheidend zu behandeln.
6. **Parität der ersten Stufe definieren und charakterisieren.** Das Flag für alle Ziele, die Zielanlage, die vollständige erzwungene Feldmenge, Quell- und Zielidentität, Konflikte und jeden Übergang spezifizieren. Zunächst nachweisen, dass damit die aktuelle `-1`-Ausgabe reproduziert wird, und anschließend das eigenständig zu entscheidende Multi-Select sowie andere granulare Erweiterungen am selben Prozess bewerten.
7. **Vertrag für semantische Identität abstimmen.** Entscheiden, was BCP 47 identifiziert, wie Site Languages darauf abgebildet und wie Legacy-Werte migriert werden.
8. **Kompatibilität vor der Entfernung konzipieren.** Zunächst explizite Alternativen einführen, Migrations- und Extension-Hinweise bereitstellen und erst danach eine Deprecation alter Semantik erwägen.
9. **Evidenz zu den zuständigen Entscheidungsträgern bringen.** Die Initiative sollte Trade-offs und Konsequenzen konkret machen, damit Core-, Produkt- und Architekturentscheidungen auf einer gemeinsamen Faktenbasis getroffen werden können.

## Evidenzbasis und Pflege

Diese Rekonstruktion berücksichtigt sämtliche Sitzungsprotokolle des Repositorys bis einschließlich 31.07.2026 und alle verfügbaren Transkripte bis einschließlich 31.07.2026. Ein bereitgestellter Snapshot des Initiative-Channels wurde ergänzend auf dauerhafte Use Cases, Implementierungsreferenzen und nicht protokollierte Lücken geprüft; die Stichtage für Protokolle und Transkripte werden dadurch nicht fortgeschrieben. Die aktuellen Gerrit-, Forge- und verlinkten Statusangaben unterstützender Patches in den Abschnitten zu Ergebnissen und laufender Arbeit wurden als vollständiger Satz am 21.08.2026 geprüft; Gerrit 94917 wurde zusätzlich am 27.08.2026 als aufgegeben verifiziert. Die [T3DD26-Präsentation](https://content.eric-harrer.de/t3dd26/) stellt das in dieser Rekonstruktion verwendete konzeptionelle Modell dar.

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
