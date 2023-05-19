const mainExerciseList = [];

// specify the data

var userObj = JSON.parse(document.cookie.split("=")[1]);
const isAdmin = userObj.access_level == "PACAF";
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

function addButtons() {
  var userObj = JSON.parse(document.cookie.split("=")[1]);
  console.log("User: " + JSON.stringify(userObj));
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

document.addEventListener("DOMContentLoaded", main);
