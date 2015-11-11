var Sequelize = require('sequelize');
var express = require('express');
var config = require('config');

var sequelize = new Sequelize(config.get('db.name'), config.get('db.user'), config.get('db.password'), {
  host: 'localhost',
  dialect: 'postgres'
});

// HERE'S THE ONE TABLE WITH ALL DATA
var YelpModel = sequelize.define('yelps', {
  name: {type: Sequelize.STRING, unique: true},
  rating: {type: Sequelize.FLOAT},
  review_count: {type: Sequelize.INTEGER},
  lat: {type: Sequelize.FLOAT},
  lon: {type: Sequelize.FLOAT},
  address: {type: Sequelize.STRING},
  city: {type: Sequelize.STRING},
  state: {type: Sequelize.STRING},
  postal_code: {type: Sequelize.STRING}
});

var FoursquareModel = sequelize.define('foursquare', {
  name: {type: Sequelize.STRING, unique: true},
  rating: {type: Sequelize.FLOAT},
  review_count: {type: Sequelize.INTEGER},
  lat: {type: Sequelize.FLOAT},
  lon: {type: Sequelize.FLOAT},
  address: {type: Sequelize.STRING},
  city: {type: Sequelize.STRING},
  state: {type: Sequelize.STRING},
  postal_code: {type: Sequelize.STRING}
});

sequelize.authenticate().then(function(err, data) {
  console.log('Connected with PostgreSQL on non-test');
}).catch(function(err) {
  console.log(err.message);
});

sequelize.sync();

module.exports = {
  yelpModel: YelpModel,
  foursquareModel: FoursquareModel,
  yelpDatabaseSync: function(data)  {
    // console.log(data);
    data.forEach(function(elem, i) {
      YelpModel.create(elem);
    });
  },
  fourSqDatabaseSync: function(data)  {
    data.forEach(function(elem, i) {
      FoursquareModel.create(elem);
      });
  },
};
