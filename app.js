const express = require('express'); // To use Express we must require it with Node's require statement
const bodyParser = require('body-parser'); // Require body-parser to process the incoming form submission data
const cookieParser = require('cookie-parser'); // Cookie-parser middleware to read cookies

const app = express(); // Creates an express application

// "use" is a method to configure the middleware used by the routes of the Express HTTP server object. 
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use('/static', express.static('public'));

// Tells Express to use the Pug template engine:
app.set('view engine', 'pug');

// Import our routers
const mainRoutes = require('./routes/index.js');
const cardRoutes = require('./routes/cards.js');

app.use('/', mainRoutes);
app.use('/cards', cardRoutes);

// Error Handling
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;

  // Use the "next" function to signal an error in your app.
  // "next" passes control forward through the app.
  // "next" signals the end of middleware functions.
  next(err);
});

// Error middleware
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error.pug');
});

// Sets up the development server with the listen method
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});