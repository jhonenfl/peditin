const mongoose = require('mongoose');

/// Define post schema ///
const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required:true },
  createdAt: { type: Date, default: Date.now }
});


/// Create post model ///
const Post = mongoose.model('Post', postSchema);
module.exports = Post;