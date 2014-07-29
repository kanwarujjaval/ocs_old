angular.module('yellow').controller('RegisterCtrl', function ($scope, apiService, $routeParams) {
    $scope.register = function (user) {
        var path = '/signup/' + $routeParams.token;
        console.log(path);
        apiService.post(user, path)         //API communication service takes (data, path)
                .then(
                    function (response) {
                        console.log(response);
                    },

                    function (response_error) {
                        console.log(response);
                    }
                )
    }
});
