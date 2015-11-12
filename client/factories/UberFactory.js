var app = angular
  .module('TrueFoodReview.UberFactory',['ui.router'])
  .factory('UberFactory', ['$http', UberFactory]);

function UberFactory($http){
  var uberRequest = {};
  //direct the user to oAuth into Uber to use the features
  uberRequest.auth = function() {
    return $http.get('http://localhost:3000/auth/uber');
  };
  //will return a promise that then contains price estimate object from Uber
  uberRequest.prices = function(startLat, startLon, endLat, endLon) {
    var coordinates = {
      start_latitude: startLat,
      start_longitude: startLon,
      end_latitude: endLat,
      end_longitude: endLon
    };
    console.log(coordinates);
    coordinates = JSON.stringify(coordinates);
    return $http.post('/uber', coordinates);
  };
  //will return a promise that will call a car for the user
  uberRequest.callACar = function(startLat, startLon, endLat, endLon, id) {
    var data = {
      start_latitude: startLat,
      start_longitude: startLon,
      end_latitude: endLat,
      end_longitude: endLon,
      product_id: id
    };
    data = JSON.stringify(data);
    return $http.post('/callacar', data);
  };
  return uberRequest;
}
