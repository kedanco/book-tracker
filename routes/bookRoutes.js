const router = require("express").Router();
const book_controller = require("../controllers/bookController");

router.get("/test", book_controller.test);

router.get("/", book_controller.book_all);

router.post("/create", book_controller.book_create);

router.get("/:id", book_controller.book_details);

router.put("/:id", book_controller.book_update);

router.delete("/:id", book_controller.book_delete);
// router.route("/:id").get(controller.getOne);

module.exports = router;
