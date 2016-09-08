var mongoose = require('mongoose');

//Toilet schema
var ToiletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  long: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  who: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

//Export
module.exports = mongoose.model('toilet', ToiletSchema);
