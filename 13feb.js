// index.js
const express = require('express');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  res.render('home', { user });
});

app.get('/about', (req, res) => {
  res.render('about');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
