require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsOptions = require('./middlewares/corsOptions');
const limiter = require('./middlewares/rateLimiter');
const routes = require('./routes/index');
const NotFound = require('./errors/NotFound');

const { PORT } = process.env;

const app = express();

mongoose.connect(
  'mongodb://localhost:27017/moviesdb',
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
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(corsOptions);

app.use(routes);

app.use(errorLogger);

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
