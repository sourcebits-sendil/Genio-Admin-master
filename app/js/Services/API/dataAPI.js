/*================================================================
Service = dataAPI
==================================================================*/

app.service('dataAPI', ['$rootScope', 'appConfig', '$q', '$http', 'toaster', function($rootScope, appConfig, $q, $http, toaster) {
    'use strict';

    var serverUrl = appConfig.baseURL;
//Get services trend 
        this.servicesTrend= function() {

        var deferred = $q.defer();
    
        var req = {
            method: 'GET',
            url: serverUrl + 'admin/dashboard/servicerequests/types',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }
        }

        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;

    };

//GEt jobs trend 

        this.jobsTrend = function() {

        var deferred = $q.defer();
    
        var req = {
            method: 'GET',
            url: serverUrl + 'admin/dashboard/servicerequests/subskills',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }
        }

        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;

    };

//GET Experts location
    this.expertsMap = function() {

        var deferred = $q.defer();
    
        var req = {
            method: 'GET',
            url: serverUrl + 'admin/dashboard/experts/location',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }
        }

        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;

    };

   //GET Jobs COUNT 
    this.jobsCount = function() {

        var deferred = $q.defer();
    
        var req = {
            method: 'GET',
            url: serverUrl + 'admin/dashboard/servicerequests',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }
        }

        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;

    };
        //GET USERS COUNT 
    this.usersCount = function() {

        var deferred = $q.defer();
    
        var req = {
            method: 'GET',
            url: serverUrl + 'admin/dashboard/users/count',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }
        }

        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;

    };

        //GET CUSTOMERS LIST
    this.customers = function(params) {

        var deferred = $q.defer();


        var req = {
            method: 'GET',
            url: serverUrl + 'admin/customers?pg=' + params.pg + '&pgcount=' + params.pgcount,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }
        }

        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;

    };



    this.customersDetail = function(id) {

        var req = {
            method: 'GET',
            url: serverUrl + 'admin/customers/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }
            //data: { test: 'test' }
        }

        var deferred = $q.defer();


        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    };

    this.searchCustomers = function(params) {

        var req = {
            method: 'GET',
            url: serverUrl + 'admin/customers/search?searchTxt='+params.key+'&pg=' + params.pg + '&pgcount=' + params.pgcount,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }
            //data: { test: 'test' }
        }

        var deferred = $q.defer();

        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    };

    this.resetGenioPwd = function(filter) {


        var deferred = $q.defer();
        var serviceUrl = serverUrl + 'expert/resetpassword/' + filter.id;

        var requestBody = {
            'password': filter.password
        };

        $http.get(serviceUrl, requestBody)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;

    };



    //CREATE AN EXPERT
    this.createExpert = function(params) {


        var deferred = $q.defer();


        var req = {
            method: 'POST',
            url: serverUrl + 'admin/experts',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            },
            data: params
        }

        $http(req, params)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;

    };

    this.expretsList = function(params) {

        var req = {
            method: 'GET',
            url: serverUrl + 'admin/experts?pg=' + params.pg + '&pgcount=' + params.pgcount,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }
            //data: { test: 'test' }
        }

        var deferred = $q.defer();

        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    };

    this.expretsDetail = function(id) {
        var req = {
            method: 'GET',
            url: serverUrl + 'admin/experts/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }

        }

        var deferred = $q.defer();


        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    };

       this.searchExperts = function(params) {

        var req = {
            method: 'GET',
            url: serverUrl + 'admin/experts/search?searchTxt='+params.key+'&pg=' + params.pg + '&pgcount=' + params.pgcount,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }
            //data: { test: 'test' }
        }

        var deferred = $q.defer();

        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    };

  

    this.getSkills = function() {

        var req = {
            method: 'GET',
            url: serverUrl + 'admin/tags',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }
        }

        var deferred = $q.defer();


        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }


    this.getDetailedSkills = function() {

        var req = {
            method: 'GET',
            url: serverUrl + 'admin/tags',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }
        }

        var deferred = $q.defer();


        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }

       this.searchJobHistory = function(page) {

        var req = {
            method: 'GET',
            url: serverUrl + 'admin/servicerequests/search?searchTxt='+ page.key+'&pg='+page.pg+'&pgcount='+page.pgcount,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }
        }

        var deferred = $q.defer();


        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }

    this.getJobHistory = function(page) {

        var req = {
            method: 'GET',
            url: serverUrl + 'admin/servicerequests?pg='+page.pg+'&pgcount='+page.pgcount,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }
        }

        var deferred = $q.defer();


        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }

    this.getJobDetail = function(id) {

        var req = {
            method: 'GET',
            url: serverUrl + 'admin/servicerequests/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }
        }

        var deferred = $q.defer();


        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }



    this.updateInvoice = function(id, params) {

        var req = {
            method: 'POST',
            url: serverUrl + 'admin/' + id + '/invoice',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            },
            data: params
        }

        var deferred = $q.defer();


        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }

    this.updateGenie = function(id, params) {
        var req = {
            method: 'PUT',
            url: serverUrl + 'admin/experts/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            },
            data: params
        }

        var deferred = $q.defer();

        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }


    this.banUser = function(id, usertype, ban ) {
        var req = {
            method: 'POST',
            url: serverUrl + 'admin/'+ usertype + '/' + id+'/ban',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            },
            data: {
                'ban': ban
            }
        }

        var deferred = $q.defer();

        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }


    this.saveServices = function(services) {
        var req = {
            method: 'POST',
            url: serverUrl + 'admin/tags/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            },
            data: {"tags" : services}
        }

        var deferred = $q.defer();

        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }

    this.addJobType = function(id,desc) {
        var req = {
            method: 'POST',
            url: serverUrl + 'tags/'+ id + '/skills',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            },
            data: desc
        }

        var deferred = $q.defer();

        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }

      this.deleteJobType = function(tagId,skillId) {
        var req = {
            method: 'DELETE',
            url: serverUrl + 'tags/'+ tagId + '/skills/'+skillId, 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }
        }

        var deferred = $q.defer();

        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }

  this.updateJobType = function(tagId,skillId,desc) {
        var req = {
            method: 'PUT',
               url: serverUrl + 'tags/'+ tagId + '/skills/'+skillId,   
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            },
            data: desc
        }

        var deferred = $q.defer();

        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }


        this.getCountryCodes = function() {

        var deferred = $q.defer();
   
        $http.get('images/data/country-codes.json')
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function (err) {
            deferred.reject(err);
          });
        
        return deferred.promise;
        
    };

  this.userLogout = function() {

        var deferred = $q.defer();
         var req = {
            method: 'POST',
               url: serverUrl + 'admin/sign_out',   
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            }
        }
       
        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
           
                deferred.reject(err);
            });

        return deferred.promise;

    };



  this.resetAdminPassword = function(params) {

        var deferred = $q.defer();
         var req = {
            method: 'POST',
               url: serverUrl + 'admin/password',   
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            },
            data: params

        }
       
        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
           
                deferred.reject(err);
            });

        return deferred.promise;

    };


this.resolveDispute = function(params,jobId) {

        var deferred = $q.defer();
         var req = {
            method: 'POST',
               url: serverUrl + 'admin/servicerequests/'+jobId+'/dispute' ,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            },
            data: params

        }
       
        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
           
                deferred.reject(err);
            });

        return deferred.promise;

    };


this.resendPassword = function(id) {

        var deferred = $q.defer();
         var req = {
            method: 'POST',
               url: serverUrl + 'admin/experts/'+id+'/resend' ,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.authToken
            },

        }
       
        $http(req)
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
           
                deferred.reject(err);
            });

        return deferred.promise;

    };
}]);

/*-----  End of Service = dataAPI  ------*/
