'use strict';

// Declare app level module which depends on views, and components
angular.module('locateapp', [
  'ngRoute',
  'locateapp.locate',
  'firebase'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/locate'});
}]);
