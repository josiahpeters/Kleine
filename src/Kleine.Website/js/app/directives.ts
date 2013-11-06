/// <reference path="app.ts" />

'use strict';

module Kleine.directives {

    export class MyDirective implements IDirective {
        template = '<div></div>';
        restrict = 'E';
        link ($scope, element: JQuery, attrs: ng.IAttributes) {
            element.text('this is the MyDirective directive');
        }

    }

}

Kleine.registerDirective('MyDirective', []);