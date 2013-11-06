/// <reference path="../app.ts" />
/// <reference path="../services.ts" />
'use strict';
var Kleine;
(function (Kleine) {
    (function (controllers) {
        var MyController = (function () {
            function MyController($scope, myService) {
                this.$scope = $scope;
                this.myService = myService;
                $scope.message = myService.someMethod();
            }
            return MyController;
        })();
        controllers.MyController = MyController;
    })(Kleine.controllers || (Kleine.controllers = {}));
    var controllers = Kleine.controllers;
})(Kleine || (Kleine = {}));

// Remember to pass all the services used by the constructor of the Controller.
Kleine.registerController('MyController', ['$scope', 'myService']);
//# sourceMappingURL=MyController.js.map
