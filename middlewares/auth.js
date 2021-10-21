const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new Unauthorized('Ошибка авторизации');
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    throw new Unauthorized('Ошибка авторизации');
  }

  req.user = payload;
  return next();
};
