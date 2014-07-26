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
            template: '<h3>Share with your friends!</h3><a href="http://www.facebook.com/share.php?u=http://www.opencloudschool.org&title=I just signed up for Open Cloud School beta" target="_blank"><button class="btn-flat btn-fb">Share</button></a><a href="http://twitter.com/intent/tweet?url=http://www.opencloudschool.org/&text=I+just+signed+up+for+Open+Cloud+School+beta!&hashtags=OpenCloudSchool,Beta" target="_blank"><button class="btn-flat btn-twitter">Tweet</button></a>',
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