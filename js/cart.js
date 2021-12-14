import { getExistingCartItems } from "./components/get_cart_items.js";
const cartItem = getExistingCartItems();
const imageURL = "http://localhost:1337";
const cartHtml = document.querySelector('#shopping-cart')




if (cartItem.length === 0) {
    cartHtml.innerHTML = "<h3>Cart is Empty</h3>"; 
}

cartItem.forEach(addedCartItem => {
    cartHtml.innerHTML += 
    `
    <div class="cart-item">
        <span class="fas fa-times"></span>
        <img src="${addedCartItem.image}" alt="product image"></img>
        <div class="cart-content">
            <h4>${addedCartItem.title}</h4>
            <div class="price">${addedCartItem.price} £</div>
        </div> 
    </div>
    `;
    
})

//<button data-description="${addedCartItem.description}"data-title="${addedCartItem.title}" data-price="${addedCartItem.price}">Add to cart</button>

