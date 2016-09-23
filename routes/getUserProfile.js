var express = require('express');
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

function getUserProfile(req, res, next) {
  mongoose.model('toilet').find({}, function(err, toilets){
    if (err) {
      return console.error(err);
    } else {
      res.format({
        html: function() {
          res.render('toilet/user', {
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
}

module.exports = getUserProfile
