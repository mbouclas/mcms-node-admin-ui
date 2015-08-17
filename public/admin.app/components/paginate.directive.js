(function() {
    angular.module('mcms.core')
        .directive('paginate', paginate);

    paginate.$inject = ['configuration','$rootScope'];
    paginateController.$inject = ['$location','$scope','$timeout','$rootScope','lodashFactory'];

    function paginate(Config,$rootScope) {
        return {
            controller: paginateController,
            scope : {
                model : '=ngModel',
                changePage : '&ngChange'
            },
            restrict : 'E',
            controllerAs: 'VM',
            templateUrl: Config.appUrl + "components/paginate.directive.html",
            link: function(scope, element, attributes) {

            }
        };

    }

    function paginateController($location,$scope,$timeout,$rootScope,lo){
        var vm = this;
        $scope.$watch('model',function(val){
            if (!val){
                return;
            }

            vm.pagination = $scope.model;


        });
        vm.changePage = function(page){
            $scope.changePage({page : page});
        }

    }
})();