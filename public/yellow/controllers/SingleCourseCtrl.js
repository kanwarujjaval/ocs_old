angular.module('yellow').controller('SingleCourseCtrl', function ($scope, Api) {
    $scope.courses = Api.req.query({}, isArray = true);
});