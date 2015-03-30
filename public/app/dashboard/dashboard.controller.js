(function(){
    angular.module('mcms')
        .controller('dashboardCtrl',dashboardCtrl);

    dashboardCtrl.$inject = ['$rootScope'];

    function dashboardCtrl($rootScope){
        var vm = this;
        $rootScope.pageHeader = {
            pageTitle : 'Dashboard'
        };
        console.log('in dash')
    }
})();