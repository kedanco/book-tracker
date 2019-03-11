const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
var bookRoutes = require("./routes/bookRoutes");
var bookController = require("./controllers/bookController");

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
// app.engine("html", require("ejs").renderFile);
// app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "client/public")));

app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
console.log("listening on http://localhost:" + PORT);
