const Book = require("../models/bookModel");

exports.book_all = function(req, res, next) {
	Book.find(function(err, books) {
		if (err) return next(err);
		res.send({ books: books });
	});
};

exports.book_create = async function(req, res, next) {
	try {
		let dup = await checkDuplicates(req.body.title, req.body.author);

		if (dup) {
			console.log("duplicate");
			res.send({ error: "Book already exists in database." });
		} else {
			if (req.body.tags) {
				var tagArray = req.body.tags.split(",").map(item => {
					return item.trim();
				});
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

			// console.log(book);

			book.save(function(err) {
				if (err) {
					console.log(err);
					return next(err);
				}
				res.send({ message: "Book Created Successfully." });
			});
		}
	} catch (err) {
		throw Error(err);
	}
};

function checkDuplicates(title, author, callback) {
	return new Promise(function(res, rej) {
		Book.findOne(
			{
				title: title,
				author: author
			},
			function(err, book) {
				if (err) {
					rej(err);
				} else {
					res(book);
				}
			}
		);
	});
}

exports.book_details = function(req, res, next) {
	Book.findById(req.params.id, function(err, book) {
		if (err) return next(err);
		res.send(book);
	});
};

exports.book_update = function(req, res, next) {
	if (req.body.tags) {
		let tagArray = req.body.tags.split(",").map(item => {
			return item.trim();
		});
		req.body.tags = tagArray;
	}

	Book.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
		err,
		book
	) {
		if (err) return next(err);
		res.send({ message: "Book Updated Successfully." });
		return book;
	});
};

exports.book_delete = function(req, res, next) {
	Book.findByIdAndRemove(req.params.id, function(err) {
		if (err) return next(err);
		res.send("Deleted Successfully");
	});
};
