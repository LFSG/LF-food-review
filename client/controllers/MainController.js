// var startCoords = require('./../map');

var app = angular
  .module('TrueFoodReview.MainController',['ui.router'])
  .controller('MainController', ['$scope', 'UberFactory', 'YelpFactory', '$http', MainController]);
  

function MainController($scope, UberFactory, YelpFactory, $http) {
  //Map stuff===============================================
  $scope.lat = "0";
  $scope.lng = "0";
  $scope.accuracy = "0";
  $scope.error = "";
  $scope.model = { myMap: undefined };
  $scope.locationsList = [];
  $scope.uberLat;
  $scope.uberLng;

  $scope.myMarkers = [];

  $scope.showResult = function () {
      return $scope.error == "";
  }

  $scope.mapOptions = {
      center: new google.maps.LatLng($scope.lat, $scope.lng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      clickable: true
  };

  $scope.showPosition = function (position) {
      $scope.lat = position.coords.latitude;
      $scope.lng = position.coords.longitude;
      $scope.accuracy = position.coords.accuracy;
      $scope.$apply();

      var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
      $scope.model.myMap.setCenter(latlng);
      $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng}));

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

  //YELP STUFF =============================================
  $scope.yelpLocations = [];
  $scope.yelpName = '';
  $scope.yelpRating = '';
  $scope.yelpReviewCount = '';
  $scope.yelpAddress = '';
  $scope.yelpCity = '';
  $scope.yelpState = '';
  $scope.yelpZip = '';
  $scope.yelpData


  $scope.getYelpLocations = function(){
    YelpFactory.getLocations().then(function (data) {
      var yelpData = data.data;
      // console.log( 'yelp data is ', yelpData);
      $scope.model.myMap = new google.maps.Map(document.getElementById('map'), $scope.mapOptions)
      $scope.getLocation();
      
      yelpData.forEach(function (elem, i) {
       // console.log(elem.lat, elem.lon);
        var latlng = new google.maps.LatLng(elem.lat, elem.lon);

        var placeObj = {
          position: latlng,
          latitude: elem.lat,
          longitude: elem.lon,
          map: $scope.model.myMap,
          idKey: yelpData[i].id,
          title: yelpData[i].name,
          animation: google.maps.Animation.DROP
        }

        var marker = new google.maps.Marker(placeObj);
        var infowindow = new google.maps.InfoWindow({
          content: yelpData[i].name
        })

        google.maps.event.addListener(marker, 'click', function(event) {
          infowindow.open($scope.model.myMap, marker)
          $scope.endLat = elem.lat;
          $scope.endLong = elem.lon;
          console.log(event, elem.id);
        })

        google.maps.event.addListener($scope.model.myMap, 'click', function(event) {
          infowindow.close();
        })
        

        $scope.myMarkers.push(marker);
        $scope.yelpLocations.push([placeObj.title, placeObj.idKey]);

      })

      console.log("scope.myMarkers = ", $scope.myMarkers[0]);


    })
  };

}