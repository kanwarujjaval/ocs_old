angular.module('yellow').controller('CourseCtrl', function ($scope, Api) {
    $scope.pageTitle = "Home";
    $scope.courses = Api.req.query({}, isArray = true);
});