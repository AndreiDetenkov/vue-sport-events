const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  sponsor: {
    type: String,
    required: true
  },
  sponsorLink: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  dirId: {
    type: String,
    required: true
  },
  imagePreview: {
    type: String,
    required: true
  }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
