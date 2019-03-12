const Book = require("../models/bookModel");

exports.test = function(req, res) {
	res.send("Testing Testing 123");
};

exports.book_all = function(req, res, next) {
	Book.find(function(err, books) {
		if (err) return next(err);
		res.send({ books: books });
	});
};

exports.book_create = function(req, res, next) {
	console.log("inside book create");
	if (checkDuplicates(req.body.title, req.body.author)) {
		console.log("duplicate");
		res.send("Book already exists in database.");
	} else {
		console.log("here");
		if (req.body.tags) {
			var tagArray = req.body.tags.split(",");
		}

		let book = new Book({
			title: req.body.title,
			author: req.body.author,
			isRead: req.body.isRead,
			hardCopy: req.body.hardCopy,
			source: req.body.source,
			genre: req.body.genre,
			price: req.body.price,
			tags: tagArray
		});

		console.log(book);

		book.save(function(err) {
			if (err) {
				console.log(err);
				return next(err);
			}
			res.send("Book Created Successfully.");
		});
	}
};

function checkDuplicates(title, author, next) {
	Book.findOne(
		{
			title: title,
			author: author
		},
		function(err, book) {
			if (err) return next(err);
			else if (book) {
				return true;
			}
			return false;
		}
	);
}

exports.book_details = function(req, res, next) {
	Book.findById(req.params.id, function(err, book) {
		if (err) return next(err);
		res.send(book);
	});
};

exports.book_update = function(req, res, next) {
	if (req.body.tags) {
		let tagArray = req.body.tags.split(",");
		req.body.tags = tagArray;
	}

	Book.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
		err,
		book
	) {
		if (err) return next(err);
		res.send("Book Updated");
	});
};

exports.book_delete = function(req, res, next) {
	Book.findByIdAndRemove(req.params.id, function(err) {
		if (err) return next(err);
		res.send("Deleted Successfully");
	});
};

exports.getOne = function(req, res, next) {
	var book = req.book.toJson();
	res.json(book.toJson());
};
