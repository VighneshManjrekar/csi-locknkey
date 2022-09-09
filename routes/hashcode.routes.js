const router = require("express").Router();

const {
  register,
  login,
} = require("../controllers/hashcode.controllers");

router.post("/register", register);
router.post("/login", login);
// router.post("/test", test);

module.exports = router;
