const express = require('express');
const Event = require('../models/events');

const createRouter = () => {
  const router = express.Router();

  router.get('/preview/list', async (req, res) => {
    const events = await Event.find({});
    if (events.length > 0) res.status(200).send(events);
    else res.status(404).send({ message: 'Не найдено ни одного эвента!' })
  });

  return router;
};

module.exports = createRouter;
