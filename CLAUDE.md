# CLAUDE.md — Dado Automobile Interne Apps

Briefing-Dokument für dieses Projekt. Wird nach jeder wichtigen Änderung selbstständig
aktualisiert (siehe Betriebsregeln unten). Bei Sitzungsbeginn zuerst lesen.

---

## Geschäftskontext

Ausführlicher Geschäftskontext (Finanzzahlen, KPIs, bestehende Prozesse/Vorlagen,
steuerliche Besonderheiten) liegt in `GESCHAEFTSKONTEXT.md` im Projektordner — **absichtlich
nicht committet** (enthält echte Umsatz-/Gewinnzahlen), solange das Repo öffentlich ist.
Vor dem Planen des Datenmodells der ersten App lesen.

## Was das ist

Interne Web-Apps für den Autohandel **Dado Automobile (Inh. David Radocaj)**, betrieben
und genutzt ausschließlich von David selbst. Erste App heißt **„Dado Automobile"** (nach
der Firma benannt) — All-in-One-Übersicht für Buchhaltung, Analysen, monatliche
Zusammenfassung von Einkauf/Verkauf/Gewinn/Margen/Ausgaben.

**Wichtig zur Namensklärung (2026-08-20):** „CarCuro" (app.carcuro.com) ist ein
bestehendes Drittanbieter-SaaS für Autohändler, das David aktuell nutzt/testet — das war
die Quelle der Referenz-Screenshots, NICHT der Name unserer eigenen App. Strukturelle
Erkenntnisse aus den CarCuro-Screenshots liegen in `CARCURO_REFERENZ.md`.

## Kontext / Vertrauensgrenze

- **Ein Nutzer:** David, kein Team, keine Kunden mit Zugriff geplant (Stand 2026-08-19).
- **Ein Firebase-Projekt** reicht daher — keine Trennung nach Vertrauensgrenzen nötig,
  solange das so bleibt. Sobald weitere Personen Zugriff bekommen sollen: zuerst klären,
  wer was sehen darf, dann ggf. neues Projekt für die Trennung anlegen (siehe Betriebsanweisung).
- **Nur David liefert aus** (Deploy-Rechte).
- **Keine bezahlten Fremd-Dienste geplant** (Stand 2026-08-19). Sobald welche dazukommen:
  Kostengrenzen einrichten, bevor der erste bezahlte Aufruf läuft.

## Architektur

| Baustein | Details |
|---|---|
| Frontend | Eine `index.html` pro App, eingebettetes CSS/JS, kein Bauprozess |
| Auslieferung | Netlify, verbunden mit diesem Git-Repo (nicht per Datei-Ziehen) |
| Anmeldung | Firebase Auth, Google-Login |
| Daten | Firestore |
| Rechte | Custom Claims im Token (`admin`, `apps`), gesteuert über `admins/{email}`-Sammlung |
| Server-Logik | Firebase Cloud Functions (Rechte-Abgleich, ggf. Zeitpläne) |
| Bezahlte APIs (falls später) | Nur über eigene Netlify-Functions, nie Schlüssel im Browser |

