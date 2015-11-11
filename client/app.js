var app = angular
  .module('myApp',[
    'ui.router',
    'TrueFoodReview.UberFactory',
    'TrueFoodReview.MainController',
    'uiGmapgoogle-maps'
<<<<<<< HEAD
    ]);
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

=======
  ]);
>>>>>>> 246c427a6ef6e84a116f460b5d5b3a2174bbea93
app.config(configFunction);

function configFunction($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: './client/partials/home.html',
      controller: 'MainController'
    });
}
