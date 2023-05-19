function main() {
  addDynamicImage();
  registerHandlers();
}

async function clearCookies() {
  var res = await fetch(`http://127.0.0.1:3000/clear`).catch((error) => {
    alert(error.message);
  });
}

function addDynamicImage() {
  var userObj = JSON.parse(document.cookie.split("=")[1]);
  const isAdmin = userObj.access_level == "PACAF";
  console.log(isAdmin);
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
    container.addEventListener("click", viewChart);
  } else {
    header.innerText = "Submit Wing Request";
    image.src = "./images/wing_request.jpg";
    image.id = "wingRequestImg";
    // WOULD CHANGE COLOR HERE
    tintOverlay.classList = "imgOverlay";
    tintOverlay.id = "reportOverlay";
    textOverlay.classList = "imgHeader";
    textOverlay.id = "wingHeader";
    textOverlay.innerText = "Submit Wing Request";
    container.addEventListener("click", viewReports);
  }
  container.appendChild(image);
  container.appendChild(tintOverlay);
  container.appendChild(textOverlay);
  var contentContainer = document.getElementById("content");
  contentContainer.appendChild(document.body.appendChild(header));
  contentContainer.appendChild(document.body.appendChild(container));
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
  clearCookies();
  window.location.href = "http://127.0.0.1:3000/index.html";
}

function viewReports() {
  console.log("View reports");
  window.location.href = "http://127.0.0.1:3000/reports.html";
}

function viewChart() {
  console.log("View charts");
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

document.addEventListener("DOMContentLoaded", main);
