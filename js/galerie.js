let nomAddInput = document.getElementById('NameAddInput');
let nomEditInput = document.getElementById('NameEditInput');
let btnAdd = document.getElementById('btn-add');
let btnEdit = document.getElementById('btn-edit');

nomAddInput.addEventListener("keyup", validateAddForm);
nomEditInput.addEventListener("keyup", validateEditForm);

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