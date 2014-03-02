angular.module('yellow', ['ngResource', 'ngRoute']);

angular.module('yellow').config(function ($routeProvider, $locationProvider) {


    $locationProvider.html5Mode(true);

    $routeProvider.when('/', { templateUrl: '/partials/main/main', controller: 'mvMainCtrl' });
});