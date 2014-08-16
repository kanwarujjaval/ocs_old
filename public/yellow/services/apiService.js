yellow.factory('apiService', function ($resource, $q, $http) {
    return {
        post: function (data, path) {
            deferred = $q.defer();
            $http.post(path, data)
            .success(function (data, status, header) {
                deferred.resolve(data);
            })
            .error(function (data, status, header) {
                deferred.reject(status);
            })
            return deferred.promise;
        },
        get: function (path) {
            deferred = $q.defer();
            $http.get(path)
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