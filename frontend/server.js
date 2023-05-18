// imports
const express = require("express");
//const cookieParser = require("cookie-parser");
const port = 3000;
const app = express();
const bcrypt = require("bcrypt");

app.post("/hashpassword", (req, res) => {
  const password = req.body.password;
  const salt = req.body.password;
<<<<<<< HEAD
  console.log("Received password and salt: " + password + ", " + salt);
=======
  console.log("received password and salt: " + password + ", " + salt);
>>>>>>> 3af1ef258597cc590f808600e99a8410efb34c74
  bcrypt
    .hash(password, salt)
    .then((hash) => {
      console.log("Sending hash: " + hash);
      res.send({ Password: hash });
    })
    .catch((err) => {
      console.error(err.message);
      res.send({ Error: err.message });
    });
});

app.use(express.static("public_html"));
app.use(express.json());
//app.use(cookieParser());

app.listen(port, "127.0.0.1", () => {
  console.log(`App listening at http://127.0.0.1:${port}`);
});
