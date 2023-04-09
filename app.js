async function loadGames() {
    const response = await fetch("games.json");
    const games = await response.json();
    return games;
}

function selectRandomGames(gamesList, numGames) {
    if (gamesList.length < numGames) {
        alert("Not enough games in the list to select the specified number of random games.");
        return [];
    }
    return Array.from({ length: numGames }, () => gamesList.splice(Math.floor(Math.random() * gamesList.length), 1)[0]);
}

function filterSportsGames(gamesList) {
    const sportsRegex = /soccer|football|basketball|baseball|tennis|golf/i;
    return gamesList.filter(game => !sportsRegex.test(game));
}

async function selectGames() {
    const nsfwWarning = "This random game selector may display some NSFW games. By clicking OK, you confirm that you are 18+ and understand that filtering the games is annoying, and there may be some games left in the list still.";
    if (!confirm(nsfwWarning)) {
        return;
    }
    
    const numGames = parseInt(document.getElementById("num-games").value);
    let gamesList = await loadGames();
    
    // Filter out sports games
    gamesList = filterSportsGames(gamesList);
    
    const randomGames = selectRandomGames(gamesList, numGames);

    const gameListElement = document.getElementById("game-list");
    gameListElement.innerHTML = "";

    randomGames.forEach(game => {
        const listItem = document.createElement("div");
        listItem.classList.add("game-item");
        listItem.textContent = game;
        gameListElement.appendChild(listItem);
    });
}
