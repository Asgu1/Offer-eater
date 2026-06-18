import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class Wishlist {
    constructor(key = "offer-eater-wishlist") {
        this.key = key;
    }

    getItems() {
        return getLocalStorage(this.key) || [];
    }

    addItem(game) {
        const items = this.getItems();
        const exists = items.find((item) => item.id === game.id);
        if (exists) return;

        items.push({
            id: game.id,
            name: game.name,
            image: game.background_image,
        });
        setLocalStorage(this.key, items);
    }

    removeItem(id) {
        let items = this.getItems();
        items = items.filter((item) => item.id !== Number(id));
        setLocalStorage(this.key, items);
    }

    isInWishlist(id) {
        const items = this.getItems();
        return items.some((item) => item.id === id);
    }
}