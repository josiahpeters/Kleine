'use strict';

angular.module('kleine.services', []).factory('predict', [function () { }]);

app.factory('profilePrediction', ['$http', function ($http)
{
    // cache current profile prediction aggregate
    var currentData = { Unauthorized: false };

    return {
        // get current user by session
        fetch: function (code)
        {
            code = code || "";

            var url = '/api/profile/';

            if(code.length > 0)
                url += '?code=' + code

            var promise = $http.get(url).then(function (response)
            {
                if (response.status == 200)
                    setCurrentData(response.data);

                return true;
            });

            return promise;
        },

        current: function ()
        {
            return currentData;
        },

        saveProfile: function ()
        {
            var promise = $http.put('/api/profile/', currentData.Profile).then(function (response)
            {
                if (response.status == 200)
                    setCurrentData(response.data);
            });

            return promise;
        },
        createProfile: function ()
        {
            var promise = $http.post('/api/profile/', currentData.Profile)
                .then(function (response)
                {
                    setCurrentData(response.data);
                    return true;
                })
                .catch(function (response)
                {
                    return false;
                });
            return promise;
        },

        savePrediction: function (dueDateId)
        {
            if (dueDateId === undefined)
                dueDateId = 1;

            var date = currentData.Prediction.Date || null;
            var time = currentData.Prediction.Time || [null];
            var weight = currentData.Prediction.Weight || [null];
            var length = currentData.Prediction.Length || [null];
            var message = currentData.Prediction.Message || "";
            var finishDate = currentData.Prediction.FinishDate || null;


            var predict = {
                DueDateId: dueDateId,
                ProfileId: currentData.Profile.Id,
                Gender: currentData.Prediction.Gender,
                Date: currentData.Prediction.Date,
                Time: time[0],
                Weight: weight[0],
                Length: length[0],
                Message: message,
                FinishDate: finishDate,
            }

            var promise = $http.put('/api/predict/', predict).then(function (response)
            {
                setCurrentData(response.data);
            });

            return promise;
        }
    };

    function setCurrentData(data)
    {
        currentData.Profile = data.Profile;
        if (currentData.Profile === undefined)
            currentData.Profile = {};

        currentData.PredictionScore = data.PredictionScore;
        if (currentData.PredictionScore === undefined)
            currentData.PredictionScore = {};

        mapPrediction(currentData.Prediction, data.Prediction);
    }

    function mapPrediction(currentPrediction, predict)
    {
        var date = undefined;
        if (predict !== undefined && predict.Date !== undefined)
            date = new Date(parseInt(predict.Date.substr(6)));

        var time = undefined;
        if (predict !== undefined && predict.Time !== undefined)
        {
            time = [new Date(parseInt(predict.Time.substr(6)))];

            time.push(new Date(time[0]).addHours(4));
        }
        var weight = undefined;
        if (predict !== undefined && predict.Weight > 0)
        {
            weight = [predict.Weight.toFixed(1)];
            weight.push((predict.Weight + 1.5).toFixed(1));
        }

        var length = undefined;
        if (predict !== undefined && predict.Length > 0)
        {
            length = [predict.Length.toFixed(1)];
            length.push((predict.Length + 4).toFixed(1));
        }

        var gender = undefined;
        if (predict !== undefined && predict.Gender !== undefined)
            gender = predict.Gender;

        var finishDate = undefined;
        if (predict !== undefined && predict.FinishDate !== undefined)
            finishDate = predict.FinishDate;

        var message = undefined;
        if (predict !== undefined && predict.Message !== undefined)
            message = predict.Message;

        if (currentData.Prediction === undefined)
            currentData.Prediction = {};

        currentData.Prediction.Gender = gender;
        currentData.Prediction.Date = date;
        currentData.Prediction.Time = time || currentData.Prediction.Time;
        currentData.Prediction.Weight = weight || currentData.Prediction.Weight;
        currentData.Prediction.Length = length || currentData.Prediction.Length;
        currentData.Prediction.FinishDate = finishDate;
        currentData.Prediction.Message = message || "";

    }
}])

Date.prototype.addHours = function (h)
{
    this.setHours(this.getHours() + h);
    return this;
}