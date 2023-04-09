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

async function selectGames() {
    const numGames = parseInt(document.getElementById("num-games").value);
    const gamesList = await loadGames();
    const randomGames = selectRandomGames(gamesList, numGames);

    const gameListElement = document.getElementById("game-list");
    gameListElement.innerHTML = "";

    randomGames.forEach(game => {
        const listItem = document.createElement("li");
        listItem.textContent = game;
        gameListElement.appendChild(listItem);
    });
}
