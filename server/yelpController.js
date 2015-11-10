var trueReview = require('./postgres.js');

// See http://www.yelp.com/developers/documentation/v2/search_api
var yelp = require("yelp").createClient({
  consumer_key: ,
  consumer_secret:,
  token: ,
  token_secret:
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
        trueReview.getTables();
        //trueReview.yelpDatabaseSync(restaurants, 'YelpModel');
    });
  } // closes getData
} // closes scrapeController

module.exports = yelpController;
