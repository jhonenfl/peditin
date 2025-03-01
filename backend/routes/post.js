const express = require('express');
const auth = require('../middleware/authMiddleware');
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();


// Create post
router.post('/', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const newPost = new Post({ content, author: req.user._id });
    await newPost.save();
    res.status(201).json({ message: "Your post was upload succesfully", newPost });

  } catch (error) {
    res.status(500).json({ error: "Failed to up your post" })
  }
});


// Load posts
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const user = await User.findById(req.user._id).populate("following");
    const posts = await Post.find({ author: { $in: user.following } })
      .sort({ createdAt: -1 })
      .populate('author', 'username')
      .skip(skip)
      .limit(limit);

    if (posts[0] === undefined) return res.status(403).json({ error: "No post, follow users to see posts" });

    res.json(posts);

  } catch (error) {
    res.status(500).json({ error: "Error loading posts" });
  }
});


// Find post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);

  } catch (error) {
    res.status(500).json({ error: "Error to found the post" });
  }
});


// Delete a post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.author.toString() !== req.user.id) return res.status(403).json({ error: "Required permission to delete it"});

    await post.deleteOne();
    res.json({ message: "Post deleted sucessfully" });

  } catch (error) {
    res.status(500).json({ error: "Error to delete the post" });
  }
});


// Like or Dislike for post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const userId = req.user._id;
    const index = post.likes.indexOf(userId);

    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }
    await post.save();

    res.json({ message: "Like update", likes: post.likes.length });

  } catch (error) {
    res.status(500).json({ error: "Failed like/dislike"});
  }
});


module.exports = router;