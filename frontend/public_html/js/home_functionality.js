function main() {
  addDynamicImage();
  registerHandlers();
}

/*
 <h1>Generate Report</h1>
      <div class="imgContainer" id="reportContainer">
        <img
          class="clickableImg"
          id="reportImg"
          src="./images/generate_report.jpg"
        />
        <div class="imgOverlay" id="reportOverlay"></div>
        <div class="imgHeader" id="reportHeader">
          Create/View/Modify Reports
        </div>
      </div>
*/
function addDynamicImage() {
  console.log(document.cookie);
  //if user is general, add function to image that redirects to one screen
}

function registerHandlers() {
  document.getElementById("LogoutButton").addEventListener("click", logout);
  document
    .getElementById("exerciseContainer")
    .addEventListener("click", viewEx);
  document
    .getElementById("aircraftContainer")
    .addEventListener("click", viewACT);
}

function logout() {
  console.log("Logging user out...");
  document.cookie = "";
  window.location.href = "http://127.0.0.1:3000/index.html";
}

function viewChart(){
  window.location.href = "http://127.0.0.1:3000/exercise_charts.html";
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

function viewACT() {
  window.location.href = "http://127.0.0.1:3000/viewACTs.html";
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

document.addEventListener("DOMContentLoaded", main);
