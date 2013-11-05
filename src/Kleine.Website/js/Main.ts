/// <reference path='/scripts/typings/angularjs/angular.d.ts' />

module Model 
{
    export class DueDate 
    {
        Id: string;
        BirthTitle: string;
        ExpectedDate: Date;
    }
}

module Kleine
{
    export interface Scope 
    {
        newBirthTitle: string;
        newExpectedDate: string;
        DueDates: Model.DueDate[];

        addNewDueDate: Function;
        deleteDueDate: Function;
    }

    export class Controller
    {
        private httpService: any;

        constructor($scope: Scope, $http: any)
        {
			this.httpService = $http;

			$scope.newExpectedDate = new Date().toLocaleDateString();

            var controller = this;
            
            $scope.addNewDueDate = function ()
            {
                var newDueDate = new Model.DueDate();
                newDueDate.BirthTitle = $scope.newBirthTitle;
                newDueDate.ExpectedDate = new Date($scope.newExpectedDate);

                controller.addDueDate(newDueDate, function ()
                {
                    controller.getAllDueDates(function (data)
                    {
                        $scope.DueDates = data;
                    });
                });
            };

            $scope.deleteDueDate = function ()
            {

            };
        }

        addDueDate(dueDate: Model.DueDate, successCallback: Function): void
        {
            console.log(dueDate);

            this.httpService.post("/api/DueDate/", dueDate).success(function ()
            {
                successCallback();
            });
        }

        getAllDueDates(successCallBack: Function): void
        {
            this.httpService.get("/api/DueDate/").success(function (data, status)
            {
                successCallBack(data);
            });
        }
    }
}