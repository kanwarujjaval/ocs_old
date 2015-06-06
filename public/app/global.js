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
yellow.controller('AdminCtrl', function ($scope, apiService, dialogService) {

    apiService.get('/api/invites')
               .then(
                   function (response) {
                       $scope.inviteReq = response;
                   }
                );


    $scope.sendSignUpLink = function (user) {
        apiService.post(user, '/sendtoken')         //API communication service takes (data, path)
        .then(
            function (response) {
                if (!response.errors) {
                    dialogService.dialogPlain('<div class="ngdialog-message"><h3>' + response.message + '</h3></div>', true, 'AdminCtrl');
                }
                else {
                    dialogService.dialogPlain('<div class="ngdialog-message"><h3>' + response.message + '</h3></div>', true, 'AdminCtrl');
                }
            },

            function (response_error) {
                 dialogService.dialogPlain('<div class="ngdialog-message"><h3>ERROR IN RESPONSE</h3></div>', true, 'AdminCtrl');
            }
        );
    };
});
yellow.controller('CreateCourseCtrl', function ($scope, apiService, $location, dialogService, $routeParams, $upload) {
    $scope.create = function (course) {
        course.tags = course.tags.split(",");
        for (var i = 0; i < course.tags.length ; i++) {
            course.tags[i] = course.tags[i].trim();
        }

        apiService.post(course, '/api/course')         //API communication service takes (data, path)
                .then(
                function (response) {
                    if (!response.errors) {
                        console.log(response._id);
                        dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>Course Created</h3><h3>Add the First Module</h3></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="goToModule(\'' + response._id.trim() + '\')">Continue!</button></div>', true, 'CreateCourseCtrl');
                    }
                    else {
                        dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>Error</h3><p>' + response.message + '</p></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog()">Ok!</button></div>', true, 'CreateCourseCtrl');
                    }
                },

                    function (response_error) {
                        dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3> Error ' + response_error + '</h3><p>Server Error! Please try again later</p></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog()">Ok!</button></div>', true, 'CreateCourseCtrl');
                    }

                );

    };

    $scope.goToModule = function (id) {
        dialogService.closeAll();
        $location.path('/course/edit/' + id);
    };

    $scope.pushModule = function (module) {
        data = {
            module: module,
            id: $routeParams.id
        };

        apiService.post(data, '/api/course/module')         //API communication service takes (data, path)
                .then(
                    function (response) {
                        console.log(response);
                    }
                );
    };

    var upload = function (response) {
        $scope.upload = $upload.upload({
            url: response.upload_link_secure,
            method: 'POST',
            //headers: {'header-key': 'header-value'},
            //withCredentials: true,
            //data: { myObj: $scope.myModelObj },
            file: file
        }).progress(function (evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function (data, status, headers, config) {
            console.log(status);
            console.log(data);
        });
        //.error(...)
        //.then(success, error, progress);
        // access or attach event listeners to the underlying XMLHttpRequest.
        //.xhr(function(xhr){xhr.upload.addEventListener(...)})
    };

    $scope.onFileSelect = function ($files) {
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            apiService.get('/api/course/module/genuptoken').then(
                upload(response)
                );
        }
    };
});
yellow.controller('DashboardCtrl', function ($scope) {

});
yellow.controller('InviteCtrl', function ($scope, $q, apiService, dialogService) {
    $scope.invite = 'Invite me';                //Invite button text on homepage
    $scope.icon = 'arrow-right';                //Invite button font-awesome icon on homepage

    $scope.clickToInvite = function (user) {

        dialogService.dialogPlain('<h3>Processing</h3><i class="fa fa-circle-o-notch fa-spin"></i>', true,'InviteCtrl');

        apiService.post(user, '/invite')         //API communication service takes (data, path)
                .then(
                    function (response) {
                        //$rootScope.res = response.message;    //Removing all $rootScope to prevent future bugs and errors
                        if (!response.errors) {
                            $scope.invite = 'Invited!';     //Invite button text on homepage
                            $scope.icon = 'smile-o';        //Invite button font-awesome icon on homepage
                            confirmed = true;        // Variable set to true, now there will be second popup
                            dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>' + response.message + '</h3><p>We have signed you up for public beta,<br /> keep on eye on your email for more information.</p></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="openSecond(' + confirmed + ')">Ok!</button></div>', true, 'InviteCtrl');
                        }
                        else {
                            confirmed = false;       //Variable set to FALSE on error/no-success response, second popup not shown
                            dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>' + response.message + '</h3><p>Error Processing your email address</p></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="openSecond(' + confirmed + ')">Ok!</button></div>', true, 'InviteCtrl');

                        }
                    },

                    function (response_error) {
                        dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3> Error ' + response_error + '</h3><p>Server Error! Please try again later</p></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="openSecond(' + false + ')">Ok!</button></div>', true, 'InviteCtrl');
                    }
                );
    };


    $scope.openSecond = function (confirmed) {
        if (confirmed) {
            dialogService.dialogPlain('<h3>Share with your friends!</h3><a href="http://www.facebook.com/share.php?u=http://www.opencloudschool.org&title=I just signed up for Open Cloud School beta" target="_blank"><button class="btn-flat btn-fb"><i class="fa fa-facebook-square"></i> Share</button></a><a href="http://twitter.com/intent/tweet?url=http://www.opencloudschool.org/&text=I+just+signed+up+for+Open+Cloud+School+beta!&hashtags=OpenCloudSchool,Beta" target="_blank"><button class="btn-flat btn-twitter"><i class="fa fa-twitter-square"></i> Tweet</button></a>', true);
        }
        else {
            dialogService.closeAll();
        }
    };
});
yellow.controller('LoginCtrl', function ($scope, apiService, dialogService,$location,authService) {
    $scope.login = function (user) {
        dialogService.dialogPlain('<h3>Processing</h3><i class="fa fa-circle-o-notch fa-spin"></i>', true, 'LoginCtrl');
        apiService.post(user, '/login')         //API communication service takes (data, path)
                .then(
                    function (response) {
                        if (!response.errors) {
                            dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>' + response.message + '</h3><h3>Continue to your dashboard</h3></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="gotodashboard()">Continue!</button></div>', true, 'LoginCtrl');
                            authService.createUser(response.user);
                        }
                        else {
                            dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>Error Logging in</h3><p>Please Try again !</p><p>' + response.message + '</p></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog()">Ok!</button></div>', true, 'LoginCtrl');
                        }
                    },

                    function (response_error) {
                        dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3> Error ' + response_error + '</h3><p>Server Error! Please try again later</p></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog()">Ok!</button></div>', true, 'LoginCtrl');
                    }
                );
    };

    $scope.gotodashboard = function () {
        $location.path('/dashboard');
        dialogService.closeAll();
    };
});
yellow.controller('MainCtrl', function ($scope) {
    
});
yellow.controller('ProfileCtrl', function ($scope,apiService) {
    
    apiService.get('/api/profile')
               .then(
                   function (response) {
                       $scope.user = response;
                   }
                );

});
yellow.controller('ProfileEditCtrl', function ($scope) {

});
yellow.controller('RegisterCtrl', function ($scope, apiService, $routeParams, dialogService, $location) {
    $scope.register = function (user) {
        var path = '/signup/' + $routeParams.token;
        dialogService.dialogPlain('<h3>Processing</h3><i class="fa fa-circle-o-notch fa-spin"></i>', true, 'RegisterCtrl');
        apiService.post(user, path)         //API communication service takes (data, path)
                .then(
                    function (response) {
                        if (!response.errors) {
                            confirmed = true;
                            dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>' + response.message + '</h3><p>You are now a part of the Open Cloud School community</p></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="continue(' + confirmed + ')">Ok!</button></div>', true, 'RegisterCtrl');
                        }
                        else {
                            confirmed = false;
                            dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>' + response.message + '</h3><p>Error Processing , Please Try again !</p></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="continue(' + confirmed + ')">Ok!</button></div>', true, 'RegisterCtrl');

                        }
                    },

                    function (response_error) {
                        console.log(response);
                    }
                );
    };

    $scope.continue = function (confirmed) {
        if (confirmed) {
            dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>Continue to your dashboard</h3></div><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="gotodashboard()">Continue!</button></div>', true, 'RegisterCtrl');
        }
        else {
            dialogService.closeAll();
        }
    };

    $scope.gotodashboard = function () {
        $location.path('/dashboard');
        dialogService.closeAll();
    };
});

