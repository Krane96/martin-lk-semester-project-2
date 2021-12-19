import { strapiURL } from "./settings/strapi.js";
import { navigationToggle } from "./components/navigation.js";
const heroURL = strapiURL + "banner";
const productsURL = strapiURL + "products";


async function getStrapi() {
    
    try {
        
        //Hero Strapi

        const responseTwo = await fetch(heroURL);
        const strapiHero = await responseTwo.json();

        console.log(strapiHero);
        
        createHero(strapiHero);
        
    } catch (error) {
        console.log(error);
    }
    
};

getStrapi();

async function getProducts () {

    const response = await fetch(productsURL);
    const strapiProducts = await response.json();
    console.log(strapiProducts);


    const filterIfFeatured = (product) => {
        if (product.featured === true) {
            return true;
        }
    };

    const featured = strapiProducts.filter(filterIfFeatured)
    console.log(featured)

    for (let i = 0; i < featured.length; i++) {

        
    const products = document.querySelector('.products-container');
    products.innerHTML += ` 
    
    <div class="product-card">
        <a class="grid-card" href="products.html">
        <h3>${featured.title}</h3>
        <p>${featured.description}</p>
        <span>${featured.price} £</span>
        <button>Learn more</button>
        </a>
    </div>
    `
}
};

getProducts();

function createHero(hero){
    const headerElement = document.querySelector('.hero-header-container');

        headerElement.innerHTML += ` 
        <div class="image-fade">
        <img src="${hero.image_url}" alt="hero header">
        
        </img>
        </div>
        `;
    
}

/* Navigation */
navigationToggle();

const shopButton = document.querySelector('.shop-button').addEventListener('click', () => {
   location.href = "products.html";
});
const loginButton = document.querySelector('.hero-buttons button').addEventListener('click', () => {
   location.href = "login.html";
});





