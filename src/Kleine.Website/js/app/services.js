/// <reference path="app.ts" />
'use strict';
var Kleine;
(function (Kleine) {
    (function (services) {
        var MyService = (function () {
            function MyService() {
                this.meaningOfLife = 42;
            }
            MyService.prototype.someMethod = function () {
                return 'Meaning of life is ' + this.meaningOfLife;
            };
            return MyService;
        })();
        services.MyService = MyService;
    })(Kleine.services || (Kleine.services = {}));
    var services = Kleine.services;
})(Kleine || (Kleine = {}));

Kleine.registerService('MyService', []);
//# sourceMappingURL=services.js.map
