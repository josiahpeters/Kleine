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
            function signup($scope) {
                var self = this;

                $scope.emailAddress = "josiahpeters@gmail.com";

                $scope.signup = function () {
                    var result = new kleine.models.signup();

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
//# sourceMappingURL=controllers.js.map
