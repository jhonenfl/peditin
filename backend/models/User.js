const mongoose = require('mongoose');
const bcript = require('bcryptjs');

/// Define a user schema ///
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});


/// Hash password and after save it ///
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcript.hash(this.password, 10);
  next();
});


/// Compare passwords ///
userSchema.methods.comparePassword = function (password) {
  return bcript.compare(password, this.password);
};

/// Create a user model ///
const User = mongoose.model('User', userSchema);
module.exports = User;