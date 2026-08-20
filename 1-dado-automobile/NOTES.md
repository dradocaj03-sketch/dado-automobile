# Dado Automobile — App-Notizen

**Version:** v0.1
**Live:** https://dado-automobile.netlify.app/ (Root leitet auf diese App um, siehe `_redirects`)

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
- `meta/vehicleCounter`: { next: number } — für fortlaufende Fahrzeugnummern

## Bewusst noch nicht enthalten (spätere Ausbaustufe)

Rechnungen/Kassabuch, Verträge, Website-Baukasten, Kundenverwaltung, VIN-Abfrage/
Fahrzeugbewertung, Social-Media-Posting — siehe `../CARCURO_REFERENZ.md` für Ideen.

## Bekannte Vereinfachungen

- Standtage/Profit werden clientseitig berechnet, nicht in Firestore gespeichert.
- Auswertungen laden aktuell alle Fahrzeuge auf einmal (kein Paging) — für Davids
  Bestandsgröße (Ziel 15-20 Fahrzeuge) unproblematisch, bei deutlich mehr Datensätzen
  später ggf. serverseitige Aggregation einführen.
