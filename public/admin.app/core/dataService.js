(function(){
    'use strict';

    angular.module('mcms.core')
        .service('core.dataService',dataService);

    dataService.$inject = ['$q','$timeout','$http','logger','$location','configuration','lodashFactory'];



    function dataService($q, $timeout, $http, logger, $location, constants,lo){
        var defaults = {
            apiUrl : constants.apiUrl,
            test : 1
        };

        function Service(options){
            options = options || {};
            this.options = {
                apiUrl : constants.apiUrl
            };

            lo.merge(this.options,options);
        }

        Service.prototype.responseSuccess = function(response) {
            return response.data;

        };

        Service.prototype.responseError = function(response) {
            var message = {};
            if (response.data && typeof response.data.error != 'undefined'){
                message.error = response.data.error;
            } else {
                message.error  = 'Error detected. (HTTP status: ' + response.status + ')';
            }
            message.data = response.data;
            message.status = response.status;
            return $q.reject(message);
        };

        Service.prototype.Post = function(endPoint,options){
            if (!options){
                options = {};
            }

            var deferred = $q.defer();
            options._csrf = constants.CSRF;
            return $http.post(this.options.apiUrl + endPoint,options);
        };

        Service.prototype.Get = function(endPoint,options){
            if (!options){
                options = {};
            }
            var deferred = $q.defer();
            return $http.get(this.options.apiUrl + endPoint,options);
        };

        Service.prototype.genericPost = function(endPoint,options){
            return this.Post(endPoint,options)
                .then(this.responseSuccess)
                .catch(this.responseError);
        };

        Service.prototype.genericGet = function(endPoint,options){
            return this.Get(endPoint,options)
                .then(this.responseSuccess)
                .catch(this.responseError);
        };

        return Service;
    }
})();