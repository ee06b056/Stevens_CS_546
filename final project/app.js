const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const exphbs = require("express-handlebars");
const path    = require("path");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const static = express.static(__dirname + "/public");
app.use("/public", static);
app.engine("handlebars", exphbs({ defaultLayout: "" }));
app.set("view engine", "handlebars");
const configRoutes = require("./routes/index.js");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});