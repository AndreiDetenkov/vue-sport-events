const express = require('express');
const Events = require('../models/Events');

const createRouter = () => {
  const router = express.Router();

  router.get('/preview/list', async (req, res) => {
    const events = await Events.find({}).sort({ date: 1 });
    if (events.length > 0) res.status(200).send(events);
    else res.status(404).send({ message: 'Не найдено ни одного эвента!' })
  });

  return router;
};

module.exports = createRouter;
