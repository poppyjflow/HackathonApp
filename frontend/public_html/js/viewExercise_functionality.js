const mainExerciseList = [];

// specify the data

const columnDefs = [
  { field: "exercise_name", editable: true },
  { field: "location", editable: true },
  { field: "start_date", editable: true },
  { field: "end_date", editable: true },
  { field: "status", editable: true },
];

// let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
  rowData: mainExerciseList,
};

function main() {
  buildList();
  registerHandlers();
  const gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);
  //gridOptions.api.setRowData(mainExerciseList);
}

function registerHandlers() {
  document.getElementById("addRow").addEventListener("click", rowAdd);
  //document.getElementById("saveButton"), addEventListener("click", retrieveData);
  document.getElementById("saveButton").addEventListener("click", retrieveData);
  document.getElementById("LogoutButton").addEventListener("click", logout);
}

function retrieveData() {
  // TODO: When user presses Add row, need to create blank new exercise object
  // in mainExerciseList
  console.log("Final list: " + JSON.stringify(mainExerciseList));

  /* Once final list has passed all value checks, send it back to backend to update
  // the database
  fetch("http://127.0.0.1:5000/SOME_EXERCISE_ENDPOINT", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mainExerciseList),
  })
    .then((res) => {
      res.json().then((text) => {
        console.log(text);
      });
    })
    .catch((error) => {
      alert(error.message);
    });
    */

  var nodes = [];
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

function buildList() {
  /* Make fetch call to actually update mainExerciseList
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

function logout() {
  console.log("Logging user out...");
  document.cookie = "";
  window.location.href = "http://127.0.0.1:3000/index.html";
}

function rowAdd() {
  console.log("Row being added");
  gridOptions.api.applyTransaction({ add: [{}] });
}

/*function testJson() {
  This function uses made up data and populates the table
  let myjsonobj = [
    {
      id: "2",
      exercise_name: "train",
      start_date: "2023-12-14",
      end_date: "2023-12-29",
      location: "Singapore",
      status: "tbd",
    },
    {
      id: "2",
      exercise_name: "fly planes",
      start_date: "2023-08-20",
      end_date: "2023-09-04",
      location: "Iran",
      status: "tbd",
    },
  ];
  gridOptions.api.setRowData(mainExerciseList);
}*/

document.addEventListener("DOMContentLoaded", main);
