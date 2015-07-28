(function(){
    'use strict';

    var module = angular.module('mcms.tabs');
    var appUrl = '/admin.app/',
        componentsUrl = appUrl + 'components/tabs/';
    var config = {
        baseUrl : componentsUrl,
        templates : {
            tabs : componentsUrl +'mcmsTabs.directive.html',
            tab : componentsUrl + 'tabButton.directive.html',
            content : componentsUrl + 'tabContent.directive.html'
        }
    };

    module.value('tabsConfig', config);
    module.constant('tabsConfig',config);
})();
