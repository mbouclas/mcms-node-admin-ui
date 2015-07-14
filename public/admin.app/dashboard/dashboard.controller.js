(function(){
    angular.module('mcms')
        .controller('dashboardCtrl',dashboardCtrl);

    dashboardCtrl.$inject = ['$rootScope','logger','momentFactory','pageTitle'];

    function dashboardCtrl($rootScope,logger,moment,pageTitle){
        var vm = this;

        pageTitle.set('Dashboard');
    }


})();