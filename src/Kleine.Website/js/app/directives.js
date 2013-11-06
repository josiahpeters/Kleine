/// <reference path="app.ts" />
'use strict';
var Kleine;
(function (Kleine) {
    (function (directives) {
        var MyDirective = (function () {
            function MyDirective() {
                this.template = '<div></div>';
                this.restrict = 'E';
            }
            MyDirective.prototype.link = function ($scope, element, attrs) {
                element.text('this is the MyDirective directive');
            };
            return MyDirective;
        })();
        directives.MyDirective = MyDirective;
    })(Kleine.directives || (Kleine.directives = {}));
    var directives = Kleine.directives;
})(Kleine || (Kleine = {}));

Kleine.registerDirective('MyDirective', []);
//# sourceMappingURL=directives.js.map
