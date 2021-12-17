import { getToken } from "./settings/storage.js";
import { clearLoginStorage } from "./settings/storage.js";
import { getUsername } from "./settings/storage.js";
import { strapiURL } from "./settings/strapi.js";
import displayMessage from "./components/login_message.js";
const token = getToken();


if (!token) {
    window.location.href = "login.html";
}


function logoutButton() {
    const button = document.querySelector(".logout-wrap button");

    if (button) {

    button.onclick = function () {
        const doLogout = confirm("Confirm logout");

            if (doLogout) {
            clearLoginStorage();
            window.location.href = "index.html";
            }
        }
    }

}
logoutButton();


// displaying your username when logged in

const loggedUser = document.querySelector('.admin-panel-row-1');
const username = getUsername();
console.log(username);

let authLink = `<h1>You are not logged in</h1>
                <button><a href="login.html">Login</button>
`;

if(username){
 authLink = `
 <div class="admin-user">
                <img src="images/png-khadgar.png" alt="">
 <h4>Hi ${username}</h4>
 </div>
 
 `;
}

loggedUser.innerHTML = `${authLink}`;


//form toggle

let updateForm = document.querySelector('#update-form');
let makeForm = document.querySelector('#make-form');
let update = document.querySelector('#update');
let make = document.querySelector('#make');
let indicator = document.querySelector('#indicator');


update.onclick = () => {
    makeForm.style.transform = "translateX(0px)"
    updateForm.style.transform = "translateX(0px)"
    indicator.style.transform = "translateX(0px)"
    
}
make.onclick = () => {
    makeForm.style.transform = "translateX(300px)"
    updateForm.style.transform = "translateX(300px)"
    indicator.style.transform = "translateX(120px)"
}






// Add product

const form = document.querySelector("form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const message = document.querySelector(".message-container");

form.addEventListener("submit", formSubmit);

function formSubmit(event) {
    event.preventDefault();

    message.innerHTML = "";

    const nameValue = name.value.trim();
    const descriptionValue = description.value.trim();
    const priceValue = parseFloat(price.value);
    console.log(priceValue);
    if(nameValue.length === 0 || isNaN(priceValue) || priceValue.length === 0 || descriptionValue.length === 0) {
        return displayMessage("warning", "Wrong values", ".message-container");
    };


    addProduct(nameValue, priceValue, descriptionValue);

}

async function addProduct(title, price, description) {
        const url = strapiURL + "products";

        const data = JSON.stringify({title: title, price: price, description: description});

        const token = getToken();

        const options = {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try{
            const response = await fetch(url, options);
            const json = await response.json();
            console.log(json);

            if(json.created_at){
                alert("product created");
                form.reset();
            }
        }
        catch(error){
            console.log(error);
        }
};