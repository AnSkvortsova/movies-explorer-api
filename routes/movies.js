const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getMovies, createMovie, removeMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string()
        .required()
        .pattern(
          /https?:\/\/(www\.)?[-\w()@:%!$+.~#?&/=]+\.[-\w()@:%!$+.~#?&/=]+$/,
        ),
      trailer: Joi.string()
        .required()
        .pattern(
          /https?:\/\/(www\.)?[-\w()@:%!$+.~#?&/=]+\.[-\w()@:%!$+.~#?&/=]+$/,
        ),
      thumbnail: Joi.string()
        .required()
        .pattern(
          /https?:\/\/(www\.)?[-\w()@:%!$+.~#?&/=]+\.[-\w()@:%!$+.~#?&/=]+$/,
        ),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);
router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object()
      .keys({
        movieId: Joi.string().length(24).hex(),
      }),
  }),
  removeMovie,
);

module.exports = router;
