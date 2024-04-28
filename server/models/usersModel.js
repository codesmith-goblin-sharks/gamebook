const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const user = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likedGames: Array,
});

user.pre('save', async function (next) {
  try {
    const hash = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    this.password = hash;
    next();
  } catch (error) {
    return next({
      message: error,
    });
  }
});

module.exports = mongoose.model('users', user);
