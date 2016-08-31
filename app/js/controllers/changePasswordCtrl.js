// ---------------------------------
/*================================================================
Controller = changePasswordCtrl
==================================================================*/
app.controller("changePasswordCtrl", ['$scope', '$rootScope', '$state', '$cookies','$timeout', 'dataAPI', 'toaster',
    function($scope, $rootScope, $state,$cookies, $timeout, dataAPI, toaster) {


        var defaultFormData = {
            currentPwd: '',
            newPwd: '',
            confirmPwd: ''
        }


        $scope.user = angular.copy(defaultFormData);

        $scope.resetPassword = function() {

            if ($scope.user.newPwd != $scope.user.confirmPwd) {
                toaster.pop('error', "", "Passwords do not match");
                return;
            }

            var params = {
                username: "admin",
                newPassword: $scope.user.newPwd,
                currentPassword: $scope.user.currentPwd
            }

            dataAPI.resetAdminPassword(params)
                .then(

                    function(response) {
                        if (response.status == 'failure') {
                            toaster.pop('error', "", response.err);
                            return
                        } else if (response.status == "success") {
                            toaster.pop('success', "", "Your password has been reset successfully. Please re-login");
                            $scope.user = angular.copy(defaultFormData);
                            $scope.passwordForm.$setPristine();
                             $scope.logout();
                        } else {

                            toaster.pop('error', "", "Opps! something went wrong, Please try again.");
                        }
                    },
                    function(err) {

                    }
                )



        }

        $scope.logout = function() {

dataAPI.userLogout()
.then(
  function (data) {
    $rootScope.isLoginIn = false;
      $rootScope.authToken = '';
      $cookies.remove('userDetails');   
       document.cookie = 'userDetails' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        $timeout(function () {
        $rootScope.isLoginIn = false;
       $state.go('login'
       , {}, { reload: true });
      }, 0);
  },
   function(err) {
                     if(err == "Access Denied - You don't have permission  "){toaster.pop('error', "", "Your session has expired. Please re-login");}
                    else {toaster.pop('error', "", "Opps! Some error occured, Please try again");}
                })

}
    }
]);

/*-----  End of Controller = changePasswordCtrl  ------*/
