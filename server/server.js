var express = require('express');
var app = express();
var path = require('path');
var yelpController = require('./yelpController').getData;
var dataController = require('./dataController');
var foursquareController = require('./foursquareController').getData;
var passport = require('passport');
var uberStrategy = require('passport-uber');
var config = require('config');
var bodyParser = require('body-parser');
var request = require('request');

var ACCESSTOKEN;


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new uberStrategy(
  {
    authorizationURL: 'https://login.uber.com/oauth/authorize',
    clientID: config.get("uber.clientID"),
    clientSecret: config.get("uber.secret"),
    callbackURL: 'http://localhost:3000/auth/uber/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    ACCESSTOKEN = accessToken;
    console.log(ACCESSTOKEN);
    console.log(profile);
    return done(false, profile);
  }
));

app.use(express.static(path.join(__dirname, './../')));
app.use(bodyParser.urlencoded());
app.use(passport.initialize());
app.use(passport.session());
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});
//data endpoint to get merged data
app.get('/data', yelpController, foursquareController, function(req,res) {
  res.end();
});

//data endpoint to get yelp data
app.get('/yelp', function(req,res) {
  res.send('ok');
});

// endpoint to make requests to uber
app.get('/uber', function(req,res) {
  request({url:
    `https://api.uber.com/v1/estimates/price?start_latitude=33.979050&start_longitude=-118.422818&end_latitude=34.06261462&end_longitude=-118.34798813&server_token=${config.get("uber.serverToken")}`,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var estimates = JSON.parse(body);
        console.log(estimates);
      }
    }
  });
});

//data endpoint to get foursquare data
app.get('/foursquare', function(req,res) {
  res.send('ok');
});

app.get('/auth/uber',
  passport.authenticate('uber'));

app.get('/auth/uber/callback',
  passport.authenticate('uber', { failureRedirect: '/fail' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(3000);

module.exports = app;
