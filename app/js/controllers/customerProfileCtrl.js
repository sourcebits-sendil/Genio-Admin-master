/*================================================================
Controller = customerProfileCtrl
==================================================================*/

app.controller('customerProfileCtrl', ['$scope', '$rootScope', '$stateParams', '$confirm', 'appConfig', 'dataAPI', 'toaster', function($scope, $rootScope, $stateParams, $confirm, appConfig, dataAPI, toaster) {
    'use strict';

    $scope.customer = [];
    $scope.customerId = $stateParams.customerId;;
    $scope.baseURL = appConfig.baseURL + 'admin/';

    function customersDetail() {
        $rootScope.loader = true;
        dataAPI.customersDetail($scope.customerId)
            .then(function(response) {
                    if (!response || response.length < 1 || response.data.length < 1) {
                        $scope.noData = true;
                        return
                    } else {
                        $scope.customer = response.data;

                        angular.forEach($scope.customer.electronic_addresses, function(address, key) {
                            if (address.type == "PHONE") $scope.customer.phone = address.value
                        });

                        console.log($scope.customer)
                    }
                },
                function(err) {
                    if (err == "Access Denied - You don't have permission  ") {
                        toaster.pop('error', "", "Your session has expired. Please re-login");
                        return
                    } else if (err.msg) {
                        toaster.pop('error', "", err.msg);
                    } else {
                        toaster.pop('error', "", "Opps! Something went wrong. Please try again.");
                    }
                }).finally(function() {
                $rootScope.loader = false;
            });
    }
    customersDetail();

    $scope.banUser = function() {
        $confirm({
                text: 'Are you sure you want to ban customer?'
            })
            .then(function() {

                $rootScope.loader = true;
                dataAPI.banUser($scope.customerId, 'customers', true).then(
                    function(data) {

                        if (data.status == "success") {
                            $scope.customer.isban = true;
                            toaster.pop('success', "", "User profile has been Banned successfully.");
                        } else if (data.status == "failure") {
                            toaster.pop('error', "", data.err);
                        }

                    },
                    function(err) {
                        if (err == "Access Denied - You don't have permission  ") {
                            toaster.pop('error', "", "Your session has expired. Please re-login");
                            return
                        } else if (err.msg) {
                            toaster.pop('error', "", err.msg);
                        } else {
                            toaster.pop('error', "", "Opps! Something went wrong. Please try again.");
                        }
                    }).finally(function() {
                    $rootScope.loader = false;
                });

            });
    }

    $scope.unBanUser = function() {
        $confirm({
                text: 'Are you sure you want to unban customer?'
            })
            .then(function() {
                $rootScope.loader = true;
                dataAPI.banUser($scope.customerId, 'customers', false).then(
                    function(data) {

                        if (data.status == "success") {
                            $scope.customer.isban = false;
                            toaster.pop('success', "", "Successfully unbanned the user");
                        } else if (data.status == "failure") {
                            toaster.pop('error', "", data.err);
                        }

                    },
                    function(err) {
                        if (err == "Access Denied - You don't have permission  ") {
                            toaster.pop('error', "", "Your session has expired. Please re-login");
                            return
                        } else if (err.msg) {
                            toaster.pop('error', "", err.msg);
                        } else {
                            toaster.pop('error', "", "Opps! Something went wrong. Please try again.");
                        }
                    }).finally(function() {
                    $rootScope.loader = false;
                });

            });
    }

    $scope.getNumber = function(num) {
        return new Array(num);
    }

}]);

/*-----  End of Controller = customerProfileCtrl  ------*/
