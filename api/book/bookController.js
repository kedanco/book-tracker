var Book = require("./userModel");

exports.getOne = function(req, res, next) {
	var user = req.user.toJson();
	res.json(user.toJson());
};
