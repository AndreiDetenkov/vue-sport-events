const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const auth = async (req, res, next) => {
  const token = req.get('Token');

  if (!token) {
    return res.status(401).send({ message: 'Нет токена для авторизации' });
  }

  let tokenData;

  try {
    tokenData = jwt.verify(token, config.jwt.secret);
  } catch (e) {
    return res.status(401).send({ message: 'Неправильный токен' });
  }

  const user = await User.findById(tokenData.id);

  if (!user) {
    return res.status(401).send({ message: 'Такой администратор не найден' });
  }

  req.user = user;

  next();
};

module.exports = auth;
