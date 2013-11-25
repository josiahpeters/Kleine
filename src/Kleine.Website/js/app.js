'use strict';

var modules = ['ngRoute', 'ui.router', 'ngResource', 'kleine.controllers', 'kleine.directives', 'kleine.services'];

var app = angular.module('kleine', modules)
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider)
    {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('welcome', {
                url: '/',
                templateUrl: 'partials/welcome.html',
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
                    profilePrediction: 'profilePrediction',
                    start: function (profilePrediction)
                    {
                        return profilePrediction.fetch();
                    }
                },
            })
            .state('start', {
                url: '/start',
                templateUrl: 'partials/start.html',
                controller: function ($scope, $state, profilePrediction)
                {
                    $scope.profile = profilePrediction.current().Profile;

                    $scope.profile.EmailAddress = "josiahpetefrs@gmail.com";

                    $scope.confirm = function ()
                    {
                        profilePrediction.createProfile().then(function ()
                        {
                            $state.go('invite.organic');
                        });
                    }

                },
                resolve: {
                    profilePrediction: 'profilePrediction',
                    start: function (profilePrediction)
                    {
                        return profilePrediction.fetch();
                    }
                },
            })
            .state('invite', {
                url: '/invite',
                templateUrl: 'partials/invite/invite.html',
                controller: function ($scope, profilePrediction)
                {
                    $scope.theme = {
                        title: "Invitation"
                    };
                    // get the current profile for each invite state change
                },
                resolve: {
                    profilePrediction: 'profilePrediction',
                    start: function (profilePrediction)
                    {
                        return profilePrediction.fetch();
                    }
                },
                abstract: true,
            })
            .state('invite.organic', {
                url: '?code',
                views: {
                    'invite': {
                        templateUrl: 'partials/invite/invite.organic.html',
                        controller: function ($scope, $state, $http, $stateParams, profilePrediction)
                        {
                            $scope.theme.title = "You are Invited!";
                            $scope.profile = profilePrediction.current().Profile;
                            $scope.profile.Name = "Joey Peters";

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
            .state('predict', {
                //url: '/{name}/{id}/predict',
                url: '/predict',
                templateUrl: 'partials/predict/predict.html',
                controller: function ($scope, profilePrediction)
                {
                    $scope.prediction = profilePrediction.current().Prediction;

                    $scope.$on('predict.update', function ()
                    {
                        $scope.prediction = profilePrediction.current().Prediction;
                        //$scope.predict = predict.current();
                    });

                },
                resolve: {
                    profilePrediction: 'profilePrediction',
                    start: function (profilePrediction)
                    {
                        return profilePrediction.fetch();
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
                        controller: function ($scope, $stateParams, profilePrediction)
                        {
                            //$scope.prediction = profilePrediction.current().Prediction;
                            //$scope.gender = $scope.prediction;

                            $scope.chooseGender = function (gender)
                            {
                                $scope.prediction.Gender = gender;
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
                        controller: function ($scope, $stateParams, profilePrediction)
                        {
                            //$scope.prediction = profilePrediction.current().Prediction;
                            //$scope.dateValue = $scope.prediction.Date;

                            $scope.$watch('dateValue', function (value)
                            {
                                $scope.prediction.Date = value;
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
                        controller: function ($scope, $stateParams, profilePrediction)
                        {
                            //$scope.timeValue = profilePrediction.current().Prediction.Time;

                            $scope.$watch('timeValue', function (value)
                            {
                                $scope.prediction.Time = value;
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
                        controller: function ($scope, $state, profilePrediction)
                        {
                            //$scope.weightValue = profilePrediction.current().Prediction.Weight;

                            $scope.$watch('weightValue', function (value)
                            {
                                predict.updatePrediction("Weight", value);
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
                        controller: function ($scope, $state, profilePrediction)
                        {
                            $scope.lengthValue = profilePrediction.current().Prediction.Length;

                            $scope.$watch('lengthValue', function (value)
                            {
                                predict.updatePrediction("Length", value);
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
                        controller: function ($scope, $state, profilePrediction)
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


