const mainAircraftList = [];
const mainExerciseList = [];

function main() {
  buildAircraftList();
  buildExerciseList();
  buildExerciseMenu();
  registerHandlers();
  initBarChart();
}

function registerHandlers() {
  console.log("Registering handlers");
  document.getElementById("LogoutButton").addEventListener("click", logout);
  document
    .getElementById("genReportButton")
    .addEventListener("click", generateReport);
}

function initBarChart(){
  // holder data, should calculate cost for each aircraft, and
  // append the data into our json obj below.
  const data = [
    {
      lable: "Cost per day",
      value: 100
    },
    {
      lable: "Cost per head",
      value: 100
    },
    {
      lable: "Manpower cost",
      value: 100
    },
    {
      lable: "Cost per aircraft",
      value: 100
    }
  ];
  const options = {
    container: document.getElementById('myChart'),
    title: {
      text: "Cost breakdown for ",
    },
    subtitle: {
      text: 'in U.S. dollars',
    },
    data:data,
    series: [
      {
        type: 'column',
        xKey: 'lable',
        yKey: 'value',
      }
    ]
  };
  let chart = agCharts.AgChart.create(options);

}

function updateChart(){
  let acVal = document.getElementById("acftType")
  let acName = acVal.options[0]
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
    acft1: "50",
    acft2: "25",
    acft3: "20",
    acft4: "N/A",
    acft5: "1",
    acft6: "N/A",
  });
  mainAircraftList.push({
    id: "2",
    fiscal_year: "2023",
    airframe: "C-5",
    acft1: "5",
    acft2: "25",
    acft3: "10",
    acft4: "50",
    acft5: "N/A",
    acft6: "N/A",
    "16acft16": "100",
  });
}

function logout() {
  console.log("Logging user out...");
  document.cookie = "";
  window.location.href = "http://127.0.0.1:3000/index.html";
}

document.addEventListener("DOMContentLoaded", main);
