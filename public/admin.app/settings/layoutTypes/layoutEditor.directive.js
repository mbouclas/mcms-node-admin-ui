(function() {
    angular.module('mcms.settings')
        .directive('layoutEditor', layoutEditor);

    layoutEditor.$inject = ['$compile','configuration','$location','$rootScope','$templateRequest','$timeout'];
    layoutEditorController.$inject = ['$location','$scope','$timeout','$rootScope','lodashFactory','configuration'];

    function layoutEditor($compile,Config,$location,$rootScope,$templateRequest,$timeout) {
        return {
            controller: layoutEditorController,
            templateUrl : Config.appUrl + "settings/layoutTypes/layoutEditor.directive.html",
            scope : {
                row : '=item'
            },
            restrict : 'E',
            controllerAs: 'VM',
            link: function(scope, element, attributes) {


            }
        };

    }

    function layoutEditorController($location,$scope,$timeout,$rootScope,lo,Config){
        var vm = this;
        vm.Item = $scope.row;


    }
})();