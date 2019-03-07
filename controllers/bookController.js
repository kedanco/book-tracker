const Book = require("../models/bookModel");

exports.test = function(req, res) {
	res.send("Testing Testing 123");
};

exports.book_create = function(req, res) {
	let book = new Book({
		title: req.body.title,
		author: req.body.author,
		isRead: req.body.isRead,
		hardCopy: req.body.hardCopy
	});

	book.save(function(err) {
		if (err) {
			return next(err);
		}
		res.send("Book Created Successfully.");
	});
};

exports.book_details = function(req, res) {
	Book.findById(req.params.id, function(err, book) {
		if (err) return next(err);
		res.send(book);
	});
};

exports.book_update = function(req, res) {
	Book.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
		err,
		book
	) {
		if (err) return next(err);
		res.send("Book Updated");
	});
};

exports.book_delete = function(req, res) {
	Book.findByIdAndRemove(req.params.id, function(err) {
		if (err) return next(err);
		res.send("Deleted Successfully");
	});
};

exports.getOne = function(req, res, next) {
	var book = req.book.toJson();
	res.json(book.toJson());
};
