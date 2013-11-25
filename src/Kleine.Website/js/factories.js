'use strict';


app.factory('profile', ['$http', function ($http)
{
    // cache current profile
    var currentProfile = {};

    return {
        // get current user by session
        fetchProfile: function ()
        {
            var promise = $http.get('/api/profile').then(function (response)
            {
                if (response.data.length > 0)
                    currentProfile = response.data;
            });

            return promise;
        },
        current: function ()
        {
            return currentProfile;
        },
        update: function (property, value)
        {
            currentProfile[property] = value;
        },
        updateProfile: function ()
        {            
            var promise = $http.put('/api/profile/', currentProfile).then(function (response)
            {
                console.log(response.data);
                if (response.data.length > 0)
                    currentProfile = response.data;
            });

            return promise;
        },
        confirmation: function (code)
        {
            var promise = $http.post('/api/profile/confirmation', { confirmationCode: code }).then(function (response)
            {
                if (response.data.EmailAddress.length > 0)
                {
                    currentProfile = response.data;
                    return true;
                }
                else return false;
            });
            return promise;
        },
        invite: function (EmailAddress)
        {
            var promise = $http.post('/api/profile/', { EmailAddress: EmailAddress }).then(function (response)
            {
                if (response.data.EmailAddress.length > 0)
                {
                    currentProfile = response.data;
                    return currentProfile;
                }
                else return undefined;
            });
            return promise;
        }

        //updateProfileValue: function(property, value)
    };
}])
    .factory('predict', ['$http', function ($http)
    {
        // cache current profile
        var currentGuess = {};

        function mapGuess(currentGuess, predict)
        {
            var date = undefined;
            if (predict.Date !== undefined)
                date = new Date(parseInt(predict.Date.substr(6)));

            var time = undefined;
            if (predict.Time !== undefined)
            {
                time = [new Date(parseInt(predict.Time.substr(6)))];
                time.push(new Date(time[0]).addHours(4));
            }
            var weight = undefined;
            if (predict.Weight > 0)
            {
                weight = [predict.Weight];
                weight.push(predict.Weight + 1.5);
            }

            var length = undefined;
            if (predict.length > 0)
            {
                length = [predict.Length];
                length.push(predict.Length + 4);
            }

            currentGuess.gender = predict.Gender;
            currentGuess.date = date;
            currentGuess.time = time;
            currentGuess.weight = weight;
            currentGuess.length = length;
        }

        return {
            // get current user by session
            fetchGuess: function (dueDateId, profileId)
            {
                var promise = $http.get('/api/predict/' + dueDateId).then(function (response)
                {
                    var predict = response.data;

                    mapGuess(currentGuess, predict);

                });

                return promise;
            },
            current: function ()
            {
                return currentGuess;
            },
            update: function (property, value)
            {
                currentGuess[property] = value;
            },
            updateGuess: function (dueDateId)
            {
                var predict = {
                    DueDateId: dueDateId,
                    ProfileId: 1,
                    Gender: currentGuess.gender,
                    Date: currentGuess.date,
                    Time: currentGuess.time[0],
                    Weight: currentGuess.weight[0],
                    Length: currentGuess.length[0],
                }

                var promise = $http.post('/api/predict/', predict).then(function (response)
                {
                    mapGuess(currentGuess, predict);
                });

                return promise;
            }
        };
    }])

Date.prototype.addHours = function (h)
{
    this.setHours(this.getHours() + h);
    return this;
}