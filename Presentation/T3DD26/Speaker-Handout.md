# T3DD26 speaker handout

Kurze Ergänzungen zur aktuellen 19-Folien-Fassung. Nicht vorlesen, sondern pro Folie den Gedanken nutzen, der die sichtbare Aussage einordnet.

## M01 · 00:00 bis 00:35 · Translation Handling in TYPO3

**Deutsch:** Ich trenne heute klar zwischen aktuellem Core-Verhalten, unserer Richtung, offenen Fragen und laufender Arbeit. Die vorgestellten Modelle sind keine beschlossene Core-Roadmap.

**English:** Today I clearly distinguish between current Core behavior, our direction, open questions and ongoing work. The models presented are not an agreed Core roadmap.

## M02 · 00:35 bis 01:15 · Three gaps, four responsibilities, one path

**Deutsch:** Wir beginnen bei drei konkreten Lücken, ordnen sie über vier Verantwortlichkeiten und enden mit einem kontrollierten Vorgehen. Diese Reihenfolge dient dem Verständnis, nicht als Implementierungsplan.

**English:** We start with three concrete gaps, organize them through four responsibilities and end with a controlled approach. This order supports understanding; it is not an implementation plan.

## M03 · 01:15 bis 02:00 · Who we are

**Deutsch:** Unsere Use Cases kommen aus Projekten, Aussagen zum Ist-Zustand prüfen wir am Core und Änderungen sollen beitragsfähig sein. Die künftige Organisationsform kann sich ändern, dieser Arbeitsauftrag bleibt.

**English:** Our use cases come from projects, we verify current-state claims against Core, and changes should be ready for contribution. The future organizational form may change, but this working purpose remains.

## M04 · 02:00 bis 03:30 · The missing case sits in the middle

**Deutsch:** TYPO3 deckt identische und vollständig unabhängige Strukturen ab, schwierig ist die überwiegend verbundene Mitte. Einzelne Abweichungen führen heute oft zu Mixed Mode, verlorenen Verbindungen oder künstlichen Default-Elementen.

**English:** TYPO3 covers identical and fully independent structures; the mostly connected middle is difficult. Individual differences often lead to Mixed Mode, lost connections or artificial default elements today.

## M05 · 03:30 bis 05:00 · Three use cases reveal three different gaps

**Deutsch:** Diese Beispiele dürfen nicht zu einer Lücke zusammengezogen werden: Local Addition betrifft Struktur, Global Storage die Sprachidentität und Regional Fallback die Ausgabeabsicht. Genau deshalb trennen wir nun vier Verantwortlichkeiten.

**English:** These examples must not be combined into one gap: Local Addition concerns structure, Global Storage language identity and Regional Fallback output intent. This is why we now separate four responsibilities.

## M06 · 05:00 bis 06:30 · Four questions use different contracts

**Deutsch:** Der Core beantwortet diese Fragen über Site-Konfiguration, Record-Werte, `l10n_state`, Parent-Relationen und Fallback-Konfiguration. Besonders `0` und `−1` tragen zusätzliche Bedeutung über reine Sprachidentität hinaus.

**English:** Core answers these questions through site configuration, record values, `l10n_state`, parent relations and fallback configuration. In particular, `0` and `−1` carry meaning beyond language identity.

## M07 · 06:30 bis 09:00 · Separate four responsibilities

**Deutsch:** Wenn Sprache, Synchronisation, Struktur und Ausgabe getrennt definiert sind, lässt sich jede Anforderung präzise prüfen. Erst danach sollte entschieden werden, wie die Datenbank diese Verträge abbildet.

**English:** Once language, synchronization, structure and output are defined separately, each requirement can be assessed precisely. Only then should we decide how the database represents these contracts.

## M08 · 09:00 bis 10:45 · Site language IDs have only local meaning

**Deutsch:** Numerische IDs sind Site-lokale Schlüssel, deshalb kann dieselbe Sprache in zwei Sites verschiedene IDs haben. BCP 47 bietet eine gemeinsame semantische Identität, die konkrete Record-Speicherung bleibt offen.

**English:** Numeric IDs are site-local keys, so the same language can have different IDs in two sites. BCP 47 provides a shared semantic identity; the concrete record storage remains open.

## M09 · 10:45 bis 12:15 · All Languages becomes an explicit rule

**Deutsch:** `−1` ist heute zugleich Record-Wert und Verhalten für alle Sprachen. Die Richtung ist eine explizite Synchronisationsregel mit benannten Zielsprachen, deren API und Herkunftsmodell noch offen sind.

**English:** `−1` currently acts as both a record value and behavior for all languages. The direction is an explicit synchronization rule with named target languages; its API and provenance model remain open.

## M10 · 12:15 bis 13:45 · Synchronization needs rules for start, change and stop

