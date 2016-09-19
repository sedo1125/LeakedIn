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

//var getToilets =
/* GET users profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  mongoose.model('toilet').find({}, function(err, toilets){
    if (err) {
      return console.error(err);
    } else {
      res.format({
        html: function() {
          res.render('toilet/user', {
            title: 'All Bathrooms',
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
});

//var postToilet =

/* GET New toilet page. */
router.get('/new', ensureLoggedIn, function(req, res) {
    res.render('toilet/new', { title: 'Add New Toilet',
                        user: req.user
                        });
});

router.post('/new', ensureLoggedIn, function(req, res, next) {
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
});


// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('toilet').findById(id, function (err, toilet) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            console.log(toilet);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next();
        }
    });
});

router.route('/:id')
  .get(ensureLoggedIn, function(req, res) {
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
  });

  router.route('/:id/edit')
  	//GET the individual toilet by Mongo ID
  	.get(ensureLoggedIn, function(req, res) {
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
  	})
  	//PUT to update a toilet by ID
  	.put(ensureLoggedIn, function(req, res) {
  	    // Get our REST or form values. These rely on the "name" attributes
  	    var name = req.body.name;
        var lat = req.body.lat;
        var long = req.body.long;
        var date = req.body.date;
        var rating = req.body.rating;
        var who = req.body.who;
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
              rating : rating
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
  	})
  	//DELETE a toilet by ID
  	.delete(ensureLoggedIn, function (req, res){
  	    //find toilet by ID
  	    mongoose.model('toilet').findById(req.id, function (err, toilet) {
  	        if (err) {
  	            return console.error(err);
  	        } else {
  	            //remove it from Mongo
  	            toilet.remove(function (err, toilet) {
  	                if (err) {
  	                    return console.error(err);
  	                } else {
  	                    //Returning success messages saying it was deleted
  	                    console.log('DELETE removing ID: ' + toilet._id);
  	                    res.format({
  	                        //HTML returns us back to the main page, or you can create a success page
  	                          html: function(){
  	                               res.redirect("/user");
  	                         },
  	                         //JSON returns the item with the message that is has been deleted
  	                        json: function(){
  	                               res.json({message : 'deleted',
  	                                   item : toilet
  	                               });
  	                         }
  	                      });
  	                }
  	            });
  	        }
  	    });
  	});

module.exports = router;
