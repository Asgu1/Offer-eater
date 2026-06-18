import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import GameDetail from "./GameDetail.mjs";

loadHeaderFooter();

const gameId = getParam("id");
const dataSource = new ExternalServices();

const detail = new GameDetail(gameId, dataSource);

document.querySelector("#max-price").addEventListener("input", (e) => {
    const maxPrice = parseFloat(e.target.value);
    if (!isNaN(maxPrice)) {
        detail.filterDealsByPrice(maxPrice);
    }
});

detail.init();