/*================================================================
Controller = jobDetailCtrl
==================================================================*/


app.controller('jobDetailCtrl', ['$scope', '$state', '$stateParams', '$rootScope', '$uibModal', 'appConfig', 'dataAPI', 'lodash', 'toaster', '$confirm', function($scope, $state, $stateParams, $rootScope, $uibModal, appConfig, dataAPI, lodash, toaster, $confirm) {
    'use strict';
    $scope.baseURL = appConfig.baseURL + 'admin/';
    var jobId = $stateParams.jobId

    function getJobDetail() {
        $rootScope.loader = true;
        dataAPI.getJobDetail(jobId)
            .then(function(response) {
                    if (!response || response.length < 1 || response.data.length < 1) {
                        $scope.noData = true;
                        return
                    } else {
                        $scope.job = response.data;

                        angular.forEach($scope.job.electronic_addresses, function(item, i) {
                            if (item.type == "PHONE") $scope.job.userPhone = item.value;
                        });
                        angular.forEach($scope.job.invoice, function(item, i) {
                            item.amount = parseFloat(item.amount);
                        });

                        console.log($scope.job);
                        $scope.total = lodash.sumBy(response.data.invoice, 'amount');
                        if ($scope.job.settlement) $scope.total += parseFloat($scope.job.settlement[0].amount);
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

    getJobDetail();




    function updateInvoice(amount) {
        $rootScope.loader = true;
        dataAPI.updateInvoice(jobId, amount)
            .then(function(data) {
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

    $scope.open = function(size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: 'resolveDisputeModelCtrl',
            size: size,
            resolve: {
                items: function() {
                    var item = {};
                    item.updateInvoice = $scope.updateInvoice;
                    return item;
                }
            },
            backdrop: 'static'
        });


        modalInstance.result.then(function(selectedItem) {
            updateInvoice(selectedItem)
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });


    }



    $scope.resolveGenieDispute = function() {
        $confirm({
                text: 'An email will be sent to the Genie that their issue has been resolved. Please confirm by clicking ok button.'
            })
            .then(function() {
                $rootScope.loader = true;
                var params = {
                    "consumer_dispute_status": $scope.job.consumer_dispute_status,
                    "expert_dispute_status": "RESOLVED"
                }

                dataAPI.resolveDispute(params, jobId).then(
                    function(data) {

                        if (data.status == "success") {
                            $scope.job.expert_dispute_status = 'RESOLVED'
                            toaster.pop('success', "", "Message has been sent to Genie successfully.");
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



 $scope.resolveConsumerDispute = function() {
        $confirm({
                text: 'An email will be sent to the Consumer that their issue has been resolved. Please confirm by clicking ok button.'
            })
            .then(function() {
                $rootScope.loader = true;
                var params = {
                    "consumer_dispute_status": "RESOLVED",
                    "expert_dispute_status":  $scope.job.expert_dispute_status
                }

                dataAPI.resolveDispute(params, jobId).then(
                    function(data) {

                        if (data.status == "success") {
                            $scope.job.consumer_dispute_status = 'RESOLVED'
                            toaster.pop('success', "", "Message has been sent to Consumer successfully");
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

}]);

/*-----  End of Controller = jobDetailCtrl  ------*/
