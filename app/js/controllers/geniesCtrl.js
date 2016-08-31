/*================================================================
Controller = userCtrl
==================================================================*/

app.controller('geniesCtrl', ['$scope', '$rootScope', '$window', '$state', '$http','dataAPI', 'appConfig', '$uibModal', 'toaster', '$timeout', function($scope, $rootScope, $window, $state, $http, dataAPI, appConfig, $uibModal, toaster, $timeout) {
    'use strict';


    $scope.sorts = [{

            name: 'None',
            key: '',
            reverse: false
        }, {

            name: 'Name A-Z',
            key: 'name.first',
            reverse: false
        }, {

            name: 'Name Z-A',
            key: 'name.first',
            reverse: true
        }, {

            name: 'Company A-Z',
            key: 'profile.comp',
            reverse: false
        }, {

            name: 'Company Z-A',
            key: 'profile.comp',
            reverse: true
        }, {

            name: 'Address A-Z',
            key: 'profile.address',
            reverse: false
        }, {

            name: 'Address Z-A',
            key: 'profile.address',
            reverse: true
        }

    ];




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


    $scope.selectedSort = $scope.sorts[0];
    $scope.skills = [];

    //Get skills from DB 
    $scope.getSkills = function() {

        dataAPI.getSkills()
            .then(function(data) {

                angular.forEach(data.data, function(skill) {
                    $scope.skills.push({
                        id: skill._id,
                        name: skill.name
                    });

                });


            }, function(error) {
                 toaster.pop('error', "", "Opps! Some error occured, Please try again");

            });


    }
    $scope.getSkills();


    $scope.baseURL = appConfig.baseURL + 'admin/';
    //Get all exprerts list
    $scope.pageNumber = 0
    $scope.experts = [];
    $scope.getExperts = function(newrecord, pageNumber) {

        $scope.searchIsOn = false;
        $scope.search = "";
        if (newrecord) $scope.pageNumber = 0;
        $scope.pageNumber = pageNumber ? $scope.pageNumber + 1 : $scope.pageNumber;
        $rootScope.loader = true;
        var params = {
            pg: $scope.pageNumber,
            pgcount: 20
        }
        dataAPI.expretsList(params)
            .then(function(data) {
                    var data = data.data;
                    if (data.length < 1) {
                        if (!pageNumber) $scope.noDataMsg = true;
                        $scope.noMoreData = true;
                    } else {
                        $scope.noDataMsg = false;
                        $scope.noMoreData = false;
                        if (newrecord) {
                            $scope.experts = data;

                        } else {
                            $scope.experts = $scope.experts.concat(data);
                        }


                    }


                    // $scope.experts.push(data);
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
            });
    };
    $scope.getExperts(false);


    //ADD GEINE

    $scope.reset = function() {
        $scope.expert = {};
    };


    $scope.createExpert = function(expertData) {

        if (expertData.phone.length < 10) {
            toaster.pop('warning', "", "Phone number should have 10 digits");
            return true;
        } else if (expertData.skills.length < 1) {
            toaster.pop('warning', "", "Please choose at least one skill");
            return true;
        }

        creatExpertApi(expertData);

    }




    $scope.open = function(size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: 'addGenieModalCtrl',
            size: size,
            resolve: {
                items: function() {
                    var item = {};
                    item.getExperts = $scope.getExperts;
                    item.skills = $scope.skills;
                    item.countryCodes =  $scope.countryCodes;
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

    // SEARCH GENIES
    $scope.searchGenie = function(newrecord, pageNumber) {
        $scope.searchIsOn = true;
        $scope.search = "";
        if (newrecord) {
            $scope.experts = "";
            $scope.pageNumber = 0;
        }
        $scope.pageNumber = pageNumber ? $scope.pageNumber + 1 : $scope.pageNumber;
        $rootScope.loader = true;
        var params = {
            pg: $scope.pageNumber,
            pgcount: 20,
            key: $scope.searchkey
        }
        dataAPI.searchExperts(params)
            .then(function(data) {

                    var data = data.data;
                    if (data.length < 1) {
                        if (!pageNumber) $scope.noSearchData = true;
                        $scope.noMoreSrchData = true;

                    } else {
                        $scope.noSearchData = false;
                        $scope.noMoreSrchData = false;
                        if (newrecord) {
                            $scope.experts = data;

                        } else {
                            $scope.experts = $scope.experts.concat(data);
                        }
                    }


                    // $scope.experts.push(data);
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
            });
    };

    $scope.back = function() {
        $state.go('homepage.genies', {}, {
            reload: true
        });

    }

}]);

/*-----  End of Controller = userCtrl  ------*/
