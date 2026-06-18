import { getParam, getLocalStorage, setLocalStorage } from "./utils.mjs";
import Wishlist from "./Wishlist.mjs";

export default class GameDetail {
    constructor(gameId, dataSource) {
        this.gameId = gameId;
        this.dataSource = dataSource;
        this.game = {};
        this.wishlist = new Wishlist();
    }

    async init() {
        this.game = await this.dataSource.getGameById(this.gameId);
        this.renderGameDetails();
        const wishlistBtn = document.createElement("button");
        wishlistBtn.id = "wishlist-btn";
        wishlistBtn.textContent = this.wishlist.isInWishlist(this.game.id)
            ? "♥ In Wishlist"
            : "♡ Add to Wishlist";
        wishlistBtn.addEventListener("click", () => {
            this.wishlist.addItem(this.game);
            wishlistBtn.textContent = "♥ In Wishlist";
        });
        document.querySelector(".game-detail").appendChild(wishlistBtn);

        const deals = await this.dataSource.getDeals(this.game.name);
        this.renderDeals(deals);

        document.querySelector("#deals-list").addEventListener("click", (e) => {
            if (e.target.classList.contains("add-to-cart-btn")) {
                const deal = JSON.parse(e.target.dataset.deal);
                const image = e.target.dataset.image;
                const name = e.target.dataset.name;
                this.addToCart(deal, image, name);
                alert(`${name} added to cart!`);
            }
        });
    }

    renderGameDetails() {
        document.querySelector("#game-title").textContent = this.game.name;
        document.querySelector("#game-image").src = this.game.background_image;
        document.querySelector("#game-image").alt = this.game.name;
        document.querySelector("#game-description").innerHTML =
            this.game.description_raw || "No description available.";
        document.querySelector("#game-genres").textContent =
            "Genres: " + this.game.genres.map((g) => g.name).join(", ");
        document.querySelector("#game-rating").textContent =
            "Rating: " + this.game.rating;
    }

    renderDeals(deals) {
        const dealsList = document.querySelector("#deals-list");
        this.allDeals = deals;

        if (!deals || deals.length === 0) {
            dealsList.innerHTML = "<li>No current deals found for this game.</li>";
            return;
        }
        const htmlItems = deals.map((deal) => this.dealTemplate(deal));
        dealsList.innerHTML = htmlItems.join("");
    }

    filterDealsByPrice(maxPrice) {
        const filtered = this.allDeals.filter(
            (deal) => parseFloat(deal.salePrice) <= maxPrice
        );
        const dealsList = document.querySelector("#deals-list");
        if (filtered.length === 0) {
            dealsList.innerHTML = "<li>No deals under that price.</li>";
            return;
        }
        dealsList.innerHTML = filtered.map((deal) => this.dealTemplate(deal)).join("");
    }

    dealTemplate(deal) {
        return `<li class="deal-card">
    <p>Store ID: ${deal.storeID}</p>
    <p>Sale Price: $${deal.salePrice}</p>
    <p>Normal Price: $${deal.normalPrice}</p>
    <p>Savings: ${Math.round(deal.savings)}%</p>
    <a href="https://www.cheapshark.com/redirect?dealID=${deal.dealID}" target="_blank">View Deal</a>
    <button class="add-to-cart-btn" data-deal='${JSON.stringify(deal)}' data-image="${this.game.background_image}" data-name="${this.game.name}">Add to Cart</button>
  </li>`;
    }

    addToCart(deal, image, name) {
        let cartItems = getLocalStorage("offer-eater-cart") || [];
        const existing = cartItems.find((item) => item.dealID === deal.dealID);

        if (existing) {
            existing.quantity += 1;
        } else {
            cartItems.push({
                dealID: deal.dealID,
                name: name,
                image: image,
                salePrice: deal.salePrice,
                quantity: 1,
            });
        }

        setLocalStorage("offer-eater-cart", cartItems);
    }
}