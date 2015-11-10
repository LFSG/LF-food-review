var Sequelize = require('sequelize');
var express = require('express');

//initialize test database
var sequelize = new Sequelize('foodtest', 'test', 'mocha', {
  host: 'localhost',
  dialect: 'postgres'
});

//set-up yelp test model
var PlaceYelp = sequelize.define('test_yelp', {
  name: {type: Sequelize.STRING, unique: true},
  rating: {type: Sequelize.FLOAT},
  review_count: {type: Sequelize.INTEGER},
  lat: {type: Sequelize.FLOAT},
  long: {type: Sequelize.FLOAT},
  address: {type: Sequelize.STRING},
  city: {type: Sequelize.STRING},
  state: {type: Sequelize.STRING},
  postal_code: {type: Sequelize.INTEGER}
});

var Foursquare = sequelize.define('test_foursquare', {
  name: {type: Sequelize.STRING, unique: true},
  rating: {type: Sequelize.FLOAT},
  review_count: {type: Sequelize.INTEGER},
  lat: {type: Sequelize.FLOAT},
  long: {type: Sequelize.FLOAT},
  address: {type: Sequelize.STRING},
  city: {type: Sequelize.STRING},
  state: {type: Sequelize.STRING},
  postal_code: {type: Sequelize.INTEGER}
});

sequelize.authenticate().then(function(err, data) {
  console.log('Connected with PostgreSQL');
}).catch(function(err) {
  console.log(err.message);
});


function addYelp(data) {
  PlaceYelp.sync().then(function() {
    var result = {
      name: 'test',
      rating: 1,
      review_count: 1,
      lat: 1,
      long: 1,
      address: '123 Fake Street',
      city: 'LA',
      state: 'CA',
      postal_code: 01234
      };
      PlaceYelp.create(result);
  });
}

function findYelp(data) {
  PlaceYelp.sync().then(function() {
    var result = {
      name: 'test',
      rating: 1,
      review_count: 1,
      lat: 1,
      long: 1,
      address: '123 Fake Street',
      city: 'LA',
      state: 'CA',
      postal_code: 01234
      };
      PlaceYelp.create(result);
  });
}

  foursquare: function(data)  {
    Foursquare.sync().then(function() {
      data.forEach(function(item) {
        var result = {
          name: item.name,
          rating: item.rating,
          review_count: item.review_count,
          lat: item.lat,
          long: item.long,
          address: item.address,
          city: item.city,
          state: item.state,
          postal_code: item.postal_code
        };
        Foursquare.create(result).then(function() {
          console.log("FOUR DONE");
        });
      });
    });
  },
};
