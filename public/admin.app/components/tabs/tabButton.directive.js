(function() {
    angular.module('mcms.tabs')
        .directive('tabButton', tabButton);

    tabButton.$inject = ['$compile','$timeout','tabsConfig','$templateRequest','$rootScope'];
    tabButtonController.$inject = ['$location','$scope','$rootScope'];

    function tabButton($compile,$timeout,Config,$templateRequest,$rootScope) {
        return {
            controller: tabButtonController,
            require : '^mcmsTabs',
            replace : true,
            scope : {},
            restrict : 'E',
            controllerAs: 'VM',
            link: function(scope, element, attributes, mcmsTabsController) {
                scope.tabsCtrl = mcmsTabsController;
                scope.contents = element.html();
                scope.state = attributes.state;
                scope.target = '#' + attributes.state;
                scope.loaded = false;
                mcmsTabsController.addTab(scope.state);
                var el = '',
                    queue = null;
                $templateRequest(Config.templates.tab).then(function(html){
                    element.html(html);
                    el = $compile(element.contents())(scope);
                    element.replaceWith(el);
                    scope.loaded = true;
                });

                $rootScope.$on('tabs.state.changed',function(event,state,id){
                    if (mcmsTabsController.tabs.indexOf(scope.state) == -1){
                        return;
                    }

                    queue = state;
                });

                scope.$watch('loaded',function(val){
                    if (!val){
                        return;
                    }

                    if (scope.state == queue){
                        $timeout(function(){
                            el.find('a').trigger('click');
                        });
                    }
                })
            }
        };

    }

    function tabButtonController($location,$scope,$rootScope){
        var vm = this;
        vm.changeState = function(state) {
            $scope.tabsCtrl.changeState(state);
        };


    }
})();