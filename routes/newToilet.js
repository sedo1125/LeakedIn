var express = require('express');
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

function newToilet(req, res, next) {
  // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
  var name = req.body.name;
  var lat = req.body.lat;
  var long = req.body.long;
  var date = req.body.date;
  var who = req.body.who;
  var rating = req.body.rating;
  //call the create function for our database
  mongoose.model('toilet').create({
      name : name,
      lat : lat,
      long : long,
      date : date,
      who : who,
      rating : rating
  }, function (err, toilet) {
        if (err) {
            res.send(err);
        } else {
            //toilet has been created
            console.log('POST creating new toilet: ' + toilet);
            res.format({
                //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
              html: function(){
                  // If it worked, set the header so the address bar doesn't still say /adduser
                  res.location("toilet/user");
                  // And forward to success page
                  res.redirect("/user");
              },
              //JSON response will show the newly created toilet
              json: function(){
                  res.json(toilet);
              }
          });
        }
  })
}

module.exports = newToilet
