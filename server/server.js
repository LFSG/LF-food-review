var express = require('express');
var app = express();
var cors = require('cors');
var path = require('path');
var yelpController = require('./yelpController').getData;
var dataController = require('./dataController');
var foursquareController = require('./foursquareController').getData;
var passport = require('passport');
var uberStrategy = require('passport-uber');
var config = require('config');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var request = require('request');
var findYelpData = require('./findYelpData');
var uberURL= 'https://sandbox-api.uber.com/v1/';
var ACCESSTOKEN;

passport.serializeUser(function(user, done) {
  done(null, user.uuid);
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
    return done(false, profile);
  }
));

app.use(express.static(path.join(__dirname, './../')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('dog'));
app.use(require('express-session')({ secret: 'dog' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());


app.get('/', /*yelpController, foursquareController, */function(req, res) {
  console.log(req.user, 'hello');
  res.sendFile(path.join(__dirname, '../client/index.html'));
});


//data endpoint to get merged data
app.get('/login', function(req,res) {
  console.log(req.session.user);
  res.send(!!req.user);
});


//data endpoint to get yelp data
app.get('/yelp', findYelpData);

//data endpoint to get foursquare data
app.get('/foursquare', function(req,res) {
  res.send('ok');
});

app.get('/auth/uber',
  passport.authenticate('uber', {scope: ['profile', 'request']}));

app.get('/auth/uber/callback',
  passport.authenticate('uber', { failureRedirect: '/foursquare' }),
  function(req, res) {
    req.session.user = req.user;
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// endpoint to make request to uber for price estimates
app.post('/uber', function(req, res) {
  request.get({
    url : uberURL + 'estimates/price',
    qs : {
      server_token : config.get("uber.serverToken"),
      start_latitude : req.body.start_latitude,
      start_longitude : req.body.start_longitude,
      end_latitude : req.body.end_latitude,
      end_longitude : req.body.end_longitude
    }
  }, function(err, response, body){
    if(err){
      return res.json(err);
    }
    res.send(body);
  });
});

//endpoint to make request to Uber for a car. Can only run if product_id provided from the price estimate request
app.post('/callacar', function(req, res) {
  request.post({
    url: uberURL +'requests',
    headers: {
      'Authorization': 'Bearer ' + ACCESSTOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      product_id: req.body.product_id,
      start_latitude : req.body.start_latitude,
      start_longitude : req.body.start_longitude,
      end_latitude : req.body.end_latitude,
      end_longitude : req.body.end_longitude,
    })
  }, function(err, response, body){
    console.log(response);
    if(err){
      console.log(err);
      return res.json(err);
    }
    console.log(JSON.parse(body));
    res.send(body);
  });
});

app.listen(3000);

module.exports = app;
