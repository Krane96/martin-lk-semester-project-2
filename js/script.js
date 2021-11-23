import {strapiURL } from "./settings/strapi.js";
import { createHTML } from "./components/heroHeader.js";

const heroURL = strapiURL + "home";
const productsURL = strapiURL + "products";


async function getStrapi() {
    
    try {
        const response = await fetch(productsURL);
        const strapiHero = await response.json();
        console.log(strapiHero);


        createHTML(strapiHero);    
        
    } catch (error) {
        console.log(error);
    }
};

getStrapi();




    










/*
   heroContainer.innerHTML =     
   `<img src="">${strapiHero.hero_banner.image}</img>`
   const heroContainer = document.querySelector('.hero-container');
   heroContainer.innerHTML = "";
*/
























/* Navigation responsiveness */
let navigation = document.querySelector('.navigation');

document.querySelector('.menu-icon').onclick = () =>{
    console.log(event);
    navigation.classList.toggle('active')
}