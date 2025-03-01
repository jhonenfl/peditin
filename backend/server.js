const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cors = require('cors');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');

dotenv.config();
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Many request, try later." }
});

app.use('/auth/login', rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5
}));
app.use((err, req ,res, next) => {
  if (err.code === "EBADCSRFTOKEN") return res.status(403).json({ error: "Invalid CSRF token" });
  next(err);
});
app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(mongoSanitize());
app.use(cookieParser());
app.use(csurf({ cookie: true }));

connectDB();

app.use("/auth", authRoutes);
app.use('/posts', postRoutes);
app.use('', commentRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor running in http://localhost:${PORT}`));

app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
