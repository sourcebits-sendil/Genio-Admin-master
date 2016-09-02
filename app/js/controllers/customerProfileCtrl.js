/*================================================================
Controller = customerProfileCtrl
==================================================================*/

app.controller('customerProfileCtrl', ['$scope', '$rootScope', '$stateParams', '$confirm', 'appConfig', 'dataAPI', 'toaster', '$uibModal', function($scope, $rootScope, $stateParams, $confirm, appConfig, dataAPI, toaster, $uibModal) {
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


    //Customer Jobs History
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.maxSize = 5;

    $scope.pageChange = function() {
       
        if($scope.customerId)
        {
            $scope.CustomerJobhistory($scope.customerId);
        }
       
    }

    $scope.CustomerJobhistory = function(CustomerId) {
            
            
            $scope.noData = false;
            $rootScope.loader = true;

            var page = {
                pg: $scope.currentPage - 1,
                pgcount: 10,
                CustomerId: CustomerId
            }
            dataAPI.CustomerJobHistory(page)
                .then(function(response) {


                        //  var response = response.data;
                        if (!response || response.data.length < 1) {
                            $scope.noData = true;
                            return
                        } else {

                            $scope.CustomerJobsHistory = response.data;

                            $scope.totalItems = response.count;
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

    if($scope.customerId)
    {
        $scope.CustomerJobhistory($scope.customerId);
    }

    //Message Customer
    $scope.MessageCustomer = function(Phone,CountryCode,CustomerID) {
        
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'MessageCustomer.html',
            controller: 'sendMessageCtrl',
            resolve: {
                items: function() {
                    var item = {};
                    item.countryCode = CountryCode;
                    item.phone = Phone;
                    item.customerId = CustomerID;
                    return item;
                }
            },
            backdrop: 'static'
        });


        modalInstance.result.then(function(selectedItem) {
            // console.log(selectedItem);
            // $scope.createExpert(selectedItem);
            // $scope.getExperts();
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
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
