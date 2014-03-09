var yellow = angular.module('yellow', ['ngResource', 'ngRoute','chieffancypants.loadingBar', 'ngAnimate']);

yellow.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/', { templateUrl: '/partials/home', controller: 'MainCtrl' });

    $routeProvider.when('/courses', { templateUrl: '/partials/coursesAll', controller: 'CourseCtrl' });

    $routeProvider.otherwise({
        redirectTo: '/404'
    });

});