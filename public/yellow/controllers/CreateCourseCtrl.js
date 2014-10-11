﻿yellow.controller('CreateCourseCtrl', function ($scope, apiService, $location, dialogService, $routeParams) {
    $scope.create = function (course) {
        course.tags = course.tags.split(",");
        for (var i = 0; i < course.tags.length ; i++) {
            course.tags[i] = course.tags[i].trim();
        }

        apiService.post(course, '/api/course')         //API communication service takes (data, path)
                .then(
                function (response) {
                    if (!response.errors) {
                        console.log(response._id);
                        dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>Course Created</h3><h3>Add the First Module</h3></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="goToModule(\'' + response._id.trim() + '\')">Continue!</button></div>', true, 'CreateCourseCtrl');
                    }
                    else {
                        dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>Error</h3><p>' + response.message + '</p></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog()">Ok!</button></div>', true, 'CreateCourseCtrl');
                    }
                },

                    function (response_error) {
                        dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3> Error ' + response_error + '</h3><p>Server Error! Please try again later</p></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog()">Ok!</button></div>', true, 'CreateCourseCtrl');
                    }

                )

    }

    $scope.goToModule = function (id) {
        dialogService.closeAll();
        $location.path('/course/edit/' + id)
    }

    $scope.pushModule = function (module) {
        data = {
            module: module,
            id: $routeParams.id
        }

        apiService.post(data, '/api/course/module')         //API communication service takes (data, path)
                .then(
                    function (response) {
                        console.log(response);
                    }
                )
    }

});