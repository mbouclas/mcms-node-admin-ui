(function(){
    'use strict';

    var userModule = angular.module('mcms.users');
    var appiUrl = '/api/users/';
    var config = {
        apiUrl: appiUrl
    };

    userModule.value('config', config);
    userModule.constant('configuration',config);
})();
