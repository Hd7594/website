const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  username: String,
  password: String,
  newsletter: Boolean,
  token: String,
  salt: String,
  hash: String,
});

module.exports = User;
