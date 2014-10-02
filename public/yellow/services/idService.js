angular.module('yellow').factory('idService', function ($window, userService) {
    var currentUser;
    if (!!$window.bootstrappedUserObject) {
        currentUser = new userService();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorised: function (role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
});