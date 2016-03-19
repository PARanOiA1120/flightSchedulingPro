'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])



.controller('geoLocController', function($scope, $http){
  $scope.currentLoc = {
    lat : '',
    lon : ''
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.position = position;
        $scope.currentLoc.lat = $scope.position.coords.latitude;
        $scope.currentLoc.lon = $scope.position.coords.longitude;
      });
    });

    $scope.airports = [];
    $http.get('/airportlist').then(function(response){
      console.log("I got the data I requestes");
      $scope.airports = response.data;
    });

    $scope.level = '';
    $scope.result = 0;

    $scope.getAirport = function(){

      if($scope.level > 2 || $scope.level < 0){
        alert("Please enter 1 or 2 only.")
      }
      else {
        $scope.minDis = 99999999;

/*
        $scope.currentLoc.lat = 42.3744;
        $scope.currentLoc.lon = -71.1169;
*/

        var targetAirport = -1;
        var radius = 3959; //radius of earth in miles

        for (var i = 0; i < $scope.airports.length; i++) {
          var dLat = ($scope.airports[i].lat - $scope.currentLoc.lat) * Math.PI / 180;
          var dLon = ($scope.airports[i].lon - $scope.currentLoc.lon) * Math.PI / 180;

          var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos($scope.airports[i].lat * Math.PI / 180) * Math.cos($scope.currentLoc.lat * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var distance = radius * c;

          if (distance < $scope.minDis && $scope.airports[i].level >= $scope.level) {
            $scope.minDis = distance;
            targetAirport = i;
          }
        }

        $scope.airportCode = $scope.airports[targetAirport].code;
        $scope.result = 1;
      }
    }
  }
})
