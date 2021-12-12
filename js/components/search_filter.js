import { createHTML } from "../products.js";

export function searchProduct(productSearch) {
    const search = document.querySelector('.input-search');
    search.onkeyup = function (event) {
        
         const searchValue = event.target.value.trim().toLowerCase();

         const filteredProducts = productSearch.filter(function (productFilter) {
             if (productFilter.title.toLowerCase().startsWith(searchValue)) {
                 return true;
             }
            

         });
 
          createHTML(filteredProducts);
        
    };
}