const express = require('express'); // To use Express we must require it with Node's require statement
const router = express.Router(); // Like a mini-router

// Root route
router.get('/', (req, res) => {
    const name = req.cookies.username; // Trys to get username cookie
    if (name) { 
      res.render('index.pug', { name }); // If name exists render the index page
    } else { 
      res.redirect('/hello'); // If name doesn't exist redirect to the hello route
    }
});

// Hello get route
router.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) { 
    res.redirect('/'); // If name exists redirect to the index route
  } else {
    res.render('hello.pug'); // If name doesn't exist render the hello page
  }
});

// Hello post route
router.post('/hello', (req, res) => {
  res.cookie('username', req.body.username); // Sends a cookie to the browser after we submit a form
  res.redirect('/');
});

// Goodbye route
router.post('/goodbye', (req, res) => {
  res.clearCookie('username'); // Removes cookie
  res.redirect('/hello');
});

// Exports the router so it can be referenced in the app.js file
module.exports = router;
