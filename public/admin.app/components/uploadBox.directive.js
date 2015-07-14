(function(){
    'use strict';

    angular.module('mcms.core')
        .directive('uploadBox',['configuration', function (Config){
            return {
                require: "ngModel",
                scope: {
                    model : '=ngModel'
                },
                templateUrl: Config.appUrl + "components/uploadBox.directive.html",
                link: function(scope, element, attributes, ngModel) {

                },
                controller : uploadBoxController,
                controllerAs : 'VM'
            };
        }]);

    uploadBoxController.$inject = ['$scope','Upload'];

    function uploadBoxController($scope,Upload){
        var vm = this;
        vm.upload = function (files) {

        };
    }
})();