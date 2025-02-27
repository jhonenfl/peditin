const mongoose = require('mongoose');

/// Define a user schema ///
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


/// Create a user model ///
const User = mongoose.model('User', userSchema);

module.exports = User;