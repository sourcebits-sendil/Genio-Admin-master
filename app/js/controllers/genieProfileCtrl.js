/*================================================================
Controller = genieProfileCtrl
==================================================================*/

app.controller('genieProfileCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$uibModal', '$confirm', 'appConfig', 'dataAPI', 'toaster', function($scope, $rootScope, $state, $stateParams, $uibModal, $confirm, appConfig, dataAPI, toaster) {
    'use strict';

    $scope.genie = [];
    $scope.genieId = $stateParams.genieId

    $scope.baseURL = appConfig.baseURL + 'admin/';


    function expretsDetail() {
        $rootScope.loader = true;
        dataAPI.expretsDetail($scope.genieId)
            .then(function(response) {
                    if (!response || response.length < 1 || response.data.length < 1) {
                        $scope.noData = true;
                        return
                    } else {
                        $scope.genie = response.data;
                        $scope.genieImg = $scope.baseURL + $scope.genie.img;
                        console.log($scope.genie);

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
    expretsDetail();

    //display rating stars 
    $scope.getNumber = function(num) {
        return new Array(num);
    }

    function updateGenie(genie) {
        
        $rootScope.loader = true;
        var id = $scope.genieId;

        var data = {
            "name": genie.name,
            "email": genie.email,
            "phone": genie.phone,
            "phoneCode": genie.country_code,
            "skills": genie.selectedSkills,
            "company": genie.profile.address,
            "address": genie.profile.comp,
            "altPhoneCode": genie.profile.alt_country_code,
            "altPhone": genie.profile.alt_phone,
            "isban": genie.isban
        }

        dataAPI.updateGenie(id, data)
            .then(function(data) {
                    toaster.pop('success', "", "User profile updated successfully.");

                    $state.go($state.current, {}, {
                        reload: true
                    });
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

    //Genio Job History

    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.maxSize = 5;

    $scope.pageChange = function() {
       
        if($scope.genieId)
        {
            $scope.GenioJobhistory($scope.genieId);
        }
       
    }

    $scope.GenioJobhistory = function(GenieId) {
            
            
            $scope.noData = false;
            $rootScope.loader = true;

            var page = {
                pg: $scope.currentPage - 1,
                pgcount: 10,
                GenieId: GenieId
            }
            dataAPI.GenioJobHistory(page)
                .then(function(response) {


                        //  var response = response.data;
                        if (!response || response.data.length < 1) {
                            $scope.noData = true;
                            return
                        } else {

                            $scope.GenioJobsHistory = response.data;

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

    if($scope.genieId)
    {
        $scope.GenioJobhistory($scope.genieId);
    }
    

    //Message Genio
    $scope.MessageGenio = function(size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'MessageGenio.html',
            controller: 'sendMessageCtrl',
            size: size,
            resolve: {
                items: function() {
                    var item = {};
                    item.countryCode = $scope.genie.country_code;
                    item.phone = $scope.genie.phone;
                    item.expertId = $scope.genie._id;
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


    $scope.editGenie = function(size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: 'editGenieModelCtrl',
            size: size,
            resolve: {
                items: function() {
                    var items = {};
                    items = $scope.genie;
                    return items;
                }
            },
            backdrop: 'static'
        });


        modalInstance.result.then(function(selectedItem) {

  
            updateGenie(selectedItem);
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });


    }

    $scope.banUser = function() {
        $confirm({
                text: 'Are you sure you want to ban Genie?'
            })
            .then(function() {

                $rootScope.loader = true;
                dataAPI.banUser($scope.genieId, 'experts', true).then(
                    function(data) {

                        if (data.status == "success") {
                            $scope.genie.isban = true;
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
                text: 'Are you sure you want to unban Genie?'
            })
            .then(function() {
                $rootScope.loader = true;
                dataAPI.banUser($scope.genieId, 'experts', false).then(
                    function(data) {

                        if (data.status == "success") {
                            $scope.genie.isban = false;
                            toaster.pop('success', "", "Successfully unbanned the user.");
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

    
        $scope.resendPassword = function() {
        $confirm({
                text: 'Are you sure you want to resend password to Genie?'
            })
            .then(function() {
                $rootScope.loader = true;
                dataAPI.resendPassword($scope.genieId).then(
                    function(data) {

                        if (data.status == "success") {
                         
                            toaster.pop('success', "", "Pasword sent successfully .");
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

    function Jobhistory() {
        $rootScope.loader = true;
        dataAPI.Jobhistory($scope.genieId)
            .then(function(response) {
                    if (!response || response.length < 1 || response.data.length < 1) {
                        $scope.noData = true;
                        return
                    } else {
                        $scope.Jobhistory = response.data;
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

    if($scope.genieId)
    {
        //Jobhistory();
    }


}]);

/*-----  End of Controller = genieProfileCtrl  ------*/
