(function(){
    'use strict';

    angular.module('mcms')
        .controller('PageHeaderController',PageHeaderController);

    PageHeaderController.$inject = ['$rootScope'];

    function PageHeaderController($rootScope){
        var vm = this;

        $rootScope.$on('set.pageTitle',function(event,title){
            if (typeof title == 'string'){
                vm.pageTitle = title;
                return;
            }

            angular.forEach(title,function(value,key){
                vm[key] = value;
            });
        });
    }
})();