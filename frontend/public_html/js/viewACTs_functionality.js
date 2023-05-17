var numCol = 2;
function registerHandlers() {
  document.getElementById("addRow").addEventListener("click", rowAdd);
  document.getElementById("saveButton"), addEventListener("click", retriveData);
  document.getElementById("LogoutButton").addEventListener("click", logout);
  document
    .getElementById("createTableButton")
    .addEventListener("click", createTable);
  document.getElementById("addCol").addEventListener("click",colAdd);
}

function retriveData() {
  gridOptions.api.forEachNode((rowNode, index) => {
    console.log("node " + JSON.stringify(rowNode.data) + " is in the grid");
  });
}

function createTable() {
  console.log("Should create table");
  gridOptions.api.setRowData(rowData);
  gridOptions.api.setColumnDefs([
    { field: "airframe", editable: true },
    { field: "1acft", editable: true },
    { field: "2acft", editable: true },
  ]);
  numCol = 2;
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

function colAdd(){
  const newColDef = columnDefs;
  numCol+=1;
  let fieldData = numCol.toString()+"acft";
  newColDef.push( {field: fieldData, editable: true });
  gridOptions.api.setColumnDefs(newColDef);
}

const columnDefs = [
  { field: "airframe", editable: true },
  { field: "1acft", editable: true },
  { field: "2acft", editable: true },
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
