var trueReview = require('./postgres.js');
var config = require('config');

// See http://www.yelp.com/developers/documentation/v2/search_api
var yelp = require("yelp").createClient({
  consumer_key: config.get("yelp.consumer_key"),
  consumer_secret: config.get("yelp.consumer_secret"),
  token: config.get("yelp.token"),
  token_secret: config.get("yelp.token_secret")
});

var yelpController = {
  getData: function(req, res, next) {
    yelp.search({
      term: "Restaurant",
      location: "Playa Vista, ca", 
      radius_filter: 20000
    },function(error, data) {
        if(error) {
          console.log(error);
        }
        var restaurants = data.businesses.map(function(item){
          // console.log(item);
          return {
            name: item.name,
            rating: item.rating,
            review_count: item.review_count,
            lat: item.location.coordinate.latitude,
            lon: item.location.coordinate.longitude,
            address: item.location.address[0],
            city: item.location.city,
            state: item.location.state_code,
            postal_code: item.location.postal_code
          };
        });
        // console.log(restaurants);
        trueReview.yelpDatabaseSync(restaurants);
    });
    next();
  } // closes getData
}; // closes scrapeController

module.exports = yelpController;
