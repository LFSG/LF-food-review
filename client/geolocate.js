// Grab the user's geolocation
navigator.geolocation.getCurrentPosition(function(pos) {
      lat = pos.coords.latitude;
      longi = pos.coords.longitude;
      // longi = pos.coords.longitude;
      // $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      // $scope.loading.hide();
      console.log("latitude: " +lat);
      console.log("longitude: " +longi);
    },function(error) {
        console.log(error.message);
      });