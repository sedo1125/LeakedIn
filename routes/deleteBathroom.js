var express = require('express');
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST


function deleteBathroom(req, res){
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
}

module.exports = deleteBathroom;
