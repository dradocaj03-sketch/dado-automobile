# Dado Automobile — App-Notizen

**Version:** v0.3
**Live:** https://dado-automobile.netlify.app/ (Root leitet auf diese App um, siehe `_redirects`)

## Umfang v0.3 (neu gegenüber v0.2)

- **Dashboard** als neuer, standardmäßig aktiver erster Reiter — strukturell/farblich nach
  echtem CarCuro-Screenshot (David, 2026-08-20) nachgebaut: 4 Schnellzugriffe (Mein
  Bestand/Fahrzeug anlegen/Meine Rechnungen/Rechnung anlegen), Neuigkeiten-Karte,
  Liniendiagramme „Verkaufte Autos" und „Profit pro Monat" (jeweils letzte 13 Monate,
  eigenes leichtgewichtiges Inline-SVG statt Chart-Bibliothek), Listen „Kürzlich verkauft"
  und „Neu im Bestand", vier navyblaue Kennzahlen-Kacheln (Im Bestand, VK-Wert,
  Ø VK-Wert, Ø Standtage).
  - **Zwei bewusste Abweichungen vom Original** (mit David abgestimmt): die CarCuro-eigene
    Account-Kopfzeile (Logo/Hamburger-Menü/Kundennummer) wurde nicht übernommen — unsere
    App hat schon eine eigene Kopfzeile und keine Mandanten-/Kundennummern-Logik. Die
    „Neuigkeiten"-Karte zeigt aktuell statischen Platzhaltertext statt CarCuros eigenem
    Produkt-News-Feed (der inhaltlich nicht auf unsere App übertragbar war) — offen, ob das
    später an eine echte Quelle angebunden werden soll.
  - Icons sind vereinfachte Emoji/Zeichen (🚗 ＋ 🧾 € ⇄), keine 1:1-SVG-Icons wie im Original
    (keine Icon-Bibliothek eingebunden).

## Umfang v0.2 (neu gegenüber v0.1)

- **Rechnungen:** Rechnungsliste + Neue-Rechnung-Formular mit dynamischen Positionen
  (Bezeichnung/Menge/Einzelpreis, bei Regelbesteuerung zusätzlich Steuersatz), optionale
  Verknüpfung mit einem Bestandsfahrzeug (übernimmt Marke/Modell/FIN/Preis als erste
  Position), automatische Rechnungsnummer (`RE-<Jahr>-<fortlaufend>`) über
  `meta/invoiceCounter`, Status offen/bezahlt/storniert.
  - **Zwei Rechnungstypen statt eines generischen Schemas:** „Differenzbesteuerung
    (§25a UStG)" (Standard, Vorauswahl) zeigt **keine** gesondert ausgewiesene
    Umsatzsteuer — nur einen Gesamtbetrag, mit automatisch eingefügtem Pflichthinweis
    „Gebrauchtgegenstände/Sonderregelung". „Regelbesteuerung" zeigt Netto/Steuer/Brutto
    je Steuersatz (CarCuro-Stil). Grund: laut `GESCHAEFTSKONTEXT.md` ist Differenz-
    besteuerung bei David der Regelfall beim Fahrzeugverkauf — ein generisches
    Netto/Steuer/Brutto-Schema wie bei CarCuro wäre für diesen Fall rechtlich falsch.
- **Kassabuch:** Ein-/Auszahlungen erfassen, „Kassensturz"-Kacheln (Einnahmen gesamt,
  Auszahlungen gesamt, aktueller Kassenstand als laufende Summe über alle Einträge).

## Umfang v0.1

- Fahrzeugbestand: Anlegen/Bearbeiten/Löschen, Status (Bestand/Reserviert/Verkauft),
  automatische Nr.-Vergabe über `meta/vehicleCounter`
- Auswertungen: Verkäufe, Umsatz, Rohgewinn, Ø Rohgewinn/Fahrzeug, Ø Gewinnspanne,
  Ø Standtage, Monatsübersicht — nur auf Basis verkaufter Fahrzeuge (VK-Datum gesetzt)
- Ausgaben: einfache Erfassung nach Kategorie

## Datenmodell (Firestore)

- `fahrzeuge/{id}`: marke, modell, variante, ez, km, status, ekPreis, ekDatum, kosten,
  angebotspreis, verkaufspreis, vkDatum, notizen, nr, createdAt/By, updatedAt/By
- `ausgaben/{id}`: datum, betrag, kategorie, beschreibung, createdAt/By, updatedAt/By
- `rechnungen/{id}`: nummer, kunde, fahrzeugId, fahrzeugLabel, datum, zahlungsart, status,
  typ (differenz|regel), positionen (Array: bezeichnung/menge/einzelpreis/steuersatz),
  textVor, textNach, netto, steuer, brutto, createdAt/By, updatedAt/By
- `kassabuch/{id}`: datum, typ (einzahlung|auszahlung), betrag, bemerkung, createdAt/By,
  updatedAt/By
- `meta/vehicleCounter`: { next: number } — für fortlaufende Fahrzeugnummern
- `meta/invoiceCounter`: { next: number } — für fortlaufende Rechnungsnummern

## Bewusst noch nicht enthalten (spätere Ausbaustufe)

Verträge, Website-Baukasten, Kundenverwaltung (CRM), VIN-Abfrage/Fahrzeugbewertung,
Social-Media-Posting, mobile.de-Anbindung (siehe `../MOBILE_DE_ANBINDUNG.md` — blockiert
auf API-Zugangsdaten/Endpunkt-Doku) — siehe `../CARCURO_REFERENZ.md` für Ideen.

Rechnungen-Modul bewusst ohne: DATEV-Export, E-Rechnung/XRechnung (Leitweg-ID), PDF-
Erzeugung (Rechnung wird erfasst, PDF weiterhin extern erstellt), Textvorlagen,
konfigurierbare Steuersätze/Rechnungstypen-Verwaltung, eigene Produkt-Preisliste.

## Bekannte Vereinfachungen

- Standtage/Profit werden clientseitig berechnet, nicht in Firestore gespeichert.
- Auswertungen laden aktuell alle Fahrzeuge auf einmal (kein Paging) — für Davids
  Bestandsgröße (Ziel 15-20 Fahrzeuge) unproblematisch, bei deutlich mehr Datensätzen
  später ggf. serverseitige Aggregation einführen.
- Rechnungsnummern laufen fortlaufend über einen einzigen globalen Zähler (kein Reset
  zum Jahreswechsel) — rechtlich zulässig (fortlaufend + nachvollziehbar reicht), aber
  anders als in manchen Buchhaltungsprogrammen üblich.
- Kassabuch-Einträge haben keinen eigenen Status (CarCuro zeigt einen, aber ohne
  bekannten Zweck/Werteliste nicht sinnvoll nachbaubar) und keinen PDF-Export.
