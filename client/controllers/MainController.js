// var startCoords = require('./../map');

var app = angular
  .module('TrueFoodReview.MainController',['ui.router'])
  .controller('MainController', ['$scope', 'UberFactory', 'YelpFactory', '$http', MainController]);
  

function MainController($scope, UberFactory, YelpFactory, $http) {
  //Map stuff===============================================
  $scope.map = {
    center: { latitude: 33.979050, longitude: -118.422818 },
    zoom: 10
  };
  $scope.options = { scrollwheel: false };
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

  //YELP STUFF =============================================
  $scope.yelpLocations;
  $scope.yelpName = '';
  $scope.yelpRating = '';
  $scope.yelpReviewCount = '';
  $scope.yelpAddress = '';
  $scope.yelpCity = '';
  $scope.yelpState = '';
  $scope.yelpZip = '';

  $scope.getYelpLocations = function(){
    YelpFactory.getLocations().then(function (data) {
      var yelpData = data.data;
      // console.log( 'yelp data is ', yelpData);
      
      
      yelpData.forEach(function (elem, i) {
        var placeObj = {
          idKey: yelpData[i].id,
          coords: {
            latitude: yelpData[i].lat.toString(),
            longitude: yelpData[i].lon.toString()
          },
          name: yelpData[i].name
        }
        $scope.markers.push(placeObj);
      })

       console.log("scope.markers = ", $scope.markers);
      // $scope.yelpLocations = temp;
      // $scope.marker.coords.latitude = yelpData[1].lat;
      // $scope.marker.coords.longitude = yelpData[1].lon;

    })
  }


}





