const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
    },
  },
  owner: {
    type: Object,
    required: true,
  },
  movieId: {
    type: Object,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: (str) => validator.isAlphanumeric(str['ru-RU']),
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (str) => validator.isAlphanumeric(str),
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);