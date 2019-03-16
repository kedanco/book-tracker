var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let BookSchema = new Schema(
	{
		_userId: { type: Object, required: true },
		title: { type: String, required: true },
		author: { type: String, required: true },
		isRead: { type: Boolean, default: false },
		hardCopy: { type: Boolean, default: true },
		inWishList: { type: Boolean, default: false },
		yearCompleted: String,
		source: { type: String },
		genre: { type: String },
		price: { type: Number },
		tags: { type: Array }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
