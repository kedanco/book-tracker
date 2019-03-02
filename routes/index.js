var router = require("express").Router();

/* GET New User page. */
router.get("/newbook", function(req, res) {
	res.render("newbook", { title: "Add New Book" });
});

module.exports = router;
