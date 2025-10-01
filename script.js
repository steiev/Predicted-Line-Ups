// League codes for the top 5 European leagues
const LEAGUES = {
    'PL': 'Premier League',
    'PD': 'La Liga',
    'BL1': 'Bundesliga',
    'SA': 'Serie A',
    'FL1': 'Ligue 1'
};

// Mock data for demonstration (in production, this would come from an API)
const mockMatches = [
    {
        id: 1,
        league: 'PL',
        homeTeam: 'Manchester City',
        awayTeam: 'Liverpool',
        date: '2024-10-05T15:00:00Z',
        homeLineup: {
            formation: '4-3-3',
            players: [
                { number: 31, name: 'Ederson', position: 'Torwart', image: null },
                { number: 2, name: 'Kyle Walker', position: 'Verteidiger', image: null },
                { number: 3, name: 'Rúben Dias', position: 'Verteidiger', image: null },
                { number: 6, name: 'Nathan Aké', position: 'Verteidiger', image: null },
                { number: 24, name: 'Joško Gvardiol', position: 'Verteidiger', image: null },
                { number: 16, name: 'Rodri', position: 'Mittelfeld', image: null },
                { number: 20, name: 'Bernardo Silva', position: 'Mittelfeld', image: null },
                { number: 47, name: 'Phil Foden', position: 'Mittelfeld', image: null },
                { number: 10, name: 'Jack Grealish', position: 'Angriff', image: null },
                { number: 9, name: 'Erling Haaland', position: 'Angriff', image: null },
                { number: 26, name: 'Savinho', position: 'Angriff', image: null }
            ]
        },
        awayLineup: {
            formation: '4-3-3',
            players: [
                { number: 1, name: 'Alisson', position: 'Torwart', image: null },
                { number: 66, name: 'Trent Alexander-Arnold', position: 'Verteidiger', image: null },
                { number: 4, name: 'Virgil van Dijk', position: 'Verteidiger', image: null },
                { number: 5, name: 'Ibrahima Konaté', position: 'Verteidiger', image: null },
                { number: 26, name: 'Andrew Robertson', position: 'Verteidiger', image: null },
                { number: 3, name: 'Wataru Endo', position: 'Mittelfeld', image: null },
                { number: 8, name: 'Dominik Szoboszlai', position: 'Mittelfeld', image: null },
                { number: 10, name: 'Alexis Mac Allister', position: 'Mittelfeld', image: null },
                { number: 11, name: 'Mohamed Salah', position: 'Angriff', image: null },
                { number: 18, name: 'Cody Gakpo', position: 'Angriff', image: null },
                { number: 7, name: 'Luis Díaz', position: 'Angriff', image: null }
            ]
        }
    },
    {
        id: 2,
        league: 'PD',
        homeTeam: 'Real Madrid',
        awayTeam: 'FC Barcelona',
        date: '2024-10-06T20:00:00Z',
        homeLineup: {
            formation: '4-3-1-2',
            players: [
                { number: 1, name: 'Thibaut Courtois', position: 'Torwart', image: null },
                { number: 2, name: 'Dani Carvajal', position: 'Verteidiger', image: null },
                { number: 3, name: 'Éder Militão', position: 'Verteidiger', image: null },
                { number: 22, name: 'Antonio Rüdiger', position: 'Verteidiger', image: null },
                { number: 23, name: 'Ferland Mendy', position: 'Verteidiger', image: null },
                { number: 8, name: 'Toni Kroos', position: 'Mittelfeld', image: null },
                { number: 10, name: 'Luka Modrić', position: 'Mittelfeld', image: null },
                { number: 15, name: 'Federico Valverde', position: 'Mittelfeld', image: null },
                { number: 5, name: 'Jude Bellingham', position: 'Offensives Mittelfeld', image: null },
                { number: 7, name: 'Vinícius Júnior', position: 'Angriff', image: null },
                { number: 9, name: 'Kylian Mbappé', position: 'Angriff', image: null }
            ]
        },
        awayLineup: {
            formation: '4-3-3',
            players: [
                { number: 1, name: 'Marc-André ter Stegen', position: 'Torwart', image: null },
                { number: 23, name: 'Jules Koundé', position: 'Verteidiger', image: null },
                { number: 5, name: 'Iñigo Martínez', position: 'Verteidiger', image: null },
                { number: 2, name: 'Pau Cubarsí', position: 'Verteidiger', image: null },
                { number: 3, name: 'Alejandro Balde', position: 'Verteidiger', image: null },
                { number: 21, name: 'Frenkie de Jong', position: 'Mittelfeld', image: null },
                { number: 8, name: 'Pedri', position: 'Mittelfeld', image: null },
                { number: 20, name: 'Dani Olmo', position: 'Mittelfeld', image: null },
                { number: 19, name: 'Lamine Yamal', position: 'Angriff', image: null },
                { number: 9, name: 'Robert Lewandowski', position: 'Angriff', image: null },
                { number: 11, name: 'Raphinha', position: 'Angriff', image: null }
            ]
        }
    },
    {
        id: 3,
        league: 'BL1',
        homeTeam: 'Bayern München',
        awayTeam: 'Borussia Dortmund',
        date: '2024-10-05T17:30:00Z',
        homeLineup: {
            formation: '4-2-3-1',
            players: [
                { number: 1, name: 'Manuel Neuer', position: 'Torwart', image: null },
                { number: 19, name: 'Alphonso Davies', position: 'Verteidiger', image: null },
                { number: 3, name: 'Kim Min-jae', position: 'Verteidiger', image: null },
                { number: 2, name: 'Dayot Upamecano', position: 'Verteidiger', image: null },
                { number: 22, name: 'Raphaël Guerreiro', position: 'Verteidiger', image: null },
                { number: 6, name: 'Joshua Kimmich', position: 'Mittelfeld', image: null },
                { number: 8, name: 'Leon Goretzka', position: 'Mittelfeld', image: null },
                { number: 10, name: 'Leroy Sané', position: 'Offensives Mittelfeld', image: null },
                { number: 42, name: 'Jamal Musiala', position: 'Offensives Mittelfeld', image: null },
                { number: 11, name: 'Kingsley Coman', position: 'Offensives Mittelfeld', image: null },
                { number: 9, name: 'Harry Kane', position: 'Angriff', image: null }
            ]
        },
        awayLineup: {
            formation: '4-3-3',
            players: [
                { number: 1, name: 'Gregor Kobel', position: 'Torwart', image: null },
                { number: 26, name: 'Julian Ryerson', position: 'Verteidiger', image: null },
                { number: 4, name: 'Nico Schlotterbeck', position: 'Verteidiger', image: null },
                { number: 25, name: 'Niklas Süle', position: 'Verteidiger', image: null },
                { number: 5, name: 'Ramy Bensebaini', position: 'Verteidiger', image: null },
                { number: 23, name: 'Emre Can', position: 'Mittelfeld', image: null },
                { number: 20, name: 'Marcel Sabitzer', position: 'Mittelfeld', image: null },
                { number: 8, name: 'Felix Nmecha', position: 'Mittelfeld', image: null },
                { number: 27, name: 'Karim Adeyemi', position: 'Angriff', image: null },
                { number: 14, name: 'Maximilian Beier', position: 'Angriff', image: null },
                { number: 43, name: 'Jamie Gittens', position: 'Angriff', image: null }
            ]
        }
    },
    {
        id: 4,
        league: 'SA',
        homeTeam: 'Inter Mailand',
        awayTeam: 'AC Mailand',
        date: '2024-10-06T19:45:00Z',
        homeLineup: {
            formation: '3-5-2',
            players: [
                { number: 1, name: 'Yann Sommer', position: 'Torwart', image: null },
                { number: 28, name: 'Benjamin Pavard', position: 'Verteidiger', image: null },
                { number: 6, name: 'Stefan de Vrij', position: 'Verteidiger', image: null },
                { number: 95, name: 'Alessandro Bastoni', position: 'Verteidiger', image: null },
                { number: 36, name: 'Matteo Darmian', position: 'Mittelfeld', image: null },
                { number: 23, name: 'Nicolò Barella', position: 'Mittelfeld', image: null },
                { number: 20, name: 'Hakan Çalhanoğlu', position: 'Mittelfeld', image: null },
                { number: 22, name: 'Henrikh Mkhitaryan', position: 'Mittelfeld', image: null },
                { number: 32, name: 'Federico Dimarco', position: 'Mittelfeld', image: null },
                { number: 9, name: 'Marcus Thuram', position: 'Angriff', image: null },
                { number: 10, name: 'Lautaro Martínez', position: 'Angriff', image: null }
            ]
        },
        awayLineup: {
            formation: '4-2-3-1',
            players: [
                { number: 16, name: 'Mike Maignan', position: 'Torwart', image: null },
                { number: 22, name: 'Emerson Royal', position: 'Verteidiger', image: null },
                { number: 28, name: 'Malick Thiaw', position: 'Verteidiger', image: null },
                { number: 23, name: 'Fikayo Tomori', position: 'Verteidiger', image: null },
                { number: 19, name: 'Theo Hernández', position: 'Verteidiger', image: null },
                { number: 14, name: 'Tijjani Reijnders', position: 'Mittelfeld', image: null },
                { number: 29, name: 'Youssouf Fofana', position: 'Mittelfeld', image: null },
                { number: 11, name: 'Christian Pulisic', position: 'Offensives Mittelfeld', image: null },
                { number: 80, name: 'Yunus Musah', position: 'Offensives Mittelfeld', image: null },
                { number: 10, name: 'Rafael Leão', position: 'Offensives Mittelfeld', image: null },
                { number: 7, name: 'Álvaro Morata', position: 'Angriff', image: null }
            ]
        }
    },
    {
        id: 5,
        league: 'FL1',
        homeTeam: 'Paris Saint-Germain',
        awayTeam: 'Olympique Marseille',
        date: '2024-10-06T20:45:00Z',
        homeLineup: {
            formation: '4-3-3',
            players: [
                { number: 99, name: 'Gianluigi Donnarumma', position: 'Torwart', image: null },
                { number: 2, name: 'Achraf Hakimi', position: 'Verteidiger', image: null },
                { number: 5, name: 'Marquinhos', position: 'Verteidiger', image: null },
                { number: 15, name: 'Danilo Pereira', position: 'Verteidiger', image: null },
                { number: 21, name: 'Lucas Hernández', position: 'Verteidiger', image: null },
                { number: 17, name: 'Vitinha', position: 'Mittelfeld', image: null },
                { number: 8, name: 'Fabián Ruiz', position: 'Mittelfeld', image: null },
                { number: 33, name: 'Warren Zaïre-Emery', position: 'Mittelfeld', image: null },
                { number: 7, name: 'Ousmane Dembélé', position: 'Angriff', image: null },
                { number: 9, name: 'Gonçalo Ramos', position: 'Angriff', image: null },
                { number: 10, name: 'Bradley Barcola', position: 'Angriff', image: null }
            ]
        },
        awayLineup: {
            formation: '4-3-3',
            players: [
                { number: 16, name: 'Pau López', position: 'Torwart', image: null },
                { number: 7, name: 'Jonathan Clauss', position: 'Verteidiger', image: null },
                { number: 5, name: 'Leonardo Balerdi', position: 'Verteidiger', image: null },
                { number: 4, name: 'Samuel Gigot', position: 'Verteidiger', image: null },
                { number: 3, name: 'Quentin Merlin', position: 'Verteidiger', image: null },
                { number: 19, name: 'Geoffrey Kondogbia', position: 'Mittelfeld', image: null },
                { number: 27, name: 'Jordan Veretout', position: 'Mittelfeld', image: null },
                { number: 22, name: 'Amine Harit', position: 'Mittelfeld', image: null },
                { number: 10, name: 'Mason Greenwood', position: 'Angriff', image: null },
                { number: 9, name: 'Elye Wahi', position: 'Angriff', image: null },
                { number: 11, name: 'Luis Henrique', position: 'Angriff', image: null }
            ]
        }
    },
    {
        id: 6,
        league: 'PL',
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        date: '2024-10-05T16:30:00Z',
        homeLineup: {
            formation: '4-3-3',
            players: [
                { number: 1, name: 'David Raya', position: 'Torwart', image: null },
                { number: 4, name: 'Ben White', position: 'Verteidiger', image: null },
                { number: 2, name: 'William Saliba', position: 'Verteidiger', image: null },
                { number: 6, name: 'Gabriel', position: 'Verteidiger', image: null },
                { number: 35, name: 'Oleksandr Zinchenko', position: 'Verteidiger', image: null },
                { number: 41, name: 'Declan Rice', position: 'Mittelfeld', image: null },
                { number: 8, name: 'Martin Ødegaard', position: 'Mittelfeld', image: null },
                { number: 29, name: 'Kai Havertz', position: 'Mittelfeld', image: null },
                { number: 7, name: 'Bukayo Saka', position: 'Angriff', image: null },
                { number: 9, name: 'Gabriel Jesus', position: 'Angriff', image: null },
                { number: 19, name: 'Leandro Trossard', position: 'Angriff', image: null }
            ]
        },
        awayLineup: {
            formation: '4-2-3-1',
            players: [
                { number: 1, name: 'Robert Sánchez', position: 'Torwart', image: null },
                { number: 27, name: 'Malo Gusto', position: 'Verteidiger', image: null },
                { number: 2, name: 'Axel Disasi', position: 'Verteidiger', image: null },
                { number: 6, name: 'Levi Colwill', position: 'Verteidiger', image: null },
                { number: 3, name: 'Marc Cucurella', position: 'Verteidiger', image: null },
                { number: 25, name: 'Moisés Caicedo', position: 'Mittelfeld', image: null },
                { number: 8, name: 'Enzo Fernández', position: 'Mittelfeld', image: null },
                { number: 20, name: 'Cole Palmer', position: 'Offensives Mittelfeld', image: null },
                { number: 10, name: 'Mykhailo Mudryk', position: 'Offensives Mittelfeld', image: null },
                { number: 7, name: 'Pedro Neto', position: 'Offensives Mittelfeld', image: null },
                { number: 15, name: 'Nicolas Jackson', position: 'Angriff', image: null }
            ]
        }
    }
];

