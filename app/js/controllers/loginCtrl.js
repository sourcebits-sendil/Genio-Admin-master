/*================================================================
Controller = loginCtrl
==================================================================*/

app.controller('loginCtrl', ['$scope', '$location', '$state', '$cookies', 'appConfig', 'loginAPI', '$rootScope', 'toaster', function($scope, $location, $state, $cookies, appConfig, loginAPI, $rootScope, toaster) {

    'use strict';

    $scope.displayPopUp = false;

    //redirect to dashboard if logged in already.
    if ($rootScope.isLoginIn) {
        $state.go('homepage.dashboard');
    }
    // Common login method please activate when the API are ready
    var loginUser = function() {
        //Login API
        $rootScope.loader = true;
        loginAPI.userLogin($scope.user)
            .then(function(data) {

                    if (data.status == 'failure') {
                        toaster.pop('error', "", data.err)
                        return
                    } else if (data.status == 'success') {
                        data.data.authentication_token = data.data.authorization; 
                        takeActionAfterLogin(data.data);
                    }

                },
                function(err) {
                    if (!err) {
                        toaster.pop('error', "", "Opps! Something went wrong. Please try again.");
                    } else if (err.msg) {
                        toaster.pop('error', "", err.msg);
                    } else {
                        toaster.pop('error', "", "Opps! Something went wrong. Please try again.");
                    }

                }).finally(function() {
                // stop loader
                $rootScope.loader = false;
            });
    };

    var takeActionAfterLogin = function(data) {

        // $('.btn-popup-login').removeAttr('disabled'); //enable login btn
        if (data.authentication_token != null) {
            //      if (data.msg == 'success' ) {
            $rootScope.isLoginIn = true;
            $('.user-detail-header').removeClass('none');
            $cookies.remove('userDetails'); //remove previous userDetails
            $rootScope.authToken = '';
            // Find tomorrow's date.
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            // Setting a cookie
            $cookies.putObject('userDetails', data, {
                expires: expireDate,
                path: '/'
            });
            $rootScope.authToken = data.authentication_token;
            $rootScope.userId = data.id;
            $state.go('homepage.dashboard');
        }

    };

    //Login submit
    $scope.loginFormSubmit = function() {
        loginUser();
 

    };
    //Forgot password popup
    $scope.showPopup = function() {
        $scope.displayPopUp = true;
    }
    $scope.closePopup = function() {
        $scope.displayPopUp = false;
    }

    $scope.forgotSubmit = function() {
        $scope.forgotPwdNotification = '';
        $('.popup-form-container .status-message').removeClass('error-msg success-msg');
        //console.log($scope.forgot.emailfield.$valid);
        if ((typeof $scope.emailaddress == 'undefined') || ($scope.emailaddress == "") || ($scope.forgot.emailfield.$valid == false)) {
            $('.popup-form-container .status-message').removeClass('success-msg').addClass('error-msg');
            $scope.forgotPwdNotification = "ENTER A VALID EMAIL ADDRESS";
        } else {

            //Forgot Password API
            loginAPI.forgotPassword($scope.emailaddress)
                .then(function(data) {
                        $('.popup-form-container .status-message').removeClass('error-msg').addClass('success-msg');
                        $scope.forgotPwdNotification = "We have sent you the password. please check your email.";
                    },
                    function(err) {
                        if (err && err.message) {
                            $scope.forgotMessage = err.message;
                        } else if (err && err.error) {
                            $scope.forgotMessage = err.error;
                        }
                    });
        }
    }

}]);

/*-----  End of Controller = loginCtrl  ------*/
