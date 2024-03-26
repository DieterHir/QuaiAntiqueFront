let tokenCookieName = "accesstoken";
let roleCookieName = "role"
let signoutBtn = document.getElementById("signout-btn");

signoutBtn.addEventListener("click", signout);
let apiUrl = "http://127.0.0.1:8000/api/";

getInfosUser();

function signout() {
    eraseCookie(tokenCookieName);
    eraseCookie(roleCookieName);
    window.location.reload("/");
}

function getRole() {
    return getCookie(roleCookieName);
}

function setToken(token) {
    setCookie(tokenCookieName, token, 7);
}

function getToken() {
    return getCookie(tokenCookieName);
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (const element of ca) {
        let c = element;
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function isConnected() {
    return !(getToken() == null || getToken() == undefined);
}

function showAndHideElementsForRoles() {
    let userConnected = isConnected();
    let role = getRole();

    let allElementsToEdit = document.querySelectorAll('[data-show]');

    allElementsToEdit.forEach(element => {
        switch (element.dataset.show) {
            case 'disconnected':
                if (userConnected) {
                    element.classList.add("d-none");
                }
                break;

            case 'connected':
                if (!userConnected) {
                    element.classList.add("d-none");
                }
                break;

            case 'admin':
                if (!userConnected || role != "admin") {
                    element.classList.add("d-none");
                }
                break;

            case 'ROLE_USER':
                if (!userConnected || role != "ROLE_USER") {
                    element.classList.add("d-none");
                }
                break;
        }
    })
}

// function showLoader() {

//     const loader = `
//     <div class="loader-container" id="loader">
//     <div class="dot d1"></div>
//     <div class="dot d2"></div>
//     <div class="dot d3"></div>
//     </div>`;
//     const mainPage = document.getElementById("main-page")
//     mainPage.innerHTML = loader + mainPage.innerHTML;  
// }

// function hideLoader() {
//     document.getElementById("loader").style.display = "none";
// }

function getInfosUser() {
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    fetch(apiUrl + "account/me", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Impossible de récupérer les informations utilisateur");
            }
        })
        .then(result => {
            return (result);
        })
        .catch(error => {
            console.error("erreur lors de la récupération des données utilisateur", error);
        });
}

function sanitizeHtml(text){
    const temp = document.createElement('div');
    temp.textContent = text;
    return temp.innerHTML;
}