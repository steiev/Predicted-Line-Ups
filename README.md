# Predicted Line-Ups ⚽

Eine Webanwendung, die automatisch alle Spiele der fünf europäischen Topligen (Premier League, La Liga, Bundesliga, Serie A, Ligue 1) an jedem Wochenende erkennt und die voraussichtlichen Aufstellungen (Predicted Line-Ups) aus dem Internet abruft.

## Features

- 🏆 **Fünf Top-Ligen**: Premier League, La Liga, Bundesliga, Serie A, Ligue 1
- 📅 **Automatische Spielerkennung**: Erkennt automatisch alle Spiele des kommenden Wochenendes
- ⚽ **Aufstellungen mit Bildern**: Zeigt voraussichtliche Aufstellungen mit Spielernamen und Fotos
- 📱 **Responsive Design**: Funktioniert auf Desktop, Tablet und Smartphone
- 🎨 **Moderne UI**: Ansprechendes Design mit aufklappbaren Spielkarten
- 🔄 **Live-Daten**: Integration mit Football-APIs für aktuelle Daten

## Demo-Modus

Die Anwendung läuft standardmäßig im Demo-Modus mit Beispieldaten. Um echte Live-Daten zu verwenden, benötigen Sie einen API-Schlüssel von [API-Football](https://www.api-football.com/).

## Installation & Nutzung

### Einfache Nutzung (Demo-Modus)

1. Klonen Sie das Repository:
```bash
git clone https://github.com/steiev/Predicted-Line-Ups.git
cd Predicted-Line-Ups
```

2. Öffnen Sie `index.html` in Ihrem Browser:
```bash
# Linux/Mac
open index.html

# Windows
start index.html

# Oder mit einem lokalen Server (empfohlen)
python -m http.server 8000
# Dann öffnen Sie http://localhost:8000
```

### Mit echten Live-Daten

1. Registrieren Sie sich bei [API-Football](https://www.api-football.com/) und erhalten Sie einen kostenlosen API-Schlüssel

2. Öffnen Sie `script.js` und ersetzen Sie:
```javascript
const API_KEY = 'demo';
```
mit:
```javascript
const API_KEY = 'IHR_API_SCHLÜSSEL';
```

3. Öffnen Sie die Anwendung in Ihrem Browser

## Technische Details

### Verwendete Technologien

- **HTML5**: Strukturierung der Webanwendung
- **CSS3**: Modernes, responsives Design mit Gradients und Animationen
- **JavaScript (ES6+)**: Interaktivität und API-Integration
- **API-Football**: Datenquelle für Spiele und Aufstellungen

### Struktur

```
Predicted-Line-Ups/
├── index.html          # Haupt-HTML-Datei
├── styles.css          # Styling und Layout
├── script.js           # JavaScript-Logik
└── README.md          # Diese Datei
```

### Funktionsweise

1. **Spielerkennung**: Die App ruft Spiele für die kommende Woche aus den 5 Top-Ligen ab
2. **Filterung**: Benutzer können nach Liga filtern
3. **Aufklappen**: Klick auf ein Spiel zeigt die voraussichtlichen Aufstellungen
4. **Formationsdarstellung**: Spieler werden gemäß der taktischen Formation angezeigt (z.B. 4-3-3, 4-2-3-1)

## Anpassungen

### Eigene Ligen hinzufügen

Bearbeiten Sie die `LEAGUES`-Konstante in `script.js`:

```javascript
const LEAGUES = {
    39: { name: 'Premier League', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    140: { name: 'La Liga', country: 'Spain', flag: '🇪🇸' },
    // Fügen Sie weitere Ligen hinzu...
};
```

### Styling anpassen

Alle Farben und Stile können in `styles.css` angepasst werden. Die Haupt-Farbvariablen sind:
- Primärfarbe: `#667eea`
- Sekundärfarbe: `#764ba2`

## Browser-Kompatibilität

- ✅ Chrome (empfohlen)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile Browser

## Lizenz

MIT License - Frei verwendbar für private und kommerzielle Projekte.

## Mitwirken

Contributions sind willkommen! Bitte erstellen Sie einen Pull Request oder öffnen Sie ein Issue.

## Support

Bei Fragen oder Problemen öffnen Sie bitte ein Issue auf GitHub.
