import { getExistingCartItems, saveCart } from "./components/get_cart_items.js";
import { navigationToggle } from "./components/navigation.js";

const queryString = window.location.search;
const id = new URLSearchParams(queryString).get('id');
const url = `http://localhost:1337/products/${id}`;
const imageURL = "http://localhost:1337";


navigationToggle();


fetch(url)
.then(response => response.json())
.then(product => {
    console.log('Success:', product);
    createProductDetails(product);
})
.catch((error) => {
    console.error('Error', error);
});

const productDetail = document.querySelector(".product-detail-container");
function createProductDetails (product) {
    
    let content = `
    <h1>${product.title}</h1>
        <div class="product-grid">
            <div class="product-image">
            <img src="${imageURL + product.image.url}" alt="product image"></img>
            </div>
            <div class="product-description">
            <h4>${product.title}</h4>
            <p>${product.description}</h4> <br>
            <a href="products.html">&#10094; Back</a>
        </div>
            <div class="product-choices">
                <h4>Choose your faction</h4>
                <div class="faction-choice">
                        <div class="alliance">
                            
                            <img src="images/horde_logo.png"></img>
                        </div>
                            <div class="horde">
                            
                            <img src="images/alliance_logo.png"></img>
                        </div>      
                </div>
                <select>
                        <option>Select Class</option>
                        <option>Mage</option>
                        <option>Warrior</option>
                        <option>Paladin</option>
                        <option>Warlock</option>
                        <option>Hunter</option>
                        <option>Rogue</option>
                        </select>
                <select>
                        <option>Select Server</option>
                        <option>Ragnaros</option>
                        <option>Silvermoon</option>
                        <option>Outland</option>
                        <option>Firemaw</option>
                        <option>Dreadmist</option>
                        <option>Blade's Edge    </option>
                        </select>
                        <input type"text" placeholder="Character name"/>
                <button data-image_url="${product.image_url}"data-description="${product.description}"data-title="${product.title}" data-price="${product.price}">Add to cart</button>
            </div>
            
     </div>
     
     
    
`
productDetail.innerHTML = content;
document.title =  "World of Boostcraft: " +  product.title;


const removeButtons = document.querySelectorAll('.cart-content button');
removeButtons.forEach((removeButton) => {
    removeButton.addEventListener('click', buttonClick);
});

const addButtons = document.querySelectorAll('.product-choices button');
    addButtons.forEach((button) => {
        button.addEventListener('click', buttonClick);
    });

function buttonClick() {
        
        const description = this.dataset.description;
        const title = this.dataset.title;
        const price = this.dataset.price
        const image_url = this.dataset.image_url;
    
        const currentCartItems = getExistingCartItems();
    
        const cartItemExist = currentCartItems.find(function (added) {
            return added.description === description;
        });
    
        if (cartItemExist === undefined) {
            const cartItem = { title: title, description: description,  price: price, image: image_url};
            currentCartItems.push(cartItem);
            saveCart(currentCartItems);
            alert("Added to your cart")
            
        } else {
            const newCart = currentCartItems.filter((added) => added.title !== title);
            saveCart(newCart);
            alert("Removed from your cart")
        }

    }  
   
};




