//Global variables to be used throughout the page
var isAdmin = false;

// When the content of the page is loaded, add functionality to all
// necessary items
document.addEventListener("DOMContentLoaded", registerHandlers);

/*
 * Adds event listeners to various HMTL elements using helper functions
 */
function registerHandlers() {
  document.getElementById("LoginButton").addEventListener("click", login);
  document
    .getElementById("createAccountText")
    .addEventListener("click", switchToCreateScreen);
  document
    .getElementById("signInText")
    .addEventListener("click", switchToSignInScreen);
  document
    .getElementById("CreateAccountButton")
    .addEventListener("click", createAccount);

  // Whenever Admin toggle button is pressed, change isAdmin value
  document.getElementById("adminToggle").addEventListener("click", () => {
    isAdmin = !isAdmin;
  });
}

/*
 * Called when the create account button is pressed. Grabs the text input values
 * and throws error if they're empty. Otherwise, salt and hash the passord, grab
 * the admin boolena value and store the information in the database using fetch
 * call. If response is successful, add username and access status to cookies
 * to be used throughout all pages on the website and change the page to
 * home.html
 */
function createAccount() {
  var username = document.getElementById("CreateUserText");
  var password = document.getElementById("CreatePasswordText");
  if (username.value === "" || password.value === "") {
    alert("Please enter a valid username or password");
    return;
  }

  var hashedPassword = hashPassword(password);
  var createUserBody = {
    username: username,
    password: hashedPassword,
    access: isAdmin ? "Admin" : "User",
  };
  fetch("http://127.0.0.1:5000/createuser", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createUserBody),
  })
    .then((res) => {
      res.json().then((text) => {
        console.log(text);
        //if (text.response === "success") {
        document.cookie += "username=" + text.username + ";";
        document.cookie += "access=" + text.access + ";";
        window.location.href = "http://localhost:3000/home.html";
        return;
        //}
        alert("Invalid username/password combination");
      });
    })
    .catch((error) => {
      alert(error.message);
    });
}

function hashPassword(password) {
  //TODO: Hash password
  return password;
}

/*
 * Manually changes the zIndex of the Login window to be in front of
 * the create account window by giving the login window a higher zIndex
 * vaue
 */
function switchToSignInScreen() {
  document.getElementById("createAccountContainer").style.zIndex = -1;
  document.getElementById("loginContainer").style.zIndex = 1;
}

/*
 * Manually changes the zIndex of the Creat Account window to be in front of
 * the login window by giving the Create Account window a higher zIndex
 * vaue
 */
function switchToCreateScreen() {
  document.getElementById("createAccountContainer").style.zIndex = 1;
  document.getElementById("loginContainer").style.zIndex = -1;
}

/*
 * Called when the login button is pressed. Grabs the text input values
 * and throws error if they're empty. Otherwise, salt and hash the passord
 * and attempt to login the user by validating it with database using fetch
 * call. If response is successful, add username and access status to cookies
 * to be used throughout all pages on the website and change the page to
 * home.html
 */
function login() {
  var username = document.getElementById("UserText");
  var password = document.getElementById("PasswordText");
  if (username.value === "" || password.value === "") {
    alert("Please enter a valid username or password");
    return;
  }

  var hashedPassword = hashPassword(password);
  var loginBody = {
    username: username,
    password: hashedPassword,
  };
  fetch("http://127.0.0.1:5000/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginBody),
  })
    .then((res) => {
      res.json().then((text) => {
        console.log(text);
        //if (text.response === "success") {
        document.cookie += "username=" + text.username + ";";
        document.cookie += "access=" + text.access + ";";
        window.location.href = "http://localhost:3000/home.html";
        return;
        //}
        alert("Invalid username/password combination");
      });
    })
    .catch((error) => {
      alert(error.message);
    });
}
