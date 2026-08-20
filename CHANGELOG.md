# Changelog

## 2026-08-20 (Fortsetzung 5)
- Seitenbreite von 1100px auf 1800px erweitert — App nutzt jetzt auf normalen Bildschirmen
  praktisch die volle Breite statt einer schmalen zentrierten Spalte (wie im
  CarCuro-Screenshot)

## 2026-08-20 (Fortsetzung 4)
- App v0.3: Dashboard als neuer Standard-Startreiter, nach echtem CarCuro-Screenshot
  strukturell/farblich nachgebaut (Grid mit Schnellzugriffen, Neuigkeiten, zwei
  Liniendiagrammen als Inline-SVG, „Kürzlich verkauft"/„Neu im Bestand"-Listen, vier
  navyblaue Kennzahlen-Kacheln)
- Bewusst nicht übernommen: CarCuros eigene Account-Kopfzeile (Logo/Kundennummer — für
  Ein-Nutzer-App ohne Bedeutung) und der Wortlaut des Neuigkeiten-Feeds (Platzhalter statt
  CarCuro-Produktwerbung)

## 2026-08-20 (Fortsetzung 3)
- App v0.2: Reiter „Rechnungen" (mit Unterreitern Rechnungen/Kassabuch) hinzugefügt,
  Grundgerüst nach `CARCURO_REFERENZ.md`
- Rechnungen: dynamische Positionen, automatische Rechnungsnummer (`meta/invoiceCounter`),
  optionale Verknüpfung mit Bestandsfahrzeug. Bewusst **kein** 1:1-Nachbau von CarCuros
  Netto/Steuer/Brutto-Schema — stattdessen zwei Rechnungstypen (Differenzbesteuerung nach
  §25a UStG als Standard ohne gesonderten USt.-Ausweis, sowie Regelbesteuerung), weil laut
  `GESCHAEFTSKONTEXT.md` Differenzbesteuerung bei Davids Fahrzeugverkäufen der Regelfall ist
  und ein gesonderter USt.-Ausweis dabei rechtlich falsch wäre
- Kassabuch: Ein-/Auszahlungen, laufender Kassenstand als Kennzahlen-Kacheln
- Firestore-Regeln um `rechnungen`, `kassabuch`, `meta/invoiceCounter` erweitert
- `MOBILE_DE_ANBINDUNG.md` angelegt: Plan für eine spätere mobile.de-Seller-API-Anbindung
  (Fahrzeuge direkt aus der App auf mobile.de veröffentlichen). Noch nicht umgesetzt —
  fehlende API-Zugangsdaten und konkrete Endpunkt-Dokumentation blockieren die Umsetzung

## 2026-08-20 (Fortsetzung 2)
- PDF-Rechnungserkennung erfolgreich live getestet
- Vorfall: Service-Account-Schlüssel einmal versehentlich per CLI-Ausgabe offengelegt,
  sofort widerrufen und ersetzt; Schlüssel wird jetzt base64-kodiert hinterlegt
  (robuster gegen Copy-Paste-Beschädigung, siehe CLAUDE.md „Vorfälle")

## 2026-08-20 (Fortsetzung)
- Erste App "Dado Automobile" gebaut: Fahrzeugbestand, Auswertungen, Ausgaben (v0.1)
- App-Name korrigiert: "Dado Automobile" statt versehentlich "CarCuro" (CarCuro ist nur
  Referenz-SaaS)
- Fahrzeugbestand: Bild-Spalte + Upload (Firebase Storage), Fahrgestellnummer/VIN,
  Erstzulassung als volles Datum, editierbare Standtage
- Formular in "Fahrzeug anlegen" (nur Stammdaten) und "Fahrzeugakte" (Buchhaltung/
  Auswertung beim Bearbeiten) getrennt; Profit-Spalte aus der Bestandsliste entfernt
- Massenimport von 5 Fahrzeugen aus bestehenden Kleinanzeigen-Inseraten (mobile.de blockiert
  automatisierten Zugriff per Bot-Schutz, dort kein Import möglich)
- PDF-Rechnungserkennung eingerichtet: Anthropic API als erste bezahlte Fremd-Schnittstelle,
  über geschützte Netlify-Function `extract-invoice.js` (Auth-Pflicht, Rate-Limit,
  Größenlimit, fester Modell)

## 2026-08-20
- Firebase-Projekt `dado-automobile-ca04c` angelegt (Auth + Firestore, Blaze-Tarif)
- Rechteverwaltung gebaut und deployed: `admins/`-Sammlung, Cloud Function
  `claimSelfFromAdmins`, Verwaltungs-Panel unter `/admin/`
- Firestore-Regeln ausgeliefert
- Netlify-Seite verbunden, Auto-Deploy bei Push auf `main` funktioniert
- David als erster Super-Admin bootstrappt, Admin-Panel live getestet — funktioniert
- Repo temporär auf öffentlich gestellt (Netlify-Kontributoren-Problem, siehe CLAUDE.md
  „Offene Punkte")

## 2026-08-19
- Projekt initialisiert, CLAUDE.md Briefing-Dokument angelegt
