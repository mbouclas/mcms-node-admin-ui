(function(){
    angular.module('mcms')
        .controller('dashboardCtrl',dashboardCtrl);

    dashboardCtrl.$inject = ['$rootScope','logger','momentFactory'];

    function dashboardCtrl($rootScope,logger,moment){
        var vm = this;

        $rootScope.pageHeader = {
            pageTitle : 'Dashboard'
        };

        logger.info(moment().format());
    }


})();