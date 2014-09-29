'use strict';
var complete = false;

var clientDueDate = {
    Id: 2,
    ExpectedDate: new Date(14,10,16,0,1,0,0),
    DeliveredDate: null,
    DueDateString: "October 16th, 2014",
    Name: "Baby R",
    Title: "",
    Description: "",
    CouplesNames: "Katie and Zack",
    CouplesEmailAddress: "",
    BabyAlias: "Baby Roberts",
    BabyName: "",
    WelcomeMessage: "View Baby Registry\n*blurb:* Their last baby was six years ago, and they didn't keep a thing! They are keeping things simple this time around, but could still use your help! They are registered at Target. (A baby shower will be held approximately two weeks after baby's arrival)\n\nCloth Diaper Fund\n*blurb:* For many reasons, they are going cloth this time! It will save the family over $2,000 during the course of the next 2-3 years by diapering \"the old-fashioned way\" - BUT, the initial investment can be a little painful. They would like to raise about $450 to purchase everything they'll need, and every dollar you donate helps!\n\nTake Them a Meal\n*blurb:* If you would like to bless the family by providing them with a meal after baby comes, thank you so much! Any break from meal planning, shopping, or cooking is much appreciated by mom and dad. HOWEVER- please note there is a food sensitivity in the family, and taking them a meal won't be for the faint at heart. Click the link for ALL the details about what foods make the cut, where or how to shop for and prepare a meal for them, and for a sign up list/ calendar for the truly brave souls! Even if its too much for you to tackle (understandably so), bless you anyway, for its the thought that counts!\nLook up: Roberts, Zack and/or Katie\nPassword is: Baby#3",
    ThankYouMessage: "",
    EmailGreeting: "",
    DateFact: "Katie is due on her older brother Andrew's birthday.",
    GenderFact: "In the United States, boys make up 51.2% of the birth rate.",
    LengthFact: "According to the <a href=\"http://www.cdc.gov/growthcharts/html_charts/lenageinf.htm\">CDC</a>, the average length of a newborn baby is 19.54 inches.",
    TimeFact: "According to everyone, most expecting mothers go into labor at the most inconveinent times possible.",
    WeightFact: "The average U.S. newborn weight in 2008 was 7 pounds, 4.26 ounces (7.26 lbs).",
};

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

        $rootScope.$state.client = clientDueDate;

        profilePrediction.fetch();
    })



