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
      'ngMessages',
      'formly',
      'ngFileUpload',
      'formlyBootstrap',
      'angular-redactor',
      'ui.sortable',
      'mcms.namedRoutes',
      'mcms.tabs',
      'mcms.core',
      'mcms.core.configuration',
      'mcms.dashboard',
      'mcms.users'
  ];


  angularModules = angularModules.concat(extraModules);
  angular.module('mcms', angularModules)
      .config(mcmsAdministratorConfig);

    mcmsAdministratorConfig.$inject = ['$routeProvider','configuration','$locationProvider','redactorOptions','tabsConfig'];

    function mcmsAdministratorConfig($routeProvider,configuration,$locationProvider,redactorOptions,tabsConfig) {
        configuration.CSRF = CSRF || '';
        //redactorOptions.buttons = ['formatting', '|', 'bold', 'italic'];
        //you can overwrite the tabs configuration here
        //tabsConfig = {};
        if (Translations){
            configuration.Lang = angular.fromJson(Translations);
        }
        $locationProvider
            .html5Mode(false);
        $routeProvider
            .when('/', {
                templateUrl: configuration.appUrl + 'dashboard/dashboard.html',
                controller: 'dashboardCtrl',
                controllerAs: 'Dashboard',
                name : 'app-home'
            })
            .otherwise('/');
    }
})();

