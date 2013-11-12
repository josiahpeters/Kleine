/// <reference path="app.ts" />
var kleine;
(function (kleine) {
    'use strict';

    (function (directives) {
        //export function rangeSlider(): ng.IDirective
        //{
        //	console.log("wot");
        //	return {
        //		link: ($scope: ng.IScope, element: JQuery, attributes: any) =>
        //		{
        //			element.bind('blur', () => { $scope.$apply(attributes.todoBlur); });
        //		}
        //	};
        //}
        var slider = (function () {
            function slider() {
                this.restrict = 'E';
                this.template = "<div>test</div>";
                console.log("derp");
            }
            return slider;
        })();
        directives.slider = slider;
    })(kleine.directives || (kleine.directives = {}));
    var directives = kleine.directives;
})(kleine || (kleine = {}));
//# sourceMappingURL=directives.js.map
