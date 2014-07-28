angular.module('yellow').controller('RegisterCtrl', function ($scope) {
    $scope.login = function (user) {
        alert("you are trying to login with user details : " + user.email + " & " + user.password + "\n\n But to your horror, the login section doesn't work yet! ");
        console.log(user);
    }
});