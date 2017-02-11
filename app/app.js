'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.version',
  'myApp.controllers.CSVDataController',
  'myApp.services.CSVDataService',
  'myApp.services.restApiService',
  'myApp.services.interControllerCommunication',
  'papa-promise'

]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
