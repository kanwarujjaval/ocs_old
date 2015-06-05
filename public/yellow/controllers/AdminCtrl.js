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
        )
    }
});