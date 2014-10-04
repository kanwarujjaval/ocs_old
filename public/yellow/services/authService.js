yellow.factory('authService', function ($q, session, dialogService) {

    return {
        createUser: function (user) {
            session.currentUser = user;
        },
        destroyUser: function () {
            session.currentUser = undefined;
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