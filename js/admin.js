import { getToken } from "./settings/storage.js";
import { clearLoginStorage } from "./settings/storage.js";


if (!getToken) {
    location.href = "index.html";
}
function logoutButton() {
    const button = document.querySelector(".logout");

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