const ApiGames = require('../models/gamesModel');
const users = require('../models/usersModel');

require('dotenv').config();

const gamesController = {};

const apiKey = process.env.ACCESS_TOKEN;
const clientId = process.env.CLIENT_ID;
const baseUrl = 'https://api.igdb.com/v4/';

// api request
gamesController.apiSave = async (req, res, next) => {
  /*
  when the INITIAL request is made to API (using postman for now),
  take the data received and store into db apigames collection
  */
  try {
    // function to requery to endpoint to get the name field linked to ids
    const fetchIdName = async (id, endpoint) => {
      let idString;
      if (Array.isArray(id)) idString = id.join(',');
      else idString = id;
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Client-ID': clientId,
          Authorization: `Bearer ${apiKey}`,
        },
        body: `fields *; where id = (${idString});`,
      });
      const data = await response.json();
      // if endpoint is covers, return the url and remove the first two slashes
      // else return data.name
      return data.map(item => {
        if (endpoint === 'covers') {
          return item.url.slice(2);
        } else {
          return item.name;
        }
      });
    };

    // loop through data because it's an array
    for (const game of req.body) {
      const games = await ApiGames.findOne({ id: game.id });
      if (games) continue;
      // making individual fetch requests calling fetchIdName
      if (!game.cover || !game.similar_games || !game.platforms || !game.genres)
        continue;

      const cover = await fetchIdName(game.cover, 'covers');

      const similarGames = await fetchIdName(game.similar_games, 'games');

      const platforms = await fetchIdName(game.platforms, 'platforms');

      const genres = await fetchIdName(game.genres, 'genres');

      const gameData = {
        id: game.id,
        name: game.name,
        cover: cover[0],
        similar_games: similarGames,
        summary: game.summary,
        platforms: platforms,
        genres: genres,
      };

      if (!games) {
        await ApiGames.create(gameData);
      }
    }
    next();
  } catch (error) {
    console.log(error);
    next({
      message: error,
    });
  }
};

// get data from db and send to frontend
gamesController.getGames = async (req, res, next) => {
  try {
    // find games from db depending on filters sent from frontend
    // req.body should be something like { platforms: [platform1, platform2], genres: [genre1, genre2] }
    const { username, platforms, genres } = req.body;
    res.locals.games = await ApiGames.find({
      platforms: { $in: platforms },
      genres: { $in: genres },
    });
    next();
  } catch (error) {
    console.log(error);
    next({
      message: error,
    });
  }
};

gamesController.gameFilter = async (req, res, next) => {
  try {
    const user = await users.findOne({ username: req.body.username });
    // const gamesCopy = JSON.parse(JSON.stringify(res.locals.games));
    // const userGames = user.likedGames; // array of obj
    // const filteredGamesCopy = gamesCopy.filter(game =>
    //   userGames.some(userGame => userGame.name === game.name)
    // );
    // res.locals.filteredGames = JSON.parse(JSON.stringify(filteredGamesCopy));
    // console.log(res.locals.filteredGames.slice(0, 2));

    const excludedGames = user.likedGames;
    const excludedNames = excludedGames.map(game => game.name);

    const filteredGames = res.locals.games.filter(game => {
      return !excludedNames.includes(game.name);
    }); //assume we are mathing with game names?
    res.locals.filteredGames = filteredGames;
    console.log('filtered', Array.isArray(res.locals.filteredGames));

    next();
  } catch (error) {
    next({
      message: error,
    });
  }
};

module.exports = gamesController;

/*
const ApiGames = require('../models/gamesModel');
const fetch = require('node-fetch');
require('dotenv').config();

const gamesController = {};

const apiKey = process.env.ACCESS_TOKEN;
const clientId = process.env.CLIENT_ID;
const baseUrl = 'https://api.igdb.com/v4/';

gamesController.apiSave = async (req, res, next) => {
  try {
    const fetchIdName = async (id, endpoint) => {
      const idString = Array.isArray(id) ? id.join(',') : id;
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Client-ID': clientId,
          Authorization: `Bearer ${apiKey}`,
        },
        body: `fields *; where id = (${idString});`,
      });
      const data = await response.json();
      return data.map(item => {
        return endpoint === 'covers' ? item.url.slice(2) : item.name;
      });
    };

    for (const game of req.body) {
      const existingGame = await ApiGames.findOne({ id: game.id });
      if (existingGame) continue;
      
      if (!game.cover || !game.similar_games || !game.platforms || !game.genres)
        continue;

      const cover = await fetchIdName(game.cover, 'covers');
      const similarGames = await fetchIdName(game.similar_games, 'games');
      const platforms = await fetchIdName(game.platforms, 'platforms');
      const genres = await fetchIdName(game.genres, 'genres');

      const gameData = {
        id: game.id,
        name: game.name,
        cover: cover[0],
        similar_games: similarGames,
        summary: game.summary,
        platforms: platforms,
        genres: genres,
      };

      await ApiGames.create(gameData);
    }
    next();
  } catch (error) {
    console.log(error);
    next({ message: error });
  }
};

gamesController.getGames = async (req, res, next) => {
  try {
    const { platforms, genres } = req.body;
    res.locals.games = await ApiGames.find({
      platforms: { $in: platforms },
      genres: { $in: genres },
    });
    next();
  } catch (error) {
    console.log(error);
    next({ message: error });
  }
};

gamesController.gameFilter = async (req, res, next) => {
  try {
    const excludedGames = req.body.username.likedGames.map(game => game.name);
    const filteredGames = res.locals.games.filter(game => {
      return !excludedGames.includes(game.name);
    });
    res.locals.filteredGames = filteredGames;
    next();
  } catch (error) {
    next({ message: error });
  }
};

module.exports = gamesController;

*/
