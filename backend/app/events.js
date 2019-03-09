const express = require('express');
const Event = require('../models/Event');

const createRouter = () => {
  const router = express.Router();

  router.get('/preview/list', async (req, res) => {
    const events = await Event.find({}).sort({ date: 1 });
    if (events.length > 0) res.status(200).send(events);
    else res.status(404).send({ message: 'Не найдено ни одного эвента!' })
  });

  router.get('/item/:id', async (req, res) => {
    const event = await Event.findById(req.params.id)
    if (event) res.status(200).send(event);
    else res.status(404).send({ message: 'Не найдено ни одного эвента!' })
  });

  return router;
};

module.exports = createRouter;
