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
  
  fetch("http://localhost:5000/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      res.json().then((text) => {
        console.log("Returned text: " + text);
      });
    })
    .catch((error) => {
      alert(error.message);
    });
  window.location.href = "http://localhost:5000/home.html";
  document.cookie = "username=" + username;
}

document.addEventListener("DOMContentLoaded", registerHandlers);
