# Changelog

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
