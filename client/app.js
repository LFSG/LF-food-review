var app = angular
  .module('myApp',[
    'ui.router',
    'TrueFoodReview.YelpFactory',
    'TrueFoodReview.UberFactory',
    'TrueFoodReview.MainController',
    'uiGmapgoogle-maps',
    'ui.map',
    'ui.event'
  ]);
  
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
