const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');
const fs = require('fs-extra');
const config = require('../config');
const Event = require('../models/Event');

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

  // -----------------  сохранение нового эвента в БД  ---------------------
  router.post('/add-event-preview', upload.single('imagePreview'), async (req, res) => {
    // Object.keys(req.body).forEach(item => {
    //   if (req.body[item] === '') {
    //     res.status(400).send({ message: 'Все поля должны быть заполнены!' })
    //   }
    // });

    // console.log('req: ', req.body)

    const data = {};

    for (let el in req.body) {
      data[el] = req.body[el]
    }
    delete data.lat;
    delete data.lng;

    if (req.file) {
      data.imagePreview = req.file.filename
    } else res.status(400).send({ message: 'Не добавлена фотография!' });

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

    data.gps = [req.body.lat, req.body.lng];

    const event = new Event(data);

    try {
      const title = await Event.findOne({ title: data.title });
      if (title) {
        res.status(400).send({
          message: `Название - ${data.title} уже есть в БД!`
        });
      }

      const newEvent = await event.save();
      if (newEvent) {
        res.status(200).send({
          message: `Эвент - ${data.title} успешно добавлен в БД`,
          event: newEvent
        });
      }
    } catch (e) {
      res.status(400).send({
        message: 'Ошибка при добавлении записи в БД', error: e.message
      });
    }
  });

  // -----------------  получение списка всех эвентов ---------------------
  router.get('/events/list', async (req, res) => {
    const events = await Event.find({}).sort({ date: 1 });
    if (events.length > 0) res.status(200).send(events);
    else res.status(200).send({ events, message: 'Нет эвентов в БД!' })
  });

  return router;
};

module.exports = createRouter;
