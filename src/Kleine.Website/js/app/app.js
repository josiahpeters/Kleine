/// <reference path='../../Scripts/typings/angularjs/angular.d.ts' />
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts' />
/// <reference path='../../Scripts/typings/angularjs/angular-route.d.ts' />
var kleine;
(function (kleine) {
    'use strict';

    var app = angular.module('app', []).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/', { templateUrl: '/partials/welcome.html', controller: 'kleine.controllers.welcome' }).when('/signup', { templateUrl: '/partials/signup.html', controller: 'kleine.controllers.signup' }).otherwise({ redirectTo: '/' });
        }
    ]).controller('controllers.signup', []);
})(kleine || (kleine = {}));

var kleine;
(function (kleine) {
    'use strict';
})(kleine || (kleine = {}));
//# sourceMappingURL=app.js.map
