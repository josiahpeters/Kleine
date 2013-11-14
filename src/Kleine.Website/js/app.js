'use strict';

var modules = ['ngRoute', 'ui.router', 'ngResource', 'kleine.controllers', 'kleine.directives'];

var app = angular.module('kleine', modules)
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider)
    {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('welcome', {
                url: '/',
                templateUrl: 'partials/welcome.html'
            })
            .state('invite', {
                url: '/invite/:id/:name/:email',
                templateUrl: 'partials/invite.html',
                controller: 'invite'
            })
            .state('guess', {
                url: '/guess/:id/:name',
                templateUrl: 'partials/guess.html',
                controller: 'guess',
            })
            .state('guess.gender', {
                url: '/gender',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess.gender.html' }
                }
            })
            .state('guess.date', {
                url: '/date',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess.date.html' }
                }
            })
            .state('guess.time', {
                url: '/time',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess.time.html' }
                }
            })
            .state('guess.weight', {
                url: '/weight',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess.weight.html' }
                }
            })
            .state('guess.length', {
                url: '/length',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess.length.html' }
                }
            })
            .state('guess.finish', {
                url: '/finish',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess.finish.html' }
                }
            });
    }]);
//.controller('controllers.invite', ['$scope', '$location', '$stateParams'])

angular.module('kleine.controllers', [])
    .controller('guess', [function ()
    {

    }]);

angular.module('kleine.directives', []).
  directive('slider', function ()
  {
      return { 
          restrict: 'AE', 
          //templateUrl: 'partials/slider.html',
template: '<div class="range-slider">' +
'    <input type="hidden" ng-model="value" />' +
'      slide' +
'    <div class="slider">' +
'        <label class="min">{{ minValue + " " + label }}</label>' +
'        <label class="max">{{ minValue + " " + label }}</label>' +
'    </div>' +
'</div>',
          scope: {
              label: '=label',
              min: '=minValue',
              max: '=maxValue',
              //maxLabel: "Max"
          },
          link: function(scope, element, attrs)
          {

          }
      };
  });

angular.module('dragModule', []).
  directive('myDraggable', function ($document)
  {
      return function (scope, element, attr)
      {
          var startX = 0, startY = 0, x = 0, y = 0;

          element.css({
              position: 'relative',
              border: '1px solid red',
              backgroundColor: 'lightgrey',
              cursor: 'pointer'
          });

          element.on('mousedown', function (event)
          {
              // Prevent default dragging of selected content
              event.preventDefault();
              startX = event.pageX - x;
              startY = event.pageY - y;
              $document.on('mousemove', mousemove);
              $document.on('mouseup', mouseup);
          });

          function mousemove(event)
          {
              y = event.pageY - startY;
              x = event.pageX - startX;
              element.css({
                  top: y + 'px',
                  left: x + 'px'
              });
          }

          function mouseup()
          {
              $document.unbind('mousemove', mousemove);
              $document.unbind('mouseup', mouseup);
          }
      }
  });