var lat;
var longi;

// Grab the user's geolocation
navigator.geolocation.getCurrentPosition(function(pos) {
      lat = pos.coords.latitude;
      longi = pos.coords.longitude;

      // longi = pos.coords.longitude;
      // $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      // $scope.loading.hide();

      console.log("latitude: " +lat);
      console.log("longitude: " +longi);

    }, function(error) {
        console.log(error.message);
      });



var app = angular
  .module('myApp',[
    'ui.router',
    'TrueFoodReview.HomeController',
    'uiGmapgoogle-maps'

    ])
    // make map controller:
  .controller('mapController', ['$scope', function($scope) {
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

    ]

  }])

// $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

app.config(configFunction);

function configFunction($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('state1', {
      url: '/',
      templateUrl: './partials/home.html',
      controller: 'HomeController'
    });

}
