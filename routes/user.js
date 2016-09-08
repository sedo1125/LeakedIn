var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

var getToilets = function(req, res, next) {
  mongoose.model('toilet').find({}, function(err, toilets){
    if (err) {
      return console.error(err);
    } else {
      res.format({
        html: function() {
          res.render('user', {
            title: 'All toilets',
            "toilets": toilets,
            user: req.user
          });
        },
        json: function() {
          res.json(toilets);
        }
      });
    }
  });
};

/* GET users profile. */
router.get('/', ensureLoggedIn, getToilets)

module.exports = router;
