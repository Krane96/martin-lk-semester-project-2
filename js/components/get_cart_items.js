export function getExistingCartItems() {
    const cartItems = localStorage.getItem("addedToCart");

    if (cartItems === null) {
        return [];
    } else {
        return JSON.parse(cartItems);
    }
} 

export function saveCart(addedToCart) {
    localStorage.setItem("addedToCart", JSON.stringify(addedToCart));
}

