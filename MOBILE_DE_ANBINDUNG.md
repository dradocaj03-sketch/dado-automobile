# Plan: Anbindung an die mobile.de Seller-API

**Status:** Plan, noch nicht umgesetzt. Blockiert auf zwei offene Punkte (siehe unten).

## Ziel

Fahrzeugdaten aus „Dado Automobile" nicht doppelt pflegen müssen. Statt eines Inserats
manuell auf mobile.de UND im eigenen Fahrzeugbestand zu pflegen: aus der eigenen
Fahrzeugakte heraus ein Inserat auf mobile.de anlegen/aktualisieren.

**Nicht** geplant für v1: automatischer Import von mobile.de zurück in unsere App
(bidirektionale Synchronisation) — das ist deutlich komplexer (Konfliktbehandlung, wer
gewinnt bei Abweichungen) und aktuell kein genannter Bedarf. v1 ist einseitig:
**Dado Automobile → mobile.de.**

## Was mobile.de bietet (Stand 2026-08-20, aus Screenshots)

- **Seller-API** (REST) — Fahrzeugbestand anlegen/bearbeiten. Das ist die relevante API.
- Daneben: Search-API/Ad-Integration, Ad-Stream (Websocket-Events), Insights-API, Lead-API
  — für v1 nicht relevant.
- Zugriff läuft über ein separates **API-Account** (nicht der normale Dealer-Login).
  Freischaltung/Credentials über den mobile.de-Kundensupport.
- David hat in seinen Händler-Einstellungen unter „Datenimport: Einstellungen" bereits
  „Datenimport per Seller-API" ausgewählt, und es existiert ein Seller-API-Passwort mit
  Reset-Option — es könnte also schon (teilweise) ein Zugang bestehen. **Muss geprüft
  werden**, bevor wir beim Support neu anfragen.

## Offene Punkte, die die Umsetzung blockieren

1. **API-Zugangsdaten klären.** Hat David schon ein API-Account (Seller-API-Passwort +
   zugehöriger Nutzername/Key), oder muss das erst beim mobile.de-Support angefragt
   werden? Ohne das kann nichts getestet werden.
2. **Konkrete Endpunkt-Dokumentation fehlt.** Bisher nur die Übersichtsseite gesehen
   (Name/Zweck der APIs), nicht die eigentliche Seller-API-Referenz: Authentifizierungs-
   verfahren (Basic Auth mit dem Seller-API-Passwort? Token-basiert?), Endpunkt-URLs,
   Pflichtfelder für ein Inserat, Format (XML laut „Search-XML" in der Übersicht, oder
   JSON?). Ohne diese Doku ist keine belastbare Implementierung möglich, nur Raten.

**Nächster Schritt:** David bringt entweder die konkrete Seller-API-Referenzdoku
(Screenshots/Link) oder klärt beim mobile.de-Support, ob/wie ein API-Account bereits
existiert.

## Geplante Architektur (sobald obige Punkte geklärt sind)

Folgt der bestehenden Betriebsregel aus `CLAUDE.md`/Betriebsanweisung: bezahlte/externe
Schnittstellen nie direkt aus dem Browser, immer über eine eigene Netlify-Function als
Vorschaltung.

```
Browser (Fahrzeugakte, Button "Auf mobile.de veröffentlichen/aktualisieren")
  → eigene Netlify-Function netlify/functions/mobilede-sync.js
    → prüft Firebase-Auth-Token (wie extract-invoice.js)
    → holt Seller-API-Credentials aus Netlify-Umgebungsvariablen (nie im Frontend)
    → ruft mobile.de Seller-API auf
  → mobile.de
```

**Datenabgleich (grobe Skizze, muss gegen echte Feldnamen der Doku geprüft werden):**

| Unser Feld (`fahrzeuge/{id}`) | Vermutliches mobile.de-Feld |
|---|---|
| `marke`, `modell` | Marke/Modell (mobile.de hat eigene Referenzlisten — Freitext reicht evtl. nicht) |
| `variante` | Modellvariante / Ausstattungslinie |
| `fin` | FIN/VIN |
| `km` | Kilometerstand |
| `ez` | Erstzulassung |
| `angebotspreis` / `verkaufspreis` | Preis |
| — | Baureihe (z. B. „5T1" für VW Touran) — **haben wir aktuell nicht erfasst** |
| — | Fahrzeugart — **haben wir aktuell nicht erfasst** |
| `bildUrl` | Bild(er) — aktuell nur 1 Bild pro Fahrzeug, mobile.de erwartet vermutlich mehrere |

→ Vor der Umsetzung prüfen, ob unser Datenmodell um Baureihe/Fahrzeugart erweitert werden
muss, und ob Mehrbild-Upload nötig ist (aktuell: ein Bild pro Fahrzeug).

**Rate-Limits/Kosten:** anders als bei der Anthropic-API vermutlich kein Kosten-pro-Aufruf-
Modell, sondern im mobile.de-Vertrag/Tarif enthalten — trotzdem serverseitiges Limit pro
Stunde/Nutzer einbauen (Konsistenz mit bestehender Regel, schützt vor versehentlichen
Massenaufrufen bei einem Bug).

## Offen für später

- Rückmeldung von mobile.de (z. B. Klickzahlen, Status "online/offline") zurück in unsere
  App holen — bräuchte dann Insights-API/Ad-Stream, aktuell nicht geplant.
- Mehrbild-Upload im Fahrzeugbestand (Voraussetzung für ein vollständiges Inserat).
