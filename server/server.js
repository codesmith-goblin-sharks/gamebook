const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const cors = require('cors');
require('dotenv').config();
const gamesController = require('./gamesController');

URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@${process.env.MONGODB_CLUSTER_URL}games`;

mongoose.connect(URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('connected', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(cors());

// routes go here
app.post('/apisave', gamesController.apisave, (req, res) => {
  console.log('finished');
  res.sendStatus(200);
});

// catch all error
app.use('*', (req, res) => {
  res.sendStatus(404);
});

// gloabl error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
