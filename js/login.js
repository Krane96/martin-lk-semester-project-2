import {strapiURL } from "./settings/strapi.js";
import displayMessage from "./components/login_message.js";
import { saveToken, saveUser } from "./settings/storage.js";


const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".login-message");


form.addEventListener("submit", submitLogin);

function submitLogin(event) {
    message.innerHTML = "";
    event.preventDefault();

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if(usernameValue.length === 0 || passwordValue.length === 0) {
        displayMessage("warning", "wrong username/password", ".login-message");
    }

    whenLogin(usernameValue, passwordValue);
}

async function whenLogin(username, password) {
    const strapiLoginURL = strapiURL + "auth/local";

    const data = JSON.stringify({ identifier: username, password: password});

    const settings = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(strapiLoginURL, settings);
        const json = await response.json();
console.log(json);

        if(json.user) {
            saveToken(json.jwt);
            saveUser(json.user)

            //redirect to login if succesful

            location.href = "/account.html";
        }

        if(json.error){
            displayMessage("warning", "wrong pw or username", ".login-message"); 
        }

    }  catch(error) {
        console.log(error);
    }
}