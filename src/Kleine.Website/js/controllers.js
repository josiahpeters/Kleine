'use strict';

angular.module('kleine.controllers', [])
    .controller('predict', ['$scope', '$state', function ($scope, $state)
    {

    }])
    .controller('welcomeController', ['$scope', '$state', '$stateParams', 'profilePrediction', function ($scope, $state, $stateParams, profilePrediction)
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
    }])
    .controller('welcomeCompletedController', ['$scope', '$state', '$stateParams', 'profilePrediction', function ($scope, $state, $stateParams, profilePrediction)
    {
        $scope.profile = profilePrediction.current().Profile;

        function createSlider()
        {
            //img/eliana/eliana_01_;
        }

        $('#carousel').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 210,
            itemMargin: 25,
            asNavFor: '#slider',
        });

        $('#slider').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: true,
            slideshowSpeed: 2000,
            sync: "#carousel"
        });

        if ($stateParams.auth != null)
        {
            $scope.message = "We were unable to verify your identity, please use the unique link from the email we sent you when you made your prediction to view your results.";
        }

        $scope.makePrediction = function ($event)
        {
            $event.preventDefault()


            if ($scope.profile !== undefined && $scope.profile.Name !== undefined)
                $state.go('predict.start');
            else
                $state.go('start');
        };
    }])
    .controller('startController', ['$scope', '$state', 'profilePrediction', function ($scope, $state, profilePrediction)
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

    }])
    .controller('confirmController', ['$scope', '$state', '$http', '$stateParams', 'profilePrediction', function ($scope, $state, $http, $stateParams, profilePrediction)
    {
        $scope.EmailAddress = $stateParams.email;
    }])
    .controller('predictionController', ['$scope', '$state', '$stateParams', 'profilePrediction', function ($scope, $state, $stateParams, profilePrediction)
    {
        if (complete)
        {
            if (profilePrediction.current().Prediction === undefined || profilePrediction.current().Prediction.FinishDate === undefined)
            {
                $state.go('welcome', { auth: false });
            }
            else
            {

                $scope.prediction = profilePrediction.current().Prediction;
                $scope.score = profilePrediction.current().PredictionScore;
                $scope.score = profilePrediction.current().PredictionScore;
            }
        }
        else
        {
            if (profilePrediction.current().Prediction === undefined || profilePrediction.current().Prediction.FinishDate === undefined)
                $state.go('start');

            $scope.prediction = profilePrediction.current().Prediction;
        }
    }])
    .controller('resultsController', ['$scope', '$state', '$http', 'profilePrediction', function ($scope, $state, $http, profilePrediction)
    {
        $scope.MaleCount = 0;
        $scope.FemaleCount = 0;
        $scope.PredictionCount = 0;

        $scope.Results = [];

        var data = {};

        function drawCharts()
        {
            var width = $($(".canvas-container")[0]).width();
            var height = width * .7;

            var context = document.getElementById("genderPie").getContext("2d");
            var myNewChart = new Chart(context).Doughnut(data.Gender);

            var timeChart = document.getElementById("timeChart");

            timeChart.width = width;
            timeChart.height = height;
            var timeChart = new Chart(timeChart.getContext("2d")).Line(data.Time, { scaleOverride: true, scaleSteps: 5, scaleStepWidth: 1, scaleStartValue: 0 });

            var dateChart = document.getElementById("dateChart");
            dateChart.width = width;
            dateChart.height = height;

            new Chart(dateChart.getContext("2d")).Line(data.Date, { scaleOverride: true, scaleSteps: 13, scaleStepWidth: 1, scaleStartValue: 0, });

            var weightChart = document.getElementById("weightChart");
            weightChart.width = width;
            weightChart.height = height;

            new Chart(weightChart.getContext("2d")).Line(data.Weight, { scaleOverride: true, scaleSteps: 11, scaleStepWidth: 2, scaleStartValue: 0 })

            var lengthChart = document.getElementById("lengthChart");
            lengthChart.width = width;
            lengthChart.height = height;

            new Chart(lengthChart.getContext("2d")).Line(data.Length, { scaleOverride: true, scaleSteps: 9, scaleStepWidth: 2, scaleStartValue: 0, })
        }

        $http.get('/api/results/')
        .then(function (response)
        {
            var pointColor = "#ffffff";

            var maleColor = "#8cd5e0";
            var maleColorLight = "rgba(200, 235, 240, 0.5)";

            var femaleColor = "#fc7272";
            var femaleColorLight = "rgba(254, 189, 189, 0.5)";

            if (response.data.GenderResults.length > 0)
            {
                var male = response.data.GenderResults[1];
                var female = response.data.GenderResults[0];

                $scope.MaleCount = male.Count;
                $scope.FemaleCount = female.Count;
                $scope.PredictionCount = $scope.MaleCount + $scope.FemaleCount;

                $scope.Results.push(getData(female, $scope.PredictionCount, 'girl'));
                $scope.Results.push(getData(male, $scope.PredictionCount, 'boy'));

                data.Gender = [{ value: $scope.MaleCount, color: maleColor }, { value: $scope.FemaleCount, color: femaleColor }];

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

                data.Time =
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


            }
            if (response.data.DateCounts.length > 0)
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

                data.Date =
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

                data.Weight =
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

                data.Length =
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
            }

            drawCharts();
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

        function resizeend()
        {
            if (new Date() - rtime < delta)
            {
                setTimeout(resizeend, delta);
            } else
            {
                timeout = false;
                drawCharts();
            }
        }

        var rtime = new Date(1, 1, 2000, 12, 0, 0);
        var timeout = false;
        var delta = 200;

        angular.element($(window)).bind('resize', function ()
        {
            rtime = new Date();
            if (timeout === false)
            {
                timeout = true;
                setTimeout(resizeend, delta);
            };
        });

    }])
    .controller('rankingsController', ['$scope', '$state', '$http', 'profilePrediction', function ($scope, $state, $http, profilePrediction)
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

    }])
    .controller('inviteController', ['$scope', 'profilePrediction', function ($scope, profilePrediction)
    {
        $scope.theme = {
            title: "Invitation"
        };
        // get the current profile for each invite state change
    }])
    .controller('invite.organicController', ['$scope', '$state', '$http', '$stateParams', 'profilePrediction', function ($scope, $state, $http, $stateParams, profilePrediction)
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
    }])
    .controller('invitationController', ['$scope', '$state', '$stateParams', 'profilePrediction', function ($scope, $state, $stateParams, profilePrediction)
    {
        profilePrediction.fetch($stateParams.code).then(function ()
        {
            if (complete)
                $state.go('prediction');
            else
                $state.go('predict.start');
        });
    }])
    .controller('predictController', ['$scope', '$state', '$stateParams', 'profilePrediction', function ($scope, $state, $stateParams, profilePrediction)
    {
        if (profilePrediction.current().Profile === undefined || profilePrediction.current().Profile.Name === undefined)
            $state.go('start');

        if (profilePrediction.current().Prediction !== undefined && profilePrediction.current().Prediction.FinishDate !== undefined)
            $state.go('prediction');

        $scope.prediction = profilePrediction.current().Prediction;
    }])
    .controller('predict.genderController', ['$scope', '$state', '$stateParams', 'profilePrediction', function ($scope, $state, $stateParams, profilePrediction)
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
    }])
    .controller('predict.dateController', ['$scope', '$state', '$stateParams', 'profilePrediction', function ($scope, $state, $stateParams, profilePrediction)
    {
        $scope.next = function ()
        {
            $state.go('predict.time');
        }
    }])
    .controller('predict.finishController', ['$scope', '$state', 'profilePrediction', function ($scope, $state, profilePrediction)
    {
        $scope.submit = function ()
        {
            $scope.prediction.FinishDate = new Date();

            profilePrediction.savePrediction(1).then(function ()
            {
                $state.go('prediction');
            });
        }
    }])
