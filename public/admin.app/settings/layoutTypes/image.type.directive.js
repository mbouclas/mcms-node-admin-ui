(function() {
    angular.module('mcms.settings')
        .directive('imageType', imageType);

    imageType.$inject = ['$compile','configuration','$location','$rootScope','$templateRequest','$timeout'];
    imageTypeController.$inject = ['$location','$scope','$timeout','$rootScope','lodashFactory'];

    function imageType($compile,Config,$location,$rootScope,$templateRequest,$timeout) {
        return {
            controller: imageTypeController,
            templateUrl : Config.appUrl + "settings/layoutTypes/image.type.html",
            scope : {
                model : '=item'
            },
            restrict : 'E',
            controllerAs: 'VM',
            link: function(scope, element, attributes) {

            }
        };

    }

    function imageTypeController($location,$scope,$timeout,$rootScope,lo){
        var vm = this;
        vm.Item = $scope.row;
    }
})();