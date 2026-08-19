# CLAUDE.md — Dado Automobile Interne Apps

Briefing-Dokument für dieses Projekt. Wird nach jeder wichtigen Änderung selbstständig
aktualisiert (siehe Betriebsregeln unten). Bei Sitzungsbeginn zuerst lesen.

---

## Was das ist

Interne Web-Apps für den Autohandel **Dado Automobile (Inh. David Radocaj)**, betrieben
und genutzt ausschließlich von David selbst. Erste App: All-in-One-Übersicht für
Buchhaltung, Analysen, monatliche Zusammenfassung von Einkauf/Verkauf/Gewinn/Margen/
Ausgaben — Details folgen nach Sichtung von Referenz-Screenshots ("Kakuho"-App).

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

Firebase-Projekt-ID: `dado-automobile`
GitHub-Repo: `dado-automobile` (Account: dradocaj03-sketch)

## Ordnerstruktur

```
dado-automobile/
├── CLAUDE.md              ← dieses Dokument
├── CHANGELOG.md           ← Historie, neueste Einträge oben
├── firebase.json / .firebaserc
├── firestore.rules
├── firestore.indexes.json
├── functions/              ← zentrale Rechteverwaltung (admins-Abgleich)
└── 1-dashboard/             ← erste App (Name folgt nach Konkretisierung)
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

## Aktueller Stand (2026-08-19)

- [x] Repo initialisiert
- [ ] GitHub-Repo verbunden
- [ ] Firebase-Projekt angelegt (Auth + Firestore)
- [ ] Rechteverwaltung (admins/-Sammlung, Login-Abgleich-Function, Verwaltungs-Panel)
- [ ] Firestore-Regeln
- [ ] Netlify-Seite verbunden
- [ ] Erste App (wartet auf Kakuho-Screenshots zur Funktionsklärung)

## Offene Punkte / Vorfälle

_Noch keine — wird bei Bedarf ergänzt._
