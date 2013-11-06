/// <reference path="app.ts" />
'use strict';
var Kleine;
(function (Kleine) {
    (function (filters) {
        var RangeTo = (function () {
            function RangeTo() {
            }
            RangeTo.prototype.filter = function (start, end) {
                var out = [];
                for (var i = start; i < end; ++i)
                    out.push(i);
                return out;
            };
            return RangeTo;
        })();
        filters.RangeTo = RangeTo;

        var Splice = (function () {
            function Splice() {
            }
            Splice.prototype.filter = function (input, start, howMany) {
                return input.splice(start, howMany);
            };
            return Splice;
        })();
        filters.Splice = Splice;
    })(Kleine.filters || (Kleine.filters = {}));
    var filters = Kleine.filters;
})(Kleine || (Kleine = {}));

Kleine.registerFilter('RangeTo', []);
Kleine.registerFilter('Splice', []);
//# sourceMappingURL=filters.js.map
