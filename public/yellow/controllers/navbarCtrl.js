yellow.controller('NavbarCtrl', function ($scope, ngDialog, $location, $rootScope, session) {
    $scope.session = session;

    $scope.loginPopup = function () {
        ngDialog.open({
            template: '/partials/login.html',
            closeByEscape: true,
            controller: 'LoginCtrl'
        });
    }

    $rootScope.$on('$locationChangeSuccess', function () {
        if ($location.path() == "/") {
            $scope.onLanding = true;
        }
        else {
            $scope.onLanding = false;
        }
    });
});