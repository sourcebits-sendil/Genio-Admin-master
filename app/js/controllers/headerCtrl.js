/*================================================================
Controller = headerCtrl
==================================================================*/

app.controller('headerCtrl', ['$scope', 'loginAPI', '$rootScope', '$cookies', '$http', '$timeout', '$state', function ($scope, loginAPI, $rootScope, $cookies, $http, $timeout, $state) {
    'use strict';

    $scope.displayOptions = false;

    $scope.toggleOptions = function() {
    	$scope.displayOptions = $scope.displayOptions ? false : true;
    }
console.log(	$scope.currentState);


}]);

/*-----  End of Controller = headerCtrl  ------*/
