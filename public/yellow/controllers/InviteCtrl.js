angular.module('yellow').controller('InviteCtrl', function ($scope, ngDialog) {
        $scope.clickToOpen = function () {
            ngDialog.open({ template: 'firstDialog' });
        };
});