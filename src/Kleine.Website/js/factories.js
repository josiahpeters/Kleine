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
        }

        //updateProfileValue: function(property, value)
    };
}])
    .factory('guess', ['$http', function ($http)
    {
        // cache current profile
        var currentGuess = {};

        function mapGuess(currentGuess, guess)
        {
            var date = undefined;
            if (guess.Date !== undefined)
                date = new Date(parseInt(guess.Date.substr(6)));

            var time = undefined;
            if (guess.Time !== undefined)
            {
                time = [new Date(parseInt(guess.Time.substr(6)))];
                time.push(new Date(time[0]).addHours(4));
            }
            var weight = undefined;
            if (guess.Weight > 0)
            {
                weight = [guess.Weight];
                weight.push(guess.Weight + 1.5);
            }

            var length = undefined;
            if (guess.length > 0)
            {
                length = [guess.Length];
                length.push(guess.Length + 4);
            }

            currentGuess.gender = guess.Gender;
            currentGuess.date = date;
            currentGuess.time = time;
            currentGuess.weight = weight;
            currentGuess.length = length;
        }

        return {
            // get current user by session
            fetchGuess: function (dueDateId, profileId)
            {
                var promise = $http.get('/api/guess/' + dueDateId).then(function (response)
                {
                    var guess = response.data;

                    mapGuess(currentGuess, guess);

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
                var guess = {
                    DueDateId: dueDateId,
                    ProfileId: 1,
                    Gender: currentGuess.gender,
                    Date: currentGuess.date,
                    Time: currentGuess.time[0],
                    Weight: currentGuess.weight[0],
                    Length: currentGuess.length[0],
                }

                var promise = $http.post('/api/guess/', guess).then(function (response)
                {
                    mapGuess(currentGuess, guess);
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