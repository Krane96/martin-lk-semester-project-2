import { getToken } from "./settings/storage.js";
import { clearLoginStorage } from "./settings/storage.js";
import { getUsername } from "./settings/storage.js";
import { strapiURL } from "./settings/strapi.js";
import displayMessage from "./components/login_message.js";
import { getExistingCartItems } from "./components/get_cart_items.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const cartItem = getExistingCartItems();
const cartHtml = document.querySelector('#shopping-cart')
const imageURL = "http://localhost:1337";
const token = getToken();


if (cartItem.length === 0) {
    cartHtml.innerHTML = "<h3>Cart is Empty</h3>"; 
}
/*
if(token.length === 0) {
    window.location.href = "login.html";
}
*/

function logoutButton() {
    const button = document.querySelector(".logout-wrap button");

    if (button) {

    button.onclick = function () {
        const doLogout = confirm("Confirm logout");

            if (doLogout) {
            clearLoginStorage();
            window.location.href = "index.html";
            }
        }
    }

}
logoutButton();


// displaying your username when logged in

const loggedUser = document.querySelector('.admin-panel-row-1');
const username = getUsername();
console.log(username);

let authLink = "";

if(username){
 authLink = `
 <div class="admin-user">
                <img src="images/png-khadgar.png" alt="">
 <h4>Hi ${username}</h4>
 </div>
 
 `;
}

loggedUser.innerHTML = `${authLink}`;


//makeForm toggle

let updateForm = document.querySelector('#update-form');
let makeForm = document.querySelector('#make-form');
let update = document.querySelector('#update');
let make = document.querySelector('#make');
let indicator = document.querySelector('#indicator');


update.onclick = () => {
    makeForm.style.transform = "translateX(0px)"
    updateForm.style.transform = "translateX(0px)"
    indicator.style.transform = "translateX(0px)"
    
}
make.onclick = () => {
    makeForm.style.transform = "translateX(300px)"
    updateForm.style.transform = "translateX(300px)"
    indicator.style.transform = "translateX(120px)"
}






// Add product

const formMake = document.querySelector("#update-form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const message = document.querySelector(".message-container");

formMake.addEventListener("submit", formSubmit);

function formSubmit(event) {
    event.preventDefault();

    message.innerHTML = "";

    const nameValue = name.value.trim();
    const descriptionValue = description.value.trim();
    const priceValue = parseFloat(price.value);
    console.log(priceValue);
    if(nameValue.length === 0 || isNaN(priceValue) || priceValue.length === 0 || descriptionValue.length === 0) {
        return displayMessage("warning", "Wrong values", ".message-container");
    };


    addProduct(nameValue, priceValue, descriptionValue);

}

async function addProduct(title, price, description) {
        const url = strapiURL + "products";

        const data = JSON.stringify({title: title, price: price, description: description});

        const token = getToken();

        const options = {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try{
            const response = await fetch(url, options);
            const json = await response.json();
            console.log(json);

            if(json.created_at){
                alert("product created");
                makeForm.reset();
            }
        }
        catch(error){
            console.log(error);
        }
};


// update product

const productUrl = strapiURL + "products/" + id;
const formUpdate = document.querySelector('#make-form');
const updateTitle = document.querySelector('.update-name');
const updatePrice = document.querySelector('.update-price');
const updateDescription = document.querySelector('.update-description');
const updateId = document.querySelector('.update-id');

(async function () {
    try {
        const response = await fetch(productUrl);
        const details = await response.json();

        updateTitle.value = details.title;
        updatePrice.value = details.price;
        updateDescription.value = details.description;
        updateId.value = details.id;

    console.log(details);
        
    } catch (error) {
        console.log(error);
    }
})




// cart 
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

cartItem.forEach(addedCartItem => {
    cartHtml.innerHTML += 
    `
    <div class="cart-item">
    <a href="account.html?${addedCartItem.id}">
        <span class="fas fa-times" data-image="${imageURL + addedCartItem.image_url}"data-description="${addedCartItem.description}"data-title="${addedCartItem.title}" data-price="${addedCartItem.price}"></span>
        <img src="${imageURL + addedCartItem.image}" alt="addedCartItem image"></img>
        <div class="cart-content">
            <h4>${addedCartItem.title}</h4>
            <div class="price">${addedCartItem.price} £</div>
            </a>
        </div> 
    </div>
    `;
    
});

