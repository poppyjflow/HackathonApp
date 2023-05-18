const mainAircraftList = [];

const columnDefs = [
  { field: "airframe", editable: true },
  { field: "acft", editable: true },
  { field: "acft", editable: true },
  { field: "acft", editable: true },
  { field: "acft", editable: true },
  { field: "acft", editable: true },
  { field: "acft", editable: true },
  { field: "acft", editable: true },
  { field: "acft", editable: true },
  { field: "acft", editable: true },
  { field: "acft", editable: true },
  { field: "acft", editable: true },
  { field: "acft", editable: true },
  { field: "acft", editable: true },
  { field: "acft", editable: true },
  { field: "acft", editable: true },
  { field: "acft", editable: true },
];

// specify the data

// let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
  rowData: mainAircraftList,
};

function main() {
  buildList();
  registerHandlers();
}

function initializeGrid() {
  console.log("Initializing grid w: " + JSON.stringify(mainExerciseList));
  const gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);
}

async function buildList() {
  // Make fetch call to actually update mainAircraftList
  var res = await fetch("http://127.0.0.1:5000/aircraft_reference", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    alert(error.message);
  });
  var text = await res.json().catch((error) => {
    alert(error.message);
  });
  for (let i = 0; i < text.rows; i++) {
    mainExerciseList.push(text[`${i}`]);
  }
  initializeGrid();
  console.log(text);

  /*mainAircraftList.push({
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
  });*/
}

function registerHandlers() {
  document.getElementById("addRow").addEventListener("click", rowAdd);
  document.getElementById("saveButton").addEventListener("click", retrieveData);
  document.getElementById("LogoutButton").addEventListener("click", logout);
}

function retrieveData() {
  // TODO: When user presses Add row, need to create blank new exercise object
  // in mainAircraftList
  console.log("Final list: " + JSON.stringify(mainAircraftList));

  // Once final list has passed all value checks, send it back to backend to update
  // the database
  fetch("http://127.0.0.1:5000/aircraft_reference", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ table: mainAircraftList }),
  })
    .then((res) => {
      res.json().then((text) => {
        console.log(text);
      });
    })
    .catch((error) => {
      alert(error.message);
    });

  /*var nodes = [];
  gridOptions.api.forEachNode((rowNode, index) => {
    console.log("node " + JSON.stringify(rowNode.data) + " is in the grid");
    nodes.push(JSON.stringify(rowNode.data));
    // do something with this data. Need to send it back to db.
  });*/
}

function logout() {
  console.log("Logging user out...");
  document.cookie = "";
  window.location.href = "http://127.0.0.1:3000/index.html";
}

function rowAdd() {
  console.log("something is happening");
  gridOptions.api.applyTransaction({ add: [{}] });
}

/*function testJson() {
  //This function uses made up data and populates the table
  let myjsonobj = [
    {
      id: "2",
      fiscal_year: "2023",
      airframe: "F-22",
      "1acft": "50",
      "2acft": "25",
      "3acft": "20",
      "4acft": "N/A",
      "5acft": "1",
      "6acft": "N/A",
    },
    {
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
    },
  ];
  console.log(myjsonobj);
  gridOptions.api.setRowData(myjsonobj);
}*/

document.addEventListener("DOMContentLoaded", main);
