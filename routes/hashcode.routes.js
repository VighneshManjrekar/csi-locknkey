const router = require("express").Router();

const { protect } = require("../middleware/auth");

const {
  register,
  login,
  question,
} = require("../controllers/hashcode.controllers");

router.post("/register", register);
router.post("/login", login);
router.get("/question", protect, question);

module.exports = router;
