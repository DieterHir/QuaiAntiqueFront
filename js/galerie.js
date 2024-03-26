let galerie = [];
let selectedPicture = [];
let nomAddInput = document.getElementById('NameAddInput');
let nomEditInput = document.getElementById('NameEditInput');
let btnAdd = document.getElementById('btn-add');
let btnEdit = document.getElementById('btn-edit');
let content = document.getElementById('allImages');
let form = document.getElementById('formAdd');
let formEdit = document.getElementById('formEditPic');
let btnDelete = document.getElementById('btn-delete');

// nomAddInput.addEventListener("keyup", validateAddForm);
nomEditInput.addEventListener("keyup", validateEditForm);
btnAdd.addEventListener("click", addPicture);
btnEdit.addEventListener("click", editPicture);
btnDelete.addEventListener("click", deletePicture);

function validateAddForm() {
    let nameAddOk = validateRequired(nomAddInput);

    if (nameAddOk) {
        btnAdd.disabled = false;
    } else {
        btnAdd.disabled = true;
    }
}

function validateEditForm() {
    let nameEditOk = validateRequired(nomEditInput);

    if (nameEditOk) {
        btnEdit.disabled = false;
    } else {
        btnEdit.disabled = true;
    }
}

function validateRequired(input) {
    if (input.value.trim() != '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        return false;
    }
}

function addPicture() {
    let dataForm = new FormData(form);

    console.log(dataForm);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type","multipart/form-data")
    // myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-AUTH-TOKEN", getToken());

    // let raw = JSON.stringify({
    //     "Title": dataForm.get("title"),
    //     "Slug": dataForm.get("img").name,
    //     "Restaurant": 8,
    // });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    fetch(apiUrl + "picture", requestOptions)
        .then(response => {
            if (response.ok) {
                getGalerie();
            } else {
                console.log(response);
                alert("Une erreur s'est produite lors de l'envoi de l'image");
            }
        })
};

function getGalerie() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(apiUrl + "picture", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Erreur dans la récupération de la galerie");
            }
        })
        .then(result => {
            galerie = result;
            displayGalerie();
        })
        .catch(error => console.log('error', error))
};

function displayGalerie() {
    content.innerHTML = "";

    for (let image of galerie) {
        content.innerHTML += `
            <div class="p-3">            
                <div class="image-card text-white">
                    <img src="../images/${image.slug}" class="rounded w-100">
                        <p class="titre-image">${image.title}</p>
                        <div class="action-image-buttons" data-show="admin">
                            <button class="btn btn-outline-light" type="button" data-bs-toggle="modal"
                                data-bs-target="#EditionPhotoModal" data-id=${image.id} onclick="findSelectedPicture(${image.id})"><i class="bi bi-pencil-square"></i></button>
                            <button class="btn btn-outline-light" type="button" data-bs-toggle="modal"
                                data-bs-target="#DeletePhotoModal" data-id=${image.id} onclick="findSelectedPicture(${image.id})"><i class="bi bi-trash"></i></button>
                        </div>
                </div>
            </div>
`
    }
    showAndHideElementsForRoles();
    // hideLoader();
}

function editPicture() {

    let dataForm = new FormData(formEdit);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-AUTH-TOKEN", getToken());

    let raw = JSON.stringify({
        "Title": dataForm.get("title"),
        "Slug": dataForm.get('img').name,
        "id": selectedPicture.id,
    });

    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
    };

    fetch(apiUrl + "picture/" + selectedPicture.id, requestOptions)
        .then(response => {
            if (response.ok) {
                getGalerie();
            } else {
                alert("Une erreur est survenue lors de l'édition de l'image");
            }
        });
}

function deletePicture() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-AUTH-TOKEN", getToken());

    let raw = JSON.stringify({
        "id": selectedPicture.id,
    });

    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
    };

    fetch(apiUrl + "picture/" + selectedPicture.id, requestOptions)
        .then(response => {
            if (response.ok) {
                getGalerie();
            } else {
                alert("Erreur lors de la suppression de l'élément");
            }
        });
}

function findSelectedPicture(id) {
    selectedPicture = galerie.find((picture) => picture.id == id)
}

showAndHideElementsForRoles();
getGalerie();