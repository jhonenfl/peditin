const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


/// Connect to Mongod Server ///

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


/// Created initial endpoint's ///

app.post("/register", async (req, res) => {
  //created user
});

app.post("/login", async (req, res) => {
  //authenticed user and comeback token
});

app.get("profile", async (req, res) => {
  //show profile of authentice user 
});
