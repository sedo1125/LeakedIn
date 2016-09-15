var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

//Toilet schema
var ToiletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lat: {
    type: SchemaTypes.Double,
    required: true
  },
  long: {
    type: SchemaTypes.Double,
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
