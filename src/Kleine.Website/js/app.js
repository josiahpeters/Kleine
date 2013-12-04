'use strict';

var modules = ['ngRoute', 'ui.router', 'ngResource', 'kleine.controllers', 'kleine.directives', 'kleine.services'];

var app = angular.module('kleine', modules)
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider)
    {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('welcome', {
                url: '/',
                templateUrl: '/partials/welcome.html',
                controller: function ($scope, $state, profilePrediction)
                {
                    $scope.profile = profilePrediction.current().Profile;

                    $scope.makePrediction = function ($event)
                    {
                        $event.preventDefault()


                        if ($scope.profile !== undefined && $scope.profile.Name !== undefined)
                            $state.go('predict.start');
                        else
                            $state.go('start');
                    };


                },
                resolve: {
                    profilePrediction: 'profilePrediction'
                },
            })
            .state('start', {
                url: '/start?code',
                templateUrl: '/partials/start.html',
                controller: function ($scope, $state, profilePrediction)
                {
                    if (profilePrediction.current().Profile.EmailAddress !== undefined)
                        $state.go('invite.organic');

                    $scope.profile = profilePrediction.current().Profile;

                    $scope.confirm = function ()
                    {
                        profilePrediction.createProfile().then(function (event)
                        {
                            if (event)
                                $state.go('invite.organic');
                            else
                                $state.go('confirm', { email: $scope.profile.EmailAddress});
                        });
                    }

                },
                resolve: {
                    profilePrediction: 'profilePrediction'
                },
            })
            .state('confirm', {
                url: '/confirm?email',
                templateUrl: '/partials/confirm.html',
                controller: function ($scope, $state, $http, $stateParams, profilePrediction)
                {
                    $scope.EmailAddress = $stateParams.email;
                }
            })
            .state('reward', {
                url: '/reward',
                templateUrl: '/partials/reward.html',
                controller: function ($scope, $state, profilePrediction)
                {

                },
            })
            .state('prediction', {
                url: '/prediction',
                templateUrl: '/partials/prediction.html',
                controller: function ($scope, $state, profilePrediction)
                {
                    if (profilePrediction.current().Prediction === undefined || profilePrediction.current().Prediction.FinishDate === undefined)
                        $state.go('start');

                    $scope.prediction = profilePrediction.current().Prediction;
                },
                resolve: {
                    profilePrediction: 'profilePrediction'
                },
            })
            .state('results', {
                url: '/results',
                templateUrl: '/partials/results/results.html',
                controller: function ($scope, $state, profilePrediction)
                {

                },
                resolve: {
                    profilePrediction: 'profilePrediction'
                },
            })
            .state('invite', {
                url: '/invite',
                templateUrl: '/partials/invite/invite.html',
                controller: function ($scope, profilePrediction)
                {
                    $scope.theme = {
                        title: "Invitation"
                    };
                    // get the current profile for each invite state change
                },
                resolve: {
                    profilePrediction: 'profilePrediction'
                },
                abstract: true,
            })
            .state('invite.organic', {
                url: '?code',
                views: {
                    'invite': {
                        templateUrl: '/partials/invite/invite.organic.html',
                        controller: function ($scope, $state, $http, $stateParams, profilePrediction)
                        {
                            $scope.theme.title = "You are Invited!";
                            $scope.profile = profilePrediction.current().Profile;

                            $scope.confirm = function ()
                            {
                                profilePrediction.saveProfile().then(function ()
                                {
                                    $state.go('predict.start');
                                });
                            }
                        }
                    }
                }
            })
            .state('invitation', {
                url: '/invitation?code',
                controller: function ($scope, $state, $stateParams, profilePrediction)
                {
                    profilePrediction.fetch($stateParams.code).then(function ()
                    {
                        $state.go('predict.start');
                    });
                },
            })
            .state('predict', {
                //url: '/{name}/{id}/predict',
                url: '/predict',
                templateUrl: '/partials/predict/predict.html',
                controller: function ($scope, $state, $stateParams, profilePrediction)
                {
                    if (profilePrediction.current().Profile === undefined || profilePrediction.current().Profile.Name === undefined)
                        $state.go('start');

                    if (profilePrediction.current().Prediction !== undefined && profilePrediction.current().Prediction.FinishDate !== undefined)
                        $state.go('prediction');

                    $scope.prediction = profilePrediction.current().Prediction;
                },
                resolve: {
                    profilePrediction: 'profilePrediction',
                },
                abstract: true,
            })
            .state('predict.start', {
                url: '/start?code',
                views: {
                    'predict': {
                        templateUrl: '/partials/predict/predict.start.html',
                        controller: function ($scope, $state, $stateParams, profilePrediction)
                        {
                        }
                    }
                }

            })
            .state('predict.gender', {
                url: '/gender',
                views: {
                    'predict': {
                        templateUrl: '/partials/predict/predict.gender.html',
                        controller: function ($scope, $state, $stateParams, profilePrediction)
                        {
                            $scope.chooseGender = function (gender)
                            {
                                var first = true;

                                if ($scope.prediction.Gender != undefined)
                                    first = false;

                                $scope.prediction.Gender = gender;

                                if (first)
                                    $state.go('predict.date');
                            }
                        }
                    }
                },
                onExit: function (profilePrediction)
                {
                    profilePrediction.savePrediction();
                }
            })
            .state('predict.date', {
                url: '/date',
                views: {
                    'predict': {
                        templateUrl: '/partials/predict/predict.date.html',
                        controller: function ($scope, $state, $stateParams, profilePrediction)
                        {
                            $scope.next = function ()
                            {
                                $state.go('predict.time');
                            }
                        }
                    }
                },
                onExit: function (profilePrediction)
                {
                    profilePrediction.savePrediction();
                }
            })
            .state('predict.time', {
                url: '/time',
                views: {
                    'predict': {
                        templateUrl: '/partials/predict/predict.time.html',
                        controller: function ($scope, $stateParams, profilePrediction)
                        {
                        }
                    }
                },
                onExit: function (profilePrediction)
                {
                    profilePrediction.savePrediction();
                }
            })
            .state('predict.weight', {
                url: '/weight',
                views: {
                    'predict': {
                        templateUrl: '/partials/predict/predict.weight.html',
                        controller: function ($scope, $state, profilePrediction)
                        {
                            //$scope.showDetails = false;
                            //$scope.toggle = function ()
                            //{
                            //    $scope.showDetails = true;
                            //};

                        },
                    }
                },
                onExit: function (profilePrediction)
                {
                    profilePrediction.savePrediction();
                }
            })
            .state('predict.length', {
                url: '/length',
                controller: 'predict',
                views: {
                    'predict': {
                        templateUrl: '/partials/predict/predict.length.html',
                        controller: function ($scope, $state, profilePrediction)
                        {

                        },
                    }
                },
                onExit: function (profilePrediction)
                {
                    profilePrediction.savePrediction();
                }
            })
            .state('predict.finish', {
                url: '/finish',
                controller: 'predict',
                views: {
                    'predict': {
                        templateUrl: '/partials/predict/predict.finish.html',
                        controller: function ($scope, $state, profilePrediction)
                        {
                            $scope.submit = function ()
                            {
                                $scope.prediction.FinishDate = new Date();

                                profilePrediction.savePrediction(1).then(function ()
                                {
                                    $state.go('prediction');
                                });
                            }
                        }
                    }
                }
            });
    }])

    .run( function ($rootScope, $state, $stateParams, profilePrediction)
    {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        profilePrediction.fetch();
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


