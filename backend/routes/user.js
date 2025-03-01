// Rutas para manejar usuarios

const express = require('express');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// Seguir/dejar a un usuario
router.post('/:id/follow', auth, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) return res.status(404).json({ error: "User not found" });

    if (req.user._id.toString() === userToFollow._id.toString()) return res.status(400).json({ message: "Can't follow itself" });

    if (currentUser.following.includes(userToFollow._id)) {
      currentUser.following = currentUser.following.filter( id => id.toString() !== userToFollow._id.toString() );
      userToFollow.followers = userToFollow.followers.filter( id => id.toString() !==  currentUser._id.toString() );
    } else {
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
    }

    await userToFollow.save();
    await currentUser.save();

    res.json({ message: "Follow/Unfollow this user" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener seguidores de un usuario
router.get('/:id/followers', auth, async (req, res) => {
  try {
    const userToView = await User.findById(req.params.id);
    if (!userToView) return res.status(404).json({ error: "User not found "});

    const { followers } = userToView;
    res.json(followers);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener a quien sigue un usuario
router.get('/:id/following', auth, async (req, res) => {
  try {
    const userToView = await User.findById(req.params.id);
    if (!userToView) return res.status(404).json({ error: "User not found" });

    const { following } = userToView;
    res.json(following);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar a un usuario
router.get('/search', auth, async (req, res) => {
  try {
    const userSearched = req.query.query;
  
    const userMatch = await User.find({ $or: [
      { username: { $regex: userSearched, $options: "ix"} },
      { email: { $regex: userSearched, $options: "ix"} }
    ]});

    if (userMatch[0] === undefined) return res.status(404).json({ error: "Users not found" });
    res.json({ userMatch });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;