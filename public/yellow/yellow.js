yellow = angular.module('yellow', ['angular-loading-bar', 'ngResource', 'ngRoute', 'ngDialog', 'duScroll', 'headroom']).value('duScrollDuration', 2000);

yellow.config(function ($routeProvider, $locationProvider,cfpLoadingBarProvider) {

    cfpLoadingBarProvider.latencyThreshold = 0;

    $locationProvider.html5Mode(true);

    $routeProvider.when('/', { templateUrl: '/partials/home', controller: 'MainCtrl' });

    $routeProvider.when('/courses', { templateUrl: '/partials/coursesAll', controller: 'CourseCtrl' });

    $routeProvider.when('/lecture', { templateUrl: '/partials/lecture', controller: 'LectureCtrl' });

    $routeProvider.when('/register', { templateUrl: '/partials/register', controller: 'RegisterCtrl' });

    $routeProvider.when('/login', { templateUrl: '/partials/login', controller: 'LoginCtrl' });

    $routeProvider.when('/404', { templateUrl: '/partials/404' });

    $routeProvider.otherwise({
        redirectTo: '/404'
    });

});