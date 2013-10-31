'use strict';


// Declare app level module which depends on filters, and services
angular.module('Kleine', [
  'ngRoute',
  'Kleine.filters',
  'Kleine.services',
  'Kleine.directives',
  'Kleine.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/welcome.html', controller: 'Welcome'});
  $routeProvider.when('/guess', {templateUrl: 'partials/guess.html', controller: 'Guess'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
