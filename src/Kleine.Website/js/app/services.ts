/// <reference path="app.ts" />

module kleine
{
	'use strict';

	export module services
	{
		export class profileService
		{
			constructor(private $http: any, private $cookieStore: any)
			{
			}

			createProfile(profile: models.signup, success: Function): void
			{
				this.$http.post('/api/GuessProfile', profile).success(function (data, status)
				{
					success(data);
				});
			}
		}
	}


}

