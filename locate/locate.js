'use strict';

angular.module('locateapp.locate', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/locate', {
    templateUrl: 'locate/locate.html',
    controller: 'LocateCtrl'
  }).
  when('/details/:id', {
    templateUrl: 'locate/details.html',
    controller: 'DetailsCtrl'
  }).
  when('/add', {
    templateUrl: 'locate/add.html',
    controller: 'LocateCtrl'
  }).
  when('/edit/:id', {
    templateUrl: 'locate/edit.html',
    controller: 'EditCtrl'
  })
}])

.controller('LocateCtrl', ['$scope', '$firebaseArray', '$location', function($scope, $firebaseArray, $location) {
    refresh();

    $scope.searchApartments = function(){
      var city = $scope.city;
      
       //Define Firebase Collection
      var ref = new Firebase('https://mylocateapp.firebaseio.com/locate');

      var query={
      "city": city
    }
    $scope.locate = $firebaseArray(ref.orderByChild('city').equalTo(city));
    $scope.showLatest = false;
    $scope.showResults = true;

    }
  
  $scope.addApartments = function(){
    if($scope.title){ var title = $scope.title; } else { var title = null; }
    if($scope.email){ var email = $scope.email; } else { var email = null; }
    if($scope.phone){ var phone = $scope.phone; } else { var phone = null; }
    if($scope.street_address){ var street_address = $scope.street_address; } else { var street_address = null; }
    if($scope.city){ var city = $scope.city; } else { var city = null; }
    if($scope.state){ var state = $scope.state; } else { var state = null; }
    if($scope.pincode){ var pincode = $scope.pincode; } else { var pincode = null; }
    if($scope.bedrooms){ var bedrooms = $scope.bedrooms; } else { var bedrooms = null; }
    if($scope.price){ var price = $scope.price; } else { var price = null; }
    if($scope.description){ var description = $scope.description; } else { var description = null; }
    if($scope.image_url){ var image_url = $scope.image_url; } else { var image_url = 'http://www.techguywebsolutions.com/uploads/no-image.jpg'; }
  
     $scope.locate.$add({
      title: title,
      email: email,
      phone, phone,
      street_address: street_address,
          city: city,
          state: state,
          pincode: pincode,
          bedrooms: bedrooms,
          price: price,
          description: description,
          image_url: image_url,
          date: Firebase.ServerValue.TIMESTAMP
        }).then(function(ref){
            var id = ref.key();
            console.log('Added record with' + id);

            // Send message
            $scope.msg = 'You Apartment listing is added';

            clearFields();
        });
  }

  //Remove Apartment
  $scope.removeApartment = function(apartment, id){
    //Get DB Instance
    var ref = new Firebase('https://mylocateapp.firebaseio.com/locate/'+ id);
    ref.remove();

    $scope.msg="Apartment Removed";
    $location.path('/#locate');
  }

  function clearFields(){
    console.log('Clearing All Fields...');

    $scope.title = '';
    $scope.email = '';
    $scope.phone = '';
    $scope.bedrooms = '';
    $scope.price = '';
    $scope.description = '';
    $scope.street_address = '';
    $scope.city = '';
    $scope.state = '';
    $scope.pincode = '';
  }
  $scope.refresh = function(){
    refresh();
  } 

  function refresh(){
    //Define Firebase Collection
      var ref = new Firebase('https://mylocateapp.firebaseio.com/locate');

      $scope.locate = $firebaseArray(ref);
      $scope.showLatest = true;
      $scope.showResults = false;
  }
}])

.controller('DetailsCtrl', ['$scope', '$firebaseObject', '$routeParams', function($scope, $firebaseObject, $routeParams) {
//Get ID from URL
$scope.id = $routeParams.id;

//Get DB Instance
var ref = new Firebase('https://mylocateapp.firebaseio.com/locate/'+ $scope.id);

//Get Locate Data
var locateData = $firebaseObject(ref);

//Bind Data to Scope
locateData.$bindTo($scope, "data");

}])

.controller('EditCtrl', ['$scope', '$routeParams', '$firebaseObject', function($scope, $routeParams, $firebaseObject) {
  //Get ID from URL
$scope.id = $routeParams.id;

//Get DB Instance
var ref = new Firebase('https://mylocateapp.firebaseio.com/locate/'+ $scope.id);

//Get Locate Data
var locateData = $firebaseObject(ref);

//Bind Data to Scope
locateData.$bindTo($scope, "data");

  $scope.editApartment = function(apartment, id){
    //Get DB Instance
    var ref = new Firebase('https://mylocateapp.firebaseio.com/locate/'+ id);

    $scope.msg = "Apartment Updated";
  }
}])