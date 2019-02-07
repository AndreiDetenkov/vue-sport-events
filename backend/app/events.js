const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');
const fs = require('fs');
const config = require('../config');
const Event = require('../models/events');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const dirName = nanoid();
    // fs.mkdirSync(config.uploadPath + `/${dirName}`);
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const createRouter = () => {
const router = express.Router();

  // const uploadFiles = upload.fields([
  //   { name: 'preview', maxCount: 1 },
  //   { name: 'images', maxCount: 10 }
  // ]);

  // добавление новой записи
  router.post('/add', upload.single('imagePreview'), async(req, res) => {

    Object.keys(req.body).forEach(item => {
      if (req.body[item] === '') {
        res.status(400).send({ message: 'Все поля должны быть заполнены!' })
      }
    });

    const data = {
      title: req.body.title,
      distance: req.body.distance,
      sponsor: req.body.sponsor,
      sponsorLink: req.body.sponsorLink,
      location: req.body.location,
      date: req.body.date
    };

    data.imagePreview = req.file.filename;
    // const images = [];
    // req.files['images'].filter(image => {
    //   images.push(image.filename)
    // });
    //
    // if (req.files) {
    //   data.imagePreview = req.files.preview[0].filename;
    //   data.images = images;
    // }
    // else res.status(400).send({ message: 'Поле с картинкой должно быть заполнено!' });

    const event = new Event(data);
    try {
      const newEvent = await event.save();
      console.log(newEvent);
      res.status(200).send({ message: `${data.title} успешно добавлен в БД` })
    } catch (e) {
      res.status(400).send({ message: `Ошибка при добавлении в БД - ${e}` })
    }

    // res.status(200).send(data)
  });



  return router;

};

module.exports = createRouter;
