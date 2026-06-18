import { renderListWithTemplate } from "./utils.mjs";

function gameCardTemplate(game) {
    return `<li class="game-card">
    <a href="./product_pages/?id=${game.id}">
      <img src="${game.background_image}" alt="${game.name}" />
      <h2 class="card__name">${game.name}</h2>
      <p class="card__rating">⭐ ${game.rating}</p>
    </a>
  </li>`;
}

export default class GameList {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init(query = "", genre = "", platform = "") {
        const games = await this.dataSource.searchGames(query, genre, platform);
        this.renderList(games);
    }

    renderList(games) {
        renderListWithTemplate(gameCardTemplate, this.listElement, games);
    }
}