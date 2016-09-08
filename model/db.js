var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://user:password@ds019976.mlab.com:19976/leaked');
mongoose.connection.once('open', function() {
  console.log('Connected!')
});
