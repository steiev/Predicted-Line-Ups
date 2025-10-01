import React, { useEffect, useState } from "react";
import axios from "axios";

function Lineup({ fixtureId }) {
  const [lineup, setLineup] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/lineup/${fixtureId}`)
      .then(res => setLineup(res.data))
      .catch(() => setLineup(null));
  }, [fixtureId]);

  if (!lineup) return <div>Lade Aufstellungen...</div>;
  if (lineup.length === 0) return <div>Keine Daten verfügbar</div>;

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      {lineup.map(team => (
        <div key={team.team.id}>
          <h4>{team.team.name}</h4>
          <ul>
            {team.startXI.map(player => (
              <li key={player.player.id}>
                <img src={player.player.photo} alt={player.player.name} width={32} style={{verticalAlign: "middle", marginRight: 6}} />
                {player.player.name} ({player.player.pos})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [matches, setMatches] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/matches")
      .then(res => setMatches(res.data));
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "auto", fontFamily: "Arial" }}>
      <h2>Top-5 Ligen – Spiele & Predicted Lineups</h2>
      {matches.map(match => (
        <div key={match.fixture.id} style={{marginBottom: 16, border: "1px solid #ccc", borderRadius: 8}}>
          <div 
            onClick={() => setOpen(open === match.fixture.id ? null : match.fixture.id)} 
            style={{ cursor: "pointer", padding: 12, background: "#f7f7f7" }}
          >
            <b>{match.teams.home.name}</b> vs <b>{match.teams.away.name}</b> – {match.league.name}
            <br />
            <small>{match.fixture.date.slice(0,16).replace("T", " ")}</small>
          </div>
          {open === match.fixture.id && (
            <div style={{ padding: 12 }}>
              <Lineup fixtureId={match.fixture.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
