const router = require("express").Router();

const { authorization, protect } = require("../middleware/auth");

const {
  getTeams,
  getTeam,
  getWinners,
} = require("../controllers/admin.controllers.js");

router.use(protect);
router.use(authorization);

router.get("/team", getTeam);
router.get("/teams", getTeams);
router.get("/winners", getWinners);

module.exports = router;
