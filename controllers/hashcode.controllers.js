const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Team = require("../models/Team");

// @desc    Register team
// @route   POST /register
exports.register = asyncHandler(async (req, res, next) => {
  const { teamName, email, password } = req.body;
  const team = await Team.create({
    teamName,
    email,
    password,
  });

  return res.status(200).json({ success: true, team });
});

// @desc    Login team
// @route   POST /login
exports.login = asyncHandler(async (req, res, next) => {
  const { teamName, password } = req.body;

  if (!teamName || !password) {
    return next(new ErrorResponse("Please enter team name and password", 400));
  }

  const team = await Team.findOne({ teamName }).select("+password");

  if (!team || !(await team.matchPassword(password))) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  return res.status(200).json({ success: true, team });
});
