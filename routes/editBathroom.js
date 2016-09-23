var express = require('express');
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

function editBathroom(req, res) {
    //search for the toilet within Mongo
    mongoose.model('toilet').findById(req.id, function (err, toilet) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            //Return the toilet
            console.log('GET Retrieving ID: ' + toilet._id);
            res.format({
                //HTML response will render the 'edit.jade' template
                html: function(){
                       res.render('toilet/edit', {
                          title: 'Toilet' + toilet._id,
                          "toilet" : toilet
                      });
                 },
                 //JSON response will return the JSON output
                json: function(){
                       res.json(toilet);
                 }
            });
        }
    });
}


module.exports = editBathroom
