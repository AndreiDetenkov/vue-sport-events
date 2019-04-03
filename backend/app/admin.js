const express = require('express')
const multer = require('multer')
const nanoid = require('nanoid')
const path = require('path')
const fs = require('fs-extra')
const config = require('../config')
const Event = require('../models/Event')
const auth = require('../middlewares/auth')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirName = req.body.dirId
    fs.mkdirsSync(config.uploadPath + `/${dirName}`)
    cb(null, config.uploadPath + `/${dirName}`)
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

const createRouter = () => {
  const router = express.Router()

  // const uploadFiles = upload.fields([
  //   { name: 'imagePreview', maxCount: 1 }, { name: 'images', maxCount: 10 }
  // ]);

  // -----------------  сохранение нового эвента в БД  ---------------------
  router.post('/add-event-preview', [auth, upload.single('imagePreview')], async (req, res) => {
    // console.log('req: ', req.body)

    const data = {}

    for (let el in req.body) {
      data[el] = req.body[el]
    }
    delete data.lat
    delete data.lng

    if (req.file) {
      data.imagePreview = req.file.filename
    } else res.status(400).send({ message: 'Не добавлена фотография!' })

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

    data.gps = [req.body.lat, req.body.lng]

    const event = new Event(data)

    try {
      const title = await Event.findOne({ title: data.title })
      if (title) {
        res.status(400).send({
          message: `Название - ${data.title} уже есть в БД!`
        })
      }

      const newEvent = await event.save()
      if (newEvent) {
        res.status(200).send({
          message: `Эвент - ${data.title} успешно добавлен в БД`,
          event: newEvent
        })
      }
    } catch (e) {
      res.status(400).send({
        message: 'Ошибка при добавлении записи в БД',
        error: e.message
      })
    }
  })

  // -----------------  получение списка всех эвентов ---------------------
  router.get('/events/list', async (req, res) => {
    const events = await Event.find({}).sort({ date: 1 })
    if (events.length > 0) res.status(200).send(events)
    else res.status(200).send({ events, message: 'Нет эвентов в БД!' })
  })

  // -----------------  удаление эвента по id ---------------------
  router.delete('/event/delete/:id', auth, async (req, res) => {
    try {
      const event = await Event.deleteOne({ _id: req.params.id })
      if (event) res.send({ message: `Эвент ${event.name} успешно удален` })

      const dirName = req.body.dirId
      const dirPath = config.uploadPath + `/${dirName}`

      const deleteFolderRecursive = path => {
        if (fs.existsSync(path)) {
          fs.readdirSync(path).forEach((file, index) => {
            let curPath = path + '/' + file
            if (fs.lstatSync(curPath).isDirectory()) {
              deleteFolderRecursive(curPath)
            } else {
              fs.unlinkSync(curPath)
            }
          })
          fs.rmdirSync(path)
        }
      }
      deleteFolderRecursive(dirPath)
    } catch (error) {
      return res.send({ message: 'Ошибка при удалении', error })
    }
  })

  // -----------------  получени эвента по id для редактирования ---------------------
  router.get('/event/:id', async (req, res) => {
    const id = req.params.id
    try {
      const event = await Event.findById(id)
      if (event) res.send(event)
    } catch (error) {
      res.status(404).send({ message: `Не найдено ни одного эвента с id: ${id}` })
    }
  })

  return router
}

module.exports = createRouter
