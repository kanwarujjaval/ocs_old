yellow.controller('InviteCtrl', function ($scope, inviteService, ngDialog, $q) {
        $scope.invite = 'Invite me';
        $scope.clickToInvite = function (user) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            promise.then(function(result){
                $scope.invite = result;
                }, function(reason){
                $scope.invite = reason;
                });

            inviteres = inviteService.invite.save(user);
            if(inviteres)
                deferred.resolve(inviteres);
            else
                deferred.reject(inviteres);
                
        };
});