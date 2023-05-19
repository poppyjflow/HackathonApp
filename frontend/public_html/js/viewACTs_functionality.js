const mainAircraftList = [];
var userObj = JSON.parse(document.cookie.split("=")[1]);
console.log(userObj);
const isAdmin = userObj.access_level == "PACAF";

const columnDefs = [
  { field: "airframe", editable: isAdmin },
  { field: "acft1", editable: isAdmin },
  { field: "acft2", editable: isAdmin },
  { field: "acft3", editable: isAdmin },
  { field: "acft4", editable: isAdmin },
  { field: "acft5", editable: isAdmin },
  { field: "acft6", editable: isAdmin },
  { field: "acft7", editable: isAdmin },
  { field: "acft8", editable: isAdmin },
  { field: "acft9", editable: isAdmin },
  { field: "acft10", editable: isAdmin },
  { field: "acft11", editable: isAdmin },
  { field: "acft12", editable: isAdmin },
  { field: "acft13", editable: isAdmin },
  { field: "acft14", editable: isAdmin },
  { field: "acft15", editable: isAdmin },
  { field: "acft16", editable: isAdmin },
];
// specify the data

// let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
  rowData: mainAircraftList,
};

function main() {
  buildList();
  addButtons();
  registerHandlers();
}

function addButtons() {
  var userObj = JSON.parse(document.cookie.split("=")[1]);
  console.log(userObj);
  if (userObj.access_level == "PACAF") {
    var buttonContainer = document.createElement("div");
    var addRowButton = document.createElement("button");
    addRowButton.innerText = "Add Exercise";
    addRowButton.id = "addRow";
    addRowButton.classList = "generalButton";
    var saveButton = document.createElement("button");
    saveButton.innerText = "Save Changes";
    saveButton.id = "saveButton";
    saveButton.classList = "generalButton";
    buttonContainer.appendChild(addRowButton);
    buttonContainer.appendChild(saveButton);
    var contentDiv = document.getElementById("content");
    contentDiv.appendChild(buttonContainer);
    document.getElementById("addRow").addEventListener("click", rowAdd);
    document
      .getElementById("saveButton")
      .addEventListener("click", retrieveData);
  }
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
