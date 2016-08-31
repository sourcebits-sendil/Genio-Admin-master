/*================================================================
Controller = forgotGeniePwdCtrl
==================================================================*/

app.controller('forgotGeniePwdCtrl', ['$scope', '$rootScope', '$location', '$q' , '$state', '$http','toaster', function($scope, $rootScope, $location, $q,  $state, $http ,resetGenioPwd, toaster) {

    'use strict';


    var uri = window.location.href;

    var queryString = {};
    uri.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function($0, $1, $2, $3) {
            queryString[$1] = $3;
        }
    );

    console.log(queryString['id']);

    var defaultForm = {
        confirmPassword: "",
        newPassword: ""
    };
    $scope.changePassword = function() {

        $scope.lengthErr = false;
        $scope.matchErr = false;
        $scope.successMsg = false;
        $scope.netErr = false;

        if ($scope.user.newPassword.length < 6 || $scope.user.newPassword.length > 10) {
            //    toaster.pop('error', "", "Opps! Some error occured, Please try again");
            $scope.lengthErr = true;
            resetform();
            return; 
        } else if ($scope.user.newPassword != $scope.user.confirmPassword) {
            // toaster.pop("error", "" , "Passwords did not match")
            $scope.matchErr = true;
          resetform();
            return;
        }
        $scope.cred = {}
        $scope.cred.id = queryString['id'];
        $scope.cred.password = $scope.user.newPassword;
        resetPwd();
    }

    function resetPwd() {
        $scope.lengthErr = false;
        $scope.matchErr = false;
        $rootScope.loader = true;
       resetform();

        $scope.resetGenioPwd($scope.cred)
            .then(function(data) {
                    $scope.successMsg = true;
                   resetform();
                },
                function(error) {
                    //   toaster.pop("error", "" , ""})
                    $scope.netErr = true;
                }).finally(function() {
                $rootScope.loader = false;
                $scope.lengthErr = false;
                $scope.matchErr = false;
            });
    }

$scope.resetGenioPwd = function (filter){

    var deferred = $q.defer();
    // var serviceUrl = 'http://192.168.11.108:4000/experts/resetpassword/'+filter.id;
  var serviceUrl = 'http://52.38.106.14:8000/experts/resetpassword/'+filter.id;
    var requestBody = {
      'password' : filter.password 
    };
debugger
    $http.post(serviceUrl,requestBody)
      .success(function (data) {
        deferred.resolve(data);
      })
      .error(function (err) {
        deferred.reject(err);
      });

    return deferred.promise;

  };
    function resetform(){
         $scope.changePwd.$setPristine();
                    $scope.user = defaultForm;
    }

}]);

/*-----  End of Controller = forgotGeniePwdCtrl  ------*/
