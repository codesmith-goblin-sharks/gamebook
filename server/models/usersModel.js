const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  username: String,
  password: String,
  likedGames: Array,
});

module.exports = mongoose.model('likedGames', user);
