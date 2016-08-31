/*================================================================
Controller = addGenieModalCtrl
==================================================================*/

app.controller('addGenieModalCtrl', ['$scope', '$rootScope', 'dataAPI', '$uibModalInstance', 'toaster', 'items',
    function($scope, $rootScope, dataAPI, $uibModalInstance, toaster, items) {
        'use strict';

        $scope.getExperts = items.getExperts;
        $scope.skills = items.skills;
         $scope.countryCodes= items.countryCodes ;

        //mock for skills list
        // $scope.skills = [
        //     'Electrician',
        //     'Plumber',
        //     'Handyman',
        //     'Locksmith',
        //     'Cleaner',
        //     'Appliance Repairman'
        // ]

        //initialize new expret data
        $scope.expert = {
            name: {
                first: '',
                last: ''
            },
            skills: [],
            phone: '',
            email: ''
        }


        $scope.ok = function() {

            if ($scope.expert.phone.length < 10) {
                $scope.err = true;
                toaster.pop('warning', "", "Phone number should have 10 digits");
                return true;
            } else if ($scope.expert.skills.length < 1) {
                $scope.err = true;
                toaster.pop('warning', "", "Please choose at least one skill");
                return true;
            }
            $scope.expert.email = $scope.expert.email.toLowerCase();
            creatExpertApi();

        };

        function creatExpertApi() {
            $rootScope.loader = true;
            dataAPI.createExpert($scope.expert)
                .then(function(data) {
                        $scope.name = $scope.expert.name.first;
                        $scope.reset();
                        $scope.getExperts(true);
                        toaster.pop('success', "", ' "' + $scope.name.toUpperCase() + '" has been added successfully');
                        if (!$scope.addAnother) {
                            $uibModalInstance.close();
                        } else {

                        }
                    },
                    function(err) {
                        if (err == "Access Denied - You don't have permission  ") {
                            toaster.pop('error', "", "Your session has expired. Please re-login");
                            return
                        } else if (err.msg) {
                            toaster.pop('error', "", err.msg);
                        }else if (err.err) {
                            toaster.pop('error', "", err.err);
                        }  else {
                            toaster.pop('error', "", "Opps! Something went wrong. Please try again.");
                        }
                    }).finally(function() {
                    $rootScope.loader = false;
                });
        }


        $scope.createExpert = function() {
            creatExpertApi();
        }




        //$uibModalInstance.close($scope.expert);

        $scope.cancel = function() {
            $scope.addAnother = false;
            $uibModalInstance.dismiss('cancel');
        };
        $scope.reset = function() {
            $scope.expert = {};
        };



    }
]);

/*-----  End of Controller = addGenieModalCtrl  ------*/
