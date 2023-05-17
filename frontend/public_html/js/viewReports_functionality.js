function registerHandlers() {
  //document.getElementById("backButton").addEventListener("click", goBack);
  document.getElementById("LogoutButton").addEventListener("click", logout);
}

function logout() {
  console.log("Logging user out...");
  document.cookie = "";
  window.location.href = "http://127.0.0.1:3000/index.html";
}

function goBack() {
  console.log("all is good");
  window.location.href = "http://localhost:3000/home.html";
}

document.addEventListener("DOMContentLoaded", registerHandlers);
