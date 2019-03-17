const router = require("express").Router();
const user_controller = require("../controllers/userController");
const auth = require("./auth");

router.post("/", auth.optional, user_controller.user_register);

router.post("/login", auth.optional, user_controller.user_login);

router.get("/current", auth.required, user_controller.current_user);

module.exports = router;
