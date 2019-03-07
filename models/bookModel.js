var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let BookSchema = new Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	isRead: { type: Boolean, default: false },
	hardCopy: { type: Boolean, required: true, default: true }
});

module.exports = mongoose.model("Book", BookSchema);
