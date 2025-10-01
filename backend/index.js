const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

const API_KEY = 'DEIN_API_KEY_HIER'; // <-- Trage hier deinen API Key von api-football.com ein!
const API_URL = 'https://v3.football.api-sports.io/fixtures';

const LEAGUE_IDS = {
  premierLeague: 39,
  laLiga: 140,
  bundesliga: 78,
  serieA: 135,
  ligue1: 61,
};

app.get('/matches', async (req, res) => {
  try {
    const today = new Date();
    const saturday = new Date(today);
    saturday.setDate(today.getDate() + ((6-today.getDay())%7));
    const sunday = new Date(saturday);
    sunday.setDate(saturday.getDate() + 1);

    const matches = [];
    for (const leagueId of Object.values(LEAGUE_IDS)) {
      const { data } = await axios.get(API_URL, {
        headers: { 'x-apisports-key': API_KEY },
        params: {
          league: leagueId,
          season: 2024,
          from: saturday.toISOString().slice(0,10),
          to: sunday.toISOString().slice(0,10)
        }
      });
      matches.push(...data.response);
    }
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/lineup/:fixtureId', async (req, res) => {
  try {
    const fixtureId = req.params.fixtureId;
    const { data } = await axios.get(`https://v3.football.api-sports.io/fixtures/lineups`, {
      headers: { 'x-apisports-key': API_KEY },
      params: { fixture: fixtureId }
    });
    res.json(data.response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
