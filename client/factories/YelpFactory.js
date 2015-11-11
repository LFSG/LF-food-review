var app = angular
  .module('TrueFoodReview.YelpFactory',['ui.router'])
  .factory('YelpFactory', ['$http', YelpFactory]);

function YelpFactory($http) {
	var yelpRequest = {}

		yelpRequest.getLocations = function(){
		 	return $http.get('http://localhost:3000/yelp');
		}
		return yelpRequest;
}