/*================================================================
Controller = userCtrl
==================================================================*/

app.controller('customersCtrl', ['$scope', '$rootScope', '$timeout', '$state', 'dataAPI', 'toaster', '$uibModal', 'appConfig', function($scope, $rootScope, $timeout, $state,  dataAPI, toaster, $uibModal, appConfig) {
    'use strict';
    $scope.searchkey= "";
    $scope.sorts = [
        {

            name: 'None',
            key: '',
            reverse: false
        },
        {

            name: 'Name Ascending',
            key: 'name',
            reverse: false
        }, {

            name: 'Name Descending',
            key: 'name',
            reverse: true
        }, {

            name: 'Jobs Hired',
            key: 'jobs.completed',
            reverse: true
        }, {

            name: 'Jobs Canceled',
            key: 'jobs.cancelled',
            reverse: true
        }
    ];
    $scope.selectedSort = $scope.sorts[0];

    $scope.CustomImgUrl = appConfig.baseURL + 'admin/';

    //Get all exprerts list
    $scope.pageNumber = 0;
     $scope.customers = [];
    $scope.getCustomers = function(pageNumber) {
           $scope.searchIsOn = false;
         $scope.search = "";
     $scope.pageNumber  = pageNumber? $scope.pageNumber +1: $scope.pageNumber;
        $rootScope.loader = true;
        var params = {
            pg: $scope.pageNumber,
            pgcount: 20
        }
        dataAPI.customers(params)
            .then(function(data) {
              console.log(data)
                if(data.data.length < 1 ){
                    if(!pageNumber )   $scope.noData = true;
                     $scope.noMoreData = true;
                }
                    
                 $scope.customers = $scope.customers.concat(data.data);
                },
                function(err) {
                     if(err == "Access Denied - You don't have permission  "){toaster.pop('error', "", "Your session has expired. Please re-login");}
                    else {toaster.pop('error', "", "Opps! Some error occured, Please try again");}
                }).finally(function() {
                // stop loader
                $rootScope.loader = false;
            });;
    };
    $scope.getCustomers();

  // SEARCH GENIES
        $scope.searchCustomers = function(newrecord,searchkey, pageNumber) {
          debugger
            $scope.searchIsOn = true;
            //$scope.search = "";
            if (newrecord) {
                $scope.customers = "";
                $scope.pageNumber = 0;
            }
            $scope.pageNumber = pageNumber ? $scope.pageNumber + 1 : $scope.pageNumber;
            $rootScope.loader = true;
            var params = {
                pg: $scope.pageNumber,
                pgcount: 20,
                key: searchkey
            }
            dataAPI.searchCustomers(params)
                .then(function(data) {

                        var data = data.data;
                        if (data.length < 1) {
                            if (!pageNumber) $scope.noSearchData = true;
                            $scope.noMoreSrchData = true;

                        } else {
                            $scope.noSearchData = false;
                            $scope.noMoreSrchData = false;
                            if (newrecord) {
                                $scope.customers = data;

                            } else {
                                $scope.customers = $scope.customers.concat(data);
                            }


                        }


                        // $scope.customers.push(data);
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


    $scope.MessageCustomer = function(Phone, CountryCode, CustomerID) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'MessageCustomer.html',
            controller: 'sendMessageCtrl',
            resolve: {
                items: function() {
                    var item = {};
                    item.countryCode = CountryCode;
                    item.phone = Phone;
                    item.customerId = CustomerID;
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

    $scope.BroadcastCustomer = function() {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'BroadcastCustomer.html',
            controller: 'sendMessageCtrl',
            resolve: {
                items: function() {
                    var item = {};
                    //item.countryCode = CountryCode;
                    //item.phone = Phone;
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

    $scope.back = function(){
           $state.go('homepage.customers', {}, {
                        reload: true
                    });

    }

    

}]);

/*-----  End of Controller = userCtrl  ------*/
