/// <reference path='../../Scripts/typings/angularjs/angular.d.ts' />
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts' />
/// <reference path='../../Scripts/typings/angularjs/angular-route.d.ts' />
'use strict';
// Create and register modules
var modules = ['Kleine.controllers', 'Kleine.directives', 'Kleine.filters', 'Kleine.services'];
modules.forEach(function (module) {
    return angular.module(module, []);
});
angular.module('Kleine', modules);

// Url routing
angular.module('Kleine').config([
    '$routeProvider'
]);

var Kleine;
(function (Kleine) {
    /**
    * Register new controller.
    *
    * @param className
    * @param services
    */
    function registerController(className, services) {
        if (typeof services === "undefined") { services = []; }
        var controller = 'Kleine.controllers.' + className;
        services.push(Kleine.controllers[className]);
        angular.module('Kleine.controllers').controller(controller, services);
    }
    Kleine.registerController = registerController;

    /**
    * Register new filter.
    *
    * @param className
    * @param services
    */
    function registerFilter(className, services) {
        if (typeof services === "undefined") { services = []; }
        var filter = className.toLowerCase();
        services.push(function () {
            return (new Kleine.filters[className]()).filter;
        });
        angular.module('Kleine.filters').filter(filter, services);
    }
    Kleine.registerFilter = registerFilter;

    /**
    * Register new directive.
    *
    * @param className
    * @param services
    */
    function registerDirective(className, services) {
        if (typeof services === "undefined") { services = []; }
        var directive = className[0].toLowerCase() + className.slice(1);
        services.push(function () {
            return new Kleine.directives[className]();
        });
        angular.module('Kleine.directives').directive(directive, services);
    }
    Kleine.registerDirective = registerDirective;

    /**
    * Register new service.
    *
    * @param className
    * @param services
    */
    function registerService(className, services) {
        if (typeof services === "undefined") { services = []; }
        var service = className[0].toLowerCase() + className.slice(1);
        services.push(function () {
            return new Kleine.services[className]();
        });
        angular.module('Kleine.services').factory(service, services);
    }
    Kleine.registerService = registerService;
})(Kleine || (Kleine = {}));
//# sourceMappingURL=app.js.map