**Deutsch:** Synchronisation ist mehr als ein Schalter. Aktivierung mit bestehenden Varianten, erlaubte lokale Änderungen, Deaktivierung, Workspaces, Löschen und Referenzen brauchen definierte Regeln.

**English:** Synchronization is more than a switch. Activation with existing variants, permitted local changes, deactivation, workspaces, deletion and references all need defined rules.

## M11 · 13:45 bis 15:30 · Connected Mode needs local additions

**Deutsch:** Connected Mode erwartet heute für übersetzte Records einen Partner in der Default-Sprache. Benötigt wird ein lokales Element nur in der Zielsprache, während die übrige Struktur verbunden bleibt.

**English:** Connected Mode currently expects translated records to have a partner in the default language. We need a local element only in the target language while the rest of the structure remains connected.

## M12 · 15:30 bis 17:00 · Editors choose the language they translate from

**Deutsch:** Editing Language bezeichnet die inhaltliche Ausgangssprache, nicht die Sprache der Backend-Oberfläche. Ein chinesischer Redakteur kann so Englisch als verständliche Quelle wählen, obwohl Deutsch die Site-Default-Sprache bleibt.

**English:** Editing Language identifies the content source language, not the language of the backend interface. A Chinese editor can choose English as a source they understand, even though German remains the site default language.

## M13 · 17:00 bis 19:00 · A complete layer gives every language the same record positions

**Deutsch:** Eine vollständige Sprachschicht enthält dieselben logischen Positionen auch dort, wo Inhalt noch fehlt. Das macht Lücken sichtbar, erzeugt aber zusätzliche Records sowie Regeln für Synchronisation, Workspaces und Migration.

**English:** A complete language layer contains the same logical positions even where content is still missing. This makes gaps visible, but adds records and requires rules for synchronization, workspaces and migration.

## M14 · 19:00 bis 20:30 · Backend connection is not frontend fallback

**Deutsch:** `l10n_parent` beschreibt eine redaktionelle und strukturelle Beziehung zwischen Records. Welche Variante im Frontend erscheint, entscheiden davon getrennt Fallback-Konfiguration und LanguageAspect.

**English:** `l10n_parent` describes an editorial and structural relationship between records. Fallback configuration and LanguageAspect separately decide which variant appears in the frontend.

## M15 · 20:30 bis 21:45 · Absence must tell fallback whether to continue

**Deutsch:** In diesem Beispiel ist die Default-Sprache der konfigurierte letzte Fallback, sie wird nicht automatisch jeder Kette angehängt. Eine fehlende Übersetzung soll weiterfallen, eine bewusst ausgelassene Position dagegen nichts ausgeben.

**English:** In this example, the default language is the configured final fallback; it is not appended automatically to every chain. A missing translation should continue through fallback, while an intentionally omitted position should render nothing.

## M16 · 21:45 bis 23:15 · Today is preparation, not rollout

**Deutsch:** Aktuell entstehen Inventar, Verhaltenstests und begrenzte Korrekturen, nicht das zukünftige Gesamtmodell. Gerrit 92267 markiert Annahmen in Codepfaden, implementiert aber keine Zielarchitektur.

**English:** Current work covers inventory, behavior tests and bounded fixes, not the future overall model. Gerrit 92267 marks assumptions in code paths, but does not implement a target architecture.

## M17 · 23:15 bis 24:45 · Our place in the proposed Unit model

**Deutsch:** Das Unit-Modell befindet sich noch in öffentlicher Prüfung. Unsere Perspektive beginnt bei Stabilität und Refactoring mit dem Core Team, spätere Feature-Arbeit sowie Zuständigkeiten und Prioritäten sind nicht beschlossen.

**English:** The Unit model is still under public review. Our perspective starts with stability and refactoring with the Core Team; later feature work, responsibilities and priorities are not decided.

## M18 · 24:45 bis 27:30 · Change only after the contracts are explicit

**Deutsch:** Die Reihenfolge ist bewusst: Verhalten verstehen, durch Tests beschreiben, Verträge entscheiden, ändern und die Use Cases nachweisen. Eine Migration muss reversibel und kompatibilitätsorientiert sein, einen Release-Termin versprechen wir nicht.

**English:** The sequence is deliberate: understand behavior, describe it through tests, decide the contracts, change the system and prove the use cases. Migration must be reversible and compatibility-oriented; we do not promise a release date.

## M19 · 27:30 bis 28:00 · Thank you for your attention

**Deutsch:** Ich lade zu konkreter Mitarbeit ein: einen Use Case einbringen, einen Test oder Vorschlag prüfen und dem Slack-Channel beitreten. Der nächste Schritt soll gemeinsam mit Core Review und geltender Governance entstehen.

**English:** I invite concrete participation: bring a use case, review a test or proposal, and join the Slack channel. The next step should emerge through Core review and the applicable governance.
