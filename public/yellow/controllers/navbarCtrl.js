yellow.controller('NavbarCtrl', function ($scope, ngDialog, $location, $rootScope, session, authService, dialogService) {
    $scope.session = session;
    if ($location.path() == "/") {
        $scope.onLanding = true;
    } else {
        $scope.onLanding = false;
    }

    $scope.loginPopup = function () {
        ngDialog.open({
            template: '/partials/login.html',
            closeByEscape: true,
            controller: 'LoginCtrl'
        });
    };

    $scope.logout = function () {
        authService.destroyUser();
        dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>Logged Out</h3></div></div>', true, 'LoginCtrl');
    };

    $rootScope.$on('$locationChangeSuccess', function () {
        if ($location.path() == "/") {
            $scope.onLanding = true;
        }
        else {
            $scope.onLanding = false;
        }
    });
});