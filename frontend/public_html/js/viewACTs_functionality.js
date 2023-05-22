const mainAircraftList = [];
var userObj = JSON.parse(document.cookie.split("=")[1]);
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
    var current = text[`${i}`];
    for (let i = 1; i < 17; i++) {
      if (current[`acft${i}`] == "null") {
        current[`acft${i}`] = "";
      }
    }
    if (current.airframe == "null") {
      current.airframe = "";
    }
    if (current.fiscal_year == "null") {
      current.fiscal_year = "";
    }
    mainAircraftList.push(text[`${i}`]);
  }
  console.log("received: " + JSON.stringify(text));
  initializeGrid();
}

function registerHandlers() {
  document.getElementById("LogoutButton").addEventListener("click", logout);
}

function retrieveData() {
  var index = 0;
  var finalList = {};
  for (const obj of mainAircraftList) {
    finalList[`${index}`] = obj;
    index++;
  }

  // Once final list has passed all value checks, send it back to backend to update
  // the database
  console.log("ABOUT TO SEND: " + JSON.stringify({ table: finalList }));
  fetch("http://127.0.0.1:5000/aircraft_reference", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ table: finalList }),
  })
    .then((res) => {
      res.json().then((text) => {
        console.log(text);
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

function wipeoutGrid() {
  gridOptions.api.setRowData([]);
  gridOptions.api.setRowData(mainAircraftList);
}

function rowAdd() {
  mainAircraftList.push({
    acft1: "",
    acft2: "",
    acft3: "",
    acft4: "",
    acft5: "",
    acft6: "",
    acft7: "",
    acft8: "",
    acft9: "",
    acft10: "",
    acft11: "",
    acft12: "",
    acft13: "",
    acft14: "",
    acft15: "",
    acft16: "",
    airframe: "",
    fiscal_year: "",
  });
  wipeoutGrid();
}

document.addEventListener("DOMContentLoaded", main);
