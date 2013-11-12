/// <reference path="app.ts" />
var kleine;
(function (kleine) {
    'use strict';

    (function (services) {
        var profileService = (function () {
            function profileService($http, $cookieStore) {
                this.$http = $http;
                this.$cookieStore = $cookieStore;
            }
            profileService.prototype.createProfile = function (profile, success) {
                this.$http.post('/api/GuessProfile', profile).success(function (data, status) {
                    success(data);
                });
            };
            return profileService;
        })();
        services.profileService = profileService;
    })(kleine.services || (kleine.services = {}));
    var services = kleine.services;
})(kleine || (kleine = {}));
//# sourceMappingURL=services.js.map
