// Configuration
const API_KEY = 'demo'; // Users need to get their own API key from api-football.com
const API_BASE_URL = 'https://v3.football.api-sports.io';

// League IDs for the top 5 European leagues
const LEAGUES = {
    39: { name: 'Premier League', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    140: { name: 'La Liga', country: 'Spain', flag: '🇪🇸' },
    78: { name: 'Bundesliga', country: 'Germany', flag: '🇩🇪' },
    135: { name: 'Serie A', country: 'Italy', flag: '🇮🇹' },
    61: { name: 'Ligue 1', country: 'France', flag: '🇫🇷' }
};

let allMatches = [];
let currentFilter = 'all';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadMatches();
});

// Setup event listeners
function setupEventListeners() {
    const leagueButtons = document.querySelectorAll('.league-btn');
    leagueButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            leagueButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.league;
            displayMatches();
        });
    });
}

// Load matches from API
async function loadMatches() {
    showLoading(true);
    
    // For demo purposes, we'll use mock data since API requires authentication
    // In production, replace this with actual API calls
    if (API_KEY === 'demo') {
        setTimeout(() => {
            allMatches = getMockMatches();
            displayMatches();
            showLoading(false);
        }, 1000);
    } else {
        try {
            // Get the current season
            const season = new Date().getFullYear();
            const today = new Date();
            const from = formatDate(today);
            const to = formatDate(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000));
            
            const leagueIds = Object.keys(LEAGUES);
            const promises = leagueIds.map(leagueId => 
                fetchFixtures(leagueId, season, from, to)
            );
            
            const results = await Promise.all(promises);
            allMatches = results.flat();
            displayMatches();
            showLoading(false);
        } catch (error) {
            console.error('Error loading matches:', error);
            showError('Fehler beim Laden der Spiele. Bitte versuchen Sie es später erneut.');
            showLoading(false);
        }
    }
}

// Fetch fixtures from API
async function fetchFixtures(leagueId, season, from, to) {
    const url = `${API_BASE_URL}/fixtures?league=${leagueId}&season=${season}&from=${from}&to=${to}`;
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'v3.football.api-sports.io'
        }
    });
    
    const data = await response.json();
    return data.response || [];
}

// Display matches
function displayMatches() {
    const container = document.getElementById('matches-container');
    container.innerHTML = '';
    
    let matchesToShow = allMatches;
    if (currentFilter !== 'all') {
        matchesToShow = allMatches.filter(match => 
            match.league.id.toString() === currentFilter
        );
    }
    
    if (matchesToShow.length === 0) {
        container.innerHTML = '<div class="no-lineup"><p>Keine Spiele für diesen Zeitraum gefunden.</p></div>';
        return;
    }
    
    matchesToShow.forEach(match => {
        const matchCard = createMatchCard(match);
        container.appendChild(matchCard);
    });
}

