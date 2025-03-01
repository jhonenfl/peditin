const express = require('express');
const auth = require('../middleware/authMiddleware');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const router = express.Router();

// Comment post
router.post('/posts/:id/comment', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const newComment = new Comment({
      post: post._id,
      author: req.user._id,
      content: req.body.content
    })

    await newComment.save();
    post.comments.push(newComment._id);
    await post.save();

    res.json({ message: "Post commented", comment: newComment });

  } catch (error) {
    console.error("🔴 Error:", error);
    res.status(500).json({ error: error.message });
  }
});


// Delete comment
router.delete('/comments/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('post');
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    const post = await Post.findById(comment.post._id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (comment.author.toString() !== req.user._id.toString() && post.author.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Non authorization for delete this comment" });

    await Comment.findByIdAndDelete(req.params.id);

    post.comments = post.comments.filter(commentId => commentId.toString() !== req.params.id);
    await post.save();

    res.json({ message: "Comment was deleted" });

  } catch (error) {
    res.status(500).json({ error: "Was failed comment" });
  }
});


// Load comments
router.get('/posts/:id/comments', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    const comment = await Post.findById(req.params.id)
      .populate("author", "username email")
      .populate({
        path: "comments",
        limit: limit,
        skip: skip,
        populate: { path: "author", select: "username email" }
      });

    if (!comment) return res.status(404).json({ error: "Post not found" });

    res.json(comment);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;