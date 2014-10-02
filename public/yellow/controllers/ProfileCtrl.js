angular.module('yellow').controller('ProfileCtrl', function ($scope,apiService) {
    
    apiService.get('/api/profile')
               .then(
                   function (response) {
                       $scope.user = response;
                   }
                )

});