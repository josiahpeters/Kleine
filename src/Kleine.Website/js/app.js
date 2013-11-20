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
                    $scope.guess = guess.current();

                    $scope.$on('guess.update', function ()
                    {
                        $scope.guess = guess.current();
                    });

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
                        controller: function ($scope, $stateParams, guess)
                        {
                            $scope.gender = guess.current().gender;

                            $scope.chooseGender = function (gender)
                            {
                                $scope.gender = gender;
                                guess.update("gender", gender);
                                $scope.$emit('guess.update');
                            }
                        }
                    }
                }
            })
            .state('guess.date', {
                url: '/date',
                views: {
                    'guess': {
                        templateUrl: 'partials/guess/guess.date.html',
                        controller: function ($scope, $stateParams, guess)
                        {
                            $scope.dateValue = guess.current().date;

                            $scope.$watch('dateValue', function (value)
                            {
                                guess.update("date", value);
                                $scope.$emit('guess.update');
                            });
                        },
                    }
                }
            })
            .state('guess.time', {
                url: '/time',
                views: {
                    'guess': {
                        templateUrl: 'partials/guess/guess.time.html',
                        controller: function ($scope, $stateParams, guess)
                        {
                            $scope.timeValue = guess.current().time;

                            $scope.$watch('timeValue', function (value)
                            {
                                guess.update("time", value);
                                $scope.$emit('guess.update');
                            });
                        },
                    }
                }
            })
            .state('guess.weight', {
                url: '/weight',
                views: {
                    'guess': {
                        templateUrl: 'partials/guess/guess.weight.html',
                        controller: function ($scope, $state, guess)
                        {
                            $scope.weightValue = guess.current().weight;

                            $scope.$watch('weightValue', function (value)
                            {
                                guess.update("weight", value);
                                $scope.$emit('guess.update');
                            });
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
                        controller: function ($scope, $state, guess)
                        {
                            $scope.lengthValue = guess.current().length;

                            $scope.$watch('lengthValue', function (value)
                            {
                                guess.update("length", value);
                                $scope.$emit('guess.update');
                            });
                        },
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

    .run(function ($rootScope, $state, $stateParams)
    {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });

angular.module('kleine.controllers', [])
    .controller('guess', ['$scope', '$state', function ($scope, $state)
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
    .factory('guess', [function ()
    {

    }
    ]);


