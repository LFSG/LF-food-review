var app = angular
  .module('TrueFoodReview.UberFactory',['ui.router'])
  .factory('UberFactory', ['$http', UberFactory]);

function UberFactory($http){
  var uberRequest = {};
  uberRequest.auth = function() {
    return $http.get('http://localhost:3000/auth/uber');
  };
  uberRequest.prices = function() {
    return $http.get('http://localhost:3000/uber');
  };
  uberRequest.geolocate = function() {
    navigator.geolocation.getCurrentPosition(function(pos) {
      lat = pos.coords.latitude;
      longi = pos.coords.longitude;
      console.log("latitude: " +lat);
      console.log("longitude: " +longi);
      uberRequest.lat = lat;
      uberRequest.lon = longi;
    },function(error) {
        console.log(error.message);
      });
  } 
  return uberRequest;
}

  // messageUpdate.post = function(message,name){
  //   var data = {
  //     message: message,
  //     created_by: name
  //   }
  //   data = JSON.stringify(data);
  //   $http.post('http://slack-server.elasticbeanstalk.com/messages',data)
  // }
