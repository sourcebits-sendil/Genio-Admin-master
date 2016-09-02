/*================================================================
App Genio-Admin
==================================================================*/
'use strict';

var app = angular.module('genioAdmin', ['ngRoute', 'ui.router', 'ngCookies', 'toaster', 'ngAnimate', 'ui.bootstrap', 'googlechart', 'ngTable', 'ngLodash', 'angular-confirm']);

app.config(['$routeProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($routeProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html'
            })
            .state('homepage', {
                url: '/',
                templateUrl: 'templates/dashboard-layout.html',
                authenticate: true
            })
            .state('homepage.dashboard', {
                url: 'home',
                templateUrl: 'templates/home.html',
                authenticate: true
            })
            .state('homepage.job-history', {
                url: 'jobhistory',
                templateUrl: 'templates/jobhistory/job-history.html'
            })
            .state('homepage.feedback', {
                url: 'feedback',
                templateUrl: 'templates/feedback/feedback.html'
            })
            // 'requests'
            .state('homepage.requests', {
                url: 'requests',
                templateUrl: 'templates/requests/requests.html'
            })
            // 'genies'
            .state('homepage.genies', {
                url: 'genies',
                templateUrl: 'templates/genies/genies.html'
            })
            // add genie
            .state('homepage.genies.add-genie', {
                url: '/add-genie',
                templateUrl: 'templates/genies/add-genie.html'
            })
            //genie proifle
            .state('homepage.genie-detail', {
                url: 'genie/:genieId',
                templateUrl: 'templates/genies/genie-detail.html'
            })
            .state('homepage.job-detail', {
                url: 'job/:jobId',
                templateUrl: 'templates/jobhistory/job-detail.html'
            })
            //customers
            .state('homepage.customers', {
                url: 'customers',
                templateUrl: 'templates/customers/customers.html'
            })
            .state('homepage.customer-detail', {
                url: 'customer/:customerId',
                templateUrl: 'templates/customers/customer-detail.html'
            })
            // 'skills'
            .state('homepage.skills', {
                url: 'skills',
                templateUrl: 'templates/skills/skills.html'
            })
            //forgotUserPwd
            .state('forgotUserPwd', {
                url: '/forgotUserPwd',
                templateUrl: 'templates/forgot-genie-pwd.html'
            })
            //Forgot admin password
            .state('homepage.forgotPwd', {
                url: 'forgotPwd',
                templateUrl: 'templates/password/forgot-password.html'
            })
            //Change admin password
            .state('homepage.changePwd', {
                url: 'changePwd',
                templateUrl: 'templates/password/change-password.html'
            });

        $urlRouterProvider.otherwise('login');

        // This is required for Browser Sync to work poperly
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    }
]);

/*================================================================
  =>               Genio  App Run()
  ==================================================================*/
app.run(['$rootScope', '$state', '$route', '$filter', '$http', '$window', '$cookies', function($rootScope, $state, $route, $filter, $http, $window, $cookies) {
    // to do when a state changes successfully
    // use 'currentState' on any view or '$rootScope.currentState' on controllers to get the current state name
    'use strict';

    $http.defaults.headers.common.Accept = 'application/json';
    $http.defaults.headers.common['Content-Type'] = 'application/json';

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        isLoggedIn();

        if (!isLoggedIn() && toState.name != 'login' && toState.name != 'forgotUserPwd') {
            console.log("islogin--->", isLoggedIn());
            console.log("state--->", toState.name);
            console.log("state--->", toState.name);
            $state.go('login', {}, {
                reload: true
            });
            event.preventDefault();
            // $state.reload()
        }

        $rootScope.currentState = toState.name;

    });


    //To check auth token
    var isLoggedIn = function() {
        //Get authTokens after successfull login for API calls
        var userDetails = $cookies.getObject('userDetails');

        if (userDetails && userDetails['authentication_token'] != null) {
            $rootScope.userName = userDetails['first_name'] + ' ' + userDetails['last_name'];
            $rootScope.userId = userDetails['id'];
            $rootScope.authToken = userDetails['authentication_token'];
            // $http.defaults.headers.common.Authorization = $rootScope.authToken;
            $rootScope.isLoginIn = true;
        }

        return ($rootScope.authToken) ? true : false;
    };

}]);

app.constant('appConfig', {

    //for development staging server
    //@if env= 'local'
    // baseURL: 'http://192.168.11.20:3000/'
    // @if env='dev'
    // 
    // baseURL : 'http://192.168.11.108:4000/'

    // @if env='test'
    // baseURL : 'http://52.34.219.2:4000/'

    //@endif
    //for production server
    // @if env='deploy'x
    //baseURL: 'http://52.33.63.9:8000/'
        // baseURL: 'http://192.168.11.108:4000/'
        //baseURL: 'http://192.168.11.74:4000/'
        //baseURL: 'http://192.168.11.74:4000/'
        baseURL: 'http://52.38.106.14:5000/'



    //@endif
});

app.value('googleChartApiConfig', {
    version: '1',
    optionalSettings: {
        packages: ['map'] //load just the package you want
    }
});
