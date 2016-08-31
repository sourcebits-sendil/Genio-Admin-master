/*================================================================
Controller = sidebarCtrl
==================================================================*/

app.controller('sidebarCtrl',  ['$scope', 'dataAPI', '$rootScope', '$cookies', '$http', '$timeout', '$state','toaster', function ($scope, dataAPI, $rootScope, $cookies, $http, $timeout, $state,toaster)  {
 	'use strict';

  
  $scope.settingsPopover = {
  templateUrl: 'myPopoverTemplate.html',
};

// CHANGE PASSWORD 
$scope.gotoChangePassword = function(){
  $scope.isOpen = false;
  $state.go('homepage.changePwd'); }

/* LOGOUT FUNCTION */
$scope.logout = function() {

dataAPI.userLogout()
.then(
  function (data) {
    $rootScope.isLoginIn = false;
      $rootScope.authToken = '';
      $cookies.remove('userDetails');   
       document.cookie = 'userDetails' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        //   $http.defaults.headers.common.Authorization = '';
      //delete $http.defaults.headers.common['Authorization'];
    //  $http.defaults.headers.delete = { 'Content-Type' : 'application/json' }; 
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

   



  // loginAPI.logout()
  //   .then(function (data) {
  //     $rootScope.isLoginIn = false;
  //     $rootScope.authToken = '';
  //     $cookies.remove('userDetails');
  //     //$http.defaults.headers.common.Authorization = '';
  //     delete $http.defaults.headers.common['Authorization'];
  //     $http.defaults.headers.delete = { 'Content-Type' : 'application/json' };
  //     $timeout(function () {
  //       $state.go('login', {}, { reload: true });
  //     }, 0);
  //   },
  //   function (err) {
  //     notifyManager.show('Something went wrong', 'error');
  //   });
};

}]);

/*-----  End of Controller = sidebarCtrl  ------*/
