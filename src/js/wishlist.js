import { loadHeaderFooter } from "./utils.mjs";
import Wishlist from "./Wishlist.mjs";

loadHeaderFooter();

const wishlist = new Wishlist();

function renderWishlist() {
    const items = wishlist.getItems();
    const listElement = document.querySelector(".wishlist-list");

    if (items.length === 0) {
        listElement.innerHTML = "<p>Your wishlist is empty.</p>";
        return;
    }

    const htmlItems = items.map(
        (item) => `<li class="wishlist-card">
      <img src="${item.image}" alt="${item.name}" />
      <h2>${item.name}</h2>
      <button class="remove-btn" data-id="${item.id}">Remove</button>
    </li>`
    );
    listElement.innerHTML = htmlItems.join("");
}

document.querySelector(".wishlist-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        wishlist.removeItem(e.target.dataset.id);
        renderWishlist();
    }
});

renderWishlist();