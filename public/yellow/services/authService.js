angular.module('yellow').factory('authService', function (apiService, idService, userService, apiService) {
    return {
        authenticateUser: function (user) {
            apiService.post(user, '/login')
                .then(
                function (response) {
                    if (!response.errors) {
                        var user = new userService();
                        angular.extend(user, response.data.user);       //>>>>>??????
                        idService.currentUser = user;
                        var loggedin = true;
                    }
                    else {
                        var loggedin = false;
                    }
                });
            return loggedin;
        },
        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', { logout: true }).then(function () {
                idService.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },
        authorisedCurrentUserForRoute: function (role) {
            if (idService.isAuthorised(role)) {
                return true;
            }
            else {
                return $q.reject('not authorised');
            }
        }
    }
});