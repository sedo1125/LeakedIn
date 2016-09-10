var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

var getToilets = function(req, res, next) {
  mongoose.model('toilet').find({}, function(err, toilets){
    if (err) {
      return console.error(err);
    } else {
      res.format({
        html: function() {
          res.render('toilet/user', {
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

var postToilet = function(req, res, next) {
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
            //Blob has been created
            console.log('POST creating new blob: ' + toilet);
            res.format({
                //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
              html: function(){
                  // If it worked, set the header so the address bar doesn't still say /adduser
                  res.location("toilet/user");
                  // And forward to success page
                  res.redirect("/user");
              },
              //JSON response will show the newly created blob
              json: function(){
                  res.json(toilet);
              }
          });
        }
  })
}

/* GET New toilet page. */
router.get('/new', ensureLoggedIn, function(req, res) {
    res.render('toilet/new', { title: 'Add New Toilet',
                        user: req.user
                        });
});

router.post('/new', ensureLoggedIn, postToilet);

module.exports = router;
