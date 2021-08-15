const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  type: String
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;