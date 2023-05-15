// imports
const express = require("express");
//const cookieParser = require("cookie-parser");
const port = 3000;
const app = express();

app.use(express.static("public_html"));
app.use(express.json());
//app.use(cookieParser());

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});