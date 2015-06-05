yellow.factory('authService', function ($q, session, dialogService) {

    return {
        createUser: function (user) {           /*create a user in memory for the session*/
            session.currentUser = user;
        },

        destroyUser: function () {              /*  Opposite of create, simulate logout on the frontend */
            session.currentUser = undefined;
        },

        authorizeRole: function (role) {        /*   Authorize for specific role in route   */
            if (session.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('noAuth');
            }

        },

        authorize: function () {                /*  Authorizing a signed in user for route      */
            if (session.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('noAuth');
            }
        }
    };

});