yellow.controller('LoginCtrl', function ($scope, apiService, dialogService,$location,authService) {
    $scope.login = function (user) {
        dialogService.dialogPlain('<h3>Processing</h3><i class="fa fa-circle-o-notch fa-spin"></i>', true, 'LoginCtrl');
        apiService.post(user, '/login')         //API communication service takes (data, path)
                .then(
                    function (response) {
                        if (!response.errors) {
                            dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>' + response.message + '</h3><h3>Continue to your dashboard</h3></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="gotodashboard()">Continue!</button></div>', true, 'LoginCtrl');
                            authService.createUser(response.user);
                        }
                        else {
                            dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>Error Logging in</h3><p>Please Try again !</p><p>' + response.message + '</p></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog()">Ok!</button></div>', true, 'LoginCtrl');
                        }
                    },

                    function (response_error) {
                        dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3> Error ' + response_error + '</h3><p>Server Error! Please try again later</p></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog()">Ok!</button></div>', true, 'LoginCtrl');
                    }
                )
    }

    $scope.gotodashboard = function () {
        $location.path('/dashboard');
        dialogService.closeAll();
    }
});