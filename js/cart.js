import { getExistingCartItems, saveCart } from "./components/get_cart_items.js";
const cartItem = getExistingCartItems();
const cartHtml = document.querySelector('#shopping-cart')

const imageURL = "http://localhost:1337";


if (cartItem.length === 0) {
    cartHtml.innerHTML = "<h3>Cart is Empty</h3>"; 
}



cartItem.forEach(addedCartItem => {
    cartHtml.innerHTML += 
    `
    <div class="cart-item">
        <span class="fas fa-times" data-image="${imageURL + addedCartItem.image_url}"data-description="${addedCartItem.description}"data-title="${addedCartItem.title}" data-price="${addedCartItem.price}"></span>
        <a href="account.html#update-form"><img src="${imageURL + addedCartItem.image}" alt="addedCartItem image"></img></a>
        <div class="cart-content">
            <h4>${addedCartItem.title}</h4>
            <div class="price">${addedCartItem.price} £</div>
        </div> 
    </div>
    `;
    
})

console.log(cartItem);


const removeButtons = document.querySelectorAll('.cart-item span');
removeButtons.forEach((removeButton) => {
    removeButton.addEventListener('click', buttonClick);
});

function buttonClick() {
        
    const description = this.dataset.description;
    const title = this.dataset.title;
    const price = this.dataset.price
    const image = this.dataset.image_url

    const currentCartItems = getExistingCartItems();

    const cartItemExist = currentCartItems.find(function (added) {
        return added.description === description;
    });
  
    if (cartItemExist === undefined) {
        
    } else {
        const newCart = currentCartItems.filter((added) => added.title !== title);
        saveCart(newCart);
        alert("Removed from your cart")

    }
    
}  

