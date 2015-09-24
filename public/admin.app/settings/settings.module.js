(function(){
    'use strict';

    angular.module('mcms.settings',[

    ])
        .config(moduleConfig);

    moduleConfig.$inject = ['$routeProvider','configuration'];

    function moduleConfig($routeProvider,configuration) {
        $routeProvider
            .when('/admin/front-page', {
                templateUrl: configuration.appUrl + 'settings/settings.frontPage.html',
                controller: 'frontPageCtrl',
                controllerAs: 'VM',
                name : 'front-page',
                reloadOnSearch : false
            });
    }
})();