/// <reference path="app.ts" />
var kleine;
(function (kleine) {
    'use strict';

    (function (controllers) {
        var welcome = (function () {
            function welcome($scope) {
            }
            return welcome;
        })();
        controllers.welcome = welcome;
        var signup = (function () {
            function signup($scope, $routeParams, profileService) {
                this.$routeParams = $routeParams;
                this.profileService = profileService;
                var self = this;

                $scope.emailAddress = "josiahpeters@gmail.com";

                //console.log($routeParams);
                $scope.signup = function () {
                    var result = new kleine.models.signup();

                    result.emailAddress = $scope.emailAddress;

                    self.signup(result);
                };
            }
            signup.prototype.signup = function (result) {
                this.profileService.createProfile(result, function (success) {
                    console.log(success);
                });
            };
            return signup;
        })();
        controllers.signup = signup;
        var guess = (function () {
            function guess($scope, $route, profileService) {
                this.$route = $route;
                this.profileService = profileService;
            }
            return guess;
        })();
        controllers.guess = guess;
        var invite = (function () {
            function invite($scope, $location, $stateParams, profileService) {
                this.$location = $location;
                this.$stateParams = $stateParams;
                this.profileService = profileService;
                $scope.confirm = function () {
                    console.log($stateParams);
                    var guessUrl = '/guess/' + $stateParams.id + '/' + $stateParams.name;
                    console.log(guessUrl);
                    $location.path(guessUrl);
                };
            }
            return invite;
        })();
        controllers.invite = invite;
    })(kleine.controllers || (kleine.controllers = {}));
    var controllers = kleine.controllers;
})(kleine || (kleine = {}));
//# sourceMappingURL=controllers.js.map
