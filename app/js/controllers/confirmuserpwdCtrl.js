app.controller("confirmuserpwdCtrl", ['$scope', '$timeout', '$rootScope', '$http', '$location', '$cookieStore', 'appConfig','authentication',
    function($scope, $timeout, $rootScope, $http, $location, $cookieStore, appConfig, authentication) {

     var uri = window.location.href;

var queryString = {};
uri.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function($0, $1, $2, $3) { queryString[$1] = $3; }
);

console.log(queryString['id']);

        var defaultForm = {
          
            confirmPwd: "",
            newPwd: ""
        };
        $scope.changePassword = function() {
            $scope.loading = true;
       
            if (!$scope.user  || !$scope.user.newPwd || !$scope.user.confirmPwd) {
                $scope.err = true;
                $scope.loading = false;
                return;
            }
            if ($scope.user.newPwd.length < 8) {
                $scope.loading = false;
                return;
            }
            if ($scope.user.newPwd != $scope.user.confirmPwd) {
                $scope.loading = false;
                return;
            }
            $scope.cred = {}
            $scope.cred.id = queryString['id'];      
            $scope.cred.newPassword = $scope.user.newPwd;
            //     var cred =  JSON.stringify( $scope.cred);

            authentication.changeUserPassword($scope.cred)
                .then(function(data) {
                        $scope.changed = true;
                        $scope.changePwd.$setPristine();
                        $scope.user = defaultForm;

                    },
                    function(error) {
                        

                    }).finally(function() {
                    $scope.err = false;
                    $scope.loading = false;
                })

        }

      

    }
]);
