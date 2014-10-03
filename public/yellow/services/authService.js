yellow.factory('authService', function ($q, $http,session) {
    return {
        createUser: function (user) {
            session.currentUser = user;
        }
    }
});