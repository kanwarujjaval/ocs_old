var yellow = angular.module('yellow', ['ngResource', 'ngRoute', 'duScroll', 'chieffancypants.loadingBar']).value('duScrollDuration', 2000);

yellow.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/', { templateUrl: '/partials/home', controller: 'MainCtrl' });

    $routeProvider.when('/courses', { templateUrl: '/partials/coursesAll', controller: 'CourseCtrl' });

    $routeProvider.when('/lecture', { templateUrl: '/partials/lecture', controller: 'LectureCtrl' });

    $routeProvider.when('/login', { templateUrl: '/partials/login', controller: 'LoginCtrl' });

    $routeProvider.when('/404', { templateUrl: '/partials/404' });

    $routeProvider.otherwise({
        redirectTo: '/404'
    });

});