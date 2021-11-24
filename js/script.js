import {strapiURL } from "./settings/strapi.js";
import { createHTML } from "./components/products.js";

const heroURL = strapiURL + "home";
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
        

        
        createHTML(strapiProducts); 
        createHero(strapiHero);   
    } catch (error) {
        console.log(error);
    }

    
    
};

getStrapi();



function createHero(hero){
    const headerElement = document.querySelector('.hero-header-container');

        headerElement.innerHTML += ` 
        <img src="" alt="hero header">
        ${hero.image}
        </img>`;
    
}

    










/*
   heroContainer.innerHTML =     
   `<img src="">${strapiProducts.hero_banner.image}</img>`
   const heroContainer = document.querySelector('.hero-container');
   heroContainer.innerHTML = "";
*/
























/* Navigation responsiveness */
let navigation = document.querySelector('.navigation');

document.querySelector('.menu-icon').onclick = () =>{
    console.log(event);
    navigation.classList.toggle('active')
}