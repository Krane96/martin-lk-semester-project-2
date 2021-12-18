import { strapiURL } from "./settings/strapi.js";
import { searchProduct } from "./components/search_filter.js";

const productsURL = strapiURL + "products";


async function getStrapi() {
    
    try {
        const response = await fetch(productsURL);
        const strapiProducts = await response.json();

        console.log(strapiProducts);
        

        
        createHTML(strapiProducts);
        searchProduct(strapiProducts);   
    } catch (error) {
        console.log(error);
    }
};

getStrapi();

export function createHTML(product){
    const products = document.querySelector('.products-container');
    products.innerHTML = '';
    product.forEach(function(product) {
    products.innerHTML += `
    <div class="product-card">
        <a class="grid-card" href="product_details.html?id=${product.id}">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <span>${product.price} £</span>
        <button>Learn more</button>
        </a>
        <a href="account.html?${product.id}">Edit</a>
    </div>`;  
    });

    


}