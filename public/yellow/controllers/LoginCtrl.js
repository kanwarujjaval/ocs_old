angular.module('yellow').controller('LoginCtrl', function ($scope, Api) {
    $scope.courses = Api.req.query({}, isArray = true);
});