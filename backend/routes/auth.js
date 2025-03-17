const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();


/// Register user ///
router.post("/register", [body('email').isEmail().normalizeEmail(), body('password').isLength({min:8}).trim().escape()], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()});

    const { username, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ error: "User already exist"});
    
    const newUser = new User({ username, email, password});
    await newUser.save();
    res.status(201).json({ message: "User created succesfully" });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Register user failed" });
  }
});


/// Login user ///
router.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: "Login succesfully", token });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


/// Protect route (example) ///
router.get("/profile", auth, async (req, res) => {
  try {
    const user = User.findById(req.user.userId).select("-password");
    res.json(user);

  } catch (error) {
    res.status(500).json({ error: "Get profile failed" });
  }
});


module.exports = router;