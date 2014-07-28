yellow.controller('InsideCtrl', function ($scope, ngDialog) {
    $scope.openSecond = function (confirmed) {
        if (confirmed) {
            ngDialog.close('ngdialog1');
            ngDialog.open({
                template: '<h3>Share with your friends!</h3><a href="http://www.facebook.com/share.php?u=http://www.opencloudschool.org&title=I just signed up for Open Cloud School beta" target="_blank"><button class="btn-flat btn-fb"><i class="fa fa-facebook-square"></i> Share</button></a><a href="http://twitter.com/intent/tweet?url=http://www.opencloudschool.org/&text=I+just+signed+up+for+Open+Cloud+School+beta!&hashtags=OpenCloudSchool,Beta" target="_blank"><button class="btn-flat btn-twitter"><i class="fa fa-twitter-square"></i> Tweet</button></a>',
                plain: true,
                closeByEscape: true,
                controller: 'SecondModalCtrl'
            });
        }
        else {
            ngDialog.closeAll();
        }
    };
});