const tokenKey = "token";
const userKey = "user";


// making the functions exportable

export function saveToken(token) {
    localStorageSaving(tokenKey, token);
};
export function getToken() {
    return getStorageData(tokenKey);
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

// making the functions to retrieve everything

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
