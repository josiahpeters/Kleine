define(["filters"], function (filters)
{

    angular.module('Kleine.filters', []).
      filter('interpolate', ['version', function (version)
      {
          return function (text)
          {
              return String(text).replace(/\%VERSION\%/mg, version);
          }
      }]);

});