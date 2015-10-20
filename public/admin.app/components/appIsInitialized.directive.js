angular.module('mcms.core')
.directive('initialisation',['$rootScope',function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, elem, attrs) {
            var to;
            var listener = $scope.$watch(function() {
                console.log('checking')
                clearTimeout(to);
                to = setTimeout(function () {
                    listener();
                    $rootScope.$broadcast('module.initialised',attrs.initialisation || 'app');
                }, 50);
            });
        }
    };
}]);