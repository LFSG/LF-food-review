var app = angular
  .module('myApp',[
    'ui.router',
    'TrueFoodReview.YelpFactory',
    'TrueFoodReview.UberFactory',
    'TrueFoodReview.MainController',
    'uiGmapgoogle-maps'
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
