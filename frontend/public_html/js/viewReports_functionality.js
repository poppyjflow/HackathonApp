const mainAircraftList = [];
const mainExerciseList = [];
const perdiemTable = {};
var lastlyChosenAircraft;
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
    .addEventListener("change", updateLastlyChosen);

  document
    .getElementById("aircraftinput")
    .addEventListener("change", autofillAirfields);
}

function autofillAirfields() {
  var aircraftCount = document.getElementById("aircraftinput").value;
  aircraftCount = "acft" + aircraftCount;
  var personnelNum = lastlyChosenAircraft[`${aircraftCount}`];
  if (personnelNum != undefined) {
    document.getElementById("personnelinput").value = personnelNum;
  }
}

function updateLastlyChosen() {
  var aircraftDropdown = document.getElementById("aircraftMenu");
  var dropdownText =
    aircraftDropdown.options[aircraftDropdown.selectedIndex].text;
  for (const key of mainAircraftList) {
    var name = key.airframe;
    if (name.toLowerCase() === dropdownText.toLowerCase()) {
      lastlyChosenAircraft = key;
    }
  }
  autofillAirfields();
}

function autofillLocation() {
  var exerciseDropdown = document.getElementById("exerciseMenu");
  var dropdownText =
    exerciseDropdown.options[exerciseDropdown.selectedIndex].text;
  for (const key of mainExerciseList) {
    var name = key.exercise_name;
    if (name.toLowerCase() === dropdownText.toLowerCase()) {
      updateNumDaysField(key);
      buildLocationMenu(key.location);
    }
  }
}

function updateNumDaysField(key) {
  var endDate = new Date(key.end_date);
  var startDate = new Date(key.start_date);
  const oneDay = 24 * 60 * 60 * 1000;
  var numDays = (endDate - startDate) / oneDay;
  document.getElementById("dayNumber").value = numDays;
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
  for (const key of mainAircraftList) {
    var name = key.airframe;
    if (name.toLowerCase() === frameList[0].toLowerCase()) {
      lastlyChosenAircraft = key;
    }
  }
  autofillAirfields();
}

function manuallyFillList(list) {
  list.push("Melbourne");
  list.push("Sydney");
  list.push("Adelaide");
  list.push("Richmond");
}

function buildLocationMenu(location) {
  location = location.toUpperCase();
  var locationList = [];
  if (location.length != 0) {
    if (perdiemTable[`${location}`] != undefined) {
      if (perdiemTable[`${location}`].length > 0) {
        locationList = perdiemTable[`${location}`];
      } else {
        manuallyFillList(locationList);
      }
    } else {
      manuallyFillList(locationList);
    }
  } else {
    manuallyFillList(locationList);
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

function initBarChart() {
  // holder data, should calculate cost for each aircraft, and
  // append the data into our json obj below.
  const data = [
    {
      lable: "Cost per day",
      value: 100,
    },
    {
      lable: "Cost per head",
      value: 100,
    },
    {
      lable: "Manpower cost",
      value: 100,
    },
    {
      lable: "Cost per aircraft",
      value: 100,
    },
  ];
  const options = {
    container: document.getElementById("myChart"),
    title: {
      text: "Cost breakdown for ",
    },
    subtitle: {
      text: "in U.S. dollars",
    },
    data: data,
    series: [
      {
        type: "column",
        xKey: "lable",
        yKey: "value",
      },
    ],
  };
  let chart = agCharts.AgChart.create(options);
}

function updateChart() {
  let acVal = document.getElementById("acftType");
  let acName = acVal.options[0];
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

async function clearCookies() {
  var res = await fetch(`http://127.0.0.1:3000/clear`).catch((error) => {
    alert(error.message);
  });
}

function logout() {
  console.log("Logging user out...");
  clearCookies();
  window.location.href = "http://127.0.0.1:3000/index.html";
}

document.addEventListener("DOMContentLoaded", main);
