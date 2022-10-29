const form = document.getElementById("form");
const inputFile = document.getElementById("file");

const formData = new FormData();

const handleSubmit = (event) => {
    event.preventDefault();

    var size = document.getElementById("file").files[0].size;
    console.log(size);
    if (size > 2 * 1024 * 1024 * 1024) { // 2GB
        if(!alert("Error: file is too big")){window.location.reload();}
    }

    const button = document.getElementById("submit-btn");
    button.disabled = true;
    button.innerHTML = "Uploading...";

    for (const file of inputFile.files) {
        formData.append("file", file);
    }

    let userName = document.getElementById("user_name_input").value;
    let userPass = document.getElementById("user_pw_input").value;

    let url = "http://127.0.0.1:8080/upload?user_name=" + userName + "&user_pw=" + userPass;

    fetch(url, {
        method: "post",
        body: formData,
    }).then((response) => {
        if (response.status == 200) {
            response.json().then((message) => {
                if(!alert("Upload succesful!\nURL: " + message.url)){window.location.reload();}  // Reloading the window is a hacky workaround for some bug
                                                                                                 // that i'm not prepared to fight with
            });
        } else {
            response.json().then((message) => {
                if(!alert("Error: " + message.message)){window.location.reload();}
            });
        }
    }).catch((error) => ("Something went wrong!", error));
};

form.addEventListener("submit", handleSubmit);