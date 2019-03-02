const express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var bookRoutes = require("./api/book/bookRoutes");

var monk = require("monk");
var db = monk("localhost:27017/booktrackerdb1");

const app = express();

// view engine setup
app.engine("html", require("ejs").renderFile);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Make our db accessible to our router
app.use(function(req, res, next) {
	req.db = db;
	next();
});

app.use("/books", bookRoutes);
// app.use("/users", usersRouter);

app.get("/", (req, res) => {
	var db = req.db;
	var collection = db.get("bookcollection");
	collection.find({}, {}, function(e, docs) {
		res.render("index.html", {
			booklist: docs
		});
	});
});

module.exports = app;
