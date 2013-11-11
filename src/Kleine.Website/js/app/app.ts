/// <reference path='../../Scripts/typings/angularjs/angular.d.ts' />
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts' />
/// <reference path='../../Scripts/typings/angularjs/angular-route.d.ts' />

module kleine
{
	'use strict';

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

	export module models { }

	export module controllers { }
}