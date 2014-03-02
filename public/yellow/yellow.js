var yellow = angular.module('yellow', ['ngResource', 'ngRoute']);

yellow.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/', { templateUrl: '/partials/form', controller: 'MainCtrl' })

    $routeProvider.when('/courses', { templateUrl: '/partials/coursesAll', controller: 'CourseCtrl' })

});