/*================================================================
Controller = dashboardCtrl
==================================================================*/

app.controller('dashboardCtrl', ['$scope', '$location', '$state', '$cookies', 'appConfig', 'dataAPI', '$rootScope', function($scope, $location, $state, $cookies, appConfig, dataAPI, $rootScope) {

    'use strict';

    $scope.usersCount = function() {
        dataAPI.usersCount()
            .then(
                function(response) {
                    if ((response.status == "success") && response.data) {
                        $scope.userBalance = response.data
                        drawUsersBalance($scope.userBalance)
                    } else if (response.status == "failure") {

                        toaster.pop('error', "", "Opps! Some error occured, Please try again");
                    }
                },
                function(error) {}
            )
    }
    $scope.jobsCount = function() {
        dataAPI.jobsCount()
            .then(
                function(response) {
                    if ((response.status == "success") && response.data) {
                        $scope.jobsBalance = response.data
                        drawJobsBalance($scope.jobsBalance)
                    } else if (response.status == "failure") {

                        toaster.pop('error', "", "Opps! Some error occured, Please try again");
                    }
                },
                function(error) {}
            )
    }
    $scope.servicesTrend = function() {
        dataAPI.servicesTrend()
            .then(
                function(response) {
                    if ((response.status == "success") && response.data) {
                        console.log(response.data)
                             $scope.serviceData = response.data
                            drawServicesTernd(response.data)
                    } else if (response.status == "failure") {

                        toaster.pop('error', "", "Opps! Some error occured, Please try again");
                    }
                },
                function(error) {}
            )
    }

    $scope.jobsTrend = function() {
        dataAPI.jobsTrend()
            .then(
                function(response) {
                    if ((response.status == "success") && response.data) {
                        console.log(response.data)
                            $scope.jobsData = response.data
                            drawTopTenJobs(response.data)
                    } else if (response.status == "failure") {

                        toaster.pop('error', "", "Opps! Some error occured, Please try again");
                    }
                },
                function(error) {}
            )
    }

    $scope.expertsMap = function() {
        dataAPI.expertsMap()
            .then(
                function(response) {
                    if ((response.status == "success") && response.data) {
                        $scope.expertsGeolocation = response.data
                        console.log($scope.expertsGeolocation);
                        drawExpertsLocation($scope.expertsGeolocation);
                    } else if (response.status == "failure") {

                        toaster.pop('error', "", "Opps! Some error occured, Please try again");
                    }
                },
                function(error) {}
            )
    }


    function getStats() {

        $scope.expertsMap();
        $scope.usersCount();
        $scope.jobsCount();
        $scope.jobsTrend();
        $scope.servicesTrend();
    }

    getStats();

    function drawJobsBalance(data) {
        $scope.jobs = {};
        $scope.jobs.type = "PieChart";
        $scope.jobs.data = {
            "cols": [{
                id: "u",
                label: "Jobs",
                type: "string"
            }, {
                id: "c",
                label: "Count",
                type: "number"
            }],
            "rows": [{
                c: [{
                    v: "Cancelled"
                }, {
                    v: data.cancelledSerReqCount
                }, ]
            }, {
                c: [{
                    v: "Completed"
                }, {
                    v: data.completedSerReqCount
                }, ]
            }]
        };

        $scope.jobs.options = {
            // 'title': 'Job Balance',
            pieHole: 0.5,
            slices: [{
                color: 'black'
            }, {
                color: '#8881F8'
            }],
            pieStartAngle: 0,
            legend: 'bottom',
            legendFontSize: 20,
            titleFontSize: 20,
            animation: {
                duration: 500,
                easing: 'out',
            }
        }

    }

    function drawUsersBalance(data) {
        $scope.users = {};
        $scope.users.type = "PieChart";
        $scope.users.data = {
            "cols": [{
                id: "u",
                label: "Users",
                type: "string"
            }, {
                id: "c",
                label: "Count",
                type: "number"
            }],
            "rows": [{
                c: [{
                    v: "Genies"
                }, {
                    v: data.expertCount
                }, ]
            }, {
                c: [{
                    v: "Consumers"
                }, {
                    v: data.consumerCount
                }, ]
            }]
        };

        $scope.users.options = {
            // 'title': 'User Balance',
            pieHole: 0.5,
            slices: [{
                color: '#FF4081'
            }, {
                color: '#8881F8'
            }],
            pieStartAngle: 0,
            legend: 'bottom',
            legendFontSize: 20,
            titleFontSize: 20,
            animation: {
                duration: 1500,
                easing: 'out',
                startup: true
            }
        }

    }

    function drawServicesTernd(data) {
        $scope.services = {};
        $scope.services.type = "ColumnChart";
        $scope.services.data = [
            ['Service', 'Count', 
            // {
            //     role: 'style'
            // },
            //  {
            //     role: 'annotation'
            // }
            ],
            
        ]

         angular.forEach(data, function(value, key) {
           $scope.services.data.push([value._id.type, value.count]);
        });

       
        $scope.services.options = {
            // title: "Density of Precious Metals, in g/cm^3",
            colors:['#8881F8'],
            bar: {
                groupWidth: "95%"
            },
            legend: {
                position: "none"
            },
            animation: {
                duration: 500,
                easing: 'linear',
                startup: true
            }
        }

    }

    function drawTopTenJobs(data) {
        $scope.jobTypes = {};
        $scope.jobTypes.type = "ColumnChart";
        $scope.jobTypes.data = [
            ['Job', 'Count', 
            // {
            //     role: 'style'
            // },
            //  {
            //     role: 'annotation'
            // }
            ],
            
        ]

         angular.forEach(data, function(value, key) {
            if(key<10)
           $scope.jobTypes.data.push([value._id.description, value.count]);
        });
        $scope.jobTypes.options = {
            // title: "Density of Precious Metals, in g/cm^3",
             colors:['#FF4081'],
            bar: {
                groupWidth: "95%"
            },
            legend: {
                position: "none"
            },
            animation: {
                duration: 500,
                easing: 'linear',
                startup: true
            }
        }

    }
    // bar chart 

    function drawExpertsLocation(data) {


        $scope.myChartObject = {};
        $scope.myChartObject.type = "Map";

        $scope.myChartObject.options = {
            width: 400,
            height: 500,

        };
        $scope.myChartObject.data = [
            ['Lat', 'Long', 'Name']
        ]
        angular.forEach(data, function(value, key) {
            $scope.myChartObject.data.push([value.loc[0], value.loc[1], value.name]);
        });
        // $scope.myChartObject.data = [
        //     ['Lat', 'Long', 'Name'],
        //     [37.4232, -122.0853, 'Work'],
        //     [37.4289, -122.1697, 'University'],
        //     [37.6153, -122.3900, 'Airport'],
        //     [37.4422, -122.1731, 'Shopping']
        // ];

        $scope.myChartObject.options = {
            mapType: 'terrain',
            showTip: true,
        }
    }

    drawTopTenJobs()
    drawServicesTernd()


}]);

/*-----  End of Controller = dashboardCtrl  ------*/
