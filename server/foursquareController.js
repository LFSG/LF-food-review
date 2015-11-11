var request = require('request');
var trueReview = require('./postgres.js');
var Promise = require('bluebird');
var config = require('config');

var queryURL = `https://api.foursquare.com/v2/venues/explore?ll=33.97914,-118.41480705731&radius=8000&query=food&client_id=${config.get("foursquare.client_id")}&client_secret=${config.get("foursquare.client_secret")}&v=20151105`;

var fourSquareController = {
	getData: function(req, res, next) {
		request(queryURL, function(error, response, data) {
			if (error) {
				console.log(error);
			}
			var stats = JSON.parse(data).response.groups[0].items;
			// console.log(stats.venue.location);
			var restaurants = stats.map(function(stat) {
				return {
					name: stat.venue.name,
					rating: stat.venue.rating / 2,
					review_count: stat.venue.ratingSignals,
					lat: stat.venue.location.lat,
					lon: stat.venue.location.lon,
					address: stat.venue.location.address,
					city: stat.venue.location.city,
					state: stat.venue.location.state,
					postal_code: stat.venue.location.postalCode
			 	};
			});
			trueReview.fourSqDatabaseSync(restaurants, 'FoursquareModel');
			next();
		});
	}
};


    // get request in the url returns the huge data on the site
    // learn the parameters of the foursquare
    // brush up on async
module.exports = fourSquareController;
