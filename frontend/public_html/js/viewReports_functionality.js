const mainAircraftList = [];
const mainExerciseList = [];

function main() {
  buildAircraftList();
  buildExerciseList();
  buildExerciseMenu();
  registerHandlers();
}

function registerHandlers() {
  document.getElementById("LogoutButton").addEventListener("click", logout);
  document
    .getElementById("genReportButton")
    .addEventListener("click", generateReport);
}

function generateReport() {
  // TODO: Use this dummy button to test autofilling the fields based on the
  // selected menu choice now that the data is loaded into objects. Check value
  // property of exerciseMenu
  console.log("Gen report clicked");
  console.log(mainAircraftList);
  console.log(mainExerciseList);
}

function buildExerciseMenu() {
  const dropdownMenu = document.getElementById("exerciseMenu");
  var index = 0;
  for (const exercise of mainExerciseList) {
    var menuItem = document.createElement("option");
    menuItem.innerText = exercise.exercise_name;
    menuItem.value = "" + index;
    dropdownMenu.appendChild(menuItem);
    index++;
  }
}

function buildExerciseList() {
  /* Make fetch call to actually update buildExerciseList
  fetch("http://127.0.0.1:5000/SOME_EXERCISE_ENDPOINT", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      res.json().then((text) => {
        console.log(text);
      });
    })
    .catch((error) => {
      alert(error.message);
    });*/

  mainExerciseList.push({
    id: "1",
    exercise_name: "train",
    start_date: "2023-12-14",
    end_date: "2023-12-29",
    location: "Singapore",
    status: "open",
  });
  mainExerciseList.push({
    id: "2",
    exercise_name: "fly planes",
    start_date: "2023-08-20",
    end_date: "2023-09-04",
    location: "Iran",
    status: "closed",
  });
}

function buildAircraftList() {
  /* Make fetch call to actually update mainAircraftList
  fetch("http://127.0.0.1:5000/SOME_AIRCRAFT_ENDPOINT", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      res.json().then((text) => {
        console.log(text);
      });
    })
    .catch((error) => {
      alert(error.message);
    });*/

  mainAircraftList.push({
    id: "1",
    fiscal_year: "2023",
    airframe: "F-22",
    "1acft": "50",
    "2acft": "25",
    "3acft": "20",
    "4acft": "N/A",
    "5acft": "1",
    "6acft": "N/A",
  });
  mainAircraftList.push({
    id: "2",
    fiscal_year: "2023",
    airframe: "C-5",
    "1acft": "5",
    "2acft": "25",
    "3acft": "10",
    "4acft": "50",
    "5acft": "N/A",
    "6acft": "N/A",
    "16acft": "100",
  });
}

function logout() {
  console.log("Logging user out...");
  document.cookie = "";
  window.location.href = "http://127.0.0.1:3000/index.html";
}

document.addEventListener("DOMContentLoaded", main);
