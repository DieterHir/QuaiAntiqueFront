let btnSingin = document.getElementById("btnSignin");
let mailInput = document.getElementById("EmailInput");
let passwordInput = document.getElementById("PasswordInput");
let signinForm = document.getElementById("signinForm");

btnSingin.addEventListener("click", checkCredentials);

function checkCredentials() {
    let dataForm = new FormData(signinForm);
    let username = sanitizeHtml(dataForm.get("email"));
    let password = sanitizeHtml(dataForm.get("mdp"));

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "username": username,
        "password": password,
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl+"login", requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                mailInput.classList.add("is-invalid");
                passwordInput.classList.add("is-invalid");
            }
        })
        .then((result) => {

            let token = result.apiToken;
            setToken(token);

            setCookie(roleCookieName, result.roles[0], 7);
            window.location.replace("/");
        })
        .catch((error) => console.error(error));
}