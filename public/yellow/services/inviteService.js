yellow.factory('inviteService', function ($resource) {
    return {
        invite: $resource('/invite')
        }
});