let allMatches = [];
let currentFilter = 'all';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadMatches();
});

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.league;
            filterMatches();
        });
    });
}

// Load matches (using mock data for demonstration)
async function loadMatches() {
    const loading = document.getElementById('loading');
    const container = document.getElementById('matches-container');
    const errorMessage = document.getElementById('error-message');

    loading.style.display = 'block';
    container.innerHTML = '';
    errorMessage.style.display = 'none';

    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In production, this would be a real API call:
        // const response = await fetch('YOUR_API_ENDPOINT');
        // allMatches = await response.json();
        
        allMatches = mockMatches;
        
        loading.style.display = 'none';
        displayMatches(allMatches);
    } catch (error) {
        console.error('Error loading matches:', error);
        loading.style.display = 'none';
        errorMessage.style.display = 'block';
    }
}

// Filter matches by league
function filterMatches() {
    const filteredMatches = currentFilter === 'all' 
        ? allMatches 
        : allMatches.filter(match => match.league === currentFilter);
    
    displayMatches(filteredMatches);
}

// Display matches in the container
function displayMatches(matches) {
    const container = document.getElementById('matches-container');
    
    if (matches.length === 0) {
        container.innerHTML = '<div class="no-lineup"><p>Keine Spiele für diese Liga gefunden.</p></div>';
        return;
    }

    container.innerHTML = matches.map(match => createMatchCard(match)).join('');

    // Add click event listeners to match headers
    document.querySelectorAll('.match-header').forEach((header, index) => {
        header.addEventListener('click', () => {
            const card = header.closest('.match-card');
            card.classList.toggle('expanded');
        });
    });
}

