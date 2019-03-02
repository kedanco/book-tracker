const express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

const app = express();

// view engine setup
app.engine("html", require("ejs").renderFile);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render("index.html");
});

module.exports = app;
