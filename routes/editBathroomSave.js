var express = require('express');
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST


function editBathroomSave(req, res) {
    // Get our REST or form values. These rely on the "name" attributes
    var name = req.body.name;
    var lat = req.body.lat;
    var long = req.body.long;
    var date = req.body.date;
    var rating = req.body.rating;
    var who = req.body.who;
    var comments = req.body.comments;
    var address = req.body.address;
    console.log('here')
    //find the document by ID
    mongoose.model('toilet').findById(req.id, function (err, toilet) {
        //update it
        toilet.update({
          name : name,
          lat : lat,
          long : long,
          date : date,
          who : who,
          rating : rating,
          comments : comments,
          address : address
        }, function (err, toiletID) {
          if (err) {
              res.send("There was a problem updating the information to the database: " + err);
          }
          else {
                  //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                  res.format({
                      html: function(){
                           res.redirect("/user");
                     },
                     //JSON responds showing the updated values
                    json: function(){
                           res.json(toilet);
                     }
                  });
           }
        })
    });
}

module.exports = editBathroomSave
