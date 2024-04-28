const { apiGames, likedGames } = require('./model');
require('dotenv').config();

const gamesController = {};

const apiKey = process.env.ACCESS_TOKEN;
const clientId = process.env.CLIENT_ID;
const baseUrl = 'https://api.igdb.com/v4/';

// api request
gamesController.apisave = async (req, res, next) => {
  /*
  when the INITIAL request is made to API (using postman for now),
  take the data received and store into db apigames collection
  */
  try {
    // function to requery to endpoint to get the name field linked to id
    const fetchIdName = async (id, endpoint) => {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Client-ID': clientId,
          Authorization: `Bearer ${apiKey}`,
        },
        body: `fields *; where id = ${id};`,
      });
      const data = await response.json();
      console.log(`data received ${endpoint}: `, data);
      // if endpoint is covers, return the url and remove the first two slashes
      // else return data.name
      return endpoint === 'covers' ? data[0].url.slice(2) : data[0].name;
    };

    // loop through data because it's an array
    for (const game of req.body) {
      // making individual fetch requests calling fetchIdName
      if (!game.cover || !game.similar_games || !game.platforms || !game.genres)
        continue;
      const cover = await fetchIdName(game.cover, 'covers');

      const similarGames = [];
      for (const gameId of game.similar_games) {
        const similarGame = await fetchIdName(gameId, 'games');
        similarGames.push(similarGame);
      }

      const platforms = [];
      for (const platformId of game.platforms) {
        const platform = await fetchIdName(platformId, 'platforms');
        platforms.push(platform);
      }

      const genres = [];
      for (const genreId of game.genres) {
        const genre = await fetchIdName(genreId, 'genres');
        genres.push(genre);
      }

      const gameData = {
        id: game.id,
        name: game.name,
        cover: cover,
        similar_games: similarGames,
        summary: game.summary,
        platforms: platforms,
        genres: genres,
      };
      const games = await apiGames.findOne({ id: game.id });
      if (!games) {
        await apiGames.create(gameData);
        // console.log(`${game.name} from api added to database`);
      }
    }
    next();
  } catch (error) {
    next({
      error: error,
    });
  }
};

module.exports = gamesController;
// when user likes a game
// get the data from frontend
// store that data into database
