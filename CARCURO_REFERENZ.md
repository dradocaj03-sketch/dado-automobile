# Referenz: CarCuro (Drittanbieter-SaaS)

> David nutzt aktuell **CarCuro** (app.carcuro.com), ein bezahltes SaaS für Autohändler,
> und hat am 2026-08-20 Screenshots seines eigenen Accounts geteilt. Dient als
> strukturelle Vorlage/Inspiration für unsere eigene App „Dado Automobile" — nicht 1:1
> nachzubauen, sondern als Referenz für sinnvolle Module und Datenfelder.
> Enthält keine Finanzzahlen Davids, daher unbedenklich im Git-Repo.

## Modulübersicht (linke Navigation)

Dashboard · Fahrzeuge (Bestand, Auswertungen, Einstellungen) · Aufträge · Rechnungen
(Neue Rechnung, Rechnungen, Kassabuch, Ausgaben, Verwaltung) · Reservierung · Kunden ·
Anfragen · Social Media (Posts) · Webseite (Design, Inhalt/Seiten, Fahrzeugliste) · Tools
(VIN-Abfrage, Bewertung, Fahrzeugberichte) · Verträge · Mitarbeiter · Zugänge · Profil

## Fahrzeugbestand — Tabellenspalten

Bild, Nr., Fahrzeug (Modell + Ausstattungscode-Kurzform), Status, **Standtage**, **Profit**,
VK-Preis, EZ (Erstzulassung), Kilometer, Aktionen (Verwalten-Button)

→ Bestätigt: Standtage und Profit pro Fahrzeug direkt in der Übersichtsliste sind zentral,
nicht nur in separater Auswertung.

## Auswertungen (Analysen-Sektion)

Zwei Tabs: **Trends** und **Bestand**. Filter: Von/Bis-Datum, „Nach Datumsfeld"
(z. B. Verkaufsdatum), „Vermittlungsverkäufe einbeziehen ja/nein", Gewinnermittlung
Netto/Brutto.

Diagramm: „Profit Gesamt" über Zeit (Monatsachse), plus weitere Charts „Verkaufte Autos"
und „Profit pro Auto".

Kennzahlen-Kacheln (rechte Spalte): **Verkäufe** (Anzahl) · **Profit** (€) · **Umsatz** (€) ·
**Ø Profit erzielt** (€) · **Ø verhandelt** (€) · **Ø Gewinnspanne** (%) · **Ø Standtage**

→ Deckt sich mit dem, was David selbst als KPIs genannt hat (siehe GESCHAEFTSKONTEXT.md).

## Rechnungen / Buchhaltung

- **Neue Rechnung:** Kunde (oder „Kein Kunde"), Leitweg-ID (für E-Rechnung/XRechnung an
  Behörden), freier Text vor/nach Positionen, automatische Rechnungsnummer
  (`RE-2026-0001`), Zahlungsart (z. B. Überweisung), Datum, Positionen (Anzahl, Produkt,
  Steuersatz, Preis, Gesamt), Summenblock (Netto/Steuer/Brutto je Steuersatz), Button
  „Fahrzeug-Rechnung" (verknüpft Rechnung direkt mit einem Bestandsfahrzeug).
- **Rechnungsliste:** Nummer, Datum, Kunde, Zahlungsart, Status, Betrag.
- **Kassabuch:** Liste (Nr., Datum, Bemerkung, Betrag, Status), Ein/Auszahlung-Button, PDF-
  Export, „Kassensturz"-Box mit Einnahmen/Ausgaben/aktuellem Kassenstand.
- **Ausgaben:** Datum, Lieferant, Status, Kategorie, Fällig, Belegnummer, Betrag.
- **Verwaltung/Einstellungen:** Stammdaten (Firmenname, Adresse, UID-Nummer,
  Steuernummer, EORI-Nummer, Gerichtsstand, Finanzamt, Ansprechperson, Bankinstitut),
  Tabs für Design, Steuersätze, Rechnungstypen, Textvorlagen, Ausgaben-Kategorien,
  **DATEV-Export** (Jahr/Monat-Auswahl → Exportieren).
