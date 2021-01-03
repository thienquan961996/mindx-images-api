const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      unique: true,
      type: String
    },
    password: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);