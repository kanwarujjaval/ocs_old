yellow = angular.module('yellow', ['angular-loading-bar', 'ngRoute', 'ngDialog', 'duScroll', 'angularFileUpload']).value('duScrollDuration', 2000);

yellow.run(function ($rootScope, $location, dialogService) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'noAuth') {
            dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message">Not authorized</div></div>', true, '');
            $location.path((previous) ? previous.originalPath : '/');
        }
    });
});

var routeCheck = {
    admin: {
        auth: function (authService) {
            return authService.authorizeRole('admin');
        }
    },
    user: {
        auth: function (authService) {
            return authService.authorize();
        }
    }
};

yellow.config(function ($routeProvider, $locationProvider, cfpLoadingBarProvider) {

    cfpLoadingBarProvider.latencyThreshold = 0;

    $locationProvider.html5Mode({ enabled: true, requireBase: false });

    $routeProvider.when('/', {
        templateUrl: '/partials/home',
        controller: 'MainCtrl'
    });

    $routeProvider.when('/profile', {
        templateUrl: '/partials/profile',
        controller: 'ProfileCtrl',
        resolve: routeCheck.user
    });

    $routeProvider.when('/editprofile', {
        templateUrl: '/partials/profileedit',
        controller: 'ProfileEditCtrl',
        resolve: routeCheck.user
    });

    $routeProvider.when('/dashboard', {
        templateUrl: '/partials/dashboard',
        controller: 'DashboardCtrl',
        resolve: routeCheck.user
    });

    $routeProvider.when('/course/create', {
        templateUrl: '/partials/createCourse',
        controller: 'CreateCourseCtrl',
        resolve: routeCheck.user
    });

    $routeProvider.when('/course/edit/:id', {
        templateUrl: '/partials/createModule',
        controller: 'CreateCourseCtrl',
        resolve: routeCheck.user
    });

    $routeProvider.when('/course/:id', {
        templateUrl: '/partials/singleCourse',
        controller: 'SingleCourseCtrl',
        resolve: routeCheck.user
    });

    $routeProvider.when('/register/:token', {
        templateUrl: '/partials/register',
        controller: 'RegisterCtrl'
    });

    $routeProvider.when('/admin', {
        templateUrl: '/partials/admin',
        controller: 'AdminCtrl',
        resolve: routeCheck.admin
    });

    $routeProvider.when('/404', {
        templateUrl: '/partials/404'
    });

    $routeProvider.otherwise({
        redirectTo: '/404'
    });

});