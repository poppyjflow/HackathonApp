const mainAircraftList = [];

const columnDefs = [
  { field: "airframe", editable: true },
  { field: "acft1", editable: true },
  { field: "acft2", editable: true },
  { field: "acft3", editable: true },
  { field: "acft4", editable: true },
  { field: "acft5", editable: true },
  { field: "acft6", editable: true },
  { field: "acft7", editable: true },
  { field: "acft8", editable: true },
  { field: "acft9", editable: true },
  { field: "acft10", editable: true },
  { field: "acft11", editable: true },
  { field: "acft12", editable: true },
  { field: "acft13", editable: true },
  { field: "acft14", editable: true },
  { field: "acft15", editable: true },
  { field: "acft16", editable: true },
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
  console.log("Initializing grid w: " + JSON.stringify(mainAircraftList));
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
    mainAircraftList.push(text[`${i}`]);
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
  window.location.href = "http://127.0.0.1:3000/index.html";
}

function wipeoutGrid() {
  gridOptions.api.setRowData([]);
  gridOptions.api.setRowData(mainAircraftList);
}

function rowAdd() {
  console.log("Row being added");
  mainAircraftList.push({
    acft1: null,
    acft2: null,
    acft3: null,
    acft4: null,
    acft5: null,
    acft6: null,
    acft7: null,
    acft8: null,
    acft9: null,
    acft10: null,
    acft11: null,
    acft12: null,
    acft13: null,
    acft14: null,
    acft15: null,
    acft16: null,
    airframe: null,
    year: null,
  });
  wipeoutGrid();
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
