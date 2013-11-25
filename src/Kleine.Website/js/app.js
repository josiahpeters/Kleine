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
            .state('start', {
                url: '/start',
                templateUrl: 'partials/start.html',
                controller: function ($scope, $state, profile, predict)
                {
                    $scope.profile = profile.current();
                    $scope.predict = predict.current();

                    $scope.profile.EmailAddress = "josiahpeters@gmail.com";

                    $scope.confirm = function()
                    {
                        profile.invite($scope.profile.EmailAddress).then(function ()
                        {
                            $state.go('invite.organic');
                        });
                    }

                },
                resolve: {
                    profile: 'profile',
                    predict: 'predict',
                    start: function (profile, predict)
                    {
                        profile.fetchProfile();
                        //return predict.fetchGuess(1, profile.current().Id);
                    }
                },
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
                                profile.update("name",$scope.profile.Name);
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
                                $state.go('predict.start', { id: $stateParams.id, name: $stateParams.name });
                            }
                        }
                    }
                }
            })
            .state('predict', {
                //url: '/{name}/{id}/predict',
                url: '/predict',
                templateUrl: 'partials/predict/predict.html',
                controller: function ($scope, predict)
                {
                    $scope.predict = predict.current();

                    $scope.$on('predict.update', function ()
                    {
                        $scope.predict = predict.current();
                    });

                },
                resolve: {
                    profile: 'profile',
                    predict: 'predict',
                    start: function (profile, predict)
                    {
                        profile.fetchProfile();
                        return predict.fetchGuess(1, profile.current().Id);
                    }
                },
                abstract: true,
            })
            .state('predict.start', {
                url: '/start',
                views: {
                    'predict': {
                        templateUrl: 'partials/predict/predict.start.html',
                    }
                }

            })
            .state('predict.gender', {
                url: '/gender',
                views: {
                    'predict': {
                        templateUrl: 'partials/predict/predict.gender.html',
                        controller: function ($scope, $stateParams, predict)
                        {
                            $scope.gender = predict.current().gender;

                            $scope.chooseGender = function (gender)
                            {
                                $scope.gender = gender;
                                predict.update("gender", gender);
                                $scope.$emit('predict.update');
                            }
                        }
                    }
                }
            })
            .state('predict.date', {
                url: '/date',
                views: {
                    'predict': {
                        templateUrl: 'partials/predict/predict.date.html',
                        controller: function ($scope, $stateParams, predict)
                        {
                            $scope.dateValue = predict.current().date;

                            $scope.$watch('dateValue', function (value)
                            {
                                predict.update("date", value);
                                $scope.$emit('predict.update');
                            });
                        },
                    }
                }
            })
            .state('predict.time', {
                url: '/time',
                views: {
                    'predict': {
                        templateUrl: 'partials/predict/predict.time.html',
                        controller: function ($scope, $stateParams, predict)
                        {
                            $scope.timeValue = predict.current().time;

                            $scope.$watch('timeValue', function (value)
                            {
                                predict.update("time", value);
                                $scope.$emit('predict.update');
                            });
                        },
                    }
                }
            })
            .state('predict.weight', {
                url: '/weight',
                views: {
                    'predict': {
                        templateUrl: 'partials/predict/predict.weight.html',
                        controller: function ($scope, $state, predict)
                        {
                            $scope.weightValue = predict.current().weight;

                            $scope.$watch('weightValue', function (value)
                            {
                                predict.update("weight", value);
                                $scope.$emit('predict.update');
                            });
                        },
                    }
                }
            })
            .state('predict.length', {
                url: '/length',
                controller: 'predict',
                views: {
                    'predict': {
                        templateUrl: 'partials/predict/predict.length.html',
                        controller: function ($scope, $state, predict)
                        {
                            $scope.lengthValue = predict.current().length;

                            $scope.$watch('lengthValue', function (value)
                            {
                                predict.update("length", value);
                                $scope.$emit('predict.update');
                            });
                        },
                    }
                }
            })
            .state('predict.finish', {
                url: '/finish',
                controller: 'predict',
                views: {
                    'predict': {
                        templateUrl: 'partials/predict/predict.finish.html',
                        controller: function ($scope, $state, predict)
                        {
                            $scope.submit = function ()
                            {
                                console.log("submitting");
                                predict.updateGuess(1);
                            }
                        }
                    }
                }
            });
    }])

    .run(function ($rootScope, $state, $stateParams)
    {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    })
.filter('hours', function ()
{
    return function (input, uppercase)
    {
        if (typeof (input) == "object")
        {
            var hours = input.getHours();
            var time = "am";

            if (hours > 12)
                time = "pm";

            var hour = Math.floor(hours % 12);

            if (hour == 0)
                hour = 12;

            var minutes = input.getMinutes();

            if (minutes < 10)
                minutes = '0' + minutes;

            return hour + ':' + minutes + ' ' + time;
        }
        return input;
    }
})
.filter('date', function ()
{
    return function (input, uppercase)
    {
        if (typeof (input) == "object")
        {
            return (input.getMonth() + 1) + '/' + input.getDate() + '/' + input.getFullYear();

        }
        return input;
    }
});

angular.module('kleine.controllers', [])
    .controller('predict', ['$scope', '$state', function ($scope, $state)
    {
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
    .factory('predict', [function ()
    {

    }
    ]);


