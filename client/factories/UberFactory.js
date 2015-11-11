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
