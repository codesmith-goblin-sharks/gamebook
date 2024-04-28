const ApiGames = require('../models/gamesModel');
require('dotenv').config();
const bcrypt = require('bcryptjs');

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
    const { platforms, genres } = req.body;
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

module.exports = gamesController;
