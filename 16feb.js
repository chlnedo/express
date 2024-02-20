// index.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authRoutes = require('./routes/authRoutesJWT');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Sample users data (in-memory storage, replace with a database in a real application)
const users = [];

// Secret key for JWT (replace with a more secure key in production)
const secretKey = 'your-secret-key';

// Routes
app.use('/auth', authRoutes);

// Protected route example
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: 'Accessed protected route successfully', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Middleware to verify JWT and authenticate user
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
}
