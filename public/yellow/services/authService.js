yellow.factory('authService', function ($rootScope,$q, $http, session, $location,dialogService) {

    return {
        createUser: function (user) {
            session.currentUser = user;
        },
        authorizeRole: function (role) {
            if (session.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('noAuth');
            }

        },
        authorize: function () {
            if (session.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('noAuth');
            }
        }
    }

});