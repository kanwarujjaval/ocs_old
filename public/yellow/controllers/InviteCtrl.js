yellow.controller('InviteCtrl', function ($scope, inviteService, ngDialog) {
        $scope.invite = 'Invite me';
        $scope.clickToInvite = function (user) {
            inviteService.invite.save(user);
            $scope.invite = 'response';
        };
});