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

        return {
            // get current user by session
            fetchGuess: function (dueDateId, profileId)
            {
                var promise = $http.get('/api/guess/' + dueDateId).then(function (response)
                {
                    if (response.data.length > 0)
                        currentGuess = response.data;
                    //if(currentGuess)
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
        };
    }])