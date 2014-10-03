yellow.controller('CourseCtrl', function ($scope, Api) {
    $scope.courses = Api.req.query({}, isArray = true);
});