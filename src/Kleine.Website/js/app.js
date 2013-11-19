'use strict';

var modules = ['ngRoute', 'ui.router', 'ngResource', 'kleine.controllers', 'kleine.directives', 'kleine.services'];

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
                //url: '/{name}/{id}/invite',
                url: '/invite',
                templateUrl: 'partials/invite/invite.html',
                controller: function ($scope, profile)
                {
                    $scope.theme = {
                        title: "Invitation"
                    };
                    // get the current profile for each invite state change
                },
                resolve: {
                    profile: 'profile',
                    start: function (profile)
                    {
                        profile.fetchProfile();
                    }
                },
                abstract: true,
            })
            .state('invite.organic', {

                url: '',
                views: {
                    'invite': {
                        templateUrl: 'partials/invite/invite.organic.html',
                        controller: function ($scope, $state, $http, $stateParams, profile)
                        {
                            $scope.theme.title = "You are Invited!";
                            $scope.profile = profile.current();

                            $scope.confirm = function ()
                            {
                                //$scope.invitation.Name = $scope.Name;
                                //$scope.invitation.EmailAddress = $scope.EmailAddress;

                                profile.update($scope.profile);

                                var promise = $http.post('/api/profile/', profile.current()).then(function (response)
                                {
                                    $state.go('invite.confirmation');
                                });
                            }
                        }
                    }
                }
            })
            .state('invite.confirmation', {
                url: '/confirmation?email&code',
                views: {
                    'invite': {
                        templateUrl: 'partials/invite/invite.confirmation.html',
                        controller: function ($scope, $state, $http, $stateParams, profile)
                        {
                            $scope.theme.title = "Confirmation Code Sent";
                            $scope.profile = profile.current();

                            // they didn't fill out the previous page or they haven't sent their confirmation code
                            if ($stateParams.code == null && $scope.profile.EmailAddress == null)
                            {
                                $state.go('invite.organic');
                            }
                            // grab a code form the url if its passed VIA email // or we've got a default one here
                            $scope.code = $stateParams.code || "canada123";

                            $scope.confirm = function ()
                            {
                                profile.confirmation($scope.code).then(function (response)
                                {
                                    if (response)
                                        $state.go('invite.finish');
                                });                                
                            }

                            if ($stateParams.code != null)
                                $scope.confirm();
                        }
                    }
                }
            })
            .state('invite.finish', {
                url: '/start-guessing?code',
                views: {
                    'invite': {
                        templateUrl: 'partials/invite/invite.finish.html',
                        controller: function ($scope, $state, $stateParams, profile)
                        {
                            $scope.profile = profile.current();
                            $scope.theme.title = "Welcome " + $scope.profile.Name + ",";

                            $scope.startGuessing = function ()
                            {
                                $state.go('guess.start', { id: $stateParams.id, name: $stateParams.name });
                            }
                        }
                    }
                }
            })
            .state('guess', {
                //url: '/{name}/{id}/guess',
                url: '/guess',
                templateUrl: 'partials/guess/guess.html',
                controller: function ($scope, guess)
                {
                    $scope.guess = guess.current;
                },
                resolve: {
                    profile: 'profile',
                    guess: 'guess',
                    start: function (profile, guess)
                    {
                        profile.fetchProfile();                        
                        guess.fetchGuess(1, profile.current().Id);
                    }
                },
                abstract: true,
            })
            .state('guess.start', {
                url: '/start',
                views: {
                    'guess': {
                        templateUrl: 'partials/guess/guess.start.html',
                    }
                }

            })
            .state('guess.gender', {
                url: '/gender',
                views: {
                    'guess': {
                        templateUrl: 'partials/guess/guess.gender.html',
                        controller: function ($scope, $stateParams)
                        {
                            $scope.chooseGender = function (gender)
                            {
                                $scope.results.gender = gender;
                            }
                        }
                    }
                }
            })
            .state('guess.date', {
                url: '/date',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess/guess.date.html', controller: 'guess' }
                }
            })
            .state('guess.time', {
                url: '/time',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess/guess.time.html', controller: 'guess' }
                }
            })
            .state('guess.weight', {
                url: '/weight',
                views: {
                    'guess': {
                        templateUrl: 'partials/guess/guess.weight.html',
                        //controller: 'guess'
                        controller: function ($scope, $state)
                        {
                        },
                    }
                }
            })
            .state('guess.length', {
                url: '/length',
                controller: 'guess',
                views: {
                    'guess': {
                        templateUrl: 'partials/guess/guess.length.html',
                        controller: 'guess'
                    }
                }
            })
            .state('guess.finish', {
                url: '/finish',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess/guess.finish.html' }
                }
            });
    }])
    .factory('profile', ['$http', function ($http)
    {
        // cache current profile
        var currentProfile = {};

        return {
            // get current user by session
            fetchProfile: function ()
            {
                var promise = $http.get('/api/profile').then(function (response)
                {
                    if (response.data.length > 0)
                        currentProfile = response.data;
                });

                return promise;
            },
            current: function ()
            {
                return currentProfile;
            },
            update: function (property, value)
            {
                currentProfile[property] = value;
            },
            confirmation: function(code)
            {
                var promise = $http.post('/api/profile/confirmation', { confirmationCode: code }).then(function (response)
                {
                    if (response.data.EmailAddress.length > 0)
                    {
                        currentProfile = response.data;
                        return true;
                    }
                    else return false;
                });
                return promise;
            }
            
            //updateProfileValue: function(property, value)
        };
    }])
    .factory('guess', ['$http', function ($http)
    {
        // cache current profile
        var currentGuess = {};

        return {
            // get current user by session
            fetchGuess: function (dueDateId, profileId)
            {
                var promise = $http.get('/api/guess/' + dueDateId).then(function (response)
                {
                    if (response.data.length > 0)
                        currentGuess = response.data;
                });

                return promise;
            },
            current: function ()
            {
                return currentGuess;
            },
            update: function (property, value)
            {
                currentGuess[property] = value;
            },
            //confirmation: function (code)
            //{
            //    var promise = $http.post('/api/guess/confirmation', { confirmationCode: code }).then(function (response)
            //    {
            //        if (response.data.EmailAddress.length > 0)
            //        {
            //            currentProfile = response.data;
            //            return true;
            //        }
            //        else return false;
            //    });
            //    return promise;
            //}

            //updateProfileValue: function(property, value)
        };
    }])
    .run(function ($rootScope, $state, $stateParams)
    {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        //console.log("run");
    });
