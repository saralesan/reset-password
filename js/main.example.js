// Getting CODE param
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const code = urlParams.get('code');

document.getElementById("password-form").addEventListener('submit', submintForm, false);

function checkPassword(password) {
    var pwRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!password.match(pwRegExp)) {
        return false;
    } else {
        return true;
    }
}

function submintForm(event) {
    event.preventDefault();
    
    var password1 = document.getElementById("password-1").value;
    var password2 = document.getElementById("password-2").value;

    document.getElementById("password-1").classList.remove("is-invalid");
    document.getElementById("password-2").classList.remove("is-invalid");
    
    if (checkPassword(password1)) {
        if (password1 == password2) {
            // console.log("equal passwords");
        } else {
            document.getElementById("password-2").classList.add("is-invalid");
            return false;
        }
    } else {
        document.getElementById("password-1").classList.add("is-invalid");
        return false;
    }

    var params = {
        "code": code,
        "password": password1,
        "passwordConfirmation": password2
    };
    params = JSON.stringify(params);

    // Request POST
    var request = new XMLHttpRequest();
    var url = 'example_service_URL'; // Change service URL

    request.open('POST', url, false);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(params);

    // Request response
    dump(request.responseText);
    if (request.status == 200) {
        document.getElementById("password-form").style.display = "none";
        document.getElementById("ty-wrap").style.display = "block";
    } else {
        console.log("400");
    }
}