// Create match card element
function createMatchCard(match) {
    const card = document.createElement('div');
    card.className = 'match-card';
    
    const leagueInfo = LEAGUES[match.league.id] || { name: match.league.name, flag: '⚽' };
    const matchDate = new Date(match.fixture.date);
    const timeString = matchDate.toLocaleString('de-DE', { 
        weekday: 'short', 
        day: '2-digit', 
        month: '2-digit',
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    card.innerHTML = `
        <div class="match-header" onclick="toggleLineup(this)">
            <div class="match-info">
                <div class="league-name">${leagueInfo.flag} ${leagueInfo.name}</div>
                <div class="match-teams">
                    <img src="${match.teams.home.logo}" alt="${match.teams.home.name}" class="team-logo">
                    <span>${match.teams.home.name}</span>
                    <span class="vs">vs</span>
                    <span>${match.teams.away.name}</span>
                    <img src="${match.teams.away.logo}" alt="${match.teams.away.name}" class="team-logo">
                </div>
            </div>
            <div class="match-time">
                <div>${timeString}</div>
                <div class="toggle-icon">▼</div>
            </div>
        </div>
        <div class="lineup-content">
            <div class="lineups">
                <div class="team-lineup">
                    <h3>${match.teams.home.name}</h3>
                    ${generateLineupHTML(match.lineups.home, match.teams.home.name)}
                </div>
                <div class="team-lineup">
                    <h3>${match.teams.away.name}</h3>
                    ${generateLineupHTML(match.lineups.away, match.teams.away.name)}
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Generate lineup HTML
function generateLineupHTML(lineup, teamName) {
    if (!lineup || !lineup.formation) {
        return '<div class="no-lineup">Aufstellung noch nicht verfügbar</div>';
    }
    
    const formationParts = lineup.formation.split('-');
    const players = lineup.players || [];
    
    let html = `<div class="formation">`;
    html += `<div class="formation-label">${lineup.formation}</div>`;
    
    // Goalkeeper
    const goalkeeper = players.find(p => p.position === 'G');
    if (goalkeeper) {
        html += `<div class="position-line">`;
        html += generatePlayerHTML(goalkeeper);
        html += `</div>`;
    }
    
    // Defenders, Midfielders, Forwards
    let playerIndex = 1; // Skip goalkeeper
    formationParts.forEach((count, idx) => {
        const numPlayers = parseInt(count);
        html += `<div class="position-line">`;
        for (let i = 0; i < numPlayers && playerIndex < players.length; i++, playerIndex++) {
            html += generatePlayerHTML(players[playerIndex]);
        }
        html += `</div>`;
    });
    
    html += `</div>`;
    return html;
}

// Generate player HTML
function generatePlayerHTML(player) {
    const photo = player.photo || 'https://via.placeholder.com/60?text=' + (player.name ? player.name.charAt(0) : '?');
    return `
        <div class="player">
            <img src="${photo}" alt="${player.name}" class="player-image" onerror="this.src='https://via.placeholder.com/60?text=${player.name ? player.name.charAt(0) : '?'}'">
            <div class="player-name" title="${player.name}">${player.name}</div>
            <div class="player-number">#${player.number || '?'}</div>
        </div>
    `;
}

// Toggle lineup visibility
function toggleLineup(header) {
    const card = header.closest('.match-card');
    card.classList.toggle('expanded');
}

// Show/hide loading
function showLoading(show) {
    const loading = document.getElementById('loading');
    const container = document.getElementById('matches-container');
    loading.style.display = show ? 'block' : 'none';
    container.style.display = show ? 'none' : 'grid';
}

// Show error message
function showError(message) {
    const container = document.getElementById('matches-container');
    container.innerHTML = `<div class="no-lineup"><p>❌ ${message}</p></div>`;
}

// Format date for API
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Mock data for demo purposes
function getMockMatches() {
    const now = new Date();
    const weekend = new Date(now.getTime() + (6 - now.getDay()) * 24 * 60 * 60 * 1000);
    
    return [
        {
            fixture: {
                id: 1,
                date: new Date(weekend.getTime() + 15 * 60 * 60 * 1000).toISOString(),
            },
            league: { id: 39, name: 'Premier League' },
            teams: {
                home: { 
                    id: 33, 
                    name: 'Manchester United', 
                    logo: 'https://media.api-sports.io/football/teams/33.png' 
                },
                away: { 
                    id: 40, 
                    name: 'Liverpool', 
                    logo: 'https://media.api-sports.io/football/teams/40.png' 
                }
            },
            lineups: {
                home: {
                    formation: '4-2-3-1',
                    players: [
                        { name: 'De Gea', position: 'G', number: 1, photo: 'https://media.api-sports.io/football/players/881.png' },
                        { name: 'Wan-Bissaka', position: 'D', number: 29, photo: 'https://media.api-sports.io/football/players/18873.png' },
                        { name: 'Varane', position: 'D', number: 19, photo: 'https://media.api-sports.io/football/players/25.png' },
                        { name: 'Martinez', position: 'D', number: 6, photo: 'https://media.api-sports.io/football/players/160707.png' },
                        { name: 'Shaw', position: 'D', number: 23, photo: 'https://media.api-sports.io/football/players/18866.png' },
                        { name: 'Casemiro', position: 'M', number: 18, photo: 'https://media.api-sports.io/football/players/2435.png' },
                        { name: 'Eriksen', position: 'M', number: 14, photo: 'https://media.api-sports.io/football/players/407.png' },
                        { name: 'Antony', position: 'M', number: 21, photo: 'https://media.api-sports.io/football/players/10185.png' },
                        { name: 'Fernandes', position: 'M', number: 8, photo: 'https://media.api-sports.io/football/players/882.png' },
                        { name: 'Rashford', position: 'M', number: 10, photo: 'https://media.api-sports.io/football/players/18866.png' },
                        { name: 'Martial', position: 'F', number: 9, photo: 'https://media.api-sports.io/football/players/752.png' }
                    ]
                },
                away: {
                    formation: '4-3-3',
                    players: [
                        { name: 'Alisson', position: 'G', number: 1, photo: 'https://media.api-sports.io/football/players/30949.png' },
                        { name: 'Alexander-Arnold', position: 'D', number: 66, photo: 'https://media.api-sports.io/football/players/18943.png' },
                        { name: 'van Dijk', position: 'D', number: 4, photo: 'https://media.api-sports.io/football/players/1486.png' },
                        { name: 'Konate', position: 'D', number: 5, photo: 'https://media.api-sports.io/football/players/284735.png' },
                        { name: 'Robertson', position: 'D', number: 26, photo: 'https://media.api-sports.io/football/players/18887.png' },
                        { name: 'Fabinho', position: 'M', number: 3, photo: 'https://media.api-sports.io/football/players/652.png' },
                        { name: 'Henderson', position: 'M', number: 14, photo: 'https://media.api-sports.io/football/players/18947.png' },
                        { name: 'Thiago', position: 'M', number: 6, photo: 'https://media.api-sports.io/football/players/100.png' },
                        { name: 'Salah', position: 'F', number: 11, photo: 'https://media.api-sports.io/football/players/306.png' },
                        { name: 'Nunez', position: 'F', number: 27, photo: 'https://media.api-sports.io/football/players/162169.png' },
                        { name: 'Diaz', position: 'F', number: 23, photo: 'https://media.api-sports.io/football/players/1100.png' }
                    ]
                }
            }
        },
        {
            fixture: {
                id: 2,
                date: new Date(weekend.getTime() + 18 * 60 * 60 * 1000).toISOString(),
            },
            league: { id: 140, name: 'La Liga' },
            teams: {
                home: { 
                    id: 529, 
                    name: 'Barcelona', 
                    logo: 'https://media.api-sports.io/football/teams/529.png' 
                },
                away: { 
                    id: 541, 
                    name: 'Real Madrid', 
                    logo: 'https://media.api-sports.io/football/teams/541.png' 
                }
            },
            lineups: {
                home: {
                    formation: '4-3-3',
                    players: [
                        { name: 'ter Stegen', position: 'G', number: 1, photo: 'https://media.api-sports.io/football/players/49.png' },
                        { name: 'Kounde', position: 'D', number: 23, photo: 'https://media.api-sports.io/football/players/1148.png' },
                        { name: 'Araujo', position: 'D', number: 4, photo: 'https://media.api-sports.io/football/players/10223.png' },
                        { name: 'Christensen', position: 'D', number: 15, photo: 'https://media.api-sports.io/football/players/18994.png' },
                        { name: 'Balde', position: 'D', number: 28, photo: 'https://media.api-sports.io/football/players/163527.png' },
                        { name: 'Busquets', position: 'M', number: 5, photo: 'https://media.api-sports.io/football/players/1458.png' },
                        { name: 'De Jong', position: 'M', number: 21, photo: 'https://media.api-sports.io/football/players/1240.png' },
                        { name: 'Pedri', position: 'M', number: 8, photo: 'https://media.api-sports.io/football/players/160218.png' },
                        { name: 'Raphinha', position: 'F', number: 22, photo: 'https://media.api-sports.io/football/players/2488.png' },
                        { name: 'Lewandowski', position: 'F', number: 9, photo: 'https://media.api-sports.io/football/players/124.png' },
                        { name: 'Gavi', position: 'F', number: 6, photo: 'https://media.api-sports.io/football/players/162831.png' }
                    ]
                },
                away: {
                    formation: '4-3-3',
                    players: [
                        { name: 'Courtois', position: 'G', number: 1, photo: 'https://media.api-sports.io/football/players/626.png' },
                        { name: 'Carvajal', position: 'D', number: 2, photo: 'https://media.api-sports.io/football/players/1020.png' },
                        { name: 'Militao', position: 'D', number: 3, photo: 'https://media.api-sports.io/football/players/10029.png' },
                        { name: 'Rudiger', position: 'D', number: 22, photo: 'https://media.api-sports.io/football/players/1463.png' },
                        { name: 'Mendy', position: 'D', number: 23, photo: 'https://media.api-sports.io/football/players/31127.png' },
                        { name: 'Modric', position: 'M', number: 10, photo: 'https://media.api-sports.io/football/players/620.png' },
                        { name: 'Tchouameni', position: 'M', number: 18, photo: 'https://media.api-sports.io/football/players/138729.png' },
                        { name: 'Kroos', position: 'M', number: 8, photo: 'https://media.api-sports.io/football/players/622.png' },
                        { name: 'Valverde', position: 'F', number: 15, photo: 'https://media.api-sports.io/football/players/1471.png' },
                        { name: 'Benzema', position: 'F', number: 9, photo: 'https://media.api-sports.io/football/players/627.png' },
                        { name: 'Vinicius Jr', position: 'F', number: 20, photo: 'https://media.api-sports.io/football/players/1447.png' }
                    ]
                }
            }
        },
        {
            fixture: {
                id: 3,
                date: new Date(weekend.getTime() + 16 * 60 * 60 * 1000).toISOString(),
            },
            league: { id: 78, name: 'Bundesliga' },
            teams: {
                home: { 
                    id: 157, 
                    name: 'Bayern Munich', 
                    logo: 'https://media.api-sports.io/football/teams/157.png' 
                },
                away: { 
                    id: 165, 
                    name: 'Borussia Dortmund', 
                    logo: 'https://media.api-sports.io/football/teams/165.png' 
                }
            },
            lineups: {
                home: {
                    formation: '4-2-3-1',
                    players: [
                        { name: 'Neuer', position: 'G', number: 1, photo: 'https://media.api-sports.io/football/players/470.png' },
                        { name: 'Mazraoui', position: 'D', number: 40, photo: 'https://media.api-sports.io/football/players/132752.png' },
                        { name: 'Upamecano', position: 'D', number: 2, photo: 'https://media.api-sports.io/football/players/30964.png' },
                        { name: 'De Ligt', position: 'D', number: 4, photo: 'https://media.api-sports.io/football/players/1101.png' },
                        { name: 'Davies', position: 'D', number: 19, photo: 'https://media.api-sports.io/football/players/28527.png' },
                        { name: 'Kimmich', position: 'M', number: 6, photo: 'https://media.api-sports.io/football/players/469.png' },
                        { name: 'Goretzka', position: 'M', number: 8, photo: 'https://media.api-sports.io/football/players/499.png' },
                        { name: 'Sane', position: 'M', number: 10, photo: 'https://media.api-sports.io/football/players/437.png' },
                        { name: 'Musiala', position: 'M', number: 42, photo: 'https://media.api-sports.io/football/players/135819.png' },
                        { name: 'Coman', position: 'M', number: 11, photo: 'https://media.api-sports.io/football/players/1068.png' },
                        { name: 'Mane', position: 'F', number: 17, photo: 'https://media.api-sports.io/football/players/326.png' }
                    ]
                },
                away: {
                    formation: '4-3-3',
                    players: [
                        { name: 'Kobel', position: 'G', number: 1, photo: 'https://media.api-sports.io/football/players/1093.png' },
                        { name: 'Ryerson', position: 'D', number: 26, photo: 'https://media.api-sports.io/football/players/41152.png' },
                        { name: 'Sule', position: 'D', number: 25, photo: 'https://media.api-sports.io/football/players/477.png' },
                        { name: 'Schlotterbeck', position: 'D', number: 4, photo: 'https://media.api-sports.io/football/players/132720.png' },
                        { name: 'Guerreiro', position: 'D', number: 13, photo: 'https://media.api-sports.io/football/players/1115.png' },
                        { name: 'Can', position: 'M', number: 23, photo: 'https://media.api-sports.io/football/players/489.png' },
                        { name: 'Bellingham', position: 'M', number: 22, photo: 'https://media.api-sports.io/football/players/138721.png' },
                        { name: 'Brandt', position: 'M', number: 19, photo: 'https://media.api-sports.io/football/players/491.png' },
                        { name: 'Adeyemi', position: 'F', number: 27, photo: 'https://media.api-sports.io/football/players/28095.png' },
                        { name: 'Haller', position: 'F', number: 9, photo: 'https://media.api-sports.io/football/players/18.png' },
                        { name: 'Reus', position: 'F', number: 11, photo: 'https://media.api-sports.io/football/players/488.png' }
                    ]
                }
            }
        },
        {
            fixture: {
                id: 4,
                date: new Date(weekend.getTime() + 19 * 60 * 60 * 1000).toISOString(),
            },
            league: { id: 135, name: 'Serie A' },
            teams: {
                home: { 
                    id: 489, 
                    name: 'AC Milan', 
                    logo: 'https://media.api-sports.io/football/teams/489.png' 
                },
                away: { 
                    id: 496, 
                    name: 'Juventus', 
                    logo: 'https://media.api-sports.io/football/teams/496.png' 
                }
            },
            lineups: {
                home: {
                    formation: '4-2-3-1',
                    players: [
                        { name: 'Maignan', position: 'G', number: 16, photo: 'https://media.api-sports.io/football/players/50522.png' },
                        { name: 'Calabria', position: 'D', number: 2, photo: 'https://media.api-sports.io/football/players/30774.png' },
                        { name: 'Tomori', position: 'D', number: 23, photo: 'https://media.api-sports.io/football/players/18998.png' },
                        { name: 'Kjaer', position: 'D', number: 24, photo: 'https://media.api-sports.io/football/players/18988.png' },
                        { name: 'Hernandez', position: 'D', number: 19, photo: 'https://media.api-sports.io/football/players/1150.png' },
                        { name: 'Tonali', position: 'M', number: 8, photo: 'https://media.api-sports.io/football/players/135818.png' },
                        { name: 'Bennacer', position: 'M', number: 4, photo: 'https://media.api-sports.io/football/players/51.png' },
                        { name: 'Saelemaekers', position: 'M', number: 56, photo: 'https://media.api-sports.io/football/players/30952.png' },
                        { name: 'Diaz', position: 'M', number: 10, photo: 'https://media.api-sports.io/football/players/2940.png' },
                        { name: 'Leao', position: 'M', number: 17, photo: 'https://media.api-sports.io/football/players/135817.png' },
                        { name: 'Giroud', position: 'F', number: 9, photo: 'https://media.api-sports.io/football/players/30842.png' }
                    ]
                },
                away: {
                    formation: '3-5-2',
                    players: [
                        { name: 'Szczesny', position: 'G', number: 1, photo: 'https://media.api-sports.io/football/players/18861.png' },
                        { name: 'Danilo', position: 'D', number: 6, photo: 'https://media.api-sports.io/football/players/30949.png' },
                        { name: 'Bremer', position: 'D', number: 3, photo: 'https://media.api-sports.io/football/players/2831.png' },
                        { name: 'Gatti', position: 'D', number: 4, photo: 'https://media.api-sports.io/football/players/143994.png' },
                        { name: 'Cuadrado', position: 'M', number: 11, photo: 'https://media.api-sports.io/football/players/30792.png' },
                        { name: 'Locatelli', position: 'M', number: 5, photo: 'https://media.api-sports.io/football/players/2937.png' },
                        { name: 'Rabiot', position: 'M', number: 25, photo: 'https://media.api-sports.io/football/players/287.png' },
                        { name: 'Kostic', position: 'M', number: 17, photo: 'https://media.api-sports.io/football/players/19137.png' },
                        { name: 'Miretti', position: 'M', number: 20, photo: 'https://media.api-sports.io/football/players/142122.png' },
                        { name: 'Vlahovic', position: 'F', number: 9, photo: 'https://media.api-sports.io/football/players/47431.png' },
                        { name: 'Chiesa', position: 'F', number: 7, photo: 'https://media.api-sports.io/football/players/30808.png' }
                    ]
                }
            }
        },
        {
            fixture: {
                id: 5,
                date: new Date(weekend.getTime() + 20 * 60 * 60 * 1000).toISOString(),
            },
            league: { id: 61, name: 'Ligue 1' },
            teams: {
                home: { 
                    id: 85, 
                    name: 'Paris Saint Germain', 
                    logo: 'https://media.api-sports.io/football/teams/85.png' 
                },
                away: { 
                    id: 81, 
                    name: 'Marseille', 
                    logo: 'https://media.api-sports.io/football/teams/81.png' 
                }
            },
            lineups: {
                home: {
                    formation: '3-4-3',
                    players: [
                        { name: 'Donnarumma', position: 'G', number: 99, photo: 'https://media.api-sports.io/football/players/2935.png' },
                        { name: 'Ramos', position: 'D', number: 4, photo: 'https://media.api-sports.io/football/players/793.png' },
                        { name: 'Marquinhos', position: 'D', number: 5, photo: 'https://media.api-sports.io/football/players/2829.png' },
                        { name: 'Kimpembe', position: 'D', number: 3, photo: 'https://media.api-sports.io/football/players/2845.png' },
                        { name: 'Hakimi', position: 'M', number: 2, photo: 'https://media.api-sports.io/football/players/882.png' },
                        { name: 'Verratti', position: 'M', number: 6, photo: 'https://media.api-sports.io/football/players/2844.png' },
                        { name: 'Vitinha', position: 'M', number: 17, photo: 'https://media.api-sports.io/football/players/139974.png' },
                        { name: 'Mendes', position: 'M', number: 25, photo: 'https://media.api-sports.io/football/players/30880.png' },
                        { name: 'Messi', position: 'F', number: 30, photo: 'https://media.api-sports.io/football/players/154.png' },
                        { name: 'Mbappe', position: 'F', number: 7, photo: 'https://media.api-sports.io/football/players/1089.png' },
                        { name: 'Neymar', position: 'F', number: 10, photo: 'https://media.api-sports.io/football/players/2638.png' }
                    ]
                },
                away: {
                    formation: '4-3-3',
                    players: [
                        { name: 'Lopez', position: 'G', number: 16, photo: 'https://media.api-sports.io/football/players/50520.png' },
                        { name: 'Clauss', position: 'D', number: 7, photo: 'https://media.api-sports.io/football/players/2823.png' },
                        { name: 'Mbemba', position: 'D', number: 99, photo: 'https://media.api-sports.io/football/players/138.png' },
                        { name: 'Balerdi', position: 'D', number: 5, photo: 'https://media.api-sports.io/football/players/31017.png' },
                        { name: 'Tavares', position: 'D', number: 30, photo: 'https://media.api-sports.io/football/players/47444.png' },
                        { name: 'Rongier', position: 'M', number: 21, photo: 'https://media.api-sports.io/football/players/2824.png' },
                        { name: 'Veretout', position: 'M', number: 27, photo: 'https://media.api-sports.io/football/players/138.png' },
                        { name: 'Guendouzi', position: 'M', number: 6, photo: 'https://media.api-sports.io/football/players/50522.png' },
                        { name: 'Sanchez', position: 'F', number: 70, photo: 'https://media.api-sports.io/football/players/158.png' },
                        { name: 'Harit', position: 'F', number: 11, photo: 'https://media.api-sports.io/football/players/1157.png' },
                        { name: 'Under', position: 'F', number: 17, photo: 'https://media.api-sports.io/football/players/46964.png' }
                    ]
                }
            }
        }
    ];
}
