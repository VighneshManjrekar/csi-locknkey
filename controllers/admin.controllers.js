const asyncHandler = require("../middleware/async");
const Team = require("../models/Team");

// @desc    Get all team
// @route   GET /admin/teams
exports.getTeams = asyncHandler(async (req, res, next) => {
  const teams = await Team.find();
  return res.status(200).json({ success: true, teams });
});

// @desc    Get winners
// @route   GET admin/winners
exports.getWinners = asyncHandler(async (req, res, next) => {
  const teams = await Team.find({
    result: { attempted: true, win: true },
  }).sort("submissionTime");
  return res.status(200).json({ success: true, teams });
});

// @desc    Get team
// @route   GET admin/team
exports.getTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.findById(req.team.id);
  return res.status(200).json({ success: true, team });
});
