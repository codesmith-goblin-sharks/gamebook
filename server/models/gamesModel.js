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

module.exports = mongoose.model('apiGames', gamesSchema);
