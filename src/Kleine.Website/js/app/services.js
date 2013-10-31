define(["services"], function (services)
{

    /* Services */


    // Demonstrate how to register services
    // In this case it is a simple value service.
    angular.module('Kleine.services', []).
      value('version', '0.1');

});