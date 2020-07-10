'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
// create the Express app
const app = express();

const indexRouter = require('./routes/index');
// setup morgan which gives us http request logging
app.use(morgan('dev'));

app.use(express.json())
//enables CORS for all origins
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', ['GET, HEAD, POST, DELETE, PUT'])
  res.setHeader('Access-Control-Allow-Headers', '*')
  next();
})
// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the School Course API!',
  });
});

// API-routes are handled in a separate module
app.use('/api', indexRouter);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (err.name === 'SequelizeValidationError'|| err.name === 'SequelizeUniqueConstraintError'){
      err.status = 400;
      err.message = err.errors.map(error => error.message);
    }
  res.status(err.status || 500).json({
    name: err.name,
    message: err.message
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
