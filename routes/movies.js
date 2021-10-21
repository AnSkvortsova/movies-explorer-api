const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getMovies, createMovie, removeMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:movieId', removeMovie);

module.exports = router;
