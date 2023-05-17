function registerHandlers() {
  document.getElementById("LogoutButton").addEventListener("click", logout);
  /*document.getElementById("NewExerciseButton").addEventListener("click", newEx);
  document
    .getElementById("StatusButton")
    .addEventListener("click", changeStatus);
  document.getElementById("NewACTButton").addEventListener("click", newACT);*/
  document.getElementById("exerciseContainer").addEventListener("click", viewEx);
  document.getElementById("aircraftContainer").addEventListener("click", viewACT);
  document.getElementById("reportContainer").addEventListener("click", viewReports);
}

function logout() {
  console.log("Logging user out...");
  window.location.href = "http://127.0.0.1:3000/index.html";
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

function viewEx() {
  window.location.href = "http://127.0.0.1:3000/viewEx.html";
}

function viewACT(){
  window.location.href = "http://127.0.0.1:3000/viewACTs.html";
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

document.addEventListener("DOMContentLoaded", registerHandlers);
