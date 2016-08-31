/*================================================================
Controller = skillsCtrl
==================================================================*/
app.controller("skillsCtrl", ['$scope', '$rootScope', '$uibModal', '$timeout', '$confirm', '$state', 'dataAPI', 'toaster',
    function($scope, $rootScope, $uibModal, $timeout, $confirm, $state, dataAPI, toaster) {

        //opens one menu at a time
        $scope.oneAtATime = true;
        $scope.status = {
            "openService": true
                // "openJobType": true
        }
        $scope.tab = false;
        $scope.selected = {
            "inactiveServices": [],
            "activeServices": [],
            'newJobType': ''
        };
        $scope.defaultformData = {
            newJobType: '',
            serviceId: ''

        }
        $scope.new = angular.copy($scope.defaultformData);

        $scope.addjob = {};
        $scope.states = [{
            name: 'Active',
            state: false
        }, {

            name: 'Inactive',
            state: true
        }];

        $scope.changesMade = true;
        //get skills in detail
        $scope.getSkills = function() {
                $rootScope.loader = true;
                dataAPI.getDetailedSkills()
                    .then(function(data) {


                            console.log(data);
                            $scope.services = data.data;
                            $scope.mainservices = $scope.services
                            $scope.subservices = $scope.services
                        },
                        function(err) {
                            if (err == "Access Denied - You don't have permission  ") {
                                toaster.pop('error', "", "Your session has expired. Please re-login");
                            } else {
                                toaster.pop('error', "", "Opps! Some error occured, Please try again");
                            }
                        }).finally(function() {
                        // stop loader
                        $rootScope.loader = false;
                    })
            } //getSkills

        $scope.getSkills();

        $scope.activateServices = function() {

                angular.forEach($scope.selected.inactiveServices, function(service, key) {
                    var idx = $scope.mainservices.indexOf(service);
                    $scope.mainservices[idx].disabled = false;
                });
                $scope.selected.inactiveServices = [];
            } //activateServices


        $scope.deActivateServices = function() {


                angular.forEach($scope.selected.activeServices, function(service, key) {
                    var idx = $scope.mainservices.indexOf(service);
                    $scope.mainservices[idx].disabled = true;
                });
                $scope.selected.activeServices = [];
            } //deActivateServices

        $scope.saveServices = function() {

                $rootScope.loader = true;
                var data = [];
                var temp = {};
                angular.forEach($scope.mainservices, function(value, key) {

                    temp = {

                        "id": value._id,
                        "disabled": value.disabled,
                        "base_fare": value.base_fare
                    }
                    this.push(temp);
                }, data);

                dataAPI.saveServices(data)
                    .then(function(response) {
                            if (response.status == "success") {

                                toaster.pop('success', "", "Updated services successfully");
                            } else {
                                toaster.pop('error', "", "Opps! Some error occured, Please try again");

                            }
                        },
                        function(err) {
                            if (err == "Access Denied - You don't have permission  ") {
                                toaster.pop('error', "", "Your session has expired. Please re-login");
                            } else {
                                toaster.pop('error', "", "Opps! Some error occured, Please try again");
                            }
                        }).finally(function() {
                        // stop loader
                        $rootScope.loader = false;
                    })





            } // saveServices



        $scope.addJobType = function() {
                //            debugger
                // $scope.selected.newJobType = '';
                //                                 $scope.addjob.$dirty = false
                var params = {
                    "description": $scope.new.newJobType
                }
                $rootScope.loader = true;

                dataAPI.addJobType($scope.new.serviceId, params)
                    .then(function(response) {
                            if (response.status == "success") {
                                $scope.getSkills();

                               //   $scope.new.newJobType = '';
                               // $('#newJobType').removeClass("ng-dirty")
                              
                                toaster.pop('success', "", "Added new Job type successfully");
                            } else {
                                toaster.pop('error', "", "Opps! Some error occured, Please try again");

                            }
                        },
                        function(err) {
                            if (err == "Access Denied - You don't have permission  ") {
                                toaster.pop('error', "", "Your session has expired. Please re-login");
                            } else {
                                toaster.pop('error', "", "Opps! Some error occured, Please try again");
                            }
                        }).finally(function() {
                        // stop loader
                        $rootScope.loader = false;
                    })

            } //addJobType


        $scope.confirmDeleteJobType = function(tagId, skillId, tagIdx, skillIdx) {
            $confirm({
                    text: 'Are you sure you want to delete this job type?'
                })
                .then(function() {
                    $scope.deleteJobType(tagId, skillId, tagIdx, skillIdx)
                });
        }

        $scope.updateJobType = function(serviceId, skillId, desc) {
                $rootScope.loader = true;
                dataAPI.updateJobType(serviceId, skillId, desc)
                    .then(function(response) {
                            if (response.status == "success") {

                                toaster.pop('success', "", "Updated job type successfully");
                            } else {
                                toaster.pop('error', "", "Opps! Some error occured, Please try again");

                            }
                        },
                        function(err) {
                            if (err == "Access Denied - You don't have permission  ") {
                                toaster.pop('error', "", "Your session has expired. Please re-login");
                            } else {
                                toaster.pop('error', "", "Opps! Some error occured, Please try again");
                            }
                        }).finally(function() {
                        // stop loader
                        $rootScope.loader = false;
                    })
            } //update job type
        $scope.deleteJobType = function(tagId, skillId, tagIdx, skillIdx) {

                $rootScope.loader = true;

                dataAPI.deleteJobType(tagId, skillId)
                    .then(function(response) {
                            if (response.status == "success") {
                                $scope.subservices[tagIdx].subskills.splice(skillIdx, 1);
                                toaster.pop('success', "", "Deleted job type successfully");
                            } else {
                                toaster.pop('error', "", "Opps! Some error occured, Please try again");

                            }
                        },
                        function(err) {
                            if (err == "Access Denied - You don't have permission  ") {
                                toaster.pop('error', "", "Your session has expired. Please re-login");
                            } else {
                                toaster.pop('error', "", "Opps! Some error occured, Please try again");
                            }
                        }).finally(function() {
                        // stop loader
                        $rootScope.loader = false;
                    })
            } //deleteJobType



        $scope.editItem = function(item) {

                item.editing = true;
                $timeout(function() {
                    $('.editable input').focus()
                }, 10)


            } // edit item

        $scope.updateJobTypeStatus = function(item, serviceId) {
            var desc = {
                    description: item.description,
                    disabled: item.disabled
                }
                //  debugger
            $scope.updateJobType(serviceId, item.skill_code, desc);
        }
        $scope.doneEditing = function(item, serviceId) {
                if (!item.description) {
                    toaster.pop('warning', "", "Please enter the description (Text Only)");
                    return;
                }
                item.editing = false;
                var desc = {
                    description: item.description,
                    disabled: item.disabled
                }
                $scope.updateJobType(serviceId, item.skill_code, desc);
            } //done editing


        $scope.cancel = function() {
            $state.go('homepage.skills', {}, {
                reload: true
            })
        }

    }
]);
/*-----  End of Controller = skillsCtrl  ------*/
