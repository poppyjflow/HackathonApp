function registerHandlers() {
  document.getElementById("addRow").addEventListener("click", rowAdd);
  document.getElementById("saveButton"), addEventListener("click", retriveData);
  document.getElementById("LogoutButton").addEventListener("click", logout);
  document
    .getElementById("createTableButton")
    .addEventListener("click", createTable);
}

function retriveData() {
  gridOptions.api.forEachNode((rowNode, index) => {
    console.log("node " + JSON.stringify(rowNode.data) + " is in the grid");
  });
}

function createTable() {
  console.log("Should create table");
}

function logout() {
  console.log("Logging user out...");
  document.cookie = "";
  window.location.href = "http://127.0.0.1:3000/index.html";
}

function newACT() {
  console.log("all is good");
  window.location.href = "http://localhost:3000/newACT.html";
}
function goBack() {
  console.log("all is good");
  window.location.href = "http://localhost:3000/home.html";
}

function rowAdd() {
  console.log("something is happening");
  gridOptions.api.applyTransaction({ add: [{}] });
}

const columnDefs = [
  { field: "Aircraft Type", editable: true },
  { field: "Aircraft Number", editable: true },
  { field: "# of personnel needed", editable: true },
];

// specify the data
const rowData = [{}, {}];

// let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
};
document.addEventListener("DOMContentLoaded", () => {
  const gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);
});

document.addEventListener("DOMContentLoaded", registerHandlers);
