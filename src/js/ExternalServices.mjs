const rawgKey = import.meta.env.VITE_RAWG_API_KEY;
const rawgBaseURL = "https://api.rawg.io/api";
const cheapSharkBaseURL = "https://www.cheapshark.com/api/1.0";

async function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}

export default class ExternalServices {
    constructor() { }

    // Search games by name using RAWG
    async searchGames(query = "", genre = "", platform = "") {
        let url = `${rawgBaseURL}/games?key=${rawgKey}`;
        if (query) url += `&search=${query}`;
        if (genre) url += `&genres=${genre}`;
        if (platform) url += `&platforms=${platform}`;

        const response = await fetch(url);
        const data = await convertToJson(response);
        return data.results;
    }

    // Get game details by RAWG id
    async getGameById(id) {
        const response = await fetch(`${rawgBaseURL}/games/${id}?key=${rawgKey}`);
        const data = await convertToJson(response);
        return data;
    }

    // Get current deals from CheapShark
    async getDeals(title) {
        const response = await fetch(
            `${cheapSharkBaseURL}/deals?title=${title}`
        );
        const data = await convertToJson(response);
        return data;
    }

    // Get all stores from CheapShark (needed to show store names/logos)
    async getStores() {
        const response = await fetch(`${cheapSharkBaseURL}/stores`);
        const data = await convertToJson(response);
        return data;
    }
}