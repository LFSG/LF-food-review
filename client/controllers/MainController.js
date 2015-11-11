// var startCoords = require('./../map');

var app = angular
  .module('TrueFoodReview.MainController',['ui.router'])
  .controller('MainController', ['$scope', 'UberFactory', '$http', MainController])

function MainController($scope, UberFactory, $http) {
  //Map stuff===============================================
  $scope.lat = "0";
  $scope.lng = "0";
  $scope.accuracy = "0";
  $scope.error = "";
  $scope.model = { myMap: undefined };
  $scope.myMarkers = [];

  $scope.showResult = function () {
      return $scope.error == "";
  }

  $scope.mapOptions = {
      center: new google.maps.LatLng($scope.lat, $scope.lng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  $scope.showPosition = function (position) {
      $scope.lat = position.coords.latitude;
      $scope.lng = position.coords.longitude;
      $scope.accuracy = position.coords.accuracy;
      $scope.$apply();

      var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
      $scope.model.myMap.setCenter(latlng);
      $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));
  }

  $scope.showError = function (error) {
      switch (error.code) {
          case error.PERMISSION_DENIED:
              $scope.error = "User denied the request for Geolocation."
              break;
          case error.POSITION_UNAVAILABLE:
              $scope.error = "Location information is unavailable."
              break;
          case error.TIMEOUT:
              $scope.error = "The request to get user location timed out."
              break;
          case error.UNKNOWN_ERROR:
              $scope.error = "An unknown error occurred."
              break;
      }
      $scope.$apply();
  }

  $scope.getLocation = function () {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
      }
      else {
          $scope.error = "Geolocation is not supported by this browser.";
      }
  }
  $scope.getLocation();
  
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
