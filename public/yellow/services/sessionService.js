yellow.factory('session', function ($http,$window) {
    var currentUser;
    if (!!$window.ssu) {
        currentUser = $window.ssu;
    }

    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorized: function (role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
});