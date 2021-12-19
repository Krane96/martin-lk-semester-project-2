const jwcKey = "token";
const userKey = "user";


// making the functions exportable

export function saveJWC(token) {
    localStorageSaving(jwcKey, token);
};
export function getJWC() {
    return getStorageData(jwcKey);
};
export function saveUser(user) {
    localStorageSaving(userKey, user);
};
export function getUsername() {
    const user = getStorageData(userKey);

    if(user) {
        return user.username;
    }
    return null;
};

export function clearLoginStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

function localStorageSaving(jwtData , value) {
    localStorage.setItem(jwtData, JSON.stringify(value));

}

function getStorageData(jwtData) {
    const value = localStorage.getItem(jwtData);

    if(!value) {
        return [];
    }

    return JSON.parse(value);
}
