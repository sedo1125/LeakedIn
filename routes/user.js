var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

var getUserProfile = require('./getUserProfile');
var newToilet = require('./newToilet');
var validate = require('./validate');
var viewBathroom = require('./viewBathroom');
var editBathroom = require('./editBathroom');
var editBathroomSave = require('./editBathroomSave');
var deleteBathroom = require('./deleteBathroom');
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

/* GET users profile. */
router.get('/', ensureLoggedIn, getUserProfile);

/* GET New toilet page. */
router.get('/new', ensureLoggedIn, function(req, res) {
    res.render('toilet/new', { title: 'Add New Bathroom',
                                user: req.user
                             });
});

//adding new bathroom rating
router.post('/new', ensureLoggedIn, newToilet);

// route middleware to validate :id
router.param('id', validate);

// viewing it
router.route('/:id')
  .get(ensureLoggedIn, viewBathroom);

router.route('/:id/edit')
	//GET the individual toilet by Mongo ID
	.get(ensureLoggedIn, editBathroom)
	//PUT to update a toilet by ID
	.put(ensureLoggedIn, editBathroomSave)
	//DELETE a toilet by ID
	.delete(ensureLoggedIn, deleteBathroom);

module.exports = router;
