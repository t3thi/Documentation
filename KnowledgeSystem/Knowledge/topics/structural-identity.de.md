---
id: topic:structural-identity
title: "Structural Identity"
language: de
updated: "2026-08-14"
knowledge:
  - K-000002
  - K-000009
  - K-000010
  - K-000011
  - K-000012
  - K-000016
  - K-000019
  - K-000022
history: []
decisions: []
translation_of: topic:structural-identity
source_updated: "2026-08-14"
translation_reviewed_at: "2026-08-14"
source_digest: "sha256:6b8e30b4dfe7b8a29a3c2e8fa1523a4a521dd8348fa7c08c6a05b7f6611a55ec"
---

# Structural Identity

## Aktuelle Synthese

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

**Editing Language:** Das bevorzugte Produktkonzept ist eine auswählbare Inhaltssprache, von der aus Redakteurinnen und Redakteure arbeiten, unabhängig von der Sprache der Backend-Oberfläche. Eine chinesische Redakteurin oder ein chinesischer Redakteur könnte beispielsweise chinesische Inhalte ausgehend von Englisch erstellen, während Deutsch die Default Language der Site bleibt. Das Modul „Layout“ würde Englisch dort anzeigen, wo es heute stets die Default Language anzeigt. Dies ist eine Produktrichtung und keine implementierte Funktion.

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
| **1. Vollständige Struktur in jeder Sprache** | Jede Sprache enthält jede strukturelle Position und könnte grundsätzlich die strukturelle Führung übernehmen. Der Core erzeugt Language-Layer-Shadows, wenn eine Position in dieser Sprache keinen sichtbaren Inhalt besitzt. | Jede Sprachebene ist strukturell eigenständig vollständig und kann eine lokale Sortierung ausdrücken. | Jede lokale Abweichung muss in andere Language Layers projiziert werden. Datensatzmenge, Synchronisierung, Workspace-Versionen, Referenzen und sichtbare Informationsdichte im Modul „Layout“ können mit Sprachen und strukturellen Abweichungen wachsen. Selbst eine kleine Umordnung kann mehrere erzeugte Platzhalter erfordern; der genaue Multiplikator ist modellabhängig und wurde nicht gemessen. | **Diskutiert, im Vergleich zu einer gemeinsamen Ebene derzeit jedoch nicht bevorzugt. Weder widerlegt noch formal verworfen.** |
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
