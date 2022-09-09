const router = require("express").Router();

const { authorization, protect } = require("../middleware/auth");

const {
  getTeams,
  getTeam,
  getWinners,
  postCheck
} = require("../controllers/admin.controllers.js");

router.use(protect);
router.use(authorization);

router.get("/team", getTeam);
router.get("/teams", getTeams);
router.get("/winners", getWinners);
router.post("/check", postCheck);

module.exports = router;
