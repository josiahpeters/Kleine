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
}