//.controller('controllers.invite', ['$scope', '$location', '$stateParams'])

//angular.module('kleine.services', [])
//    .factory('profile', ['$http', function ($http)
//    {
//        var currentProfile =
//            {
//                Id: null,
//                Name: null,
//                EmailAddress: null,
//            };

//        return {
//            getProfile: function()
//            {
//                return currentProfile;
//            },
//            updateProfileValue: function(property, value)
//            {
//                currentProfile[property] = value;
//                console.log(currentProfile);
//            }
//        };
//    }]);

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
          '    <div class="slider">' +
          '        <label class="min">{{ minValue + " " + label }}</label>' +
          '        <label class="max">{{ maxValue + " " + label }}</label>' +
          '    </div></div>',
          scope: {
              name: '=',
          },
          controller: function ($scope)
          {
              //$scope.$parent.results.weight = 12
              //$scope.$parent
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

              scope.label = attr.label || "";


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

                  var minimumValue = (left / pixelPerValue + minValue);
                  var maximumValue = (left / pixelPerValue + minValue + range);

                  if (scope.name == "time")
                  {
                      if (minimumValue < .04)
                      {
                          minimumValue = 0;
                          maximumValue = range;
                      }
                      scope.minValue = convertHoursToTimeString(minimumValue);
                      scope.maxValue = convertHoursToTimeString(maximumValue);
                  }
                  else
                  {
                      scope.minValue = minimumValue.toFixed(1);
                      scope.maxValue = maximumValue.toFixed(1);
                  }

                  scope.value = scope.minValue;

                  setTargetValue([scope.minValue, scope.maxValue]);
              }

              function convertHoursToTimeString(timeValue)
              {
                  timeValue = timeValue % 24;
                  var time = "am";

                  if (timeValue > 12)
                      time = "pm";

                  var hour = Math.floor(timeValue % 12);

                  if (hour == 0)
                      hour = 12;

                  var minutes = Math.floor((timeValue % 1) * 60);



                  if (minutes < 10)
                      minutes = '0' + minutes;

                  return hour + ':' + minutes + ' ' + time;
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
                  var value;
                  if (target.length > 1)
                      value = scope.$parent[target[0]][target[1]];
                  else
                      value = scope.$parent[target];

                  if (scope.name == "time")
                  {
                      var minTime = "";
                      if (value.length > 0)
                          minTime = value[0];
                      var date = new Date("1/1/1 " + minTime);

                      value = date.getHours() + date.getMinutes() / 60;
                  }

                  return value;
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



.directive('calendar', function ($document, $window, $parse, $compile)
{
    return {
        restrict: 'E',
        //templateUrl: 'partials/slider.html',
        template: '<table class="calendar">' +
'    <thead>    ' +
'        <tr>' +
'            <th ng-repeat="day in weekdays">{{ day }}</th>' +
'        </tr>' +
'    </thead>' +
'    <tbody>' +
'        <tr ng-repeat="week in weeks">' +
'            <td ng-repeat="day in week.days" class="day" ng-click="setDate(day)">' +
'               <div  ng-class="{\'expected\':day.expected,\'active\':isSelected(day)}">' +
'        <span class="month">{{ getMonth(day) }}</span>' +
'        {{ getDate(day) }}' +
'               </div>' +
'            </td>' +
'        </tr>' +
'    </tbody>' +
'</table>',
        scope: {
            name: '=',
            test: '='
        },
        controller: function ($scope)
        {
        },
        link: function (scope, element, attr, $com)
        {
            var target = (attr.target || "value").split('.');

            var monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

            scope.getDate = function (day)
            {
                return day.date.getDate();
            }
            scope.getMonth = function (day)
            {
                return monthNamesShort[day.date.getMonth()];
            }
            scope.setDate = function (day)
            {
                scope.selectedDate = day.date;

                var value = (day.date.getMonth() + 1) + '/' + day.date.getDate() + '/' + day.date.getFullYear();
                setTargetValue(value);
            }

            scope.selectedDate = new Date(getTargetValue());

            scope.isSelected = function (day)
            {
                return scope.selectedDate.valueOf() == day.date.valueOf();
            }

            var weeks = [];

            var dayIndex = 0;

            for (var i = 0; i < 6; i++)
            {

                var week = { days: [] };

                for (var j = 0; j < 7; j++)
                {
                    var newDate = new Date(expectedYear, expectedMonth, calendarStartDay + dayIndex);

                    var day = { date: newDate, expected: false };

                    if (newDate.getTime() == expectedDate.getTime())
                        day.expected = true;

                    week.days.push(day);

                    dayIndex++;
                }

                weeks.push(week);
            }

            scope.weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            scope.weeks = weeks;

            function setTargetValue(value)
            {
                if (target.length > 1)
                    scope.$parent[target[0]][target[1]] = value;
                else
                    scope.$parent[target] = value;
            }

            function getTargetValue()
            {
                var value;
                if (target.length > 1)
                    value = scope.$parent[target[0]][target[1]];
                else
                    value = scope.$parent[target];

                return value;
            }

            function get(target, properties)
            {
                if (properties.length > 1)
                {
                    return get(target[properties[0]], properties.slice(1));
                }
                return target[properties[0]];
            }
        }
    };

});
