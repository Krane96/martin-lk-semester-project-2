
const queryString = window.location.search;
const id = new URLSearchParams(queryString).get('id');

const url = `http://localhost:1337/products/${id}`;

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
    <h2>${product.title}</h2>
     <div class="product">
     ${product.description}
     ${product.price}
    
     <a href="products.html">&#10094; Back</a>
    </div>
`
productDetail.innerHTML = content;

};


