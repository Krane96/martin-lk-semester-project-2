
const queryString = window.location.search;
const id = new URLSearchParams(queryString).get('id');

const url = 'http://localhost:1337/products/${id}';

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
     <div class="blog-post-container">
      
     <h1>${product.title}</h1>
     ${product}
    
     <a href="products.html">&#10094; Back</a>
    </div>
`
productDetail.innerHTML = content;
document.title =  "Product: " +  product.title;
};


