var numCol = 4;
function registerHandlers() {
  document.getElementById("addRow").addEventListener("click", rowAdd);
  document.getElementById("saveButton"), addEventListener("click", retriveData);
  document.getElementById("LogoutButton").addEventListener("click", logout);
  document
    .getElementById("createTableButton")
    .addEventListener("click", createTable);
  document.getElementById("addCol").addEventListener("click", colAdd);
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

function colAdd(){
  console.log("something is happening");
  const newColDef = columnDefs;
  numCol += 1;
  let newField = numCol.toString() + "(# of personnel needed)";
  newColDef.push({field: newField, editable: true});
  gridOptions.api.setColumnDefs(newColDef);
}

const columnDefs = [
  { field: "Aircraft Name", editable: true},
  { field: "1(# of personnel needed)", editable: true },
  { field: "2(# of personnel needed)", editable: true },
  { field: "3(# of personnel needed)", editable: true },
  { field: "4(# of personnel needed)", editable: true }
];

// specify the data
const rowData = [{}, {}];

// let the grid know which columns and what data to use
const gridOptions = {
  defaultColDef: {
    resizable: true,
    initialWidth: 200,
    wrapHeaderText: true,
    autoHeaderHeight: true,
  },
  columnDefs: columnDefs,
  rowData: rowData,

};
document.addEventListener("DOMContentLoaded", () => {
  const gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);
});

document.addEventListener("DOMContentLoaded", registerHandlers);
