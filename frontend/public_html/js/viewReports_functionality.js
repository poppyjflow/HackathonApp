const mainAircraftList = [];
const mainExerciseList = [];
const perdiemTable = {};

function main() {
  buildAircraftList();
  buildExerciseList();
  registerHandlers();
  populateDate();
  buildPerdiemTable();
}

function buildPerdiemTable() {
  fetch("http://127.0.0.1:5000/perdiem", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      res.json().then((text) => {
        for (let i = 0; i < text.rows; i++) {
          var obj = text[`${i}`];
          if (perdiemTable[`${obj.country}`] == undefined) {
            if (obj.location != "[Other]") {
              perdiemTable[`${obj.country}`] = [obj.location];
            }
          } else {
            if (obj.location != "[Other]") {
              perdiemTable[`${obj.country}`].push(obj.location);
            }
          }
        }
        autofillLocation();
      });
    })
    .catch((error) => {
      alert(error.message);
    });
}

function populateDate() {
  var today = new Date();

  document.getElementById("dateValue").value =
    today.toLocaleDateString("en-CA");

  document.getElementById("unitValue").value = "1";
}

function registerHandlers() {
  document.getElementById("LogoutButton").addEventListener("click", logout);
  document
    .getElementById("genReportButton")
    .addEventListener("click", generateReport);
  document
    .getElementById("exerciseMenu")
    .addEventListener("change", autofillLocation);
  document
    .getElementById("aircraftMenu")
    .addEventListener("change", autofillAirfields);
}

function autofillAirfields() {
  console.log(mainAircraftList);
}

function autofillLocation() {
  var exerciseDropdown = document.getElementById("exerciseMenu");
  var dropdownText =
    exerciseDropdown.options[exerciseDropdown.selectedIndex].text;
  for (const key of mainExerciseList) {
    var name = key.exercise_name;
    if (name.toLowerCase() === dropdownText.toLowerCase()) {
      buildLocationMenu(key.location);
    }
  }
}

function buildAircraftMenu() {
  var frameList = [];
  for (let i = 0; i < mainAircraftList.length; i++) {
    frameList.push(mainAircraftList[i].airframe);
  }
  var aircraftMenu = document.getElementById("aircraftMenu");
  while (aircraftMenu.hasChildNodes()) {
    aircraftMenu.removeChild(aircraftMenu.lastChild);
  }
  var index = 0;
  for (const frame of frameList) {
    var menuItem = document.createElement("option");
    menuItem.innerText = frame;
    menuItem.value = "" + index;
    aircraftMenu.appendChild(menuItem);
    index++;
  }
}

function buildLocationMenu(location) {
  var locationList = [];
  if (location.length != 0 && perdiemTable.location != undefined) {
    locationList = perdiemTable.location;
  } else {
    locationList.push("YEMEN");
    locationList.push("GUATEMALA");
    locationList.push("PORTUGAL");
    locationList.push("ZAMBIA");
  }
  // Clear previous nodes
  var exerciseMenu = document.getElementById("locationMenu");
  while (exerciseMenu.hasChildNodes()) {
    exerciseMenu.removeChild(exerciseMenu.lastChild);
  }
  var index = 0;
  for (const location of locationList) {
    var menuItem = document.createElement("option");
    menuItem.innerText = location;
    menuItem.value = "" + index;
    exerciseMenu.appendChild(menuItem);
    index++;
  }
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
  fetch("http://127.0.0.1:5000/exercises", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      res.json().then((text) => {
        //console.log("Returned: " + JSON.stringify(text));
        for (let i = 0; i < text.rows; i++) {
          mainExerciseList.push(text[`${i}`]);
        }
        buildExerciseMenu();
      });
    })
    .catch((error) => {
      alert(error.message);
    });
}

function buildAircraftList() {
  // Make fetch call to actually update mainAircraftList
  fetch("http://127.0.0.1:5000/aircraft_reference", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      res.json().then((text) => {
        for (let i = 0; i < text.rows; i++) {
          mainAircraftList.push(text[`${i}`]);
        }
        buildAircraftMenu();
      });
    })
    .catch((error) => {
      alert(error.message);
    });
}

function logout() {
  console.log("Logging user out...");
  window.location.href = "http://127.0.0.1:3000/index.html";
}

document.addEventListener("DOMContentLoaded", main);
