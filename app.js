require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const helmet = require('helmet');

const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const routerUsers = require('./routes/users');
const routerMovies = require('./routes/movies');
const NotFound = require('./errors/NotFound');

const { PORT } = process.env;

const app = express();

mongoose.connect(
  'mongodb://localhost:27017/bitfilmsdb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('connected to MongoDB');
  },
);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.post(
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

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.use(auth);

app.use('/users', routerUsers);
app.use('/movies', routerMovies);

app.use((req, res, next) => {
  next(new NotFound('Маршрут не найден'));
});

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });

  next();
});

app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}`);
});
