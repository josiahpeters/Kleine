/// <reference path="../app.ts" />
/// <reference path="../services.ts" />
'use strict';
var Kleine;
(function (Kleine) {
    (function (controllers) {
        var WelcomeController = (function () {
            function WelcomeController($scope, myService) {
                this.$scope = $scope;
                this.myService = myService;
                $scope.message = myService.someMethod();
            }
            return WelcomeController;
        })();
        controllers.WelcomeController = WelcomeController;
    })(Kleine.controllers || (Kleine.controllers = {}));
    var controllers = Kleine.controllers;
})(Kleine || (Kleine = {}));

// Remember to pass all the services used by the constructor of the Controller.
Kleine.registerController('WelcomeController', ['$scope', 'myService']);
//# sourceMappingURL=Welcome.js.map
