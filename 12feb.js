// index.js

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// Use the cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
  // Set multiple cookies
  res.cookie('username', 'john_doe', { maxAge: 900000, httpOnly: true });
  res.cookie('language', 'en', { maxAge: 900000, httpOnly: true });

  res.send('Cookies set successfully!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
