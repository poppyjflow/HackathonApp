// imports
const express = require("express");
//const cookieParser = require("cookie-parser");
const port = 3000;
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.get("/hashpassword/:password", (req, res) => {
  const password = req.params.password;
  console.log("Retrieved password", password);
  bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      console.log("Salt: ", salt);
    })
    .then((hash) => {
      console.log("Hash: ", hash);

      res.send(JSON.stringify(bcrypt.hash(password, hash)));
    })
    .catch((err) => {
      console.error(err.message);
      res.send(JSON.stringify(err.message));
    });
});

app.use(express.static("public_html"));
app.use(express.json());
//app.use(cookieParser());

app.listen(port, "127.0.0.1", () => {
  console.log(`App listening at http://127.0.0.1:${port}`);
});
