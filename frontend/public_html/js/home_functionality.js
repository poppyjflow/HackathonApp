function main() {
  addDynamicImage();
  registerHandlers();
}

/*
 <h1>Generate Report</h1>
      <div class="imgContainer">
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
  
  const isAdmin = true;
  // if user is admin, add Generate Report screen to see stats
  // if user is general user, add Submit Wing Request instead
  var header = document.createElement("h1");
  var container = document.createElement("div");
  var image = document.createElement("img");
  var tintOverlay = document.createElement("div");
  var textOverlay = document.createElement("div");
  image.classList = "clickableImg";
  container.classList = "imgContainer";
  if (isAdmin) {
    header.innerText = "Generate Report";
    image.src = "./images/generate_report.jpg";
    image.id = "reportImg";
    tintOverlay.classList = "imgOverlay";
    tintOverlay.id = "reportOverlay";
    textOverlay.classList = "imgHeader";
    textOverlay.id = "reportHeader";
    textOverlay.innerText = "View Costs for Exercises";
    container.addEventListener("click", viewReports);
  } else {
    header.innerText = "Submit Wing Request";
    image.src = "./images/wing_request.jpg";
    image.id = "wingRequestImg";
    // WOULD CHANGE COLOR HERE
    tintOverlay.classList = "imgOverlay";
    tintOverlay.id = "reportOverlay";
    textOverlay.classList = "imgHeader";
    textOverlay.id = "reportHeader";
    textOverlay.innerText = "Submit Wing Request";
    container.addEventListener("click", viewWingRequest);
  }
  container.appendChild(image);
  container.appendChild(tintOverlay);
  container.appendChild(textOverlay);
  var contentContainer = document.getElementById("content");
  contentContainer.appendChild(document.body.appendChild(header));
  contentContainer.appendChild(document.body.appendChild(container));
  console.log(document);
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
  window.location.href = "http://127.0.0.1:3000/index.html";
}

function viewWingRequest() {
  window.location.href = "http://127.0.0.1:3000/reports.html";
}

function viewReports() {
  window.location.href = "http://127.0.0.1:3000/reports.html";
}

function viewChart() {
  window.location.href = "http://127.0.0.1:3000/exercise_charts.html";
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

/*function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split("; ");
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}*/

document.addEventListener("DOMContentLoaded", main);
