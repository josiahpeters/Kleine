/// <reference path="../app.ts" />
/// <reference path="../services.ts" />

'use strict';

module Kleine.controllers {

    export class MyController implements IController {
        constructor (private $scope, private myService) {
            $scope.message = myService.someMethod();

        }
    }

}

// Remember to pass all the services used by the constructor of the Controller.
Kleine.registerController('MyController', ['$scope', 'myService']);
