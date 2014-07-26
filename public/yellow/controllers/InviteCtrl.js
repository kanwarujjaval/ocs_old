yellow.controller('InviteCtrl', function ($scope, $rootScope, inviteService, ngDialog, $q) {
    $scope.invite = 'Invite me';
    $scope.icon = 'arrow-right';
    $scope.clickToInvite = function (user) {
        inviteService.invite(user)
                .then(
                    function (response) {
                        $rootScope.res = response.message;
                        if (!response.errors) {
                            $scope.invite = 'Invited!';
                            $scope.icon = 'smile-o';
                        }
                        else {
                            $scope.invite = 'Error!';
                            $scope.icon = 'frown-o';
                        }
                    },
                    function (response_error) {
                        $rootScope.res_err = response_error;
                    }
                )
    };
});

yellow.controller('InsideCtrl', function ($scope, ngDialog) {
    $scope.openSecond = function () {
        ngDialog.close('ngdialog1');
        ngDialog.open({
            template: '<h3><a href="" ng-click="closeSecond()">Click here to close</a></h3>',
            plain: true,
            closeByEscape: false,
            controller: 'SecondModalCtrl'
        });
    };
});

yellow.controller('SecondModalCtrl', function ($scope, ngDialog) {
    $scope.closeSecond = function () {
        ngDialog.close();
    };
});