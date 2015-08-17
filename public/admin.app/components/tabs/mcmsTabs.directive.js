//grab template of the Config
(function() {
    angular.module('mcms.tabs')
        .directive('mcmsTabs', mcmsTabs);

    mcmsTabs.$inject = ['$compile','tabsConfig','$location','$rootScope'];
    mcmsTabsController.$inject = ['$location','$scope','$timeout','$rootScope','lodashFactory'];

    function mcmsTabs($compile,Config,$location,$rootScope) {
        return {
            controller: mcmsTabsController,
            scope : {
            },
            restrict : 'E',
            controllerAs: 'VM',
            link: function(scope, element, attributes) {
                scope.currentState = null;
                scope.id = attributes.id;
                scope.pageParams = $location.search();
                if (scope.pageParams[scope.id]){
                    scope.currentState = scope.pageParams[scope.id];
                }


            }
        };

    }

    function mcmsTabsController($location,$scope,$timeout,$rootScope,lo){
        var vm = this;
        vm.id = $scope.id;
        vm.tabs = [];
        vm.currentState = $scope.currentState || vm.tabs[0];

        $scope.$watch('currentState',function(value){
            if (!value){
                return;
            }

            vm.currentState = value;
            $rootScope.$broadcast('tabs.state.changed',value,$scope.id);
        });

        $rootScope.$on('tabs.set.state',function(event,state){
            if (!state){
                return;
            }
            vm.changeState(state);
        });

        vm.addTab = function(tab){
            vm.tabs.push(tab);
            $rootScope.$broadcast('mcmsTabs.tab.added',vm.tabs);
        };

        vm.removeTab = function(tab){
            vm.tabs.splice(vm.tabs.indexOf(tab),1);
            $rootScope.$broadcast('mcmsTabs.tab.removed',vm.tabs);
        };

        vm.listTabs = function(){
            return vm.tabs;
        };

        vm.changeState = function(state){

            vm.currentState = state;
            $rootScope.$broadcast('tabs.state.changed',state,$scope.id);
            var newState = {};
            newState[$scope.id] = state;
            $location.search(lo.merge($scope.pageParams,newState));
        }

    }
})();