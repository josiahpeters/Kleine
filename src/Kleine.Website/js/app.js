'use strict';
var complete = false;
var modules = ['ngRoute', 'ui.router', 'ngResource', 'ngAnimate', 'kleine.controllers', 'kleine.directives', 'kleine.filters', 'kleine.services'];

var app = angular.module('kleine', modules)
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider)
    {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('welcome', {
                url: '/?auth',
                templateUrl: '/partials/welcome.html',
                controller: 'welcomeController',
                resolve: {
                    profilePrediction: 'profilePrediction'
                },
            })
            .state('welcomeCompleted', {
                url: '/?auth',
                templateUrl: '/partials/welcomeComplete.html',
                controller: 'welcomeCompletedController',
                resolve: {
                    profilePrediction: 'profilePrediction'
                },
            })
            .state('start', {
                url: '/start?code',
                templateUrl: '/partials/start.html',
                controller: 'startController',
                resolve: {
                    profilePrediction: 'profilePrediction'
                },
            })
            .state('confirm', {
                url: '/confirm?email',
                templateUrl: '/partials/confirm.html',
                controller: 'confirmController'
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
                controller: 'predictionController',
                resolve: {
                    profilePrediction: 'profilePrediction'
                },
            })
            .state('results', {
                url: '/results',
                templateUrl: '/partials/results/results.html',
                controller: 'resultsController',
                resolve: {
                    profilePrediction: 'profilePrediction'
                },
            })
            .state('rankings', {
                url: '/rankings',
                templateUrl: '/partials/results/rankings.html',
                controller: 'rankingsController',
                resolve: {
                    profilePrediction: 'profilePrediction'
                },
            })
            .state('invite', {
                url: '/invite',
                templateUrl: '/partials/invite/invite.html',
                controller: 'inviteController',
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
                        controller: 'invite.organicController',
                    }
                }

            })
            .state('invitation', {
                url: '/invitation?code',
                controller: 'invitationController',
            })
            .state('predict', {
                //url: '/{name}/{id}/predict',
                url: '/predict',
                templateUrl: '/partials/predict/predict.html',
                controller: 'predictController',
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
                        //controller: function ($scope, $state, $stateParams, profilePrediction)
                        //{
                        //}
                    }
                }

            })
            .state('predict.gender', {
                url: '/gender',
                views: {
                    'predict': {
                        templateUrl: '/partials/predict/predict.gender.html',
                        controller: 'predict.genderController'
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
                        controller: 'predict.dateController'
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
                        //controller: function ($scope, $stateParams, profilePrediction)
                        //{
                        //}
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
                        //controller: function ($scope, $state, profilePrediction)
                        //{

                        //},
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
                        //controller: function ($scope, $state, profilePrediction)
                        //{

                        //},
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
                        controller: 'predict.finishController'
                    }
                }
            });
    }])

    .run(function ($rootScope, $state, $stateParams, profilePrediction)
    {
        $rootScope.$state = $state;
        $rootScope.$state.completed = complete;

        $rootScope.$stateParams = $stateParams;
        profilePrediction.fetch();
    })



