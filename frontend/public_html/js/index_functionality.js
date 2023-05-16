function registerHandlers() {
  document.getElementById("LoginButton").addEventListener("click", login);
}

function login() {
  var username = document.getElementById("UserText");
  var password = document.getElementById("PasswordText");
  console.log(username.value + ", " + password.value);
  if (username.value === "" || password.value === "") {
    alert("Please enter a valid username or password");
    return;
  }
  //TODO: confirm user and password match.
  var data = {
    username: username,
    password: password,
  };

  fetch("http://127.0.0.1:5000/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      res.text().then((text) => {
        console.log("Returned text: " + text);
      });
    })
    .catch((error) => {
      alert(error.message);
    });
  //window.location.href = "http://localhost:3000/home.html";
  //document.cookie = "username=" + username;
}

document.addEventListener("DOMContentLoaded", registerHandlers);
