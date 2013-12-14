'use strict';

var modules = ['ngRoute', 'ui.router', 'ngResource', 'ngAnimate', 'kleine.controllers', 'kleine.directives', 'kleine.services'];

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
                    if (profilePrediction.current().Profile !== undefined && profilePrediction.current().Profile.EmailAddress !== undefined)
                        $state.go('invite.organic');

                    $scope.profile = profilePrediction.current().Profile;

                    $scope.confirm = function ()
                    {
                        profilePrediction.createProfile().then(function (event)
                        {
                            if (event)
                                $state.go('invite.organic');
                            else
                                $state.go('confirm', { email: $scope.profile.EmailAddress });
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
                    $scope.score = profilePrediction.current().PredictionScore;
                    $scope.score = profilePrediction.current().PredictionScore;

                    console.log(profilePrediction.current());


                },
                resolve: {
                    profilePrediction: 'profilePrediction'
                },
            })
            .state('results', {
                url: '/results',
                templateUrl: '/partials/results/results.html',
                controller: function ($scope, $state, $http, profilePrediction)
                {
                    $scope.MaleCount = 0;
                    $scope.FemaleCount = 0;
                    $scope.PredictionCount = 0;

                    $scope.Results = [];

                    $http.get('/api/results/')
                    .then(function (response)
                    {
                        var pointColor = "#ffffff";

                        var maleColor = "#8cd5e0";
                        var maleColorLight = "rgba(200, 235, 240, 0.5)";

                        var femaleColor = "#fc7272";
                        var femaleColorLight = "rgba(254, 189, 189, 0.5)";

                        var height = 200;
                        var width = 400;



                        if (response.data.GenderResults.length > 0)
                        {
                            var male = response.data.GenderResults[1];
                            var female = response.data.GenderResults[0];

                            $scope.MaleCount = male.Count;
                            $scope.FemaleCount = female.Count;
                            $scope.PredictionCount = $scope.MaleCount + $scope.FemaleCount;

                            $scope.Results.push(getData(female, $scope.PredictionCount, 'girl'));
                            $scope.Results.push(getData(male, $scope.PredictionCount, 'boy'));

                            var data = [{ value: $scope.MaleCount, color: maleColor }, { value: $scope.FemaleCount, color: femaleColor }];
                            var context = document.getElementById("genderPie").getContext("2d");
                            var myNewChart = new Chart(context).Doughnut(data);
                        }
                        if (response.data.TimeCounts.length > 0)
                        {
                            var labels = []; //["January", "February", "March", "April", "May", "June", "July"];
                            var maleData = []; //[65, 59, 90, 81, 56, 55, 40];
                            var femaleData = []; //[28, 48, 40, 19, 96, 27, 100];

                            for (var d in response.data.TimeCounts)
                            {
                                var row = response.data.TimeCounts[d];

                                var label = d;

                                labels.push(label);
                                maleData.push(row.MaleCount);
                                femaleData.push(row.FemaleCount);
                            }

                            var data =
                                {
                                    labels: labels,
                                    datasets:
                                        [
                                            {
                                                fillColor: maleColorLight,
                                                strokeColor: maleColor,
                                                pointColor: pointColor,
                                                pointStrokeColor: maleColor,
                                                data: maleData
                                            },
                                            {
                                                fillColor: femaleColorLight,
                                                strokeColor: femaleColor,
                                                pointColor: pointColor,
                                                pointStrokeColor: femaleColor,
                                                data: femaleData
                                            },
                                        ]
                                };

                            var timeChart = document.getElementById("timeChart");
                            timeChart.width = width;
                            timeChart.height = height;
                            var context = timeChart.getContext("2d");

                            //new Chart(ctx).Bar(data, options);

                            var timeChart = new Chart(context).Line(data, {
                                scaleOverride: true,
                                scaleSteps: 5,
                                scaleStepWidth: 1,
                                scaleStartValue: 0,
                            });
                        }
                        if (response.data.TimeCounts.length > 0)
                        {
                            var labels = []; //["January", "February", "March", "April", "May", "June", "July"];
                            var maleData = []; //[65, 59, 90, 81, 56, 55, 40];
                            var femaleData = []; //[28, 48, 40, 19, 96, 27, 100];

                            for (var d in response.data.DateCounts)
                            {
                                var row = response.data.DateCounts[d];

                                //labels.push()
                                var date = new Date(parseInt(row.Date.substr(6)))

                                var label = (date.getMonth() + 1) + '-' + date.getDate();

                                labels.push(label);
                                maleData.push(row.MaleCount);
                                femaleData.push(row.FemaleCount);
                            }

                            var data =
                                {
                                    labels: labels,
                                    datasets:
                                        [
                                            {
                                                fillColor: maleColorLight,
                                                strokeColor: maleColor,
                                                pointColor: pointColor,
                                                pointStrokeColor: maleColor,
                                                data: maleData
                                            },
                                            {
                                                fillColor: femaleColorLight,
                                                strokeColor: femaleColor,
                                                pointColor: pointColor,
                                                pointStrokeColor: femaleColor,
                                                data: femaleData
                                            },
                                        ]
                                };

                            var dateChart = document.getElementById("dateChart");
                            dateChart.width = width;
                            dateChart.height = height;
                            var context = dateChart.getContext("2d");

                            var dateChart = new Chart(context).Line(data, {
                                scaleOverride: true,
                                scaleSteps: 13,
                                scaleStepWidth: 1,
                                scaleStartValue: 0,
                            })
                        }
                        if (response.data.WeightCounts.length > 0)
                        {
                            var labels = [];
                            var maleData = [];
                            var femaleData = [];

                            for (var d in response.data.WeightCounts)
                            {
                                var row = response.data.WeightCounts[d];

                                var label = row.Value + " lbs";

                                labels.push(label);
                                maleData.push(row.MaleCount);
                                femaleData.push(row.FemaleCount);
                            }

                            var data =
                                {
                                    labels: labels,
                                    datasets:
                                        [
                                            {
                                                fillColor: maleColorLight,
                                                strokeColor: maleColor,
                                                pointColor: pointColor,
                                                pointStrokeColor: maleColor,
                                                data: maleData
                                            },
                                            {
                                                fillColor: femaleColorLight,
                                                strokeColor: femaleColor,
                                                pointColor: pointColor,
                                                pointStrokeColor: femaleColor,
                                                data: femaleData
                                            },
                                        ]
                                };

                            var dateChart = document.getElementById("weightChart");
                            dateChart.width = width;
                            dateChart.height = height;
                            var context = dateChart.getContext("2d");

                            var dateChart = new Chart(context).Line(data, {
                                scaleOverride: true,
                                scaleSteps: 11,
                                scaleStepWidth: 2,
                                scaleStartValue: 0,
                            })
                        }

                        if (response.data.LengthCounts.length > 0)
                        {
                            var labels = [];
                            var maleData = [];
                            var femaleData = [];

                            for (var d in response.data.LengthCounts)
                            {
                                var row = response.data.LengthCounts[d];

                                var label = row.Value + " in";

                                labels.push(label);
                                maleData.push(row.MaleCount);
                                femaleData.push(row.FemaleCount);
                            }

                            var data =
                                {
                                    labels: labels,
                                    datasets:
                                        [
                                            {
                                                fillColor: maleColorLight,
                                                strokeColor: maleColor,
                                                pointColor: pointColor,
                                                pointStrokeColor: maleColor,
                                                data: maleData
                                            },
                                            {
                                                fillColor: femaleColorLight,
                                                strokeColor: femaleColor,
                                                pointColor: pointColor,
                                                pointStrokeColor: femaleColor,
                                                data: femaleData
                                            },
                                        ]
                                };

                            var dateChart = document.getElementById("lengthChart");
                            dateChart.width = width;
                            dateChart.height = height;
                            var context = dateChart.getContext("2d");

                            var dateChart = new Chart(context).Line(data, {
                                scaleOverride: true,
                                scaleSteps: 9,
                                scaleStepWidth: 2,
                                scaleStartValue: 0,
                            })
                        }
                    });

                    function getData(result, total, gender)
                    {

                        var date = new Date(parseInt(result.Date.substr(6)));

                        var time = [new Date(parseInt(result.Time.substr(6)))];
                        time.push(new Date(time[0]).addHours(4));

                        var weight = [result.Weight.toFixed(1)];
                        weight.push((result.Weight + 1.5).toFixed(1));

                        var length = [result.Length.toFixed(1)];
                        length.push((result.Length + 4).toFixed(1));

                        return {
                            GenderPercent: (result.Count / total * 100).toFixed(1),
                            Gender: gender,
                            Date: date,
                            Time: time,
                            Weight: weight,
                            Length: length,
                        };
                    }


                },
                resolve: {
                    profilePrediction: 'profilePrediction'
                },
            })
            .state('rankings', {
                url: '/rankings',
                templateUrl: '/partials/results/rankings.html',
                controller: function ($scope, $state, $http, profilePrediction)
                {
                    $scope.Rankings = [];


                    $http.get('/api/results/rankings')
                    .then(function (response)
                    {
                        if (response.data.length > 0)
                        {
                            $scope.Rankings = response.data;
                        }

                    });

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

    .run(function ($rootScope, $state, $stateParams, profilePrediction)
    {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        profilePrediction.fetch();
    })
.filter('hours', function ()
{
    return function (input, uppercase)
    {
        if (typeof (input) == "string")
        {
            input = new Date(parseInt(input.substr(6)));
        }

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
.filter('hoursFour', function ()
{
    return function (input)
    {

        if (typeof (input) == "object")
        {
            input.setHours(input.getHours() + 4);
            return input;
        }
    }
})
.filter('ssDate', function ()
{
    return function (input)
    {
        if (typeof (input) == "string")
        {
            return new Date(parseInt(input.substr(6)));
        }
        else
            return input;
    }
})
.filter('date', function ()
{
    return function (input)
    {
        if (typeof (input) == "object")
        {
            return (input.getMonth() + 1) + '/' + input.getDate() + '/' + input.getFullYear();

        }
        return input;
    }
})
.filter('day', function ()
{
    return function (input, uppercase)
    {
        if (typeof (input) == "object")
        {
            var m_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            var d = new Date(input);
            var curr_date = d.getDate();
            var sup = "";
            if (curr_date == 1 || curr_date == 21 || curr_date == 31)
            {
                sup = "st";
            }
            else if (curr_date == 2 || curr_date == 22)
            {
                sup = "nd";
            }
            else if (curr_date == 3 || curr_date == 23)
            {
                sup = "rd";
            }
            else
            {
                sup = "th";
            }

            var curr_month = d.getMonth();
            var curr_year = d.getFullYear();

            return (m_names[curr_month] + " " + curr_date + sup + ", " + curr_year);
        }
        return input;
    }
})

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

