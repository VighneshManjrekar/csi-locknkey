const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const TeamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    unique: [true, "Team name already exists"],
    required: [true, "Please enter name"],
    match: [/^(?!\s*$).+/, "Invalid name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "Email already registered"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    select: false,
    match: [/^(?!\s*$).+/, "Invalid password"],
  },
  assignedColorCode: {
    type: String,
    enum: ["abcxyz", "abc123", "123axy", "xya12b"],
  },
  result: {
    attempted: {
      type: Boolean,
      default: false,
    },
    submissionTime: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

TeamSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  this.assignedColorCode = ["abcxyz", "abc123", "123axy", "xya12b"][
    Math.floor(Math.random() * 5)
  ];
  next();
});

TeamSchema.methods.matchPassword = async function (passwordEntered) {
  return await bcrypt.compare(passwordEntered, this.password);
};

module.exports = mongoose.model("Team", TeamSchema);
