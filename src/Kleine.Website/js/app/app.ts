/// <reference path='../../Scripts/typings/angularjs/angular.d.ts' />
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts' />
/// <reference path='../../Scripts/typings/angularjs/angular-route.d.ts' />

module kleine
{
	'use strict';

	//var modules = ['app.controllers'];
	//modules.forEach((module) => angular.module(module, []));

	var app = angular.module('app', [])
		.config(['$routeProvider', function ($routeProvider: ng.route.IRouteProvider)
		{
			$routeProvider
				.when('/', { templateUrl: '/partials/welcome.html', controller: 'kleine.controllers.welcome' })
				.when('/signup', { templateUrl: '/partials/signup.html', controller: 'kleine.controllers.signup' })
				.otherwise({ redirectTo: '/' });
		}]).controller('controllers.signup', []);

}

module kleine
{
	'use strict';

	export module models
	{
		export class signup
		{
			emailAddress: string;
		}
	}

	export module controllers
	{
		export class welcome
		{
			constructor($scope: any)
			{

			}
		}
		export class signup
		{

			constructor($scope: SignupScope)
			{
				var self = this;

				$scope.emailAddress = "josiahpeters@gmail.com";

				$scope.signup = function ()
				{
					var result = new models.signup();

					result.emailAddress = $scope.emailAddress;

					self.signup(result);
				}
			}
			//signup(): void
			//{
			//	console.log("test");
			//}
			signup(result: models.signup): void
			{
				console.log(result);
			}
		}
	}

	//export interface IKScope extends ng.IScope
	//{

	//}
	export interface SignupScope
	{
		emailAddress: string;

		signup: Function;
	}
}

//'use strict';


//angular.module("Kleine", ["Kleine.controllers"])
//	.config(['$routeProvider',
//		function routes($routeProvider: ng.route.IRouteProvider)
//		{
//			$routeProvider.when('/', { templateUrl: 'partials/Welcome.html', controller: 'Kleine.controllers.MyController' })
//				.otherwise({ redirectTo: '/' });
//		}]);

//module Kleine
//{
//	export interface IController { }

//	export module controllers { }

//	export function registerController(className: string, services = [])
//	{
//		angular.module('Kleine.controllers').controller('Kleine.controllers.MyController',['$scope']);
//	}
//}

//module Kleine.controllers
//{
//	export class MyController implements IController
//	{
//		constructor(private $scope)
//		{
//			$scope.message = "test";

//		}
//	}
//}

//Kleine.registerController('MyController');
