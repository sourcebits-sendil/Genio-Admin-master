/*================================================================
Controller = sendMessageCtrl
==================================================================*/

app.controller('sendMessageCtrl', ['$scope', '$rootScope', 'dataAPI', '$uibModalInstance', 'toaster', 'items', '$stateParams',
    function($scope, $rootScope, dataAPI, $uibModalInstance, toaster, items, $stateParams) {
        'use strict';

        $scope.countryCode = items.countryCode;
        $scope.phone = items.phone;
        $scope.expertId = items.expertId;
        $scope.customerId = items.customerId;

        //Genio
        $scope.SendSMSGenio = function() {

            $scope.content = $scope.text;

            var params = {
                message: $scope.content,
                phoneno: $scope.phone,
                countryCode: $scope.countryCode,
                expertId: $scope.expertId,
            }

            dataAPI.GenioSms(params)
            .then(function(data) {
                    $uibModalInstance.close();
                    toaster.pop('success', "", "Message send successfully");
                },
                function(err) {
                    
                    toaster.pop('error', "", "Opps! Some error occured, Please try again");

                }).finally(function() {
                // stop loader
                $rootScope.loader = false;
            });

        };

        $scope.SendBroadcastGenio = function()
        {
            $scope.content = $scope.text;
            //alert($scope.content);
            toaster.pop('success', "", "Message send successfully");
            $uibModalInstance.close();
        }


        //Customer
        $scope.sendSMSCustomer = function() {
            
            $scope.content = $scope.text;

            var params = {
                message: $scope.content,
                phoneno: $scope.phone,
                countryCode: $scope.countryCode,
                customerId: $scope.customerId,
            }

            dataAPI.CustomerSms(params)
            .then(function(data) {
                    $uibModalInstance.close();
                    toaster.pop('success', "", "Message send successfully");
                },
                function(err) {
                    
                    toaster.pop('error', "", "Opps! Some error occured, Please try again");

                }).finally(function() {
                // stop loader
                $rootScope.loader = false;
            });
        }

        $scope.SendBroadcastCustomer = function()
        {
            $scope.content = $scope.text;
            //alert($scope.content);
            toaster.pop('success', "", "Message send successfully");
            $uibModalInstance.close();
        }


        //Cancel
        $scope.cancel = function() {
            $scope.addAnother = false;
            $uibModalInstance.dismiss('cancel');
        };


    }
]);

/*-----  End of Controller = sendMessageCtrl  ------*/
