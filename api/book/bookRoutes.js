var router = require("express").Router();
var controller = require("./bookController");

router.route("/:id").get(controller.getOne);

module.exports = router;
