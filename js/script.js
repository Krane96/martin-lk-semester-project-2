import { strapiURL } from "./settings/strapi.js";

const heroURL = strapiURL + "banner";
const productsURL = strapiURL + "products";





async function getStrapi() {
    
    try {
        
        //Hero Strapi

        const responseTwo = await fetch(heroURL);
        const strapiHero = await responseTwo.json();

        console.log(strapiHero);
        
        //Filter for featured products
    

         
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
        <h3>${featured[i].title}</h3>
        <p>${featured[i].description}</p>
        <span>${featured[i].price} £</span>
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

const toggleNavButton = document.querySelector('.toggle-button');
const headerNav = document.querySelector('.navigation');
const headerIcons = document.querySelector('.navigation-icons');
const headerStyle = document.querySelector('.header');

toggleNavButton.addEventListener('click', () => {
    headerNav.classList.toggle('active');
    headerIcons.classList.toggle('active');
    headerStyle.classList.toggle('active-header');
});



let loginButtonNav = document.querySelector('.hero-buttons button').onclick = () => {
    window.location.href = "login.html";
};

let heroShopButton = document.querySelector('.shop-button').onclick = () => {
    window.location.href = "products.html";
};