Firebase-Projekt-ID: `dado-automobile-ca04c`
GitHub-Repo: `dado-automobile` (Account: dradocaj03-sketch) — **aktuell öffentlich
(temporär, wegen Netlify-Kontributoren-Problem, siehe Vorfälle unten). Muss vor
Produktivbetrieb mit echten Geschäftsdaten wieder auf privat gestellt werden.**
Netlify-Seite: dado-automobile.netlify.app (Team: dadoautomobile's team)
Web-App-ID: `1:163470074312:web:b69cf5e92c93e94f5820fd`

## Ordnerstruktur

```
dado-automobile/
├── CLAUDE.md              ← dieses Dokument
├── CHANGELOG.md           ← Historie, neueste Einträge oben
├── firebase.json / .firebaserc
├── firestore.rules
├── firestore.indexes.json
├── functions/              ← zentrale Rechteverwaltung (admins-Abgleich)
└── 1-dado-automobile/       ← erste App: "Dado Automobile" (Verwaltungssoftware)
    ├── index.html
    ├── NOTES.md            ← Version, Live-Adresse, Stand dieser App
    └── netlify/functions/  ← Vorschaltungen für bezahlte Dienste (falls nötig)
```

## Verbindliche Betriebsregeln (aus Erfahrung, siehe auch [Operating Instructions](../claude-workspace-template/reference/webapp-operating-instructions.md))

1. **Niemals `.set()` ohne `{ merge: true }`.** Ein Zweig „legt notfalls neu an" → stopp,
   melden statt überschreiben.
2. **Functions nie ohne Bereichsangabe ausliefern** — `firebase deploy --only functions:<bereich>`,
   vorher Live-Liste mit lokaler vergleichen.
3. **Cloud-Berechtigungen immer hinzufügen, nie ersetzen.**
4. **Zusammengesetzte Firestore-Abfragen brauchen Indizes** — in `firestore.indexes.json`
   ablegen und mitausliefern; ein Rückfall ohne Index ist unsichtbar, daher Diagnose in
   der Oberfläche zeigen, wenn ein Rückfallweg greift.
5. **Jede wichtige Änderung ins Änderungsprotokoll (in Firestore) — mit allen Feldern.**
6. **Live-Zuhörer brauchen Fehlerbehandlung mit Neuverbindung.**
7. **Geteilte Daten nie in `localStorage`.**
8. **Rechte-Abgleich läuft bei JEDEM Login**, nie nur bedingt („falls Merkmal fehlt").
9. **Vor jeder Überschreibung eine Sicherung** (`_backups/<datei>.backup-JJJJMMTTHHMM`,
   letzte 5 behalten) — Git schützt nicht vor der halben Stunde zwischen zwei Ständen.
10. **Prüfen durch Ausführen, nicht durch Lesen** — Funktionen mit echten/erfundenen
    Eingaben tatsächlich aufrufen, Oberflächen wirklich klicken.
11. Nie: Zugangsdaten im Frontend/Chat, zweite Datei-Variante (`index-v2.html`) statt
    Änderung der bestehenden Datei, Regeln lockern um ein Problem zu umgehen, Funktionieren
    behaupten ohne Ausführung.

## Aktueller Stand (2026-08-20)

- [x] Repo initialisiert
- [x] GitHub-Repo verbunden (aktuell öffentlich, siehe Vorfälle)
- [x] Firebase-Projekt angelegt (Auth + Firestore, Blaze-Tarif, Budget-Warnung 20€/Monat)
- [x] Rechteverwaltung (admins/-Sammlung, Login-Abgleich-Function, Verwaltungs-Panel) — live
      getestet unter /admin/, David als erster Super-Admin bootstrappt
- [x] Firestore-Regeln (admins/ nur für Admins, alles andere geschlossen)
- [x] Netlify-Seite verbunden (dado-automobile.netlify.app, Auto-Deploy bei Push auf main)
- [x] Referenz-Screenshots (CarCuro SaaS) + Businessplan gesichtet, siehe
      `CARCURO_REFERENZ.md` und `GESCHAEFTSKONTEXT.md`
- [ ] Erste App **„Dado Automobile"** (Datenmodell/Feature-Umfang planen — geplanter
      Umfang: Buchhaltung, Analysen, monatliche Übersicht Einkauf/Verkauf/Gewinn/Margen/
      Ausgaben)

## Offene Punkte / Vorfälle

- **Repo ist aktuell öffentlich.** Grund: Zwei GitHub-Konten (`dradocaj03-sketch`, Besitzer
  des Repos, und versehentlich `dadoautomobile-max`, entstanden durch Google-Login-Verwechslung
  über zwei parallel genutzte Google-Konten/Arc-Profile) führten dazu, dass Netlifys
  „Unrecognized Git contributor"-Schutz (Free-Plan, nur verifizierte Mitwirkende bei privaten
  Repos) Builds blockierte. Öffentlich gestellt, um das zu umgehen, mit Davids ausdrücklicher
  Zustimmung. **TODO: Vor Produktivbetrieb mit echten Geschäftsdaten (Kaufverträge, Zahlen)
  wieder auf privat stellen** — dazu muss David dauerhaft als `dradocaj03-sketch` bei GitHub
  angemeldet bleiben (Netlify Git-Contributor-Verbindung ist jetzt korrekt auf dieses Konto
  eingerichtet), dann kann die Sichtbarkeit ohne erneuten Build-Block zurückgestellt werden.
- **Zwei GitHub-Konten existieren.** `dradocaj03-sketch` ist das aktive/richtige Konto
  (besitzt das Repo, Passwort wurde am 2026-08-20 neu gesetzt). `dadoautomobile-max` ist ein
  Versehen und wird nicht verwendet — kann bei Gelegenheit gelöscht werden.
- **Google-Cloud-Konto brauchte ungewöhnlich lange Freischaltungszeiten** bei fast jedem
  Schritt (GCP-Nutzungsbedingungen, Firebase-Projekt-Erstellung per CLI schlug dauerhaft mit
  403 fehl trotz Owner-Rolle — Workaround: Projekt komplett über die Firebase-Konsole neu
  anlegen statt per CLI mit bestehendem GCP-Projekt verknüpfen). Funktionierender Weg ist
  dokumentiert, falls ein weiteres Firebase-Projekt für dieses Konto nötig wird.
