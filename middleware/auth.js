const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const Team = require("../models/Team");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  let authToken = req.headers.authorization;
  if (authToken && authToken.startsWith("Bearer")) {
    token = authToken.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorResponse("Unauthorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.team = await Team.findById(decoded.id);
  next();
});

exports.authorization = (req, res, next) => {
  const team = { ...req.team._doc };
  if (team.email != "admin@mail.com" || team.role != "admin") {
    return next(
      new ErrorResponse(`Access to this route is forbidden for teams`, 403)
    );
  }
  next();
};
