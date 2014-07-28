yellow.factory('apiService', function ($resource, $q, $http) {
    return {
        invite: function (data,path) {
            deferred = $q.defer();
            $http.post(path, data)
            .success(function (data, status, header) {
                deferred.resolve(data);
            })
            .error(function (data, status, header) {
                deferred.reject(status);
            })
            return deferred.promise;
        }
    }
});