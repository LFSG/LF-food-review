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
  //coordinates of selected restaurant**********************
  $scope.cookie = document.cookie;
  $scope.endLat = 34.062117;
  $scope.endLon = -118.350273;
  // *******************************************************

  //onClick function to oAuth into Uber*********************
  $scope.uberLogIn = function () {
    UberFactory.auth().then(function(data) {
      console.log(data);
    });
  }

  //onClick funtion to display Uber Price estimates*********

  //toggle variable to toggle the prices to show or hide after initial request
  $scope.toggle = false;
  //function for initial price request
  $scope.getPrices = function() {
    $scope.toggle = $scope.toggle ? false : true;
    UberFactory.prices($scope.endLat, $scope.endLon).then(function(uberPrices){
      $scope.price = uberPrices.data.prices;
      $scope.distance = uberPrices.data.prices[0].distance;
      $scope.time = Math.ceil(uberPrices.data.prices[0].duration/60);
      $scope.productID = uberPrices.data.prices.product_id;
    });
  };
  // ******************************************************

  //
  $scope.requestRide = function(id) {
    $scope.product_id = id;
    UberFactory.callACar($scope.endLat, $scope.endLon, $scope.product_id).then(function(rideDetails){
      console.log(rideDetails);
    })
  }
}
