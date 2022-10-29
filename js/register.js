const form = document.getElementById("form");
const inputFile = document.getElementById("file");

const formData = new FormData();

const handleSubmit = (event) => {
    event.preventDefault();

    let userName = document.getElementById("user_name_input").value;

    if (document.getElementById("user_pw_input").value != document.getElementById("user_confirm_input").value) {
        if(!alert("Error: passwords do not match")){window.location.reload();}
    }

    let userPass = document.getElementById("user_pw_input").value;
    let regToken = document.getElementById("reg_token_input").value;

    let url = "http://127.0.0.1:8080/register";

    var urlencoded = new URLSearchParams();
    urlencoded.append("reg_token", regToken);
    urlencoded.append("user_pw", userPass);
    urlencoded.append("user_name", userName);
    urlencoded.append("user_nick", userName);    


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch(url, requestOptions).then((response) => {
        response.json().then((message) => {
            console.log(message);
            if (message.code == 500) {
                if(!alert("Error: " + message.error)){window.location.reload();}
            } else {
                if(!alert("Success: " + message.Success)){window.location.reload();}
            }
        });
    }).catch((error) => ("Something went wrong!", error));
};

form.addEventListener("submit", handleSubmit);