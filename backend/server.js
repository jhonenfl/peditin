const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();


app.use("/auth", authRoutes);
app.use('/post', postRoutes);
app.use('', commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor running in http://localhost:${PORT}`));

app.get('/', (req, res) => {
  res.send("MongoDB server connected!");
});