// Create a match card HTML
function createMatchCard(match) {
    const matchDate = new Date(match.date);
    const formattedDate = matchDate.toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return `
        <div class="match-card" data-match-id="${match.id}">
            <div class="match-header">
                <div class="match-info">
                    <div class="league-name">${LEAGUES[match.league]}</div>
                    <div class="teams">
                        <span class="team-name">${match.homeTeam}</span>
                        <span class="vs">vs</span>
                        <span class="team-name">${match.awayTeam}</span>
                    </div>
                    <div class="match-date">${formattedDate}</div>
                </div>
                <div class="expand-icon">▼</div>
            </div>
            <div class="lineup-container">
                <div class="lineup-content">
                    ${createLineupsHTML(match)}
                </div>
            </div>
        </div>
    `;
}

// Create lineups HTML
function createLineupsHTML(match) {
    if (!match.homeLineup || !match.awayLineup) {
        return '<div class="no-lineup"><p>Aufstellungen sind noch nicht verfügbar.</p></div>';
    }

    return `
        <div class="lineup-grid">
            <div class="team-lineup">
                <h3>${match.homeTeam}</h3>
                <div class="formation">Formation: ${match.homeLineup.formation}</div>
                <div class="player-list">
                    ${match.homeLineup.players.map(player => createPlayerHTML(player)).join('')}
                </div>
            </div>
            <div class="team-lineup">
                <h3>${match.awayTeam}</h3>
                <div class="formation">Formation: ${match.awayLineup.formation}</div>
                <div class="player-list">
                    ${match.awayLineup.players.map(player => createPlayerHTML(player)).join('')}
                </div>
            </div>
        </div>
    `;
}

// Create player HTML
function createPlayerHTML(player) {
    const imageUrl = player.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23e9ecef" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" font-family="Arial" font-size="40" fill="%23999"%3E%F0%9F%91%A4%3C/text%3E%3C/svg%3E';
    
    return `
        <div class="player">
            <div class="player-number">${player.number}</div>
            <img src="${imageUrl}" alt="${player.name}" class="player-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23e9ecef%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22Arial%22 font-size=%2240%22 fill=%22%23999%22%3E%F0%9F%91%A4%3C/text%3E%3C/svg%3E'">
            <div class="player-info">
                <div class="player-name">${player.name}</div>
                <div class="player-position">${player.position}</div>
            </div>
        </div>
    `;
}
