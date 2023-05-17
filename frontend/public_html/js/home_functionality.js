// When the content of the page is loaded, add functionality to all
// necessary items
document.addEventListener("DOMContentLoaded", registerHandlers);

/*
 * Adds event listeners to various HMTL elements using helper functions
 */
function registerHandlers() {
  document.getElementById("LogoutButton").addEventListener("click", logout);
  document
    .getElementById("exerciseContainer")
    .addEventListener("click", viewEx);
}

/*
 * Logs the user out by clearing the cookies which include the
 * the currently logged in user's username and access status. Once
 * the cookies are reset, redirect the user back to the login page
 */
function logout() {
  console.log("Logging user out...");
  document.cookie = "";
  window.location.href = "http://127.0.0.1:3000/index.html";
}

function viewEx() {
  window.location.href = "http://127.0.0.1:3000/viewEx.html";
  return;
}

function viewReports() {
  window.location.href = "http://127.0.0.1:3000/reports.html";
}

function changeStatus() {
  const user = getCookie("username");
  if (canUserAccess(user)) {
    //TODO: switch status to opposite of what it currently is.
  }
}

function newACT() {
  const user = getCookie("username");
  if (canUserAccess(user)) {
    window.location.href = "http://127.0.0.1:3000/ACT.html";
  }
}

function canUserAccess(user) {
  if (user == "PACAF") return true;
  else {
    console.log("You do not have access to this feature");
    return false;
  }
}

function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split("; ");
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}
