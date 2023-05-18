var currentGrid;

function main() {
  const gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);
  registerHandlers();
  initializeGrid();
}

function initializeGrid() {
  console.log("Initializing Grid");
  fetch("http://127.0.0.1:5000/aicraft_reference", {
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
    });
}

function registerHandlers() {
  document.getElementById("addRow").addEventListener("click", rowAdd);
  document.getElementById("saveButton"), addEventListener("click", retriveData);
  document.getElementById("LogoutButton").addEventListener("click", logout);
  document.getElementById("createTableButton").addEventListener("click", createTable);
  document.getElementById("populateButton").addEventListener("click",testJson);
  //document.getElementById("newExButton").addEventListener("click", newEx);
  //document.getElementById("backButton").addEventListener("click", goBack);
}


function goBack() {
  console.log("all is good");
  window.location.href = "http://localhost:3000/home.html";
}

function logout() {
  console.log("Logging user out...");
  document.cookie = "";
  window.location.href = "http://127.0.0.1:3000/index.html";
}

function createTable(){
  console.log("Should create table");
  gridOptions.api.setRowData([{}, {}]);
  gridOptions.api.setColumnDefs(columnDefs);
}

function retriveData() {
  var nodes = []
  gridOptions.api.forEachNode((rowNode, index) => {
    console.log("node " + JSON.stringify(rowNode.data) + " is in the grid");
    nodes.push(JSON.stringify(rowNode.data));
    // convert this array to json and send it to db.
  });
  // I tried to get a popup to save the table and enter a name for it, but i was having
  // trouble. I will come back to this - Henry
  // Code that sucks below
  //let name = prompt("Enter a name for this table", "Enter Name");
  //var dropDown = document.getElementById("tableDropdown")
  //var newTable = document.createElement(name);
  //newTable.text = name;
  //dropDown.add(newTable);

}

function rowAdd() {
  console.log("something is happening");
  gridOptions.api.applyTransaction({ add: [{}] });
}

const columnDefs = [
  { field: "exercise_name", editable: true },
  { field: "location", editable: true }
];

function testJson(){
  //This function uses made up data and populates the table
  let myjsonobj = [{
    "id": "2",
    "exercise_name": "train",
    "start_date": "2023-12-14",
    "end_date": "2023-12-29",
    "location": "Singapore",
    "status": "tbd"
},{
  "id": "2",
  "exercise_name": "fly planes",
  "start_date": "2023-08-20",
  "end_date": "2023-09-04",
  "location": "Iran",
  "status": "tbd"
}

];
console.log(myjsonobj);
gridOptions.api.setRowData(myjsonobj);
}



// specify the data
const rowData = [{}, {}];

// let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
};

document.addEventListener("DOMContentLoaded", main);
