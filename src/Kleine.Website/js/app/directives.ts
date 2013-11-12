/// <reference path="app.ts" />

module kleine
{
	'use strict';

	export module directives
	{
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
		export class slider
		{
			constructor()
			{
				console.log("derp");
			}
			restrict= 'E';
			template = "<div>test</div>";
		}
		//export class rangeSlider implements ng.IDirective
		//{
		//	public static Factory(): rangeSlider
		//	{
		//		return new rangeSlider();
		//	}
		//	constructor()
		//	{
		//		var directive: ng.IDirective = {};
		//		//		directive.priority = 0;
		//		//		directive.restrict = "A";
		//		//		directive.scope = {};
		//		//		directive.transclude = true;
		//		//		directive.template = "<div>Your content</div>";
		//		//		directive.replace = true;
		//		//		directive.controller = function ($scope, $element)
		//		//		{
		//		//			this.flip = function ()
		//		//			{
		//		//				//Some func
		//		//			}
		//		//}
		//		//directive.replace = true;

		//		directive.template = '<div>test</div>';
		//		directive.restrict = 'EAC';
		//		directive.scope = { leftLabel: 'left', rightLabel: 'right', progress: "test" };

		//		console.log("constructed");

		//		return directive;
		//	}
		//}
	}

	//angular.module('kleine.directives', []).directive('rangeSlider', directives.rangeSlider.Factory);
	//angular.module('kleine.directives', []).directive('rangeSlider', function ()
	//{
	//	console.log("wot");
	//	return {
	//		template: '<div>test</div>',
	//		restrict: 'EAC',
	//		scope: { leftLabel: 'left', rightLabel: 'right', progress: "test" }


	//	};
	//});
}



//angular.module('kleine.directives', []);

