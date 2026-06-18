import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import GameList from "./GameList.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();
const listElement = document.querySelector(".games");
const gameList = new GameList(dataSource, listElement);

gameList.init("cyberpunk");

document.querySelector("#apply-filters").addEventListener("click", () => {
    const genre = document.querySelector("#genre-filter").value;
    const platform = document.querySelector("#platform-filter").value;
    gameList.init("", genre, platform);
});