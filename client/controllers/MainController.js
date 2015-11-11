// var startCoords = require('./../map');

var app = angular
  .module('TrueFoodReview.MainController',['ui.router'])
  .controller('MainController', ['$scope', 'UberFactory', '$http', MainController])

function MainController($scope, UberFactory, $http) {
  //Map stuff===============================================
  $scope.map = {
    center: { latitude: 33.979050, longitude: -118.422818 },
    zoom: 10
  };
  $scope.options = {scrollwheel: false};
  $scope.coordsUpdates = 0;
  $scope.dynamicMoveCtr = 0;
  $scope.marker = {
    id: 0,
    coords: {
      latitude: 33.979050,
      longitude: -118.422818
    },
    options: {
      draggable: false
    }
  };
  $scope.markers = [
    {
      id: 0,
      coords: {
        latitude: 33.979050,
        longitude: -118.422818
      }
    },
    {
      id: 1,
      coords: {
        latitude: 34.979250,
        longitude: -119.423818
      }
    }
  ];
//UBER STUFF =============================================
  $scope.productID = '';
  $scope.endLat = '';
  $scope.endLon = '';
  $scope.time = '';
  $scope.price = '';
  $scope.getPrices = function(){
    UberFactory.prices().success(function(data) {
      $scope.price = data.prices[0].estimate;
      $scope.time = `${Math.ceil(data.prices[0].duration/60)} minutes away`;
      $scope.productID = data.prices.product_id;
    });
  }
}
