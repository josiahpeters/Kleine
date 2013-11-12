/// <reference path="app.ts" />

module kleine
{
	'use strict';

	export interface SignupScope
	{
		emailAddress: string;
		name: string;

		signup: Function;
	}

	export interface InviteScope
	{
		emailAddress: string;

		confirm: Function;
	}
}