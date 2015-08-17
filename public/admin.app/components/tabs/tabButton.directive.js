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

                var el = '',
                    queue = null;
                $templateRequest(Config.templates.tab).then(function(html){
                    mcmsTabsController.addTab(scope.state);
                    element.html(html);
                    el = $compile(element.contents())(scope);
                    element.replaceWith(el);
                    scope.loaded = true;
                });

                scope.$watch('loaded',function(val){
                    if (!val){
                        return;
                    }

                    if (scope.state == mcmsTabsController.currentState){
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