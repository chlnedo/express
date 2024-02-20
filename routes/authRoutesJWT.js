// routes/authRoutesJWT.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

// Sample users data (in-memory storage, replace with a database in a real application)
const users = [];

// Secret key for JWT (replace with a more secure key in production)
const secretKey = 'your-secret-key';

// Register a new user
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ error: 'Username is already taken' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the user in the 'database'
  users.push({ username, password: hashedPassword });

  res.json({ message: 'User registered successfully' });
});

// Log in and generate JWT
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user in the 'database'
  const user = users.find((user) => user.username === username);

  // Check if the user exists and the password is correct
  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate JWT
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

module.exports = router;
