# Predicted-Line-Ups

**Webanwendung für die Anzeige von Spielen und voraussichtlichen Aufstellungen der fünf europäischen Topligen (Premier League, La Liga, Bundesliga, Serie A, Ligue 1) am Wochenende.**

## Übersicht

Diese Anwendung besteht aus zwei Teilen:
- **Backend** (Node.js/Express): Fragt alle Spiele des kommenden Wochenendes für die Top-5-Ligen ab und liefert die voraussichtlichen Aufstellungen ("Predicted Lineups").
- **Frontend** (React): Zeigt die Spiele in einer Liste an. Beim Aufklappen eines Spiels werden die wahrscheinlichen Aufstellungen beider Teams (mit Spielernamen und Bildern) angezeigt.

---

## Schnellstart

### Voraussetzungen

- Node.js (empfohlen: v18 oder neuer)
- Ein API-Key von [api-football.com](https://www.api-football.com/) (kostenlose Registrierung möglich)

---

### 1. Backend einrichten

```bash
cd backend
npm install
```

Trage deinen persönlichen API-Key in die Datei `backend/index.js` ein:
```js
const API_KEY = 'DEIN_API_KEY_HIER';
```

Backend starten:
```bash
npm start
```
Das Backend läuft dann auf http://localhost:5000

---

### 2. Frontend einrichten

```bash
cd ../frontend
npm install
npm start
```

Das Frontend läuft dann auf http://localhost:3000  
Es greift automatisch auf das lokale Backend zu.

---

## Features

- Zeigt alle Spiele der Top-5-Ligen am Wochenende
- Spiele werden als aufklappbare Liste dargestellt
- Beim Aufklappen werden die voraussichtlichen Startaufstellungen inkl. Spielerbilder angezeigt

---

## Deployment

- Das Backend kann auf jedem Node.js-fähigen Server laufen (z.B. Render, Railway, Heroku).
- Das Frontend kann z.B. auf Vercel, Netlify oder als statische Website gehostet werden.
- Passe ggf. die API-URL im Frontend an, falls Backend und Frontend nicht auf demselben Server laufen.

---

## Hinweise

- Die Daten stammen von [api-football.com](https://www.api-football.com/).
- Die Genauigkeit der „predicted lineups“ ist abhängig von der API und kann variieren.
- Für produktiven Einsatz empfiehlt sich ein API-Plan mit mehr als 100 Anfragen/Monat.

---

## Lizenz

MIT