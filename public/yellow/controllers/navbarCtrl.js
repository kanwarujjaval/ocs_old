angular.module('yellow').controller('NavbarCtrl', function ($scope, $location) {
    $scope.loc = $location.path();
});