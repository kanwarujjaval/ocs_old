yellow.controller('InviteCtrl', function ($scope, $q, apiService, dialogService) {
    $scope.invite = 'Invite me';                //Invite button text on homepage
    $scope.icon = 'arrow-right';                //Invite button font-awesome icon on homepage

    $scope.clickToInvite = function (user) {

        dialogService.dialogPlain('<h3>Processing</h3><i class="fa fa-circle-o-notch fa-spin"></i>', false)

        apiService.invite(user, '/invite')         //API communication service takes (data, path)
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
                        $scope.res_err = response_error;
                    }
                )
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