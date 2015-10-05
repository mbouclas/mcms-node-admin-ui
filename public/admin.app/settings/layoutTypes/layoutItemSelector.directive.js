(function() {
    angular.module('mcms.settings')
        .directive('layoutItemSelector', layoutItemSelector);

    layoutItemSelector.$inject = ['$compile','configuration','$location','$rootScope','$templateRequest','$timeout'];
    layoutItemSelectorController.$inject = ['$location','$scope','$timeout','$rootScope','lodashFactory'];

    function layoutItemSelector($compile,Config,$location,$rootScope,$templateRequest,$timeout) {
        return {
            controller: layoutItemSelectorController,
            scope : {
                item : '=item'
            },
            restrict : 'E',
            controllerAs: 'VM',
            link: function(scope, element, attributes) {

                $templateRequest(Config.appUrl + 'settings/layoutTypes/' + scope.item.type + '.type.html').then(function(html){
                    element.html(html);

                    var el = $compile(element.contents())(scope);
                    $timeout(function(){
                        element.replaceWith(el);
                    });
                });

            }
        };

    }

    function layoutItemSelectorController($location,$scope,$timeout,$rootScope,lo){
        var vm = this;
        vm.Item = $scope.item;

    }
})();