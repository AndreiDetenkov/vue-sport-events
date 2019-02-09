const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

const events = require('./app/events');

const app = express();

const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(config.db.url + '/' + config.db.name, {
  useCreateIndex: true,
  useNewUrlParser: true
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Mongoose connected!');

  app.use('/event', events());

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
});
