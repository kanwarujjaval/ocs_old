yellow = angular.module('yellow', ['angular-loading-bar', 'ngResource', 'ngRoute', 'ngDialog', 'duScroll', 'headroom']).value('duScrollDuration', 2000);

yellow.config(function ($routeProvider, $locationProvider,cfpLoadingBarProvider) {

    cfpLoadingBarProvider.latencyThreshold = 0;

    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        templateUrl: '/partials/home', controller: 'MainCtrl'
    });

    $routeProvider.when('/profile', {
        templateUrl: '/partials/profile', controller: 'ProfileCtrl'
    });

    $routeProvider.when('/profileedit', {
        templateUrl: '/partials/profileedit', controller: 'ProfileEditCtrl'
    });

    $routeProvider.when('/dashboard', {
        templateUrl: '/partials/dashboard', controller: 'DashboardCtrl'
    });

    $routeProvider.when('/courses', {
        templateUrl: '/partials/coursesAll', controller: 'CourseCtrl'
    });

    $routeProvider.when('/singlecourse', {
        templateUrl: '/partials/singleCourse', controller: 'SingleCourseCtrl'
    });

    $routeProvider.when('/lecture', {
        templateUrl: '/partials/lecture', controller: 'LectureCtrl'
    });

    $routeProvider.when('/register/:token', {
        templateUrl: '/partials/register', controller: 'RegisterCtrl'
    });

    $routeProvider.when('/admin', {
        templateUrl: '/partials/admin', controller: 'AdminCtrl'
    });

    $routeProvider.when('/404', {
        templateUrl: '/partials/404'
    });

    $routeProvider.otherwise({
        redirectTo: '/404'
    });

});