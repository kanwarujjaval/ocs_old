angular.module('yellow').factory('userService', function (apiService) {

    apiService.get('/api/profile')
           .then(function (response) {
               var userResource = response;
           })

    userResource.prototype.isAdmin = function () {
        return this.roles && this.roles.indexOf('admin') > -1;
    }
    return userResource;
});