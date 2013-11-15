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
                controller: function ($scope)
                {
                    $scope.results = {
                        weight: 0,
                        length: 0,
                        date: 0,
                        gender: 0,
                        time: 0,
                    };
                    
                },
                abstract: true,
            })
            .state('guess.start', {
                url: '/start',
                templateUrl: 'partials/guess.html',

            })
            .state('guess.gender', {
                url: '/gender',
                views: {
                    'guess': {
                        templateUrl: 'partials/guess.gender.html',
                        controller: function ($scope, $stateParams)
                        {
                            console.log($scope.results);
                            $scope.chooseMale = function()
                            {
                                $scope.results.gender = "Male";
                            }
                            $scope.chooseFemale = function ()
                            {
                                $scope.results.gender = "Female";
                            }
                        }
                    }
                },
                data:
                {
                }
            })
            .state('guess.date', {
                url: '/date',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess.date.html', controller: 'guess' }
                }
            })
            .state('guess.time', {
                url: '/time',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess.time.html', controller: 'guess' }
                }
            })
            .state('guess.weight', {
                url: '/weight',
                views: {
                    'guess': {
                        templateUrl: 'partials/guess.weight.html',
                        //controller: 'guess'
                        controller: function ($scope, $state)
                        {
                            //console.log($scope.results);
                            //console.log($scope);
                            //console.log($scope.value);
                            console.log("weight", $scope);
                            //$scope.$watch('value', function (e)
                            //{
                            //    console.log("done?", e);
                            //    //$scope.$parent.gender = $scope.value;
                            //});
                        },
                    }
                }
            })
            .state('guess.length', {
                url: '/length',
                controller: 'guess',
                views: {
                    'guess': {
                        templateUrl: 'partials/guess.length.html',
                        controller: 'guess'
                        //controller: function ($scope, $state)
                        //{
                        //    $scope.length = 0;
                        //    console.log($scope);
                        //    $scope.$watch('value', function ()
                        //    {
                        //        //$scope.$parent.gender = $scope.value;
                        //        console.log("change");
                        //    });
                        //},
                    }
                }
            })
            .state('guess.finish', {
                url: '/finish',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess.finish.html' }
                }
            });
    }])
    .run(function ($rootScope, $state, $stateParams)
    {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });
//.controller('controllers.invite', ['$scope', '$location', '$stateParams'])

angular.module('kleine.controllers', [])
    .controller('guess', ['$scope', '$state', function ($scope, $state)
    {
        $scope.length = 0;
        console.log($scope);
        console.log($state);


        //function ($scope, $state)
        //{

        //    console.log($scope);
        //    $scope.$watch('value', function ()
        //    {
        //        //$scope.$parent.gender = $scope.value;
        //        console.log("change");
        //    });
        //},
        //console.log($scope);
        //console.log($state);

        //$scope.slider

        //$scope.toOunces(value)
        //{
        //    return 
        //}
    }]);
angular.module('myApp.filters', []).
  filter('lbsToOunces', ['version', function (version)
  {
      return function (value)
      {
          return (value / 16).toFixed(1);
      }
  }]);

angular.module('kleine.services', [])
    .factory('guess', [function ()
    {

    }
    ]);

angular.module('kleine.directives', []).
  directive('slider', function ($document, $window, $parse)
  {
      return {
          restrict: 'E',
          //templateUrl: 'partials/slider.html',
          template: '<div class="range-slider"><input type="hidden" ng-model="value" />' +
          '    <div class="slider">{{ value }}' +
          '        <label class="min">{{ minValue.toFixed(1) + " " + label }}</label>' +
          '        <label class="max">{{ maxValue.toFixed(1) + " " + label }}</label>' +
          '    </div></div>',
          scope: {
              name: '=',
              test: '='
          },
          controller: function ($scope)
          {
              //$scope.$parent.results.weight = 12
              //$scope.$parent
              console.log();
          },
          link: function (scope, element, attr)
          {
              //element.addClass('range-slider');
              element = angular.element(element.children()[0]);

              //console.log(scope)

              var startX = 0, startY = 0, x = 0, y = 0;
              var minValue = parseFloat(attr.min);
              var maxValue = parseFloat(attr.max);
              var sliderMaxPx = 1140;
              var pixelPerValue = 100;
              var range = parseFloat(attr.range);
              var sliderElement = angular.element(element.children()[1]);

              angular.element($window).bind('resize', resize);


              sliderElement.css({
                  position: 'absolute',
                  cursor: 'pointer',
                  left: '0px'
              });

              scope.name = attr.name;

              scope.label = attr.label || "lbs";

              element.css({
                  position: 'relative',
                  cursor: 'pointer'
              });


              sliderElement.on('mousedown', function (event)
              {
                  // Prevent default dragging of selected content
                  event.preventDefault();
                  startX = event.pageX - x;
                  $document.on('mousemove', mousemove);
                  $document.on('mouseup', mouseup);
              });

              // call setup with a delay to prevent conflicting scope.$apply race condition
              setTimeout(setup, 1);
              // setup function
              function setup()
              {
                  resize();
                  scope.$apply(calculateValue());
              }

              function mousemove(event)
              {
                  x = event.pageX - startX;

                  if (x < 0)
                      x = 0;
                  if (x > sliderMaxPx)
                      x = sliderMaxPx;

                  sliderElement.css({
                      left: x + 'px'
                  });

                  scope.$apply(calculateValue());
              }

              function calculateValue()
              {
                  var left = parseFloat(sliderElement.css("left"));

                  if (left == 0)
                      left = 1;

                  scope.minValue = left / pixelPerValue + minValue;
                  scope.maxValue = left / pixelPerValue + minValue + range;

                  scope.value = scope.minValue;
                  scope.$parent.results["weight"] = scope.value;
                  //scope.$emit("sliderChange");
              }

              function resize(event)
              {

                  var width = range / (maxValue - minValue);

                  sliderElement.css({ width: element[0].offsetWidth * width + 'px' });

                  sliderMaxPx = element[0].offsetWidth - sliderElement[0].offsetWidth;

                  pixelPerValue = sliderMaxPx / (maxValue - minValue);
              }

              function mouseup()
              {
                  $document.unbind('mousemove', mousemove);
                  $document.unbind('mouseup', mouseup);
              }
          }
      };

  });