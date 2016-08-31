/*================================================================
Controller = editGenieModelCtrl
==================================================================*/

app.controller('editGenieModelCtrl', ['$scope', '$rootScope', 'dataAPI', '$uibModalInstance', '$timeout', 'toaster', 'items',
    function($scope, $rootScope, dataAPI, $uibModalInstance, $timeout, toaster, items) {
        'use strict';

        $scope.genie = items;
        
        function matchSkill(skillId) {
            angular.forEach($scope.skillset, function(skill) {
                if (skill.id == skillId) $scope.genie.selectedSkills.push(skill);
            });
            
        }
        //get skills list 
            $scope.getCountryCodes = function() {

        dataAPI.getCountryCodes()
            .then(function(data) {
                $scope.countryCodes = data;
                console.log(data)
            }, function(error) {
                toaster.pop('error', "", "Opps! Some error occured, Please try again");
            });
    }
    $scope.getCountryCodes();


        $scope.skillset = [];
        $scope.genie.selectedSkills = []
            //Get skills from DB 
        $scope.getSkills = function() {

            dataAPI.getSkills()
                .then(function(data) {
                    angular.forEach(data.data, function(skill) {
                        $scope.skillset.push({
                            id: skill._id,
                            name: skill.name
                        });
                    });
                    angular.forEach($scope.genie.skills, function(skill, key) {
                        matchSkill(skill.id)
                    });

                }, function(error) {

                });
        }
        $scope.getSkills();


        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.ok = function() {
              if($scope.genie.selectedSkills.length < 1 ){
                    toaster.pop('error', "", "Choose atleast one skill.") 
                    return
                
            }
            $uibModalInstance.close($scope.genie );
        };
    }


]);

/*-----  End of Controller = editGenieModelCtrl  ------*/
