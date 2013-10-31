define(["directives"], function (directives)
{
    angular.module('Kleine.directives', []).
      directive('appVersion', ['version', function (version)
      {
          return function (scope, elm, attrs)
          {
              elm.text(version);
          };
      }]);

});