var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var strategy = new Auth0Strategy({
    domain:       'sedo1125.auth0.com',
    clientID:     'O5bEWMEh0aYKX3sFjwmwQqJIu751m5UI',
    clientSecret: '0TD6KSlLOj1QADnulr7LM7Q6KG96WrovaCiigiPVzdXdFoSHQRVQsc-jsYT5abxk',
    callbackURL:  '/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// This is not a best practice, but we want to keep things simple for now
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = strategy;
