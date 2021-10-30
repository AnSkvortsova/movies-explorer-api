const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerMovies = require('./movies');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

router.use(auth);
router.post('/signout', logout);
router.use('/users', routerUsers);
router.use('/movies', routerMovies);

module.exports = router;
