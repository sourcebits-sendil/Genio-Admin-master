/*================================================================
Controller = resolveDisputeModelCtrl
==================================================================*/

app.controller('resolveDisputeModelCtrl', ['$scope', '$rootScope', 'dataAPI', '$uibModalInstance', 'toaster', 
    function($scope, $rootScope, dataAPI, $uibModalInstance, toaster) {
        'use strict';

        $scope.resolveAmount = {
            "settlement": [{
                "amount": "",
                "description": ""
            }]
        }

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

          $scope.ok = function() {
           $uibModalInstance.close( $scope.resolveAmount);
        };
    }


]);

/*-----  End of Controller = resolveDisputeModelCtrl  ------*/
