var express = require('express');
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

function viewBathroom(req, res) {
  mongoose.model('toilet').findById(req.id, function (err, toilet) {
    if (err) {
      console.log('GET Error: There was a problem retrieving: ' + err);
    } else {
      console.log('GET Retrieving ID: ' + toilet._id);
      res.format({
        html: function(){
            res.render('toilet/show', {
              "toilet" : toilet
            });
        },
        json: function(){
            res.json(toilet);
        }
      });
    }
  });
}

module.exports = viewBathroom
