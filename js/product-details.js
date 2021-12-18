import { getExistingCartItems, saveCart } from "./components/get_cart_items.js";
const queryString = window.location.search;
const id = new URLSearchParams(queryString).get('id');
const url = `http://localhost:1337/products/${id}`;

const imageURL = "http://localhost:1337";





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
            <p>${product.description}</h4>
        </div>
            <div class="product-choices">
                <h4>Choose your faction</h4>
                <div class="faction-choice">
                        <div class="alliance">
                            <input type="radio" id="alliance" name="faction" value="alliance">
                            <img src="images/horde_logo.png"></img>
                        </div>
                            <div class="horde">
                            <input type="radio" id="horde" name="faction" value="horde">
                            <img src="images/alliance_logo.png"></img>
                        </div>
                </div>
                <button data-image_url="${product.image_url}"data-description="${product.description}"data-title="${product.title}" data-price="${product.price}">Add to cart</button>
            </div>
     </div>
     
     <a href="products.html">&#10094; Back</a>
    
`
productDetail.innerHTML = content;



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




