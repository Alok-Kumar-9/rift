const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  mobile: {
    type: Number,
    required: true,
    trim: true,
  },
  order: {
    type: Array,
    default: [],
  },
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
