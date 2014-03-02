angular.module('yellow', ['ngResource', 'ngRoute']);

angular.module('yellow').config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/', { templateUrl: '/partials/part', controller: 'MainCtrl' })
    
    $routeProvider.when('/a', { templateUrl: '/partials/part2', controller: 'MainCtrl' })

});