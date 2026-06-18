import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
    const cartItems = getLocalStorage("offer-eater-cart") || [];
    const cartFooter = document.querySelector(".cart-footer");

    if (cartItems.length === 0) {
        document.querySelector(".cart-list").innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".cart-list").innerHTML = htmlItems.join("");

    cartFooter.classList.remove("hide");
    const total = cartItems.reduce(
        (sum, item) => sum + item.salePrice * item.quantity,
        0
    );
    cartFooter.querySelector(".cart-total").innerHTML = `Total: $${total.toFixed(2)}`;
}

function cartItemTemplate(item) {
    return `<li class="cart-card">
    <img src="${item.image}" alt="${item.name}" />
    <h2>${item.name}</h2>
    <p>Quantity: ${item.quantity}</p>
    <p>Price: $${item.salePrice}</p>
    <button class="remove-btn" data-id="${item.dealID}">Remove</button>
  </li>`;
}

document.querySelector(".cart-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        const id = e.target.dataset.id;
        let cartItems = getLocalStorage("offer-eater-cart") || [];
        cartItems = cartItems.filter((item) => item.dealID !== id);
        setLocalStorage("offer-eater-cart", cartItems);
        renderCartContents();
    }
});

renderCartContents();