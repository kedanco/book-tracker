var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let BookSchema = new Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	isRead: { type: Boolean, default: false },
	hardCopy: { type: Boolean, default: true },
	source: { type: String },
	genre: { type: String },
	price: { type: Number },
	tags: { type: Array }
});

module.exports = mongoose.model("Book", BookSchema);
