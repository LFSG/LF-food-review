var app = angular
  .module('TrueFoodReview.UberFactory',['ui.router'])
  .factory('UberFactory', ['$http', UberFactory]);

function UberFactory($http){
  var uberRequest = {};
  //direct the user to oAuth into Uber to use the features
  uberRequest.auth = function() {
    return $http.get('http://127.0.0.1:3000/auth/uber');
  };
  //will return a promise that then contains price estimate object from Uber
  uberRequest.prices = function(lat, lon) {
    var coordinates = {
      end_latitude: lat,
      end_longitude: lon
    };
    coordinates = JSON.stringify(coordinates);
    return $http.post('/uber', coordinates);
  };
  //will return a promise that will call a car for the user
  uberRequest.callACar = function(lat, lon, id) {
    var data = {
      end_latitude: lat,
      end_longitude: lon,
      product_id: id
    };
    data = JSON.stringify(data);
    return $http.post('/callacar', data);
  };
  return uberRequest;
}
