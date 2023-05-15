function registerHandlers() {
  document.getElementById("LoginButton").addEventListener("click", login());
}

function login() {
  var username = document.getElementById("UserText");
  var password = document.getElementById("PasswordText");
  //TODO: confirm user and password match.
  window.location.href("http://localhost:3000/home.html");
  document.cookie = "username=" + username;
}
