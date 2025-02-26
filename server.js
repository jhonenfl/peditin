const User = require('./models/Users');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

//Connect to Mongod Server
const MONGO_URL = "mongodb://127.0.0.1:27017/fireflyWaifu";

mongoose.connect(MONGO_URL)
  .then(() => console.log("🟢 Connect to MongoDB"))
  .catch(err => console.error("🔴 Error connecting to MongoDB:", err));

app.get('/', (req, res) => {
  res.send("MongoDB server connected!");
});

app.listen(3000, () => {
  console.log("Servidor running in http://localhost:3000");
});


//Create a user (POST)
app.post("/users", async (req, res) => {
  const newUser = new User(req, res);
  await newUser.save();
  res.json({message: "User created", user: newUser });
});

//Get all users (GET)
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//Update a user (POST)
app.put("/users/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.json({ message: "Updated user", user: updatedUser });
});

//Deleted a user (DELETE)
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted user" });
})
