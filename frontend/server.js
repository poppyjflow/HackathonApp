// imports
const express = require("express");
const cookieParser = require("cookie-parser");
const port = 3000;
const app = express();
const crypto = require("crypto");

app.use(express.static("public_html"));
app.use(express.json());
app.use(cookieParser());

//Rick: pass1: e6c3da5b206634d7f3f3586d747ffdb36b5c675757b380c6a5fe5c570c714349
//Morty: pass2: 1ba3d16e9881959f8c9a9762854f72c6e6321cdd44358a10a4e939033117eab9
//Glootie and others: pass3: 3acb59306ef6e660cf832d1d34c4fba3d88d616f0bb5c2a9e0f82d18ef6fc167

app.post("/hashpassword", (req, res) => {
  const hashedPass = req.body.hashedPassword;
  const password = req.body.password;
  var hash = crypto.createHash("sha256");
  hash.update(password);
  if (hashedPass === hash.digest("hex")) {
    res.send(JSON.stringify({ Matched: true }));
  } else {
    res.send(JSON.stringify({ Matched: false }));
  }
});

app.listen(port, "127.0.0.1", () => {
  console.log(`App listening at http://127.0.0.1:${port}`);
});
