/*================================================================
Controller = addGenieCtrl
==================================================================*/

app.controller('addGenieCtrl', ['$scope', '$rootScope', '$state', '$http', 'dataAPI', 'toaster', function($scope, $rootScope, $state, $http, dataAPI, toaster) {
    'use strict';


    //mock for skills list
    $scope.skills = [
        'Electrician',
        'Plumber',
        'Handyman',
        'Cleaner',
        'Locksmith',
        'Appliance Repairman'
    ]

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

    $scope.reset = function() {
        $scope.expert = {};
    };


 
    $scope.createExpert = function() {


        if ($scope.expert.phone.length < 10) {
            toaster.pop('warning', "", "Phone number should have 10 digits");
            return true;
        } else if ($scope.expert.skills.length < 1) {
            toaster.pop('warning', "", "Please choose at least one skill");
            return true;
        }
        //Setting Email lower cased 
        $scope.expert.email = $scope.expert.email.toLowerCase();

        creatExpertApi();

    }

    function creatExpertApi() {
        $rootScope.loader = true;
        dataAPI.createExpert($scope.expert)
            .then(function(data) {
                    $scope.reset();
                    toaster.pop('success', "", data);
                    $state.go('homepage.genies', {}, {
                        reload: true
                    });
                },
                function(err) {

                    if (err.msg) {
                        toaster.pop('error', "", err.msg);
                    } else {
                        toaster.pop('error', "", "Opps! Something went wrong. Please try again.");
                    }

                }).finally(function() {
                $rootScope.loader = false;
            });
    }
}]);

/*-----  End of Controller = addGenieCtrl  ------*/
