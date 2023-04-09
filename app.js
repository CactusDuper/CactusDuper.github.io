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

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

function createGameLink(game) {
    const anchor = document.createElement("a");
    anchor.href = `https://www.google.com/search?q=${encodeURIComponent(game)}`;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.textContent = game;
    return anchor;
}

async function selectGames() {
    const nsfwWarning = "This random game selector may display some NSFW games. By clicking OK, you confirm that you are 18+ and understand that filtering the games is annoying, and there may be some games left in the list still.";
    
    // Check for the cookie
    if (getCookie("nsfwWarningAccepted") !== "true") {
        if (!confirm(nsfwWarning)) {
            return;
        } else {
            // Store the cookie to remember that the user has accepted the warning
            setCookie("nsfwWarningAccepted", "true", 365);
        }
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
        
        // Create a link for the game and add it to the list item
        const gameLink = createGameLink(game);
        listItem.appendChild(gameLink);
        
        gameListElement.appendChild(listItem);
    });
}