yellow.controller('SingleCourseCtrl', function () {
});
yellow.controller('NavbarCtrl', function ($scope, ngDialog, $location, $rootScope, session, authService, dialogService) {
    $scope.session = session;
    if ($location.path() == "/") {
        $scope.onLanding = true;
    } else {
        $scope.onLanding = false;
    }

    $scope.loginPopup = function () {
        ngDialog.open({
            template: '/partials/login.html',
            closeByEscape: true,
            controller: 'LoginCtrl'
        });
    };

    $scope.logout = function () {
        authService.destroyUser();
        dialogService.dialogPlain('<div class="ngdialog-buttons"><div class="ngdialog-message"><h3>Logged Out</h3></div></div>', true, 'LoginCtrl');
    };

    $rootScope.$on('$locationC`angeSuccess', function () {
        if ($location.path() == "/") {
            $scope.onLanding = true;
        }
        else {
            $scope.onLanding = false;
        }
    });
});
yellow.factory('apiService', function ($q, $http) {
    return {
        post: function (data, path) {
            deferred = $q.defer();
            $http.post(path, data)
            .success(function (data, status, header) {
                deferred.resolve(data);
            })
            .error(function (data, status, header) {
                deferred.reject(status);
            });
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
            });
            return deferred.promise;
        }
    };
});
yellow.factory('authService', function ($q, session, dialogService) {

    return {
        createUser: function (user) {           /*create a user in memory for the session*/
            session.currentUser = user;
        },

        destroyUser: function () {              /*  Opposite of create, simulate logout on the frontend */
            session.currentUser = undefined;
        },

        authorizeRole: function (role) {        /*   Authorize for specific role in route   */
            if (session.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('noAuth');
            }

        },

        authorize: function () {                /*  Authorizing a signed in user for route      */
            if (session.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('noAuth');
            }
        }
    };

});
/*
 * Service to generate NgDialogs (Abstraction over abstraction lol) 
 * 
 * 
 * .dialogPlain - returns plain dialog , takes
 *              1. template data
 *              2. boolean to close all previous dialogs
 *              3. Controller name
 * 
 *  .closeall - closes all previous dialogs
 * 
 * 
 */

yellow.factory('dialogService', function (ngDialog) {
    return {
        dialogPlain: function (data, closeprev,Ctrl) {
            if (closeprev) {
                ngDialog.closeAll();
            }
            ngDialog.open({
                template: data,
                plain: true,
                closeByEscape: true,
                controller: Ctrl
            });
        },

        closeAll: function () {
            ngDialog.closeAll();
        }
    };
});
/*
 * 
 *  Alternate for unsafe binding, enter html to return trusted html 
 * 
 */

yellow.factory('htmlService', function ($sce) {
    return {
        html: function (data) {
            returndata = $sce.trustAsHtml(data);
            return returndata;
        }
    };
});
yellow.factory('session', function ($http,$window) {
    var currentUser;
    if (!!$window.ssu) {
        currentUser = $window.ssu;
    }

    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorized: function (role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    };
});