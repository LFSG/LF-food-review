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

app.use(express.static(path.join(__dirname, './../client/')));
app.use(bodyParser.urlencoded());
app.use(passport.initialize());
app.use(passport.session());
app.get('/', function(req, res) {
  res.render('index.html');
});
//data endpoint to get merged data
app.get('/data', yelpController, foursquareController, function(req,res) {
  res.end();
});

//data endpoint to get yelp data
app.get('/yelp', function(req,res) {
  res.send('ok');
});

//endpoint to make requests to uber
// app.get('/uber', function(req,res) {
//   request({url:GOES HERE, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       var activitiesRes = JSON.parse(body);
//       activitiesRes.forEach(obj => migrateActivities.syncFunction(obj));
//       migrateActivities.updateAverage(activitiesRes[0]);
//     }
// });

//data endpoint to get foursquare data
app.get('/foursquare', function(req,res) {
  res.send('ok');
});

app.get('/auth/uber',
  passport.authenticate('uber'));

app.get('/auth/uber/callback',
  passport.authenticate('uber', { failureRedirect: '/data' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(3000);

module.exports = app;
