const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const cors = require('cors');
require('dotenv').config();
const gamesController = require('./controllers/gamesController');
const usersController = require('./controllers/usersController');

URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@${process.env.MONGODB_CLUSTER_URL}games`;

mongoose.connect(URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('connected', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(cors());

// route for handling saving data from api to db
app.post('/apisave', gamesController.apiSave, (req, res) => {
  console.log('finished adding games to database');
  res.sendStatus(200);
});

// route for handling post request from frontend to filter games
app.post('/games', gamesController.getGames, (req, res) => {
  // returns array of objects of games
  res.status(200).json(res.locals.games);
});

// route for handling post request for liked games
app.post('/likegame', usersController.likeGame, (req, res) => {
  res.status(200).json(res.locals.gameLiked);
});

app.get('/likegame', usersController.loadLikes, (req, res) => {
  // returns object of objects of games
  res.status(200).json(res.locals.likedGames);
});

app.patch('/likegame', usersController.unlikeGame, (req, res) => {
  res.status(200).json(res.locals.likedGames);
});

app.post('/createuser', usersController.createUser, (req, res) => {
  // if res.locals.user has value then user created account
  // if it has no value then username already exists
  res.status(200).json(res.locals.user);
});

app.post('/login', usersController.verifyUser, (req, res) => {
  // if res.locals.user has value then user logged in
  // if it has no value then user failed to log in
  res.status(200).json(res.locals.user);
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
