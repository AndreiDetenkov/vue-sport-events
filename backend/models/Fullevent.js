const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FullEventSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Events',
    require: true
  },
  description: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  }
});

const FullEvent = mongoose.model('FullEvent', FullEventSchema);

exports.module = FullEvent;
