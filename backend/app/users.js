const express = require('express');
const User = require('../models/User');
const router = express.Router();

const createRouter = () => {
  // router.post('/', async (req, res) => {
  //   if (req.body.username === '' || req.body.password === '') {
  //     res.status(400).send({ message: 'Все поля должны быть заполнены' });
  //   } else {
  //     const user = new User({
  //       username: req.body.username,
  //       password: req.body.password
  //     });
  //
  //     try {
  //       const newUser = await user.save();
  //       res.send(newUser);
  //     } catch (e) {
  //       return res.status(400).send({ e });
  //     }
  //   }
  // });

  router.post('/sessions', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).send({ message: 'Такой пользователь не зарегестрирован в БД' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ message: 'Неправильный пароль' });
    }

    const token = user.generateToken();

    return res.send({ user, token });
  });

  router.delete('/sessions', async (req, res) => {
    const token = req.get('Token');
    const success = { message: 'Logout success!' };
    if (!token) return res.send(success);

    const user = await User.findOne({ token });
    if (!user) return res.send(success);

    user.generateToken();
    await user.save();

    return res.send(success);
  });

  return router;
};

module.exports = createRouter;
