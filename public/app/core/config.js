(function(){
    'use strict';

    var core = angular.module('mcms.core');
    var assetsUrl = '/assets/',
        appUrl = '/app/',
        componentsUrl = appUrl + 'components/';
    var config = {
        imageBasePath: assetsUrl + 'img',
        appUrl : appUrl,
        componentsUrl : componentsUrl
    };

    core.value('config', config);
    core.constant('configuration',config);
})();
