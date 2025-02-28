const mongoose = require('mongoose');

/// Define post schema ///
const postSchema = new mongoose.Schema({
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});


/// Create post model ///
const Post = mongoose.model('Post', postSchema);
module.exports = Post;