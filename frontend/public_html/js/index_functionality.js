function registerHandlers() {
  document.getElementById("LoginButton").addEventListener("click", login);
}

function login() {
  var username = document.getElementById("UserText");
  var password = document.getElementById("PasswordText");
  if (username.value === "" || password.value === "") {
    alert("Please enter a valid username or password");
    return;
  }
  var data = {
    username: username,
    password: password,
  };
  //TODO: Hash password
  fetch("http://127.0.0.1:5000/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      res.json().then((text) => {
        console.log(text);
        if (text.response === "success") {
          document.cookie += "username=" + text.username + ";";
          document.cookie += "access=" + text.access + ";";
          window.location.href = "http://localhost:3000/home.html";
          return;
        }
        alert("Invalid username/password combination");
      });
    })
    .catch((error) => {
      alert(error.message);
    });
  //window.location.href = "http://localhost:3000/home.html";
  //document.cookie += "username=" + username;
}

document.addEventListener("DOMContentLoaded", registerHandlers);
