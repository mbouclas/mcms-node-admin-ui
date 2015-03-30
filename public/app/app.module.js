(function(){
  'use strict';

  var extraModules = [];
  for (var a in adminModules){
    var length = adminModules[a].modules.length || 0;
    for (var i =0;length > i;i++){
      extraModules.push(adminModules[a].modules[i]);
    }
  }

  var angularModules = [
      'ngRoute',
      'ngSanitize',
      'mcms.core',
      'mcms.dashboard'
  ];
  angularModules = angular.extend(angularModules,extraModules);

  angular.module('mcms', angularModules)
      .config(mcmsAdministratorConfig);

    mcmsAdministratorConfig.$inject = ['$routeProvider','configuration'];

    function mcmsAdministratorConfig($routeProvider,configuration) {
        $routeProvider
            .when('/', {
                templateUrl: configuration.appUrl + 'dashboard/dashboard.html',
                controller: 'dashboardCtrl',
                controllerAs: 'Dashboard'
            })
            .otherwise('/');
    }
})();

