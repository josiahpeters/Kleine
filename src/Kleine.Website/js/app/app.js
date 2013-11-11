/// <reference path='../../Scripts/typings/angularjs/angular.d.ts' />
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts' />
/// <reference path='../../Scripts/typings/angularjs/angular-route.d.ts' />
var kleine;
(function (kleine) {
    'use strict';

    //var modules = ['app.controllers'];
    //modules.forEach((module) => angular.module(module, []));
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

    (function (models) {
        var signup = (function () {
            function signup() {
            }
            return signup;
        })();
        models.signup = signup;
    })(kleine.models || (kleine.models = {}));
    var models = kleine.models;

    (function (controllers) {
        var welcome = (function () {
            function welcome($scope) {
            }
            return welcome;
        })();
        controllers.welcome = welcome;
        var signup = (function () {
            function signup($scope) {
                var self = this;

                $scope.emailAddress = "josiahpeters@gmail.com";

                $scope.signup = function () {
                    var result = new models.signup();

                    result.emailAddress = $scope.emailAddress;

                    self.signup(result);
                };
            }
            //signup(): void
            //{
            //	console.log("test");
            //}
            signup.prototype.signup = function (result) {
                console.log(result);
            };
            return signup;
        })();
        controllers.signup = signup;
    })(kleine.controllers || (kleine.controllers = {}));
    var controllers = kleine.controllers;
})(kleine || (kleine = {}));
//# sourceMappingURL=app.js.map
