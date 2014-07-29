angular.module('yellow').controller('RegisterCtrl', function ($scope,apiService) {
    $scope.login = function (user) {
        apiService.post(user, '/login')         //API communication service takes (data, path)
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
