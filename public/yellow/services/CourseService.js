angular.module('yellow').factory("Api", function ($resource) {
    return {
        req: $resource("/api/course/all")
    }
});