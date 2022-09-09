const path = require("path");
const fs = require("fs");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Team = require("../models/Team");

// helper function
const sendToken = (team, statusCode, res) => {
  const token = team.getSignToken();

  const secure = process.env.NODE_ENV == "production" ? true : false;
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

// @desc    Register team
// @route   POST /register
exports.register = asyncHandler(async (req, res, next) => {
  const { teamName, email, password } = req.body;
  const team = await Team.create({
    teamName,
    email,
    password,
  });
  sendToken(team, 200, res);
});

// @desc    Login team
// @route   POST /login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please enter email and password", 400));
  }

  const team = await Team.findOne({ email }).select("+password");

  if (!team || !(await team.matchPassword(password))) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  sendToken(team, 200, res);
});

// @desc    Get questions
// @route   GET /question
exports.question = asyncHandler(async (req, res, next) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__basedir, "data", "image.json"))
  );
  console.log(req.team.assignedColorCode);
  const questions = data[`${req.team.assignedColorCode}`];
  return res.status(200).json({ success: true, questions });
});
