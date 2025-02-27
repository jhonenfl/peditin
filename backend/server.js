const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cors = require('cors');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", authRoutes);

app.listen(3000, () => console.log("Servidor running in http://localhost:3000"));

app.get('/', (req, res) => {
  res.send("MongoDB server connected!");
});