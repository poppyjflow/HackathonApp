const mainExerciseList = [];

// specify the data

var userObj = JSON.parse(document.cookie.split("=")[1]);
console.log(userObj);
const isAdmin = userObj.access_level == "PACAF";
console.log(isAdmin);
const columnDefs = [
  { field: "exercise_name", editable: isAdmin },
  { field: "location", editable: isAdmin },
  { field: "start_date", editable: isAdmin },
  { field: "end_date", editable: isAdmin },
  { field: "status", editable: isAdmin },
];

const gridOptions = {
  columnDefs: columnDefs,
  rowData: mainExerciseList,
};

// let the grid know which columns and what data to use

function main() {
  buildList();
  registerHandlers();
  addButtons();
  //gridOptions.api.setRowData(mainExerciseList);
}

/*
* <div>
        <button id="addRow" class="generalButton">Add Exercise</button>
        <button id="saveButton" class="generalButton">Save Changes</button>
      </div>
*/
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

function registerHandlers() {
  document.getElementById("LogoutButton").addEventListener("click", logout);
}

function initializeGrid() {
  //console.log("Initializing grid w: " + JSON.stringify(mainExerciseList));
  const gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);
}

function buildList() {
  // Make fetch call to actually update mainExerciseList
  fetch("http://127.0.0.1:5000/exercises", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      res.json().then((text) => {
        for (let i = 0; i < text.rows; i++) {
          mainExerciseList.push(text[`${i}`]);
        }
        initializeGrid();
      });
    })
    .catch((error) => {
      alert(error.message);
    });
}

function retrieveData() {
  var pushableExercises = { table: {} };
  for (let i = 0; i < mainExerciseList.length; i++) {
    pushableExercises.table[`${i}`] = mainExerciseList[i];
  }
  console.log("Final list: " + JSON.stringify(pushableExercises));

  fetch("http://127.0.0.1:5000/exercises", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pushableExercises),
  })
    .then((res) => {
      res.json().then((text) => {
        console.log(text);
      });
    })
    .catch((error) => {
      alert(error.message);
    });
  // Allow wing
  /*var nodes = [];
  gridOptions.api.forEachNode((rowNode, index) => {
    console.log("node " + JSON.stringify(rowNode.data) + " is in the grid");
    nodes.push(JSON.stringify(rowNode.data));
    // convert this array to json and send it to db.
  });*/
  // I tried to get a popup to save the table and enter a name for it, but i was having
  // trouble. I will come back to this - Henry
  // Code that sucks below
  //let name = prompt("Enter a name for this table", "Enter Name");
  //var dropDown = document.getElementById("tableDropdown")
  //var newTable = document.createElement(name);
  //newTable.text = name;
  //dropDown.add(newTable);
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
  gridOptions.api.setRowData(mainExerciseList);
}

function rowAdd() {
  console.log("Row being added");
  mainExerciseList.push({
    exercise_name: "",
    start_date: "",
    end_date: "",
    location: "",
    status: "",
  });
  wipeoutGrid();
  //gridOptions.api.applyTransaction({ add: [{}] });
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
