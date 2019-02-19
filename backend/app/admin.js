const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');
const fs = require('fs-extra');
const config = require('../config');
const Events = require('../models/Events');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirName = req.body.dirId;
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

  // const uploadFiles = upload.fields([
  //   { name: 'imagePreview', maxCount: 1 }, { name: 'images', maxCount: 10 }
  // ]);
  router.post('/add-event-preview', upload.single('imagePreview'), async (req, res) => {
    Object.keys(req.body).forEach(item => {
      if (req.body[item] === '') {
        res.status(400).send({ message: 'Все поля должны быть заполнены!' })
      }
    });

    const data = {
      title: req.body.title,
      sponsor: req.body.sponsor,
      sponsorLink: req.body.sponsorLink,
      location: req.body.location,
      date: req.body.date,
      dirId: req.body.dirId
    };

    if (req.file) {
      data.imagePreview = req.file.filename
    } else res.status(400).send({ message: 'Фото является обязательным полем!' })

    // try {
    //   if (Object.keys(req.files).length === 2) {
    //     const images = [];
    //     data.imagePreview = req.files.imagePreview[0].filename;
    //     await req.files['images'].filter(image => { images.push(image.filename) });
    //     data.images = images;
    //   }
    // } catch (e) {
    //   res.status(400).send({
    //     message: 'Поля с картинками должны быть заполнены!', error: e.message
    //   });
    // }

    const eventPreview = new Events(data);

    // const dir = await Events.findOne({dirId: data.dirId});
    // if (dir) {
    //   res.status(400).send({
    //     message: `Такой id - ${data.dirId} уже есть в БД!`const title = await Event.findOne({ title: data.title });
    //     if (title) {
    //       res.status(400).send({
    //         message: `Такое название - ${data.title} уже есть в БД!`
    //       });
    //     }
    //   });
    // }

    try {
      const title = await Events.findOne({ title: data.title });
      if (title) {
        res.status(400).send({
          message: `Такое название - ${data.title} уже есть в БД!`
        });
      }

      const newEvent = await eventPreview.save();
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

  router.get('/events/list', async (req, res) => {
    const events = await Events.find({}).sort({date: 1});
    if (events.length > 0) res.status(200).send(events);
    else res.status(404).send({ message: 'Не найдено ни одного эвента!' })
  });

  router.get('/events/items', async (req, res) => {
    const array = await Events.find({}).sort({date: 1}).select('title');
    if (array.length > 0) res.status(200).send(array);
    else res.status(404).send({message: 'Не найдено ни одного эвента!'})
  })

  return router;
};

module.exports = createRouter;
