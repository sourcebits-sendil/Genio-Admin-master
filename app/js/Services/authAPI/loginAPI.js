/*================================================================
Service = loginAPI
==================================================================*/

app.service('loginAPI', ['$rootScope', 'appConfig', '$q', '$http', 'toaster', function($rootScope, appConfig, $q, $http, toaster) {
    'use strict';

    
    
    this.userLogin = function(userData) {

        //uncomment the bellow code when all the API's are ready.

        var deferred = $q.defer();
        //var serviceUrl = 'http://192.168.10.212:3000/admin/sign_in';


        var serviceUrl = appConfig.baseURL + 'admin/sign_in';

        var requestBody = {
            'username': userData.email, //user data from the login form
            'password': userData.password
        };

        $http.post(serviceUrl, requestBody)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
           
                deferred.reject(err);
            });

        return deferred.promise;

        //uncomment the bellow code to use mock data.
        //mock ups start
        // var deferred = $q.defer();
        // var requestBody = {
        //   'user' : userData //user data from the login form
        // };
        // $http.get('images/data/login.json', requestBody)
        //   .success(function (data) {
        //     deferred.resolve(data);
        //   })
        //   .error(function (err) {
        //     deferred.reject(err);
        //   });
        //
        // return deferred.promise;
        //mock ups end
    };

    this.logout = function(userData) {
        // var deferred = $q.defer();
        // var serviceUrl = appConfig.baseURL + '/api/users/sign_out';

        // $http.get(serviceUrl)
        //   .success(function (data) {
        //     deferred.resolve(data);
        //   })
        //   .error(function (err) {
        //     deferred.reject(err);
        //   });

        // return deferred.promise;

        //mock ups start
        var deferred = $q.defer();
        var requestBody = {
            'user': userData //user data from the login form
        };
        $http.get('images/data/login.json', requestBody)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
        //mock ups end
    };

    this.forgotPassword = function(email) {
        // var deferred = $q.defer();
        // var serviceUrl = appConfig.baseURL + '/api/users/sign_out';

        // $http.get(serviceUrl)
        //   .success(function (data) {
        //     deferred.resolve(data);
        //   })
        //   .error(function (err) {
        //     deferred.reject(err);
        //   });

        // return deferred.promise;

        //mock ups start
        var deferred = $q.defer();
        var requestBody = {
            'user': email //user data from the login form
        };
        $http.get('images/data/login.json', requestBody)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
        //mock ups end
    };

   

    this.label = function(state) {
        return state.current.name;
    }

}]);

/*-----  End of Service = loginAPI  ------*/
