function registerHandlers() {
  document.getElementById("LoginButton").addEventListener("click", login);
}

function login() {
  console.log("Login button pressed");
  var username = document.getElementById("UserText");
  var password = document.getElementById("PasswordText");
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
      "Access-Control-Allow-Origin": "*",
    },
    body: data,
  })
    .then((res) => {
      res.text().then((text) => {
        console.log("Returned text: " + text);
      });
    })
    .catch((error) => {
      alert(error.message);
    });
  window.location.href = "http://localhost:3000/home.html";
  //document.cookie = "username=" + username;
}

document.addEventListener("DOMContentLoaded", registerHandlers);
