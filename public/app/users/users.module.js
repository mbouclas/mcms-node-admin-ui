(function(){
    'use strict';

    angular.module('mcms.users',[
        'mcms.core'
    ])
        .config(moduleConfig);

    moduleConfig.$inject = ['$routeProvider','configuration'];

    function moduleConfig($routeProvider,configuration) {
        $routeProvider
            .when('/admin/users', {
                templateUrl: configuration.appUrl + 'users/user-list.html',
                controller: 'userListCtrl',
                controllerAs: 'Users'
            })
            .when('/admin/user/:id',{
                templateUrl: configuration.appUrl + 'users/user.html',
                controller: 'userCtrl',
                controllerAs: 'User'
            });
    }
})();