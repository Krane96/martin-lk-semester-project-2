export function createHTML(product){
    const products = document.querySelector('.products-container');
    products.innerHTML = '';
    product.forEach(function(product) {
    products.innerHTML += `
    <div class="product-card">
        <a class="grid-card">
        
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <span>${product.price}</span>
        <button>Learn More</button>
        </a>
    </div>`;
    });
}

