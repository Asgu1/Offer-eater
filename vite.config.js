import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { resolve, dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    base: "/Offer-eater/",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                cart: resolve(__dirname, "cart/index.html"),
                wishlist: resolve(__dirname, "wishlist/index.html"),
                product: resolve(__dirname, "product_pages/index.html"),
            }
        }
    }
});
