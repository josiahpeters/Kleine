/// <reference path="app.ts" />

module kleine
{
	'use strict';

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
			constructor($scope: SignupScope, private $routeParams: ng.route.IRouteParamsService, private profileService: services.profileService)
			{
				var self = this;

				$scope.emailAddress = "josiahpeters@gmail.com";

				//console.log($routeParams);

				$scope.signup = function ()
				{
					var result = new models.signup();

					result.emailAddress = $scope.emailAddress;

					self.signup(result);
				}
			}
			signup(result: models.signup): void
			{
				this.profileService.createProfile(result, function (success)
				{
					console.log(success);
				});
			}
		}
		export class guess
		{
			constructor($scope: SignupScope, private $route: ng.route.IRoute, private profileService: services.profileService)
			{
			}


		}
		export class invite
		{
			constructor($scope: InviteScope, private $location: ng.ILocationProvider, private $stateParams: any, private profileService: services.profileService)
			{
				$scope.confirm = function ()
				{
					console.log($stateParams);
					var guessUrl = '/guess/' + $stateParams.id + '/' + $stateParams.name
					console.log(guessUrl);
					$location.path(guessUrl);
				}

			}


		}
	}
}