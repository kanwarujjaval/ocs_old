angular.module('yellow').controller('AdminCtrl', function ($scope, apiService) {

    apiService.get('/api/invites')
               .then(
                   function (response) {
                       $scope.inviteReq = response;
                   }
                )
});