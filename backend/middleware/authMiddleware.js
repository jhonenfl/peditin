// Verifica si el usuario está autenticado

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: "Denegade access" });

  try {
    const tokenonly = token.split(" ")[1];
    const verified = jwt.verify(tokenonly, process.env.JWT_SECRET);
    req.user = verified;
    next();

  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};