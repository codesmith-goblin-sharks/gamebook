const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gamesSchema = new Schema({
  id: Number,
  name: String,
  cover: String,
  similar_games: Array,
  summary: String,
  platforms: Array,
  genres: Array,
});

const likedGamesSchema = new Schema({
  id: Number,
  name: String,
  cover: String,
  similar_games: Array,
  summary: String,
  platforms: Array,
  genres: Array,
});

module.exports = {
  apiGames: mongoose.model('apiGames', gamesSchema),
  likedGames: mongoose.model('likedGames', likedGamesSchema),
};
