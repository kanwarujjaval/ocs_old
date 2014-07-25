yellow.controller('InviteCtrl', function ($scope, inviteService, ngDialog, $q) {
        $scope.invite = 'Invite me';
        $scope.clickToInvite = function (user) {
            inviteService.invite(user)
                    .then(
                        function(response){ $scope.invite = response },
                        function(response_error){ $scope.invite = response_error }
                    )
        };
});