- **Produkte:** eigene Preisliste für wiederkehrende Positionen (Name, Preis, Steuersatz).

## Verträge

Vordefinierte Vertragstypen mit eigenem Nummernkreis: Ankaufvertrag (`AKV`), Datenschutz
(`DS`), Gelangensbestätigung (`GB`, für EU-Export), Geldwäsche (`GW`), Kaufvertrag (`KV`),
Übernahme Protokoll (`UP`), Verbindliche Bestellung mit/ohne Garantie (`VBG`/`VB`),
Vorvertragliche Information (`VVI`). Nummernformat konfigurierbar:
`[prefix]-[jahr4]-[nummer]`, pro Typ eigener fortlaufender Zähler.

## Tools

- **VIN-Abfrage:** 17-stellige VIN → Fahrzeugdaten inkl. Neupreise, Serien-/Sonderausstattung
- **Fahrzeugbewertung:** Anbieter DAT, Eingabe VIN/Kilometerstand/Vorbesitzer/Erstzulassung
  → Bewertung (kreditbasiert, „1 Credit")
- **Fahrzeugberichte:** Anbieter CARVERTICAL (kostenpflichtig, „14 Credits" pro Bericht) —
  deckt sich mit Davids bereits genutztem CarVertical-Abo (siehe GESCHAEFTSKONTEXT.md)

## Webseite-Baukasten

1-Klick-Website mit zwei Design-Vorlagen (Classic/Dark), anpassbare Primärfarbe + Logo,
öffentliche Kontaktdaten-Sektion (Adresse, Google-Maps-Iframe, Telefon, WhatsApp,
Öffnungszeiten, Social-Links), Seiten-Editor (Startseite/Fahrzeuge/Leistungen/Kontakt/
Impressum), Fahrzeugliste konfigurierbar (Listen-/Kachel-Layout, Filterposition,
Dark-/Lightmode, Schriftgröße).

## Weitere Module (nur genannt, nicht im Detail gesichtet)

- **Reservierung:** Kalenderansicht, u. a. für „Blaue Kennzeichen" (Kurzzeitkennzeichen)
- **Kunden (CRM):** Nr., Name, Firma, Adresse, Kontakt, Export-Funktion
- **Anfragen (BETA):** zentrale Sammlung von Kundenanfragen mit Typ/Status-Filter
- **Social Media:** Posts direkt auf Facebook/Instagram absetzen (deckt sich mit Davids
  Instagram-Reels-Bedarf)
- **Mitarbeiter/Zugänge:** einfache Nutzerverwaltung inkl. Führerscheinnummer-Feld
  (praktisch für Probefahrten/Überführungen)
- **Fuhrpark-Fahrtenbuch:** vorhanden aber bei David nicht aktiviert (kein eigener Fuhrpark
  über die Handelsfahrzeuge hinaus)

## Feature-Liste laut Profil → Funktionen (vollständig, alle bei David aktiviert außer Fahrtenbuch)

Fahrzeugbestand · Webseite & Fahrzeugliste · Rechnungsprogramm · Aufträge · Ausgaben &
Eingangsrechnungen (KI-Erfassung) · Fuhrpark Fahrtenbuch (deaktiviert) · Reservierung ·
Social Media · Kundenverwaltung · Anfragen · Dashboard · Zustandsberichte · Zugänge ·
Verträge · VIN-Abfrage · Fahrzeugbewertung · Fahrzeugberichte

## Fahrzeug-Datenfelder (aus separatem Formular, evtl. mobile.de-Anbindung)

Marke, Modell, Modellvariante (Freitext), Ausstattungslinie, Baureihe (z. B. „5T1" für VW
Touran), Fahrzeugart, Kilometerstand, 1. Produktionsmonat/-jahr — Felder entsprechen
mobile.de-Inserats-Terminologie, relevant falls später ein Export zu Mobile.de/Autoscout24
gebaut wird.
