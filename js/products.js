

import { strapiURL } from "./settings/strapi.js";

const productsURL = strapiURL + "products";


async function getStrapi() {
    
    try {
        const response = await fetch(productsURL);
        const strapiProducts = await response.json();

        console.log(strapiProducts);
        

        
        createHTML(strapiProducts);   
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
    </div>`;  
    });

    


}