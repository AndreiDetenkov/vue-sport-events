const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');
const fs = require('fs-extra');
const config = require('../config');
const Event = require('../models/events');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirName = req.body.id;
    fs.mkdirsSync(config.uploadPath + `/${dirName}`);
    cb(null, config.uploadPath + `/${dirName}`);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const createRouter = () => {
  const router = express.Router();

  const uploadFiles = upload.fields([
    { name: 'imagePreview', maxCount: 1 }, { name: 'images', maxCount: 10 }
  ]);
  router.post('/add', uploadFiles, async (req, res) => {
    Object.keys(req.body).forEach(item => {
      if (req.body[item] === '') {
        res.status(400).send({
          message: 'Все поля должны быть заполнены!'
        })
      }
    });

    const data = {
      title: req.body.title,
      distance: req.body.distance,
      sponsor: req.body.sponsor,
      sponsorLink: req.body.sponsorLink,
      location: req.body.location,
      date: req.body.date,
      dirId: req.body.id
    };

    try {
      if (Object.keys(req.files).length === 2) {
        const images = [];
        data.imagePreview = req.files.imagePreview[0].filename;
        await req.files['images'].filter(image => { images.push(image.filename) });
        data.images = images;
      }
    } catch (e) {
      res.status(400).send({
        message: 'Поля с картинками должны быть заполнены!', error: e.message
      });
    }

    const event = new Event(data);

    const dir = await Event.findOne({dirId: data.dirId});
    if (dir) {
      res.status(400).send({
        message: `Такой id - ${data.dirId} уже есть в БД!`
      });
    }

    const title = await Event.findOne({ title: data.title });
    if (title) {
      res.status(400).send({
        message: `Такое название - ${data.dirId} уже есть в БД!`
      });
    }

    try {
      const newEvent = await event.save();
      if (newEvent) {
        res.status(200).send({
          message: `Эвент - ${data.title} успешно добавлен в БД`, event: newEvent
        });
      }
    } catch (e) {
      res.status(400).send({
        message: 'Ошибка при добавлении записи в БД', error: e.message
      });
    }
  });

  return router;
};

module.exports = createRouter;
