yellow.factory('inviteService', function ($resource, $q) {
    return {
            invite: function(user){
                var deferred = $q.defer();
                $resource('/invite').save(user, 
                    function(response) { deferred.resolve(response); },
                    function(response) { deferred.reject(response);}
                    )
                return deferred.promise;
            }
        }
});