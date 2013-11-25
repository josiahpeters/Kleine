'use strict';


app.factory('profilePrediction', ['$http', function ($http)
{
    // cache current profile prediction aggregate
    var currentData = {};

    return {
        // get current user by session
        fetch: function ()
        {
            var promise = $http.get('/api/profile').then(function (response)
            {
                setCurrentData(response.data);
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
            var promise = $http.post('/api/profile/', currentData.Profile).then(function (response)
            {
                setCurrentData(response.data);
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
            

            var predict = {
                DueDateId: dueDateId,
                ProfileId: 1,
                Gender: currentData.Prediction.Gender,
                Date: currentData.Prediction.Date,
                Time: time[0],
                Weight: weight[0],
                Length: length[0],
            }

            var promise = $http.put('/api/predict/', predict).then(function (response)
            {
                //var predict = response.data;                
            });

            return promise;
        }
    };

    function setCurrentData(data)
    {
        currentData.Profile = data.Profile;

        if (currentData.Profile === undefined)
            currentData.Profile = {};

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
            weight = [predict.Weight];
            weight.push(predict.Weight + 1.5);
        }

        var length = undefined;
        if (predict !== undefined && predict.Length > 0)
        {
            length = [predict.Length];
            length.push(predict.Length + 4);
        }

        var gender = undefined;
        if (predict !== undefined && predict.Gender !== undefined)
            gender = predict.Gender;

        if (currentData.Prediction === undefined)
            currentData.Prediction = {};

        currentData.Prediction.Gender = gender;
        currentData.Prediction.Date = date;
        currentData.Prediction.Time = time;
        currentData.Prediction.Weight = weight;
        currentData.Prediction.Length = length;

    }
}])

Date.prototype.addHours = function (h)
{
    this.setHours(this.getHours() + h);
    return this;
}