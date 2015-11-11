var app = angular
  .module('TrueFoodReview.HomeController',[
  	'ngRoute',
  	'uiGmapgoogle-maps'
  	])
  .controller('TrueFoodReview', ['$scope', 'UberFactory', HomeController])


function HomeController($scope, UberFactory) {

}
