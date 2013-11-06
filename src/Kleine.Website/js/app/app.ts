/// <reference path='../../Scripts/typings/angularjs/angular.d.ts' />
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts' />
/// <reference path='../../Scripts/typings/angularjs/angular-route.d.ts' />

'use strict';

// Create and register modules
var modules = ['Kleine.controllers', 'Kleine.directives', 'Kleine.filters', 'Kleine.services'];
modules.forEach((module) => angular.module(module, []));
angular.module('Kleine', modules);

// Url routing
angular.module('Kleine').config(['$routeProvider',
    //function routes($routeProvider: ng.IRouteProvider) {
    //    $routeProvider
    //        .when('/', {
    //            templateUrl: 'partials/Welcome.html',
	//			controller: 'Kleine.controllers.MyController'
    //        })
    //        .otherwise({
    //            redirectTo: '/'
    //        });
    //}
]);

module Kleine {
    export module controllers {}
    export module directives {}
    export module filters {}
    export module services {}

    export interface IController {}
    export interface IDirective {
        restrict: string;
        link($scope: ng.IScope, element: JQuery, attrs: ng.IAttributes): any;
    }
    export interface IFilter {
        filter (input: any, ...args: any[]): any;
    }
    export interface IService {}

    /**
     * Register new controller.
     *
     * @param className
     * @param services
     */
    export function registerController (className: string, services = []) {
		var controller = 'Kleine.controllers.' + className;
		services.push(Kleine.controllers[className]);
		angular.module('Kleine.controllers').controller(controller, services);
    }

    /**
     * Register new filter.
     *
     * @param className
     * @param services
     */
    export function registerFilter (className: string, services = []) {
        var filter = className.toLowerCase();
        services.push(() => (new Kleine.filters[className]()).filter);
        angular.module('Kleine.filters').filter(filter, services);
    }

    /**
     * Register new directive.
     *
     * @param className
     * @param services
     */
    export function registerDirective (className: string, services = []) {
        var directive = className[0].toLowerCase() + className.slice(1);
        services.push(() => new Kleine.directives[className]());
        angular.module('Kleine.directives').directive(directive, services);
    }

    /**
     * Register new service.
     *
     * @param className
     * @param services
     */
    export function registerService (className: string, services = []) {
        var service = className[0].toLowerCase() + className.slice(1);
        services.push(() => new Kleine.services[className]());
        angular.module('Kleine.services').factory(service, services);
    }
}
