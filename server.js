const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
var bookRoutes = require("./routes/bookRoutes");

// var monk = require("monk");
// var db = monk("localhost:27017/booktrackerdb1");
const mongoose = require("mongoose");
let dev_db_url =
	"mongodb://bookadmin:admin123@ds261155.mlab.com:61155/booktracker";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

// view engine setup
app.engine("html", require("ejs").renderFile);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/books", bookRoutes);
// app.use("/users", usersRouter);

// Make our db accessible to our router
app.use(function(req, res, next) {
	req.db = db;
	next();
});

// Populate booklist with books in DB
// app.get("/", (req, res) => {
// 	let db = req.db;
// 	let collection = db.get("bookcollection");
// 	collection.find({}, {}, function(e, docs) {
// 		res.render("index.html", {
// 			booklist: docs
// 		});
// 	});
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log("listening on http://localhost:" + PORT);

module.exports = app;
