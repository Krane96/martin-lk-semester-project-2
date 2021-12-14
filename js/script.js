import { strapiURL } from "./settings/strapi.js";
import { cartRedirect } from "./components/get_cart_items.js";

const heroURL = strapiURL + "banner";
const productsURL = strapiURL + "products";


async function getStrapi() {
    
    try {
        // Products Strapi

        const response = await fetch(productsURL);
        const strapiProducts = await response.json();
        
        //Hero Strapi

        const responseTwo = await fetch(heroURL);
        const strapiHero = await responseTwo.json();


        console.log(strapiHero);
        console.log(strapiProducts);
        

         
        createHero(strapiHero);
        cartRedirect();   
    } catch (error) {
        console.log(error);
    }

    
    
};

getStrapi();



function createHero(hero){
    const headerElement = document.querySelector('.hero-header-container');

        headerElement.innerHTML += ` 
        <div class="image-fade">
        <img src="${hero.image_url}" alt="hero header">
        
        </img>
        </div>
        `;
    
}

    

/*

document.querySelector('.user-icon').onclick = () => {
    const loginDisplay = document.querySelector('.login-container');
    loginDisplay.classList.toggle('login-visible')
    
}

*/














/* Navigation */
let navigation = document.querySelector('.navigation');


document.querySelector('.menu-icon').onclick = () =>{
    console.log(event);
    navigation.classList.toggle('active')
};




let loginButtonNav = document.querySelector('.hero-buttons button').onclick = () => {
    window.location.href = "login.html";
};

let heroShopButton = document.querySelector('.shop-button').onclick = () => {
    window.location.href = "products.html";
};


