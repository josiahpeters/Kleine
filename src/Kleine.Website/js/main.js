/// <reference path='/scripts/typings/angularjs/angular.d.ts' />
var Model;
(function (Model) {
    var DueDate = (function () {
        function DueDate() {
        }
        return DueDate;
    })();
    Model.DueDate = DueDate;
})(Model || (Model = {}));

var Kleine;
(function (Kleine) {
    var Controller = (function () {
        function Controller($scope, $http) {
            this.httpService = $http;

            var controller = this;

            $scope.addNewDueDate = function () {
                var newDueDate = new Model.DueDate();
                newDueDate.BirthTitle = $scope.newBirthTitle;
                newDueDate.ExpectedDate = new Date($scope.newExpectedDate);

                console.log("sdf");

                controller.addDueDate(newDueDate, function () {
                    console.log(newDueDate);

                    controller.getAllDueDates(function (data) {
                        $scope.DueDates = data;
                    });
                });
            };

            $scope.deleteDueDate = function () {
            };
        }
        Controller.prototype.addDueDate = function (dueDate, successCallback) {
            console.log(dueDate);

            this.httpService.post("/api/DueDate/Create", dueDate).success(function () {
                successCallback();
            });
        };

        Controller.prototype.getAllDueDates = function (successCallBack) {
            this.httpService.get("/api/DueDate/").success(function (data, status) {
                successCallBack(data);
            });
        };
        return Controller;
    })();
    Kleine.Controller = Controller;
})(Kleine || (Kleine = {}));
//# sourceMappingURL=Main.js.map
