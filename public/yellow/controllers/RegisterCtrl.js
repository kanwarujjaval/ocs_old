yellow.controller('RegisterCtrl', function ($scope, apiService, $routeParams, dialogService, $location) {
    $scope.register = function (user) {
        var path = '/signup/' + $routeParams.token;
        dialogService.dialogPlain('<h3>Processing</h3><i class="fa fa-circle-o-notch fa-spin"></i>', true, 'RegisterCtrl')
        apiService.post(user, path)         //API communication service takes (data, path)
                .then(
                    function (response) {
                        if (!response.errors) {
                            confirmed = true;
                            dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>' + response.message + '</h3><p>You are now a part of the Open Cloud School community</p></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="continue(' + confirmed + ')">Ok!</button></div>', true, 'RegisterCtrl');
                        }
                        else {
                            confirmed = false;
                            dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>' + response.message + '</h3><p>Error Processing , Please Try again !</p></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="continue(' + confirmed + ')">Ok!</button></div>', true, 'RegisterCtrl');

                        }
                    },

                    function (response_error) {
                        console.log(response);
                    }
                )
    }

    $scope.continue = function (confirmed) {
        if (confirmed) {
            dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>Continue to your dashboard</h3></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="gotodashboard()">Continue!</button></div>', true, 'RegisterCtrl');
        }
        else {
            dialogService.closeAll();
        }
    }

    $scope.gotodashboard = function () {
        $location.path('/dashboard');
        dialogService.closeAll();
    }
});
