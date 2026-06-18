import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import GameList from "./GameList.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();
const listElement = document.querySelector(".games");
const gameList = new GameList(dataSource, listElement);

// Initial games
gameList.init("cyberpunk");

// Search button
document.querySelector("#search-button").addEventListener("click", () => {
    const query = document.querySelector("#search-game").value.trim();

    const genre = document.querySelector("#genre-filter").value;
    const platform = document.querySelector("#platform-filter").value;

    gameList.init(query, genre, platform);
});

// Press Enter to search
document.querySelector("#search-game").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        document.querySelector("#search-button").click();
    }
});

// Apply filters
document.querySelector("#apply-filters").addEventListener("click", () => {
    const query = document.querySelector("#search-game").value.trim();
    const genre = document.querySelector("#genre-filter").value;
    const platform = document.querySelector("#platform-filter").value;

    gameList.init(query, genre, platform);
});