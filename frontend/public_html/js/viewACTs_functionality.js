
function registerHandlers() {
  document.getElementById("addRow").addEventListener("click", rowAdd);
  document.getElementById("saveButton"), addEventListener("click", retriveData);
  document.getElementById("LogoutButton").addEventListener("click", logout);
  document
    .getElementById("createTableButton")
    .addEventListener("click", createTable);
  document.getElementById("populateButton").addEventListener("click",testJson);
}

function retriveData() {
  var nodes = []
  gridOptions.api.forEachNode((rowNode, index) => {
    console.log("node " + JSON.stringify(rowNode.data) + " is in the grid");
    nodes.push(JSON.stringify(rowNode.data));
    // do something with this data. Need to send it back to db.
  });
}

function createTable() {
  console.log("Should create table");
  gridOptions.api.setRowData(rowData);
  gridOptions.api.setColumnDefs(columnDefs);
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

function testJson(){
  //This function uses made up data and populates the table
  let myjsonobj = [{
    "id": "2",
    "fiscal_year": "2023",
    "airframe": "F-22",
    "1acft": "50",
    "2acft": "25",
    "3acft": "20",
    "4acft": "N/A",
    "5acft": "1",
    "6acft": "N/A"
},{
  "id": "2",
  "fiscal_year": "2023",
  "airframe": "C-5",
  "1acft": "5",
  "2acft": "25",
  "3acft": "10",
  "4acft": "50",
  "5acft": "N/A",
  "6acft": "N/A",
  "16acft": "100"
}

];
console.log(myjsonobj);
gridOptions.api.setRowData(myjsonobj);
}


const columnDefs = [
  { field: "airframe", editable: true },
  { field: "1acft", editable: true },
  { field: "2acft", editable: true },
  { field: "3acft", editable: true },
  { field: "4acft", editable: true },
  { field: "5acft", editable: true },
  { field: "6acft", editable: true },
  { field: "7acft", editable: true },
  { field: "8acft", editable: true },
  { field: "9acft", editable: true },
  { field: "10acft", editable: true },
  { field: "11acft", editable: true },
  { field: "12acft", editable: true },
  { field: "13acft", editable: true },
  { field: "14acft", editable: true },
  { field: "15acft", editable: true },
  { field: "16acft", editable: true }
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
