//THIS IS ALL MOCK, FEEL FREE TO ADJUST.


var app = angular
  .module('TrueFoodReview.UberFactory',[])
  .factory('UberFactory', ['$http',UberFactory]);

function UberFactory($http){
  var uberRequest = {};
  uberRequest.post = function(){
    var data = {

    };
    data = JSON.stringify(data);
    $http.post('URL HERE',data);
  };
  return uberRequest;
}
