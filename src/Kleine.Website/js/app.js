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
                            $scope.chooseMale = function ()
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
                            //console.log("weight", $scope);
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
          '        <label class="min">{{ minValue + " " + label }}</label>' +
          '        <label class="max">{{ maxValue + " " + label }}</label>' +
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

              var startX = 0, x = 0, y = 0;
              var minValue = parseFloat(attr.min);
              var maxValue = parseFloat(attr.max);
              var sliderMaxPx = 1140;
              var pixelPerValue = 100;
              var range = parseFloat(attr.range);
              var sliderElement = angular.element(element.children()[1]);

              var target = (attr.target || "value").split('.');

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
                  var targetValue = getTargetValue();
                  if (targetValue.length > 0)
                      targetValue = targetValue[0];
                  scope.$apply(calculateValue(targetValue));
              }

              function mousemove(event)
              {
                  x = event.pageX - startX;

                  var startingX = parseFloat(sliderElement.css("left"));

                  if (x < 0)
                      x = 0;
                  if (x > sliderMaxPx)
                      x = sliderMaxPx;

                  sliderElement.css({
                      left: x + 'px'
                  });

                  scope.$apply(calculateValue());
              }

              function calculateValue(value)
              {
                  if (value !== undefined)
                  {
                      if (value < minValue)
                          value = minValue;

                      if (value > maxValue)
                          value = maxValue - range;

                      var leftValue = (value - minValue) * pixelPerValue;

                      sliderElement.css({
                          left: leftValue + 'px'
                      });

                      x = leftValue;
                  }

                  var left = parseFloat(sliderElement.css("left"));

                  if (left == 0)
                      left = 1;

                  scope.minValue = (left / pixelPerValue + minValue).toFixed(1);
                  scope.maxValue = (left / pixelPerValue + minValue + range).toFixed(1);

                  scope.value = scope.minValue;

                  setTargetValue([scope.minValue, scope.maxValue]);
              }

              function setTargetValue(value)
              {
                  if (target.length > 1)
                      scope.$parent[target[0]][target[1]] = value;
                  else
                      scope.$parent[target] = value;
              }

              function getTargetValue()
              {
                  if (target.length > 1)
                      return scope.$parent[target[0]][target[1]];
                  else
                      return scope.$parent[target];
              }

              function get(target, properties)
              {
                  if (properties.length > 1)
                  {
                      return get(target[properties[0]], properties.slice(1));
                  }
                  return target[properties[0]];
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

  })
.directive('calendar', function ($document, $window, $parse)
{
    return {
        restrict: 'E',
        //templateUrl: 'partials/slider.html',
        template: '<div class="calendar"><input type="hidden" ng-model="value" /></div>',
        scope: {
            name: '=',
            test: '='
        },
        controller: function ($scope)
        {
        },
        link: function (scope, element, attr)
        {
            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            var dayNamesMin = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

            var weeksBeforeExpectedDate = 3;
            var weeksAfterExpectedDate = 3;

            var expectedDate = new Date("12/16/2013");

            var expectedYear = expectedDate.getFullYear();
            var expectedMonth = expectedDate.getMonth();
            var expectedMonthDate = expectedDate.getDate();
            var expectedDayOfWeek = expectedDate.getDay();

            var calendarStartDay = expectedMonthDate;

            if (expectedDayOfWeek > 0)
                calendarStartDay = expectedMonthDate - expectedDayOfWeek;

            // start the calendar 2 weeks before the expected date
            calendarStartDay -= weeksBeforeExpectedDate * 7;

            var calendarStartDate = new Date(expectedYear, expectedMonth, calendarStartDay);

            var week;
            var month;

            var calendar = angular.element(element.children()[0]);

            var days = angular.element('<div class="days"></div>')

            for (var i = 0; i < 7; i++)
            {
                days.append('<div class="day">' + dayNamesShort[i] + '</div>');
            }

            calendar.append(days);

            for (var i = 0; i < (weeksBeforeExpectedDate * 7 + weeksAfterExpectedDate * 7) ; i++)
            {
                var newDate = new Date(expectedYear, expectedMonth, calendarStartDay + i);
                var item = angular.element('<div class="day"></div>');

                var prefix = "";

                if (month != newDate.getMonth())
                {
                    prefix = monthNamesShort[newDate.getMonth()];
                    month = newDate.getMonth();
                }

                item.append(getHtml(prefix, newDate));

                if (newDate.getTime() == expectedDate.getTime())
                {
                    item.addClass("expected");
                    //angular.element(item.children()[0]).append("Expected Date");
                }


                if (newDate.getDay() == 0)
                {
                    calendar.append(week);
                    week = angular.element('<div class="week"></div>');
                }

                week.append(item);
            }

            calendar.append(week);

            function getHtml(prefix, date)
            {
                if (prefix.length > 0)
                    return angular.element('<a href="#"><span class="prefix">' + prefix + '</span> ' + date.getDate() + '</a>');
                else
                    return angular.element('<a href="#">' + date.getDate() + '</a>');
            }
        }
    };

})
.directive('hours', function ($document, $window, $parse)
{
    return {
        restrict: 'E',
        //templateUrl: 'partials/slider.html',
        template: '<div id="hours" class="hours">',
        scope: {
            name: '=',
            test: '='
        },
        controller: function ($scope)
        {
        },
        link: function (scope, element, attr)
        {
            
        }
    };

});