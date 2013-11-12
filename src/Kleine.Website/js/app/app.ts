/// <reference path='../../Scripts/typings/angularjs/angular.d.ts' />
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts' />
/// <reference path='../../Scripts/typings/angularjs/angular-route.d.ts' />

module kleine
{
	'use strict';

	var modules = ['ngRoute', 'ngResource', 'ngCookies', 'ui.router', 'kleine', 'kleine.services', 'kleine.directives'];

	// pre-load our sub modules
	angular.module('kleine.services', []);
	angular.module('kleine.directives', []);

	var app = angular.module('kleine', modules)
		.config(function ($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider, $stateProvider: any, $urlRouterProvider: any)
		{
			//$routeProvider
			//	.when('/', { templateUrl: '/partials/welcome.html', controller: 'kleine.controllers.welcome' })
			//	.when('/Invite/:id/:name/:email', { templateUrl: '/partials/invite.html', controller: 'kleine.controllers.invite' })
			//	.when('/Guess/:id/:name/', { templateUrl: '/partials/guess.html', controller: 'kleine.controllers.guess' })
			//	.when('/signup', { templateUrl: '/partials/signup.html', controller: 'kleine.controllers.signup' })
			//	.otherwise({ redirectTo: '/' });

			//$locationProvider.html5Mode(true);

			$urlRouterProvider.otherwise("/");
			$stateProvider
				.state('welcome', {
					url: '/',
					templateUrl: 'partials/welcome.html'
				})
				.state('invite', {
					url: '/invite/:id/:name/:email',
					templateUrl: 'partials/invite.html',
					controller: 'kleine.controllers.invite'
				})
				.state('guess', {
					url: '/guess/:id/:name',
					templateUrl: 'partials/guess.html',
					controller: 'kleine.controllers.guess',
					//views: {
					//	'guess': { templateUrl: 'partials/guess.start.html' }
					//}
				})
				.state('guess.gender', {
					url: '/gender',
					controller: 'kleine.controllers.guess',
					views: {
						'guess': { templateUrl: 'partials/guess.gender.html' }
					}
				})
				.state('guess.date', {
					url: '/date',
					controller: 'kleine.controllers.guess',
					views: {
						'guess': { templateUrl: 'partials/guess.date.html' }
					}
				})
				.state('guess.time', {
					url: '/time',
					controller: 'kleine.controllers.guess',
					views: {
						'guess': { templateUrl: 'partials/guess.time.html' }
					}
				})
				.state('guess.weight', {
					url: '/weight',
					controller: 'kleine.controllers.guess',
					views: {
						'guess': { templateUrl: 'partials/guess.weight.html' }
					}
				})
				.state('guess.length', {
					url: '/length',
					controller: 'kleine.controllers.guess',
					views: {
						'guess': { templateUrl: 'partials/guess.length.html' }
					}
				})
				.state('guess.finish', {
					url: '/finish',
					controller: 'kleine.controllers.guess',
					views: {
						'guess': { templateUrl: 'partials/guess.finish.html' }
					}
				})


					//views: {
					//	"guess": { template: "guess.start" },
					//	"gender": { template: "guess.gender" },
					//}
		})
		.controller('controllers.signup', ['$scope', '$routeParams', 'profileService'])

		.controller('controllers.invite', ['$scope', '$location', '$stateParams', 'profileService'])

		.factory('profileService', ($http, $cookieStore) => new services.profileService($http, $cookieStore))

		.directive('slider', () => new kleine.directives.slider());

}

module kleine
{
	'use strict';

	export module models { }

	export module controllers { }

	export module services { }

}