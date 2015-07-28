(function() {
    angular.module('mcms.tabs')
        .directive('tabContent', tabContent);

    tabContent.$inject = ['$compile','tabsConfig','$templateRequest','$timeout'];
    tabContentController.$inject = ['$location','$scope'];

    function tabContent($compile,Config,$templateRequest,$timeout) {
        return {
            controller: tabContentController,
            require : '^mcmsTabs',
            scope : {},
            restrict : 'E',
            replace : true,
            controllerAs: 'VM',
            link: function(scope, element, attributes,mcmsTabsController) {
                scope.tabsCtrl = mcmsTabsController;
                scope.contents = element.html();
                scope.state = attributes.state;
                scope.currentState = mcmsTabsController.currentState;

                $rootScope.$on('tabs.state.changed',function(event,state){
                    scope.currentState = state;
                });

                $templateRequest(Config.templates.content).then(function(html){
                    element.html(html);
                    var el = $compile(element.contents())(scope);
                    $timeout(function(){
                        element.replaceWith(el);
                    });

                });
            }
        };

    }

    function tabContentController($location,$scope,$compile){
        var vm = this;


    }
})();