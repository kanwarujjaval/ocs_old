yellow.factory('inviteService', function ($resource, $q, $http) {
    return {
            invite: function(user){
                deferred = $q.defer();
                $http.post('/invite', user)
                .success(function (data, status, header){
                    deferred.resolve(data);
                    })
                .error(function(data, status, header){
                    deferred.reject(status);
                    })
                return deferred.promise;
            }
        }
});