//Global variables to be used throughout the page
var isAdmin = false;

// When the content of the page is loaded, add functionality to all
// necessary items
document.addEventListener("DOMContentLoaded", main);

function main() {
  registerHandlers();
  console.log(document.cookie);
}

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
async function createAccount() {
  var username = document.getElementById("CreateUserText");
  var password = document.getElementById("CreatePasswordText");
  if (username.value === "" || password.value === "") {
    alert("Please enter a valid username or password");
    return;
  }

  var hashedPassword = await hashPassword(password.value);
  var createUserBody = {
    username: username,
    password: hashedPassword,
    access: isAdmin ? "Admin" : "User",
  };
  var res = await fetch("http://127.0.0.1:5000/createuser", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createUserBody),
  }).catch((error) => {
    alert(error.message);
  });

  var text = await res.json().catch((error) => {
    alert(error.message);
  });

  console.log(text);
  //if (text.response === "success") {
  //window.location.href = "http://localhost:3000/home.html";
  return;
  //}
  alert("Invalid username/password combination");
}

async function hashPassword(password) {
  var res = await fetch(`http://127.0.0.1:3000/hashpassword/${password}`).catch(
    (error) => {
      alert(error.message);
    }
  );
  var text = await res.json().catch((error) => {
    alert(error.message);
  });

  return text.Password;
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

async function login() {
  var username = document.getElementById("UserText");
  var password = document.getElementById("PasswordText");
  if (username.value === "" || password.value === "") {
    alert("Please enter a valid username or password");
    return;
  }
  var loginBody = {
    email_addy: username.value.toLowerCase(),
  };
  var userResult = await fetch("http://127.0.0.1:5000/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginBody),
  }).catch((error) => {
    alert(error.message);
  });
  var text = await userResult.json().catch((error) => {
    alert(error.message);
  });
  if (text.response != null) {
    alert("Username not found");
    return;
  }
  var hashBody = {
    salt: text.salt,
    password: password.value,
    hashedPassword: text.passwd,
  };
  var hashResult = await fetch("http://127.0.0.1:3000/hashpassword", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hashBody),
  }).catch((error) => {
    alert(error.message);
  });
  var hashText = await hashResult.json().catch((error) => {
    alert(error.message);
  });
  if (hashText.Matched) {
    console.log(text);
    //document.cookie = "user=" + text + ";";
    window.location.href = "http://127.0.0.1:3000/home.html";
  } else {
    alert("Invalid Password");
  }
}
