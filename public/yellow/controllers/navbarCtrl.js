angular.module('yellow').controller('NavbarCtrl', function ($scope, ngDialog) {
    $scope.loginPopup = function () {
        ngDialog.open({
            template: '/partials/login.html',
            closeByEscape: true,
            controller: 'LoginCtrl'
        });
    }
});