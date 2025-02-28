const express = require('express');
const auth = require('../middleware/authMiddleware');
const Post = require('../models/Post');

const router = express.Router();


// Create post
router.post('/', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const newPost = new Post({ content, author: req.user.id });
    await newPost.save();
    res.status(201).json({ message: "Your post was upload succesfully", newPost });

  } catch (error) {
    res.status(500).json({ error: "Failed to up your post" })
  }
});


// Load posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'username');
    res.json(posts);

  } catch (error) {
    res.status(500).json({ error: "Error loading posts" });
  }
})

// Find post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);

  } catch (error) {
    res.status(500).json({ error: "Error to found the post" });
  }
})


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


module.exports = router;