/*================================================================
Controller = jobhistoryCtrl
==================================================================*/

app.controller("jobhistoryCtrl", ['$scope', '$rootScope', '$state', '$filter', 'dataAPI', 'toaster',
    function($scope, $rootScope,   $state,  $filter, dataAPI, toaster) {


        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.maxSize = 5;

        $scope.searchJob = function() {
            
             $scope.currentPage = 1;
            $scope.searchIsOn = true;
            $scope.searchJobHistory()
        }
        $scope.pageChange = function() {
            if ($scope.searchIsOn) {
                $scope.searchJobHistory();
            } else {
                $scope.getJobHistory();
            }
        }


        $scope.getJobHistory = function() {
            $scope.searchIsOn = false;
            $scope.noSrchData = false;
                 $scope.noData = false;
            $rootScope.loader = true;

            var page = {
                pg: $scope.currentPage - 1,
                pgcount: 10
            }
            dataAPI.getJobHistory(page)
                .then(function(response) {


                        //  var response = response.data;
                        if (!response || response.data.length < 1) {
                            $scope.noData = true;
                            return
                        } else {

                            $scope.jobs = response.data;

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


        $scope.getJobHistory();

        $scope.searchJobHistory = function() {
            $rootScope.loader = true;
             $scope.noSrchData = false;
                 $scope.noData = false;
            var page = {
                pg: $scope.currentPage - 1,
                pgcount: 10,
                key: $scope.searchkey
            }
            dataAPI.searchJobHistory(page)
                .then(function(response) {
                        //  var response = response.data;
                        if (!response || response.data.length < 1) {
                            $scope.noSrchData = true;
                            return
                        } else {

                            $scope.jobs = response.data;

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

 $scope.back = function() {
        $state.go('homepage.job-history', {}, {
            reload: true
        })
    }
}
])

/*-----  End of Controller = jobhistoryCtrl  ------*/
,
