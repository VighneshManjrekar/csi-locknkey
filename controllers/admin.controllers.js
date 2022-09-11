const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
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
  const teams = await Team.aggregate([
    {
      $match: {
        $and: [{ "result.win": true, "result.attempted": true }],
      },
    },
    { $sort: { "result.submissionTime": 1 } },
  ]);
  return res.status(200).json({ success: true, teams });
});

// @desc    Get team
// @route   GET admin/team
exports.getTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.findById(req.team.id);
  return res.status(200).json({ success: true, team });
});

// @desc    Check user results
// @route   POST admin/check
exports.postCheck = asyncHandler(async (req, res, next) => {
  const { teamSolution, teamId } = req.body;
  const team = await Team.findById(teamId);
  if (team.result.attempted) {
    return next(new ErrorResponse("Already attempted", 400));
  }
  const win = teamSolution == team.assignedColorCode;
  team.result.attempted = true;
  team.result.win = win;
  team.result.submissionTime = Date.now();
  await team.save();
  return res.status(200).json({ success: true });
});
