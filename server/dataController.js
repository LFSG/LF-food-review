var trueReview = require('./postgres.js');
var Sequelize = require('sequelize');
var config = require('config');
var YelpModel = require('./../server/postgres').yelpModel;
var foursquareModel = require('./../server/postgres').foursquareModel;


var sequelize = new Sequelize(config.get('db.name'), config.get('db.user'), config.get('db.password'), {
  host: 'localhost',
  dialect: 'postgres'
});

var Aggregator = sequelize.define('aggregator', {
  name: {type: Sequelize.STRING},
  rating: {type: Sequelize.FLOAT},
  review_count: {type: Sequelize.INTEGER},
  lat: {type: Sequelize.FLOAT},
  lon: {type: Sequelize.FLOAT},
  address: {type: Sequelize.STRING},
  city: {type: Sequelize.STRING},
  state: {type: Sequelize.STRING},
  postal_code: {type: Sequelize.INTEGER}
});

sequelize.authenticate().then(function(err, data) {
  console.log('Connected with PostgreSQL - test');
}).catch(function(err) {
  console.log(err);
});

var combine = function() {
  YelpModel
  .findAll()
  .then(function(result) {
    result.forEach(function(elem, i) {
      var yelpRating = elem.dataValues.rating;
      var yelpReviews = elem.dataValues.review_count;
      foursquareModel.findOne({
        where: {
          name: elem.dataValues.name
        }
      })
      .then(function (result) {
        console.log(result);
        Aggregator.create({
          name: elem.dataValues.name,
          rating: {type: Sequelize.FLOAT},
          review_count: {type: Sequelize.INTEGER},
          lat: {type: Sequelize.FLOAT},
          lon: {type: Sequelize.FLOAT},
          address: {type: Sequelize.STRING},
          city: {type: Sequelize.STRING},
          state: {type: Sequelize.STRING},
          postal_code: {type: Sequelize.INTEGER}
      });
      });
    });
  });
};

module.exports = combine;
